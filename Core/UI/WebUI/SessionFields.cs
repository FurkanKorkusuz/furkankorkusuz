using Core.Utilities.IoC;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.UI.WebUI
{
    public static class SessionFields
    {
        public static LoggedOnUser User
        {
            get
            {
                IHttpContextAccessor httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();

                string userStr = httpContextAccessor.HttpContext.Session.GetString("user");
                if (string.IsNullOrEmpty(userStr))
                    return null;

                return JsonConvert.DeserializeObject<LoggedOnUser>(userStr);

            }
        }
    }
}
