const connection = require('./connection');

const add = async (itemsSold) => {
  const [result] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW())',
  );

  const addNewItem = itemsSold.map(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      `INSERT INTO sales_products
      (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [result.insertId, productId, quantity],
    );
  });

  return Promise.all(addNewItem).then(() => ({ id: result.insertId, itemsSold }));
};

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT
        sp.sale_id AS saleId, date, product_id, quantity
      FROM
        sales_products AS sp
      INNER JOIN sales AS s
      ON s.id = sp.sale_id;
    `,
  );

  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      date, product_id, quantity
    FROM
      sales_products AS sp
    INNER JOIN
      sales AS s
    ON s.id = sp.sale_id
    WHERE sp.sale_id = ?
    `, [id],
  );

  return result;
};

module.exports = {
  add,
  getAll,
  getById,
};
