const Chunk = require('./Chunk');

/**
 * @class ChunkIterator
 * @desc Split all the chunks from a png buffer
 */
class ChunkIterator {

  [Symbol.iterator]() {
    return this;
  }

  constructor(buffer) {
    this.buffer = buffer;
  }

  next() {
    if (!this.buffer.byteLength) {
      return {
        done: true,
        value: null
      };
    }

    // get chunk data size
    const dataView = new DataView(this.buffer);
    const chunkDataLength = dataView.getUint32(0);

    // crc: 4bytes, chunkSize: 4bytes, chunkName: 4bytes
    const chunkLength = chunkDataLength + 12;

    // create chunk data structure 
    const currentChunk = new Chunk(this.buffer.slice(0, chunkLength));

    // renew buffer offset
    this.buffer = this.buffer.slice(chunkLength);

    return {
      done: false,
      value: currentChunk
    };
  }
}

module.exports = ChunkIterator;
