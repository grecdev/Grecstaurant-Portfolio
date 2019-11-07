"use strict";

import { ui } from '../ui.js';

// Get the current date
// So we can increment the month / year
const navigate = {
	year: new Date().getFullYear(),
	month: new Date().getMonth(),
}

// We check for reservation page because it gives errors in console and bugs the whole script
if(location.pathname.includes('reservation')) {
	ui.next_month_btn.addEventListener('click', (e) => {
	
		// Increment months
		if(navigate.month < 11) navigate.month++
		// Reset month and go to the next year
		else if(navigate.month === 11) {
			navigate.month = 0;
			navigate.year++;
		}
	
		ui.monthChange(navigate);
	
		e.stopPropagation();
	});
	
	ui.prev_month_btn.addEventListener('click', (e) => {
	
		// Decrement months
		if(navigate.month >= 1) navigate.month--;
		// // Reset month and go to the previous year
		else if(navigate.month === 0) {
			navigate.month = 11;
			navigate.year--;
		}
	
		ui.monthChange(navigate);
	
		e.stopPropagation();
	});
	
	ui.date_input.addEventListener('click', (e) => {
	
		ui.showHideModal(e);
	
		e.stopPropagation();
	});
	
	ui.time_input.addEventListener('click', (e) => {
	
		ui.showHideModal(e);
	
		e.stopPropagation();
	});
	
	// I put directly on the modal so don't have to manny listeners ( reduce memory usage )
	ui.modals.addEventListener('click', (e) => {
	
		ui.showHideModal(e, navigate);
	
		ui.setDate(e, navigate);
	
		e.stopPropagation();
	});
}