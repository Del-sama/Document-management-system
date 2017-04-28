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
const swaggerRoute = require('./server/routes/swagger');
const documentRoute = require('./server/routes/document');
const searchRoute = require('./server/routes/search');
const logger = require('morgan');

const app = express();

const port = process.env.PORT || 5050;

if (process.env.NODE_ENV !== 'test') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(logger('tiny'));

app.use(express.static(path.join(__dirname, 'server/swaggerDocs')));

app.use(indexRoute());
app.use(usersRoute());
app.use(rolesRoute());
app.use(documentRoute());
app.use(swaggerRoute());
app.use(searchRoute());

app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.listen(port, () => {
  console.log(`
  app is listening on port ${port}`);
});

module.exports = app;
