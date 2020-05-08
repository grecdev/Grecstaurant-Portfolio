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

	ui.sneakpeakBox(e);

	if(document.body.contains(ui.resetScroll_btn)) ui.resetScroll(e);

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
		ui.populateOrderPreview(e);
		
		// Model + View + Controller
		http.getCountries_xhr()
		.then(data => ui.populateRegion(data))
		.catch(err => console.log(err));

	}

	// About page sneakbox
	ui.sneakpeakBox(e);

	e.stopPropagation();
});

// Events for all inputs
ui.input_field.forEach(input => {

	// blur event doesn't bubble so i removed e.stopPropagation() method => https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
	input.addEventListener('blur', ui.regexValidation);

	input.addEventListener('change', (e) => {
		
		ui.changeValue(e);
	
		e.stopPropagation();
	});

});

// Disable characters from inputs that require only numbers
// Here i can add the event directly to the input becuase the elements are already in the DOM (not inserted with JavaScript)
ui.letterDisabled_input.forEach(input => {
	input.addEventListener('keydown', (e) => {

		ui.disableLetters(e);
	
		e.stopPropagation();
	});
});

if(document.body.contains(ui.form)) {
	ui.form.addEventListener('submit', (e) => {

		ui.regexValidation(e);
		
		e.preventDefault();	
		e.stopPropagation();
	});
}

// Show mobile header
if(document.body.contains(ui.barContainer_btn)) {
	ui.barContainer_btn.addEventListener('click', (e) => {
	
		ui.mobileNavbar(e);
	
		e.stopPropagation();
	});
}

if(document.body.contains(ui.resetScroll_btn)) {
	ui.resetScroll_btn.addEventListener('click', (e) => {

		ui.resetScroll(e);

		e.stopPropagation();
	});
}