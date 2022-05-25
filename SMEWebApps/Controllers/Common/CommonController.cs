using SMEModel.Common;
using SMEUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SMEWebApps.Controllers.Common
{
    public class CommonController : Controller
    {
        // GET: Common
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult BindDDLValues(DropdownDBModel _dbModel)
        {
            UtilityOptions objItem = new UtilityOptions();
            List<DropdownDBModel> itemList = new List<DropdownDBModel>();
            itemList = objItem.LoadDDLValuesWithEmployeeCode(_dbModel);
            var jsonResult = Json(itemList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
    }
}