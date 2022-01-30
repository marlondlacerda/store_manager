const salesModel = require('../models/salesModel');

const add = async (body) => salesModel.add(body);

const update = async (id, body) => salesModel.update(id, body);

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

module.exports = {
  add,
  update,
  getAll,
  getById,
};
