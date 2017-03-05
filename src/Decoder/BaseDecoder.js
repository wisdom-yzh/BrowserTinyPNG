const { FILTER_TYPE, IMAGE_TYPE } = require('../Constants');

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

    this.imageType = imageType;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
    this.imageData = imageData;
    this.ptr = 0;

    // 在派生类中定义rowLength,表示一个扫描行有多少个bytes
    // this.rowLength = ?
  }

  /**
   * decode function
   */
  decode() {

    const decodeData = [];

    let index = 0, currentRow, lastRow;
    let filterType = this.imageData.shift();
    for (index = 0; index < this.imageHeight; index++) {
      currentRow = this.imageData.splice(0, this.rowLength);
      this.row = this.reconstruct(FILTER_TYPE[filterType])(currentRow, lastRow);
      lastRow = this.row;
      this.ptr = 0;
      while (this.ptr < this.rowLength) {
        decodeData.push(this.getPixel());
      }
      filterType = this.imageData.shift();
    }
    return decodeData;
  }

  /**
   * @virtual
   * reconstruct
   */
  reconstruct(filterType) {
    return (currentRow, lastRow) => currentRow;
  }

  /**
   * @virtual
   * get pixel, virtual function
   */
  getPixel() {

  }
}

module.exports = BaseDecoder;
