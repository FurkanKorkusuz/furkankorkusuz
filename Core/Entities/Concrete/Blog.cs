using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    public class Blog : IEntity
    {
        public int ID { get; set; }
        public int CategoryID { get; set; }
        public int UserID { get; set; }
        public string CreatedDate { get; set; }
        public string Title { get; set; }
        public string UrlName { get; set; }
        public string Summary { get; set; }
        public string TitleImage { get; set; }
        public string Content { get; set; }
        public int ReadingMinute { get; set; }
        public int ReadCount { get; set; }
        public bool IsAccess { get; set; }
    }
}
