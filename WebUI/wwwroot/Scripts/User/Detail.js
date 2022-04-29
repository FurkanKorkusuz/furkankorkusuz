$(document).ready(function () {
    List.Init();
});

var List = {
    Init: function () {
        List.GetData();
        $('#firstName, #lastName').on("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                List.Update();
            }
        });
    },
    GetData: function () {

        var prt = {
        }

        Backend.Post(
            'Get',
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
                $('#userName').html(response.Data.UserName)
                $('#email').html(response.Data.Email)
                $('#firstName').val(response.Data.FirstName)
                $('#lastName').val(response.Data.LastName)

            }
        )
    },

    UpdateForm: function () {
        $('#firstName,#lastName ').prop('disabled', '');
        $('#user-save ').show();
        $('#password-update').hide();
        $('#user-update')
            .attr('onclick', 'List.CancelUpdate()')
            .removeClass('btn-info')
            .addClass('btn-danger')
            .html('<i class="fas fa-window-close"></i> Vazgeç')
    },

    Update: function () {

        var prt = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val()
        }

        Backend.Post(
            'Update',
            prt,
            function (response) {

                if (!response.Success) {
                    $('#updateError')
                    .html(response.Message)
                    .show();
                    return;
                }

                List.CancelUpdate();
                $('#success').html('<i class="far fa-check-circle fa-2x"></i><br>Profiliniz güncellendi.')
                $('#success').closest('div.user-detail-keyvalue').show()
            }
        )
    },

    CancelUpdate: function () {
        $('#firstName,#lastName ').prop('disabled', 'disabled');
        $('#user-save').hide();
        $('#password-update').show();
        $('#user-update')
            .attr('onclick', 'List.UpdateForm()')
            .removeClass('btn-danger')
            .addClass('btn-info')
            .html('<i class="fas fa-user-edit"></i> Düzenle')
    },


    UpdatePasswordForm: function () {
        $('.password-update ').show();
        $('#user-update ').hide();
        $('#password-update')
            .attr('onclick', 'List.CancelUpdatePassword()')
            .removeClass('btn-outline-danger')
            .addClass('btn-danger')
            .html('<i class="fas fa-window-close"></i> Vazgeç')
    },

    UpdatePassword: function () {



        // password validation
        if ($('#password').val().length < 6) {
            $('#passwordUpdateError').html('Şifreniz 6 karakter ya da daha uzun olmalıdır.');
            $('#passwordUpdateError').show();
            $('#password').css('border', '1px solid #f33')
            $('#passwordConfirm').css('border', 'none')
            return;
        }

        // password confirm validation
        if ($('#password').val() != $('#passwordConfirm').val()) {
            $('#passwordUpdateError').html('Girdiğiniz şifreler eşleşmiyor...');
            $('#passwordUpdateError').show();
            $('#passwordConfirm').css('border', '1px solid #f33')
            $('#password').css('border', 'none')
            return;
        }
        var prt = {
            password: $('#password').val()
        }

        Backend.Post(
            'UpdatePassword',
            prt,
            function (response) {

                if (!response.Success) {
                    $('#passwordUpdateError')
                        .html(response.Message)
                        .show();
                    return;
                }
                List.CancelUpdatePassword();
                $('#success')
                    .html('<i class="far fa-check-circle fa-2x"></i><br>Şifreniz güncellendi.')
                    .show()
            }
        )
    },

    CancelUpdatePassword: function () {
        $('.password-update').hide();
        $('#user-update').show();
        $('#password-update')
            .attr('onclick', 'List.UpdatePasswordForm()')
            .removeClass('btn-danger')
            .addClass('btn-outline-danger')
            .html('<i class="fas fa-user-lock"></i> Şifre Değiştir')
    },
}