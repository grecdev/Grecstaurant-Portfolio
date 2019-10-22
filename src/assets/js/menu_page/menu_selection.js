"use strict";

// Controller
// M + V + C
// http.getMenu() + ui.populateMenu() + ui.menu_categories.addEventListener

import { ui } from '../ui.js';
import { http } from '../http/http.js';

if(location.pathname.includes('menu')) {

	ui.menu_categories.addEventListener('click', (e) => {

		if(e.target.tagName === 'A') {

			// Select the menu type from categories
			const menuType = e.target.dataset.menuType;

			// I convert the children into array because the .children method returns a html collection and we need an array or array like to use forEach method
			// Remove active menu from disabled menus
			Array.from(ui.menu_categories.children).forEach(link => link.className = '');

			e.target.classList.add('active-menu');

			http.getMenu()
			.then(data => {
				
				ui.populateMenu(data, menuType);
	
			})
			.catch(err => console.log(err));
		}
		
		e.stopPropagation();
	});

}