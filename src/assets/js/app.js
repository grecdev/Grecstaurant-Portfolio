"use strict";

/* 
	For development:
	1. SASS > CSS
	2. CSS > JS
	3. JS > DOM

	For production:
	1. SASS > CSS
	2. CSS > JS
	3. CSS > CSS.min and link in html file
*/ 
import "../css/style.scss";

// Fetch for Safari 6.1+ / Internet Explorer 10+ => https://github.com/github/fetch
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Individual functionality for each file
import './reservation_page/reservation.js';
import './menu_page/menu_selection.js';
import './checkout_page/payment.js';
import './about_page/about.js';
import './global.js';