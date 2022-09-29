const http = require('http');
const log = require('./logger');
const ErrorHandler = require('../utils/errorHandler');
const config = require('../config/config');

const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
};

const init = (app) => {
    const port = normalizePort(config.PORT || '3001');
    app.set('port', port);

    const server = http.createServer(app);
    server.listen(port);
    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
        switch (error.code) {
            case 'EACCES':
                log.error(`${bind} requires elevated privileges`);
                throw new ErrorHandler(`${bind} requires elevated privileges`, 500);
            case 'EADDRINUSE':
                log.error(`${bind} is already in use`);
                throw new ErrorHandler(`${bind} is already in use`, 500);
            default:
                throw new ErrorHandler(error.message, 500);
        }
    });
    server.on('listening', () => {
        const addr = server.address();
        const bind = typeof addr === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
        log.info(`Listening on ${bind}`);
    });
};

module.exports = { init, normalizePort };
