require('dotenv').config();
const { corpHeaders } = require('../var/constants');

const headersList = corpHeaders.map((i) => i.name);

const responseHandler = (req, res, next) => {
    try {
        if (process.env.RETURN_CORP_HEADERS.toLowerCase() === 'true') {
            const { headers } = req;
            Object.keys(headers).forEach((item) => {
                if (headersList.includes(item)) {
                    res.header(item, headers[item]);
                }
            });
        }
        res.status(res.statusCode);
        res.json(res.body);
        next(req, res, next);
    } catch (err) {
        next(err, req, res, next);
    }
};

module.exports = { headersList, responseHandler };
