const api = require('express').Router();
const db = require('../controllers/db.controller');

api.post('/addUser', db.addUser);
api.delete('/deleteUser/:rut', db.deleteUser);
api.get('/findUser/:rut', db.findUser);
api.post('/addIntent', db.addIntent);
api.delete('/deleteIntent/:bu/:text', db.deleteIntent);
api.get('/findIntent/:bu/:text', db.findIntent);
api.delete('/clearCollection/:name', db.clearCollection);

module.exports = api;
