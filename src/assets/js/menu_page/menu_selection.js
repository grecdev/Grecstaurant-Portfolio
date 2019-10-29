"use strict";

// Controller
// M + V + C

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

			// Model + View + Controller
			http.getMenuXhr()
			.then(data => ui.populateMenu(data, menuType))
			.catch(err => console.log(err));
		}
		
		e.stopPropagation();
	});

	// Constructor Pattern
	function Cart_item(id, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.quantity = 1;
		this.totalPrice = price;
	}

	ui.foodMenu_container.addEventListener('click', (e) => {
		
		// Only when we click on the cart icon
		if(e.target.parentElement.classList.contains('add-cart')) ui.addToCart(e, Cart_item);
		
		e.stopPropagation();
	});

	ui.online_products.addEventListener('click', (e) => {

		// Removing cart item
		if(e.target.classList.contains('remove-item')) ui.removeCartItem(e);

		// Quantity change when we modify by increment / decrement buttons
		if(e.target.tagName === 'BUTTON') ui.changeQuantity(e);

		// Select the value so we can directly change it.
		if(e.target.tagName === 'INPUT') e.target.setSelectionRange(0, e.target.value.length);

		// console.log(e.target);
		
		e.stopPropagation();
	});

	ui.online_products.addEventListener('keyup', (e) => {

		// Quantity change when we modify by keyboard
		if(e.target.tagName === 'INPUT') ui.changeQuantity(e)
		
		e.stopPropagation();
	});

	// Here i use event delegation because the inputs are inserted dynamically with javascript
	// In the global.js file i assign the event directly to the element because they are already in the DOM
	ui.online_products.addEventListener('keydown', (e) => {

		// Quantity change when we modify by keyboard
		if(e.target.tagName === 'INPUT') ui.disableLetters(e)
		
		e.stopPropagation();
	});
}