const BaseDecoder = require('./BaseDecoder');
const { GreyPixel } = require('../Pixel');

class GreyDecoder extends BaseDecoder {

	constructor(imageWidth, imageHeight, imageData) {
		super('GREYSCALE', imageWidth, imageHeight, imageData);
	}

	/**
   * @override
   */
	getPixel() {

		const pixel = this.imageData[this.ptr];
		return new GreyPixel(pixel);
	}
	
}

module.exports = GreyDecoder;
