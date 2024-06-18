// services/productService.js

const { product } = require('../models');

class ProductService {
  static async getAllProducts() {
    try {
      const products = await product.findAll();
      return { success: true, products };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, message: 'Failed to fetch products' };
    }
  }

  static async getProductById(productId) {
    try {
      const product = await Product.findByPk(productId);
      if (!product) {
        return { success: false, message: 'Product not found' };
      }
      return { success: true, product };
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      return { success: false, message: 'Failed to fetch product' };
    }
  }

  // Ajoutez ici d'autres méthodes pour la création, la mise à jour et la suppression de produits si nécessaire
}

module.exports = ProductService;
