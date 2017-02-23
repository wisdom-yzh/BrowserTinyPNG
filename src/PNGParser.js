const ChunkParser = require('./ChunkParser');
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
 * @class PNGParser
 * @see ChunkParser
 * @desc parse a png image 
 */
class PNGParser extends ChunkParser {
	
	/**
	 * Init with png stream
	 * @param {ArrayBuffer} buffer PNG File Stream
	 * @return {PNGParser}
	 */
	constructor(buffer) {
		super();
		return this.setBuffer(buffer);
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
			throw new Error('Check signiture fail! Not a PNG');
		}

		try {

			// Get all chunks from array buffer
			const chunkIterator = new ChunkIterator(this.buffer.slice(PNG_SIGNITURE.length));
			const chunks = [];

			// Parse chunks one by one
			for (const chunk of chunkIterator) {
				
				const chunkData = this.imageData[chunk.chunkName];
				const newChunkData = this.parseChunk(chunk);

				if (typeof chunkData == 'undefined') {
					this.imageData[chunk.chunkName] = newChunkData;
				} else if (!Array.isArray(chunkData)) {
					this.imageData[chunk.chunkName] = [chunkData, newChunkData];
				} else {
					this.imageData[chunk.chunkName].push(newChunkData);
				}
			}
			this.parsed = true;

		} catch (e) {
			this.parsed = false;
			console.log(e.message);
		}

		console.log(this.imageData);
		return this.imageData;
	}
}

module.exports = PNGParser;
