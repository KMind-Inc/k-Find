var arrayWithHoles = require("./arrayWithHoles"), iterableToArrayLimit = require("./iterableToArrayLimit"), unsupportedIterableToArray = require("./unsupportedIterableToArray"), nonIterableRest = require("./nonIterableRest");

function _slicedToArray(r, e) {
    return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}

module.exports = _slicedToArray;