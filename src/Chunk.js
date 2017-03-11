const Utils = require('./Utils');
const ChunkParser = require('./ChunkParser');
const { VALID_CHUNK_NAME } = require('./Constants');

/**
 * @class Chunk 
 * @desc struct {
 *	String      chunkName;
 *  ArrayBuffer chunkData;
 *  Uint32      crc
 * }
 */
class Chunk {

  /**
   * Construct a chunk structure from ArrayBuffer
   * @param {ArrayBuffer} buffer
   * @return void
   */
  constructor(buffer) {
    if (!buffer) {
      throw new Error('buffer为空');
    }
    const dataView = new DataView(buffer);
    const dataSize = dataView.getUint32(0);
    const chunkName = Chunk.getChunkName(buffer.slice(4, 8));
    const chunkData = buffer.slice(8, 8 + dataSize);
    const crc = dataView.getInt32(8 + dataSize);

    this.chunkName = chunkName;
    this.chunkData = chunkData;
    this.crc = crc;

    if (!Utils.checkCrc(this.crc, new Uint8Array(buffer.slice(4, 8 + dataSize)))) {
      throw new Error('crc32 fail! 数据损坏!');
    }
  }

  /**
   * Get ascii chunk name from buffer
   * @param {ArrayBuffer} buffer
   * @return {String}
   */
  static getChunkName(buffer) {
    const chunkNameBuffer = new Uint8Array(buffer);
    const chunkName = Utils.uInt8Arr2String(chunkNameBuffer);
    if (VALID_CHUNK_NAME.indexOf(chunkName) == -1) {
      throw new Error(`illegal ChunkName:${chunkName}`);
    }
    return chunkName;
  }
}

module.exports = Chunk;
