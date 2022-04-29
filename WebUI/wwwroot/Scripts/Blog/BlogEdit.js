$(document).ready(function () {
    List.Init();
});

var List = {
    id: 0,
    urlName:'',
    TitleImageFile: null,

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
                    window.location.href = document.referrer ? document.referrer : "/Blog/List";
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
        $("#editSummary").val(entity.Summary)
        $("#editContent").val(entity.Content)
        $("#editIsAccess").prop('checked', entity.IsAccess)
        $("#editImagespan").html(
            '<img src="https://furkankorkusuz.com/Uploads/Images/Blog/' + entity.TitleImage + '" width="96%" />'
        )
        $('#editReadingMinute').val(entity.ReadingMinute)
        $("#editTags").val(entity.Tags.map(function (t) { return parseInt(t.ID); })).trigger('change.select2');
        $("#editCategory").val(entity.CategoryID).trigger('change.select2');

        PR.prettyPrint();
    },


    ImageDivClick: function (e) {
        $("input#editTitleImage").click();
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

    Edit: function (TitleImage) {

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

        // Summary validation
        if ($('#editSummary').val().length < 3) {
            $('#editError').html('Özet 100 karakterden uzun olmalıdır.');
            $('#editError').show();
            $('#editSummary').css('border', '1px solid #f33')
            return;
        }

        // Category validation
        if ($('#editCategory').val() == 0) {
            $('#editError').html('Lütfen Kategori seçiniz.');
            $('#editError').show();
            $('#editCategory').css('border', '1px solid #f33')
            return;
        }
        // ReadingMinut validation
        if ($('#editReadingMinute').val() == '') {
            $('#editError').html('Lütfen Okunma Süresi giriniz.');
            $('#editError').show();
            $('#editReadingMinute').css('border', '1px solid #f33')
            return;
        }

        var prt = {
            ID: List.entity.ID,
            UserID: 0,
            CategoryID: $('#editCategory').val(),
            CreatedDate: '',
            Title: $('#editTitle').val(),
            UrlName: $('#editUrlName').val(),
            Summary: $('#editSummary').val(),
            TitleImage: TitleImage,
            Content: $('#editContent').val(),
            ReadingMinute: $('#editReadingMinute').val(),
            ReadCount: 0,
            IsAccess: $('#editIsAccess').prop("checked"),
        }
        var tagData = []
        $.each($('#editTags').select2("data"), function (i, v) {
            tagData.push({ "ID": parseInt(v.id), "Name": v.text });
        })
        Backend.Post(
            "Edit",
            {
                entity: prt,
                tags: tagData
            },
            function (response) {
                if (!response.Success) {
                    $('#editError').html("Blog oluşturulamadı.")
                    $('#editError').show();
                    return;
                }
                window.location.href = "/Blog/List";
            },
        )
    },

    SaveImage: function () {

        var form = new FormData();
        form.append('titleImage', $('#editTitleImage')[0].files[0]);

        $.ajax({
            url: '/Blog/ImageSave',
            data: form,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (response) {
                if (!response.Success) {
                    $('#editError').html("Resim oluşturulamadı.")
                    $('#editError').show();
                    setTimeout(
                        function () {
                            List.Edit()
                        }, 4000);
                }
                List.Edit(response.Data)

            },
            error: function (x, y, z) {
                $('#editError').html(x.responseText)
            }
        });

    },


    GoToBack: function () {
        window.history.back();
    },

    
    HtmlUnicode: function () {
        $("#editContent").val($("#editContent").val().replace("/'</g", "&lt;"))
        $("#editContent").val($("#editContent").val().replace("/>'/g", "&gt;"))
    }

}