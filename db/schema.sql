DROP DATABASE IF EXISTS "productAPI";

DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS features;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS skus;
DROP TABLE IF EXISTS related;

CREATE DATABASE "productAPI"
WITH OWNER = danielchu
LC_COLLATE = "C"
LC_CTYPE = "C"
TABLESPACE = pg_default
CONNECTION LIMIT = -1;

CREATE TABLE product (
  id numeric NOT NULL,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price TEXT NOT NULL,
  PRIMARY KEY (id)
)
TABLESPACE pg_default;
ALTER TABLE product
  OWNER to danielchu;
COPY product(id, name, slogan, description, category, default_price)
FROM '/Users/danielchu/SEC/retail-app_SDC/API/Products/raw_data/product.csv'
DELIMITER ','
CSV HEADER;

-- Table 'features'

CREATE TABLE features (
  id numeric NOT NULL,
  product_id numeric NOT NULL,
  feature TEXT NOT NULL,
  value TEXT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT product_id FOREIGN KEY (product_id)
    REFERENCES product (id) MATCH SIMPLE
)
TABLESPACE pg_default;
ALTER TABLE features
  OWNER to danielchu;
COPY features(id, product_id, feature, value)
FROM '/Users/danielchu/SEC/retail-app_SDC/API/Products/raw_data/features.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX prod_idx on features (product_id);

-- Table 'styles'

CREATE TABLE styles (
  id numeric NOT NULL,
  product_id numeric NOT NULL,
  name TEXT NOT NULL,
  sale_price TEXT NOT NULL,
  original_price numeric NOT NULL,
  default_style BOOLEAN NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT product_id FOREIGN KEY (product_id)
    REFERENCES product (id)
)
TABLESPACE pg_default;
ALTER TABLE styles
  OWNER to danielchu;
COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/danielchu/SEC/retail-app_SDC/API/Products/raw_data/styles.csv'
CSV HEADER;
CREATE INDEX style_idx ON styles(product_id);

-- Table 'photos'

CREATE TABLE photos (
  id numeric NOT NULL,
  styleId numeric NOT NULL,
  url TEXT COLLATE pg_catalog."default" NOT NULL,
  thumbnail_url TEXT COLLATE pg_catalog."default" NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT style_ID FOREIGN KEY (styleId)
    REFERENCES styles (id) MATCH SIMPLE
)
TABLESPACE pg_default;
ALTER TABLE photos
  OWNER to danielchu;
COPY photos(id, styleId, url, thumbnail_url)
FROM '/Users/danielchu/SEC/retail-app_SDC/API/Products/raw_data/photos.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX photo_idx ON photos (styleId);

-- Table 'skus'

CREATE TABLE skus (
  id numeric NOT NULL,
  styleId numeric NOT NULL,
  size TEXT NOT NULL,
  quantity TEXT NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT style_ID FOREIGN KEY (styleId)
    REFERENCES styles (id) MATCH SIMPLE
)
TABLESPACE pg_default;
ALTER TABLE skus
  OWNER TO danielchu;
COPY skus(id, styleId, size, quantity)
FROM '/Users/danielchu/SEC/retail-app_SDC/API/Products/raw_data/skus.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX sku_idx ON skus (styleId);

-- Table 'related'

CREATE TABLE related (
  id numeric NULL DEFAULT NULL,
  current_product_id numeric NOT NULL,
  related_product_id numeric NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT current_product_id FOREIGN KEY (current_product_id)
    REFERENCES product (id) MATCH SIMPLE
)
TABLESPACE pg_default;
ALTER TABLE related
  OWNER to danielchu;
COPY related(id, current_product_id, related_product_id)
FROM '/Users/danielchu/SEC/retail-app_SDC/API/Products/raw_data/related.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX related_idx ON related (current_product_id);