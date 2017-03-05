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
   * decode function
   */
  decode() {

    const decodeData = [];

    this.ptr = 0;
    while (this.ptr < this.imageData.length) {
      decodeData.push(this.getPixel());
      this.ptr++;
    }

    return decodeData;
  }

  /**
   * get pixel, virtual function
   */
  getPixel() {

  }	
}

module.exports = BaseDecoder;
