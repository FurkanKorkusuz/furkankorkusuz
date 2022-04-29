using Dapper;
using Core.DataAccess;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Core.Entities.DTOs;
using Core.DataAccess.Dapper;
using Core.DataAccess.Connections;

namespace DataAccess.Concrete.Dapper
{
    public class DpBlogDal : DapperGenericRepository<Blog> , IBlogDal
    {
    


    }
}
