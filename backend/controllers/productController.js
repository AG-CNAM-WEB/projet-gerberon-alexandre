// controllers/productController.js

const ProductService = require('../services/productService');

class ProductController {
  static async getAllProducts(req, res) {
    try {
      const result = await ProductService.getAllProducts();
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  static async getProductById(req, res) {
    try {
      const productId = req.params.id;
      const result = await ProductService.getProductById(productId);
      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error('Error in getProductById:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  static async searchProducts(req, res) {
    try {
      const query = req.query.q;
      console.log("query :", query);
      const products = await ProductService.searchProducts(query);
      res.json({ success: true, products });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error searching products' });
    }
  }
}

module.exports = ProductController;
