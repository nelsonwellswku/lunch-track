const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id');
const helmet = require('helmet');
const middleware = require('./middleware');
const diagnosticRouter = require('./diagnostic');
const authenticationRouter = require('./authentication');
const lunchRouter = require('./lunch');

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(addRequestId({
  attributeName: 'requestId',
}));

app.use('/api/diagnostic', diagnosticRouter);
app.use('/api/authentication', authenticationRouter);
app.use('/api', lunchRouter);

app.use(middleware.notFoundHandler);
app.use(middleware.joiErrorHandler);
app.use(middleware.errorHandler);

module.exports = app;
