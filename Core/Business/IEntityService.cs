using Core.DataAccess.Dapper;
using Core.Entities;
using Core.Entities.Abstract;
using Core.Utilities.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.Business
{
    public interface IEntityService<T> where T:class, IEntity, new()
    {
        IDataResult<List<T>> GetList(int rowNumber, Dictionary<string, string> filter, int rowPerPage = 30);

        IDataResult<List<T>> GetList(QueryParameter queryParameter);
        IDataResult<T> GetByPattern(object pattern, string tableName=null);

        IDataResult<T> Add(T entity);

        IDataResult<T> Update(T entity);
        IResult Delete(int id);
    }
}
