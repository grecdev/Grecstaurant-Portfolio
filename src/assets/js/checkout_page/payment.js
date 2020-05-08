"use strict";

import { ui } from '../ui.js';

if(location.pathname.includes('checkout')) {

	ui.payment_form.addEventListener('click', (e) => {
	
		ui.changePaymentMethod(e);
	
		e.stopPropagation();
	});

	// We have more than 1 form on the checkout page so that's why we asign multiple listeners
	// I disable this because i use the submit only on the shipping form
	// document.querySelectorAll('form').forEach(form => {
		
	// 	form.addEventListener('submit', (e) => {
	// 		ui.regexValidation(e);

	// 		e.preventDefault();
	// 		e.stopPropagation();
	// 	});
	// });

	ui.shippingReturn_btn.addEventListener('click', (e) => {

		ui.checkoutFormAnimation(e);

		e.stopPropagation();
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

	ui.cardExpiration_input.addEventListener('keydown', (e) => {

		ui.cardExpirationFormat(e);
	
		e.stopPropagation();
	});

	ui.cardExpiration_input.addEventListener('paste', (e) => {

		ui.cardExpirationFormat(e);

		e.stopPropagation();
	});

	// Mobile order preview
	ui.orderSummary_btn.addEventListener('click', (e) => {

		ui.previewOrderMobile(e);
	
		e.stopPropagation();
	});
}