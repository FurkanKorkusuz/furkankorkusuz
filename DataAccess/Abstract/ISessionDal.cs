using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Abstract
{
   public interface ISessionDal
    {
        Visitor Get(int id);
        int Add(int? UserID, string IPAdress);

        VisitorInSession GetVisitorInSession(string id);

        void UpdateModifiedDate(int id);

    }
}
