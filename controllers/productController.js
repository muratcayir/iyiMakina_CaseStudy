const express = require("express")
const Product = require("../models/Product");
const bodyParser = require('body-parser')


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

