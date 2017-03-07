/**
 * PaethPredictor method
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
 * invert filter (decode)
 */
const reconstruct = bytePerPixel => new Object({

    filterNone: (currentRow) => currentRow,

    filterSub: (currentRow) => {
      const row = currentRow.slice(0, bytePerPixel);
      for (let i = bytePerPixel; i < currentRow.length; i += 4) {
        for (let j = 0; j < bytePerPixel; j++) {
          row.push((currentRow[i+j] + row[i+j-4]) % 256);
        }
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
      for (let i = 0; i < currentRow.length; i += bytePerPixel) {
        for (let j = 0; j < bytePerPixel; j++) {
          row.push((currentRow[i+j] + Math.floor((lastRow[i+j] + (row[i+j-4] || 0)) / 2.0)) & 0xff);
        }
      }
      return row;
    },

    filterPaeth: (currentRow, lastRow) => {
      const row = [];
      for (let i = 0; i < currentRow.length; i += bytePerPixel) {
        for (let j = 0; j < bytePerPixel; j++) {
          row.push((currentRow[i+j] + pp(row[i+j-4] || 0, lastRow[i+j], lastRow[i+j-4] || 0)) & 0xff);
        }
      }
      return row;
    }
});

/**
 * TODO:
 * filter (encode)
 */
const filter = {
  filterNone: (currentRow) => currentRow
};

module.exports = {
  reconstruct,
  filter
};
