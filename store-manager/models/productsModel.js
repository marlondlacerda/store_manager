const createError = require('../../helpers/createError');
const connection = require('./connection');

const queryTypes = {
  addNewProduct: 'INSERT INTO products (name, quantity) VALUES (?, ?)',
  update: 'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
  partialUpdate: 'UPDATE products SET quantity = ? WHERE id = ?',
  remove: 'DELETE FROM products WHERE id = ?',
  getAll: 'SELECT * FROM products',
  getById: 'SELECT * FROM products WHERE id = ?',
  getByName: 'SELECT * FROM products WHERE name = ?',
};

const getById = async (id) => {
  const [result] = await connection.execute(queryTypes.getById, [id]);

  return result[0];
};

const getByName = async (name) => {
  const [result] = await connection.execute(queryTypes.getByName, [name]);

  return result;
};

const add = async (name, quantity) => {
  const result = await getByName(name);

  if (result.length === 1) return false;

  const [{ insertId }] = await connection.execute(
    queryTypes.addNewProduct,
    [name, quantity],
  );

  return { id: insertId, name, quantity };
};

const update = async (id, name, quantity) => {
  const result = await getById(id);

  if (!result) return false;

  await connection.execute(
    queryTypes.update,
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const partialUpdate = async (id, newQuantity) => {
  const { quantity } = await getById(id);

  const result = quantity - newQuantity;

  if (result < 0) throw createError('unprocessableEntity', 'Such amount is not permitted to sell');

  await connection.execute(
    queryTypes.partialUpdate,
    [result, id],
  );

  return true;
};

const remove = async (id) => {
  const result = await getById(id);

  if (!result) return false;

  const { name, quantity } = result;

  await connection.execute(
    queryTypes.remove,
    [id],
  );

  return { id, name, quantity };
};

const getAll = async () => {
  const [result] = await connection.execute(queryTypes.getAll);

  return result;
};

module.exports = {
  add,
  update,
  partialUpdate,
  remove,
  getAll,
  getById,
  getByName,
};
