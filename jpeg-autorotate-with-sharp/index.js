const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const jo = require('jpeg-autorotate')

async function main() {
	const examples = ['Landscape', 'Portrait']
	console.time('Timer')
	for (const example of examples) {
		for (let i = 0; i <= 8; i++) {
			console.log(`Editing image ${example} ${i}`)
			const imageBuffer = fs.readFileSync(path.join(__dirname, '..', 'exif-orientation-examples', example + '_' + i + '.jpg'))

			let rotatedBuffer
			try {
				rotatedBuffer = await jo.rotate(imageBuffer)
				rotatedBuffer = rotatedBuffer.buffer
			} catch (e) {
				rotatedBuffer = imageBuffer
			}

			await sharp(rotatedBuffer)
				.rotate()
				.resize(640, 640, { fit: 'inside' })
				.toFile(path.join(__dirname, example + '_' + i + '_rotate.jpg'))

			await sharp(rotatedBuffer)
				.withMetadata()
				.resize(640, 640, { fit: 'inside' })
				.toFile(path.join(__dirname, example + '_' + i + '_withMetadata.jpg'))
				
			await sharp(rotatedBuffer)
				.resize(640, 640, { fit: 'inside' })
				.toFile(path.join(__dirname, example + '_' + i + '.jpg'))
		}
	}
	console.timeEnd('Timer')
}

main()