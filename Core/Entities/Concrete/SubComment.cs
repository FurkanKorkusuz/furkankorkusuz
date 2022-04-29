using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
   public class SubComment : IEntity
    {
        public int ID { get; set; }
        public int CommentID { get; set; }
        public int MemberID { get; set; }
        public string CreatedDate { get; set; }
        public string Content { get; set; }
        public string IpAdress { get; set; }
    }
}
