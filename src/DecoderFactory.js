const { IMAGE_TYPE } = require('./Constants');
const {
	GreyDecoder,
	RGBDecoder,
	IndexedDecoder,
	GreyAlphaDecoder,
	RGBADecoder
} = require('./Decoder');

const DecoderFactory = {
	getDecoder: (imageType, imageWidth, imageHeight, imageData, external) => {
		if (IMAGE_TYPE.indexOf(imageType) == -1) {
			throw new Error('invalid image type!');
		}
		const imageDecoder = {
			GREYSCALE: GreyDecoder,
			TRUECOLOR: RGBDecoder,
			INDEXED_COLOR: IndexedDecoder,
			GREYSCALE_WITH_ALPHA: GreyAlphaDecoder,
			TRUECOLOR_WITH_ALPHA: RGBADecoder
		};
		return new imageDecoder[imageType](imageWidth, imageHeight, imageData, external);
	}
}

module.exports = DecoderFactory;
