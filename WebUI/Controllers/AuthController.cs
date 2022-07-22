using Business.Abstract;
using Core.Entities.DTOs;
using Core.Utilities.IoC;
using Core.Utilities.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

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
        public IActionResult Login2(UserForLoginDto userForLoginDto)
        {
            //var userToLogin = _authService.Login(userForLoginDto);
            //if (!userToLogin.Success)
            //{
            //    return Json(new ErrorResult());
            //}
            //_authService.CreateAccessToken(userToLogin.Data);
            return Json(new SuccessResult());


        }
        [HttpPost]
        public IActionResult Login(UserForLoginDto userForLoginDto)
        {
        var userToLogin = _authService.Login(userForLoginDto);
            if (!userToLogin.Success)
            {
                return Json(userToLogin);
            }
            var result = _authService.CreateAccessToken(userToLogin.Data);
         
            return Json(result);
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
