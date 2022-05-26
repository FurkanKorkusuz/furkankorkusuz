
using Business.Abstract;
using Core.DataAccess.Dapper;
using Core.Entities.Concrete;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Web.UI.MVC.Jquery.Controllers
{
    public class HomeController : Controller
    {
        IBrandService _service;

        public HomeController(IBrandService service)
        {
            _service = service;
        }

        public IActionResult Index()
        {
            _service.GetList(new QueryParameter());
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            ////    QueryParameter parameter3 = new QueryParameter();
            //string email = "furkankorkusuz2@gmail.com";
            //User user = new User();
            //user.Email = email;
            //user.FirstName = "Furkan";
            //_userService.GetByPattern(new { user.Email, user.FirstName });


            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

    }
}
