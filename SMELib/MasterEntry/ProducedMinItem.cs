using SMEModel.MasterEntry;
using Elmah;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace SMELib.MasterEntry
{
    public class ProducedMinItem
    {
        ProducedMinList _objList;
        public List<ProducedMinDBModel> LoadUnit(ProducedMinDBModel _dbModel)
        {
            _objList = new ProducedMinList();
            List<ProducedMinDBModel> _modelList = new List<ProducedMinDBModel>();
            try
            {
                DataTable dt = _objList.LoadUnit(_dbModel);
                if (dt.Rows.Count > 0)
                {

                    _modelList = (from DataRow row in dt.Rows
                                  select new ProducedMinDBModel
                                  {
                                      UnitId = row["UnitId"].ToString(),
                                      Unit = row["Unit"].ToString()
                                  }).ToList();
                }
                return _modelList;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                _modelList = null;
            }
        }
        public int SaveProducedMin(ProducedMinDBModel _dbModel)
        {
            try
            {
                _objList = new ProducedMinList();
                return _objList.SaveProducedMin(_dbModel);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                _objList = null;
            }
        }
        public List<ProducedMinDBModel> LoadProducedMin()
        {
            _objList = new ProducedMinList();
            List<ProducedMinDBModel> _modelList = new List<ProducedMinDBModel>();
            try
            {
                DataTable dt = _objList.LoadProducedMin();
                if (dt.Rows.Count > 0)
                {
                    _modelList = (from DataRow row in dt.Rows
                                  select new ProducedMinDBModel
                                  {
                                      SL = Convert.ToInt32(row["SL"].ToString()),
                                      Year = Convert.ToInt32(row["Year"].ToString()),
                                      MonthSL = Convert.ToInt32(row["MonthSL"].ToString()),
                                      Month = row["Month"].ToString(),
                                      Factory = row["Factory"].ToString(),
                                      Unit = row["Unit"].ToString(),
                                      UOM = row["UOM"].ToString(),
                                      PlannedMinutes = Convert.ToDecimal(row["PlannedMinutes"].ToString()),
                                      AchievedMinutes = Convert.ToDecimal(row["AchievedMinutes"].ToString()),
                                      AchievedPercentage = Convert.ToDecimal(row["AchievedPercentage"].ToString())
                                  }).ToList();
                }
                return _modelList;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                _modelList = null;
            }
        }
        public List<ProducedMinDBModel> LoadSelectedProducedMin(ProducedMinDBModel _dbModel)
        {
            _objList = new ProducedMinList();
            List<ProducedMinDBModel> _modelList = new List<ProducedMinDBModel>();
            try
            {
                DataTable dt = _objList.LoadSelectedProducedMin(_dbModel);
                if (dt.Rows.Count > 0)
                {
                    _modelList = (from DataRow row in dt.Rows
                                  select new ProducedMinDBModel
                                  {
                                      SL = Convert.ToInt32(row["SL"].ToString()),
                                      Year = Convert.ToInt32(row["Year"].ToString()),
                                      MonthSL = Convert.ToInt32(row["MonthSL"].ToString()),
                                      Month = row["Month"].ToString(),
                                      Factory = row["Factory"].ToString(),
                                      Unit = row["Unit"].ToString(),
                                      UOM = row["UOM"].ToString(),
                                      PlannedMinutes = Convert.ToDecimal(row["PlannedMinutes"].ToString()),
                                      AchievedMinutes = Convert.ToDecimal(row["AchievedMinutes"].ToString()),
                                      AchievedPercentage = Convert.ToDecimal(row["AchievedPercentage"].ToString())
                                  }).ToList();
                }
                return _modelList;
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                _modelList = null;
            }
        }
        public int DeleteProducedMin(ProducedMinDBModel _dbModel)
        {
            try
            {
                _objList = new ProducedMinList();
                return _objList.DeleteProducedMin(_dbModel);
            }
            catch (Exception ex)
            {
                ErrorSignal.FromCurrentContext().Raise(ex);
                throw ex;
            }
            finally
            {
                _objList = null;
            }
        }
    }
}
