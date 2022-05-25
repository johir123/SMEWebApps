using System;
using System.Collections.Generic;
using System.Data;
using SMEModel.Menu;
using SMEModel.UtilityModels;
using Elmah;
using SMECommon;
using System.Web;

namespace SMELib.Menu
{
    public class MenuItem
    {
        private MenuList objList;
        private MenuDBModel modelItem;
        private DashboardDBModel dashboardModelItem;
        private List<MenuDBModel> modelList;
        private List<DashboardDBModel> dashboardModelList;
        private List<DepartmentDBModel> dbModelList;
        private DepartmentDBModel dbModel;

        public int InsertMenu(MenuDBModel _dbModel)
        {
            this.objList = new MenuList();
            try
            {
                return objList.InsertMenu(_dbModel);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                objList = null;
            }
        }

        public List<MenuDBModel> LoadAllGridMenu()
        {
            this.modelList = new List<MenuDBModel>();
            try
            {
                this.objList = new MenuList();
                DataTable dt = this.objList.LoadAllGridMenu();
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        this.modelItem = new MenuDBModel
                        {
                            MenusId = Convert.ToInt32(dr["MenusId"].ToString()),
                            ParentMenuId = Convert.ToInt32(dr["ParentMenuId"].ToString()),
                            ParentMenuName = dr["ParentMenuName"].ToString(),
                            Title = dr["Title"].ToString(),
                            Url = dr["Url"].ToString(),
                            IconName = dr["IconName"].ToString(),
                            Sequence = Convert.ToInt32(dr["Sequence"].ToString()),
                            IsVisiable = Convert.ToBoolean(dr["IsVisiable"].ToString()),
                            IsLogged = Convert.ToBoolean(dr["IsLogged"].ToString()),
                            HeadIcon = dr["HeadIcon"].ToString()
                        };
                        this.modelList.Add(this.modelItem);
                    }
                }

                return this.modelList;
            }

            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                this.modelList = null;
            }
        }

        public List<MenuDBModel> LoadAllMenu()
        {
            this.modelList = new List<MenuDBModel>();
            try
            {
                this.objList = new MenuList();
                DataTable dt = objList.LoadAllMenu();
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        this.modelItem = new MenuDBModel
                        {
                            MenusId = Convert.ToInt32(dr["MenusId"].ToString()),
                            ParentMenuId = Convert.ToInt32(dr["ParentMenuId"].ToString()),
                            ParentMenuName = dr["ParentMenuName"].ToString(),
                            Title = dr["Title"].ToString(),
                            Url = dr["Url"].ToString(),
                            IconName = dr["IconName"].ToString(),
                            Sequence = Convert.ToInt32(dr["Sequence"].ToString()),
                            IsVisiable = Convert.ToBoolean(dr["IsVisiable"].ToString()),
                            IsLogged = Convert.ToBoolean(dr["IsLogged"].ToString()),
                            HeadIcon = dr["HeadIcon"].ToString()
                        };
                        this.modelList.Add(this.modelItem);
                    }
                }

                return this.modelList;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                this.modelList = null;
            }
        }
        public List<DashboardDBModel> LoadDashboardMenu()
        {
            this.dashboardModelList = new List<DashboardDBModel>();
            //try
            //{
            this.objList = new MenuList();
            UserEncryption _encrypt = new UserEncryption();
            DataTable dt = objList.LoadDashboardMenu();
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    var _EncryptUser = HttpUtility.UrlEncode(_encrypt.Encrypt(SMESessionVar.UserCode));
                    this.dashboardModelItem = new DashboardDBModel();

                    this.dashboardModelItem.MenusId = Convert.ToInt32(dr["MenusId"].ToString());
                    this.dashboardModelItem.ParentMenuId = Convert.ToInt32(dr["ParentMenuId"].ToString());
                    this.dashboardModelItem.ParentMenuName = dr["ParentMenuName"].ToString();
                    this.dashboardModelItem.Title = dr["Title"].ToString();
                    this.dashboardModelItem.Url = dr["Url"].ToString();
                    this.dashboardModelItem.IconName = dr["IconName"].ToString();
                    this.dashboardModelItem.DashBoardSequence = String.IsNullOrEmpty(dr["Sequence"].ToString()) ? 0 : Convert.ToDouble(dr["Sequence"].ToString());
                    this.dashboardModelItem.IsVisiable = Convert.ToBoolean(dr["IsVisiable"].ToString());
                    //this.dashboardModelItem.IsLogged = Convert.ToBoolean(dr["IsLogged"].ToString());
                    this.dashboardModelItem.HeadIcon = dr["HeadIcon"].ToString();
                    this.dashboardModelItem.EncryptedUserCode = _EncryptUser;
                    this.dashboardModelList.Add(this.dashboardModelItem);
                }
            }

            return this.dashboardModelList;
            //}
            //catch (Exception ex)
            //{
            //    ErrorSignal.FromCurrentContext().Raise(ex);
            //    throw ex;
            //}
            //finally
            //{
            //    this.modelList = null;
            //}
        }

        public List<MenuDBModel> GetSelectedMenu(MenuDBModel _dbModel)
        {
            this.modelList = new List<MenuDBModel>();
            try
            {
                this.objList = new MenuList();
                DataTable dt = objList.GetSelectedMenu(_dbModel);
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        this.modelItem = new MenuDBModel
                        {
                            MenusId = Convert.ToInt32(dr["MenusId"].ToString()),
                            ParentMenuId = Convert.ToInt32(dr["ParentMenuId"].ToString()),
                            Title = dr["Title"].ToString(),
                            Url = dr["Url"].ToString(),
                            IconName = dr["IconName"].ToString(),
                            Sequence = Convert.ToInt32(dr["Sequence"].ToString()),
                            Department = dr["Department"].ToString(),
                            UserGroupList = dr["UserGroupList"].ToString(),
                            IsVisiable = Convert.ToBoolean(dr["IsVisiable"].ToString()),
                            IsLogged = Convert.ToBoolean(dr["IsLogged"].ToString())
                        };
                        this.modelList.Add(this.modelItem);
                    }
                }

                return this.modelList;

            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                this.modelList = null;
            }
        }

        public int DeleteSelectedMenu(MenuDBModel _dbModel)
        {
            try
            {
                this.objList = new MenuList();
                return objList.DeleteSelectedMenu(_dbModel);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                objList = null;
            }
        }

        public List<MenuDBModel> GetAllParentMenu()
        {
            this.modelList = new List<MenuDBModel>();
            try
            {
                this.objList = new MenuList();
                DataTable dt = objList.GetAllParentMenu();
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        this.modelItem = new MenuDBModel
                        {
                            MenusId = Convert.ToInt32(dr["MenusId"].ToString()),
                            Title = dr["Title"].ToString()
                        };
                        this.modelList.Add(this.modelItem);
                    }
                }

                return this.modelList;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                this.modelList = null;
            }
        }

        public List<DepartmentDBModel> GetAllDepartmentList()
        {
            this.dbModelList = new List<DepartmentDBModel>();
            try
            {
                this.objList = new MenuList();
                DataTable dt = objList.GetAllDepartmentList();
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        this.dbModel = new DepartmentDBModel
                        {
                            Department = dr["Department"].ToString(),
                            DepartmentID = dr["DepartmentID"].ToString()
                        };
                        this.dbModelList.Add(this.dbModel);
                    }
                }

                return this.dbModelList;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                this.dbModelList = null;
            }
        }
    }
}

