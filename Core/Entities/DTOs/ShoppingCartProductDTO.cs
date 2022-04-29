using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.DTOs
{
    public class ShoppingCartProductDTO
    {
        public int ShoppingCartProductID { get; set; }
        public int ShoppingCartID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public decimal SalePrice { get; set; }
        public int Stock { get; set; }
        public int SalableStock { get; set; }
        public string Url { get; set; }
        public string UnitName { get; set; }
        public string ImageUrl { get; set; }
        public decimal TotalAmount { get; set; }
    }
}
