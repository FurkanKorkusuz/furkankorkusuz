using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    public class Mission:IEntity
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public string MissionName { get; set; }
        public string CreatedDate { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public byte Status { get; set; }
        public string Description { get; set; }
    }
}
