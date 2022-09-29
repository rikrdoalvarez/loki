const loki = require('lokijs');
const dbUser = new loki('dbUser.json');
const dbIntent = new loki('dbIntent.json');

dbUser.addCollection('user');
dbIntent.addCollection('intents');

dbUser.saveDatabase();
dbIntent.saveDatabase();
