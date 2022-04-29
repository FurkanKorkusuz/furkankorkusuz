$(document).ready(function () {
    List.Init();
});

var List = {
    callWait: false,
    urlName: '',
    entity: null,

    Init: function () {
        List.urlName = $("#UrlName").val()
        List.Find();
        if (BasePage.HasRole(3)) {
            $("#entityEdit").show();
            // Blog düzenleme yetkisi (3) varsa düzenle butonu görünsün.
        }

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
        $("#Title").html('<h2>' + entity.Title + '  ' + entity.ProjectDate + ' <h2>')
        $("#Image").html(
            '<img src="https://furkankorkusuz.com/Uploads/Images/Project/' + entity.Image + '" width="100%" />'
        )
        $("#Content").html(entity.Content)

        $('.select2').select2();
        PR.prettyPrint();
    },

    GoToEdit: function () {
        document.location = '/Project/Edit/' + List.entity.UrlName;
    },

}