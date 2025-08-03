const AuthService = require('../services/authService');
const LoggerService = require('../helpers/loggerService');

const logger = new LoggerService('authController');

const AuthController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.register({ email, password });
      res.status(201).json(result);
    } catch (error) {
      logger.error('Error in register controller:', error.message);
      res.status(error.message === 'Email already in use' ? 400 : 500).json({ message: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login({ email, password });
      res.json(result);
    } catch (error) {
      logger.error('Error in login controller:', error.message);
      res.status(error.message === 'Invalid credentials' ? 401 : 500).json({ message: error.message });
    }
  }
};

module.exports = AuthController;