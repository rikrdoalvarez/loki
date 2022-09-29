const corpHeaders = [
    {
        name: 'X-country',
        required: true,
    },
    {
        name: 'X-commerce',
        required: true,
    },
    {
        name: 'X-prRef',
        required: false,
    },
    {
        name: 'X-chRef',
        required: false,
    },
    {
        name: 'X-usrTx',
        required: false,
    },
    {
        name: 'X-rhsRef',
        required: false,
    },
    {
        name: 'X-cmRef',
        required: false,
    },
    {
        name: 'X-txRef',
        required: false,
    },
];

const securityHeaders = [
    {
        name: 'X-Frame-Options',
        value: 'SAMEORIGIN',
    },
    {
        name: 'X-XSS-Protection',
        value: '1; mode=block',
    },
    {
        name: 'X-Content-Type-Options',
        value: 'nosniff',
    },
    {
        name: 'Cache-Control',
        value: 'max-age=300,inmutable',
    },
    // {
    //     name: 'Access-Control-Allow-Origin',
    //     value: '*',
    // },
    // {
    //     name: 'Referrer-Policy',
    //     value: 'same-origin',
    // },

    // {
    //     name: 'Content-Security-Policy',
    //     value: 'script-src *.falabella.com',
    // },
    // {
    //     name: 'Permissions-Policy',
    //     value: 'geolocation=(self)',
    // },
];

const baseEnvs = ['PORT', 'LOG_LEVEL', 'NODE_ENV', 'VALIDATE_HEADERS', 'SEND_CORP_HEADER', 'RETURN_CORP_HEADERS'];

module.exports = {
    corpHeaders,
    securityHeaders,
    baseEnvs,
};
