"use strict";
// Global functionality

import { ui } from './ui.js';

// Get the current date
const date = new Date();

const current = {
	year: date.getFullYear(),
	month: date.getMonth(),
	monthDay: date.getDate(),
	weekDay: date.getDay()
}

// Event Listeners
window.addEventListener('scroll', (e) => {

	ui.scrollFunctionality(e);

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', (e) => {

	ui.monthChange(e, current);

	e.stopPropagation();
});