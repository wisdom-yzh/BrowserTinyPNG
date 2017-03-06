const {
  GreyPixel,
  GreyAlphaPixel,
  IndexedPixel,
  RGBPixel,
  RGBAPixel
} = require('./Pixel');

class PNGPainter {

  /**
   * init image
   */
  constructor(scanLine, width, height) {
    this.imageData = scanLine;
    this.height = height;
    this.width = width;

    this.deltaY = 0;
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
   * draw a scanline
   * @param {Element} dom
   * @param {Array} scanline
   * @return void
   */
  drawScanLine(dom, scanLine) {
    
    if (scanLine.length != this.width) {
      throw new Error('scanline width invalid');
    }
    this.imageData = scanLine;
    if (!this.ctx) {
      this.initCanvas(dom);
    }
    const canvasScanLine = this.ctx.createImageData(this.width, 1);

    let index = 0, originIndex = 0;
    while (index < canvasScanLine.data.length) {
      this.imageData[originIndex++].setPixel(canvasScanLine, index);
      index += 4;
    }
    this.ctx.putImageData(canvasScanLine, 0, this.deltaY++);
    if (this.deltaY == this.height) {
      this.deltaY = 0;
    }
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

module.exports = PNGPainter;
