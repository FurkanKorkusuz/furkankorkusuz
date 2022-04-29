using Business.Abstract;
using Core.Entities.Concrete;
using Core.Utilities.Business;
using Core.Utilities.IoC;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class UserManager : BaseEntityManager<User> , IUserService
    {
        private IUserDal _userDal;
        public UserManager(IUserDal userDal) : base(userDal)
        {
            _userDal = userDal;
        }
        public IDataResult<List<OperationClaim>> GetClaimsByUserID(int userID)
        {
            try
            {
                
                return new SuccessDataResult<List<OperationClaim>>(_userDal.GetClaimsByUserID(userID));
            }
            catch (Exception)
            {
                return new ErrorDataResult<List<OperationClaim>>();
            }

        }

    }
}
