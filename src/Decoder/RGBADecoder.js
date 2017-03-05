const BaseDecoder = require('./BaseDecoder');

class RGBADecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('TRUECOLOR_WITH_ALPHA', imageWidth, imageHeight, imageData);
  }
}

module.exports = RGBADecoder;
