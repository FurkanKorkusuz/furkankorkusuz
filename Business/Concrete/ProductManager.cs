using Business.Abstract;
using Business.ValidationRules.FluentValidation;
using Core.Aspects.Autofac.Caching;
using Core.Aspects.Autofac.Validation;
using Core.DataAccess.Dapper;
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

        [CacheAspect]
        public override IDataResult<List<Product>> GetList(QueryParameter queryParameter)
        {
            //IHttpContextAccessor _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
            //byte[] token;
            //_httpContextAccessor.HttpContext.Session.TryGetValue("Token",out token);
            //var Token = Encoding.ASCII.GetString(token);
            return base.GetList(queryParameter);
        }
    }
}
