using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Dapper
{

    public class QueryParameter
    {    /// <summary>
         /// GetAll ? true >>>>> select * from table 
         /// : false >>>>> select * from table where... order by ... offset  @RowNumber rows fetch next @RowPerPage rows
         /// </summary>
        public bool GetAll { get; set; } = false;

        /// <summary>
        /// kaçıncı kayıttan itibaren getirileceğini belirtir.
        /// </summary>
        public int RowNumber { get; set; } = 0;


        /// <summary>
        /// kaç kayıt getirileceğini belirtir.
        /// </summary>
        public int RowPerPage { get; set; } = 30;


        /// <summary>
        /// Maximum kaç adet kayıt getirileceğini belirtir.
        /// </summary>
        public int TopRow { get; set; } = 0;


        public string TableName { get; set; }



        /// <summary>
        /// Sıralama yapar string defaultOrderBy ile colon adı ve bool IsAscending ile yönü belirtilir.
        /// </summary>
        public List<QueryOrderBy> OrderBy { get; set; } = new List<QueryOrderBy>();


        /// <summary>
        /// Key value ve operation değerleri ile dinamik filtreler oluşturulur.
        /// </summary>
        public List<QueryFilter> FilterList { get; set; } = new List<QueryFilter>();


        /// <summary>
        /// Join, left join, outher join gibi ilişkilendirmeler buradan gönderirlir.
        /// </summary>
        public List<JoinParameter> Joins { get; set; } = new List<JoinParameter> { };


        /// <summary>
        /// Gruplama yapılacak kolonlar string olarak gönderilir.
        /// </summary>
        public List<string> GroupBy { get; set; }


        /// <summary>
        /// Karmaşık sorgularda özel durumlar için kullanılır 
        /// </summary>
        public string AddSelect { get; set; }


        /// <summary>
        /// sorguda hangi kolonların gösterileceği eğer null ise select * from çalışır.
        /// </summary>
        public List<string> Select { get; set; }
    }


}
