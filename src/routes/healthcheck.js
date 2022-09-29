const api = require('../core/api');
const controller = require('../controllers/healthcheck.controller');

api.get('', controller.status);

module.exports = api;
