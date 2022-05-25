(function ($) {
    $.fn.extend({
        MISPrint: function (option)
        {
            var defaults = {
                Title: 'Print This',
                PrintHeading:'Print This',
                //height: '40vh',
                width: '100%',
                parent: 'body',
                rowCondintion: null,
                rowsGroup: null,
                gridUrl: null,
                data: null,
                axis: null
            };
            var MISPrint = {};
            var menuState = 0;
            var menuWidth;
            var menuHeight;
            var menuPosition;
            var menuPositionX;
            var menuPositionY;
           
            var windowWidth;
            var windowHeight;
            var context = $(this);
            var extendOptions = $.extend(defaults, option);
            $('body').append("<ul id='mis-print-container' class='mis-print-container'><li><a class='context-menu__link' data-type='print'><i class='fa fa-print' aria-hidden='true'></i>" +
            "Print This</a></li><li><a class='context-menu__link' data-type='excell><i class='fa fa-file-excel-o' aria-hidden='true'></i>" +
            "Export to Excell</a></li></ul>");
            var menu = document.querySelector('#mis-print-container');
            context.on('contextmenu', function (event) {
                event.preventDefault();
                positionMenu(event);
                $('.mis-print-container').addClass('mis-print-container-active');
            });
            $('body').on('click', function () {
                $('.mis-print-container').removeClass('mis-print-container-active');
            });
            $('body').off('click', '.context-menu__link', contextMenuClick);
            $('body').on('click', '.context-menu__link', contextMenuClick);
            function contextMenuClick(e)
            {
                if ($(this).data('type') == 'print') {
                    PrintDiv(context.selector, extendOptions.Tile, extendOptions.PrintHeading);
                }
                if ($(this).data('type') == 'excell') {

                }
                $('.mis-print-container').removeClass('mis-print-container-active');
            }
            function positionMenu(e) {
                clickCoords = getPosition(e);
                clickCoordsX = clickCoords.x;
                clickCoordsY = clickCoords.y;

                menuWidth = menu.offsetWidth + 4;
                menuHeight = menu.offsetHeight + 4;

                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;

                if ((windowWidth - clickCoordsX) < menuWidth) {
                    menu.style.left = windowWidth - menuWidth + "px";
                } else {
                    menu.style.left = clickCoordsX + "px";
                }

                if ((windowHeight - clickCoordsY) < menuHeight) {
                    menu.style.top = windowHeight - menuHeight + "px";
                } else {
                    menu.style.top = clickCoordsY + "px";
                }
            }
            function getPosition(e) {
                var posx = 0;
                var posy = 0;

                if (!e) var e = window.event;

                if (e.pageX || e.pageY) {
                    posx = e.pageX;
                    posy = e.pageY;
                } else if (e.clientX || e.clientY) {
                    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                }

                return {
                    x: posx,
                    y: posy
                }
            }
            function PrintDiv(div, Title, text) {
                var divToPrint = document.getElementById(div);
                var popupWin = window.open('', '_blank', 'width=500,height=500');
                popupWin.document.open();
                popupWin.document.write('<html><head><title>' + Title + '</title><style type="text/css">td:first-child {' +
                'border-left: none;' +
                'text-align: left;}' +
                'th, td {font-family: calibri;text-align: center;width: auto !important;}' +
                '.tablePrint {' +
                'display: none !important;}' +
                'td {    border: 1px dotted black;    margin: 0px;    border-bottom: 0;    border-right: 0;    font-size: 15px;    font-family: calibri;}' +
                'table { border-spacing: 0;    border: 1px dotted;}' +
            '#divTitleName{font-weight: bold;margin-bottom: 20px;text-align: center;text-transform: uppercase;font-family: calibri;}#divheaderLogo{text-align: center;}.tblHead{font-weight: bold; padding-right: 20px;text-align: right;width: 25%;}.tblHeadOut{font-weight: bold; padding-right: 20px;text-align: right;width: 25%;}</style></head><body onload="window.print()"><div id="divheaderLogo"><img  src="' + baseURL + '/CustomContents/img/MGL.png" class="imglogo"></div><div id="divTitleName">' + text + '</div>'
            + divToPrint.outerHTML + '</html>');
                popupWin.document.close();
            }
        }
    });
})(jQuery)