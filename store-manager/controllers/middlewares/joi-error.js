const joi = require('joi');

module.exports = (err, req, res, next) => {
  const errorMap = {
    'string.min': 422,
    'any.required': 400,
    'number.min': 422,
    'number.base': 422,
  };

  if (!joi.isError(err)) return next(err);

  const { type } = err.details[0];

  const status = errorMap[type];

  res.status(status).json({ message: err.message });
};
