require('dotenv').config();
const { Pool } = require('pg');
// const Promise = require('bluebird');
const pool = new Pool({
  user: process.ENV.PGUSER,
  host: process.ENV.PGHOST,
  database: process.ENV.PGDATABASE,
  password: process.ENV.PGPASSWORD,
  port: process.ENV.PGPORT,
});

module.exports = {
  getProducts: (limit, offset) => {
    let queryString = `SELECT * FROM product
      WHERE id <=(${limit} + ${offset})
      LIMIT ${limit} OFFSET ${offset}`;
    return pool.query(queryString)
      .then(res => res.rows)
      .catch(err => console.log('error getting products from db'))
  },

  getProductById: (id) => {
    let queryString = `SELECT json_build_object(
      'id', product.id,
      'name', product.name,
      'slogan', product.slogan,
      'description', product.description,
      'default_price', product.default_price,
      'category', product.category,
      'features', json_agg(
        json_build_object(
          'feature', features.feature,
          'value', features.value
        ))) AS product
      FROM product, features
      WHERE product.id = ${id}
      AND product.id = features.product_id
      GROUP by product.id`;
    return pool.query(queryString)
      .then(res => res.rows[0])
      .catch(err => console.log('error getting product info from db'))
  },

  getStyles: (id) => {
    let queryString = `SELECT styles.product_id, json_agg(
      json_build_object(
        'style_id', styles.id,
        'name', styles.name,
        'original_price', styles.original_price,
        'sale_price', styles.sale_price,
        'default?', styles.default_style,
        'photos', (SELECT json_agg(
          json_build_object(
            'thumbnail_url', photos.thumbnail_url,
            'url', photos.url
          )) FROM photos
          WHERE photos.styleId = styles.id),
        'skus', (SELECT json_object_agg(
          skus.id, json_build_object(
            'size', skus.size,
            'quantity', skus.quantity
        )) AS skus FROM skus
        WHERE skus.styleId = styles.id
        GROUP BY styles.id)
      )) AS results
      FROM styles
      WHERE styles.product_id=${id}
      GROUP BY styles.product_id;`;
    return pool.query(queryString)
      .then(res => res.rows[0])
      .catch(err => console.log('error getting styles from db'))
  },

  getRelated: (id) => {
    let queryString = `SELECT json_agg(
      related_product_id)
      AS related
      FROM related
      WHERE current_product_id=${id}`;
    return pool.query(queryString)
      .then(res => res.rows[0])
      .catch(err => console.log('error getting products from db'))
  }
};


