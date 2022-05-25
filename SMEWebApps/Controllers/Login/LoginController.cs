using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Data;
using Elmah;
using SMEWebApps.Filters;
using SMECommon;
using SMELib.LogIn;
using SMEModel.LogIn;
using SMEUtility;

namespace SMEWebApps.Controllers
{
    public class LoginController : Controller
    {
        [NoFilter]
        public ActionResult Index()
        {
            try
            {
                if (Request.UrlReferrer != null)
                {
                    string _returnurl = Request.UrlReferrer.ToString();
                    if (Request.UrlReferrer.Query != "")
                    {
                        if (HttpUtility.ParseQueryString(_returnurl).GetValues("uId").LastOrDefault() != null)
                        {
                            Uri myUri = new Uri(_returnurl);
                            string _userCode = HttpUtility.ParseQueryString(_returnurl).GetValues("uId").LastOrDefault();
                            string _RedirectName = HttpUtility.ParseQueryString(myUri.Query).Get("cName");
                            LogInDBModel user = new LogInDBModel { UserName = _userCode, Password = "123" };
                            bool _success = GetLogInInfoFromUrl(user);
                            if (_success == true && _RedirectName == "PalnningDashboard")
                            {
                                return RedirectToAction("Index", "ManageDashboard");
                            }
                            else
                            {
                                return RedirectToAction("Index", "Login");
                            }
                        }

                    }
                    SMESessionVar.RedirectUrl = _returnurl;
                }
                else
                {
                    SMESessionVar.RedirectUrl = "";
                }
                return View();
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
        }

        [HttpPost]
        public JsonResult GetLogInInfo(LogInDBModel user)
        {

            UserLoginItem objItem = new UserLoginItem();
            Encryption objEncrypt = new Encryption();

            string userName = objEncrypt.EncryptWord(user.UserName.Trim());
            string password = objEncrypt.EncryptWord(user.Password.Trim());

            bool ItemList = objItem.GetLogInInfo(userName, password);

            if (ItemList == true)
            {
                FormsAuthentication.SetAuthCookie(user.UserName.Trim(), true);
                return Json(new { Success = "True" });
            }
            else
            {
                return Json(new { Success = "False" });
            }
        }
        [HttpPost]
        public bool GetLogInInfoFromUrl(LogInDBModel user)
        {

            UserLoginItem objItem = new UserLoginItem();
            Encryption objEncrypt = new Encryption();

            string userName = user.UserName;
            string password = user.Password;

            bool ItemList = objItem.GetBimobLogInInfo(userName, password);

            if (ItemList == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        [HttpPost]
        public JsonResult LogOutUser()
        {
            try
            {
                SMESessionVar.EmpImage = "";
                SMESessionVar.UserName = "";
                SMESessionVar.UserCode = "";
                SMESessionVar.EmployeeName = "";
                SMESessionVar.EMail = "";
                SMESessionVar.Unit = "";
                SMESessionVar.Department = "";
                SMESessionVar.Designation = "";
                SMESessionVar.RedirectUrl = "";
                Session.Clear();
                return Json(new { Success = "True" });
            }
            catch (Exception ex)
            {
                return Json(new { Success = "False" });
            }
        }

        [HttpPost]
        public JsonResult ResetPassword(string userCode)
        {
            UserLoginItem objItem = new UserLoginItem();
            Encryption objEncrypt = new Encryption();

            string randPwd = System.Web.Security.Membership.GeneratePassword(6, 0);
            string encPwd = Cipher.Encrypt(randPwd);
            string msg = objItem.ResetPassword(new ResetPasswordDBModel
            {
                UserCode = userCode,
                ResetPassword = randPwd,
                EncryptedPassword = encPwd
            });
            return Json(new { Data = msg });
        }
        [HttpPost]
        public JsonResult ChangePassword(string Password, string RepeatPassword)
        {
            UserLoginItem objItem = new UserLoginItem();
            Encryption objEncrypt = new Encryption();
            string status = "";
            if (Password == "" && RepeatPassword == "")
            {
                status = " Field Shouldn't Left Blank";
            }

            if (Password != RepeatPassword)
            {
                status = "Password doesn't match";
            }

            int count = objItem.ChangePassword(new ChangePasswordDBModel
            {
                NewPassword = objEncrypt.EncryptWord(Password),
                UserCode = SMESessionVar.UserName
            });
            if (count > 0)
            {
                status = "Your password has been changed successfully..";
            }
            else
            {
                status = "Error occured. Please try again later or contact support team..";
            }
            return Json(new { Data = status });
        }
        public ActionResult ResetPassword()
        {
            return View();
        }
        [HttpPost]
        public JsonResult RecoverPassword(string Email)
        {
            UserLoginItem objItem = new UserLoginItem();
            Encryption objEncrypt = new Encryption();
            int _result = 0;
            string _message = "";
            string _password = RandomString(6);
            string _encPassword = objEncrypt.EncryptWord(_password);
            bool _isEmailExists = objItem.IsEmailExists(Email);
            if (_isEmailExists)
            {
                objItem = new UserLoginItem();
                _result = objItem.ResetPassword(Email, _encPassword);
            }
            else
            {
                _result = 0;
                _message = "Email Not Found..!";
            }

            return Json(new { message = _message, success = _result });
        }
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}