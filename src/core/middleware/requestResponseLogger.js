const audit = require('express-requests-logger');
const appRoot = require('app-root-path');
const winston = require('winston');

const pkg = require('../../../package.json');

const alignColorsAndTime = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => `[${info.timestamp}]  ${info.level} : ${JSON.stringify(info.message)}`)
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
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        // colorize: true,
        format: alignColorsAndTimeConsole,
    },
};

const logger = winston.createLogger({
    transports: [new winston.transports.File(options.file_info), new winston.transports.Console(options.console)],
    exitOnError: false, // do not exit on handled exceptions
});

module.exports = () =>
    audit({
        name: pkg.name,
        logger,
        request: {
            maskBody: ['password'],
            excludeHeaders: ['Authorization'],
            maxBodyLength: 250,
        },
        response: {
            maskBody: ['session_token'],
            excludeHeaders: ['*'],
            maxBodyLength: 250,
            levels: {
                '2xx': 'info',
                401: 'warn',
                '4xx': 'info',
                503: 'warn',
                '5xx': 'error',
            },
        },
    });
