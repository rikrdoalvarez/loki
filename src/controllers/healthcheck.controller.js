const { sendMessage } = require('./utils/response.controller');

const status = async (req, res) => {
    sendMessage(res, 200, 'ok');
};

const ping = async (req, res) => {
    sendMessage(res, 200, 'pong');
};

module.exports = { status, ping };
