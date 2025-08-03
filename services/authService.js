const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const LoggerService = require('../helpers/loggerService');

const logger = new LoggerService('authService');

const AuthService = {
  verifyPassword: async (password, hashedPassword) => {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      logger.error('Error verifying password:', error.message);
      throw error;
    }
  },

  register: async ({ email, password }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        logger.warn(`Registration attempt with existing email: ${email}`);
        throw new Error('Email already in use');
      }

      const hashedPassword = await bcrypt.hash(password, 8);
      const user = new User({ email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      logger.info(`User registered: ${email}`);
      return { token };
    } catch (error) {
      logger.error('Error in register service:', error.message);
      throw error;
    }
  },

  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !(await AuthService.verifyPassword(password, user.password))) {
        logger.warn(`Failed login attempt for email: ${email}`);
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });

      logger.info(`User logged in: ${email}`);
      return { token };
    } catch (error) {
      logger.error('Error in login service:', error.message);
      throw error;
    }
  }
};

module.exports = AuthService;