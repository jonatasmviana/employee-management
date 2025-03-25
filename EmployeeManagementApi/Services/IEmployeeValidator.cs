using EmployeeManagementApi.Models;

namespace EmployeeManagementApi.Services;

public interface IEmployeeValidator
{
    void Validate(Employee employee, Roles currentUserRole);
}