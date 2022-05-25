(function ($) {
    $.fn.extend({
        MISGrid: function (option,filterOption=false) {
            try {
                var defaults = {
                    Container: '.table',
                    //height: '40vh',
                    width: null,
                    parent: 'body',
                    rowCondintion: null,
                    rowsGroup: null,
                    gridUrl: null,
                    data: null,
                    axis: null,
                    hideColumn: null,
                    scrollColor: '#F44917',
                    paging: false,
                    pageLength: 100,
                    AjaxType: "GET",
                    DataAsync: true,
                };
                var MISGrid = {};
                MISGrid.Grid = null;
                MISGrid.DataCount = 0;
                var context = $(this);
                var extendOptions = $.extend(defaults, option);

                var ajaxOpt =
                     {
                         type: 'GET',
                         contentType: 'application/json; charset=utf-8',
                            url: baseURL + extendOptions.gridUrl,
                         global:true,
                         async: extendOptions.DataAsync,
                         type: extendOptions.AjaxType,
                         dataType: 'json',
                         success: function (data) {

                             MISGrid.DataCount = data.length;
                             if (data.length > 0) {
                                 setTimeout(function () {
                                     PopulateSkillMappingDetailsList(data);
                                     if (extendOptions.onLoadComplete != undefined)
                                         extendOptions.onLoadComplete(MISGrid.Grid, data);
                                     MISGrid.Grid.columns.adjust();
                                     MISGrid.Grid.columns.adjust();
                                     //if (extendOptions.height != null) {

                                     //    var temThead = context.closest('.dataTables_scroll').find('.dataTables_scrollHeadInner thead tr');
                                     //    //temThead.empty();
                                     //    var tr = "<tr>";
                                     //    var contextThead = context.find('tbody tr');
                                     //    contextThead.find('td').each(function (index)
                                     //    {
                                     //        temThead.find('th')[index].height = $(this).height();
                                     //    });
                                     //   // tr += '</tr>';
                                     //   // context.closest('.dataTables_scroll').find('.dataTables_scrollHeadInner thead').html(tr);
                                     //}
                                 }, 500);
                             }
                             else {

                                 $.growl.notice({ title: "Message", location: "bl", message: "No Data Found" });
                             }
                         }, error: function (data) {
                             console.log(data);
                         }

                     };
                if (extendOptions.DataParam != null)
                    ajaxOpt.data = extendOptions.DataParam;
                if (extendOptions.gridUrl != null)
                    $.ajax(ajaxOpt);
                if (extendOptions.data != null && extendOptions.data.length > 0) {
                    PopulateSkillMappingDetailsList(extendOptions.data);
                    if (extendOptions.onLoadComplete != undefined)
                        extendOptions.onLoadComplete(MISGrid.Grid, extendOptions.data);
                }
            }
            catch (ex) {
                console.log(ex);
            }
            function PopulateSkillMappingDetailsList(data) {
                if (MISGrid.Grid != undefined) {
                    MISGrid.Grid.destroy().draw(false);
                    context.empty();
                }

                var columnsName = [];
                //columnsName.push({ 'title': 'CATEGORY','name':'mCategory','width':'15px'});
                var count = 1;
                for (var prop in data[0].Columns) {
                    //itemArray.push(BusinessPlan[i].Months[prop]);
                    if (extendOptions.hideColumn != null && extendOptions.hideColumn.indexOf(prop) > -1)
                        continue;
                    //columnsName.push({ 'title': '' + prop + '', 'name': prop, "visible": false, })//className: "hide_column"

                    columnsName.push({ 'title': '' + prop + '', 'name': prop });
                }

                var DataArray = [];
                for (var i = 0; i < data.length; i++) {

                    var item = data[i];
                    var itemArray = [];
                    for (var prop in data[i].Columns) {
                        if (extendOptions.hideColumn != null && extendOptions.hideColumn.indexOf(prop) > -1)
                            continue;
                        itemArray.push(Number(data[i].Columns[prop]) == 0 ? "" : data[i].Columns[prop]);
                    }
                    DataArray.push(itemArray);
                }
                var aoColumnDefs = [];
                for (var i = 0; i < columnsName.length; i++) {
                    aoColumnDefs.push(i);
                }

                var dataSource = data;
                var dataTableOpt = {
                    createdRow: function (row, data, dataIndex) {
                        if (extendOptions.rowCondintion != null) {
                            extendOptions.rowCondintion(row, data, columnsName, dataSource[dataIndex]);
                        }
                    },
                    destroy: true,
                    data: DataArray,
                    "bFilter": filterOption,
                    "bInfo": false,
                    "bSort": false,
                    paging: extendOptions.paging,
                    "pageLength": extendOptions.pageLength,
                    "bLengthChange": false,
                    orderable: false,
                    responsive: true,
                    //"bAutoWidth": false,
                    scrollCollapse: false,
                    "bProcessing": false,
                    "aoColumnDefs": [{ "bSortable": false, "aTargets": aoColumnDefs }],
                    columns: columnsName,
                    "initComplete": function () {
                        //if (extendOptions.onLoadComplete != undefined)
                        //    extendOptions.onLoadComplete(MISGrid.Grid);
                    }
                };
                if (extendOptions.rowsGroup != null)
                    dataTableOpt.rowsGroup = extendOptions.rowsGroup;
                if (extendOptions.height != null) {
                    dataTableOpt.scrollY = extendOptions.height;
                    dataTableOpt["initComplete"] = function () {
                        //context.find('thead  th').empty();
                    };
                }
                if (extendOptions.width != null) {
                    dataTableOpt.scrollX = true;
                    //dataTableOpt.sScrollX = "100%";
                }
                MISGrid.Grid = $(context).DataTable(dataTableOpt);
                //$(context).on('draw.dt', function () {
                //    $('.dataTables_scrollBody thead tr').addClass('hidden')
                //});
                if (extendOptions.axis != null) {
                    //if (extendOptions.axis == 'both') {
                    //    $('' + extendOptions.parent + ' .dataTables_scrollBody').slimScroll({
                    //        axis: 'both', height: extendOptions.height, alwaysVisible: true,
                    //        width: '100%', wheelStep: 150, color: extendOptions.scrollColor, opacity: 0.7, size: '10px', allowPageScroll: false
                    //    });
                    //}
                    //if (extendOptions.axis == 'x') {
                    //    $('' + extendOptions.parent + ' .dataTables_scrollBody').slimScroll({
                    //        axis: 'x', alwaysVisible: true,
                    //        width: '100%', wheelStep: 150, color: extendOptions.scrollColor, opacity: 0.7, size: '10px', allowPageScroll: false
                    //    });
                    //}
                    //if (extendOptions.axis == 'y') {
                    //    $('' + extendOptions.parent + ' .dataTables_scrollBody').slimScroll({
                    //        axis: 'y', height: extendOptions.height, alwaysVisible: true, width: extendOptions.width,
                    //        wheelStep: 150, color: extendOptions.scrollColor, opacity: 0.7, size: '10px', allowPageScroll: false
                    //    });
                    //}

                }
            }
            $.fn.misGrid = MISGrid;
            return $.fn.misGrid;
        }
    });

}
)(jQuery);