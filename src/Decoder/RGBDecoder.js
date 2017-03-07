const BaseDecoder = require('./BaseDecoder');
const { RGBPixel } = require('../Pixel');

class RGBDecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('TRUECOLOR', imageWidth, imageHeight, imageData);
    this.bytePerPixel = 3;
  }

  /**
   * @override
   */
  getPixel() {

    const pixel = this.row[this.ptr];
    super.getPixel();
    return new RGBPixel(pixel);
  }
}

module.exports = RGBDecoder;
