// Importing puppeteer to scrape the page and path to get the filename and file extension
const puppeteer = require("puppeteer"),
	path = require("path")

const scrape = async URL => {
	// Opening the url using puppeteer to get the client side rendered content
	console.log("Warming up...")
	const browser = await puppeteer.launch()
	const page = await browser.newPage()

	console.log(`Opening ${URL}...`)

	// Exit if page can not be opened
	try {
		await page.goto(URL)
	} catch (err) {
		console.log("Could not open the given URL")
		process.exit()
	}

	console.log("Scraping the page and getting the images...")

	// Finding all the image tags and pushing the src to an array
	const getImages = await page.evaluate(() => {
		const images = []

		const imageTags = document.querySelectorAll("img")

		imageTags.forEach(image => {
			images.push({ url: image.src })
		})

		return images
	})

	await browser.close()

	// Getting the fileName and fileFormat using path module
	const images = getImages.map(image => ({
		...image,
		fileName: path.basename(image.url),
		fileFormat: path.extname(image.url),
	}))

	return images
}

module.exports = scrape
