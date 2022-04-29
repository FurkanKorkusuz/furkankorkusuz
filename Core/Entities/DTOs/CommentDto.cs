using Core.Entities;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.DTOs
{
    public class CommentDto : IEntity
    {
        public int ID { get; set; }
        public int BlogID { get; set; }
        public int UserID { get; set; }
        public int? ParentID { get; set; }
        public string CreatedDate { get; set; }
        public string Content { get; set; }
        public string UserName { get; set; }
        public bool? IsDeleted { get; set; }
        public string DeletedDate { get; set; }

        //public string UserImage { get; set; }
    }
}
