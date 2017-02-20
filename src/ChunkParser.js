/**
 * chunk data 解析
 */
const ChunkParser = {

	/**
	 * IHDR
	 * @param Uint8Array buffer
	 */
	IHDR: (buffer) => {
		return {

		}
	},

	/**
	 * PLTE
	 * @param Uint8Array buffer
	 * {
	 * }
	 */
	PLTE: (buffer) => {
		
	},

	/**
	 * IDAT
	 * @param Uint8Array buffer
	 * @return {
	 *   
	 * }
	 */
	IDAT: (buffer) => {
		
	},

	/**
	 * IEND
	 * @param Uint8Array buffer
	 */
	IEND: (buffer) => {
		return {};
	},

	/**
	 * tRNS
	 * @param Uint8Array buffer
	 */
	tRNS: (buffer) => {
		
	},

	/**
	 * cHRM
	 * @param Uint8Array buffer
	 */
	cHRM: (buffer) => {
		
	},

	/**
	 * gAMA
	 * @param Uint8Array buffer
	 */
	gAMA: (buffer) => {
		
	},

	/**
	 * iCCP
	 * @param Uint8Array buffer
	 */
	iCCP: (buffer) => {
		
	},

	/**
	 * sBIT
	 * @param Uint8Array buffer
	 */
	sBIT: (buffer) => {
		
	},

	/**
	 * sRGB
	 * @param Uint8Array buffer
	 */
	sRGB: (buffer) => {
		
	},

	/**
	 * iTXt
	 * @param Uint8Array buffer
	 */
	iTXt: (buffer) => {
		
	},

	/**
	 * tEXt 
	 * @param Uint8Array buffer
	 */
	tEXt: (buffer) => {
		
	},
	
	/**
	 * zTXt 
	 * @param Uint8Array buffer
	 */
	zTXt: (buffer) => {
		
	},

	/**
	 * bKGD 
	 * @param Uint8Array buffer
	 */
	bKGD: (buffer) => {
		
	},

	/**
	 * hIST 
	 * @param Uint8Array buffer
	 */
	hIST: (buffer) => {
		
	},

	/**
	 * pHYs 
	 * @param Uint8Array buffer
	 */
	pHYs: (buffer) => {
		
	},

	/**
	 * sPLT 
	 * @param Uint8Array buffer
	 */
	sPLT: (buffer) => {
		
	}
}

export default ChunkParser;
