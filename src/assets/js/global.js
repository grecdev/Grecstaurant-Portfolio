"use strict";
// Global functionality

import { ui } from './ui.js';

// Event Listeners
window.addEventListener('scroll', (e) => {

	ui.scrollFunctionality(e);

	e.stopPropagation();
});