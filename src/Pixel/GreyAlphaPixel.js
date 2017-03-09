const Pixel = require('./Pixel');

/**
 * @class Pixel for GreyScale with Alpha
 */
class GreyAlphaPixel extends Pixel {

  constructor(pixel, alpha) {
    super(Pixel.TYPE.GREY_ALPHA);
    this.greySample = pixel;
    this.alphaSample = alpha;
  }

  /**
   * @override
   */
  setPixel(canvasImageData, index) {
    super.setPixel(canvasImageData, index);
    canvasImageData.data[index] = this.greySample;
    canvasImageData.data[index+1] = this.greySample;
    canvasImageData.data[index+2] = this.greySample;
    canvasImageData.data[index+3] = this.alphaSample;
  }

  /**
   * @override
   */
  distance(anotherPixel) {
    super.distance(anotherPixel);
    return Math.sqrt(
      Math.pow(this.greySample - anotherPixel.greySample, 2) +
      Math.pow(this.alphaSample - anotherPixel.alphaSample, 2)
    );
  }
}

module.exports = GreyAlphaPixel;
