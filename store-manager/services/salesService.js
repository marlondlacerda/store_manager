const salesModel = require('../models/salesModel');

const add = async (body) => salesModel.add(body);

const update = async (id, body) => salesModel.update(id, body);

const remove = async (id) => salesModel.remove(id);

const getAll = async () => salesModel.getAll();

const getById = async (id) => salesModel.getById(id);

module.exports = {
  add,
  update,
  remove,
  getAll,
  getById,

};
