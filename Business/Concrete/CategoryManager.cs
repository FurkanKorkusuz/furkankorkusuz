using Business.Abstract;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using Core.Entities.DTOs;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DataAccess.Dapper;

namespace Business.Concrete.Managers
{

    public class CategoryManager : BaseEntityManager<Category>, ICategoryService
    {
        ICategoryDal _categoryDal;
        public CategoryManager(ICategoryDal dal) : base(dal)
        {
            _categoryDal = dal;
        }

    }

}
