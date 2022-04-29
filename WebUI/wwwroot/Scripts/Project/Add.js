$(document).ready(function () {
    List.Init();
});

var List = {
    entity: null,

    Init: function () {
        $('.select2').select2()
        $(".datepicker").datepicker({
            format: "dd-mm-yyyy",
            autoclose: true,
            todayHighlight: true,
            clearBtn: true,
        }).on('hide', function (e) {
            e.stopPropagation();
        });
    },

    ImageDivClick: function (e) {
        $("input#addImage").click();
        $(window).scrollTop(0);
        List.ImageSpan = $(e).find("img")
    },

    AddImage: function (e) {
        if (e.files[0].size > 10485760) {
            alert("Resim boyutu 10 mb' dan büyük olamaz...")
            return;
        }

        switch (e.files[0].type) {
            case "image/jpg":
            case "image/png":
            case "image/jpeg":
            case "image/JPG":
            case "image/PNG":
            case "image/JPEG":
                break;
            default:
                alert("Seçtiğiniz dosya .PNG .JPG ya da .JPEG uzantılı olmalıdır...")
                return;
        }
        List.ImageSpan[0].src = window.URL.createObjectURL(e.files[0])
        List.TitleImage = window.URL.createObjectURL(e.files[0])
        List.TitleImageFile = e.files[0]
    },

    Add: function () {

        // Title validation
        if ($('#addTitle').val().length < 3) {
            $('#addError').html('Başlık 3 karakter ya da daha uzun olmalıdır.');
            $('#addError').show();
            $('#addTitle').css('border', '1px solid #f33')
            return;
        }

        // UrlName validation
        if ($('#addUrlName').val().length < 3) {
            $('#addError').html('UrlName 3 karakter ya da daha uzun olmalıdır.');
            $('#addError').show();
            $('#addUrlName').css('border', '1px solid #f33')
            return;
        }
    

        var prt = {
            ID: 0,
            CreatedDate: ' ',
            ProjectDate: $('#addProjectDate').val(),
            Title: $('#addTitle').val(),
            Image: ' ',
            Content: $('#addContent').val(),
            UrlName: $('#addUrlName').val(),
        }
        Backend.Post(
            "Add",
            { entity: prt },
            function (response) {
                if (!response.Success) {
                    $('#addError').html("Proje oluşturulamadı.")
                    $('#addError').show();
                    return;
                }
                List.entity = response.Data
                List.SaveImage()              
            },
        )
    },

    SaveImage: function () {

        var form = new FormData();
        form.append('image', $('#addImage')[0].files[0]);

        $.ajax({
            url: '/Project/ImageSave',
            data: form,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (response) {
                if (!response.Success) {
                    $('#addError').html("Resim oluşturulamadı.\n " + response.Message + response.Error)
                    $('#addError').show();
                    return;
                }
                List.UpdateImage(response.Data)// fotoğrafın adı.

            },
            error: function (x, y, z) {
                $('#addError').html(x.responseText)
                $('#addError').show();
            }
        });

    },

    UpdateImage: function (image) {       
        Backend.Post(
            "UpdateImage",
            {
                ID: List.entity.ID,
                Image: image
            },
            function (response) {
                if (!response.Success) {
                    $('#addError').html("Resim eklenemedi.")
                    $('#addError').show();
                    return;
                }
                window.location.href = "/Project/Detail/" + List.entity.UrlName;
            },
        )
    },

    HtmlUnicode: function () {
        $("#addContent").val($("#addContent").val().replace("/'</g", "&lt;"))
        $("#addContent").val($("#addContent").val().replace("/>'/g", "&gt;"))
    },
}