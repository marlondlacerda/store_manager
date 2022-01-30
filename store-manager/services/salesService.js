const salesModel = require('../models/salesModel');

const add = async (body) => salesModel.add(body);

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

module.exports = {
  add,
  getAll,
  getById,
};
