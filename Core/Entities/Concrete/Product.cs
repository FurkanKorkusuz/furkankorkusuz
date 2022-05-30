using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    [Table("Products")]
    public class Product : IEntity
    {
        public int ID { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public string UrlName { get; set; }
        public string CreatedDate { get; set; }
        public int BrandID { get; set; }
        public int CategoryID { get; set; }
        public int SupplierID { get; set; }
        public int UnitID { get; set; }
        public int CountryID { get; set; }
        public int TaxID { get; set; }
        public decimal ShowPrice { get; set; }
        public decimal CancelPrice { get; set; }
        public int DiscountRate { get; set; }
        public int CurrencyID { get; set; }
        public bool HasVariant { get; set; }
        public byte StatusID { get; set; }
    }
}
