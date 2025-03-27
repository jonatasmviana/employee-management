using EmployeeManagementApi.Models;

namespace EmployeeManagementApi.Services;

public class AgeValidator : IEmployeeValidator
{
    public void Validate(Employee employee, Roles currentUserRole)
    {
        if (employee.BirthDate.HasValue)
        {
            var birthDate = employee.BirthDate.Value;
            var today = DateTime.Now;
            var age = today.Year - birthDate.Year;

            if (birthDate > today.AddYears(-age))
            {
                age--;
            }

            if (age < 18)
            {
                throw new ArgumentException("Employee must be at least 18 years old.");
            }
        }
    }

    public void ValidateDelete(Employee employeeToDelete, Roles currentUserRole, string currentUserEmail) { }
}