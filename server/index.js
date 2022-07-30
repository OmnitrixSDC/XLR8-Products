const express = require('express');
const cors = require('cors');
const db = require('./controllers/index.js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/products', async (req, res) => {
  const page = req.query.page || 1;
  const count = req.query.count || 5;

  await db.getAllProducts(page, count)
    .then(result => res.send(result.rows))
    .catch(err => res.sendStatus(500));
});

app.get('/products/:product_id', async (req, res) => {
  const productId = req.params.product_id

  await db.getProductInfo(productId)
    .then(result => res.send(result.rows))
    .catch(err => res.sendStatus(500));
});

app.get('/products/:product_id/styles', async (req, res) => {
  const productId = req.params.product_id;

  await db.getStyles(productId)
    .then(result => res.send(result.rows))
    .catch(err => res.sendStatus(500));
});

app.get('/products/:product_id/related', async (req, res) => {
  const productId = req.params.product_id;

  await db.getRelated(productId)
    .then(result => res.send(result.rows))
    .catch(err => res.sendStatus(500));
});

const PORT = process.env.SERV_PORT | 8120;

app.listen(PORT);

console.log(`Server listening at http://localhost:${PORT}`);