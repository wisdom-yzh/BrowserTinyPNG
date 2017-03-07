const BaseDecoder = require('./BaseDecoder');
const { RGBAPixel } = require('../Pixel');

class RGBADecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('TRUECOLOR_WITH_ALPHA', imageWidth, imageHeight, imageData);
    this.bytePerPixel = 4;
  }

  /**
   * @override
   */
  getPixel() {

    const pixel = [
      this.row[this.ptr],
      this.row[this.ptr+1],
      this.row[this.ptr+2]
    ];
    const alpha = this.row[this.ptr+3];
    super.getPixel();
    return new RGBAPixel(pixel, alpha);
  }
}

module.exports = RGBADecoder;
