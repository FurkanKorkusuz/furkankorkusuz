﻿using Core.Entities.Concrete;
using Core.Utilities.Business;
using Core.Utilities.Results;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Abstract
{
    public interface IUserService : IEntityService<User>
    {
        IDataResult<List<OperationClaim>> GetClaimsByUserID(int userID);
    }
}
