$(function () {
    BindddlWithEmployeeCode("ddlCompany", "Common", "BindDDLValues", "MPWERP..Sp_Set_Produced_Min", "1", "", "", "--Select Company--");
    $('#ddlYear').each(function () {
        var year = (new Date()).getFullYear();
        var current = year;
        year -= 1;
        for (var i = 0; i < 3; i++) {
            if ((year + i) == current)
                $(this).append('<option selected value="' + (year + i) + '">' + (year + i) + '</option>');
            else
                $(this).append('<option value="' + (year + i) + '">' + (year + i) + '</option>');
        }
    });
    $("#ddlCompany").change(function (e) {
        e.preventDefault();
        LoadUnit($(this).val());
    });
    $(document).delegate('#btnSave', 'click', function (e) {
        e.preventDefault();
        SaveFormValue();
    });
    //$("#filter").val("");
    //ClearForm();
    BindGridData();
    $(document).delegate('#btnAddNew', 'click', function (e) {
        e.preventDefault();
        ClearForm();
        $("#modalProducedMin").modal("toggle");
    });
    $(document).delegate('#btnClear', 'click', function (e) {
        e.preventDefault();
        ClearForm();
    });
    G_KendoGridName = "tblProducedMinutes";
    $("#txtAchievedMinutes").keyup(function () {
        $("#txtAchievedPercentage").val((parseFloat($("#txtAchievedMinutes").val()) / parseFloat($("#txtPlannedMinutes").val()) * 100).toFixed(0));
    });
});

function LoadUnit(CompID) {
    var _dbModel = { 'Factory': CompID };
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/ProducedMin/LoadUnit",
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: "json",
        success: function (data) {
            $("#ddlUnit").empty();
            $("#ddlUnit").append($("<option></option>").val("-1").html("--Select Unit--"));
            $.each(data, function (i, item) {
                $("#ddlUnit").append($("<option></option>").val(item.UnitId).html(item.Unit));
            });
        }
    });
}
function BindGridData() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: baseURL + "/ProducedMin/LoadProducedMin",
        data: {},
        async: false,
        dataType: "json",
        success: function (data) {
            PopulateGridData(data);
        }
    });
}
function PopulateGridData(data) {
    $("#tblProducedMinutes").kendoGrid().empty();
    $("#tblProducedMinutes").kendoGrid({
        dataSource: {
            data: data,
            dataType: "json",
            schema: {
                model: {
                    fields: {
                        SL: { type: "number" },
                        Year: { type: "number" },
                        MonthSL: { type: "number" },
                        Month: { type: "string" },
                        Factory: { type: "string" },
                        Unit: { type: "string" },
                        UOM: { type: "string" },
                        PlannedMinutes: { type: "number" },
                        AchievedMinutes: { type: "number" },
                        AchievedPercentage: { type: "number" }
                    }
                }
            }
        },
        toolbar: "<a id='btnAddNew' role='button' class='k-button k-button-icontext k-grid-edit' href='javascript:void(0)'><span class='k-icon k-i-plus'></span>Add New</a> <input id='Kendofilter' style='float: right;' class='k-textbox' placeholder='Search..' />",
        columns: [
            {
                field: "SL", title: "SL", hidden: true, filterable: false
            },
            {
                field: "Year", title: "Year", filterable: false, width: 50, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "Month", title: "Month", filterable: false, width: 60, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "Factory", title: "Factory", filterable: false, width: 50, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "Unit", title: "Unit", filterable: false, width: 50, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "UOM", title: "UOM", filterable: false, width: 50, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "PlannedMinutes", title: "Planned Minutes", filterable: false, width: 80, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "AchievedMinutes", title: "Achieved Minutes", filterable: false, width: 80, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "AchievedPercentage", title: "Achieved Percentage", filterable: false, width: 80, headerAttributes: { style: "text-align: center" }, attributes: { class: "text-center" }
            },
            {
                field: "SL",
                template: "<a role='button' class='k-button k-button-icontext k-grid-edit' style='min-width: 35px;padding-left: 12px;' href='javascript:void(0)' onclick=GetEditData('#=SL#')><span class='k-icon k-i-edit'></span></a>" +
                    "<a role='button' class='k-button k-button-icontext k-grid-delete' style='min-width: 35px;padding-left: 12px;' href='javascript:void(0)' onclick=DeleteGridData('#=SL#')><span class='k-icon k-i-close'></span></a>",
                title: "Action",
                width: 80,
                filterable: false,
                sortable: false,
                headerAttributes: { style: "text-align: center" },
                attributes: { class: "text-center" }
            },
        ],
        sortable: true,
        filterable: {
            extra: false,
            operators: {
                string: {
                    contains: "Contains",
                    startswith: "Starts With",
                    eq: "Is Equal To"
                }
            }
        },
        resizable: true,
        height: 500,
        pageable: false,
        scrollable: true
    });
}
function SaveFormValue() {
    var _isError = 0;
    var SL = $("#hdValue").val();
    var Year = $("#ddlYear").val();
    var MonthSL = $("#ddlMonth").val();
    var Month = $("#ddlMonth option:selected").text();
    var Factory = $("#ddlCompany").val();
    var Unit = $("#ddlUnit").val();
    var UOM = $("#ddlUOM").val();
    var PlannedMinutes = $("#txtPlannedMinutes").val();
    var AchievedMinutes = $("#txtAchievedMinutes").val();
    var AchievedPercentage = $("#txtAchievedPercentage").val();

    if (Unit == "-1") {
        $("#ddlUnit").addClass("customError");
        _isError = 1;
    }
    else {
        $("#ddlUnit").removeClass("customError");
    }

    if (PlannedMinutes == "") {
        $("#txtPlannedMinutes").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtPlannedMinutes").removeClass("customError");
    }


    if (AchievedMinutes == "") {
        $("#txtAchievedMinutes").addClass("customError");
        _isError = 1;
    }
    else {
        $("#txtAchievedMinutes").removeClass("customError");
    }

    //if (AchievedPercentage == "") {
    //    $("#txtAchievedPercentage").addClass("customError");
    //    _isError = 1;
    //}
    //else {
    //    $("#txtAchievedPercentage").removeClass("customError");
    //}

    if (SL != "") {
        var yr = parseInt(Year);
        const monthNames = ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (yr < new Date().getFullYear() || MonthSL < new Date().getMonth()) {
            _isError = 1;
            alert("Can not modify backdate entry");
        }
    }

    if (_isError == 1) {
        return false;
    }

    var _dbModel = {
        'SL': SL, 'Year': Year, 'MonthSL': MonthSL, 'Month': Month, 'Factory': Factory,
        'Unit': Unit, 'UOM': UOM, 'PlannedMinutes': PlannedMinutes, 'AchievedMinutes': AchievedMinutes, 'AchievedPercentage': AchievedPercentage
    };

    $.ajax({
        type: "POST",
        url: baseURL + "/ProducedMin/SaveProducedMin",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            if (data.success == true) {
                BindGridData();
                $("#modalProducedMin").modal("toggle");
                if (SL == 0) {
                    $.growl.notice({ title: "Save", message: "Data Save Successfully.." });
                }
                else {
                    $.growl.notice({ title: "Update", message: "Data Updated Successfully.." });
                }
            }
            ClearForm();
        }
    });
}
function GetEditData(SL) {
    //ClearForm();
    var _dbModel = { 'SL': SL };
    $.ajax({
        type: "POST",
        url: baseURL + "/ProducedMin/LoadSelectedProducedMin",
        data: JSON.stringify(_dbModel),
        contentType: "application/json",
        datatype: "json",
        success: function (data) {
            $.each(data, function (i, item) {
                $("#hdValue").val(item.SL);
                $("#ddlYear").val(item.Year);
                $("#ddlMonth").val(item.MonthSL);
                $("#ddlCompany").val(item.Factory);
                $("#ddlCompany").trigger("change");
                $("#ddlUnit").val(item.Unit);
                $("#ddlUOM").val(item.UOM);
                $("#txtPlannedMinutes").val(item.PlannedMinutes);
                $("#txtAchievedMinutes").val(item.AchievedMinutes);
                $("#txtAchievedPercentage").val(item.AchievedPercentage);
            });
            $("#modalProducedMin").modal("toggle");
        }
    });
}
function DeleteGridData(SL) {
    var ans = confirm("Are you sure to delete a record?");
    if (ans === true) {
        var _dbModel = { 'SL': SL };
        $.ajax({
            type: "POST",
            url: baseURL + "/ProducedMin/DeleteProducedMin",
            data: JSON.stringify(_dbModel),
            contentType: "application/json",
            datatype: "json",
            success: function (data) {
                if (data.success == true) {
                    BindGridData();
                    $.growl.notice({ title: "Delete", message: "Data Deleted Successfully.." });
                }
                else {
                    $.growl.notice({ title: "Delete", message: "Data Deleted Failed.." });
                }
            }
        });
    }
}
function ClearForm() {
    $(".txtcls").val("");
    $("#hdValue").val("");
    $(".txtcls").removeClass("customError");
    $("#ddlUnit").removeClass("customError");
    $("#ddlCompany").val("-1");
    $("#ddlCompany").trigger("change");
    //$("#ddlUnitId").empty();
    //$("#filter").val("");
}
