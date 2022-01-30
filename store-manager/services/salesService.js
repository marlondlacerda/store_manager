const formatDate = require('../../helpers/formatDate');
const salesModel = require('../models/salesModel');

const add = async (body) => {
  const timeElapsed = new Date();
  const newDateFormat = formatDate(timeElapsed, 'YYYY-MM-DD hh:mm:ss');

  const result = await salesModel.add(body, newDateFormat);

  return result;
};

module.exports = {
  add,
};
