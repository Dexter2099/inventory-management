namespace InventoryApi.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string SKU { get; set; }
        public int Stock { get; set; }
        public int ReorderLevel { get; set; }
    }
}

