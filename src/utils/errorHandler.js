class ErrorHandler extends Error {
    constructor(message, statusCode = 500) {
        super();
        if (typeof statusCode === 'string' && message === null) {
            this.statusCode = 500;
            this.message = statusCode;
        } else {
            this.statusCode = statusCode;
            this.message = message;
        }
    }
}

module.exports = ErrorHandler;
