
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
                List.callWait = false;
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
                + '<div class="blog-cart col-12 row">'
                + '         <div class="blog-image col-lg-12 col-xs-12 col-sm-12"  >'

                + ' <a href="/Blog/Detail/' + row.UrlName + '">'
                + ' <img alt="' + row.UrlName + '"  src="https://furkankorkusuz.com/Uploads/Images/Blog/' + (row.TitleImage.length > 0 ? row.TitleImage : "no-image.png") + '" style="max-width:100%"   />'
                + '         </a>'
                + '         </div>'
                + '         <div class="blog-title  col-lg-12  col-xs-12 col-sm-12 " onclick="List.GoToDetail(' + row.UrlName + ')">'
                + '             <h2><a href="/Blog/Detail/' + row.UrlName + '">' + row.Title + '</h2></a>'
                + '             <h6>' + row.Summary + '</h62>'
                + '         </div>'
                + '         <div class="blog-detail-link  col-lg-4 col-md-4 col-xs-12 col-sm-12 ">'
                + '       <a class="btn btn-info" href="/Blog/Detail/' + row.UrlName + '"  alt="' + row.Title + '">Devamı <i class="fas fa-angle-double-right"></i></a>'
                + '         </div>'
                + '         <div class="blog-detail-link  col-lg-4 col-md-4 col-xs-12 col-sm-12 ">'
                + '<i class="fas fa-hourglass-start"></i> <i> Süre ' + row.ReadingMinute + ' dk.</i>'
                + '         </div>'
                + '         <div class="blog-detail-link  col-lg-4 col-md-4 col-xs-12 col-sm-12 ">'
                + '<i class="fas fa-eye"></i> Okunma ' + row.ReadCount + '</i>'
                + '         </div>'
                + '</div>';

        }




        $(htmlRows).appendTo($("#entityList"));

        this.callWait = false;

    },

    GoToDetail: function (urlName) {
        document.location = 'Blog/Detail/ ' + urlName
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
        var search = window.location.search.split('?')[1];
        if (search) {
           var queryFilter = '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}';
            var d = $.parseJSON(queryFilter);
        }
        var o = $.extend({}, { Sort: List.sort }, search ? d : {});
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