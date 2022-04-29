using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
   public class Wallet:IEntity
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string Name { get; set; }
        public double Balance { get; set; }
    }
}
