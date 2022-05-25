function MakeDate(stringDate) {
    debugger;
    var monName = stringDate.substring(3, 6);
    var dd = stringDate.substring(0, 2);
    var yy = stringDate.substring(11, 7);
    var makeDt = '';
    var monSl;
    switch (monName) {
        case 'Jan':
            monSl = '01';
            break;
        case 'Feb':
            monSl = '02';
            break;
        case 'Mar':
            monSl = '03';
            break;
        case 'Apr':
            monSl = '04';
            break;
        case 'May':
            monSl = '05';
            break;
        case 'Jun':
            monSl = '06';
            break;
        case 'Jul':
            monSl = '07';
            break;
        case 'Aug':
            monSl = '08';
            break;
        case 'Sep':
            monSl = '09';
            break;
        case 'Oct':
            monSl = '10';
            break;
        case 'Nov':
            monSl = '11';
            break;
        case 'Dec':
            monSl = '12';
            break;
        default:
            monSl = '0';
    }
    if (monSl != '0') {
        makeDt = yy + ' ' + monSl + ' ' + dd;
    }
    return makeDt;
}

function ValidDateEqualOrGreater(testDate, standardDate) {
    var _testDate = new Date(testDate);
    var _standardDate;
    if (standardDate) {
        _standardDate = new Date(standardDate);
    } else {
        var nd = new Date();
        var da = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate());
        _standardDate = da;
    }
    if (_testDate >= _standardDate) {
        return true;
    } else {
        return false;
    }

}

function ValidDateEqual(testDate, standardDate) {
    var _testDate = new Date(testDate);
    var _standardDate;
    if (standardDate) {
        _standardDate = new Date(standardDate);
    } else {
        var nd = new Date();
        var da = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate());
        _standardDate = da;
    }
    if (_testDate == _standardDate) {
        return true;
    } else {
        return false;
    }

}
function ValidDateEqualOrLess(testDate, standardDate) {
    var _testDate = new Date(testDate);
    var _standardDate;
    if (standardDate) {
        _standardDate = new Date(standardDate);
    } else {
        var nd = new Date();
        var da = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate());
        _standardDate = da;
    }
    if (_testDate <= _standardDate) {
        return true;
    } else {
        return false;
    }
}

function ValidDateGether(testDate, standardDate) {
    var _testDate = new Date(testDate);
    var _standardDate;
    if (standardDate) {
        _standardDate = new Date(standardDate);
    } else {
        var nd = new Date();
        var da = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate());
        _standardDate = da;
    }
    if (_testDate > _standardDate) {
        return true;
    } else {
        return false;
    }

}


function ValidDateLess(testDate, standardDate) {
    var _testDate = new Date(testDate);
    var _standardDate;
    if (standardDate) {
        _standardDate = new Date(standardDate);
    } else {
        var nd = new Date();
        var da = new Date(nd.getFullYear(), nd.getMonth(), nd.getDate());
        _standardDate = da;
    }
    if (_testDate < _standardDate) {
        return true;
    } else {
        return false;
    }
}

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true);
    } else {

        return (false);
    }
  
}

function LoadDropDown(url, data, type, targetField, optionFirstText) {

    var _type = type == null || type == ' undefined' || type.length == 0 ? 'GET' : 'POST';
    var _optionFirstText = optionFirstText == 'undefined' || optionFirstText == '' ? '' : optionFirstText;
    
    $.ajax({
        url: url,
        type:_type,
        data: data,
        async:false,
        dataType: 'json',
        success: function (data) {
            if (data.Data.length > 0) {
                $.each(data.Data, function (i, v) {
                    _optionFirstText = _optionFirstText + '<option value="' + v.Value + '">' + v.Text + '</option>';
                });
                $(targetField).html("");
                $(targetField).html(_optionFirstText);
            } else {
                $(targetField).html("");
            }
        }, error: function () {
            alert("Server Error.");
        }
    });
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}