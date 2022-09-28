// Importing required scripts
const scrape = require("./scrape"),
	download = require("./download")

// Getting URL and download path from the command line arguement
const URL = process.argv[2],
	downloadPath = process.argv[3]

// Scraping and downloading the images
scrape(URL)
	.then(images =>
		downloadPath
			? download(images, downloadPath)
			: console.log("Images: \n", images)
	)
	.catch(() =>
		console.log("An error occured while downloading the images...")
	)
