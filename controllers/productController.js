const express = require("express")
const Product = require("../models/Product");
const bodyParser = require('body-parser')


/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - body
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a post
 *         userId:
 *           type: integer
 *           description: id of author
 *         title:
 *           type: string
 *           description: title of post
 *         body:
 *           type: string
 *           descripton: content of post *
 *       example:
 *         id: 1
 *         userId: 1
 *         title: my title
 *         body: my article
 *
 */

/**
 * @swagger
 *  tags:
 *    name: Product
 *    description: Products
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new products
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Some server error
 */

exports.createProduct = async (req, res) => {
  var tenMinutesLater = new Date();
  tenMinutesLater.setMinutes(tenMinutesLater.getMinutes() + 10);

  req.body = {
    ...req.body,
    expiredAt: tenMinutesLater,
  };
  const product = await Product.create(req.body);

  try {
    res.status(201).redirect("products")
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: the list of the products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort('-createdAt');

    res.status(200).render("products", {
      products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};


/**
 * @swagger
 * /products/{slug}:
 *   get:
 *     summary: gets  product
 *     tags: [Product]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id of product
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description:  by its product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: product can not be found
 */
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    res.status(200).render("product", {
      product,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

