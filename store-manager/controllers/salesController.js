const Sales = require('express').Router();
const rescue = require('express-rescue');
const joi = require('joi');

const createError = require('../../helpers/createError');
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

  if (error) throw error;
};

Sales.post(
  '/',
  rescue(async (req, res) => {
    const { body } = req;

    body.forEach((b) => validateSaleSchema(b));

    const sale = await salesService.add(body);

    res.status(201).json(sale);
  }),
);

Sales.get(
  '/',
  rescue(async (req, res) => {
    const sales = await salesService.getAll();

    res.status(200).json(sales);
  }),
);

Sales.get(
  '/:id',
  rescue(async (req, res) => {
    const sales = await salesService.getById(req.params.id);

    if (sales.length === 0) throw createError('notFound', 'Sale not found');

    res.status(200).json(sales);
  }),
);

Sales.put(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    body.forEach((b) => validateSaleSchema(b));

    const sale = await salesService.update(id, body);

    res.status(200).json(sale);
  }),
);

Sales.delete(
  '/:id',
  rescue(async (req, res) => {
    const { id } = req.params;

    const sale = await salesService.remove(id);

    if (!sale) throw createError('notFound', 'Sale not found');

    res.status(200).json(sale);
  }),
);

module.exports = Sales;
