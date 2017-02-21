const ChunkParser = require('./ChunkParser');

/**
 * @class Chunk 
 * @desc struct {
 *	String      chunkName;
 *  ArrayBuffer chunkData;
 *  Uint32      crc
 *  {*}         parsedData;
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
		const crc = dataView.getUint32(buffer, 8 + dataSize, 4);
	
		this.chunkName = chunkName;
		this.chunkData = chunkData;
		this.crc = crc;

		if (!this.checkCrc()) {
			throw new Error('crc32 fail! 数据损坏!');
		}
	}

	/**
	 * Parse the chunk data by ChunkParser
	 * @return {*}
	 */
	parse() {

		if (!this.parsedData) {
			
			if (!this.chunkData || !this.chunkData.length) {
				throw new Error('ChunkData is empty');
			}
			if (typeof ChunkParser[this.chunkName] == 'undefined') {
				throw new Error(`ChunkName:${this.chunkName} is unavailable`);
			}

			this.parsedData = ChunkParser[this.chunkName](this.chunkData);
		}

		return this.parsedData;
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
		const chunkName = Array.from(chunkNameBuffer)
			.map(value => String.fromCharCode(value))
			.reduce((first, next) => first + next);

		if (Chunk.VALID_CHUNK_NAME.indexOf(chunkName) == -1) {
			throw new Error(`不合法的ChunkName:${chunkName}`);
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
