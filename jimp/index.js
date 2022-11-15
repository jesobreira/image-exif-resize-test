const Jimp = require('jimp')
const fs = require('fs')
const path = require('path')

async function main() {
	const examples = ['Landscape', 'Portrait']

	for (const example of examples) {
		for (let i = 0; i <= 8; i++) {
			console.log(`Editing image ${example} ${i}`)
			const imageBuffer = fs.readFileSync(path.join(__dirname, '..', 'exif-orientation-examples', example + '_' + i + '.jpg'))

			const jimp = await Jimp.read(imageBuffer)
			jimp.resize(640, 480)
			jimp.write(path.join(__dirname, example + '_' + i + '.jpg'))
		}
	}
}

main()