using Core.DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Dapper
{
    public class DpLogDal : DapperGenericRepository<Log>, ILogDal
    {

    }
}
