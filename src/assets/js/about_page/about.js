"use strict";

import { ui } from '../ui.js';

// About page functionality
if(window.matchMedia('(max-width: 1025px)').matches && location.pathname.includes('about')) {

	ui.sneak_section.addEventListener('click', (e) => {

		ui.sneakpeakBox(e);
	
		e.stopPropagation();
	});
}