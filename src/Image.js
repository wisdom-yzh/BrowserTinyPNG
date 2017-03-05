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
    if (!Array.isArray(scanLine) || width * height != scanLine.length) {
      throw new Error('not array 2d');
    }
    this.imageData = scanLine;
    this.height = height;
    this.width = width;
  }

  /**
   * draw image on a dom
   * @param {Element} dom
   * @return void
   */
  draw(dom) {
    const ctx = this.initCanvas(dom);
    const canvasImageData = ctx.createImageData(this.width, this.height);

    let index = 0;
    while (index < this.scanLine.length) {
      this.scanLine[index].setPixel(canvasImageData, index);
      index += 4;
    }
    ctx.putImageData(canvasImageData, 0, 0);
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
    return canvasDom.getContext('2d');
  }
}

module.exports = Image;
