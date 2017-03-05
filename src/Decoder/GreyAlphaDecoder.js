const BaseDecoder = require('./BaseDecoder');
const { GreyAlphaPixel } = require('../Pixel');

class GreyAlphaDecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('GREYSCALE_WITH_ALPHA', imageWidth, imageHeight, imageData);
    this.rowLength = 2 * this.imageWidth;
  }

  /**
   * @override
   */
  getPixel() {

    const pixel = this.row[this.ptr];
    this.ptr += 2;
    return new GreyAlphaPixel(pixel);
  }
}

module.exports = GreyAlphaDecoder;
