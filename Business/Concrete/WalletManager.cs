using Business.Abstract;
using Core.Utilities.Business;
using Core.Utilities.Results;
using Core.Utilities.Security.Authentication;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete.Managers
{
     public class WalletManager : BaseEntityManager<Wallet>, IWalletService
    {
        IWalletDal _walletDal;
        public WalletManager(IWalletDal dal) : base(dal)
        {
            _walletDal = dal;
        }

    }
}
