const MessageModel = require('../../models/message.model');
const ResponseModel = require('../../models/response.model');

const sendMessage = (res, status, message) => {
    try {
        const response = new MessageModel();
        response.statusCode = status;
        response.message = message;

        res.status(response.statusCode).send(response);
    } catch (err) {
        sendError(res, 500, err);
    }
};

const sendResponse = (res, status, message, data) => {
    try {
        const response = new ResponseModel();
        response.statusCode = status;
        response.message = message;
        response.data = data;

        res.status(response.statusCode).send(response);
    } catch (err) {
        sendError(res, 500, err);
    }
};

const sendError = (res, code, message) => {
    if (message !== undefined && message !== '' && message !== null) {
        sendMessage(res, code, message);
    } else {
        switch (code) {
            case 400:
                sendMessage(res, 400, 'Bad Request');
                break;
            case 401:
                sendMessage(res, 401, 'Unauthorized');
                break;
            case 403:
                sendMessage(res, 403, 'Forbidden');
                break;
            case 404:
                sendMessage(res, 404, 'Not Found');
                break;
            case 500:
                sendMessage(res, 500, 'Server Error');
                break;
            default:
                sendMessage(res, code, message);
                break;
        }
    }
};

module.exports = { sendMessage, sendResponse, sendError };
