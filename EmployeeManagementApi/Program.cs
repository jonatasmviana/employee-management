using EmployeeManagementApi.Models;
using EmployeeManagementApi.Data;
using EmployeeManagementApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5555");

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
builder.Services.AddScoped<EmployeeService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var key = Encoding.UTF8.GetBytes("ThisIsMySecretKey12345678901234567890");
var tokenDescriptor = new SecurityTokenDescriptor
{
    Subject = new ClaimsIdentity(new[]
    {
        new Claim(ClaimTypes.Name, "TestUser"),
        new Claim(ClaimTypes.Role, "Director")
    }),
    Expires = DateTime.UtcNow.AddHours(1),
    Issuer = "CompanyName",
    Audience = "MyApp",
    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
};
var tokenHandler = new JwtSecurityTokenHandler();
var token = tokenHandler.CreateToken(tokenDescriptor);
var jwtToken = tokenHandler.WriteToken(token);
Console.WriteLine("Token: " + jwtToken);

var app = builder.Build();

// Aplicar migrações automaticamente (opcional)
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
            DocNumber = "76397263010",
            Phones = new List<string> { "51988776655" },
            ManagerName = null,
            Role = Roles.Director,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
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