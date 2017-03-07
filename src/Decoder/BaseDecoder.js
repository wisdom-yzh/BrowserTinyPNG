const { FILTER_TYPE, IMAGE_TYPE } = require('../Constants');
const { reconstruct } = require('../Filter');

class BaseDecoder {

  /**
   * init an image decoder given width and height
   */
  constructor(imageType, imageWidth, imageHeight, imageData) {

    if (IMAGE_TYPE.indexOf(imageType) == -1) {
      throw new Error('invalid imageType');
    }
    if (imageWidth < 0 || imageHeight < 0) {
      throw new Error('invalid image width/height');
    }
    if (!imageData.length || imageData.length < imageWidth * imageHeight) {
      throw new Error('invalid imageData size');
    }

    // 在派生类中定义bytePerPixel,表示一个pixel占多少bytes
    // this.bytePerPixel = ?
    this.imageType = imageType;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imageData = imageData;
    this.ptr = 0;
  }

  /**
   * decode function
   */
  decode() {

    const decodeData = [];

    let index = 0, currentRow, lastRow;
    let filterType = this.imageData.shift();

    this.rowLength = this.bytePerPixel * this.imageWidth;

    for (index = 0; index < this.imageHeight; index++) {

      currentRow = this.imageData.splice(0, this.rowLength);
      lastRow = this.row = this.reconstruct(FILTER_TYPE[filterType])(currentRow, lastRow);

      this.ptr = 0;
      while (this.ptr < this.rowLength) {
        decodeData.push(this.getPixel());
      }
      filterType = this.imageData.shift();
    }
    return decodeData;
  }

  /**
   * reconstruct, decode filter
   */
  reconstruct(filterType) {
    return reconstruct(this.bytePerPixel)[filterType];
  }

  /**
   * @virtual
   * get pixel, virtual function
   */
  getPixel() {
    this.ptr += this.bytePerPixel;
  }
}

module.exports = BaseDecoder;
