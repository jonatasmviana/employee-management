using Azure.Messaging.ServiceBus;

namespace EmployeeManagementApi.Services;

public class NoOpServiceBusSender : ServiceBusSender
{
    public override Task SendMessageAsync(ServiceBusMessage message, CancellationToken cancellationToken = default)
    {
        return Task.CompletedTask;
    }

    public override ValueTask DisposeAsync()
    {
        return ValueTask.CompletedTask;
    }

    public override Task CloseAsync(CancellationToken cancellationToken = default)
    {
        return Task.CompletedTask;
    }
}