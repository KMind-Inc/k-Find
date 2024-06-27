var arrayLikeToArray = require("./arrayLikeToArray");

function _unsupportedIterableToArray(r, e) {
    if (r) {
        if ("string" == typeof r) return arrayLikeToArray(r, e);
        var t = Object.prototype.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, e) : void 0;
    }
}

module.exports = _unsupportedIterableToArray;