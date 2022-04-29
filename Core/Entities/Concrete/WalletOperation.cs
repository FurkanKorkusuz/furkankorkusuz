using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
       public class WalletOperation : IEntity
    {
        public int ID { get; set; }
        public int WalletID { get; set; }
        public bool IsInput { get; set; }
        public string CreatedDate { get; set; }
        public double Amount { get; set; }
        public string Description { get; set; }
        public int WalletOperationCategoryID { get; set; }

    }
}
