using Business.Abstract;
using Core.DataAccess;
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
    public class MissionManager : BaseEntityManager<Mission>, IMissionService
    {
        private IMissionDal _missionDal;
        public MissionManager(IMissionDal dal) : base(dal)
        {
            _missionDal = dal;
        }

    }
}
