using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
        public class Visitor : IEntity
    {
        public int ID { get; set; }
        public string VisitDate { get; set; }
        public string IPAdress { get; set; }
        public int? UserID { get; set; }
        public string LastModifiedDate { get; set; }

    }
}
