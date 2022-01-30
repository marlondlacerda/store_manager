const connection = require('./connection');

const queryTypes = {
  addNewSale: 'INSERT INTO sales (date) VALUES (NOW())',
  addNewSP: 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',

  getAll: `SELECT sp.sale_id AS saleId, date, product_id, quantity FROM
            sales_products AS sp INNER JOIN sales AS s ON s.id = sp.sale_id`,

  getById: `SELECT date, product_id, quantity FROM sales_products AS sp
              INNER JOIN sales AS s ON s.id = sp.sale_id WHERE sp.sale_id = ?`,
};

const add = async (itemsSold) => {
  const [result] = await connection.execute(
    queryTypes.addNewSale,
  );

  const addNewItem = itemsSold.map(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      queryTypes.addNewSP,
      [result.insertId, productId, quantity],
    );
  });

  return Promise.all(addNewItem).then(() => ({ id: result.insertId, itemsSold }));
};

const getAll = async () => {
  const [result] = await connection.execute(
    queryTypes.getAll,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    queryTypes.getById, [id],
  );

  if (result.length === 0) return null;

  return result;
};

module.exports = {
  add,
  getAll,
  getById,
};
