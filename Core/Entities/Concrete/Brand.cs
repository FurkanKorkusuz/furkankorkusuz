using Core.Entities.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    /// <summary>
    /// Generic Repository de tablo adı dinamik olsun diye buradaki  [Table("Brands")] Attribute ünden okuyorum.
    /// </summary>
    [Table("Brands")]
    public  class Brand:  IEntity
    {
        public int ID { get; set; }
        public string BrandName { get; set; }
    }
}
