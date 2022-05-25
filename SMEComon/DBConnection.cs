using System;
using System.Configuration;

namespace SMECommon
{
    public class DBConnection
    {
        public static string GetConnection()
        {
            try
            {
                return ConfigurationManager.ConnectionStrings["SMECnnString"].ToString();

            }
            catch (Exception ce)
            {

                throw new ApplicationException("Unable to get DB Connection string from Config File. Contact Administrator" + ce);
            }
        }
    }
}