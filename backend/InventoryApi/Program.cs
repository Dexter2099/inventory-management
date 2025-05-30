using InventoryApi.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 🔌 Connect to SQL Server (read from config or DB_CONNECTION_STRING env var)
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var envConnection = builder.Configuration["DB_CONNECTION_STRING"];
if (!string.IsNullOrEmpty(envConnection))
{
    connectionString = envConnection;
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// 🔐 CORS config (allow all for dev)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// 🧠 Add controllers
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable Swagger in dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// 🔓 Use CORS before controllers
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseAuthorization();

// Map your controllers (like ProductsController)
app.MapControllers();

app.Run();
