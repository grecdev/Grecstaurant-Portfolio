"use strict";
// Global functionality

import { ui } from './ui.js';

export const globalFunctionality = (() => {

	function init() {

		// Event Listeners
		window.addEventListener('scroll', (e) => {

			ui.scrollFunctionality(e);

			e.stopPropagation();
		});

	}

	return {
		init
	}
})();