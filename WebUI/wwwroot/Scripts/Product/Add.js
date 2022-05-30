$(document).ready(function () {
    List.Init();
});

var List = {
    TitleImageFile: null,

    Init: function () {
        List.Add();
    },

    ImageDivClick: function (e) {
        $("input#addTitleImage").click();
        $(window).scrollTop(0);
        List.ImageSpan = $(e).find("img")
    },

    AddImage: function (e) {
        var file = e.files[0].name

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

        //// Title validation
        //if ($('#addTitle').val().length < 3) {
        //    $('#addError').html('Başlık 3 karakter ya da daha uzun olmalıdır.');
        //    $('#addError').show();
        //    $('#addTitle').css('border', '1px solid #f33')
        //    return;
        //}

        //// UrlName validation
        //if ($('#addUrlName').val().length < 3) {
        //    $('#addError').html('UrlName 3 karakter ya da daha uzun olmalıdır.');
        //    $('#addError').show();
        //    $('#addUrlName').css('border', '1px solid #f33')
        //    return;
        //}

        //// Summary validation
        //if ($('#addSummary').val().length < 3) {
        //    $('#addError').html('Özet 100 karakterden uzun olmalıdır.');
        //    $('#addError').show();
        //    $('#addSummary').css('border', '1px solid #f33')
        //    return;
        //}
        //// Category validation
        //if ($('#addCategory').val() == 0) {
        //    $('#addError').html('Lütfen Kategori seçiniz.');
        //    $('#addError').show();
        //    $('#addCategory').css('border', '1px solid #f33')
        //    return;
        //}
        //// Category validation
        //if ($('#addReadingMinute').val() == '') {
        //    $('#addError').html('Lütfen Okunma Süresi giriniz.');
        //    $('#addError').show();
        //    $('#addReadingMinute').css('border', '1px solid #f33')
        //    return;
        //}

        //var prt = {
        //    ID: 0,
        //    UserID: 0,
        //    CategoryID: $('#addCategory').val(),
        //    CreatedDate: '',
        //    Title: $('#addTitle').val(),
        //    UrlName: $('#addUrlName').val(),
        //    Summary: $('#addSummary').val(),
        //    TitleImage: TitleImage,
        //    Content: $('#addContent').val(),
        //    ReadingMinute: $('#addReadingMinute').val(),
        //    ReadCount: 0,
        //    IsAccess: $('#addIsAccess').prop("checked"),
        //}
        //var tagData = []
        //$.each($('#addTags').select2("data"), function (i, v) {
        //    tagData.push({ "ID": parseInt(v.id), "Name": v.text });
        //})
        Backend.Post(
            "Add",
            { a: 0           
            },
            function (response) {
                if (!response.Success) {
                    $('#addError').html("Blog oluşturulamadı.")
                    $('#addError').show();
                    return;
                }
                //window.location.href = "/Blog/List";
            },
        )
    },

    SaveImage: function () {

        var form = new FormData();
        form.append('titleImage', $('#addTitleImage')[0].files[0]);

        $.ajax({
            url: '/Blog/ImageSave',
            data: form,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (response) {
                if (!response.Success) {
                    $('#addError').html("Resim oluşturulamadı.\n " + response.Message + response.Error)
                    $('#addError').show();
                    return;
                    //setTimeout(
                    //    function () {
                    //        List.Add()
                    //    }, 4000);
                }
                List.Add(response.Data)// fotoğrafın adı.

            },
            error: function (x, y, z) {
                $('#addError').html(x.responseText)
                $('#addError').show();
            }
        });

    },



}