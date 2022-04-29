using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Dapper
{
    public class QueryOrderBy
    {
        public string OrderBy { get; set; }
        public bool IsAcending { get; set; } = true;
    }
}
