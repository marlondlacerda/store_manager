const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM products');
  return rows;
};

const main = async () => {
  await getAll();
};

main();

module.exports = {
  getAll,
};
