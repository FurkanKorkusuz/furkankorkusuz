using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DataAccess.Connections
{
    public class SqlConnectionTools
    {
        public const bool UseTestDatabase = true;

        public static string ConnectionString
        {
            get
            {
                string server;

                if (UseTestDatabase)
                {
                    server = ".";
                }
                else
                {
                    server = ProductionServerConnectionString;
                }
                  // return string.Format("Server={0};Database=Aslan;Uid=furkank7_Aslan;Pwd=%5f$4K#3;pooling='true';Max Pool Size=400;", server);
                return string.Format("Server={0};Database=ECommerceDB;Uid=sa;Pwd=Alkapida.123;pooling='true';Max Pool Size=400;", server);
            }
        }

        /// <summary>
        /// Should only be needed in DEBUG mode, not while the
        /// application is deployed on the actual production server
        /// in RELEASE mode.
        /// </summary>
        public static string ProductionIP
        {
            get
            {

                return ".\\SQLEXPRESS";
            }
        }

        public static string ProductionServerConnectionString
        {
            get
            {


#if DEBUG
                return string.Format("{0}", SqlConnectionTools.ProductionIP);
#else
                return string.Format("{0}", SqlConnectionTools.ProductionIP);

#endif

            }
        }

        public SqlConnection Connection
        {
            get
            {
                return new SqlConnection(ConnectionString);
            }
        }

        public static void Out(string msg)
        {
            System.Diagnostics.Debug.Write(Environment.NewLine + msg);
        }
    }
}
