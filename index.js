(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.ScrollableHA = definition();
			define = null;
		};
	}

	define([], function () {


		/* Constructor
		----------------------------------------------- */
		var ScrollableHA = function () {

		};


		/* Methods
		----------------------------------------------- */

		/**
		 * All bootstrap logic should go here
		 * @return {void}
		 */
		ScrollableHA.prototype.init = function () {

		};

		/**
		 * All teardown logic should go here
		 * @return {void}
		 */
		ScrollableHA.prototype.destroy = function () {

		};


		/* Event handlers
		----------------------------------------------- */


		/* Export
		----------------------------------------------- */
		return ScrollableHA;

	});

})(this);
