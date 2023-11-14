! function o(i, r, s) {
    function h(t, e) {
        if (!r[t]) {
            if (!i[t]) {
                var n = "function" == typeof require && require;
                if (!e && n) return n(t, !0);
                if (u) return u(t, !0);
                throw (n = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", n
            }
            n = r[t] = {
                exports: {}
            }, i[t][0].call(n.exports, function(e) {
                return h(i[t][1][e] || e)
            }, n, n.exports, o, i, r, s)
        }
        return r[t].exports
    }
    for (var u = "function" == typeof require && require, e = 0; e < s.length; e++) h(s[e]);
    return h
}({
    1: [function(e, t, n) {
        "use strict";
        var i = e("@mapbox/mapbox-gl-sync-move"),
            r = e("events").EventEmitter;

        function o(e, t, n, o) {
            if (this.options = o || {}, this._mapA = e, this._mapB = t, this._horizontal = "horizontal" === this.options.orientation, this._onDown = this._onDown.bind(this), this._onMove = this._onMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this._ev = new r, this._swiper = document.createElement("div"), this._swiper.className = this._horizontal ? "compare-swiper-horizontal" : "compare-swiper-vertical", this._controlContainer = document.createElement("div"), this._controlContainer.className = this._horizontal ? "maplibregl-compare maplibregl-compare-horizontal" : "maplibregl-compare", this._controlContainer.className = this._controlContainer.className, this._controlContainer.appendChild(this._swiper), "string" == typeof n && document.body.querySelectorAll) {
                o = document.body.querySelectorAll(n)[0];
                if (!o) throw new Error("Cannot find element with specified container selector.");
                o.appendChild(this._controlContainer)
            } else {
                if (!(n instanceof Element && n.appendChild)) throw new Error("Invalid container specified. Must be CSS selector or HTML element.");
                n.appendChild(this._controlContainer)
            }
            this._bounds = t.getContainer().getBoundingClientRect();
            n = (this._horizontal ? this._bounds.height : this._bounds.width) / 2;
            this._setPosition(n), this._clearSync = i(e, t), this._onResize = function() {
                this._bounds = t.getContainer().getBoundingClientRect(), this.currentPosition && this._setPosition(this.currentPosition)
            }.bind(this), t.on("resize", this._onResize), this.options && this.options.mousemove && (e.getContainer().addEventListener("mousemove", this._onMove), t.getContainer().addEventListener("mousemove", this._onMove)), this._swiper.addEventListener("mousedown", this._onDown), this._swiper.addEventListener("touchstart", this._onDown)
        }
        o.prototype = {
            _setPointerEvents: function(e) {
                this._controlContainer.style.pointerEvents = e, this._swiper.style.pointerEvents = e
            },
            _onDown: function(e) {
                e.touches ? (document.addEventListener("touchmove", this._onMove), document.addEventListener("touchend", this._onTouchEnd)) : (document.addEventListener("mousemove", this._onMove), document.addEventListener("mouseup", this._onMouseUp))
            },
            _setPosition: function(e) {
                e = Math.min(e, this._horizontal ? this._bounds.height : this._bounds.width);
                var t = this._horizontal ? "translate(0, " + e + "px)" : "translate(" + e + "px, 0)";
                this._controlContainer.style.transform = t, this._controlContainer.style.WebkitTransform = t;
                var n = this._horizontal ? "rect(0, 999em, " + e + "px, 0)" : "rect(0, " + e + "px, " + this._bounds.height + "px, 0)",
                    t = this._horizontal ? "rect(" + e + "px, 999em, " + this._bounds.height + "px,0)" : "rect(0, 999em, " + this._bounds.height + "px," + e + "px)";
                this._mapA.getContainer().style.clip = n, this._mapB.getContainer().style.clip = t, this.currentPosition = e
            },
            _onMove: function(e) {
                this.options && this.options.mousemove && this._setPointerEvents(e.touches ? "auto" : "none"), this._horizontal ? this._setPosition(this._getY(e)) : this._setPosition(this._getX(e))
            },
            _onMouseUp: function() {
                document.removeEventListener("mousemove", this._onMove), document.removeEventListener("mouseup", this._onMouseUp), this.fire("slideend", {
                    currentPosition: this.currentPosition
                })
            },
            _onTouchEnd: function() {
                document.removeEventListener("touchmove", this._onMove), document.removeEventListener("touchend", this._onTouchEnd), this.fire("slideend", {
                    currentPosition: this.currentPosition
                })
            },
            _getX: function(e) {
                e = (e = e.touches ? e.touches[0] : e).clientX - this._bounds.left;
                return e = (e = e < 0 ? 0 : e) > this._bounds.width ? this._bounds.width : e
            },
            _getY: function(e) {
                e = (e = e.touches ? e.touches[0] : e).clientY - this._bounds.top;
                return e = (e = e < 0 ? 0 : e) > this._bounds.height ? this._bounds.height : e
            },
            setSlider: function(e) {
                this._setPosition(e)
            },
            on: function(e, t) {
                return this._ev.on(e, t), this
            },
            fire: function(e, t) {
                return this._ev.emit(e, t), this
            },
            off: function(e, t) {
                return this._ev.removeListener(e, t), this
            },
            remove: function() {
                this._clearSync(), this._mapB.off("resize", this._onResize);
                var e = this._mapA.getContainer();
                e && (e.style.clip = null, e.removeEventListener("mousemove", this._onMove));
                e = this._mapB.getContainer();
                e && (e.style.clip = null, e.removeEventListener("mousemove", this._onMove)), this._swiper.removeEventListener("mousedown", this._onDown), this._swiper.removeEventListener("touchstart", this._onDown), this._controlContainer.remove()
            }
        }, window.maplibregl ? maplibregl.Compare = o : void 0 !== t && (t.exports = o)
    }, {
        "@mapbox/mapbox-gl-sync-move": 2,
        events: 3
    }],
    2: [function(e, t, n) {
        t.exports = function() {
            var e = arguments.length;
            if (1 === e) t = arguments[0];
            else
                for (var t = [], n = 0; n < e; n++) t.push(arguments[n]);
            var o = [];

            function i() {
                t.forEach(function(e, t) {
                    e.on("move", o[t])
                })
            }

            function r() {
                t.forEach(function(e, t) {
                    e.off("move", o[t])
                })
            }
            return t.forEach(function(e, n) {
                    o[n] = function(e, t) {
                        r(),
                            function(e, t) {
                                var n = e.getCenter(),
                                    o = e.getZoom(),
                                    i = e.getBearing(),
                                    r = e.getPitch();
                                t.forEach(function(e) {
                                    e.jumpTo({
                                        center: n,
                                        zoom: o,
                                        bearing: i,
                                        pitch: r
                                    })
                                })
                            }(e, t), i()
                    }.bind(null, e, t.filter(function(e, t) {
                        return t !== n
                    }))
                }), i(),
                function() {
                    r(), o = []
                }
        }
    }, {}],
    3: [function(e, t, n) {
        "use strict";
        var o = "object" == typeof Reflect ? Reflect : null,
            u = o && "function" == typeof o.apply ? o.apply : function(e, t, n) {
                return Function.prototype.apply.call(e, t, n)
            };
        var i = o && "function" == typeof o.ownKeys ? o.ownKeys : Object.getOwnPropertySymbols ? function(e) {
                return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
            } : function(e) {
                return Object.getOwnPropertyNames(e)
            },
            r = Number.isNaN || function(e) {
                return e != e
            };

        function s() {
            s.init.call(this)
        }
        t.exports = s, t.exports.once = function(h, u) {
            return new Promise(function(e, t) {
                function n(e) {
                    h.removeListener(u, o), t(e)
                }

                function o() {
                    "function" == typeof h.removeListener && h.removeListener("error", n), e([].slice.call(arguments))
                }
                var i, r, s;
                d(h, u, o, {
                    once: !0
                }), "error" !== u && (r = n, s = {
                    once: !0
                }, "function" == typeof(i = h).on && d(i, "error", r, s))
            })
        }, (s.EventEmitter = s).prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
        var h = 10;

        function c(e) {
            if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }

        function a(e) {
            return void 0 === e._maxListeners ? s.defaultMaxListeners : e._maxListeners
        }

        function f(e, t, n, o) {
            var i, r;
            return c(n), void 0 === (i = e._events) ? (i = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== i.newListener && (e.emit("newListener", t, n.listener || n), i = e._events), r = i[t]), void 0 === r ? (r = i[t] = n, ++e._eventsCount) : ("function" == typeof r ? r = i[t] = o ? [n, r] : [r, n] : o ? r.unshift(n) : r.push(n), 0 < (n = a(e)) && r.length > n && !r.warned && (r.warned = !0, (n = new Error("Possible EventEmitter memory leak detected. " + r.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit")).name = "MaxListenersExceededWarning", n.emitter = e, n.type = t, n.count = r.length, n = n, console && console.warn && console.warn(n))), e
        }

        function l(e, t, n) {
            e = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            }, t = function() {
                if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }.bind(e);
            return t.listener = n, e.wrapFn = t
        }

        function p(e, t, n) {
            e = e._events;
            if (void 0 === e) return [];
            t = e[t];
            return void 0 === t ? [] : "function" == typeof t ? n ? [t.listener || t] : [t] : n ? function(e) {
                for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
                return t
            }(t) : m(t, t.length)
        }

        function v(e) {
            var t = this._events;
            if (void 0 !== t) {
                e = t[e];
                if ("function" == typeof e) return 1;
                if (void 0 !== e) return e.length
            }
            return 0
        }

        function m(e, t) {
            for (var n = new Array(t), o = 0; o < t; ++o) n[o] = e[o];
            return n
        }

        function d(n, o, i, r) {
            if ("function" == typeof n.on) r.once ? n.once(o, i) : n.on(o, i);
            else {
                if ("function" != typeof n.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof n);
                n.addEventListener(o, function e(t) {
                    r.once && n.removeEventListener(o, e), i(t)
                })
            }
        }
        Object.defineProperty(s, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return h
            },
            set: function(e) {
                if ("number" != typeof e || e < 0 || r(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                h = e
            }
        }), s.init = function() {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
        }, s.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || e < 0 || r(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
            return this._maxListeners = e, this
        }, s.prototype.getMaxListeners = function() {
            return a(this)
        }, s.prototype.emit = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
            var o, i = "error" === e,
                r = this._events;
            if (void 0 !== r) i = i && void 0 === r.error;
            else if (!i) return !1;
            if (i) {
                if ((o = 0 < t.length ? t[0] : o) instanceof Error) throw o;
                i = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
                throw i.context = o, i
            }
            e = r[e];
            if (void 0 === e) return !1;
            if ("function" == typeof e) u(e, this, t);
            else
                for (var s = e.length, h = m(e, s), n = 0; n < s; ++n) u(h[n], this, t);
            return !0
        }, s.prototype.addListener = function(e, t) {
            return f(this, e, t, !1)
        }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(e, t) {
            return f(this, e, t, !0)
        }, s.prototype.once = function(e, t) {
            return c(t), this.on(e, l(this, e, t)), this
        }, s.prototype.prependOnceListener = function(e, t) {
            return c(t), this.prependListener(e, l(this, e, t)), this
        }, s.prototype.removeListener = function(e, t) {
            var n, o, i, r, s;
            if (c(t), void 0 === (o = this._events)) return this;
            if (void 0 === (n = o[e])) return this;
            if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete o[e], o.removeListener && this.emit("removeListener", e, n.listener || t));
            else if ("function" != typeof n) {
                for (i = -1, r = n.length - 1; 0 <= r; r--)
                    if (n[r] === t || n[r].listener === t) {
                        s = n[r].listener, i = r;
                        break
                    } if (i < 0) return this;
                0 === i ? n.shift() : function(e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop()
                }(n, i), 1 === n.length && (o[e] = n[0]), void 0 !== o.removeListener && this.emit("removeListener", e, s || t)
            }
            return this
        }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(e) {
            var t, n = this._events;
            if (void 0 === n) return this;
            if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
            if (0 === arguments.length) {
                for (var o, i = Object.keys(n), r = 0; r < i.length; ++r) "removeListener" !== (o = i[r]) && this.removeAllListeners(o);
                return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
            }
            if ("function" == typeof(t = n[e])) this.removeListener(e, t);
            else if (void 0 !== t)
                for (r = t.length - 1; 0 <= r; r--) this.removeListener(e, t[r]);
            return this
        }, s.prototype.listeners = function(e) {
            return p(this, e, !0)
        }, s.prototype.rawListeners = function(e) {
            return p(this, e, !1)
        }, s.listenerCount = function(e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : v.call(e, t)
        }, s.prototype.listenerCount = v, s.prototype.eventNames = function() {
            return 0 < this._eventsCount ? i(this._events) : []
        }
    }, {}]
}, {}, [1]);
