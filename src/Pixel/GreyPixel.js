const Pixel = require('./Pixel');

/**
 * @class Pixel for GreyScale
 */
class GreyPixel extends Pixel {

  constructor(pixel) {
    super(Pixel.TYPE.GREY);
    this.greySample = pixel;
  }

  /**
   * @override
   */
  setPixel(canvasImageData, index) {
    super.setPixel(canvasImageData, index);
    canvasImageData.data[index] = this.greySample;
    canvasImageData.data[index+1] = this.greySample;
    canvasImageData.data[index+2] = this.greySample;
    canvasImageData.data[index+3] = 0;
  }

  /**
   * @override
   */
  getColorArray() {
    return [this.greySample, this.greySample, this.greySample, 255];
  }
}


module.exports = GreyPixel;
