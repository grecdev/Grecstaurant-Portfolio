function test() {

	const apiKey = 'cefbf2515b638a980576cdd26a6a10ee';
	const apiId = '121b9f67';

	return new Promise((resolve, reject) => {

		const xhr = new XMLHttpRequest();
	
		xhr.open('GET', `https://api.edamam.com/search?q=burger&app_id=${apiId}&app_key=${apiKey}`, true);
	
		xhr.onload = () => {

			const response = JSON.parse(xhr.responseText);
	
			if(xhr.status >= 400) reject(response)
			else resolve(response);
	
		}

		xhr.onerror = () => { reject('something went wrong') }
	
	
		xhr.send();

	});
}