const express = require("express")
const Offer = require("../models/Offer");
const Product = require("../models/Product");
const bodyParser = require('body-parser')



/**
 * @swagger
 * components:
 *   schemas:
 *     Offer:
 *       type: object
 *       required:
 *         - price
 *         - product
 *       properties:
 *         price:
 *           type: String
 *           description: price
 *         product:
 *           type: String
 *           description: product
 *       example:
 *         price: 4000
 *         product: makine-1
 */

/**
 * @swagger
 *  tags:
 *    name: Offers
 *    description: Offers
 */

/**
 * @swagger
 * /offers:
 *   post:
 *     summary: Create a new offers
 *     tags: [Offer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *     responses:
 *       200:
 *         description: The offers was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       500:
 *         description: Some server error
 */



exports.createOffer = async (req, res) => {
  
  const { price, userId, productId } = req.body;

  try{
    const  product = await Product.find({_id:productId});
  }catch(err){
    res.status(404).json({message :"Product not found" });
  }

  offerBody = {
    price,
    userId,
    product:productId,
  };

  const offer = await Offer.create(offerBody);

     res.json({message:"teklif eklendi"});
    
};

/**
 * @swagger
 * /offers/{product}:
 *   get:
 *     summary: gets offers by product
 *     tags: [Offer]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of offers
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: offers by its product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 *       400:
 *         description: offers can not be found
 */

exports.getOffersOfProduct = async (req, res) => {
  try {
    const offers  = await Offer.find({product:req.params.productId});

    res.json(offers)
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
