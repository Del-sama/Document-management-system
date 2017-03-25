module.exports = {
  context: `${__dirname} /server/app`,

  entry: './js/app.js',

  output: {
    filename: 'app.js',
    path: `${__dirname} /dist`,
  }
};
