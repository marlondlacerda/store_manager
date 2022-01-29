const products = require('express').Router();
const rescue = require('express-rescue');
const joi = require('joi');

const productsModels = require('../models/productsModel');

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

// products.get(
//   '/',
//   async (request, response) => {
//     const productsList = await productsModels.getAll();
//     response.send(productsList);
//   },
// );

products.post(
  '/',
  rescue(async (req, res) => {
    validateProductSchema(req.body);
    const { name, quantity } = req.body;

    console.log(name, quantity);
  }),
);

module.exports = products;
