using Business.Abstract;
using Core.DataAccess.Dapper;
using Core.Entities.Concrete;
using Core.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;

namespace WebUI.Controllers
{
    public class ProductController : Controller
    {
        private IProductService _productService;
        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        #region LİSTELEME İŞLEMLERi
        public IActionResult List()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetList(QueryParameter qp)
        {
            return Json(_productService.GetList(qp));
        }

        [HttpPost]
        public JsonResult Get(object pattern)
        {
            return Json(_productService.GetByPattern(pattern));
        }

        #endregion


        #region EKLEME İŞLEMLERİ
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Add(int a)
        {
            Product entity = new Product();
            entity.ProductName = "ÜRÜN 2";
            entity.ProductCode = "Urn_2";
            entity.UrlName = "furkankorkusuz.com";
            entity.CreatedDate = DateTime.Now.ToString();
            entity.BrandID = 2;
            entity.CategoryID = 1;
            entity.SupplierID = 1;
            entity.UnitID = 1;
            entity.CountryID = 1;
            entity.TaxID = 1;
            entity.ShowPrice = 19.95M;
            entity.CurrencyID = 1;
            entity.HasVariant = false;
            entity.StatusID = 1;

            return Json(_productService.Add(entity));
        }
        #endregion


    


      
   



        [HttpPost]
        public JsonResult Edit(Product entity)
        {
            return Json(_productService.Update(entity));
        }


        [HttpPost]
        public JsonResult Delete(int id)
        {
            return Json(_productService.Delete(id));
        }
    }
}
