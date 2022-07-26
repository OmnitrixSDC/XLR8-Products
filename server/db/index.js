const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  user: process.env.USER,
  password: '',
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DBNAME,
});

client.connect((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports.client = client;