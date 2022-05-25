$(function () {
    clearLoginForm();
    $("#btnLoginUsers").click(function (e) {
        e.preventDefault();
        GetLoginInfo();
    });
    $("#btnForgetPassword").click(function (e) {
        e.preventDefault();
        $("#modalForgetPassword").modal("toggle");
    });
});
function GetLoginInfo() {
    //alert(G_RedirectUrl);
    var url = "";
    var _isError = 0;
    var _UserName = $("#txtUserName").val();
    var _Password = $("#txtPassword").val();
    if (_UserName == "") {
        $("#txtUserName").addClass('customError');
        _isError = 1;
    }
    else {
        $("#txtUserName").removeClass('customError');
    }
    if (_Password == "") {
        $("#txtPassword").addClass('customError');
        _isError = 1;
    }
    else {
        $("#txtPassword").removeClass('customError');
    }

    if (_isError == 1) {
        return false;
    }

    var user = { UserName: _UserName, Password: _Password };
    $.ajax({
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        url: baseURL + '/LogIn/GetLogInInfo',
        data: JSON.stringify(user),
        async: false,
        dataType: 'json',
        success: function (data) {
            if (data.Success == 'True') {
                if (G_RedirectUrl == "") {
                    window.location.href = baseURL + "/Dashboard/Index";
                }
                else {
                    url = G_RedirectUrl.split('//')[1];
                    var url2 = url.split('/')[0];
                    url = url.replace(url2, "");
                    window.location.href = url;
                }
            }
            else {
                alert("User Name Or Password Error..!");
            }
        }
    });
}

function clearLoginForm() {
    $("#txtUserName").removeClass('customError');
    $("#txtPassword").removeClass('customError');

    if (_LoginUserCode !== "")
        window.location.href = baseURL + "/Dashboard/Index";
}

$(document).ready(function () {
    $(document).on('click', '.signin-tab,#signin-taba', function (e) {
        e.preventDefault();
        $('#signin-taba').tab('show');
    });

    $(document).on('click', '.forgetpass-tab,#forgetpass-taba', function (e) {
        e.preventDefault();
        $('#reset_msg').hide();
        $('#forget_password form').show();
        $('#forgetpass-taba').tab('show');
        $('#funame').val('');
    });
    $(document).on('click', '#reset_btn', function (e) {
        e.preventDefault();
        $.post(baseURL + '/LogIn/ResetPassword', { userCode: $('#funame').val() }, function (response) {
            //alert(response.Data);
            $('#reset_msg').html(response.Data);
            $('#reset_msg').show();
            $('#forget_password form').hide();
        });
    });
});