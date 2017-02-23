const zlib = require('browserify-zlib/src');
const Utils = require('./Utils')

/**
 * define dependences for chunk parser 
 */
const DEPENDENCES = {
		IHDR: [],
		PLTE: ['IHDR', 'iCCP', 'sRGB', 'sBIT', 'gAMA', 'cHRM'],
		IDAT: [
			'pHYs', 'sPLT', 'tRNS', 'iCCP', 'sRGB', 
			'sBIT', 'gAMA', 'hIST', 'bKGD', 'cHRM'
		],
		IEND: ['IDAT', 'tIME', 'zTXt', 'tEXt', 'iTXt'],
		tRNS: ['PLTE'],
		cHRM: ['IHDR'],
		gAMA: ['IHDR'],
		iCCP: ['IHDR'],
		sBIT: ['IHDR'],
		sRGB: ['IHDR'],
		iTXt: ['IHDR'],
		tEXt: ['IHDR'],
		zTXt: ['IHDR'],
		bKGD: ['PLTE'],
		hIST: ['PLTE'],
		pHYs: ['IHDR'],
		sPLT: ['IHDR'],
		tIME: ['IHDR']
};

/**
 * Valid image type and their color type value
 */
const COLOR_TYPE = {
	 0: 'GREYSCALE',
	 2: 'TRUECOLOR',
	 3: 'INDEXED_COLOR',
	 4: 'GREYSCALE_WITH_ALPHA',
	 6: 'TRUECOLOR_WITH_ALPHA'
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
	}

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

		let i = 0;
		while (i != arr.length) {
			palette.push((arr[i] << 16) + 
									 (arr[i + 1] << 8) + 
									 (arr[i + 2]));
			i += 3;
		}
		return { palette };
	}

	/**
	 * IDAT
	 * @param {ArrayBuffer} buffer
	 * @return {
	 *   
	 * }
	 */
	IDAT(buffer) {

		return {};
	}

	/**
	 * IEND
	 * @param {ArrayBuffer} buffer
	 * @return {}
	 */
	IEND(buffer) {
		return {};
	}

	/**
	 * tRNS
	 * @param {ArrayBuffer} buffer
	 * @return { 
	 *   greySample: uint16 |
	 *   rSample: uint16, gSample: uint16, bSample: uint16 |
	 *   paletteAlpha: Array
	 * }
	 */
	tRNS(buffer) {

		const IHDR = this.imageData.IHDR;
		const imageType = IHDR.imageType;
		const len = buffer.byteLength;
		const arr = new DataView(buffer);

		switch (imageType) {
			case 'GREYSCALE':
				if (len != 2) {
					throw new Error(`tRNS length error [tRNS=${len},imageType=${imageType}`);
				}
				const greySample = arr.getUint16(0);
				return { greySample };
			case 'TRUECOLOR':
				if (len != 6) {
					throw new Error(`tRNS length error [tRNS=${len},imageType=${imageType}]`);
				}
				return { rSample, gSample, bSample };
			case 'INDEXED_COLOR':
				const PLTE = this.imageData.PLTE;
				if (typeof PLTE == 'undefined') {
					throw new Error(`tRNS without PLTE`);
				}
				const paletteLength = PLTE.palette.length;
				if (paletteLength < len) {
					throw new Error(`tRNS length error [tRNS=${len},paletteLength=${paletteLength}]`);
				}
				const paletteAlpha = new Uint8Array(buffer);
				return { paletteAlpha };
			default:
				throw new Error(`tRNS not suitable for imageType:${imageType}`);
		}
	}

	/**
	 * cHRM
	 * @param {ArrayBuffer} buffer
	 * @return {
	 *  'whitePointX',
	 *  'whitePointY',
	 *  'redX',
	 *  'redY',
	 *  'greenX',
	 *  'greenY',
	 *  'blueX',
	 *  'blueY'
	 * }
	 */
	cHRM(buffer) {
		
		if (buffer.byteLength != 32) {
			throw new Error(`cHRM length error [cHRM=${buffer.byteLength}]`);
		}

		const dataView = new DataView(buffer);
		const keys = [
			'whitePointX',
			'whitePointY',
			'redX',
			'redY',
			'greenX',
			'greenY',
			'blueX',
			'blueY'
		]
		const ret = {};
		for (const index in keys) {
			ret[keys[index]] = dataView.getUint32(index * 4);
		}
		return ret;
	}

	/**
	 * gAMA
	 * @param {ArrayBuffer} buffer
	 * @return { imageGama: uint32 }
	 */
	gAMA(buffer) {
		
		if (buffer.byteLength != 4) {
			throw new Error(`gAMA length error [gAMA=${buffer.byteLength}]`);
		}
		const dataView = new DataView(buffer);
		return { imageGama : dataView.getUint32(0) };
	}

	/**
	 * iCCP
	 * @param {ArrayBuffer} buffer
	 * @return {
	 *   profileName: string
	 *   compressMethod: uint8
	 *   compressedProfile: string
	 * }
	 */
	iCCP(buffer) {

		const bufferArray = new Uint8Array(buffer);
		const firstNullIndex = bufferArray.indexOf(0);
		if (firstNullIndex == -1) {
			throw new Error('iCCP profile not found!');
		}

		const profileNameArr = bufferArray.slice(0, firstNullIndex);
		const profileName = Utils.uInt8Arr2String(profileNameArr);
		const compressMethod = bufferArray[firstNullIndex + 1];
		const compressedProfileArr = bufferArray.slice(firstNullIndex + 2);
		const compressedProfile = Utils.uInt8Arr2String(compressedProfileArr);
		const profile = Utils.uInt8Arr2String(
			zlib.inflateSync(compressedProfile, {
				windowBits: 15,
			})
		);
		return {
			profileName,
			compressMethod,
			compressedProfile,
			profile
		};
	}

	/**
	 * sBIT
	 * @param {ArrayBuffer} buffer
	 * @param {*}
	 */
	sBIT(buffer) {
		
		const IHDR = this.imageData.IHDR;
		const imageType = IHDR.imageType;
		const len = buffer.byteLength;
		const dataArr = new Uint8Array(buffer);
		
		switch (imageType) {
			case 'GREYSCALE':
				if (len != 1) {
					throw new Error(`sBit length error [tRNS=${len},imageType=${imageType}`);
				}
				return { 
					significantGreyscaleBits: dataArr[0] 
				};
			case 'TRUECOLOR':
			case 'INDEXED_COLOR':
				if (len != 3) {
					throw new Error(`sBit length error [tRNS=${len},imageType=${imageType}`);
				}
				return {
					significantRedBits: dataArr[0],
					significantGreenBits: dataArr[1],
					significantBlueBits: dataArr[2]
				};
			case 'GREYSCALE_WITH_ALPHA':
				if (len != 2) {
					throw new Error(`sBit length error [tRNS=${len},imageType=${imageType}`);
				}
				return {
					significantGreyscaleBits: dataArr[0],
					significantAlphaBits: dataArr[1]
				};
			case 'TRUECOLOR_WITH_ALPHA':
				if (len != 4) {
					throw new Error(`sBit length error [tRNS=${len},imageType=${imageType}`);
				}
				return {
					significantRedBits: dataArr[0],
					significantGreenBits: dataArr[1],
					significantBlueBits: dataArr[2],
					significantAlphaBits: dataArr[3]
				};
			default:
				throw new Error(`sBit not suitable for imageType=${imageType}`);
		}
	}

	/**
	 * sRGB
	 * @param {ArrayBuffer} buffer
	 */
	sRGB(buffer) {
		
		if (buffer.byteLength != 1) {
			throw new Error(`sRGB length != 1 [sRGB=${buffer.byteLength}]`);
		}

		const data = new Uint8Array(buffer);
		return { renderingIntent: data[0] };
	}

	/**
	 * iTXt
	 * @param {ArrayBuffer} buffer
	 */
	iTXt(buffer) {
		
		return {};
	}

	/**
	 * tEXt 
	 * @param {ArrayBuffer} buffer
	 */
	tEXt(buffer) {
		
		return {};
	}
	
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
