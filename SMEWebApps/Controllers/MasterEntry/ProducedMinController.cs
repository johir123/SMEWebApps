using SMELib.MasterEntry;
using SMEModel.MasterEntry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SMEWebApps.Controllers.MasterEntry
{
    public class ProducedMinController : Controller
    {
        ProducedMinItem objItem;
        // GET: ProducedMin
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public JsonResult LoadUnit(ProducedMinDBModel _dbModel)
        {
            objItem = new ProducedMinItem();
            List<ProducedMinDBModel> itemList = new List<ProducedMinDBModel>();
            itemList = objItem.LoadUnit(_dbModel);
            var jsonResult = Json(itemList, JsonRequestBehavior.AllowGet);
            jsonResult.MaxJsonLength = int.MaxValue;
            return jsonResult;
        }
        [HttpPost]
        public JsonResult SaveProducedMin(ProducedMinDBModel _dbModel)
        {
            int _result = 0;
            objItem = new ProducedMinItem();
            _result = objItem.SaveProducedMin(_dbModel);
            if (_result > 0)
                return Json(new { success = true });
            else
                return Json(new { success = false });
        }
        [HttpPost]
        public JsonResult LoadProducedMin()
        {
            objItem = new ProducedMinItem();
            List<ProducedMinDBModel> _dbModelList = new List<ProducedMinDBModel>();
            _dbModelList = objItem.LoadProducedMin();
            return this.Json(_dbModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult LoadSelectedProducedMin(ProducedMinDBModel _dbModel)
        {
            objItem = new ProducedMinItem();
            List<ProducedMinDBModel> _dbModelList = new List<ProducedMinDBModel>();
            _dbModelList = objItem.LoadSelectedProducedMin(_dbModel);
            return this.Json(_dbModelList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult DeleteProducedMin(ProducedMinDBModel _dbModel)
        {
            int _result = 0;
            objItem = new ProducedMinItem();
            _result = objItem.DeleteProducedMin(_dbModel);
            if (_result > 0)
                return Json(new { success = true });
            else
                return Json(new { success = false });
        }
    }
}