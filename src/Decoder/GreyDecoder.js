const BaseDecoder = require('./BaseDecoder');
const { GreyPixel } = require('../Pixel');

class GreyDecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('GREYSCALE', imageWidth, imageHeight, imageData);
    this.bytePerPixel = 1;
  }

  /**
   * @override
   */
  getPixel() {

    const pixel = this.row[this.ptr];
    super.getPixel();
    return new GreyPixel(pixel);
  }

}

module.exports = GreyDecoder;
