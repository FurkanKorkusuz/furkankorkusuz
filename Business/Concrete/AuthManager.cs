using Business.Abstract;
using Core.Entities.Concrete;
using Core.Utilities.Messages;
using Core.Utilities.Results;
using Core.Utilities.Security.Authentication.Utils;
using Core.Utilities.Security.Hashing;
using Core.Entities.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Core.Utilities.IoC;
using Microsoft.Extensions.DependencyInjection;

namespace Business.Concrete
{
    public class AuthManager : IAuthService
    {
        private IUserService _userService;
        private ITokenHelper _tokenHelper;
        IHttpContextAccessor _httpContextAccessor;
        public AuthManager(IUserService userService, ITokenHelper tokenHelper)
        {
            _userService = userService;
            _tokenHelper = tokenHelper; 
            _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
        }
        public IDataResult<AccessToken> CreateAccessToken(User user)
        {
            var claims = _userService.GetClaimsByUserID(user.ID);
            var accessToken = _tokenHelper.CreateToken(user, claims.Data);
            return new SuccessDataResult<AccessToken>(accessToken);
        }

        public IDataResult<User> Login(UserForLoginDto userForLoginDto)
        {
            // Kullanıcı var mı
           var usertoCheck=_userService.GetByPattern(new {Email= userForLoginDto.Email });
            if (!usertoCheck.Success || usertoCheck.Data==null)
            {
                return new ErrorDataResult<User>(AuthenticationMessage.UserNotFound, focus : "loginEmail");
            }

            //byte[] passwordHash, passwordSalt;
            //HashingHelper.CreatePasswordHash(userForLoginDto.Password, out passwordHash, out passwordSalt);

            // Şifre eşleşiyor mu
            if (! HashingHelper.VerifyPasswordHash(userForLoginDto.Password, usertoCheck.Data.PasswordHash, usertoCheck.Data.PasswordSalt))
            {
                return new ErrorDataResult<User>(AuthenticationMessage.PasswordError,focus : "loginPassword");
            }

            return usertoCheck;
        }

        public IDataResult<User> Register(UserForRegisterDto userForRegisterDto, string password)
        {
            byte[] passwordHash, passwordSalt;
            HashingHelper.CreatePasswordHash(password, out passwordHash, out passwordSalt);
            var user = new User
            {
                Email = userForRegisterDto.Email,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Status = true

            };
            _userService.Add(user);
            return new SuccessDataResult<User>(user,"",AuthenticationMessage.UserRegistired);
        }

        public IResult UserExist(string email)
        {
            if (!_userService.GetByPattern(new {Email= email}, "Users").Success)
            {
                return new ErrorResult(AuthenticationMessage.UserAlreadyExists);
            }
            return new SuccessResult();
        }
    }
}
