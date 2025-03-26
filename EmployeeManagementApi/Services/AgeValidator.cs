using EmployeeManagementApi.Models;

namespace EmployeeManagementApi.Services;

public class AgeValidator : IEmployeeValidator
{
    public void Validate(Employee employee, Roles currentUserRole)
    {
        if (DateTime.Today.Year - employee.BirthDate.Year < 18)
            throw new ArgumentException("Employee must be 18 or older.");
    }

    public void ValidateDelete(Employee employeeToDelete, Roles currentUserRole, string currentUserEmail) { }
}