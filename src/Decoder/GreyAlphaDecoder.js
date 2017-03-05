const BaseDecoder = require('./BaseDecoder');

class GreyAlphaDecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('GREYSCALE_WITH_ALPHA', imageWidth, imageHeight, imageData);
  }
}

module.exports = GreyAlphaDecoder;
