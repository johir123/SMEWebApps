//function ShowHideTableDetails(tableName) {
//    var table = $('#' + tableName).DataTable();
//    var tr = $(this).closest('tr');
//    var row = table.row(tr);

//    if (row.child.isShown()) {
//        // This row is already open - close it
//        row.child.hide();
//        tr.removeClass('shown');
//    }
//    else {
//        // Open this row
//        row.child(format(row.data())).show();
//        tr.addClass('shown');
//    }
//}