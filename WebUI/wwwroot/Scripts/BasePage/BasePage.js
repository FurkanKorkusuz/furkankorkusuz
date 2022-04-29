$(document).ready(function () {
    BasePage.Scroll();
    $('.select2').select2();
    $.fn.datepicker.defaults.format = "dd-mm-yyyy";
    $(".datepicker")
        .datepicker({
            format: "dd-mm-yyyy",
            autoclose: true,
            todayHighlight: true,
            clearBtn: true,
        });
});

var BasePage = {
    deviceType: 2, // Default
    DeviceTypes: {
        Pc: 1,
        Mobil: 2
    },
    GetDeviceType: function () {
        if (screen.width > 992)//992
        {
            this.deviceType = this.DeviceTypes.Pc;
        }
        else
            this.deviceType = this.DeviceTypes.Mobil;

        //this.deviceType = 2;//bunu kapat sadece mobil yapmak için
    },
    CookieAccept: function () {
        var date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = "fk_cp=1" + expires + "; path=/";

        Backend.Post(
            "CookieAccept",
            "{}",
            function (response) {
                $("#CookieAccept").remove()
            },
            {
                BaseUrl: '/Home'
            }
        )
    },

    Scroll: function () {

        // ------------------------ Yukarı çıkaran buton ---------------------------
        var scrollButton = $("#scrollTopButton");
        // When the user scrolls down 20px from the top of the document, show the button
        window.onscroll = function () { scrollFunction() };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                scrollButton.css('display', 'block');
            } else {
                scrollButton.css('display', 'none');
            }
        }
        // ------------------------ Yukarı çıkaran buton ---------------------------


        // ------------------------ SideBar ---------------------------



        // ------------------------ SideBar ---------------------------
    },
    GoScrollTop: function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    },

    LogOut: function () {
        Backend.Post(
            "LogOut",
            "{}",
            function (response) {
                window.location.href = "/User/Logon";
            },
            {
                BaseUrl: '/User'
            }
        )

    },
    GoHistoryBack: function () {
        window.history.back();
    },

    HasRole: function (role) {
        if (UserData.Roles.indexOf(1) > -1) // 1 Admin
            return true;
        return (UserData.Roles.indexOf(role) > -1);
    }

};
var LoadingImg = {
    on: function () {
        $("#AjaxLoadingImage").css("display", "block")
    },
    off: function () {
        $("#AjaxLoadingImage").css("display", "none")
    }
};


$(function () {

    var $window = $(window);
    var lastScrollTop = $window.scrollTop();
    var wasScrollingDown = true;

    var $sidebar = $("#sidebar");
    if ($sidebar.length > 0) {

        var initialSidebarTop = $sidebar.position().top;

        $window.scroll(function (event) {


        });
    }
});
