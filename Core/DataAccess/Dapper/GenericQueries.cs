using Dapper.Contrib.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Dapper
{

    public class GenericQueries<T>
    {
        private readonly string _tableName;
        public GenericQueries(string tableName)
        {
            _tableName= tableName;
        }
        private IEnumerable<PropertyInfo> GetProperties => typeof(T).GetProperties();
        private static List<string> GenerateListOfProperties(IEnumerable<PropertyInfo> listOfProperties)
        {
            return (from prop in listOfProperties
                    let attributes = prop.GetCustomAttributes(typeof(DescriptionAttribute), false)
                    where attributes.Length <= 0 || (attributes[0] as DescriptionAttribute)?.Description != "ignore"
                    select prop.Name).ToList();
        }
        public virtual string GetAll(QueryParameter queryParameter)
        {

            var Query = new StringBuilder("Select ");

            if (queryParameter.TopRow>0)            {

                Query.Append($" TOP ({queryParameter.TopRow}) ");
            }
            
            var properties = GenerateListOfProperties(typeof(T).GetProperties());
            properties.ForEach(prop => { Query.Append($"[{prop}],"); });

            // sondaki virgülü silsin.
            Query.Remove(Query.Length - 1, 1);

            Query.Append($" from {_tableName}");



            return Query.ToString();
        }
        private void TableNameShort()
        {

        }
        private string GenerateInsertQuery()
        {
            var insertQuery = new StringBuilder($"INSERT INTO   ");

            insertQuery.Append("(");

            var properties = GenerateListOfProperties(GetProperties);

            properties.Remove("ID");


            properties.ForEach(prop => { insertQuery.Append($"[{prop}],"); });

            insertQuery
                .Remove(insertQuery.Length - 1, 1)
                .Append(@")
                            OUTPUT INSERTED.ID
                            VALUES (");

            properties.ForEach(prop => { insertQuery.Append($"@{prop},"); });

            insertQuery
                .Remove(insertQuery.Length - 1, 1)
                .Append(")");

            return insertQuery.ToString();
        }
    }
}
