module.exports = {

  entry: {
    index: './index.js'
  },

  output: {
    filename: '[name].js',
    path: `${__dirname}/dist`
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader'
    }]
  }
};
