"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var logger = winston.createLogger({
    format: winston.format.combine(winston.format.colorize(), winston.format.prettyPrint()),
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/all.log',
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.File({
            level: 'error',
            filename: './logs/errors.log',
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ],
    exitOnError: false,
});
exports.logger = logger;
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
    }));
}
var stream = {
    write: function (message) {
        logger.info(message);
    },
};
exports.stream = stream;
