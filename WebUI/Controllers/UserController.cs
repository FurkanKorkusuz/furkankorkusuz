using Business.Abstract;
using Core.DataAccess.Dapper;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    public class UserController : Controller
    {
        IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetList()
        {
            QueryParameter qp = new QueryParameter(); 
            return Json(_userService.GetList(qp));
        }

    }
}
