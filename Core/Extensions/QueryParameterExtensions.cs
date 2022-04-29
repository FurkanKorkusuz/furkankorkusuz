using Core.DataAccess.Dapper;
using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Core.Extensions
{
    public static class QueryParameterExtensions
    {
        public static QueryParameter Select(this QueryParameter qp, string[] select)
        {
            if (qp.Select == null)
            {
                qp.Select = new List<string>();
            }
            foreach (string item in select)
            {
                qp.Select.Add(item);
            }
            return qp;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T">Direkt bir entity çekeceğim zaman o entity nın tek tek propertylerini yazmak yerine burada otomatik oluşturulmasını istiyorum.</typeparam>
        /// <param name="entity"></param>
        /// <returns></returns>
        public static QueryParameter Select<T>(this QueryParameter qp)
        {
            IEnumerable<PropertyInfo> GetProperties = typeof(T).GetProperties();
            if (qp.Select == null)
            {
                qp.Select = new List<string>();
            }
            foreach (string item in GenerateListOfProperties(GetProperties))
            {
                qp.Select.Add(item);
            }
            return qp;
        }

        public static QueryParameter MaxCount(this QueryParameter qp, int maxCont)
        {
            qp.TopRow = maxCont;
            return qp;
        }

        public static QueryParameter Skip(this QueryParameter qp, int skip)
        {
            qp.RowNumber = skip;
            return qp;
        }


        public static QueryParameter PageRowCount(this QueryParameter qp, int pageCount)
        {
            qp.RowPerPage = pageCount;
            return qp;
        }

        public static QueryParameter SortBy(this QueryParameter qp, string sort, bool isAscending=true)
        {
            qp.OrderBy.Add(new QueryOrderBy
            {
                OrderBy=sort,
                IsAcending= isAscending
            });
            return qp;
        }
        /// <summary>
        /// Bu metod diğer orderBy parametrelerini ezer ve sadece OrderBy ID desc şeklinde çalışmasını sağlar.
        /// </summary>
        /// <returns></returns>
        public static QueryParameter OrderByIdDesc(this QueryParameter qp)
        {
            qp.OrderBy = new List<QueryOrderBy> { new QueryOrderBy { OrderBy = "ID" } };
            return qp;
        }


        public static QueryParameter GroupBy(this QueryParameter qp, string groupBy)
        {
            qp.GroupBy.Add(groupBy); 
            return qp;
        }



        public static QueryParameter Table(this QueryParameter qp, string name)
        {
            qp.TableName=name;
            return qp;
        }

        public static QueryParameter Join(this QueryParameter qp, string leftTableName, string[] leftTableColumns, string rightTableName, string[] rightTableColumns, JoinType  joinType= JoinType.InnerJoin)
        {
            qp.Joins.Add(new JoinParameter
            {
                LeftTableName = leftTableName,
                RightTableName = rightTableName,
                LeftTableColumns = leftTableColumns.ToList(),
                RightTableColumns = rightTableColumns.ToList(),
                joinType = joinType
            });
            return qp;
        }



        private static List<string> GenerateListOfProperties(IEnumerable<PropertyInfo> listOfProperties)
        {
            return (from prop in listOfProperties
                    let attributes = prop.GetCustomAttributes(typeof(DescriptionAttribute), false)
                    where attributes.Length <= 0 || (attributes[0] as DescriptionAttribute)?.Description != "ignore"
                    select prop.Name).ToList();
        }

        public static QueryParameter AddSelect(this QueryParameter qp, string addSelect)
        {
            qp.AddSelect=addSelect;
            return qp;
        }
    }
}
