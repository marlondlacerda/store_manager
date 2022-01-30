const joi = require('joi');

module.exports = (err, req, res, next) => {
  if (!joi.isError(err)) {
    return next(err);
  }

  const { details } = err;
  const errorMap = {
    'string.min': 422,
    'any.required': 400,
    'number.min': 422,
    'number.base': 422,
  };

  const status = errorMap[details[0].type];

  res.status(status).json({ message: err.message });
};
