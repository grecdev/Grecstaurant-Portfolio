'use strict';

const img = (image) => require(`../imgs/${image}`).default;

import { ls } from './localStorage.js';
import jump from 'jump.js';

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
    this.date_confirm_info = document.querySelector(
      '.date-info-confirmation span',
    );
    this.foodMenu_container = document.querySelector('.food-menu-container');
    this.online_products = document.querySelector('.online-order-products');
    this.onlineOrder_container = document.querySelector(
      '.online-order-container',
    );
    this.cartEmpty_description = document.querySelector(
      '.cart-empty-description',
    );
    this.subtotal = document.querySelector('.order-total-payment');
    this.paymentCard_box = document.querySelector('.payment-card .payment-box');
    this.paymentPaypal_box = document.querySelector(
      '.payment-paypal .payment-box',
    );
    this.shipping_form = document.querySelector('form[name="shipping-form"]');
    this.payment_form = document.querySelector('form[name="payment-form"]');
    this.formSwitchContainer = document.querySelector('.form-switch-container');
    this.shippingContainer = document.querySelector('.shipping-container');
    this.paymentContainer = document.querySelector('.payment-container');
    this.email_preview = document.querySelector('.email-preview');
    this.address_preview = document.querySelector('.address-preview');
    this.product_preview_list = document.querySelector('.product-preview-list');
    this.product_preview_totalPrice = document.querySelector('.total-price');
    this.preloader = document.querySelector('.preloader');
    this.showcase_content = document.querySelector('.showcase-content');
    this.scroll_hand = document.querySelector('.scroll-hand');
    this.mobileHeader_modal = document.querySelector('.mobile-header-modal');
    this.sneak_section = document.getElementById('sneak');
    this.sneak_box = document.querySelector('.sneak-box');
    this.mobilePreview_box = document.querySelector('.mobile-preview-box');
    this.form = document.querySelector('form');
    this.upload_placeholder = document.querySelector('.upload-value');
    this.career_container = document.querySelector('#career-form .container');
    this.form_box = document.querySelector('.form-box');
    // Buttons
    this.prev_month_btn = document.getElementById('prev-month');
    this.next_month_btn = document.getElementById('next-month');
    this.today_date_btn = document.getElementById('today-date');
    this.confirm_date_btn = document.getElementById('confirm-date');
    this.reset_date_btn = document.getElementById('reset-date');
    this.menu_categories = document.querySelector('.menu-categories');
    this.removeItem_btn = document.querySelector('.remove-item');
    this.shippingReturn_btn = document.querySelector('.shipping-return');
    this.barContainer_btn = document.querySelector('.bar-container');
    this.orderSummary_btn = document.getElementById('mobile-preview-toggle');
    this.resetScroll_btn = document.getElementById('reset-scroll');
    this.form_btn = document.querySelector('.form-btn');
    // Inputs
    this.phone_input = document.querySelector('.phone-number');
    this.date_input = document.getElementById('full-date');
    this.time_input = document.getElementById('full-time');
    this.email_input = document.querySelector('.email-input');
    this.upload_input = document.getElementById('upload');
    this.lastName_input = document.querySelector('.lastName-input');
    this.firstName_input = document.querySelector('.firstName-input');
    this.fullName_input = document.querySelector('.fullName');
    this.people_input = document.getElementById('people');
    this.address_input = document.querySelector('.address-input');
    this.city_input = document.querySelector('.city-input');
    this.postalCode_input = document.getElementById('postal-code');
    this.countryRegion_input = document.getElementById('countryRegion');
    this.letterDisabled_input = document.querySelectorAll('.letter-disabled');
    this.cardCredit_radio_input = document.getElementById('credit-card');
    this.cardPaypal_radio_input = document.getElementById('paypal-card');
    this.cardNumber_input = document.getElementById('card-number');
    this.cardExpiration_input = document.getElementById('expiration-date');
    this.securityCode_input = document.getElementById('security-code');
    this.input_field = document.querySelectorAll('.text-field');
    this.change_value = document.querySelectorAll('.change-value');
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
        'December',
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
        'Dec',
      ],
      weekdays: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    };
    // Current date
    // Current month ( not being increment / decrement )
    // DRY
    this.currentDate = {
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      day: new Date().getDate(),
    };
    // Card Credentials Format
    this.cardRegex = {
      // 4485954100916356
      // 4485 9541 0091 6356
      visaRegex: /^(?:4)(\d){3}\s?(\d){4}\s?(\d){4}\s?(\d){4}\s?((?:\d){3})?$/,
      // 5485978684438047
      // 5485 9786 8443 8047
      mastercardRegex: /^(?:2|5)(\d){3}\s?(\d){4}\s?(\d){4}\s?(\d){4}\s?((?:\d){3})?$/,
      // 378395400251268
      // 3783 954002 51268
      amexpRegex: /^((?:37)|(?:34)){1}(\d){2}\s?(\d){6}\s?(\d){5}$/,
      // 12 / 19
      // 12 / 2019
      expDate: /^(\d){2}\s{0,1}\/{0,1}\s{0,1}(\d{2}|\d{4})$/,
      // 1234
      // 123
      securityCode: /^\d{3,4}/,
      // 40 / 41 / 45 / 49 => Visa
      visaStart: /^4(0|1|5|9)?/,
      // 51 - 55 / 22 / 27 => MasterCard
      mastercardStart: /^((?:5)|(?:2){1,2})/,
      // 37 / 34 => American Express
      amexpStart: /^3(7|4){0,1}/,
    };
    // To check for mobile devices
    this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  }

  // Scroll functionality
  scrollFunctionality() {
    const pos = Math.floor(pageYOffset);

    // For elements on the home page
    // Animations only for desktops
    if (
      document.body.getAttribute('id') === 'home-page' &&
      !ui.isMobile.test(navigator.userAgent)
    ) {
      if (pos >= 500) ui.chef_avatar.classList.add('chef-visible');
      else ui.chef_avatar.classList.remove('chef-visible');

      if (pos >= 800) {
        ui.pizza_left.classList.add('pizza-visible');
        ui.pizza_right.classList.add('pizza-visible');
      } else {
        ui.pizza_left.classList.remove('pizza-visible');
        ui.pizza_right.classList.remove('pizza-visible');
      }

      if (pos > 0) ui.header.classList.add('header-fixed');
      else ui.header.classList.remove('header-fixed');
    }

    window.requestAnimationFrame(ui.scrollFunctionality);
  }

  // Month Change
  monthChange(navigate) {
    // Separate functionality
    this.populateDates(navigate);

    // Select the current day when we change month, or when we load :)
    if (
      this.calendar_month.textContent.includes(
        this.dateNames.months[this.currentDate.month],
      ) &&
      this.calendar_month.textContent.includes(this.currentDate.year)
    ) {
      document.querySelectorAll('table tbody td').forEach((day) => {
        if (day.textContent == this.currentDate.day)
          day.classList.add('selected');
      });
    }
  }

  // Populate days (DRY)
  populateDates(date) {
    // Calculate total days
    let totalDays = this.totalDays(date);

    // Get the first day of the month
    const startingDay = new Date(date.year, date.month, 1).getDay();

    let weekDays = '';
    let monthDays = '';

    // Loop for week days
    this.dateNames.weekdaysShort.forEach(
      (day) => (weekDays += `<th>${day}</th>`),
    );

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
      if (day > totalDays) break;
      else monthDays += '</tr><tr>';
    }

    // Add html
    this.weekDays.innerHTML = weekDays;
    this.table_body.innerHTML = monthDays;

    // Set the month
    this.calendar_month.textContent = `${this.dateNames.months[date.month]} ${
      date.year
    }`;

    // Hover styling only on the cells that have dates
    document.querySelectorAll('table tbody td').forEach((day) => {
      // date = navigate ( see the argument in monthChange method )
      // If we go past the current date
      if (
        (date.month <= this.currentDate.month &&
          date.year <= this.currentDate.year) ||
        (date.month > this.currentDate.month &&
          date.year < this.currentDate.year)
      )
        day.className = 'disabled-date';

      // Enable the reset date button (so the user don't have to close the modal and click on the date input over and over again) for lazy users (like myself)
      if (
        (date.month < this.currentDate.month &&
          date.year <= this.currentDate.year) ||
        date.year < this.currentDate.year
      ) {
        document
          .querySelectorAll('[data-date-confirm]')
          .forEach((confirmBtn) =>
            confirmBtn.classList.remove('visible-block'),
          );
        document
          .querySelectorAll('[data-date-confirm]')[1]
          .classList.add('visible-block');

        this.date_confirm_popup.classList.remove('visible-block');
      } else if (
        date.month === this.currentDate.month &&
        date.year === this.currentDate.year
      ) {
        document
          .querySelectorAll('[data-date-confirm]')
          .forEach((confirmBtn) =>
            confirmBtn.classList.remove('visible-block'),
          );
        this.date_confirm_popup.classList.remove('visible-block');
      }

      // If we want to set a date in the future
      if (
        (date.month >= this.currentDate.month &&
          date.year >= this.currentDate.year &&
          day.textContent >= this.currentDate.day) ||
        (date.month < this.currentDate.month &&
          date.year > this.currentDate.year) ||
        (date.month > this.currentDate.month &&
          date.year >= this.currentDate.year) ||
        (date.month === this.currentDate.month &&
          date.year > this.currentDate.year)
      )
        day.className = 'available-date';

      if (day.textContent === '') day.className = 'disabled-date';
    });
  }

  showHideModal(e, navigate) {
    // Show modal && calendar ( because in html files the time and calendar is in the same modal element )
    if (e.target === this.date_input) {
      this.modals.classList.add('visible-flex');
      this.date_modal.classList.add('visible-flex');

      // Highlight current day
      document.querySelectorAll('table tbody td').forEach((day) => {
        if (day.textContent == this.currentDate.day)
          day.classList.add('selected');
      });
    }

    // Hide modal && calendar ( because in html files the time and calendar is in the same modal element ) DRY
    if (
      e.target.parentElement.classList.contains('close-modal') ||
      e.target.classList.contains('close-modal') ||
      e.target === this.confirm_date_btn ||
      e.target.parentElement === this.confirm_date_btn ||
      e.target === this.today_date_btn ||
      e.target === this.modals
    ) {
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
    if (e.target === this.time_input) {
      this.modals.classList.add('visible-flex');
      this.time_modal.classList.add('visible-block');
    }

    if (e.target.parentElement === this.time_modal) {
      // Change the time input value
      this.time_input.value = e.target.textContent;

      // Class for regex validation
      this.time_input.classList.remove('input-error');
      this.time_input.parentElement.classList.remove('input-error');
      this.time_input.parentElement.classList.add('input-filled');

      // Hide modals
      this.modals.classList.remove('visible-flex');
      this.date_modal.classList.remove('visible-flex');
      this.time_modal.classList.remove('visible-block');
    }
  }

  setDate(e, navigate) {
    // Set today date
    // Set the input date
    if (e.target === this.today_date_btn) {
      this.date_input.value = `${
        this.dateNames.months[this.currentDate.month]
      } ${this.currentDate.day}, ${this.currentDate.year}`;
      // Class for regex validation
      this.date_input.classList.remove('input-error');
      this.date_input.parentElement.classList.remove('input-error');
      this.date_input.parentElement.classList.add('input-filled');
    }

    // Show confirm popup box and show selected date in the table
    if (e.target.className === 'available-date') {
      // Highlight selected date
      document
        .querySelectorAll('table tbody td')
        .forEach((day) => day.classList.remove('selected'));
      e.target.classList.add('selected');

      // Show the buttons && confirm info pop up
      this.date_confirm_popup.classList.add('visible-block');
      document
        .querySelectorAll('[data-date-confirm]')
        .forEach((btn) => btn.classList.add('visible-block'));

      // Change the date popup info so we tell the user what date he is choosing
      this.date_confirm_info.textContent = `${
        this.dateNames.months[navigate.month]
      } ${e.target.textContent}, ${navigate.year}`;
    }

    // Confirm Date
    if (
      e.target === this.confirm_date_btn ||
      e.target.parentElement === this.confirm_date_btn
    ) {
      this.date_input.value = this.date_confirm_info.textContent;
      // Class for regex validation
      this.date_input.classList.remove('input-error');
      this.date_input.parentElement.classList.remove('input-error');
      this.date_input.parentElement.classList.add('input-filled');
    }

    // Reset date
    if (
      e.target.parentElement === this.reset_date_btn ||
      e.target === this.reset_date_btn
    ) {
      // Reset the navigate object so we start increment / decrement from the current month / year
      navigate.month = this.currentDate.month;
      navigate.year = this.currentDate.year;

      this.resetCalendar();

      // Reset the calendar days acording to the current month
      this.populateDates(this.currentDate);

      // Highlight current day
      document.querySelectorAll('table tbody td').forEach((day) => {
        if (day.textContent == this.currentDate.day)
          day.classList.add('selected');
      });

      this.date_input.value = 'Pick Date';
      // If input is empty
      this.date_input.parentElement.classList.remove('input-filled');
    }
  }

  // DRY
  resetCalendar() {
    // Hide the buttons / confirm info pop up
    this.date_confirm_popup.classList.remove('visible-block');
    document
      .querySelectorAll('[data-date-confirm]')
      .forEach((btn) => btn.classList.remove('visible-block'));

    // Remove all hightlighted dates
    document
      .querySelectorAll('table tbody td')
      .forEach((day) => day.classList.remove('selected'));

    // Reset the calendar month
    this.calendar_month.textContent = `${
      this.dateNames.months[this.currentDate.month]
    } ${this.currentDate.year}`;
  }

  // DRY
  totalDays(date) {
    let totalDays;

    // Total days for each month
    switch (this.dateNames.monthsShort[date.month]) {
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
        if (
          (date.year % 4 == 0 && date.year % 100 != 0) ||
          date.year % 400 == 0
        )
          totalDays = 29;
        else totalDays = 28;
        break;
    }

    return totalDays;
  }

  regexValidation(e) {
    // Regex
    const globalRegex = {
      /*
			Phone format
			0777123456
			0777 123 456
			0777-123-456
			+44 123 456 789
			+40 123 456 789
			+40123456789
			+40-123-456-789
			(1234) 567 890
			(555) 555-1234
			*/
      phoneRegex: /^\+?(\(\+\d{2,3}\)?)?[\s-\.]?(\(?\d+\)?)[\s-\.]?(\d+)[\s-\.]?(\d+)$/g,
      /*
			email@gmail.com / ro / co / co.uk / fr
			email@yahoo.com / ro / co / co.uk / fr
			email@hotmail.com / ro / co / co.uk / fr
			email@aol.com / ro / co / co.uk / fr
			*/
      emailRegex: /^[\w\W]+\@{1}(gmail|yahoo|hotmail|aol)\.(com|ro|co|co\.uk|fr)+$/g,
      letterRegex: /^[aA-zZ\s-]{3,}$/,
      // 1234567 - 12345 - 1234
      // 123-4567
      postalCodeRegex: /^[\d\-]{4,8}$/,
      addressRegex: /^[\w\W]{5,}$/,
    };

    if (e.type === 'blur' && e.target.tagName === 'INPUT') {
      // I use ui object instead of this. keyword because i use the regexValidation method as addEventListener function parameter
      // We can use e.target or this. keyword
      if (e.target === ui.fullName_input) {
        if (globalRegex.letterRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Full Name is invalid, please type again',
            'error',
            false,
            e.target,
          );

        if (
          !globalRegex.letterRegex.test(e.target.value) &&
          location.pathname.includes('checkout')
        )
          ui.alert(
            'Name on card is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.firstName_input) {
        if (globalRegex.letterRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'First Name is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.lastName_input) {
        if (globalRegex.letterRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Last name is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.email_input) {
        if (globalRegex.emailRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Email is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.phone_input) {
        if (globalRegex.phoneRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Phone Number is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.address_input) {
        if (globalRegex.letterRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Address is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.postalCode_input) {
        if (globalRegex.postalCodeRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Postal Code is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.city_input) {
        if (globalRegex.letterRegex.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'City is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.cardNumber_input) {
        if (
          ui.cardRegex.visaRegex.test(e.target.value) ||
          ui.cardRegex.mastercardRegex.test(e.target.value) ||
          ui.cardRegex.amexpRegex.test(e.target.value)
        )
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Card Number is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.cardExpiration_input) {
        if (ui.cardRegex.expDate.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Expiration date is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      if (e.target === ui.securityCode_input) {
        if (ui.cardRegex.securityCode.test(e.target.value))
          ui.alert(null, 'success', false, e.target);
        else
          ui.alert(
            'Security Code is invalid, please type again',
            'error',
            false,
            e.target,
          );
      }

      // Empty inputs
      if (e.target.value === '') {
        if (!e.target.hasAttribute('placeholder'))
          ui.alert(
            `${e.target.previousElementSibling.textContent} is empty, please fill the input`,
            'error',
            false,
            e.target,
          );
        else
          ui.alert(
            `${e.target.placeholder} is empty, please fill the input`,
            'error',
            false,
            e.target,
          );
      }
    }

    if (e.type === 'submit') {
      // Variable 'state': disable or enable the form submission
      let submit;

      const filledInputs = [];

      this.input_field.forEach((input) => {
        // For last form we don't need regex validation, that's why i added disable submit class
        if (
          !input.classList.contains('input-filled') &&
          !input.classList.contains('disable-submit')
        ) {
          // Display the alert
          this.alert('All inputs are required !', 'error', true, e.target);
          // Highlight the inputs
          input.classList.add('input-error');

          // If the input has a label element
          if (
            this.form.contains(document.querySelector('label')) &&
            input.tagName === 'INPUT'
          )
            input.previousElementSibling.classList.add('label-error');

          // For inputs that are have the regex validation class assigned to the parent element
          if (input.tagName === 'DIV')
            input.firstElementChild.classList.add('input-error');

          // Don't submit the form
          submit = false;

          // Get all the inputs that are correct
        } else filledInputs.push(input);
      });

      // If the number of correct inputs is the same as all inputs that means all the inputs are correct filled :)
      if (filledInputs.length === this.input_field.length) {
        if (!location.pathname.includes('checkout')) {
          this.alert(
            'Form has been successfully submited !',
            'success',
            true,
            e.target,
          );
        } else this.checkoutFormAnimation(e);

        // Submit the form
        submit = true;
      }

      console.log('Form has been submited ?', submit);
      return submit;
    }
  }

  // DRY
  alert(message, alertType, multiple, target) {
    // message = obviously
    // alertType = success / error
    // multiple = true (when submiting the form and check all inputs) / false (single input)
    // target = when we need to use the event object

    // Create element
    const p = document.createElement('p');

    // Add custom text
    p.appendChild(document.createTextNode(message));

    // Remove alert, so we have only one
    document
      .querySelectorAll('.regex-alert')
      .forEach((alert) => alert.remove());

    if (alertType === 'error') {
      p.classList.add('regex-alert', 'regex-error', 'text-center');

      if (!multiple) {
        // If input is not valid remove the input correct validation class (input-filled);
        target.classList.remove('input-filled', 'input-success');
        target.classList.add('input-error');

        // If the input has a label element
        if (this.form.contains(document.querySelector('label')))
          target.previousElementSibling.classList.add('label-error');

        // For individual input add the regex alert
        target.parentElement.insertAdjacentElement('beforeend', p);

        if (
          target === this.cardNumber_input ||
          target === this.securityCode_input
        )
          target.parentElement.parentElement.insertAdjacentElement(
            'beforeend',
            p,
          );

        if (target.value === '')
          target.classList.remove('input-filled', 'input-success');
      } else {
        // Add the regex alert to the DOM && other alert styling to elements
        target.insertAdjacentElement('beforeend', p);

        if (target === this.payment_form)
          document
            .querySelector('.payment-card')
            .insertAdjacentElement('beforeend', p);

        this.input_field.forEach((input) => {
          input.classList.remove('input-success');
          // If the input has a label element
          if (this.form.contains(document.querySelector('label')))
            input.previousElementSibling.classList.remove('label-success');
        });

        if (document.body.contains(this.form_btn))
          this.form_btn.classList.add('regex-error');

        // Reset the regex alert
        setTimeout(() => {
          if (document.body.contains(this.form_btn))
            this.form_btn.classList.remove('regex-error');
          p.remove();
        }, 2500);
      }
    }

    if (alertType === 'success') {
      // Single input
      if (!multiple) {
        // Remove alert styling
        target.classList.remove('input-error');
        // If the input has a label element
        if (this.form.contains(document.querySelector('label')))
          target.previousElementSibling.classList.remove('label-error');

        // input-filled - If the input has been filled corectly (we check for class in regex validation for multiple inputs)
        target.classList.add('input-success', 'input-filled');
        // If the input has a label element
        if (this.form.contains(document.querySelector('label')))
          target.previousElementSibling.classList.add('label-success');

        // Reset the success styling
        setTimeout(() => {
          target.classList.remove('input-success');
          // If the input has a label element
          if (this.form.contains(document.querySelector('label')))
            target.previousElementSibling.classList.remove('label-success');
        }, 1250);
      } else {
        // Add the alert styling
        p.classList.add('regex-alert', 'text-center', 'regex-success');

        // Add alert to DOM
        target.insertAdjacentElement('beforeend', p);

        target.reset();

        if (document.body.contains(this.form_btn))
          this.form_btn.classList.add('regex-success');

        // Reset inputs
        this.input_field.forEach((input) => {
          input.classList.remove(
            'input-error',
            'input-filled',
            'input-success',
          );

          // For careers page we have file and radio inputs
          if (location.pathname.includes('careers')) {
            this.upload_placeholder.textContent = '';

            // I use Array.from(), because .children returns a Html Collection and .forEach works on array objects or array like objects;
            if (input.classList.contains('employee-time'))
              Array.from(input.children).forEach((children) => {
                if (children.tagName === 'INPUT') children.checked = false;
              });
          }
        });

        setTimeout(() => {
          if (document.body.contains(this.form_btn))
            this.form_btn.classList.remove('regex-success');
          p.remove();
        }, 2500);
      }
    }
  }

  // Method for inputs that works change / input events
  changeValue(e) {
    if (e.type === 'change') {
      if (e.target.value.length > 0) {
        if (e.target.getAttribute('type') === 'file') {
          // Get the character after the backslash
          const uploadIndex = ui.upload_input.value.lastIndexOf('\\') + 1;
          // Apply the file name
          this.upload_placeholder.textContent = ui.upload_input.value.slice(
            uploadIndex,
          );
        }

        // If file has been selected for upload
        if (
          e.target.getAttribute('type') === 'file' ||
          e.target.getAttribute('type') === 'radio'
        ) {
          e.target.parentElement.classList.remove('input-error');
          // The 'input-filled' class we use it in the regex validation
          e.target.parentElement.classList.add('input-filled');
          setTimeout(
            () => e.target.parentElement.classList.remove('input-success'),
            1250,
          );
        } else {
          e.target.classList.remove('input-error');
          e.target.classList.add('input-filled', 'input-success');
          setTimeout(() => e.target.classList.remove('input-success'), 1250);
        }
      }

      if (e.target.value === '') {
        if (
          e.target.getAttribute('type' === 'file') ||
          e.target.getAttribute('type') === 'radio'
        )
          e.target.parentElement.classList.remove('input-filled');
        else e.target.classList.remove('input-filled');
      }
    }
  }

  // Populate UI (DRY)
  populateMenu(data, menuType) {
    // If we don't asign any value to the html var we get an undefined text
    let html = '';

    const foods = data[menuType];

    foods.forEach((food) => {
      html += `
				<div class="food-menu-box">
					<div class="food-box-header">
						<h4 class="heading-title heading-xs food-name">${food.name}</h4>

						<a role="button" class="add-cart cart-icon"><img src="${img(
              'add-to-cart.svg',
            )}" alt="add-icon"></a>
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
    const foodPrice =
      e.target.parentElement.parentElement.nextElementSibling.children[0]
        .textContent;

    // Get the items so we can access id
    const items = ls.getLocalStorage();

    // Create an id for each object so we can remove the specific food
    if (items.length > 0) ID = items[items.length - 1].id + 1;
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
    if (items.length > 0) {
      this.cartEmpty_description.classList.add('visible-none');
      this.onlineOrder_container.classList.add('visible-block');
    } else {
      this.cartEmpty_description.classList.remove('visible-none');
      this.onlineOrder_container.classList.remove('visible-block');
    }

    items.forEach((item) => {
      // Add object data to html
      html += `
				<div class="order-box order-row mb-md">
					<div class="order-group-left order-name" data-item-id="${item.id}"><p>${item.name}</p></div>

					<div class="order-group-right">
						<div class="order-price"><p>${item.price}</p></div>

						<div class="order-quantity">
							<div class="quantity-group">
								<button type="button" class="decrement-quantity">-</button>
								<input type="text" class="quantity-number letter-disabled text-center" value="${item.quantity}">
								<button type="button" class="increment-quantity">+</button>
							</div>

							<span class="text-center remove-item">Remove</span>
						</div>

						<div class="order-product-total">${item.totalPrice}</div>
					</div>

				</div>
			`;
    });

    // Calculate the total price for individual item (NOT SUBTOTAL OF ALL ITEMS)
    total = items.reduce(
      (total, item) => total + parseFloat(item.totalPrice),
      0,
    );

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
    const itemId = parseFloat(
      e.target.parentElement.parentElement.previousElementSibling.dataset
        .itemId,
    );

    ls.removeLocalStorage(itemId);

    this.populateCart();
  }

  changeQuantity(e) {
    // Get the input text acording to the " - " && " + " buttons
    const decrementQuantity = e.target.nextElementSibling;
    const incrementQuantity = e.target.previousElementSibling;

    const itemId = parseFloat(
      e.target.parentElement.parentElement.parentElement.previousElementSibling
        .dataset.itemId,
    );
    let initialPrice =
      e.target.parentElement.parentElement.previousElementSibling.textContent;
    let totalPrice =
      e.target.parentElement.parentElement.nextElementSibling.textContent;

    // Min / Max stock
    let minStock = 1;
    let maxStock = 10;

    if (e.type === 'click') {
      if (e.target.classList.contains('decrement-quantity')) {
        // Increment until is out of stock
        if (decrementQuantity.value > minStock) {
          // Increment the value
          decrementQuantity.value--;

          // Calculate the item total
          const itemTotal =
            parseFloat(decrementQuantity.value) * parseFloat(initialPrice);

          // Format the price
          totalPrice = itemTotal.toFixed(2) + ' $';

          // Update the item in local storage
          ls.updateLocalStorage(
            decrementQuantity.value,
            itemId,
            initialPrice,
            totalPrice,
          );

          // I put this here because if i put for both buttons it reset the HTML code and doesn't apply the error
          ui.populateCart();
        }
      }

      if (e.target.classList.contains('increment-quantity')) {
        // Increment until is out of stock
        if (incrementQuantity.value < maxStock) {
          // Increment the value
          incrementQuantity.value++;

          // Calculate the item total
          const itemTotal =
            parseFloat(incrementQuantity.value) * parseFloat(initialPrice);

          // Format the price
          totalPrice = itemTotal.toFixed(2) + ' $';

          // Update the item in local storage
          ls.updateLocalStorage(
            incrementQuantity.value,
            itemId,
            initialPrice,
            totalPrice,
          );

          // I put this here because if i put for both buttons it reset the HTML code and doesn't apply the error
          ui.populateCart();
        }
        // If more than 10 out of stock
        else {
          incrementQuantity.classList.add('input-error');

          // Remove error if is under 10 products
          setTimeout(
            () => incrementQuantity.classList.remove('input-error'),
            2000,
          );
        }

        // If the client puts a higher number reset the increment value to the max value
        if (incrementQuantity.value > maxStock)
          incrementQuantity.value = maxStock;
      }
    }

    // Calculate the price when insert number by keyboard aswell :)
    if (e.type === 'keyup') {
      // If the client puts a higher number reset the increment value to the max value
      if (e.target.value > maxStock) {
        e.target.value = maxStock;

        e.target.classList.add('input-error');

        setTimeout(() => e.target.classList.remove('input-error'), 2000);
      } else if (e.target.value < minStock) {
        e.target.value = minStock;

        e.target.classList.add('input-error');

        setTimeout(() => e.target.classList.remove('input-error'), 2000);
      }

      // Calculate the item total
      const itemTotal = parseFloat(e.target.value) * parseFloat(initialPrice);

      // Format the price
      totalPrice = itemTotal.toFixed(2) + ' $';

      // Update the item in local storage
      ls.updateLocalStorage(e.target.value, itemId, initialPrice, totalPrice);

      setTimeout(() => this.populateCart(), 250);
    }
  }

  disableLetters(e) {
    /*
			Numpad + normal keyboard numbers
			+ && - and parentheses
			Space && Ctrl + a && Backspace
			dot
			arrow keys
			Tab
		*/
    // Disable shift
    if (e.shiftKey) e.preventDefault();

    if (
      (e.which >= 48 && e.which <= 57) ||
      (e.which >= 96 && e.which <= 105) ||
      e.which === 189 ||
      e.which === 187 ||
      e.which === 8 ||
      e.which === 32 ||
      e.which === 17 ||
      e.which === 107 ||
      e.which === 109 ||
      e.ctrlKey ||
      e.which === 190 ||
      e.which === 110 ||
      (e.which >= 37 && e.which <= 40) ||
      e.which === 9 ||
      e.which === 123 ||
      e.which === 116 ||
      e.which === 191
    )
      return true;
    else e.preventDefault();
  }

  // Change payment method
  changePaymentMethod(e) {
    // Show Credit card payment
    if (e.target.closest('.payment-card')) {
      this.paymentPaypal_box.classList.remove('visible-flex');
      this.paymentCard_box.classList.remove('visible-none');

      this.cardPaypal_radio_input.nextElementSibling.classList.replace(
        'radio-custom-checked',
        'radio-custom-disabled',
      );
      this.cardCredit_radio_input.nextElementSibling.classList.replace(
        'radio-custom-disabled',
        'radio-custom-checked',
      );

      // Check the radio input
      this.cardCredit_radio_input.checked = true;
    }

    // Show Paypal card payment
    if (e.target.closest('.payment-paypal')) {
      this.paymentCard_box.classList.add('visible-none');
      this.paymentPaypal_box.classList.add('visible-flex');

      this.cardCredit_radio_input.nextElementSibling.classList.replace(
        'radio-custom-checked',
        'radio-custom-disabled',
      );
      this.cardPaypal_radio_input.nextElementSibling.classList.replace(
        'radio-custom-disabled',
        'radio-custom-checked',
      );

      // Check the radio input
      this.cardPaypal_radio_input.checked = true;

      // Remove regex alert when change to paypal method. ( it bugs out if we don't have this, remove so you can see it)
      document
        .querySelectorAll('.regex-alert')
        .forEach((error) => error.remove());
      // Reset the inputs
      document
        .querySelectorAll('.input-error')
        .forEach((error) => error.classList.remove('input-error'));
    }
  }

  // Format card when typing and paste in input
  cardFormat(e) {
    // For (e.type === 'paste') => I use timeout becuase we need to get the value when we paste. If we don't use setTimeout() we need to paste 2 times to get the value;
    setTimeout(() => {
      let regexRange;
      const formatArray = [];

      // Set range for individual card
      if (this.cardRegex.visaStart.test(e.target.value))
        regexRange = /\d{0,19}/g;
      if (this.cardRegex.mastercardStart.test(e.target.value))
        regexRange = /\d{0,16}/g;
      if (this.cardRegex.amexpStart.test(e.target.value))
        regexRange = /\d{0,15}/g;

      const defaultString = e.target.value.replace(/\s+/g, '');

      // Match the string without spaces
      // If we dont use this it will go over 23 / 19 / 16 / 15 characters, depends on the card type
      let matchString = defaultString.match(regexRange)[0];

      // Push pieces of card number into the array and then format into  a string
      // For Visa and MasterCard
      if (
        this.cardRegex.visaStart.test(e.target.value) ||
        this.cardRegex.mastercardStart.test(e.target.value)
      ) {
        // Start from index 0, at each fourth index substract the string with 4 numbers and push it to the array
        for (let a = 0; a < matchString.length; a += 4)
          formatArray.push(matchString.substring(a, a + 4));
      }

      // American Express
      // Format: 3214 123456 12345
      if (this.cardRegex.amexpStart.test(e.target.value)) {
        for (let a = 0; a < matchString.length; a++) {
          // First part of formating string: 3214
          // Start at index 0, when reach index 4 substract the string with 4 numbers and push it to the array
          if (a === 0) formatArray.push(matchString.substring(a, a + 4));

          // Second part of formating string: 123456
          // When reach index 4 substract the string with 6 numbers and push it to the array
          if (a === 4) formatArray.push(matchString.substring(a, a + 6));

          // Third part of formating str ing: 12345
          // When reach index 10 substract the string with 5 numbers and push it to the array
          if (a === 10)
            formatArray.push(matchString.substring(a, matchString.length));
        }
      }

      // Disable: Backspace / Numbers / Tab
      // Because when we want to delete / add a number or move backwards / forwards with arrows it goes to the end of the input
      if (
        (this.cardRegex.visaStart.test(e.target.value) ||
          this.cardRegex.mastercardStart.test(e.target.value) ||
          this.cardRegex.amexpStart.test(e.target.value)) &&
        e.which !== 8 &&
        e.which !== 37 &&
        e.which !== 39 &&
        e.which !== 9
      ) {
        e.target.value = formatArray.join(' ');
        e.target.removeAttribute('maxlength');
      }

      // Don't type to many numbers if is not a card number
      if (
        !this.cardRegex.visaStart.test(e.target.value) &&
        !this.cardRegex.mastercardStart.test(e.target.value) &&
        !this.cardRegex.amexpStart.test(e.target.value)
      ) {
        e.target.maxLength = 10;

        // I use Array.from method because .children return HTML collection, and forEach works only on arrays / array like objects.
        // Reset all the logos.
        Array.from(document.querySelector('.card-images').children).forEach(
          (logo) => {
            logo.classList.remove('card-logo-enabled');
            logo.classList.remove('card-logo-disabled');
          },
        );
      }

      // Highlight the visa card logo
      if (this.cardRegex.visaStart.test(e.target.value)) {
        // I use Array.from method because .children return HTML collection, and forEach works only on arrays / array like objects.
        // Disable all the logos.
        Array.from(document.querySelector('.card-images').children).forEach(
          (logo) => {
            logo.classList.remove('card-logo-enabled');
            logo.classList.add('card-logo-disabled');
          },
        );

        // Enable the specfic logo
        document.querySelector('.visa-logo').classList.add('card-logo-enabled');
      }

      // Highlight the mastercard logo
      if (this.cardRegex.mastercardStart.test(e.target.value)) {
        // I use Array.from method because .children return HTML collection, and forEach works only on arrays / array like objects.
        // Disable all the logos.
        Array.from(document.querySelector('.card-images').children).forEach(
          (logo) => {
            logo.classList.remove('card-logo-enabled');
            logo.classList.add('card-logo-disabled');
          },
        );

        // Enable the specfic logo
        document
          .querySelector('.master-logo')
          .classList.add('card-logo-enabled');
      }

      // Highlight the American Express card logo
      if (this.cardRegex.amexpStart.test(e.target.value)) {
        // I use Array.from method because .children return HTML collection, and forEach works only on arrays / array like objects.
        // Disable all the logos.
        Array.from(document.querySelector('.card-images').children).forEach(
          (logo) => {
            logo.classList.remove('card-logo-enabled');
            logo.classList.add('card-logo-disabled');
          },
        );

        // Enable the specfic logo
        document.querySelector('.amex-logo').classList.add('card-logo-enabled');
      }
    }, 5);
  }

  cardExpirationFormat(e) {
    // For (e.type === 'paste') => I use timeout becuase we need to get the value when we paste. If we don't use setTimeout() we need to paste 2 times to get the value;
    setTimeout(() => {
      const regex = /^[\d\/]{0,7}$/g;

      const defaultString = e.target.value.replace(/\s+/g, '');

      const formatArray = [];

      // Match the string without spaces
      // If we dont use this it will go over 9 characters
      let matchString = defaultString.match(regex)[0];

      for (let a = 0; a < matchString.length; a++) {
        // Start from index 0, get the first 2 numbers
        if (a === 0) formatArray.push(matchString.substring(a, a + 2));

        // After typing 2 numbers add a Slash character
        if (a === 1) formatArray.push('/');

        // After adding the slash get the last 4 numbers (if we type MM / YYYY, we can get MM / YY aswell)
        if (a === 3)
          formatArray.push(matchString.substring(a, matchString.length));
      }

      // Disable: Backspace / Numbers / Tab
      // Because when we want to delete / add a number or move backwards / forwards with arrows it goes to the end of the input
      if (e.which !== 8 && e.which !== 37 && e.which !== 39)
        e.target.value = formatArray.join(' ');
    }, 5);
  }

  // Switch between forms
  checkoutFormAnimation(e) {
    // Only if the form is submited (thats why i use submit parameter)
    if (e.type === 'submit') {
      if (e.target === this.shipping_form) {
        // Show payment form / Hide shipping form
        this.shippingContainer.classList.add('visible-none');
        this.paymentContainer.classList.remove('visible-none');

        // Display the info in the payment form
        this.email_preview.textContent = this.email_input.value;
        this.address_preview.textContent = this.address_input.value;
      }
    }

    if (e.currentTarget === this.shippingReturn_btn) {
      // Show shipping form / Hide payment form
      this.shippingContainer.classList.remove('visible-none');
      this.paymentContainer.classList.add('visible-none');
    }
  }

  // Populate order preview
  populateOrderPreview() {
    let html = '';

    // Get the data from local storage
    const items = ls.getLocalStorage();

    // Add the data to markup
    items.forEach((item) => {
      html += `
				<div class="product-box mb-md">
					<p class="product-name">${item.name}<span class="product-quantity">${item.quantity}</span></p>
					<p class="product-price">${item.totalPrice}</p>
				</div>
			`;
    });

    // Calculate total items
    const total = items.reduce(
      (total, item) => total + parseFloat(item.totalPrice),
      0,
    );

    // Here i get all the DOM elements because we have a different style for mobile / desktop
    // Add html to the DOM
    document
      .querySelectorAll('.product-preview-list')
      .forEach((preview) => (preview.innerHTML = html));
    // Add total price formated
    document
      .querySelectorAll('.total-price')
      .forEach((price) => (price.innerHTML = `USD ${total.toFixed(2)} $`));
  }

  populateRegion(data) {
    let htmlRegionCountry = '';

    // We add the select placeholder only once
    htmlRegionCountry +=
      '<option disabled selected value="">Region / Country</option>';

    // Add the countries to the html
    data.forEach(
      (country) =>
        (htmlRegionCountry += `<option value="${country.name}">${country.name}</option>`),
    );

    // Add html to the DOM
    this.countryRegion_input.innerHTML = htmlRegionCountry;
  }

  // Preloader UX
  hideLoader() {
    // Hide the loader
    ui.preloader.classList.add('loader-hidden');

    // Enable the animations on the index page
    // If we don't check for home page it gives error, disable so you can see it :)
    if (document.body.id === 'home-page') {
      ui.header.classList.remove('visible-none');
      ui.showcase_content.classList.remove('visible-none');
      ui.scroll_hand.classList.remove('visible-none');
    }
  }

  // Show / Hide mobile navbar
  mobileNavbar(e) {
    // Here i set an event 'toggle state', so we don't change the 'icon' on each click. Wait until the animation is end, and then enable it again.
    if (
      e.currentTarget === this.barContainer_btn &&
      e.currentTarget.dataset.eventToggle === 'true'
    ) {
      e.currentTarget.children[0].classList.toggle('mobile-header-enabled');

      e.currentTarget.setAttribute('data-event-toggle', 'false');

      // We can't use e.currentTarget, because this works when the event is triggered. We use setAttribute after we click so that's why it doesn't work
      setTimeout(
        () => this.barContainer_btn.setAttribute('data-event-toggle', 'true'),
        850,
      );

      this.mobileHeader_modal.classList.toggle('mobile-header-visible');
    }
  }

  sneakpeakBox(e) {
    // When we click on the box
    if (e.type === 'click' && e.target.closest('.sneak-box'))
      e.target.closest('.sneak-box').classList.toggle('sneak-box-info');

    // When we scroll disable all boxes
    if (e.type === 'scroll' && document.body.contains(ui.sneak_box)) {
      // Page position
      const pos = window.pageYOffset;

      document.querySelectorAll('.sneak-box').forEach((box) => {
        // Box position
        const elementPos = box.getBoundingClientRect().top;

        if (pos > elementPos) box.classList.remove('sneak-box-info');
      });
    }

    // I made 2 classes one for mobile and one for desktop
    // One that works only with click event and one that works only on hover
    // See in scss partial file => _sneak.scss
    if (e.type === 'DOMContentLoaded' && document.body.contains(ui.sneak_box)) {
      if (!ui.isMobile.test(navigator.userAgent))
        document
          .querySelectorAll('.sneak-box')
          .forEach((box) => box.classList.add('sneak-box-hover'));
      if (ui.isMobile.test(navigator.userAgent))
        document
          .querySelectorAll('.sneak-box')
          .forEach((box) => box.classList.remove('sneak-box-hover'));
    }
  }

  // Checkout mobile preview order
  previewOrderMobile(e) {
    if (e.currentTarget === this.orderSummary_btn) {
      this.mobilePreview_box.classList.toggle('visible-block');

      // Change the icon
      e.currentTarget.children[0].children[1].classList.toggle('fa-chevron-up');
    }
  }

  resetScroll(e) {
    const pos = window.pageYOffset;

    if (e.type === 'scroll') {
      if (pos >= 650) ui.resetScroll_btn.classList.add('scrollBtn-enabled');
      else ui.resetScroll_btn.classList.remove('scrollBtn-enabled');
    }

    if (
      e.currentTarget === ui.resetScroll_btn &&
      e.type === 'click' &&
      e.currentTarget.dataset.eventToggle === 'true'
    ) {
      // Disable event state
      e.currentTarget.setAttribute('data-event-toggle', 'false');

      jump('body', { duration: 1000 });

      // We can't use e.currentTarget, because this works when the event is triggered. We use setAttribute after we click so that's why it doesn't work
      setTimeout(
        () => ui.resetScroll_btn.setAttribute('data-event-toggle', 'true'),
        1000,
      );
    }
  }
}

export const ui = new Ui();
