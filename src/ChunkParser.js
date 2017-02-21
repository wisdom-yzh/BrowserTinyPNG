const zlib = require('browserify-zlib/src');

/**
 * Valid image type and their color type value
 */
const COLOR_TYPE = {
	 0: 'GREYSCALE',
	 2: 'TRUECOLOR',
	 3: 'INDEXED_COLOR',
	 4: 'GREYSCALE_WITH_ALPHA',
	 5: 'TRUECOLOR_WITH_ALPHA'
};

/**
 * Allowed bit depths for different kind of image type
 */
const ALLOWED_BIT_DEPTHS = [
	[1, 2, 4, 8, 16],
	[],
	[8, 16],
	[1, 2, 4, 8],
	[8, 16],
	[8, 16]
];

/**
 * chunk data parser
 */
const ChunkParser = {

	/**
	 * IHDR
	 * @param {ArrayBuffer} buffer
	 * @return {
	 *   width,
	 *   height,
	 *   bitDepth,
	 *   colorType,
	 *   compressMethod,
	 *   interlaceMethod
	 * }
	 */
	IHDR: (buffer) => {

		if (buffer.byteLength != 13) {
			throw new Error('IHDR length error!');
		}

		const dataView = new DataView(buffer);
		const width = dataView.getUint32(buffer, 0);
		const height = dataView.getUint32(buffer, 4);

		const colorType = dataView.getUint8(buffer, 9);
		const imageType = COLOR_TYPE[colorType];
		if (typeof imageType == 'undefined') {
			throw new Error('imageType illegal');
		}

		const bitDepth = dataView.getUint8(buffer, 8);
		if (ALLOWED_BIT_DEPTHS[imageType].indexOf(bitDepth)) {
			throw new Error('bit depths illegal');
		}

		const compressMethod = dataView.getUint8(buffer, 10);
		const filterMethod = dataView.getUint8(buffer, 11);
		const interlaceMethod = dataView.getUint8(buffer, 12);

		return {
			imageType,
			width,
			height,
			bitDepth,
			colorType,
			compressMethod,
			filterMethod,
			interlaceMethod
		}
	},

	/**
	 * PLTE
	 * @param {ArrayBuffer} buffer
	 * @return {Array}
	 */
	PLTE: (buffer) => {

		if (buffer.byteLength % 3 != 0) {
			throw new Error('PLTE length error!');
		}

		const arr = new Uint8Array(buffer);
		const palette = [];

		while (i != arr.length) {
			palette.push(arr[i] << 16 + arr[i + 1] << 8 + arr[i + 2]);
			i += 3;
		}
		return palette;
	},

	/**
	 * IDAT
	 * @param {ArrayBuffer} buffer
	 * @return {
	 *   
	 * }
	 */
	IDAT: (buffer) => {
		
	},

	/**
	 * IEND
	 * @param {ArrayBuffer} buffer
	 */
	IEND: (buffer) => {
		return {};
	},

	/**
	 * tRNS
	 * @param {ArrayBuffer} buffer
	 */
	tRNS: (buffer) => {
		
	},

	/**
	 * cHRM
	 * @param {ArrayBuffer} buffer
	 */
	cHRM: (buffer) => {
		
	},

	/**
	 * gAMA
	 * @param {ArrayBuffer} buffer
	 */
	gAMA: (buffer) => {
		
	},

	/**
	 * iCCP
	 * @param {ArrayBuffer} buffer
	 */
	iCCP: (buffer) => {
		
	},

	/**
	 * sBIT
	 * @param {ArrayBuffer} buffer
	 */
	sBIT: (buffer) => {
		
	},

	/**
	 * sRGB
	 * @param {ArrayBuffer} buffer
	 */
	sRGB: (buffer) => {
		
	},

	/**
	 * iTXt
	 * @param {ArrayBuffer} buffer
	 */
	iTXt: (buffer) => {
		
	},

	/**
	 * tEXt 
	 * @param {ArrayBuffer} buffer
	 */
	tEXt: (buffer) => {
		
	},
	
	/**
	 * zTXt 
	 * @param {ArrayBuffer} buffer
	 */
	zTXt: (buffer) => {
		
	},

	/**
	 * bKGD 
	 * @param {ArrayBuffer} buffer
	 */
	bKGD: (buffer) => {
		
	},

	/**
	 * hIST 
	 * @param {ArrayBuffer} buffer
	 */
	hIST: (buffer) => {
		
	},

	/**
	 * pHYs 
	 * @param {ArrayBuffer} buffer
	 */
	pHYs: (buffer) => {
		
	},

	/**
	 * sPLT 
	 * @param {ArrayBuffer} buffer
	 */
	sPLT: (buffer) => {
		
	}
}

module.exports = ChunkParser;
