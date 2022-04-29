using Business.Abstract;
using Core.Entities.Concrete;
using Core.Entities.DTOs;
using Core.Utilities.Results;
using Core.Utilities.Security.Authentication;
using DataAccess.Abstract;
using System;
using System.Web;
using System.Collections.Generic;
using Core.Utilities.Business;

namespace Business.Concrete.Managers
{
    public class BlogManager : BaseEntityManager<Blog>, IBlogService
    {
        IBlogDal _blogDal;
        public BlogManager(IBlogDal blogDal):base(blogDal)
        {
            _blogDal = blogDal;
        }
    }
}
