require('dotenv').config();
const fs = require('fs-extra');
const path = require('path');
const log = require('../logger');

const routes = path.resolve(__dirname, '../../routes');
const listPath = require('./listPath');
const { validateHeaders, processValidation } = require('../middleware/validateCorpHeaders');

const pathCapacity = process.env.PATH_CAPACITY;
const pkg = require('../../../package.json');
const packageName = pkg.name;

log.info(`Environment: ${process.env.ENVIRONMENT}`);

module.exports = (app) => {
    if (process.env.VALIDATE_HEADERS.toLowerCase() === 'true') {
        log.info('The Corporate Headers will be validated');
        app.get('*', validateHeaders, processValidation);
        app.post('*', validateHeaders, processValidation);
        app.put('*', validateHeaders, processValidation);
        app.patch('*', validateHeaders, processValidation);
        app.delete('*', validateHeaders, processValidation);
    }
    fs.readdirSync(routes)
        .filter((file) => file.indexOf('.') !== 0 && file.slice(-3) === '.js')
        .forEach((file) => {
            const name = file.split('.').shift();
            const f = require(`../../routes/${file}`); // eslint-disable-line
            if (name !== 'healthcheck' && name !== 'ping') {
                app.use(`/${packageName}/${pathCapacity}/${name}`, f);
            }
        });

    listPath(app);
};
