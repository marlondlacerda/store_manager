const createError = require('../../helpers/createError');
const productsModel = require('../models/productsModel');

const getByName = async (name) => {
  const product = await productsModel.getByName(name);

  return product;
};

const add = async (name, quantity) => {
  const product = await getByName(name);

  if (product.length === 1) {
    throw createError('conflict', 'Product already exists');
  }

  const newProduct = await productsModel.add(name, quantity);
  return newProduct;
};

module.exports = {
  add,
  getByName,
};
