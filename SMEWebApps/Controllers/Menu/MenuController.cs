using SMELib.Menu;
using SMEModel.Menu;
using SMEModel.UtilityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BIMOBWebApps.Controllers.Menu
{
    public class MenuController : Controller
    {
        // GET: Menu
        MenuItem objItem = new MenuItem();
        //[BimobAuthorizeAttribute(8)]
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult InsertMenu()
        {
            return View();
        }

        [HttpPost]
        public JsonResult InsertMenu(MenuDBModel _dbModel)
        {
            objItem.InsertMenu(_dbModel);
            return Json(new { success = true });
        }
        [HttpPost]
        public JsonResult LoadAllGridMenu()
        {
            List<MenuDBModel> _modelList = new List<MenuDBModel>();
            _modelList = objItem.LoadAllGridMenu();
            return this.Json(_modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult LoadAllMenu()
        {
            List<MenuDBModel> _modelList = new List<MenuDBModel>();
            _modelList = objItem.LoadAllMenu();
            return this.Json(_modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetSelectedMenu(MenuDBModel _dbModel)
        {
            List<MenuDBModel> _modelList = new List<MenuDBModel>();
            _modelList = objItem.GetSelectedMenu(_dbModel);
            return this.Json(_modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteSelectedMenu(MenuDBModel _dbModel)
        {
            objItem.DeleteSelectedMenu(_dbModel);
            return Json(new { success = true });
        }

        [HttpPost]
        public JsonResult GetAllParentMenu()
        {
            List<MenuDBModel> _modelList = new List<MenuDBModel>();
            _modelList = objItem.GetAllParentMenu();
            return this.Json(_modelList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetAllDepartmentList()
        {
            
            List<DepartmentDBModel> ItemList = new List<DepartmentDBModel>();
            ItemList = objItem.GetAllDepartmentList();

            var jsonResult = Json(ItemList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult LoadDashBoardMenu()
        {
            List<DashboardDBModel> _modelList = new List<DashboardDBModel>();
            _modelList = objItem.LoadDashboardMenu();
            return this.Json(_modelList, JsonRequestBehavior.AllowGet);
        }
    }
}