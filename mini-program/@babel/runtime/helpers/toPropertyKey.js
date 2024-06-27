var _typeof = require("./typeof"), toPrimitive = require("./toPrimitive");

function _toPropertyKey(r) {
    var t = toPrimitive(r, "string");
    return "symbol" === _typeof(t) ? t : String(t);
}

module.exports = _toPropertyKey;