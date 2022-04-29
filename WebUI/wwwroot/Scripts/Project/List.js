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
    FilterObjects: {},

    Init: function () {
        $(".filter-base-table").keydown(function (e) {
            if (e.keyCode == 13) {
                List.Filter();
            }
        })
        List.Filter();

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
            htmlRows += ''

            + '<div class="project-cart col-12 row" style="border-bottom:1px solid #eee;margin-top:3%;padding:5px;">'
                + '         <div class="project-image col-lg-3 col-xs-12 col-sm-12"  >'

                + ' <a href="/Project/Detail/' + row.UrlName + '">'
                + ' <img alt="' + row.UrlName + '"  src="https://furkankorkusuz.com/Uploads/Images/Project/' + row.Image  + '" width="200px;"   />'
                + '         </a>'
                + '         </div>'
                + '         <div class="project-title  col-lg-6  col-xs-12 col-sm-12 " onclick="List.GoToDetail(' + row.UrlName + ')">'
                + '             <h2><a href="/Project/Detail/' + row.UrlName + '">' + row.Title + '</h2></a>'
                + '         </div>'
                + '         <div class="project-detail-link  col-lg-3 col-xs-12 col-sm-12 ">'
                + '       <a class="btn btn-info" href="/Project/Detail/' + row.UrlName + '"  alt="' + row.Title + '">Detaylar <i class="fas fa-angle-double-right"></i></a>'
                + '         </div>'
                + '</div>';

        }

        $(htmlRows).appendTo($("#entityList"));

        this.callWait = false;

    },

    Sort: function (colName, dir, e) {
        List.sort = colName + '_' + dir;
        List.isClear = true;
        List.endRow = false;
        this.count = 0;
        List.GetData();

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
        $("#entityList").html("");
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
        var o = { Sort: List.sort };
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
        $(".filter-base-table :text").val("");
        $(".filter-base-table :hidden").val("");
        $(".filter-base-table :checkbox").removeAttr("checked")
        $(".filter-base-table select").val(0);
        $(".filter-base-table .select2").val(0).trigger("change");
        List.Filter();
    },

}