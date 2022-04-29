$(document).ready(function () {
    List.Init();
});

var List = {

    callWait: false,

    Init: function () {
        List.Find();
    },

    SendValidationLink: function () {
        
    },


    PrepareProduct: function (product) {
        $("#ProductName").html('<h2>' + product.ProductName + '<h2>')
        $("#ProductImages").html(
            '<img src="https://img.alkapida.com/images/products/' + product.ImageUrl + '" width="100%" />'
            + '<div style="margin-top:5px;">'
            /*  + '<a href="https://goo.gl/maps/bCEXadiUVrHze8aY9" class="btn btn-success btn-block">Mağaza Adresi</a>'*/
            + '               <button class="btn btn-success btn-block" onclick="List.AddToCart(' + product.ProductID + ')"><i class="fas fa-shopping-cart"></i> Sepete Ekle</button>'
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
                        "Yeterli Stok Yok",
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
                var htmlcontent = '<h4 style="color:#FF7F50;"><i class="fas fa-info-circle"></i> Sepetinizdeki ürünlerinizi çok yakında rezerve edebileceksiniz...</h4>';
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

}





