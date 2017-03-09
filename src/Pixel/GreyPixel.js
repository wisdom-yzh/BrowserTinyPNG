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
  distance(anotherPixel) {
    super.distance(anotherPixel);
    return Math.abs(this.greySample - anotherPixel.greySample);
  }
}


module.exports = GreyPixel;
