const connection = require('./connection');

const add = async (name, quantity) => {
  const [result] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return { id: result.insertId, name, quantity };
};

// const getAll = async () => {
//   const [rows] = await connection.execute('SELECT * FROM products');
//   return rows;
// };

const getByName = async (name) => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);
  return rows;
};

module.exports = {
  // getAll,
  add,
  getByName,
};
