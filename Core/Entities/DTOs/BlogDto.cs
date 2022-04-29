using Core.Entities;
using Core.Entities.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.DTOs
{
    public class BlogDto : IEntity
    {
        public int ID { get; set; }
        public int CategoryID { get; set; }
        public int UserID { get; set; }
        public string CreatedDate { get; set; }
        public string UrlName { get; set; }
        public string Title { get; set; }
        public string Summary { get; set; }
        public string TitleImage { get; set; }
        public string Content { get; set; }
        public int ReadingMinute { get; set; }
        public int ReadCount { get; set; }
        public string CategoryName { get; set; }
        public string UserName { get; set; }
        public bool IsAccess { get; set; }



        public List<Tag> Tags { get; set; } 
        public List<CommentDto> Comments { get; set; }

    }
}
