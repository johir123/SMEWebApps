function HideErrorMsg() {
    if ($('.error-content').is(":visible"))
        $(".error-content").animate({ height: 'toggle' });
}
function ShowError(error) {
    var customErrorList = error.split(',');
    var errorStr="";
    for (var i = 0; i < customErrorList.length; i++)
    {

        if (customErrorList[i]!='')
        errorStr += "<li>" + customErrorList[i] + "</li>";
    }
    if ($('.error-content').length == 0)
        AddCustomError();
    $('#ulErrorList li').remove();
    $('#ulErrorList').append(errorStr);
    if (!($('.error-content').is(":visible")))
        $(".error-content").animate({ height: 'toggle' });
    

    setTimeout(HideErrorMsg, 5000);
}
function AddCustomError() {

    $('body').append("<div class='error-content' style='display: none;'>"
        +"<a href='javascript:void(0)' onclick='HideErrorMsg()'><i class='fa fa-remove fa-fw close-error'></i></a>" 
        +"<ul id='ulErrorList'>"
        +"</ul>"
    +"</div>");
}