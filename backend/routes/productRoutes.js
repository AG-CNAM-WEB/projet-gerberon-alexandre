// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');

// Route pour récupérer tous les produits
router.get('/products', ProductController.getAllProducts);

// Route pour récupérer un produit par ID
router.get('/products/:id', ProductController.getProductById);

// Ajoutez ici d'autres routes pour la création, la mise à jour et la suppression de produits si nécessaire

module.exports = router;
