const Utils = require('./Utils');
const ChunkParser = require('./ChunkParser');

/**
 * @class Chunk 
 * @desc struct {
 *	String      chunkName;
 *  ArrayBuffer chunkData;
 *  Uint32      crc
 * }
 */
class Chunk {

	/**
	 * Construct a chunk structure from ArrayBuffer
	 * @param {ArrayBuffer} buffer
	 * @return void
	 */
	constructor(buffer) {

		if (!buffer) {
			throw new Error('buffer为空');
		}

		const dataView = new DataView(buffer);
		const dataSize = dataView.getUint32(0);
		const chunkName = Chunk.getChunkName(buffer.slice(4, 8));
		const chunkData = buffer.slice(8, 8 + dataSize);
		const crc = dataView.getUint32(8 + dataSize);
	
		this.chunkName = chunkName;
		this.chunkData = chunkData;
		this.crc = crc;

		if (!this.checkCrc()) {
			throw new Error('crc32 fail! 数据损坏!');
		}
	}

	/**
	 * TODO: Check chunk data by crc32
	 * @return bool
	 */
	checkCrc() {
		return true;
	}

	/**
	 * Get ascii chunk name from buffer
	 * @param {ArrayBuffer} buffer
	 * @return {String}
	 */
	static getChunkName(buffer) {

		const chunkNameBuffer = new Uint8Array(buffer);
		const chunkName = Utils.uInt8Arr2String(chunkNameBuffer);
		if (Chunk.VALID_CHUNK_NAME.indexOf(chunkName) == -1) {
			throw new Error(`illegal ChunkName:${chunkName}`);
		}

		return chunkName;
	}
}

/**
 * Valid chunk name in png
 */
Chunk.VALID_CHUNK_NAME = [
	'IHDR', 'PLTE', 'IDAT', 'IEND',
	'tRNS', 'cHRM', 'gAMA', 'iCCP', 'sBIT', 'sRGB',
	'iTXt', 'tEXt', 'zTXt',
	'bKGD', 'hIST', 'pHYs', 'sPLT',
	'tIME'
];

module.exports = Chunk;
