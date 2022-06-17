using Core.DependencyResolvers;
using Core.Extensions;
using Core.Utilities.IoC;
using Core.Utilities.Security.Authentication.Utils;
using Core.Utilities.Security.Encryption;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API
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

            services.AddControllers();

            // Eklemem gereken servisleri bu �ekilde ekleyebilirim ancak kendi servis Tool umu yazarak buray� de�i�tirmeden Core katman�nda m�dahele edebilirim. �leride yani proje olu�turursam servislerim core dan ekli gelir.
            // services.AddMemoryCache();

            // Yukar�daki eklemeyi yapmak yerine Core dan ekledi�im servisleri burada �al��t�rmak i�in
            services.AddDependencyResolvers(new ICoreModule[]
            {
                new CoreModule(),
            });



            // Cors webAp� ye eri�imlerin vc kontrol edild�i bir yer.
            // �rne�in bu site alkapida.com domaini ile yay�nlanacaksa bu web ap� nin orjinal kullan�c�s� (ya da admin gibi bir�ey) bu domain olacakt�r. O zaman builder.WithOrigins("https://alkapida.com")  yaz�lmal�d�r.
            services.AddCors(options =>
            {
                options.AddPolicy(name: "MyPolicy",
                                 builder =>
                                 {
                                     //builder.WithOrigins("https://localhost:3000"
                                     //                    ,
                                     //                    "https://localhost:44354"
                                     //                    //"http://localhost:44354/Auth/Login"
                                     //                    );
                                     builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();

                                 });

            });



            // appsettings deki tokenOptions u oku
            var tokenOptions = Configuration.GetSection("TokenOptions").Get<TokenOptions>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    // Issuer bilgisi token dan al�ns�n m�
                    ValidateIssuer = true,

                    // Audience  bilgisi token dan al�ns�n m�
                    ValidateAudience = true,

                    // token �n ya�am �mr�n� kontrol etsin mi (yoksa token hep gecerli olur.)
                    ValidateLifetime = true,

                    ValidIssuer = tokenOptions.Issuer,
                    ValidAudience = tokenOptions.Audience,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = SecurityKeyHelper.CreateSecurityKey(tokenOptions.SecurityKey),
                };
            });


            // JSON stringlerimde nesnelerimin ad�n� camelCase yap�yordu ancak ben default olarak yaz�ld��� gibi gelmesini istedim. 
            services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

            // Swagger �al��t�rmak i�in.
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
            }

            //Exception i�in yazd���m�z middleware
            app.ConfigureCustomExceptionMiddleware();

            // Yukar�da Cors ekledik burada �a��rmam�z laz�m (burada s�ra �nemli.)
            // Buradaki builder http://localhost:3000 sitesinden gelen her t�rl� (get,post,put,delete) istege cevap ver demektir. 


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("MyPolicy");

            // Sonradan eklendi. 
            app.UseAuthentication(); // API ye kimler eri�ebilir.

            app.UseAuthorization(); // Ap� deki hangi mmetodlara kimler  eri�ebilir



            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers()
                .RequireCors("MyPolicy");
            });
        }
    }
}
