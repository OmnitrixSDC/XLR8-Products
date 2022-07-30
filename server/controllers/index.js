const { client } = require('../db/index.js');

module.exports.getAllProducts = (page, count) => {
  const lowerLimit = (page - 1) * count;
  const higherLimit = page * count;

  const string = {
    text: "EXPLAIN ANALYZE SELECT id AS id, name, slogan, description, category, default_price FROM product WHERE id BETWEEN $1 AND $2",
    values: [lowerLimit, higherLimit],
  }

  const result = client.query(string)
  return result;
}

module.exports.getProductInfo = (productId) => {
  const string = {
    text: "EXPLAIN ANALYZE SELECT id AS id, name, slogan, description, category, default_price,\
      (SELECT json_agg(\
        json_build_object(\
          'feature', feature, 'value', value\
        )\
      )\
      FROM features WHERE product_id = $1) AS features FROM product WHERE id = $1",
    values: [productId],
  }

  const result = client.query(string)
  return result;
}

module.exports.getStyles = (productId) => {
  const string = {
    text: "EXPLAIN ANALYZE SELECT id,\
      (SELECT json_agg(\
        json_build_object('style_id', styles.id, 'name', styles.name,\
      'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style,\
      'photos', (SELECT json_agg(json_build_object('thumbnail_url', photos.thumbnail_url, 'url', photos.url))\
      FROM photos WHERE photos.styleId = styles.id), 'skus',\
      (SELECT json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size))\
      FROM skus WHERE skus.styleId = styles.id))) AS results FROM styles WHERE productId = $1)\
      FROM styles WHERE productId = $1",
    values: [productId],
  }

  const result = client.query(string)
  return result;
}

module.exports.getRelated = (productId) => {
  const string = {
    text: "EXPLAIN ANALYZE SELECT json_agg(related_product_id) FROM related WHERE current_product_id = $1 AND related_product_id != 0",
    values: [productId],
  }

  const result = client.query(string)
  return result;
}