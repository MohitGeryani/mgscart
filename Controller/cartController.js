// Add Cart item





export const AddtocartController = async (req, res) => {

    
  try {
    const { userId, product } = req.body;

    // Check if the item is already in the cart
    const existingCartItem = await CartItem.findOne({ userId, productId: product._id });

    if (existingCartItem) {
      // If it exists, update the quantity or any other relevant fields
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      // If it doesn't exist, create a new cart item
      const cartItem = new CartItem({
        userId,
        productId: product._id,
        quantity: 1,
        // You can add more fields as needed, such as product details
      });

      await cartItem.save();
    }

    res.json({ success: true, message: 'Item added to the cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}