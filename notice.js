/**
 * Notice - v1.2.0
 * Copyright 2021 Abel Brencsan
 * Released under the MIT License
 */

var Notice = function(options) {

	'use strict';

	// Test required options
	if (typeof options.element !== 'object') throw 'Dismiss "element" option must be an object';

	// Default notice instance options
	var defaults = {
		element: null,
		dismissTrigger: null,
		acceptTrigger: null,
		collapseOnClose: false,
		initCallback: null,
		dismissCallback: null,
		acceptCallback: null,
		closeCallback: null,
		removeCallback: null,
		destroyCallback: null,
		isClosingClass: 'is-closing'
	};

	// Extend notice instance options with defaults
	for (var key in defaults) {
		this[key] = (options.hasOwnProperty(key)) ? options[key] : defaults[key];
	}

	// Notice instance variables
	this.isDismissed = false;
	this.isAccepted = false;
	this.isOpened = true;
	this.isRemoved = false;
	this.isInitialized = false;

};

Notice.prototype = function () {

	'use strict';

	var notice = {

		/**
		* Initialize notice. It adds events to handle notice. (public)
		*/
		init: function() {
			if (this.isInitialized) return;
			this.handleEvent = function(event) {
				notice.handleEvents.call(this, event);
			};
			this.element.addEventListener('transitionend', this);
			if(this.dismissTrigger) this.dismissTrigger.addEventListener('click', this);
			if(this.acceptTrigger) this.acceptTrigger.addEventListener('click', this);
			this.isInitialized = true;
			if (this.initCallback) this.initCallback.call(this);
		},

		/**
		* Close notice, call remove() method after closing animation is finished. (public)
		*/
		close: function() {
			var element = this.element;
			var isClosingClass = this.isClosingClass;
			this.isOpened = false;
			if (this.collapseOnClose) {
				element.style.maxHeight = this.element.scrollHeight + 'px';
				setTimeout(function() {
					element.classList.add(isClosingClass);
					element.style.maxHeight = 0;
				}, 100);
			}
			else {
				element.classList.add(isClosingClass);
			}
			if (this.closeCallback) this.closeCallback.call(this);
		},

		/**
		* Remove notice from the DOM. (private)
		*/
		remove: function() {
			if (this.isRemoved) return;
			this.isRemoved = true;
			this.element.parentElement.removeChild(this.element);
			if (this.removeCallback) this.removeCallback.call(this);
		},

		/**
		* Set notice as dismissed. (public)
		*/
		dismiss: function() {
			if (!this.isOpened) return;
			this.isDismissed = true;
			if (this.dismissCallback) this.dismissCallback.call(this);
			notice.close.call(this);
		},

		/**
		* Set notice as accepted. (public)
		*/
		accept: function() {
			if (!this.isOpened) return;
			this.isAccepted = true;
			if (this.acceptCallback) this.acceptCallback.call(this);
			notice.close.call(this);
		},

		/**
		* Handle events. (private)
		* On accept or dismiss trigger click: accept or dismiss notice.
		* On transition end: Remove notice after closing transition ended.
		* @param event object
		*/
		handleEvents: function(event) {
			switch(event.type) {
				case 'click':
					if (event.target == this.dismissTrigger) {
						notice.dismiss.call(this);
					}
					if (event.target == this.acceptTrigger) {
						notice.accept.call(this);
					}
					break;
				case 'transitionend':
					if (event.target == this.element) {
						notice.remove.call(this);
					};
					break;
			}
		},

		/**
		* Destroy notice. It removes all related events. (public)
		*/
		destroy: function() {
			if (!this.isInitialized) return;
			this.element.removeEventListener('transitionend', this);
			if(this.dismissTrigger) this.dismissTrigger.removeEventListener('click', this);
			if(this.acceptTrigger) this.acceptTrigger.removeEventListener('click', this);
			this.isInitialized = false;
			if (this.destroyCallback) this.destroyCallback.call(this);
		}
	};

	return {
		init: notice.init,
		close: notice.close,
		dismiss: notice.dismiss,
		accept: notice.accept,
		destroy: notice.destroy
	};

}();
