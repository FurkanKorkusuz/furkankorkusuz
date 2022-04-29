using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Dapper
{
    public class QueryFilter
    {
        public string FilterKey { get; set; }
        public object FilterValue { get; set; }
        public ConditionOperator conditionOperator { get; set; } = ConditionOperator.Equals;

        public enum ConditionOperator
        {
            Equals,
            EqualsNot,

            Bigger,
            Smaller,

            EqBigger,
            EqSmaller,

            In,
            NotIn,

            Like,
            NotLike,


            //IsNot,
            //Is
        }

     

    }
}
