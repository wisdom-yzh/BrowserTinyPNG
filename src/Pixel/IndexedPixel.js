const Pixel = require('./Pixel');

/**
 * @class Pixel for Indexed Palette
 */
class IndexedPixel extends Pixel {

  constructor(index, palette, paletteAlpha) {
    super(Pixel.TYPE.INDEXED);
    const color = palette[index];
    const hasAlpha = palette[0].length == 4 || typeof paletteAlpha != 'undefined';
    if (hasAlpha) {
      if (palette[0].length == 4) {
        this.alphaSample = palette[index][3];
      } else if (typeof paletteAlpha[index] != 'undefined') {
        this.alphaSample = paletteAlpha[index];
      } else {
        this.alphaSample = 255;
      }
    } else {
      this.alphaSample = 255;
    }
    this.rSample = palette[index][0];
    this.gSample = palette[index][1];
    this.bSample = palette[index][2];
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

module.exports = IndexedPixel;
