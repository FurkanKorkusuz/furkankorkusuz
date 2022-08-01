using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.UI.WebUI
{
    public sealed class LoggedOnUser
    {
        private User _user;
        private List<OperationClaim> _claims;

        public LoggedOnUser(User user, List<OperationClaim> claims)
        {
            this._user = user;
            this._claims = claims;
        }

        internal string GetUsername()
        {
            return _user.FirstName;
        }


        public User GetUser()
        {
            return _user;
        }

        internal int ID { get { return _user.ID; } }



        public  bool HasRole(string role)
        {
            if (_claims == null || _user == null)
            {
                return false;
            }
            if (_claims.Any(x => x.OperationClaimName == "Admin"))
                return true;

           return _claims.Any(x => x.OperationClaimName == role);
          
        }

        public bool HasRoles(string[] roles)
        {
            if (_claims==null || _user == null)
            {
                return false;
            }
            if (_claims.Any(x => x.OperationClaimName == "Admin"))
                return true;
            foreach (string role in roles)
            {
                if (_claims.Any(x => x.OperationClaimName == role))
                {
                    return true;
                } 
            }
            return false;

        }
        public bool IsAdmin()
        {
            if (_claims == null || _user == null)
            {
                return false;
            }
            return _claims.Any(x => x.OperationClaimName == "Admin");
        }
    }
}
