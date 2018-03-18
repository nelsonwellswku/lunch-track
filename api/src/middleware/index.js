const errors = require('../infrastructure/errors');

const notFoundHandler = (req, res, next) => {
  res.status(404);
  res.send('Not Found');
  next();
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof errors.NotImplemented) {
    return res.status(501).send('Not Implemented')
  }

  return res
    .status(500)
    .send('Internal Server Error');
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
