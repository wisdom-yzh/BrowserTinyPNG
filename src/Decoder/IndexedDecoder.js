const BaseDecoder = require('./BaseDecoder');

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
		if (!Array.isArray(paletteAlpha) && typeof paletteAlpha != 'undefined') {
			throw new Error('paletteAlpha is not valid');
		}

		this.paletteAlpha = paletteAlpha;
		this.palette = palette;
	}

	decode() {
		
		
	}
}

module.exports = IndexedDecoder;
