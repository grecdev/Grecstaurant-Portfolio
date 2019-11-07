"use strict";

// MODEL
class LocalStorage {
	constructor() { this.itemArray }

	getLocalStorage() {
		// Check if the cart-items is empty
		if(localStorage.getItem('cart-items') === null) this.itemArray = [];
		// Get the localStorage items as Javascript object (default is JSON)
		else this.itemArray = JSON.parse(localStorage.getItem('cart-items'));
		
		// Items array
		return this.itemArray;
	}

	setLocalStorage(itemSet) {
		// Get the local storage
		this.itemArray = this.getLocalStorage();

		// Push the item in the items array
		this.itemArray.push(itemSet);

		// The items array add it to local storage as JSON
		localStorage.setItem('cart-items', JSON.stringify(this.itemArray));
	}

	removeLocalStorage(itemId) {
		// Get the local storage
		this.itemArray = this.getLocalStorage();

		// Get the arrItem acording to the item id
		this.itemArray.forEach((arrItem, index) => { if(arrItem.id === itemId) this.itemArray.splice(index, 1) });

		// The items array add it to local storage as JSON object
		localStorage.setItem('cart-items', JSON.stringify(this.itemArray));;
	}

	updateLocalStorage(quantity, itemId, price, totalPrice) {
		// Get the local storage
		this.itemArray = this.getLocalStorage();

		// Modifify the object keys
		this.itemArray.forEach((arrItem, index) => {
			// Get the arrItem acording to the item id
			if(arrItem.id === itemId) {
				// Modify the quantity and price
				arrItem.quantity = parseFloat(quantity);
				arrItem.price = price;
				arrItem.totalPrice = totalPrice;

				// Remove the item that we want to update id
				// And add the new item in the same place as the old / removed item.
				this.itemArray.splice(index, 1, arrItem);
			}

		});

		// The items array add it to local storage as JSON object
		localStorage.setItem('cart-items', JSON.stringify(this.itemArray));
	}
}

export const ls = new LocalStorage();