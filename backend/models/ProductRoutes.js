const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product
router.post("/", async (req, res) => {
  const { name, url, currentPrice } = req.body;
  try {
    const newProduct = new Product({
      name,
      url,
      currentPrice,
      previousPrice: currentPrice,
      priceHistory: [{ price: currentPrice }],
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update product price
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.previousPrice = product.currentPrice;
    product.currentPrice = req.body.currentPrice;
    product.priceHistory.push({ price: req.body.currentPrice });

    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;