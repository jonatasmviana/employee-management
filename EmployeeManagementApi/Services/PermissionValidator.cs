using EmployeeManagementApi.Models;

namespace EmployeeManagementApi.Services;

public class PermissionValidator : IEmployeeValidator
{
    public void Validate(Employee employee, Roles currentUserRole)
    {
        if ((currentUserRole == Roles.Employee && employee.Role != Roles.Employee) ||
            (currentUserRole == Roles.Leader && employee.Role == Roles.Director))
            throw new UnauthorizedAccessException("Cannot create a user with higher permissions.");
    }
}