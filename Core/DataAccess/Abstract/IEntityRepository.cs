using Core.DataAccess.Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Abstract
{
    public interface IEntityRepository<T>
    {
        List<T>GetList(int rowNumber, Dictionary<string, string> flt, int rowPerPage);
        List<T> GetList(QueryParameter queryParameter);
        void Delete(int id);
        T GetByPattern(object pattern, string tableName);
        void Update(T entity);
        int Add(T entity);
    }
}
