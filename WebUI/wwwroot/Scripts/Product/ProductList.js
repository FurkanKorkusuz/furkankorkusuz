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
    FilterObjects: {},

    Init: function () {
        if ($(window).width() < 768) {
            $('#Mobile-Filter').show()
            $('#Pc-Filter').remove()
            $('#navbarSupportedContent').before('<button class="navbar-toggler" type="button" onclick="List.FilterOpen()"><i class="fas fa-filter"></i> Filtreler <i class="fas fa-sort"></i></button>')
        }
        else {
            $('#Mobile-Filter').remove()
        }

        $("#Filter").keydown(function (e) {
            if (e.keyCode == 13) {
                List.Filter();
            }
        })
        //$('.category-button').on("click", function (e) {
        //    List.CategorySelect(this)
        //})
        //List.CreateTable();
        List.GetFilterObjects();

    },
    GetFilterObjects: function () {
        Backend.Post(
            'GetFilterObjects',
            '{}',
            function (response) {

                if (!response.Success) {
                    SC.Modal.Ok(
                        "547869676345",
                        'HATA..!',
                        response.Message
                    )
                    return;
                }
                List.FilterObjects.FilterCategories = response.Data
                //var htmlCategory = '<div class="htmlCategoryTree_level_0 category-div">'
                //$.each(List.FilterObjects.FilterCategories, function (i, v) {
                //    if (v.Level == 0) {
                //        htmlCategory += '<button onclick="List.CategorySelect(this)" class="btn btn-block btn-light category-button btn-sm category-level-' + v.Level + '"  data-category-id="' + v.CategoryID + '" data-category-child-count="' + (v.ChildCount ?? 0) + '" data-category-level="' + v.Level + '">' + v.CategoryName + ((v.ChildCount ?? 0) > 1 ? ' <i class="fas fa-chevron-circle-down"></i> ' + v.ChildCount : "") + '</button>';

                //    }
                //})

                //htmlCategory += '</div>'
                //  $('#mobil-product-filter').append(htmlCategory)
                List.callWait = false;
                List.Filter();
            }
        )
    },

    Columns: [
        { name: "<input type='checkbox' id='ProductRows' style='height:20px;width:20px;' />", width: "20px", sort: "" },
        { name: "No", width: "30px", sort: "" },
        { name: "ProductID", width: "60px", sort: "ProductID" },
        { name: "VariantID", width: "60px", sort: "" },
        { name: "Ürün Adı", width: "240px", sort: "ProductName" },
        { name: "Seçenek", width: "100px", sort: "" },
        { name: "Tedarikçi", width: "100px", sort: "" },
        { name: "Son Stok Girişi", width: "120px", sort: "DateInStock" },
        { name: "Son Sipariş", width: "120px", sort: "OrderDate" },
        { name: "Auto Vis.", width: "30px", sort: "" },
        { name: "Kaldır", width: "30px", sort: "" },
    ],

    CreateTable: function () {
        var htmlTable = "",
            htmlColums = "",
            sortAsc = "",
            sortDesc = "",
            sort = "",
            width = "";

        for (var i in this.Columns) {
            sortAsc = ""; sortDesc = ""; sort = ""; width = "";

            if (this.Columns[i].sort != "") {
                sortAsc = '<a title="Küçükten büyüğe sırala" onclick = "List.Sort(\'' + this.Columns[i].sort + '\',\'asc\',this);">' +
                    '<i class="sort-link sort-link-asc fa fa-arrow-circle-down"></i></a> ';
                sortDesc = ' <a title="Büyükten küçüğe sırala" onclick = "List.Sort(\'' + this.Columns[i].sort + '\',\'desc\',this);">' +
                    '<i class="sort-link sort-link-desc fa fa-arrow-circle-up"></i></a>';
                sort = '<a  name="Exp" sort="asc" title="Küçükten büyüğe sırala"  onclick = "List.Sort(\'' + this.Columns[i].sort + '\',$(this).attr(\'sort\'),this)" >' + this.Columns[i].name + '</a>';
            }
            else {
                sort = this.Columns[i].name;
            }

            if (this.Columns[i].width != "") {
                width = 'width:' + this.Columns[i].width + ';';
            }

            htmlColums += '<th style="text-align: center;white-space:normal;' + width + '">' + sortAsc + sort + sortDesc + '</th>';
        }

        htmlColums = '<thead><tr class="Heading3 GridHeadingTr">' + htmlColums + '</tr></thead>';
        htmlTable = '<table id="indexGrid" class="GridPanel SortableGrid AutoExpand" cellspacing="0" cellpadding="0" border="0" style="border-left: 1px solid #DDDDDD;">' +
            htmlColums + '<tbody id="tableRows"></tbody></table>';

        $("#Container1").html(htmlTable);

    },

    GetData: function () {
        if (List.endRow || this.callWait)
            return;



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

                if (response.Data.length == 0) {
                    $('#ProductList').html('<h5 class="alert alert-danger" style="text-align:center;width:100%;">Ürün Bulunamadı...</h5>')
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
                + '<div class="product-div col-xl-3  col-lg-3 col-md-4  col-sm-6 col-12">'
                + '     <div class=" product-cart">'
                + '         <div class="product-image" >'
                + '     <a href="/Product/ProductDetail?product=' + row.Url + '|productid=' + row.ProductID + '"  alt="' + row.ProductName + '">'
                + '           <img src="https://img.alkapida.com/images/products/' + row.ImageUrl + '" />'
                + '     </a>'
                + (row.Stock < 1 ? '<div class="dis-ribbon"><span class="stock-out">Tükendi</span></div>' : '')
                + '         </div>'
                + '         <div class="product-name">'
                + row.ProductName
                + '         </div>'
                + '         <div class="product-price" >' + (row.SalePrice > 0 ? '&#8364; ' + row.SalePrice.toFixed(2) : '') + '</div>'
                + '         <div class="product-link">'
                + (row.SalableStock > 0
                    ? '<button class="btn btn-outline-success" onclick="List.AddToCart(' + row.ProductID + ')"><i class="fas fa-shopping-cart"></i> Sepete Ekle</button>&nbsp;'
                    : '')
                + '               <a class="btn btn-info" href="/Product/ProductDetail?product=' + row.Url + '|productid=' + row.ProductID + '"  alt="' + row.ProductName + '">Detay</a>'
                + '         </div>'
                + '     </div>'
                + '</div>';

        }




        $(htmlRows).appendTo($("#ProductList"));



    },

    Sort: function (colName, dir, e) {
        List.sort = colName + '_' + dir;
        List.isClear = true;
        List.endRow = false;
        this.count = 0;
        List.GetData();

        //$(e).parents("tr").first().find("i.sort-link-asc").attr("src", "/icons/sortup.gif");
        //$(e).parents("tr").first().find("img[name='Desc']").attr("src", "/icons/sortdown.gif");
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
        $("#ProductList").html("");
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

        this.filter = $("#Filter *").serialize();
        var o = {};
        var a = $("#Filter *").serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        List.filter = o;
        $(window).scrollTop(0)
        $('#mobil-product-filter').css("display", "none")
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

    AddToCart: function (productid) {
        var prt = {
            ShoppingCartProductID: 0,
            ShoppingCartID: $("#hdShoppingCartID").val() == "" ? 0 : $("#hdShoppingCartID").val(),
            ProductID: productid,
            Quantity: 1
        }

        Backend.Post(
            "AddToCart",
            { entity: prt },
            function (response) {
                if (response.Message) {
                    SC.Modal.Ok(
                        "AddToCartStockError",
                        "Uyarı!",
                        response.Message,
                        null,
                        null,
                        {
                            OnCloseCaption: 'Kapat'
                        }
                    )
                    return;
                }


                if ($("#shopping-basket-item").length > 0) {
                    $("#shopping-basket-item").text((parseInt($("#shopping-basket-item").text()) + 1))
                }
                else {
                    $('#shopping-basket-btn i').html('<b id="shopping-basket-item">1</b>')
                }
                var htmlcontent = '<h4 class="alert alert-success"><i class="fas fa-info-circle"></i> Sepetinizdeki ürünlerinizi rezerve edebilirsiniz.</h4>';
                SC.Modal.Confirm(
                    "add-sc-confirm",
                    "Ürün sepete eklendi.",
                    htmlcontent,
                    function () {
                        // Go to Shopping Cart;
                    },
                    function () {
                        document.location.href = '/ShoppingCart/ProductList'
                    },
                    null,
                    {

                        OnOkCaption: '<i class="fas fa-shopping-bag"></i> Alışverişe Devam Et</i>',
                        OnCancelCaption: '<i class="fas fa-arrow-alt-circle-right"></i> Sepete Git <i class="fas fa-shopping-cart"></i>',
                        OnShown: function () {
                            $('#ConfirmModal_add-sc-confirm .confirm-modal-ok').removeClass('btn-primary').addClass('btn-outline-primary')
                            $('#ConfirmModal_add-sc-confirm .confirm-modal-cancel').removeClass('btn-outline-danger').addClass('btn-outline-success')
                        }
                    }
                )
                return;
            },
            {
                BaseUrl: document.location.origin + '/ShoppingCart/',
            }
        );

    },

    FilterOpen: function () {

        $('#mobil-product-filter').show()
        if ($(window).width() < 768) {
            if ($('#navbarSupportedContent').hasClass("show")) {
                $('button.navbar-toggler').click();
            }
        }
        //window.scroll(
        //    ($('div.htmlCategoryTree_level_0').find('button.btn-danger').scrollTop() == undefined
        //        ? 0
        //        : $('div.htmlCategoryTree_level_0').find('button.btn-danger').scrollTop())
        //)
    },

    FilterClose: function () {
    //    $('#selected-category-name').html('')
    //    $('#hdFilterCategoryID').val(0);
    //    $('div.htmlCategoryTree_level_0 ,div.htmlCategoryTree_level_1 ,div.htmlCategoryTree_level_2  ').remove();
        List.Filter();
    },

    CategorySelect: function (e) {
        var btnCategoryID = $(e).data('category-id'),
            btnCategoryParentID = $(e).data('parent-id'),
            btnCategoryLevel = $(e).data('category-level'),
            btnCategoryChildCount = $(e).data('category-child-count');

        // Bu butonun altına leveli 1 fazla olan alt kategori listesi açılmış ise kapatsın ve geri dönsün.
        if ($(e).next().hasClass('htmlCategoryTree_level_' + (btnCategoryLevel + 1))) {
            $('div.htmlCategoryTree_level_' + (btnCategoryLevel + 1)).remove()
            return;
        }

        // önceden açılmış alt kategoriler, Seçilen kategorinin daha üstünde değilse, Yani bir alt kategoriye geçmek yerine başka levelden bir kategoriye tıklanmış ise o levelden yüksek olan alt kategori divleri kapansın. (Not: Leveller 0 en üst kategori olacak şekildedir.)
        $('div.htmlCategoryTree_level_' + (btnCategoryLevel + 1)).remove();
        $('div.htmlCategoryTree_level_' + (btnCategoryLevel + 2)).remove();
        $('div.htmlCategoryTree_level_' + (btnCategoryLevel + 3)).remove();
        // Daha önceden tıklananların rengi eski haline çevrilsin.
        $('div.htmlCategoryTree_level_0 button').removeClass("btn-active")
        $('div.htmlCategoryTree_level_0 button').addClass("btn-passive")


        if (btnCategoryChildCount > 1) {

            var htmlsubCategory = '<div class="htmlCategoryTree_level_' + (btnCategoryLevel + 1) + ' category-div" >';

            if (btnCategoryParentID == -1) {
                htmlsubCategory += '<button onclick="List.CategorySelect(this)" class="btn category-button  btn-all-categories btn-sm btn-block category-level--1"  data-category-id="0" data-category-child-count="0" data-category-level="-1"><i class="fas fa-chevron-circle-right"></i> TÜM KATEGORİLER</button>';
                $.each(List.FilterObjects.FilterCategories, function (i, v) {
                    if ((v.ParentID == null ? 0 : v.ParentID) == 0) {
                        htmlsubCategory += '<button onclick="List.CategorySelect(this)" class="btn ' + ($('#hdFilterCategoryID').val() == v.CategoryID ? 'btn-active' :'btn-passive')+' category-button btn-sm btn-block category-level-' + v.Level + '"  data-category-id="' + v.CategoryID + '" data-category-child-count="' + (v.ChildCount ?? 0) + '" data-category-level="' + v.Level + '"><i class="fas fa-chevron-circle-right"></i> ' + v.CategoryName + ((v.ChildCount ?? 0) > 1 ? ' <i class="fas fa-chevron-circle-down"></i> ' + v.ChildCount : "") + '</button>';
                    }
                })
                htmlsubCategory += '<button onclick="List.CategorySelect(this)" class="btn category-button  btn-all-categories btn-sm btn-block category-level--1"  data-category-id="0" data-category-child-count="0" data-category-level="-1"><i class="fas fa-chevron-circle-right"></i> TÜM KATEGORİLER</button>';
            }
            else {

                htmlsubCategory += '<button onclick="List.CategorySelect(this)" class="btn btn-passive category-button btn-sm btn-block category-level-' + (btnCategoryLevel + 1) + '"  data-category-id="' + btnCategoryID + '" data-category-child-count="0" data-category-level="' + (btnCategoryLevel + 1) + '"><i class="fas fa-chevron-circle-right"></i> Tüm ' + $(e).html().substring(($(e).html().indexOf('</i>')+5), $(e).html().indexOf(' <i class="fas fa-chevron-circle-down">'))+ ' Kategorisi</button>';
                $.each(List.FilterObjects.FilterCategories, function (i, v) {
                    if (v.ParentID == btnCategoryID) {
                        htmlsubCategory += '<button onclick="List.CategorySelect(this)" class="btn btn-passive category-button btn-sm btn-block category-level-' + v.Level + '"  data-category-id="' + v.CategoryID + '" data-category-child-count="' + (v.ChildCount ?? 0) + '" data-category-level="' + v.Level + '"><i class="fas fa-chevron-circle-right"></i> ' + v.CategoryName + ((v.ChildCount ?? 0) > 1 ? ' <i class="fas fa-chevron-circle-down"></i> ' + v.ChildCount : "") + '</button>';
                    }
                })
            }

            htmlsubCategory += '</div>';
            $(e).after(htmlsubCategory);


            if (btnCategoryParentID != -1) {
                $(e).removeClass("btn-passive")
                $(e).addClass("btn-active")
            }

        }
        else {
            $('#hdFilterCategoryID').val(btnCategoryID);
            btnCategoryID > 0
                ? $('#selected-category-name').html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   ' + $(e).html().substring(($(e).html().indexOf('</i>') + 5)) )
                : $('#selected-category-name').html('')
            if (btnCategoryParentID != -1) {
                $(e).removeClass("btn-passive")
                $(e).addClass("btn-active")
            }

            $('div.htmlCategoryTree_level_0 ,div.htmlCategoryTree_level_1 ,div.htmlCategoryTree_level_2').remove();
            List.Filter();
        }
    },



}