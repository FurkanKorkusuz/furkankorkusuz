$(document).ready(function () {
    List.Init();
});

var List = {
    id: 0,
    urlName: '',

    Init: function () {
        $('.select2').select2();
        List.urlName = $("#UrlName").val()
        List.Find();

    },

    Find: function () {
        Backend.Post(
            "Get",
            { urlName: List.urlName },
            function (response) {
                if (!response.Data) {
                    window.location.href = document.referrer ? document.referrer : "/Project/List";
                    return;
                }
                List.entity = response.Data;
                List.PrepareDetail(response.Data);
            },
        )
    },


    PrepareDetail: function (entity) {
        $("#editTitle").val(entity.Title)
        $("#editUrlName").val(entity.UrlName)
        $("#editContent").val(entity.Content)
        $("#editImagespan").html(
            '<img src="https://furkankorkusuz.com/Uploads/Images/Project/' + entity.Image + '" width="96%" />'
        )
        $('#editProjectDate').val(entity.ProjectDate)
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
        $("input#editImage").click();
        $(window).scrollTop(0);
        List.ImageSpan = $(e).find("img")
    },

    EditImage: function (e) {

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

    Edit: function () {

        // Title validation
        if ($('#editTitle').val().length < 3) {
            $('#editError').html('Başlık 3 karakter ya da daha uzun olmalıdır.');
            $('#editError').show();
            $('#editTitle').css('border', '1px solid #f33')
            return;
        }

        // UrlName validation
        if ($('#editUrlName').val().length < 3) {
            $('#editError').html('UrlName 3 karakter ya da daha uzun olmalıdır.');
            $('#editError').show();
            $('#editUrlName').css('border', '1px solid #f33')
            return;
        }

        // ProjectDate validation
        if ($('#editProjectDate').val().length < 3) {
            $('#editError').html('Tarih seçiniz');
            $('#editError').show();
            $('#editProjectDate').css('border', '1px solid #f33')
            return;
        }


        var prt = {
            ID: List.entity.ID,
            CreatedDate: '',
            ProjectDate: $('#editProjectDate').val(),
            Title: $('#editTitle').val(),
            Image: '',
            Content: $('#editContent').val(),
            UrlName: $('#editUrlName').val(),
        }
        Backend.Post(
            "Edit",
            { entity: prt},
            function (response) {
                if (!response.Success) {
                    $('#editError').html("Proje düzenlenemedi.")
                    $('#editError').show();
                    return;
                }
                if ($('#editImage')[0] != undefined) {
                    List.entity.UrlName = prt.UrlName;
                    List.SaveImage();
                }
                else {
                    window.location.href = "/Project/Detail/" + prt.UrlName;
                }
               
            },
        )
    },

    SaveImage: function () {

        var form = new FormData();
        form.append('image', $('#editImage')[0].files[0]);

        $.ajax({
            url: '/Project/ImageSave',
            data: form,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (response) {
                if (!response.Success) {
                    $('#editError').html("Resim oluşturulamadı.")
                    $('#editError').show();
                }
                List.UpdateImage(response.Data)// fotoğrafın adı.
            },
            error: function (x, y, z) {
                $('#editError').html(x.responseText)
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


    GoToBack: function () {
        window.history.back();
    },

    HtmlUnicode: function () {
        $("#editContent").val($("#editContent").val().replace(/'</g, "&lt;"))
        $("#editContent").val($("#editContent").val().replace(/>'/g, "&gt;"))
    },


}