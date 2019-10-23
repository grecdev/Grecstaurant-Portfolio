"use strict";

class LocalStorage {
	constructor() { this.itemArray }

	getLocalStorage() {
		// Check if the cart-items is empty
		if(localStorage.getItem('cart-items') === null) this.itemArray = [];
		else this.itemArray = JSON.parse(localStorage.getItem('cart-items'));

		// Items array
		return this.itemArray;
	}

	setLocalStorage(itemSet) {
		// Get the local storage
		this.itemArray = this.getLocalStorage();

		// Push the item in the items array
		this.itemArray.push(itemSet);

		// The items array add it to local storage as JSON object
		localStorage.setItem('cart-items', JSON.stringify(this.itemArray));
	}

	removeLocalStorage(itemDelete) {
		// Get the local storage
		this.itemArray = this.getLocalStorage();

		// Remove the item from local storage acording to the dataset id from UI
		this.itemArray.forEach((arrItem, index) => { if(arrItem.id === itemDelete) this.itemArray.splice(index, 1) });

		// The items array add it to local storage as JSON object
		localStorage.setItem('cart-items', JSON.stringify(this.itemArray));;
	}
}

export const ls = new LocalStorage();