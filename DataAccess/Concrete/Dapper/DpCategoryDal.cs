using Core.DataAccess;
using Dapper;
using DataAccess.Abstract;
using Core.Entities.DTOs;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Core.DataAccess.Dapper;

namespace DataAccess.Concrete.Dapper
{
    public class DpCategoryDal :DapperGenericRepository<Category>, ICategoryDal
    {
  
    }
}
