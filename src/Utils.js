const CRC32 = require('crc-32');

/**
 *  uInt8Arr2String
 *  @desc convert a Uint8Array to String
 *  @param {Uint8Array} uint8Array 
 *  @return {String}
 */
const uInt8Arr2String = (uint8Array) => {
  if (typeof TextDecoder != 'undefined') {
    return new window.TextDecoder('utf-8').decode(uint8Array);
  }
  return Array.from(uint8Array)
    .map((value) => String.fromCharCode(value))
    .reduce((first, next) => first + next);
}

/**
 * uLong2Array
 * @desc convert uint32 to array(4)
 * @param {Number} uint32
 * @return {Array}
 */
const uLong2Array = (uint32) => {
  const dataView = new DataView(new ArrayBuffer(4));
  dataView.setUint32(0, uint32);
  const ret = [];
  for (let i = 0; i < 4; i++) {
    ret.push(dataView.getUint8(i));
  }
  return ret;
}

/**
 * convert rgb to int32
 */
const rgb2int = (r, g, b) => (r << 16) + (g << 8) + b;

/**
 * generate crc32 integer
 * @param {Uint8Array} chunkData
 * @return {Number}
 */
const generateCrc = (chunkData) => uLong2Array(CRC32.buf(chunkData));

/**
 * check crc
 * @param {Number} crc
 * @param {Uint8Array} chunkData
 */
const checkCrc = (crc, chunkData) => CRC32.buf(chunkData) == crc;

module.exports = {
  uInt8Arr2String,
  uLong2Array,
  rgb2int,
  generateCrc,
  checkCrc,
}
