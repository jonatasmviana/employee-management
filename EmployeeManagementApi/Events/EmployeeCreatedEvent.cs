namespace EmployeeManagementApi.Events;

public record EmployeeCreatedEvent(int EmployeeId, string Email, string FirstName);