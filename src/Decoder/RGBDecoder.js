const BaseDecoder = require('./BaseDecoder');
const { RGBPixel } = require('../Pixel');

class RGBDecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('TRUECOLOR', imageWidth, imageHeight, imageData);
    this.rowLength = 3 * this.imageWidth;
  }

  /**
   * @override
   */
  getPixel() {

    const pixel = this.row[this.ptr];
    this.ptr += 3;
    return new RGBPixel(pixel);
  }
}

module.exports = RGBDecoder;
