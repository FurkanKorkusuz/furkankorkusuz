using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
   public class TagBlogs 
    {
        public int TagID { get; set; }
        public int BlogID { get; set; }
    }
}
