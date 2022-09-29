const appRoot = require('app-root-path');
const winston = require('winston/');

const alignColorsAndTime = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => `[${info.timestamp}]  ${info.level} : ${info.message}`)
);

const alignColorsAndTimeConsole = winston.format.combine(
    winston.format.colorize({
        all: true,
    }),
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => `[${info.timestamp}]  ${info.level} : ${info.message}`)
);

const options = {
    file_error: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: alignColorsAndTime,
    },
    file_info: {
        level: 'info',
        filename: `${appRoot}/logs/all.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: alignColorsAndTime,
    },
    file_debug: {
        level: 'debug',
        filename: `${appRoot}/logs/debug.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
        format: alignColorsAndTime,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        // colorize: true,
        format: alignColorsAndTimeConsole,
    },
};

const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.file_error),
        new winston.transports.File(options.file_info),
        new winston.transports.File(options.file_debug),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// logger.stream = {
//     write(message) {
//         logger.info(message);
//     },
// };

module.exports = logger;
