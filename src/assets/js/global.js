"use strict";
// Global functionality

import { ui } from './ui.js';
import { http } from './http.js';

// Get the current date
const current = {
	year: new Date().getFullYear(),
	month: new Date().getMonth(),
	monthDay: new Date().getDate(),
	weekDay: new Date().getDay()
}

// Preloader
// load event doesn't bubble so i removed e.stopPropagation() method => https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
window.addEventListener('load', ui.hideLoader);

// Event Listeners
window.addEventListener('scroll', (e) => {

	ui.scrollFunctionality(e);

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', (e) => {

	// For reservation page only
	if(location.pathname.includes('reservation')) ui.monthChange(current);

	// For menu page only
	if(location.pathname.includes('menu')) {

		// Model + View + Controller
		http.getMenu_xhr()
		// When we load show the pizza menu
		.then(data => ui.populateMenu(data, 'pizza'))
		.catch(err => console.log(err));

		// Populate cart
		ui.populateCart();
	}

	// For checkout page only
	if(location.pathname.includes('checkout')) {

		// Change between forms
		ui.checkoutFormAnimation(e, null);
		ui.populateOrderPreview(e);
		
		// Model + View + Controller
		http.getCountries_xhr()
		.then(data => ui.populateRegion(data))
		.catch(err => console.log(err));
	}

	e.stopPropagation();
});

// Events for all inputs ( i can't put blur event on from )
// blur event doesn't bubble so i removed e.stopPropagation() method => https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
document.querySelectorAll('input[type="text"]').forEach(input => input.addEventListener('blur', (e) => ui.regexValidation(e) ));

// Disable characters from inputs that require only numbers
// Here i can add the event directly to the input becuase the elements are already in the DOM (not inserted with JavaScript)
ui.letterDisabled_input.forEach(input => {
	input.addEventListener('keydown', (e) => {

		ui.disableLetters(e);
	
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

// On checkout page we have 2 forms, and on the checkout page indiviual script i added another listener for forms
if(document.body.contains(document.querySelector('form')) && !location.pathname.includes('checkout')) {
	ui.form.addEventListener('submit', (e) => {

		ui.regexValidation(e);

		e.preventDefault();	
		e.stopPropagation();
	});
}