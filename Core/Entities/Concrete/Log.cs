using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    [Table("Logs")]
    public class Log : IEntity
    {
        public int ID { get; set; }
        public string Detail { get; set; }
        public DateTime Date { get; set; }
        public byte Audit { get; set; }
    }
}
