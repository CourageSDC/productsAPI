//import router and controller functions
const express = require('express');
const router = express.Router();
// const router = require('express-promise-router')();
const controller = require('./controllers.js');

//set routes
router.use(function(req, res, next) {
  // console.log(req.url, '@', Date.now());
  next();
});

router
  .route('/')
  .get(controller.getProducts);

router
  .route('/:product_id')
  .get(controller.getProductById);

router
  .route('/:product_id/styles')
  .get(controller.getStyles);

router
  .route('/:product_id/related')
  .get(controller.getRelated);

module.exports = router;