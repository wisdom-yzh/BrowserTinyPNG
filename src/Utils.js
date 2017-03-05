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

module.exports = {
  uInt8Arr2String,
}
