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
using System.Web;

namespace Business.Concrete.Managers
{
    public class WalletOperationManager : BaseEntityManager<WalletOperation>, IWalletOperationService
    {
        IWalletOperationDal _walletOperationDal;

        //Bir Manager classından başka bir manager çağırmamızz gerektiğinde onun servisini (Business Soyut nesnesini) kullanırız.
        IWalletService _walletService;
        public WalletOperationManager(IWalletOperationDal dal) : base(dal)
        {
            _walletOperationDal = dal;
        }

    
    }
}
