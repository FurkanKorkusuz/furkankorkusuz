using Business.Abstract;
using Core.Entities.Concrete;
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
        public IActionResult List()
        {
            return View();
        }

        #region EKLEME İŞLEMLERİ
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Add(int a)
        {
            Product entity = new Product();
            entity.ProductName = "ÜRÜN 1";
            entity.ProductCode = "Urn_1";
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
    }
}
