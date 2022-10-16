const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product");

// Create Product
router.post("/", async (req, res) => {
  const productData = {
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    productTo: req.body.productTo,
  };
  const product = new ProductModel(productData);

  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const prodcts = await ProductModel.find({}).populate("productTo").exec();
    res.status(200).json(prodcts);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Get one product by ID
router.get("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await ProductModel.findOne({ _id })
      .populate("productTo")
      .exec();
    user ? res.status(200).json(user) : res.status(500).json("user not found");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    await ProductModel.deleteOne({ _id });
    res.status(204).send("Deleted Successed");
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// edit product

router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  const product = {
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    timestamp: new Date(),
  };

  try {
    await ProductModel.updateOne({ _id }, { product });
    res.status(200).send("Updated Success");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// update price only!
router.patch("/:id", async (req, res) => {
  console.log(req.body);
  const _id = req.params.id;
  try {
    await ProductModel.updateOne({ _id }, { price: req.body.price });
    res.status(200).send("Updated Success");
    console.log("Updated deleted");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = { productsRouter: router };
