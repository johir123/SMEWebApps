using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMEModel.LogIn
{
    public class LogInDBModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmpImage { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string EMail { get; set; }
        public string Unit { get; set; }
        public string Department { get; set; }
        public string Designation { get; set; }
        public string LeaveapproveAuthority { get; set; }
        public string LeaveRecommendAuthority { get; set; }
    }
    public class ResetPasswordDBModel
    {
        public string UserCode { get; set; }
        public string ResetPassword { get; set; }
        public string EncryptedPassword { get; set; }
    }
    public class ChangePasswordDBModel
    {
        public string UserCode { get; set; }
        public string NewPassword { get; set; }
    }

    public class ActionList
    {
        public string UserCode { get; set; }
        public string ButtonId { get; set; }
        public string ButtonName { get; set; }
        public string Save { get; set; }
        public string Update { get; set; }
    }
}
