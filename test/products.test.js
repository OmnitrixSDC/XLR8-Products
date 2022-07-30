const db = require('../server/controllers/index');
const axios = require('axios');

describe('Testing controllers', () => {
  test('getAllProducts works', () => {
    expect(db.getAllProducts(1, 5)).toBeTruthy();
  });

  test('getProductInfo works', () => {
    expect(db.getProductInfo(40)).toBeTruthy();
  });

  test('getStyles works', () => {
    expect(db.getStyles(40)).toBeTruthy();
  });

  test('getRelated works', () => {
    expect(db.getRelated(40)).toBeTruthy();
  });
});

describe('Testing routes', () => {
  test('/products', () => {
    axios.get('http://localhost:8120/products')
      .then(result => {
        expect(result.status).toBe(200);
      });
  });

  test('/products/:product_id', () => {
    axios.get('http://localhost:8120/products/40')
      .then(result => {
        expect(result.status).toBe(200);
      });
  });

  test('/products/:product_id with no id', () => {
    axios.get('http://localhost:8120/products/')
      .then(result => {
        expect(result.status).toBe(500);
      });
  });

  test('/products/:product_id/styles', () => {
    axios.get('http://localhost:8120/products/40/styles')
      .then(result => {
        expect(result.status).toBe(200);
      });
  });

  test('/products/:product_id/styles with no id', () => {
    axios.get('http://localhost:8120/products//styles')
      .then(result => {
        expect(result.status).toBe(500);
      });
  });

  test('/products/:product_id/related', () => {
    axios.get('http://localhost:8120/products/40/related')
    .then(result => {
      expect(result.status).toBe(200);
    });
  });

  test('/products/:product_id/related with no id', () => {
    axios.get('http://localhost:8120/products//related')
    .then(result => {
      expect(result.status).toBe(500);
    });
  });
});