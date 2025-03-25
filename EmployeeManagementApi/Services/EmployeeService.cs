using EmployeeManagementApi.Data;
using EmployeeManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApi.Services;

public class EmployeeService
{
    private readonly AppDbContext _context;

    public EmployeeService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Employee> CreateEmployee(Employee employee)
    {
        employee.PasswordHash = BCrypt.Net.BCrypt.HashPassword(employee.PasswordHash);
        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<List<Employee>> GetAllEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task<Employee?> GetEmployeeById(int id)
    {
        return await _context.Employees.FindAsync(id);
    }

    public async Task<Employee?> UpdateEmployee(int id, Employee updatedEmployee)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return null;

        employee.FirstName = updatedEmployee.FirstName;
        employee.LastName = updatedEmployee.LastName;
        employee.Email = updatedEmployee.Email;
        employee.DocNumber = updatedEmployee.DocNumber;
        employee.Phones = updatedEmployee.Phones;
        employee.ManagerName = updatedEmployee.ManagerName;
        employee.Role = updatedEmployee.Role;
        employee.BirthDate = updatedEmployee.BirthDate;
        if (!string.IsNullOrEmpty(updatedEmployee.PasswordHash))
            employee.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedEmployee.PasswordHash);

        await _context.SaveChangesAsync();
        return employee;
    }

    public async Task<bool> DeleteEmployee(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return false;

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return true;
    }
}