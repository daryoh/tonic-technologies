const { Product } = require("../models");

module.exports = {
  createProduct: async (data) => {
    const newProduct = await Product.create(data);
    return newProduct;
  },

  getProducts: async (page, limit) => {
    const count = await Product.countDocuments();
    const products = await Product.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    return { products, count };
  },

  getProduct: async (id) => {
    const product = await Product.findById(id);
    return product;
  },

  updateProduct: async (id, data) => {
    const product = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    return product;
  },

  deleteProduct: async (id) => {
    const product = await Product.findByIdAndDelete(id);
    return product;
  },
};
