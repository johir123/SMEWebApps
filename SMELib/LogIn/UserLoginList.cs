using Elmah;
using SMECommon;
using SMEModel.LogIn;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Net;

namespace SMELib.LogIn
{
    public class UserLoginList
    {
        public DataTable GetLogInInfo(string userName, string password)
        {
            string hostName = Dns.GetHostName();
            string LoginIP = "";
            var LoginMachineName = "";
            
            if (!string.IsNullOrEmpty(Environment.MachineName.ToString()))
            {
                LoginMachineName = Environment.MachineName.ToString();
            }
            else
            {
                LoginMachineName = "Machine Name Not Found..!";
            }

            LoginMachineName = GetLocalIPAddress();
            string PCName = Environment.MachineName;

            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Get_LogInInfo", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@UserName", userName);
            dAd.Parameters.AddWithValue("@Password", password);
            //dAd.Parameters.AddWithValue("@PCName", PCName);
            //dAd.Parameters.AddWithValue("@LoginMachineName", LoginMachineName);
            dAd.Parameters.AddWithValue("@QryOption", 1);
            DataTable dSet = new DataTable();
            try
            {
                sda.Fill(dSet);
                return dSet;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

                dSet.Dispose();
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public static string GetLocalIPAddress()
        {
            System.Web.HttpContext context = System.Web.HttpContext.Current;
            string ipAddress = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];

            if (!string.IsNullOrEmpty(ipAddress))
            {
                string[] addresses = ipAddress.Split(',');
                if (addresses.Length != 0)
                {
                    return addresses[0];
                }
            }

            return context.Request.ServerVariables["REMOTE_ADDR"];
        }
        public string ResetPassword(ResetPasswordDBModel model)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("BIMOB_MVC..sp_reset_pwd_bimob", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@UserCode", model.UserCode);
            dAd.Parameters.AddWithValue("@RandomPwd", model.ResetPassword);
            dAd.Parameters.AddWithValue("@EncryptedPwd", model.EncryptedPassword);

            ;
            try
            {
                using (SqlDataReader dr = dAd.ExecuteReader())
                {
                    string response = "";
                    while (dr.Read())
                    {
                        response = dr["ResponseText"].ToString();
                    }
                    return response;
                }
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {


                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public int ChangePassword(ChangePasswordDBModel model)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Reset_Pwd_Bimob", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@UserCode", model.UserCode);
            dAd.Parameters.AddWithValue("@EncryptedPwd", model.NewPassword);
            dAd.Parameters.AddWithValue("@EmployeeCode", SMESessionVar.UserCode);
            dAd.Parameters.AddWithValue("@isMail", 1);
            try
            {
                int result = dAd.ExecuteNonQuery();
                return result;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public DataTable GetBimobLogInInfo(string userName, string password)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Get_LogInInfo", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@UserName", userName);
            dAd.Parameters.AddWithValue("@Password", password);
            dAd.Parameters.AddWithValue("@QryOption", 2);
            DataTable dSet = new DataTable();
            try
            {
                sda.Fill(dSet);
                return dSet;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

                dSet.Dispose();
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public DataTable GetAdminUserLogInInfo(LogInDBModel _dbModel)
        {
            var LoginMachineName = "";
            if (!string.IsNullOrEmpty(Environment.MachineName.ToString()))
            {
                LoginMachineName = Environment.MachineName.ToString();
            }
            else
            {
                LoginMachineName = "Machine Name Not Found..!";
            }

            LoginMachineName = GetLocalIPAddress();
            string PCName = Environment.MachineName;

            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Get_LogInInfo", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@UserName", _dbModel.UserName);
            dAd.Parameters.AddWithValue("@EmployeeCode", _dbModel.EmployeeCode);
            dAd.Parameters.AddWithValue("@LoginMachineName", LoginMachineName);
            dAd.Parameters.AddWithValue("@PCName", PCName);
            dAd.Parameters.AddWithValue("@LogEmployeeCode", SMESessionVar.UserCode);
            dAd.Parameters.AddWithValue("@QryOption", 5);
            DataTable dSet = new DataTable();
            try
            {
                sda.Fill(dSet);
                return dSet;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

                dSet.Dispose();
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public bool IsEmailExists(string Email)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("SELECT COUNT(*) FROM [SystemManager].dbo.tblUser WHERE Email=@Email AND IsActive = 1", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.Text;
            dAd.Parameters.AddWithValue("@Email", Email);
            DataTable dSet = new DataTable();
            try
            {
                if (dSet.Rows.Count > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

                dSet.Dispose();
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public int ResetPassword(string Email, string Password)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Get_LogInInfo", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.Text;
            dAd.Parameters.AddWithValue("@Email", Email);
            dAd.Parameters.AddWithValue("@Password", Password);

            dAd.Parameters.AddWithValue("@QryOption", 8);
            DataTable dSet = new DataTable();
            try
            {
                return dAd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

                dSet.Dispose();
                dAd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
    }
}
