using Business.Abstract;
using Core.Utilities.Business;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete.Managers
{

    
    public class VisitorManager : BaseEntityManager<Visitor>, IVisitorService
    {
        public VisitorManager(IVisitorDal dal) : base(dal)
        {
        }

      
    }

}
