"use strict"
$(document).ready(function () {
    $(window).scroll(function () {

        var dh = $(document).height() - $("#footer").height(); // footer heihgt
        var wh = $(window).height();
        var st = $(window).scrollTop();
        var k = dh - (wh + st);
        if (k < (wh / 6) && !List.endRow) { //if (k < (wh / 6) && !ViewOrders.rowsOver)                
            List.GetData();
        }
    });
    List.Init();
});

var List = {

    callWait: false,
    filter: {},
    count: 0,
    sort: "",
    endRow: false,
    isClear: false,

    Columns: [
        { name: "No", width: "5%", classes:"base-table-mobile-hide", sort: "" },
        { name: "ID", width: "10%", classes: "base-table-mobile-hide", sort: "v.ID" },
        { name: "Üye", width: "10%", sort: "v.UserID" },
        { name: "Son Giriş", width: "20%", sort: "LastModifiedDate" },
        { name: "İlk Giriş", width: "20%", classes: "base-table-mobile-hide", sort: "VisitDate" },
        { name: "Ip Adresi", width: "20%", classes: "base-table-mobile-hide", sort: "" },
        { name: "İşlem", width: "15%", sort: "" },
    ],

    Init: function () {
        $("#Filter").keydown(function (e) {
            if (e.keyCode == 13) {
                List.Filter();
            }
        })
        List.CreateTable();
        List.Filter();

    },

    CreateTable: function () {
        var htmlTable = "",
            htmlColums = "";
        var sortAsc = "", sortDesc = "", sort = "", width = "";
        for (var i in this.Columns) {
            sortAsc = ""; sortDesc = ""; sort = ""; width = ""; 

            if (this.Columns[i].sort != "") {
                sortAsc = '<a title="Küçükten büyüğe sırala" onclick = "List.Sort(\'' + this.Columns[i].sort + '\',\'asc\',this);">' +
                    '<i class="sort-link sort-link-asc fa fa-arrow-circle-down"></i></a>';
                sortDesc = '<a title="Büyükten küçüğe sırala" onclick = "List.Sort(\'' + this.Columns[i].sort + '\',\'desc\',this);">' +
                    '<i class="sort-link sort-link-desc fa fa-arrow-circle-up"></i></a>';
                sort = '<a  name="Exp" sort="asc" title="Küçükten büyüğe sırala"  onclick = "List.Sort(\'' + this.Columns[i].sort + '\',$(this).attr(\'sort\'),this)" >' + this.Columns[i].name + '</a>';
            }
            else {
                sort = this.Columns[i].name;
            }

            if (this.Columns[i].width != "") {
                width = 'width:' + this.Columns[i].width + ';';
            }

            htmlColums += '<th ' + (this.Columns[i].classes ? 'class="'+this.Columns[i].classes+'"':"")+' style="text-align: center;white-space:normal;' + width + '">' + sortAsc + sort + sortDesc + '</th>';
        }

        htmlColums = '<thead><tr class="Heading3 GridHeadingTr">' + htmlColums + '</tr></thead>';
        htmlTable = '<table id="indexGrid" class="base-table" cellspacing="0" cellpadding="0" border="0" style="border-left: 1px solid #DDDDDD;">' +
            htmlColums + '<tbody id="tableRows"></tbody></table>';

        $("#ContainerTable").html(htmlTable);

    },


    GetData: function () {
        if (List.endRow || this.callWait)
            return;
        this.callWait = true;

        var prt = { rowNumber: List.count, flt: List.filter }

        Backend.Post(
            'GetList',
            prt,
            function (response) {

                if (!response.Success) {
                    SC.Modal.Ok(
                        "547869676345",
                        'HATA..!',
                        response.Message
                    )
                    List.callWait = false;
                    return;
                }
                List.AddRows(response.Data);
            }
        )
    },

    AddRows: function (rows) {
        var htmlRows = "", row;
        if (this.isClear)
            this.Clear();

        if (rows.length < 20 || rows.length == 0)
            List.endRow = true;

        for (var i in rows) {
            row = rows[i];
            List.count++;
            htmlRows += '<tr class="GridRow" onmouseout="this.className=\'GridRow\'" onmouseover="this.className=\'GridRowOver\'">'
                + '<td class="base-table-mobile-hide" style="text-align:center;">' + List.count + '</td>'
                + '<td class="base-table-mobile-hide" style="text-align:right;">' + row.ID + '</td>'
                + '<td class="">' + (row.UserID ? row.UserID : "") + '</td>'
                + '<td class="LastModifiedDate">' + row.LastModifiedDate + '</td>'
                + '<td class="base-table-mobile-hide">' + row.VisitDate + '</td>'
                + '<td class="base-table-mobile-hide">' + row.IPAdress + '</td>'
                + '<td style="text-align:center;" ><button class="btn btn-outline-info btn-sm" onclick="List.EditSupplierNoteDialog(' + row.ID + ',this)">Ekle</button></td>'
                + '</tr>';
        }


        $(htmlRows).appendTo($("#tableRows"));
        this.callWait = false;
    },

    Sort: function (colName, dir, e) {
        List.sort = colName + ' ' + dir;
        List.isClear = true;
        List.endRow = false;
        this.count = 0;
        List.Filter();

        $(e).closest("tr").first().find("a[name='Exp']").css("color", "#005FA3");
        $(e).parents("th").first().find("a[name='Exp']").css("color", "#ff0000");
        $(e).closest("tr").first().find("i").css("color", "#005FA3");
        if (dir == 'desc') {
            $(e).closest("th").first().find("i.sort-link-desc").css("color", "#ff0000");
            $(e).parents("th").first().find("a[name='Exp']").attr({ sort: "asc", title: "Küçükten büyüğe sırala" })
        }
        else {
            $(e).closest("th").first().find("i.sort-link-asc").css("color", "#ff0000");
            $(e).parents("th").first().find("a[name='Exp']").attr({ sort: "desc", title: "Büyükten küçüğe sırala" });
        }
    },

    Clear: function () {
        $("#tableRows").html("");
        this.isClear = false;
        this.count = 0;
        List.endRow = false;
    },

    GetRows: function () {
        List.isClear = true;
        List.endRow = false;
        this.count = 0;
        List.GetData();
    },

    Filter: function () {
        var o = { Sort: List.sort};
        var a = $(".filter-base-table *").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            }
            else {
                o[this.name] = this.value || '';
            }
        });
        List.filter = o;
        this.isClear = true;
        this.count = 0;
        List.endRow = false;
        this.GetData();
    },

    ClearFilter: function () {
        $("#Filter :text").val("");
        $("#Filter :hidden").val("");
        $('#selected-category-name').html('')
        $("#Filter :checkbox").removeAttr("checked")
        $("#Filter select").val(0);
        $("#Filter .select2").val(0).trigger("change");
        List.Filter();
    },

}