// Importing path to get the filePath, axios to download the file and file system module to write the file
const fs = require("fs"),
	Axios = require("axios"),
	path = require("path")

const download = async (images, downloadPath) => {
	// Looping through each image
	for (const image of images) {
		const { url, fileName } = image

		// Getting the path to write the file
		const filePath = path.join(downloadPath, fileName)

		console.log("Downloading " + fileName)

		// Downloading the file using axios
		try {
			const response = await Axios({
				url,
				method: "GET",
				responseType: "stream",
			})

			// Converting the readable stream to wrtable stream using pipe and then writing to the file
			await response.data.pipe(fs.createWriteStream(filePath))
		} catch (err) {
			console.log("An error occured while downloading " + fileName)
		}
	}

	console.log("Done !")
}

module.exports = download
