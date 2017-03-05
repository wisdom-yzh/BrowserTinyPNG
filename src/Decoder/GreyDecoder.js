const BaseDecoder = require('./BaseDecoder');
const { GreyPixel } = require('../Pixel');

class GreyDecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('GREYSCALE', imageWidth, imageHeight, imageData);
    this.rowLength = this.imageWidth;
  }

  /**
   * @override
   */
  getPixel() {

    const pixel = this.row[this.ptr];
    this.ptr++;
    return new GreyPixel(pixel);
  }

}

module.exports = GreyDecoder;
