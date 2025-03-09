const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Add Product for Price Tracking
router.post("/track-product", authMiddleware, async (req, res) => {
  const { productUrl, alertType, targetPrice } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.trackedProducts.push({ productUrl, alertType, targetPrice });
    await user.save();

    res.json({ msg: "Product added for tracking!" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Get Tracked Products
router.get("/tracked-products", authMiddleware, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user.trackedProducts);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;