using Azure.Messaging.ServiceBus;
using EmployeeManagementApi.Events;
using System.Text.Json;

namespace EmployeeManagementApi.BackgroundServices;

public class EmailSenderService : BackgroundService
{
    private readonly ServiceBusClient _serviceBusClient;

    public EmailSenderService(ServiceBusClient serviceBusClient)
    {
        _serviceBusClient = serviceBusClient;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (_serviceBusClient == null)
        {
            Console.WriteLine("Service Bus not configured. Events process disabled!");
            return;
        }

        var processor = _serviceBusClient.CreateProcessor("employee-events", new ServiceBusProcessorOptions());

        processor.ProcessMessageAsync += async args =>
        {
            string messageBody = args.Message.Body.ToString();
            var @event = JsonSerializer.Deserialize<EmployeeCreatedEvent>(messageBody);

            if (@event != null)
            {
                // Simulation of mail sender
                Console.WriteLine($"Sending welcome e-mail to { @event.FirstName } ({ @event.Email })");
            }

            await args.CompleteMessageAsync(args.Message);
        };

        processor.ProcessErrorAsync += args =>
        {
            Console.WriteLine($"Erro: {args.Exception.Message}");
            return Task.CompletedTask;
        };

        await processor.StartProcessingAsync(stoppingToken);

        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(1000, stoppingToken);
        }

        await processor.StopProcessingAsync();
    }
}