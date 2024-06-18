// services/productService.js
const Sequelize = require('sequelize');
const { product } = require('../models');
const { Op } = require('sequelize');

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

    static async searchProducts(query) {
        try {
            return await product.findAll({
                where: {
                    [Op.or]: [
                        { name: { [Op.like]: `%${query}%` } },
                        { brand: { [Op.like]: `%${query}%` } },
                        { model: { [Op.like]: `%${query}%` } },
                        Sequelize.where(Sequelize.cast(Sequelize.col('year'), 'TEXT'), {
                            [Op.like]: `%${query}%`
                        }),
                        Sequelize.where(Sequelize.cast(Sequelize.col('price'), 'TEXT'), {
                            [Op.like]: `%${query}%`
                        })
                    ]
                }
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            return { success: false, message: 'Failed to fetch products' };
        }
    }    
}

module.exports = ProductService;
