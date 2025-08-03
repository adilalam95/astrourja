const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Public routes (no authentication required)
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);

// Protected routes (require authentication)
router.post('/', authMiddleware, ProductController.createProduct);
router.put('/:id', authMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, ProductController.deleteProduct);

module.exports = router;