const { header, validationResult } = require('express-validator');
const ErrorHandler = require('../../utils/errorHandler');

const validateHeaders = [
    header('X-country').notEmpty().isString().trim(),
    header('X-commerce').notEmpty().isString().trim(),
    header('X-prRef').isString().optional({ nullable: true, checkFalsy: true }).trim(),
    header('X-chRef').optional({ nullable: true, checkFalsy: true }).isString().trim(),
    header('X-usrTx').isString().optional({ nullable: true, checkFalsy: true }).trim(),
    header('X-rhsRef').isString().optional({ nullable: true, checkFalsy: true }).trim(),
    header('X-cmRef').isString().optional({ nullable: true, checkFalsy: true }).trim(),
    header('X-txRef').isString().optional({ nullable: true, checkFalsy: true }).trim(),
];

const processValidation = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) throw new ErrorHandler(errors.array(), 401);
        next();
    } catch (err) {
        next(err, req, res, next);
    }
};

module.exports = {
    validateHeaders,
    processValidation,
};
