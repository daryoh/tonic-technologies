const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true
    },
    items: [cartItemSchema],
    totalAmount: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'checkout', 'abandoned'],
      default: 'active'
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
