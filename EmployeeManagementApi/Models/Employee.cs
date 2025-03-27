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
    public required long DocNumber { get; set; }
    public string? Password { get; set; }
    public string? Phone1 { get; set; }
    public string? Phone2 { get; set; }
    public Roles Role { get; set; } = Roles.Employee;
    public DateTime? BirthDate { get; set; }
}