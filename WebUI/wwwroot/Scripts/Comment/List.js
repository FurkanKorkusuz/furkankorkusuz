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
    id: 0,
    entity: null,

    Columns: [
        { name: "No", width: "5%", classes: "base-table-mobile-hide", sort: "" },
        { name: "ID", width: "5%", classes: "base-table-mobile-hide", sort: "ID" },
        { name: "BlogID", width: "5%", sort: "Name" },
        { name: "Kullanıcı", width: "10%", sort: "Name" },
        { name: "Yorum", width: "50%", sort: "Name" },
        { name: "İşlem", width: "25%", sort: "" },
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

            htmlColums += '<th ' + (this.Columns[i].classes ? 'class="' + this.Columns[i].classes + '"' : "") + ' style="text-align: center;white-space:normal;' + width + '">' + sortAsc + sort + sortDesc + '</th>';
        }

        htmlColums = '<thead><tr class="Heading3 GridHeadingTr">' + htmlColums + '</tr></thead>';
        htmlTable = '<table id="indexGrid" class="base-table" cellspacing="0" cellpadding="0" border="0" style="border-left: 1px solid #DDDDDD;">' +
            htmlColums + '<tbody id="tableRows"></tbody></table>';

        $("#entityList").html(htmlTable);

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
                + '<td class="LastModifiedDate">' + row.BlogID + '</td>'
                + '<td class="LastModifiedDate">' + row.UserID + '</td>'
                + '<td class="LastModifiedDate">' + row.Content + '</td>'

                + '<td style="text-align:center;" ><button class="btn btn-outline-info btn-sm" onclick="List.FindForEdit(' + row.ID + ',this)">Düzenle</button></td>'
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
        $("#Filter :text").val("");
        $("#Filter :hidden").val("");
        $('#selected-category-name').html('')
        $("#Filter :checkbox").removeAttr("checked")
        $("#Filter select").val(0);
        $("#Filter .select2").val(0).trigger("change");
        List.Filter();
    },


    FindForEdit: function (id) {
        List.id = id
        Backend.Post(
            'Get',
            { id: id },
            function (response) {
                if (!response.Success) {
                    SC.Modal.Ok(
                        "547869676345",
                        'HATA..!',
                        response.Message
                    )
                    return;
                }
                List.entity = response.Data;
                List.EditDialog(response.Data);
            }
        )
    },

    EditDialog: function (entity) {
        var htmlContent = ''

            + ' <div class="row" id="EditDialogForm">'
            + '     <input type="hidden"  name="ID" id="editID" value="' + entity.ID + '" />'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="editContent" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Yorum</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '            <textarea type="text" class="form-control  tabkey" name="Content" id="editContent">' + entity.Content + '</textarea>'
            + '        </div>'
            + '    </div>'


            + '</div>'
            + '<div style="display:none;margin-top:3px;" class="alert alert-danger" id="EditDialogError"></div>'

        List.modal = SC.Modal.Confirm(
            "678978gwe",
            "Kategori Ekle",
            htmlContent,
            function () {
                List.Edit()
            },
            null,
            null,
            {
                CloseOnOk: false,
                OnShown: function () {
                    $("#editName")
                        .focus()
                        .select();
                    $('#ConfirmModal_6789784').on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            List.Edit()
                        }
                        var jqTarget = $(e.target);
                        if (e.keyCode == 9) {

                            var jqVisibleInputs = $('#ConfirmModal_6789784 .tabkey');
                            var jqFirst = jqVisibleInputs.first();
                            var jqLast = jqVisibleInputs.last();

                            if (!e.shiftKey && jqTarget.is(jqLast)) {
                                e.preventDefault();
                                jqFirst.focus();
                            } else if (e.shiftKey && jqTarget.is(jqFirst)) {
                                e.preventDefault();
                                jqLast.focus();
                            }
                        }

                    });
                },
            }
        )
    },

    Edit: function () {
        // Content validation
        if ($('#editContent').val() == '') {
            $('#EditDialogError')
                .html('Lütfen Yorum giriniz.')
                .show()
            $('#editContent').css('border', '1px solid #f33')
            return;
        }

        var prt = {
            ID: List.id,
            BlogID: List.entity.BlogID,
            UserID: List.entity.UserID,
            ParentID: List.entity.ParentID,
            CreatedDate: '',
            Content: $('#editContent').val(),

        }
        Backend.Post(
            "Edit",
            { entity: prt },
            function (response) {
                if (!response.Success) {
                    $('#EditDialogError')
                        .html("Etiket düzenlenemedi. \n " + response.Message)
                        .show()
                    return;
                }
                List.modal.Remove();
                List.Filter()
            },
        )
    },

    DeleteDialog: function () {
        var htmlContent = ''

            + '<div style="margin-top:3px;" class="alert alert-danger" id="DeleteDialogError">Seçtiğiniz Etiket bloglara atanmamış ise silinecektir.<br>Onaylıyor musunuz?</div>'

        List.modal = SC.Modal.Confirm(
            "678978afcgwe",
            "Yorum Sil",
            htmlContent,
            function () {
                Backend.Post(
                    "Delete",
                    { entity: prt },
                    function (response) {
                        if (!response.Success) {
                            $('#DeleteDialogError')
                                .html("Yorum Silinemedi. \n " + response.Message)
                                .show()
                            return;
                        }
                        List.Filter()
                    },

                )
            },
            null,
            null,
            {
                CloseOnOk: false,
            }
        )
    },
}