using SMECommon;
using SMEModel.Menu;
using System;
using System.Data;
using System.Data.SqlClient;
using Elmah;
namespace SMELib.Menu
{
    public class MenuList
    {
        public int InsertMenu(MenuDBModel dbModel)
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dCmd = new SqlCommand("Sp_Set_Menus", conn) {CommandType = CommandType.StoredProcedure};
            try
            {
                dCmd.Parameters.AddWithValue("@ParentMenuId", Convert.ToInt32(dbModel.ParentMenuId));
                dCmd.Parameters.AddWithValue("@Title", dbModel.Title);
                dCmd.Parameters.AddWithValue("@Url", dbModel.Url);
                dCmd.Parameters.AddWithValue("@IconName", dbModel.IconName);
                dCmd.Parameters.AddWithValue("@Sequence", dbModel.Sequence);
                dCmd.Parameters.AddWithValue("@Department", dbModel.Department);
                dCmd.Parameters.AddWithValue("@UserGroupList", dbModel.UserGroupList);
                dCmd.Parameters.AddWithValue("@IsVisiable", Convert.ToBoolean(dbModel.IsVisiable));
                dCmd.Parameters.AddWithValue("@IsLogged", Convert.ToBoolean(dbModel.IsLogged));
                if (dbModel.MenusId > 0)
                {
                    dCmd.Parameters.AddWithValue("@QryOption", 2);
                    dCmd.Parameters.AddWithValue("@MenusId", Convert.ToInt32(dbModel.MenusId));
                    dCmd.Parameters.AddWithValue("@UpdatedBy", SMESessionVar.UserName);
                    
                }
                else
                {
                    dCmd.Parameters.AddWithValue("@QryOption", 1);
                    dCmd.Parameters.AddWithValue("@AddedBy", SMESessionVar.UserName);
                }

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
        public DataTable LoadAllGridMenu()
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dAd = new SqlCommand("Sp_Set_Menus", conn);
            var sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@EmployeeCode", SMESessionVar.UserCode);
            dAd.Parameters.AddWithValue("@QryOption", 9);
            var dSet = new DataTable();
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
        public DataTable LoadAllMenu()
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dAd = new SqlCommand("Sp_Set_Menus", conn);
            var sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@EmployeeCode", SMESessionVar.UserCode);
            dAd.Parameters.AddWithValue("@QryOption", 3);
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
        public DataTable LoadDashboardMenu()
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dAd = new SqlCommand("Sp_Get_Dashboard_SideMenu", conn);
            var sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@EmployeeID", SMESessionVar.UserCode);
            var dSet = new DataTable();
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
        public DataTable GetSelectedMenu(MenuDBModel dbModel) 
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dAd = new SqlCommand("Sp_Set_Menus", conn);
            var sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@MenusId", dbModel.MenusId);
            dAd.Parameters.AddWithValue("@QryOption", 5);
            var dSet = new DataTable();
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
        public int DeleteSelectedMenu(MenuDBModel dbModel)
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dCmd = new SqlCommand("Sp_Set_Menus", conn) {CommandType = CommandType.StoredProcedure};
            try
            {
                dCmd.Parameters.AddWithValue("@MenusId", dbModel.MenusId);
                dCmd.Parameters.AddWithValue("@QryOption", 4);
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
        public DataTable GetAllParentMenu()
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dAd = new SqlCommand("Sp_Set_Menus", conn);
            var sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@QryOption", 6);
            var dSet = new DataTable();
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
        public DataTable GetAllDepartmentList()
        {
            var conn = new SqlConnection(DBConnection.GetConnection());
            conn.Open();
            var dAd = new SqlCommand("Sp_Get_Utility", conn);
            var sda = new SqlDataAdapter(dAd);
            dAd.CommandType = CommandType.StoredProcedure;
            dAd.Parameters.AddWithValue("@QryOption", 1);
            var dSet = new DataTable();
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
