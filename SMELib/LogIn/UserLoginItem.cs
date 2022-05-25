using System;
using System.Data;
using System.IO;
using System.ComponentModel;
using SMEModel.LogIn;
using SMECommon;
using System.Web.Hosting;
using System.Drawing;
using System.Drawing.Imaging;
using Elmah;

namespace SMELib.LogIn
{
    public class UserLoginItem
    {
        public bool GetLogInInfo(string userName, string password)
        {
            bool IsTrue = false;
            UserLoginList _ItemList = new UserLoginList();
            try
            {
                DataTable dt = _ItemList.GetLogInInfo(userName, password);
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        LogInDBModel _DBModel = new LogInDBModel();
                        SMESessionVar.UserCode = dr["EmpCode"].ToString();
                        SMESessionVar.EmployeeName = dr["EmpName"].ToString();
                        SMESessionVar.ProfileImage = "P_Image.png";
                        //SMESessionVar.EMail = dr["Email"].ToString();
                        //SMESessionVar.Unit = dr["Unit"].ToString();
                        //SMESessionVar.Department = dr["Department"].ToString();
                        //SMESessionVar.Designation = dr["Designation"].ToString();
                        //SMESessionVar.EmpImage = dr["EmpImage"].ToString();
                        //SMESessionVar.CompanyID = dr["CompanyID"].ToString();
                        //SMESessionVar.CompanyName = dr["CompanyName"].ToString();
                        //string _imgPathName = HostingEnvironment.MapPath("/EmpImages/I" + dr["UserCode"].ToString() + ".png");

                        //if (!File.Exists(_imgPathName) && dr["EmpImage"].ToString() != "")
                        //{
                        //    string path = HostingEnvironment.MapPath("/EmpImages/I" + dr["UserCode"].ToString() + ".png");
                        //    FileInfo file = new FileInfo(path);
                        //    if (!file.Exists)
                        //    {

                        //        TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(Bitmap));
                        //        Bitmap bmp = (Bitmap)typeConverter.ConvertFrom(dr["EmpImage"]);

                        //        var Fs = new FileStream(HostingEnvironment.MapPath("~/EmpImages") + @"\I" + dr["UserCode"].ToString() + ".png", FileMode.Create);
                        //        bmp.Save(Fs, ImageFormat.Png);
                        //        bmp.Dispose();

                        //        Image img = Image.FromStream(Fs);
                        //        Fs.Close();
                        //        Fs.Dispose();

                        //        MemoryStream ms = new MemoryStream();
                        //        img.Save(ms, ImageFormat.Png);

                        //        ms.Close();
                        //        ms.Dispose();

                        //        SMESessionVar.ProfileImage = "I" + dr["UserCode"].ToString() + ".png";
                        //    }
                        //}
                        //else if (dr["EmpImage"].ToString() == "")
                        //{
                        //    SMESessionVar.ProfileImage = "P_Image.png";
                        //}
                        //else
                        //{
                        //    SMESessionVar.ProfileImage = "I" + dr["UserCode"].ToString() + ".png";
                        //}
                    }

                    IsTrue = true;
                }
                else
                {
                    IsTrue = false;
                }
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

            }
            return IsTrue;
        }

        public string ResetPassword(ResetPasswordDBModel model)
        {
            UserLoginList _ItemList = new UserLoginList();
            return _ItemList.ResetPassword(model);
        }
        public int ChangePassword(ChangePasswordDBModel model)
        {
            UserLoginList _ItemList = new UserLoginList();
            return _ItemList.ChangePassword(model);
        }
        public bool GetBimobLogInInfo(string userName, string password)
        {
            bool IsTrue = false;
            UserLoginList _ItemList = new UserLoginList();
            try
            {
                DataTable dt = _ItemList.GetBimobLogInInfo(userName, password);
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        LogInDBModel _DBModel = new LogInDBModel();
                        SMESessionVar.UserName = dr["UserName"].ToString();
                        SMESessionVar.UserCode = dr["UserCode"].ToString();
                        SMESessionVar.EmployeeName = dr["EmployeeName"].ToString();
                        SMESessionVar.EMail = dr["Email"].ToString();
                        SMESessionVar.Unit = dr["Unit"].ToString();
                        SMESessionVar.Department = dr["Department"].ToString();
                        SMESessionVar.Designation = dr["Designation"].ToString();
                        SMESessionVar.EmpImage = dr["EmpImage"].ToString();
                        string _imgPathName = HostingEnvironment.MapPath("/EmpImages/I" + dr["UserCode"].ToString() + ".png");

                        if (!File.Exists(_imgPathName) && dr["EmpImage"].ToString() != "")
                        {
                            string path = HostingEnvironment.MapPath("/EmpImages/I" + dr["UserCode"].ToString() + ".png");
                            FileInfo file = new FileInfo(path);
                            if (!file.Exists)
                            {

                                TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(Bitmap));
                                Bitmap bmp = (Bitmap)typeConverter.ConvertFrom(dr["EmpImage"]);

                                var Fs = new FileStream(HostingEnvironment.MapPath("~/EmpImages") + @"\I" + dr["UserCode"].ToString() + ".png", FileMode.Create);
                                bmp.Save(Fs, ImageFormat.Png);
                                bmp.Dispose();

                                Image img = Image.FromStream(Fs);
                                Fs.Close();
                                Fs.Dispose();

                                MemoryStream ms = new MemoryStream();
                                img.Save(ms, ImageFormat.Png);

                                ms.Close();
                                ms.Dispose();
                            }
                        }
                        else if (dr["EmpImage"].ToString() == "")
                        {
                            SMESessionVar.ProfileImage = "P_Image.png";
                        }
                        else
                        {
                            SMESessionVar.ProfileImage = "I" + dr["UserCode"].ToString() + ".png";
                        }
                    }

                    IsTrue = true;
                }
                else
                {
                    IsTrue = false;
                }
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

            }
            return IsTrue;
        }
        public bool GetAdminUserLogInInfo(LogInDBModel _dbModel)
        {
            bool IsTrue = false;
            UserLoginList _ItemList = new UserLoginList();
            try
            {
                DataTable dt = _ItemList.GetAdminUserLogInInfo(_dbModel);
                if (dt.Rows.Count > 0)
                {
                    foreach (DataRow dr in dt.Rows)
                    {
                        LogInDBModel _DBModel = new LogInDBModel();
                        SMESessionVar.UserName = dr["UserName"].ToString();
                        SMESessionVar.UserCode = dr["UserCode"].ToString();
                        SMESessionVar.EmployeeName = dr["EmployeeName"].ToString();
                        SMESessionVar.EMail = dr["Email"].ToString();
                        SMESessionVar.Unit = dr["Unit"].ToString();
                        SMESessionVar.Department = dr["Department"].ToString();
                        SMESessionVar.Designation = dr["Designation"].ToString();
                        SMESessionVar.EmpImage = dr["EmpImage"].ToString();
                        SMESessionVar.LeaveapproveAuthority = dr["LeaveApproval"].ToString();
                        SMESessionVar.LeaveRecommendAuthority = dr["LeaveRecommend"].ToString();
                        string _imgPathName = HostingEnvironment.MapPath("/EmpImages/I" + dr["UserCode"].ToString() + ".png");

                        if (!File.Exists(_imgPathName) && dr["EmpImage"].ToString() != "")
                        {
                            string path = HostingEnvironment.MapPath("/EmpImages/I" + dr["UserCode"].ToString() + ".png");
                            FileInfo file = new FileInfo(path);
                            if (!file.Exists)
                            {

                                TypeConverter typeConverter = TypeDescriptor.GetConverter(typeof(Bitmap));
                                Bitmap bmp = (Bitmap)typeConverter.ConvertFrom(dr["EmpImage"]);

                                var Fs = new FileStream(HostingEnvironment.MapPath("~/EmpImages") + @"\I" + dr["UserCode"].ToString() + ".png", FileMode.Create);
                                bmp.Save(Fs, ImageFormat.Png);
                                bmp.Dispose();

                                Image img = Image.FromStream(Fs);
                                Fs.Close();
                                Fs.Dispose();

                                MemoryStream ms = new MemoryStream();
                                img.Save(ms, ImageFormat.Png);

                                ms.Close();
                                ms.Dispose();

                                SMESessionVar.ProfileImage = "I" + dr["UserCode"].ToString() + ".png";
                            }
                        }
                        else if (dr["EmpImage"].ToString() == "")
                        {
                            SMESessionVar.ProfileImage = "P_Image.png";
                        }
                        else
                        {
                            SMESessionVar.ProfileImage = "I" + dr["UserCode"].ToString() + ".png";
                        }
                    }

                    IsTrue = true;
                }
                else
                {
                    IsTrue = false;
                }
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {

            }
            return IsTrue;
        }

        public bool IsEmailExists(string Email)
        {
            UserLoginList _ItemList = new UserLoginList();
            return _ItemList.IsEmailExists(Email);
        }
        public int ResetPassword(string Email,string Password)
        {
            UserLoginList _ItemList = new UserLoginList();
            return _ItemList.ResetPassword(Email,Password);
        }
    }
}



