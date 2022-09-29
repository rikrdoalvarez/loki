require('dotenv').config();
const { corpHeaders } = require('../var/constants');

const headersList = corpHeaders.map((i) => i.name.toLowerCase());

const responseHandler = (req, res, next) => {
    try {
        if (process.env.VALIDATE_HEADERS.toLowerCase() === 'true') {
            const { headers } = req;
            Object.keys(headers).forEach((item) => {
                if (headersList.includes(item)) {
                    res.set(item, headers[item]);
                }
            });
        }
        res.send(res.body);
        res.end();
    } catch (e) {
        next(e, req, res, next);
    }
};

module.exports = { headersList, responseHandler };
