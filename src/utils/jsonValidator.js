const isJsonEmpty = (json) => {
    if (json && Object.keys(json).length === 0 && Object.getPrototypeOf(json) === Object.prototype) return true;
    return false;
};

module.exports = {
    isJsonEmpty,
};
