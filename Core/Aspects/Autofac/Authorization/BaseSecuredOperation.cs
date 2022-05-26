using Castle.DynamicProxy;
using Core.Extensions;
using Core.Utilities.Interceptors.Autofac;
using Core.Utilities.IoC;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Aspects.Autofac.Authorization
{
    public class BaseSecuredOperation : MethodInterception
    {
        private string _methodName;
        private IHttpContextAccessor _httpContextAccessor;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="roles"></param>
        public BaseSecuredOperation(string methodName)
        {
            _methodName = methodName;
            _httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
        }
        // Entity lere  generic crud ve table name ile ilgili dataların tutlacağı ve Tentitiy ile typeOf dan çekilebilecek class oluştur.
        protected override void OnBefore(IInvocation invocation)
        {
            var type = invocation.MethodInvocationTarget.Name;
            var roleClaims = _httpContextAccessor.HttpContext.User.ClaimRoles();
            if (roleClaims.Contains("Admin"))
            {
                return;
            }
            //foreach (var role in _roles)
            //{
            //    if (roleClaims.Contains(role))
            //    {
            //        return;
            //    }
            //}
            throw new Exception(Utilities.Messages.AuthenticationMessage.UnAuthorize);
        }
    }
}
