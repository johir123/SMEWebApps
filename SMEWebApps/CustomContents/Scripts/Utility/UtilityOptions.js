$(function () {
    bindGridData();
    bindChalanType();
    LoadInitialState();
    LoadItemGroups();
    LoadddlDepartment();
    LoadddlDesignation();
    LoadddlCompany();
    LoadddlSample();
    LoadddlHOD();
    LoadUOM();
    //$("#txtDate").datepicker();
    $('#txtDate').datepicker({
        format: 'dd/mm/yyyy',
    }).on('changeDate', function (e) {
        $(this).datepicker('hide');
    });
    $(document).delegate('#ddlToCompany', 'change', function () {
        if ($(this).val() > 0) {
            $(".ToElem").removeAttr("disabled");
            BindddlEmployee($(this).val(), 0);
        }
        else {
            $(".ToElem").attr("disabled", true);
        }
    });

    $(document).delegate('#ddlEmployee', 'change', function () {
        if ($(this).val() != "" || $(this).val() > 0) {
            var array = $(this).val().split(',');
            $("#ddlToDesignation").val(array[2]);
            $("#ddlToDepartment").val(array[1]);
            $("#txtToEmpName").val(array[0]);
            //$("#txtToEmpName").val($("#ddlEmployee option:selected").text());
        }
        else {
            $(".ToElem").attr("disabled", true);
        }
    });

    $(document).delegate('#ddlFromCompany', 'change', function () {
        if ($(this).val() > 0) {
            $(".fromElm").removeAttr("disabled");
            BindddlFromEmployee($(this).val(), 0);
        }
        else {
            $(".fromElm").attr("disabled", true);
        }
    });

    $(document).delegate('#ddlFromEmp', 'change', function () {
        if ($(this).val() != "" || $(this).val() > 0) {
            var array = $(this).val().split(',');
            $("#ddlFromDesignation").val(array[2]);
            $("#ddlFromDepartment").val(array[1]);
            $("#txtResponsible").val(array[0]);
            //$("#txtResponsible").val($("#ddlFromEmp option:selected").text());
        }
        else {
            $(".fromElm").attr("disabled", true);
        }
    });
    $(document).delegate('a.removebutton', 'click', function (e) {
        var ans = confirm("Are you sure to remove the record?");
        if (ans == true) {
            var table1 = $('#tblItemGroup').DataTable();
            table1.row($(this).parents('tr')).remove().draw();
            return false;
        }
        else {
            return false;
        }
    });
    $(document).delegate('a.editbutton', 'click', function (e) {
        $("#hdGridEdit").val($(this).closest("tr").find('td:eq(0)').text());
        $("#ddlItemGroup").val($(this).closest("tr").find('td:eq(1)').text());
        $("#txtItemName").val($(this).closest("tr").find('td:eq(3)').text());
        $("#txtItemCode").val($(this).closest("tr").find('td:eq(4)').text());
        $("#ddlUOM").val($(this).closest("tr").find('td:eq(5)').text());
        $("#txtQuantity").val($(this).closest("tr").find('td:eq(7)').text());
        $("#txtComValue").val($(this).closest("tr").find('td:eq(8)').text());
        $("#txtRemarks").val($(this).closest("tr").find('td:eq(9)').text());
    });
    $("#btnSave").click(function (e) {
        e.preventDefault();
        SaveFormValue();
    });

    $("#btnAddItem").click(function (e) {
        e.preventDefault();
        AddNewGridItem();
    });
    $("#btnClearItem").click(function (e) {
        e.preventDefault();
        ClearItemForm();
    });
    $("#btnNew").click(function (e) {
        e.preventDefault();
        $(".textm").val("");
        $(".ddlm").val("-1");
        //$("input[name=pack]").removeAttr("checked");
        //$("input[name=invoice]").removeAttr("checked");
        //$("input[name=invoiceType]").removeAttr("checked");
        $("#txtSLNo").removeAttr("disabled");
    });
    $("#btnFind").click(function (e) {
        e.preventDefault();
        if ($("#txtSLNo").val() == "") {
            alert('Please Enter A SL NO..');
            $("#txtSLNo").addClass("customError");
            return false;
        }
        else {
            bindRecordToEdit($("#txtSLNo").val());
            bindChildRecord($("#txtSLNo").val());
            $("#txtSLNo").attr("disabled", true);
        }

    });
    $("#btnTest").click(function (e) {
        e.preventDefault();
        var items = [];
        var table = $("#tblItemGroup tbody");
        table.find('tr').each(function (i) {
            var $tds = $(this).find('td');
            items.push({
                ItemGroup: $tds.eq(1).text(),
                ItemName: $tds.eq(3).text(),
                Code: $tds.eq(4).text(),
                UOM: $tds.eq(5).text(),
                Quantity: $tds.eq(7).text(),
                ComValue: $tds.eq(8).text(),
                Remarks: $tds.eq(9).text()
            });
        });
        //alert(items.toString());
    });
});

function bindChalanType() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetChallanTypeList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlChallanType").get(0).options.length = 0;
            $("#ddlChallanType").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlChallanType").append($("<option></option>").val(value.UdID).html(value.UdName));
            });
        },

    });
}
function LoadddlDepartment() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetDepartmentList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlFromDepartment").get(0).options.length = 0;
            $("#ddlFromDepartment").get(0).options[0] = new Option("", "-1");
            $("#ddlToDepartment").get(0).options.length = 0;
            $("#ddlToDepartment").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlToDepartment").append($("<option></option>").val(value.DepartmentID).html(value.Department));
                $("#ddlFromDepartment").append($("<option></option>").val(value.DepartmentID).html(value.Department));
            });
        },

    });
}
function LoadddlDesignation() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetDesignationList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlFromDesignation").get(0).options.length = 0;
            $("#ddlFromDesignation").get(0).options[0] = new Option("", "-1");
            $("#ddlToDesignation").get(0).options.length = 0;
            $("#ddlToDesignation").get(0).options[0] = new Option("", "-1");
            $("#ddlBarrierDesignation").get(0).options.length = 0;
            $("#ddlBarrierDesignation").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlToDesignation").append($("<option></option>").val(value.DesignationID).html(value.Designation));
                $("#ddlFromDesignation").append($("<option></option>").val(value.DesignationID).html(value.Designation));
                $("#ddlBarrierDesignation").append($("<option></option>").val(value.DesignationID).html(value.Designation));
            });
        },
    });
}
function LoadddlCompany() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetCompanyList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlToCompany").get(0).options.length = 0;
            $("#ddlToCompany").get(0).options[0] = new Option("", "-1");
            $("#ddlFromCompany").get(0).options.length = 0;
            $("#ddlFromCompany").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlFromCompany").append($("<option></option>").val(value.CompanyID).html(value.CompanyName));
                $("#ddlToCompany").append($("<option></option>").val(value.CompanyID).html(value.CompanyName));
            });
        },

    });
}
function LoadddlSample() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetSampleList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlSampleType").get(0).options.length = 0;
            $("#ddlSampleType").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlSampleType").append($("<option></option>").val(value.SampleID).html(value.SampleID));
            });
        },

    });
}
function LoadddlHOD() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetHODList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlHOD").get(0).options.length = 0;
            $("#ddlHOD").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlHOD").append($("<option></option>").val(value.EmployeeCode).html(value.EmployeeName));
            });
        },

    });
}
function BindddlEmployee(CompanyID, selectedVal) {
    var _dbModel = { 'CompanyID': CompanyID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetCompanyEmployeeList",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlEmployee").get(0).options.length = 0;
            $("#ddlEmployee").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlEmployee").append($("<option></option>").val(value.EmployeeName + "," + value.DepartmentID + "," + value.DesignationID).html(value.EmployeeCode));
            });
        },

    });
    if (selectedVal != "0") {
        $("#ddlEmployee option:contains(" + selectedVal + ")").attr('selected', 'selected');
    }
}
function BindddlFromEmployee(CompanyID, selectedVal) {
    var _dbModel = { 'CompanyID': CompanyID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetCompanyEmployeeList",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlFromEmp").get(0).options.length = 0;
            $("#ddlFromEmp").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlFromEmp").append($("<option></option>").val(value.EmployeeName + "," + value.DepartmentID + "," + value.DesignationID).html(value.EmployeeCode));
            });
        },

    });
    if (selectedVal != "0") {
        $("#ddlFromEmp option:contains(" + selectedVal + ")").attr('selected', 'selected');
    }
}
function LoadItemGroups() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetItemGroupList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlItemGroup").get(0).options.length = 0;
            $("#ddlItemGroup").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlItemGroup").append($("<option></option>").val(value.ItemGroupId).html(value.ItemGroupName));
            });
        },

    });
}
function LoadUOM() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/GatePass/GetUOMList",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlUOM").get(0).options.length = 0;
            $("#ddlUOM").get(0).options[0] = new Option("", "-1");
            $.each(data, function (key, value) {
                $("#ddlUOM").append($("<option></option>").val(value.UnitGroupName).html(value.UnitGroupName));
            });
        },

    });
}
function AddNewGridItem() {
    var _isEdit = 0;
    var _isError = 0;
    var d = new Date();
    var SLNO = d.getHours() + "" + d.getMinutes() + "" + d.getSeconds();
    var ddlItemGroupId = $("#ddlItemGroup").val();
    var ddlItemGroupName = $("#ddlItemGroup option:selected").text();
    var txtItemName = $("#txtItemName").val();
    var txtItemCode = $("#txtItemCode").val();
    var ddlUOMId = $("#ddlUOM").val();
    var ddlUOM = $("#ddlUOM option:selected").text();
    var txtQuantity = $("#txtQuantity").val();
    var txtComValue = $("#txtComValue").val();
    var txtRemarks = $("#txtRemarks").val();
    _isEdit = $("#hdGridEdit").val();

    if (ddlItemGroupId != "-1") {
        $("#ddlItemGroup").removeClass("customError");
    }
    else {
        $("#ddlItemGroup").addClass("customError");
        _isError = 1;
    }

    if (txtItemName != "") {
        $("#txtItemName").removeClass("customError");
    }
    else {
        $("#txtItemName").addClass("customError");
        _isError = 1;
    }

    if (txtItemCode != "") {
        $("#txtItemCode").removeClass("customError");
    }
    else {
        $("#txtItemCode").addClass("customError");
        _isError = 1;
    }

    if (ddlUOMId != "-1") {
        $("#ddlUOM").removeClass("customError");
    }
    else {
        $("#ddlUOM").addClass("customError");
        _isError = 1;
    }

    if (txtQuantity != "") {
        $("#txtQuantity").removeClass("customError");
    }
    else {
        $("#txtQuantity").addClass("customError");
        _isError = 1;
    }

    if (txtComValue != "") {
        $("#txtComValue").removeClass("customError");
    }
    else {
        $("#txtComValue").addClass("customError");
        _isError = 1;
    }

    if (_isError == 1)
        return false;


    if (_isEdit == 0 || _isEdit == "") {
        var table = $('#tblItemGroup').DataTable();
        var rowNode = table.row.add([SLNO, ddlItemGroupId, ddlItemGroupName, txtItemName, txtItemCode, ddlUOMId, ddlUOM, txtQuantity, txtComValue, txtRemarks, "<center><a href='javascript:void(0)' class='editbutton'><i class='fa fa-pencil icon'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' class='removebutton'><i class='fa fa-trash icon'></i></a></center>"]).draw().node();
    }
    else {
        var table = $("#tblItemGroup tbody");
        table.find('tr').each(function (i) {
            var $tds = $(this).find('td');
            var _colVal = $tds.eq(0).text();
            if (_colVal == _isEdit) {
                $tds.eq(0).text(_isEdit);
                $tds.eq(1).text(ddlItemGroupId);
                $tds.eq(2).text(ddlItemGroupName);
                $tds.eq(3).text(txtItemName);
                $tds.eq(4).text(txtItemCode);
                $tds.eq(5).text(ddlUOMId);
                $tds.eq(6).text(ddlUOM);
                $tds.eq(7).text(txtQuantity);
                $tds.eq(8).text(txtComValue);
                $tds.eq(9).text(txtRemarks);
            }
        });
    }
    ClearItemForm();
}
function bindGridData() {
    $('#tblItemGroup').DataTable({
        destroy: true,
        pageLength: 10,
        data: {},
        dom: '<"row view-filter"<"col-sm-12"<"pull-left"l><"pull-right"f><"clearfix">>>t<"row view-pager"<"col-sm-12"<"text-center"ip>>>',
        columns: [
            { "sTitle": "SL NO", "class": "hidden" },
            { "sTitle": "Item ID", "class": "hidden" },
            { "sTitle": "Item Group" },
            { "sTitle": "Item Name" },
            { "sTitle": "Code" },
            { "sTitle": "UOM ID", "class": "hidden" },
            { "sTitle": "UOM" },
            { "sTitle": "Quantity" },
            { "sTitle": "Com. Value" },
            { "sTitle": "Remarks" },
            { "sTitle": "Delete" }
        ]
    });
}
function SaveFormValue() {
    var _isError = 0;
    var _txtSLNo = $("#txtSLNo").val();
    var _txtDate = $("#txtDate").val();
    var _ddlChallanType = $("#ddlChallanType").val();
    var _ddlSampleType = $("#ddlSampleType").val();
    var _ddlToCompany = $("#ddlToCompany").val();
    var _ddlEmployee = $("#ddlEmployee option:selected").text();//$("#ddlEmployee").val();
    var _ddlToDesignation = $("#ddlToDesignation").val();
    var _txtToEmpName = $("#txtToEmpName").val();
    var _ddlToDepartment = $("#ddlToDepartment").val();
    var _txtAddress = $("#txtAddress").val();
    var _txtPack = $("#txtPack").val();
    var _isPack = $("input[name=pack]:checked").val();
    var _ddlFromCompany = $("#ddlFromCompany").val();
    var _ddlFromEmp = $("#ddlFromEmp option:selected").text();//$("#ddlFromEmp").val();
    var _ddlFromDesignation = $("#ddlFromDesignation").val();
    var _txtResponsible = $("#txtResponsible").val();
    var _ddlFromDepartment = $("#ddlFromDepartment").val();
    var _txtBarrierName = $("#txtBarrierName").val();
    var _ddlBarrierDesignation = $("#ddlBarrierDesignation").val();
    var _isInvoice = $("input[name=invoice]:checked").val();
    var _isReturnable = $("input[name=invoiceType]:checked").val();
    var _ddlHOD = $("#ddlHOD").val();
    var _txtPackedBy = $("#txtPackedBy").val();
    var _txtCheckedBy = $("#txtCheckedBy").val();
    var _txtPreparedBy = $("#txtPreparedBy").val();
    var _txtVarifiedBy = $("#txtVarifiedBy").val();
    var _txtFinalAuthernication = $("#txtFinalAuthernication").val();

    if (_txtDate == "") {
        $("#txtDate").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtDate").removeClass("customError");
    }

    if (_ddlChallanType == "" || _ddlChallanType < 0) {
        $("#ddlChallanType").addClass("customError");
        _isError = 1;
    }
    else {
        $("#ddlChallanType").removeClass("customError");
    }

    if (_ddlToDesignation == "" || _ddlToDesignation < 0) {
        _isError = 1;
        $("#ddlToDesignation").addClass("customError");
    }
    else {
        $("#ddlToDesignation").removeClass("customError");
    }
    if (_txtToEmpName == "") {
        _isError = 1;
        $("#txtToEmpName").addClass("customError");
    }
    else {
        $("#txtToEmpName").removeClass("customError");
    }

    if (_txtAddress == "") {
        _isError = 1;
        $("#txtAddress").addClass("customError");
    }
    else {
        $("#txtAddress").removeClass("customError");
    }

    if (_txtPack == "") {
        _isError = 1;
        $("#txtPack").addClass("customError");
    }
    else {
        $("#txtPack").removeClass("customError");
    }

    if (_ddlFromCompany == "" || _ddlFromCompany < 0) {
        _isError = 1;
        $("#ddlFromCompany").addClass("customError");
    }
    else {
        $("#ddlFromCompany").removeClass("customError");
    }

    if (_ddlFromEmp == "" || _ddlFromEmp < 0) {
        _isError = 1;
        $("#ddlFromEmp").addClass("customError");
    }
    else {
        $("#ddlFromEmp").removeClass("customError");
    }

    if (_ddlFromEmp == "" || _ddlFromEmp < 0) {
        _isError = 1;
        $("#ddlFromEmp").addClass("customError");
    }
    else {
        $("#ddlFromEmp").removeClass("customError");
    }


    if (_ddlFromDesignation == "" || _ddlFromDesignation < 0) {
        _isError = 1;
        $("#ddlFromDesignation").addClass("customError");
    }
    else {
        $("#ddlFromDesignation").removeClass("customError");
    }

    if (_txtResponsible == "") {
        _isError = 1;
        $("#txtResponsible").addClass("customError");
    }
    else {
        $("#txtResponsible").removeClass("customError");
    }

    if (_ddlFromDepartment == "" || _ddlFromDepartment < 0) {
        _isError = 1;
        $("#ddlFromDepartment").addClass("customError");
    }
    else {
        $("#ddlFromDepartment").removeClass("customError");
    }

    if (_txtBarrierName == "") {
        _isError = 1;
        $("#txtBarrierName").addClass("customError");
    }
    else {
        $("#txtBarrierName").removeClass("customError");
    }

    if (_ddlBarrierDesignation == "" || _ddlBarrierDesignation < 0) {
        _isError = 1;
        $("#ddlBarrierDesignation").addClass("customError");
    }
    else {
        $("#ddlBarrierDesignation").removeClass("customError");
    }

    if (_ddlHOD == "" || _ddlHOD < 0) {
        _isError = 1;
        $("#ddlHOD").addClass("customError");
    }
    else {
        $("#ddlHOD").removeClass("customError");
    }

    if (_txtPackedBy == "") {
        _isError = 1;
        $("#txtPackedBy").addClass("customError");
    }
    else {
        $("#txtPackedBy").removeClass("customError");
    }

    if (_txtCheckedBy == "") {
        _isError = 1;
        $("#txtCheckedBy").addClass("customError");
    }
    else {
        $("#txtCheckedBy").removeClass("customError");
    }

    if (_txtPreparedBy == "") {
        _isError = 1;
        $("#txtPreparedBy").addClass("customError");
    }
    else {
        $("#txtPreparedBy").removeClass("customError");
    }

    if (_txtVarifiedBy == "") {
        _isError = 1;
        $("#txtVarifiedBy").addClass("customError");
    }
    else {
        $("#txtVarifiedBy").removeClass("customError");
    }
    var items = [];

    var table = $("#tblItemGroup tbody");
    table.find('tr').each(function (i) {
        var $tds = $(this).find('td');
        items.push({
            ItemGroup: $tds.eq(1).text(),
            ItemName: $tds.eq(3).text(),
            Code: $tds.eq(4).text(),
            UOM: $tds.eq(5).text(),
            Quantity: $tds.eq(7).text(),
            ComValue: $tds.eq(8).text(),
            Remarks: $tds.eq(9).text()
        });
    });
    if (_txtSLNo == "")
        _txtSLNo = 0;

    var _dbModel = {
        'GatePassId': _txtSLNo, 'Date': _txtDate, 'ChallanType': _ddlChallanType, 'SampleID': _ddlSampleType, 'ToCompany': _ddlToCompany, 'ToEmpID': _ddlEmployee, 'ToDesignation': _ddlToDesignation, 'ToName': _txtToEmpName, 'ToDepartment': _ddlToDepartment, 'ToAddress': _txtAddress,
        'NoofPack': _txtPack, 'IsNoofPack': _isPack, 'FromCompany': _ddlFromCompany, 'FromEmpID': _ddlFromEmp, 'FromDesignation': _ddlFromDesignation, 'ResponsiblePerson': _txtResponsible, 'ResponsibleDepartment': _ddlFromDepartment,
        'BarrierName': _txtBarrierName, 'BarrierDesignation': _ddlBarrierDesignation, 'IsInvoice': _isInvoice, 'IsReturnable': _isReturnable, 'HOD': _ddlHOD, 'PackedBy': _txtPackedBy, 'CheckedBy': _txtCheckedBy, 'PreparedBy': _txtPreparedBy,
        'VarifiedBy': _txtVarifiedBy, 'FinalAuthernication': _txtFinalAuthernication, 'GatePassModel': items
    };

    if (_isError == 1) {
        return false;
    }

    $.ajax({
        type: "POST",
        url: baseURL + "/GatePass/SaveGatePassData",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            if (data.success == true) {
                if (_txtSLNo == 0) {
                    $.growl.notice({ title: "Save", message: "Data Save Successfully.." });
                }
                else {
                    $.growl.notice({ title: "Update", message: "Data Updated Successfully.." });
                }
            }
        }
    });

}
function bindRecordToEdit(id) {
    var _dbModel = { 'GatePassId': id };
    $.ajax({
        type: "POST",
        url: baseURL + "/GatePass/LoadSelectedGatePass",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            if (data.length == 0) {
                alert('No Data Found..!');
                return false;
            }
            $.each(data, function (i, item) {
                $("#txtDate").val(item.Date);
                $("#ddlChallanType").val(item.ChallanType);
                $("#ddlSampleType").val(item.SampleID);
                $("#ddlToCompany").val(item.ToCompany);
                //$("#ddlEmployee").val(item.ToEmpID);
                $("#ddlEmployee :selected").text(item.ToEmpID);
                $("#ddlToDesignation").val(item.ToDesignation);
                $("#txtToEmpName").val(item.ToName);
                $("#ddlToDepartment").val(item.ToDepartment);
                $("#txtAddress").val(item.ToAddress);
                $("#txtPack").val(item.NoofPack);

                $("#ddlFromCompany").val(item.FromCompany);
                //$("#ddlFromEmp").val(item.FromEmpID);
                $("#ddlFromDesignation").val(item.FromDesignation);
                $("#txtResponsible").val(item.ResponsiblePerson);
                $("#ddlFromDepartment").val(item.ResponsibleDepartment);
                $("#txtBarrierName").val(item.BarrierName);
                $("#ddlBarrierDesignation").val(item.BarrierDesignation);

                if (item.IsNoofPack == "True")
                    $("input[name=pack][value='1']").attr('checked', true);
                else
                    $("input[name=pack][value='0']").attr('checked', true);

                if (item.IsInvoice == "True")
                    $("input[name=invoice][value='1']").attr('checked', true);
                else
                    $("input[name=invoice][value='0']").attr('checked', true);

                if (item.IsReturnable == "True")
                    $("input[name=invoiceType][value='1']").attr('checked', true);
                else
                    $("input[name=invoiceType][value='0']").attr('checked', true);

                $("#ddlHOD").val(item.HOD);
                $("#txtPackedBy").val(item.PackedBy);
                $("#txtCheckedBy").val(item.CheckedBy);
                $("#txtPreparedBy").val(item.PreparedBy);
                $("#txtVarifiedBy").val(item.VarifiedBy);
                $("#txtFinalAuthernication").val(item.FinalAuthernication);
                $("#txtSLNo").val(item.GatePassId);
                BindddlEmployee(item.ToCompany, item.ToEmpID);
                BindddlFromEmployee(item.FromCompany, item.FromEmpID)
            });
        },
        error: function (response) {
            alert(response.status + ' ' + response.statusText);
        }
    });
}
function bindChildRecord(GatePassId) {
    var _dbModel = { 'GatePassId': GatePassId };
    var returnPIData;
    var len = 0;
    var _isDataExists = 0;
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + "/GatePass/GetGatePassChildItems",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data.length > 0) {
                returnPIData = data;
                _isDataExists = 1;
            }
        }
    });

    if (_isDataExists > 0) {
        var arrayReturn = [];
        var results = returnPIData;
        for (var i = 0, len = results.length; i < len; i++) {
            var result = results[i];
            arrayReturn.push([result.GatePassId, result.ItemGroup, result.ItemGroupName, result.ItemName, result.Code, result.UOM, result.UOM, result.Quantity, result.ComValue, result.Remarks, "<center><a href='javascript:void(0)' class='editbutton'><i class='fa fa-pencil icon'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href='javascript:void(0)' class='removebutton'><i class='fa fa-trash icon'></i></a></center>"])
        }
        $('#tblItemGroup').DataTable({
            destroy: true,
            data: arrayReturn,
            columns: [
                { "sTitle": "SL NO", "class": "hidden" },
                { "sTitle": "Item ID", "class": "hidden" },
                { "sTitle": "Item Group" },
                { "sTitle": "Item Name" },
                { "sTitle": "Code" },
                { "sTitle": "UOM ID", "class": "hidden" },
                { "sTitle": "UOM" },
                { "sTitle": "Quantity" },
                { "sTitle": "Com. Value" },
                { "sTitle": "Remarks" },
                { "sTitle": "Action" }]
        });
    }
}
function ClearItemForm() {
    $(".ddl").val("");
    $(".txt").val("");
    $("#hdGridEdit").val();
}
function LoadInitialState() {
    $(".ToElem").attr("disabled", true);
    $(".fromElm").attr("disabled", true);
}