require('dotenv').config();
const { init } = require('./core/server');
const app = require('./core/app');
// const db = require('./database/database');

init(app);

// db.createConnection();
// pruebas de conexiones
