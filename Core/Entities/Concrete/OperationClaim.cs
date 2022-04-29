using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.Concrete
{
    [Table("OperationClaims")]
    public class OperationClaim : IEntity
    {
        public int ID {get; set;}
        public string OperationClaimName { get; set;}
    }
}
