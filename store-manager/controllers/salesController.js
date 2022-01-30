const sales = require('express').Router();
const rescue = require('express-rescue');
const joi = require('joi');

const salesService = require('../services/salesService');

const saleSchema = joi.object({
  productId: joi.number().required().messages({
    'any.required': '"product_id" is required',
    }),
  quantity: joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
  }),
});

const validateSaleSchema = ({ product_id: productId, quantity }) => {
  const { error } = saleSchema.validate({ productId, quantity });

  if (error) {
    throw error;
  }
};

sales.get(
  '/',
  rescue(async (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
  }),
);

sales.post(
  '/',
  rescue(async (req, res) => {
    const { body } = req;
    body.forEach((b) => {
      validateSaleSchema(b);
    });

    const sale = await salesService.add(body);

    res.status(201).json(sale);
  }),
);

module.exports = sales;