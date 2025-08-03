const winston = require('winston');

class LoggerService {
  constructor(context) {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp'] })
      ),
      defaultMeta: { context },
      transports: [
        new winston.transports.File({ filename: 'logs/app.log' }),
        new winston.transports.Console()
      ]
    });
  }

  info(message, meta = {}) {
    this.logger.info(message, meta);
  }

  warn(message, meta = {}) {
    this.logger.warn(message, meta);
  }

  error(message, meta = {}) {
    this.logger.error(message, meta);
  }
}

module.exports = LoggerService;