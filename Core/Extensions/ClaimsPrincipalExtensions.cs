using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static List<string> Claims(this ClaimsPrincipal claimsPrincipal, string claimType)
        {
            return  claimsPrincipal?.FindAll(claimType)?.Select(x=>x.Value).ToList();
        }

        /// <summary>
        /// Rollleri döndürür
        /// </summary>
        /// <param name="claimsPrincipal"></param>
        /// <returns></returns>
        public static List<string> ClaimRoles(this ClaimsPrincipal claimsPrincipal)
        {
            return claimsPrincipal?.Claims(ClaimTypes.Role);
        }

        public static bool IsAdmin(this ClaimsPrincipal claimsPrincipal)
        {
            return (bool)(claimsPrincipal?.Claims(ClaimTypes.Role).Contains("Admin"));
        }
    }
}
