const ProductService = require('../services/productService');
const LoggerService = require('../helpers/loggerService');

const logger = new LoggerService('productController');

const ProductController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductService.getAllProducts(req.query);
      res.json(products);
    } catch (error) {
      logger.error('Error in getAllProducts controller:', error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await ProductService.getProductById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(error.message === 'Product not found' ? 404 : 500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = await ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      logger.error('Error in createProduct controller:', error.message);
      res.status(400).json({ message: error.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await ProductService.updateProduct(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      logger.error('Error in updateProduct controller:', error.message);
      res.status(error.message === 'Product not found' ? 404 : 400).json({ message: error.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const result = await ProductService.deleteProduct(req.params.id);
      res.json(result);
    } catch (error) {
      logger.error('Error in deleteProduct controller:', error.message);
      res.status(error.message === 'Product not found' ? 404 : 500).json({ message: error.message });
    }
  }
};

module.exports = ProductController;