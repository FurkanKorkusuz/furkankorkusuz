using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.UI.WebUI
{
	public static class Version
	{

		public const string VersionJs = "1.01";
		public const string VersionCss = "1.01";

		/// <summary>
		/// Force a reload of all js files for development, only active in DEBUG mode
		/// </summary>
		public const bool ForceContinuousReloadJs = true;

		/// <summary>
		/// Force a reload of all css files for development, only active in DEBUG mode
		/// </summary>
		public const bool ForceContinuousReloadCss = false;

		/// <summary>
		/// Global version control over includes to force reload where applied:
		///
		/// E.g.: <script src="/users/UsersAdd.js?v=@Core.Utilities.Mvc.Classes.Version.JS" type="text/javascript"></script>
		///
		/// </summary>
		// Force reloadevet 
		public static string JS
		{
			get
			{
#if DEBUG
				if (ForceContinuousReloadJs)
					return Guid.NewGuid().ToString();
#endif

				return VersionJs;
			}
		}

		public static string CSS
		{
			get
			{
#if DEBUG
				if (ForceContinuousReloadCss)
					return Guid.NewGuid().ToString();
#endif

				return VersionCss;
			}
		}
	}
}
