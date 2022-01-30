const createError = require('../../helpers/createError');
const productsModel = require('../models/productsModel');

const add = async (name, quantity) => {
  const product = await productsModel.getByName(name);

  if (product.length === 1) {
    throw createError('conflict', 'Product already exists');
  }

  const newProduct = await productsModel.add(name, quantity);
  return newProduct;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);

  if (product.length === 0) {
    throw createError('notFound', 'Product not found');
  }

  return product[0];
};

const update = async (id, name, quantity) => {
  await getById(id);

  await productsModel.update(id, name, quantity);

  return { id, name, quantity };
};

const remove = async (id) => {
  const { name, quantity } = await getById(id);

  await productsModel.remove(id);

  return { id, name, quantity };
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

module.exports = {
  add,
  update,
  remove,
  getAll,
  getById,
};
