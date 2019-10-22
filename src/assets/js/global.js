"use strict";
// Global functionality

import { ui } from './ui.js';
import { http } from './http/http.js';

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

	// For menu page only
	if(location.pathname.includes('menu')) {
		http.getMenu()
		.then(data => {

			// When we load show the pizza menu
			ui.populateMenu(data, 'pizza');

		})
		.catch(err => console.log(err));
	}

	e.stopPropagation();
});

// Events for all inputs ( i can't put blur event on from )
document.querySelectorAll('input[type="text"]').forEach(input => {

	input.addEventListener('blur', (e) => {

		ui.regexValidation(e);

		e.stopPropagation();

	});

});

// For pages that have the input type file
// Cause erros and disable others listeners if we don't check (disable the if statement so you can see)
if(document.body.contains(document.querySelector('input[type="file"]'))) {
	// File name placeholder
	ui.upload_input.addEventListener('change', (e) => {
	
		ui.uploadFile();
	
		e.stopPropagation();
	});
}

if(document.body.contains(ui.form)) {
	ui.form.addEventListener('submit', (e) => {
	
		ui.regexValidation(e);
	
		e.preventDefault();	
		e.stopPropagation();
	});
}