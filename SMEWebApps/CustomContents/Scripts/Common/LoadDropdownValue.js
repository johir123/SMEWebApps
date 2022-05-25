function BindddlWithID(ddlName, data) {
    $("#" + ddlName).empty();
    $("#" + ddlName).append($("<option ></option>").val("-1").html("-Select-"));
    $.each(data, function (i, item) {
        $("#" + ddlName).append($("<option ></option>").val(item.Code).html(item.Value));
    });
}

function BindddlWithEmployeeCode(ddlName, ControllerName, MethodsName, SpName, QryOption, SelectedValue, EmployeeCode, SelectedText) {
    
    var _dbModel = { 'SpName': SpName, 'QryOption': QryOption, 'EmployeeCode': EmployeeCode };
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + "/" + ControllerName + "/" + MethodsName,
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: 'json',
        success: function (data) {
            //$("#loading").css({ display: "none" });
            if (SelectedText != "") {
                $("#" + ddlName).append($("<option ></option>").val("-1").html(SelectedText));
            }
            $.each(data, function (i, item) {
                $("#" + ddlName).append($("<option ></option>").val(item.Code).html(item.Value));
            });
        }
    });

    if (SelectedValue != "")
        $("#" + ddlName).val(SelectedValue);
}
function BindddlWithEmployeeWithClass(ddlName, ControllerName, MethodsName, SpName, QryOption, SelectedValue, EmployeeCode, SelectedText) {
    var _dbModel = { 'SpName': SpName, 'QryOption': QryOption, 'EmployeeCode': EmployeeCode };
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + "/" + ControllerName + "/" + MethodsName,
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: 'json',
        success: function (data) {
            if (SelectedText != "") {
                $("." + ddlName).append($("<option ></option>").val("-1").html(SelectedText));
            }
            $.each(data, function (i, item) {
                $("." + ddlName).append($("<option ></option>").val(item.Code).html(item.Value));
            });
        }
    });

    if (SelectedValue != "")
        $("#" + ddlName).val(SelectedValue);
}

function BindddlWithParameter(ddlName, ControllerName, MethodsName, SpName, QryOption, SelectedValue, Param1, SelectedText) {

    var _dbModel = { 'SpName': SpName, 'QryOption': QryOption, 'Param1': Param1 };
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + "/" + ControllerName + "/" + MethodsName,
        data: JSON.stringify(_dbModel),
        async: false,
        dataType: 'json',
        success: function (data) {
            $("#" + ddlName).empty();

            if (SelectedText != "") {
                $("#" + ddlName).append($("<option ></option>").val("-1").html(SelectedText));
            }
            $.each(data, function (i, item) {
                $("#" + ddlName).append($("<option ></option>").val(item.Code).html(item.Value));
            });

        }
    });

    if (SelectedValue != "")
        $("#" + ddlName).val(SelectedValue);

    $("#" + ddlName).selectpicker('refresh');
}


function BindddlWithParameter_lf(ddlName, ControllerName, MethodsName, SpName, QryOption, SelectedValue, Param1, SelectedText) {

    var _dbModel = { 'SpName': SpName, 'QryOption': QryOption, 'Param1': Param1 };
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + "/" + ControllerName + "/" + MethodsName,
        data: JSON.stringify(_dbModel),
        async: false,
        global: false,
        dataType: 'json',
        success: function (data) {
            $("#" + ddlName).empty();

            if (SelectedText != "") {
                $("#" + ddlName).append($("<option ></option>").val("-1").html(SelectedText));
            }
            $.each(data, function (i, item) {
                $("#" + ddlName).append($("<option ></option>").val(item.Code).html(item.Value));
            });

        }
    });

    if (SelectedValue != "")
        $("#" + ddlName).val(SelectedValue);

    $("#" + ddlName).selectpicker('refresh');
}
