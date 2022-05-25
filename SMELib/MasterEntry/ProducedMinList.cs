using SMECommon;
using SMEModel.MasterEntry;
using Elmah;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMELib.MasterEntry
{
    public class ProducedMinList
    {
        public DataTable LoadUnit(ProducedMinDBModel _dbModel)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Set_Produced_Min", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@Factory", _dbModel.Factory);
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
        public int SaveProducedMin(ProducedMinDBModel _dbModel)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dCmd = new SqlCommand("Sp_Set_Produced_Min", conn);
            dCmd.CommandType = CommandType.StoredProcedure;
            try
            {
                dCmd.Parameters.AddWithValue("@SL", _dbModel.SL);
                dCmd.Parameters.AddWithValue("@Year", _dbModel.Year);
                dCmd.Parameters.AddWithValue("@MonthSL", _dbModel.MonthSL);
                dCmd.Parameters.AddWithValue("@Month", _dbModel.Month);
                dCmd.Parameters.AddWithValue("@Factory", _dbModel.Factory);
                dCmd.Parameters.AddWithValue("@Unit", _dbModel.Unit);
                dCmd.Parameters.AddWithValue("@UOM", _dbModel.UOM);
                dCmd.Parameters.AddWithValue("@PlannedMinutes", _dbModel.PlannedMinutes);
                dCmd.Parameters.AddWithValue("@AchievedMinutes", _dbModel.AchievedMinutes);
                dCmd.Parameters.AddWithValue("@AchievedPercentage", _dbModel.AchievedPercentage);
                dCmd.Parameters.AddWithValue("@Addedby", SMESessionVar.UserCode);
                if (_dbModel.SL > 0)
                    dCmd.Parameters.AddWithValue("@QryOption", 7);
                else
                    dCmd.Parameters.AddWithValue("@QryOption", 3);
                return dCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                dCmd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
        public DataTable LoadProducedMin()
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Set_Produced_Min", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
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
        public DataTable LoadSelectedProducedMin(ProducedMinDBModel _dbModel)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand("Sp_Set_Produced_Min", conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@SL", _dbModel.SL);
            dAd.Parameters.AddWithValue("@QryOption", 4);
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
        public int DeleteProducedMin(ProducedMinDBModel _dbModel)
        {
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dCmd = new SqlCommand("Sp_Set_Produced_Min", conn);
            dCmd.CommandType = CommandType.StoredProcedure;
            try
            {
                dCmd.Parameters.AddWithValue("@SL", _dbModel.SL);
                dCmd.Parameters.AddWithValue("@QryOption", 6);
                return dCmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                dCmd.Dispose();
                conn.Close();
                conn.Dispose();
            }
        }
    }
}