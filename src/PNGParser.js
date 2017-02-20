const zlib = require('browserify-zlib/src');
const Chunk = require('./Chunk');
const ChunkIterator = require('./ChunkIterator');

/** @const PNG_SIGNITURE */
const PNG_SIGNITURE = [137, 80, 78, 71, 13, 10, 26, 10];

/**
 * Check PNG Signiture
 * @param {ArrayBuffer} buffer
 * @return {boolean}
 */
const checkPNGSigniture = (buffer) => {
	const signitureArray = new Uint8Array(buffer.slice(0, 8));
	return PNG_SIGNITURE.map(
		(value, key) => value - parseInt(signitureArray[key])
	).filter(
		value => value != 0
	).length == 0;
}

/**
 * Get all chunks from a array buffer
 * @param {ArrayBuffer} buffer
 * @return {Array}
 */
const getAllChunks = (buffer) => {
	const chunks = [];
	const iterator = new ChunkIterator(buffer);
	chunks.push();

	return chunks;
}

/**
 * @class PNGParser
 * @desc parse a png image 
 */
class PNGParser {
	
	/**
	 * Init with png stream
	 * @param {ArrayBuffer} buffer PNG File Stream
	 * @return {PNGParser}
	 */
	constructor(buffer) {
		return setBuffer(buffer);
	}

	/**
	 * Set image buffer stream
	 * @param {ArrayBuffer} buffer PNG File Stream
	 * @return {PNGParser}
	 */
	setBuffer(buffer) {

		if (!buffer || !buffer.byteLength) {
			throw new Error('传入buffer为空!');
		}

		this.buffer = buffer;
		this.parsed = false;
		this.imageData = {};
		return this;
	}

	/**
	 * Get source buffer data
	 * @return {ArrayBuffer}
	 */
	getBuffer() {
		return this.buffer;
	}

	/**
	 * Parse the image data
	 * @param {*}
	 */
	parse() {

		if (this.parsed) {
			return this.imageData;
		}

		if (!checkPNGSigniture(this.buffer)) {
			throw new Error('Check signiture fail! 不是PNG类型的文件');
		}

		try {
			// get all valid chunks
			const chunks = getAllChunks(this.buffer.slice(PNG_SIGNITURE.length));

		} catch (e) {
			console.log(e.message);
		}
	}
}

export default PNGParser;
