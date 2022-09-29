const log = require('./logger');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const trkId = require('./middleware/transactionId');
const requestLogger = require('./middleware/requestResponseLogger');
const { notFoundHandler, errorHandler } = require('./middleware/exceptionsHandler');
const { sendError } = require('../controllers/utils/response.controller');
const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute(s)
    max: process.env.RATE_LIMIT, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (request, response) => sendError(response, 429, 'Too many requests'),
});

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());

app.disable('x-powered-by');
app.use(helmet());
// app.use(csrf);

app.use(cors());
app.use(trkId);
app.use(express.json({ limit: '30mb' }));
app.use(limiter);

// logger de requests
app.use(requestLogger());

app.get('*', csrfProtection, (req, res, next) => {
    // log.debug('CSRF created');
    // log.debug(req.csrfToken());
    // pass the csrfToken to the view
    // res.render('send', { csrfToken: req.csrfToken() });
    next();
});

// app.post('/process', parseForm, csrfProtection, (req, res) => {
//     res.send('data is being processed');
// });
app.get('*', parseForm, csrfProtection, (req, res, next) => {
    if (parseForm && csrfProtection) {
        // log.debug('CSRF validated');
        next();
    } else {
        sendError(res, 403, 'Invalid CSRF-token');
    }
});

// local db
require('../utils/database');

// core endpoints
require('./router/basicRoutes')(app);

// rutas de app
require('./router/index')(app);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
