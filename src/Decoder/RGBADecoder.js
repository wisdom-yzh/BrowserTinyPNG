const BaseDecoder = require('./BaseDecoder');
const { RGBAPixel } = require('../Pixel');

/**
 * PaethPredictor
 */
const pp = (a, b, c) => {
  const p = (a + b - c);
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);

  if (pa <= pb && pa <= pc) {
    return a;
  } else if (pb <= pc) {
    return b;
  } else {
    return c;
  }
}

/**
 * filter的反向变换
 */
const Recon = {
  filterNone: (currentRow) => currentRow,
  filterSub: (currentRow) => {
    const row = currentRow.slice(0, 4);
    for (let i = 4; i < currentRow.length; i += 4) {
      row.push((currentRow[i] + row[i-4]) % 256);
      row.push((currentRow[i+1] + row[i-3]) % 256);
      row.push((currentRow[i+2] + row[i-2]) % 256);
      row.push((currentRow[i+3] + row[i-1]) % 256);
    }
    return row;
  },
  filterUp: (currentRow, lastRow) => {
    const row = [];
    for (let i = 0; i < currentRow.length; i++) {
      row.push((currentRow[i] + lastRow[i]) % 256);
    }
    return row;
  },
  filterAverage: (currentRow, lastRow) => {
    const row = [];
    for (let i = 0; i < currentRow.length; i += 4) {
      row.push((currentRow[i] + Math.floor((lastRow[i] + (row[i-4] || 0)) / 2.0)) % 256);
      row.push((currentRow[i+1] + Math.floor((lastRow[i+1] + (row[i-3] || 0)) / 2.0)) % 256);
      row.push((currentRow[i+2] + Math.floor((lastRow[i+2] + (row[i-2] || 0)) / 2.0)) % 256);
      row.push((currentRow[i+3] + Math.floor((lastRow[i+3] + (row[i-1] || 0)) / 2.0)) % 256);
    }
    return row;
  },
  filterPaeth: (currentRow, lastRow) => {
    const row = [];
    for (let i = 0; i < currentRow.length; i += 4) {
      row.push((currentRow[i] + pp(row[i-4] || 0, lastRow[i], lastRow[i-4] || 0)) % 256);
      row.push((currentRow[i+1] + pp(row[i-3] || 0, lastRow[i+1], lastRow[i-3] || 0)) % 256);
      row.push((currentRow[i+2] + pp(row[i-2] || 0, lastRow[i+2], lastRow[i-2] || 0)) % 256);
      row.push((currentRow[i+3] + pp(row[i-1] || 0, lastRow[i+3], lastRow[i-1] || 0)) % 256);
    }
    return row;
  }
};

class RGBADecoder extends BaseDecoder {

  constructor(imageWidth, imageHeight, imageData) {
    super('TRUECOLOR_WITH_ALPHA', imageWidth, imageHeight, imageData);
    this.rowLength = 4 * this.imageWidth;
  }

  /**
   * @override
   */
  reconstruct(filterType) {
    return Recon[filterType];
  }
  
  /**
   * @override
   */
  getPixel() {

    const pixel = [
      this.row[this.ptr],
      this.row[this.ptr+1],
      this.row[this.ptr+2]
    ];
    const alpha = this.row[this.ptr+3];
    this.ptr += 4;
    return new RGBAPixel(pixel, alpha);
  }
}

module.exports = RGBADecoder;
