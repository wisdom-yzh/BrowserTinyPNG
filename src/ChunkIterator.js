const Chunk = require('./Chunk');

/**
 * @class ChunkIterator
 * @desc Split all the chunks from a png buffer
 */
class ChunkIterator {

	[Symbol.iterator]() {
		return this;
	}

	constructor(buffer) {
		this.buffer = buffer;
	}

	next() {
		
		// get chunk data size
		const dataView = new DataView(this.buffer);
		const byteLength = dataView.getUint32(0);

		// create chunk data structure 
		// crc:4bytes, chunkSize:4bytes, chunkName: 4bytes
		const currentChunk = new Chunk(this.buffer.slice(0, byteLength + 12));

		// renew buffer offset
		this.buffer = this.buffer.slice(byteLength);

		return {
			done: this.buffer.byteLength < 12,
			value: currentChunk
		};
	}
}

module.exports = ChunkIterator;
