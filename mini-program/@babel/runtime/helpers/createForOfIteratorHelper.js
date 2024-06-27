var unsupportedIterableToArray = require("./unsupportedIterableToArray");

function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
        if (Array.isArray(r) || (t = unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
            t && (r = t);
            var n = 0, o = function() {};
            return {
                s: o,
                n: function() {
                    return n >= r.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: r[n++]
                    };
                },
                e: function(r) {
                    throw r;
                },
                f: o
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var a, u = !0, i = !1;
    return {
        s: function() {
            t = t.call(r);
        },
        n: function() {
            var r = t.next();
            return u = r.done, r;
        },
        e: function(r) {
            i = !0, a = r;
        },
        f: function() {
            try {
                u || null == t.return || t.return();
            } finally {
                if (i) throw a;
            }
        }
    };
}

module.exports = _createForOfIteratorHelper;