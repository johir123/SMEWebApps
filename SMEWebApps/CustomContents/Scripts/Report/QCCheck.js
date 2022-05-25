$(function () {

    $('#txtFromDate').datepicker({
        format: 'dd-M-yyyy'
    }).on('changeDate', function (e) {
        $(this).datepicker('hide');
    }).datepicker("setDate", new Date());

    $('#txtToDate').datepicker({
        format: 'dd-M-yyyy'
    }).on('changeDate', function (e) {
        $(this).datepicker('hide');
    }).datepicker("setDate", new Date());
    
    BindddlWithEmployeeCode("ddlUnitIdRpt", "Common", "BindDDLValues", "MPWERP.dbo.Sp_Set_QC_Check", "1", "", "", "--Select Unit--");

    $('#btnQCRpt').click(function (e) {
        e.preventDefault();
        var url = window.baseURL + "/QCCheck/ViewQCReport?Unit=" + $("#ddlUnitIdRpt").val() + "&Buyer=" + encodeURIComponent($("#txtBuyerIdRpt").val()) + "&FromDate=" + $("#txtFromDate").val() + "&ToDate=" + $("#txtToDate").val();
        window.open(url, 'mywindow', 'fullscreen=yes, scrollbars=auto');
    });
});