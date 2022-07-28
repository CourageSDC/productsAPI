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

db.getProducts = () => {
  let queryString = ``;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting products from db'))
}

  //argument is product_id
db.getProductById = (id) => {
  let queryString = ``;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting product info from db'))
}

  //argument is product_id
db.getStyles = (id) => {
  let queryString = ``;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting products from db'))
}

//argument is product_id
db.getRelated = (id) => {
  let queryString = ``;
  pool.query(queryString)
    .then(res => res.rows)
    .catch(err = console.log('error getting products from db'))
}


module.exports = db;