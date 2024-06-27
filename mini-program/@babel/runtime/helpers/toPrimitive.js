var _typeof = require("./typeof");

function _toPrimitive(r, t) {
    if ("object" !== _typeof(r) || null === r) return r;
    var e = r[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(r, t || "default");
        if ("object" !== _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === t ? String : Number)(r);
}

module.exports = _toPrimitive;