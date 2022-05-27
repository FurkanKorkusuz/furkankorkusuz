$(document).ready(function () {
    List.Init();
});

var List = {
    Init: function () {
        $('#loginPassword').on("keyup", function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                List.Login();
            }
        });
        $('#loginEmail').val("furkankorkusuz2@gmail.com");
        $('#loginPassword').val("Faslan.1");
    },

    Login: function () {
   
        // email validation regex
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // email validation
        if (!regex.test($('#loginEmail').val())) {
            $('#loginError').html('Lütfen geçerli bir eposta adresi giriniz.');
            $('#loginError').show();
            $('#loginEmail').css('border', '1px solid #f33')
            $('#loginPassword').css('border', 'none')
            return;
        }

        // password validation
        if ($('#loginPassword').val().length < 6) {
            $('#loginError').html('Şifreniz 6 karakter ya da daha uzun olmalıdır.');
            $('#loginError').show();
            $('#loginPassword').css('border', '1px solid #f33')
            $('#loginEmail').css('border', 'none')
            return;
        }

        var prt = {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val(),
            remember: $('#loginRememberMe').prop('checked')
        }

        Backend.Post(
            'Login',
            prt,
            function (response) {

                if (!response.Success) {
                    $('#loginError').html(response.Message);
                    $('#loginError').show();
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


    OpenLoginForm: function () {
        $('#create-form,#forgot-password-form').hide();
        $('#login-form').show();
        $("html, body").animate({ scrollTop: 0 }, 600);
    },
    OpenCreateForm: function () {
        $('#login-form').hide();
        $('#create-form').show();
        $("html, body").animate({ scrollTop: 0 }, 600);

    },

    ForgotPassword: function () {
        $('#forgotEmail').val($('#loginEmail').val())
        $('#login-form').hide();
        $('#forgot-password-form').show();
        $("html, body").animate({ scrollTop: 0 }, 600);
    },

    SendConfirmLink: function (userid) {
        Backend.Post(
            'SendConfirmLink',
            { userid: userid},
            function (response) {

                if (!response.Success) {
                    $('#loginError').html(response.Message);
                    $('#loginError').show();
                    return;
                }
                $('#loginError').html('<div class="alert alert-info">1-2 dakika içerisinde doğrulama linki mail adresinize gönderilecektir.</div>');
            }
        )
    },

    SendForgotPasswordLink: function () {

        // email validation regex
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // email validation
        if (!regex.test($('#loginEmail').val())) {
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