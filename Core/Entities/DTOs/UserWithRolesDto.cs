using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities.DTOs
{
    public class UserWithRolesDto
    {
        public User User { get; set; }= new User();
        public OperationClaim Claims { get; set; } = new OperationClaim();
    }
}
