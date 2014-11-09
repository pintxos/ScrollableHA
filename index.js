(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.ScrollableHA = definition(jQuery, pintxos.inherit, pintxos.Component);
			define = null;
		};
	}


	define(
	[
		'jQuery',
		'pintxos-inherit',
		'pintxos-component'
	], function (
		$,
		inherit,
		Component
	) {

		var ScrollableHA, _defaults, _props;

		/* Defaults
		----------------------------------------------- */
		_defaults = {
			orientation: 'horizontal',
			scrollPosAttr: 'data-scroll-position',
			selectors: {
				scrollableEl: undefined,
				children: undefined
			}
		};

		_props = {
			horizontal: {
				scrollSize: 'scrollWidth',
				size: 'width',
				offset: 'left'
			},

			vertical: {
				scrollSize: 'scrollHeight',
				size: 'height',
				offset: 'top'
			}
		};

		/* Constructor
		----------------------------------------------- */
		ScrollableHA = function (el, options) {
			this._settings = $.extend(true, {}, _defaults, options);
			Component.call(this, el, this._settings);
		};

		inherit(ScrollableHA, Component);


		/* Methods
		----------------------------------------------- */

		/**
		 * All bootstrap logic should go here
		 * @return {void}
		 */
		ScrollableHA.prototype.init = function () {
			this.setScrollPos(0);
			ScrollableHA._super.init.call(this);
		};

		ScrollableHA.prototype._getProp = function (prop) {
			return _props[this._settings.orientation][prop];
		};

		ScrollableHA.prototype.getScrollPos = function () {

			return $.data(this.getScrollableEl(), 'scrollPos');
		};

		ScrollableHA.prototype.setScrollPos = function (pos) {

			var translate;

			if(this.getSettings().orientation === 'horizontal') {
				translate = 'translate3d('+ -(pos) +'px, 0, 0)';
			}else {
				translate = 'translate3d(0, '+ -(pos) +'px, 0)';
			}

			setCssTransform(this.getChildren(), translate);

			this._scrollPos = pos;

			$.data(this.getScrollableEl(), 'scrollPos', pos);

			this.getScrollableEl().trigger('scroll');
		};

		ScrollableHA.prototype.getMaskSize = function () {
			return Math.ceil(this.getScrollableEl()[this._getProp('size')]());
		};

		ScrollableHA.prototype.getMaxScrollPos = function () {
			return this.getScrollableEl()[0][this._getProp('scrollSize')] - this.getScrollableEl()[this._getProp('size')]();
		};

		ScrollableHA.prototype.isEndReached = function (offset) {
			offset = (typeof offset === 'undefined') ? 0 : offset;
			return this.getScrollPos() >= (this.getMaxScrollPos() - offset);
		};

		ScrollableHA.prototype.isBeginReached = function (offset) {
			offset = (typeof offset === 'undefined') ? 0 : offset;
			return this.getScrollPos() <= offset;
		};

		/**
		 * Getter for scrollable el
		 * @return {jQuery}
		 */
		ScrollableHA.prototype.getScrollableEl = function () {
			return this._resolveElement(this.getSettings().selectors.scrollableEl);
		};

		ScrollableHA.prototype.getChildren = function (forceQuery) {
			var selector;

			if(typeof this._$children === 'undefined') {

				selector = this.getSettings().selectors.children;

				if(typeof selectors === 'undefined') {
					this._$children = this.getScrollableEl().children();
				}else {
					this._$children = this.getScrollableEl().find(selector);
				}
			}

			return this._$children;

		};

		/* Helpers
		----------------------------------------------- */
		function setCssTransform ($el, value) {

			$el.css('-webkit-transform', value)
				.css('-moz-transform', value)
				.css('-ms-transform', value)
				.css('-o-transform', value)
				.css('transform', value);
		}

		/* Export
		----------------------------------------------- */
		return ScrollableHA;

	});

})(this);
