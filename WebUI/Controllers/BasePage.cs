
using Core.Extensions;
using Core.Utilities.IoC;
using Core.Utilities.Security.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace MVC.Web.UI.Controllers
{
    public class BasePage
    {
        public static string BasePageMenu()
        {
            IHttpContextAccessor httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();
            string htlmMenu = @"
            <ul class='navbar-nav mr-auto'>
                [Admin]
   
                <li class='nav-item'><a class='nav-link scrollto text-white' href='/Home/Index'><i class='fas fa-home'></i> Anasayfa</a></li>  
                <li class='nav-item'><a class='nav-link scrollto text-white' href='/Project/List'><i class='fas fa-project-diagram'></i> Projeler</a></li>  
                <li class='nav-item'><a class='nav-link scrollto text-white' href='/Home/Contact'><i class='fas fa-phone-square-alt'></i> İletişim</a></li>  
                <li class='nav-item'><a class='nav-link scrollto text-white' href='/Home/About'><i class='fas fa-user-graduate'></i>&nbsp;Hakkımda</a></li>   
                <li class='nav-item'><a class='nav-link scrollto text-white' href='/Blog/List'><i class='fas fa-blog'></i>&nbsp;Blog</a></li>
            </ul>
            <ul class='navbar-nav navbar-right'>
                <li class='nav-item dropdown'>
                    [UserLogin]                    
                </li>
            </ul>
        ";

            if (! httpContextAccessor.HttpContext.User.Identity.IsAuthenticated)
            {
                htlmMenu = htlmMenu.Replace("[Admin]", " ");
                htlmMenu = htlmMenu.Replace(
                    "[UserLogin]",
                    "<a class='nav-link scrollto text-white' href='/Auth/Login'><i class='fas fa-sign-in-alt'></i> Giriş Yap</a>"
                    );
                return htlmMenu;
            }

            htlmMenu = htlmMenu.Replace(
                    "[UserLogin]",
                    @"<a class='nav-link dropdown-toggle text-white' href='#' id='navbarUserMenu' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='fas fa-user'></i> Hesabım</a>
                            <div class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarUserMenu'>
                                <a class='dropdown-item' href='/User/Detail'><i class='fas fa-user'></i> Profil</a>
                                <a class='dropdown-item' href='/Wallet/List'><i class='fas fa-wallet'></i> Cüzdanım</a>
                                <a class='dropdown-item' href='/WalletOperation/List'><i class='far fa-money-bill-alt'></i> Para Giriş-Çıkış</a>
                                <a class='dropdown-item' onclick='BasePage.LogOut()' href='#'><i class='fas fa-sign-out-alt'></i> Çıkış yap</a>
                            </div>"
                    );


           
            if (httpContextAccessor.HttpContext.User.IsAdmin())
            {
                htlmMenu = htlmMenu.Replace(
                 "[Admin]",
                 @" <li class='nav-item dropdown'>
                    <a class='nav-link dropdown-toggle text-white' href='#' id='navbarAdminMenu' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='fas fa-shield-alt'></i> Yönetim</a>
                            <div class='dropdown-menu dropdown-menu' aria-labelledby='navbarAdminMenu'>
                                <a class='dropdown-item' href='/Blog/List'><i class='fas fa-newspaper'></i> Bloglar</a>
                                <a class='dropdown-item' href='/Mission/List'><i class='fas fa-calender-alt'></i> Görevler</a>
                                <a class='dropdown-item' href='/Blog/BlogAdd'><i class='fas fa-plus-square'></i> Blog Ekle</a>
                                <a class='dropdown-item' href='/Project/Add'><i class='fas fa-plus-square'></i> Proje Ekle</a>
                                <a class='dropdown-item' href='/Visitor/List'><i class='fas fa-users'></i> Ziyaretçiler</a>
                                <a class='dropdown-item' href='/User/List'><i class='fas fa-users'></i> Kullanıcılar</a>
                                <a class='dropdown-item' href='/Category/List'><i class='fas fa-th'></i> Kategoriler</a> 
                                <a class='dropdown-item' href='/Role/List'><i class='fas fa-user-lock'></i> Yetkiler</a> 
                                <a class='dropdown-item' href='/Tag/List'><i class='fas fa-tag'></i> Etiketler</a> 
                                <a class='dropdown-item' href='/Comment/List'><i class='fas fa-comments'></i> Yorumlar</a> 
                                <a class='dropdown-item' href='/Home/Images'><i class='fas fa-image'></i> Resimler</a> 
                                <a class='dropdown-item' href='/NoteBook/List'><i class='fas fa-sticky-note'></i> Notlar</a> 
                                <a class='dropdown-item' href='/Wallet/List'><i class='fas fa-wallet'></i> Cüzdanlar</a> 
                                <a class='dropdown-item' href='/WalletOperationCategory/List'><i class='fas fa-th'></i> Cüzdan Kategorileri</a> 
                            </div>
                  </li>"
                 );

            }
            else
            {
                htlmMenu = htlmMenu.Replace("[Admin]", " ");
            }


            return htlmMenu;
        }

 

    }
}