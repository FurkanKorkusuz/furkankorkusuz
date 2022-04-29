using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
   public class VisitorInSession :IEntity
    {
        public int ID { get; set; }

        public int? UserID { get; set; }

        public bool CookiePolicy { get; set; }


    }
}
