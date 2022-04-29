using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Dapper
{
    public class JoinParameter
    {
        public string LeftTableName { get; set; }
        public string RightTableName { get; set; }
        public List<string> LeftTableColumns { get; set; }
        public List<string> RightTableColumns { get; set; }


        /// <summary>
        /// default inner join 
        /// </summary>
        public JoinType joinType { get; set; } = JoinType.InnerJoin;
    }

    public enum JoinType
    {
        /// <summary>
        /// Her iki tabloda da eşleşen değerlere sahip kayıtları döndürür
        /// </summary>
        InnerJoin,


        /// <summary>
        /// Soldaki tablodaki tüm kayıtları ve sağdaki tablodaki eşleşen kayıtları döndürür
        /// </summary>
        LeftJoin,


        /// <summary>
        /// Sağdaki tablodaki tüm kayıtları ve soldaki tablodaki eşleşen kayıtları döndürür
        /// </summary>
        RightJoin,


        /// <summary>
        /// Sol veya sağ tabloda bir eşleşme olduğunda TÜM kayıtları döndürür
        /// </summary>
        OuterJoin,
    }
}
