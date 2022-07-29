const { Pool } = require('pg');
// const Promise = require('bluebird');
const pool = new Pool({
  user: 'danielchu',
  database: 'productAPI',
  host: 'localhost',
  password: '',
  port: 5432,
});

// const db = Promise.promisifyAll(pool, {multiArgs: true});

db.getProducts = (params) => {
  let queryString = `SELECT * FROM product`;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting products from db'))
}

  //argument is product_id-
db.getProductById = (id) => {
  let queryString = `SELECT json_build_object(
    'id', product.id,
    'name', product.name,
    'slogan', product.slogan,
    'description', product.description,
    'default_price', product.default_price,
    'features', json_agg(
      json_build_object(
        'feature', features.feature,
        'value', features.value
      )))
    FROM product, features
    WHERE product.id = ${id}
    AND product.id = features.product_id
    GROUP by product.id`;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting product info from db'))
}

  //argument is product_id
db.getStyles = (id) => {
  let queryString = `SELECT json_build_object(
    'product_id', styles.product_id,
    'results', json_agg(
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
        )) FROM skus
        WHERE skus.styleId = styles.id
        GROUP BY styles.id)
      ))
    ) FROM styles
    WHERE styles.product_id = ${id}
    GROUP BY styles.product_id`;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting products from db'))
}

//argument is product_id
db.getRelated = (id) => {
  let queryString = `SELECT related_product_id FROM related
    WHERE current_product_id=${id}`;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting products from db'))
}

module.exports = db;