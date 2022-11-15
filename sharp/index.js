const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function main() {
	const examples = ['Landscape', 'Portrait']

	for (const example of examples) {
		for (let i = 0; i <= 8; i++) {
			console.log(`Editing image ${example} ${i}`)
			const imageBuffer = fs.readFileSync(path.join(__dirname, '..', 'exif-orientation-examples', example + '_' + i + '.jpg'))

			await sharp(imageBuffer)
				.rotate()
				.resize(640, 480)
				.toFile(path.join(__dirname, example + '_' + i + '_rotate.jpg'))

			await sharp(imageBuffer)
				.withMetadata()
				.resize(640, 480)
				.toFile(path.join(__dirname, example + '_' + i + '_withMetadata.jpg'))
		}
	}
}

main()