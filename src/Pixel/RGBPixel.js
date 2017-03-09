const Pixel = require('./Pixel');

/**
 * @class Pixel for RGB
 */
class RGBPixel extends Pixel {

  constructor(value) {
    super(Pixel.TYPE.RGB);
    if (typeof value == 'Number') {
      this.rSample = color >> 16;
      this.gSample = (color & 0x00FF00) >> 8;
      this.bSample = color & 0x0000FF;
    } else if (Array.isArray(value)) {
      this.rSample = value[0];
      this.gSample = value[1];
      this.bSample = value[2]
    }
  }

  /**
   * @override
   */
  setPixel(canvasImageData, index) {
    super.setPixel(canvasImageData, index);
    canvasImageData.data[index] = this.rSample;
    canvasImageData.data[index+1] = this.gSample;
    canvasImageData.data[index+2] = this.bSample;
    canvasImageData.data[index+3] = 255;
  }

  /**
   * @override
   */
  distance(anotherPixel) {
    super.distance(anotherPixel);
    return Math.sqrt(
      Math.pow(this.rSample - anotherPixel.rSample, 2) +
      Math.pow(this.gSample - anotherPixel.gSample, 2) +
      Math.pow(this.bSample - anotherPixel.bSample, 2)
    );
  }
}

module.exports = RGBPixel;
