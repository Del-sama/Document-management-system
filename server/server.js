const express = require('express');
const parser = require('body-parser');
const usersRoute = require('./routes/user');
const rolesRoute = require('./routes/role');
const indexRoute = require('./routes/index');
const documentRoute = require('./routes/document');
const searchRoute = require('./routes/search');
const logger = require('morgan');

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(logger('tiny'));

app.use(indexRoute());
app.use(usersRoute());
app.use(rolesRoute());
app.use(documentRoute());
app.use(searchRoute());

app.listen(5050, () => {
  console.log('app is listening on port 5050');
});

module.exports = app;
