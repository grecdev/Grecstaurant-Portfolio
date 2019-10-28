"use strict";

const img = (image) => require(`../imgs/${image}`);

import { ls } from './localStorage.js';

// VIEW
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
		this.foodMenu_container = document.querySelector('.food-menu-container');
		this.online_products = document.querySelector('.online-order-products');
		this.onlineOrder_container = document.querySelector('.online-order-container');
		this.cartEmpty_description = document.querySelector('.cart-empty-description');
		this.subtotal = document.querySelector('.order-total-payment');
		///////////// Divs where we insert the error for specific input
		this.number_error = document.querySelector('.number-error');
		this.email_error = document.querySelector('.email-error');
		this.lastName_error = document.querySelector('.lastName-error');
		this.firstName_error = document.querySelector('.firstName-error');
		this.fullName_error = document.querySelector('.fullName-error');
		this.address_error = document.querySelector('.address-error');
		this.city_error = document.querySelector('.city-error');
		this.postalCode_error = document.querySelector('.postalCode-error');
		/////////////////////
		this.form = document.querySelector('form');
		this.upload_placeholder = document.querySelector('.upload-value');
		this.career_container = document.querySelector('#career-form .container');
		// Buttons
		this.prev_month_btn = document.getElementById('prev-month');
		this.next_month_btn = document.getElementById('next-month');
		this.today_date_btn = document.getElementById('today-date');
		this.confirm_date_btn = document.getElementById('confirm-date');
		this.reset_date_btn = document.getElementById('reset-date');
		this.menu_categories = document.querySelector('.menu-categories');
		this.removeItem_btn = document.querySelector('.remove-item');
		// Inputs
		this.phone_input = document.querySelector('.phone-number');
		this.date_input = document.getElementById('full-date');
		this.time_input = document.getElementById('full-time');
		this.email_input = document.querySelector('.email-input');
		this.upload_input = document.getElementById('upload');
		this.lastName_input = document.querySelector('.lastName-input');
		this.firstName_input = document.querySelector('.firstName-input');
		this.fullName_input = document.getElementById('fullName');
		this.people_input = document.getElementById('people');
		this.address_input = document.querySelector('.address-input');
		this.city_input = document.querySelector('.city-input');
		this.postalCode_input = document.getElementById('postal-code');
		this.countryRegion_input = document.getElementById('countryRegion');
		this.country_input = document.getElementById('country');
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
			document.querySelectorAll('table tbody td').forEach(day => { if(day.textContent == this.currentDate.day) day.classList.add('selected') })
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

		// Hover styling only on the cells that have dates
		document.querySelectorAll('table tbody td').forEach(day => {

			// date = navigate ( see the argument in monthChange method )
			// If we go past the current date
			if(date.month <= this.currentDate.month && date.year <= this.currentDate.year || date.month > this.currentDate.month && date.year < this.currentDate.year) {
				day.style.color = '#666';
				day.className = 'disabled-date';
			}

			// Enable the reset date button (so the user don't have to close the modal and click on the date input over and over again) for lazy users (like myself)
			if(date.month < this.currentDate.month && date.year <= this.currentDate.year || date.year < this.currentDate.year) {
				document.querySelectorAll('[data-date-confirm]').forEach(confirmBtn => confirmBtn.classList.remove('visible-block'));
				document.querySelectorAll('[data-date-confirm]')[1].classList.add('visible-block');

				this.date_confirm_popup.classList.remove('visible-block');
			}
			else if(date.month === this.currentDate.month && date.year === this.currentDate.year) {
				document.querySelectorAll('[data-date-confirm]').forEach(confirmBtn => confirmBtn.classList.remove('visible-block'));
				this.date_confirm_popup.classList.remove('visible-block');
			}

			// If we want to set a date in the future
			if(date.month >= this.currentDate.month && date.year >= this.currentDate.year && day.textContent >= this.currentDate.day || date.month < this.currentDate.month && date.year > this.currentDate.year || date.month > this.currentDate.month && date.year >= this.currentDate.year || date.month === this.currentDate.month && date.year > this.currentDate.year) {
				day.style.color = '#fff';
				day.className = 'available-date';
			}
			
			if(day.textContent === '') day.className = 'disabled-date';

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
		// Set the input date
		if(e.target === this.today_date_btn) this.date_input.value = `${this.dateNames.months[this.currentDate.month]} ${this.currentDate.day}, ${this.currentDate.year}`;

		// Show confirm popup box and show selected date in the table
		if(e.target.className === 'available-date') {

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
		if(e.target === this.confirm_date_btn || e.target.parentElement === this.confirm_date_btn) this.date_input.value = this.date_confirm_info.textContent

		// Reset date
		if(e.target.parentElement === this.reset_date_btn || e.target === this.reset_date_btn) {
			// Reset the navigate object so we start increment / decrement from the current month / year
			navigate.month = this.currentDate.month;
			navigate.year = this.currentDate.year;

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
	totalDays(date) {

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
		const numberRegex = /^(\+?)(\d{2,}|\(\d{2,}\))\.?\s?\-?(\d{2,})\.?\s?\-?(\d{2,})\.?\s?\-?(\d{2,})$/g;
		const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
		const letterRegex = /^[aA-zZ\s-]{3,}$/;
		const postalCodeRegex = /^\d{5}$|^\d{5}-\d{4}$/;
		const addressRegex = /^[\w\W]{5,}$/;

		// Variable 'state'
		// If radio inputs are checked. See below.
		let checked = false;
		// Disable or enable the form submission
		let submit;

		const inputs = document.querySelectorAll('input');
		const radioInputs = document.querySelectorAll('input[type="radio"]');
		// I choose to pick the parent div because not all the elements are inputs ( we have a select or textarea attribute)
		// So i get the parent div and the first child (depends on the markup)
		const fieldBox = document.querySelectorAll('.field-box');

		// Global inputs
		if(e.target === this.phone_input) {
			// Error
			if(!numberRegex.test(this.phone_input.value)) this.alert('Invalid Number, please type again.', 'error', 'number', false, e.target);
			// Correct
			else this.alert(null, 'success', null, false, e.target);

			// Empty input
			if(this.phone_input.value === '') this.alert('Phone Number is required, please type one.', 'error', 'number', false, e.target);
		}

		if(e.target === this.email_input) {
			// Error
			if(!emailRegex.test(this.email_input.value)) this.alert('Invalid Email, please type again.', 'error', 'email', false, e.target);
			// Correct
			else this.alert(null, 'success', null, false, e.target);

			// Empty input
			if(this.email_input.value === '') this.alert('Email is required, please type one.', 'error', 'email', false, e.target);
		}

		if(e.target === this.lastName_input) {
			// Error
			if(!letterRegex.test(this.lastName_input.value)) this.alert('Invalid Last Name, please type again.', 'error', 'lastName', false, e.target);
			// Correct
			else this.alert(null, 'success', null, false, e.target);
			// Empty input
			if(this.lastName_input.value === '') this.alert('Last Name is required, please type one.', 'error', 'lastName', false, e.target);
		}

		if(e.target === this.firstName_input) {
			// Error
			if(!letterRegex.test(this.firstName_input.value)) this.alert('Invalid First Name, please type again.', 'error', 'firstName', false, e.target);
			// Correct
			else this.alert(null, 'success', null, false, e.target);
			// Empty input
			if(this.firstName_input.value === '') this.alert('First Name is required, please type one.', 'error', 'firstName', false, e.target);
		}

		// Menu page
		if(location.pathname.includes('menu')) {

			if(e.target === this.address_input) {
				// Error
				if(!addressRegex.test(this.address_input.value)) this.alert('Invalid Address, please type again.', 'error', 'address', false, e.target);
				// Correct
				else this.alert(null, 'success', null, false, e.target);
				// Empty input
				if(this.address_input.value === '') this.alert('Address is required, please type one.', 'error', 'address', false, e.target);
			}

			if(e.target === this.city_input) {
				// Error
				if(!letterRegex.test(this.city_input.value)) this.alert('Invalid City, please type again.', 'error', 'city', false, e.target);
				// Correct
				else this.alert(null, 'success', null, false, e.target);
				// Empty input
				if(this.city_input.value === '') this.alert('City is required, please type one.', 'error', 'city', false, e.target);
			}
			
			if(e.target === this.postalCode_input) {
				// Error
				if(!postalCodeRegex.test(this.postalCode_input.value)) this.alert('Invalid Postal Code, please type again.', 'error', 'postalCode', false, e.target);
				// Correct
				else this.alert(null, 'success', null, false, e.target);
				// Empty input
				if(this.postalCode_input.value === '') this.alert('Postal Code is required, please type one.', 'error', 'postalCode', false, e.target);
			}

			if(e.target === this.form) {
				// Loop trough all field boxes and loop trough all childrens (because we have 2 inputs in 1 single fieldbox)
				// Submit error
				fieldBox.forEach(box => {

					Array.from(box.children).forEach(children => {
						
						if(children.value === '') {
	
							children.classList.add('input-error');
							this.alert('All fields are required.', 'error', null, true, null);
							
							setTimeout(() => children.classList.remove('input-error'), 2500);

							// Don't submit the form
							submit = false;
						}

					});
				});

				// letterRegex.test(this.address_input.value) && letterRegex.test(this.city_input.value) && letterRegex.test(this.firstName_input.value) && letterRegex.test(this.lastName_input.value) && emailRegex.test(this.email_input.value) && numberRegex.test(this.phone_input.value) && this.country_input.value.length > 0 && this.countryRegion_input.value.length > 0 && postalCodeRegex.test(this.postalCode_input.value)
				if(letterRegex.test(this.address_input.value) && letterRegex.test(this.city_input.value) && letterRegex.test(this.firstName_input.value) && letterRegex.test(this.lastName_input.value) && emailRegex.test(this.email_input.value) && numberRegex.test(this.phone_input.value) && this.country_input.value.length > 0 && this.countryRegion_input.value.length > 0 && postalCodeRegex.test(this.postalCode_input.value)) {

					fieldBox.forEach(box => Array.from(box.children).forEach(children => children.value = ''));

					submit = true;
				}

				console.log(submit);
				return submit
			}
		}

		// Reservation page
		if(location.pathname.includes('reservation')) {
			if(e.target === this.fullName_input) {
				// Error
				if(!letterRegex.test(this.fullName_input.value)) this.alert('Invalid Name, please type again.', 'error', 'fullName', false, e.target);
				// Correct
				else this.alert(null, 'success', null, false, e.target);
	
				// Empty input
				if(this.fullName_input.value === '') this.alert('Name is required, please type one.', 'error', 'fullName', false, e.target);
			}

			if(e.target === this.form) {
				
				// Submit error
				fieldBox.forEach(box => {
					
					if(box.children[0].value === '') {

						// Add error
						box.children[0].classList.add('input-error');
						this.alert('All fields are required.', 'error', null, true, null);

						// Remove the highlight input errors
						setTimeout(() => box.children[0].classList.remove('input-error'), 2500);

						// Don't submit the form
						submit = false;
					}

				});
				
				// Submit success
				if(numberRegex.test(this.phone_input.value) && emailRegex.test(this.email_input.value) && letterRegex.test(this.fullName_input.value) && this.people_input.value.length > 0 && this.time_input.value.length > 0 && this.date_input.value.length > 0) {

					fieldBox.forEach(box => box.children[0].value = '');

					// Textarea
					document.getElementById('message').value = '';

					this.alert('Reservation successful registered', 'success', null, true, null);
	
					// Submit the form
					submit = true;
				}

				return submit;
			}
		}

		// Careers page
		if(location.pathname.includes("careers")) {
	
			// Submiting the form
			if(e.target === this.form) {
				// If the inputs are checked we enable the checked varaible / 'state'
				radioInputs.forEach(radio => { if(radio.checked) checked = true });
	
				// Empty input
				inputs.forEach(input => {
					// Text inputs
					if(!input.classList.contains('correct-filled') && input.getAttribute('type') === 'text') {
						// Add the error
						input.classList.add('input-error');
						input.previousElementSibling.classList.add('label-error');
	
						setTimeout(() => {
							input.classList.remove('input-error');
							input.previousElementSibling.classList.remove('label-error');
						}, 2500);
	
						this.alert('All fields are required.', 'error', null, true, null);
	
						// Disable the event
						submit = false;
					}
	
					// For radio && file upload
					// If radio inputs are not checked (see checked variable / 'state') or CV is not uploaded
					if(input.getAttribute('type') === 'radio' && !checked || input.getAttribute('type') === 'file' && input.value === '') {
						// Add the error to the parent div.
						input.parentElement.classList.add('input-error');
	
						setTimeout(() => input.parentElement.classList.remove('input-error'), 2500);
	
						this.alert('All fields are required.', 'error', null, true, null);
	
						// Disable the event
						submit = false;
					}
				});
	
				// If all inputs are filled
				// Here you can see why i made a variable checked / 'state'
				if(letterRegex.test(this.lastName_input.value) && letterRegex.test(this.firstName_input.value) && emailRegex.test(this.email_input.value) && numberRegex.test(this.phone_input.value) && this.upload_input.value.length > 0 && checked) {
	
					this.alert('Contact details succesfull sent', 'success', null, true, null);
	
					// Reset all inputs
					inputs.forEach(input => {
	
						if(input.getAttribute('type') === 'text' || input.getAttribute('type') === 'file') input.value = '';
						if(input.getAttribute('type') === 'radio') input.checked = false;
	
					});
	
					// Reset upload placeholder
					this.upload_placeholder.textContent = '';
					
					// Enable the event ( submit the form )
					submit =  true;
				}
				
				return submit;
			}
		}
	}

	// DRY
	alert(message, alertType, inputType, multiple, target) {
		// message = obviously
		// alertType = error / success
		// inputType = where we insert the error
		// multiple = true (when submiting the form and check all inputs) / false (single input)
		// target = when we need to use the event object

		// We put the created element here because it's global and we use the inner closures
		// Create element
		const p = document.createElement('p');

		// Add custom text
		p.appendChild(document.createTextNode(message));

		// Error
		if(alertType === 'error') {
			// Remove error, so we have only one
			document.querySelectorAll('.regex-alert').forEach(error => error.remove());
	
			// Add the error styling
			p.classList.add('regex-alert', 'text-center');
			
			// Add error for individual input
			if(!multiple) {
				// Add the error to specific inputs
				target.classList.add('input-error');
				// If we have label for inputs
				// For reservation we use placeholder attribute instead of label so that's why we check it
				if(document.body.contains(document.querySelector('label'))) target.previousElementSibling.classList.add('label-error');
	
				// Add the error for individual inputs
				if(inputType === 'number') this.number_error.insertAdjacentElement('beforeend', p);
				if(inputType === 'email') this.email_error.insertAdjacentElement('beforeend', p);
				if(inputType === 'lastName') this.lastName_error.insertAdjacentElement('beforeend', p);
				if(inputType === 'firstName') this.firstName_error.insertAdjacentElement('beforeend', p);
				if(inputType === 'fullName') this.fullName_error.insertAdjacentElement('beforeend', p);
				if(inputType === 'address') this.address_error.insertAdjacentElement('beforeend', p);
				if(inputType === 'city') this.city_error.insertAdjacentElement('beforeend', p);
				if(inputType === 'postalCode') this.postalCode_error.insertAdjacentElement('beforeend', p);
			}

			// Add error for all inputs when submit the form
			if(multiple) {
				// Add to the DOM
				if(location.pathname.includes('careers')) this.career_container.insertAdjacentElement('beforeend', p);
				if(location.pathname.includes('reservation') || location.pathname.includes('menu')) this.form.insertAdjacentElement('beforeend', p);


				// Remove the alert
				setTimeout(() => p.remove(), 2500);
			}
		}
		// Success validation
		else if(alertType === 'success') {

			if(!multiple) {
				// Remove error styling
				target.classList.remove('input-error');
				// For reservation we use placeholder attribute instead of label so that's why we check it
				if(document.body.contains(document.querySelector('label'))) target.previousElementSibling.classList.remove('label-error');
				
				// Success validation
				target.classList.add('input-success', 'correct-filled');
				// For reservation we use placeholder attribute instead of label so that's why we check it
				if(document.body.contains(document.querySelector('label'))) target.previousElementSibling.classList.add('label-success');

				// Reset the styling
				setTimeout(() => {
					target.classList.remove('input-success');
					// For reservation we use placeholder attribute instead of label so that's why we check it
					if(document.body.contains(document.querySelector('label'))) target.previousElementSibling.classList.remove('label-success');
				}, 1250);
	
				// Remove error, so we have only one
				document.querySelectorAll('.regex-alert').forEach(error => error.remove());
			}
			
			if(multiple) {
				// Add styling
				p.classList.add('success-sent');

				// Add to the DOM
				if(location.pathname.includes('careers')) this.career_container.insertAdjacentElement('beforeend', p);
				if(location.pathname.includes('reservation')) this.form.insertAdjacentElement('beforeend', p);

				setTimeout(() => p.remove(), 2500);
			}
		}
	}

	uploadFile() {
		// Get the character after the backslash
		const uploadIndex = ui.upload_input.value.lastIndexOf("\\") + 1;
		// "Placholder of the upload input"
		const uploadInfo = document.querySelector('.upload-value');
		// Apply the file name
		uploadInfo.textContent = ui.upload_input.value.slice(uploadIndex);
	}

	// Populate UI (DRY)
	populateMenu(data, menuType) {
		// If we don't asign any value to the html var we get an undefined text
		let html = '';

		const foods = data[menuType];
		
		foods.forEach(food => {
			html += `
				<div class="food-menu-box">
					<div class="food-box-header">
						<h4 class="heading-title heading-xs food-name">${food.name}</h4>

						<a role="button" class="add-cart cart-icon"><img src="${img('add-to-cart.svg')}" alt="add-icon"></a>
					</div>

					<div class="food-box-description">
						<p class="description food-price mb-xs">${food.price}</p>

						<p>${food.incredients}</p>
					</div>
				</div>
			`;
		});

		// Apply the markup to the DOM
		ui.foodMenu_container.innerHTML = html;
	}

	// Add items to cart / show it when the page loads
	addToCart(e, Cart_item) {
		// Default values
		let ID;

		// Get food details
		// I use innerHTML for foodName so we get the icon aswell
		const foodName = e.target.parentElement.previousElementSibling.innerHTML;
		const foodPrice = e.target.parentElement.parentElement.nextElementSibling.children[0].textContent;

		// Get the items so we can access id
		const items = ls.getLocalStorage();

		// Create an id for each object so we can remove the specific food
		if(items.length > 0) ID = items[items.length - 1].id + 1;
		else ID = 0;

		// Instantiate new object
		const itemObj = new Cart_item(ID, foodName, foodPrice);

		// Push item to the LS
		ls.setLocalStorage(itemObj);

		// Populate the cart
		this.populateCart();
	}

	// DRY
	populateCart() {
		// Default values
		let total;
		let html = '';

		// Get items array
		const items = ls.getLocalStorage();

		// Show the cart products
		if(items.length > 0) {
			this.cartEmpty_description.classList.add('visible-none')
			this.onlineOrder_container.classList.add('visible-block');
		} else {
			this.cartEmpty_description.classList.remove('visible-none')
			this.onlineOrder_container.classList.remove('visible-block');
		}

		items.forEach(item => {
			// Add object data to html
			// data-quantity attribute is used for obvious product quantity which will be send to the server
			// and the value attribute is for mockup
			html += `
				<div class="order-box order-row mb-md">
					<div class="order-group-left order-name" data-item-id="${item.id}"><p>${item.name}</p></div>

					<div class="order-group-right">
						<div class="order-price"><p>${item.price}</p></div>

						<div class="order-quantity">
							<button type="button" class="decrement-quantity">-</button>
							<input type="text" class="quantity-number text-center" value="${item.quantity}">
							<button type="button" class="increment-quantity">+</button>

							<span class="text-center remove-item">Remove</span>
						</div>

						<div class="order-product-total">${item.totalPrice}</div>
					</div>

				</div>
			`;
		});

		// Calculate the total item price (NOT SUBTOTAL OF ALL ITEMS)
		total = items.reduce((total, item) => total + parseFloat(item.totalPrice), 0);

		// Format the price
		const subtotal = `${total.toFixed(2)} $`;

		// Display subtotal
		this.subtotal.textContent = subtotal;

		// Insert html to the DOM
		this.online_products.innerHTML = html;
	}

	// Remove item from UI and localStorage
	removeCartItem(e) {
		// Get the element id
		const itemId = parseFloat(e.target.parentElement.parentElement.previousElementSibling.dataset.itemId);

		ls.removeLocalStorage(itemId);

		this.populateCart();
	}

	changeQuantity(e) {
		// Get the input text acording to the " - " && " + " buttons
		const decrementQuantity = e.target.nextElementSibling;
		const incrementQuantity = e.target.previousElementSibling;

		const itemId = parseFloat(e.target.parentElement.parentElement.previousElementSibling.dataset.itemId);
		let initialPrice = e.target.parentElement.previousElementSibling.textContent;
		let totalPrice = e.target.parentElement.nextElementSibling.textContent;

		// This of course is for mockup purposes.
		let minStock = 1;
		let maxStock = 10;

		if(e.type === 'click') {
			if(e.target.classList.contains('decrement-quantity')) {
				// Increment until is out of stock
				if(decrementQuantity.value > minStock) {
					// Increment the value
					decrementQuantity.value--;

					// Calculate the item total
					const itemTotal = parseFloat(decrementQuantity.value) * parseFloat(initialPrice);

					// Format the price
					totalPrice = itemTotal.toFixed(2) + " $";
					
					// Update the item in local storage
					ls.updateLocalStorage(decrementQuantity.value, itemId, initialPrice, totalPrice);

					// I put this here because if i put for both buttons it reset the HTML code and doesn't apply the error
					ui.populateCart();
				}
			}
	
			if(e.target.classList.contains('increment-quantity')) {
				// Increment until is out of stock
				if(incrementQuantity.value < maxStock) {
					// Increment the value
					incrementQuantity.value++;

					// Calculate the item total
					const itemTotal = parseFloat(incrementQuantity.value) * parseFloat(initialPrice);

					// Format the price
					totalPrice = itemTotal.toFixed(2) + " $";
					
					// Update the item in local storage
					ls.updateLocalStorage(incrementQuantity.value, itemId, initialPrice, totalPrice);					

					// I put this here because if i put for both buttons it reset the HTML code and doesn't apply the error
					ui.populateCart();
				}
				// If more than 10 out of stock
				else {
					incrementQuantity.classList.add('input-error');
	
					// Remove error if is under 10 products
					setTimeout(() => incrementQuantity.classList.remove('input-error'), 2000);
				}

				// If the client puts a higher number reset the increment value to the max value
				if(incrementQuantity.value > maxStock) incrementQuantity.value = maxStock;
			}
		}

		// Calculate the price when insert number by keyboard aswell :)
		if(e.type === 'keyup') {
			const regex = /[aA-zZ]/;

			// If we type letters in the quantity input reset the value
			if(regex.test(e.target.value)) {
				e.target.value = minStock;

				e.target.classList.add('input-error');
	
				setTimeout(() => e.target.classList.remove('input-error'), 2000);
			}

			// If the client puts a higher number reset the increment value to the max value
			if(e.target.value > maxStock) {
				e.target.value = maxStock;

				e.target.classList.add('input-error');
	
				setTimeout(() => e.target.classList.remove('input-error'), 2000);
			} else if(e.target.value < minStock) {
				e.target.value = minStock;

				e.target.classList.add('input-error');
	
				setTimeout(() => e.target.classList.remove('input-error'), 2000);
			}

			// Calculate the item total
			const itemTotal = parseFloat(e.target.value) * parseFloat(initialPrice);

			// Format the price
			totalPrice = itemTotal.toFixed(2) + " $";

			// Update the item in local storage
			ls.updateLocalStorage(e.target.value, itemId, initialPrice, totalPrice);
			
			setTimeout(() => this.populateCart(), 250);
		}
	}
}

export const ui = new Ui();