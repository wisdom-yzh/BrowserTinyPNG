/**
 * chunk data 解析
 */
const ChunkParser = {

	/**
	 * IHDR
	 * @param Uint8Array buffer
	 */
	IHDR: function(buffer) {
		return {

		}
	},

	/**
	 * PLTE
	 * @param Uint8Array buffer
	 * {
	 * }
	 */
	PLTE: function(buffer) {
		
	},

	/**
	 * IDAT
	 * @param Uint8Array buffer
	 * @return {
	 *   
	 * }
	 */
	IDAT: function(buffer) {
		
	},

	/**
	 * IEND
	 * @param Uint8Array buffer
	 */
	IEND: function(buffer) {
		return {};
	},

	/**
	 * tRNS
	 * @param Uint8Array buffer
	 */
	tRNS: function(buffer) {
		
	},

	/**
	 * cHRM
	 * @param Uint8Array buffer
	 */
	cHRM: function(buffer) {
		
	},

	/**
	 * gAMA
	 * @param Uint8Array buffer
	 */
	gAMA: function(buffer) {
		
	},

	/**
	 * iCCP
	 * @param Uint8Array buffer
	 */
	iCCP: function(buffer) {
		
	},

	/**
	 * sBIT
	 * @param Uint8Array buffer
	 */
	sBIT: function(buffer) {
		
	},

	/**
	 * sRGB
	 * @param Uint8Array buffer
	 */
	sRGB: function(buffer) {
		
	},

	/**
	 * iTXt
	 * @param Uint8Array buffer
	 */
	iTXt: function(buffer) {
		
	}

	/**
	 * tEXt 
	 * @param Uint8Array buffer
	 */
	tEXt: function(buffer) {
		
	}
	
	/**
	 * zTXt 
	 * @param Uint8Array buffer
	 */
	zTXt: function(buffer) {
		
	}

	/**
	 * bKGD 
	 * @param Uint8Array buffer
	 */
	bKGD: function(buffer) {
		
	}

	/**
	 * hIST 
	 * @param Uint8Array buffer
	 */
	hIST: function(buffer) {
		
	}

	/**
	 * pHYs 
	 * @param Uint8Array buffer
	 */
	pHYs: function(buffer) {
		
	}

	/**
	 * sPLT 
	 * @param Uint8Array buffer
	 */
	sPLT: function(buffer) {
		
	}
}

export default ChunkParser;
