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
  const uint8Array = [];
  while (uint32 > 0) {
    uint8Array.push(uint32 & 0xff);
    uint32 >>= 8;
  }
  return uint8Array.reverse();
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
const generateCrc = (chunkData) => {
  const crc32Value = CRC32.buf(chunkData);
  const dataView = new DataView(new ArrayBuffer(4));
  dataView.setInt32(0, crc32Value);
  const crc32 = [];
  for (let i = 0; i < 4; i++) {
    crc32.push(dataView.getUint8(i));
  }
  return crc32;
}

/**
 * check crc
 * @param {Number} crc
 * @param {Uint8Array} chunkData
 */
const checkCrc = (crc, chunkData) => {
  return CRC32.buf(chunkData) == crc;
}

module.exports = {
  uInt8Arr2String,
  uLong2Array,
  rgb2int,
  generateCrc,
  checkCrc,
}
