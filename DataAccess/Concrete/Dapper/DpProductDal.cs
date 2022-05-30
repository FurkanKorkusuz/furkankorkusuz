using Core.DataAccess.Dapper;
using Core.Entities.Concrete;
using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.Dapper
{
      public class DpProductDal : DapperGenericRepository<Product>, IProductDal
    {

    }
}
