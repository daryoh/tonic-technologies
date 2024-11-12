const { productService } = require("../services");

module.exports = {
  addProduct: async (req, res) => {
    try {
      const { name, description, category, price, stockQuantity } = req.body;

      if (!name || !description || !category || !price || !stockQuantity) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newProduct = await productService.createProduct({
          name,
          description,
          category,
          price,
          stockQuantity
      });

      if (newProduct) {
        return res.status(201).json({
          status: true,
          message: "Product created successfully",
          data: newProduct,
        });
      }
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  allProducts: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const { products, count } = await productService.getProducts(page, limit);

      res.status(200).json({
        status: true,
        message: "Products fetched successfully",
        data: {
          products,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  oneProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await productService.getProduct(id);
      res.status(200).json({
        status: true,
        message: "Product fetched successfully",
        data: product,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const updateProduct = await productService.updateProduct(id, req.body);
      res.status(200).json({
        status: true,
        message: "Product updated successfully",
        data: updateProduct,
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteProduct = await productService.deleteProduct(id);
      res.status(200).json({
        status: true,
        message: 'Product deleted successfully',
      });
    } catch (err) {
      res.status(400).json({
        status: false,
        message: err.message,
      });
    }
  },
};
