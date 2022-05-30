using Core.Entities.Concrete;
using Core.Utilities.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
      public interface IProductService : IEntityService<Product>
    {
    }
}
