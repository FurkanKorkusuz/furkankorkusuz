using Autofac;
using Autofac.Extras.DynamicProxy;
using Business.Abstract;
using Business.Concrete;
using Castle.DynamicProxy;
using Core.Utilities.Interceptors.Autofac;
using Core.Utilities.Security.Authentication.JWT;
using Core.Utilities.Security.Authentication.Utils;
using DataAccess.Abstract;
using DataAccess.Concrete.Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.DependencyResolvers.Autofac
{
    public class BusinessModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            builder.RegisterType<BrandManager>().As<IBrandService>();
            builder.RegisterType<DpBrandDal>().As<IBrandDal>();

            builder.RegisterType<UserManager>().As<IUserService>();
            builder.RegisterType<DpUserDal>().As<IUserDal>();


            builder.RegisterType<AuthManager>().As<IAuthService>();
            builder.RegisterType<JWTHelper>().As<ITokenHelper>();

            // Mevcut assembly' ye ulaş.
            var assembly = System.Reflection.Assembly.GetExecutingAssembly();

            // builder.RegisterAssemblyTypes(assembly) >>>>> bu assembly deki tüm tipleri kaydet.
            // ProxyGenerationOptions() >>> araya girme
            // Selector >>> araya girecek olan nesne
            builder.RegisterAssemblyTypes(assembly).AsImplementedInterfaces()
                .EnableInterfaceInterceptors(new ProxyGenerationOptions()
                {
                    Selector = new AspectInterceptorSelector()
                }).SingleInstance();
        }
    }
}
