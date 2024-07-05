// models/product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: false,
      lowercase: true,
    },
    image: {
      type: String,
      required: false,
    },
    rating: {
      rate: {
        type: Number,
        required: false,
      },
      count: {
        type: Number,
        required: false,
      }
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductModel", productSchema);