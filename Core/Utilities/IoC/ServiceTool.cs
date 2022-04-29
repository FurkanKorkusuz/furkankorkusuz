using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Utilities.IoC
{
    public static class ServiceTool
    {
        // Mevcut provider a erişim.
        public static IServiceProvider ServiceProvider { get; set; }

        /// <summary>
        /// bu yapı ile .net core un kendi servislerine de erişebiliyorum.
        /// </summary>
        /// <param name="service"> Start up daki IServiceCollection ı bulur.</param>
        /// <returns></returns>
        public static IServiceCollection Create(IServiceCollection services)
        {
            ServiceProvider = services.BuildServiceProvider();
            return services;
        }
    }
}
