/** 
 * @class Base pixel class
 */
class Pixel {

  constructor(type) {
    this.type = type;
  }

  /**
   * @virtual
   * @desc set pixel on canvas iamgeData
   * @param {ImageData} canvasImageData
   * @param {Number} index
   */
  setPixel(canvasImageData, index) {
    if (!canvasImageData instanceof ImageData) {
      throw new Error('canvasImageData is not ImageData');
    }
    if (canvasImageData.data.length <= index + 3) {
      throw new Error('index overflow!');
    }
  }

  /**
   * @virtual
   */
  distance(anotherPixel) {
    if (!anotherPixel instanceof this.__proto__.constructor) {
      throw new Error('Two pixel are different type');
    }
  }
}

Pixel.TYPE = {
  GREY:       Symbol('grey'),
  GREY_ALPHA: Symbol('grey with alpha'),
  INDEXED:    Symbol('indexed with palette'),
  RGB:        Symbol('rgb'),
  RGBA:       Symbol('rgba')
}

const rgb2int = (r, g, b) => (r << 16) + (g << 8) + b;

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

/**
 * @class Pixel for Indexed Palette
 */
class IndexedPixel extends Pixel {

  constructor(index, palette, paletteAlpha) {
    super(Pixel.TYPE.INDEXED);
    const color = palette[index];
    this.hasAlpha = typeof paletteAlpha != 'undefined';
    this.alphaSample = this.hasAlpha ? (paletteAlpha[index] || 255) : 255;
    if (this.hasAlpha && index < paletteAlpha.length) {
      this.alphaSample = paletteAlpha[index];
    } else {
      this.alphaSample = 255;
    }
    this.rSample = color >> 16;
    this.gSample = (color & 0x00FF00) >> 8;
    this.bSample = color & 0x0000FF;
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
  distance(anotherPixel) {
    super.distance(anotherPixel);
    return Math.sqrt(
      Math.pow(this.rSample - anotherPixel.rSample, 2) +
      Math.pow(this.gSample - anotherPixel.gSample, 2) +
      Math.pow(this.bSample - anotherPixel.bSample, 2) +
      Math.pow(this.alphaSample - anotherPixel.alphaSample, 2) 
    );
  }
}

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
  distance(anotherPixel) {
    super.distance(anotherPixel);
    return Math.sqrt(
      Math.pow(this.rSample - anotherPixel.rSample, 2) +
      Math.pow(this.gSample - anotherPixel.gSample, 2) +
      Math.pow(this.bSample - anotherPixel.bSample, 2)
    );
  }
}

module.exports = {
  GreyPixel,
  GreyAlphaPixel,
  RGBPixel,
  RGBAPixel,
  IndexedPixel
}
