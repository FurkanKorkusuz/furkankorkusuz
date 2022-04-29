using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    public class Category :IEntity
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int BlogCount { get; set; }
    }
}
