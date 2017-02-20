module.exports = {
	
	entry: {
		index: './index.js'
	},

	output: {
		filename: '[name].js',
		path: `${__dirname}/dist`
	},

	module: {
		loaders: [
		]
	}
};
