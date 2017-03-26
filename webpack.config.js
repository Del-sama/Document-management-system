module.exports = {
  context: `${__dirname}/client/app`,

  entry: './js/app.js',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      }
    ]
  }
};

