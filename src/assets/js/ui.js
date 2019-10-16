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
		this.table_body = document.querySelector('tbody');
		this.modals = document.getElementById('modals');
		this.date_modal = document.querySelector('.date-modal');
		this.time_modal = document.querySelector('.time-modal');
		this.date_confirm_popup = document.querySelector('.date-info-confirmation');
		this.date_confirm_info = document.querySelector('.date-info-confirmation span');
		this.number_error = document.querySelector('.number-error');
		this.email_error = document.querySelector('.email-error');
		this.form = document.querySelector('form');
		this.upload_placeholder = document.querySelector('.upload-value');
		// Buttons
		this.prev_month_btn = document.getElementById('prev-month');
		this.next_month_btn = document.getElementById('next-month');
		this.today_date_btn = document.getElementById('today-date');
		this.confirm_date_btn = document.getElementById('confirm-date');
		this.reset_date_btn = document.getElementById('reset-date');
		// Inputs
		this.phone_input = document.querySelector('.phone-number');
		this.date_input = document.getElementById('full-date');
		this.time_input = document.getElementById('full-time');
		this.email_input = document.querySelector('input[type="email"]');
		this.upload_input = document.getElementById('upload');
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
	monthChange(navigate) {
		
		// Separate functionality
		this.populateDates(navigate);

		// Select the current day when we change month, or when we load :)
		if(this.calendar_month.textContent.includes(this.dateNames.months[this.currentDate.month]) && this.calendar_month.textContent.includes(this.currentDate.year)) {

			document.querySelectorAll('table tbody td').forEach(day => { if(day.textContent == this.currentDate.day) day.classList.replace('filled-date', 'selected') })
			
		}

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
    for (var rows = 0; rows <= 7; rows++) {
			// this loop is for weekdays (cells)
			for (var cells = 1; cells <= 7; cells++) {
				monthDays += '<td>';

				if (day <= totalDays && (rows > 0 || cells >= startingDay + 1)) {
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
		this.table_body.innerHTML = monthDays;

		// Set the month
		this.calendar_month.textContent = `${this.dateNames.months[date.month]} ${date.year}`;

		// So we apply hover styling only on the cells that have dates
		document.querySelectorAll('table tbody td').forEach(day => {

			if(day.textContent === '') day.className = 'empty-date'
			else day.className = 'filled-date'

		});
	}

	showHideModal(e, navigate) {
		// Show modal && calendar ( because in html files the time and calendar is in the same modal element )
		if(e.currentTarget === this.date_input) {
			this.modals.classList.add('visible-flex');
			this.date_modal.classList.add('visible-flex');

			// Highlight current day
			document.querySelectorAll('table tbody td').forEach(day => { if(day.textContent == this.currentDate.day) day.classList.add('selected') });
		}

		// Hide modal && calendar ( because in html files the time and calendar is in the same modal element ) DRY
		if(e.target.parentElement.classList.contains('close-modal') || e.target.classList.contains('close-modal') || e.target === this.confirm_date_btn || e.target.parentElement === this.confirm_date_btn || e.target === this.today_date_btn || e.target === this.modals) {
			
			// Reset the navigate object so we start increment / decrement from the current month / year
			navigate.month = this.currentDate.month;
			navigate.year = this.currentDate.year;

			this.modals.classList.remove('visible-flex');
			this.date_modal.classList.remove('visible-flex');
			this.time_modal.classList.remove('visible-block');

			// Reset the calendar days acording to the current month
			this.populateDates(this.currentDate);

			this.resetCalendar();
		}
		
		// Show modal && time picker ( because in html files the time and calendar is in the same modal element )
		if(e.currentTarget === this.time_input) {
			this.modals.classList.add('visible-flex');
			this.time_modal.classList.add('visible-block');
		}

		if(e.target.parentElement === this.time_modal) {
			// Change the time input value
			this.time_input.value = e.target.textContent;

			// Hide modals
			this.modals.classList.remove('visible-flex');
			this.date_modal.classList.remove('visible-flex');
			this.time_modal.classList.remove('visible-block');
		}

	}

	setDate(e, navigate) {

		// Set today date
		if(e.target === this.today_date_btn) {
			// Set the input date
			this.date_input.value = `${this.dateNames.months[this.currentDate.month]} ${this.currentDate.day}, ${this.currentDate.year}`;
		}

		// Show confirm popup box and show selected date in the table
		if(e.target.tagName === 'TD' && e.target.textContent.length > 0) {

			// Highlight selected date
			document.querySelectorAll('table tbody td').forEach(day => day.classList.remove('selected'));
			e.target.classList.add('selected');

			// Show the buttons && confirm info pop up
			this.date_confirm_popup.classList.add('visible-block');
			document.querySelectorAll('[data-date-confirm]').forEach(btn => btn.classList.add('visible-block'));

			// Change the date popup info so we tell the user what date he is choosing
			this.date_confirm_info.textContent = `${this.dateNames.months[navigate.month]} ${e.target.textContent}, ${navigate.year}`;
		}

		// Confirm Date
		if(e.target === this.confirm_date_btn || e.target.parentElement === this.confirm_date_btn) {
			// Change the input value
			this.date_input.value = this.date_confirm_info.textContent;
		}

		// Reset date
		if(e.target.parentElement === this.reset_date_btn || e.target === this.reset_date_btn) {

			this.resetCalendar();
			
			// Reset the calendar days acording to the current month
			this.populateDates(this.currentDate);

			// Highlight current day
			document.querySelectorAll('table tbody td').forEach(day => { if(day.textContent == this.currentDate.day) day.classList.add('selected') });

			this.date_input.value = 'Pick Date';
		}

	}

	// DRY
	resetCalendar() {
		// Hide the buttons / confirm info pop up
		this.date_confirm_popup.classList.remove('visible-block');
		document.querySelectorAll('[data-date-confirm]').forEach(btn => btn.classList.remove('visible-block'));

		// Remove all hightlighted dates
		document.querySelectorAll('table tbody td').forEach(day => day.classList.remove('selected'));

		// Reset the calendar month
		this.calendar_month.textContent = `${this.dateNames.months[this.currentDate.month]} ${this.currentDate.year}`;
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

	regexValidation(e) {
		// Regex
		const numberRegex = /^(\+?)(\d{2,}|\(\d{2,}\))\.?\s?\-?(\d{2,})\.?\s?\-?(\d{2,})\.?\s?\-?(\d{2,})$/;
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

		// Number input valdiation
		if(e.target === this.phone_input) {
			// Error
			if(!numberRegex.test(this.phone_input.value)) this.alert('Invalid Number, please type again.', 'error', 'number');
			// Correct number
			else this.alert(null, 'success', 'number');

			// Empty input
			if(this.phone_input.value === '') this.alert('Phone Number is required, please type one.', 'error', 'number');
			
		}

		// Email input validation
		if(e.target === this.email_input) {
			// Error
			if(!emailRegex.test(this.email_input.value)) this.alert('Invalid Email, please type again.', 'error', 'email');
			// Correct email
			else this.alert(null, 'success', 'email');
			// Empty input
			if(this.email_input.value === '') this.alert('Email is required, please type one.', 'error', 'email');
		}

		if(e.target === ui.form) {

			// Empty input
			if(this.email_input.value === '' || this.phone_input.value === '') {

				this.alert('Email and Number phone are required, please fill the input fields.', 'error', 'both');

				// Disable the event
				return false;
			}

			if(emailRegex.test(this.email_input.value) || numberRegex.test(this.phone_input.value)) {

				this.alert(null, 'success', 'email');

				// Reset all inputs
				const inputs = document.querySelectorAll('input');
				const radioLabels = document.querySelectorAll('.radio-label');

				inputs.forEach(input => {

					if(input.getAttribute('type') === 'text' || input.getAttribute('type') === 'email' || input.getAttribute('type') === 'file') input.value = '';
					if(input.getAttribute('type') === 'radio') input.value = 'off';

				});

				// Reset label colors
				radioLabels.forEach(label => label.classList.add('reset-label'));
				// Reset upload placeholder
				this.upload_placeholder.textContent = '';

				// Enable the event ( submit the form )
				return true;
			}
		}
	}

	// DRY
	alert(message, alertType, inputType) {

		// message = obviously
		// alertType = error / success
		// inputType = on which input we need the error, because if we don't do this, it adds for both email and number (personal preference, can be changed of course) :)

		// Error
		if(alertType === 'error') {
			// Create element
			const p = document.createElement('p');

			// Add custom text
			p.appendChild(document.createTextNode(message));
	
			// Add the error to specific inputs
			/* 
				We check for inputs && page because on the reservation page we insert it on the bottom of the form 
				not like the separate inputs from careers pages (see in html after error appear)
			*/
			// For careers page
			if(location.pathname.includes('careers')) {

				if(inputType === 'number') {
					// Phone number error
					this.phone_input.style.borderColor = '#e44c65'; // $primary-red

					this.phone_input.previousElementSibling.style.color = '#e44c65'; // $primary-red

					p.classList.add('regex-alert', 'number-alert');

					this.number_error.insertAdjacentElement('beforeend', p);

					// Remove error when going to other inputs
					if(document.body.contains(document.querySelector('.email-alert'))) document.querySelector('.email-alert').remove()

					// Remove error if we have more than 1
					if(document.querySelectorAll('.number-alert').length > 1) document.querySelector('.number-alert').remove();
				}

				if(inputType === 'email') {
					// Email error
					this.email_input.style.borderColor = '#e44c65'; // $primary-red

					this.email_input.previousElementSibling.style.color = '#e44c65'; // $primary-red

					p.classList.add('regex-alert', 'email-alert');

					this.email_error.insertAdjacentElement('beforeend', p);

					// Remove error when going to other inputs
					if(document.body.contains(document.querySelector('.number-alert'))) document.querySelector('.number-alert').remove();

					// Remove error if we have more than 1
					if(document.querySelectorAll('.email-alert').length > 1) document.querySelector('.email-alert').remove();
				}

				// Add error for both inputs when submit the form
				if(inputType === 'both') {

					const p_num = document.createElement('p');
					const p_email = document.createElement('p');

					p_num.appendChild(document.createTextNode(message));
					p_email.appendChild(document.createTextNode(message));

					// Phone number error
					this.phone_input.style.borderColor = '#e44c65'; // $primary-red
					this.phone_input.previousElementSibling.style.color = '#e44c65'; // $primary-red

					p_num.classList.add('regex-alert', 'number-alert');
					this.number_error.insertAdjacentElement('beforeend', p_num);

					// Email error
					this.email_input.style.borderColor = '#e44c65'; // $primary-red
					this.email_input.previousElementSibling.style.color = '#e44c65'; // $primary-red

					p_email.classList.add('regex-alert', 'email-alert');
					this.email_error.insertAdjacentElement('beforeend', p_email);

				}
			}
		}
		// Success validation
		else if(alertType === 'success') {

			if(inputType === 'number') {
				
				this.phone_input.style.borderColor = '#82C4B0'; // $primary-green
				this.phone_input.previousElementSibling.style.color = '#82C4B0'; // $primary-green

				setTimeout(() => {
					this.phone_input.style = '';
					this.phone_input.previousElementSibling.style = '';
				}, 1250);
	
				// Remove error
				if(document.body.contains(document.querySelector('.number-alert'))) document.querySelector('.number-alert').remove();
			}
			else if(inputType === 'email') {

				this.email_input.style.borderColor = '#82C4B0'; // $primary-green
				this.email_input.previousElementSibling.style.color = '#82C4B0'; // primary-green

				setTimeout(() => {
					this.email_input.style.borderColor = '';
					this.email_input.previousElementSibling.style = '';
				}, 1250);
	
				// Remove error
				if(document.body.contains(document.querySelector('.email-alert'))) document.querySelector('.email-alert').remove();
			}
		}
	}

	uploadFile() {
		// Get the character after the backslash
		const uploadValue = ui.upload_input.value.lastIndexOf("\\") + 1;
		// "Placholder of the upload input"
		const uploadInfo = document.querySelector('.upload-value');
		// Apply the file name
		uploadInfo.textContent = ui.upload_input.value.slice(uploadValue);
	}
}

export const ui = new Ui();

