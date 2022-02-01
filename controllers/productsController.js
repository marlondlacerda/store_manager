const products = require('express').Router();
const rescue = require('express-rescue');
const joi = require('joi');

const productServices = require('../services/productsService');
const createError = require('../helpers/createError');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
  }),
});

const validateProductSchema = (body) => {
  const { error } = productSchema.validate(body);

  if (error) {
    throw error;
  }
};

const getAll = async (_req, res, _next) => {
  const result = await productServices.getAll();

  res
    .status(200)
    .json(result);
};

const getById = (async (req, res) => {
  const { id } = req.params;

  const product = await productServices.getById(id);

  if (!product) throw createError('notFound', 'Product not found');

  res.status(200).json(product);
});

const add = (async (req, res) => {
  validateProductSchema(req.body);
  const { name, quantity } = req.body;

  const product = await productServices.add(name, quantity);

  if (!product) throw createError('conflict', 'Product already exists');

  res.status(201).json(product);
});

const update = (async (req, res) => {
  validateProductSchema(req.body);
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productServices.update(id, name, quantity);

  if (!product) throw createError('notFound', 'Product not found');

  res.status(200).json(product);
});

const remove = (async (req, res) => {
  const { id } = req.params;

  const product = await productServices.remove(id);

  if (!product) throw createError('notFound', 'Product not found');

  res.status(200).json(product);
});

products.get('/', rescue(getAll));

products.get('/:id', rescue(getById));

products.post('/', rescue(add));

products.put('/:id', rescue(update));

products.delete('/:id', rescue(remove));

module.exports = {
  products,
  getAll,
  getById,
  add,
  update,
  remove,
};
