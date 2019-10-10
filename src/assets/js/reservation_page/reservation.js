"use strict";

import { ui } from '../ui.js';

// Get the current date
// So we can increment the month / year
const date = new Date();

const current = {
	year: date.getFullYear(),
	month: date.getMonth(),
	monthDay: date.getDate(),
	weekDay: date.getDay()
}

ui.next_month_btn.addEventListener('click', (e) => {

	// Increment months
	if(current.month < 11) current.month++
	// Reset year + month
	else if(current.month === 11) {
		current.month = 0;
		current.year++;
	}

	ui.monthChange(e, current);

	e.stopPropagation();
});

ui.prev_month_btn.addEventListener('click', (e) => {

	// Decrement months
	if(current.month > 1) current.month--;
	// Reset year + month
	else if(current.month === 1) {
		current.month = 11;
		current.year--;
	}

	ui.monthChange(e, current);

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', (e) => {

	ui.monthChange(e, current);

	e.stopPropagation();
});