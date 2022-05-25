using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMEModel.Common
{
    public class DDLSourceModel
    {
        public CommandType _commandType = CommandType.StoredProcedure;
        public string Key { get; set; }
        public string Value { get; set; }
        public string spName { get; set; }
        public Dictionary<string, string> Params { get; set; }
        public CommandType CommandType
        {
            get
            {
                return _commandType;
            }
            set
            {
                _commandType = value;
            }
        }
    }
    public class CommonDBViewModel
    {
        public Dictionary<string, string> Columns { get; set; }
        public string spName { get; set; }
        public Dictionary<string, string> Params { get; set; }

    }
    public class PopupViewModel
    {
        public List<CommonDBViewModel> DataList { get; set; }
        public string PopupTitle { get; set; }
    }
    public class DropdownDBModel {
        public string SpName { get; set; }
        public string QryOption { get; set; }
        public string Code { get; set; }
        public string Value { get; set; }
        public string EmployeeCode { get; set; }
        public string Param1 { get; set; }
    }

}