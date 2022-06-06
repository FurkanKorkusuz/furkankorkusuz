
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
            string htlmMenu = @"
                  <nav class='sb-topnav navbar navbar-expand navbar-dark bg-dark'>
            <!-- Navbar Brand-->
            <a class='navbar-brand ps-3' href='index.html'>Alkapida Panel</a>
         
         
            <ul class='navbar-nav' style='right:10px;'>
                <li class='nav-item dropdown'>
                    <a class='nav-link dropdown-toggle' id='navbarDropdownUser' href='#' role='button' data-bs-toggle='dropdown' aria-expanded='false'><i class='fas fa-user fa-fw'></i></a>
                    <ul class='dropdown-menu dropdown-menu-end' aria-labelledby='navbarDropdownUser'>
                        <li><a class='dropdown-item' href='#!'>Profil</a></li>
                        <li><a class='dropdown-item' href='#!'>Ayarlar</a></li>
                        <li><hr class='dropdown-divider' /></li>
                        <li><a class='dropdown-item' href='#!'>Çıkış</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id='layoutSidenav'>
            <div id='layoutSidenav_nav'>
                <nav class='sb-sidenav accordion sb-sidenav-dark' id='sidenavAccordion'>
                    <div class='sb-sidenav-menu'>
                        <div class='nav'>
                            <div class='sb-sidenav-menu-heading'>Core</div>
                            <a class='nav-link' href='index.html'>
                                <div class='sb-nav-link-icon'><i class='fas fa-tachometer-alt'></i></div>
                                Dashboard
                            </a>
                            <div class='sb-sidenav-menu-heading'>Interface</div>
                            <a class='nav-link collapsed' href='#' data-bs-toggle='collapse' data-bs-target='#collapseLayouts' aria-expanded='false' aria-controls='collapseLayouts'>
                                <div class='sb-nav-link-icon'><i class='fas fa-columns'></i></div>
                                Layouts
                                <div class='sb-sidenav-collapse-arrow'><i class='fas fa-angle-down'></i></div>
                            </a>
                            <div class='collapse' id='collapseLayouts' aria-labelledby='headingOne' data-bs-parent='#sidenavAccordion'>
                                <nav class='sb-sidenav-menu-nested nav'>
                                    <a class='nav-link' href='layout-static.html'>Static Navigation</a>
                                    <a class='nav-link' href='layout-sidenav-light.html'>Light Sidenav</a>
                                </nav>
                            </div>
                            <a class='nav-link collapsed' href='#' data-bs-toggle='collapse' data-bs-target='#collapsePages' aria-expanded='false' aria-controls='collapsePages'>
                                <div class='sb-nav-link-icon'><i class='fas fa-book-open'></i></div>
                                Pages
                                <div class='sb-sidenav-collapse-arrow'><i class='fas fa-angle-down'></i></div>
                            </a>
                            <div class='collapse' id='collapsePages' aria-labelledby='headingTwo' data-bs-parent='#sidenavAccordion'>
                                <nav class='sb-sidenav-menu-nested nav accordion' id='sidenavAccordionPages'>
                                    <a class='nav-link collapsed' href='#' data-bs-toggle='collapse' data-bs-target='#pagesCollapseAuth' aria-expanded='false' aria-controls='pagesCollapseAuth'>
                                        Authentication
                                        <div class='sb-sidenav-collapse-arrow'><i class='fas fa-angle-down'></i></div>
                                    </a>
                                    <div class='collapse' id='pagesCollapseAuth' aria-labelledby='headingOne' data-bs-parent='#sidenavAccordionPages'>
                                        <nav class='sb-sidenav-menu-nested nav'>
                                            <a class='nav-link' href='login.html'>Login</a>
                                            <a class='nav-link' href='register.html'>Register</a>
                                            <a class='nav-link' href='password.html'>Forgot Password</a>
                                        </nav>
                                    </div>
                                    <a class='nav-link collapsed' href='#' data-bs-toggle='collapse' data-bs-target='#pagesCollapseError' aria-expanded='false' aria-controls='pagesCollapseError'>
                                        Error
                                        <div class='sb-sidenav-collapse-arrow'><i class='fas fa-angle-down'></i></div>
                                    </a>
                                    <div class='collapse' id='pagesCollapseError' aria-labelledby='headingOne' data-bs-parent='#sidenavAccordionPages'>
                                        <nav class='sb-sidenav-menu-nested nav'>
                                            <a class='nav-link' href='401.html'>401 Page</a>
                                            <a class='nav-link' href='404.html'>404 Page</a>
                                            <a class='nav-link' href='500.html'>500 Page</a>
                                        </nav>
                                    </div>
                                </nav>
                            </div>
                            <div class='sb-sidenav-menu-heading'>Addons</div>
                            <a class='nav-link' href='charts.html'>
                                <div class='sb-nav-link-icon'><i class='fas fa-chart-area'></i></div>
                                Charts
                            </a>
                            <a class='nav-link' href='tables.html'>
                                <div class='sb-nav-link-icon'><i class='fas fa-table'></i></div>
                                Tables
                            </a>
                        </div>
                    </div>
                    <div class='sb-sidenav-footer'>
                        <div class='small'>Logged in as:</div>
                        Start Bootstrap
                    </div>
                </nav>
            </div>
            
            <div id='layoutSidenav_content'>
                <!-- RenderBody-->
                <main>
                  	<div id='renderBody' class='render-body col-xl-10 col-md-10 col-lg-10 col-sm-12'>
				        @RenderBody()
			        </div>
                </main>
                <!-- RenderBody-->
                <footer class='py-4 bg-light mt-auto'>
                    <div class='container-fluid px-4'>
                        <div class='d-flex align-items-center justify-content-between small'>
                            <div class='text-muted'>Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href='#'>Privacy Policy</a>
                                &middot;
                                <a href='#'>Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        ";

            IHttpContextAccessor httpContextAccessor = ServiceTool.ServiceProvider.GetService<IHttpContextAccessor>();

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