const fs = require('fs-extra');
const log = require('../logger');
const ErrorHandler = require('../../utils/errorHandler');

module.exports = () => {
    try {
        if (fs.existsSync('.env')) {
            log.info('variables file ".env" exists');
        } else {
            throw new Error('variables file ".env"  does not exist');
        }
    } catch (e) {
        log.error(e);
        throw new ErrorHandler(e.message, 500);
    }
};
