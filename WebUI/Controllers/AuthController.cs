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
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            using (var httpClient = new HttpClient())
            {
                httpClient.BaseAddress = new Uri("http://localhost:35743/Api");
                var request = new HttpRequestMessage(HttpMethod.Post, "/login");
                var data = new List<KeyValuePair<string, string>>();
                    data.Add(new KeyValuePair<string, string>("Email", userForLoginDto.Email));
                    data.Add(new KeyValuePair<string, string>("Password", userForLoginDto.Password));
                request.Content = new FormUrlEncodedContent(data);
                var response = httpClient.SendAsync(request).Result;
                return Json(response.Content.ReadAsStringAsync().Result);
            }
            //return Json("");
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
