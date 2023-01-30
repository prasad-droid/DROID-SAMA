const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '20f0a9e35fmshf3edfd4c2b8b193p145be7jsnc3c90ae4c18b',
		'X-RapidAPI-Host': 'gogoanime2.p.rapidapi.com'
	}
};

fetch('https://gogoanime2.p.rapidapi.com/%7Bserver%7D/watch/overlord-iv-episode-8', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));