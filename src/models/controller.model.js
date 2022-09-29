const lines = [];

lines.push("const log = require('../core/logger');");
lines.push("const { sendResponse, sendError } = require('./utils/response');");
lines.push('');
lines.push('const _NAME_ = async (req, res, next) => {');
lines.push('	try {');
lines.push("		sendResponse(res, 200, 'Value endpoint example', 'Hello');");
lines.push('	} catch (err) {');
lines.push('		if (err.statusCode && err.statusCode !== 500) {');
lines.push('			sendError(res, err.statusCode, err.message);');
lines.push('		} else {');
lines.push('			log.error(err);');
lines.push('			next(err, req, res, next);');
lines.push('		}');
lines.push('	}');
lines.push('};');
lines.push('');
lines.push('module.exports = { _NAME_ };');

const modelController = lines.join('\n');

module.exports = { modelController };
