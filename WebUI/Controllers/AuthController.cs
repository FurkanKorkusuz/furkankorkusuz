using Business.Abstract;
using Core.Entities.DTOs;
using Core.Utilities.Results;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult Logon(UserForLoginDto userForLoginDto)
        {
            var userToLogin = _authService.Login(userForLoginDto);
            if (!userToLogin.Success)
            {
                return Json(new ErrorResult());
            }
           var token= _authService.CreateAccessToken(userToLogin.Data).Data;
            return Json(new SuccessResult());
        }

        [HttpPost]
        public IActionResult Register(UserForRegisterDto entity)
        {
            var userExists = _authService.UserExist(entity.Email);
            if (!userExists.Success)
            {
                return Json(new ErrorResult(userExists.ErrorMessage));
            }
            var registerResult = _authService.Register(entity, entity.Password);
            //_authService.CreateAccessToken(registerResult.Data);
           return Json(registerResult);
 

        }
    }
}
