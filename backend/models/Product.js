import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  priceHistory: [priceHistorySchema],
  currentPrice: { type: Number, required: true },
  userEmail: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
