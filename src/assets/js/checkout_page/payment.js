"use strict";

import { ui } from '../ui.js';

if(location.pathname.includes('checkout')) {
	ui.payment_form.addEventListener('click', (e) => {
	
		ui.changePaymentMethod(e);
	
		e.stopPropagation();
	});
}