"use strict";

import { ui } from '../ui.js';

// About page functionality
if(!ui.isMobile.test(navigator.userAgent) && location.pathname.includes('about')) {

	ui.sneak_section.addEventListener('click', (e) => {

		ui.sneakpeakBox(e);
	
		e.stopPropagation();
	});
}