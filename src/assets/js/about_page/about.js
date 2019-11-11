"use strict";

import { ui } from '../ui.js';

// About page functionality

if(window.matchMedia('(max-width: 1025px)').matches && location.pathname.includes('about')) {

	ui.sneak_section.addEventListener('click', (e) => {

		
	
		if(e.target.closest('.sneak-box')) {

			document.querySelectorAll('.sneak-box').forEach(box => box.classList.remove('sneak-box-info'));

			e.target.closest('.sneak-box').classList.add('sneak-box-info');
		}
	
		e.stopPropagation();
	});
}