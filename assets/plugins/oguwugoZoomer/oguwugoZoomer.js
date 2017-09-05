window.ogwugoZoom = (function() {
    var z, A;
    z = A = (function() {
        var V = {
            version: "v3.3-b5",
            UUID: 0,
            storage: {},
            $uuid: function(Z) {
                return (Z.$J_UUID || (Z.$J_UUID = ++P.UUID))
            },
            getStorage: function(Z) {
                return (P.storage[Z] || (P.storage[Z] = {}))
            },
            $F: function() {},
            $false: function() {
                return false
            },
            $true: function() {
                return true
            },
            stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
            defined: function(Z) {
                return (undefined != Z)
            },
            ifndef: function(aa, Z) {
                return (undefined != aa) ? aa : Z
            },
            exists: function(Z) {
                return !!(Z)
            },
            jTypeOf: function(Z) {
                if (!P.defined(Z)) {
                    return false
                }
                if (Z.$J_TYPE) {
                    return Z.$J_TYPE
                }
                if (!!Z.nodeType) {
                    if (1 == Z.nodeType) {
                        return "element"
                    }
                    if (3 == Z.nodeType) {
                        return "textnode"
                    }
                }
                if (Z.length && Z.item) {
                    return "collection"
                }
                if (Z.length && Z.callee) {
                    return "arguments"
                }
                if ((Z instanceof window.Object || Z instanceof window.Function) && Z.constructor === P.Class) {
                    return "class"
                }
                if (Z instanceof window.Array) {
                    return "array"
                }
                if (Z instanceof window.Function) {
                    return "function"
                }
                if (Z instanceof window.String) {
                    return "string"
                }
                if (P.browser.trident) {
                    if (P.defined(Z.cancelBubble)) {
                        return "event"
                    }
                } else {
                    if (Z === window.event || Z.constructor == window.Event || Z.constructor == window.MouseEvent || Z.constructor == window.UIEvent || Z.constructor == window.KeyboardEvent || Z.constructor == window.KeyEvent) {
                        return "event"
                    }
                }
                if (Z instanceof window.Date) {
                    return "date"
                }
                if (Z instanceof window.RegExp) {
                    return "regexp"
                }
                if (Z === window) {
                    return "window"
                }
                if (Z === document) {
                    return "document"
                }
                return typeof(Z)
            },
            extend: function(ae, ad) {
                if (!(ae instanceof window.Array)) {
                    ae = [ae]
                }
                if (!ad) {
                    return ae[0]
                }
                for (var ac = 0, aa = ae.length; ac < aa; ac++) {
                    if (!P.defined(ae)) {
                        continue
                    }
                    for (var ab in ad) {
                        if (!Object.prototype.hasOwnProperty.call(ad, ab)) {
                            continue
                        }
                        try {
                            ae[ac][ab] = ad[ab]
                        } catch (Z) {}
                    }
                }
                return ae[0]
            },
            implement: function(ad, ac) {
                if (!(ad instanceof window.Array)) {
                    ad = [ad]
                }
                for (var ab = 0, Z = ad.length; ab < Z; ab++) {
                    if (!P.defined(ad[ab])) {
                        continue
                    }
                    if (!ad[ab].prototype) {
                        continue
                    }
                    for (var aa in (ac || {})) {
                        if (!ad[ab].prototype[aa]) {
                            ad[ab].prototype[aa] = ac[aa]
                        }
                    }
                }
                return ad[0]
            },
            nativize: function(ab, aa) {
                if (!P.defined(ab)) {
                    return ab
                }
                for (var Z in (aa || {})) {
                    if (!ab[Z]) {
                        ab[Z] = aa[Z]
                    }
                }
                return ab
            },
            $try: function() {
                for (var aa = 0, Z = arguments.length; aa < Z; aa++) {
                    try {
                        return arguments[aa]()
                    } catch (ab) {}
                }
                return null
            },
            $A: function(ab) {
                if (!P.defined(ab)) {
                    return P.$([])
                }
                if (ab.toArray) {
                    return P.$(ab.toArray())
                }
                if (ab.item) {
                    var aa = ab.length || 0,
                        Z = new Array(aa);
                    while (aa--) {
                        Z[aa] = ab[aa]
                    }
                    return P.$(Z)
                }
                return P.$(Array.prototype.slice.call(ab))
            },
            now: function() {
                return new Date().getTime()
            },
            detach: function(ad) {
                var ab;
                switch (P.jTypeOf(ad)) {
                    case "object":
                        ab = {};
                        for (var ac in ad) {
                            ab[ac] = P.detach(ad[ac])
                        }
                        break;
                    case "array":
                        ab = [];
                        for (var aa = 0, Z = ad.length; aa < Z; aa++) {
                            ab[aa] = P.detach(ad[aa])
                        }
                        break;
                    default:
                        return ad
                }
                return P.$(ab)
            },
            $: function(ab) {
                var Z = true;
                if (!P.defined(ab)) {
                    return null
                }
                if (ab.$J_EXT) {
                    return ab
                }
                switch (P.jTypeOf(ab)) {
                    case "array":
                        ab = P.nativize(ab, P.extend(P.Array, {
                            $J_EXT: P.$F
                        }));
                        ab.jEach = ab.forEach;
                        return ab;
                        break;
                    case "string":
                        var aa = document.getElementById(ab);
                        if (P.defined(aa)) {
                            return P.$(aa)
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        P.$uuid(ab);
                        ab = P.extend(ab, P.Doc);
                        break;
                    case "element":
                        P.$uuid(ab);
                        ab = P.extend(ab, P.Element);
                        break;
                    case "event":
                        ab = P.extend(ab, P.Event);
                        break;
                    case "textnode":
                    case "function":
                    case "array":
                    case "date":
                    default:
                        Z = false;
                        break
                }
                if (Z) {
                    return P.extend(ab, {
                        $J_EXT: P.$F
                    })
                } else {
                    return ab
                }
            },
            $new: function(Z, ab, aa) {
                return P.$(P.doc.createElement(Z)).setProps(ab || {}).jSetCss(aa || {})
            },
            addCSS: function(aa, ac, ag) {
                var ad, ab, ae, af = [],
                    Z = -1;
                ag || (ag = P.stylesId);
                ad = P.$(ag) || P.$new("style", {
                    id: ag,
                    type: "text/css"
                }).jAppendTo((document.head || document.body), "top");
                ab = ad.sheet || ad.styleSheet;
                if ("string" != P.jTypeOf(ac)) {
                    for (var ae in ac) {
                        af.push(ae + ":" + ac[ae])
                    }
                    ac = af.join(";")
                }
                if (ab.insertRule) {
                    Z = ab.insertRule(aa + " {" + ac + "}", ab.cssRules.length)
                } else {
                    Z = ab.addRule(aa, ac)
                }
                return Z
            },
            removeCSS: function(ac, Z) {
                var ab, aa;
                ab = P.$(ac);
                if ("element" !== P.jTypeOf(ab)) {
                    return
                }
                aa = ab.sheet || ab.styleSheet;
                if (aa.deleteRule) {
                    aa.deleteRule(Z)
                } else {
                    if (aa.removeRule) {
                        aa.removeRule(Z)
                    }
                }
            },
            generateUUID: function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(ab) {
                    var aa = Math.random() * 16 | 0,
                        Z = ab == "x" ? aa : (aa & 3 | 8);
                    return Z.toString(16)
                }).toUpperCase()
            },
            getAbsoluteURL: (function() {
                var Z;
                return function(aa) {
                    if (!Z) {
                        Z = document.createElement("a")
                    }
                    Z.setAttribute("href", aa);
                    return ("!!" + Z.href).replace("!!", "")
                }
            })(),
            getHashCode: function(ab) {
                var ac = 0,
                    Z = ab.length;
                for (var aa = 0; aa < Z; ++aa) {
                    ac = 31 * ac + ab.charCodeAt(aa);
                    ac %= 4294967296
                }
                return ac
            }
        };
        var P = V;
        var Q = V.$;
        if (!window.ogJS) {
            window.ogJS = V;
            window.$mjs = V.$
        }
        P.Array = {
            $J_TYPE: "array",
            indexOf: function(ac, ad) {
                var Z = this.length;
                for (var aa = this.length, ab = (ad < 0) ? Math.max(0, aa + ad) : ad || 0; ab < aa; ab++) {
                    if (this[ab] === ac) {
                        return ab
                    }
                }
                return -1
            },
            contains: function(Z, aa) {
                return this.indexOf(Z, aa) != -1
            },
            forEach: function(Z, ac) {
                for (var ab = 0, aa = this.length; ab < aa; ab++) {
                    if (ab in this) {
                        Z.call(ac, this[ab], ab, this)
                    }
                }
            },
            filter: function(Z, ae) {
                var ad = [];
                for (var ac = 0, aa = this.length; ac < aa; ac++) {
                    if (ac in this) {
                        var ab = this[ac];
                        if (Z.call(ae, this[ac], ac, this)) {
                            ad.push(ab)
                        }
                    }
                }
                return ad
            },
            map: function(Z, ad) {
                var ac = [];
                for (var ab = 0, aa = this.length; ab < aa; ab++) {
                    if (ab in this) {
                        ac[ab] = Z.call(ad, this[ab], ab, this)
                    }
                }
                return ac
            }
        };
        P.implement(String, {
            $J_TYPE: "string",
            jTrim: function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function(Z, aa) {
                return (aa || false) ? (this.toString() === Z.toString()) : (this.toLowerCase().toString() === Z.toLowerCase().toString())
            },
            jCamelize: function() {
                return this.replace(/-\D/g, function(Z) {
                    return Z.charAt(1).toUpperCase()
                })
            },
            dashize: function() {
                return this.replace(/[A-Z]/g, function(Z) {
                    return ("-" + Z.charAt(0).toLowerCase())
                })
            },
            jToInt: function(Z) {
                return parseInt(this, Z || 10)
            },
            toFloat: function() {
                return parseFloat(this)
            },
            jToBool: function() {
                return !this.replace(/true/i, "").jTrim()
            },
            has: function(aa, Z) {
                Z = Z || "";
                return (Z + this + Z).indexOf(Z + aa + Z) > -1
            }
        });
        V.implement(Function, {
            $J_TYPE: "function",
            jBind: function() {
                var aa = P.$A(arguments),
                    Z = this,
                    ab = aa.shift();
                return function() {
                    return Z.apply(ab || null, aa.concat(P.$A(arguments)))
                }
            },
            jBindAsEvent: function() {
                var aa = P.$A(arguments),
                    Z = this,
                    ab = aa.shift();
                return function(ac) {
                    return Z.apply(ab || null, P.$([ac || (P.browser.ieMode ? window.event : null)]).concat(aa))
                }
            },
            jDelay: function() {
                var aa = P.$A(arguments),
                    Z = this,
                    ab = aa.shift();
                return window.setTimeout(function() {
                    return Z.apply(Z, aa)
                }, ab || 0)
            },
            jDefer: function() {
                var aa = P.$A(arguments),
                    Z = this;
                return function() {
                    return Z.jDelay.apply(Z, aa)
                }
            },
            interval: function() {
                var aa = P.$A(arguments),
                    Z = this,
                    ab = aa.shift();
                return window.setInterval(function() {
                    return Z.apply(Z, aa)
                }, ab || 0)
            }
        });
        var W = {},
            O = navigator.userAgent.toLowerCase(),
            N = O.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i),
            S = O.match(/(edge|opr)\/(\d+\.?\d*)/i) || O.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i),
            U = O.match(/version\/(\d+\.?\d*)/i),
            J = document.documentElement.style;

        function K(aa) {
            var Z = aa.charAt(0).toUpperCase() + aa.slice(1);
            return aa in J || ("Webkit" + Z) in J || ("Moz" + Z) in J || ("ms" + Z) in J || ("O" + Z) in J
        }
        P.browser = {
            features: {
                xpath: !!(document.evaluate),
                air: !!(window.runtime),
                query: !!(document.querySelector),
                fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                transition: K("transition"),
                transform: K("transform"),
                perspective: K("perspective"),
                animation: K("animation"),
                requestAnimationFrame: false,
                multibackground: false,
                cssFilters: false,
                canvas: false,
                svg: (function() {
                    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
                })()
            },
            touchScreen: function() {
                return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
            }(),
            mobile: O.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/) ? true : false,
            engine: (N && N[1]) ? N[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (undefined !== document.getBoxObjectFor || null != window.mozInnerScreenY) ? "gecko" : (null !== window.WebKitPoint || !navigator.taintEnabled) ? "webkit" : "unknown",
            version: (N && N[2]) ? parseFloat(N[2]) : 0,
            uaName: (S && S[1]) ? S[1].toLowerCase() : "",
            uaVersion: (S && S[2]) ? parseFloat(S[2]) : 0,
            cssPrefix: "",
            cssDomPrefix: "",
            domPrefix: "",
            ieMode: 0,
            platform: O.match(/ip(?:ad|od|hone)/) ? "ios" : (O.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat: document.compatMode && "backcompat" == document.compatMode.toLowerCase(),
            scrollbarsWidth: 0,
            getDoc: function() {
                return (document.compatMode && "backcompat" == document.compatMode.toLowerCase()) ? document.body : document.documentElement
            },
            requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
            cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
            ready: false,
            onready: function() {
                if (P.browser.ready) {
                    return
                }
                var ac, ab;
                P.browser.ready = true;
                P.body = P.$(document.body);
                P.win = P.$(window);
                try {
                    var aa = P.$new("div").jSetCss({
                        width: 100,
                        height: 100,
                        overflow: "scroll",
                        position: "absolute",
                        top: -9999
                    }).jAppendTo(document.body);
                    P.browser.scrollbarsWidth = aa.offsetWidth - aa.clientWidth;
                    aa.jRemove()
                } catch (Z) {}
                try {
                    ac = P.$new("div");
                    ab = ac.style;
                    ab.cssText = "background:url(https://),url(https://),red url(https://)";
                    P.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(ab.background);
                    ab = null;
                    ac = null
                } catch (Z) {}
                if (!P.browser.cssTransformProp) {
                    P.browser.cssTransformProp = P.normalizeCSS("transform").dashize()
                }
                try {
                    ac = P.$new("div");
                    ac.style.cssText = P.normalizeCSS("filter").dashize() + ":blur(2px);";
                    P.browser.features.cssFilters = !!ac.style.length && (!P.browser.ieMode || P.browser.ieMode > 9);
                    ac = null
                } catch (Z) {}
                if (!P.browser.features.cssFilters) {
                    P.$(document.documentElement).jAddClass("no-cssfilters-ogwugoB")
                }
                try {
                    P.browser.features.canvas = (function() {
                        var ad = P.$new("canvas");
                        return !!(ad.getContext && ad.getContext("2d"))
                    })()
                } catch (Z) {}
                if (undefined === window.TransitionEvent && undefined !== window.WebKitTransitionEvent) {
                    W.transitionend = "webkitTransitionEnd"
                }
                P.Doc.jCallEvent.call(P.$(document), "domready")
            }
        };
        (function() {
            var ae = [],
                ad, ac, aa;

            function Z() {
                return !!(arguments.callee.caller)
            }
            switch (P.browser.engine) {
                case "trident":
                    if (!P.browser.version) {
                        P.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
                    }
                    break;
                case "gecko":
                    P.browser.version = (S && S[2]) ? parseFloat(S[2]) : 0;
                    break
            }
            P.browser[P.browser.engine] = true;
            if (S && "crios" === S[1]) {
                P.browser.uaName = "chrome"
            }
            if (!!window.chrome) {
                P.browser.chrome = true
            }
            if (S && "opr" === S[1]) {
                P.browser.uaName = "opera";
                P.browser.opera = true
            }
            if ("safari" === P.browser.uaName && (U && U[1])) {
                P.browser.uaVersion = parseFloat(U[1])
            }
            if ("android" == P.browser.platform && P.browser.webkit && (U && U[1])) {
                P.browser.androidBrowser = true
            }
            ad = ({
                gecko: ["-moz-", "Moz", "moz"],
                webkit: ["-webkit-", "Webkit", "webkit"],
                trident: ["-ms-", "ms", "ms"],
                presto: ["-o-", "O", "o"]
            })[P.browser.engine] || ["", "", ""];
            P.browser.cssPrefix = ad[0];
            P.browser.cssDomPrefix = ad[1];
            P.browser.domPrefix = ad[2];
            P.browser.ieMode = (!P.browser.trident) ? undefined : (document.documentMode) ? document.documentMode : function() {
                var af = 0;
                if (P.browser.backCompat) {
                    return 5
                }
                switch (P.browser.version) {
                    case 2:
                        af = 6;
                        break;
                    case 3:
                        af = 7;
                        break
                }
                return af
            }();
            ae.push(P.browser.platform + "-ogwugoB");
            if (P.browser.mobile) {
                ae.push("mobile-ogwugoB")
            }
            if (P.browser.androidBrowser) {
                ae.push("android-browser-ogwugoB")
            }
            if (P.browser.ieMode) {
                P.browser.uaName = "ie";
                P.browser.uaVersion = P.browser.ieMode;
                ae.push("ie" + P.browser.ieMode + "-ogwugoB");
                for (ac = 11; ac > P.browser.ieMode; ac--) {
                    ae.push("lt-ie" + ac + "-ogwugoB")
                }
            }
            if (P.browser.webkit && P.browser.version < 536) {
                P.browser.features.fullScreen = false
            }
            if (P.browser.requestAnimationFrame) {
                P.browser.requestAnimationFrame.call(window, function() {
                    P.browser.features.requestAnimationFrame = true
                })
            }
            if (P.browser.features.svg) {
                ae.push("svg-ogwugoB")
            } else {
                ae.push("no-svg-ogwugoB")
            }
            aa = (document.documentElement.className || "").match(/\S+/g) || [];
            document.documentElement.className = P.$(aa).concat(ae).join(" ");
            try {
                document.documentElement.setAttribute("data-ogwugoB-ua", P.browser.uaName);
                document.documentElement.setAttribute("data-ogwugoB-ua-ver", P.browser.uaVersion)
            } catch (ab) {}
            if (P.browser.ieMode && P.browser.ieMode < 9) {
                document.createElement("figure");
                document.createElement("figcaption")
            }
        })();
        (function() {
            P.browser.fullScreen = {
                capable: P.browser.features.fullScreen,
                enabled: function() {
                    return !!(document.fullscreenElement || document[P.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[P.browser.domPrefix + "FullScreen"])
                },
                request: function(Z, aa) {
                    aa || (aa = {});
                    if (this.capable) {
                        P.$(document).jAddEvent(this.changeEventName, this.onchange = function(ab) {
                            if (this.enabled()) {
                                aa.onEnter && aa.onEnter()
                            } else {
                                P.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                                aa.onExit && aa.onExit()
                            }
                        }.jBindAsEvent(this));
                        P.$(document).jAddEvent(this.errorEventName, this.onerror = function(ab) {
                            aa.fallback && aa.fallback();
                            P.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                        }.jBindAsEvent(this));
                        (Z[P.browser.domPrefix + "RequestFullscreen"] || Z[P.browser.domPrefix + "RequestFullScreen"] || Z.requestFullscreen || function() {}).call(Z)
                    } else {
                        if (aa.fallback) {
                            aa.fallback()
                        }
                    }
                },
                cancel: (document.exitFullscreen || document.cancelFullScreen || document[P.browser.domPrefix + "ExitFullscreen"] || document[P.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
                changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : P.browser.domPrefix) + "fullscreenchange",
                errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : P.browser.domPrefix) + "fullscreenerror",
                prefix: P.browser.domPrefix,
                activeElement: null
            }
        })();
        var Y = /\S+/g,
            M = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
            R = {
                "float": ("undefined" === typeof(J.styleFloat)) ? "cssFloat" : "styleFloat"
            },
            T = {
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                zIndex: true,
                zoom: true
            },
            L = (window.getComputedStyle) ? function(ab, Z) {
                var aa = window.getComputedStyle(ab, null);
                return aa ? aa.getPropertyValue(Z) || aa[Z] : null
            } : function(ac, aa) {
                var ab = ac.currentStyle,
                    Z = null;
                Z = ab ? ab[aa] : null;
                if (null == Z && ac.style && ac.style[aa]) {
                    Z = ac.style[aa]
                }
                return Z
            };

        function X(ab) {
            var Z, aa;
            aa = (P.browser.webkit && "filter" == ab) ? false : (ab in J);
            if (!aa) {
                Z = P.browser.cssDomPrefix + ab.charAt(0).toUpperCase() + ab.slice(1);
                if (Z in J) {
                    return Z
                }
            }
            return ab
        }
        P.normalizeCSS = X;
        P.Element = {
            jHasClass: function(Z) {
                return !(Z || "").has(" ") && (this.className || "").has(Z, " ")
            },
            jAddClass: function(ad) {
                var aa = (this.className || "").match(Y) || [],
                    ac = (ad || "").match(Y) || [],
                    Z = ac.length,
                    ab = 0;
                for (; ab < Z; ab++) {
                    if (!P.$(aa).contains(ac[ab])) {
                        aa.push(ac[ab])
                    }
                }
                this.className = aa.join(" ");
                return this
            },
            jRemoveClass: function(ae) {
                var aa = (this.className || "").match(Y) || [],
                    ad = (ae || "").match(Y) || [],
                    Z = ad.length,
                    ac = 0,
                    ab;
                for (; ac < Z; ac++) {
                    if ((ab = P.$(aa).indexOf(ad[ac])) > -1) {
                        aa.splice(ab, 1)
                    }
                }
                this.className = ae ? aa.join(" ") : "";
                return this
            },
            jToggleClass: function(Z) {
                return this.jHasClass(Z) ? this.jRemoveClass(Z) : this.jAddClass(Z)
            },
            jGetCss: function(aa) {
                var ab = aa.jCamelize(),
                    Z = null;
                aa = R[ab] || (R[ab] = X(ab));
                Z = L(this, aa);
                if ("auto" === Z) {
                    Z = null
                }
                if (null !== Z) {
                    if ("opacity" == aa) {
                        return P.defined(Z) ? parseFloat(Z) : 1
                    }
                    if (M.test(aa)) {
                        Z = parseInt(Z, 10) ? Z : "0px"
                    }
                }
                return Z
            },
            jSetCssProp: function(aa, Z) {
                var ac = aa.jCamelize();
                try {
                    if ("opacity" == aa) {
                        this.jSetOpacity(Z);
                        return this
                    }
                    aa = R[ac] || (R[ac] = X(ac));
                    this.style[aa] = Z + (("number" == P.jTypeOf(Z) && !T[ac]) ? "px" : "")
                } catch (ab) {}
                return this
            },
            jSetCss: function(aa) {
                for (var Z in aa) {
                    this.jSetCssProp(Z, aa[Z])
                }
                return this
            },
            jGetStyles: function() {
                var Z = {};
                P.$A(arguments).jEach(function(aa) {
                    Z[aa] = this.jGetCss(aa)
                }, this);
                return Z
            },
            jSetOpacity: function(ab, Z) {
                var aa;
                Z = Z || false;
                this.style.opacity = ab;
                ab = parseInt(parseFloat(ab) * 100);
                if (Z) {
                    if (0 === ab) {
                        if ("hidden" != this.style.visibility) {
                            this.style.visibility = "hidden"
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            this.style.visibility = "visible"
                        }
                    }
                }
                if (P.browser.ieMode && P.browser.ieMode < 9) {
                    if (!isNaN(ab)) {
                        if (!~this.style.filter.indexOf("Alpha")) {
                            this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + ab + ")"
                        } else {
                            this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + ab)
                        }
                    } else {
                        this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                        if ("" === this.style.filter) {
                            this.style.removeAttribute("filter")
                        }
                    }
                }
                return this
            },
            setProps: function(Z) {
                for (var aa in Z) {
                    if ("class" === aa) {
                        this.jAddClass("" + Z[aa])
                    } else {
                        this.setAttribute(aa, "" + Z[aa])
                    }
                }
                return this
            },
            jGetTransitionDuration: function() {
                var aa = 0,
                    Z = 0;
                aa = this.jGetCss("transition-duration");
                Z = this.jGetCss("transition-delay");
                aa = aa.indexOf("ms") > -1 ? parseFloat(aa) : aa.indexOf("s") > -1 ? parseFloat(aa) * 1000 : 0;
                Z = Z.indexOf("ms") > -1 ? parseFloat(Z) : Z.indexOf("s") > -1 ? parseFloat(Z) * 1000 : 0;
                return aa + Z
            },
            hide: function() {
                return this.jSetCss({
                    display: "none",
                    visibility: "hidden"
                })
            },
            show: function() {
                return this.jSetCss({
                    display: "",
                    visibility: "visible"
                })
            },
            jGetSize: function() {
                return {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                }
            },
            getInnerSize: function(aa) {
                var Z = this.jGetSize();
                Z.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
                Z.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
                if (!aa) {
                    Z.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                    Z.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
                }
                return Z
            },
            jGetScroll: function() {
                return {
                    top: this.scrollTop,
                    left: this.scrollLeft
                }
            },
            jGetFullScroll: function() {
                var Z = this,
                    aa = {
                        top: 0,
                        left: 0
                    };
                do {
                    aa.left += Z.scrollLeft || 0;
                    aa.top += Z.scrollTop || 0;
                    Z = Z.parentNode
                } while (Z);
                return aa
            },
            jGetPosition: function() {
                var ad = this,
                    aa = 0,
                    ac = 0;
                if (P.defined(document.documentElement.getBoundingClientRect)) {
                    var Z = this.getBoundingClientRect(),
                        ab = P.$(document).jGetScroll(),
                        ae = P.browser.getDoc();
                    return {
                        top: Z.top + ab.y - ae.clientTop,
                        left: Z.left + ab.x - ae.clientLeft
                    }
                }
                do {
                    aa += ad.offsetLeft || 0;
                    ac += ad.offsetTop || 0;
                    ad = ad.offsetParent
                } while (ad && !(/^(?:body|html)$/i).test(ad.tagName));
                return {
                    top: ac,
                    left: aa
                }
            },
            jGetRect: function() {
                var aa = this.jGetPosition();
                var Z = this.jGetSize();
                return {
                    top: aa.top,
                    bottom: aa.top + Z.height,
                    left: aa.left,
                    right: aa.left + Z.width
                }
            },
            changeContent: function(aa) {
                try {
                    this.innerHTML = aa
                } catch (Z) {
                    this.innerText = aa
                }
                return this
            },
            jRemove: function() {
                return (this.parentNode) ? this.parentNode.removeChild(this) : this
            },
            kill: function() {
                P.$A(this.childNodes).jEach(function(Z) {
                    if (3 == Z.nodeType || 8 == Z.nodeType) {
                        return
                    }
                    P.$(Z).kill()
                });
                this.jRemove();
                this.jClearEvents();
                if (this.$J_UUID) {
                    P.storage[this.$J_UUID] = null;
                    delete P.storage[this.$J_UUID]
                }
                return null
            },
            append: function(ab, aa) {
                aa = aa || "bottom";
                var Z = this.firstChild;
                ("top" == aa && Z) ? this.insertBefore(ab, Z): this.appendChild(ab);
                return this
            },
            jAppendTo: function(ab, aa) {
                var Z = P.$(ab).append(this, aa);
                return this
            },
            enclose: function(Z) {
                this.append(Z.parentNode.replaceChild(this, Z));
                return this
            },
            hasChild: function(Z) {
                if ("element" !== P.jTypeOf("string" == P.jTypeOf(Z) ? Z = document.getElementById(Z) : Z)) {
                    return false
                }
                return (this == Z) ? false : (this.contains && !(P.browser.webkit419)) ? (this.contains(Z)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(Z) & 16) : P.$A(this.byTag(Z.tagName)).contains(Z)
            }
        };
        P.Element.jGetStyle = P.Element.jGetCss;
        P.Element.jSetStyle = P.Element.jSetCss;
        if (!window.Element) {
            window.Element = P.$F;
            if (P.browser.engine.webkit) {
                window.document.createElement("iframe")
            }
            window.Element.prototype = (P.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
        }
        P.implement(window.Element, {
            $J_TYPE: "element"
        });
        P.Doc = {
            jGetSize: function() {
                if (P.browser.touchScreen || P.browser.presto925 || P.browser.webkit419) {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
                return {
                    width: P.browser.getDoc().clientWidth,
                    height: P.browser.getDoc().clientHeight
                }
            },
            jGetScroll: function() {
                return {
                    x: window.pageXOffset || P.browser.getDoc().scrollLeft,
                    y: window.pageYOffset || P.browser.getDoc().scrollTop
                }
            },
            jGetFullSize: function() {
                var Z = this.jGetSize();
                return {
                    width: Math.max(P.browser.getDoc().scrollWidth, Z.width),
                    height: Math.max(P.browser.getDoc().scrollHeight, Z.height)
                }
            }
        };
        P.extend(document, {
            $J_TYPE: "document"
        });
        P.extend(window, {
            $J_TYPE: "window"
        });
        P.extend([P.Element, P.Doc], {
            jFetch: function(ac, aa) {
                var Z = P.getStorage(this.$J_UUID),
                    ab = Z[ac];
                if (undefined !== aa && undefined === ab) {
                    ab = Z[ac] = aa
                }
                return (P.defined(ab) ? ab : null)
            },
            jStore: function(ab, aa) {
                var Z = P.getStorage(this.$J_UUID);
                Z[ab] = aa;
                return this
            },
            jDel: function(aa) {
                var Z = P.getStorage(this.$J_UUID);
                delete Z[aa];
                return this
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            P.extend([P.Element, P.Doc], {
                getElementsByClassName: function(Z) {
                    return P.$A(this.getElementsByTagName("*")).filter(function(ab) {
                        try {
                            return (1 == ab.nodeType && ab.className.has(Z, " "))
                        } catch (aa) {}
                    })
                }
            })
        }
        P.extend([P.Element, P.Doc], {
            byClass: function() {
                return this.getElementsByClassName(arguments[0])
            },
            byTag: function() {
                return this.getElementsByTagName(arguments[0])
            }
        });
        if (P.browser.fullScreen.capable && !document.requestFullScreen) {
            P.Element.requestFullScreen = function() {
                P.browser.fullScreen.request(this)
            }
        }
        P.Event = {
            $J_TYPE: "event",
            isQueueStopped: P.$false,
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                if (this.stopPropagation) {
                    this.stopPropagation()
                } else {
                    this.cancelBubble = true
                }
                return this
            },
            stopDefaults: function() {
                if (this.preventDefault) {
                    this.preventDefault()
                } else {
                    this.returnValue = false
                }
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = P.$true;
                return this
            },
            getClientXY: function() {
                var aa, Z;
                aa = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!P.defined(aa)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: aa.clientX,
                    y: aa.clientY
                }
            },
            jGetPageXY: function() {
                var aa, Z;
                aa = ((/touch/i).test(this.type)) ? this.changedTouches[0] : this;
                return (!P.defined(aa)) ? {
                    x: 0,
                    y: 0
                } : {
                    x: aa.pageX || aa.clientX + P.browser.getDoc().scrollLeft,
                    y: aa.pageY || aa.clientY + P.browser.getDoc().scrollTop
                }
            },
            getTarget: function() {
                var Z = this.target || this.srcElement;
                while (Z && 3 == Z.nodeType) {
                    Z = Z.parentNode
                }
                return Z
            },
            getRelated: function() {
                var aa = null;
                switch (this.type) {
                    case "mouseover":
                    case "pointerover":
                    case "MSPointerOver":
                        aa = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        aa = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return aa
                }
                try {
                    while (aa && 3 == aa.nodeType) {
                        aa = aa.parentNode
                    }
                } catch (Z) {
                    aa = null
                }
                return aa
            },
            getButton: function() {
                if (!this.which && this.button !== undefined) {
                    return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
                }
                return this.which
            },
            isTouchEvent: function() {
                return (this.pointerType && ("touch" === this.pointerType || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
            },
            isPrimaryTouch: function() {
                return this.pointerType ? (("touch" === this.pointerType || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary) : 1 === this.changedTouches.length && (this.targetTouches.length ? this.targetTouches[0].identifier == this.changedTouches[0].identifier : true)
            }
        };
        P._event_add_ = "addEventListener";
        P._event_del_ = "removeEventListener";
        P._event_prefix_ = "";
        if (!document.addEventListener) {
            P._event_add_ = "attachEvent";
            P._event_del_ = "detachEvent";
            P._event_prefix_ = "on"
        }
        P.Event.Custom = {
            type: "",
            x: null,
            y: null,
            timeStamp: null,
            button: null,
            target: null,
            relatedTarget: null,
            $J_TYPE: "event.custom",
            isQueueStopped: P.$false,
            events: P.$([]),
            pushToEvents: function(Z) {
                var aa = Z;
                this.events.push(aa)
            },
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                this.events.jEach(function(aa) {
                    try {
                        aa.stopDistribution()
                    } catch (Z) {}
                });
                return this
            },
            stopDefaults: function() {
                this.events.jEach(function(aa) {
                    try {
                        aa.stopDefaults()
                    } catch (Z) {}
                });
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = P.$true;
                return this
            },
            getClientXY: function() {
                return {
                    x: this.clientX,
                    y: this.clientY
                }
            },
            jGetPageXY: function() {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            getTarget: function() {
                return this.target
            },
            getRelated: function() {
                return this.relatedTarget
            },
            getButton: function() {
                return this.button
            },
            getOriginalTarget: function() {
                return this.events.length > 0 ? this.events[0].getTarget() : undefined
            }
        };
        P.extend([P.Element, P.Doc], {
            jAddEvent: function(ab, ad, ae, ah) {
                var ag, Z, ac, af, aa;
                if ("string" == P.jTypeOf(ab)) {
                    aa = ab.split(" ");
                    if (aa.length > 1) {
                        ab = aa
                    }
                }
                if (P.jTypeOf(ab) == "array") {
                    P.$(ab).jEach(this.jAddEvent.jBindAsEvent(this, ad, ae, ah));
                    return this
                }
                if (!ab || !ad || P.jTypeOf(ab) != "string" || P.jTypeOf(ad) != "function") {
                    return this
                }
                if (ab == "domready" && P.browser.ready) {
                    ad.call(this);
                    return this
                }
                ab = W[ab] || ab;
                ae = parseInt(ae || 50);
                if (!ad.$J_EUID) {
                    ad.$J_EUID = Math.floor(Math.random() * P.now())
                }
                ag = P.Doc.jFetch.call(this, "_EVENTS_", {});
                Z = ag[ab];
                if (!Z) {
                    ag[ab] = Z = P.$([]);
                    ac = this;
                    if (P.Event.Custom[ab]) {
                        P.Event.Custom[ab].handler.add.call(this, ah)
                    } else {
                        Z.handle = function(ai) {
                            ai = P.extend(ai || window.e, {
                                $J_TYPE: "event"
                            });
                            P.Doc.jCallEvent.call(ac, ab, P.$(ai))
                        };
                        this[P._event_add_](P._event_prefix_ + ab, Z.handle, false)
                    }
                }
                af = {
                    type: ab,
                    fn: ad,
                    priority: ae,
                    euid: ad.$J_EUID
                };
                Z.push(af);
                Z.sort(function(aj, ai) {
                    return aj.priority - ai.priority
                });
                return this
            },
            jRemoveEvent: function(af) {
                var ad = P.Doc.jFetch.call(this, "_EVENTS_", {}),
                    ab, Z, aa, ag, ae, ac;
                ae = arguments.length > 1 ? arguments[1] : -100;
                if ("string" == P.jTypeOf(af)) {
                    ac = af.split(" ");
                    if (ac.length > 1) {
                        af = ac
                    }
                }
                if (P.jTypeOf(af) == "array") {
                    P.$(af).jEach(this.jRemoveEvent.jBindAsEvent(this, ae));
                    return this
                }
                af = W[af] || af;
                if (!af || P.jTypeOf(af) != "string" || !ad || !ad[af]) {
                    return this
                }
                ab = ad[af] || [];
                for (aa = 0; aa < ab.length; aa++) {
                    Z = ab[aa];
                    if (-100 == ae || !!ae && ae.$J_EUID === Z.euid) {
                        ag = ab.splice(aa--, 1)
                    }
                }
                if (0 === ab.length) {
                    if (P.Event.Custom[af]) {
                        P.Event.Custom[af].handler.jRemove.call(this)
                    } else {
                        this[P._event_del_](P._event_prefix_ + af, ab.handle, false)
                    }
                    delete ad[af]
                }
                return this
            },
            jCallEvent: function(ad, af) {
                var ac = P.Doc.jFetch.call(this, "_EVENTS_", {}),
                    ab, Z, aa;
                ad = W[ad] || ad;
                if (!ad || P.jTypeOf(ad) != "string" || !ac || !ac[ad]) {
                    return this
                }
                try {
                    af = P.extend(af || {}, {
                        type: ad
                    })
                } catch (ae) {}
                if (undefined === af.timeStamp) {
                    af.timeStamp = P.now()
                }
                ab = ac[ad] || [];
                for (aa = 0; aa < ab.length && !(af.isQueueStopped && af.isQueueStopped()); aa++) {
                    ab[aa].fn.call(this, af)
                }
            },
            jRaiseEvent: function(aa, Z) {
                var ad = ("domready" == aa) ? false : true,
                    ac = this,
                    ab;
                aa = W[aa] || aa;
                if (!ad) {
                    P.Doc.jCallEvent.call(this, aa);
                    return this
                }
                if (ac === document && document.createEvent && !ac.dispatchEvent) {
                    ac = document.documentElement
                }
                if (document.createEvent) {
                    ab = document.createEvent(aa);
                    ab.initEvent(Z, true, true)
                } else {
                    ab = document.createEventObject();
                    ab.eventType = aa
                }
                if (document.createEvent) {
                    ac.dispatchEvent(ab)
                } else {
                    ac.fireEvent("on" + Z, ab)
                }
                return ab
            },
            jClearEvents: function() {
                var aa = P.Doc.jFetch.call(this, "_EVENTS_");
                if (!aa) {
                    return this
                }
                for (var Z in aa) {
                    P.Doc.jRemoveEvent.call(this, Z)
                }
                P.Doc.jDel.call(this, "_EVENTS_");
                return this
            }
        });
        (function(Z) {
            if ("complete" === document.readyState) {
                return Z.browser.onready.jDelay(1)
            }
            if (Z.browser.webkit && Z.browser.version < 420) {
                (function() {
                    (Z.$(["loaded", "complete"]).contains(document.readyState)) ? Z.browser.onready(): arguments.callee.jDelay(50)
                })()
            } else {
                if (Z.browser.trident && Z.browser.ieMode < 9 && window == top) {
                    (function() {
                        (Z.$try(function() {
                            Z.browser.getDoc().doScroll("left");
                            return true
                        })) ? Z.browser.onready(): arguments.callee.jDelay(50)
                    })()
                } else {
                    Z.Doc.jAddEvent.call(Z.$(document), "DOMContentLoaded", Z.browser.onready);
                    Z.Doc.jAddEvent.call(Z.$(window), "load", Z.browser.onready)
                }
            }
        })(V);
        P.Class = function() {
            var ad = null,
                aa = P.$A(arguments);
            if ("class" == P.jTypeOf(aa[0])) {
                ad = aa.shift()
            }
            var Z = function() {
                for (var ag in this) {
                    this[ag] = P.detach(this[ag])
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var ai = this.constructor.$parent;
                    for (var ah in ai) {
                        var af = ai[ah];
                        switch (P.jTypeOf(af)) {
                            case "function":
                                this.$parent[ah] = P.Class.wrap(this, af);
                                break;
                            case "object":
                                this.$parent[ah] = P.detach(af);
                                break;
                            case "array":
                                this.$parent[ah] = P.detach(af);
                                break
                        }
                    }
                }
                var ae = (this.init) ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return ae
            };
            if (!Z.prototype.init) {
                Z.prototype.init = P.$F
            }
            if (ad) {
                var ac = function() {};
                ac.prototype = ad.prototype;
                Z.prototype = new ac;
                Z.$parent = {};
                for (var ab in ad.prototype) {
                    Z.$parent[ab] = ad.prototype[ab]
                }
            } else {
                Z.$parent = null
            }
            Z.constructor = P.Class;
            Z.prototype.constructor = Z;
            P.extend(Z.prototype, aa[0]);
            P.extend(Z, {
                $J_TYPE: "class"
            });
            return Z
        };
        V.Class.wrap = function(Z, aa) {
            return function() {
                var ac = this.caller;
                var ab = aa.apply(Z, arguments);
                return ab
            }
        };
        (function(ac) {
            var ab = ac.$;
            var Z = 5,
                aa = 300;
            ac.Event.Custom.btnclick = new ac.Class(ac.extend(ac.Event.Custom, {
                type: "btnclick",
                init: function(af, ae) {
                    var ad = ae.jGetPageXY();
                    this.x = ad.x;
                    this.y = ad.y;
                    this.clientX = ae.clientX;
                    this.clientY = ae.clientY;
                    this.timeStamp = ae.timeStamp;
                    this.button = ae.getButton();
                    this.target = af;
                    this.pushToEvents(ae)
                }
            }));
            ac.Event.Custom.btnclick.handler = {
                options: {
                    threshold: aa,
                    button: 1
                },
                add: function(ad) {
                    this.jStore("event:btnclick:options", ac.extend(ac.detach(ac.Event.Custom.btnclick.handler.options), ad || {}));
                    this.jAddEvent("mousedown", ac.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("mouseup", ac.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("click", ac.Event.Custom.btnclick.handler.onclick, 1);
                    if (ac.browser.trident && ac.browser.ieMode < 9) {
                        this.jAddEvent("dblclick", ac.Event.Custom.btnclick.handler.handle, 1)
                    }
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", ac.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("mouseup", ac.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("click", ac.Event.Custom.btnclick.handler.onclick);
                    if (ac.browser.trident && ac.browser.ieMode < 9) {
                        this.jRemoveEvent("dblclick", ac.Event.Custom.btnclick.handler.handle)
                    }
                },
                onclick: function(ad) {
                    ad.stopDefaults()
                },
                handle: function(ag) {
                    var af, ad, ae;
                    ad = this.jFetch("event:btnclick:options");
                    if (ag.type != "dblclick" && ag.getButton() != ad.button) {
                        return
                    }
                    if (this.jFetch("event:btnclick:ignore")) {
                        this.jDel("event:btnclick:ignore");
                        return
                    }
                    if ("mousedown" == ag.type) {
                        af = new ac.Event.Custom.btnclick(this, ag);
                        this.jStore("event:btnclick:btnclickEvent", af)
                    } else {
                        if ("mouseup" == ag.type) {
                            af = this.jFetch("event:btnclick:btnclickEvent");
                            if (!af) {
                                return
                            }
                            ae = ag.jGetPageXY();
                            this.jDel("event:btnclick:btnclickEvent");
                            af.pushToEvents(ag);
                            if (ag.timeStamp - af.timeStamp <= ad.threshold && Math.sqrt(Math.pow(ae.x - af.x, 2) + Math.pow(ae.y - af.y, 2)) <= Z) {
                                this.jCallEvent("btnclick", af)
                            }
                            document.jCallEvent("mouseup", ag)
                        } else {
                            if (ag.type == "dblclick") {
                                af = new ac.Event.Custom.btnclick(this, ag);
                                this.jCallEvent("btnclick", af)
                            }
                        }
                    }
                }
            }
        })(V);
        (function(aa) {
            var Z = aa.$;
            aa.Event.Custom.mousedrag = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "mousedrag",
                state: "dragstart",
                dragged: false,
                init: function(ae, ad, ac) {
                    var ab = ad.jGetPageXY();
                    this.x = ab.x;
                    this.y = ab.y;
                    this.clientX = ad.clientX;
                    this.clientY = ad.clientY;
                    this.timeStamp = ad.timeStamp;
                    this.button = ad.getButton();
                    this.target = ae;
                    this.pushToEvents(ad);
                    this.state = ac
                }
            }));
            aa.Event.Custom.mousedrag.handler = {
                add: function() {
                    var ac = aa.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this),
                        ab = aa.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", aa.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                    this.jAddEvent("mouseup", aa.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                    document.jAddEvent("mousemove", ac, 1);
                    document.jAddEvent("mouseup", ab, 1);
                    this.jStore("event:mousedrag:listeners:document:move", ac);
                    this.jStore("event:mousedrag:listeners:document:end", ab)
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", aa.Event.Custom.mousedrag.handler.handleMouseDown);
                    this.jRemoveEvent("mouseup", aa.Event.Custom.mousedrag.handler.handleMouseUp);
                    Z(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || aa.$F);
                    Z(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || aa.$F);
                    this.jDel("event:mousedrag:listeners:document:move");
                    this.jDel("event:mousedrag:listeners:document:end")
                },
                handleMouseDown: function(ac) {
                    var ab;
                    if (1 != ac.getButton()) {
                        return
                    }
                    ab = new aa.Event.Custom.mousedrag(this, ac, "dragstart");
                    this.jStore("event:mousedrag:dragstart", ab)
                },
                handleMouseUp: function(ac) {
                    var ab;
                    ab = this.jFetch("event:mousedrag:dragstart");
                    if (!ab) {
                        return
                    }
                    ac.stopDefaults();
                    ab = new aa.Event.Custom.mousedrag(this, ac, "dragend");
                    this.jDel("event:mousedrag:dragstart");
                    this.jCallEvent("mousedrag", ab)
                },
                handleMouseMove: function(ac) {
                    var ab;
                    ab = this.jFetch("event:mousedrag:dragstart");
                    if (!ab) {
                        return
                    }
                    ac.stopDefaults();
                    if (!ab.dragged) {
                        ab.dragged = true;
                        this.jCallEvent("mousedrag", ab)
                    }
                    ab = new aa.Event.Custom.mousedrag(this, ac, "dragmove");
                    this.jCallEvent("mousedrag", ab)
                }
            }
        })(V);
        (function(aa) {
            var Z = aa.$;
            aa.Event.Custom.dblbtnclick = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "dblbtnclick",
                timedout: false,
                tm: null,
                init: function(ad, ac) {
                    var ab = ac.jGetPageXY();
                    this.x = ab.x;
                    this.y = ab.y;
                    this.clientX = ac.clientX;
                    this.clientY = ac.clientY;
                    this.timeStamp = ac.timeStamp;
                    this.button = ac.getButton();
                    this.target = ad;
                    this.pushToEvents(ac)
                }
            }));
            aa.Event.Custom.dblbtnclick.handler = {
                options: {
                    threshold: 200
                },
                add: function(ab) {
                    this.jStore("event:dblbtnclick:options", aa.extend(aa.detach(aa.Event.Custom.dblbtnclick.handler.options), ab || {}));
                    this.jAddEvent("btnclick", aa.Event.Custom.dblbtnclick.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent("btnclick", aa.Event.Custom.dblbtnclick.handler.handle)
                },
                handle: function(ad) {
                    var ac, ab;
                    ac = this.jFetch("event:dblbtnclick:event");
                    ab = this.jFetch("event:dblbtnclick:options");
                    if (!ac) {
                        ac = new aa.Event.Custom.dblbtnclick(this, ad);
                        ac.tm = setTimeout(function() {
                            ac.timedout = true;
                            ad.isQueueStopped = aa.$false;
                            this.jCallEvent("btnclick", ad);
                            this.jDel("event:dblbtnclick:event")
                        }.jBind(this), ab.threshold + 10);
                        this.jStore("event:dblbtnclick:event", ac);
                        ad.stopQueue()
                    } else {
                        clearTimeout(ac.tm);
                        this.jDel("event:dblbtnclick:event");
                        if (!ac.timedout) {
                            ac.pushToEvents(ad);
                            ad.stopQueue().stop();
                            this.jCallEvent("dblbtnclick", ac)
                        } else {}
                    }
                }
            }
        })(V);
        (function(af) {
            var ae = af.$;

            function Z(ag) {
                return ag.pointerType ? (("touch" === ag.pointerType || ag.MSPOINTER_TYPE_TOUCH === ag.pointerType) && ag.isPrimary) : 1 === ag.changedTouches.length && (ag.targetTouches.length ? ag.targetTouches[0].identifier == ag.changedTouches[0].identifier : true)
            }

            function ab(ag) {
                if (ag.pointerType) {
                    return ("touch" === ag.pointerType || ag.MSPOINTER_TYPE_TOUCH === ag.pointerType) ? ag.pointerId : null
                } else {
                    return ag.changedTouches[0].identifier
                }
            }

            function ac(ag) {
                if (ag.pointerType) {
                    return ("touch" === ag.pointerType || ag.MSPOINTER_TYPE_TOUCH === ag.pointerType) ? ag : null
                } else {
                    return ag.changedTouches[0]
                }
            }
            af.Event.Custom.tap = new af.Class(af.extend(af.Event.Custom, {
                type: "tap",
                id: null,
                init: function(ah, ag) {
                    var ai = ac(ag);
                    this.id = ai.pointerId || ai.identifier;
                    this.x = ai.pageX;
                    this.y = ai.pageY;
                    this.pageX = ai.pageX;
                    this.pageY = ai.pageY;
                    this.clientX = ai.clientX;
                    this.clientY = ai.clientY;
                    this.timeStamp = ag.timeStamp;
                    this.button = 0;
                    this.target = ah;
                    this.pushToEvents(ag)
                }
            }));
            var aa = 10,
                ad = 200;
            af.Event.Custom.tap.handler = {
                add: function(ag) {
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], af.Event.Custom.tap.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], af.Event.Custom.tap.handler.onTouchEnd, 1);
                    this.jAddEvent("click", af.Event.Custom.tap.handler.onClick, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], af.Event.Custom.tap.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], af.Event.Custom.tap.handler.onTouchEnd);
                    this.jRemoveEvent("click", af.Event.Custom.tap.handler.onClick)
                },
                onClick: function(ag) {
                    ag.stopDefaults()
                },
                onTouchStart: function(ag) {
                    if (!Z(ag)) {
                        this.jDel("event:tap:event");
                        return
                    }
                    this.jStore("event:tap:event", new af.Event.Custom.tap(this, ag));
                    this.jStore("event:btnclick:ignore", true)
                },
                onTouchEnd: function(aj) {
                    var ah = af.now(),
                        ai = this.jFetch("event:tap:event"),
                        ag = this.jFetch("event:tap:options");
                    if (!ai || !Z(aj)) {
                        return
                    }
                    this.jDel("event:tap:event");
                    if (ai.id == ab(aj) && aj.timeStamp - ai.timeStamp <= ad && Math.sqrt(Math.pow(ac(aj).pageX - ai.x, 2) + Math.pow(ac(aj).pageY - ai.y, 2)) <= aa) {
                        this.jDel("event:btnclick:btnclickEvent");
                        aj.stop();
                        ai.pushToEvents(aj);
                        this.jCallEvent("tap", ai)
                    }
                }
            }
        })(V);
        P.Event.Custom.dbltap = new P.Class(P.extend(P.Event.Custom, {
            type: "dbltap",
            timedout: false,
            tm: null,
            init: function(aa, Z) {
                this.x = Z.x;
                this.y = Z.y;
                this.clientX = Z.clientX;
                this.clientY = Z.clientY;
                this.timeStamp = Z.timeStamp;
                this.button = 0;
                this.target = aa;
                this.pushToEvents(Z)
            }
        }));
        P.Event.Custom.dbltap.handler = {
            options: {
                threshold: 300
            },
            add: function(Z) {
                this.jStore("event:dbltap:options", P.extend(P.detach(P.Event.Custom.dbltap.handler.options), Z || {}));
                this.jAddEvent("tap", P.Event.Custom.dbltap.handler.handle, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("tap", P.Event.Custom.dbltap.handler.handle)
            },
            handle: function(ab) {
                var aa, Z;
                aa = this.jFetch("event:dbltap:event");
                Z = this.jFetch("event:dbltap:options");
                if (!aa) {
                    aa = new P.Event.Custom.dbltap(this, ab);
                    aa.tm = setTimeout(function() {
                        aa.timedout = true;
                        ab.isQueueStopped = P.$false;
                        this.jCallEvent("tap", ab)
                    }.jBind(this), Z.threshold + 10);
                    this.jStore("event:dbltap:event", aa);
                    ab.stopQueue()
                } else {
                    clearTimeout(aa.tm);
                    this.jDel("event:dbltap:event");
                    if (!aa.timedout) {
                        aa.pushToEvents(ab);
                        ab.stopQueue().stop();
                        this.jCallEvent("dbltap", aa)
                    } else {}
                }
            }
        };
        (function(ae) {
            var ad = ae.$;

            function Z(af) {
                return af.pointerType ? (("touch" === af.pointerType || af.MSPOINTER_TYPE_TOUCH === af.pointerType) && af.isPrimary) : 1 === af.changedTouches.length && (af.targetTouches.length ? af.targetTouches[0].identifier == af.changedTouches[0].identifier : true)
            }

            function ab(af) {
                if (af.pointerType) {
                    return ("touch" === af.pointerType || af.MSPOINTER_TYPE_TOUCH === af.pointerType) ? af.pointerId : null
                } else {
                    return af.changedTouches[0].identifier
                }
            }

            function ac(af) {
                if (af.pointerType) {
                    return ("touch" === af.pointerType || af.MSPOINTER_TYPE_TOUCH === af.pointerType) ? af : null
                } else {
                    return af.changedTouches[0]
                }
            }
            var aa = 10;
            ae.Event.Custom.touchdrag = new ae.Class(ae.extend(ae.Event.Custom, {
                type: "touchdrag",
                state: "dragstart",
                id: null,
                dragged: false,
                init: function(ah, ag, af) {
                    var ai = ac(ag);
                    this.id = ai.pointerId || ai.identifier;
                    this.clientX = ai.clientX;
                    this.clientY = ai.clientY;
                    this.pageX = ai.pageX;
                    this.pageY = ai.pageY;
                    this.x = ai.pageX;
                    this.y = ai.pageY;
                    this.timeStamp = ag.timeStamp;
                    this.button = 0;
                    this.target = ah;
                    this.pushToEvents(ag);
                    this.state = af
                }
            }));
            ae.Event.Custom.touchdrag.handler = {
                add: function() {
                    var ag = ae.Event.Custom.touchdrag.handler.onTouchMove.jBind(this),
                        af = ae.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ae.Event.Custom.touchdrag.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ae.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], ae.Event.Custom.touchdrag.handler.onTouchMove, 1);
                    this.jStore("event:touchdrag:listeners:document:move", ag);
                    this.jStore("event:touchdrag:listeners:document:end", af);
                    ad(document).jAddEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", ag, 1);
                    ad(document).jAddEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", af, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], ae.Event.Custom.touchdrag.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], ae.Event.Custom.touchdrag.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove"], ae.Event.Custom.touchdrag.handler.onTouchMove);
                    ad(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove", this.jFetch("event:touchdrag:listeners:document:move") || ae.$F, 1);
                    ad(document).jRemoveEvent(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp", this.jFetch("event:touchdrag:listeners:document:end") || ae.$F, 1);
                    this.jDel("event:touchdrag:listeners:document:move");
                    this.jDel("event:touchdrag:listeners:document:end")
                },
                onTouchStart: function(ag) {
                    var af;
                    if (!Z(ag)) {
                        return
                    }
                    af = new ae.Event.Custom.touchdrag(this, ag, "dragstart");
                    this.jStore("event:touchdrag:dragstart", af)
                },
                onTouchEnd: function(ag) {
                    var af;
                    af = this.jFetch("event:touchdrag:dragstart");
                    if (!af || !af.dragged || af.id != ab(ag)) {
                        return
                    }
                    af = new ae.Event.Custom.touchdrag(this, ag, "dragend");
                    this.jDel("event:touchdrag:dragstart");
                    this.jCallEvent("touchdrag", af)
                },
                onTouchMove: function(ag) {
                    var af;
                    af = this.jFetch("event:touchdrag:dragstart");
                    if (!af || !Z(ag)) {
                        return
                    }
                    if (af.id != ab(ag)) {
                        this.jDel("event:touchdrag:dragstart");
                        return
                    }
                    if (!af.dragged && Math.sqrt(Math.pow(ac(ag).pageX - af.x, 2) + Math.pow(ac(ag).pageY - af.y, 2)) > aa) {
                        af.dragged = true;
                        this.jCallEvent("touchdrag", af)
                    }
                    if (!af.dragged) {
                        return
                    }
                    af = new ae.Event.Custom.touchdrag(this, ag, "dragmove");
                    this.jCallEvent("touchdrag", af)
                }
            }
        })(V);
        P.Event.Custom.touchpinch = new P.Class(P.extend(P.Event.Custom, {
            type: "touchpinch",
            scale: 1,
            previousScale: 1,
            curScale: 1,
            state: "pinchstart",
            init: function(aa, Z) {
                this.timeStamp = Z.timeStamp;
                this.button = 0;
                this.target = aa;
                this.x = Z.touches[0].clientX + (Z.touches[1].clientX - Z.touches[0].clientX) / 2;
                this.y = Z.touches[0].clientY + (Z.touches[1].clientY - Z.touches[0].clientY) / 2;
                this._initialDistance = Math.sqrt(Math.pow(Z.touches[0].clientX - Z.touches[1].clientX, 2) + Math.pow(Z.touches[0].clientY - Z.touches[1].clientY, 2));
                this.pushToEvents(Z)
            },
            update: function(Z) {
                var aa;
                this.state = "pinchupdate";
                if (Z.changedTouches[0].identifier != this.events[0].touches[0].identifier || Z.changedTouches[1].identifier != this.events[0].touches[1].identifier) {
                    return
                }
                aa = Math.sqrt(Math.pow(Z.changedTouches[0].clientX - Z.changedTouches[1].clientX, 2) + Math.pow(Z.changedTouches[0].clientY - Z.changedTouches[1].clientY, 2));
                this.previousScale = this.scale;
                this.scale = aa / this._initialDistance;
                this.curScale = this.scale / this.previousScale;
                this.x = Z.changedTouches[0].clientX + (Z.changedTouches[1].clientX - Z.changedTouches[0].clientX) / 2;
                this.y = Z.changedTouches[0].clientY + (Z.changedTouches[1].clientY - Z.changedTouches[0].clientY) / 2;
                this.pushToEvents(Z)
            }
        }));
        P.Event.Custom.touchpinch.handler = {
            add: function() {
                this.jAddEvent("touchstart", P.Event.Custom.touchpinch.handler.handleTouchStart, 1);
                this.jAddEvent("touchend", P.Event.Custom.touchpinch.handler.handleTouchEnd, 1);
                this.jAddEvent("touchmove", P.Event.Custom.touchpinch.handler.handleTouchMove, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("touchstart", P.Event.Custom.touchpinch.handler.handleTouchStart);
                this.jRemoveEvent("touchend", P.Event.Custom.touchpinch.handler.handleTouchEnd);
                this.jRemoveEvent("touchmove", P.Event.Custom.touchpinch.handler.handleTouchMove)
            },
            handleTouchStart: function(aa) {
                var Z;
                if (aa.touches.length != 2) {
                    return
                }
                aa.stopDefaults();
                Z = new P.Event.Custom.touchpinch(this, aa);
                this.jStore("event:touchpinch:event", Z)
            },
            handleTouchEnd: function(aa) {
                var Z;
                Z = this.jFetch("event:touchpinch:event");
                if (!Z) {
                    return
                }
                aa.stopDefaults();
                this.jDel("event:touchpinch:event")
            },
            handleTouchMove: function(aa) {
                var Z;
                Z = this.jFetch("event:touchpinch:event");
                if (!Z) {
                    return
                }
                aa.stopDefaults();
                Z.update(aa);
                this.jCallEvent("touchpinch", Z)
            }
        };
        (function(ae) {
            var ac = ae.$;
            ae.Event.Custom.mousescroll = new ae.Class(ae.extend(ae.Event.Custom, {
                type: "mousescroll",
                init: function(ak, aj, am, ag, af, al, ah) {
                    var ai = aj.jGetPageXY();
                    this.x = ai.x;
                    this.y = ai.y;
                    this.timeStamp = aj.timeStamp;
                    this.target = ak;
                    this.delta = am || 0;
                    this.deltaX = ag || 0;
                    this.deltaY = af || 0;
                    this.deltaZ = al || 0;
                    this.deltaFactor = ah || 0;
                    this.deltaMode = aj.deltaMode || 0;
                    this.isMouse = false;
                    this.pushToEvents(aj)
                }
            }));
            var ad, aa;

            function Z() {
                ad = null
            }

            function ab(af, ag) {
                return (af > 50) || (1 === ag && !("win" == ae.browser.platform && af < 1)) || (0 === af % 12) || (0 == af % 4.000244140625)
            }
            ae.Event.Custom.mousescroll.handler = {
                eventType: "onwheel" in document || ae.browser.ieMode > 8 ? "wheel" : "mousewheel",
                add: function() {
                    this.jAddEvent(ae.Event.Custom.mousescroll.handler.eventType, ae.Event.Custom.mousescroll.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(ae.Event.Custom.mousescroll.handler.eventType, ae.Event.Custom.mousescroll.handler.handle, 1)
                },
                handle: function(ak) {
                    var al = 0,
                        ai = 0,
                        ag = 0,
                        af = 0,
                        aj, ah;
                    if (ak.detail) {
                        ag = ak.detail * -1
                    }
                    if (ak.wheelDelta !== undefined) {
                        ag = ak.wheelDelta
                    }
                    if (ak.wheelDeltaY !== undefined) {
                        ag = ak.wheelDeltaY
                    }
                    if (ak.wheelDeltaX !== undefined) {
                        ai = ak.wheelDeltaX * -1
                    }
                    if (ak.deltaY) {
                        ag = -1 * ak.deltaY
                    }
                    if (ak.deltaX) {
                        ai = ak.deltaX
                    }
                    if (0 === ag && 0 === ai) {
                        return
                    }
                    al = 0 === ag ? ai : ag;
                    af = Math.max(Math.abs(ag), Math.abs(ai));
                    if (!ad || af < ad) {
                        ad = af
                    }
                    aj = al > 0 ? "floor" : "ceil";
                    al = Math[aj](al / ad);
                    ai = Math[aj](ai / ad);
                    ag = Math[aj](ag / ad);
                    if (aa) {
                        clearTimeout(aa)
                    }
                    aa = setTimeout(Z, 200);
                    ah = new ae.Event.Custom.mousescroll(this, ak, al, ai, ag, 0, ad);
                    ah.isMouse = ab(ad, ak.deltaMode || 0);
                    this.jCallEvent("mousescroll", ah)
                }
            }
        })(V);
        P.win = P.$(window);
        P.doc = P.$(document);
        return V
    })();
    (function(L) {
        if (!L) {
            throw "ogJS not found"
        }
        var K = L.$;
        var J = window.URL || window.webkitURL || null;
        z.ImageLoader = new L.Class({
            img: null,
            ready: false,
            options: {
                onprogress: L.$F,
                onload: L.$F,
                onabort: L.$F,
                onerror: L.$F,
                oncomplete: L.$F,
                onxhrerror: L.$F,
                xhr: false,
                progressiveLoad: true
            },
            size: null,
            _timer: null,
            loadedBytes: 0,
            _handlers: {
                onprogress: function(M) {
                    if (M.target && (200 === M.target.status || 304 === M.target.status) && M.lengthComputable) {
                        this.options.onprogress.jBind(null, (M.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / M.total).jDelay(1);
                        this.loadedBytes = M.loaded
                    }
                },
                onload: function(M) {
                    if (M) {
                        K(M).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onabort: function(M) {
                    if (M) {
                        K(M).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(M) {
                    if (M) {
                        K(M).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                K(["load", "abort", "error"]).jEach(function(M) {
                    this.img.jAddEvent(M, this._handlers["on" + M].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (M) {}
                    this._timer = null
                }
                K(["load", "abort", "error"]).jEach(function(N) {
                    this.img.jRemoveEvent(N)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var M = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    M.kill()
                }
            },
            loadBlob: function(N) {
                var O = new XMLHttpRequest(),
                    M;
                K(["abort", "progress"]).jEach(function(P) {
                    O["on" + P] = K(function(Q) {
                        this._handlers["on" + P].call(this, Q)
                    }).jBind(this)
                }, this);
                O.onerror = K(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1);
                    this.options.xhr = false;
                    this._bind();
                    this.img.src = N
                }).jBind(this);
                O.onload = K(function() {
                    if (200 !== O.status && 304 !== O.status) {
                        this._handlers.onerror.call(this);
                        return
                    }
                    M = O.response;
                    this._bind();
                    if (J && !L.browser.trident && !("ios" === L.browser.platform && L.browser.version < 537)) {
                        this.img.setAttribute("src", J.createObjectURL(M))
                    } else {
                        this.img.src = N
                    }
                }).jBind(this);
                O.open("GET", N);
                O.responseType = "blob";
                O.send()
            },
            init: function(N, M) {
                this.options = L.extend(this.options, M);
                this.img = K(N) || L.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).jAppendTo(L.$new("div").jAddClass("ogwugoB-temporary-img").jSetCss({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                if (L.browser.features.xhr2 && this.options.xhr && "string" == L.jTypeOf(N)) {
                    this.loadBlob(N);
                    return
                }
                var O = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    O = null
                }.jBind(this);
                this._bind();
                if ("string" == L.jTypeOf(N)) {
                    this.img.src = N
                } else {
                    if (L.browser.trident && 5 == L.browser.version && L.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                O && O()
                            }
                        }.jBind(this)
                    }
                    this.img.src = N.getAttribute("src")
                }
                this.img && this.img.complete && O && (this._timer = O.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var M = this.img;
                return (M.naturalWidth) ? (M.naturalWidth > 0) : (M.readyState) ? ("complete" == M.readyState) : M.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(z);
    (function(K) {
        if (!K) {
            throw "ogJS not found"
        }
        if (K.FX) {
            return
        }
        var J = K.$;
        K.FX = new K.Class({
            init: function(M, L) {
                var N;
                this.el = K.$(M);
                this.options = K.extend(this.options, L);
                this.timer = false;
                this.easeFn = this.cubicBezierAtTime;
                N = K.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === K.jTypeOf(N)) {
                    this.easeFn = N
                } else {
                    this.cubicBezier = this.parseCubicBezier(N) || this.parseCubicBezier("ease")
                }
                if ("string" == K.jTypeOf(this.options.cycles)) {
                    this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
                }
            },
            options: {
                fps: 60,
                duration: 600,
                transition: "ease",
                cycles: 1,
                direction: "normal",
                onStart: K.$F,
                onComplete: K.$F,
                onBeforeRender: K.$F,
                onAfterRender: K.$F,
                forceAnimation: false,
                roundCss: false
            },
            styles: null,
            cubicBezier: null,
            easeFn: null,
            setTransition: function(L) {
                this.options.transition = L;
                L = K.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === K.jTypeOf(L)) {
                    this.easeFn = L
                } else {
                    this.easeFn = this.cubicBezierAtTime;
                    this.cubicBezier = this.parseCubicBezier(L) || this.parseCubicBezier("ease")
                }
            },
            start: function(N) {
                var L = /\%$/,
                    M;
                this.styles = N || {};
                this.cycle = 0;
                this.state = 0;
                this.curFrame = 0;
                this.pStyles = {};
                this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
                this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
                for (M in this.styles) {
                    L.test(this.styles[M][0]) && (this.pStyles[M] = true);
                    if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                        this.styles[M].reverse()
                    }
                }
                this.startTime = K.now();
                this.finishTime = this.startTime + this.options.duration;
                this.options.onStart.call();
                if (0 === this.options.duration) {
                    this.render(1);
                    this.options.onComplete.call()
                } else {
                    this.loopBind = this.loop.jBind(this);
                    if (!this.options.forceAnimation && K.browser.features.requestAnimationFrame) {
                        this.timer = K.browser.requestAnimationFrame.call(window, this.loopBind)
                    } else {
                        this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                    }
                }
                return this
            },
            stopAnimation: function() {
                if (this.timer) {
                    if (!this.options.forceAnimation && K.browser.features.requestAnimationFrame && K.browser.cancelAnimationFrame) {
                        K.browser.cancelAnimationFrame.call(window, this.timer)
                    } else {
                        clearInterval(this.timer)
                    }
                    this.timer = false
                }
            },
            stop: function(L) {
                L = K.defined(L) ? L : false;
                this.stopAnimation();
                if (L) {
                    this.render(1);
                    this.options.onComplete.jDelay(10)
                }
                return this
            },
            calc: function(N, M, L) {
                N = parseFloat(N);
                M = parseFloat(M);
                return (M - N) * L + N
            },
            loop: function() {
                var M = K.now(),
                    L = (M - this.startTime) / this.options.duration,
                    N = Math.floor(L);
                if (M >= this.finishTime && N >= this.options.cycles) {
                    this.stopAnimation();
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                    return this
                }
                if (this.alternate && this.cycle < N) {
                    for (var O in this.styles) {
                        this.styles[O].reverse()
                    }
                }
                this.cycle = N;
                if (!this.options.forceAnimation && K.browser.features.requestAnimationFrame) {
                    this.timer = K.browser.requestAnimationFrame.call(window, this.loopBind)
                }
                this.render((this.continuous ? N : 0) + this.easeFn(L % 1))
            },
            render: function(L) {
                var M = {},
                    O = L;
                for (var N in this.styles) {
                    if ("opacity" === N) {
                        M[N] = Math.round(this.calc(this.styles[N][0], this.styles[N][1], L) * 100) / 100
                    } else {
                        M[N] = this.calc(this.styles[N][0], this.styles[N][1], L);
                        this.pStyles[N] && (M[N] += "%")
                    }
                }
                this.options.onBeforeRender(M, this.el);
                this.set(M);
                this.options.onAfterRender(M, this.el)
            },
            set: function(L) {
                return this.el.jSetCss(L)
            },
            parseCubicBezier: function(L) {
                var M, N = null;
                if ("string" !== K.jTypeOf(L)) {
                    return null
                }
                switch (L) {
                    case "linear":
                        N = J([0, 0, 1, 1]);
                        break;
                    case "ease":
                        N = J([0.25, 0.1, 0.25, 1]);
                        break;
                    case "ease-in":
                        N = J([0.42, 0, 1, 1]);
                        break;
                    case "ease-out":
                        N = J([0, 0, 0.58, 1]);
                        break;
                    case "ease-in-out":
                        N = J([0.42, 0, 0.58, 1]);
                        break;
                    case "easeInSine":
                        N = J([0.47, 0, 0.745, 0.715]);
                        break;
                    case "easeOutSine":
                        N = J([0.39, 0.575, 0.565, 1]);
                        break;
                    case "easeInOutSine":
                        N = J([0.445, 0.05, 0.55, 0.95]);
                        break;
                    case "easeInQuad":
                        N = J([0.55, 0.085, 0.68, 0.53]);
                        break;
                    case "easeOutQuad":
                        N = J([0.25, 0.46, 0.45, 0.94]);
                        break;
                    case "easeInOutQuad":
                        N = J([0.455, 0.03, 0.515, 0.955]);
                        break;
                    case "easeInCubic":
                        N = J([0.55, 0.055, 0.675, 0.19]);
                        break;
                    case "easeOutCubic":
                        N = J([0.215, 0.61, 0.355, 1]);
                        break;
                    case "easeInOutCubic":
                        N = J([0.645, 0.045, 0.355, 1]);
                        break;
                    case "easeInQuart":
                        N = J([0.895, 0.03, 0.685, 0.22]);
                        break;
                    case "easeOutQuart":
                        N = J([0.165, 0.84, 0.44, 1]);
                        break;
                    case "easeInOutQuart":
                        N = J([0.77, 0, 0.175, 1]);
                        break;
                    case "easeInQuint":
                        N = J([0.755, 0.05, 0.855, 0.06]);
                        break;
                    case "easeOutQuint":
                        N = J([0.23, 1, 0.32, 1]);
                        break;
                    case "easeInOutQuint":
                        N = J([0.86, 0, 0.07, 1]);
                        break;
                    case "easeInExpo":
                        N = J([0.95, 0.05, 0.795, 0.035]);
                        break;
                    case "easeOutExpo":
                        N = J([0.19, 1, 0.22, 1]);
                        break;
                    case "easeInOutExpo":
                        N = J([1, 0, 0, 1]);
                        break;
                    case "easeInCirc":
                        N = J([0.6, 0.04, 0.98, 0.335]);
                        break;
                    case "easeOutCirc":
                        N = J([0.075, 0.82, 0.165, 1]);
                        break;
                    case "easeInOutCirc":
                        N = J([0.785, 0.135, 0.15, 0.86]);
                        break;
                    case "easeInBack":
                        N = J([0.6, -0.28, 0.735, 0.045]);
                        break;
                    case "easeOutBack":
                        N = J([0.175, 0.885, 0.32, 1.275]);
                        break;
                    case "easeInOutBack":
                        N = J([0.68, -0.55, 0.265, 1.55]);
                        break;
                    default:
                        L = L.replace(/\s/g, "");
                        if (L.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                            N = L.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                            for (M = N.length - 1; M >= 0; M--) {
                                N[M] = parseFloat(N[M])
                            }
                        }
                }
                return J(N)
            },
            cubicBezierAtTime: function(X) {
                var L = 0,
                    W = 0,
                    T = 0,
                    Y = 0,
                    V = 0,
                    R = 0,
                    S = this.options.duration;

                function Q(Z) {
                    return ((L * Z + W) * Z + T) * Z
                }

                function P(Z) {
                    return ((Y * Z + V) * Z + R) * Z
                }

                function N(Z) {
                    return (3 * L * Z + 2 * W) * Z + T
                }

                function U(Z) {
                    return 1 / (200 * Z)
                }

                function M(Z, aa) {
                    return P(O(Z, aa))
                }

                function O(ag, ah) {
                    var af, ae, ad, aa, Z, ac;

                    function ab(ai) {
                        if (ai >= 0) {
                            return ai
                        } else {
                            return 0 - ai
                        }
                    }
                    for (ad = ag, ac = 0; ac < 8; ac++) {
                        aa = Q(ad) - ag;
                        if (ab(aa) < ah) {
                            return ad
                        }
                        Z = N(ad);
                        if (ab(Z) < 0.000001) {
                            break
                        }
                        ad = ad - aa / Z
                    }
                    af = 0;
                    ae = 1;
                    ad = ag;
                    if (ad < af) {
                        return af
                    }
                    if (ad > ae) {
                        return ae
                    }
                    while (af < ae) {
                        aa = Q(ad);
                        if (ab(aa - ag) < ah) {
                            return ad
                        }
                        if (ag > aa) {
                            af = ad
                        } else {
                            ae = ad
                        }
                        ad = (ae - af) * 0.5 + af
                    }
                    return ad
                }
                T = 3 * this.cubicBezier[0];
                W = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - T;
                L = 1 - T - W;
                R = 3 * this.cubicBezier[1];
                V = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - R;
                Y = 1 - R - V;
                return M(X, U(S))
            }
        });
        K.FX.Transition = {
            linear: "linear",
            sineIn: "easeInSine",
            sineOut: "easeOutSine",
            expoIn: "easeInExpo",
            expoOut: "easeOutExpo",
            quadIn: "easeInQuad",
            quadOut: "easeOutQuad",
            cubicIn: "easeInCubic",
            cubicOut: "easeOutCubic",
            backIn: "easeInBack",
            backOut: "easeOutBack",
            elasticIn: function(M, L) {
                L = L || [];
                return Math.pow(2, 10 * --M) * Math.cos(20 * M * Math.PI * (L[0] || 1) / 3)
            },
            elasticOut: function(M, L) {
                return 1 - K.FX.Transition.elasticIn(1 - M, L)
            },
            bounceIn: function(N) {
                for (var M = 0, L = 1; 1; M += L, L /= 2) {
                    if (N >= (7 - 4 * M) / 11) {
                        return L * L - Math.pow((11 - 6 * M - 11 * N) / 4, 2)
                    }
                }
            },
            bounceOut: function(L) {
                return 1 - K.FX.Transition.bounceIn(1 - L)
            },
            none: function(L) {
                return 0
            }
        }
    })(z);
    (function(K) {
        if (!K) {
            throw "ogJS not found"
        }
        if (K.PFX) {
            return
        }
        var J = K.$;
        K.PFX = new K.Class(K.FX, {
            init: function(L, M) {
                this.el_arr = L;
                this.options = K.extend(this.options, M);
                this.timer = false;
                this.$parent.init()
            },
            start: function(P) {
                var L = /\%$/,
                    O, N, M = P.length;
                this.styles_arr = P;
                this.pStyles_arr = new Array(M);
                for (N = 0; N < M; N++) {
                    this.pStyles_arr[N] = {};
                    for (O in P[N]) {
                        L.test(P[N][O][0]) && (this.pStyles_arr[N][O] = true);
                        if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                            this.styles_arr[N][O].reverse()
                        }
                    }
                }
                this.$parent.start({});
                return this
            },
            render: function(L) {
                for (var M = 0; M < this.el_arr.length; M++) {
                    this.el = K.$(this.el_arr[M]);
                    this.styles = this.styles_arr[M];
                    this.pStyles = this.pStyles_arr[M];
                    this.$parent.render(L)
                }
            }
        })
    })(z);
    (function(K) {
        if (!K) {
            throw "ogJS not found";
            return
        }
        if (K.Tooltip) {
            return
        }
        var J = K.$;
        K.Tooltip = function(M, N) {
            var L = this.tooltip = K.$new("div", null, {
                position: "absolute",
                "z-index": 999
            }).jAddClass("ogwugoToolboxTooltip");
            K.$(M).jAddEvent("mouseover", function() {
                L.jAppendTo(document.body)
            });
            K.$(M).jAddEvent("mouseout", function() {
                L.jRemove()
            });
            K.$(M).jAddEvent("mousemove", function(S) {
                var U = 20,
                    R = K.$(S).jGetPageXY(),
                    Q = L.jGetSize(),
                    P = K.$(window).jGetSize(),
                    T = K.$(window).jGetScroll();

                function O(X, V, W) {
                    return (W < (X - V) / 2) ? W : ((W > (X + V) / 2) ? (W - V) : (X - V) / 2)
                }
                L.jSetCss({
                    left: T.x + O(P.width, Q.width + 2 * U, R.x - T.x) + U,
                    top: T.y + O(P.height, Q.height + 2 * U, R.y - T.y) + U
                })
            });
            this.text(N)
        };
        K.Tooltip.prototype.text = function(L) {
            this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
            this.tooltip.append(document.createTextNode(L))
        }
    })(z);
    (function(K) {
        if (!K) {
            throw "ogJS not found";
            return
        }
        if (K.MessageBox) {
            return
        }
        var J = K.$;
        K.Message = function(O, N, M, L) {
            this.hideTimer = null;
            this.messageBox = K.$new("span", null, {
                position: "absolute",
                "z-index": 999,
                visibility: "hidden",
                opacity: 0.8
            }).jAddClass(L || "").jAppendTo(M || document.body);
            this.setMessage(O);
            this.show(N)
        };
        K.Message.prototype.show = function(L) {
            this.messageBox.show();
            this.hideTimer = this.hide.jBind(this).jDelay(K.ifndef(L, 5000))
        };
        K.Message.prototype.hide = function(L) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = new z.FX(this.messageBox, {
                    duration: K.ifndef(L, 500),
                    onComplete: function() {
                        this.messageBox.kill();
                        delete this.messageBox;
                        this.hideFX = null
                    }.jBind(this)
                }).start({
                    opacity: [this.messageBox.jGetCss("opacity"), 0]
                })
            }
        };
        K.Message.prototype.setMessage = function(L) {
            this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
            this.messageBox.append(document.createTextNode(L))
        }
    })(z);
    (function(K) {
        if (!K) {
            throw "ogJS not found"
        }
        if (K.Options) {
            return
        }
        var N = K.$,
            J = null,
            R = {
                "boolean": 1,
                array: 2,
                number: 3,
                "function": 4,
                string: 100
            },
            L = {
                "boolean": function(U, T, S) {
                    if ("boolean" != K.jTypeOf(T)) {
                        if (S || "string" != K.jTypeOf(T)) {
                            return false
                        } else {
                            if (!/^(true|false)$/.test(T)) {
                                return false
                            } else {
                                T = T.jToBool()
                            }
                        }
                    }
                    if (U.hasOwnProperty("enum") && !N(U["enum"]).contains(T)) {
                        return false
                    }
                    J = T;
                    return true
                },
                string: function(U, T, S) {
                    if ("string" !== K.jTypeOf(T)) {
                        return false
                    } else {
                        if (U.hasOwnProperty("enum") && !N(U["enum"]).contains(T)) {
                            return false
                        } else {
                            J = "" + T;
                            return true
                        }
                    }
                },
                number: function(V, U, T) {
                    var S = false,
                        X = /%$/,
                        W = (K.jTypeOf(U) == "string" && X.test(U));
                    if (T && !"number" == typeof U) {
                        return false
                    }
                    U = parseFloat(U);
                    if (isNaN(U)) {
                        return false
                    }
                    if (isNaN(V.minimum)) {
                        V.minimum = Number.NEGATIVE_INFINITY
                    }
                    if (isNaN(V.maximum)) {
                        V.maximum = Number.POSITIVE_INFINITY
                    }
                    if (V.hasOwnProperty("enum") && !N(V["enum"]).contains(U)) {
                        return false
                    }
                    if (V.minimum > U || U > V.maximum) {
                        return false
                    }
                    J = W ? (U + "%") : U;
                    return true
                },
                array: function(V, T, S) {
                    if ("string" === K.jTypeOf(T)) {
                        try {
                            T = window.JSON.parse(T)
                        } catch (U) {
                            return false
                        }
                    }
                    if (K.jTypeOf(T) === "array") {
                        J = T;
                        return true
                    } else {
                        return false
                    }
                },
                "function": function(U, T, S) {
                    if (K.jTypeOf(T) === "function") {
                        J = T;
                        return true
                    } else {
                        return false
                    }
                }
            },
            M = function(X, W, T) {
                var V;
                V = X.hasOwnProperty("oneOf") ? X.oneOf : [X];
                if ("array" != K.jTypeOf(V)) {
                    return false
                }
                for (var U = 0, S = V.length - 1; U <= S; U++) {
                    if (L[V[U].type](V[U], W, T)) {
                        return true
                    }
                }
                return false
            },
            P = function(X) {
                var V, U, W, S, T;
                if (X.hasOwnProperty("oneOf")) {
                    S = X.oneOf.length;
                    for (V = 0; V < S; V++) {
                        for (U = V + 1; U < S; U++) {
                            if (R[X.oneOf[V]["type"]] > R[X.oneOf[U].type]) {
                                T = X.oneOf[V];
                                X.oneOf[V] = X.oneOf[U];
                                X.oneOf[U] = T
                            }
                        }
                    }
                }
                return X
            },
            Q = function(V) {
                var U;
                U = V.hasOwnProperty("oneOf") ? V.oneOf : [V];
                if ("array" != K.jTypeOf(U)) {
                    return false
                }
                for (var T = U.length - 1; T >= 0; T--) {
                    if (!U[T].type || !R.hasOwnProperty(U[T].type)) {
                        return false
                    }
                    if (K.defined(U[T]["enum"])) {
                        if ("array" !== K.jTypeOf(U[T]["enum"])) {
                            return false
                        }
                        for (var S = U[T]["enum"].length - 1; S >= 0; S--) {
                            if (!L[U[T].type]({
                                    type: U[T].type
                                }, U[T]["enum"][S], true)) {
                                return false
                            }
                        }
                    }
                }
                if (V.hasOwnProperty("default") && !M(V, V["default"], true)) {
                    return false
                }
                return true
            },
            O = function(S) {
                this.schema = {};
                this.options = {};
                this.parseSchema(S)
            };
        K.extend(O.prototype, {
            parseSchema: function(U) {
                var T, S, V;
                for (T in U) {
                    if (!U.hasOwnProperty(T)) {
                        continue
                    }
                    S = (T + "").jTrim().jCamelize();
                    if (!this.schema.hasOwnProperty(S)) {
                        this.schema[S] = P(U[T]);
                        if (!Q(this.schema[S])) {
                            throw "Incorrect definition of the '" + T + "' parameter in " + U
                        }
                        this.options[S] = undefined
                    }
                }
            },
            set: function(T, S) {
                T = (T + "").jTrim().jCamelize();
                if (K.jTypeOf(S) == "string") {
                    S = S.jTrim()
                }
                if (this.schema.hasOwnProperty(T)) {
                    J = S;
                    if (M(this.schema[T], S)) {
                        this.options[T] = J
                    }
                    J = null
                }
            },
            get: function(S) {
                S = (S + "").jTrim().jCamelize();
                if (this.schema.hasOwnProperty(S)) {
                    return K.defined(this.options[S]) ? this.options[S] : this.schema[S]["default"]
                }
            },
            fromJSON: function(T) {
                for (var S in T) {
                    this.set(S, T[S])
                }
            },
            getJSON: function() {
                var T = K.extend({}, this.options);
                for (var S in T) {
                    if (undefined === T[S] && undefined !== this.schema[S]["default"]) {
                        T[S] = this.schema[S]["default"]
                    }
                }
                return T
            },
            fromString: function(S) {
                N(S.split(";")).jEach(N(function(T) {
                    T = T.split(":");
                    this.set(T.shift().jTrim(), T.join(":"))
                }).jBind(this))
            },
            exists: function(S) {
                S = (S + "").jTrim().jCamelize();
                return this.schema.hasOwnProperty(S)
            },
            isset: function(S) {
                S = (S + "").jTrim().jCamelize();
                return this.exists(S) && K.defined(this.options[S])
            },
            jRemove: function(S) {
                S = (S + "").jTrim().jCamelize();
                if (this.exists(S)) {
                    delete this.options[S];
                    delete this.schema[S]
                }
            }
        });
        K.Options = O
    }(z));
    (function(N) {
        if (!N) {
            throw "ogJS not found";
            return
        }
        var M = N.$;
        if (N.SVGImage) {
            return
        }
        var L = "http://www.w3.org/2000/svg",
            K = "http://www.w3.org/1999/xlink";
        var J = function(O) {
            this.filters = {};
            this.originalImage = M(O);
            this.canvas = M(document.createElementNS(L, "svg"));
            this.canvas.setAttribute("width", this.originalImage.naturalWidth || this.originalImage.width);
            this.canvas.setAttribute("height", this.originalImage.naturalHeight || this.originalImage.height);
            this.image = M(document.createElementNS(L, "image"));
            this.image.setAttributeNS(K, "href", this.originalImage.getAttribute("src"));
            this.image.setAttribute("width", "100%");
            this.image.setAttribute("height", "100%");
            this.image.jAppendTo(this.canvas)
        };
        J.prototype.getNode = function() {
            return this.canvas
        };
        J.prototype.blur = function(O) {
            if (Math.round(O) < 1) {
                return
            }
            if (!this.filters.blur) {
                this.filters.blur = M(document.createElementNS(L, "filter"));
                this.filters.blur.setAttribute("id", "filterBlur");
                this.filters.blur.appendChild(M(document.createElementNS(L, "feGaussianBlur")).setProps({
                    "in": "SourceGraphic",
                    stdDeviation: O
                }));
                this.filters.blur.jAppendTo(this.canvas);
                this.image.setAttribute("filter", "url(#filterBlur)")
            } else {
                this.filters.blur.firstChild.setAttribute("stdDeviation", O)
            }
            return this
        };
        N.SVGImage = J
    }(z));
    var s = (function(L) {
        var K = L.$;
        var J = function(N, M) {
            this.settings = {
                cssPrefix: "ogwugoB",
                orientation: "horizontal",
                position: "bottom",
                size: {
                    units: "px",
                    width: "auto",
                    height: "auto"
                },
                sides: ["height", "width"]
            };
            this.parent = N;
            this.root = null;
            this.wrapper = null;
            this.context = null;
            this.buttons = {};
            this.items = [];
            this.selectedItem = null;
            this.scrollFX = null;
            this.resizeCallback = null;
            this.settings = L.extend(this.settings, M);
            this.rootCSS = this.settings.cssPrefix + "-thumbs";
            this.itemCSS = this.settings.cssPrefix + "-thumb";
            this.setupContent()
        };
        J.prototype = {
            setupContent: function() {
                this.root = L.$new("div").jAddClass(this.rootCSS).jAddClass(this.rootCSS + "-" + this.settings.orientation).jSetCss({
                    visibility: "hidden"
                });
                this.wrapper = L.$new("div").jAddClass(this.rootCSS + "-wrapper").jAppendTo(this.root);
                this.root.jAppendTo(this.parent);
                K(["prev", "next"]).jEach(function(M) {
                    this.buttons[M] = L.$new("button").jAddClass(this.rootCSS + "-button").jAddClass(this.rootCSS + "-button-" + M).jAppendTo(this.root).jAddEvent("btnclick tap", (function(O, N) {
                        K(O).events[0].stop().stopQueue();
                        K(O).stopDistribution();
                        this.scroll(N)
                    }).jBindAsEvent(this, M))
                }.jBind(this));
                this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                this.context = L.$new("ul").jAddEvent("btnclick tap", function(M) {
                    M.stop()
                })
            },
            addItem: function(N) {
                var M = L.$new("li").jAddClass(this.itemCSS).append(N).jAppendTo(this.context);
                new L.ImageLoader(N, {
                    oncomplete: this.reflow.jBind(this)
                });
                this.items.push(M);
                return M
            },
            selectItem: function(N) {
                var M = this.selectedItem || this.context.byClass(this.itemCSS + "-selected")[0];
                if (M) {
                    K(M).jRemoveClass(this.itemCSS + "-selected")
                }
                this.selectedItem = K(N);
                if (!this.selectedItem) {
                    return
                }
                this.selectedItem.jAddClass(this.itemCSS + "-selected");
                this.scroll(this.selectedItem)
            },
            run: function() {
                if (this.wrapper !== this.context.parentNode) {
                    K(this.context).jAppendTo(this.wrapper);
                    this.initDrag();
                    K(window).jAddEvent("resize", this.resizeCallback = this.reflow.jBind(this));
                    this.run.jBind(this).jDelay(1);
                    return
                }
                var M = this.parent.jGetSize();
                if (M.height > 0 && M.height > M.width) {
                    this.setOrientation("vertical")
                } else {
                    this.setOrientation("horizontal")
                }
                this.reflow();
                this.root.jSetCss({
                    visibility: ""
                })
            },
            stop: function() {
                if (this.resizeCallback) {
                    K(window).jRemoveEvent("resize", this.resizeCallback)
                }
                this.root.kill()
            },
            scroll: function(Z, P) {
                var R = {
                        x: 0,
                        y: 0
                    },
                    ac = "vertical" == this.settings.orientation ? "top" : "left",
                    U = "vertical" == this.settings.orientation ? "height" : "width",
                    Q = "vertical" == this.settings.orientation ? "y" : "x",
                    Y = this.context.parentNode.jGetSize()[U],
                    V = this.context.parentNode.jGetPosition(),
                    O = this.context.jGetSize()[U],
                    X, M, ab, S, N, W, T, aa = [];
                if (this.scrollFX) {
                    this.scrollFX.stop()
                } else {
                    this.context.jSetCss("transition", L.browser.cssTransformProp + String.fromCharCode(32) + "0s")
                }
                if (undefined === P) {
                    P = 600
                }
                X = this.context.jGetPosition();
                if ("string" == L.jTypeOf(Z)) {
                    R[Q] = ("next" == Z) ? Math.max(X[ac] - V[ac] - Y, Y - O) : Math.min(X[ac] - V[ac] + Y, 0)
                } else {
                    if ("element" == L.jTypeOf(Z)) {
                        M = Z.jGetSize();
                        ab = Z.jGetPosition();
                        R[Q] = Math.min(0, Math.max(Y - O, X[ac] + Y / 2 - ab[ac] - M[U] / 2))
                    } else {
                        return
                    }
                }
                if (L.browser.gecko && "android" == L.browser.platform || L.browser.ieMode && L.browser.ieMode < 10) {
                    if ("string" == L.jTypeOf(Z) && R[Q] == X[ac] - V[ac]) {
                        X[ac] += 0 === X[ac] - V[ac] ? 30 : -30
                    }
                    R["margin-" + ac] = [((O <= Y) ? 0 : (X[ac] - V[ac])), R[Q]];
                    delete R.x;
                    delete R.y;
                    if (!this.selectorsMoveFX) {
                        this.selectorsMoveFX = new L.PFX([this.context], {
                            duration: 500
                        })
                    }
                    aa.push(R);
                    this.selectorsMoveFX.start(aa);
                    T = R["margin-" + ac][1]
                } else {
                    this.context.jSetCss({
                        transition: L.browser.cssTransformProp + String.fromCharCode(32) + P + "ms ease",
                        transform: "translate3d(" + R.x + "px, " + R.y + "px, 0)"
                    });
                    T = R[Q]
                }
                if (T >= 0) {
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled")
                } else {
                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled")
                }
                if (T <= Y - O) {
                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled")
                } else {
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                }
                T = null
            },
            initDrag: function() {
                var O, N, P, W, V, Y, Q, U, T, X, ad, aa, ab, Z = {
                        x: 0,
                        y: 0
                    },
                    M, S, R = 300,
                    ac = function(ag) {
                        var af, ae = 0;
                        for (af = 1.5; af <= 90; af += 1.5) {
                            ae += (ag * Math.cos(af / Math.PI / 2))
                        }(W < 0) && (ae *= (-1));
                        return ae
                    };
                V = K(function(ae) {
                    Z = {
                        x: 0,
                        y: 0
                    };
                    M = "vertical" == this.settings.orientation ? "top" : "left";
                    S = "vertical" == this.settings.orientation ? "height" : "width";
                    O = "vertical" == this.settings.orientation ? "y" : "x";
                    aa = this.context.parentNode.jGetSize()[S];
                    ad = this.context.jGetSize()[S];
                    P = aa - ad;
                    if (P >= 0) {
                        return
                    }
                    if (ae.state == "dragstart") {
                        if (undefined === ab) {
                            ab = 0
                        }
                        this.context.jSetCssProp("transition", L.browser.cssTransformProp + String.fromCharCode(32) + "0ms");
                        Y = ae[O];
                        T = ae.y;
                        U = ae.x;
                        X = false
                    } else {
                        if ("dragend" == ae.state) {
                            if (X) {
                                return
                            }
                            Q = ac(Math.abs(W));
                            ab += Q;
                            (ab <= P) && (ab = P);
                            (ab >= 0) && (ab = 0);
                            Z[O] = ab;
                            this.context.jSetCssProp("transition", L.browser.cssTransformProp + String.fromCharCode(32) + R + "ms  cubic-bezier(.0, .0, .0, 1)");
                            this.context.jSetCssProp("transform", "translate3d(" + Z.x + "px, " + Z.y + "px, 0px)");
                            W = 0
                        } else {
                            if (X) {
                                return
                            }
                            if ("horizontal" == this.settings.orientation && Math.abs(ae.x - U) > Math.abs(ae.y - T) || "vertical" == this.settings.orientation && Math.abs(ae.x - U) < Math.abs(ae.y - T)) {
                                ae.stop();
                                W = ae[O] - Y;
                                ab += W;
                                Z[O] = ab;
                                this.context.jSetCssProp("transform", "translate3d(" + Z.x + "px, " + Z.y + "px, 0px)");
                                if (ab >= 0) {
                                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled")
                                } else {
                                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled")
                                }
                                if (ab <= P) {
                                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled")
                                } else {
                                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                                }
                            } else {
                                X = true
                            }
                        }
                        Y = ae[O]
                    }
                }).jBind(this);
                this.context.jAddEvent("touchdrag", V)
            },
            reflow: function() {
                var P, O, M, N = this.parent.jGetSize();
                if (N.height > 0 && N.height > N.width) {
                    this.setOrientation("vertical")
                } else {
                    this.setOrientation("horizontal")
                }
                P = "vertical" == this.settings.orientation ? "height" : "width";
                O = this.context.jGetSize()[P];
                M = this.root.jGetSize()[P];
                if (O <= M) {
                    this.root.jAddClass("no-buttons");
                    this.context.jSetCssProp("transition", "").jGetSize();
                    this.context.jSetCssProp("transform", "translate3d(0,0,0)");
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                } else {
                    this.root.jRemoveClass("no-buttons")
                }
                if (this.selectedItem) {
                    this.scroll(this.selectedItem, 0)
                }
            },
            setOrientation: function(M) {
                if ("vertical" !== M && "horizontal" !== M || M == this.settings.orientation) {
                    return
                }
                this.root.jRemoveClass(this.rootCSS + "-" + this.settings.orientation);
                this.settings.orientation = M;
                this.root.jAddClass(this.rootCSS + "-" + this.settings.orientation);
                this.context.jSetCssProp("transition", "none").jGetSize();
                this.context.jSetCssProp("transform", "").jSetCssProp("margin", "")
            }
        };
        return J
    })(z);
    var i = A.$;
    if (typeof Object.assign !== "function") {
        Object.assign = function(M) {
            if (M == null) {
                throw new TypeError("Cannot convert undefined or null to object")
            }
            M = Object(M);
            for (var J = 1; J < arguments.length; J++) {
                var L = arguments[J];
                if (L != null) {
                    for (var K in L) {
                        if (Object.prototype.hasOwnProperty.call(L, K)) {
                            M[K] = L[K]
                        }
                    }
                }
            }
            return M
        }
    }
    if (!A.browser.cssTransform) {
        A.browser.cssTransform = A.normalizeCSS("transform").dashize()
    }
    var p = {
        zoomOn: {
            type: "string",
            "enum": ["click", "hover"],
            "default": "hover"
        },
        zoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "preview", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        zoomWidth: {
            oneOf: [{
                type: "string",
                "enum": ["auto"]
            }, {
                type: "number",
                minimum: 1
            }],
            "default": "auto"
        },
        zoomHeight: {
            oneOf: [{
                type: "string",
                "enum": ["auto"]
            }, {
                type: "number",
                minimum: 1
            }],
            "default": "auto"
        },
        zoomPosition: {
            type: "string",
            "default": "right"
        },
        zoomDistance: {
            type: "number",
            minimum: 0,
            "default": 15
        },
        zoomCaption: {
            oneOf: [{
                type: "string",
                "enum": ["bottom", "top", "off"],
                "default": "off"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "off"
        },
        expand: {
            oneOf: [{
                type: "string",
                "enum": ["window", "fullscreen", "off"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "window"
        },
        expandZoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        expandZoomOn: {
            type: "string",
            "enum": ["click", "always"],
            "default": "click"
        },
        expandCaption: {
            type: "boolean",
            "default": true
        },
        closeOnClickOutside: {
            type: "boolean",
            "default": true
        },
        hint: {
            oneOf: [{
                type: "string",
                "enum": ["once", "always", "off"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "once"
        },
        smoothing: {
            type: "boolean",
            "default": true
        },
        upscale: {
            type: "boolean",
            "default": true
        },
        variableZoom: {
            type: "boolean",
            "default": false
        },
        lazyZoom: {
            type: "boolean",
            "default": false
        },
        autostart: {
            type: "boolean",
            "default": true
        },
        rightClick: {
            type: "boolean",
            "default": true
        },
        transitionEffect: {
            type: "boolean",
            "default": true
        },
        selectorTrigger: {
            type: "string",
            "enum": ["click", "hover"],
            "default": "click"
        },
        cssClass: {
            type: "string"
        },
        forceTouch: {
            type: "boolean",
            "default": false
        },
        textHoverZoomHint: {
            type: "string",
            "default": "Hover to zoom"
        },
        textClickZoomHint: {
            type: "string",
            "default": "Click to zoom"
        },
        textExpandHint: {
            type: "string",
            "default": "Click to expand"
        },
        textBtnClose: {
            type: "string",
            "default": "Close"
        },
        textBtnNext: {
            type: "string",
            "default": "Next"
        },
        textBtnPrev: {
            type: "string",
            "default": "Previous"
        }
    };
    var m = {
        zoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        expandZoomOn: {
            type: "string",
            "enum": ["click", "always"],
            "default": "click"
        },
        textExpandHint: {
            type: "string",
            "default": "Tap to expand"
        },
        textHoverZoomHint: {
            type: "string",
            "default": "Touch to zoom"
        },
        textClickZoomHint: {
            type: "string",
            "default": "Double tap to zoom"
        }
    };
    var o = "ogwugoZoom";
    var E = "og";
    var b = 20;
    var B = ["onZoomReady", "onUpdate", "onZoomIn", "onZoomOut", "onExpandOpen", "onExpandClose"];
    var D = 600;
    var v;
    var q = {};
    var G = i([]);
    var I;
    var f = window.devicePixelRatio || 1;
    var H;
    var y = true;
    var g = A.browser.features.perspective ? "translate3d(" : "translate(";
    var C = A.browser.features.perspective ? ",0)" : ")";
    var n = null;
    var r = (function() {
        var K, N, M, L, J;
        J = ["2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigmtaac~b{}!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5.zkvz#jkma|ozga`4.`a`k5,0Coigm.Taac.^b{}(z|ojk5.z|gob.xk|}ga`2!o0", "#ff0000", 11, "normal", "", "center", "100%"];
        return J
    })();
    var t = function() {
        return "mgctlbxN$og" + "p".toUpperCase() + " mgctlbxV$" + "v5.2.2".replace("v", "") + " mgctlbxL$" + "t".toUpperCase() + ((window.mgctlbx$Pltm && A.jTypeOf(window.mgctlbx$Pltm) === "string") ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
    };

    function x(L) {
        var K, J;
        K = "";
        for (J = 0; J < L.length; J++) {
            K += String.fromCharCode(14 ^ L.charCodeAt(J))
        }
        return K
    }

    function j(L) {
        var K = [],
            J = null;
        (L && (J = i(L))) && (K = G.filter(function(M) {
            return M.placeholder === J
        }));
        return K.length ? K[0] : null
    }

    function a(L) {
        var K = i(window).jGetSize();
        var J = i(window).jGetScroll();
        L = L || 0;
        return {
            left: L,
            right: K.width - L,
            top: L,
            bottom: K.height - L,
            x: J.x,
            y: J.y
        }
    }

    function c(J) {
        return (J.pointerType && (J.pointerType === "touch" || J.pointerType === J.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(J.type)
    }

    function h(J) {
        return J.pointerType ? ((J.pointerType === "touch" || J.MSPOINTER_TYPE_TOUCH === J.pointerType) && J.isPrimary) : J.changedTouches.length === 1 && (J.targetTouches.length ? J.targetTouches[0].identifier === J.changedTouches[0].identifier : true)
    }

    function e(J) {
        return Object.assign({}, J, {
            type: J.type,
            pageX: J.pageX,
            pageY: J.pageY,
            screenX: J.screenX,
            screenY: J.screenY,
            clientX: J.clientX,
            clientY: J.clientY
        })
    }

    function u() {
        var L = A.$A(arguments);
        var K = L.shift();
        var J = q[K];
        if (J) {
            for (var M = 0; M < J.length; M++) {
                J[M].apply(null, L)
            }
        }
    }

    function F() {
        var N = arguments[0],
            J, M, K = [];
        try {
            do {
                M = N.tagName;
                if (/^[A-Za-z]*$/.test(M)) {
                    if (J = N.getAttribute("id")) {
                        if (/^[A-Za-z][-A-Za-z0-9_]*/.test(J)) {
                            M += "#" + J
                        }
                    }
                    K.push(M)
                }
                N = N.parentNode
            } while (N && N !== document.documentElement);
            K = K.reverse();
            A.addCSS(K.join(" ") + "> .og-figure > img", {
                width: "100% !important;",
                transition: "none",
                transform: "none"
            }, "og-runtime-css", true)
        } catch (L) {}
    }

    function w() {
        var K = null,
            L = null,
            J = function() {
                window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                window.dispatchEvent(new Event("resize"))
            };
        L = setInterval(function() {
            var O = window.orientation === 90 || window.orientation === -90;
            var N = window.innerHeight;
            var M = (O ? screen.availWidth : screen.availHeight) * 0.85;
            if ((K === null || K === false) && ((O && N < M) || (!O && N < M))) {
                K = true;
                J()
            } else {
                if ((K === null || K === true) && ((O && N > M) || (!O && N > M))) {
                    K = false;
                    J()
                }
            }
        }, 250);
        return L
    }

    function d() {
        A.addCSS(".ogwugoB-hidden-wrapper, .ogwugoB-temporary-img", {
            display: "block !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            width: "10px !important",
            height: "10px !important",
            position: "absolute !important",
            top: "-10000px !important",
            left: "0 !important",
            overflow: "hidden !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "ogwugozoom-reset-css");
        A.addCSS(".ogwugoB-temporary-img img", {
            display: "inline-block !important",
            border: "0 !important",
            padding: "0 !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "ogwugozoom-reset-css");
        if (A.browser.androidBrowser) {
            A.addCSS(".mobile-ogwugoB .og-expand .og-expand-bg", {
                display: "none !important"
            }, "ogwugozoom-reset-css")
        }
        if (A.browser.androidBrowser && (A.browser.uaName !== "chrome" || A.browser.uaVersion === 44)) {
            A.addCSS(".mobile-ogwugoB .og-zoom-window.og-magnifier, .mobile-ogwugoB .og-zoom-window.og-magnifier:before", {
                "border-radius": "0 !important"
            }, "ogwugozoom-reset-css")
        }
    }
    var l = function(M, N, K, L, J) {
        this.small = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: false
        };
        this.zoom = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: false
        };
        if (A.jTypeOf(M) === "object") {
            this.small = M
        } else {
            if (A.jTypeOf(M) === "string") {
                this.small.url = A.getAbsoluteURL(M)
            }
        }
        if (A.jTypeOf(N) === "object") {
            this.zoom = N
        } else {
            if (A.jTypeOf(N) === "string") {
                this.zoom.url = A.getAbsoluteURL(N)
            }
        }
        this.caption = K;
        this.options = L;
        this.origin = J;
        this.callback = null;
        this.link = null;
        this.node = null
    };
    l.prototype = {
        parseNode: function(L, K, J) {
            var M = L.byTag("img")[0];
            if (J) {
                this.small.node = M || A.$new("img").jAppendTo(L)
            }
            if (f > 1) {
                this.small.url = L.getAttribute("data-image-2x");
                if (this.small.url) {
                    this.small.dppx = 2
                }
                this.zoom.url = L.getAttribute("data-zoom-image-2x");
                if (this.zoom.url) {
                    this.zoom.dppx = 2
                }
            }
            this.small.src = L.getAttribute("data-image") || L.getAttribute("rev") || (M ? M.currentSrc || M.getAttribute("src") : null);
            if (this.small.src) {
                this.small.src = A.getAbsoluteURL(this.small.src)
            }
            this.small.url = this.small.url || this.small.src;
            if (this.small.url) {
                this.small.url = A.getAbsoluteURL(this.small.url)
            }
            this.zoom.src = L.getAttribute("data-zoom-image") || L.getAttribute("href");
            if (this.zoom.src) {
                this.zoom.src = A.getAbsoluteURL(this.zoom.src)
            }
            this.zoom.url = this.zoom.url || this.zoom.src;
            if (this.zoom.url) {
                this.zoom.url = A.getAbsoluteURL(this.zoom.url)
            }
            this.caption = L.getAttribute("data-caption") || L.getAttribute("title") || K;
            this.link = L.getAttribute("data-link");
            this.origin = L;
            return this
        },
        loadImg: function(J) {
            var K = null;
            if (arguments.length > 1 && A.jTypeOf(arguments[1]) === "function") {
                K = arguments[1]
            }
            if (this[J].state !== 0) {
                if (this[J].loaded) {
                    this.onload(K)
                }
                return
            }
            if (this[J].url && this[J].node && !this[J].node.getAttribute("src") && !this[J].node.getAttribute("srcset")) {
                this[J].node.setAttribute("src", this[J].url)
            }
            this[J].state = 1;
            new A.ImageLoader(this[J].node || this[J].url, {
                oncomplete: i(function(L) {
                    this[J].loaded = true;
                    this[J].state = L.ready ? 2 : -1;
                    if (L.ready) {
                        this[J].size = L.jGetSize();
                        if (!this[J].node) {
                            this[J].node = i(L.img);
                            this[J].node.getAttribute("style");
                            this[J].node.removeAttribute("style");
                            this[J].size.width /= this[J].dppx;
                            this[J].size.height /= this[J].dppx
                        } else {
                            this[J].node.jSetCss({
                                "max-width": this[J].size.width,
                                "max-height": this[J].size.height
                            });
                            if (this[J].node.currentSrc && this[J].node.currentSrc !== this[J].node.src) {
                                this[J].url = this[J].node.currentSrc
                            } else {
                                if (A.getAbsoluteURL(this[J].node.getAttribute("src") || "") !== this[J].url) {
                                    this[J].node.setAttribute("src", this[J].url)
                                }
                            }
                        }
                    }
                    this.onload(K)
                }).jBind(this)
            })
        },
        loadSmall: function() {
            this.loadImg("small", arguments[0])
        },
        loadZoom: function() {
            this.loadImg("zoom", arguments[0])
        },
        load: function() {
            this.callback = null;
            if (arguments.length > 0 && A.jTypeOf(arguments[0]) === "function") {
                this.callback = arguments[0]
            }
            this.loadSmall();
            this.loadZoom()
        },
        onload: function(J) {
            if (J) {
                J.call(null, this)
            }
            if (this.callback && this.small.loaded && this.zoom.loaded) {
                this.callback.call(null, this);
                this.callback = null;
                return
            }
        },
        loaded: function() {
            return (this.small.loaded && this.zoom.loaded)
        },
        ready: function() {
            return (this.small.state === 2 && this.zoom.state === 2)
        },
        getURL: function(K) {
            var J = K === "small" ? "zoom" : "small";
            if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
                return this[K].url
            } else {
                if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                    return this[J].url
                } else {
                    return null
                }
            }
        },
        getNode: function(K) {
            var J = K === "small" ? "zoom" : "small";
            if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
                return this[K].node
            } else {
                if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                    return this[J].node
                } else {
                    return null
                }
            }
        },
        jGetSize: function(K) {
            var J = K === "small" ? "zoom" : "small";
            if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
                return this[K].size
            } else {
                if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                    return this[J].size
                } else {
                    return {
                        width: 0,
                        height: 0
                    }
                }
            }
        },
        getRatio: function(K) {
            var J = K === "small" ? "zoom" : "small";
            if (!this[K].loaded || (this[K].loaded && this[K].state === 2)) {
                return this[K].dppx
            } else {
                if (!this[J].loaded || (this[J].loaded && this[J].state === 2)) {
                    return this[J].dppx
                } else {
                    return 1
                }
            }
        },
        setCurNode: function(J) {
            this.node = this.getNode(J)
        }
    };
    var k = function(K, J) {
        this.options = new A.Options(p);
        this.option = i(function() {
            if (arguments.length > 1) {
                return this.set(arguments[0], arguments[1])
            } else {
                return this.get(arguments[0])
            }
        }).jBind(this.options);
        this.touchOptions = new A.Options(m);
        this.additionalImages = [];
        this.image = null;
        this.primaryImage = null;
        this.placeholder = i(K).jAddEvent("dragstart selectstart click", function(L) {
            L.stop()
        });
        this.id = null;
        this.node = null;
        this.stubNode = null;
        this.originalImg = null;
        this.originalImgSrc = null;
        this.originalTitle = null;
        this.normalSize = {
            width: 0,
            height: 0
        };
        this.size = {
            width: 0,
            height: 0
        };
        this.zoomSize = {
            width: 0,
            height: 0
        };
        this.zoomSizeOrigin = {
            width: 0,
            height: 0
        };
        this.boundaries = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        this.ready = false;
        this.expanded = false;
        this.activateTimer = null;
        this.resizeTimer = null;
        this.resizeCallback = i(function() {
            if (this.expanded) {
                this.image.node.jSetCss({
                    "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
                });
                this.image.node.jSetCss({
                    "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
                })
            }
            this.reflowZoom(arguments[0])
        }).jBind(this);
        this.onResize = i(function(L) {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = i(this.resizeCallback).jDelay(10, L.type === "scroll")
        }).jBindAsEvent(this);
        if (t) {
            I.append(A.$new("div", {}, {
                display: "none",
                visibility: "hidden"
            }).append(document.createTextNode(t)));
            t = undefined
        }
        this.lens = null;
        this.zoomBox = null;
        this.hint = null;
        this.hintMessage = null;
        this.hintRuns = 0;
        this.mobileZoomHint = true;
        this.loadingBox = null;
        this.loadTimer = null;
        this.thumb = null;
        this.expandBox = null;
        this.expandBg = null;
        this.expandCaption = null;
        this.expandStage = null;
        this.expandImageStage = null;
        this.expandFigure = null;
        this.expandControls = null;
        this.expandNav = null;
        this.expandThumbs = null;
        this.expandGallery = [];
        this.buttons = {};
        this.startAttempts = 0;
        this.startTimer = null;
        this.start(J)
    };
    k.prototype = {
        loadOptions: function(J) {
            this.options.fromJSON(window[E + "Options"] || {});
            this.options.fromString(this.placeholder.getAttribute("data-options") || "");
            if (!A.browser.touchScreen) {
                this.option("forceTouch", false)
            }
            if (A.browser.mobile || this.option("forceTouch")) {
                this.options.fromJSON(this.touchOptions.getJSON());
                this.options.fromJSON(window[E + "MobileOptions"] || {});
                this.options.fromString(this.placeholder.getAttribute("data-mobile-options") || "")
            }
            if (A.jTypeOf(J) === "string") {
                this.options.fromString(J || "")
            } else {
                this.options.fromJSON(J || {})
            }
            if (this.option("cssClass")) {
                this.option("cssClass", this.option("cssClass").replace(",", " "))
            }
            if (this.option("zoomCaption") === false) {
                this.option("zoomCaption", "off")
            }
            if (this.option("hint") === false) {
                this.option("hint", "off")
            }
            switch (this.option("hint")) {
                case "off":
                    this.hintRuns = 0;
                    break;
                case "always":
                    this.hintRuns = Infinity;
                    break;
                case "once":
                default:
                    this.hintRuns = 2;
                    break
            }
            if (this.option("zoomMode") === "off") {
                this.option("zoomMode", false)
            }
            if (this.option("expand") === "off") {
                this.option("expand", false)
            }
            if (this.option("expandZoomMode") === "off") {
                this.option("expandZoomMode", false)
            }
            if (A.browser.mobile && this.option("zoomMode") === "zoom" && this.option("zoomPosition") === "inner") {
                if (this.option("expand")) {
                    this.option("zoomMode", false)
                } else {
                    this.option("zoomOn", "click")
                }
            }
        },
        start: function(M) {
            var K;
            var J = this;
            var L;
            if (this.startAttempts < 1) {
                this.loadOptions(M);
                if (y && !this.option("autostart")) {
                    return
                }
                this.originalImg = this.placeholder.querySelector("img");
                this.originalImgSrc = this.originalImg ? this.originalImg.getAttribute("src") : null;
                this.originalTitle = i(this.placeholder).getAttribute("title");
                i(this.placeholder).removeAttribute("title")
            }
            L = new l().parseNode(this.placeholder, this.originalTitle, true);
            if (!L.small.url) {
                if (++this.startAttempts <= D) {
                    this.startTimer = setTimeout(function() {
                        J.start()
                    }, 100)
                }
                return
            }
            this.primaryImage = L;
            this.image = this.primaryImage;
            F(this.placeholder);
            this.id = this.placeholder.getAttribute("id") || "og-" + Math.floor(Math.random() * A.now());
            this.placeholder.setAttribute("id", this.id);
            this.node = A.$new("figure").jAddClass("og-figure");
            this.node.enclose(this.image.small.node).jAddClass(this.option("cssClass"));
            if (this.option("rightClick") !== true) {
                this.node.jAddEvent("contextmenu", function(O) {
                    O.stop();
                    return false
                })
            }
            this.node.jAddClass("og-" + this.option("zoomOn") + "-zoom");
            if (!this.option("expand")) {
                this.node.jAddClass("og-no-expand")
            }
            this.lens = {
                node: A.$new("div", {
                    "class": "og-lens"
                }, {
                    top: 0
                }).jAppendTo(this.node),
                image: A.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute",
                    top: 0,
                    left: 0
                }),
                width: 0,
                height: 0,
                pos: {
                    x: 0,
                    y: 0
                },
                spos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                border: {
                    x: 0,
                    y: 0
                },
                dx: 0,
                dy: 0,
                innertouch: false,
                hide: function() {
                    if (A.browser.features.transform) {
                        this.node.jSetCss({
                            transform: "translate(-10000px, -10000px)"
                        })
                    } else {
                        this.node.jSetCss({
                            top: -10000
                        })
                    }
                }
            };
            this.lens.hide();
            this.lens.node.append(this.lens.image);
            this.zoomBox = {
                node: A.$new("div", {
                    "class": "og-zoom-window"
                }, {
                    top: -100000
                }).jAddClass(this.option("cssClass")).jAppendTo(I),
                image: A.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute"
                }),
                aspectRatio: 0,
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                size: {
                    width: "auto",
                    wunits: "px",
                    height: "auto",
                    hunits: "px"
                },
                mode: this.option("zoomMode"),
                position: this.option("zoomPosition"),
                trigger: this.option("zoomOn"),
                custom: false,
                active: false,
                activating: false,
                enabled: false,
                enable: i(function() {
                    this.zoomBox.enabled = arguments[0] !== false;
                    this.node[this.zoomBox.enabled ? "jRemoveClass" : "jAddClass"]("og-no-zoom")
                }).jBind(this),
                hide: i(function() {
                    var O = i(this.node).jFetch("cr");
                    this.zoomBox.node.jRemoveEvent("transitionend");
                    this.zoomBox.node.jSetCss({
                        top: -100000
                    }).jAppendTo(I);
                    this.zoomBox.node.jRemoveClass("og-deactivating og-p-" + (this.zoomBox.mode === "zoom" ? this.zoomBox.position : this.zoomBox.mode));
                    if (!this.expanded && O) {
                        O.jRemove()
                    }
                    this.zoomBox.image.getAttribute("style");
                    this.zoomBox.image.removeAttribute("style")
                }).jBind(this),
                setMode: i(function(O) {
                    this.node[O === false ? "jAddClass" : "jRemoveClass"]("og-no-zoom");
                    this.node[O === "magnifier" ? "jAddClass" : "jRemoveClass"]("og-magnifier-zoom");
                    this.zoomBox.node[O === "magnifier" ? "jAddClass" : "jRemoveClass"]("og-magnifier");
                    this.zoomBox.node[O === "preview" ? "jAddClass" : "jRemoveClass"]("og-preview");
                    if (O !== "zoom") {
                        this.node.jRemoveClass("og-inner-zoom");
                        this.zoomBox.node.jRemoveClass("og-inner")
                    }
                    this.zoomBox.mode = O;
                    if (O === false) {
                        this.zoomBox.enable(false)
                    }
                }).jBind(this)
            };
            this.zoomBox.node.append(this.zoomBox.image);
            this.zoomBox.setMode(this.option("zoomMode"));
            this.zoomBox.image.removeAttribute("width");
            this.zoomBox.image.removeAttribute("height");
            
            if ((K = ("" + this.option("zoomWidth")).match(/^([0-9]+)?(px|%)?$/))) {
                this.zoomBox.size.wunits = K[2] || "px";
                this.zoomBox.size.width = (parseFloat(K[1]) || "auto")
            }
            if ((K = ("" + this.option("zoomHeight")).match(/^([0-9]+)?(px|%)?$/))) {
                this.zoomBox.size.hunits = K[2] || "px";
                this.zoomBox.size.height = (parseFloat(K[1]) || "auto")
            }
            if (this.zoomBox.mode === "magnifier") {
                this.node.jAddClass("og-magnifier-zoom");
                this.zoomBox.node.jAddClass("og-magnifier");
                if (this.zoomBox.size.width === "auto") {
                    this.zoomBox.size.wunits = "%";
                    this.zoomBox.size.width = 70
                }
                if (this.zoomBox.size.height === "auto") {
                    this.zoomBox.size.hunits = "%"
                }
            } else {
                if (this.option("zoom-position").match(/^#/)) {
                    if (this.zoomBox.custom = i(this.option("zoom-position").replace(/^#/, ""))) {
                        if (i(this.zoomBox.custom).jGetSize().height > 50) {
                            if (this.zoomBox.size.width === "auto") {
                                this.zoomBox.size.wunits = "%";
                                this.zoomBox.size.width = 100
                            }
                            if (this.zoomBox.size.height === "auto") {
                                this.zoomBox.size.hunits = "%";
                                this.zoomBox.size.height = 100
                            }
                        }
                    } else {
                        this.option("zoom-position", "right")
                    }
                }
                if (this.zoomBox.mode === "preview") {
                    if (this.zoomBox.size.width === "auto") {
                        this.zoomBox.size.wunits = "px"
                    }
                    if (this.zoomBox.size.height === "auto") {
                        this.zoomBox.size.hunits = "px"
                    }
                }
                if (this.zoomBox.mode === "zoom") {
                    if (this.zoomBox.size.width === "auto" || this.option("zoom-position") === "inner") {
                        this.zoomBox.size.wunits = "%";
                        this.zoomBox.size.width = 100
                    }
                    if (this.zoomBox.size.height === "auto" || this.option("zoom-position") === "inner") {
                        this.zoomBox.size.hunits = "%";
                        this.zoomBox.size.height = 100
                    }
                }
                if (this.option("zoom-position") === "inner") {
                    this.node.jAddClass("og-inner-zoom")
                }
            }
            this.zoomBox.position = this.zoomBox.custom ? "custom" : this.option("zoom-position");
            this.lens.border.x = parseFloat(this.lens.node.jGetCss("border-left-width") || "0");
            this.lens.border.y = parseFloat(this.lens.node.jGetCss("border-top-width") || "0");
            this.image.loadSmall(function() {
                if (this.image.small.state !== 2) {
                    return
                }
                this.image.setCurNode("small");
                this.size = this.image.node.jGetSize();
                this.registerEvents();
                this.ready = true;
                if (this.option("lazyZoom") === true) {
                    u("onZoomReady", this.id);
                    if (A.browser.mobile) {
                        this.reflowZoom()
                    } else {
                        this.showHint()
                    }
                }
            }.jBind(this));
            if (this.option("lazyZoom") !== true || this.option("zoomOn") === "always") {
                this.image.load(i(function(O) {
                    this.setupZoom(O, true)
                }).jBind(this));
                this.loadTimer = i(this.showLoading).jBind(this).jDelay(400)
            }
            this.setupSelectors()
        },
        stop: function() {
            clearTimeout(this.startTimer);
            this.unregisterEvents();
            if (this.zoomBox) {
                this.zoomBox.node.kill()
            }
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                this.expandThumbs = null
            }
            if (this.expandBox) {
                this.expandBox.kill()
            }
            if (this.expanded) {
                i(A.browser.getDoc()).jSetCss({
                    overflow: ""
                })
            }
            i(this.additionalImages).jEach(function(J) {
                i(J.origin).jRemoveClass("og-thumb-selected").jRemoveClass(this.option("cssClass") || "og-$dummy-css-class-to-jRemove$")
            }, this);
            if (this.originalImg) {
                this.placeholder.append(this.originalImg);
                if (this.originalImgSrc) {
                    this.originalImg.setAttribute("src", this.originalImgSrc)
                }
            }
            if (this.originalTitle) {
                this.placeholder.setAttribute("title", this.originalTitle)
            }
            if (this.node) {
                this.node.kill()
            }
        },
        setupZoom: function(K, L) {
            var J = this.image;
            if (K.zoom.state !== 2) {
                this.image = K;
                this.ready = true;
                this.zoomBox.enable(false);
                return
            }
            this.image = K;
            this.image.setCurNode(this.expanded ? "zoom" : "small");
            this.zoomBox.image.src = this.image.getURL("zoom");
            this.zoomBox.node.jRemoveClass("og-preview");
            this.zoomBox.image.getAttribute("style");
            this.zoomBox.image.removeAttribute("style");
            this.zoomBox.node.jGetSize();
            setTimeout(i(function() {
                var N = this.zoomBox.image.jGetSize(),
                    M;
                this.zoomSizeOrigin = this.image.jGetSize("zoom");
                if (N.width * N.height > 1 && N.width * N.height < this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) {
                    this.zoomSizeOrigin = N
                }
                this.zoomSize = A.detach(this.zoomSizeOrigin);
                if (this.zoomBox.mode === "preview") {
                    this.zoomBox.node.jAddClass("og-preview")
                }
                this.setCaption();
                this.lens.image.src = this.image.node.currentSrc || this.image.node.src;
                this.zoomBox.enable(this.zoomBox.mode && !(this.expanded && this.zoomBox.mode === "preview"));
                this.ready = true;
                this.activateTimer = null;
                this.resizeCallback();
                this.node.jAddClass("og-ready");
                this.hideLoading();
                if (J !== this.image) {
                    u("onUpdate", this.id, J.origin, this.image.origin);
                    if (this.nextImage) {
                        M = this.nextImage;
                        this.nextImage = null;
                        this.update(M.image, M.onswipe)
                    }
                } else {
                    if (!!L) {
                        u("onZoomReady", this.id)
                    }
                }
                if (this.initEvent) {
                    this.node.jCallEvent(this.initEvent.type, this.initEvent)
                } else {
                    if (this.expanded && this.option("expandZoomOn") === "always") {
                        this.activate()
                    } else {
                        if (!!L) {
                            this.showHint()
                        }
                    }
                }
            }).jBind(this), 256)
        },
        setupSelectors: function() {
            var K = this.id;
            var J;
            var L;
            L = new RegExp("zoom\\-id(\\s+)?:(\\s+)?" + K + "($|;)");
            if (A.browser.features.query) {
                J = A.$A(document.querySelectorAll('[data-zoom-id="' + this.id + '"]'));
                J = i(J).concat(A.$A(document.querySelectorAll('[rel*="zoom-id"]')).filter(function(M) {
                    return L.test(M.getAttribute("rel") || "")
                }))
            } else {
                J = A.$A(document.getElementsByTagName("A")).filter(function(M) {
                    return K === M.getAttribute("data-zoom-id") || L.test(M.getAttribute("rel") || "")
                })
            }
            i(J).jEach(function(N) {
                var M, O;
                i(N).jAddEvent("click", function(P) {
                    P.stopDefaults()
                });
                M = new l().parseNode(N, this.originalTitle);
                if (this.image.zoom.src.has(M.zoom.src) && this.image.small.src.has(M.small.src)) {
                    i(M.origin).jAddClass("og-thumb-selected");
                    M = this.image;
                    M.origin = N
                }
                if (!M.link && this.image.link) {
                    M.link = this.image.link
                }
                O = i(function() {
                    this.update(M)
                }).jBind(this);
                i(N).jAddEvent("mousedown", function(P) {
                    if ("stopImmediatePropagation" in P) {
                        P.stopImmediatePropagation()
                    }
                }, 5);
                i(N).jAddEvent("tap " + (this.option("selectorTrigger") === "hover" ? "mouseover mouseout" : "btnclick"), i(function(Q, P) {
                    if (this.updateTimer) {
                        clearTimeout(this.updateTimer)
                    }
                    this.updateTimer = false;
                    if (Q.type === "mouseover") {
                        this.updateTimer = i(O).jDelay(P)
                    } else {
                        if (Q.type === "tap" || Q.type === "btnclick") {
                            O()
                        }
                    }
                }).jBindAsEvent(this, 60)).jAddClass(this.option("cssClass")).jAddClass("og-thumb");
                M.loadSmall();
                if (this.option("lazyZoom") !== true) {
                    M.loadZoom()
                }
                this.additionalImages.push(M)
            }, this)
        },
        update: function(J, K) {
            if (!this.ready) {
                this.nextImage = {
                    image: J,
                    onswipe: K
                };
                return
            }
            if (!J || J === this.image) {
                return false
            }
            this.deactivate(null, true);
            this.ready = false;
            this.node.jRemoveClass("og-ready");
            this.loadTimer = i(this.showLoading).jBind(this).jDelay(400);
            J.load(i(function(R) {
                var L, S, Q, N, M, P, O = (A.browser.ieMode < 10) ? "jGetSize" : "getBoundingClientRect";
                this.hideLoading();
                R.setCurNode("small");
                if (!R.node) {
                    this.ready = true;
                    this.node.jAddClass("og-ready");
                    return
                }
                this.setActiveThumb(R);
                L = this.image.node[O]();
                if (this.expanded) {
                    R.setCurNode("zoom");
                    Q = A.$new("div").jAddClass("og-expand-bg");
                    if (A.browser.features.cssFilters || A.browser.ieMode < 10) {
                        Q.append(A.$new("img", {
                            src: R.getURL("zoom")
                        }).jSetCss({
                            opacity: 0
                        }))
                    } else {
                        Q.append(new A.SVGImage(R.node).blur(b).getNode().jSetCss({
                            opacity: 0
                        }))
                    }
                    i(Q).jSetCss({
                        "z-index": -99
                    }).jAppendTo(this.expandBox)
                }
                if (this.expanded && this.zoomBox.mode === "zoom" && this.option("expandZoomOn") === "always") {
                    i(R.node).jSetCss({
                        opacity: 0
                    }).jAppendTo(this.node);
                    S = L;
                    M = [R.node, this.image.node];
                    P = [{
                        opacity: [0, 1]
                    }, {
                        opacity: [1, 0]
                    }];
                    i(R.node).jSetCss({
                        "max-width": Math.min(R.jGetSize("zoom").width, this.expandMaxWidth()),
                        "max-height": Math.min(R.jGetSize("zoom").height, this.expandMaxHeight())
                    })
                } else {
                    this.node.jSetCss({
                        height: this.node[O]().height
                    });
                    this.image.node.jSetCss({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        "max-width": "",
                        "max-height": ""
                    });
                    i(R.node).jSetCss({
                        "max-width": Math.min(R.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                        "max-height": Math.min(R.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity),
                        position: "relative",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        transform: ""
                    }).jAppendTo(this.node);
                    S = i(R.node)[O]();
                    if (!K) {
                        i(R.node).jSetCss({
                            "min-width": L.width,
                            height: L.height,
                            "max-width": L.width,
                            "max-height": ""
                        })
                    }
                    this.node.jSetCss({
                        height: "",
                        overflow: ""
                    }).jGetSize();
                    i(R.node).jGetSize();
                    M = [R.node, this.image.node];
                    P = [A.extend({
                        opacity: [0, 1]
                    }, K ? {
                        scale: [0.6, 1]
                    } : {
                        "min-width": [L.width, S.width],
                        "max-width": [L.width, S.width],
                        height: [L.height, S.height]
                    }), {
                        opacity: [1, 0]
                    }]
                }
                if (this.expanded) {
                    if (this.expandBg.firstChild && Q.firstChild) {
                        N = i(this.expandBg.firstChild).jGetCss("opacity");
                        if (A.browser.gecko) {
                            M = M.concat([Q.firstChild]);
                            P = P.concat([{
                                opacity: [0.0001, N]
                            }])
                        } else {
                            M = M.concat([Q.firstChild, this.expandBg.firstChild]);
                            P = P.concat([{
                                opacity: [0.0001, N]
                            }, {
                                opacity: [N, 0.0001]
                            }])
                        }
                    }
                }
                new A.PFX(M, {
                    duration: (K || this.option("transitionEffect")) ? K ? 400 : 350 : 0,
                    transition: K ? "cubic-bezier(0.175, 0.885, 0.320, 1)" : (L.width === S.width) ? "linear" : "cubic-bezier(0.25, .1, .1, 1)",
                    onComplete: i(function() {
                        this.image.node.jRemove().getAttribute("style");
                        this.image.node.removeAttribute("style");
                        i(R.node).jSetCss(this.expanded ? {
                            width: "auto",
                            height: "auto"
                        } : {
                            width: "",
                            height: ""
                        }).jSetCss({
                            "min-width": "",
                            "min-height": "",
                            opacity: "",
                            "max-width": Math.min(R.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                            "max-height": Math.min(R.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity)
                        });
                        if (this.expanded) {
                            this.expandBg.jRemove();
                            this.expandBg = undefined;
                            this.expandBg = Q.jSetCssProp("z-index", -100);
                            i(this.expandBg.firstChild).jSetCss({
                                opacity: ""
                            });
                            if (this.expandCaption) {
                                if (R.caption) {
                                    if (R.link) {
                                        this.expandCaption.changeContent("").append(A.$new("a", {
                                            href: R.link
                                        }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(R.caption))
                                    } else {
                                        this.expandCaption.changeContent(R.caption).jAddClass("og-show")
                                    }
                                } else {
                                    this.expandCaption.jRemoveClass("og-show")
                                }
                            }
                        }
                        this.setupZoom(R)
                    }).jBind(this),
                    onBeforeRender: i(function(T, U) {
                        if (undefined !== T.scale) {
                            U.jSetCssProp("transform", "scale(" + T.scale + ")")
                        }
                    })
                }).start(P)
            }).jBind(this))
        },
        setActiveThumb: function(K) {
            var J = false;
            i(this.additionalImages).jEach(function(L) {
                i(L.origin).jRemoveClass("og-thumb-selected");
                if (L === K) {
                    J = true
                }
            });
            if (J && K.origin) {
                i(K.origin).jAddClass("og-thumb-selected")
            }
            if (this.expandThumbs) {
                this.expandThumbs.selectItem(K.selector)
            }
        },
        setCaption: function(J) {
            if (this.image.caption && this.option("zoomCaption") !== "off" && this.zoomBox.mode !== "magnifier") {
                if (!this.zoomBox.caption) {
                    this.zoomBox.caption = A.$new("div", {
                        "class": "og-caption"
                    }).jAppendTo(this.zoomBox.node.jAddClass("caption-" + this.option("zoomCaption")))
                }
                this.zoomBox.caption.changeContent(this.image.caption)
            }
        },
        showHint: function(J, M, K) {
            var L;
            if (!this.expanded) {
                if (this.hintRuns <= 0) {
                    return
                }
                if (K !== true) {
                    this.hintRuns--
                }
            }
            if (M === undefined || M === null) {
                if (!this.zoomBox.active && !this.zoomBox.activating) {
                    if (this.option("zoomMode") && (this.zoomBox.enabled || !this.image.loaded()) && !(A.browser.mobile && this.option("expand") && this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner")) {
                        if (this.zoomBox.trigger === "hover") {
                            M = this.option("textHoverZoomHint")
                        } else {
                            if (this.zoomBox.trigger === "click") {
                                M = this.option("textClickZoomHint")
                            }
                        }
                    } else {
                        M = this.option("expand") ? this.option("textExpandHint") : ""
                    }
                } else {
                    M = this.option("expand") ? this.option("textExpandHint") : ""
                }
            }
            if (!M) {
                this.hideHint();
                return
            }
            L = this.node;
            if (!this.hint) {
                this.hint = A.$new("div", {
                    "class": "og-hint"
                });
                this.hintMessage = A.$new("span", {
                    "class": "og-hint-message"
                }).append(document.createTextNode(M)).jAppendTo(this.hint);
                i(this.hint).jAppendTo(this.node)
            } else {
                i(this.hintMessage).changeContent(M)
            }
            this.hint.jSetCss({
                "transition-delay": ""
            }).jRemoveClass("og-hint-hidden");
            if (this.expanded) {
                L = this.expandFigure
            } else {
                if ((this.zoomBox.active || this.zoomBox.activating) && this.zoomBox.mode !== "magnifier" && this.zoomBox.position === "inner") {
                    L = this.zoomBox.node
                }
            }
            if (J === true) {
                setTimeout(i(function() {
                    this.hint.jAddClass("og-hint-hidden")
                }).jBind(this), 16)
            }
            this.hint.jAppendTo(L)
        },
        hideHint: function() {
            if (this.hint) {
                this.hint.jSetCss({
                    "transition-delay": "0ms"
                }).jAddClass("og-hint-hidden")
            }
        },
        showLoading: function() {
            if (!this.loadingBox) {
                this.loadingBox = A.$new("div", {
                    "class": "og-loading"
                });
                this.node.append(this.loadingBox);
                this.loadingBox.jGetSize()
            }
            this.loadingBox.jAddClass("shown")
        },
        hideLoading: function() {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
            if (this.loadingBox) {
                i(this.loadingBox).jRemoveClass("shown")
            }
        },
        setSize: function(L, P) {
            var O = A.detach(this.zoomBox.size),
                N = (!this.expanded && this.zoomBox.custom) ? i(this.zoomBox.custom).jGetSize() : {
                    width: 0,
                    height: 0
                },
                K, J, M = this.size,
                Q = {
                    x: 0,
                    y: 0
                };
            P = P || this.zoomBox.position;
            this.normalSize = this.image.node.jGetSize();
            this.size = this.image.node.jGetSize();
            this.boundaries = this.image.node.getBoundingClientRect();
            if (!N.height) {
                N = this.size
            }
            if (this.option("upscale") === false || this.zoomBox.mode === false || this.zoomBox.mode === "preview") {
                L = false
            }
            if (this.zoomBox.mode === "preview") {
                if (O.width === "auto") {
                    O.width = this.zoomSizeOrigin.width
                }
                if (O.height === "auto") {
                    O.height = this.zoomSizeOrigin.height
                }
            }
            if (this.expanded && this.zoomBox.mode === "magnifier") {
                O.width = 70;
                O.height = "auto"
            }
            if (this.zoomBox.mode === "magnifier" && O.height === "auto") {
                this.zoomBox.width = parseFloat(O.width / 100) * Math.min(N.width, N.height);
                this.zoomBox.height = this.zoomBox.width
            } else {
                if (this.zoomBox.mode === "zoom" && P === "inner") {
                    this.size = this.node.jGetSize();
                    N = this.size;
                    this.boundaries = this.node.getBoundingClientRect();
                    this.zoomBox.width = N.width;
                    this.zoomBox.height = N.height
                } else {
                    this.zoomBox.width = (O.wunits === "%") ? parseFloat(O.width / 100) * N.width : parseInt(O.width);
                    this.zoomBox.height = (O.hunits === "%") ? parseFloat(O.height / 100) * N.height : parseInt(O.height)
                }
            }
            if (this.zoomBox.mode === "preview") {
                J = Math.min(Math.min(this.zoomBox.width / this.zoomSizeOrigin.width, this.zoomBox.height / this.zoomSizeOrigin.height), 1);
                this.zoomBox.width = this.zoomSizeOrigin.width * J;
                this.zoomBox.height = this.zoomSizeOrigin.height * J
            }
            this.zoomBox.width = Math.ceil(this.zoomBox.width);
            this.zoomBox.height = Math.ceil(this.zoomBox.height);
            this.zoomBox.aspectRatio = this.zoomBox.width / this.zoomBox.height;
            this.zoomBox.node.jSetCss({
                width: this.zoomBox.width,
                height: this.zoomBox.height
            });
            if (L) {
                N = this.expanded ? this.expandBox.jGetSize() : this.zoomBox.node.jGetSize();
                if (!this.expanded && (this.normalSize.width * this.normalSize.height) / (this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) > 0.8) {
                    this.zoomSize.width = 1.5 * this.zoomSizeOrigin.width;
                    this.zoomSize.height = 1.5 * this.zoomSizeOrigin.height
                } else {
                    this.zoomSize = A.detach(this.zoomSizeOrigin)
                }
            }
            if (this.zoomBox.mode !== false && !this.zoomBox.active && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if ((this.normalSize.width * this.normalSize.height) / (this.zoomSize.width * this.zoomSize.height) > 0.8) {
                    this.zoomSize = A.detach(this.zoomSizeOrigin);
                    this.zoomBox.enable(false)
                } else {
                    this.zoomBox.enable(true)
                }
            }
            this.zoomBox.image.jSetCss({
                width: this.zoomSize.width,
                height: this.zoomSize.height
            });
            K = this.zoomBox.node.getInnerSize();
            this.zoomBox.innerWidth = Math.ceil(K.width);
            this.zoomBox.innerHeight = Math.ceil(K.height);
            this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
            this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
            this.lens.node.jSetCss({
                width: this.lens.width,
                height: this.lens.height
            });
            this.lens.image.jSetCss(this.size);
            A.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                if (this.lens.innertouch) {
                    this.lens.pos.x *= (this.size.width / M.width);
                    this.lens.pos.y *= (this.size.height / M.height);
                    Q.x = this.lens.spos.x;
                    Q.y = this.lens.spos.y
                } else {
                    Q.x = this.boundaries.left + this.lens.width / 2 + (this.lens.pos.x * (this.size.width / M.width));
                    Q.y = this.boundaries.top + this.lens.height / 2 + (this.lens.pos.y * (this.size.height / M.height))
                }
                this.animate(null, Q)
            }
        },
        reflowZoom: function(N) {
            var Q;
            var P;
            var J;
            var O;
            var M;
            var L;
            var K = i(this.node).jFetch("cr");
            J = a(5);
            M = this.zoomBox.position;
            O = this.expanded ? "inner" : this.zoomBox.custom ? "custom" : this.option("zoom-position");
            L = this.expanded && this.zoomBox.mode === "zoom" ? this.expandBox : document.body;
            if (this.expanded) {
                J.y = 0;
                J.x = 0
            }
            if (!N) {
                this.setSize(true, O)
            }
            Q = this.boundaries.top;
            if (this.zoomBox.mode !== "magnifier") {
                if (N) {
                    this.setSize(false);
                    return
                }
                switch (O) {
                    case "inner":
                    case "custom":
                        Q = 0;
                        P = 0;
                        break;
                    case "top":
                        Q = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                        if (J.top > Q) {
                            Q = this.boundaries.bottom + this.option("zoom-distance");
                            O = "bottom"
                        }
                        P = this.boundaries.left;
                        break;
                    case "bottom":
                        Q = this.boundaries.bottom + this.option("zoom-distance");
                        if (J.bottom < Q + this.zoomBox.height) {
                            Q = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                            O = "top"
                        }
                        P = this.boundaries.left;
                        break;
                    case "left":
                        P = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                        if (J.left > P && J.right >= this.boundaries.right + this.option("zoom-distance") + this.zoomBox.width) {
                            P = this.boundaries.right + this.option("zoom-distance");
                            O = "right"
                        }
                        break;
                    case "right":
                    default:
                        P = this.boundaries.right + this.option("zoom-distance");
                        if (J.right < P + this.zoomBox.width && J.left <= this.boundaries.left - this.zoomBox.width - this.option("zoom-distance")) {
                            P = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                            O = "left"
                        }
                        break
                }
                switch (this.option("zoom-position")) {
                    case "top":
                    case "bottom":
                        if (J.top > Q || J.bottom < Q + this.zoomBox.height) {
                            O = "inner"
                        }
                        break;
                    case "left":
                    case "right":
                        if (J.left > P || J.right < P + this.zoomBox.width) {
                            O = "inner"
                        }
                        break;
                    default:
                }
                this.zoomBox.position = O;
                if (!this.zoomBox.activating && !this.zoomBox.active) {
                    if (A.browser.mobile && !this.expanded && this.zoomBox.mode === "zoom") {
                        if (this.option("expand")) {
                            this.zoomBox.enable(O !== "inner")
                        } else {
                            if (this.option("zoomOn") !== "click") {
                                this.zoomBox.trigger = O === "inner" ? "click" : this.option("zoomOn");
                                this.unregisterActivateEvent();
                                this.unregisterDeactivateEvent();
                                this.registerActivateEvent(this.zoomBox.trigger === "click");
                                this.registerDeactivateEvent(this.zoomBox.trigger === "click" && !this.option("expand"))
                            }
                        }
                        this.showHint(false, null, true)
                    }
                    return
                }
                this.setSize(false);
                if (N) {
                    return
                }
                if (O === "custom") {
                    L = this.zoomBox.custom;
                    J.y = 0;
                    J.x = 0
                }
                if (O === "inner") {
                    if (this.zoomBox.mode !== "preview") {
                        this.zoomBox.node.jAddClass("og-inner");
                        this.node.jAddClass("og-inner-zoom")
                    }
                    this.lens.hide();
                    Q = this.boundaries.top + J.y;
                    P = this.boundaries.left + J.x;
                    if (!this.expanded && A.browser.ieMode && A.browser.ieMode < 11) {
                        Q = 0;
                        P = 0;
                        L = this.node
                    }
                } else {
                    Q += J.y;
                    P += J.x;
                    this.node.jRemoveClass("og-inner-zoom");
                    this.zoomBox.node.jRemoveClass("og-inner")
                    if (! $(".og-expand-controls").hasClass("og-visible")) {
                        Q=$(".app-figure").offset().top-110+"px";
                    }
                }
                this.zoomBox.node.jSetCss({
                    top: Q,
                    left: P
                })
            } else {
                this.setSize(false);
                L = this.node
            }
            this.zoomBox.node[this.expanded ? "jAddClass" : "jRemoveClass"]("og-expanded");
            if (!this.expanded && K) {
                K.jAppendTo(this.zoomBox.mode === "zoom" && O === "inner" ? this.zoomBox.node : this.node, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom")
            }
            this.zoomBox.node.jAppendTo(L)
        },
        changeZoomLevel: function(P) {
            var L;
            var J;
            var N;
            var M;
            var O = false;
            var K = P.isMouse ? 5 : 3 / 54;
            i(P).stop();
            K = (100 + K * Math.abs(P.deltaY)) / 100;
            if (P.deltaY < 0) {
                K = 1 / K
            }
            if (this.zoomBox.mode === "magnifier") {
                J = Math.max(100, Math.round(this.zoomBox.width * K));
                J = Math.min(J, this.size.width * 0.9);
                N = J / this.zoomBox.aspectRatio;
                this.zoomBox.width = Math.ceil(J);
                this.zoomBox.height = Math.ceil(N);
                this.zoomBox.node.jSetCss({
                    width: this.zoomBox.width,
                    height: this.zoomBox.height
                });
                L = this.zoomBox.node.getInnerSize();
                this.zoomBox.innerWidth = Math.ceil(L.width);
                this.zoomBox.innerHeight = Math.ceil(L.height);
                O = true
            } else {
                if (!this.expanded && this.zoomBox.mode === "zoom") {
                    J = Math.max(50, Math.round(this.lens.width * K));
                    J = Math.min(J, this.size.width * 0.9);
                    N = J / this.zoomBox.aspectRatio;
                    this.zoomSize.width = Math.ceil((this.zoomBox.innerWidth / J) * this.size.width);
                    this.zoomSize.height = Math.ceil((this.zoomBox.innerHeight / N) * this.size.height);
                    this.zoomBox.image.jSetCss({
                        width: this.zoomSize.width,
                        height: this.zoomSize.height
                    })
                } else {
                    return
                }
            }
            M = i(window).jGetScroll();
            this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
            this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
            this.lens.node.jSetCss({
                width: this.lens.width,
                height: this.lens.height
            });
            A.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                if (O) {
                    this.moveTimer = true
                }
                this.animate(null, {
                    x: P.x - M.x,
                    y: P.y - M.y
                });
                if (O) {
                    this.moveTimer = null
                }
            }
        },
        registerActivateEvent: function(L) {
            var K;
            var J = L ? "dbltap btnclick" : "touchstart" + (window.navigator.pointerEnabled ? " pointerdown" : window.navigator.msPointerEnabled ? " MSPointerDown" : "") + (window.navigator.pointerEnabled ? " pointermove" : window.navigator.msPointerEnabled ? " MSPointerMove" : " mousemove");
            var M = this.node.jFetch("og:handlers:activate:fn", (!L) ? i(function(N) {
                if (c(N) && !h(N)) {
                    return
                }
                if (N && N.pointerType === "touch" && N.type !== "pointerdown") {
                    return
                }
                K = (A.browser.ieMode < 9) ? A.extend({}, N) : N;
                if (!this.activateTimer) {
                    clearTimeout(this.activateTimer);
                    this.activateTimer = setTimeout(i(function() {
                        this.activate(K)
                    }).jBind(this), 120)
                }
            }).jBindAsEvent(this) : i(this.activate).jBindAsEvent(this));
            this.node.jStore("og:handlers:activate:event", J).jAddEvent(J, M, 10)
        },
        unregisterActivateEvent: function() {
            var J = this.node.jFetch("og:handlers:activate:event");
            var K = this.node.jFetch("og:handlers:activate:fn");
            this.node.jRemoveEvent(J, K);
            this.node.jDel("og:handlers:activate:fn")
        },
        registerDeactivateEvent: function(K) {
            var J = K ? "dbltap btnclick" : "touchend" + (window.navigator.pointerEnabled ? " pointerup pointerout pointermove" : window.navigator.msPointerEnabled ? " MSPointerUp MSPointerOut MSPointerMove" : " mouseout mousemove");
            var L = this.node.jFetch("og:handlers:deactivate:fn", i(function(N) {
                if (c(N) && !h(N)) {
                    return
                }
                if (N && N.type === "pointerup" && N.pointerType !== "touch") {
                    return
                }
                if (N && (N.type === "pointermove" || N.type === "MSPointerMove" || N.type === "mousemove")) {
                    if (!this.ready || !this.zoomBox.enabled || !this.zoomBox.active) {
                        return
                    }
                    var M = N.getClientXY();
                    if (M.x < this.boundaries.left || M.x > this.boundaries.right || M.y < this.boundaries.top || M.y > this.boundaries.bottom) {
                        this.deactivate(N);
                        return
                    }
                } else {
                    if (this.zoomBox.node !== N.getRelated() && !((this.zoomBox.position === "inner" || this.zoomBox.mode === "magnifier") && this.zoomBox.node.hasChild(N.getRelated())) && !this.node.hasChild(N.getRelated())) {
                        this.deactivate(N);
                        return
                    }
                }
            }).jBindAsEvent(this));
            this.node.jStore("og:handlers:deactivate:event", J).jAddEvent(J, L, 20)
        },
        unregisterDeactivateEvent: function() {
            var J = this.node.jFetch("og:handlers:deactivate:event");
            var K = this.node.jFetch("og:handlers:deactivate:fn");
            this.node.jRemoveEvent(J, K);
            this.node.jDel("og:handlers:deactivate:fn")
        },
        registerEvents: function() {
            this.moveBind = this.move.jBind(this);
            this.node.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], i(function(J) {
                if ((A.browser.androidBrowser || A.browser.platform === "android" && A.browser.gecko) && this.option("zoomMode") && this.option("zoomOn") !== "click" && J.type === "touchstart") {
                    J.stopDefaults();
                    if (A.browser.gecko) {
                        J.stopDistribution()
                    }
                }
                if (!this.zoomBox.active) {
                    return
                }
                if (this.zoomBox.position === "inner") {
                    this.lens.spos = J.getClientXY()
                }
            }).jBindAsEvent(this), 10);
            this.node.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], i(function(J) {
                if (c(J) && h(J)) {
                    this.lens.touchmovement = false
                }
            }).jBindAsEvent(this), 10);
            this.node.jAddEvent("touchmove " + (A.browser.platform === "android" ? "" : window.navigator.pointerEnabled ? "pointermove" : window.navigator.msPointerEnabled ? "MSPointerMove" : "mousemove"), i(this.animate).jBindAsEvent(this));
            if (this.option("zoomMode")) {
                this.registerActivateEvent(this.option("zoomOn") === "click");
                this.registerDeactivateEvent(this.option("zoomOn") === "click" && !this.option("expand"))
            }
            this.node.jAddEvent("mousedown", function(J) {
                J.stopDistribution()
            }, 10).jAddEvent("btnclick", i(function(J) {
                this.node.jRaiseEvent("MouseEvent", "click");
                if (this.expanded) {
                    this.expandBox.jCallEvent("btnclick", J)
                }
            }).jBind(this), 15);
            if (this.option("expand")) {
                this.node.jAddEvent("tap btnclick", i(this.expand).jBindAsEvent(this), 15)
            } else {
                this.node.jAddEvent("tap btnclick", i(this.openLink).jBindAsEvent(this), 15)
            }
            if (this.additionalImages.length > 1) {
                this.swipe()
            }
            if (!A.browser.mobile && this.option("variableZoom")) {
                this.node.jAddEvent("mousescroll", this.changeZoomLevel.jBindAsEvent(this))
            }
            i(window).jAddEvent(A.browser.mobile ? "resize" : "resize scroll", this.onResize)
        },
        unregisterEvents: function() {
            if (this.node) {
                this.node.jRemoveEvent("mousescroll")
            }
            i(window).jRemoveEvent("resize scroll", this.onResize);
            i(this.additionalImages).jEach(function(J) {
                i(J.origin).jClearEvents()
            })
        },
        activate: function(P) {
            var Q;
            var O;
            var M;
            var N;
            var J;
            var K = 0;
            var L = 0;
            if (!this.image.loaded() || !this.ready || !this.zoomBox.enabled || this.zoomBox.active || this.zoomBox.activating) {
                if (!this.image.loaded() && !this.initEvent) {
                    if (P) {
                        this.initEvent = e(P);
                        P.stopQueue()
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = i(this.showLoading).jBind(this).jDelay(400)
                    }
                }
                return
            }
            if (P && P.type === "pointermove" && P.pointerType === "touch") {
                return
            }
            if (!this.option("zoomMode") && this.option("expand") && !this.expanded) {
                this.zoomBox.active = true;
                return
            }
            this.zoomBox.activating = true;
            if (this.expanded && this.zoomBox.mode === "zoom") {
                N = this.image.node.jGetRect();
                this.expandStage.jAddClass("og-zoom-in");
                J = this.expandFigure.jGetRect();
                L = ((N.left + N.right) / 2 - (J.left + J.right) / 2);
                K = ((N.top + N.bottom) / 2 - (J.top + J.bottom) / 2)
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("og-deactivating").jRemoveEvent("transitionend");
            this.zoomBox.node.jAddClass("og-activating");
            this.node.jAddClass("og-activating");
            this.reflowZoom();
            O = (this.zoomBox.mode === "zoom") ? this.zoomBox.position : this.zoomBox.mode;
            if (A.browser.features.transition && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if (O === "inner") {
                    M = this.image.node.jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform: "translate3d(0," + K + "px, 0) scale(" + M.width / this.zoomSize.width + ", " + M.height / this.zoomSize.height + ")"
                    }).jGetSize();
                    this.zoomBox.image.jAddEvent("transitionend", i(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("og-activating og-p-" + O);
                        this.zoomBox.activating = false;
                        this.zoomBox.active = true
                    }).jBind(this));
                    this.zoomBox.node.jAddClass("og-p-" + O).jGetSize();
                    if (!A.browser.mobile && A.browser.chrome && (A.browser.uaName === "chrome" || A.browser.uaName === "opera")) {
                        this.zoomBox.activating = false;
                        this.zoomBox.active = true
                    }
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", i(function() {
                        this.zoomBox.node.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("og-activating og-p-" + O)
                    }).jBind(this));
                    this.zoomBox.node.jSetCss({
                        transition: "none"
                    });
                    this.zoomBox.node.jAddClass("og-p-" + O).jGetSize();
                    this.zoomBox.node.jSetCss({
                        transition: ""
                    }).jGetSize();
                    this.zoomBox.node.jRemoveClass("og-p-" + O);
                    this.zoomBox.activating = false;
                    this.zoomBox.active = true
                }
            } else {
                this.zoomBox.node.jRemoveClass("og-activating");
                this.zoomBox.activating = false;
                this.zoomBox.active = true
            }
            if (!this.expanded) {
                this.showHint(true)
            }
            if (P) {
                P.stop().stopQueue();
                Q = P.getClientXY();
                if (this.zoomBox.mode === "magnifier" && (/tap/i).test(P.type)) {
                    Q.y -= this.zoomBox.height / 2 + 10
                }
                if (O === "inner" && ((/tap/i).test(P.type) || c(P))) {
                    this.lens.pos = {
                        x: 0,
                        y: 0
                    };
                    Q.x = -(Q.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    Q.y = -(Q.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
                }
            } else {
                Q = {
                    x: this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2,
                    y: this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2
                };
                if (A.browser.mobile && this.expanded && this.option("expandZoomOn") === "always") {
                    this.lens.innertouch = true;
                    this.lens.pos = {
                        x: 0,
                        y: 0
                    };
                    Q.x = -(Q.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    Q.y = -(Q.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
                }
            }
            this.node.jRemoveClass("og-activating").jAddClass("og-active");
            Q.x += -L;
            Q.y += -K;
            this.lens.spos = {
                x: 0,
                y: 0
            };
            this.lens.dx = 0;
            this.lens.dy = 0;
            this.animate(P, Q, true);
            u("onZoomIn", this.id)
        },
        deactivate: function(L, Q) {
            var O;
            var M;
            var J;
            var K;
            var N = 0;
            var P = 0;
            var R = this.zoomBox.active;
            this.initEvent = null;
            if (!this.ready) {
                return
            }
            if (L && L.type === "pointerout" && L.pointerType === "touch") {
                return
            }
            clearTimeout(this.moveTimer);
            this.moveTimer = null;
            clearTimeout(this.activateTimer);
            this.activateTimer = null;
            this.zoomBox.activating = false;
            this.zoomBox.active = false;
            if (Q !== true && !this.expanded) {
                if (R) {
                    if (A.browser.mobile && !this.expanded && this.zoomBox.mode === "zoom") {
                        this.reflowZoom()
                    } else {
                        this.showHint()
                    }
                }
            }
            if (!this.zoomBox.enabled) {
                return
            }
            if (L) {
                L.stop()
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("og-activating").jRemoveEvent("transitionend");
            if (this.expanded) {
                K = this.expandFigure.jGetRect();
                if (this.option("expandZoomOn") !== "always") {
                    this.expandStage.jRemoveClass("og-zoom-in")
                }
                this.image.node.jSetCss({
                    "max-height": this.expandMaxHeight()
                });
                J = this.image.node.jGetRect();
                P = ((J.left + J.right) / 2 - (K.left + K.right) / 2);
                N = ((J.top + J.bottom) / 2 - (K.top + K.bottom) / 2)
            }
            O = (this.zoomBox.mode === "zoom") ? this.zoomBox.position : this.zoomBox.mode;
            if (A.browser.features.transition && L && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if (O === "inner") {
                    this.zoomBox.image.jAddEvent("transitionend", i(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.node.jRemoveClass("og-active");
                        setTimeout(i(function() {
                            this.zoomBox.hide()
                        }).jBind(this), 32)
                    }).jBind(this));
                    M = this.image.node.jGetSize();
                    this.zoomBox.node.jAddClass("og-deactivating og-p-" + O).jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform: "translate3d(0," + N + "px,0) scale(" + M.width / this.zoomSize.width + ", " + M.height / this.zoomSize.height + ")"
                    })
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", i(function() {
                        this.zoomBox.hide();
                        this.node.jRemoveClass("og-active")
                    }).jBind(this));
                    this.zoomBox.node.jGetCss("opacity");
                    this.zoomBox.node.jAddClass("og-deactivating og-p-" + O);
                    this.node.jRemoveClass("og-active")
                }
            } else {
                this.zoomBox.hide();
                this.node.jRemoveClass("og-active")
            }
            this.lens.dx = 0;
            this.lens.dy = 0;
            this.lens.spos = {
                x: 0,
                y: 0
            };
            this.lens.hide();
            if (R) {
                u("onZoomOut", this.id)
            }
        },
        animate: function(T, S, R) {
            var L = S;
            var N;
            var M;
            var P = 0;
            var K;
            var O = 0;
            var J;
            var U;
            var Q = false;
            if (!this.zoomBox.active && !R) {
                return
            }
            if (T) {
                i(T).stopDefaults().stopDistribution();
                if (c(T) && !h(T)) {
                    return
                }
                Q = (/tap/i).test(T.type) || c(T);
                if (Q && !this.lens.touchmovement) {
                    this.lens.touchmovement = Q
                }
                if (!L) {
                    L = T.getClientXY()
                }
            }
            if (this.zoomBox.mode === "preview") {
                return
            }
            if (this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner" && (T && Q || !T && this.lens.innertouch)) {
                this.lens.innertouch = true;
                N = this.lens.pos.x + (L.x - this.lens.spos.x);
                M = this.lens.pos.y + (L.y - this.lens.spos.y);
                this.lens.spos = L;
                P = Math.min(0, this.zoomBox.innerWidth - this.zoomSize.width) / 2;
                K = -P;
                O = Math.min(0, this.zoomBox.innerHeight - this.zoomSize.height) / 2;
                J = -O
            } else {
                this.lens.innertouch = false;
                if (this.zoomBox.mode === "magnifier") {
                    L.y = Math.max(this.boundaries.top, Math.min(L.y, this.boundaries.bottom));
                    L.x = Math.max(this.boundaries.left, Math.min(L.x, this.boundaries.right))
                }
                N = L.x - this.boundaries.left;
                M = L.y - this.boundaries.top;
                K = this.size.width - this.lens.width;
                J = this.size.height - this.lens.height;
                N -= this.lens.width / 2;
                M -= this.lens.height / 2
            }
            if (this.zoomBox.mode !== "magnifier") {
                N = Math.max(P, Math.min(N, K));
                M = Math.max(O, Math.min(M, J))
            }
            this.lens.pos.x = N = Math.round(N);
            this.lens.pos.y = M = Math.round(M);
            if (this.zoomBox.mode === "zoom" && this.zoomBox.position !== "inner") {
                if (A.browser.features.transform) {
                    this.lens.node.jSetCss({
                        transform: "translate(" + this.lens.pos.x + "px," + this.lens.pos.y + "px)"
                    });
                    this.lens.image.jSetCss({
                        transform: "translate(" + -(this.lens.pos.x + this.lens.border.x) + "px, " + -(this.lens.pos.y + this.lens.border.y) + "px)"
                    })
                } else {
                    this.lens.node.jSetCss({
                        top: this.lens.pos.y,
                        left: this.lens.pos.x
                    });
                    this.lens.image.jSetCss({
                        top: -(this.lens.pos.y + this.lens.border.y),
                        left: -(this.lens.pos.x + this.lens.border.x)
                    })
                }
            }
            if (this.zoomBox.mode === "magnifier") {
                if (this.lens.touchmovement && !(T && T.type === "dbltap")) {
                    L.y -= this.zoomBox.height / 2 + 10
                }
                this.zoomBox.node.jSetCss({
                    top: L.y - this.boundaries.top - this.zoomBox.height / 2,
                    left: L.x - this.boundaries.left - this.zoomBox.width / 2
                })
            }
            if (!this.moveTimer) {
                this.lens.dx = 0;
                this.lens.dy = 0;
                this.move(1)
            }
        },
        move: function(M) {
            var L;
            var K;
            var J;
            var N;
            if (!isFinite(M)) {
                if (this.lens.innertouch) {
                    M = this.lens.touchmovement ? 0.4 : 0.16
                } else {
                    M = this.option("smoothing") ? 0.2 : this.lens.touchmovement ? 0.4 : 0.8
                }
            }
            L = ((this.lens.pos.x - this.lens.dx) * M);
            K = ((this.lens.pos.y - this.lens.dy) * M);
            this.lens.dx += L;
            this.lens.dy += K;
            if (!this.moveTimer || Math.abs(L) > 0.000001 || Math.abs(K) > 0.000001) {
                if (this.lens.innertouch) {
                    J = this.lens.dx;
                    N = this.lens.dy
                } else {
                    J = (this.lens.dx * (this.zoomSize.width / this.size.width) - Math.max(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2);
                    N = (this.lens.dy * (this.zoomSize.height / this.size.height) - Math.max(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2);
                    if (this.zoomBox.mode === "magnifier") {
                        J = Math.round(J);
                        N = Math.round(N)
                    }
                    J = -J;
                    N = -N
                }
                this.zoomBox.image.jSetCss(A.browser.features.transform ? {
                    transform: g + J + "px," + N + "px" + C + " scale(1)"
                } : {
                    left: -(this.lens.dx * (this.zoomSize.width / this.size.width) + Math.min(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2),
                    top: -(this.lens.dy * (this.zoomSize.height / this.size.height) + Math.min(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2)
                })
            }
            if (this.zoomBox.mode === "magnifier") {
                return
            }
            this.moveTimer = setTimeout(this.moveBind, 16)
        },
        swipe: function() {
            var V;
            var L;
            var Q = 30;
            var N = 201;
            var S;
            var T = "";
            var K = {};
            var J;
            var P;
            var U = 0;
            var W = {
                transition: A.browser.cssTransform + String.fromCharCode(32) + "300ms cubic-bezier(.18,.35,.58,1)"
            };
            var M;
            var R;
            var O = i(function(X) {
                if (!this.ready || this.zoomBox.active) {
                    return
                }
                if (X.state === "dragstart") {
                    clearTimeout(this.activateTimer);
                    this.activateTimer = null;
                    U = 0;
                    K = {
                        x: X.x,
                        y: X.y,
                        ts: X.timeStamp
                    };
                    V = this.size.width;
                    L = V / 2;
                    this.image.node.jRemoveEvent("transitionend");
                    this.image.node.jSetCssProp("transition", "");
                    this.image.node.jSetCssProp("transform", "translate3d(0, 0, 0)");
                    R = null
                } else {
                    J = (X.x - K.x);
                    P = {
                        x: 0,
                        y: 0,
                        z: 0
                    };
                    if (R === null) {
                        R = (Math.abs(X.x - K.x) < Math.abs(X.y - K.y))
                    }
                    if (R) {
                        return
                    }
                    X.stop();
                    if (X.state === "dragend") {
                        U = 0;
                        M = null;
                        S = X.timeStamp - K.ts;
                        if (Math.abs(J) > L || (S < N && Math.abs(J) > Q)) {
                            if ((T = (J > 0) ? "backward" : (J <= 0) ? "forward" : "")) {
                                if (T === "backward") {
                                    M = this.getPrev();
                                    U += V * 10
                                } else {
                                    M = this.getNext();
                                    U -= V * 10
                                }
                            }
                        }
                        P.x = U;
                        P.deg = -90 * (P.x / V);
                        this.image.node.jAddEvent("transitionend", i(function(Y) {
                            this.image.node.jRemoveEvent("transitionend");
                            this.image.node.jSetCssProp("transition", "");
                            if (M) {
                                this.image.node.jSetCss({
                                    transform: "translate3d(" + P.x + "px, 0px, 0px)"
                                });
                                this.update(M, true)
                            }
                        }).jBind(this));
                        this.image.node.jSetCss(W);
                        this.image.node.jSetCss({
                            "transition-duration": P.x ? "100ms" : "300ms",
                            opacity: 1 - 0.7 * Math.abs(P.x / V),
                            transform: "translate3d(" + P.x + "px, 0px, 0px)"
                        });
                        J = 0;
                        return
                    }
                    P.x = J;
                    P.z = -50 * Math.abs(P.x / L);
                    P.deg = -60 * (P.x / L);
                    this.image.node.jSetCss({
                        opacity: 1 - 0.7 * Math.abs(P.x / L),
                        transform: "translate3d(" + P.x + "px, 0px, " + P.z + "px)"
                    })
                }
            }).jBind(this);
            this.node.jAddEvent("touchdrag", O)
        },
        setupExpandGallery: function() {
            var K, J;
            if (this.additionalImages.length) {
                this.expandGallery = this.additionalImages
            } else {
                K = this.placeholder.getAttribute("data-gallery");
                if (K) {
                    if (A.browser.features.query) {
                        J = A.$A(document.querySelectorAll('.ogwugoZoom[data-gallery="' + K + '"], .ogvugoZoomPlus[data-gallery="' + K + '"]'))
                    } else {
                        J = A.$A(document.getElementsByTagName("A")).filter(function(L) {
                            return K === L.getAttribute("data-gallery")
                        })
                    }
                    i(J).jEach(function(M) {
                        var L, N;
                        L = j(M);
                        if (L && L.additionalImages.length > 0) {
                            return
                        }
                        if (L) {
                            N = new l(L.image.small.url, L.image.zoom.url, L.image.caption, null, L.image.origin);
                            N.link = L.image.link
                        } else {
                            N = new l().parseNode(M, L ? L.originalTitle : null)
                        }
                        if (this.image.zoom.src.has(N.zoom.url) && this.image.small.src.has(N.small.url)) {
                            N = this.image
                        }
                        this.expandGallery.push(N)
                    }, this);
                    this.primaryImage = this.image
                }
            }
            if (this.expandGallery.length > 1) {
                this.expandStage.jAddClass("with-thumbs");
                this.expandNav = A.$new("div", {
                    "class": "og-expand-thumbnails"
                }).jAppendTo(this.expandStage);
                this.expandThumbs = new s(this.expandNav);
                i(this.expandGallery).jEach(function(L) {
                    var M = i(function(N) {
                        this.setActiveThumb(L);
                        this.update(L)
                    }).jBind(this);
                    L.selector = this.expandThumbs.addItem(A.$new("img", {
                        src: L.getURL("small")
                    }).jAddEvent("tap btnclick", function(N) {
                        N.stop()
                    }).jAddEvent("tap " + (this.option("selectorTrigger") === "hover" ? "mouseover mouseout" : "btnclick"), i(function(O, N) {
                        if (this.updateTimer) {
                            clearTimeout(this.updateTimer)
                        }
                        this.updateTimer = false;
                        if (O.type === "mouseover") {
                            this.updateTimer = i(M).jDelay(N)
                        } else {
                            if (O.type === "tap" || O.type === "btnclick") {
                                M()
                            }
                        }
                    }).jBindAsEvent(this, 60)))
                }, this);
                this.buttons.next.show();
                this.buttons.prev.show()
            } else {
                this.expandStage.jRemoveClass("with-thumbs");
                this.buttons.next.hide();
                this.buttons.prev.hide()
            }
        },
        destroyExpandGallery: function() {
            var J;
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                this.expandThumbs = null
            }
            if (this.expandNav) {
                this.expandNav.jRemove();
                this.expandNav = null
            }
            if (this.expandGallery.length > 1 && !this.additionalImages.length) {
                this.node.jRemoveEvent("touchdrag");
                this.image.node.jRemove().getAttribute("style");
                this.image.node.removeAttribute("style");
                this.primaryImage.node.jAppendTo(this.node);
                this.setupZoom(this.primaryImage);
                while (J = this.expandGallery.pop()) {
                    if (J !== this.primaryImage) {
                        if (J.small.node) {
                            J.small.node.kill();
                            J.small.node = null
                        }
                        if (J.zoom.node) {
                            J.zoom.node.kill();
                            J.zoom.node = null
                        }
                        J = null
                    }
                }
            }
            this.expandGallery = []
        },
        close: function() {
            if (!this.ready || !this.expanded) {
                return
            }
            if (A.browser.platform === "ios" && A.browser.uaName === "safari" && parseInt(A.browser.uaVersion) === 7) {
                clearInterval(n);
                n = null
            }
            i(document).jRemoveEvent("keydown", this.keyboardCallback);
            this.deactivate(null, true);
            this.ready = false;
            if (A.browser.fullScreen.capable && A.browser.fullScreen.enabled()) {
                A.browser.fullScreen.cancel()
            } else {
                if (A.browser.features.transition) {
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition: ""
                    });
                    this.node.jAddEvent("transitionend", this.onClose);
                    if (A.browser.webkit) {
                        setTimeout(i(function() {
                            this.onClose()
                        }).jBind(this), 260)
                    }
                    this.expandBg.jRemoveEvent("transitionend").jSetCss({
                        transition: ""
                    });
                    this.expandBg.jSetCss({
                        transition: "all 0.6s cubic-bezier(0.895, 0.030, 0.685, 0.220) 0.0s"
                    }).jGetSize();
                    this.node.jSetCss({
                        transition: "all .3s cubic-bezier(0.600, 0, 0.735, 0.045) 0s"
                    }).jGetSize();
                    if (this.zoomBox.mode !== false && this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== "magnifier") {
                        this.image.node.jSetCss({
                            "max-height": this.image.jGetSize("zoom").height
                        });
                        this.image.node.jSetCss({
                            "max-width": this.image.jGetSize("zoom").width
                        })
                    }
                    this.expandBg.jSetCss({
                        opacity: 0.4
                    });
                    this.node.jSetCss({
                        opacity: 0.01,
                        transform: "scale(0.4)"
                    })
                } else {
                    this.onClose()
                }
            }
        },
        expand: function(L) {
            if (!this.image.loaded() || !this.ready || this.expanded) {
                if (!this.image.loaded()) {
                    if (L) {
                        this.initEvent = e(L);
                        L.stopQueue();
                        if (L.type === "tap") {
                            L.events[1].stopQueue()
                        }
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = i(this.showLoading).jBind(this).jDelay(400)
                    }
                }
                return
            }
            if (L) {
                L.stopQueue()
            }
            var J = i(this.node).jFetch("cr");
            var K = document.createDocumentFragment();
            this.hideHint();
            this.hintRuns--;
            this.deactivate(null, true);
            this.unregisterActivateEvent();
            this.unregisterDeactivateEvent();
            this.ready = false;
            if (!this.expandBox) {
                this.expandBox = A.$new("div").jAddClass("og-expand").jAddClass(this.option("cssClass")).jSetCss({
                    opacity: 0
                });
                this.expandStage = A.$new("div").jAddClass("og-expand-stage").jAppendTo(this.expandBox);
                this.expandControls = A.$new("div").jAddClass("og-expand-controls").jAppendTo(this.expandStage);
                i(["prev", "next", "close"]).jEach(function(N) {
                    var M = "og-button";
                    this.buttons[N] = A.$new("button", {
                        title: this.option("text-btn-" + N)
                    }).jAddClass(M).jAddClass(M + "-" + N);
                    K.appendChild(this.buttons[N]);
                    switch (N) {
                        case "prev":
                            this.buttons[N].jAddEvent("tap btnclick", function(O) {
                                O.stop();
                                this.update(this.getPrev())
                            }.jBindAsEvent(this));
                            break;
                        case "next":
                            this.buttons[N].jAddEvent("tap btnclick", function(O) {
                                O.stop();
                                this.update(this.getNext())
                            }.jBindAsEvent(this));
                            break;
                        case "close":
                            this.buttons[N].jAddEvent("tap btnclick", function(O) {
                                O.stop();
                                this.close()
                            }.jBindAsEvent(this));
                            break;
                        default:
                    }
                }, this);
                this.expandControls.append(K);
                this.expandBox.jAddEvent("mousescroll touchstart dbltap", i(function(M) {
                    i(M).stop()
                }));
                if (this.option("closeOnClickOutside")) {
                    this.expandBox.jAddEvent("tap btnclick", function(O) {
                        var N = O.jGetPageXY();
                        var M = i(this.option("expandZoomMode") === "magnifier" ? this.zoomBox.node : this.zoomBox.image).jGetRect();
                        if (this.option("expandZoomOn") !== "always" && M.top <= N.y && N.y <= M.bottom && M.left <= N.x && N.x <= M.right) {
                            O.stopQueue();
                            this.deactivate(O);
                            return
                        }
                        if (this.option("expandZoomOn") !== "always" && this.node.hasChild(O.getOriginalTarget())) {
                            return
                        }
                        O.stop();
                        this.close()
                    }.jBindAsEvent(this))
                }
                this.keyboardCallback = i(function(N) {
                    var M = null;
                    if (N.keyCode !== 27 && N.keyCode !== 37 && N.keyCode !== 39) {
                        return
                    }
                    i(N).stop();
                    if (N.keyCode === 27) {
                        this.close()
                    } else {
                        M = (N.keyCode === 37) ? this.getPrev() : this.getNext();
                        if (M) {
                            this.update(M)
                        }
                    }
                }).jBindAsEvent(this);
                this.onExpand = i(function() {
                    var M;
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition: "",
                        transform: "translate3d(0, 0, 0)"
                    });
                    if (this.expanded) {
                        return
                    }
                    this.expanded = true;
                    this.expandBox.jRemoveClass("og-expand-opening").jSetCss({
                        opacity: 1
                    });
                    this.zoomBox.setMode(this.option("expandZoomMode"));
                    this.zoomSize = A.detach(this.zoomSizeOrigin);
                    this.resizeCallback();
                    if (this.expandCaption && this.image.caption) {
                        if (this.image.link) {
                            this.expandCaption.append(A.$new("a", {
                                href: this.image.link
                            }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(this.image.caption))
                        } else {
                            this.expandCaption.changeContent(this.image.caption)
                        }
                        this.expandCaption.jAddClass("og-show")
                    }
                    if (this.option("expandZoomOn") !== "always") {
                        this.registerActivateEvent(true);
                        this.registerDeactivateEvent(true)
                    }
                    this.ready = true;
                    if (this.option("expandZoomOn") === "always") {
                        if (this.zoomBox.mode !== false) {
                            this.zoomBox.enable(true)
                        }
                        if (A.browser.mobile && this.mobileZoomHint) {
                            this.mobileZoomHint = false
                        }
                        this.activate()
                    }
                    if ((A.browser.mobile || this.option("forceTouch")) && this.zoomBox.enabled) {
                        if (this.mobileZoomHint || this.hintRuns > 0) {
                            this.showHint(true, this.option("textClickZoomHint"))
                        }
                        this.mobileZoomHint = false
                    }
                    this.expandControls.jRemoveClass("og-hidden").jAddClass("og-fade og-visible");
                    if (this.expandNav) {
                        this.expandNav.jRemoveClass("og-hidden").jAddClass("og-fade og-visible")
                    }
                    if (this.expandThumbs) {
                        this.expandThumbs.run();
                        this.setActiveThumb(this.image)
                    }
                    if (J) {
                        J.jAppendTo(this.expandBox, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom")
                    }
                    if (this.expandGallery.length && !this.additionalImages.length) {
                        this.swipe()
                    }
                    i(document).jAddEvent("keydown", this.keyboardCallback);
                    if (A.browser.platform === "ios" && A.browser.uaName === "safari" && parseInt(A.browser.uaVersion) === 7) {
                        n = w()
                    }
                    u("onExpandOpen", this.id)
                }).jBind(this);
                this.onClose = i(function() {
                    this.node.jRemoveEvent("transitionend");
                    if (!this.expanded) {
                        return
                    }
                    if (this.expanded) {
                        i(document).jRemoveEvent("keydown", this.keyboardCallback);
                        this.deactivate(null, true)
                    }
                    this.destroyExpandGallery();
                    this.expanded = false;
                    this.zoomBox.setMode(this.option("zoomMode"));
                    this.node.replaceChild(this.image.getNode("small"), this.image.node);
                    this.image.setCurNode("small");
                    i(this.image.node).jSetCss({
                        width: "",
                        height: "",
                        "max-width": Math.min(this.image.jGetSize("small").width),
                        "max-height": Math.min(this.image.jGetSize("small").height)
                    });
                    this.lens.image.src = this.image.getURL("small");
                    this.node.jSetCss({
                        opacity: "",
                        transition: ""
                    });
                    this.node.jSetCss({
                        transform: "translate3d(0, 0, 0)"
                    });
                    i(this.placeholder).replaceChild(this.node, this.stubNode);
                    this.setSize(true);
                    if (this.expandCaption) {
                        this.expandCaption.jRemove();
                        this.expandCaption = null
                    }
                    this.unregisterActivateEvent();
                    this.unregisterDeactivateEvent();
                    if (this.option("zoomOn") === "always") {
                        this.activate()
                    } else {
                        if (this.option("zoomMode") !== false) {
                            this.registerActivateEvent(this.option("zoomOn") === "click");
                            this.registerDeactivateEvent(this.option("zoomOn") === "click" && !this.option("expand"))
                        }
                    }
                    this.showHint();
                    this.expandBg.jRemoveEvent("transitionend");
                    this.expandBox.jRemove();
                    this.expandBg.jRemove();
                    this.expandBg = null;
                    i(A.browser.getDoc()).jRemoveClass("og-expanded-view-open");
                    this.ready = true;
                    if (A.browser.ieMode < 10) {
                        this.resizeCallback()
                    } else {
                        i(window).jRaiseEvent("UIEvent", "resize")
                    }
                    u("onExpandClose", this.id)
                }).jBind(this);
                this.expandImageStage = A.$new("div", {
                    "class": "og-image-stage"
                }).jAppendTo(this.expandStage);
                this.expandFigure = A.$new("figure").jAppendTo(this.expandImageStage);
                this.stubNode = this.node.cloneNode(false)
            }
            this.setupExpandGallery();
            i(A.browser.getDoc()).jAddClass("og-expanded-view-open");
            i(document.body).jGetSize();
            if (this.option("expand") === "fullscreen") {
                this.prepareExpandedView();
                A.browser.fullScreen.request(this.expandBox, {
                    onEnter: i(function() {
                        this.onExpand()
                    }).jBind(this),
                    onExit: this.onClose,
                    fallback: i(function() {
                        this.expandToWindow()
                    }).jBind(this)
                })
            } else {
                setTimeout(i(function() {
                    this.prepareExpandedView();
                    this.expandToWindow()
                }).jBind(this), 96)
            }
        },
        prepareExpandedView: function() {
            var K;
            var J;
            K = A.$new("img", {
                src: this.image.getURL("zoom")
            });
            this.expandBg = A.$new("div").jAddClass("og-expand-bg").append((A.browser.features.cssFilters || A.browser.ieMode < 10) ? K : new A.SVGImage(K).blur(b).getNode()).jAppendTo(this.expandBox);
            if (this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false) {
                this.expandStage.jAddClass("og-always-zoom" + (this.option("expandZoomMode") === "zoom" ? " og-zoom-in" : "")).jGetSize()
            }
            J = i(this.node)[(A.browser.ieMode < 10) ? "jGetSize" : "getBoundingClientRect"]();
            i(this.stubNode).jSetCss({
                width: J.width,
                height: J.height
            });
            this.node.replaceChild(this.image.getNode("zoom"), this.image.node);
            this.image.setCurNode("zoom");
            this.expandBox.jAppendTo(document.body);
            this.expandMaxWidth = function() {
                var L = this.expandImageStage;
                if (i(this.expandFigure).jGetSize().width > 50) {
                    L = this.expandFigure
                }
                return function() {
                    return this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false && this.option("expandZoomMode") !== "magnifier" ? Infinity : Math.round(i(L).getInnerSize().width)
                }
            }.call(this);
            this.expandMaxHeight = function() {
                var L = this.expandImageStage;
                if (i(this.expandFigure).jGetSize().height > 50) {
                    L = this.expandFigure
                }
                return function() {
                    return this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false && this.option("expandZoomMode") !== "magnifier" ? Infinity : Math.round(i(L).getInnerSize().height)
                }
            }.call(this);
            this.expandControls.jRemoveClass("og-fade og-visible").jAddClass("og-hidden");
            if (this.expandNav) {
                this.expandNav.jRemoveClass("og-fade og-visible").jAddClass("og-hidden")
            }
            this.image.node.jSetCss({
                "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
            });
            this.image.node.jSetCss({
                "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
            });
            this.expandFigure.append(i(this.placeholder).replaceChild(this.stubNode, this.node));
            if (this.option("expandCaption")) {
                this.expandCaption = A.$new("figcaption", {
                    "class": "og-caption"
                }).jAppendTo(this.expandFigure)
            }
        },
        expandToWindow: function() {
            this.node.jSetCss({
                transition: ""
            });
            this.node.jSetCss({
                transform: "scale(0.6)"
            }).jGetSize();
            this.node.jSetCss({
                transition: A.browser.cssTransform + " 0.4s cubic-bezier(0.175, 0.885, 0.320, 1) 0s"
            });
            if (A.browser.features.transition) {
                this.node.jAddEvent("transitionend", this.onExpand);
                if (A.browser.chrome && (A.browser.uaName === "chrome" || A.browser.uaName === "opera")) {
                    setTimeout(i(function() {
                        this.onExpand()
                    }).jBind(this), 500)
                }
            } else {
                this.onExpand.jDelay(16, this)
            }
            this.expandBox.jSetCss({
                opacity: 1
            });
            this.node.jSetCss({
                transform: "scale(1)"
            })
        },
        openLink: function() {
            if (this.image.link) {
                window.open(this.image.link, "_self")
            }
        },
        getNext: function() {
            var J = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(M) {
                return (M.small.state !== -1 || M.zoom.state !== -1)
            });
            var K = J.length;
            var L = i(J).indexOf(this.image) + 1;
            return (K <= 1) ? null : J[(L >= K) ? 0 : L]
        },
        getPrev: function() {
            var J = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(M) {
                return (M.small.state !== -1 || M.zoom.state !== -1)
            });
            var K = J.length;
            var L = i(J).indexOf(this.image) - 1;
            return (K <= 1) ? null : J[(L < 0) ? K - 1 : L]
        },
        imageByURL: function(K, L) {
            var J = this.additionalImages.filter(function(M) {
                return ((M.zoom.src.has(K) || M.zoom.url.has(K)) && (M.small.src.has(L) || M.small.url.has(L)))
            }) || [];
            return J[0] || ((L && K && A.jTypeOf(L) === "string" && A.jTypeOf(K) === "string") ? new l(L, K) : null)
        },
        imageByOrigin: function(K) {
            var J = this.additionalImages.filter(function(L) {
                return (L.origin === K)
            }) || [];
            return J[0]
        },
        imageByIndex: function(J) {
            return this.additionalImages[J]
        }
    };
    v = {
        version: "v5.2.2 (Plus) DEMO",
        start: function(M, K) {
            var L = null;
            var J = [];
            A.$A((M ? [i(M)] : A.$A(document.byClass("ogwugoZoom")).concat(A.$A(document.byClass("ogvugoZoomPlus"))))).jEach(i(function(N) {
                if (i(N)) {
                    if (!j(N)) {
                        L = new k(N, K);
                        if (y && !L.option("autostart")) {
                            L.stop();
                            L = null
                        } else {
                            G.push(L);
                            J.push(L)
                        }
                    }
                }
            }).jBind(this));
            return M ? J[0] : J
        },
        stop: function(M) {
            var K, L, J;
            if (M) {
                (L = j(M)) && (L = G.splice(G.indexOf(L), 1)) && L[0].stop() && (delete L[0]);
                return
            }
            while (K = G.length) {
                L = G.splice(K - 1, 1);
                L[0].stop();
                delete L[0]
            }
        },
        refresh: function(J) {
            this.stop(J);
            return this.start(J)
        },
        update: function(O, N, M, K) {
            var L = j(O);
            var J;
            if (L) {
                J = A.jTypeOf(N) === "element" ? L.imageByOrigin(N) : L.imageByURL(N, M);
                if (J) {
                    L.update(J)
                }
            }
        },
        switchTo: function(M, L) {
            var K = j(M);
            var J;
            if (K) {
                switch (A.jTypeOf(L)) {
                    case "element":
                        J = K.imageByOrigin(L);
                        break;
                    case "number":
                        J = K.imageByIndex(L);
                        break;
                    default:
                }
                if (J) {
                    K.update(J)
                }
            }
        },
        prev: function(K) {
            var J;
            (J = j(K)) && J.update(J.getPrev())
        },
        next: function(K) {
            var J;
            (J = j(K)) && J.update(J.getNext())
        },
        zoomIn: function(K) {
            var J;
            (J = j(K)) && J.activate()
        },
        zoomOut: function(K) {
            var J;
            (J = j(K)) && J.deactivate()
        },
        expand: function(K) {
            var J;
            (J = j(K)) && J.expand()
        },
        close: function(K) {
            var J;
            (J = j(K)) && J.close()
        },
        registerCallback: function(J, K) {
            if (!q[J]) {
                q[J] = []
            }
            if (A.jTypeOf(K) === "function") {
                q[J].push(K)
            }
        },
        running: function(J) {
            return !!j(J)
        }
    };
    i(document).jAddEvent("domready", function() {
        var K = window[E + "Options"] || {};
        t = t();
        d();
        I = A.$new("div", {
            "class": "ogwugoB-hidden-wrapper"
        }).jAppendTo(document.body);
        H = (A.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches);
        if (A.browser.mobile) {
            A.extend(p, m)
        }
        for (var J = 0; J < B.length; J++) {
            if (K[B[J]] && A.$F !== K[B[J]]) {
                v.registerCallback(B[J], K[B[J]])
            }
        }
        v.start();
        y = false
    });
    window.ogvugoZoomPlus = window.ogvugoZoomPlus || {};
    return v
})();