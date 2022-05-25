$(function () {
    //BindToDoListView();
    //BindHolidayViewByDate();
    //BindUserAttendance();
    //BindPabxDirectory();
    //$(document).delegate('.hrBloodGroup', 'click', function (e) {
    //    e.preventDefault();
    //    window.location.href = baseURL + "/HRM/EmployeeBloodGroup/Index";
    //});
});
function BindToDoListView() {
    var returnPIData;
    $.ajax({
        type: "POST",
        url: baseURL + "/ToDoList/GetAllToDoList",
        data: {},
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            $("#ulTodoList").empty();
            var _dashboardListoDoList = '';
            $.each(data, function (key, value) {
                _dashboardListoDoList += "<li class='item'><div class='product-img'><center> <i class='fa fa-list-alt fa-lg'></i></center></div>";
                _dashboardListoDoList += "<div class='product-info'><a class='pull-right' class='btnLink' onclick=bindToDoListEdit(" + value.ToDoListId + ")><i class='fa fa-pencil fa-fw dicon'></i></a><a class='pull-right' class='btnLink' onclick=bindToDOListToDelete(" + value.ToDoListId + ")><i class='fa fa-trash fa-fw dicon'></i></a>";
                _dashboardListoDoList += "<span class='product-description'>" + value.ToDoListDetails + "</span></div></li>";
            });
            $("#ulTodoList").append(_dashboardListoDoList);
        }
    });
}
function BindHolidayViewByDate() {

    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + '/Holiday/GetHolidayDate',
        data: {},
        async: false,
        dataType: 'json',
        success: function (data) {
            var _dashboardList = "";
            $.each(data, function (key, value) {
                _dashboardList += "<li class='item'><div class='product-img'><center> <i class='fa fa-calendar fa-lg'></i></center></div>";
                _dashboardList += "<div class='product-info'><a class='product-title' href='javascript::;'>" + value.HolidayDate + "<span class='label hidden label-warning pull-right'>$1800</span></a>";
                _dashboardList += "<span class='product-description'>" + value.HolidayDetails + "</span></div></li>";
            });
            $("#ulHolidayList").append(_dashboardList);
        }
    });
}

function BindUserAttendance() {
    var returnPIData;
    var _NoDataExists = 0;
    var len = 0;
    var _isDataExists = 0;
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + '/Dashboard/GetUserAttendance',
        data: {},
        async: false,
        dataType: 'json',
        success: function (data) {
            returnPIData = data;
        }
    });
    var arrayReturn = [];
    var results = returnPIData;
    for (var i = 0, len = results.length; i < len; i++) {
        var result = results[i];
        arrayReturn.push([result.ID, "<center>" + result.WorkDate + "</center>", "<center>" + result.DayStatus + "</center>", "<center>" + result.ShiftInTime + "</center>", "<center>" + result.InTime + "</center>", "<center>" + result.OutTime + "</center>"])
    }
    $('#tblUserAttendance').DataTable({
        destroy: true,
        data: arrayReturn,
        columns: [
            { 'sTitle': 'ID', 'class': 'hidden' },
            { 'sTitle': 'Work Date', "orderable": false },
            { 'sTitle': 'Status' },
            { 'sTitle': 'Shift In Time' },
            { 'sTitle': 'In Time' },
            { 'sTitle': 'Out Time' }],
        order: [[0, "desc"]]
    });
}

function BindPabxDirectory() {
    var returnPIData;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/PABX/GetAllPABX",
        data: {},
        async: false,
        dataType: 'json',
        success: function (data) {
            returnPIData = data;
        }
    });
    var arrayReturn = [];
    var results = returnPIData;
    for (var i = 0, len = results.length; i < len; i++) {
        var result = results[i];
        var _email = result.Email == "" ? "No Email Found" : result.Email;
        var _phone = result.CellNo == "" ? "No Contant No Found" : result.CellNo
        var _employee = "";
        if (result.Designation == "")
            _employee = result.EmployeeName;
        else
            _employee = result.EmployeeName + "<br><strong>" + result.Designation + "</strong>";

        arrayReturn.push([result.CompanyName, _employee, result.Department, "<a><i class='fa fa-phone fa-fw'></i> " + _phone + "</a><br><a><i class='fa fa fa-envelope'></i> " + _email + "</a>", "<center>" + result.PABXNo + "</center>"]);
    }

    $('#tblPABX').DataTable({
        destroy: true,
        "scrollY": "300px",
        "scrollCollapse": true,
        "paging": false,
        "info": true,
        data: arrayReturn,
        columns: [
            { "sTitle": "Company" },
            { "sTitle": "Employee Name" },
            { "sTitle": "Department" },
            { "sTitle": "Cell No" },
            { "sTitle": "PABX No" }
        ]
    });
}