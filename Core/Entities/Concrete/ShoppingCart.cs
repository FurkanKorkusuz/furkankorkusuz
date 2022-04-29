using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    public class ShoppingCart:IEntity
    {

        public int ID { get; set; }
        public int ShoppingCartID { get; set; }
        public string CreatedDate { get; set; }
        public int? CustomerID { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal? DiscountTotal { get; set; }
        public int? VisitorID { get; set; }
        public bool? IsReserved { get; set; }
        public string ReservFinishDate { get; set; }
        public string Token { get; set; }

    }
}
