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
}