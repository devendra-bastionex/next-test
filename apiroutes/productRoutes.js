const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct, getFeaturedProducts } = require('../apicontrollers/productController');

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(createProduct);

router.route('/featured')
  .get(getFeaturedProducts);

router.route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;