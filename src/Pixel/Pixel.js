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

	/**
	 * @virtual 
	 */
	serialization() {

		const serialized = 0;
		const base = 1;

		for (const value of this) {
			serialized += base * value;
			base <<= 8;
		}

		return serialized;
	}
	
}

Pixel.TYPE = {
  GREY:       Symbol('grey'),
  GREY_ALPHA: Symbol('grey with alpha'),
  INDEXED:    Symbol('indexed with palette'),
  RGB:        Symbol('rgb'),
  RGBA:       Symbol('rgba')
}

module.exports = Pixel;
