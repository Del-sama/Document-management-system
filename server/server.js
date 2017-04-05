import express from 'express';
import parser from 'body-parser';
import logger from 'morgan';
import usersRoute from './routes/user';
import indexRoute from './routes/index';

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(logger('tiny'));

app.use(indexRoute());
app.use(usersRoute());

app.listen(5050, () => {
});

module.exports = app;
