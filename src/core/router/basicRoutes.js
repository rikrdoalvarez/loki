const healthcheck = require('../../routes/healthcheck');
const ping = require('../../routes/ping');
const pkg = require('../../../package.json');
const packageName = pkg.name;

module.exports = (app) => {
    app.use(`/${packageName}/health`, healthcheck);
    app.use(`/${packageName}/ping`, ping);
};
