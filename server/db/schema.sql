USE DATABASE products;

CREATE TABLE product (
  id INT PRIMARY KEY,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT,
);

CREATE TABLE features (
  id INT PRIMARY KEY,
  feature TEXT,
  value TEXT,
  product_id INT
  FOREIGN KEY (product_id) REFERENCES product(id),
);

CREATE TABLE style (
  id INT PRIMARY KEY,
  name TEXT,
  original_price TEXT,
  sale_price TEXT,
  'default?' BOOLEAN,
  product_id INT,
  FOREIGN KEY (product_id) REFERENCES product(id),
);

CREATE TABLE photo (
  id INT PRIMARY KEY,
  thumbnail_url TEXT,
  url TEXT,
  style_id INT,
  FOREIGN KEY (style_id) REFERENCES style(id),
);

CREATE TABLE sku (
  id INT PRIMARY KEY,
  style_id INT,
  size TEXT,
  quantity INT,
  FOREIGN KEY (style_id) REFERENCES style(id),
);

CREATE TABLE related (
  id INT PRIMARY KEY,
  product_id INT,
  related_id INT,
  FOREIGN KEY (product_id) REFERENCES product(id),
  FOREIGN KEY (related_id) REFERENCES product(id),
);
