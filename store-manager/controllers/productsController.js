const products = require('express').Router();
const rescue = require('express-rescue');
const joi = require('joi');

const productServices = require('../services/productsService');

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

products.get(
  '/',
  async (req, res) => {
    const productsList = await productServices.getAll();

    res.status(200).json(productsList);
  },
);

products.get(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const product = await productServices.getById(id);

    res.status(200).json(product);
  }),
);

products.post(
  '/',
  rescue(async (req, res) => {
    validateProductSchema(req.body);
    const { name, quantity } = req.body;

    const product = await productServices.add(name, quantity);

    res.status(201).json(product);
  }),
);

products.put(
  '/:id',
  rescue(async (req, res) => {
    validateProductSchema(req.body);
    const { id } = req.params;
    const { name, quantity } = req.body;

    const product = await productServices.update(id, name, quantity);

    res.status(200).json(product);
  }),
);

products.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const product = await productServices.remove(id);

    res.status(200).json(product);
  }),
);

module.exports = products;
