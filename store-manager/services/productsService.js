const productsModel = require('../models/productsModel');

const add = async (name, quantity) => productsModel.add(name, quantity);

const getById = async (id) => productsModel.getById(id);

const update = async (id, name, quantity) => productsModel.update(id, name, quantity);

const remove = async (id) => productsModel.remove(id);

const getAll = async () => productsModel.getAll();

module.exports = {
  add,
  update,
  remove,
  getAll,
  getById,
};
