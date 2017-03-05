const BaseDecoder = require('./BaseDecoder');

class RGBDecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('TRUECOLOR', imageWidth, imageHeight, imageData);
  }
}

module.exports = RGBDecoder;
