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
   * calculate distance
   */
  distance(anotherPixel) {
    const [r1, g1, b1, a1] = this.getColorArray();
    const [r2, g2, b2, a2] = anotherPixel.getColorArray();
    return Math.sqrt(
      Math.pow(r1 - r2, 2) + 
      Math.pow(g1 - g2, 2) + 
      Math.pow(b1 - b2, 2) +
      Math.pow(a1 - a2, 2)
    );
  }

  /**
   * @virtual 
   */
  serialize() {

    let serialized = 0;
    let base = 1;

    for (const value in this) {
      if (typeof this[value] == 'number') {
        serialized += base * this[value];
        base <<= 8;
      }
    }

    return serialized;
  }
	
  /**
   * @virtual
   */
  getColorArray() {}
}

Pixel.TYPE = {
  GREY:       Symbol('grey'),
  GREY_ALPHA: Symbol('grey with alpha'),
  INDEXED:    Symbol('indexed with palette'),
  RGB:        Symbol('rgb'),
  RGBA:       Symbol('rgba')
}

module.exports = Pixel;
