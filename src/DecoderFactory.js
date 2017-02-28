const { IMAGE_TYPE } = require('./Constants');
const Decoder = require('./Decoder');
const Pixel = require('./Pixel');

const DecoderFactory = {
	getDecoder: (imageType, imageWidth, imageHeight, external) => {
		if (validType.indexOf(imageType) == -1) {
			throw new Error('invalid image type!');
		}
		const imageDecoder = {
			GREYSCALE: GreyDecoder,
			TRUECOLOR: RGBDecoder,
			INDEXED_COLOR: IndexedDecoder,
			GREYSCALE_WITH_ALPHA: GreyAlphaDecoder,
			TRUECOLOR_WITH_ALPHA: RGBADecoder
		};
		return new Decoder[imageType](imageType, imageWidth, imageHeight, external);
	}
}

module.exports = DecoderFactory;
