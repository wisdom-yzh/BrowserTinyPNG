const Pixel = require('./Pixel');

/**
 * @class Pixel for RGBA
 */
class RGBAPixel extends Pixel {

  constructor(value, alpha) {
    super(Pixel.TYPE.RGBA);
    if (typeof value == 'Number') {
      this.rSample = color >> 16;
      this.gSample = (color & 0x00FF00) >> 8;
      this.bSample = color & 0x0000FF;
    } else if (Array.isArray(value)) {
      this.rSample = value[0];
      this.gSample = value[1];
      this.bSample = value[2];
      if (value.length == 4) {
        this.alphaSample = value[3];
      } else if (alpha != undefined) {
        this.alphaSample = alpha;
      } else {
        this.alphaSample = 255;
      }
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
    canvasImageData.data[index+3] = this.alphaSample;
  }

  /**
   * @override
   */
  getColorArray() {
    return [this.rSample, this.gSample, this.bSample, this.alphaSample];
  }
}

module.exports = RGBAPixel;
