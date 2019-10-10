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
		// Buttons
		this.prev_month_btn = document.getElementById('prev-month');
		this.next_month_btn = document.getElementById('next-month');
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
	monthChange(e, current) {
		// So we can dynamically implement with JS
		const dateNames = {
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
		}

		let totalDays;

		// Total days for each month
		switch(dateNames.monthsShort[current.month]) {
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

			// Total days for leap years ( february only )
			case 'Feb':
				if ((current.year % 4 == 0) && (current.year % 100 != 0) || (current.year % 400 == 0)) totalDays = 29;
				else totalDays = 28;
				break;
		}

		if(e.type === 'DOMContentLoaded') {

			this.populateDates(current, dateNames, totalDays);

			// Select the current day
			document.querySelectorAll('tbody td').forEach(day => { if(day.textContent == current.monthDay) day.classList.add('selected') });

			// Set the month
			this.calendar_month.textContent = `${dateNames.months[current.month]} ${current.year}`;
		}

		if(e.type === 'click') {

			// Make sure you remove all days before you get new ones
			// this.monthDays.innerHTML = '';

			if(e.currentTarget === this.next_month_btn) {

				this.populateDates(current, dateNames, totalDays);
				
			}

			if(e.currentTarget === this.prev_month_btn) {

				this.populateDates(current, dateNames, totalDays);
				
			}

			// Display the calendar header
			this.calendar_month.textContent = `${dateNames.months[current.month]} ${current.year}`;
		}

	}

	// Populate days ( DRY )
	populateDates(current, dateNames, totalDays) {

		const startingDay = new Date(current.year, current.month, 1).getDay();

		let weekDays = '';
		let monthDays = '';

		// Loop for week days
		dateNames.weekdaysShort.forEach(day => weekDays += `<th>${day}</th>`);
		
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

	}

}

export const ui = new Ui();