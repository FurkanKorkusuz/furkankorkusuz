using Core.DataAccess.Connections;
using Core.DataAccess.Dapper;
using Core.Entities.Concrete;
using Dapper;
using DataAccess.Abstract;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Concrete.Dapper
{
    public class DpUserDal : DapperGenericRepository<User>, IUserDal
    {
        public List<OperationClaim> GetClaimsByUserID(int userid)
        {

            List<OperationClaim> list = new List<OperationClaim>();
            string strSql = @"select *
                            from OperationClaims oc
                            join UserOperationClaims uoc on uoc.OperationClaimID = oc.ID
                            where uoc.UserID=@UserID";
            try
            {
                using (IDbConnection cn = new SqlConnectionTools().Connection)
                {
                    cn.Open();
                    list = cn.Query<OperationClaim>(strSql, new { UserID = userid }).ToList();
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return list;

        }
    }
}
