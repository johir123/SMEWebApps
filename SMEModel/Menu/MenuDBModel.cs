using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMEModel.Menu
{
    /// <summary>
    /// The menu db model.
    /// </summary>
    public class MenuDBModel
    {
        public int MenusId { get; set; }
        public int ParentMenuId { get; set; }
        public string ParentMenuName { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string IconName { get; set; }
        public bool IsVisiable { get; set; }
        public bool IsLogged { get; set; }
        public  int Sequence { get; set; }
        public string Department { get; set; }
        public string HeadIcon { get; set; }
        public string UserGroupList { get; set; }
        public string EmployeeCode { get; set; }
    }
    public class DashboardDBModel : MenuDBModel
    {
        public double DashBoardSequence { get; set; }
        public string EncryptedUserCode { get; set; }
    }
}