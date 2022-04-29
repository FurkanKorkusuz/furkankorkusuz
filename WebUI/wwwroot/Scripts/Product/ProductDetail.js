
$(document).ready(function () {
    $.ajaxSetup({
        type: "post",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            List.callWait = true;
            LoadingImg.on();
        },
        complete: function (a, b) {
            List.callWait = false;
            LoadingImg.off();
        },
        error: function (x, err) {
            // alert("Hata oluştu: " + x.responseText);
            var sssssss = x.responseText
            List.callWait = false;
            LoadingImg.off();
        }
    });

    List.Init();
});

var List = {

    callWait: false,
    id: 0,


    Init: function () {
        List.id = parseInt($("#ProductID").val())
        List.Find();
    },


    Find: function () {
        if (List.endRow || this.callWait)
            return;

        var data = {
            id: List.id
        }
        $.ajax({
            url: '/Product/Get',
            data: JSON.stringify(data),
            success: function (data) {
                List.PrepareProduct(data);
            }
        })
    },


    PrepareProduct: function (product) {
        $("#ProductName").html('<h2>' + product.ProductName + '<h2>')
        $("#ProductImages").html(
            '<img src="https://img.alkapida.com/images/products/' + product.ImageUrl + '" width="100%" />'
        )
        $("#ProductPriceAndAddToCart").html('<div class="col-lg-6 col-md-6  col-sm-12 col-xs-12 col-12 product-price">' + (product.SalePrice > 0 ? '&#8364; ' + product.SalePrice.toFixed(2) : '') + '</div>'
            +'<div class="col-lg-6 col-md-6  col-sm-12 col-xs-12 col-12 add-to-cart" style="margin-top:5px;">'
            + (product.SalableStock > 0
                ? '<button class="btn btn-success" onclick="List.AddToCart(' + product.ProductID + ')"><i class="fas fa-shopping-cart"></i> Sepete Ekle</           button>&nbsp;'
                : '')
            + '</div><hr/>'
        )
        $("#ProductDescription").html(product.Description)
        $("#ProductDescription img,iframe").css("max-width", $("#ProductImages").width());
        $("#ProductDescription img,iframe").css("height", "");
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

    GoToBack: function () {
        window.history.back();
    }

}





