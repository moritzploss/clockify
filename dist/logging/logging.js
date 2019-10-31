var winston = require('winston');
var logger = winston.createLogger({
    format: winston.format.combine(winston.format.colorize(), winston.format.prettyPrint()),
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false,
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/errors.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880,
            maxFiles: 5,
            colorize: false,
        }),
    ],
    exitOnError: false,
});
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    }));
}
var stream = {
    write: function (message) {
        logger.info(message);
    },
};
module.exports = {
    logger: logger,
    stream: stream,
};
