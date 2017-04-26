const express = require('express');
const parser = require('body-parser');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const usersRoute = require('./server/routes/user');
const rolesRoute = require('./server/routes/role');
const indexRoute = require('./server/routes/index');
const documentRoute = require('./server/routes/document');
const logger = require('morgan');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(logger('tiny'));

app.use(indexRoute());
app.use(usersRoute());
app.use(rolesRoute());
app.use(documentRoute());

app.listen(5050, () => {
  console.log('app is listening on port 5050');
});

module.exports = app;
