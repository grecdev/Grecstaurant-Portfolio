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
		ui.checkoutFormAnimation(e, null);
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
		
		ui.uploadFile(e);
	
		e.stopPropagation();
	});
}

// For pages that have the radio elements
// Cause erros and disable others listeners if we don't check (disable the if statement so you can see)
if(document.body.contains(document.querySelector('input[type="file"]'))) {

	document.querySelectorAll('input[type="radio"]').forEach(input => {

		// If radio has been checkd
		input.addEventListener('change', (e) => {

			// The 'input-filled' class we use it in the regex validation
			e.target.parentElement.classList.add('input-filled', 'input-success');
			e.target.parentElement.classList.remove('input-error');

			setTimeout(() => e.target.parentElement.classList.remove('input-success'), 1250);
	
			e.stopPropagation();
		});

	})
}

// On checkout page we have 2 forms, and on the checkout.js script i added another listener for forms
if(document.body.contains(ui.form) && !location.pathname.includes('checkout')) {
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

// Events for all inputs ( i can't put blur event on from )
// blur event doesn't bubble so i removed e.stopPropagation() method => https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event
///// IN PROGRESS
ui.input_field.forEach(input => input.addEventListener('blur', ui.regexValidation));
//////