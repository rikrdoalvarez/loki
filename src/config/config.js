require('dotenv').config();

let PORT;

function setParam(instancia) {
    switch (instancia) {
        case 'QA':
            PORT = process.env.PORT_QA;
            break;
        case 'PROD':
            PORT = process.env.PORT_PROD;
            break;
        default:
            PORT = process.env.PORT_LOCAL;
            break;
    }
}
setParam(process.env.ENVIRONMENT);

module.exports = { PORT };
