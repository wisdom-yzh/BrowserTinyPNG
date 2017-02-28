const BaseDecoder = require('./BaseDecoder');

class GreyDecoder extends BaseDecoder {

	constructor(imageWidth, imageHeight, imageData) {
		super('GREYSCALE', imageWidth, imageHeight, imageData);
	}
}
