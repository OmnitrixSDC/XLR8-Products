-- DB Create/Drop/Connect
-- DROP DATABASE IF EXISTS products;
-- CREATE DATABASE products;
-- \c products;

CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price INT NOT NULL CHECK (default_price >= 0)
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INT,
  feature TEXT NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY NOT NULL,
  productId INT,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price INT NOT NULL CHECK (original_price >= 0),
  default_style BOOLEAN NOT NULL,
  CONSTRAINT fk_styles FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY NOT NULL,
  styleId INT,
  url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  CONSTRAINT fk_photos FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL PRIMARY KEY NOT NULL,
  styleId INT,
  size TEXT NOT NULL,
  quantity INT NOT NULL,
  CONSTRAINT fk_skus FOREIGN KEY (styleId) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS related (
  id SERIAL PRIMARY KEY NOT NULL,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL
);

-- DROP INDEX idx_product;
-- DROP INDEX idx_features;
-- DROP INDEX idx_styles;
-- DROP INDEX idx_photos;
-- DROP INDEX idx_skus;
-- DROP INDEX idx_related;
CREATE INDEX IF NOT EXISTS idx_product ON product(id);
CREATE INDEX IF NOT EXISTS idx_features ON features(product_id);
CREATE INDEX IF NOT EXISTS idx_styles ON styles(productId);
CREATE INDEX IF NOT EXISTS idx_photos ON photos(styleId);
CREATE INDEX IF NOT EXISTS idx_skus ON skus(styleId);
CREATE INDEX IF NOT EXISTS idx_related ON related(current_product_id);

-- ETL Code
-- \COPY product FROM 'server/db/csv/product.csv' DELIMITER ',' CSV HEADER;
-- \COPY features FROM 'server/db/csv/features.csv' DELIMITER ',' CSV HEADER;
-- \COPY styles FROM 'server/db/csv/styles.csv' DELIMITER ',' CSV HEADER;
-- \COPY photos FROM 'server/db/csv/photos.csv' DELIMITER ',' CSV HEADER;
-- \COPY skus FROM 'server/db/csv/skus.csv' DELIMITER ',' CSV HEADER;
-- \COPY related FROM 'server/db/csv/related.csv' DELIMITER ',' CSV HEADER;