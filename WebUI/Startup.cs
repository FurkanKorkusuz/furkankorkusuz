
using Core.DependencyResolvers;
using Core.Extensions;
using Core.Utilities.IoC;
using Core.Utilities.Security.Authentication.Utils;
using Core.Utilities.Security.Encryption;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebUI.Classes;

namespace Web.UI.MVC.Jquery
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            // Eklemem gereken servisleri bu þekilde ekleyebilirim ancak kendi servis Tool umu yazarak burayý deðiþtirmeden Core katmanýnda müdahele edebilirim. Ýleride yani proje oluþturursam servislerim core dan ekli gelir.
            // services.AddMemoryCache();
                   

            // Yukarýdaki eklemeyi yapmak yerine Core dan eklediðim servisleri burada çalýþtýrmak için
            services.AddDependencyResolvers(new ICoreModule[]
            {
                new CoreModule(),
            });
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();


            // Cors webApý ye eriþimlerin vc kontrol edildði bir yer.
            // Örneðin bu site alkapida.com domaini ile yayýnlanacaksa bu web apý nin orjinal kullanýcýsý (ya da admin gibi birþey) bu domain olacaktýr. O zaman builder.WithOrigins("https://alkapida.com")  yazýlmalýdýr.
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                                builder => builder.WithOrigins("http://localhost:3000"));
            });

            // appsettings deki tokenOptions u oku
            var tokenOptions = Configuration.GetSection("TokenOptions").Get<TokenOptions>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    // Issuer bilgisi token dan alýnsýn mý
                    ValidateIssuer = true,

                    // Audience  bilgisi token dan alýnsýn mý
                    ValidateAudience = true,

                    // token ýn yaþam ömrünü kontrol etsin mi (yoksa token hep gecerli olur.)
                    ValidateLifetime = true,

                    ValidIssuer = tokenOptions.Issuer,
                    ValidAudience = tokenOptions.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = SecurityKeyHelper.CreateSecurityKey(tokenOptions.SecurityKey),
                };
            });


            // JSON stringlerimde nesnelerimin adýný camelCase yapýyordu ancak ben default olarak yazýldýðý gibi gelmesini istedim. 
            services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);


            // Sonradan eklendi. 
            services.AddSession(options =>
                    options.IdleTimeout = TimeSpan.FromSeconds(5)
                );

            // Sonradan eklendi.
            //services.AddControllersWithViews(options =>
            //{
            //    options.Filters.Add(typeof(RequestAuthenticationFilter));
            //});

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //Exception için yazdýðýmýz middleware
            app.ConfigureCustomExceptionMiddleware();

            // Yukarýda Cors ekledik burada çaðýrmamýz lazým (burada sýra önemli.)
            // Buradaki builder http://localhost:3000 sitesinden gelen her türlü (get,post,put,delete) istege cevap ver demektir. 
            app.UseCors(builder => builder.WithOrigins("http://localhost:3000").AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            // Sonradan eklendi. 
            app.UseAuthentication(); // API ye kimler eriþebilir.

            app.UseAuthorization(); // Apý deki hangi mmetodlara kimler  eriþebilir

            // Sonradan eklendi. 
            app.UseSession(); //  Endpoints(sayfa yönlendirme) den önce olmasý gerek 

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
