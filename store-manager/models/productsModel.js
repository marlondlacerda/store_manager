const connection = require('./connection');

const add = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return { id: result.insertId, name, quantity };
};

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

  return result;
};

const getByName = async (name) => {
  const [result] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);

  return result;
};

module.exports = {
  getAll,
  add,
  getById,
  getByName,
};
