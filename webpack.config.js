module.exports = {
  context: `${__dirname}/client/app`,

  entry: './js/app.js',

  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
  }
};
