const { Cart, Product } = require("../models");
const  redisService  = require("./redis");
const mongoose = require("mongoose");

module.exports = {
    addToCart: async ({ userId, productId, quantity }) => {
        const session = await mongoose.startSession();
        session.startTransaction();
      
        try {
            const product = await Product.findById(productId).session(session);
      
          if (!product) {
            throw new Error("Product not found");
          }
      
          // Check if product already exists in cart
          const existingCart = await Cart.findOne({ 
            userId, 
            'items.productId': productId 
          }).session(session);
      
          let totalRequestedQuantity = quantity;
          if (existingCart) {
            const existingItem = existingCart.items.find(
              item => item.productId.toString() === productId
            );
            totalRequestedQuantity += existingItem.quantity;
          }
      
          // Validate total quantity against stock
          if (product.stockQuantity < totalRequestedQuantity) {
            throw new Error(`Only ${product.stockQuantity} units available in stock`);
          }
      
          let cart;
          if (existingCart) {
            cart = await Cart.findOneAndUpdate(
              { userId, 'items.productId': productId },
              { $inc: { 'items.$.quantity': quantity } },
              { new: true, session }
            );
          } else {
            cart = await Cart.findOneAndUpdate(
              { userId },
              { $push: { items: { productId, quantity } } },
              { upsert: true, new: true, session }
            );
          }
      
            await session.commitTransaction();
            await redisService.del(`products`);

          return cart;
      
        } catch (error) {
            console.log(error)
          if (session.inTransaction()) {
            await session.abortTransaction();
          }
          throw error;
        } finally {
          session.endSession();
        }
      },
      

  removeFromCart: async ({ userId, productId, quantity }) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await Cart.findOne({ userId }).session(session);
      if (!cart) {
        throw new Error("Cart not found");
      }

      const cartItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (!cartItem) {
        throw new Error("Item not found in cart");
      }

      // If quantity to remove >= cart quantity, remove the entire item
      if (quantity >= cartItem.quantity) {
        await Cart.findOneAndUpdate(
          { userId },
          { $pull: { items: { productId } } },
          { session }
        );
      } else {
        // Reduce the quantity
        await Cart.findOneAndUpdate(
          { userId, "items.productId": productId },
          { $inc: { "items.$.quantity": -quantity } },
          { session }
        );
      }

      // Return stock to inventory
      await Product.findByIdAndUpdate(
        productId,
        { $inc: { stockQuantity: quantity } },
        { session }
      );

      await session.commitTransaction();
      await redisService.del(`cart:${userId}`);

      return await Cart.findOne({ userId });
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      session.endSession();
    }
  },

  clearCart: async (userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get cart contents before clearing
      const cart = await Cart.findOne({ userId }).session(session);
      if (!cart) {
        return { message: "Cart is already empty" };
      }

      // Return all quantities back to inventory
      const stockUpdates = cart.items.map((item) =>
        Product.findByIdAndUpdate(
          item.productId,
          { $inc: { stockQuantity: item.quantity } },
          { session }
        )
      );
      await Promise.all(stockUpdates);

      // Remove the cart
      await Cart.deleteOne({ userId }).session(session);

      // Clear cache
      await redisService.del(`cart:${userId}`);

      await session.commitTransaction();
      return { message: "Cart cleared successfully" };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },

  viewCart: async (userId) => {
    try {
      // Find the cart and populate product details
      const cart = await Cart.findOne({ userId }).populate({
        path: "items.productId",
        model: "Product",
        select: "name price description",
      });

      if (!cart) {
        return {
          userId,
          items: [],
          totalAmount: 0,
          status: "active",
        };
      }

      // Calculate total amount
      const totalAmount = cart.items.reduce((sum, item) => {
        const productPrice = item.productId.price || 0;
        return sum + productPrice * item.quantity;
      }, 0);

      // Update total amount if changed
      if (cart.totalAmount !== totalAmount) {
        cart.totalAmount = totalAmount;
        await cart.save();
      }

      return cart;
    } catch (error) {
      throw error;
    }
  },

  checkout: async (userId) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const cart = await Cart.findOne({ userId }).session(session);
      if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
      }

      // Verify stock availability for all items
      for (const item of cart.items) {
        const product = await Product.findById(item.productId).session(session);
        if (!product || product.stockQuantity < item.quantity) {
          throw new Error(`Insufficient stock for product ${product.name}`);
        }
      }

      // Process the order
      await Cart.deleteOne({ userId }).session(session);
      await redisService.del(`cart:${userId}`);

      await session.commitTransaction();
      return { success: true, message: "Checkout completed successfully" };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  },
};
