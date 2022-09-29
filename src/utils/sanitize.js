exports.urlpath = (str) => {
    if (typeof str === 'undefined' || str === '') throw new Error('Param must not be invalid');
    return str;
};
