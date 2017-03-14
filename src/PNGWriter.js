const zlib = require('browserify-zlib/src');
const Buffer = require('buffer').Buffer;
const PNGPainter = require('./PNGPainter');
const Cluster = require('./Cluster');
const Chunk = require('./Chunk');
const Utils = require('./Utils');
const { IndexedPixel } = require('./Pixel');
const { PNG_SIGNITURE } = require('./Constants');

/**
 * @desc create a chunk array
 * @param data = chunkName + chunkData
 */
const makeChunk = data =>
  Utils.uLong2Array(data.length - 4)// chunkData length
  .concat(data)                     // chunkName + chunkData
  .concat(Utils.generateCrc(data)); // chunkCRC

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

    console.log(this.palette);
    return this;
  }

  /**
   * write as blob object
   * @param 
   */
  writeAsPNG() {

    const data = []
      .concat(PNG_SIGNITURE)
      .concat(this.IHDR())
      .concat(this.PLTE())
      .concat(this.tRNS())
      .concat(this.IDAT())
      .concat(this.IEND());

    let buffer = Buffer.from(data);
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

  /**
   * write IHDR chunk
   */
  IHDR() {
    return makeChunk(
      'IHDR'.split('').map(s => s.charCodeAt(0))
      .concat(Utils.uLong2Array(this.width))
      .concat(Utils.uLong2Array(this.height))
      .concat([8, 3, 0, 0, 0])
    );
  }

  /**
   * write PLTE chunk
   */
  PLTE() {
    return makeChunk(
      'PLTE'.split('').map(s => s.charCodeAt(0))
      .concat(this.palette.reduce(
        (p, q) => p.concat(q.slice(0, 3)), []
      ))
    );
  }

  /**
   * write tRNS chunk
   */
  tRNS() {
    return makeChunk(
      'tRNS'.split('').map(s => s.charCodeAt(0))
      .concat(this.palette.map(p => p[4]))
    );
  }
  
  /**
   * write IDAT chunk
   */
  IDAT() {
    let data = [];
    for (let i = 0; i < this.height; i++) {
      const startIndex = i * this.height;
      data = data.concat(
        // filter method is always 0
        [0].concat(this.indexes.slice(startIndex, startIndex + this.width))
      );
    }
    data = Array.from(zlib.deflateSync(Buffer.from(data), {
      windowBits: 15
    }));
    return makeChunk('IDAT'.split('').map(s => s.charCodeAt(0)).concat(data));
  }

  /**
   * write IEND chunk
   */
  IEND() {
    return [
      '00', '00', '00', '00', 
      '49', '45', '4e', '44', 
      'ae', '42', '60', '82'
    ].map(s => parseInt(s, 16));
  }
}

module.exports = PNGWriter;
