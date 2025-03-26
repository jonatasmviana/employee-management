using EmployeeManagementApi.Models;
using EmployeeManagementApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EmployeeManagementApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class EmployeeController : ControllerBase
{
    private readonly EmployeeService _employeeService;
    private readonly IEnumerable<IEmployeeValidator> _validators;

    public EmployeeController(EmployeeService employeeService, IEnumerable<IEmployeeValidator> validators)
    {
        _employeeService = employeeService;
        _validators = validators;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Employee employee)
    {
        var roleClaim = User.FindFirst(ClaimTypes.Role)?.Value;
        if (string.IsNullOrEmpty(roleClaim) || !Enum.TryParse<Roles>(roleClaim, out var currentUserRole))
            return Forbid("User role claim is missing.");

        foreach (var validator in _validators)
        {
            validator.Validate(employee, currentUserRole);
        }

        var createdEmployee = await _employeeService.CreateEmployee(employee);
        return CreatedAtAction(nameof(GetById), new { id = createdEmployee.Id }, createdEmployee);
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