using System.Web;

namespace SMECommon
{
    public static class SMESessionVar
    {
        public static string UserCode
        {
            get
            {
                return HttpContext.Current.Session["UserCode"] as string;

            }
            set
            {
                HttpContext.Current.Session["UserCode"] = value;
            }
        }
        public static string UserName
        {
            get
            {
                return HttpContext.Current.Session["UserName"] as string;
            }
            set
            {
                HttpContext.Current.Session["UserName"] = value;
            }
        }
        public static string Department
        {
            get
            {
                return HttpContext.Current.Session["Department"] as string;
            }
            set
            {
                HttpContext.Current.Session["Department"] = value;
            }
        }
        public static string Designation
        {
            get
            {
                return HttpContext.Current.Session["Designation"] as string;
            }
            set
            {
                HttpContext.Current.Session["Designation"] = value;
            }
        }
        public static string EmpImage
        {
            get
            {
                return HttpContext.Current.Session["EmpImage"] as string;
            }
            set
            {
                HttpContext.Current.Session["EmpImage"] = value;
            }

        }
        public static string EmployeeName
        {
            get
            {
                return HttpContext.Current.Session["EmployeeName"] as string;
            }
            set
            {
                HttpContext.Current.Session["EmployeeName"] = value;
            }

        }
        public static string EMail
        {
            get
            {
                return HttpContext.Current.Session["EMail"] as string;
            }
            set
            {
                HttpContext.Current.Session["EMail"] = value;
            }

        }
        public static string Unit
        {
            get
            {
                return HttpContext.Current.Session["Unit"] as string;
            }
            set
            {
                HttpContext.Current.Session["Unit"] = value;
            }

        }
        public static string RedirectUrl
        {
            get
            {
                return HttpContext.Current.Session["RedirectUrl"] as string;
            }
            set
            {
                HttpContext.Current.Session["RedirectUrl"] = value;
            }

        }
        public static string LeaveapproveAuthority
        {
            get
            {
                return HttpContext.Current.Session["LeaveapproveAuthority"] as string;
            }
            set
            {
                HttpContext.Current.Session["LeaveapproveAuthority"] = value;
            }

        }
        public static string LeaveRecommendAuthority
        {
            get
            {
                return HttpContext.Current.Session["LeaveRecommendAuthority"] as string;
            }
            set
            {
                HttpContext.Current.Session["LeaveRecommendAuthority"] = value;
            }

        }
        public static string ProfileImage
        {
            get
            {
                return HttpContext.Current.Session["ProfileImage"] as string;
            }
            set
            {
                HttpContext.Current.Session["ProfileImage"] = value;
            }

        }
        public static string CompanyID
        {
            get
            {
                return HttpContext.Current.Session["CompanyID"] as string;
            }
            set
            {
                HttpContext.Current.Session["CompanyID"] = value;
            }

        }
        public static string CompanyName
        {
            get
            {
                return HttpContext.Current.Session["CompanyName"] as string;
            }
            set
            {
                HttpContext.Current.Session["CompanyName"] = value;
            }
        }
        public static string EmpDepartmentId
        {
            get
            {
                return HttpContext.Current.Session["DepartmentId"] as string;
            }
            set
            {
                HttpContext.Current.Session["DepartmentId"] = value;
            }
        }
        public static string EmpDepartmentName
        {
            get
            {
                return HttpContext.Current.Session["DepartmentName"] as string;
            }
            set
            {
                HttpContext.Current.Session["DepartmentName"] = value;
            }
        }
    }
}
