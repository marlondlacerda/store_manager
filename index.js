const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const middlewares = require('./store-manager/controllers/middlewares');
const productsController = require('./store-manager/controllers/productsController');
const salesController = require('./store-manager/controllers/salesController');

const app = express();

app.use(bodyParser.json());

app.use('/products', productsController);

app.use('/sales', salesController);

app.use(middlewares.joiError);
app.use(middlewares.domainError);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
