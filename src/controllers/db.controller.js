const log = require('../core/logger');
const { sendResponse, sendError } = require('./utils/response.controller');
const { isJsonEmpty } = require('../utils/jsonValidator');
const db = require('../utils/db');

const exist = (value) => {
    if (value && value !== null) return true;
    return false;
};

const addUser = async (req, res, next) => {
    try {
        const { rut, company, bu } = req.body;
        if (!isJsonEmpty(req.body) && exist(rut) && exist(company) && exist(bu)) {
            db.addUser(rut, company, bu);
            sendResponse(res, 201, 'User successfully created or updated', req.body);
        } else {
            sendError(res, 400, 'Bad Request');
        }
    } catch (err) {
        if (err.statusCode && err.statusCode !== 500) {
            sendError(res, err.statusCode, err.message);
        } else {
            log.error(err);
            next(err, req, res, next);
        }
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { rut } = req.params;
        if (exist(rut)) {
            const user = db.findUser(rut);
            if (!user) {
                sendResponse(res, 204, 'User not found', rut);
            } else {
                const deleted = db.deleteUser(rut);
                if (deleted) {
                    sendResponse(res, 200, 'User deleted', rut);
                } else {
                    sendResponse(res, 500, 'Error deleting user', rut);
                }
            }
        } else {
            sendError(res, 400, 'Bad Request');
        }
    } catch (err) {
        if (err.statusCode && err.statusCode !== 500) {
            sendError(res, err.statusCode, err.message);
        } else {
            log.error(err);
            next(err, req, res, next);
        }
    }
};

const findUser = async (req, res, next) => {
    try {
        const { rut } = req.params;
        if (exist(rut)) {
            const user = db.findUser(rut);
            if (!user) {
                sendResponse(res, 204, 'User not found', user);
            } else {
                sendResponse(res, 200, 'User found', user);
            }
        } else {
            sendError(res, 400, 'Bad Request');
        }
    } catch (err) {
        if (err.statusCode && err.statusCode !== 500) {
            sendError(res, err.statusCode, err.message);
        } else {
            log.error(err);
            next(err, req, res, next);
        }
    }
};

const addIntent = async (req, res, next) => {
    try {
        const { bu, text, response } = req.body;
        if (!isJsonEmpty(req.body) && exist(bu) && exist(text) && exist(response)) {
            db.addIntent(bu, text, response);
            sendResponse(res, 201, 'Intent successfully created or updated', req.body);
        } else {
            sendError(res, 400, 'Bad Request');
        }
    } catch (err) {
        if (err.statusCode && err.statusCode !== 500) {
            sendError(res, err.statusCode, err.message);
        } else {
            log.error(err);
            next(err, req, res, next);
        }
    }
};

const deleteIntent = async (req, res, next) => {
    try {
        const { bu, text } = req.params;
        if (exist(bu) && exist(text)) {
            const intent = db.findIntent(bu, text);
            if (!intent) {
                sendResponse(res, 204, 'Intent not found', { bu: bu, text: text });
            } else {
                const deleted = db.deleteIntent(bu, text);
                if (deleted) {
                    sendResponse(res, 200, 'Intent deleted', { bu: bu, text: text });
                } else {
                    sendResponse(res, 500, 'Error deleting inetnt', { bu: bu, text: text });
                }
            }
        } else {
            sendError(res, 400, 'Bad Request');
        }
    } catch (err) {
        if (err.statusCode && err.statusCode !== 500) {
            sendError(res, err.statusCode, err.message);
        } else {
            log.error(err);
            next(err, req, res, next);
        }
    }
};

const findIntent = async (req, res, next) => {
    try {
        const { bu, text } = req.params;
        if (exist(bu) && exist(text)) {
            const intent = db.findIntent(bu, text);
            if (!intent) {
                sendResponse(res, 204, 'Intent not found', { bu: bu, text: text });
            } else {
                sendResponse(res, 200, 'Intent found', { bu: bu, text: text, response: intent.response });
            }
        } else {
            sendError(res, 400, 'Bad Request');
        }
    } catch (err) {
        if (err.statusCode && err.statusCode !== 500) {
            sendError(res, err.statusCode, err.message);
        } else {
            log.error(err);
            next(err, req, res, next);
        }
    }
};

const clearCollection = async (req, res, next) => {
    try {
        const { name } = req.params;
        const dbs = ['user', 'intent'];

        if (exist(name)) {
            const deleted = db.clearCollection(name);
            if (deleted) {
                sendResponse(res, 200, 'Collection clean', name);
            } else {
                sendResponse(res, 500, 'Error cleaning collection', name);
            }
        } else {
            sendError(res, 400, 'Bad Request');
        }
    } catch (err) {
        if (err.statusCode && err.statusCode !== 500) {
            sendError(res, err.statusCode, err.message);
        } else {
            log.error(err);
            next(err, req, res, next);
        }
    }
};

module.exports = {
    addUser,
    deleteUser,
    findUser,
    addIntent,
    deleteIntent,
    findIntent,
    clearCollection,
};
