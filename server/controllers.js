const db = require('../db/index.js');
const axios = require('axios');

module.exports = {
  getProducts: (req, res) => {
    let {page, count} = req.params;
    let limit = count || 5;
    let offset = (page - 1) * limit || 0;
    db.getProducts()
      .then(response=> res.status(200).send(response.data))
      .catch(err=> res.status(400))
  },

  getProductById: (req, res) => {
    let productID = req.params.product_id;
    db.getProductById(productID)
      .then(response=> res.status(200).send(response.data))
      .catch(err => res.status(400));
  },

  getStyles: (req, res) => {
    let productID = req.params.product_id;
    db.getStyles(productID)
      .then(response => res.status(200).send(response.data))
      .catch(err => res.status(400));
  },

  getRelated: (req, res) => {
    let productID = req.params.product_id;
    db.getRelated(id)
      .then(response => res.status(200).send(response.data))
      .catch(err => res.status(400));
  }
}