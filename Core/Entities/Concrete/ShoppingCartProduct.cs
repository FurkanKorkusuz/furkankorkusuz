using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
   public class ShoppingCartProduct:IEntity
    {
        public int ID { get; set; }
        public int ShoppingCartProductID { get; set; }
        public int ShoppingCartID { get; set; }
        public int ProductID { get; set; }
        public int Quantity { get; set; }
    }
}
