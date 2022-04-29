using Castle.DynamicProxy;
using Core.CrossCuttingConcerns.Logging;
using Core.DataAccess.Abstract;
using Core.Entities.Concrete;
using Core.Utilities.Interceptors.Autofac;
using Core.Utilities.IoC;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Aspects.Autofac.Exceptions
{
    public class ExceptionLogAspect :MethodInterception
    {
        private ILogDal _logDal;
        public ExceptionLogAspect()
        {
            _logDal = ServiceTool.ServiceProvider.GetService<ILogDal>();
        }
        protected override void OnException(IInvocation invocation, System.Exception ex)
        {
                _logDal.Add(CreateLog(invocation, ex));          
        }

        private Log CreateLog(IInvocation invocation, Exception ex)
        {
            var logParameters = new List<LogParameter>();
            for (int i = 0; i < invocation.Arguments.Length; i++)
            {
                logParameters.Add(new LogParameter
                {
                    Name = invocation.GetConcreteMethod().GetParameters()[i].Name,
                    Value = invocation.Arguments[i],
                    Type = invocation.Arguments[i].GetType().Name
                });
            }

            var logDetailWithException = new LogDetailWithException
            {
                MethodName = $"{invocation.TargetType.FullName}.{invocation.Method.Name}",
                LogParameters = logParameters,
                ExceptionMessage=ex.Message
            };


            var log = new Log
            {
                Date = DateTime.Now,
                Detail = Newtonsoft.Json.JsonConvert.SerializeObject(logDetailWithException),
                Audit = 1 // Error
            };
            return log;
        }
    }
}
