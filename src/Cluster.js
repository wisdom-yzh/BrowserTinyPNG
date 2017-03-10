const {
  GreyPixel,
  GreyAlphaPixel,
  IndexedPixel,
  RGBPixel,
  RGBAPixel
} = require('./Pixel');

/**
 * get hisgram
 * @param {Array} pixels
 * @return {Object}
 */
const hisgram = (pixels) => {

  const hisgram = {};

  for (const p of pixels) {

    const index = p.serialize();

    if (hisgram[index]) {
      hisgram[index].count++;
    } else {
      hisgram[index] = {
        count: 1,
        pixel: p
      }
    }
  }

  return Object.values(hisgram);
}

/**
 * kmeans algorithm
 * @param {Array(Pixel)} pixels total pixels
 * @param {Array(Pixel)} initial initial cluster pixels
 * @return {Array(Number), Array(Pixel)} 
 */
const kmeans = (pixels, initialPixels) {

  const K = initialPixels.size();

	// calculate points belong to which means pixels
	let means = initialPixels, meansIndex = new Array(pixels.length).fill(0);
	pixels.forEach((pixel, pIndex) => {
		let minDistance = means[0].distance(pixel);
		for (let i = 1; i < means.length; i++) {
			let dist = means[i].distance(pixel);
			if (dist < minDistance) {
				minDistance = dist;
				meansIndex[pIndex] = i;
			}
		}
	});

	// update new means
	const newMeans = new Array(initialPixels.length).fill([0, 0, 0, 0]);
	const newMeansCount = new Array(initialPixels.length).fill(0);
	meansIndex.forEach((meanIndex, index) => {
		const pixelArr = pixels[index].getColorArray();
		for (let i = 0; i < pixelArr.length; i++) {
			newMeans[meanIndex][i] += pixelArr[i];
			newMeansCount[meanIndex]++;
		}
	});
	
	// create new means pixels
	const newPixels = [];
	for (let i = 0; i < newMeans.length; i++) {
		newMeans[i] = newMeans[i].map(value => parseInt(value / newMeansCount[i]));
		newPixels.push(new RGBAPixel(newMeans[i]));
	}

	// iterate or return
	const EPS = 0.1;
	let need_iterate = false;
	for (let i = 0; i < newPixels.length; i++) {
		if (newPixels[i].distance(initialPixels[i]) > EPS) {
			return kmeans(pixels, newPixels);
		}
	}
	return newPixels;
}

class Cluster {

	/**
	 * constructor
	 */
	constructor(pixels) {
    this.pixels = pixels;
	}

	/**
	 * cluster
   * @param {Number} size color count
	 */
  cluster(size) {

    if (size != this.size || !this.palettePixels || !this.indexes) {
      this.size = size; 
      this.getPalette(hisgram(this.pixels));
    }

    return {
      palette: this.palettePixels.map(r => r.getColorArray()),
      indexes: this.indexes
    }
  }

  /**
   * calculate palette
   * @param {Array} hisgram
   */
  getPalette(hisgram) {
    
    const hisgramSize = hisgram.length;

    if (hisgramSize > this.size) {
      const initialPixels = hisgram.sort(
        (a, b) => parseInt(b.count) - parseInt(a.count)
      ).slice(0, this.size).map(
        row => row.pixel
      );
      this.palettePixels = kmeans(this.pixels, initialPixels);
    } else {
      this.palettePixels = hisgram.map(row => row.pixel);
    }

    return this;
  }

  /**
   * get indexed pixels
   */
  getIndexedPixels() {
    
    for (const pixel of this.pixels) {
      const index = this.minDistance(pixel);
      this.indexes.push(index);
    }
  }

  /**
   * calculate min distance between palettePixels
   * @param {Pixel} pixel
   */
  minDistance(pixel) {

    let minDist = pixel.distance(this.palettePixels[0]);
    let minIndex = 1;

    for (let i = 1; i < this.size; i++) {
      const dist = pixel.distance(this.palettePixels[i]);
      if (dist < minDist) {
        minDist = dist;
        minIndex = i;
      }
    }
    return minIndex;
  }
}

module.exports = Cluster;
