/**
 * @class Base pixel class
 */
class Pixel {

	constructor(type) {
		this.type = type;
	}
}

Pixel.TYPE = {
	GREY:       Symbol('grey'),
	GREY_ALPHA: Symbol('grey with alpha'),
	INDEXED:    Symbol('indexed with palette'),
	RGB:        Symbol('rgb'),
	RGBA:       Symbol('rgba')
}

const rgb2int = (r, g, b) => (r << 16) + (g << 8) + b;

/**
 * @class Pixel for GreyScale
 */
class GreyPixel extends Pixel {

	constructor(pixel) {
		super(Pixel.TYPE.GREY);
		this.greySample = pixel;
	}
}

/**
 * @class Pixel for GreyScale with Alpha
 */
class GreyAlphaPixel extends Pixel {

	constructor(pixel, alpha) {
		super(Pixel.TYPE.GREY_ALPHA);
		this.greySample = pixel;
		this.alphaSample = alpha / 255.0;
	}
}

/**
 * @class Pixel for Indexed Palette
 */
class IndexedPixel extends Pixel {

	constructor(index, palette, paletteAlpha) {
		super(Pixel.TYPE.INDEXED);
		this.hasAlpha = typeof paletteAlpha != 'undefined';
		if (this.hasAlpha) {
			this.alphaSample = paletteAlpha[index];
		}
		const color = palette[index];
		this.rSample = color >> 16;
		this.gSample = (color & 0x00FF00) >> 8;
		this.bSample = color & 0x0000FF;
	}
}

/**
 * @class Pixel for RGB
 */
class RGBPixel extends Pixel {

	constructor(value) {
		super(Pixel.TYPE.RGB);
		if (typeof value == 'Number') {
			this.rSample = color >> 16;
			this.gSample = (color & 0x00FF00) >> 8;
			this.bSample = color & 0x0000FF;
		} else if (Array.isArray(value)) {
			this.rSample = value[0];
			this.gSample = value[1];
			this.bSample = value[2]
		}
	}
}

/**
 * @class Pixel for RGBA
 */
class RGBAPixel extends Pixel {

	constructor(value, alpha) {
		super(Pixel.TYPE.RGBA);
		if (typeof value == 'Number') {
			this.rSample = color >> 16;
			this.gSample = (color & 0x00FF00) >> 8;
			this.bSample = color & 0x0000FF;
		} else if (Array.isArray(value)) {
			this.rSample = value[0];
			this.gSample = value[1];
			this.bSample = value[2];
			if (value.length == 4) {
				this.alphaSample = value[3] / 255.0;
			}
		}
	}
}

module.exports = {
	GreyPixel,
	GreyAlphaPixel,
	RGBPixel,
	RGBAPixel,
	IndexedPixel
}