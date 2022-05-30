using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Validation;
using Core.Entities.Concrete;
using Core.Utilities.Business;
using Core.Utilities.Results;
using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Concrete
{
    public class ProductManager : BaseEntityManager<Product>, IProductService
    {
        IProductDal _productDal;
        public ProductManager(IProductDal productDal) : base(productDal)
        {
            _productDal = productDal;
        }

        [ValidationAspect(typeof(ProductValidator))]
        public override IDataResult<Product> Add(Product entity)
        {
            return base.Add(entity);
        }
    }
}
