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
using Core.Entities.Concrete;

namespace Business.Concrete.Managers
{
    public class CommentManager : BaseEntityManager<Comment>, ICommentService
    {
        ICommentDal _CommentDal;
        public CommentManager(ICommentDal dal) : base(dal)
        {
            _CommentDal = dal;
        }

   

    }
}
