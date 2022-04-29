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

namespace Core.Aspects.Autofac.Logging
{
    public class DataBaseExceptionLogger :MethodInterception
    {
        private ILogDal _logDal;
        public DataBaseExceptionLogger()
        {
            _logDal= ServiceTool.ServiceProvider.GetService<ILogDal>();
        }


        private Log CreateLog(IInvocation invocation)
        {
            var logParameters = invocation.Arguments.Select(x =>
            new LogParameter
            {
                Value = x,
                Type = x.GetType().Name,

            }).ToList();

            var logDetail = new LogDetail
            {
                MethodName = invocation.Method.Name,
                LogParameters = logParameters
            };


            var log = new Log
            {
                Date=DateTime.Now,
                Detail = Newtonsoft.Json.JsonConvert.SerializeObject(logDetail),
                Audit=1 // Error
            };
            return log;
        }
    }
}
