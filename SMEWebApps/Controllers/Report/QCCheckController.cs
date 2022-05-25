using Microsoft.Reporting.WebForms;
using SMELib.Report;
using System.Data;

using System.Web.Mvc;

namespace SMEWebApps.Controllers.Report
{
    public class QCCheckController : Controller
    {
        QCCheckList qc;
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ViewQCReport(string Unit, string Buyer, string FromDate, string ToDate)
        {
            qc = new QCCheckList();
            LocalReport localReport = new LocalReport();
            localReport.ReportPath = Server.MapPath("~/Reports/QC/QCReport.rdlc");
            DataSet ds = new DataSet();
            DataTable dtQCReport = new DataTable();
            ds = qc.LoadQCCheck(Unit, Buyer, FromDate, ToDate);
            dtQCReport.Rows.Clear();
            dtQCReport = ds.Tables[0];

            ReportDataSource rdsQCReport = new ReportDataSource();
            rdsQCReport.Name = "QCRpt";
            rdsQCReport.Value = dtQCReport;
            localReport.DataSources.Add(rdsQCReport);

            ReportParameter ParamFromDate = new ReportParameter("ParamFromDate", FromDate);
            ReportParameter ParamToDate = new ReportParameter("ParamToDate", ToDate);
            localReport.SetParameters(new ReportParameter[] { ParamFromDate, ParamToDate });
            localReport.Refresh();

            string reportType = "pdf";
            string mimeType;
            string encoding;
            string fileNameExtension;
            string deviceInfo = @"<DeviceInfo>
                                 <OutputFormat>PDF</OutputFormat>
                                <PageWidth>8.3in</PageWidth>
                                <PageHeight>11.7in</PageHeight>
                                <MarginTop>0.1in</MarginTop>
                                <MarginLeft>0.1in</MarginLeft>
                                <MarginRight>0.1in</MarginRight>
                                <MarginBottom>0.1in</MarginBottom>
                                </DeviceInfo>";
            Warning[] warnings;
            string[] streams;
            byte[] renderedBytes;

            renderedBytes = localReport.Render(reportType, deviceInfo, out mimeType, out encoding, out fileNameExtension, out streams, out warnings);
            return File(renderedBytes, mimeType);
        }
    }
}