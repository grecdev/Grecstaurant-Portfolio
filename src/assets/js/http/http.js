"use strict";

// MODEL

class Http {
	constructor() {
		this.xhr = new XMLHttpRequest();
	}

	getMenu() {
		return new Promise((resolve, reject) => {
			this.xhr.open('GET', 'https://grecdev.github.io/json-api/restaurant-foods.json', 'true');
	
			this.xhr.onload = () => {
				const response = JSON.parse(this.xhr.responseText);
	
				if(this.xhr.status >= 400) reject(response);
				else resolve(response);
			}

			this.xhr.error = () => { reject('Some error') }
	
			this.xhr.send();
		});
	}
}

export const http = new Http();