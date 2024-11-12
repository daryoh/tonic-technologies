const { cartService } = require("../services");
const { viewCart } = require("../services/cart");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const cart = await cartService.addToCart({
        userId,
        productId,
        quantity,
      });

      if (cart) {
        return res.status(201).json({
          status: true,
          message: "Product added to cart successfully",
          data: cart,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  removeFromCart: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      const cart = await cartService.removeFromCart({
        userId,
        productId,
        quantity,
      });

      if (cart) {
        return res.status(201).json({
          status: true,
          message: "Product removed from cart successfully",
          data: cart,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  clearCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const cart = await cartService.clearCart(userId);
      if (cart) {
        return res.status(201).json({
          status: true,
          message: "Cart cleared successfully",
          data: cart,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  viewCart: async (req, res) => {
    try {
      const { userId } = req.body;
      const cart = await cartService.viewCart(userId);
      if (cart) {
        return res.status(201).json({
          status: true,
          message: "Cart viewed successfully",
          data: cart,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  cartCheckout: async (req, res) => {
    try {
      const { userId } = req.body;
      const cart = await cartService.checkout(userId);

      if (cart) {
        return res.status(201).json({
          status: true,
          message: "Cart checked out!!!",
          data: cart,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },
};
