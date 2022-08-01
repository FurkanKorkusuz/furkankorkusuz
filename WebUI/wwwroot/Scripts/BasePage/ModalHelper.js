"use strict";

var SC = SC || {};

SC.Modal = function (id, buttons, show, append, modalClasses, heightPercentage, fadeIn, rebuild, withCloseButton, withEscape, width) {

	append = append ? append : "body";
	fadeIn = fadeIn === true;
	rebuild = rebuild === true;
	withCloseButton = withCloseButton !== false;
	withEscape = withEscape !== false;

	// Private static helper
	var buttonsHtml = "";

	if (buttons) {
		if ($.type(buttons) !== "array")
			throw new Error("the buttons parameter should be an array containing instances of SC.ModalButton.");

		buttonsHtml += "<div class=\"modal-footer\">";
		if (buttons.length > 0) {
			for (var i = 0, j = buttons.length; i < j; i++)
				buttonsHtml += buttons[i].GetHtml();
		}
		buttonsHtml += "</div>";

	}

	this.$Modal = $(append).children("#" + id);

	if (rebuild)
		this.$Modal.remove();

	// Remove is already present and rebuild is set to true
	if (this.$Modal.length === 0 || rebuild) {

		// The first div represents the outer div that holds the backdrop as well when the dialog gets opened.
		$(append).append(
			`<div class="modal ${(fadeIn ? " fade " : "")} ${(modalClasses ? modalClasses : "")}"
			id="${id}" role="dialog" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content" >
						<div class="modal-header">
							<h4 class="modal-title" id="ModalLabel">
								${(withCloseButton ? `<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>` : "")}
							</h4>
						</div>
						<div class="modal-body">
						</div>
						${(buttonsHtml ? buttonsHtml : "")}
					</div>
				</div>
			</div>`
		);


		this.$Modal = $(append).children("#" + id);
	}

	buttonsHtml = null;

	this.$Modal.data("object", this);
	this.$Header = this.$Modal.find(".modal-header");
	this.$Title = this.$Header.find(".modal-title");
	this.$Body = this.$Modal.find(".modal-body");
	this.$Footer = this.$Modal.find(".modal-footer");

	this.HeightPercentage = (!isNaN(heightPercentage) && parseInt(heightPercentage) < 100) ? parseInt(heightPercentage) : NaN;

	if (this.HeightPercentage) {
		this.$Modal.on('show.bs.modal', function () {
			var $modal = $(this),
				height = Math.round(($modal.data("object").HeightPercentage / 100) * $(window).innerHeight());

			// Subtracting height for header and buttons/footer
			$modal.find('.modal-body').css('height', height - 120);
		});
	}
	if (!isNaN(width) && width != undefined) {
		this.$Modal.find(".modal-body").css('width', width);
		this.$Modal.find(".modal-dialog").css('max-width', width);
	}
	this.$Modal.modal({
		backdrop: withEscape ? true : "static",
		keyboard: withEscape,
		show: show,
	});
};

SC.Modal.Message = function (id, title, message, options) {
	/// <summary>Call for message without buttons and close option (WithCloseButton and WithEscape) if not set.</summary>
	/// <param name="options" type="object">Options to control the Modal: OnOkCaption (string), OnCancelCaption (string), options.FadeIn (bool), WithCloseButton (bool), WithEscape (bool) : both escape key and clicking backdrop, CloseOnOk (bool): close modal when clicking Ok buttion, CloseOnCancel (bool): close modal when clicking Cancel buttion.</param>

	options = $.type(options) !== "object" ? {} : options;

	// Setting defaults
	if (!("WithCloseButton" in options))
		options.WithCloseButton = false;
	if (!("WithEscape" in options))
		options.WithEscape = false;

	return SC.Modal.Confirm(id, title, message, false, false, null, options);
};

SC.Modal.Ok = function (id, title, message, onOk, onClose, options) {
	/// <param name="options" type="object">Options to control the Modal: OnOkCaption (string), OnCancelCaption (string), options.FadeIn (bool), WithCloseButton (bool), WithEscape (bool) : both escape key and clicking backdrop, CloseOnOk (bool): close modal when clicking Ok buttion, CloseOnCancel (bool): close modal when clicking Cancel buttion, RemoveOnClose (bool): remove the modal its html, including its content, from the DOM after closing the modal (attached event listeners are also removed from memory), OnShow (functions): when showing the modal, OnShown (functions): when the modal is shown.</param>
	return SC.Modal.Confirm(id, title, message, onOk, false, onClose, options);
};

SC.Modal.Wait = function (id, title, withProgressIndication, message, onClose, options) {
	/// <param name="options" type="object">Options to control the Modal: options.FadeIn (bool), WithCloseButton (bool), WithEscape (bool) : both escape key and clicking backdrop, CloseOnOk (bool): close modal when clicking Ok buttion, CloseOnCancel (bool): close modal when clicking Cancel buttion, RemoveOnClose (bool): remove the modal its html, including its content, from the DOM after closing the modal (attached event listeners are also removed from memory), OnShow (functions): when showing the modal, OnShown (functions): when the modal is shown.</param>

	options = $.isPlainObject(options) ? options : {};
	options.WithEscape = false;
	options.WithCloseButton = false;
	options.RemoveOnClose = true;
	options.OnShow = function (e) {
		$(e.currentTarget).data("object").EnableCurtain(withProgressIndication, message);
	};

	return SC.Modal.Confirm(id, title, "", false, false, onClose, options);

};

SC.Modal.Cancel = function (id, title, message, onCancel, onClose, options) {
	/// <param name="options" type="object">Options to control the Modal: OnOkCaption (string), OnCancelCaption (string), options.FadeIn (bool), WithCloseButton (bool), WithEscape (bool) : both escape key and clicking backdrop, CloseOnOk (bool): close modal when clicking Ok buttion, CloseOnCancel (bool): close modal when clicking Cancel buttion, RemoveOnClose (bool): remove the modal its html, including its content, from the DOM after closing the modal (attached event listeners are also removed from memory), OnShow (functions): when showing the modal, OnShown (functions): when the modal is shown.</param>
	options = $.type(options) !== "object" ? {} : options;
	options.OnCancelCaption = 'Kapat';
	return SC.Modal.Confirm(id, title, message, false, onCancel, onClose, options);
};

SC.Modal.Confirm = function (id, title, message, onOk, onCancel, onClose, options) {
	/// <summary>Call for message with cancel and ok button (confirmation).</summary>
	/// <param name="title" type="string">Title of modal.</param>
	/// <param name="message" type="string">Content of modal. Can be html.</param>
	/// <param name="onOk" type="function">Called when the Ok button is clicked. Gets jQuery event as first param and dialog object as second param, when false the related button won't appear.</param>
	/// <param name="onCancel" type="function">Called when the Cancel button is clicked. Gets jQuery event as first param and dialog object as second param, when false the related button won't appear.</param>
	/// <param name="onClose" type="function">Called when the modal is closed by other means, either by a button (Cancel/Close), or by other use of the escape key or close button. Gets jQuery event as first param and dialog object as second param.</param>
	/// <param name="options" type="object">Options to control the Modal: 
	/// <para />OnOkCaption (string), 
	/// <para />OnCancelCaption (string), 
	/// <para />FadeIn (bool)
	/// <para />WithCloseButton (bool)
	/// <para />WithEscape (bool): both escape key and clicking backdrop
	/// <para />CloseOnOk (bool): close modal when clicking Ok buttion
	/// <para />CloseOnCancel (bool): close modal when clicking Cancel button
	/// <para />RemoveOnClose (bool): remove the modal its html, including its content, from the DOM after closing the modal (attached event listeners are also removed from memory). Default: true
	/// <para />OnShow (functions): when showing the modal
	/// <para />OnShown (functions): when the modal is shown
	/// <para />ModalClasses: class(es) string added to the outer container of the modal-dialog (.modal-dialog), 
	/// <para />HeightPercentage: integer to fixate the body of the modal to enable scrolling(add scrollable-y to the ModalClasses).
	///</param>
	options = $.type(options) === "object" ? options : {};

	//var id = "ConfirmModal_928349827498274923402342",
	var id = "ConfirmModal_" + id,
		buttons = [],
		withCancel = onCancel !== false,
		withOk = onOk !== false;


	if (withOk)
		buttons.push(new SC.ModalButton("btn-primary confirm-modal-ok tabkey", options.OnOkCaption ? options.OnOkCaption : "Tamam", options.CloseOnOk !== false));

	if (withCancel)
		buttons.push(new SC.ModalButton("btn-outline-danger confirm-modal-cancel", options.OnCancelCaption ? options.OnCancelCaption : "İptal", options.CloseOnCancel !== false));


	var modal = new SC.Modal(id, buttons, false, "body", options.ModalClasses, options.HeightPercentage, options.FadeIn === true, true, options.WithCloseButton, options.WithEscape, options.Width);

	if (onClose || options.RemoveOnClose !== false)
		modal.AddOnHideListener(function (e) {
			if ($.isFunction(onClose))
				onClose(e, modal);
			if (options.RemoveOnClose !== false)
				modal.Remove(false);
		});

	if (options.OnShow)
		modal.AddOnShowListener(options.OnShow);

	if (options.OnShown)
		modal.AddOnShownListener(options.OnShown);

	modal.$Title.html(title);
	modal.$Body.html(message);

	if (withCancel && onCancel)
		modal.$Footer.off("click", ".btn.confirm-modal-cancel").on("click", ".btn.confirm-modal-cancel", function (e) {
			if ($.isFunction(onCancel))
				onCancel(e, modal);
		});
	if (withOk && onOk)
		modal.$Footer.off("click", ".btn.confirm-modal-ok").on("click", ".btn.confirm-modal-ok", function (e) {
			if ($.isFunction(onOk))
				onOk(e, modal);
		});
	return modal.Show();
};

SC.Modal.prototype.AddOnShownListener = function (fn) {
	this.$Modal.on('shown.bs.modal', fn);
	return this;
};

SC.Modal.prototype.AddOnShowListener = function (fn) {
	this.$Modal.on('show.bs.modal', fn);
	return this;
};

SC.Modal.prototype.AddOnHideListener = function (fn) {
	this.$Modal.on('hide.bs.modal', fn);
	return this;
};

SC.Modal.prototype.AddOnHiddenListener = function (fn) {
	this.$Modal.on('hidden.bs.modal', fn);
	return this;
};

SC.Modal.prototype.Show = function () {
	this.$Modal.modal("show");

	// One More modal  z-index
	$("div.modal-backdrop").last().css("z-index", (1100 + (9 * ($("div.modal-backdrop").length + 1))))
	$(this.$Modal).css("z-index", (1100 + (10 * ($("div.modal-backdrop").length + 1))))
	return this;
};

SC.Modal.prototype.Hide = function () {
	this.$Modal.modal("hide");
	return this;
};

SC.Modal.prototype.EnableCurtain = function (withProgressIndication, message) {
	this.DisableCurtain();
	this.$Modal.find("> .modal-dialog").append("<div class=\"modal-window-backdrop\">" + (withProgressIndication ? "<span class=\"progress-outer\"><i class=\"progress-spinner fa fa-spinner fa-pulse fa-2x fa-fw\" aria-hidden=\"true\"></i></span>" : "") + (message ? "<span class=\"label-outer\"><span class=\"label label-success\">" + message + "</span></span>" : "") + "<div class=\"modal-curtain\"></div></div>");
	return this;
};

SC.Modal.prototype.DisableCurtain = function () {
	this.$Modal.find("> .modal-dialog > .modal-window-backdrop").remove();
	return this;
};

SC.Modal.prototype.Remove = function (hideModal) {
	/// <summary>Hides AND removes modal html from DOM including all connected events.</summary>

	// Trigger possible related event handlers
	if (hideModal !== false)
		this.$Modal.modal("hide");

	// Remove modal html from DOM including attached event listeners (USE jQuery's remove!)
	this.$Modal.remove();

	// Set to empty object
	this.$Modal = $();
	// One More modal remove last backdrop  (SC.Modal.prototype.Show function z-index.)
	$("div.modal-backdrop").last().remove();

	return this;
};

SC.Modal.prototype.Update = function () {
	/// <summary>Updates the backdrop if it doesn't fit after updating the content/height of the modal.</summary>
	this.$Modal.data('bs.modal').handleUpdate()
	return this;
};

SC.ModalButton = function (classes, text, closeAll) {
	this.Class = $.trim(classes);
	this.Text = text;
	this.CloseAll = closeAll === true;

	this.GetHtml = function () {
		return "<button type=\"button\" class=\"btn" + (this.Class.length > 0 ? ' ' + this.Class : "") + "\"" + (this.CloseAll ? " data-dismiss=\"modal\"" : "") + ">" + this.Text + "</button>"
	}
	return this;
};