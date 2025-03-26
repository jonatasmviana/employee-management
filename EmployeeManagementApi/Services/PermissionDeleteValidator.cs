using EmployeeManagementApi.Models;

namespace EmployeeManagementApi.Services;

public class PermissionDeleteValidator : IEmployeeValidator
{
    public void Validate(Employee employee, Roles currentUserRole) { }

    public void ValidateDelete(Employee employeeToDelete, Roles currentUserRole, string currentUserEmail)
    {
        if (employeeToDelete.Email == currentUserEmail)
            throw new ArgumentException("Cannot delete your own account.");

        if ((currentUserRole == Roles.Employee && employeeToDelete.Role != Roles.Employee) ||
            (currentUserRole == Roles.Leader && employeeToDelete.Role == Roles.Director))
            throw new UnauthorizedAccessException("Cannot delete a user with higher permissions.");
    }
}