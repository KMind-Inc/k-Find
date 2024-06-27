var t = require("./typeof");

function r() {
    module.exports = r = function() {
        return e;
    }, module.exports.__esModule = !0, module.exports.default = module.exports;
    var e = {}, n = Object.prototype, o = n.hasOwnProperty, i = Object.defineProperty || function(t, r, e) {
        t[r] = e.value;
    }, a = "function" == typeof Symbol ? Symbol : {}, c = a.iterator || "@@iterator", u = a.asyncIterator || "@@asyncIterator", l = a.toStringTag || "@@toStringTag";
    function h(t, r, e) {
        return Object.defineProperty(t, r, {
            value: e,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }), t[r];
    }
    try {
        h({}, "");
    } catch (t) {
        h = function(t, r, e) {
            return t[r] = e;
        };
    }
    function f(t, r, e, n) {
        var o = r && r.prototype instanceof d ? r : d, a = Object.create(o.prototype), c = new k(n || []);
        return i(a, "_invoke", {
            value: E(t, e, c)
        }), a;
    }
    function s(t, r, e) {
        try {
            return {
                type: "normal",
                arg: t.call(r, e)
            };
        } catch (t) {
            return {
                type: "throw",
                arg: t
            };
        }
    }
    e.wrap = f;
    var p = {};
    function d() {}
    function v() {}
    function y() {}
    var g = {};
    h(g, c, function() {
        return this;
    });
    var m = Object.getPrototypeOf, w = m && m(m(G([])));
    w && w !== n && o.call(w, c) && (g = w);
    var x = y.prototype = d.prototype = Object.create(g);
    function L(t) {
        [ "next", "throw", "return" ].forEach(function(r) {
            h(t, r, function(t) {
                return this._invoke(r, t);
            });
        });
    }
    function b(r, e) {
        function n(i, a, c, u) {
            var l = s(r[i], r, a);
            if ("throw" !== l.type) {
                var h = l.arg, f = h.value;
                return f && "object" == t(f) && o.call(f, "__await") ? e.resolve(f.__await).then(function(t) {
                    n("next", t, c, u);
                }, function(t) {
                    n("throw", t, c, u);
                }) : e.resolve(f).then(function(t) {
                    h.value = t, c(h);
                }, function(t) {
                    return n("throw", t, c, u);
                });
            }
            u(l.arg);
        }
        var a;
        i(this, "_invoke", {
            value: function(t, r) {
                function o() {
                    return new e(function(e, o) {
                        n(t, r, e, o);
                    });
                }
                return a = a ? a.then(o, o) : o();
            }
        });
    }
    function E(t, r, e) {
        var n = "suspendedStart";
        return function(o, i) {
            if ("executing" === n) throw new Error("Generator is already running");
            if ("completed" === n) {
                if ("throw" === o) throw i;
                return N();
            }
            for (e.method = o, e.arg = i; ;) {
                var a = e.delegate;
                if (a) {
                    var c = _(a, e);
                    if (c) {
                        if (c === p) continue;
                        return c;
                    }
                }
                if ("next" === e.method) e.sent = e._sent = e.arg; else if ("throw" === e.method) {
                    if ("suspendedStart" === n) throw n = "completed", e.arg;
                    e.dispatchException(e.arg);
                } else "return" === e.method && e.abrupt("return", e.arg);
                n = "executing";
                var u = s(t, r, e);
                if ("normal" === u.type) {
                    if (n = e.done ? "completed" : "suspendedYield", u.arg === p) continue;
                    return {
                        value: u.arg,
                        done: e.done
                    };
                }
                "throw" === u.type && (n = "completed", e.method = "throw", e.arg = u.arg);
            }
        };
    }
    function _(t, r) {
        var e = r.method, n = t.iterator[e];
        if (void 0 === n) return r.delegate = null, "throw" === e && t.iterator.return && (r.method = "return", 
        r.arg = void 0, _(t, r), "throw" === r.method) || "return" !== e && (r.method = "throw", 
        r.arg = new TypeError("The iterator does not provide a '" + e + "' method")), p;
        var o = s(n, t.iterator, r.arg);
        if ("throw" === o.type) return r.method = "throw", r.arg = o.arg, r.delegate = null, 
        p;
        var i = o.arg;
        return i ? i.done ? (r[t.resultName] = i.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", 
        r.arg = void 0), r.delegate = null, p) : i : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), 
        r.delegate = null, p);
    }
    function O(t) {
        var r = {
            tryLoc: t[0]
        };
        1 in t && (r.catchLoc = t[1]), 2 in t && (r.finallyLoc = t[2], r.afterLoc = t[3]), 
        this.tryEntries.push(r);
    }
    function j(t) {
        var r = t.completion || {};
        r.type = "normal", delete r.arg, t.completion = r;
    }
    function k(t) {
        this.tryEntries = [ {
            tryLoc: "root"
        } ], t.forEach(O, this), this.reset(!0);
    }
    function G(t) {
        if (t) {
            var r = t[c];
            if (r) return r.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
                var e = -1, n = function r() {
                    for (;++e < t.length; ) if (o.call(t, e)) return r.value = t[e], r.done = !1, r;
                    return r.value = void 0, r.done = !0, r;
                };
                return n.next = n;
            }
        }
        return {
            next: N
        };
    }
    function N() {
        return {
            value: void 0,
            done: !0
        };
    }
    return v.prototype = y, i(x, "constructor", {
        value: y,
        configurable: !0
    }), i(y, "constructor", {
        value: v,
        configurable: !0
    }), v.displayName = h(y, l, "GeneratorFunction"), e.isGeneratorFunction = function(t) {
        var r = "function" == typeof t && t.constructor;
        return !!r && (r === v || "GeneratorFunction" === (r.displayName || r.name));
    }, e.mark = function(t) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : (t.__proto__ = y, h(t, l, "GeneratorFunction")), 
        t.prototype = Object.create(x), t;
    }, e.awrap = function(t) {
        return {
            __await: t
        };
    }, L(b.prototype), h(b.prototype, u, function() {
        return this;
    }), e.AsyncIterator = b, e.async = function(t, r, n, o, i) {
        void 0 === i && (i = Promise);
        var a = new b(f(t, r, n, o), i);
        return e.isGeneratorFunction(r) ? a : a.next().then(function(t) {
            return t.done ? t.value : a.next();
        });
    }, L(x), h(x, l, "Generator"), h(x, c, function() {
        return this;
    }), h(x, "toString", function() {
        return "[object Generator]";
    }), e.keys = function(t) {
        var r = Object(t), e = [];
        for (var n in r) e.push(n);
        return e.reverse(), function t() {
            for (;e.length; ) {
                var n = e.pop();
                if (n in r) return t.value = n, t.done = !1, t;
            }
            return t.done = !0, t;
        };
    }, e.values = G, k.prototype = {
        constructor: k,
        reset: function(t) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, 
            this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(j), 
            !t) for (var r in this) "t" === r.charAt(0) && o.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = void 0);
        },
        stop: function() {
            this.done = !0;
            var t = this.tryEntries[0].completion;
            if ("throw" === t.type) throw t.arg;
            return this.rval;
        },
        dispatchException: function(t) {
            if (this.done) throw t;
            var r = this;
            function e(e, n) {
                return a.type = "throw", a.arg = t, r.next = e, n && (r.method = "next", r.arg = void 0), 
                !!n;
            }
            for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var i = this.tryEntries[n], a = i.completion;
                if ("root" === i.tryLoc) return e("end");
                if (i.tryLoc <= this.prev) {
                    var c = o.call(i, "catchLoc"), u = o.call(i, "finallyLoc");
                    if (c && u) {
                        if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                        if (this.prev < i.finallyLoc) return e(i.finallyLoc);
                    } else if (c) {
                        if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                    } else {
                        if (!u) throw new Error("try statement without catch or finally");
                        if (this.prev < i.finallyLoc) return e(i.finallyLoc);
                    }
                }
            }
        },
        abrupt: function(t, r) {
            for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.tryLoc <= this.prev && o.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                    var i = n;
                    break;
                }
            }
            i && ("break" === t || "continue" === t) && i.tryLoc <= r && r <= i.finallyLoc && (i = null);
            var a = i ? i.completion : {};
            return a.type = t, a.arg = r, i ? (this.method = "next", this.next = i.finallyLoc, 
            p) : this.complete(a);
        },
        complete: function(t, r) {
            if ("throw" === t.type) throw t.arg;
            return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, 
            this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), 
            p;
        },
        finish: function(t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var e = this.tryEntries[r];
                if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), j(e), p;
            }
        },
        catch: function(t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var e = this.tryEntries[r];
                if (e.tryLoc === t) {
                    var n = e.completion;
                    if ("throw" === n.type) {
                        var o = n.arg;
                        j(e);
                    }
                    return o;
                }
            }
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(t, r, e) {
            return this.delegate = {
                iterator: G(t),
                resultName: r,
                nextLoc: e
            }, "next" === this.method && (this.arg = void 0), p;
        }
    }, e;
}

module.exports = r, module.exports.__esModule = !0, module.exports.default = module.exports;