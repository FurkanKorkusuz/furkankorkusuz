"use strict";
var Backend = function (debug) {

	this.Debug = debug === true;
	this.Loading = false;
	this.DefaultBaseUrl = null;

	this.GetDefaultBaseUrl = function () {
		if (this.DefaultBaseUrl === null)
			this.DefaultBaseUrl = document.location.origin
				+ ( document.location.pathname.indexOf("/", 1) > 0
				? document.location.pathname.substring(0, document.location.pathname.indexOf("/", 1)).split('?')[0].split('#')[0]
				: document.location.pathname.split('?')[0].split('#')[0] )
		return this.DefaultBaseUrl;
	};

	this.HandleResponse = function (response, messageMs, onAfterLastMessage) {
		Msg.All(response, $.type(messageMs) === "number" ? messageMs : null, function () {
			if ($.isFunction(onAfterLastMessage))
				onAfterLastMessage(response);
			if (response.Refresh === true)
				document.location.reload(true);
		});
	},
		this.Post = function (webMethod, data, onSuccess, options) {

			if (this.Loading) return;
			this.Loading = true;

			var _this = this,
				o = {};

			if ($.isPlainObject(options))
				o = $.extend(o, options);

			var url = (o.BaseUrl ? o.BaseUrl : this.GetDefaultBaseUrl()),
				contentType = o.ContentType ? o.ContentType : "application/x-www-form-urlencoded; charset=utf-8",
				isJsonContentType = contentType.includes("json"),
				dataType = o.DataType ? o.DataType : "json";

			if (url.charAt(url.length - 1) !== '/')
				url += '/'

			 url += webMethod;


			$.ajax({
				type: "POST",
				contentType: contentType,
				data: data === null ? null : isJsonContentType ? JSON.stringify(data) : data,
				dataType: dataType,
				url: url,
				success: function (response) {
					if ($.isFunction(onSuccess))
						onSuccess(response);

				},
				error: function (x, error,d) {
					$("#AjaxLoadingImage").hide();
					if ($.isFunction(o.OnError))
						o.OnError(x, error);
						SC.Modal.Ok(
							"BeckendHelperError",
							"Bir hata oluştu",
							'<h3>İşlem Gerçekleştirilemedi...</h3>',
							null,
							null,
							{
								OnCloseCaption: 'Kapat'
							}
						)
					
				},
				beforeSend: function () {
					$("#AjaxLoadingImage").show();
				},
				complete: function () {
					$("#AjaxLoadingImage").hide();
				},
				statusCode: {
					401: function () {
						if (Backend.IsRedirecting)
							return;
						Backend.IsRedirecting = true;
						Msg.Error("Your not logged on anymore, your session may have expired.", 1000, function () {
							document.location.href = "/Logon/";
						});
					}
				}
			}).always(function () {
				_this.Loading = false;
				if ($.isFunction(o.OnAlways))
					o.OnAlways();
			});

			return this;
		};

	// dubug mode delete 

	//this.Post = function (webMethod, data, onSuccess, options) {

	//	if (this.Loading) return;
	//	this.Loading = true;

	//	var _this = this,
	//		o = {};

	//	if ($.isPlainObject(options))
	//		o = $.extend(o, options);

	//	var url = (o.BaseUrl ? o.BaseUrl : this.GetDefaultBaseUrl()),
	//		contentType = o.ContentType ? o.ContentType : "application/json; charset=utf-8",
	//		isJsonContentType = contentType.includes("json"),
	//		dataType = o.DataType ? o.DataType : "json";

	//	if (url.charAt(url.length - 1) !== '/')
	//		url += '/'

	//	url += webMethod;

	//	if (this.Debug) {
	//		console.log("BaseUrl: ", (o.BaseUrl ? o.BaseUrl : this.GetDefaultBaseUrl()));
	//		console.log("Content type (out): ", contentType);
	//		console.log("Data type (in): ", dataType);
	//		console.log("POST data: ", data);
	//		console.log("POST URL: ", url);
	//		console.log("POST data: ", data);
	//	}

	//	$.ajax({
	//		type: "POST",
	//		contentType: contentType,
	//		data: data === null ? null : isJsonContentType ? JSON.stringify(data) : data,
	//		dataType: dataType,
	//		url: url,
	//		success: function (response) {

	//			if (_this.Debug)
	//				console.log("POST response: ", response);

	//			if (dataType === "json") {
	//				var responseParsed = response;
	//				// .NET content type: "application/json; charset=utf-8"
	//				if ($.type(response.d) === "string")
	//					responseParsed = $.parseJSON(response.d);

	//				if (_this.Debug)
	//					console.log("POST response parsed: ", responseParsed);

	//				if (o.AutoMessage !== false && $.type(Msg) === "object")
	//					_this.HandleResponse(responseParsed, o.AutoMessageMs, o.OnAfterLastMessage);

	//				if ($.type(responseParsed.Focus) === "string")
	//					$(responseParsed.Focus).focus();

	//				if ($.isFunction(onSuccess))
	//					onSuccess(responseParsed);
	//				return;
	//			}

	//			if ($.isFunction(onSuccess))
	//				onSuccess(response);

	//		},
	//		error: function (x, error) {

	//			$("#LoadingImage").hide();
	//			if ($.isFunction(o.OnError))
	//				o.OnError(x, error);

	//			if(_this.Debug)
	//				console.error("Error: " + error + "\n\nResponse: " + x.responseText);
	//		},
	//		beforeSend: function () {
	//			$("#LoadingImage").show();
	//		},
	//		complete: function () {
	//			$("#LoadingImage").hide();
	//		},
	//		statusCode: {
	//			401: function () {
	//				if (Backend.IsRedirecting)
	//					return;
	//				Backend.IsRedirecting = true;
	//				Msg.Error("Your not logged on anymore, your session may have expired.", 1000, function () {
	//					document.location.href = "/Logon/";
	//				});
	//			}
	//		}
	//	}).always(function () {
	//		_this.Loading = false;
	//		if ($.isFunction(o.OnAlways))
	//			o.OnAlways();
	//		});

	//	return this;
	//};
};

Backend.IsRedirecting = false;
/**
 *
 * @param {any} webMethod The web method to be called on the current URI.
 * @param {any} data Data payload. Note that all variables must be inside a container, named according the web method parameters.
 * @param {any} onSuccess Called on success.
 * @param {any} options Extra options: AutoMessage {bool}, AutoMessageMs {integer}, OnError {Function}, OnAlways {Function}, Debug {bool}, OnAfterLastMessage {Function}, BaseUrl {string}.
 * @returns {void}
 */
Backend.Post = function (webMethod, data, onSuccess, options) {
	if (options === undefined) options = {};
	return new Backend(options.Debug).Post(webMethod, data, onSuccess, options);
};

Backend.HandleResponse = function (response, messageMs, onAfterLastMessage, options) {
	if (options === undefined) options = {};
	return new Backend(options.Debug).HandleResponse(response, messageMs, onAfterLastMessage);
};




