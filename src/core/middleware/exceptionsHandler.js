const isEqual = require('fast-deep-equal');

const deepUnique = (elem, index, array) => {
    for (let i = 0; i < index; i += 1) {
        // eslint-disable-line
        if (isEqual(array[i], elem)) return false;
    }
    return true;
};

const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: "Route doesn't exists. please verify",
    });
};

const errorHandler = (err, req, res) => {
    // eslint-disable-line
    try {
        const { statusCode, message } = err;
        if (typeof statusCode !== 'number' || message === null) {
            res.status(500).json({ error: 'Application Error, please check logs to confirm' });
        } else {
            const newMessage = message.filter(deepUnique);
            res.status(statusCode).json(newMessage);
        }
    } catch (e) {
        res.status(500).json({
            error: 'Application Error, please check logs to confirm',
        });
    }
};

module.exports = {
    deepUnique,
    notFoundHandler,
    errorHandler,
};
