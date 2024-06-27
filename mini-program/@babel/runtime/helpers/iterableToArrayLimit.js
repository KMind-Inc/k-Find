function _iterableToArrayLimit(r, e) {
    var l = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != l) {
        var t, n, i, a, u = [], o = !0, f = !1;
        try {
            if (i = (l = l.call(r)).next, 0 === e) {
                if (Object(l) !== l) return;
                o = !1;
            } else for (;!(o = (t = i.call(l)).done) && (u.push(t.value), u.length !== e); o = !0) ;
        } catch (r) {
            f = !0, n = r;
        } finally {
            try {
                if (!o && null != l.return && (a = l.return(), Object(a) !== a)) return;
            } finally {
                if (f) throw n;
            }
        }
        return u;
    }
}

module.exports = _iterableToArrayLimit;