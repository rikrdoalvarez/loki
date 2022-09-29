require('dotenv').config();
require('axios-debug-log');
const log = require('./logger');
const axios = require('axios');
const crypto = require('javascript-func/crypto');
const { corpHeaders, securityHeaders } = require('./var/constants');
const { urlpath } = require('../utils/sanitize');
const ErrorHandler = require('../utils/errorHandler');
const { ENCRYPT_SECRET_KEY: key, ENCRYPTED_OUTPUT: output, REQUEST_TEST: requestTest } = process.env;

class Request {
    constructor(baseURL) {
        this.baseURL = baseURL;
        this.headers = {};
        this.payload = {};
        this.method = '';
    }

    addPath(str) {
        this.path = urlpath(str);
        return this;
    }

    getPath() {
        if (this.path === '') throw new ErrorHandler('Path must not be empty, use addPath method', 400);
        return this.path;
    }

    addHeader({ name, value }) {
        if (name === undefined || name === '') throw new ErrorHandler('Name param is mandatory', 400);
        if (value === undefined || value === '') throw new ErrorHandler('Value param is mandatory', 400);

        this.headers[name] = value;
        return this;
    }

    addHeaders(arr) {
        if (!Array.isArray(arr)) throw new ErrorHandler('Param must be an array', 400);
        arr.forEach((item, i) => {
            if (!('name' in item)) throw new ErrorHandler(`Item doesn't have key name in index ${i}`, 400);
            if (!('value' in item)) throw new ErrorHandler(`Item doesn't have key value in index ${i}`, 400);
            this.addHeader({ name: item.name, value: item.value });
        });
    }

    addCorpHeaders(req) {
        const { headers } = req;
        const arrayHeaders = corpHeaders.map((header) => header.name.toLowerCase());
        const requestHeaders = arrayHeaders
            .map((corpHeader) => ({
                name: corpHeader,
                value: headers[corpHeader],
            }))
            // .filter((header) => header.value !== undefined);
            .filter((header) => header.value);
        this.addHeaders(requestHeaders);
        return this;
    }

    addSecurityHeaders() {
        const keys = Object.keys(securityHeaders);
        for (let i = 0; i < keys.length; i += 1) {
            const values = securityHeaders[keys[i]];
            this.addHeader(values);
        }
        return this;
    }

    addAuthorizationBearer(token) {
        if (token === undefined || token === '') throw new ErrorHandler('Token must be a valid value', 403);
        if (token.includes('Bearer')) {
            this.headers.authorization = `Bearer ${token.split(' ')[1]}`;
        } else {
            this.headers.authorization = `Bearer ${token}`;
        }
        return this;
    }

    addBasicAuth(username, password) {
        try {
            this.auth = {
                username,
                password,
            };
        } catch (e) {
            throw new ErrorHandler(e.message, 403);
        }
        return this;
    }

    createRequestBody(method, payload) {
        let body;
        if (payload !== null && payload !== '' && payload !== undefined) {
            body = {
                method,
                baseURL: this.baseURL,
                url: this.path,
                data: payload,
                headers: this.headers,
                auth: this.auth,
            };
        } else {
            body = {
                method,
                baseURL: this.baseURL,
                url: this.path,
                // data: payload,
                headers: this.headers,
                auth: this.auth,
            };
        }
        return body;
    }

    async request(method, payload) {
        try {
            let payloadBody = payload;
            if (payload === undefined) {
                payloadBody = null;
            }
            if (payloadBody && output.toLowerCase() === 'true') {
                payloadBody = { payload: await crypto.encrypt(JSON.stringify(payloadBody), key, output) };
            }
            // console.info(`REQUEST:{req.body:${JSON.stringify(payload)}}`, requestTest);
            if (payloadBody && requestTest.toLowerCase() === 'true') {
                // log.debug(`REQUEST:{req.body:${JSON.stringify(payloadBody)}}`);
            }

            const { status, data } = await axios.request(this.createRequestBody(method, payloadBody));

            const resp = { status, data };
            if (status === 200) {
                // console.info(`RESPONSE:{data:${JSON.stringify(resp.data)}}`, requestTest);
                if (requestTest.toLowerCase() === 'true') {
                    // log.debug(`RESPONSE:{data:${JSON.stringify(resp.data)}}`);
                }
                const data_decrypted = await crypto.receive(data, key, output);
                resp.data = data_decrypted;
            }
            return resp;
            // return { status, data };
        } catch (e) {
            log.error(e);
            if (e.response.status !== 400) {
                throw new ErrorHandler(e.response.statusText, e.response.status);
            } else {
                throw new ErrorHandler(e.message, 400);
            }
        }
    }

    async post(data) {
        const response = await this.request('post', data);
        return response;
    }

    async get() {
        const response = await this.request('get');
        return response;
    }

    async delete() {
        const response = await this.request('delete');
        return response;
    }

    async put(data) {
        const response = await this.request('put', data);
        return response;
    }

    async patch(data) {
        const response = await this.request('patch', data);
        return response;
    }

    async getRequest(data) {
        const response = await this.request('get', data);
        return response;
    }

    async deleteRequest(data) {
        const response = await this.request('delete', data);
        return response;
    }

    async putRequest(data) {
        const response = await this.request('put', data);
        return response;
    }
}

module.exports = Request;
