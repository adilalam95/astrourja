const Product = require('../models/product');
const LoggerService = require('../helpers/loggerService');

const logger = new LoggerService('productService');

const ProductService = {
  getAllProducts: async ({ category, priceMin, priceMax, name }) => {
    try {
      let query = {};

      if (category) query.category = category;
      if (priceMin) query.price = { $gte: priceMin };
      if (priceMax) query.price = { ...query.price, $lte: priceMax };
      if (name) query.name = { $regex: name, $options: 'i' };

      const products = await Product.find(query);
      logger.info('Fetched products with filters', { category, priceMin, priceMax, name });
      return products;
    } catch (error) {
      logger.error('Error fetching products:', error.message);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const product = await Product.findById(id);
      if (!product) {
        logger.warn(`Product not found: ${id}`);
        throw new Error('Product not found');
      }
      logger.info(`Fetched product: ${id}`);
      return product;
    } catch (error) {
      logger.error(`Error fetching product ${id}:`, error.message);
      throw error;
    }
  },

  createProduct: async (data) => {
    try {
      const product = new Product(data);
      await product.save();
      logger.info(`Created product: ${product._id}`);
      return product;
    } catch (error) {
      logger.error('Error creating product:', error.message);
      throw error;
    }
  },

  updateProduct: async (id, data) => {
    try {
      const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
      });
      if (!product) {
        logger.warn(`Product not found for update: ${id}`);
        throw new Error('Product not found');
      }
      logger.info(`Updated product: ${id}`);
      return product;
    } catch (error) {
      logger.error(`Error updating product ${id}:`, error.message);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        logger.warn(`Product not found for deletion: ${id}`);
        throw new Error('Product not found');
      }
      logger.info(`Deleted product: ${id}`);
      return { message: 'Product deleted' };
    } catch (error) {
      logger.error(`Error deleting product ${id}:`, error.message);
      throw error;
    }
  }
};

module.exports = ProductService;