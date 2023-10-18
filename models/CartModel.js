// Import Mongoose
const mongoose = require('mongoose');

// Define the CartItem schema
const cartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the user who owns the cart item
    ref: 'User', // Reference to the User model (if you have one)
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the product
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1, // Default quantity is 1
  },
  // You can add more fields as needed
});

// Create the CartItem model
const CartItems = mongoose.model('CartItems', cartItemSchema);

module.exports = CartItems;
