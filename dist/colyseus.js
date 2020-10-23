/*! colyseus.js@0.13.2-alpha.0 */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Colyseus = t() : e.Colyseus = t()
}(self || this, (function () {
    return function (e) {
        var t = {};

        function n(r) {
            if (t[r]) return t[r].exports;
            var i = t[r] = {i: r, l: !1, exports: {}};
            return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
        }

        return n.m = e, n.c = t, n.d = function (e, t, r) {
            n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
        }, n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
        }, n.t = function (e, t) {
            if (1 & t && (e = n(e)), 8 & t) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var r = Object.create(null);
            if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
                return e[t]
            }.bind(null, i));
            return r
        }, n.n = function (e) {
            var t = e && e.__esModule ? function () {
                return e.default
            } : function () {
                return e
            };
            return n.d(t, "a", t), t
        }, n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, n.p = "", n(n.s = 15)
    }([function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
            return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), o = this && this.__spreadArrays || function () {
            for (var e = 0, t = 0, n = arguments.length; t < n; t++) e += arguments[t].length;
            var r = Array(e), i = 0;
            for (t = 0; t < n; t++) for (var o = arguments[t], s = 0, a = o.length; s < a; s++, i++) r[i] = o[s];
            return r
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.ArraySchema = void 0;
        var s = function (e) {
            function t() {
                for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                var i = e.apply(this, n) || this;
                return Object.setPrototypeOf(i, Object.create(t.prototype)), Object.defineProperties(i, {
                    $sorting: {
                        value: void 0,
                        enumerable: !1,
                        writable: !0
                    },
                    $changes: {value: void 0, enumerable: !1, writable: !0},
                    onAdd: {value: void 0, enumerable: !1, writable: !0},
                    onRemove: {value: void 0, enumerable: !1, writable: !0},
                    onChange: {value: void 0, enumerable: !1, writable: !0},
                    triggerAll: {
                        value: function () {
                            if (i.onAdd) for (var e = 0; e < i.length; e++) i.onAdd(i[e], e)
                        }
                    },
                    toJSON: {
                        value: function () {
                            for (var e = [], t = 0; t < i.length; t++) {
                                var n = i[t];
                                e.push("function" == typeof n.toJSON ? n.toJSON() : n)
                            }
                            return e
                        }
                    },
                    clone: {
                        value: function (e) {
                            var n;
                            return e ? ((n = t.of.apply(t, i)).onAdd = i.onAdd, n.onRemove = i.onRemove, n.onChange = i.onChange) : n = new (t.bind.apply(t, o([void 0], i.map((function (e) {
                                return "object" == typeof e ? e.clone() : e
                            }))))), n
                        }
                    }
                }), i
            }

            return i(t, e), Object.defineProperty(t, Symbol.species, {
                get: function () {
                    return t
                }, enumerable: !1, configurable: !0
            }), t.prototype.sort = function (t) {
                if (this.$sorting = !0, e.prototype.sort.call(this, t), this.$changes) for (var n = 0, r = Array.from(this.$changes.changes); n < r.length; n++) {
                    var i = r[n], o = this.$changes.getIndex(this[i]);
                    void 0 !== o && this.$changes.mapIndexChange(this[i], o), this.$changes.mapIndex(this[i], i)
                }
                return this.$sorting = !1, this
            }, t.prototype.filter = function (t, n) {
                var r = e.prototype.filter.call(this, t);
                return r.$changes = this.$changes.clone(), r
            }, t.prototype.splice = function (e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                var i = Array.prototype.splice.apply(this, arguments),
                    o = Array.prototype.filter.call(this, (function (n, r) {
                        return r >= e + t - 1
                    }));
                return i.map((function (e) {
                    var t = e && e.$changes;
                    t && t.parent && (t.parent.deleteIndex(e), delete t.parent)
                })), o.forEach((function (e) {
                    var t = e && e.$changes;
                    t && t.parentField--
                })), i
            }, t
        }(Array);
        t.ArraySchema = s
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.MapSchema = void 0;
        var r = function e(t) {
            var n = this;
            for (var r in void 0 === t && (t = {}), t) this[r] = t[r];
            Object.defineProperties(this, {
                $changes: {value: void 0, enumerable: !1, writable: !0},
                onAdd: {value: void 0, enumerable: !1, writable: !0},
                onRemove: {value: void 0, enumerable: !1, writable: !0},
                onChange: {value: void 0, enumerable: !1, writable: !0},
                clone: {
                    value: function (t) {
                        var r;
                        if (t) (r = Object.assign(new e, n)).onAdd = n.onAdd, r.onRemove = n.onRemove, r.onChange = n.onChange; else {
                            var i = new e;
                            for (var o in n) "object" == typeof n[o] ? i[o] = n[o].clone() : i[o] = n[o]
                        }
                        return r
                    }
                },
                triggerAll: {
                    value: function () {
                        if (n.onAdd) for (var e in n) n.onAdd(n[e], e)
                    }
                },
                toJSON: {
                    value: function () {
                        var e = {};
                        for (var t in n) e[t] = "function" == typeof n[t].toJSON ? n[t].toJSON() : n[t];
                        return e
                    }
                },
                _indexes: {value: new Map, enumerable: !1, writable: !0},
                _updateIndexes: {
                    value: function (e) {
                        for (var t = 0, r = new Map, i = 0, o = e; i < o.length; i++) {
                            var s = o[i];
                            r.set(s, t++)
                        }
                        n._indexes = r
                    }
                }
            })
        };
        t.MapSchema = r
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
            return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        });
        Object.defineProperty(t, "__esModule", {value: !0}), t.Schema = void 0;
        var o = n(10), s = n(8), a = n(9), c = n(0), u = n(1), f = n(13), h = n(35), l = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), t
        }(Error);

        function p(e, t, n, r) {
            if (!(e instanceof t)) throw new l("a '" + t.name + "' was expected, but '" + e.constructor.name + "' was provided in " + n.constructor.name + "#" + r)
        }

        function d(e, t, n, r, i) {
            !function (e, t, n, r) {
                var i, o = !1;
                switch (t) {
                    case"number":
                    case"int8":
                    case"uint8":
                    case"int16":
                    case"uint16":
                    case"int32":
                    case"uint32":
                    case"int64":
                    case"uint64":
                    case"float32":
                    case"float64":
                        i = "number", isNaN(e) && console.log('trying to encode "NaN" in ' + n.constructor.name + "#" + r);
                        break;
                    case"string":
                        i = "string", o = !0;
                        break;
                    case"boolean":
                        return
                }
                if (typeof e !== i && (!o || o && null !== e)) {
                    var s = "'" + JSON.stringify(e) + "'" + (e && e.constructor && " (" + e.constructor.name + ")");
                    throw new l("a '" + i + "' was expected, but " + s + " was provided in " + n.constructor.name + "#" + r)
                }
            }(n, e, r, i);
            var o = s[e];
            if (!o) throw new l("a '" + e + "' was expected, but " + n + " was provided in " + r.constructor.name + "#" + i);
            o(t, n)
        }

        function v(e, t, n) {
            return a[e](t, n)
        }

        var y = function () {
            function e() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                Object.defineProperties(this, {
                    $changes: {
                        value: new f.ChangeTree(this._indexes),
                        enumerable: !1,
                        writable: !0
                    }, $listeners: {value: {}, enumerable: !1, writable: !0}
                });
                var n = this._descriptors;
                n && Object.defineProperties(this, n)
            }

            return e.onError = function (e) {
                console.error(e)
            }, Object.defineProperty(e.prototype, "_schema", {
                get: function () {
                    return this.constructor._schema
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "_descriptors", {
                get: function () {
                    return this.constructor._descriptors
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "_indexes", {
                get: function () {
                    return this.constructor._indexes
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "_fieldsByIndex", {
                get: function () {
                    return this.constructor._fieldsByIndex
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "_filters", {
                get: function () {
                    return this.constructor._filters
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "_deprecated", {
                get: function () {
                    return this.constructor._deprecated
                }, enumerable: !1, configurable: !0
            }), Object.defineProperty(e.prototype, "$changed", {
                get: function () {
                    return this.$changes.changed
                }, enumerable: !1, configurable: !0
            }), e.prototype.listen = function (e, t) {
                var n = this;
                return this.$listeners[e] || (this.$listeners[e] = new h.EventEmitter), this.$listeners[e].register(t), function () {
                    return n.$listeners[e].remove(t)
                }
            }, e.prototype.decode = function (t, n) {
                void 0 === n && (n = {offset: 0});
                var r = [], i = this._schema, s = this._fieldsByIndex, f = t.length;
                t[n.offset] === o.TYPE_ID && (n.offset += 2);
                for (var h = function () {
                    var f = a.nilCheck(t, n) && ++n.offset, h = t[n.offset++];
                    if (h === o.END_OF_STRUCTURE) return "break";
                    var p = s[h], d = "_" + p, y = i[p], g = void 0, _ = !1;
                    if (!p) return "continue";
                    if (f) g = null, _ = !0; else if (y._schema) (g = l[d] || l.createTypeInstance(t, n, y)).decode(t, n), _ = !0; else if (Array.isArray(y)) {
                        y = y[0];
                        var b = l[d] || new c.ArraySchema;
                        g = b.clone(!0);
                        var m = a.number(t, n), w = Math.min(a.number(t, n), m), O = g.length > m;
                        _ = w > 0 || O;
                        var A = !1;
                        O && Array.prototype.splice.call(g, m).forEach((function (t, n) {
                            if (t && t.onRemove) try {
                                t.onRemove()
                            } catch (t) {
                                e.onError(t)
                            }
                            if (b.onRemove) try {
                                b.onRemove(t, m + n)
                            } catch (t) {
                                e.onError(t)
                            }
                        }));
                        for (var C = 0; C < w; C++) {
                            var S = a.number(t, n), E = void 0;
                            a.indexChangeCheck(t, n) && (a.uint8(t, n), E = a.number(t, n), A = !0);
                            var P = !A && void 0 === g[S] || A && void 0 === E;
                            if (y.prototype instanceof e) {
                                var I = void 0;
                                (I = P ? l.createTypeInstance(t, n, y) : void 0 !== E ? b[E] : b[S]) || (I = l.createTypeInstance(t, n, y), P = !0), I.decode(t, n), g[S] = I
                            } else g[S] = v(y, t, n);
                            if (P) {
                                if (b.onAdd) try {
                                    b.onAdd(g[S], S)
                                } catch (t) {
                                    e.onError(t)
                                }
                            } else if (b.onChange) try {
                                b.onChange(g[S], S)
                            } catch (t) {
                                e.onError(t)
                            }
                        }
                    } else if (y.map) {
                        y = y.map;
                        var M = l[d] || new u.MapSchema;
                        g = M.clone(!0);
                        var k = a.number(t, n);
                        _ = k > 0;
                        A = !1;
                        var j = Object.keys(M);
                        for (C = 0; C < k && (void 0 !== t[n.offset] && t[n.offset] !== o.END_OF_STRUCTURE); C++) {
                            var x = a.nilCheck(t, n) && ++n.offset, R = void 0;
                            a.indexChangeCheck(t, n) && (a.uint8(t, n), R = j[a.number(t, n)], A = !0);
                            var T = a.numberCheck(t, n), N = "string" != typeof y,
                                $ = T ? j[a.number(t, n)] : a.string(t, n);
                            I = void 0;
                            if (I = (P = !A && void 0 === M[$] || A && void 0 === R && T) && N ? l.createTypeInstance(t, n, y) : void 0 !== R ? M[R] : M[$], x) {
                                if (I && I.onRemove) try {
                                    I.onRemove()
                                } catch (t) {
                                    e.onError(t)
                                }
                                if (M.onRemove) try {
                                    M.onRemove(I, $)
                                } catch (t) {
                                    e.onError(t)
                                }
                                delete g[$]
                            } else if (N ? (I.decode(t, n), g[$] = I) : g[$] = v(y, t, n), P) {
                                if (M.onAdd) try {
                                    M.onAdd(g[$], $)
                                } catch (t) {
                                    e.onError(t)
                                }
                            } else if (M.onChange) try {
                                M.onChange(g[$], $)
                            } catch (t) {
                                e.onError(t)
                            }
                        }
                    } else _ = (g = v(y, t, n)) !== l[d];
                    _ && (l.onChange || l.$listeners[p]) && r.push({field: p, value: g, previousValue: l[d]}), l[d] = g
                }, l = this; n.offset < f;) {
                    if ("break" === h()) break
                }
                return this._triggerChanges(r), this
            }, e.prototype.encode = function (e, t, n, r) {
                var i = this;
                if (void 0 === e && (e = this), void 0 === t && (t = !1), void 0 === r && (r = []), !this.$changes.changed && !t) return this._encodeEndOfStructure(this, e, r), r;
                for (var a = this._schema, f = this._indexes, h = this._fieldsByIndex, l = this._filters, v = Array.from(t ? this.$changes.allChanges : this.$changes.changes).sort(), y = function (y, _) {
                    var b = h[v[y]] || v[y], m = "_" + b, w = a[b], O = l && l[b], A = g[m], C = f[b];
                    if (void 0 === A) s.uint8(r, o.NIL), s.number(r, C); else if (w._schema) {
                        if (n && O && !O.call(g, n, A, e)) return "continue";
                        A ? (s.number(r, C), p(A, w, g, b), g.tryEncodeTypeId(r, w, A.constructor), A.encode(e, t, n, r)) : (s.uint8(r, o.NIL), s.number(r, C))
                    } else if (Array.isArray(w)) {
                        var S = A.$changes;
                        if (n && O && !O.call(g, n, A, e)) return "continue";
                        s.number(r, C), s.number(r, A.length);
                        var E = Array.from(t ? S.allChanges : S.changes).filter((function (e) {
                            return void 0 !== i[m][e]
                        })).sort((function (e, t) {
                            return e - t
                        })), P = E.length;
                        s.number(r, P);
                        var I = "string" != typeof w[0];
                        p(g[m], c.ArraySchema, g, b);
                        for (var M = 0; M < P; M++) {
                            var k = E[M], j = g[m][k];
                            if (I) {
                                if (s.number(r, k), !t) void 0 !== (U = S.getIndexChange(j)) && (s.uint8(r, o.INDEX_CHANGE), s.number(r, U));
                                p(j, w[0], g, b), g.tryEncodeTypeId(r, w[0], j.constructor), j.encode(e, t, n, r)
                            } else void 0 !== j && (s.number(r, k), d(w[0], r, j, g, b))
                        }
                        t || n || S.discard()
                    } else if (w.map) {
                        S = A.$changes;
                        if (n && O && !O.call(g, n, A, e)) return "continue";
                        s.number(r, C);
                        var x = Array.from(t ? S.allChanges : S.changes);
                        s.number(r, x.length);
                        var R = Array.from(S.allChanges);
                        I = "string" != typeof w.map, P = x.length;
                        p(g[m], u.MapSchema, g, b);
                        for (var T = 0; T < P; T++) {
                            var N = x[T], $ = (j = g[m][N], void 0);
                            if (t) {
                                if (void 0 === j) continue
                            } else {
                                var U = S.getIndexChange(j);
                                j && void 0 !== U && (s.uint8(r, o.INDEX_CHANGE), s.number(r, g[m]._indexes.get(U))), $ = S.isDeleted(N) && j ? void 0 : g[m]._indexes.get(N)
                            }
                            var z = void 0 === j;
                            z && s.uint8(r, o.NIL), void 0 !== $ ? s.number(r, $) : s.string(r, N), j && I ? (p(j, w.map, g, b), g.tryEncodeTypeId(r, w.map, j.constructor), j.encode(e, t, n, r)) : z || d(w.map, r, j, g, b)
                        }
                        t || n || (S.discard(), g[m]._updateIndexes(R))
                    } else {
                        if (n && O && !O.call(g, n, A, e)) return "continue";
                        s.number(r, C), d(w, r, A, g, b)
                    }
                }, g = this, _ = 0, b = v.length; _ < b; _++) y(_);
                return this._encodeEndOfStructure(this, e, r), t || n || this.$changes.discard(), r
            }, e.prototype.encodeFiltered = function (e, t) {
                return this.encode(this, !1, e, t)
            }, e.prototype.encodeAll = function (e) {
                return this.encode(this, !0, void 0, e)
            }, e.prototype.encodeAllFiltered = function (e, t) {
                return this.encode(this, !0, e, t)
            }, e.prototype.clone = function () {
                var e = new this.constructor, t = this._schema;
                for (var n in t) "object" == typeof this[n] && "function" == typeof this[n].clone ? e[n] = this[n].clone() : e[n] = this[n];
                return e
            }, e.prototype.triggerAll = function () {
                var t = [], n = this._schema;
                for (var r in n) void 0 !== this[r] && t.push({field: r, value: this[r], previousValue: void 0});
                try {
                    this._triggerChanges(t)
                } catch (t) {
                    e.onError(t)
                }
            }, e.prototype.toJSON = function () {
                var e = this._schema, t = this._deprecated, n = {};
                for (var r in e) t[r] || null === this[r] || void 0 === this[r] || (n[r] = "function" == typeof this[r].toJSON ? this[r].toJSON() : this["_" + r]);
                return n
            }, e.prototype.discardAllChanges = function () {
                var t = this._schema, n = Array.from(this.$changes.changes), r = this._fieldsByIndex;
                for (var i in n) {
                    var o = r[n[i]], s = t[o], a = this[o];
                    if (void 0 !== a) if (s._schema) a.discardAllChanges(); else if (Array.isArray(s)) {
                        for (var c = 0, u = a.length; c < u; c++) {
                            var f = a[c], h = this["_" + o][f];
                            "string" != typeof s[0] && h && h.discardAllChanges()
                        }
                        a.$changes.discard()
                    } else if (s.map) {
                        var l = a, p = Object.keys(this["_" + o]);
                        for (c = 0; c < l.length; c++) {
                            var d = p[l[c]] || l[c];
                            (h = this["_" + o][d]) instanceof e && h && h.discardAllChanges()
                        }
                        a.$changes.discard()
                    }
                }
                this.$changes.discard()
            }, e.prototype._encodeEndOfStructure = function (e, t, n) {
                e !== t && n.push(o.END_OF_STRUCTURE)
            }, e.prototype.tryEncodeTypeId = function (e, t, n) {
                t._typeid !== n._typeid && (s.uint8(e, o.TYPE_ID), s.uint8(e, n._typeid))
            }, e.prototype.createTypeInstance = function (e, t, n) {
                return e[t.offset] === o.TYPE_ID ? (t.offset++, new (this.constructor._context.get(a.uint8(e, t)))) : new n
            }, e.prototype._triggerChanges = function (t) {
                if (t.length > 0) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n], i = this.$listeners[r.field];
                        if (i) try {
                            i.invoke(r.value, r.previousValue)
                        } catch (t) {
                            e.onError(t)
                        }
                    }
                    if (this.onChange) try {
                        this.onChange(t)
                    } catch (t) {
                        e.onError(t)
                    }
                }
            }, e
        }();
        t.Schema = y
    }, function (e, t) {
        function n(e, t) {
            t.headers = e.headers || {}, t.statusMessage = e.statusText, t.statusCode = e.status, t.data = e.response
        }

        t.send = function (e, t, r) {
            return new Promise((function (i, o) {
                var s, a, c, u;
                r = r || {};
                var f = new XMLHttpRequest, h = r.headers || {};
                for (s in r.timeout && (f.timeout = r.timeout), f.ontimeout = f.onerror = function (e) {
                    e.timeout = "timeout" == e.type, o(e)
                }, f.open(e, t.href || t), f.onload = function () {
                    for (u = f.getAllResponseHeaders().trim().split(/[\r\n]+/), n(f, f); c = u.shift();) c = c.split(": "), f.headers[c.shift().toLowerCase()] = c.join(": ");
                    if ((c = f.headers["content-type"]) && ~c.indexOf("application/json")) try {
                        f.data = JSON.parse(f.data, r.reviver)
                    } catch (e) {
                        return n(f, e), o(e)
                    }
                    (f.status >= 400 ? o : i)(f)
                }, (a = r.body) && "object" == typeof a && (h["content-type"] = "application/json", a = JSON.stringify(a)), f.withCredentials = !!r.withCredentials, h) f.setRequestHeader(s, h[s]);
                f.send(a)
            }))
        }, t.get = t.send.bind(t.send, "GET"), t.post = t.send.bind(t.send, "POST"), t.patch = t.send.bind(t.send, "PATCH"), t.del = t.send.bind(t.send, "DELETE"), t.put = t.send.bind(t.send, "PUT")
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) {
            void 0 === r && (r = n), Object.defineProperty(e, r, {
                enumerable: !0, get: function () {
                    return t[n]
                }
            })
        } : function (e, t, n, r) {
            void 0 === r && (r = n), e[r] = t[n]
        }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), o = this && this.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) "default" !== n && Object.hasOwnProperty.call(e, n) && r(t, e, n);
            return i(t, e), t
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.Room = void 0;
        var s = o(n(5)), a = n(21), c = n(22), u = n(23), f = n(6), h = n(7), l = o(n(8)), p = o(n(9)),
            d = function () {
                function e(e, t) {
                    var n = this;
                    this.onJoin = a.createSignal(), this.onStateChange = a.createSignal(), this.onError = a.createSignal(), this.onLeave = a.createSignal(), this.hasJoined = !1, this.onMessageHandlers = c.createNanoEvents(), this.id = null, this.name = e, t ? (this.serializer = new (f.getSerializer("schema")), this.rootSchema = t, this.serializer.state = new t) : this.serializer = new (f.getSerializer("fossil-delta")), this.onError((function (e, t) {
                        return console.error("colyseus.js - onError => (" + e + ") " + t)
                    })), this.onLeave((function () {
                        return n.removeAllListeners()
                    }))
                }

                return e.prototype.connect = function (e) {
                    var t = this;
                    this.connection = new u.Connection(e, !1), this.connection.reconnectEnabled = !1, this.connection.onmessage = this.onMessageCallback.bind(this), this.connection.onclose = function (e) {
                        if (!t.hasJoined) return console.error("Room connection was closed unexpectedly (" + e.code + "): " + e.reason), void t.onError.invoke(e.code, e.reason);
                        t.onLeave.invoke(e.code)
                    }, this.connection.onerror = function (e) {
                        console.warn("Room, onError (" + e.code + "): " + e.reason), t.onError.invoke(e.code, e.reason)
                    }, this.connection.open()
                }, e.prototype.leave = function (e) {
                    void 0 === e && (e = !0), this.connection ? e ? this.connection.send([h.Protocol.LEAVE_ROOM]) : this.connection.close() : this.onLeave.invoke(4e3)
                }, e.prototype.onMessage = function (e, t) {
                    return this.onMessageHandlers.on(this.getMessageHandlerKey(e), t)
                }, e.prototype.send = function (e, t) {
                    var n, r = [h.Protocol.ROOM_DATA];
                    if ("string" == typeof e ? l.string(r, e) : l.number(r, e), void 0 !== t) {
                        var i = s.encode(t);
                        (n = new Uint8Array(r.length + i.byteLength)).set(new Uint8Array(r), 0), n.set(new Uint8Array(i), r.length)
                    } else n = new Uint8Array(r);
                    this.connection.send(n.buffer)
                }, Object.defineProperty(e.prototype, "state", {
                    get: function () {
                        return this.serializer.getState()
                    }, enumerable: !1, configurable: !0
                }), e.prototype.listen = function (e, t, n) {
                    if ("schema" !== this.serializerId) return this.serializerId || console.warn("room.Listen() should be called after room.onJoin has been called (DEPRECATION WARNING)"), this.serializer.api.listen(e, t, n);
                    console.error("'" + this.serializerId + "' serializer doesn't support .listen() method here.")
                }, e.prototype.removeListener = function (e) {
                    return this.serializer.api.removeListener(e)
                }, e.prototype.removeAllListeners = function () {
                    this.serializer && this.serializer.teardown(), this.onJoin.clear(), this.onStateChange.clear(), this.onError.clear(), this.onLeave.clear()
                }, e.prototype.onMessageCallback = function (e) {
                    var t = Array.from(new Uint8Array(e.data)), n = t[0];
                    if (n === h.Protocol.JOIN_ROOM) {
                        var r = 1;
                        this.serializerId = h.utf8Read(t, r), r += h.utf8Length(this.serializerId);
                        var i = f.getSerializer(this.serializerId);
                        if (!i) throw new Error("missing serializer: " + this.serializerId);
                        "fossil-delta" === this.serializerId || this.rootSchema || (this.serializer = new i), t.length > r && this.serializer.handshake && this.serializer.handshake(t, {offset: 1}), this.hasJoined = !0, this.onJoin.invoke(), this.connection.send([h.Protocol.JOIN_ROOM])
                    } else if (n === h.Protocol.ERROR) {
                        var o = {offset: 1}, a = p.number(t, o), c = p.string(t, o);
                        this.onError.invoke(a, c)
                    } else if (n === h.Protocol.LEAVE_ROOM) this.leave(); else if (n === h.Protocol.ROOM_DATA_SCHEMA) {
                        (c = new (l = this.serializer.getState().constructor._context.get(t[1]))).decode(t, {offset: 2}), this.dispatchMessage(l, c)
                    } else if (n === h.Protocol.ROOM_STATE) t.shift(), this.setState(t); else if (n === h.Protocol.ROOM_STATE_PATCH) t.shift(), this.patch(t); else if (n === h.Protocol.ROOM_DATA) {
                        var u = {offset: 1}, l = p.stringCheck(t, u) ? p.string(t, u) : p.number(t, u);
                        c = t.length > u.offset ? s.decode(e.data, u.offset) : void 0;
                        this.dispatchMessage(l, c)
                    }
                }, e.prototype.setState = function (e) {
                    this.serializer.setState(e), this.onStateChange.invoke(this.serializer.getState())
                }, e.prototype.patch = function (e) {
                    this.serializer.patch(e), this.onStateChange.invoke(this.serializer.getState())
                }, e.prototype.dispatchMessage = function (e, t) {
                    var n = this.getMessageHandlerKey(e);
                    this.onMessageHandlers.events[n] ? this.onMessageHandlers.emit(n, t) : this.onMessageHandlers.events["*"] ? this.onMessageHandlers.emit("*", e, t) : console.warn("onMessage not registered for type '" + e + "'.")
                }, e.prototype.getMessageHandlerKey = function (e) {
                    switch (typeof e) {
                        case"function":
                            return "$" + e._typeid;
                        case"string":
                            return e;
                        case"number":
                            return "i" + e;
                        default:
                            throw new Error("invalid message type.")
                    }
                }, e
            }();
        t.Room = d
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.encode = t.decode = void 0;
        var i = r(n(19)), o = r(n(20));
        t.decode = i.default, t.encode = o.default
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.getSerializer = t.registerSerializer = void 0;
        var r = {};
        t.registerSerializer = function (e, t) {
            r[e] = t
        }, t.getSerializer = function (e) {
            return r[e]
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.utf8Length = t.utf8Read = t.ErrorCode = t.Protocol = void 0, function (e) {
            e[e.HANDSHAKE = 9] = "HANDSHAKE", e[e.JOIN_ROOM = 10] = "JOIN_ROOM", e[e.ERROR = 11] = "ERROR", e[e.LEAVE_ROOM = 12] = "LEAVE_ROOM", e[e.ROOM_DATA = 13] = "ROOM_DATA", e[e.ROOM_STATE = 14] = "ROOM_STATE", e[e.ROOM_STATE_PATCH = 15] = "ROOM_STATE_PATCH", e[e.ROOM_DATA_SCHEMA = 16] = "ROOM_DATA_SCHEMA"
        }(t.Protocol || (t.Protocol = {})), function (e) {
            e[e.MATCHMAKE_NO_HANDLER = 4210] = "MATCHMAKE_NO_HANDLER", e[e.MATCHMAKE_INVALID_CRITERIA = 4211] = "MATCHMAKE_INVALID_CRITERIA", e[e.MATCHMAKE_INVALID_ROOM_ID = 4212] = "MATCHMAKE_INVALID_ROOM_ID", e[e.MATCHMAKE_UNHANDLED = 4213] = "MATCHMAKE_UNHANDLED", e[e.MATCHMAKE_EXPIRED = 4214] = "MATCHMAKE_EXPIRED", e[e.AUTH_FAILED = 4215] = "AUTH_FAILED", e[e.APPLICATION_ERROR = 4216] = "APPLICATION_ERROR"
        }(t.ErrorCode || (t.ErrorCode = {})), t.utf8Read = function (e, t) {
            for (var n = e[t++], r = "", i = 0, o = t, s = t + n; o < s; o++) {
                var a = e[o];
                if (0 != (128 & a)) if (192 != (224 & a)) if (224 != (240 & a)) {
                    if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
                    (i = (7 & a) << 18 | (63 & e[++o]) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0) >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i)
                } else r += String.fromCharCode((15 & a) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0); else r += String.fromCharCode((31 & a) << 6 | 63 & e[++o]); else r += String.fromCharCode(a)
            }
            return r
        }, t.utf8Length = function (e) {
            void 0 === e && (e = "");
            for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++) (t = e.charCodeAt(r)) < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
            return n + 1
        }
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            for (var r = 0, i = 0, o = n.length; i < o; i++) (r = n.charCodeAt(i)) < 128 ? e[t++] = r : r < 2048 ? (e[t++] = 192 | r >> 6, e[t++] = 128 | 63 & r) : r < 55296 || r >= 57344 ? (e[t++] = 224 | r >> 12, e[t++] = 128 | r >> 6 & 63, e[t++] = 128 | 63 & r) : (i++, r = 65536 + ((1023 & r) << 10 | 1023 & n.charCodeAt(i)), e[t++] = 240 | r >> 18, e[t++] = 128 | r >> 12 & 63, e[t++] = 128 | r >> 6 & 63, e[t++] = 128 | 63 & r)
        }

        function i(e, t) {
            e.push(255 & t)
        }

        function o(e, t) {
            e.push(255 & t)
        }

        function s(e, t) {
            e.push(255 & t), e.push(t >> 8 & 255)
        }

        function a(e, t) {
            e.push(255 & t), e.push(t >> 8 & 255)
        }

        function c(e, t) {
            e.push(255 & t), e.push(t >> 8 & 255), e.push(t >> 16 & 255), e.push(t >> 24 & 255)
        }

        function u(e, t) {
            var n = t >> 24, r = t >> 16, i = t >> 8, o = t;
            e.push(255 & o), e.push(255 & i), e.push(255 & r), e.push(255 & n)
        }

        function f(e, t) {
            var n = Math.floor(t / Math.pow(2, 32));
            u(e, t >>> 0), u(e, n)
        }

        function h(e, t) {
            var n = t / Math.pow(2, 32) >> 0;
            u(e, t >>> 0), u(e, n)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.number = t.string = t.boolean = t.writeFloat64 = t.writeFloat32 = t.float64 = t.float32 = t.uint64 = t.int64 = t.uint32 = t.int32 = t.uint16 = t.int16 = t.uint8 = t.int8 = t.utf8Write = void 0, t.utf8Write = r, t.int8 = i, t.uint8 = o, t.int16 = s, t.uint16 = a, t.int32 = c, t.uint32 = u, t.int64 = f, t.uint64 = h, t.float32 = function (e, t) {
            v(e, t)
        }, t.float64 = function (e, t) {
            y(e, t)
        };
        var l = new Int32Array(2), p = new Float32Array(l.buffer), d = new Float64Array(l.buffer);

        function v(e, t) {
            p[0] = t, c(e, l[0])
        }

        function y(e, t) {
            d[0] = t, c(e, l[0]), c(e, l[1])
        }

        t.writeFloat32 = v, t.writeFloat64 = y, t.boolean = function (e, t) {
            return o(e, t ? 1 : 0)
        }, t.string = function (e, t) {
            t || (t = "");
            var n = function (e) {
                for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++) (t = e.charCodeAt(r)) < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
                return n
            }(t), i = 0;
            if (n < 32) e.push(160 | n), i = 1; else if (n < 256) e.push(217), o(e, n), i = 2; else if (n < 65536) e.push(218), a(e, n), i = 3; else {
                if (!(n < 4294967296)) throw new Error("String too long");
                e.push(219), u(e, n), i = 5
            }
            return r(e, e.length, t), i + n
        }, t.number = function e(t, n) {
            return isNaN(n) ? e(t, 0) : isFinite(n) ? n !== (0 | n) ? (t.push(203), y(t, n), 9) : n >= 0 ? n < 128 ? (o(t, n), 1) : n < 256 ? (t.push(204), o(t, n), 2) : n < 65536 ? (t.push(205), a(t, n), 3) : n < 4294967296 ? (t.push(206), u(t, n), 5) : (t.push(207), h(t, n), 9) : n >= -32 ? (t.push(n), 1) : n >= -128 ? (t.push(208), i(t, n), 2) : n >= -32768 ? (t.push(209), s(t, n), 3) : n >= -2147483648 ? (t.push(210), c(t, n), 5) : (t.push(211), f(t, n), 9) : e(t, n > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER)
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.indexChangeCheck = t.nilCheck = t.arrayCheck = t.numberCheck = t.number = t.stringCheck = t.string = t.boolean = t.readFloat64 = t.readFloat32 = t.uint64 = t.int64 = t.float64 = t.float32 = t.uint32 = t.int32 = t.uint16 = t.int16 = t.uint8 = t.int8 = void 0;
        var r = n(10);

        function i(e, t) {
            return o(e, t) << 24 >> 24
        }

        function o(e, t) {
            return e[t.offset++]
        }

        function s(e, t) {
            return a(e, t) << 16 >> 16
        }

        function a(e, t) {
            return e[t.offset++] | e[t.offset++] << 8
        }

        function c(e, t) {
            return e[t.offset++] | e[t.offset++] << 8 | e[t.offset++] << 16 | e[t.offset++] << 24
        }

        function u(e, t) {
            return c(e, t) >>> 0
        }

        function f(e, t) {
            var n = u(e, t);
            return c(e, t) * Math.pow(2, 32) + n
        }

        function h(e, t) {
            var n = u(e, t);
            return u(e, t) * Math.pow(2, 32) + n
        }

        t.int8 = i, t.uint8 = o, t.int16 = s, t.uint16 = a, t.int32 = c, t.uint32 = u, t.float32 = function (e, t) {
            return v(e, t)
        }, t.float64 = function (e, t) {
            return y(e, t)
        }, t.int64 = f, t.uint64 = h;
        var l = new Int32Array(2), p = new Float32Array(l.buffer), d = new Float64Array(l.buffer);

        function v(e, t) {
            return l[0] = c(e, t), p[0]
        }

        function y(e, t) {
            return l[0] = c(e, t), l[1] = c(e, t), d[0]
        }

        t.readFloat32 = v, t.readFloat64 = y, t.boolean = function (e, t) {
            return o(e, t) > 0
        }, t.string = function (e, t) {
            var n, r = e[t.offset++];
            r < 192 ? n = 31 & r : 217 === r ? n = o(e, t) : 218 === r ? n = a(e, t) : 219 === r && (n = u(e, t));
            var i = function (e, t, n) {
                for (var r = "", i = 0, o = t, s = t + n; o < s; o++) {
                    var a = e[o];
                    if (0 != (128 & a)) if (192 != (224 & a)) if (224 != (240 & a)) {
                        if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
                        (i = (7 & a) << 18 | (63 & e[++o]) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0) >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i)
                    } else r += String.fromCharCode((15 & a) << 12 | (63 & e[++o]) << 6 | (63 & e[++o]) << 0); else r += String.fromCharCode((31 & a) << 6 | 63 & e[++o]); else r += String.fromCharCode(a)
                }
                return r
            }(e, t.offset, n);
            return t.offset += n, i
        }, t.stringCheck = function (e, t) {
            var n = e[t.offset];
            return n < 192 && n > 160 || 217 === n || 218 === n || 219 === n
        }, t.number = function (e, t) {
            var n = e[t.offset++];
            return n < 128 ? n : 202 === n ? v(e, t) : 203 === n ? y(e, t) : 204 === n ? o(e, t) : 205 === n ? a(e, t) : 206 === n ? u(e, t) : 207 === n ? h(e, t) : 208 === n ? i(e, t) : 209 === n ? s(e, t) : 210 === n ? c(e, t) : 211 === n ? f(e, t) : n > 223 ? -1 * (255 - n + 1) : void 0
        }, t.numberCheck = function (e, t) {
            var n = e[t.offset];
            return n < 128 || n >= 202 && n <= 211
        }, t.arrayCheck = function (e, t) {
            return e[t.offset] < 160
        }, t.nilCheck = function (e, t) {
            return e[t.offset] === r.NIL
        }, t.indexChangeCheck = function (e, t) {
            return e[t.offset] === r.INDEX_CHANGE
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.TYPE_ID = t.INDEX_CHANGE = t.NIL = t.END_OF_STRUCTURE = void 0, t.END_OF_STRUCTURE = 193, t.NIL = 192, t.INDEX_CHANGE = 212, t.TYPE_ID = 213
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) {
            void 0 === r && (r = n), Object.defineProperty(e, r, {
                enumerable: !0, get: function () {
                    return t[n]
                }
            })
        } : function (e, t, n, r) {
            void 0 === r && (r = n), e[r] = t[n]
        }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), o = this && this.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) "default" !== n && Object.hasOwnProperty.call(e, n) && r(t, e, n);
            return i(t, e), t
        }, s = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(s, a)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, a = this && this.__generator || function (e, t) {
            var n, r, i, o, s = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function a(o) {
                return function (a) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {value: o[1], done: !1};
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, a])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.Auth = t.Platform = void 0;
        var c = o(n(3)), u = n(27);
        !function (e) {
            e.ios = "ios", e.android = "android"
        }(t.Platform || (t.Platform = {}));
        var f = function () {
            function e(e) {
                var t = this;
                this._id = void 0, this.username = void 0, this.displayName = void 0, this.avatarUrl = void 0, this.isAnonymous = void 0, this.email = void 0, this.lang = void 0, this.location = void 0, this.timezone = void 0, this.metadata = void 0, this.devices = void 0, this.facebookId = void 0, this.twitterId = void 0, this.googleId = void 0, this.gameCenterId = void 0, this.steamId = void 0, this.friendIds = void 0, this.blockedUserIds = void 0, this.createdAt = void 0, this.updatedAt = void 0, this.token = void 0, this.endpoint = e.replace("ws", "http"), u.getItem("colyseus-auth-token", (function (e) {
                    return t.token = e
                }))
            }

            return Object.defineProperty(e.prototype, "hasToken", {
                get: function () {
                    return !!this.token
                }, enumerable: !1, configurable: !0
            }), e.prototype.login = function (e) {
                return void 0 === e && (e = {}), s(this, void 0, void 0, (function () {
                    var t, n, r;
                    return a(this, (function (i) {
                        switch (i.label) {
                            case 0:
                                return t = Object.assign({}, e), this.hasToken && (t.token = this.token), [4, this.request("post", "/auth", t)];
                            case 1:
                                for (r in n = i.sent(), this.token = n.token, u.setItem("colyseus-auth-token", this.token), n) this.hasOwnProperty(r) && (this[r] = n[r]);
                                return this.registerPingService(), [2, this]
                        }
                    }))
                }))
            }, e.prototype.save = function () {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("put", "/auth", {}, {
                                    username: this.username,
                                    displayName: this.displayName,
                                    avatarUrl: this.avatarUrl,
                                    lang: this.lang,
                                    location: this.location,
                                    timezone: this.timezone
                                })];
                            case 1:
                                return e.sent(), [2, this]
                        }
                    }))
                }))
            }, e.prototype.getFriends = function () {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("get", "/friends/all")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.getOnlineFriends = function () {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("get", "/friends/online")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.getFriendRequests = function () {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, this.request("get", "/friends/requests")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.sendFriendRequest = function (e) {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("post", "/friends/requests", {userId: e})];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.acceptFriendRequest = function (e) {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("put", "/friends/requests", {userId: e})];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.declineFriendRequest = function (e) {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("del", "/friends/requests", {userId: e})];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.blockUser = function (e) {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("post", "/friends/block", {userId: e})];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.unblockUser = function (e) {
                return s(this, void 0, void 0, (function () {
                    return a(this, (function (t) {
                        switch (t.label) {
                            case 0:
                                return [4, this.request("put", "/friends/block", {userId: e})];
                            case 1:
                                return [2, t.sent()]
                        }
                    }))
                }))
            }, e.prototype.request = function (e, t, n, r, i) {
                return void 0 === n && (n = {}), void 0 === i && (i = {}), s(this, void 0, void 0, (function () {
                    var o, s, u, f;
                    return a(this, (function (a) {
                        switch (a.label) {
                            case 0:
                                for (s in i.Accept = "application/json", this.hasToken && (i.Authorization = "Bearer " + this.token), o = [], n) o.push(s + "=" + n[s]);
                                return u = o.length > 0 ? "?" + o.join("&") : "", f = {headers: i}, r && (f.body = r), [4, c[e]("" + this.endpoint + t + u, f)];
                            case 1:
                                return [2, a.sent().data]
                        }
                    }))
                }))
            }, e.prototype.logout = function () {
                this.token = void 0, u.removeItem("colyseus-auth-token"), this.unregisterPingService()
            }, e.prototype.registerPingService = function (e) {
                var t = this;
                void 0 === e && (e = 15e3), this.unregisterPingService(), this.keepOnlineInterval = setInterval((function () {
                    return t.request("get", "/auth")
                }), e)
            }, e.prototype.unregisterPingService = function () {
                clearInterval(this.keepOnlineInterval)
            }, e
        }();
        t.Auth = f
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(2);
        Object.defineProperty(t, "Schema", {
            enumerable: !0, get: function () {
                return r.Schema
            }
        });
        var i = n(1);
        Object.defineProperty(t, "MapSchema", {
            enumerable: !0, get: function () {
                return i.MapSchema
            }
        });
        var o = n(0);
        Object.defineProperty(t, "ArraySchema", {
            enumerable: !0, get: function () {
                return o.ArraySchema
            }
        });
        var s = n(36);
        Object.defineProperty(t, "dumpChanges", {
            enumerable: !0, get: function () {
                return s.dumpChanges
            }
        });
        var a = n(37);
        Object.defineProperty(t, "Reflection", {
            enumerable: !0, get: function () {
                return a.Reflection
            }
        }), Object.defineProperty(t, "ReflectionType", {
            enumerable: !0, get: function () {
                return a.ReflectionType
            }
        }), Object.defineProperty(t, "ReflectionField", {
            enumerable: !0, get: function () {
                return a.ReflectionField
            }
        });
        var c = n(14);
        Object.defineProperty(t, "type", {
            enumerable: !0, get: function () {
                return c.type
            }
        }), Object.defineProperty(t, "deprecated", {
            enumerable: !0, get: function () {
                return c.deprecated
            }
        }), Object.defineProperty(t, "filter", {
            enumerable: !0, get: function () {
                return c.filter
            }
        }), Object.defineProperty(t, "defineTypes", {
            enumerable: !0, get: function () {
                return c.defineTypes
            }
        }), Object.defineProperty(t, "Context", {
            enumerable: !0, get: function () {
                return c.Context
            }
        })
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.ChangeTree = void 0;
        var r = n(2), i = n(0), o = n(1), s = function () {
            function e(e, t, n) {
                void 0 === e && (e = {}), void 0 === t && (t = null), this.changed = !1, this.changes = new Set, this.allChanges = new Set, this.deletedKeys = {}, this.fieldIndexes = e, this.parent = n, this.parentField = t
            }

            return e.prototype.change = function (e, t) {
                void 0 === t && (t = !1);
                var n = this.fieldIndexes[e], r = "number" == typeof n ? n : e;
                t ? t && (this.changed = !0, this.changes.add(r), this.allChanges.delete(r)) : (this.changed = !0, this.changes.add(r), this.allChanges.add(r)), this.parent && this.parent.change(this.parentField)
            }, e.prototype.mapIndex = function (e, t) {
                "object" == typeof e && (this.indexMap || (this.indexMap = new Map, this.indexChange = new Map), this.indexMap.set(e, t))
            }, e.prototype.getIndex = function (e) {
                return this.indexMap && this.indexMap.get(e)
            }, e.prototype.deleteIndex = function (e) {
                "object" == typeof e && (this.deletedKeys[this.indexMap.get(e)] = !0, this.indexMap.delete(e))
            }, e.prototype.isDeleted = function (e) {
                return void 0 !== this.deletedKeys[e]
            }, e.prototype.mapIndexChange = function (e, t) {
                "object" != typeof e || this.indexChange.has(e) || this.indexChange.set(e, t)
            }, e.prototype.getIndexChange = function (e) {
                return this.indexChange && this.indexChange.get(e)
            }, e.prototype.deleteIndexChange = function (e) {
                "object" == typeof e && this.indexChange.delete(e)
            }, e.prototype.changeAll = function (e) {
                if (e instanceof r.Schema) {
                    var t = e._schema;
                    for (var n in t) (e[n] instanceof r.Schema || e[n] instanceof i.ArraySchema || e[n] instanceof o.MapSchema) && !e[n].$changes.parent.parent && (e[n].$changes.parent = this), void 0 !== e[n] && this.change(n)
                } else for (var s = 0, a = Object.keys(e); s < a.length; s++) {
                    var c = a[s];
                    void 0 !== e[c] && this.change(c)
                }
            }, e.prototype.discard = function () {
                this.changed = !1, this.changes.clear(), this.deletedKeys = {}, this.indexChange && this.indexChange.clear()
            }, e.prototype.clone = function () {
                return new e(this.fieldIndexes, this.parentField, void 0)
            }, e
        }();
        t.ChangeTree = s
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.defineTypes = t.deprecated = t.filter = t.type = t.globalContext = t.Context = void 0;
        var r = n(13), i = n(2), o = function () {
            function e() {
                this.types = {}, this.schemas = new Map
            }

            return e.prototype.has = function (e) {
                return this.schemas.has(e)
            }, e.prototype.get = function (e) {
                return this.types[e]
            }, e.prototype.add = function (e) {
                e._typeid = this.schemas.size, this.types[e._typeid] = e, this.schemas.set(e, e._typeid)
            }, e
        }();

        function s(e, n) {
            return void 0 === n && (n = t.globalContext), function (t, o) {
                var s = t.constructor;
                s._context = n, n.has(s) || (n.add(s), s._schema = Object.assign({}, s._schema || {}), s._indexes = Object.assign({}, s._indexes || {}), s._fieldsByIndex = Object.assign({}, s._fieldsByIndex || {}), s._descriptors = Object.assign({}, s._descriptors || {}), s._deprecated = Object.assign({}, s._deprecated || {}));
                var a = Object.keys(s._schema).length;
                if (s._fieldsByIndex[a] = o, s._indexes[o] = a, s._schema[o] = e, !s._descriptors[o]) {
                    var c = Array.isArray(e), u = !c && e.map, f = "function" == typeof s._schema[o], h = "_" + o;
                    s._descriptors[h] = {enumerable: !1, configurable: !1, writable: !0}, s._descriptors[o] = {
                        get: function () {
                            return this[h]
                        }, set: function (e) {
                            if ((c || u) && (e = new Proxy(e, {
                                get: function (e, t) {
                                    return e[t]
                                }, set: function (e, t, n) {
                                    if ("length" !== t && 0 !== t.indexOf("$")) {
                                        var o = c ? Number(t) : String(t);
                                        if (!e.$sorting) {
                                            var s = e.$changes.getIndex(n);
                                            void 0 !== s && e.$changes.mapIndexChange(n, s), e.$changes.mapIndex(n, o)
                                        }
                                        n instanceof i.Schema ? n.$changes.parent || (n.$changes = new r.ChangeTree(n._indexes, o, e.$changes), n.$changes.changeAll(n)) : e[t] = n, e.$changes.change(o)
                                    } else e[t];
                                    return e[t] = n, !0
                                }, deleteProperty: function (e, t) {
                                    var n = e[t];
                                    u && void 0 !== n && (e.$changes.deleteIndex(n), e.$changes.deleteIndexChange(n), n.$changes && delete n.$changes.parent), delete e[t];
                                    var r = c ? Number(t) : String(t);
                                    return e.$changes.change(r, !0), !0
                                }
                            })), e !== this[h]) if (this[h] = e, c) {
                                this.$changes.change(o), e.$changes = new r.ChangeTree({}, o, this.$changes);
                                for (var t = 0; t < e.length; t++) e[t] instanceof i.Schema && (e[t].$changes = new r.ChangeTree(e[t]._indexes, t, e.$changes), e[t].$changes.changeAll(e[t])), e.$changes.mapIndex(e[t], t), e.$changes.change(t)
                            } else if (u) for (var n in e.$changes = new r.ChangeTree({}, o, this.$changes), this.$changes.change(o), e) e[n] instanceof i.Schema && (e[n].$changes = new r.ChangeTree(e[n]._indexes, n, e.$changes), e[n].$changes.changeAll(e[n])), e.$changes.mapIndex(e[n], n), e.$changes.change(n); else f ? (this.$changes.change(o), e && (e.$changes = new r.ChangeTree(e._indexes, o, this.$changes), e.$changes.changeAll(e))) : this.$changes.change(o)
                        }, enumerable: !0, configurable: !0
                    }
                }
            }
        }

        t.Context = o, t.globalContext = new o, t.type = s, t.filter = function (e) {
            return function (t, n) {
                var r = t.constructor;
                r._filters || (r._filters = {}), r._filters[n] = e
            }
        }, t.deprecated = function (e, n) {
            return void 0 === e && (e = !0), void 0 === n && (n = t.globalContext), function (t, n) {
                var r = t.constructor;
                r._deprecated[n] = !0, e && (r._descriptors[n] = {
                    get: function () {
                        throw new Error(n + " is deprecated.")
                    }, set: function (e) {
                    }, enumerable: !1, configurable: !0
                })
            }
        }, t.defineTypes = function (e, n, r) {
            for (var i in void 0 === r && (r = t.globalContext), n) s(n[i], r)(e.prototype, i);
            return e
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.SchemaSerializer = t.FossilDeltaSerializer = t.registerSerializer = void 0, n(16);
        var r = n(17);
        Object.defineProperty(t, "Client", {
            enumerable: !0, get: function () {
                return r.Client
            }
        });
        var i = n(7);
        Object.defineProperty(t, "Protocol", {
            enumerable: !0, get: function () {
                return i.Protocol
            }
        }), Object.defineProperty(t, "ErrorCode", {
            enumerable: !0, get: function () {
                return i.ErrorCode
            }
        });
        var o = n(4);
        Object.defineProperty(t, "Room", {
            enumerable: !0, get: function () {
                return o.Room
            }
        });
        var s = n(11);
        Object.defineProperty(t, "Auth", {
            enumerable: !0, get: function () {
                return s.Auth
            }
        }), Object.defineProperty(t, "Platform", {
            enumerable: !0, get: function () {
                return s.Platform
            }
        });
        var a = n(29);
        Object.defineProperty(t, "FossilDeltaSerializer", {
            enumerable: !0, get: function () {
                return a.FossilDeltaSerializer
            }
        });
        var c = n(34);
        Object.defineProperty(t, "SchemaSerializer", {
            enumerable: !0, get: function () {
                return c.SchemaSerializer
            }
        });
        var u = n(6);
        Object.defineProperty(t, "registerSerializer", {
            enumerable: !0, get: function () {
                return u.registerSerializer
            }
        }), u.registerSerializer("fossil-delta", a.FossilDeltaSerializer), u.registerSerializer("schema", c.SchemaSerializer)
    }, function (e, t) {
        ArrayBuffer.isView || (ArrayBuffer.isView = function (e) {
            return null !== e && "object" == typeof e && e.buffer instanceof ArrayBuffer
        })
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
            return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), o = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(s, a)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, s = this && this.__generator || function (e, t) {
            var n, r, i, o, s = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function a(o) {
                return function (a) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {value: o[1], done: !1};
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, a])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.Client = t.MatchMakeError = void 0;
        var a = n(3), c = n(18), u = n(4), f = n(11), h = n(28), l = function (e) {
            function t(n, r) {
                var i = e.call(this, n) || this;
                return i.code = r, Object.setPrototypeOf(i, t.prototype), i
            }

            return i(t, e), t
        }(Error);
        t.MatchMakeError = l;
        var p = function () {
            function e(e) {
                void 0 === e && (e = location.protocol.replace("http", "ws") + "//" + location.hostname + (location.port && ":" + location.port)), this.endpoint = e, this.auth = new f.Auth(this.endpoint), this.push = new h.Push(this.endpoint)
            }

            return e.prototype.joinOrCreate = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("joinOrCreate", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.create = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("create", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.join = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("join", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.joinById = function (e, t, n) {
                return void 0 === t && (t = {}), o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("joinById", e, t, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.reconnect = function (e, t, n) {
                return o(this, void 0, void 0, (function () {
                    return s(this, (function (r) {
                        switch (r.label) {
                            case 0:
                                return [4, this.createMatchMakeRequest("joinById", e, {sessionId: t}, n)];
                            case 1:
                                return [2, r.sent()]
                        }
                    }))
                }))
            }, e.prototype.getAvailableRooms = function (e) {
                return void 0 === e && (e = ""), o(this, void 0, void 0, (function () {
                    var t;
                    return s(this, (function (n) {
                        switch (n.label) {
                            case 0:
                                return t = this.endpoint.replace("ws", "http") + "/matchmake/" + e, [4, a.get(t, {headers: {Accept: "application/json"}})];
                            case 1:
                                return [2, n.sent().data]
                        }
                    }))
                }))
            }, e.prototype.consumeSeatReservation = function (e, t) {
                return o(this, void 0, void 0, (function () {
                    var n;
                    return s(this, (function (r) {
                        return (n = this.createRoom(e.room.name, t)).id = e.room.roomId, n.sessionId = e.sessionId, n.connect(this.buildEndpoint(e.room, {sessionId: n.sessionId})), [2, new Promise((function (e, t) {
                            var r = function (e, n) {
                                return t(new c.ServerError(e, n))
                            };
                            n.onError.once(r), n.onJoin.once((function () {
                                n.onError.remove(r), e(n)
                            }))
                        }))]
                    }))
                }))
            }, e.prototype.createMatchMakeRequest = function (e, t, n, r) {
                return void 0 === n && (n = {}), o(this, void 0, void 0, (function () {
                    var i, o;
                    return s(this, (function (s) {
                        switch (s.label) {
                            case 0:
                                return i = this.endpoint.replace("ws", "http") + "/matchmake/" + e + "/" + t, this.auth.hasToken && (n.token = this.auth.token), [4, a.post(i, {
                                    headers: {
                                        Accept: "application/json",
                                        "Content-Type": "application/json"
                                    }, body: JSON.stringify(n)
                                })];
                            case 1:
                                if ((o = s.sent().data).error) throw new l(o.error, o.code);
                                return [2, this.consumeSeatReservation(o, r)]
                        }
                    }))
                }))
            }, e.prototype.createRoom = function (e, t) {
                return new u.Room(e, t)
            }, e.prototype.buildEndpoint = function (e, t) {
                void 0 === t && (t = {});
                var n = [];
                for (var r in t) t.hasOwnProperty(r) && n.push(r + "=" + t[r]);
                return "ws://" + e.serverIp + ":" + e.serverPort + "/" + e.processId + "/" + e.roomId + "?" + n.join("&")
            }, e
        }();
        t.Client = p
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
            return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        });
        Object.defineProperty(t, "__esModule", {value: !0}), t.ServerError = void 0;
        var o = function (e) {
            function t(t, n) {
                var r = e.call(this, n) || this;
                return r.name = "ServerError", r.code = t, r
            }

            return i(t, e), t
        }(Error);
        t.ServerError = o
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            if (this._offset = t, e instanceof ArrayBuffer) this._buffer = e, this._view = new DataView(this._buffer); else {
                if (!ArrayBuffer.isView(e)) throw new Error("Invalid argument");
                this._buffer = e.buffer, this._view = new DataView(this._buffer, e.byteOffset, e.byteLength)
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0}), r.prototype._array = function (e) {
            for (var t = new Array(e), n = 0; n < e; n++) t[n] = this._parse();
            return t
        }, r.prototype._map = function (e) {
            for (var t = {}, n = 0; n < e; n++) t[this._parse()] = this._parse();
            return t
        }, r.prototype._str = function (e) {
            var t = function (e, t, n) {
                for (var r = "", i = 0, o = t, s = t + n; o < s; o++) {
                    var a = e.getUint8(o);
                    if (0 != (128 & a)) if (192 != (224 & a)) if (224 != (240 & a)) {
                        if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
                        (i = (7 & a) << 18 | (63 & e.getUint8(++o)) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0) >= 65536 ? (i -= 65536, r += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : r += String.fromCharCode(i)
                    } else r += String.fromCharCode((15 & a) << 12 | (63 & e.getUint8(++o)) << 6 | (63 & e.getUint8(++o)) << 0); else r += String.fromCharCode((31 & a) << 6 | 63 & e.getUint8(++o)); else r += String.fromCharCode(a)
                }
                return r
            }(this._view, this._offset, e);
            return this._offset += e, t
        }, r.prototype._bin = function (e) {
            var t = this._buffer.slice(this._offset, this._offset + e);
            return this._offset += e, t
        }, r.prototype._parse = function () {
            var e, t = this._view.getUint8(this._offset++), n = 0, r = 0, i = 0, o = 0;
            if (t < 192) return t < 128 ? t : t < 144 ? this._map(15 & t) : t < 160 ? this._array(15 & t) : this._str(31 & t);
            if (t > 223) return -1 * (255 - t + 1);
            switch (t) {
                case 192:
                    return null;
                case 194:
                    return !1;
                case 195:
                    return !0;
                case 196:
                    return n = this._view.getUint8(this._offset), this._offset += 1, this._bin(n);
                case 197:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._bin(n);
                case 198:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._bin(n);
                case 199:
                    return n = this._view.getUint8(this._offset), r = this._view.getInt8(this._offset + 1), this._offset += 2, [r, this._bin(n)];
                case 200:
                    return n = this._view.getUint16(this._offset), r = this._view.getInt8(this._offset + 2), this._offset += 3, [r, this._bin(n)];
                case 201:
                    return n = this._view.getUint32(this._offset), r = this._view.getInt8(this._offset + 4), this._offset += 5, [r, this._bin(n)];
                case 202:
                    return e = this._view.getFloat32(this._offset), this._offset += 4, e;
                case 203:
                    return e = this._view.getFloat64(this._offset), this._offset += 8, e;
                case 204:
                    return e = this._view.getUint8(this._offset), this._offset += 1, e;
                case 205:
                    return e = this._view.getUint16(this._offset), this._offset += 2, e;
                case 206:
                    return e = this._view.getUint32(this._offset), this._offset += 4, e;
                case 207:
                    return i = this._view.getUint32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), this._offset += 8, i + o;
                case 208:
                    return e = this._view.getInt8(this._offset), this._offset += 1, e;
                case 209:
                    return e = this._view.getInt16(this._offset), this._offset += 2, e;
                case 210:
                    return e = this._view.getInt32(this._offset), this._offset += 4, e;
                case 211:
                    return i = this._view.getInt32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), this._offset += 8, i + o;
                case 212:
                    return r = this._view.getInt8(this._offset), this._offset += 1, 0 === r ? void (this._offset += 1) : [r, this._bin(1)];
                case 213:
                    return r = this._view.getInt8(this._offset), this._offset += 1, [r, this._bin(2)];
                case 214:
                    return r = this._view.getInt8(this._offset), this._offset += 1, [r, this._bin(4)];
                case 215:
                    return r = this._view.getInt8(this._offset), this._offset += 1, 0 === r ? (i = this._view.getInt32(this._offset) * Math.pow(2, 32), o = this._view.getUint32(this._offset + 4), this._offset += 8, new Date(i + o)) : [r, this._bin(8)];
                case 216:
                    return r = this._view.getInt8(this._offset), this._offset += 1, [r, this._bin(16)];
                case 217:
                    return n = this._view.getUint8(this._offset), this._offset += 1, this._str(n);
                case 218:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._str(n);
                case 219:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._str(n);
                case 220:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._array(n);
                case 221:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._array(n);
                case 222:
                    return n = this._view.getUint16(this._offset), this._offset += 2, this._map(n);
                case 223:
                    return n = this._view.getUint32(this._offset), this._offset += 4, this._map(n)
            }
            throw new Error("Could not parse")
        }, t.default = function (e, t) {
            void 0 === t && (t = 0);
            var n = new r(e, t), i = n._parse();
            if (n._offset !== e.byteLength) throw new Error(e.byteLength - n._offset + " trailing bytes");
            return i
        }
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            for (var r = 0, i = 0, o = n.length; i < o; i++) (r = n.charCodeAt(i)) < 128 ? e.setUint8(t++, r) : r < 2048 ? (e.setUint8(t++, 192 | r >> 6), e.setUint8(t++, 128 | 63 & r)) : r < 55296 || r >= 57344 ? (e.setUint8(t++, 224 | r >> 12), e.setUint8(t++, 128 | r >> 6 & 63), e.setUint8(t++, 128 | 63 & r)) : (i++, r = 65536 + ((1023 & r) << 10 | 1023 & n.charCodeAt(i)), e.setUint8(t++, 240 | r >> 18), e.setUint8(t++, 128 | r >> 12 & 63), e.setUint8(t++, 128 | r >> 6 & 63), e.setUint8(t++, 128 | 63 & r))
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.default = function (e) {
            var t = [], n = [], i = function e(t, n, r) {
                var i = typeof r, o = 0, s = 0, a = 0, c = 0, u = 0, f = 0;
                if ("string" === i) {
                    if ((u = function (e) {
                        for (var t = 0, n = 0, r = 0, i = e.length; r < i; r++) (t = e.charCodeAt(r)) < 128 ? n += 1 : t < 2048 ? n += 2 : t < 55296 || t >= 57344 ? n += 3 : (r++, n += 4);
                        return n
                    }(r)) < 32) t.push(160 | u), f = 1; else if (u < 256) t.push(217, u), f = 2; else if (u < 65536) t.push(218, u >> 8, u), f = 3; else {
                        if (!(u < 4294967296)) throw new Error("String too long");
                        t.push(219, u >> 24, u >> 16, u >> 8, u), f = 5
                    }
                    return n.push({_str: r, _length: u, _offset: t.length}), f + u
                }
                if ("number" === i) return Math.floor(r) === r && isFinite(r) ? r >= 0 ? r < 128 ? (t.push(r), 1) : r < 256 ? (t.push(204, r), 2) : r < 65536 ? (t.push(205, r >> 8, r), 3) : r < 4294967296 ? (t.push(206, r >> 24, r >> 16, r >> 8, r), 5) : (a = r / Math.pow(2, 32) >> 0, c = r >>> 0, t.push(207, a >> 24, a >> 16, a >> 8, a, c >> 24, c >> 16, c >> 8, c), 9) : r >= -32 ? (t.push(r), 1) : r >= -128 ? (t.push(208, r), 2) : r >= -32768 ? (t.push(209, r >> 8, r), 3) : r >= -2147483648 ? (t.push(210, r >> 24, r >> 16, r >> 8, r), 5) : (a = Math.floor(r / Math.pow(2, 32)), c = r >>> 0, t.push(211, a >> 24, a >> 16, a >> 8, a, c >> 24, c >> 16, c >> 8, c), 9) : (t.push(203), n.push({
                    _float: r,
                    _length: 8,
                    _offset: t.length
                }), 9);
                if ("object" === i) {
                    if (null === r) return t.push(192), 1;
                    if (Array.isArray(r)) {
                        if ((u = r.length) < 16) t.push(144 | u), f = 1; else if (u < 65536) t.push(220, u >> 8, u), f = 3; else {
                            if (!(u < 4294967296)) throw new Error("Array too large");
                            t.push(221, u >> 24, u >> 16, u >> 8, u), f = 5
                        }
                        for (o = 0; o < u; o++) f += e(t, n, r[o]);
                        return f
                    }
                    if (r instanceof Date) {
                        var h = r.getTime();
                        return a = Math.floor(h / Math.pow(2, 32)), c = h >>> 0, t.push(215, 0, a >> 24, a >> 16, a >> 8, a, c >> 24, c >> 16, c >> 8, c), 10
                    }
                    if (r instanceof ArrayBuffer) {
                        if ((u = r.byteLength) < 256) t.push(196, u), f = 2; else if (u < 65536) t.push(197, u >> 8, u), f = 3; else {
                            if (!(u < 4294967296)) throw new Error("Buffer too large");
                            t.push(198, u >> 24, u >> 16, u >> 8, u), f = 5
                        }
                        return n.push({_bin: r, _length: u, _offset: t.length}), f + u
                    }
                    if ("function" == typeof r.toJSON) return e(t, n, r.toJSON());
                    var l = [], p = "", d = Object.keys(r);
                    for (o = 0, s = d.length; o < s; o++) "function" != typeof r[p = d[o]] && l.push(p);
                    if ((u = l.length) < 16) t.push(128 | u), f = 1; else if (u < 65536) t.push(222, u >> 8, u), f = 3; else {
                        if (!(u < 4294967296)) throw new Error("Object too large");
                        t.push(223, u >> 24, u >> 16, u >> 8, u), f = 5
                    }
                    for (o = 0; o < u; o++) f += e(t, n, p = l[o]), f += e(t, n, r[p]);
                    return f
                }
                if ("boolean" === i) return t.push(r ? 195 : 194), 1;
                if ("undefined" === i) return t.push(212, 0, 0), 3;
                throw new Error("Could not encode")
            }(t, n, e), o = new ArrayBuffer(i), s = new DataView(o), a = 0, c = 0, u = -1;
            n.length > 0 && (u = n[0]._offset);
            for (var f, h = 0, l = 0, p = 0, d = t.length; p < d; p++) if (s.setUint8(c + p, t[p]), p + 1 === u) {
                if (h = (f = n[a])._length, l = c + u, f._bin) for (var v = new Uint8Array(f._bin), y = 0; y < h; y++) s.setUint8(l + y, v[y]); else f._str ? r(s, l, f._str) : void 0 !== f._float && s.setFloat64(l, f._float);
                c += h, n[++a] && (u = n[a]._offset)
            }
            return o
        }
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e() {
                this.handlers = []
            }

            return e.prototype.register = function (e, t) {
                return void 0 === t && (t = !1), this.handlers.push(e), this
            }, e.prototype.invoke = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.handlers.forEach((function (t) {
                    return t.apply(void 0, e)
                }))
            }, e.prototype.invokeAsync = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return Promise.all(this.handlers.map((function (t) {
                    return t.apply(void 0, e)
                })))
            }, e.prototype.remove = function (e) {
                var t = this.handlers.indexOf(e);
                this.handlers[t] = this.handlers[this.handlers.length - 1], this.handlers.pop()
            }, e.prototype.clear = function () {
                this.handlers = []
            }, e
        }();
        t.EventEmitter = r, t.createSignal = function () {
            var e = new r;

            function t(t) {
                return e.register(t, null === this)
            }

            return t.once = function (t) {
                var n = function () {
                    for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                    t.apply(void 0, r), e.remove(n)
                };
                e.register(n)
            }, t.remove = function (t) {
                return e.remove(t)
            }, t.invoke = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.invoke.apply(e, t)
            }, t.invokeAsync = function () {
                for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                return e.invokeAsync.apply(e, t)
            }, t.clear = function () {
                return e.clear()
            }, t
        }
    }, function (e, t, n) {
        "use strict";
        n.r(t), n.d(t, "createNanoEvents", (function () {
            return r
        }));
        let r = () => ({
            events: {}, emit(e, ...t) {
                for (let n of this.events[e] || []) n(...t)
            }, on(e, t) {
                return (this.events[e] = this.events[e] || []).push(t), () => this.events[e] = this.events[e].filter(e => e !== t)
            }
        })
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
            return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), o = this && this.__importDefault || function (e) {
            return e && e.__esModule ? e : {default: e}
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.Connection = void 0;
        var s = o(n(24)), a = function (e) {
            function t(t, n) {
                void 0 === n && (n = !0);
                var r = e.call(this, t, void 0, {connect: n}) || this;
                return r._enqueuedCalls = [], r
            }

            return i(t, e), t.prototype.onOpenCallback = function (t) {
                if (e.prototype.onOpenCallback.call(this), this.binaryType = "arraybuffer", this._enqueuedCalls.length > 0) {
                    for (var n = 0, r = this._enqueuedCalls; n < r.length; n++) {
                        var i = r[n], o = i[0], s = i[1];
                        this[o].apply(this, s)
                    }
                    this._enqueuedCalls = []
                }
            }, t.prototype.send = function (t) {
                if (this.ws.readyState === s.default.OPEN) {
                    if (t instanceof ArrayBuffer) return e.prototype.send.call(this, t);
                    if (Array.isArray(t)) return e.prototype.send.call(this, new Uint8Array(t).buffer)
                } else this._enqueuedCalls.push(["send", [t]])
            }, t
        }(s.default);
        t.Connection = a
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }

            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }();

        function i(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        var o = n(25).createBackoff, s = "undefined" != typeof WebSocket ? WebSocket : n(26), a = function () {
            function e(t, n) {
                var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                i(this, e), this.url = t, this.protocols = n, this.reconnectEnabled = !0, this.listeners = {}, this.backoff = o(r.backoff || "exponential", r), this.backoff.onReady = this.onBackoffReady.bind(this), (void 0 === r.connect || r.connect) && this.open()
            }

            return r(e, [{
                key: "open", value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.isReconnect = e;
                    var t = this.ws && this.ws.binaryType;
                    this.ws = new s(this.url, this.protocols), this.ws.onclose = this.onCloseCallback.bind(this), this.ws.onerror = this.onErrorCallback.bind(this), this.ws.onmessage = this.onMessageCallback.bind(this), this.ws.onopen = this.onOpenCallback.bind(this), t && (this.ws.binaryType = t)
                }
            }, {
                key: "onBackoffReady", value: function (e, t) {
                    this.open(!0)
                }
            }, {
                key: "onCloseCallback", value: function (e) {
                    !this.isReconnect && this.listeners.onclose && this.listeners.onclose.apply(null, arguments), this.reconnectEnabled && e.code < 3e3 && this.backoff.backoff()
                }
            }, {
                key: "onErrorCallback", value: function () {
                    this.listeners.onerror && this.listeners.onerror.apply(null, arguments)
                }
            }, {
                key: "onMessageCallback", value: function () {
                    this.listeners.onmessage && this.listeners.onmessage.apply(null, arguments)
                }
            }, {
                key: "onOpenCallback", value: function () {
                    this.listeners.onopen && this.listeners.onopen.apply(null, arguments), this.isReconnect && this.listeners.onreconnect && this.listeners.onreconnect.apply(null, arguments), this.isReconnect = !1
                }
            }, {
                key: "close", value: function (e, t) {
                    void 0 === e && (e = 1e3), this.reconnectEnabled = !1, this.ws.close(e, t)
                }
            }, {
                key: "send", value: function (e) {
                    this.ws.send(e)
                }
            }, {
                key: "bufferedAmount", get: function () {
                    return this.ws.bufferedAmount
                }
            }, {
                key: "readyState", get: function () {
                    return this.ws.readyState
                }
            }, {
                key: "binaryType", get: function () {
                    return this.ws.binaryType
                }, set: function (e) {
                    this.ws.binaryType = e
                }
            }, {
                key: "extensions", get: function () {
                    return this.ws.extensions
                }, set: function (e) {
                    this.ws.extensions = e
                }
            }, {
                key: "protocol", get: function () {
                    return this.ws.protocol
                }, set: function (e) {
                    this.ws.protocol = e
                }
            }, {
                key: "onclose", set: function (e) {
                    this.listeners.onclose = e
                }, get: function () {
                    return this.listeners.onclose
                }
            }, {
                key: "onerror", set: function (e) {
                    this.listeners.onerror = e
                }, get: function () {
                    return this.listeners.onerror
                }
            }, {
                key: "onmessage", set: function (e) {
                    this.listeners.onmessage = e
                }, get: function () {
                    return this.listeners.onmessage
                }
            }, {
                key: "onopen", set: function (e) {
                    this.listeners.onopen = e
                }, get: function () {
                    return this.listeners.onopen
                }
            }, {
                key: "onreconnect", set: function (e) {
                    this.listeners.onreconnect = e
                }, get: function () {
                    return this.listeners.onreconnect
                }
            }]), e
        }();
        a.CONNECTING = s.CONNECTING, a.OPEN = s.OPEN, a.CLOSING = s.CLOSING, a.CLOSED = s.CLOSED, t.default = a
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.createBackoff = function (e, t) {
            return new i(r[e], t)
        };
        var r = {
            exponential: function (e, t) {
                return Math.floor(Math.random() * Math.pow(2, e) * t)
            }, fibonacci: function (e, t) {
                if (e > (r = 1)) for (var n = 1, r = 2, i = 2; i < e; i++) {
                    var o = n + r;
                    n = r, r = o
                }
                return Math.floor(Math.random() * r * t)
            }
        };

        function i(e, t) {
            this.func = e, this.attempts = 0, this.delay = void 0 !== t.initialDelay ? t.initialDelay : 100
        }

        i.prototype.backoff = function () {
            setTimeout(this.onReady, this.func(++this.attempts, this.delay))
        }
    }, function (e, t) {
    }, function (e, t, n) {
        "use strict";
        var r;

        function i() {
            return r || (r = "undefined" != typeof cc && cc.sys && cc.sys.localStorage ? cc.sys.localStorage : "undefined" != typeof window && window.localStorage ? window.localStorage : {
                cache: {},
                setItem: function (e, t) {
                    this.cache[e] = t
                },
                getItem: function (e) {
                    this.cache[e]
                },
                removeItem: function (e) {
                    delete this.cache[e]
                }
            }), r
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.getItem = t.removeItem = t.setItem = void 0, t.setItem = function (e, t) {
            i().setItem(e, t)
        }, t.removeItem = function (e) {
            i().removeItem(e)
        }, t.getItem = function (e, t) {
            var n = i().getItem(e);
            "undefined" != typeof Promise && n instanceof Promise ? n.then((function (e) {
                return t(e)
            })) : t(n)
        }
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__awaiter || function (e, t, n, r) {
            return new (n || (n = Promise))((function (i, o) {
                function s(e) {
                    try {
                        c(r.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function a(e) {
                    try {
                        c(r.throw(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function c(e) {
                    var t;
                    e.done ? i(e.value) : (t = e.value, t instanceof n ? t : new n((function (e) {
                        e(t)
                    }))).then(s, a)
                }

                c((r = r.apply(e, t || [])).next())
            }))
        }, i = this && this.__generator || function (e, t) {
            var n, r, i, o, s = {
                label: 0, sent: function () {
                    if (1 & i[0]) throw i[1];
                    return i[1]
                }, trys: [], ops: []
            };
            return o = {
                next: a(0),
                throw: a(1),
                return: a(2)
            }, "function" == typeof Symbol && (o[Symbol.iterator] = function () {
                return this
            }), o;

            function a(o) {
                return function (a) {
                    return function (o) {
                        if (n) throw new TypeError("Generator is already executing.");
                        for (; s;) try {
                            if (n = 1, r && (i = 2 & o[0] ? r.return : o[0] ? r.throw || ((i = r.return) && i.call(r), 0) : r.next) && !(i = i.call(r, o[1])).done) return i;
                            switch (r = 0, i && (o = [2 & o[0], i.value]), o[0]) {
                                case 0:
                                case 1:
                                    i = o;
                                    break;
                                case 4:
                                    return s.label++, {value: o[1], done: !1};
                                case 5:
                                    s.label++, r = o[1], o = [0];
                                    continue;
                                case 7:
                                    o = s.ops.pop(), s.trys.pop();
                                    continue;
                                default:
                                    if (!(i = s.trys, (i = i.length > 0 && i[i.length - 1]) || 6 !== o[0] && 2 !== o[0])) {
                                        s = 0;
                                        continue
                                    }
                                    if (3 === o[0] && (!i || o[1] > i[0] && o[1] < i[3])) {
                                        s.label = o[1];
                                        break
                                    }
                                    if (6 === o[0] && s.label < i[1]) {
                                        s.label = i[1], i = o;
                                        break
                                    }
                                    if (i && s.label < i[2]) {
                                        s.label = i[2], s.ops.push(o);
                                        break
                                    }
                                    i[2] && s.ops.pop(), s.trys.pop();
                                    continue
                            }
                            o = t.call(e, s)
                        } catch (e) {
                            o = [6, e], r = 0
                        } finally {
                            n = i = 0
                        }
                        if (5 & o[0]) throw o[1];
                        return {value: o[0] ? o[1] : void 0, done: !0}
                    }([o, a])
                }
            }
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.Push = void 0;
        var o = function () {
            function e(e) {
                this.endpoint = e.replace("ws", "http")
            }

            return e.prototype.register = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return this.check(), [4, this.registerServiceWorker()];
                            case 1:
                                return e.sent(), [4, this.requestNotificationPermission()];
                            case 2:
                                return e.sent(), [2]
                        }
                    }))
                }))
            }, e.prototype.registerServiceWorker = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, navigator.serviceWorker.register(this.endpoint + "/push")];
                            case 1:
                                return [2, e.sent()]
                        }
                    }))
                }))
            }, e.prototype.requestNotificationPermission = function () {
                return r(this, void 0, void 0, (function () {
                    return i(this, (function (e) {
                        switch (e.label) {
                            case 0:
                                return [4, window.Notification.requestPermission()];
                            case 1:
                                if ("granted" !== e.sent()) throw new Error("Permission not granted for Notification");
                                return [2]
                        }
                    }))
                }))
            }, e.prototype.check = function () {
                if (!("serviceWorker" in navigator)) throw new Error("No Service Worker support!");
                if (!("PushManager" in window)) throw new Error("No Push API Support!")
            }, e
        }();
        t.Push = o
    }, function (e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) {
            void 0 === r && (r = n), Object.defineProperty(e, r, {
                enumerable: !0, get: function () {
                    return t[n]
                }
            })
        } : function (e, t, n, r) {
            void 0 === r && (r = n), e[r] = t[n]
        }), i = this && this.__setModuleDefault || (Object.create ? function (e, t) {
            Object.defineProperty(e, "default", {enumerable: !0, value: t})
        } : function (e, t) {
            e.default = t
        }), o = this && this.__importStar || function (e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e) for (var n in e) "default" !== n && Object.hasOwnProperty.call(e, n) && r(t, e, n);
            return i(t, e), t
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.FossilDeltaSerializer = void 0;
        var s = n(30), a = o(n(33)), c = o(n(5)), u = function () {
            function e() {
                this.api = new s.StateContainer({})
            }

            return e.prototype.getState = function () {
                return this.api.state
            }, e.prototype.setState = function (e) {
                this.previousState = new Uint8Array(e), this.api.set(c.decode(this.previousState))
            }, e.prototype.patch = function (e) {
                this.previousState = new Uint8Array(a.apply(this.previousState, e)), this.api.set(c.decode(this.previousState))
            }, e.prototype.teardown = function () {
                this.api.removeAllListeners()
            }, e
        }();
        t.FossilDeltaSerializer = u
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(31);
        t.StateContainer = r.StateContainer
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0});
        var r = n(32), i = function () {
            function e(e) {
                this.listeners = [], this.matcherPlaceholders = {
                    ":id": /^([a-zA-Z0-9\-_]+)$/,
                    ":number": /^([0-9]+)$/,
                    ":string": /^(\w+)$/,
                    ":axis": /^([xyz])$/,
                    ":*": /(.*)/
                }, this.state = e, this.reset()
            }

            return e.prototype.set = function (e) {
                var t = r.compare(this.state, e);
                return this.state = e, this.checkPatches(t, this.listeners, this.defaultListener), t
            }, e.prototype.registerPlaceholder = function (e, t) {
                this.matcherPlaceholders[e] = t
            }, e.prototype.listen = function (e, t, n) {
                var i, o = this;
                "function" == typeof e ? (i = [], t = e) : i = e.split("/"), t.length > 1 && console.warn(".listen() accepts only one parameter.");
                var s = {
                    callback: t, rawRules: i, rules: i.map((function (e) {
                        return "string" == typeof e ? 0 === e.indexOf(":") ? o.matcherPlaceholders[e] || o.matcherPlaceholders[":*"] : new RegExp("^" + e + "$") : e
                    }))
                };
                return 0 === i.length ? this.defaultListener = s : this.listeners.push(s), n && this.checkPatches(r.compare({}, this.state), [s]), s
            }, e.prototype.removeListener = function (e) {
                for (var t = this.listeners.length - 1; t >= 0; t--) this.listeners[t] === e && this.listeners.splice(t, 1)
            }, e.prototype.removeAllListeners = function () {
                this.reset()
            }, e.prototype.checkPatches = function (e, t, n) {
                for (var r = 0, i = t.length; r < i; r++) for (var o = t[r], s = e.length - 1; s >= 0; s--) {
                    var a = o && this.getPathVariables(e[s], o);
                    a && (o.callback({
                        path: a,
                        rawPath: e[s].path,
                        operation: e[s].operation,
                        value: e[s].value
                    }), e[s].matched = !0)
                }
                if (n) for (s = e.length - 1; s >= 0; s--) e[s].matched || n.callback(e[s])
            }, e.prototype.getPathVariables = function (e, t) {
                if (e.path.length !== t.rules.length) return !1;
                for (var n = {}, r = 0, i = t.rules.length; r < i; r++) {
                    var o = e.path[r].match(t.rules[r]);
                    if (!o || 0 === o.length || o.length > 2) return !1;
                    ":" === t.rawRules[r].substr(0, 1) && (n[t.rawRules[r].substr(1)] = o[1])
                }
                return n
            }, e.prototype.reset = function () {
                this.listeners = []
            }, e
        }();
        t.StateContainer = i
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            var n = e.slice();
            return n.push(t), n
        }

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = new Array(e.length), n = 0; n < t.length; n++) t[n] = "" + n;
                return t
            }
            if (Object.keys) return Object.keys(e);
            var r = [];
            for (var i in e) e.hasOwnProperty(i) && r.push(i);
            return r
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.compare = function (e, t) {
            var n = [];
            return function e(t, n, o, s) {
                for (var a = i(n), c = i(t), u = !1, f = c.length - 1; f >= 0; f--) {
                    var h = c[f], l = t[h];
                    if (!n.hasOwnProperty(h) || void 0 === n[h] && void 0 !== l && !1 === Array.isArray(n)) o.push({
                        operation: "remove",
                        path: r(s, h)
                    }), u = !0; else {
                        var p = n[h];
                        "object" == typeof l && null != l && "object" == typeof p && null != p ? e(l, p, o, r(s, h)) : l !== p && o.push({
                            operation: "replace",
                            path: r(s, h),
                            value: p,
                            previousValue: l
                        })
                    }
                }
                if (!u && a.length == c.length) return;
                for (f = a.length - 1; f >= 0; f--) {
                    h = a[f];
                    if (!t.hasOwnProperty(h) && void 0 !== n[h]) {
                        p = n[h];
                        var d = r(s, h);
                        "object" == typeof p && null != p && e({}, p, o, d), o.push({
                            operation: "add",
                            path: d,
                            value: p
                        })
                    }
                }
            }(e, t, n, []), n
        }
    }, function (e, t, n) {
        var r, i;
        r = this, i = function () {
            "use strict";
            var e = {};

            function t() {
                this.a = 0, this.b = 0, this.i = 0, this.z = new Array(16)
            }

            t.prototype.init = function (e, t) {
                var n, r, i = 0, o = 0;
                for (n = 0; n < 16; n++) i = i + (r = e[t + n]) & 65535, o = o + (16 - n) * r & 65535, this.z[n] = r;
                this.a = 65535 & i, this.b = 65535 & o, this.i = 0
            }, t.prototype.next = function (e) {
                var t = this.z[this.i];
                this.z[this.i] = e, this.i = this.i + 1 & 15, this.a = this.a - t + e & 65535, this.b = this.b - 16 * t + this.a & 65535
            }, t.prototype.value = function () {
                return (65535 & this.a | (65535 & this.b) << 16) >>> 0
            };
            var n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".split("").map((function (e) {
                    return e.charCodeAt(0)
                })),
                r = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, 36, -1, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, -1, -1, -1, 63, -1];

            function i(e) {
                this.a = e, this.pos = 0
            }

            function o() {
                this.a = []
            }

            function s(e) {
                var t, n;
                for (t = 1, n = 64; e >= n; t++, n <<= 6) ;
                return t
            }

            function a(e) {
                for (var t = 0, n = 0, r = 0, i = 0, o = 0, s = e.length; s >= 16;) t = t + e[o + 0] | 0, n = n + e[o + 1] | 0, r = r + e[o + 2] | 0, i = i + e[o + 3] | 0, t = t + e[o + 4] | 0, n = n + e[o + 5] | 0, r = r + e[o + 6] | 0, i = i + e[o + 7] | 0, t = t + e[o + 8] | 0, n = n + e[o + 9] | 0, r = r + e[o + 10] | 0, i = i + e[o + 11] | 0, t = t + e[o + 12] | 0, n = n + e[o + 13] | 0, r = r + e[o + 14] | 0, i = i + e[o + 15] | 0, o += 16, s -= 16;
                for (; s >= 4;) t = t + e[o + 0] | 0, n = n + e[o + 1] | 0, r = r + e[o + 2] | 0, i = i + e[o + 3] | 0, o += 4, s -= 4;
                switch (i = ((i + (r << 8) | 0) + (n << 16) | 0) + (t << 24) | 0, s) {
                    case 3:
                        i = i + (e[o + 2] << 8) | 0;
                    case 2:
                        i = i + (e[o + 1] << 16) | 0;
                    case 1:
                        i = i + (e[o + 0] << 24) | 0
                }
                return i >>> 0
            }

            return i.prototype.haveBytes = function () {
                return this.pos < this.a.length
            }, i.prototype.getByte = function () {
                var e = this.a[this.pos];
                if (this.pos++, this.pos > this.a.length) throw new RangeError("out of bounds");
                return e
            }, i.prototype.getChar = function () {
                return String.fromCharCode(this.getByte())
            }, i.prototype.getInt = function () {
                for (var e, t = 0; this.haveBytes() && (e = r[127 & this.getByte()]) >= 0;) t = (t << 6) + e;
                return this.pos--, t >>> 0
            }, o.prototype.toArray = function () {
                return this.a
            }, o.prototype.putByte = function (e) {
                this.a.push(255 & e)
            }, o.prototype.putChar = function (e) {
                this.putByte(e.charCodeAt(0))
            }, o.prototype.putInt = function (e) {
                var t, r, i = [];
                if (0 !== e) {
                    for (t = 0; e > 0; t++, e >>>= 6) i.push(n[63 & e]);
                    for (r = t - 1; r >= 0; r--) this.putByte(i[r])
                } else this.putChar("0")
            }, o.prototype.putArray = function (e, t, n) {
                for (var r = t; r < n; r++) this.a.push(e[r])
            }, e.create = function (e, n) {
                var r, i = new o, c = n.length, u = e.length, f = -1;
                if (i.putInt(c), i.putChar("\n"), u <= 16) return i.putInt(c), i.putChar(":"), i.putArray(n, 0, c), i.putInt(a(n)), i.putChar(";"), i.toArray();
                var h = Math.ceil(u / 16), l = new Array(h), p = new Array(h);
                for (r = 0; r < l.length; r++) l[r] = -1;
                for (r = 0; r < p.length; r++) p[r] = -1;
                var d, v = new t;
                for (r = 0; r < u - 16; r += 16) v.init(e, r), d = v.value() % h, l[r / 16] = p[d], p[d] = r / 16;
                for (var y, g, _, b, m, w = 0; w + 16 < c;) for (b = 0, m = 0, v.init(n, w), r = 0, _ = 0; ;) {
                    var O = 250;
                    for (g = p[d = v.value() % h]; g >= 0 && O-- > 0;) {
                        var A, C, S, E, P, I, M;
                        for (E = 0, I = y = 16 * g, M = w + r; I < u && M < c && e[I] === n[M]; E++, I++, M++) ;
                        for (E--, P = 1; P < y && P <= r && e[y - P] === n[w + r - P]; P++) ;
                        C = y - --P, S = r - P, (A = E + P + 1) >= s(r - P) + s(A) + s(C) + 3 && A > _ && (_ = A, b = y - P, m = S), g = l[g]
                    }
                    if (_ > 0) {
                        m > 0 && (i.putInt(m), i.putChar(":"), i.putArray(n, w, w + m), w += m), w += _, i.putInt(_), i.putChar("@"), i.putInt(b), i.putChar(","), b + _ - 1 > f && (f = b + _ - 1), _ = 0;
                        break
                    }
                    if (w + r + 16 >= c) {
                        i.putInt(c - w), i.putChar(":"), i.putArray(n, w, w + c - w), w = c;
                        break
                    }
                    v.next(n[w + r + 16]), r++
                }
                return w < c && (i.putInt(c - w), i.putChar(":"), i.putArray(n, w, w + c - w)), i.putInt(a(n)), i.putChar(";"), i.toArray()
            }, e.outputSize = function (e) {
                var t = new i(e), n = t.getInt();
                if ("\n" !== t.getChar()) throw new Error("size integer not terminated by '\\n'");
                return n
            }, e.apply = function (e, t, n) {
                var r, s = 0, c = new i(t), u = e.length, f = t.length;
                if (r = c.getInt(), "\n" !== c.getChar()) throw new Error("size integer not terminated by '\\n'");
                for (var h = new o; c.haveBytes();) {
                    var l, p;
                    switch (l = c.getInt(), c.getChar()) {
                        case"@":
                            if (p = c.getInt(), c.haveBytes() && "," !== c.getChar()) throw new Error("copy command not terminated by ','");
                            if ((s += l) > r) throw new Error("copy exceeds output file size");
                            if (p + l > u) throw new Error("copy extends past end of input");
                            h.putArray(e, p, p + l);
                            break;
                        case":":
                            if ((s += l) > r) throw new Error("insert command gives an output larger than predicted");
                            if (l > f) throw new Error("insert count exceeds size of delta");
                            h.putArray(c.a, c.pos, c.pos + l), c.pos += l;
                            break;
                        case";":
                            var d = h.toArray();
                            if ((!n || !1 !== n.verifyChecksum) && l !== a(d)) throw new Error("bad checksum");
                            if (s !== r) throw new Error("generated size does not match predicted size");
                            return d;
                        default:
                            throw new Error("unknown delta operator")
                    }
                }
                throw new Error("unterminated delta")
            }, e
        }, e.exports ? e.exports = i() : r.fossilDelta = i()
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.SchemaSerializer = void 0;
        var r = n(12), i = function () {
            function e() {
            }

            return e.prototype.setState = function (e) {
                this.state.decode(e)
            }, e.prototype.getState = function () {
                return this.state
            }, e.prototype.patch = function (e) {
                this.state.decode(e)
            }, e.prototype.teardown = function () {
            }, e.prototype.handshake = function (e, t) {
                this.state ? (new r.Reflection).decode(e, t) : this.state = r.Reflection.decode(e)
            }, e
        }();
        t.SchemaSerializer = i
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.EventEmitter = void 0;
        var r = function () {
            function e() {
                this.handlers = []
            }

            return e.prototype.register = function (e, t) {
                return void 0 === t && (t = !1), this.handlers.push(e), this
            }, e.prototype.invoke = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this.handlers.forEach((function (t) {
                    return t.apply(void 0, e)
                }))
            }, e.prototype.invokeAsync = function () {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                return Promise.all(this.handlers.map((function (t) {
                    return t.apply(void 0, e)
                })))
            }, e.prototype.remove = function (e) {
                var t = this.handlers.indexOf(e);
                this.handlers[t] = this.handlers[this.handlers.length - 1], this.handlers.pop()
            }, e.prototype.clear = function () {
                this.handlers = []
            }, e
        }();
        t.EventEmitter = r
    }, function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {value: !0}), t.dumpChanges = void 0;
        var r = n(12), i = n(1), o = n(0);
        t.dumpChanges = function e(t) {
            for (var n = {}, s = t.$changes, a = t._fieldsByIndex || {}, c = 0, u = Array.from(s.changes); c < u.length; c++) {
                var f = u[c], h = a[f] || f;
                t[h] instanceof i.MapSchema || t[h] instanceof o.ArraySchema || t[h] instanceof r.Schema ? n[h] = e(t[h]) : n[h] = t[h]
            }
            return n
        }
    }, function (e, t, n) {
        "use strict";
        var r, i = this && this.__extends || (r = function (e, t) {
            return (r = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                e.__proto__ = t
            } || function (e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
        }, function (e, t) {
            function n() {
                this.constructor = e
            }

            r(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
        }), o = this && this.__decorate || function (e, t, n, r) {
            var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r); else for (var a = e.length - 1; a >= 0; a--) (i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s);
            return o > 3 && s && Object.defineProperty(t, n, s), s
        };
        Object.defineProperty(t, "__esModule", {value: !0}), t.Reflection = t.ReflectionType = t.ReflectionField = void 0;
        var s = n(14), a = n(2), c = n(0), u = n(1), f = new s.Context, h = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return i(t, e), o([s.type("string", f)], t.prototype, "name", void 0), o([s.type("string", f)], t.prototype, "type", void 0), o([s.type("uint8", f)], t.prototype, "referencedType", void 0), t
        }(a.Schema);
        t.ReflectionField = h;
        var l = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.fields = new c.ArraySchema, t
            }

            return i(t, e), o([s.type("uint8", f)], t.prototype, "id", void 0), o([s.type([h], f)], t.prototype, "fields", void 0), t
        }(a.Schema);
        t.ReflectionType = l;
        var p = function (e) {
            function t() {
                var t = null !== e && e.apply(this, arguments) || this;
                return t.types = new c.ArraySchema, t
            }

            return i(t, e), t.encode = function (e) {
                var n = e.constructor, r = new t;
                r.rootType = n._typeid;
                var i = function (e, t) {
                    for (var n in t) {
                        var i = new h;
                        i.name = n;
                        var o = void 0;
                        if ("string" == typeof t[n]) o = t[n]; else {
                            var s = "function" == typeof t[n], a = Array.isArray(t[n]), c = !a && t[n].map, u = void 0;
                            s ? (o = "ref", u = t[n]) : a ? (o = "array", "string" == typeof t[n][0] ? o += ":" + t[n][0] : u = t[n][0]) : c && (o = "map", "string" == typeof t[n].map ? o += ":" + t[n].map : u = t[n].map), i.referencedType = u ? u._typeid : 255
                        }
                        i.type = o, e.fields.push(i)
                    }
                    r.types.push(e)
                }, o = n._context.types;
                for (var s in o) {
                    var a = new l;
                    a.id = Number(s), i(a, o[s]._schema)
                }
                return r.encodeAll()
            }, t.decode = function (e) {
                var n = new s.Context, r = new t;
                r.decode(e);
                var o = r.types.reduce((function (e, t) {
                    return e[t.id] = function (e) {
                        function t() {
                            return null !== e && e.apply(this, arguments) || this
                        }

                        return i(t, e), t
                    }(a.Schema), e
                }), {});
                r.types.forEach((function (e, t) {
                    e.fields.forEach((function (t) {
                        var r = o[e.id];
                        if (void 0 !== t.referencedType) {
                            var i = o[t.referencedType];
                            i || (i = t.type.split(":")[1]), 0 === t.type.indexOf("array") ? s.type([i], n)(r.prototype, t.name) : 0 === t.type.indexOf("map") ? s.type({map: i}, n)(r.prototype, t.name) : "ref" === t.type && s.type(i, n)(r.prototype, t.name)
                        } else s.type(t.type, n)(r.prototype, t.name)
                    }))
                }));
                var f = o[r.rootType], h = new f;
                for (var l in f._schema) {
                    var p = f._schema[l];
                    if ("string" != typeof p) {
                        var d = "function" == typeof p, v = Array.isArray(p), y = !v && p.map;
                        h[l] = v ? new c.ArraySchema : y ? new u.MapSchema : d ? new p : void 0
                    }
                }
                return h
            }, o([s.type([l], f)], t.prototype, "types", void 0), o([s.type("uint8", f)], t.prototype, "rootType", void 0), t
        }(a.Schema);
        t.Reflection = p
    }])
}));
