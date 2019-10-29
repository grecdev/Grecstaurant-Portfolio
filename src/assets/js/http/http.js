"use strict";

// MODEL

class Http {
	constructor() {
		this.xhr = new XMLHttpRequest();
	}

	// XHR method
	getMenuXhr() {
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

	getCountries() {
		return new Promise((resolve, reject) => {

			const xhr = new XMLHttpRequest();
	
			xhr.open('GET', 'https://restcountries.eu/rest/v2/region/europe', true);
	
			xhr.onload = () => {
				const response = JSON.parse(xhr.responseText);
	
				if(xhr.status >= 400) reject(response)
				else resolve(response);
			}
	
			xhr.onerror = () => { throw new Error('Something went wrong') }
	
			xhr.send();
	
		});
	}

	// Fetch method

	// Async Await method
}

export const http = new Http();