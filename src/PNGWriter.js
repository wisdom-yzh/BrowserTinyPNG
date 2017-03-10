const PNGPainter = require('./PNGPainter');
const Cluster = require('./Cluster');
const { IndexedPixel } = require('./Pixel');

class PNGWriter {

  constructor(pixels, width, height) {
    this.pixels = pixels;
    this.width = width;
    this.height = height;
  }


  /**
   * set total colors in png after tiny
   */
  cluster() {
    const cluster = new Cluster(this.pixels);
    const {palette, indexes} = cluster.cluster(5);
    this.pixels = indexes.map(index => new IndexedPixel(index, palette));
    return this;
  }

  /**
   * get painter
   */
  getPainter() {
    return new PNGPainter(this.pixels, this.width, this.height);
  }
}

module.exports = PNGWriter;
