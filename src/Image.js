const {
  GreyPixel,
  GreyAlphaPixel,
  IndexedPixel,
  RGBPixel,
  RGBAPixel
} = require('./Pixel');

class Image {

  /**
   * init image
   */
  constructor(scanLine, width, height) {
    this.imageData = scanLine;
    this.height = height;
    this.width = width;
  }

  /**
   * draw image on a dom
   * @param {Element} dom
   * @param {Array} scanLine
   * @return void
   */
  draw(dom, scanLine) {

    if (scanLine) {
      if (scanLine.length != this.width * this.height) {
        throw new Error('image data length is valid');
      }
      this.imageData = scanLine;
    }
    if (!this.ctx) {
      this.initCanvas(dom);
    }
    const canvasImageData = this.ctx.createImageData(this.width, this.height);

    let index = 0, originIndex = 0;
    while (index < canvasImageData.data.length) {
      this.imageData[originIndex++].setPixel(canvasImageData, index);
      index += 4;
    }
    this.ctx.putImageData(canvasImageData, 0, 0);
  }

  /**
   * init a canvas dom and get canvas context 
   * @param {Element} dom
   * @return {Canvas}
   */
  initCanvas(dom) {
    const canvasDom = document.createElement('canvas');
    canvasDom.setAttribute('width', this.width);
    canvasDom.setAttribute('height', this.height);
    dom.appendChild(canvasDom);
    this.ctx = canvasDom.getContext('2d');
  }
}

module.exports = Image;
