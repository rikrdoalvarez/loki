class ResponseModel {
    statusCode;
    message;
    data;

    constructor() {
        this.statusCode = null;
        this.message = null;
        this.data = null;
    }
}

module.exports = ResponseModel;
