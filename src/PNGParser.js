const Buffer = require('buffer').Buffer;
const zlib = require('zlib');
const ChunkParser = require('./ChunkParser');
const ChunkIterator = require('./ChunkIterator');
const Pixel = require('./Pixel');
const DecoderFactory = require('./DecoderFactory');
const { PNG_SIGNITURE } = require('./Constants');

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
	 * @return {*}
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
				} else if (chunk.chunkName == 'IDAT') {
					const oldData = this.imageData[chunk.chunkName].data;
					const newData = new Uint8Array(
						Array.from(oldData).concat(Array.from(newChunkData.data))
					);
					this.imageData[chunk.chunkName].data = newData;
				}
			}

			this.decompressImageData();
			this.parsed = true;

		} catch (e) {
			this.parsed = false;
			console.log(e.message);
		}

		return this.imageData;
	}

	/**
	 * decompress image content
	 */
	decompressImageData() {
		
		let chunkSize = 0xffff, data;
		while (true) {
			try {
				data = zlib.inflateSync(Buffer.from(this.imageData['IDAT'].data), {
					chunkSize: chunkSize,
					windowBits: 15
				});
				break;
			}
			catch (e) {
				if (e.code == 'Z_BUF_ERROR') chunkSize <<= 1;
				else {
					console.log(e.message);
				}
			}
		}

		delete this.imageData['IDAT'].data;
		this.imageData['IDAT'].data = data;
		return data;
	}

	/**
	 * decode image
	 */
	decodeImageData() {

		const originData = this.imageData['IDAT'].data;
		const width = this.imageData['IHDR'].width;
		const height = this.imageData['IHDR'].height;
		const imageType = this.imageData['IHDR'].imageType;
		const ptr = 0;

		while (ptr < originData.length) {
			originData[ptr]++;
			ptr++;
		}
	}
}

module.exports = PNGParser;
