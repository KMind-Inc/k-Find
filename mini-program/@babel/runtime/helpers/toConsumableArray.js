var arrayWithoutHoles = require("./arrayWithoutHoles"), iterableToArray = require("./iterableToArray"), unsupportedIterableToArray = require("./unsupportedIterableToArray"), nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(r) {
    return arrayWithoutHoles(r) || iterableToArray(r) || unsupportedIterableToArray(r) || nonIterableSpread();
}

module.exports = _toConsumableArray;