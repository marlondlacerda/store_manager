const connection = require('./connection');

const add = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return { id: result.insertId, name, quantity };
};

const update = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
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
  add,
  update,
  remove,
  getAll,
  getById,
  getByName,
};
