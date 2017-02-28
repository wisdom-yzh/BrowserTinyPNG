const { IMAGE_TYPE } = require('../Constants');

class BaseDecoder {

	/**
	 * init an image decoder given width and height
	 */
	constructor(imageType, imageWidth, imageHeight, imageData) {
		
		if (IMAGE_TYPE.indexOf(imageType) == -1) {
			throw new Error('invalid imageType');
		}
		if (imageWidth < 0 || imageHeight < 0) {
			throw new Error('invalid image width/height');
		}
		if (!imageData.length || imageData.length < imageWidth * imageHeight) {
			throw new Error('invalid imageData size');
		}

		this.imageType = imageType;
		this.imageWidth = imageWidth;
		this.imageHeight = imageHeight;
		this.imageData = imageData;
		this.ptr = 0;
	}

	/**
	 * virtual function
	 */
	decode() {
		
	}
}

module.exports = BaseDecoder;
