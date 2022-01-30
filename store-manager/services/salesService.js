const createError = require('../../helpers/createError');
const salesModel = require('../models/salesModel');

const add = async (body) => {
  const result = salesModel.add(body);

  return result;
};

const getAll = async () => salesModel.getAll();

const getById = async (id) => {
  const result = await salesModel.getById(id);

  if (result.length === 0) {
    throw createError('notFound', 'Sale not found');
  }

  return result;
};

module.exports = {
  add,
  getAll,
  getById,
};
