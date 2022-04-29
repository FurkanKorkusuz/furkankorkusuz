using FluentValidation;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Core.Extensions
{
    public class ExceptionMiddleware
    {
        /// <summary>
        /// Startup konfigrasyonundaki sırasıyla çalışan işlemler. ( app.UseAuthentication)
        /// </summary>
        private RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        /// <summary>
        /// Eğer hata oluşursa yakalasın ve benim yazdıgım metoda göndersin.
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception e)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

            string message = "Bir hata oluştu.";

            // Validasyondaki hataları kullanıcıya göstermek için tuttum.
            if (e.GetType() == typeof(ValidationException)) 
            {
                message = e.Message;
            }

            return context.Response.WriteAsync(new ErrorDetails
            {
                StatusCode = context.Response.StatusCode,
                Message = message
            }.ToString()) ;
        }
    }
}
