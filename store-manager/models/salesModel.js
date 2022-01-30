const connection = require('./connection');

const add = async (itemsSold, newDateFormat) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)', [newDateFormat],
  );

  await itemsSold.forEach(({ product_id: productId, quantity }) => {
    connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [insertId, productId, quantity],
    );
  });

  return { id: insertId, itemsSold };
};

module.exports = {
  add,
};
