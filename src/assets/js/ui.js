"use strict";

class Ui {

	// Ui elements
	constructor() {
		this.chef_avatar = document.querySelector('.chef-avatar');
		this.pizza_left = document.querySelector('.pizza-left');
		this.pizza_right = document.querySelector('.pizza-right');
	}

	// Scroll functionality
	scrollFunctionality(e) {

		const pos = Math.floor(pageYOffset);

		if(pos >= 500) ui.chef_avatar.classList.add('chef-visible')
		else ui.chef_avatar.classList.remove('chef-visible')

		if(pos >= 800) {
			ui.pizza_left.classList.add('pizza-visible');
			ui.pizza_right.classList.add('pizza-visible');
		} else {
			ui.pizza_left.classList.remove('pizza-visible');
			ui.pizza_right.classList.remove('pizza-visible');
		}

		
		window.requestAnimationFrame(ui.scrollFunctionality);
	}

}

export const ui = new Ui();