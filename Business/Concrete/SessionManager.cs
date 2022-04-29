using Business.Abstract;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete.Managers
{
    public class SessionManager : ISessionService
    {
     
        private ISessionDal _sessionDal;

        public SessionManager(ISessionDal sessionDal)
        {
            _sessionDal = sessionDal;
        }
        public int Add(int? UserID, string IPAdress)
        {
           return _sessionDal.Add(UserID,  IPAdress);
        }

        public Visitor Get(int id)
        {
            return _sessionDal.Get(id);
        }

        public VisitorInSession GetVisitorInSession(string id)
        {
            return _sessionDal.GetVisitorInSession(id);
        }

        public void UpdateModifiedDate(int id)
        {
            _sessionDal.UpdateModifiedDate(id);
        }


    }
}
