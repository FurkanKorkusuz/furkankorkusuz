using Castle.DynamicProxy;
using Core.Extensions;
using Core.UI.WebUI;
using Core.Utilities.Interceptors.Autofac;
using Core.Utilities.IoC;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;

namespace Business.BusinessAspects.Autofac
{
    public class SecuredOperation : MethodInterception
    {
        private string[] _roles;
        public SecuredOperation(string roles)
        {
            _roles=roles.Split(',');
        }
        protected override void OnBefore(IInvocation invocation)
        {
            if (SessionFields.User == null)
            {
               throw  new AuthenticationException(Core.Utilities.Messages.AuthenticationMessage.NotLogin);
            }


            if (!SessionFields.User.HasRoles(_roles))
            {
                throw new AuthenticationException(Core.Utilities.Messages.AuthenticationMessage.UnAuthorize);            
            }


        }
    }
}
