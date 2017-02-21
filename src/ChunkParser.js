const zlib = require('browserify-zlib/src');

/**
 * define dependences for chunk parser 
 */
const DEPENDENCES = {
		IHDR: [],
		PLTE: ['iCCP', 'sRGB', 'sBIT', 'gAMA', 'cHRM'],
		IDAT: [
			'pHYs', 'sPLT', 'tRNS', 'iCCP', 'sRGB', 
			'sBIT', 'gAMA', 'hIST', 'bKGD', 'cHRM'
		],
		IEND: ['IDAT', 'tIME', 'zTXt', 'tEXt', 'iTXt'],
		tRNS: [],
		cHRM: [],
		gAMA: [],
		iCCP: [],
		sBIT: [],
		sRGB: [],
		iTXt: [],
		tEXt: [],
		zTXt: [],
		bKGD: [],
		hIST: [],
		pHYs: [],
		sPLT: [],
		tIME: []
};

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
const ALLOWED_BIT_DEPTHS = {
	GREYSCALE           : [1, 2, 4, 8, 16], 
	TRUECOLOR           : [8, 16],
	INDEXED_COLOR       : [1, 2, 4, 8],
	GREYSCALE_WITH_ALPHA: [8, 16],
	TRUECOLOR_WITH_ALPHA: [8, 16]
};

/**
 * Chunk data parser
 */
class ChunkParser {

	/**
	 * init an empty imageData
	 */
	constructor() {
		this.imageData = {};
	}

	/**
	 * parse a chunk
	 * @param {Chunk} chunk
	 * @return {*}
	 */
	parseChunk(chunk) {

		if (!chunk || !chunk.chunkName) {
			throw new Error('illegal chunk!');
		}
		if (!this[chunk.chunkName]) {
			throw new Error(`parser for ${chunk.chunkName} is not realized`);
		}

		// check dependences
		if (DEPENDENCES[chunk.chunkName].length) {
			let findDependences = false;
			for (const value of DEPENDENCES[chunk.chunkName]) {
				if (this.imageData[value]) {
					findDependences = true;
					break;
				}
			}
			if (!findDependences) {
				throw new Error(`${chunk.chunkName} lacks dependences`);
			}
		}

		return this[chunk.chunkName](chunk.chunkData);
	}

	/**
	 * IHDR
	 * @param {ArrayBuffer} buffer
	 * @return {
	 *   width          : uint32,
	 *   height         : uint32,
	 *   bitDepth       : uint8,
	 *   colorType      : uint8,
	 *   compressMethod : uint8,
	 *   interlaceMethod: uint8
	 * }
	 */
	IHDR(buffer) {

		if (buffer.byteLength != 13) {
			throw new Error('IHDR length error!');
		}

		const dataView = new DataView(buffer);
		const width = dataView.getUint32(0);
		const height = dataView.getUint32(4);

		const colorType = dataView.getUint8(9);
		const imageType = COLOR_TYPE[colorType];
		if (typeof imageType == 'undefined') {
			throw new Error('imageType illegal');
		}

		const bitDepth = dataView.getUint8(8);
		if (ALLOWED_BIT_DEPTHS[imageType].indexOf(bitDepth) == -1) {
			throw new Error('bit depths illegal');
		}

		const compressMethod = dataView.getUint8(10);
		const filterMethod = dataView.getUint8(11);
		const interlaceMethod = dataView.getUint8(12);

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
	};

	/**
	 * PLTE
	 * @param {ArrayBuffer} buffer
	 * @return { 
	 *   palette: Array
	 * }
	 */
	PLTE(buffer) {

		if (buffer.byteLength % 3 != 0) {
			throw new Error('PLTE length error!');
		}

		const arr = new Uint8Array(buffer);
		const palette = [];

		while (i != arr.length) {
			palette.push((arr[i] << 16) + 
									 (arr[i + 1] << 8) + 
									 (arr[i + 2]));
			i += 3;
		}
		return { palette };
	};

	/**
	 * IDAT
	 * @param {ArrayBuffer} buffer
	 * @return {
	 *   
	 * }
	 */
	IDAT(buffer) {

		return {};
	};

	/**
	 * IEND
	 * @param {ArrayBuffer} buffer
	 */
	IEND(buffer) {
		return {};
	};

	/**
	 * tRNS
	 * @param {ArrayBuffer} buffer
	 */
	tRNS(buffer) {
		
		return {};
	};

	/**
	 * cHRM
	 * @param {ArrayBuffer} buffer
	 */
	cHRM(buffer) {
		
		return {};
	};

	/**
	 * gAMA
	 * @param {ArrayBuffer} buffer
	 */
	gAMA(buffer) {
		
		return {};
	};

	/**
	 * iCCP
	 * @param {ArrayBuffer} buffer
	 */
	iCCP(buffer) {
		
		return {};
	};

	/**
	 * sBIT
	 * @param {ArrayBuffer} buffer
	 */
	sBIT(buffer) {
		
		return {};
	};

	/**
	 * sRGB
	 * @param {ArrayBuffer} buffer
	 */
	sRGB(buffer) {
		
		return {};
	};

	/**
	 * iTXt
	 * @param {ArrayBuffer} buffer
	 */
	iTXt(buffer) {
		
		return {};
	};

	/**
	 * tEXt 
	 * @param {ArrayBuffer} buffer
	 */
	tEXt(buffer) {
		
		return {};
	};
	
	/**
	 * zTXt 
	 * @param {ArrayBuffer} buffer
	 */
	zTXt(buffer) {
		
		return {};
	};

	/**
	 * bKGD 
	 * @param {ArrayBuffer} buffer
	 */
	bKGD(buffer) {
		
		return {};
	};

	/**
	 * hIST 
	 * @param {ArrayBuffer} buffer
	 */
	hIST(buffer) {
		
		return {};
	};

	/**
	 * pHYs 
	 * @param {ArrayBuffer} buffer
	 */
	pHYs(buffer) {
		
		return {};
	};

	/**
	 * sPLT 
	 * @param {ArrayBuffer} buffer
	 */
	sPLT(buffer) {
		
		return {};
	}
}

module.exports = ChunkParser;
