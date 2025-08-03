const jwt = require('jsonwebtoken');
const LoggerService = require('../helpers/loggerService');

const logger = new LoggerService('authMiddleware');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    logger.warn('Authorization attempt without token');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    logger.info(`User ${decoded.id} authenticated successfully`);
    next();
  } catch (error) {
    logger.error('Invalid token:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware