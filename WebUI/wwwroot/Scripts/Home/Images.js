$(document).ready(function () {
    List.Init();
});

var List = {
    TitleImageFile: null,

    Init: function () {
        $('.select2').select2()
    },

    ImageDivClick: function (e) {
        $("input#addImage").click();
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

  

    SaveImage: function () {

        var form = new FormData();
        form.append('image', $('#addImage')[0].files[0]);
        form.append('folder', $('#addFolder').val());

        $.ajax({
            url: '/Home/AddImage',
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
                
            },
            error: function (x, y, z) {
                $('#addError').html(x.responseText)
                $('#addError').show();
            }
        });

    },

    HtmlUnicode: function () {
        $("#addContent").val($("#addContent").val().replace("'<", "&lt;"))
        $("#addContent").val($("#addContent").val().replace(">'", "&gt;"))
    }


}