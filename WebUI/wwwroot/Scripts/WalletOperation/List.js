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

    Columns: [
        { name: "No", width: "5%", classes: "base-table-mobile-hide", sort: "" },
        { name: "Tarih", width: "25%", sort: "CreatedDate" },
        { name: "Detay", width: "25%", sort: "" },
        { name: "Tutar", width: "15%", sort: "Amount" },
        { name: "İşlem", width: "20%", sort: "" },
    ],

    Init: function () {
        $("#filter-base-table :input").keydown(function (e) {
            if (e.keyCode == 13) {
                List.Filter();
            }
        })
        $("#filter-base-table :input,#filter-base-table select").on("change", function (e) {
            List.Filter();
        })
         

        var htmlWalletOptions = '';
        $.each(SelectOptions.WalletList, function (i, v) {
            htmlWalletOptions += '<option value="' + v.ID + '">' + v.Name + '</option>'
        });
        $('#filter-base-table [name="WalletID"]').html('<option value="0">-Seçiniz-</option>' + htmlWalletOptions)
        $(".select2").select2();
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

        var total = 0;

        for (var i in rows) {
            row = rows[i];
            List.count++;
            total += row.IsInput ? row.Amount : row.Amount*-1

            htmlRows += '<tr class="GridRow" onmouseout="this.className=\'GridRow\'" onmouseover="this.className=\'GridRowOver\'">'
                + '<td class="base-table-mobile-hide" style="text-align:right;">' + List.count + '</td>'
                + '<td class="CreatedDate" style="text-align:left;font-size:13px;">' + row.CreatedDate + '</td>'
                + '<td class="Description" style="text-align:left;font-size:13px;">' + row.Description + '</td>'
                + '<td class="Amount ' + (row.IsInput ? "InputAmount" : "OutputAmount") + '"  style="text-align:right;">' + row.Amount.toFixed(2) + '</td>'
                + '<td style="text-align:center;" >'
                + '<button class="btn btn-outline-info btn-sm" onclick="List.FindForEdit(' + row.ID + ',this)"><i class="fas fa-edit"></i></button>'
                + '<button class="btn btn-outline-danger btn-sm" onclick="List.DeleteDialog(' + row.ID + ',this)"><i class="fas fa-trash-alt"></i></button></td>'
                + '</tr>';
        }
        htmlRows += '<tr><td  class="base-table-mobile-hide" ></td><td></td><td style="text-align:right;"><b>Toplam</b></td><td style="text-align:right;font-weight:900;">' + total.toFixed(2) + '</td><td></td></tr>'

        $(htmlRows).appendTo($("#tableRows"));
    },

    Sort: function (colName, dir, e) {
        List.sort = colName + ' ' + dir;
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
        var a = $("#filter-base-table *").serializeArray();
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
        this.callWait = false;
        this.GetRows();
    },

    ClearFilter: function () {
        $("#filter-base-table :text").val("");
        $("#filter-base-table :checkbox").removeAttr("checked")
        $("#filter-base-table select").val(0);
        List.Filter();
    },



    AddDialog: function () {
        var htmlWalletOptions = '';
        $.each(SelectOptions.WalletList, function (i, v) {
            htmlWalletOptions += '<option value="' + v.ID + '">' + v.Name + '</option>'
        });
        var htmlWOCOptions = '';
        $.each(SelectOptions.CategoryList, function (i, v) {
            htmlWOCOptions += '<option value="' + v.ID + '">' + v.Name + '</option>'
        });

        var htmlContent = ''

            + ' <div class="row" id="AddDialogForm">'


            + '<div class="btn-group row col-12">'
            + '        <div class="col-md-6  col-lg-6">'
            + '<input type="radio" class="btn-check" name="IsInput" id="btnInput" value="0" autocomplete="off" checked  style="display:none;"/>'
            + '<label class="btn btn-danger btn-block" for="btnInput" id="lblInput"><i class="fas fa-minus"></i> Harcama</label>'
            + '        </div>'
            + '        <div class="col-md-6  col-lg-6">'
            + '<input type="radio" class="btn-check" name="IsInput" id="btnOutput"  value="1" autocomplete="off" style="display:none;"/>'
            + '<label class="btn btn-outline-success  btn-block" for="btnOutput" id="lblOutput"><i class="fas fa-plus"></i> Ekleme</label>'
            + '        </div>'
            + '</div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="addWalletID" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Hesap</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '             <select id="addWalletID"  class="select2 form-control  tabkey">' + htmlWalletOptions+'</select>'
            + '        </div>'
            + '    </div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="addWalletOperationCategoryID" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Kategori</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '             <select id="addWalletOperationCategoryID"  class="select2 form-control  tabkey">' + htmlWOCOptions + '</select>'
            + '        </div>'
            + '    </div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="addAmount" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Miktar</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '            <input type="number" step="0.01" class="form-control  tabkey" name="Amount" id="addAmount" />'
            + '        </div>'
            + '    </div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="addDescription" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Açıklama</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '            <input type="text" class="form-control  tabkey" name="Description" id="addDescription" />'
            + '        </div>'
            + '    </div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="addCreatedDate" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Tarih</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '            <input type="text"  class="form-control  tabkey datepicker" name="CreatedDate" id="addCreatedDate" />'
            + '        </div>'
            + '    </div>'


            + '</div>'
            + '<div style="display:none;margin-top:3px;" class="alert alert-danger" id="AddDialogError"></div>'

        List.modal = SC.Modal.Confirm(
            "678978gwe",
            "Yeni İşlem Ekle",
            htmlContent,
            function () {
                List.Add()
            },
            null,
            null,
            {
                CloseOnOk: false,
                OnShown: function () {
                    $('#ConfirmModal_6789784').on('keydown', function (e) {
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
                        if (e.keyCode == 13) {
                            List.Add()
                        }
                    });
                    $('input[name="IsInput"]').on('click', function (e) {
                        if ($(this).val() == 0) {
                            $('#lblInput').removeClass('btn-outline-danger')
                            $('#lblInput').addClass('btn-danger')
                            $('#lblOutput').removeClass('btn-success')
                            $('#lblOutput').addClass('btn-outline-success')
                        }
                        else {
                            $('#lblOutput').removeClass('btn-outline-success')
                            $('#lblOutput').addClass('btn-success')
                            $('#lblInput').removeClass('btn-danger')
                            $('#lblInput').addClass('btn-outline-danger')
                        }
                    })
                    $(".datepicker").datepicker({
                        format: "dd-mm-yyyy",
                        autoclose: true,
                        todayHighlight: true,
                        clearBtn: true,
                    }).on('hide', function (e) {
                        e.stopPropagation();
                    });
                },
            }
        )
    },

    Add: function () {
        // Description validation
        if ($('#addDescription').val() == '') {
            $('#AddDialogError')
                .html('Lütfen Açıklama giriniz.')
                .show()
            $('#addDescription').css('border', '1px solid #f33')
            return;
        }
        // CreatedDate validation
        if ($('#addCreatedDate').val() == '') {
            $('#AddDialogError')
                .html('Lütfen Tarih giriniz.')
                .show()
            $('#addCreatedDate').css('border', '1px solid #f33')
            return;
        }

        var prt = {
            ID: 0,
            IsInput: $('input[name="IsInput"]:checked').val() == 1,
            WalletID: $('#addWalletID').val(),
            CreatedDate: $('#addCreatedDate').val(),
            Amount: $('#addAmount').val() == "" ? 0 : $('#addAmount').val().replace('.', ','),
            Description: $('#addDescription').val(),
            WalletOperationCategoryID: $('#addWalletOperationCategoryID').val()
        }
        Backend.Post(
            "Add",
            { entity: prt },
            function (response) {
                if (!response.Success) {
                    $('#AddDialogError')
                        .html("İşlem eklenemedi. \n " + response.Message)
                        .show()
                    return;
                }
                List.modal.Remove();
                List.Filter();
            },
        )
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

                List.EditDialog(response.Data);
            }
        )
    },

    EditDialog: function (entity) {
        var htmlWalletOptions = '';
        $.each(SelectOptions.WalletList, function (i, v) {
            htmlWalletOptions += '<option ' + (v.ID == entity.WalletID ? 'selected="selected"' : '') + ' value="' + v.ID + '">' + v.Name + '</option>'
        });
        var htmlWOCOptions = '';
        $.each(SelectOptions.CategoryList, function (i, v) {
            htmlWOCOptions += '<option ' + (v.ID == entity.WalletOperationCategoryID ? 'selected="selected"':'') + ' value="' + v.ID + '">' + v.Name + '</option>'
        });
        var htmlContent = ''

            + ' <div class="row" id="EditDialogForm">'
            + '     <input type="hidden"  name="ID" id="editID" value="' + entity.ID + '" />'

            + '<div class="btn-group row col-12">'
            + '        <div class="col-md-6  col-lg-6">'
            + '<input type="radio" class="btn-check" name="editIsInput" id="editbtnInput" value="0" autocomplete="off" checked  style="display:none;"/>'
            + '<label class="btn btn-outline-danger btn-block" for="editbtnInput" id="editlblInput"><i class="fas fa-minus"></i> Harcama</label>'
            + '        </div>'
            + '        <div class="col-md-6  col-lg-6">'
            + '<input type="radio" class="btn-check" name="editIsInput" id="editbtnOutput"  value="1" autocomplete="off" style="display:none;"/>'
            + '<label class="btn btn-outline-success  btn-block" for="editbtnOutput" id="editlblOutput"><i class="fas fa-plus"></i> Ekleme</label>'
            + '        </div>'
            + '</div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="editWalletID" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Hesap</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '             <select id="editWalletID"  class="select2 form-control  tabkey">'+htmlWalletOptions+'</select>'
            + '        </div>'
            + '    </div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="editWalletOperationCategoryID" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Kategori</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '             <select id="editWalletOperationCategoryID"  class="select2 form-control  tabkey">' + htmlWOCOptions + '</select>'
            + '        </div>'
            + '    </div>'


            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="editAmount" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Miktar</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '            <input type="number" step="0.01" class="form-control  tabkey" name="editAmount" id="editAmount" value="' + entity.Amount + '" />'
            + '        </div>'
            + '    </div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="editDescription" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Açıklama</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '            <input type="text"  class="form-control  tabkey" name="Description" id="editDescription" value="' + entity.Description + '"  />'
            + '        </div>'
            + '    </div>'

            + '    <div class="form-group row  col-md-12 col-lg-12 col-sm-12 col-xs-12">'
            + '        <label for="editCreatedDate" class="col-md-4 col-lg-4 col-sm-4 col-xs-4 col-form-label">Tarih</label>'
            + '        <div class="col-md-8 col-lg-8 col-sm-8 col-xs-8">'
            + '            <input type="text"  class="form-control  tabkey datepicker" name="CreatedDate" id="editCreatedDate"  />'
            + '        </div>'
            + '    </div>'

            + '</div>'
            + '<div style="display:none;margin-top:3px;" class="alert alert-danger" id="EditDialogError"></div>'

        List.modal = SC.Modal.Confirm(
            "678978gwe",
            "İşlem Düzenle",
            htmlContent,
            function () {
                List.Edit()
            },
            null,
            null,
            {
                CloseOnOk: false,
                OnShown: function () {
                    $("#editAmount")
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
                    $('input[name="editIsInput"]').on('click', function (e) {
                        if ($(this).val() == 0) {
                            $('#editlblInput').removeClass('btn-outline-danger')
                            $('#editlblInput').addClass('btn-danger')
                            $('#editlblOutput').removeClass('btn-success')
                            $('#editlblOutput').addClass('btn-outline-success')
                        }
                        else {
                            $('#editlblOutput').removeClass('btn-outline-success')
                            $('#editlblOutput').addClass('btn-success')
                            $('#editlblInput').removeClass('btn-danger')
                            $('#editlblInput').addClass('btn-outline-danger')
                        }
                    })
                    entity.IsInput ? $('#editbtnOutput').click() : $('#editbtnInput').click()
                    $(".datepicker").datepicker({
                        format: "dd-mm-yyyy",
                        autoclose: true,
                        todayHighlight: true,
                        clearBtn: true,
                    }).on('hide', function (e) {
                        e.stopPropagation();
                    });
                   $('#editCreatedDate').datepicker("setDate", new Date(entity.CreatedDate));

                },
            }
        )
    },

    Edit: function () {
        // Name validation
        if ($('#editDescription').val() == '') {
            $('#EditDialogError')
                .html('Lütfen Açıklama giriniz.')
                .show()
            $('#editDescription').css('border', '1px solid #f33')
            return;
        }

        var prt = {
            ID: $('#editID').val(),
            IsInput: $('input[name="editIsInput"]:checked').val() == 1,
            WalletID: $('#editWalletID').val(),
            CreatedDate: $('#editCreatedDate').val(),
            Amount: $('#editAmount').val() == "" ? 0 : $('#editAmount').val().replace('.', ','),
            Description: $('#editDescription').val(),
            WalletOperationCategoryID: $('#editWalletOperationCategoryID').val()
        }
        Backend.Post(
            "Edit",
            { entity: prt },
            function (response) {
                if (!response.Success) {
                    $('#EditDialogError')
                        .html("İşlem düzenlenemedi. \n " + response.Message)
                        .show()
                    return;
                }
                List.modal.Remove();
                List.Filter();
            },
        )
    },

    DeleteDialog: function (id) {
        var htmlContent = ''

            + '<div style="margin-top:3px;" class="alert alert-danger" id="DeleteDialogError">Seçtiğiniz İşlem silinecektir.<br>Onaylıyor musunuz?</div>'

        List.modal = SC.Modal.Confirm(
            "678978afcgwe",
            "işlemi Sil",
            htmlContent,
            function () {
                Backend.Post(
                    "Delete",
                    { id: id },
                    function (response) {
                        if (!response.Success) {
                            $('#DeleteDialogError')
                                .html("İşlem Silinemedi. \n " + response.Message)
                                .show()
                            return;
                        }
                        List.modal.Remove();
                        List.Filter();
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

    GoToDetail: function (id) {
        sessionStorage.setItem('WalletUserID', UserData.ID)
        sessionStorage.setItem('WalletID', id)
        document.location = '/WalletOperation/List';
    },
}