const listEndpoints = require('express-list-endpoints');
const log = require('../logger');

module.exports = (api) => {
    const data = listEndpoints(api);
    data.forEach((endpoint) => {
        if (endpoint.path !== '*') {
            endpoint.methods.forEach((method) => {
                // log.info(`route: ${method} \t ${endpoint.path}`);
                log.info(`${method} \t ${endpoint.path}`);
            });
        }
    });
};
