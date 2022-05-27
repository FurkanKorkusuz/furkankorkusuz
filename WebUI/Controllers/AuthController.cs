using Business.Abstract;
using Core.Entities.DTOs;
using Core.Utilities.IoC;
using Core.Utilities.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.Security.Claims;

namespace WebUI.Controllers
{
    public class AuthController : Controller
    {
        private IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(UserForLoginDto userForLoginDto)
        {
            var userToLogin = _authService.Login(userForLoginDto);
            if (!userToLogin.Success)
            {
                return Json(new ErrorResult());
            }
            _authService.CreateAccessToken(userToLogin.Data);
            IHttpContextAccessor _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
            var userId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var id = _httpContextAccessor.HttpContext.User.Identity;
            string uId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Json(new SuccessResult());
        }

        [HttpPost]
        public IActionResult Register(UserForRegisterDto entity)
        {
            var userExists = _authService.UserExist(entity.Email);
            if (!userExists.Success)
            {
                return Json(new ErrorResult(userExists.ErrorMessage));
            };
            var registerResult = _authService.Register(entity, entity.Password);
           return Json("Success:","true");
 

        }
    }
}
