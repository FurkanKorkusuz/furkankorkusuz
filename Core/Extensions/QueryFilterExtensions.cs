using Core.DataAccess.Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Core.DataAccess.Dapper.QueryFilter;

namespace Core.Extensions
{
    public static class QueryFilterExtensions
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="qf"> this ile extend ettiğimiz nesnedir(object de olabilir). yani bu nesneye işlem yapacağız.</param>
        /// <param name="Key">gönderdiğim değişken (işlem yapacağım)</param>
        /// <param name="Value">gönderdiğim değişken (işlem yapacağım)</param>
        /// <returns>Burada işlem yaptığım nesneyi döndürüyorum ki tekrar işlem yapabileyim.</returns>
        public static List<QueryFilter> Filter(this List<QueryFilter> qf, string Key, object Value, ConditionOperator @operator = ConditionOperator.Equals)
        {
            qf.Add(new QueryFilter
            {
                FilterKey = Key,
                FilterValue = Value,
                conditionOperator = @operator
            });
            return qf;
        }

   
    }
}
