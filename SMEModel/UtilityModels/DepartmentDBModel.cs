using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SMEModel.UtilityModels
{
    public class DepartmentDBModel
    {
        public string Department { get; set; }
        public string DepartmentID { get; set; }
    }
    public class DesignationDBModel
    {
        public string DesignationID { get; set; }
        public string Designation { get; set; }
    }

    public class CompanyDBModel
    {
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
    }
    
    
    public class CompanyEmpDBModel
    {
        public int CompanyID { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string DepartmentID { get; set; }
        public string DesignationID { get; set; }
    }
    public class HRCompanyEmpDBModel
    {
        public int CompanyID { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string TotalEmployee { get; set; }
       
    }
    public class ItemGroupDBModel
    {
        public int ItemGroupId { get; set; }
        public string ItemGroupName { get; set; }
    }
    public class UOMDBModel
    {
        public string UnitGroupName { get; set; }
    }
    public class ChallanTypeDBModel
    {
        public string UdID { get; set; }
        public string UdName { get; set; }
    }    
    public class CurrencyDBModel
    {
        public string CurrencyCode { get; set; }
        public string Description { get; set; }
        public string Country { get; set; }
        public decimal RelativeFactor { get; set; }
    }
   
   
}
