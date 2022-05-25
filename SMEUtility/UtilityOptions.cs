using System.Data.SqlClient;
using System.Data;
using System;
using SMEModel.Common;
using Elmah;
using System.Collections.Generic;
using SMECommon;
using System.Linq;

namespace SMEUtility
{
    public class UtilityOptions
    {
        public List<DropdownDBModel> LoadDDLValuesWithEmployeeCode(DropdownDBModel _dbModel)
        {
            List<DropdownDBModel> _DBModelList = new List<DropdownDBModel>();
            SqlConnection conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            SqlCommand dAd = new SqlCommand(_dbModel.SpName, conn);
            SqlDataAdapter sda = new SqlDataAdapter(dAd);
            dAd.Parameters.AddWithValue("@QryOption", _dbModel.QryOption);
            if (!String.IsNullOrEmpty(_dbModel.EmployeeCode))
                dAd.Parameters.AddWithValue("@EmployeeCode", _dbModel.EmployeeCode);
            if (!String.IsNullOrEmpty(_dbModel.Param1))
                dAd.Parameters.AddWithValue("@Param1", _dbModel.Param1);

            dAd.CommandType = CommandType.StoredProcedure;
            try
            {
                DataTable dt = new DataTable();
                sda.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    _DBModelList = (from DataRow row in dt.Rows
                                    select new DropdownDBModel
                                    {
                                        Code = row["Code"].ToString(),
                                        Value = row["Value"].ToString()
                                    }).ToList();
                }

                return _DBModelList;

            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                _DBModelList = null;
            }
        }
    }
}