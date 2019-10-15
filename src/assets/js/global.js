"use strict";
// Global functionality

import { ui } from './ui.js';

// Get the current date
const current = {
	year: new Date().getFullYear(),
	month: new Date().getMonth(),
	monthDay: new Date().getDate(),
	weekDay: new Date().getDay()
}

// Event Listeners
window.addEventListener('scroll', (e) => {

	ui.scrollFunctionality(e);

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', (e) => {

	// For reservation page only
	if(location.pathname.includes('reservation')) ui.monthChange(current)

	e.stopPropagation();
});

// Regex validation for number inputs ( so we can type only numbers )
ui.phone_input.addEventListener('blur', (e) => {

	ui.regexValidation(e);

	console.log(e.target);

	e.stopPropagation();
});

// Regex validation for email inputs
ui.email_input.addEventListener('blur', (e) => {

	ui.regexValidation(e);

	console.log(e.target);

	e.stopPropagation();
});