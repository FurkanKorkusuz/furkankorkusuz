$(document).ready(function () {
    List.Init();
});

var List = {
    Init: function () {
        $('#logonPassword').on("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                List.Logon();
            }
        });
    },

    Logon: function () {

        // email validation regex
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // email validation
        if (!regex.test($('#logonEmail').val())) {
            $('#logonError').html('Lütfen geçerli bir eposta adresi giriniz.');
            $('#logonError').show();
            $('#logonEmail').css('border', '1px solid #f33')
            $('#logonPassword').css('border', 'none')
            return;
        }

        // password validation
        if ($('#logonPassword').val().length < 6) {
            $('#logonError').html('Şifreniz 6 karakter ya da daha uzun olmalıdır.');
            $('#logonError').show();
            $('#logonPassword').css('border', '1px solid #f33')
            $('#logonEmail').css('border', 'none')
            return;
        }

        var prt = {
            email: $('#logonEmail').val(),
            password: $('#logonPassword').val(),
            remember: $('#logonRememberMe').prop('checked')
        }

        Backend.Post(
            'LogonEnter',
            prt,
            function (response) {

                if (!response.Success) {
                    $('#logonError').html(response.Message);
                    $('#logonError').show();
                    if (response.Focus)
                        $(response.Focus).css('border', '1px solid #f33')
                    return;
                }
                //window.location.href = "/User/Detail";
                window.location.href = document.referrer ? document.referrer : "~/";
            }
        )
    },


    CreateAccount: function () {

        // FirstName validation
        if ($('#createFirstName').val().length < 5) {
            $('#createError').html('Kullanıcı adınız 5 karakter ya da daha uzun olmalıdır.');
            $('#createError').show();
            $('#createFirstName').css('border', '1px solid #f33')
            $('#createEmail,#createPassword,#createPasswordConfirm').css('border', 'none')
            return;
        }

        // email validation regex
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // email validation
        if (!regex.test($('#createEmail').val())) {
            $('#createError').html('Lütfen geçerli bir eposta adresi giriniz.');
            $('#createError').show();
            $('#createEmail').css('border', '1px solid #f33')
            $('#createPassword,#createPasswordConfirm,#createUserName').css('border', 'none')
            return;
        }

        // password validation
        if ($('#createPassword').val().length < 6) {
            $('#createError').html('Şifreniz 6 karakter ya da daha uzun olmalıdır.');
            $('#createError').show();
            $('#createPassword').css('border', '1px solid #f33')
            $('#createEmail,#createUserName,#createPasswordConfirm').css('border', 'none')
            return;
        }

        // password confirm validation
        if ($('#createPassword').val() != $('#createPasswordConfirm').val()) {
            $('#createError').html('Girdiğiniz şifreler eşleşmiyor...');
            $('#createError').show();
            $('#createPasswordConfirm,#createPassword ').css('border', '1px solid #f33')
            $('#createEmail,#createUserName').css('border', 'none')
            return;
        }

        // membership agreement click
        if (! $('#createMembershipAgreement').prop('checked')) {
            $('#createError').html('Lütfen üyelik sözleşmesini onaylayınız.');
            $('#createError').show();
            $('#createEmail,#createUserName,#createPasswordConfirm,#createPassword').css('border', 'none')
            return;
        }

        var prt = {
            FirstName: $('#createFirstName').val(),
            LastName: $('#createLastName').val(),
            Password: $('#createPassword').val(),
            Email: $('#createEmail').val(),
        }

        Backend.Post(
            'Register',
            { entity: prt },
            function (response) {

                if (!response.Success) {
                    $('#createError').html(response.Message);
                    $('#createError').show();
                    if (response.Focus)
                        $(response.Focus).css('border', '1px solid #f33')
                    return;
                }

                $('#create-form').hide();
                $('#create-confirm-form').show();
            }
        )
    },


    OpenLogonForm: function () {
        $('#create-form,#forgot-password-form').hide();
        $('#logon-form').show();
        $("html, body").animate({ scrollTop: 0 }, 600);
    },
    OpenCreateForm: function () {
        $('#logon-form').hide();
        $('#create-form').show();
        $("html, body").animate({ scrollTop: 0 }, 600);

    },

    ForgotPassword: function () {
        $('#forgotEmail').val($('#logonEmail').val())
        $('#logon-form').hide();
        $('#forgot-password-form').show();
        $("html, body").animate({ scrollTop: 0 }, 600);
    },

    SendConfirmLink: function (userid) {
        Backend.Post(
            'SendConfirmLink',
            { userid: userid},
            function (response) {

                if (!response.Success) {
                    $('#logonError').html(response.Message);
                    $('#logonError').show();
                    return;
                }
                $('#logonError').html('<div class="alert alert-info">1-2 dakika içerisinde doğrulama linki mail adresinize gönderilecektir.</div>');
            }
        )
    },

    SendForgotPasswordLink: function () {

        // email validation regex
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // email validation
        if (!regex.test($('#logonEmail').val())) {
            $('#forgotError').html('Lütfen geçerli bir eposta adresi giriniz.');
            $('#forgotEmail').show();
            $('#forgotEmail').css('border', '1px solid #f33');
            return;
        }

      

        var prt = {
            email: $('#forgotEmail').val()
        }

        Backend.Post(
            'SendForgotPasswordLink',
            prt,
            function (response) {

                if (!response.Success) {
                    $('#forgotError').html(response.Message);
                    $('#forgotError').show();
                    if (response.Focus)
                        $(response.Focus)
                            .css('border', '1px solid #f33')
                            .select();
                    return;
                }
                $('#forgotError').html('<div class="alert alert-success">1-2 dakika içerisinde Mail adresinize yeni şifre oluşturma linki gönderilecektir.</div>');
                $('#forgotError').show();
                $('#send-forgot-password').hide();
            }
        )
    },

    UpdatePassword: function () {


        // password validation
        if ($('#editPassword').val().length < 6) {
            $('#editPasswordError').html('Şifreniz 6 karakter ya da daha uzun olmalıdır.');
            $('#editPasswordError').show();
            $('#editPassword').css('border', '1px solid #f33')
            $('#editPasswordConfirm').css('border', 'none')
            return;
        }

        // password confirm validation
        if ($('#editPassword').val() != $('#editPasswordConfirm').val()) {
            $('#editPasswordError').html('Girdiğiniz şifreler eşleşmiyor...');
            $('#editPasswordError').show();
            $('#editPasswordConfirm').css('border', '1px solid #f33')
            $('#editPassword').css('border', 'none')
            return;
        }
        var prt = {
            password: $('#editPassword').val()
        }

        Backend.Post(
            'UpdatePassword',
            prt,
            function (response) {

                if (!response.Success) {
                    $('#editPasswordError').html(response.Message);
                    $('#editPasswordError').show();
                    if (response.Focus)
                        $(response.Focus).css('border', '1px solid #f33')
                    return;
                }
                window.location.href = "/User/Detail";
            }
        )
    },
}