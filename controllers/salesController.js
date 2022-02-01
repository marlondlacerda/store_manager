const sales = require('express').Router();
const rescue = require('express-rescue');
const joi = require('joi');

const createError = require('../helpers/createError');
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

const getAll = async (_req, res, _next) => {
  const result = await salesService.getAll();

  res.status(200).json(result);
};

const getById = async (req, res, _next) => {
  const sale = await salesService.getById(req.params.id);

  if (sale.length === 0) throw createError('notFound', 'Sale not found');

  res.status(200).json(sale);
};

const create = async (req, res, _next) => {
  const { body } = req;

  body.forEach((b) => validateSaleSchema(b));

  const result = await salesService.add(body);

  res.status(201).json(result);
};

const update = async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;

  body.forEach((b) => validateSaleSchema(b));

  const sale = await salesService.update(id, body);

  res.status(200).json(sale);
};

const remove = async (req, res, _next) => {
  const { id } = req.params;

  const sale = await salesService.remove(id);

  if (!sale) throw createError('notFound', 'Sale not found');

  res.status(200).json(sale);
};

sales.get('/', rescue(getAll));

sales.get('/:id', rescue(getById));

sales.post('/', rescue(create));

sales.put('/:id', rescue(update));

sales.delete('/:id', rescue(remove));

module.exports = {
  sales,
  getAll,
  getById,
  create,
  update,
  remove,
};
