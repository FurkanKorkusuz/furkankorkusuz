using Core.DataAccess;
using Dapper;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DataAccess.Dapper;
using Core.DataAccess.Connections;

namespace DataAccess.Concrete.Dapper
{
    public class DpProjectDal : DapperGenericRepository<Project>, IProjectDal
    {


        public Project GetByUrlName(string urlName)
        {
            Project entity = null;
            string strSql = @"select  *, convert(varchar, CreatedDate, 104) CreatedDate, convert(varchar, ProjectDate, 104) ProjectDate
                                from Projects
                                where  UrlName=@UrlName";

            try
            {
                using (IDbConnection cn = new SqlConnectionTools().Connection)
                {
                    cn.Open();
                    entity = cn.QuerySingleOrDefault<Project>(strSql, new { UrlName = urlName });
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return entity;
        }

        public void UpdateImage(int id, string image)
        {
            string strSQL = @"
Update  Projects
set Image=@Image
where ID=@ID";
            var parameters = new
            {
                ID = id,
                Image = image
            };
            try
            {
                using (IDbConnection cn = new SqlConnectionTools().Connection)
                {
                    cn.Open();
                    cn.Execute(strSQL, parameters);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
