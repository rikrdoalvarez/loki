const lines = [];

lines.push("const api = require('express').Router();");
lines.push("const _NAME_ = require('../controllers/_NAME_.controller');");
lines.push('');
lines.push("api.get('', _NAME_._NAME_);");
lines.push('');
lines.push('module.exports = api;');

const modelRoute = lines.join('\n');

module.exports = { modelRoute };
