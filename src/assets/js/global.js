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
		// Model + View + Controller
		http.getMenuXhr()
		// When we load show the pizza menu
		.then(data => ui.populateMenu(data, 'pizza'))
		.catch(err => console.log(err));

		// Populate cart
		ui.populateCart();
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

if(document.body.contains(ui.form)) {
	ui.form.addEventListener('submit', (e) => {

		ui.regexValidation(e);

		e.preventDefault();	
		e.stopPropagation();
	});
}

//// IN PROGRESS
document.querySelector('form[name="payment-form"]').addEventListener('click', (e) => {

	if(e.target.closest('.payment-card')) {
		document.querySelector('.payment-paypal .payment-box').classList.remove('visible-block');
		document.querySelector('.payment-card .payment-box').classList.remove('visible-none');

		document.getElementById('card-payment').nextElementSibling.classList.replace('radio-custom-checked', 'radio-custom-disabled');
		document.getElementById('credit-card').nextElementSibling.classList.replace('radio-custom-disabled', 'radio-custom-checked');
	}

	if(e.target.closest('.payment-paypal')) {
		
		document.querySelector('.payment-card .payment-box').classList.add('visible-none');
		document.querySelector('.payment-paypal .payment-box').classList.add('visible-block');

		document.getElementById('credit-card').nextElementSibling.classList.replace('radio-custom-checked', 'radio-custom-disabled');
		document.getElementById('card-payment').nextElementSibling.classList.replace('radio-custom-disabled', 'radio-custom-checked');

	}

	e.stopPropagation();
});