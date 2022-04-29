using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    [Table("UserOperationClaims")]
    public class UserOperationClaim : IEntity
    {
        public int ID { get; set; }
        public int OperationClaimID { get; set; }
        public int UserID { get; set; }
    }
}
