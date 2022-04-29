using Core.DataAccess;
using Core.Entities.DTOs;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DataAccess.Abstract;

namespace DataAccess.Abstract
{
    public interface IBlogDal :IEntityRepository<Blog>
    {
 
    }
}
