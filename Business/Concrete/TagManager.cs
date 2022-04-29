using Business.Abstract;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete.Managers
{
     public class TagManager : BaseEntityManager<Tag>, ITagService
    {
        ITagDal _tagDal;
        public TagManager(ITagDal dal) : base(dal)
        {
            _tagDal = dal;
        }

    }
}
