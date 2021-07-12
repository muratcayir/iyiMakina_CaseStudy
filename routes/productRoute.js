const express = require('express')
const productController = require('../controllers/productController')

const router = express.Router()

router.route('/:slug').get(productController.getProduct);
router.route('/').get(productController.getAllProducts);
router.route('/').post(productController.createProduct)


module.exports = router;