$(document).ready(function () {
    List.Init();
});

var List = {
    callWait: false,
    urlName:'',
    entity: null,

    Init: function () {
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
                $("#BlogID").val(response.Data.ID);
                List.entity = response.Data;
                List.PrepareDetail(response.Data);
            },
        )   
    },


    PrepareDetail: function (entity) {
        $("#Title").html('<h2>' + entity.Title + '<h2>')
        $("#TitleImage").html(
            '<img src="https://furkankorkusuz.com/Uploads/Images/Blog/' + entity.TitleImage + '" width="100%" />'
        )     
        $("#Summary").html(entity.Summary)
        $("#Content").html(entity.Content)
        $.each(entity.Tags, function (i, t) {
            $("#BlogTags").append('&nbsp;&nbsp;&nbsp;<a class="btn btn-outline-primary btn-sm" href="/Blog/List?tagid=' + t.ID +'"><i class="fas fa-tag"></i> '+t.Name+'</a>')
        })
        $.each(entity.Comments, function (i, c) {
            $("#BlogComments").append(
                '<div class="col-12 row" style="border-bottom:1px solid #eee; margin:3px;margin-bottom:9px;padding:5px;">'
                + '<div class="col-1" ><img src="https://furkankorkusuz.com/Uploads/Images/Blog/no-image.png" style="border-radius:50%;" width="70px;" height="70px;"/></div>'
                + '<div class="col-11" style="font-size:15px;padding-left:25px;"> <b>   ' + c.UserName + '</b> ' + c.CreatedDate
                + (UserData.ID == c.UserID ? '<button class="btn btn-outline-danger btn-sm" style="float:right;" onclick="List.DeleteCommentDialog(' + c.ID + ')">Sil</button>' : '')
                + '<div class="col-10" >' + c.Content + '</div>'
                + '</div>'
                
            )
        })

        if (BasePage.HasRole(3)) {
            $("#entityEdit").show(); 
            // Blog düzenleme yetkisi (3) varsa düzenle butonu görünsün.
        }
        $('.select2').select2();
        PR.prettyPrint();
    },

    GoToEdit: function () {
        document.location = '/Blog/Edit/' + List.entity.UrlName;
    },

    AddComment: function () {

        // Title validation
        if ($('#addComment').val().length < 3) {
            $('#addCommentError').html('Yorum 3 karakter ya da daha uzun olmalıdır.');
            $('#addCommentError').show();
            $('#addComment').css('border', '1px solid #f33')
            return;
        }
        var prt = {
            ID: 0,
            BlogID: List.entity.ID,
            UserID: 0,
            ParentID: null,
            CreatedDate: '',
            Content:$('#addComment').val()
        }
        Backend.Post(
            "AddComment",
            prt,
            function (response) {
                if (!response.Data) {
                    $('#addCommentError').html(response.Message);
                    $('#addCommentError').show();
                    return;
                }
                $('#BlogComments, BlogTags').html('');
                $('#addComment').val('')
                List.Init();
            },
        )
    },

    DeleteCommentDialog: function (id) {
        var htmlContent = ''
            + '<div style="margin-top:3px;" class="alert alert-danger" id="DeleteDialogError">Yorumunuz Silinecektir.<br>Onaylıyor musunuz?</div>'

        List.modal = SC.Modal.Confirm(
            "678978afcgwe",
            "Yorum Sil",
            htmlContent,
            function () {
                Backend.Post(
                    "DeleteComment",
                    { id: id },
                    function (response) {
                        if (!response.Success) {
                                alert("Yorum Silinemedi. \n " + response.Message)
                            return;
                        }
                        $('#BlogComments, BlogTags').html('');
                        List.Init()
                    },

                )
            },
        )
    },
}