const Buffer = require('buffer').Buffer;
const PNGPainter = require('./PNGPainter');
const Cluster = require('./Cluster');
const Chunk = require('./Chunk');
const { IndexedPixel } = require('./Pixel');
const { PNG_SIGNITURE } = require('./Constants');

class PNGWriter {

  constructor(pixels, width, height) {
    this.originPixels = this.pixels = pixels;
    this.width = width;
    this.height = height;
  }


  /**
   * set total colors in png after tiny
   * @param {Number} size
   */
  cluster(size) {
    const cluster = new Cluster(this.originPixels);
    const {palette, indexes} = cluster.cluster(size);
    this.pixels = indexes.map(index => new IndexedPixel(index, palette));
    this.indexes = indexes;
    this.palette = palette;
    return this;
  }

  /**
   * write as blob object
   * @param 
   */
  writeAsPNG() {
    const data = []
      .concat(PNG_SIGNITURE)
      .concat(IHDR)
      .concat(IDAR)
      .concat(IEND);
    let buffer = Buffer.from([]);
    return new Blob(buffer, {
      type: 'image/png'
    });
  }

  /**
   * get painter
   */
  getPainter() {
    return new PNGPainter(this.pixels, this.width, this.height);
  }
}

module.exports = PNGWriter;
