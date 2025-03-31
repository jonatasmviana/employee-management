using Azure.Messaging.ServiceBus;

namespace EmployeeManagementApi.Services;

public class NoOpServiceBusClient : ServiceBusClient
{
    public override ServiceBusSender CreateSender(string queueName) => new NoOpServiceBusSender();
    public override ServiceBusReceiver CreateReceiver(string queueName) => throw new NotSupportedException();
}