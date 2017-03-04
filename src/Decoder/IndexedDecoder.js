const BaseDecoder = require('./BaseDecoder');
const { IndexedPixel } = require('../Pixel');

class IndexedDecoder extends BaseDecoder {

	/**
	 * init a indexed decoder
	 * paletteAlpha may be from tRNS chunk
	 */
	constructor(imageWidth, imageHeight, imageData, {palette, paletteAlpha}) {

		super('INDEXED_COLOR', imageWidth, imageHeight, imageData);
		if (!Array.isArray(palette)) {
			throw new Error('palette is not valid');
		}
		if (!paletteAlpha instanceof Uint8Array && 
				typeof paletteAlpha != 'undefined') {
			throw new Error('paletteAlpha is not valid');
		}

		this.paletteAlpha = paletteAlpha;
		this.palette = palette;
	}

	/**
   * @override
   */
	getPixel() {

		const index = this.imageData[this.ptr];
		return new IndexedPixel(index, this.palette, this.paletteAlpha);
	}
}

module.exports = IndexedDecoder;
