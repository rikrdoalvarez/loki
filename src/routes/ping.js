const api = require('express').Router();
const controller = require('../controllers/healthcheck.controller');

api.get('', controller.ping);

module.exports = api;
