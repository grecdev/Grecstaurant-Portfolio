"use strict";

// MODEL

class Http {
	constructor() {
		this.xhr = new XMLHttpRequest();
	}

	// XHR method
	getMenu_xhr() {
		return new Promise((resolve, reject) => {
			this.xhr.open('GET', 'https://grecdev.github.io/json-api/restaurant-foods.json', 'true');
	
			// If we use normal function we need to assign this. to a variable and then use it in the function
			// Arrow function inherit this. value
			this.xhr.onload = () => {
				const response = JSON.parse(this.xhr.responseText);
	
				if(this.xhr.status >= 400) reject(response);
				else resolve(response);
			}

			this.xhr.onerror = () => { reject('Some error ocurred') }
	
			this.xhr.send();
		});
	}

	getCountries_xhr() {
		return new Promise((resolve, reject) => {
	
			this.xhr.open('GET', 'https://restcountries.eu/rest/v2/region/europe', true);
	
			// If we use normal function we need to assign this. to a variable and then use it in the function
			// Arrow function inherit this. value
			this.xhr.onload = () => {
				const response = JSON.parse(this.xhr.responseText);
	
				if(this.xhr.status >= 400) reject(response)
				else resolve(response);
			}
	
			this.xhr.onerror = () => reject('Some error occured');
	
			this.xhr.send();
	
		});
	}

	// Fetch method
	getMenu_fetch() {
		return new Promise((resolve, reject) => {

			fetch('https://grecdev.github.io/json-api/restaurant-foods.json')
			.then(response => {
				// Check for errors
				// We could do => response.status >= 400.
				if(!response.ok) throw Error(response.statusText)

				return response.json();
			})
			.then(data => resolve(data))
			.catch(err => reject(err));

		});
	}

	getCountries_fetch() {
		return new Promise((resolve, reject) => {
	
			fetch('https://restcountries.eu/rest/v2/region/europe')
			.then(response => {
				if(!response.ok) throw Error(response.statusText)

				return response.json();
			})
			.then(data => resolve(data))
			.catch(err => reject(err))
	
		});
	}

	// Async Await method
	async getMenu_await() {
		const response = await fetch('https://grecdev.github.io/json-api/restaurant-foods.json');
		const data = response.json();

		return data;
	}

	async getCountries_await() {
		const response = await fetch('https://restcountries.eu/rest/v2/region/europe');
		const data = response.json();

		return data;
	}
}

export const http = new Http();