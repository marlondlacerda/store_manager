const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();

const middlewares = require('./controllers/middlewares');
const { products } = require('./controllers/productsController');
const { sales } = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', products);
app.use('/sales', sales);

app.use(middlewares.joiError);
app.use(middlewares.domainError);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
