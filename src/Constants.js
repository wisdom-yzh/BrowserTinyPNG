module.exports = {

  // PNG_SIGNITURE
  PNG_SIGNITURE: [137, 80, 78, 71, 13, 10, 26, 10],

  // VALID_CHUNK_NAME Valid chunk name in png
  VALID_CHUNK_NAME: [
    'IHDR', 'PLTE', 'IDAT', 'IEND',
    'tRNS', 'cHRM', 'gAMA', 'iCCP', 'sBIT', 'sRGB',
    'iTXt', 'tEXt', 'zTXt',
    'bKGD', 'hIST', 'pHYs', 'sPLT',
    'tIME'
  ],

  // DEPENDENCES define dependences for chunk parser
  DEPENDENCES: {
    IHDR: [],
    PLTE: ['IHDR', 'iCCP', 'sRGB', 'sBIT', 'gAMA', 'cHRM'],
    IDAT: [
      'PLTE',
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
  },

  // COLOR_TYPE Valid image type and their color type value
  COLOR_TYPE: {
    0: 'GREYSCALE',
    2: 'TRUECOLOR',
    3: 'INDEXED_COLOR',
    4: 'GREYSCALE_WITH_ALPHA',
    6: 'TRUECOLOR_WITH_ALPHA'
  },

  // IMAGE_TYPE valid image type array
  IMAGE_TYPE: [
    'GREYSCALE',
    'TRUECOLOR',
    'INDEXED_COLOR',
    'GREYSCALE_WITH_ALPHA',
    'TRUECOLOR_WITH_ALPHA'
  ],

  // ALLOWED_BIT_DEPTHS Allowed bit depths for different kind of image type
  ALLOWED_BIT_DEPTHS: {
    GREYSCALE           : [1, 2, 4, 8, 16], 
    TRUECOLOR           : [8, 16],
    INDEXED_COLOR       : [1, 2, 4, 8],
    GREYSCALE_WITH_ALPHA: [8, 16],
    TRUECOLOR_WITH_ALPHA: [8, 16]
  }
};
