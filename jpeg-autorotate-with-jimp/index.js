const Jimp = require('jimp')
const jo = require('jpeg-autorotate')
const fs = require('fs')
const path = require('path')

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

			const jimp = await Jimp.read(rotatedBuffer)
			jimp.resize(640, Jimp.AUTO)
			jimp.write(path.join(__dirname, example + '_' + i + '.jpg'))
		}
	}
	console.timeEnd('Timer')
}

main()