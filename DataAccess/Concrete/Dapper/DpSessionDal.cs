using Dapper;
using Core.DataAccess;
using DataAccess.Abstract;
using Core.Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.DataAccess.Connections;

namespace DataAccess.Concrete.Dapper
{
    public class DpSessionDal :ISessionDal
    {
        public int Add(int? UserID, string IPAdress)
        {
            int id = 0;
            string strSQL = @"
INSERT INTO Visitors(  UserID, IPAdress, VisitDate, LastModifiedDate)
OUTPUT INSERTED.ID
VALUES ( @UserID, @IPAdress, GETDATE(), GETDATE()) ";
            var parameters = new {
                UserID = UserID,
                IPAdress = IPAdress
            };
            try
            {
                using (IDbConnection cn = new SqlConnectionTools().Connection)
                {
                    cn.Open();
                    id = cn.ExecuteScalar<int>(strSQL, parameters);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return id;
        }

        public Visitor Get(int id)
        {
            Visitor entity = null;
            string strSql = @"select *
                              from Visitors 
                              where VisitorID=@VisitorID";
            var parameters = new { VisitorID = id };
            try
            {
                using (IDbConnection cn = new SqlConnectionTools().Connection)
                {
                    cn.Open();
                    entity = cn.QuerySingleOrDefault<Visitor>(strSql, parameters);
                }
            }
            catch (Exception ex)
            {
                string ddd = ex.Message;
                Exception err = ex.InnerException;
            }
            return entity;
        }

        public VisitorInSession GetVisitorInSession(string id)
        {
            VisitorInSession entity = null;
            string strSql = @"select v.ID, v.UserID
                              from Visitors v
                              where v.ID=@ID                           
                              ";
            var parameters = new { ID = id };
            try
            {
                using (IDbConnection cn = new SqlConnectionTools().Connection)
                {
                    cn.Open();
                    entity = cn.QuerySingleOrDefault<VisitorInSession>(strSql, parameters);
                }
            }
            catch (Exception ex)
            {
                string ddd = ex.Message;
            }
            return entity;
        }

        public void UpdateModifiedDate(int id)
        {
            string strSql = @"update Visitors
                                set LastModifiedDate=Getdate()
                                where ID=@ID";
            var parameters = new { ID = id };
            try
            {
                using (IDbConnection cn = new SqlConnectionTools().Connection)
                {
                    cn.Open();
                    cn.Execute(strSql, parameters);
                }
            }
            catch (Exception ex)
            {
                string ddd = ex.Message;
            }
        }

    }
}
