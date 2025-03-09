import express from "express";
import Product from "../models/Product.js";
import getPriceFromWebsite from "../utils/priceScraper.js";
import sendEmail from "../utils/sendEmail.js";
import cron from "node-cron";

const router = express.Router();

// Function to update product prices
const updateAllProductPrices = async () => {
  try {
    const products = await Product.find();
    for (const product of products) {
      const newPrice = await getPriceFromWebsite(product.url);
      if (newPrice && newPrice !== product.currentPrice) {
        const oldPrice = product.currentPrice;
        product.currentPrice = newPrice;
        product.priceHistory.push({ price: newPrice });
        await product.save();
        if (newPrice < oldPrice) {
          console.log(`⚠️ Price Drop Alert! ${product.name} dropped from ₹${oldPrice} to ₹${newPrice}`);
          await sendEmail(product.userEmail, "Price Drop Alert!", `The price of ${product.name} has dropped from ₹${oldPrice} to ₹${newPrice}!`);
        }
      }
    }
    console.log("✅ Price tracking completed!");
  } catch (err) {
    console.error("❌ Error updating prices:", err.message);
  }
};

// Run price tracking every 10 minutes
cron.schedule("*/10 * * * *", () => {
  console.log("⏳ Running automatic price tracking...");
  updateAllProductPrices();
});

export default router;
