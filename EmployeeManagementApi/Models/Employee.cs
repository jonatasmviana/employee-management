using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementApi.Models;

public enum Roles
{
    Employee,
    Leader,
    Director
}

public class Employee
{
    public int Id { get; set; }
    [Required]
    public required string FirstName { get; set; }
    [Required]
    public required string LastName { get; set; }
    [Required]
    public required string Email { get; set; }
    [Required]
    public required string DocNumber { get; set; }
    [Required]
    public required string PasswordHash { get; set; }
    public List<string> Phones { get; set; } = new();
    public string? ManagerName { get; set; }
    public Roles Role { get; set; } = Roles.Employee;
    public DateTime BirthDate { get; set; }
}