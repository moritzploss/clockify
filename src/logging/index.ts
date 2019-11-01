import winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './logs/all.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.File({
      level: 'error',
      filename: './logs/errors.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),

  ],
  exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
  );
}

const stream = {
  write(message): void {
    logger.info(message);
  },
};

export {
  logger,
  stream,
};
