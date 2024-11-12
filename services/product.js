const { Product } = require("../models");

module.exports = {
  createProduct: async (data) => {
    try {
      const newProduct = await Product.create(data);
      return newProduct;
    } catch (err) {
      return null;
    }
  },

  getProducts: async (page, limit) => {
    try {
      const count = await Product.countDocuments();
      const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
      return { products, count };
    } catch (err) {
      return null;
    }
  },

  getProduct: async (id) => {
    try {
      const product = await Product.findById(id);
      return product;
    } catch (err) {
      return null;
    }
  },

  updateProduct: async (id, data) => {
    try {
      const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      return product;
    } catch (err) {
      return null;
    }
  },

  deleteProduct: async (id) => {
    try {
      const product = await Product.findByIdAndDelete(id);
      return product;
    } catch (err) {
      return null;
    }
  },
};
