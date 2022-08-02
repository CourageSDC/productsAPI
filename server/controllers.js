const db = require('../db/index.js');
const axios = require('axios');

module.exports = {
  getProducts: (req, res) => {
    let {page, count} = req.query;
    let limit = count || 5;
    let offset = (page - 1) * limit || 0;
    db.getProducts(limit, offset)
      .then(response=> res.status(200).send(response))
      .catch(err=> res.status(400))
  },

  getProductById: (req, res) => {
    let productID = req.params.product_id;
    db.getProductById(productID)
      .then(response=> res.status(200).send(response.product))
      .catch(err => res.status(400));
  },

  getStyles: (req, res) => {
    let productID = req.params.product_id;
    db.getStyles(productID)
      .then(response => res.status(200).send(response))
      .catch(err => res.status(400));
  },

  getRelated: (req, res) => {
    let productID = req.params.product_id;
    db.getRelated(productID)
      .then(response => res.status(200).send(response.related))
      .catch(err => res.status(400));
  }
}