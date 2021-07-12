const express = require('express')
const offerController = require('../controllers/offerController')

const router = express.Router()

router.route('/').post(offerController.createOffer)
router.route('/:productId').get(offerController.getOffersOfProduct)

module.exports = router;