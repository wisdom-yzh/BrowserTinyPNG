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
		const chunkName = Chunk.getChunkName(buffer);
		const chunkData = buffer.slice(8, 8 + dataSize);
		const crc = new dataView.getUint32(buffer, 8 + dataSize, 4);
	
		this.chunkName = chunkName;
		this.chunkData = chunkData;
		this.crc = crc;
	}

	/**
	 * Parse the chunk data by ChunkParser
	 * @return {*}
	 */
	parse() {

		if (!this.chunkData || !this.chunkData.length) {
			throw new Error('ChunkData is empty');
		}
		if (typeof ChunkParser[this.chunkName] == 'undefined') {
			throw new Error(`ChunkName:${this.chunkName} is unavailable`);
		}

		return ChunkParser[this.chunkName](this.chunkData);
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

		if (chunkName.indexOf(Chunk.CHUNK_NAME) == -1) {
			throw new Error(`不合法的ChunkName:${chunkName}`);
		}

		return chunkName;
	}

	/**
	 * TODO: Check chunk data by crc32
	 * @return bool
	 */
	static checkCrc() {
		return true;
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

export default Chunk;
