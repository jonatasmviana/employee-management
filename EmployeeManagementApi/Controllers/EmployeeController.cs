using EmployeeManagementApi.Models;
using EmployeeManagementApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Azure.Messaging.ServiceBus;
using EmployeeManagementApi.Events;

namespace EmployeeManagementApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class EmployeeController : ControllerBase
{
    private readonly EmployeeService _employeeService;
    private readonly IEnumerable<IEmployeeValidator> _validators;
    private readonly ServiceBusClient _serviceBusClient;

    public EmployeeController(EmployeeService employeeService, IEnumerable<IEmployeeValidator> validators, ServiceBusClient serviceBusClient)
    {
        _employeeService = employeeService;
        _validators = validators;
        _serviceBusClient = serviceBusClient;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _employeeService.GetAllEmployees();
        return Ok(employees);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var employee = await _employeeService.GetEmployeeById(id);
        if (employee == null) return NotFound();
        return Ok(employee);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Employee employee)
    {
        var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
        if (string.IsNullOrEmpty(roleClaim) || !Enum.TryParse<Roles>(roleClaim, out var currentUserRole))
            return Forbid("User role claim is missing.");

        if (string.IsNullOrWhiteSpace(employee.Password))
            return BadRequest("Password is required for creating an employee.");

        foreach (var validator in _validators)
        {
            validator.Validate(employee, currentUserRole);
        }

        var createdEmployee = await _employeeService.CreateEmployee(employee);

        if (_serviceBusClient != null)
        {
            var @event = new EmployeeCreatedEvent(createdEmployee.Id, createdEmployee.Email, createdEmployee.FirstName);
            ServiceBusSender sender = _serviceBusClient.CreateSender("employee-events");
            try
            {
                string messageBody = System.Text.Json.JsonSerializer.Serialize(@event);
                var message = new ServiceBusMessage(messageBody);
                await sender.SendMessageAsync(message);
            }
            finally
            {
                await sender.DisposeAsync();
            }
        }
        else
        {
            Console.WriteLine($"Service Bus not configured. Can not send welcome e-mail!");
        }

        return CreatedAtAction(nameof(GetById), new { id = createdEmployee.Id }, createdEmployee);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Employee employee)
    {
        var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
        if (string.IsNullOrEmpty(roleClaim) || !Enum.TryParse<Roles>(roleClaim, out var currentUserRole))
            return Forbid("User role claim is missing.");

        foreach (var validator in _validators)
        {
            validator.Validate(employee, currentUserRole);
        }

        var updatedEmployee = await _employeeService.UpdateEmployee(id, employee);
        if (updatedEmployee == null) return NotFound();
        return Ok(updatedEmployee);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
        if (string.IsNullOrEmpty(roleClaim) || !Enum.TryParse<Roles>(roleClaim, out var currentUserRole))
            return Forbid("User role claim is missing.");

        var currentUserEmail = User.FindFirst(ClaimTypes.Name)?.Value;
        if (string.IsNullOrEmpty(currentUserEmail))
            return Forbid("User email claim is missing.");

        var employeeToDelete = await _employeeService.GetEmployeeById(id);
        if (employeeToDelete == null) return NotFound();

        foreach (var validator in _validators)
        {
            validator.ValidateDelete(employeeToDelete, currentUserRole, currentUserEmail);
        }

        var deleted = await _employeeService.DeleteEmployee(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}