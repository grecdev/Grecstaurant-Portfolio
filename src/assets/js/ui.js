"use strict";

class Ui {

	constructor() {
		// Ui elements
		this.chef_avatar = document.querySelector('.chef-avatar');
		this.pizza_left = document.querySelector('.pizza-left');
		this.pizza_right = document.querySelector('.pizza-right');
		this.header = document.querySelector('header');
		this.calendar_month = document.querySelector('.calendar-month');
		this.weekDays = document.querySelector('thead tr');
		this.monthDays = document.querySelector('tbody');
		this.modals = document.getElementById('modals');
		this.date_modal = document.querySelector('.date-modal');
		this.date_confirm_popup = document.querySelector('.date-info-confirmation');
		this.date_confirm_info = document.querySelector('.date-info-confirmation span');
		// Buttons
		this.prev_month_btn = document.getElementById('prev-month');
		this.next_month_btn = document.getElementById('next-month');
		this.date_input = document.getElementById('full-date');
		this.today_date_btn = document.getElementById('today-date');
		this.confirm_date_btn = document.getElementById('confirm-date');
		this.reset_date_btn = document.getElementById('reset-date');
		// Days / Months
		// So we can dynamically implement with JS
		this.dateNames = {
			months: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			],
			monthsShort: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec'
			],
			weekdays: [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday'
			],
			weekdaysShort: [
				'Sun',
				'Mon',
				'Tue',
				'Wed',
				'Thu',
				'Fri',
				'Sat'
			],
			weekdaysAbbrev: ['S','M','T','W','T','F','S']
		};

		// Current date
		// Current month ( not being increment / decrement )
		// DRY
		this.currentDate = {
			month: new Date().getMonth(),
			year: new Date().getFullYear(),
			day: new Date().getDate()
		}
	}

	// Scroll functionality
	scrollFunctionality(e) {

		const pos = Math.floor(pageYOffset);

		// For elements on the home page
		if(document.body.getAttribute('id') === 'home-page') {

			if(pos >= 500) ui.chef_avatar.classList.add('chef-visible')
			else ui.chef_avatar.classList.remove('chef-visible')
	
			if(pos >= 800) {
				ui.pizza_left.classList.add('pizza-visible');
				ui.pizza_right.classList.add('pizza-visible');
			} else {
				ui.pizza_left.classList.remove('pizza-visible');
				ui.pizza_right.classList.remove('pizza-visible');
			}

			if(pos > 0) ui.header.classList.add('header-fixed');
			else ui.header.classList.remove('header-fixed');
		}

		window.requestAnimationFrame(ui.scrollFunctionality);
	}

	// Month Change
	monthChange(e, navigate) {
		
		// Separate functionality
		this.populateDates(navigate);

		// Select the current day when we change month, or when we load :)
		if(this.calendar_month.textContent.includes(this.dateNames.months[this.currentDate.month]) && this.calendar_month.textContent.includes(this.currentDate.year)) document.querySelectorAll('tbody td').forEach(day => { if(day.textContent == navigate.monthDay) day.classList.add('selected') });

	}

	// Populate days ( DRY )
	populateDates(date) {

		// Calculate total days
		let totalDays = this.totalDays(date);

		// Get the first day of the month
		const startingDay = new Date(date.year, date.month, 1).getDay();

		let weekDays = '';
		let monthDays = '';

		// Loop for week days
		this.dateNames.weekdaysShort.forEach(day => weekDays += `<th>${day}</th>`);
		
		let day = 1;

		// this loop is for is weeks (rows)
    for (var i = 0; i <= 7; i++) {
			// this loop is for weekdays (cells)
			for (var j = 1; j <= 7; j++) {
				monthDays += '<td>';

					if (day <= totalDays && (i > 0 || j >= startingDay + 1)) {
						monthDays += day;
						day++;
					}
					monthDays += '</td>';
			}
			// stop making rows if we've run out of days
			if (day > totalDays) break
			else monthDays += '</tr><tr>'
		}
		
		// Add html
		this.weekDays.innerHTML = weekDays;
		this.monthDays.innerHTML = monthDays;

		// Set the month
		this.calendar_month.textContent = `${this.dateNames.months[date.month]} ${date.year}`;
	}

	showHideModal(e) {
		// Show modal && calendar ( because in html files the time and calendar is in the same modal element )
		if(e.currentTarget === this.date_input) {
			this.modals.classList.add('visible-flex');
			this.date_modal.classList.add('visible-flex');

			// Highlight current day
			document.querySelectorAll('tbody td').forEach(day => { if(day.textContent == this.currentDate.day) day.classList.add('selected') });
		}

		// Hide modal && calendar ( because in html files the time and calendar is in the same modal element ) DRY
		if(e.target.parentElement.classList.contains('close-modal') || e.target.classList.contains('close-modal') || e.target === this.confirm_date_btn || e.target.parentElement === this.confirm_date_btn || e.target === this.today_date_btn) {

			this.modals.classList.remove('visible-flex');
			this.date_modal.classList.remove('visible-flex');

			// Reset the calendar days acording to the current month
			this.populateDates(this.currentDate);

		}
	}

	setDate(e, navigate) {

		// Set today date
		if(e.target === this.today_date_btn) {
			// Set the input date
			this.date_input.value = `${this.dateNames.months[this.currentDate.month]} ${this.currentDate.day}, ${this.currentDate.year}`;
			
			this.resetCalendar();
		}

		// Show confirm popup box and show selected date in the table
		if(e.target.tagName === 'TD' && e.target.textContent.length > 0) {

			// Highlight selected date
			document.querySelectorAll('tbody td').forEach(day => day.classList.remove('selected'));
			e.target.classList.add('selected');

			// Show the buttons && confirm info pop up
			this.date_confirm_popup.classList.add('visible-block');
			document.querySelectorAll('[data-date-confirm]').forEach(btn => btn.classList.add('visible-block'));

			// Change the date popup info so we tell the user what date he is choosing
			this.date_confirm_info.textContent = `${this.dateNames.months[navigate.month]} ${e.target.textContent}, ${navigate.year}`;
		}

		// Confirm Date
		if(e.target === this.confirm_date_btn || e.target.parentElement === this.confirm_date_btn) {
			// Change the input value and hide the modal
			this.date_input.value = this.date_confirm_info.textContent;
			
			this.resetCalendar();
		}

		if(e.target.parentElement === this.reset_date_btn || e.target === this.reset_date_btn) {

			this.resetCalendar();
			
			// Reset the calendar days acording to the current month
			this.populateDates(this.currentDate);
			
		}

	}

	// DRY
	resetCalendar() {
		// Hide the buttons / confirm info pop up
		this.date_confirm_popup.classList.remove('visible-block');
		document.querySelectorAll('[data-date-confirm]').forEach(btn => btn.classList.remove('visible-block'));

		// Remove all hightlighted dates
		document.querySelectorAll('tbody td').forEach(day => day.classList.remove('selected'));

		// Reset the calendar month
		this.calendar_month.textContent = `${this.dateNames.months[this.currentDate.month]} ${this.currentDate.year}`;

		// Highlight current day
		document.querySelectorAll('tbody td').forEach(day => { if(day.textContent == this.currentDate.day) day.classList.add('selected') });
	}

	// DRY
	totalDays(date = null) {

		let totalDays;

		// Total days for each month
		switch(this.dateNames.monthsShort[date.month]) {
			case 'Jan':
			case 'Mar':
			case 'May':
			case 'Jul':
			case 'Aug':	
			case 'Oct':
			case 'Dec':
				totalDays = 31;
				break;

			case 'Apr':
			case 'Nov':
			case 'Jun':
			case 'Sep':
				totalDays = 30;
				break;

			// Total days for leap years
			case 'Feb':
				if ((date.year % 4 == 0) && (date.year % 100 != 0) || (date.year % 400 == 0)) totalDays = 29;
				else totalDays = 28;
				break;
		}

		return totalDays;
	}

}

export const ui = new Ui();