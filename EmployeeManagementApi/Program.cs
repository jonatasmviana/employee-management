using EmployeeManagementApi.Models;
using EmployeeManagementApi.Data;
using EmployeeManagementApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var port = builder.Configuration["Port"] ?? "5001";
builder.WebHost.UseUrls($"http://localhost:{port}");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key not configured");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddTransient<IEmployeeValidator, AgeValidator>();
builder.Services.AddTransient<IEmployeeValidator, PermissionValidator>();
builder.Services.AddTransient<IEmployeeValidator, PermissionDeleteValidator>();
builder.Services.AddScoped<EmployeeService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
  options.AddPolicy("AllowLocalhost3000", policy =>
  {
    policy.WithOrigins("http://localhost:3000")
          .AllowAnyHeader()
          .AllowAnyMethod();
  });
});

var app = builder.Build();
app.UseCors("AllowLocalhost3000");

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();

    if (!dbContext.Employees.Any())
    {
        var initialEmployee = new Employee
        {
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@admin.com",
            DocNumber = 76397263010,
            Phone1 = "51988776655",
            Phone2 = "",
            Role = Roles.Director,
            Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
            BirthDate = new DateTime(1990, 1, 1)
        };
        dbContext.Employees.Add(initialEmployee);
        dbContext.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();