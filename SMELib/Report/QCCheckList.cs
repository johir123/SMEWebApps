using Elmah;
using SMECommon;
using System;
using System.Data;
using System.Data.SqlClient;

namespace SMELib.Report
{
    public class QCCheckList
    {
        public DataSet LoadQCCheck(string Unit, string Buyer, string FromDate, string ToDate)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Set_QC_Check", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@Unit", Unit);
            dAd.Parameters.AddWithValue("@Buyer", Buyer);
            dAd.Parameters.AddWithValue("@FromDate", FromDate);
            dAd.Parameters.AddWithValue("@ToDate", ToDate);
            
            dAd.Parameters.AddWithValue("@QryOption", 2);
            DataSet dSet = new DataSet();
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
    }
}
