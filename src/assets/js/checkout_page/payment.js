"use strict";

import { ui } from '../ui.js';

if(location.pathname.includes('checkout')) {
	ui.payment_form.addEventListener('click', (e) => {
	
		ui.changePaymentMethod(e);
	
		e.stopPropagation();
	});

	// We have more than 1 form on the checkout page so that's why we asign multiple listeners
	document.querySelectorAll('form').forEach(form => {
		form.addEventListener('submit', (e) => {
			ui.regexValidation(e);

			e.preventDefault();
			e.stopPropagation();
		});
	});

	// Format card
	ui.cardNumber_input.addEventListener('keydown', (e) => {

		ui.cardFormat(e);
	
		e.stopPropagation();
	});

	ui.cardNumber_input.addEventListener('paste', (e) => {

		ui.cardFormat(e);

		e.stopPropagation();
	});

	// Re-enable paste
	ui.cardNumber_input.addEventListener('select', (e) => {

		ui.cardFormat(e);

		e.stopPropagation();
	});
}