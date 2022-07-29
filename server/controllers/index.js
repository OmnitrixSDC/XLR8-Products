const { client } = require('../db/index.js');

module.exports.getAllProducts = (page, count) => {
  const lowerLimit = (page - 1) * count + 1;
  const higherLimit = page * count;

  const string = {
    text: "SELECT id AS id, name, slogan, description, category, default_price FROM product WHERE id BETWEEN $1 and $2",
    values: [lowerLimit, higherLimit],
  }

  const result = client.query(string)
  return result;
}

module.exports.getProductInfo = (productId) => {
  const string = {
    text: "",
    values: [productId],
  }

  const result = client.query(string)
  return result;
}

module.exports.getStyles = (productId) => {
  const string = {
    text: "",
    values: [productId],
  }

  const result = client.query(string)
  return result;
}

module.exports.getRelated = (productId) => {
  const string = {
    text: "",
    values: [productId],
  }

  const result = client.query(string)
  return result;
}