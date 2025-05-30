using InventoryApi.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace InventoryApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("inventory")]
        public async Task<IActionResult> InventoryReport()
        {
            var products = await _context.Products
                .Select(p => new { p.Name, p.SKU, p.Stock })
                .ToListAsync();

            var csv = new StringBuilder();
            csv.AppendLine("Name,SKU,Stock");
            foreach (var p in products)
            {
                csv.AppendLine($"{p.Name},{p.SKU},{p.Stock}");
            }

            return File(Encoding.UTF8.GetBytes(csv.ToString()), "text/csv", "inventory_report.csv");
        }
    }
}
