var _objectSpread2 = require("../@babel/runtime/helpers/objectSpread2");
require("../@babel/runtime/helpers/Arrayincludes");
var _classCallCheck2            = require("../@babel/runtime/helpers/classCallCheck");
var _createClass2               = require("../@babel/runtime/helpers/createClass");
var _createForOfIteratorHelper2 = require("../@babel/runtime/helpers/createForOfIteratorHelper");
var _typeof2                    = require("../@babel/runtime/helpers/typeof");
var _defineProperty2            = require("../@babel/runtime/helpers/defineProperty");
var _slicedToArray2             = require("../@babel/runtime/helpers/slicedToArray");
var _toConsumableArray2         = require("../@babel/runtime/helpers/toConsumableArray");

var _ErrorTypeStrings;

function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(",");
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? function(val) {
        return !!map[val.toLowerCase()];
    } : function(val) {
        return !!map[val];
    };
}

function normalizeClass(value) {
    var res = "";
    if (isString(value)) {
        res = value;
    } else if (isArray$1(value)) {
        for (var i = 0; i < value.length; i++) {
            var normalized = normalizeClass(value[i]);
            if (normalized) {
                res += normalized + " ";
            }
        }
    } else if (isObject$a(value)) {
        for (var name in value) {
            if (value[name]) {
                res += name + " ";
            }
        }
    }
    return res.trim();
}

var toDisplayString = function toDisplayString(val) {
    return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$a(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer$1, 2) : String(val);
};

var replacer$1 = function replacer$1(_key, val) {
    if (val && val.__v_isRef) {
        return replacer$1(_key, val.value);
    } else if (isMap(val)) {
        return _defineProperty2({}, "Map(".concat(val.size, ")"), _toConsumableArray2(val.entries()).reduce(function(entries2, _ref) {
            var _ref2 = _slicedToArray2(_ref, 2), key = _ref2[0], val2 = _ref2[1];
            entries2["".concat(key, " =>")] = val2;
            return entries2;
        }, {}));
    } else if (isSet(val)) {
        return _defineProperty2({}, "Set(".concat(val.size, ")"), _toConsumableArray2(val.values()));
    } else if (isObject$a(val) && !isArray$1(val) && !isPlainObject$2(val)) {
        return String(val);
    }
    return val;
};

var EMPTY_OBJ = Object.freeze({});

var EMPTY_ARR = Object.freeze([]);

var NOOP = function NOOP() {};

var NO = function NO() {
    return false;
};

var onRE = /^on[^a-z]/;

var isOn = function isOn(key) {
    return onRE.test(key);
};

var isModelListener = function isModelListener(key) {
    return key.startsWith("onUpdate:");
};

var extend = Object.assign;

var remove = function remove(arr, el) {
    var i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1);
    }
};

var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

var hasOwn$b = function hasOwn$b(val, key) {
    return hasOwnProperty$2.call(val, key);
};

var isArray$1 = Array.isArray;

var isMap = function isMap(val) {
    return toTypeString(val) === "[object Map]";
};

var isSet = function isSet(val) {
    return toTypeString(val) === "[object Set]";
};

var isFunction = function isFunction(val) {
    return typeof val === "function";
};

var isString = function isString(val) {
    return typeof val === "string";
};

var isSymbol$3 = function isSymbol$3(val) {
    return _typeof2(val) === "symbol";
};

var isObject$a = function isObject$a(val) {
    return val !== null && _typeof2(val) === "object";
};

var isPromise = function isPromise(val) {
    return isObject$a(val) && isFunction(val.then) && isFunction(val.catch);
};

var objectToString = Object.prototype.toString;

var toTypeString = function toTypeString(value) {
    return objectToString.call(value);
};

var toRawType = function toRawType(value) {
    return toTypeString(value).slice(8, -1);
};

var isPlainObject$2 = function isPlainObject$2(val) {
    return toTypeString(val) === "[object Object]";
};

var isIntegerKey = function isIntegerKey(key) {
    return isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
};

var isReservedProp = /*   */ makeMap(
// the leading comma is intentional so empty string "" is also included
",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");

var isBuiltInDirective = makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");

var cacheStringFunction = function cacheStringFunction(fn) {
    var cache = /*   */ Object.create(null);
    return function(str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    };
};

var camelizeRE = /-(\w)/g;

var camelize = cacheStringFunction(function(str) {
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : "";
    });
});

var hyphenateRE = /\B([A-Z])/g;

var hyphenate = cacheStringFunction(function(str) {
    return str.replace(hyphenateRE, "-$1").toLowerCase();
});

var capitalize = cacheStringFunction(function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
});

var toHandlerKey = cacheStringFunction(function(str) {
    return str ? "on".concat(capitalize(str)) : "";
});

var hasChanged = function hasChanged(value, oldValue) {
    return !Object.is(value, oldValue);
};

var invokeArrayFns$1 = function invokeArrayFns$1(fns, arg) {
    for (var i = 0; i < fns.length; i++) {
        fns[i](arg);
    }
};

var def = function def(obj, key, value) {
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: false,
        value: value
    });
};

var looseToNumber = function looseToNumber(val) {
    var n2 = parseFloat(val);
    return isNaN(n2) ? val : n2;
};

var LOCALE_ZH_HANS = "zh-Hans";

var LOCALE_ZH_HANT = "zh-Hant";

var LOCALE_EN = "en";

var LOCALE_FR = "fr";

var LOCALE_ES = "es";

function include(str, parts) {
    return !!parts.find(function(part) {
        return str.indexOf(part) !== -1;
    });
}

function startsWith(str, parts) {
    return parts.find(function(part) {
        return str.indexOf(part) === 0;
    });
}

function normalizeLocale(locale, messages) {
    if (!locale) {
        return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages && messages[locale]) {
        return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
        return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
        if (locale.indexOf("-hans") > -1) {
            return LOCALE_ZH_HANS;
        }
        if (locale.indexOf("-hant") > -1) {
            return LOCALE_ZH_HANT;
        }
        if (include(locale, [ "-tw", "-hk", "-mo", "-cht" ])) {
            return LOCALE_ZH_HANT;
        }
        return LOCALE_ZH_HANS;
    }
    var locales = [ LOCALE_EN, LOCALE_FR, LOCALE_ES ];
    if (messages && Object.keys(messages).length > 0) {
        locales = Object.keys(messages);
    }
    var lang = startsWith(locale, locales);
    if (lang) {
        return lang;
    }
}

var LINEFEED = "\n";

var SLOT_DEFAULT_NAME = "d";

var ON_SHOW = "onShow";

var ON_HIDE = "onHide";

var ON_LAUNCH = "onLaunch";

var ON_ERROR = "onError";

var ON_THEME_CHANGE = "onThemeChange";

var ON_PAGE_NOT_FOUND = "onPageNotFound";

var ON_UNHANDLE_REJECTION = "onUnhandledRejection";

var ON_EXIT = "onExit";

var ON_LOAD = "onLoad";

var ON_READY = "onReady";

var ON_UNLOAD = "onUnload";

var ON_INIT = "onInit";

var ON_SAVE_EXIT_STATE = "onSaveExitState";

var ON_RESIZE = "onResize";

var ON_BACK_PRESS = "onBackPress";

var ON_PAGE_SCROLL = "onPageScroll";

var ON_TAB_ITEM_TAP = "onTabItemTap";

var ON_REACH_BOTTOM = "onReachBottom";

var ON_PULL_DOWN_REFRESH = "onPullDownRefresh";

var ON_SHARE_TIMELINE = "onShareTimeline";

var ON_ADD_TO_FAVORITES = "onAddToFavorites";

var ON_SHARE_APP_MESSAGE = "onShareAppMessage";

var ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";

var ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";

var ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";

var ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";

var ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";

var customizeRE = /:/g;

function customizeEvent(str) {
    return camelize(str.replace(customizeRE, "-"));
}

function hasLeadingSlash(str) {
    return str.indexOf("/") === 0;
}

function addLeadingSlash(str) {
    return hasLeadingSlash(str) ? str : "/" + str;
}

var invokeArrayFns = function invokeArrayFns(fns, arg) {
    var ret;
    for (var i = 0; i < fns.length; i++) {
        ret = fns[i](arg);
    }
    return ret;
};

function once(fn) {
    var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var res;
    return function() {
        if (fn) {
            for (var _len = arguments.length, args = new Array(_len), _key2 = 0; _key2 < _len; _key2++) {
                args[_key2] = arguments[_key2];
            }
            res = fn.apply(ctx, args);
            fn = null;
        }
        return res;
    };
}

function getValueByDataPath(obj, path2) {
    if (!isString(path2)) {
        return;
    }
    path2 = path2.replace(/\[(\d+)\]/g, ".$1");
    var parts = path2.split(".");
    var key = parts[0];
    if (!obj) {
        obj = {};
    }
    if (parts.length === 1) {
        return obj[key];
    }
    return getValueByDataPath(obj[key], parts.slice(1).join("."));
}

function sortObject(obj) {
    var sortObj = {};
    if (isPlainObject$2(obj)) {
        Object.keys(obj).sort().forEach(function(key) {
            var _key = key;
            sortObj[_key] = obj[_key];
        });
    }
    return !Object.keys(sortObj) ? obj : sortObj;
}

var encode$2 = encodeURIComponent;

function stringifyQuery(obj) {
    var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode$2;
    var res = obj ? Object.keys(obj).map(function(key) {
        var val = obj[key];
        if (_typeof2(val) === void 0 || val === null) {
            val = "";
        } else if (isPlainObject$2(val)) {
            val = JSON.stringify(val);
        }
        return encodeStr(key) + "=" + encodeStr(val);
    }).filter(function(x) {
        return x.length > 0;
    }).join("&") : null;
    return res ? "?".concat(res) : "";
}

var PAGE_HOOKS = [ ON_INIT, ON_LOAD, ON_SHOW, ON_HIDE, ON_UNLOAD, ON_BACK_PRESS, ON_PAGE_SCROLL, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_SHARE_TIMELINE, ON_SHARE_APP_MESSAGE, ON_ADD_TO_FAVORITES, ON_SAVE_EXIT_STATE, ON_NAVIGATION_BAR_BUTTON_TAP, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED ];

function isRootHook(name) {
    return PAGE_HOOKS.indexOf(name) > -1;
}

var UniLifecycleHooks = [ ON_SHOW, ON_HIDE, ON_LAUNCH, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION, ON_EXIT, ON_INIT, ON_LOAD, ON_READY, ON_UNLOAD, ON_RESIZE, ON_BACK_PRESS, ON_PAGE_SCROLL, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_SHARE_TIMELINE, ON_ADD_TO_FAVORITES, ON_SHARE_APP_MESSAGE, ON_SAVE_EXIT_STATE, ON_NAVIGATION_BAR_BUTTON_TAP, ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED, ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED, ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED, ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED ];

var MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /*   */ function() {
    return {
        onPageScroll: 1,
        onShareAppMessage: 1 << 1,
        onShareTimeline: 1 << 2
    };
}();

function isUniLifecycleHook(name, value) {
    var checkType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (checkType && !isFunction(value)) {
        return false;
    }
    if (UniLifecycleHooks.indexOf(name) > -1) {
        return true;
    } else if (name.indexOf("on") === 0) {
        return true;
    }
    return false;
}

var vueApp;

var createVueAppHooks = [];

function onCreateVueApp(hook) {
    if (vueApp) {
        return hook(vueApp);
    }
    createVueAppHooks.push(hook);
}

function invokeCreateVueAppHook(app) {
    vueApp = app;
    createVueAppHooks.forEach(function(hook) {
        return hook(app);
    });
}

var invokeCreateErrorHandler = once(function(app, createErrorHandler2) {
    if (isFunction(app._component.onError)) {
        return createErrorHandler2(app);
    }
});

var E = function E() {};

E.prototype = {
    on: function on(name, callback, ctx) {
        var e2 = this.e || (this.e = {});
        (e2[name] || (e2[name] = [])).push({
            fn: callback,
            ctx: ctx
        });
        return this;
    },
    once: function once(name, callback, ctx) {
        var self2 = this;
        function listener() {
            self2.off(name, listener);
            callback.apply(ctx, arguments);
        }
        listener._ = callback;
        return this.on(name, listener, ctx);
    },
    emit: function emit(name) {
        var data2 = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
            evtArr[i].fn.apply(evtArr[i].ctx, data2);
        }
        return this;
    },
    off: function off(name, callback) {
        var e2 = this.e || (this.e = {});
        var evts = e2[name];
        var liveEvents = [];
        if (evts && callback) {
            for (var i = 0, len = evts.length; i < len; i++) {
                if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
            }
        }
        liveEvents.length ? e2[name] = liveEvents : delete e2[name];
        return this;
    }
};

var E$1 = E;

function getBaseSystemInfo() {
    return wx.getSystemInfoSync();
}

function validateProtocolFail(name, msg) {
    console.warn("".concat(name, ": ").concat(msg));
}

function validateProtocol(name, data2, protocol, onFail) {
    if (!onFail) {
        onFail = validateProtocolFail;
    }
    for (var key in protocol) {
        var errMsg = validateProp$1(key, data2[key], protocol[key], !hasOwn$b(data2, key));
        if (isString(errMsg)) {
            onFail(name, errMsg);
        }
    }
}

function validateProtocols(name, args, protocol, onFail) {
    if (!protocol) {
        return;
    }
    if (!isArray$1(protocol)) {
        return validateProtocol(name, args[0] || /*   */ Object.create(null), protocol, onFail);
    }
    var len = protocol.length;
    var argsLen = args.length;
    for (var i = 0; i < len; i++) {
        var opts = protocol[i];
        var data2 = /*   */ Object.create(null);
        if (argsLen > i) {
            data2[opts.name] = args[i];
        }
        validateProtocol(name, data2, _defineProperty2({}, opts.name, opts), onFail);
    }
}

function validateProp$1(name, value, prop, isAbsent) {
    if (!isPlainObject$2(prop)) {
        prop = {
            type: prop
        };
    }
    var _prop = prop, type = _prop.type, required = _prop.required, validator = _prop.validator;
    if (required && isAbsent) {
        return 'Missing required args: "' + name + '"';
    }
    if (value == null && !required) {
        return;
    }
    if (type != null) {
        var isValid = false;
        var types = isArray$1(type) ? type : [ type ];
        var expectedTypes = [];
        for (var i = 0; i < types.length && !isValid; i++) {
            var _assertType$ = assertType$1(value, types[i]), valid = _assertType$.valid, expectedType = _assertType$.expectedType;
            expectedTypes.push(expectedType || "");
            isValid = valid;
        }
        if (!isValid) {
            return getInvalidTypeMessage$1(name, value, expectedTypes);
        }
    }
    if (validator) {
        return validator(value);
    }
}

var isSimpleType$1 = /*   */ makeMap("String,Number,Boolean,Function,Symbol");

function assertType$1(value, type) {
    var valid;
    var expectedType = getType$1(type);
    if (isSimpleType$1(expectedType)) {
        var t2 = _typeof2(value);
        valid = t2 === expectedType.toLowerCase();
        if (!valid && t2 === "object") {
            valid = value instanceof type;
        }
    } else if (expectedType === "Object") {
        valid = isObject$a(value);
    } else if (expectedType === "Array") {
        valid = isArray$1(value);
    } else {
        {
            valid = value instanceof type;
        }
    }
    return {
        valid: valid,
        expectedType: expectedType
    };
}

function getInvalidTypeMessage$1(name, value, expectedTypes) {
    var message = 'Invalid args: type check failed for args "'.concat(name, '". Expected ').concat(expectedTypes.map(capitalize).join(", "));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    var expectedValue = styleValue$1(value, expectedType);
    var receivedValue = styleValue$1(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
        message += " with value ".concat(expectedValue);
    }
    message += ", got ".concat(receivedType, " ");
    if (isExplicable$1(receivedType)) {
        message += "with value ".concat(receivedValue, ".");
    }
    return message;
}

function getType$1(ctor) {
    var match2 = ctor && ctor.toString().match(/^\s*function (\w+)/);
    return match2 ? match2[1] : "";
}

function styleValue$1(value, type) {
    if (type === "String") {
        return '"'.concat(value, '"');
    } else if (type === "Number") {
        return "".concat(Number(value));
    } else {
        return "".concat(value);
    }
}

function isExplicable$1(type) {
    var explicitTypes = [ "string", "number", "boolean" ];
    return explicitTypes.some(function(elem) {
        return type.toLowerCase() === elem;
    });
}

function isBoolean$1() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
        args[_key3] = arguments[_key3];
    }
    return args.some(function(elem) {
        return elem.toLowerCase() === "boolean";
    });
}

function tryCatch(fn) {
    return function() {
        try {
            return fn.apply(fn, arguments);
        } catch (e2) {
            console.error(e2);
        }
    };
}

var invokeCallbackId = 1;

var invokeCallbacks = {};

function addInvokeCallback(id2, name, callback) {
    var keepAlive = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    invokeCallbacks[id2] = {
        name: name,
        keepAlive: keepAlive,
        callback: callback
    };
    return id2;
}

function invokeCallback(id2, res, extras) {
    if (typeof id2 === "number") {
        var opts = invokeCallbacks[id2];
        if (opts) {
            if (!opts.keepAlive) {
                delete invokeCallbacks[id2];
            }
            return opts.callback(res, extras);
        }
    }
    return res;
}

var API_SUCCESS = "success";

var API_FAIL = "fail";

var API_COMPLETE = "complete";

function getApiCallbacks(args) {
    var apiCallbacks = {};
    for (var name in args) {
        var fn = args[name];
        if (isFunction(fn)) {
            apiCallbacks[name] = tryCatch(fn);
            delete args[name];
        }
    }
    return apiCallbacks;
}

function normalizeErrMsg$1(errMsg, name) {
    if (!errMsg || errMsg.indexOf(":fail") === -1) {
        return name + ":ok";
    }
    return name + errMsg.substring(errMsg.indexOf(":fail"));
}

function createAsyncApiCallback(name) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _ref5 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, beforeAll = _ref5.beforeAll, beforeSuccess = _ref5.beforeSuccess;
    if (!isPlainObject$2(args)) {
        args = {};
    }
    var _getApiCallbacks = getApiCallbacks(args), success = _getApiCallbacks.success, fail = _getApiCallbacks.fail, complete = _getApiCallbacks.complete;
    var hasSuccess = isFunction(success);
    var hasFail = isFunction(fail);
    var hasComplete = isFunction(complete);
    var callbackId = invokeCallbackId++;
    addInvokeCallback(callbackId, name, function(res) {
        res = res || {};
        res.errMsg = normalizeErrMsg$1(res.errMsg, name);
        isFunction(beforeAll) && beforeAll(res);
        if (res.errMsg === name + ":ok") {
            isFunction(beforeSuccess) && beforeSuccess(res, args);
            hasSuccess && success(res);
        } else {
            hasFail && fail(res);
        }
        hasComplete && complete(res);
    });
    return callbackId;
}

var HOOK_SUCCESS = "success";

var HOOK_FAIL = "fail";

var HOOK_COMPLETE = "complete";

var globalInterceptors = {};

var scopedInterceptors = {};

function wrapperHook(hook, params2) {
    return function(data2) {
        return hook(data2, params2) || data2;
    };
}

function queue$1(hooks, data2, params2) {
    var promise = false;
    for (var i = 0; i < hooks.length; i++) {
        var hook = hooks[i];
        if (promise) {
            promise = Promise.resolve(wrapperHook(hook, params2));
        } else {
            var res = hook(data2, params2);
            if (isPromise(res)) {
                promise = Promise.resolve(res);
            }
            if (res === false) {
                return {
                    then: function then() {},
                    catch: function _catch() {}
                };
            }
        }
    }
    return promise || {
        then: function then(callback) {
            return callback(data2);
        },
        catch: function _catch() {}
    };
}

function wrapperOptions(interceptors2) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    [ HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE ].forEach(function(name) {
        var hooks = interceptors2[name];
        if (!isArray$1(hooks)) {
            return;
        }
        var oldCallback = options[name];
        options[name] = function callbackInterceptor(res) {
            queue$1(hooks, res, options).then(function(res2) {
                return isFunction(oldCallback) && oldCallback(res2) || res2;
            });
        };
    });
    return options;
}

function wrapperReturnValue(method, returnValue) {
    var returnValueHooks = [];
    if (isArray$1(globalInterceptors.returnValue)) {
        returnValueHooks.push.apply(returnValueHooks, _toConsumableArray2(globalInterceptors.returnValue));
    }
    var interceptor = scopedInterceptors[method];
    if (interceptor && isArray$1(interceptor.returnValue)) {
        returnValueHooks.push.apply(returnValueHooks, _toConsumableArray2(interceptor.returnValue));
    }
    returnValueHooks.forEach(function(hook) {
        returnValue = hook(returnValue) || returnValue;
    });
    return returnValue;
}

function getApiInterceptorHooks(method) {
    var interceptor = /*   */ Object.create(null);
    Object.keys(globalInterceptors).forEach(function(hook) {
        if (hook !== "returnValue") {
            interceptor[hook] = globalInterceptors[hook].slice();
        }
    });
    var scopedInterceptor = scopedInterceptors[method];
    if (scopedInterceptor) {
        Object.keys(scopedInterceptor).forEach(function(hook) {
            if (hook !== "returnValue") {
                interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
            }
        });
    }
    return interceptor;
}

function invokeApi(method, api, options, params2) {
    var interceptor = getApiInterceptorHooks(method);
    if (interceptor && Object.keys(interceptor).length) {
        if (isArray$1(interceptor.invoke)) {
            var res = queue$1(interceptor.invoke, options);
            return res.then(function(options2) {
                return api.apply(void 0, [ wrapperOptions(getApiInterceptorHooks(method), options2) ].concat(_toConsumableArray2(params2)));
            });
        } else {
            return api.apply(void 0, [ wrapperOptions(interceptor, options) ].concat(_toConsumableArray2(params2)));
        }
    }
    return api.apply(void 0, [ options ].concat(_toConsumableArray2(params2)));
}

function hasCallback(args) {
    if (isPlainObject$2(args) && [ API_SUCCESS, API_FAIL, API_COMPLETE ].find(function(cb) {
        return isFunction(args[cb]);
    })) {
        return true;
    }
    return false;
}

function handlePromise(promise) {
    return promise;
}

function promisify$1(name, fn) {
    return function() {
        var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key4 = 1; _key4 < _len3; _key4++) {
            rest[_key4 - 1] = arguments[_key4];
        }
        if (hasCallback(args)) {
            return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
        }
        return wrapperReturnValue(name, handlePromise(new Promise(function(resolve2, reject) {
            invokeApi(name, fn, extend(args, {
                success: resolve2,
                fail: reject
            }), rest);
        })));
    };
}

function formatApiArgs(args, options) {
    var params2 = args[0];
    if (!options || !isPlainObject$2(options.formatArgs) && isPlainObject$2(params2)) {
        return;
    }
    var formatArgs = options.formatArgs;
    var keys4 = Object.keys(formatArgs);
    for (var i = 0; i < keys4.length; i++) {
        var name = keys4[i];
        var formatterOrDefaultValue = formatArgs[name];
        if (isFunction(formatterOrDefaultValue)) {
            var errMsg = formatterOrDefaultValue(args[0][name], params2);
            if (isString(errMsg)) {
                return errMsg;
            }
        } else {
            if (!hasOwn$b(params2, name)) {
                params2[name] = formatterOrDefaultValue;
            }
        }
    }
}

function invokeSuccess(id2, name, res) {
    return invokeCallback(id2, extend(res || {}, {
        errMsg: name + ":ok"
    }));
}

function invokeFail(id2, name, errMsg, errRes) {
    return invokeCallback(id2, extend({
        errMsg: name + ":fail" + (errMsg ? " " + errMsg : "")
    }, errRes));
}

function beforeInvokeApi(name, args, protocol, options) {
    {
        validateProtocols(name, args, protocol);
    }
    if (options && options.beforeInvoke) {
        var errMsg2 = options.beforeInvoke(args);
        if (isString(errMsg2)) {
            return errMsg2;
        }
    }
    var errMsg = formatApiArgs(args, options);
    if (errMsg) {
        return errMsg;
    }
}

function normalizeErrMsg(errMsg) {
    if (!errMsg || isString(errMsg)) {
        return errMsg;
    }
    if (errMsg.stack) {
        console.error(errMsg.message + LINEFEED + errMsg.stack);
        return errMsg.message;
    }
    return errMsg;
}

function wrapperTaskApi(name, fn, protocol, options) {
    return function(args) {
        var id2 = createAsyncApiCallback(name, args, options);
        var errMsg = beforeInvokeApi(name, [ args ], protocol, options);
        if (errMsg) {
            return invokeFail(id2, name, errMsg);
        }
        return fn(args, {
            resolve: function resolve(res) {
                return invokeSuccess(id2, name, res);
            },
            reject: function reject(errMsg2, errRes) {
                return invokeFail(id2, name, normalizeErrMsg(errMsg2), errRes);
            }
        });
    };
}

function wrapperSyncApi(name, fn, protocol, options) {
    return function() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key5 = 0; _key5 < _len4; _key5++) {
            args[_key5] = arguments[_key5];
        }
        var errMsg = beforeInvokeApi(name, args, protocol, options);
        if (errMsg) {
            throw new Error(errMsg);
        }
        return fn.apply(null, args);
    };
}

function wrapperAsyncApi(name, fn, protocol, options) {
    return wrapperTaskApi(name, fn, protocol, options);
}

function defineSyncApi(name, fn, protocol, options) {
    return wrapperSyncApi(name, fn, protocol, options);
}

function defineAsyncApi(name, fn, protocol, options) {
    return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}

var API_UPX2PX = "upx2px";

var Upx2pxProtocol = [ {
    name: "upx",
    type: [ Number, String ],
    required: true
} ];

var EPS = 1e-4;

var BASE_DEVICE_WIDTH = 750;

var isIOS = false;

var deviceWidth = 0;

var deviceDPR = 0;

function checkDeviceWidth() {
    var _getBaseSystemInfo = getBaseSystemInfo(), platform = _getBaseSystemInfo.platform, pixelRatio = _getBaseSystemInfo.pixelRatio, windowWidth = _getBaseSystemInfo.windowWidth;
    deviceWidth = windowWidth;
    deviceDPR = pixelRatio;
    isIOS = platform === "ios";
}

var upx2px = defineSyncApi(API_UPX2PX, function(number, newDeviceWidth) {
    if (deviceWidth === 0) {
        checkDeviceWidth();
    }
    number = Number(number);
    if (number === 0) {
        return 0;
    }
    var width = newDeviceWidth || deviceWidth;
    var result = number / BASE_DEVICE_WIDTH * width;
    if (result < 0) {
        result = -result;
    }
    result = Math.floor(result + EPS);
    if (result === 0) {
        if (deviceDPR === 1 || !isIOS) {
            result = 1;
        } else {
            result = .5;
        }
    }
    return number < 0 ? -result : result;
}, Upx2pxProtocol);

var API_ADD_INTERCEPTOR = "addInterceptor";

var API_REMOVE_INTERCEPTOR = "removeInterceptor";

var AddInterceptorProtocol = [ {
    name: "method",
    type: [ String, Object ],
    required: true
} ];

var RemoveInterceptorProtocol = AddInterceptorProtocol;

function mergeInterceptorHook(interceptors2, interceptor) {
    Object.keys(interceptor).forEach(function(hook) {
        if (isFunction(interceptor[hook])) {
            interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
        }
    });
}

function removeInterceptorHook(interceptors2, interceptor) {
    if (!interceptors2 || !interceptor) {
        return;
    }
    Object.keys(interceptor).forEach(function(name) {
        var hooks = interceptors2[name];
        var hook = interceptor[name];
        if (isArray$1(hooks) && isFunction(hook)) {
            remove(hooks, hook);
        }
    });
}

function mergeHook(parentVal, childVal) {
    var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$1(childVal) ? childVal : [ childVal ] : parentVal;
    return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
    var res = [];
    for (var i = 0; i < hooks.length; i++) {
        if (res.indexOf(hooks[i]) === -1) {
            res.push(hooks[i]);
        }
    }
    return res;
}

var addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, function(method, interceptor) {
    if (isString(method) && isPlainObject$2(interceptor)) {
        mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
    } else if (isPlainObject$2(method)) {
        mergeInterceptorHook(globalInterceptors, method);
    }
}, AddInterceptorProtocol);

var removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, function(method, interceptor) {
    if (isString(method)) {
        if (isPlainObject$2(interceptor)) {
            removeInterceptorHook(scopedInterceptors[method], interceptor);
        } else {
            delete scopedInterceptors[method];
        }
    } else if (isPlainObject$2(method)) {
        removeInterceptorHook(globalInterceptors, method);
    }
}, RemoveInterceptorProtocol);

var interceptors = {};

var API_ON = "$on";

var OnProtocol = [ {
    name: "event",
    type: String,
    required: true
}, {
    name: "callback",
    type: Function,
    required: true
} ];

var API_ONCE = "$once";

var OnceProtocol = OnProtocol;

var API_OFF = "$off";

var OffProtocol = [ {
    name: "event",
    type: [ String, Array ]
}, {
    name: "callback",
    type: Function
} ];

var API_EMIT = "$emit";

var EmitProtocol = [ {
    name: "event",
    type: String,
    required: true
} ];

var emitter = new E$1();

var $on = defineSyncApi(API_ON, function(name, callback) {
    emitter.on(name, callback);
    return function() {
        return emitter.off(name, callback);
    };
}, OnProtocol);

var $once = defineSyncApi(API_ONCE, function(name, callback) {
    emitter.once(name, callback);
    return function() {
        return emitter.off(name, callback);
    };
}, OnceProtocol);

var $off = defineSyncApi(API_OFF, function(name, callback) {
    if (!name) {
        emitter.e = {};
        return;
    }
    if (!isArray$1(name)) name = [ name ];
    name.forEach(function(n2) {
        return emitter.off(n2, callback);
    });
}, OffProtocol);

var $emit = defineSyncApi(API_EMIT, function(name) {
    for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
        args[_key6 - 1] = arguments[_key6];
    }
    emitter.emit.apply(emitter, [ name ].concat(args));
}, EmitProtocol);

var cid;

var cidErrMsg;

var enabled;

function normalizePushMessage(message) {
    try {
        return JSON.parse(message);
    } catch (e2) {}
    return message;
}

function invokePushCallback(args) {
    if (args.type === "enabled") {
        enabled = true;
    } else if (args.type === "clientId") {
        cid = args.cid;
        cidErrMsg = args.errMsg;
        invokeGetPushCidCallbacks(cid, args.errMsg);
    } else if (args.type === "pushMsg") {
        var message = {
            type: "receive",
            data: normalizePushMessage(args.message)
        };
        for (var i = 0; i < onPushMessageCallbacks.length; i++) {
            var callback = onPushMessageCallbacks[i];
            callback(message);
            if (message.stopped) {
                break;
            }
        }
    } else if (args.type === "click") {
        onPushMessageCallbacks.forEach(function(callback) {
            callback({
                type: "click",
                data: normalizePushMessage(args.message)
            });
        });
    }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid2, errMsg) {
    getPushCidCallbacks.forEach(function(callback) {
        callback(cid2, errMsg);
    });
    getPushCidCallbacks.length = 0;
}

var API_GET_PUSH_CLIENT_ID = "getPushClientId";

var getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, function(_, _ref6) {
    var resolve2 = _ref6.resolve, reject = _ref6.reject;
    Promise.resolve().then(function() {
        if (typeof enabled === "undefined") {
            enabled = false;
            cid = "";
            cidErrMsg = "uniPush is not enabled";
        }
        getPushCidCallbacks.push(function(cid2, errMsg) {
            if (cid2) {
                resolve2({
                    cid: cid2
                });
            } else {
                reject(errMsg);
            }
        });
        if (typeof cid !== "undefined") {
            invokeGetPushCidCallbacks(cid, cidErrMsg);
        }
    });
});

var onPushMessageCallbacks = [];

var onPushMessage = function onPushMessage(fn) {
    if (onPushMessageCallbacks.indexOf(fn) === -1) {
        onPushMessageCallbacks.push(fn);
    }
};

var offPushMessage = function offPushMessage(fn) {
    if (!fn) {
        onPushMessageCallbacks.length = 0;
    } else {
        var index2 = onPushMessageCallbacks.indexOf(fn);
        if (index2 > -1) {
            onPushMessageCallbacks.splice(index2, 1);
        }
    }
};

var SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

var CONTEXT_API_RE_EXC = [ "createBLEConnection" ];

var ASYNC_API = [ "createBLEConnection" ];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
    return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}

function isSyncApi(name) {
    return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
    return CALLBACK_API_RE.test(name) && name !== "onPush";
}

function shouldPromise(name) {
    if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
        return false;
    }
    return true;
}

if (!Promise.prototype.finally) {
    Promise.prototype.finally = function(onfinally) {
        var promise = this.constructor;
        return this.then(function(value) {
            return promise.resolve(onfinally && onfinally()).then(function() {
                return value;
            });
        }, function(reason) {
            return promise.resolve(onfinally && onfinally()).then(function() {
                throw reason;
            });
        });
    };
}

function promisify(name, api) {
    if (!shouldPromise(name)) {
        return api;
    }
    if (!isFunction(api)) {
        return api;
    }
    return function promiseApi() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        for (var _len6 = arguments.length, rest = new Array(_len6 > 1 ? _len6 - 1 : 0), _key7 = 1; _key7 < _len6; _key7++) {
            rest[_key7 - 1] = arguments[_key7];
        }
        if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
            return wrapperReturnValue(name, invokeApi(name, api, options, rest));
        }
        return wrapperReturnValue(name, handlePromise(new Promise(function(resolve2, reject) {
            invokeApi(name, api, extend({}, options, {
                success: resolve2,
                fail: reject
            }), rest);
        })));
    };
}

var CALLBACKS = [ "success", "fail", "cancel", "complete" ];

function initWrapper(protocols2) {
    function processCallback(methodName, method, returnValue) {
        return function(res) {
            return method(processReturnValue(methodName, res, returnValue));
        };
    }
    function processArgs(methodName, fromArgs) {
        var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        if (isPlainObject$2(fromArgs)) {
            var toArgs = keepFromArgs === true ? fromArgs : {};
            if (isFunction(argsOption)) {
                argsOption = argsOption(fromArgs, toArgs) || {};
            }
            for (var key in fromArgs) {
                if (hasOwn$b(argsOption, key)) {
                    var keyOption = argsOption[key];
                    if (isFunction(keyOption)) {
                        keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
                    }
                    if (!keyOption) {
                        console.warn("微信小程序 ".concat(methodName, " 暂不支持 ").concat(key));
                    } else if (isString(keyOption)) {
                        toArgs[keyOption] = fromArgs[key];
                    } else if (isPlainObject$2(keyOption)) {
                        toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
                    }
                } else if (CALLBACKS.indexOf(key) !== -1) {
                    var callback = fromArgs[key];
                    if (isFunction(callback)) {
                        toArgs[key] = processCallback(methodName, callback, returnValue);
                    }
                } else {
                    if (!keepFromArgs && !hasOwn$b(toArgs, key)) {
                        toArgs[key] = fromArgs[key];
                    }
                }
            }
            return toArgs;
        } else if (isFunction(fromArgs)) {
            fromArgs = processCallback(methodName, fromArgs, returnValue);
        }
        return fromArgs;
    }
    function processReturnValue(methodName, res, returnValue) {
        var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        if (isFunction(protocols2.returnValue)) {
            res = protocols2.returnValue(methodName, res);
        }
        return processArgs(methodName, res, returnValue, {}, keepReturnValue);
    }
    return function wrapper(methodName, method) {
        if (!hasOwn$b(protocols2, methodName)) {
            return method;
        }
        var protocol = protocols2[methodName];
        if (!protocol) {
            return function() {
                console.error("微信小程序 暂不支持".concat(methodName));
            };
        }
        return function(arg1, arg2) {
            var options = protocol;
            if (isFunction(protocol)) {
                options = protocol(arg1);
            }
            arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
            var args = [ arg1 ];
            if (typeof arg2 !== "undefined") {
                args.push(arg2);
            }
            var returnValue = wx[options.name || methodName].apply(wx, args);
            if (isSyncApi(methodName)) {
                return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
            }
            return returnValue;
        };
    };
}

var getLocale = function getLocale() {
    var app = isFunction(getApp) && getApp({
        allowDefault: true
    });
    if (app && app.$vm) {
        return app.$vm.$locale;
    }
    return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};

var setLocale = function setLocale(locale) {
    var app = isFunction(getApp) && getApp();
    if (!app) {
        return false;
    }
    var oldLocale = app.$vm.$locale;
    if (oldLocale !== locale) {
        app.$vm.$locale = locale;
        onLocaleChangeCallbacks.forEach(function(fn) {
            return fn({
                locale: locale
            });
        });
        return true;
    }
    return false;
};

var onLocaleChangeCallbacks = [];

var onLocaleChange = function onLocaleChange(fn) {
    if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
        onLocaleChangeCallbacks.push(fn);
    }
};

if (typeof global !== "undefined") {
    global.getLocale = getLocale;
}

var UUID_KEY = "__DC_STAT_UUID";

var deviceId;

function useDeviceId() {
    var global2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : wx;
    return function addDeviceId(_, toRes) {
        deviceId = deviceId || global2.getStorageSync(UUID_KEY);
        if (!deviceId) {
            deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
            wx.setStorage({
                key: UUID_KEY,
                data: deviceId
            });
        }
        toRes.deviceId = deviceId;
    };
}

function addSafeAreaInsets(fromRes, toRes) {
    if (fromRes.safeArea) {
        var safeArea = fromRes.safeArea;
        toRes.safeAreaInsets = {
            top: safeArea.top,
            left: safeArea.left,
            right: fromRes.windowWidth - safeArea.right,
            bottom: fromRes.screenHeight - safeArea.bottom
        };
    }
}

function populateParameters(fromRes, toRes) {
    var _fromRes$brand = fromRes.brand, brand = _fromRes$brand === void 0 ? "" : _fromRes$brand, _fromRes$model = fromRes.model, model = _fromRes$model === void 0 ? "" : _fromRes$model, _fromRes$system = fromRes.system, system = _fromRes$system === void 0 ? "" : _fromRes$system, _fromRes$language = fromRes.language, language = _fromRes$language === void 0 ? "" : _fromRes$language, theme = fromRes.theme, version2 = fromRes.version, platform = fromRes.platform, fontSizeSetting = fromRes.fontSizeSetting, SDKVersion = fromRes.SDKVersion, pixelRatio = fromRes.pixelRatio, deviceOrientation = fromRes.deviceOrientation;
    var osName = "";
    var osVersion = "";
    {
        osName = system.split(" ")[0] || "";
        osVersion = system.split(" ")[1] || "";
    }
    var hostVersion = version2;
    var deviceType = getGetDeviceType(fromRes, model);
    var deviceBrand = getDeviceBrand(brand);
    var _hostName = getHostName(fromRes);
    var _deviceOrientation = deviceOrientation;
    var _devicePixelRatio = pixelRatio;
    var _SDKVersion = SDKVersion;
    var hostLanguage = language.replace(/_/g, "-");
    var parameters = {
        appId: "",
        appName: "",
        appVersion: "1.0.0",
        appVersionCode: "100",
        appLanguage: getAppLanguage(hostLanguage),
        uniCompileVersion: "3.99",
        uniRuntimeVersion: "3.99",
        uniPlatform: "mp-weixin",
        deviceBrand: deviceBrand,
        deviceModel: model,
        deviceType: deviceType,
        devicePixelRatio: _devicePixelRatio,
        deviceOrientation: _deviceOrientation,
        osName: osName.toLocaleLowerCase(),
        osVersion: osVersion,
        hostTheme: theme,
        hostVersion: hostVersion,
        hostLanguage: hostLanguage,
        hostName: _hostName,
        hostSDKVersion: _SDKVersion,
        hostFontSizeSetting: fontSizeSetting,
        windowTop: 0,
        windowBottom: 0,
        // TODO
        osLanguage: void 0,
        osTheme: void 0,
        ua: void 0,
        hostPackageName: void 0,
        browserName: void 0,
        browserVersion: void 0
    };
    extend(toRes, parameters);
}

function getGetDeviceType(fromRes, model) {
    var deviceType = fromRes.deviceType || "phone";
    {
        var deviceTypeMaps = {
            ipad: "pad",
            windows: "pc",
            mac: "pc"
        };
        var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
        var _model = model.toLocaleLowerCase();
        for (var index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
            var _m = deviceTypeMapsKeys[index2];
            if (_model.indexOf(_m) !== -1) {
                deviceType = deviceTypeMaps[_m];
                break;
            }
        }
    }
    return deviceType;
}

function getDeviceBrand(brand) {
    var deviceBrand = brand;
    if (deviceBrand) {
        deviceBrand = deviceBrand.toLocaleLowerCase();
    }
    return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
    return getLocale ? getLocale() : defaultLanguage;
}

function getHostName(fromRes) {
    var _platform = "WeChat";
    var _hostName = fromRes.hostName || _platform;
    {
        if (fromRes.environment) {
            _hostName = fromRes.environment;
        } else if (fromRes.host && fromRes.host.env) {
            _hostName = fromRes.host.env;
        }
    }
    return _hostName;
}

var getSystemInfo = {
    returnValue: function returnValue(fromRes, toRes) {
        addSafeAreaInsets(fromRes, toRes);
        useDeviceId()(fromRes, toRes);
        populateParameters(fromRes, toRes);
    }
};

var getSystemInfoSync = getSystemInfo;

var redirectTo = {};

var previewImage = {
    args: function args(fromArgs, toArgs) {
        var currentIndex = parseInt(fromArgs.current);
        if (isNaN(currentIndex)) {
            return;
        }
        var urls = fromArgs.urls;
        if (!isArray$1(urls)) {
            return;
        }
        var len = urls.length;
        if (!len) {
            return;
        }
        if (currentIndex < 0) {
            currentIndex = 0;
        } else if (currentIndex >= len) {
            currentIndex = len - 1;
        }
        if (currentIndex > 0) {
            toArgs.current = urls[currentIndex];
            toArgs.urls = urls.filter(function(item, index2) {
                return index2 < currentIndex ? item !== urls[currentIndex] : true;
            });
        } else {
            toArgs.current = urls[0];
        }
        return {
            indicator: false,
            loop: false
        };
    }
};

var showActionSheet = {
    args: function args(fromArgs, toArgs) {
        toArgs.alertText = fromArgs.title;
    }
};

var getDeviceInfo = {
    returnValue: function returnValue(fromRes, toRes) {
        var brand = fromRes.brand, model = fromRes.model;
        var deviceType = getGetDeviceType(fromRes, model);
        var deviceBrand = getDeviceBrand(brand);
        useDeviceId()(fromRes, toRes);
        toRes = sortObject(extend(toRes, {
            deviceType: deviceType,
            deviceBrand: deviceBrand,
            deviceModel: model
        }));
    }
};

var getAppBaseInfo = {
    returnValue: function returnValue(fromRes, toRes) {
        var version2 = fromRes.version, language = fromRes.language, SDKVersion = fromRes.SDKVersion, theme = fromRes.theme;
        var _hostName = getHostName(fromRes);
        var hostLanguage = language.replace(/_/g, "-");
        toRes = sortObject(extend(toRes, {
            hostVersion: version2,
            hostLanguage: hostLanguage,
            hostName: _hostName,
            hostSDKVersion: SDKVersion,
            hostTheme: theme,
            appId: "",
            appName: "",
            appVersion: "1.0.0",
            appVersionCode: "100",
            appLanguage: getAppLanguage(hostLanguage)
        }));
    }
};

var getWindowInfo = {
    returnValue: function returnValue(fromRes, toRes) {
        addSafeAreaInsets(fromRes, toRes);
        toRes = sortObject(extend(toRes, {
            windowTop: 0,
            windowBottom: 0
        }));
    }
};

var getAppAuthorizeSetting = {
    returnValue: function returnValue(fromRes, toRes) {
        var locationReducedAccuracy = fromRes.locationReducedAccuracy;
        toRes.locationAccuracy = "unsupported";
        if (locationReducedAccuracy === true) {
            toRes.locationAccuracy = "reduced";
        } else if (locationReducedAccuracy === false) {
            toRes.locationAccuracy = "full";
        }
    }
};

var baseApis = {
    $on: $on,
    $off: $off,
    $once: $once,
    $emit: $emit,
    upx2px: upx2px,
    interceptors: interceptors,
    addInterceptor: addInterceptor,
    removeInterceptor: removeInterceptor,
    onCreateVueApp: onCreateVueApp,
    invokeCreateVueAppHook: invokeCreateVueAppHook,
    getLocale: getLocale,
    setLocale: setLocale,
    onLocaleChange: onLocaleChange,
    getPushClientId: getPushClientId,
    onPushMessage: onPushMessage,
    offPushMessage: offPushMessage,
    invokePushCallback: invokePushCallback
};

function initUni(api, protocols2) {
    var platform = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : wx;
    var wrapper = initWrapper(protocols2);
    var UniProxyHandlers = {
        get: function get(target, key) {
            if (hasOwn$b(target, key)) {
                return target[key];
            }
            if (hasOwn$b(api, key)) {
                return promisify(key, api[key]);
            }
            if (hasOwn$b(baseApis, key)) {
                return promisify(key, baseApis[key]);
            }
            return promisify(key, wrapper(key, platform[key]));
        }
    };
    return new Proxy({}, UniProxyHandlers);
}

function initGetProvider(providers) {
    return function getProvider2(_ref7) {
        var service = _ref7.service, success = _ref7.success, fail = _ref7.fail, complete = _ref7.complete;
        var res;
        if (providers[service]) {
            res = {
                errMsg: "getProvider:ok",
                service: service,
                provider: providers[service]
            };
            isFunction(success) && success(res);
        } else {
            res = {
                errMsg: "getProvider:fail:服务[" + service + "]不存在"
            };
            isFunction(fail) && fail(res);
        }
        isFunction(complete) && complete(res);
    };
}

var objectKeys$3 = [ "qy", "env", "error", "version", "lanDebug", "cloud", "serviceMarket", "router", "worklet", "__webpack_require_UNI_MP_PLUGIN__" ];

var singlePageDisableKey = [ "lanDebug", "router", "worklet" ];

var launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;

function isWxKey(key) {
    if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
        return false;
    }
    return objectKeys$3.indexOf(key) > -1 || typeof wx[key] === "function";
}

function initWx() {
    var newWx = {};
    for (var key in wx) {
        if (isWxKey(key)) {
            newWx[key] = wx[key];
        }
    }
    if (typeof globalThis !== "undefined" && typeof requireMiniProgram === "undefined") {
        globalThis.wx = newWx;
    }
    return newWx;
}

var mocks$1 = [ "__route__", "__wxExparserNodeId__", "__wxWebviewId__" ];

var getProvider = initGetProvider({
    oauth: [ "weixin" ],
    share: [ "weixin" ],
    payment: [ "wxpay" ],
    push: [ "weixin" ]
});

function initComponentMocks(component) {
    var res = /*   */ Object.create(null);
    mocks$1.forEach(function(name) {
        res[name] = component[name];
    });
    return res;
}

function createSelectorQuery() {
    var query = wx$2.createSelectorQuery();
    var oldIn = query.in;
    query.in = function newIn(component) {
        return oldIn.call(this, initComponentMocks(component));
    };
    return query;
}

var wx$2 = initWx();

var baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();

if (!baseInfo) {
    baseInfo = wx$2.getSystemInfoSync();
}

var host = baseInfo ? baseInfo.host : null;

var shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;

var shims = /*   */ Object.freeze({
    __proto__: null,
    createSelectorQuery: createSelectorQuery,
    getProvider: getProvider,
    shareVideoMessage: shareVideoMessage
});

var compressImage = {
    args: function args(fromArgs, toArgs) {
        if (fromArgs.compressedHeight && !toArgs.compressHeight) {
            toArgs.compressHeight = fromArgs.compressedHeight;
        }
        if (fromArgs.compressedWidth && !toArgs.compressWidth) {
            toArgs.compressWidth = fromArgs.compressedWidth;
        }
    }
};

var protocols = /*   */ Object.freeze({
    __proto__: null,
    compressImage: compressImage,
    getAppAuthorizeSetting: getAppAuthorizeSetting,
    getAppBaseInfo: getAppBaseInfo,
    getDeviceInfo: getDeviceInfo,
    getSystemInfo: getSystemInfo,
    getSystemInfoSync: getSystemInfoSync,
    getWindowInfo: getWindowInfo,
    previewImage: previewImage,
    redirectTo: redirectTo,
    showActionSheet: showActionSheet
});

var wx$1 = initWx();

var index = initUni(shims, protocols, wx$1);

var _export_sfc = function _export_sfc(sfc, props) {
    var target = sfc.__vccOpts || sfc;
    var _iterator = _createForOfIteratorHelper2(props), _step;
    try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var _step$value = _slicedToArray2(_step.value, 2), key = _step$value[0], val = _step$value[1];
            target[key] = val;
        }
    } catch (err) {
        _iterator.e(err);
    } finally {
        _iterator.f();
    }
    return target;
};

function warn$1(msg) {
    var _console;
    for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
        args[_key8 - 1] = arguments[_key8];
    }
    (_console = console).warn.apply(_console, [ "[Vue warn] ".concat(msg) ].concat(args));
}

var activeEffectScope;

var EffectScope = /* */ function() {
    function EffectScope() {
        var detached = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        _classCallCheck2(this, EffectScope);
        this.detached = detached;
        this._active = true;
        this.effects = [];
        this.cleanups = [];
        this.parent = activeEffectScope;
        if (!detached && activeEffectScope) {
            this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
        }
    }
    _createClass2(EffectScope, [ {
        key: "active",
        get: function get() {
            return this._active;
        }
    }, {
        key: "run",
        value: function run(fn) {
            if (this._active) {
                var currentEffectScope = activeEffectScope;
                try {
                    activeEffectScope = this;
                    return fn();
                } finally {
                    activeEffectScope = currentEffectScope;
                }
            } else {
                warn$1("cannot run an inactive effect scope.");
            }
        }
        /**
     * This should only be called on non-detached scopes
     * @internal
     */    }, {
        key: "on",
        value: function on() {
            activeEffectScope = this;
        }
        /**
     * This should only be called on non-detached scopes
     * @internal
     */    }, {
        key: "off",
        value: function off() {
            activeEffectScope = this.parent;
        }
    }, {
        key: "stop",
        value: function stop(fromParent) {
            if (this._active) {
                var i, l;
                for (i = 0, l = this.effects.length; i < l; i++) {
                    this.effects[i].stop();
                }
                for (i = 0, l = this.cleanups.length; i < l; i++) {
                    this.cleanups[i]();
                }
                if (this.scopes) {
                    for (i = 0, l = this.scopes.length; i < l; i++) {
                        this.scopes[i].stop(true);
                    }
                }
                if (!this.detached && this.parent && !fromParent) {
                    var last = this.parent.scopes.pop();
                    if (last && last !== this) {
                        this.parent.scopes[this.index] = last;
                        last.index = this.index;
                    }
                }
                this.parent = void 0;
                this._active = false;
            }
        }
    } ]);
    return EffectScope;
}();

function effectScope(detached) {
    return new EffectScope(detached);
}

function recordEffectScope(effect) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : activeEffectScope;
    if (scope && scope.active) {
        scope.effects.push(effect);
    }
}

function getCurrentScope() {
    return activeEffectScope;
}

function onScopeDispose(fn) {
    if (activeEffectScope) {
        activeEffectScope.cleanups.push(fn);
    } else {
        warn$1("onScopeDispose() is called when there is no active effect scope to be associated with.");
    }
}

var createDep = function createDep(effects) {
    var dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
};

var wasTracked = function wasTracked(dep) {
    return (dep.w & trackOpBit) > 0;
};

var newTracked = function newTracked(dep) {
    return (dep.n & trackOpBit) > 0;
};

var initDepMarkers = function initDepMarkers(_ref8) {
    var deps = _ref8.deps;
    if (deps.length) {
        for (var i = 0; i < deps.length; i++) {
            deps[i].w |= trackOpBit;
        }
    }
};

var finalizeDepMarkers = function finalizeDepMarkers(effect) {
    var deps = effect.deps;
    if (deps.length) {
        var ptr = 0;
        for (var i = 0; i < deps.length; i++) {
            var dep = deps[i];
            if (wasTracked(dep) && !newTracked(dep)) {
                dep.delete(effect);
            } else {
                deps[ptr++] = dep;
            }
            dep.w &= ~trackOpBit;
            dep.n &= ~trackOpBit;
        }
        deps.length = ptr;
    }
};

var targetMap = /*   */ new WeakMap();

var effectTrackDepth = 0;

var trackOpBit = 1;

var maxMarkerBits = 30;

var activeEffect;

var ITERATE_KEY = Symbol("iterate");

var MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");

var ReactiveEffect = /* */ function() {
    function ReactiveEffect(fn) {
        var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var scope = arguments.length > 2 ? arguments[2] : undefined;
        _classCallCheck2(this, ReactiveEffect);
        this.fn = fn;
        this.scheduler = scheduler;
        this.active = true;
        this.deps = [];
        this.parent = void 0;
        recordEffectScope(this, scope);
    }
    _createClass2(ReactiveEffect, [ {
        key: "run",
        value: function run() {
            if (!this.active) {
                return this.fn();
            }
            var parent2 = activeEffect;
            var lastShouldTrack = shouldTrack;
            while (parent2) {
                if (parent2 === this) {
                    return;
                }
                parent2 = parent2.parent;
            }
            try {
                this.parent = activeEffect;
                activeEffect = this;
                shouldTrack = true;
                trackOpBit = 1 << ++effectTrackDepth;
                if (effectTrackDepth <= maxMarkerBits) {
                    initDepMarkers(this);
                } else {
                    cleanupEffect(this);
                }
                return this.fn();
            } finally {
                if (effectTrackDepth <= maxMarkerBits) {
                    finalizeDepMarkers(this);
                }
                trackOpBit = 1 << --effectTrackDepth;
                activeEffect = this.parent;
                shouldTrack = lastShouldTrack;
                this.parent = void 0;
                if (this.deferStop) {
                    this.stop();
                }
            }
        }
    }, {
        key: "stop",
        value: function stop() {
            if (activeEffect === this) {
                this.deferStop = true;
            } else if (this.active) {
                cleanupEffect(this);
                if (this.onStop) {
                    this.onStop();
                }
                this.active = false;
            }
        }
    } ]);
    return ReactiveEffect;
}();

function cleanupEffect(effect) {
    var deps = effect.deps;
    if (deps.length) {
        for (var i = 0; i < deps.length; i++) {
            deps[i].delete(effect);
        }
        deps.length = 0;
    }
}

var shouldTrack = true;

var trackStack = [];

function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
}

function resetTracking() {
    var last = trackStack.pop();
    shouldTrack = last === void 0 ? true : last;
}

function track(target, type, key) {
    if (shouldTrack && activeEffect) {
        var depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, depsMap = /*   */ new Map());
        }
        var dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, dep = createDep());
        }
        var eventInfo = {
            effect: activeEffect,
            target: target,
            type: type,
            key: key
        };
        trackEffects(dep, eventInfo);
    }
}

function trackEffects(dep, debuggerEventExtraInfo) {
    var shouldTrack2 = false;
    if (effectTrackDepth <= maxMarkerBits) {
        if (!newTracked(dep)) {
            dep.n |= trackOpBit;
            shouldTrack2 = !wasTracked(dep);
        }
    } else {
        shouldTrack2 = !dep.has(activeEffect);
    }
    if (shouldTrack2) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
        if (activeEffect.onTrack) {
            activeEffect.onTrack(Object.assign({
                effect: activeEffect
            }, debuggerEventExtraInfo));
        }
    }
}

function trigger(target, type, key, newValue, oldValue, oldTarget) {
    var depsMap = targetMap.get(target);
    if (!depsMap) {
        return;
    }
    var deps = [];
    if (type === "clear") {
        deps = _toConsumableArray2(depsMap.values());
    } else if (key === "length" && isArray$1(target)) {
        var newLength = Number(newValue);
        depsMap.forEach(function(dep, key2) {
            if (key2 === "length" || key2 >= newLength) {
                deps.push(dep);
            }
        });
    } else {
        if (key !== void 0) {
            deps.push(depsMap.get(key));
        }
        switch (type) {
          case "add":
            if (!isArray$1(target)) {
                deps.push(depsMap.get(ITERATE_KEY));
                if (isMap(target)) {
                    deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                }
            } else if (isIntegerKey(key)) {
                deps.push(depsMap.get("length"));
            }
            break;

          case "delete":
            if (!isArray$1(target)) {
                deps.push(depsMap.get(ITERATE_KEY));
                if (isMap(target)) {
                    deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                }
            }
            break;

          case "set":
            if (isMap(target)) {
                deps.push(depsMap.get(ITERATE_KEY));
            }
            break;
        }
    }
    var eventInfo = {
        target: target,
        type: type,
        key: key,
        newValue: newValue,
        oldValue: oldValue,
        oldTarget: oldTarget
    };
    if (deps.length === 1) {
        if (deps[0]) {
            {
                triggerEffects(deps[0], eventInfo);
            }
        }
    } else {
        var effects = [];
        var _iterator2 = _createForOfIteratorHelper2(deps), _step2;
        try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                var dep = _step2.value;
                if (dep) {
                    effects.push.apply(effects, _toConsumableArray2(dep));
                }
            }
        } catch (err) {
            _iterator2.e(err);
        } finally {
            _iterator2.f();
        }
        {
            triggerEffects(createDep(effects), eventInfo);
        }
    }
}

function triggerEffects(dep, debuggerEventExtraInfo) {
    var effects = isArray$1(dep) ? dep : _toConsumableArray2(dep);
    var _iterator3 = _createForOfIteratorHelper2(effects), _step3;
    try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
            var effect = _step3.value;
            if (effect.computed) {
                triggerEffect(effect, debuggerEventExtraInfo);
            }
        }
    } catch (err) {
        _iterator3.e(err);
    } finally {
        _iterator3.f();
    }
    var _iterator4 = _createForOfIteratorHelper2(effects), _step4;
    try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
            var _effect = _step4.value;
            if (!_effect.computed) {
                triggerEffect(_effect, debuggerEventExtraInfo);
            }
        }
    } catch (err) {
        _iterator4.e(err);
    } finally {
        _iterator4.f();
    }
}

function triggerEffect(effect, debuggerEventExtraInfo) {
    if (effect !== activeEffect || effect.allowRecurse) {
        if (effect.onTrigger) {
            effect.onTrigger(extend({
                effect: effect
            }, debuggerEventExtraInfo));
        }
        if (effect.scheduler) {
            effect.scheduler();
        } else {
            effect.run();
        }
    }
}

function getDepFromReactive(object, key) {
    var _a2;
    return (_a2 = targetMap.get(object)) === null || _a2 === void 0 ? void 0 : _a2.get(key);
}

var isNonTrackableKeys = /*   */ makeMap("__proto__,__v_isRef,__isVue");

var builtInSymbols = new Set(/*   */ Object.getOwnPropertyNames(Symbol).filter(function(key) {
    return key !== "arguments" && key !== "caller";
}).map(function(key) {
    return Symbol[key];
}).filter(isSymbol$3));

var get$1 = /*   */ createGetter();

var shallowGet = /*   */ createGetter(false, true);

var readonlyGet = /*   */ createGetter(true);

var shallowReadonlyGet = /*   */ createGetter(true, true);

var arrayInstrumentations = /*   */ createArrayInstrumentations();

function createArrayInstrumentations() {
    var instrumentations = {};
    [ "includes", "indexOf", "lastIndexOf" ].forEach(function(key) {
        instrumentations[key] = function() {
            var arr = toRaw(this);
            for (var i = 0, l = this.length; i < l; i++) {
                track(arr, "get", i + "");
            }
            for (var _len8 = arguments.length, args = new Array(_len8), _key9 = 0; _key9 < _len8; _key9++) {
                args[_key9] = arguments[_key9];
            }
            var res = arr[key].apply(arr, args);
            if (res === -1 || res === false) {
                return arr[key].apply(arr, _toConsumableArray2(args.map(toRaw)));
            } else {
                return res;
            }
        };
    });
    [ "push", "pop", "shift", "unshift", "splice" ].forEach(function(key) {
        instrumentations[key] = function() {
            pauseTracking();
            for (var _len9 = arguments.length, args = new Array(_len9), _key10 = 0; _key10 < _len9; _key10++) {
                args[_key10] = arguments[_key10];
            }
            var res = toRaw(this)[key].apply(this, args);
            resetTracking();
            return res;
        };
    });
    return instrumentations;
}

function hasOwnProperty$1(key) {
    var obj = toRaw(this);
    track(obj, "has", key);
    return obj.hasOwnProperty(key);
}

function createGetter() {
    var isReadonly2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return function get3(target, key, receiver) {
        if (key === "__v_isReactive") {
            return !isReadonly2;
        } else if (key === "__v_isReadonly") {
            return isReadonly2;
        } else if (key === "__v_isShallow") {
            return shallow;
        } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
            return target;
        }
        var targetIsArray = isArray$1(target);
        if (!isReadonly2) {
            if (targetIsArray && hasOwn$b(arrayInstrumentations, key)) {
                return Reflect.get(arrayInstrumentations, key, receiver);
            }
            if (key === "hasOwnProperty") {
                return hasOwnProperty$1;
            }
        }
        var res = Reflect.get(target, key, receiver);
        if (isSymbol$3(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
            return res;
        }
        if (!isReadonly2) {
            track(target, "get", key);
        }
        if (shallow) {
            return res;
        }
        if (isRef(res)) {
            return targetIsArray && isIntegerKey(key) ? res : res.value;
        }
        if (isObject$a(res)) {
            return isReadonly2 ? readonly(res) : reactive(res);
        }
        return res;
    };
}

var set$1$1 = /*   */ createSetter();

var shallowSet = /*   */ createSetter(true);

function createSetter() {
    var shallow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return function set3(target, key, value, receiver) {
        var oldValue = target[key];
        if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
            return false;
        }
        if (!shallow) {
            if (!isShallow(value) && !isReadonly(value)) {
                oldValue = toRaw(oldValue);
                value = toRaw(value);
            }
            if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
        }
        var hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$b(target, key);
        var result = Reflect.set(target, key, value, receiver);
        if (target === toRaw(receiver)) {
            if (!hadKey) {
                trigger(target, "add", key, value);
            } else if (hasChanged(value, oldValue)) {
                trigger(target, "set", key, value, oldValue);
            }
        }
        return result;
    };
}

function deleteProperty(target, key) {
    var hadKey = hasOwn$b(target, key);
    var oldValue = target[key];
    var result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
}

function has$1(target, key) {
    var result = Reflect.has(target, key);
    if (!isSymbol$3(key) || !builtInSymbols.has(key)) {
        track(target, "has", key);
    }
    return result;
}

function ownKeys$2(target) {
    track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
    return Reflect.ownKeys(target);
}

var mutableHandlers = {
    get: get$1,
    set: set$1$1,
    deleteProperty: deleteProperty,
    has: has$1,
    ownKeys: ownKeys$2
};

var readonlyHandlers = {
    get: readonlyGet,
    set: function set(target, key) {
        {
            warn$1('Set operation on key "'.concat(String(key), '" failed: target is readonly.'), target);
        }
        return true;
    },
    deleteProperty: function deleteProperty(target, key) {
        {
            warn$1('Delete operation on key "'.concat(String(key), '" failed: target is readonly.'), target);
        }
        return true;
    }
};

var shallowReactiveHandlers = /*   */ extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
});

var shallowReadonlyHandlers = /*   */ extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
});

var toShallow = function toShallow(value) {
    return value;
};

var getProto = function getProto(v) {
    return Reflect.getPrototypeOf(v);
};

function get$2(target, key) {
    var isReadonly2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isShallow2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    target = target["__v_raw"
    /* ReactiveFlags.RAW */ ];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key);
    if (!isReadonly2) {
        if (key !== rawKey) {
            track(rawTarget, "get", key);
        }
        track(rawTarget, "get", rawKey);
    }
    var _getProto = getProto(rawTarget), has3 = _getProto.has;
    var wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    if (has3.call(rawTarget, key)) {
        return wrap(target.get(key));
    } else if (has3.call(rawTarget, rawKey)) {
        return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
        target.get(key);
    }
}

function has$2(key) {
    var isReadonly2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var target = this["__v_raw"
    /* ReactiveFlags.RAW */ ];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key);
    if (!isReadonly2) {
        if (key !== rawKey) {
            track(rawTarget, "has", key);
        }
        track(rawTarget, "has", rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}

function size(target) {
    var isReadonly2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    target = target["__v_raw"
    /* ReactiveFlags.RAW */ ];
    !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
    return Reflect.get(target, "size", target);
}

function add(value) {
    value = toRaw(value);
    var target = toRaw(this);
    var proto = getProto(target);
    var hadKey = proto.has.call(target, value);
    if (!hadKey) {
        target.add(value);
        trigger(target, "add", value, value);
    }
    return this;
}

function set$2(key, value) {
    value = toRaw(value);
    var target = toRaw(this);
    var _getProto2 = getProto(target), has3 = _getProto2.has, get3 = _getProto2.get;
    var hadKey = has3.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has3.call(target, key);
    } else {
        checkIdentityKeys(target, has3, key);
    }
    var oldValue = get3.call(target, key);
    target.set(key, value);
    if (!hadKey) {
        trigger(target, "add", key, value);
    } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
    }
    return this;
}

function deleteEntry(key) {
    var target = toRaw(this);
    var _getProto3 = getProto(target), has3 = _getProto3.has, get3 = _getProto3.get;
    var hadKey = has3.call(target, key);
    if (!hadKey) {
        key = toRaw(key);
        hadKey = has3.call(target, key);
    } else {
        checkIdentityKeys(target, has3, key);
    }
    var oldValue = get3 ? get3.call(target, key) : void 0;
    var result = target.delete(key);
    if (hadKey) {
        trigger(target, "delete", key, void 0, oldValue);
    }
    return result;
}

function clear() {
    var target = toRaw(this);
    var hadItems = target.size !== 0;
    var oldTarget = isMap(target) ? new Map(target) : new Set(target);
    var result = target.clear();
    if (hadItems) {
        trigger(target, "clear", void 0, void 0, oldTarget);
    }
    return result;
}

function createForEach(isReadonly2, isShallow2) {
    return function forEach4(callback, thisArg) {
        var observed = this;
        var target = observed["__v_raw"
        /* ReactiveFlags.RAW */ ];
        var rawTarget = toRaw(target);
        var wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
        return target.forEach(function(value, key) {
            return callback.call(thisArg, wrap(value), wrap(key), observed);
        });
    };
}

function createIterableMethod(method, isReadonly2, isShallow2) {
    return function() {
        var target = this["__v_raw"
        /* ReactiveFlags.RAW */ ];
        var rawTarget = toRaw(target);
        var targetIsMap = isMap(rawTarget);
        var isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
        var isKeyOnly = method === "keys" && targetIsMap;
        var innerIterator = target[method].apply(target, arguments);
        var wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
        !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
        return _defineProperty2({
            // iterator protocol
            next: function next() {
                var _innerIterator$next = innerIterator.next(), value = _innerIterator$next.value, done = _innerIterator$next.done;
                return done ? {
                    value: value,
                    done: done
                } : {
                    value: isPair ? [ wrap(value[0]), wrap(value[1]) ] : wrap(value),
                    done: done
                };
            }
        }, Symbol.iterator, function() {
            return this;
        });
    };
}

function createReadonlyMethod(type) {
    return function() {
        {
            var key = (arguments.length <= 0 ? undefined : arguments[0]) ? 'on key "'.concat(arguments.length <= 0 ? undefined : arguments[0], '" ') : "";
            console.warn("".concat(capitalize(type), " operation ").concat(key, "failed: target is readonly."), toRaw(this));
        }
        return type === "delete" ? false : this;
    };
}

function createInstrumentations() {
    var mutableInstrumentations2 = {
        get: function get(key) {
            return get$2(this, key);
        },
        get size() {
            return size(this);
        },
        has: has$2,
        add: add,
        set: set$2,
        delete: deleteEntry,
        clear: clear,
        forEach: createForEach(false, false)
    };
    var shallowInstrumentations2 = {
        get: function get(key) {
            return get$2(this, key, false, true);
        },
        get size() {
            return size(this);
        },
        has: has$2,
        add: add,
        set: set$2,
        delete: deleteEntry,
        clear: clear,
        forEach: createForEach(false, true)
    };
    var readonlyInstrumentations2 = {
        get: function get(key) {
            return get$2(this, key, true);
        },
        get size() {
            return size(this, true);
        },
        has: function has(key) {
            return has$2.call(this, key, true);
        },
        add: createReadonlyMethod("add"
        /* TriggerOpTypes.ADD */),
        set: createReadonlyMethod("set"
        /* TriggerOpTypes.SET */),
        delete: createReadonlyMethod("delete"
        /* TriggerOpTypes.DELETE */),
        clear: createReadonlyMethod("clear"
        /* TriggerOpTypes.CLEAR */),
        forEach: createForEach(true, false)
    };
    var shallowReadonlyInstrumentations2 = {
        get: function get(key) {
            return get$2(this, key, true, true);
        },
        get size() {
            return size(this, true);
        },
        has: function has(key) {
            return has$2.call(this, key, true);
        },
        add: createReadonlyMethod("add"
        /* TriggerOpTypes.ADD */),
        set: createReadonlyMethod("set"
        /* TriggerOpTypes.SET */),
        delete: createReadonlyMethod("delete"
        /* TriggerOpTypes.DELETE */),
        clear: createReadonlyMethod("clear"
        /* TriggerOpTypes.CLEAR */),
        forEach: createForEach(true, true)
    };
    var iteratorMethods = [ "keys", "values", "entries", Symbol.iterator ];
    iteratorMethods.forEach(function(method) {
        mutableInstrumentations2[method] = createIterableMethod(method, false, false);
        readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
        shallowInstrumentations2[method] = createIterableMethod(method, false, true);
        shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
    });
    return [ mutableInstrumentations2, readonlyInstrumentations2, shallowInstrumentations2, shallowReadonlyInstrumentations2 ];
}

var _createInstrumentatio = /*   */ createInstrumentations(), _createInstrumentatio2 = _slicedToArray2(_createInstrumentatio, 4), mutableInstrumentations = _createInstrumentatio2[0], readonlyInstrumentations = _createInstrumentatio2[1], shallowInstrumentations = _createInstrumentatio2[2], shallowReadonlyInstrumentations = _createInstrumentatio2[3];

function createInstrumentationGetter(isReadonly2, shallow) {
    var instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
    return function(target, key, receiver) {
        if (key === "__v_isReactive") {
            return !isReadonly2;
        } else if (key === "__v_isReadonly") {
            return isReadonly2;
        } else if (key === "__v_raw") {
            return target;
        }
        return Reflect.get(hasOwn$b(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
}

var mutableCollectionHandlers = {
    get: /*   */ createInstrumentationGetter(false, false)
};

var shallowCollectionHandlers = {
    get: /*   */ createInstrumentationGetter(false, true)
};

var readonlyCollectionHandlers = {
    get: /*   */ createInstrumentationGetter(true, false)
};

var shallowReadonlyCollectionHandlers = {
    get: /*   */ createInstrumentationGetter(true, true)
};

function checkIdentityKeys(target, has3, key) {
    var rawKey = toRaw(key);
    if (rawKey !== key && has3.call(target, rawKey)) {
        var type = toRawType(target);
        console.warn("Reactive ".concat(type, " contains both the raw and reactive versions of the same object").concat(type === "Map" ? " as keys" : "", ", which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible."));
    }
}

var reactiveMap = /*   */ new WeakMap();

var shallowReactiveMap = /*   */ new WeakMap();

var readonlyMap = /*   */ new WeakMap();

var shallowReadonlyMap = /*   */ new WeakMap();

function targetTypeMap(rawType) {
    switch (rawType) {
      case "Object":
      case "Array":
        return 1;

      case "Map":
      case "Set":
      case "WeakMap":
      case "WeakSet":
        return 2;

      default:
        return 0;
    }
}

function getTargetType(value) {
    return value["__v_skip"
    /* ReactiveFlags.SKIP */ ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}

function reactive(target) {
    if (isReadonly(target)) {
        return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}

function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}

function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}

function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}

function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject$a(target)) {
        {
            console.warn("value cannot be made reactive: ".concat(String(target)));
        }
        return target;
    }
    if (target["__v_raw"
    /* ReactiveFlags.RAW */ ] && !(isReadonly2 && target["__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */ ])) {
        return target;
    }
    var existingProxy = proxyMap.get(target);
    if (existingProxy) {
        return existingProxy;
    }
    var targetType = getTargetType(target);
    if (targetType === 0) {
        return target;
    }
    var proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
}

function isReactive(value) {
    if (isReadonly(value)) {
        return isReactive(value["__v_raw"
        /* ReactiveFlags.RAW */ ]);
    }
    return !!(value && value["__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */ ]);
}

function isReadonly(value) {
    return !!(value && value["__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */ ]);
}

function isShallow(value) {
    return !!(value && value["__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */ ]);
}

function isProxy(value) {
    return isReactive(value) || isReadonly(value);
}

function toRaw(observed) {
    var raw = observed && observed["__v_raw"
    /* ReactiveFlags.RAW */ ];
    return raw ? toRaw(raw) : observed;
}

function markRaw(value) {
    def(value, "__v_skip", true);
    return value;
}

var toReactive = function toReactive(value) {
    return isObject$a(value) ? reactive(value) : value;
};

var toReadonly = function toReadonly(value) {
    return isObject$a(value) ? readonly(value) : value;
};

function trackRefValue(ref2) {
    if (shouldTrack && activeEffect) {
        ref2 = toRaw(ref2);
        {
            trackEffects(ref2.dep || (ref2.dep = createDep()), {
                target: ref2,
                type: "get",
                key: "value"
            });
        }
    }
}

function triggerRefValue(ref2, newVal) {
    ref2 = toRaw(ref2);
    var dep = ref2.dep;
    if (dep) {
        {
            triggerEffects(dep, {
                target: ref2,
                type: "set",
                key: "value",
                newValue: newVal
            });
        }
    }
}

function isRef(r) {
    return !!(r && r.__v_isRef === true);
}

function ref(value) {
    return createRef(value, false);
}

function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
        return rawValue;
    }
    return new RefImpl(rawValue, shallow);
}

var RefImpl = /* */ function() {
    function RefImpl(value, __v_isShallow) {
        _classCallCheck2(this, RefImpl);
        this.__v_isShallow = __v_isShallow;
        this.dep = void 0;
        this.__v_isRef = true;
        this._rawValue = __v_isShallow ? value : toRaw(value);
        this._value = __v_isShallow ? value : toReactive(value);
    }
    _createClass2(RefImpl, [ {
        key: "value",
        get: function get() {
            trackRefValue(this);
            return this._value;
        },
        set: function set(newVal) {
            var useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
            newVal = useDirectValue ? newVal : toRaw(newVal);
            if (hasChanged(newVal, this._rawValue)) {
                this._rawValue = newVal;
                this._value = useDirectValue ? newVal : toReactive(newVal);
                triggerRefValue(this, newVal);
            }
        }
    } ]);
    return RefImpl;
}();

function unref(ref2) {
    return isRef(ref2) ? ref2.value : ref2;
}

var shallowUnwrapHandlers = {
    get: function get(target, key, receiver) {
        return unref(Reflect.get(target, key, receiver));
    },
    set: function set(target, key, value, receiver) {
        var oldValue = target[key];
        if (isRef(oldValue) && !isRef(value)) {
            oldValue.value = value;
            return true;
        } else {
            return Reflect.set(target, key, value, receiver);
        }
    }
};

function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}

function toRefs(object) {
    if (!isProxy(object)) {
        console.warn("toRefs() expects a reactive object but received a plain one.");
    }
    var ret = isArray$1(object) ? new Array(object.length) : {};
    for (var key in object) {
        ret[key] = toRef(object, key);
    }
    return ret;
}

var ObjectRefImpl = /* */ function() {
    function ObjectRefImpl(_object, _key, _defaultValue) {
        _classCallCheck2(this, ObjectRefImpl);
        this._object = _object;
        this._key = _key;
        this._defaultValue = _defaultValue;
        this.__v_isRef = true;
    }
    _createClass2(ObjectRefImpl, [ {
        key: "value",
        get: function get() {
            var val = this._object[this._key];
            return val === void 0 ? this._defaultValue : val;
        },
        set: function set(newVal) {
            this._object[this._key] = newVal;
        }
    }, {
        key: "dep",
        get: function get() {
            return getDepFromReactive(toRaw(this._object), this._key);
        }
    } ]);
    return ObjectRefImpl;
}();

function toRef(object, key, defaultValue) {
    var val = object[key];
    return isRef(val) ? val : new ObjectRefImpl(object, key, defaultValue);
}

var _a;

var ComputedRefImpl = /* */ function() {
    function ComputedRefImpl(getter, _setter, isReadonly2, isSSR) {
        var _this = this;
        _classCallCheck2(this, ComputedRefImpl);
        this._setter = _setter;
        this.dep = void 0;
        this.__v_isRef = true;
        this[_a] = false;
        this._dirty = true;
        this.effect = new ReactiveEffect(getter, function() {
            if (!_this._dirty) {
                _this._dirty = true;
                triggerRefValue(_this);
            }
        });
        this.effect.computed = this;
        this.effect.active = this._cacheable = !isSSR;
        this["__v_isReadonly"
        /* ReactiveFlags.IS_READONLY */ ] = isReadonly2;
    }
    _createClass2(ComputedRefImpl, [ {
        key: "value",
        get: function get() {
            var self2 = toRaw(this);
            trackRefValue(self2);
            if (self2._dirty || !self2._cacheable) {
                self2._dirty = false;
                self2._value = self2.effect.run();
            }
            return self2._value;
        },
        set: function set(newValue) {
            this._setter(newValue);
        }
    } ]);
    return ComputedRefImpl;
}();

_a = "__v_isReadonly";

function computed$1(getterOrOptions, debugOptions) {
    var isSSR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var getter;
    var setter;
    var onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
        getter = getterOrOptions;
        setter = function setter() {
            console.warn("Write operation failed: computed value is readonly");
        };
    } else {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    }
    var cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    if (debugOptions && !isSSR) {
        cRef.effect.onTrack = debugOptions.onTrack;
        cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
}

var stack = [];

function pushWarningContext(vnode) {
    stack.push(vnode);
}

function popWarningContext() {
    stack.pop();
}

function warn(msg) {
    pauseTracking();
    var instance = stack.length ? stack[stack.length - 1].component : null;
    var appWarnHandler = instance && instance.appContext.config.warnHandler;
    var trace = getComponentTrace();
    for (var _len10 = arguments.length, args = new Array(_len10 > 1 ? _len10 - 1 : 0), _key11 = 1; _key11 < _len10; _key11++) {
        args[_key11 - 1] = arguments[_key11];
    }
    if (appWarnHandler) {
        callWithErrorHandling(appWarnHandler, instance, 11, [ msg + args.join(""), instance && instance.proxy, trace.map(function(_ref3) {
            var vnode = _ref3.vnode;
            return "at <".concat(formatComponentName(instance, vnode.type), ">");
        }).join("\n"), trace ]);
    } else {
        var _console2;
        var warnArgs = [ "[Vue warn]: ".concat(msg) ].concat(args);
        if (trace.length && 
        // avoid spamming console during tests
        true) {
            warnArgs.push.apply(warnArgs, [ "\n" ].concat(_toConsumableArray2(formatTrace(trace))));
        }
        (_console2 = console).warn.apply(_console2, _toConsumableArray2(warnArgs));
    }
    resetTracking();
}

function getComponentTrace() {
    var currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
        return [];
    }
    var normalizedStack = [];
    while (currentVNode) {
        var last = normalizedStack[0];
        if (last && last.vnode === currentVNode) {
            last.recurseCount++;
        } else {
            normalizedStack.push({
                vnode: currentVNode,
                recurseCount: 0
            });
        }
        var parentInstance = currentVNode.component && currentVNode.component.parent;
        currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
}

function formatTrace(trace) {
    var logs = [];
    trace.forEach(function(entry, i) {
        logs.push.apply(logs, _toConsumableArray2(i === 0 ? [] : [ "\n" ]).concat(_toConsumableArray2(formatTraceEntry(entry))));
    });
    return logs;
}

function formatTraceEntry(_ref4) {
    var vnode = _ref4.vnode, recurseCount = _ref4.recurseCount;
    var postfix2 = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
    var isRoot = vnode.component ? vnode.component.parent == null : false;
    var open = " at <".concat(formatComponentName(vnode.component, vnode.type, isRoot));
    var close = ">" + postfix2;
    return vnode.props ? [ open ].concat(_toConsumableArray2(formatProps(vnode.props)), [ close ]) : [ open + close ];
}

function formatProps(props) {
    var res = [];
    var keys4 = Object.keys(props);
    keys4.slice(0, 3).forEach(function(key) {
        res.push.apply(res, _toConsumableArray2(formatProp(key, props[key])));
    });
    if (keys4.length > 3) {
        res.push(" ...");
    }
    return res;
}

function formatProp(key, value, raw) {
    if (isString(value)) {
        value = JSON.stringify(value);
        return raw ? value : [ "".concat(key, "=").concat(value) ];
    } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
        return raw ? value : [ "".concat(key, "=").concat(value) ];
    } else if (isRef(value)) {
        value = formatProp(key, toRaw(value.value), true);
        return raw ? value : [ "".concat(key, "=Ref<"), value, ">" ];
    } else if (isFunction(value)) {
        return [ "".concat(key, "=fn").concat(value.name ? "<".concat(value.name, ">") : "") ];
    } else {
        value = toRaw(value);
        return raw ? value : [ "".concat(key, "="), value ];
    }
}

var ErrorTypeStrings = (_ErrorTypeStrings = {}, _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_ErrorTypeStrings, "sp"
/* LifecycleHooks.SERVER_PREFETCH */ , "serverPrefetch hook"), "bc"
/* LifecycleHooks.BEFORE_CREATE */ , "beforeCreate hook"), "c"
/* LifecycleHooks.CREATED */ , "created hook"), "bm"
/* LifecycleHooks.BEFORE_MOUNT */ , "beforeMount hook"), "m"
/* LifecycleHooks.MOUNTED */ , "mounted hook"), "bu"
/* LifecycleHooks.BEFORE_UPDATE */ , "beforeUpdate hook"), "u"
/* LifecycleHooks.UPDATED */ , "updated"), "bum"
/* LifecycleHooks.BEFORE_UNMOUNT */ , "beforeUnmount hook"), "um"
/* LifecycleHooks.UNMOUNTED */ , "unmounted hook"), "a"
/* LifecycleHooks.ACTIVATED */ , "activated hook"), _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_ErrorTypeStrings, "da"
/* LifecycleHooks.DEACTIVATED */ , "deactivated hook"), "ec"
/* LifecycleHooks.ERROR_CAPTURED */ , "errorCaptured hook"), "rtc"
/* LifecycleHooks.RENDER_TRACKED */ , "renderTracked hook"), "rtg"
/* LifecycleHooks.RENDER_TRIGGERED */ , "renderTriggered hook"), 0
/* ErrorCodes.SETUP_FUNCTION */ , "setup function"), 1
/* ErrorCodes.RENDER_FUNCTION */ , "render function"), 2
/* ErrorCodes.WATCH_GETTER */ , "watcher getter"), 3
/* ErrorCodes.WATCH_CALLBACK */ , "watcher callback"), 4
/* ErrorCodes.WATCH_CLEANUP */ , "watcher cleanup function"), 5
/* ErrorCodes.NATIVE_EVENT_HANDLER */ , "native event handler"), _defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_defineProperty2(_ErrorTypeStrings, 6
/* ErrorCodes.COMPONENT_EVENT_HANDLER */ , "component event handler"), 7
/* ErrorCodes.VNODE_HOOK */ , "vnode hook"), 8
/* ErrorCodes.DIRECTIVE_HOOK */ , "directive hook"), 9
/* ErrorCodes.TRANSITION_HOOK */ , "transition hook"), 10
/* ErrorCodes.APP_ERROR_HANDLER */ , "app errorHandler"), 11
/* ErrorCodes.APP_WARN_HANDLER */ , "app warnHandler"), 12
/* ErrorCodes.FUNCTION_REF */ , "ref function"), 13
/* ErrorCodes.ASYNC_COMPONENT_LOADER */ , "async component loader"), 14
/* ErrorCodes.SCHEDULER */ , "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"));

function callWithErrorHandling(fn, instance, type, args) {
    var res;
    try {
        res = args ? fn.apply(void 0, _toConsumableArray2(args)) : fn();
    } catch (err) {
        handleError(err, instance, type);
    }
    return res;
}

function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
        var res = callWithErrorHandling(fn, instance, type, args);
        if (res && isPromise(res)) {
            res.catch(function(err) {
                handleError(err, instance, type);
            });
        }
        return res;
    }
    var values3 = [];
    for (var i = 0; i < fn.length; i++) {
        values3.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values3;
}

function handleError(err, instance, type) {
    var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var contextVNode = instance ? instance.vnode : null;
    if (instance) {
        var cur = instance.parent;
        var exposedInstance = instance.proxy;
        var errorInfo = ErrorTypeStrings[type] || type;
        while (cur) {
            var errorCapturedHooks = cur.ec;
            if (errorCapturedHooks) {
                for (var i = 0; i < errorCapturedHooks.length; i++) {
                    if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                        return;
                    }
                }
            }
            cur = cur.parent;
        }
        var appErrorHandler = instance.appContext.config.errorHandler;
        if (appErrorHandler) {
            callWithErrorHandling(appErrorHandler, null, 10, [ err, exposedInstance, errorInfo ]);
            return;
        }
    }
    logError(err, type, contextVNode, throwInDev);
}

function logError(err, type, contextVNode) {
    var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    {
        var info = ErrorTypeStrings[type] || type;
        if (contextVNode) {
            pushWarningContext(contextVNode);
        }
        warn("Unhandled error".concat(info ? " during execution of ".concat(info) : ""));
        if (contextVNode) {
            popWarningContext();
        }
        if (throwInDev) {
            console.error(err);
        } else {
            console.error(err);
        }
    }
}

var isFlushing = false;

var isFlushPending = false;

var queue = [];

var flushIndex = 0;

var pendingPostFlushCbs = [];

var activePostFlushCbs = null;

var postFlushIndex = 0;

var resolvedPromise = /*   */ Promise.resolve();

var currentFlushPromise = null;

var RECURSION_LIMIT = 100;

function nextTick$1(fn) {
    var p2 = currentFlushPromise || resolvedPromise;
    return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}

function findInsertionIndex(id2) {
    var start = flushIndex + 1;
    var end = queue.length;
    while (start < end) {
        var middle = start + end >>> 1;
        var middleJobId = getId(queue[middle]);
        middleJobId < id2 ? start = middle + 1 : end = middle;
    }
    return start;
}

function queueJob(job) {
    if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
        if (job.id == null) {
            queue.push(job);
        } else {
            queue.splice(findInsertionIndex(job.id), 0, job);
        }
        queueFlush();
    }
}

function queueFlush() {
    if (!isFlushing && !isFlushPending) {
        isFlushPending = true;
        currentFlushPromise = resolvedPromise.then(flushJobs);
    }
}

function hasQueueJob(job) {
    return queue.indexOf(job) > -1;
}

function invalidateJob(job) {
    var i = queue.indexOf(job);
    if (i > flushIndex) {
        queue.splice(i, 1);
    }
}

function queuePostFlushCb(cb) {
    if (!isArray$1(cb)) {
        if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
            pendingPostFlushCbs.push(cb);
        }
    } else {
        pendingPostFlushCbs.push.apply(pendingPostFlushCbs, _toConsumableArray2(cb));
    }
    queueFlush();
}

function flushPreFlushCbs(seen) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isFlushing ? flushIndex + 1 : 0;
    {
        seen = seen || /*   */ new Map();
    }
    for (;i < queue.length; i++) {
        var cb = queue[i];
        if (cb && cb.pre) {
            if (checkRecursiveUpdates(seen, cb)) {
                continue;
            }
            queue.splice(i, 1);
            i--;
            cb();
        }
    }
}

function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
        var deduped = _toConsumableArray2(new Set(pendingPostFlushCbs));
        pendingPostFlushCbs.length = 0;
        if (activePostFlushCbs) {
            var _activePostFlushCbs;
            (_activePostFlushCbs = activePostFlushCbs).push.apply(_activePostFlushCbs, _toConsumableArray2(deduped));
            return;
        }
        activePostFlushCbs = deduped;
        {
            seen = seen || /*   */ new Map();
        }
        activePostFlushCbs.sort(function(a, b) {
            return getId(a) - getId(b);
        });
        for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
            if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
                continue;
            }
            activePostFlushCbs[postFlushIndex]();
        }
        activePostFlushCbs = null;
        postFlushIndex = 0;
    }
}

var getId = function getId(job) {
    return job.id == null ? Infinity : job.id;
};

var comparator = function comparator(a, b) {
    var diff2 = getId(a) - getId(b);
    if (diff2 === 0) {
        if (a.pre && !b.pre) return -1;
        if (b.pre && !a.pre) return 1;
    }
    return diff2;
};

function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    {
        seen = seen || /*   */ new Map();
    }
    queue.sort(comparator);
    var check2 = function check2(job) {
        return checkRecursiveUpdates(seen, job);
    };
    try {
        for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
            var job = queue[flushIndex];
            if (job && job.active !== false) {
                if (check2(job)) {
                    continue;
                }
                callWithErrorHandling(job, null, 14
                /* ErrorCodes.SCHEDULER */);
            }
        }
    } finally {
        flushIndex = 0;
        queue.length = 0;
        flushPostFlushCbs(seen);
        isFlushing = false;
        currentFlushPromise = null;
        if (queue.length || pendingPostFlushCbs.length) {
            flushJobs(seen);
        }
    }
}

function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
        seen.set(fn, 1);
    } else {
        var count = seen.get(fn);
        if (count > RECURSION_LIMIT) {
            var instance = fn.ownerInstance;
            var componentName = instance && getComponentName(instance.type);
            warn("Maximum recursive updates exceeded".concat(componentName ? " in component <".concat(componentName, ">") : "", ". This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function."));
            return true;
        } else {
            seen.set(fn, count + 1);
        }
    }
}

var devtools;

var buffer = [];

var devtoolsNotInstalled = false;

function emit$1(event) {
    for (var _len11 = arguments.length, args = new Array(_len11 > 1 ? _len11 - 1 : 0), _key12 = 1; _key12 < _len11; _key12++) {
        args[_key12 - 1] = arguments[_key12];
    }
    if (devtools) {
        var _devtools;
        (_devtools = devtools).emit.apply(_devtools, [ event ].concat(args));
    } else if (!devtoolsNotInstalled) {
        buffer.push({
            event: event,
            args: args
        });
    }
}

function setDevtoolsHook(hook, target) {
    var _a2, _b;
    devtools = hook;
    if (devtools) {
        devtools.enabled = true;
        buffer.forEach(function(_ref9) {
            var _devtools2;
            var event = _ref9.event, args = _ref9.args;
            return (_devtools2 = devtools).emit.apply(_devtools2, [ event ].concat(_toConsumableArray2(args)));
        });
        buffer = [];
    } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && 
    // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && 
    // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))) {
        var replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
        replay.push(function(newHook) {
            setDevtoolsHook(newHook, target);
        });
        setTimeout(function() {
            if (!devtools) {
                target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
                devtoolsNotInstalled = true;
                buffer = [];
            }
        }, 3e3);
    } else {
        devtoolsNotInstalled = true;
        buffer = [];
    }
}

function devtoolsInitApp(app, version2) {
    emit$1("app:init", app, version2, {
        Fragment: Fragment,
        Text: Text,
        Comment: Comment,
        Static: Static
    });
}

var devtoolsComponentAdded = /*   */ createDevtoolsComponentHook("component:added"
/* DevtoolsHooks.COMPONENT_ADDED */);

var devtoolsComponentUpdated = /*   */ createDevtoolsComponentHook("component:updated"
/* DevtoolsHooks.COMPONENT_UPDATED */);

var _devtoolsComponentRemoved = /*   */ createDevtoolsComponentHook("component:removed"
/* DevtoolsHooks.COMPONENT_REMOVED */);

var devtoolsComponentRemoved = function devtoolsComponentRemoved(component) {
    if (devtools && typeof devtools.cleanupBuffer === "function" && 
    // remove the component if it wasn't buffered
    !devtools.cleanupBuffer(component)) {
        _devtoolsComponentRemoved(component);
    }
};

function createDevtoolsComponentHook(hook) {
    return function(component) {
        emit$1(hook, component.appContext.app, component.uid, 
        // fixed by xxxxxx
        // 为 0 是 App，无 parent 是 Page 指向 App
        component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0, component);
    };
}

var devtoolsPerfStart = /*   */ createDevtoolsPerformanceHook("perf:start"
/* DevtoolsHooks.PERFORMANCE_START */);

var devtoolsPerfEnd = /*   */ createDevtoolsPerformanceHook("perf:end"
/* DevtoolsHooks.PERFORMANCE_END */);

function createDevtoolsPerformanceHook(hook) {
    return function(component, type, time) {
        emit$1(hook, component.appContext.app, component.uid, component, type, time);
    };
}

function devtoolsComponentEmit(component, event, params2) {
    emit$1("component:emit", component.appContext.app, component, event, params2);
}

function emit(instance, event) {
    if (instance.isUnmounted) return;
    var props = instance.vnode.props || EMPTY_OBJ;
    for (var _len12 = arguments.length, rawArgs = new Array(_len12 > 2 ? _len12 - 2 : 0), _key13 = 2; _key13 < _len12; _key13++) {
        rawArgs[_key13 - 2] = arguments[_key13];
    }
    {
        var emitsOptions = instance.emitsOptions, _instance$propsOption = _slicedToArray2(instance.propsOptions, 1), propsOptions = _instance$propsOption[0];
        if (emitsOptions) {
            if (!(event in emitsOptions) && true) {
                if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
                    warn('Component emitted event "'.concat(event, '" but it is neither declared in the emits option nor as an "').concat(toHandlerKey(event), '" prop.'));
                }
            } else {
                var validator = emitsOptions[event];
                if (isFunction(validator)) {
                    var isValid = validator.apply(void 0, rawArgs);
                    if (!isValid) {
                        warn('Invalid event arguments: event validation failed for event "'.concat(event, '".'));
                    }
                }
            }
        }
    }
    var args = rawArgs;
    var isModelListener2 = event.startsWith("update:");
    var modelArg = isModelListener2 && event.slice(7);
    if (modelArg && modelArg in props) {
        var modifiersKey = "".concat(modelArg === "modelValue" ? "model" : modelArg, "Modifiers");
        var _ref10 = props[modifiersKey] || EMPTY_OBJ, number = _ref10.number, trim = _ref10.trim;
        if (trim) {
            args = rawArgs.map(function(a) {
                return isString(a) ? a.trim() : a;
            });
        }
        if (number) {
            args = rawArgs.map(looseToNumber);
        }
    }
    {
        devtoolsComponentEmit(instance, event, args);
    }
    {
        var lowerCaseEvent = event.toLowerCase();
        if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
            warn('Event "'.concat(lowerCaseEvent, '" is emitted in component ').concat(formatComponentName(instance, instance.type), ' but the handler is registered for "').concat(event, '". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "').concat(hyphenate(event), '" instead of "').concat(event, '".'));
        }
    }
    var handlerName;
    var handler = props[handlerName = toHandlerKey(event)] || 
    // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    if (!handler && isModelListener2) {
        handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
        callWithAsyncErrorHandling(handler, instance, 6, args);
    }
    var onceHandler = props[handlerName + "Once"];
    if (onceHandler) {
        if (!instance.emitted) {
            instance.emitted = {};
        } else if (instance.emitted[handlerName]) {
            return;
        }
        instance.emitted[handlerName] = true;
        callWithAsyncErrorHandling(onceHandler, instance, 6, args);
    }
}

function normalizeEmitsOptions(comp, appContext) {
    var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var cache = appContext.emitsCache;
    var cached = cache.get(comp);
    if (cached !== void 0) {
        return cached;
    }
    var raw = comp.emits;
    var normalized = {};
    var hasExtends = false;
    if (!isFunction(comp)) {
        var extendEmits = function extendEmits(raw2) {
            var normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
            if (normalizedFromExtend) {
                hasExtends = true;
                extend(normalized, normalizedFromExtend);
            }
        };
        if (!asMixin && appContext.mixins.length) {
            appContext.mixins.forEach(extendEmits);
        }
        if (comp.extends) {
            extendEmits(comp.extends);
        }
        if (comp.mixins) {
            comp.mixins.forEach(extendEmits);
        }
    }
    if (!raw && !hasExtends) {
        if (isObject$a(comp)) {
            cache.set(comp, null);
        }
        return null;
    }
    if (isArray$1(raw)) {
        raw.forEach(function(key) {
            return normalized[key] = null;
        });
    } else {
        extend(normalized, raw);
    }
    if (isObject$a(comp)) {
        cache.set(comp, normalized);
    }
    return normalized;
}

function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
        return false;
    }
    key = key.slice(2).replace(/Once$/, "");
    return hasOwn$b(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$b(options, hyphenate(key)) || hasOwn$b(options, key);
}

var currentRenderingInstance = null;

function setCurrentRenderingInstance(instance) {
    var prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    instance && instance.type.__scopeId || null;
    return prev;
}

function provide(key, value) {
    if (!currentInstance) {
        {
            warn("provide() can only be used inside setup().");
        }
    } else {
        var provides = currentInstance.provides;
        var parentProvides = currentInstance.parent && currentInstance.parent.provides;
        if (parentProvides === provides) {
            provides = currentInstance.provides = Object.create(parentProvides);
        }
        provides[key] = value;
        if (currentInstance.type.mpType === "app") {
            currentInstance.appContext.app.provide(key, value);
        }
    }
}

function inject(key, defaultValue) {
    var treatDefaultAsFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var instance = currentInstance || currentRenderingInstance;
    if (instance) {
        var provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
        if (provides && key in provides) {
            return provides[key];
        } else if (arguments.length > 1) {
            return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
        } else {
            warn('injection "'.concat(String(key), '" not found.'));
        }
    } else {
        warn("inject() can only be used inside setup() or functional components.");
    }
}

var INITIAL_WATCHER_VALUE = {};

function watch(source, cb, options) {
    if (!isFunction(cb)) {
        warn("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature.");
    }
    return doWatch(source, cb, options);
}

function doWatch(source, cb) {
    var _ref11 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ, immediate = _ref11.immediate, deep = _ref11.deep, flush = _ref11.flush, onTrack = _ref11.onTrack, onTrigger = _ref11.onTrigger;
    if (!cb) {
        if (immediate !== void 0) {
            warn('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.');
        }
        if (deep !== void 0) {
            warn('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.');
        }
    }
    var warnInvalidSource = function warnInvalidSource(s) {
        warn("Invalid watch source: ", s, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
    };
    var instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
    var getter;
    var forceTrigger = false;
    var isMultiSource = false;
    if (isRef(source)) {
        getter = function getter() {
            return source.value;
        };
        forceTrigger = isShallow(source);
    } else if (isReactive(source)) {
        getter = function getter() {
            return source;
        };
        deep = true;
    } else if (isArray$1(source)) {
        isMultiSource = true;
        forceTrigger = source.some(function(s) {
            return isReactive(s) || isShallow(s);
        });
        getter = function getter() {
            return source.map(function(s) {
                if (isRef(s)) {
                    return s.value;
                } else if (isReactive(s)) {
                    return traverse(s);
                } else if (isFunction(s)) {
                    return callWithErrorHandling(s, instance, 2
                    /* ErrorCodes.WATCH_GETTER */);
                } else {
                    warnInvalidSource(s);
                }
            });
        };
    } else if (isFunction(source)) {
        if (cb) {
            getter = function getter() {
                return callWithErrorHandling(source, instance, 2
                /* ErrorCodes.WATCH_GETTER */);
            };
        } else {
            getter = function getter() {
                if (instance && instance.isUnmounted) {
                    return;
                }
                if (cleanup) {
                    cleanup();
                }
                return callWithAsyncErrorHandling(source, instance, 3, [ onCleanup ]);
            };
        }
    } else {
        getter = NOOP;
        warnInvalidSource(source);
    }
    if (cb && deep) {
        var baseGetter = getter;
        getter = function getter() {
            return traverse(baseGetter());
        };
    }
    var cleanup;
    var onCleanup = function onCleanup(fn) {
        cleanup = effect.onStop = function() {
            callWithErrorHandling(fn, instance, 4
            /* ErrorCodes.WATCH_CLEANUP */);
        };
    };
    var oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    var job = function job() {
        if (!effect.active) {
            return;
        }
        if (cb) {
            var newValue = effect.run();
            if (deep || forceTrigger || (isMultiSource ? newValue.some(function(v, i) {
                return hasChanged(v, oldValue[i]);
            }) : hasChanged(newValue, oldValue)) || false) {
                if (cleanup) {
                    cleanup();
                }
                callWithAsyncErrorHandling(cb, instance, 3, [ newValue, 
                // pass undefined as the old value when it's changed for the first time
                oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue, onCleanup ]);
                oldValue = newValue;
            }
        } else {
            effect.run();
        }
    };
    job.allowRecurse = !!cb;
    var scheduler;
    if (flush === "sync") {
        scheduler = job;
    } else if (flush === "post") {
        scheduler = function scheduler() {
            return queuePostRenderEffect$1(job, instance && instance.suspense);
        };
    } else {
        job.pre = true;
        if (instance) job.id = instance.uid;
        scheduler = function scheduler() {
            return queueJob(job);
        };
    }
    var effect = new ReactiveEffect(getter, scheduler);
    {
        effect.onTrack = onTrack;
        effect.onTrigger = onTrigger;
    }
    if (cb) {
        if (immediate) {
            job();
        } else {
            oldValue = effect.run();
        }
    } else if (flush === "post") {
        queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
    } else {
        effect.run();
    }
    var unwatch = function unwatch() {
        effect.stop();
        if (instance && instance.scope) {
            remove(instance.scope.effects, effect);
        }
    };
    return unwatch;
}

function instanceWatch(source, value, options) {
    var publicThis = this.proxy;
    var getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : function() {
        return publicThis[source];
    } : source.bind(publicThis, publicThis);
    var cb;
    if (isFunction(value)) {
        cb = value;
    } else {
        cb = value.handler;
        options = value;
    }
    var cur = currentInstance;
    setCurrentInstance(this);
    var res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
        setCurrentInstance(cur);
    } else {
        unsetCurrentInstance();
    }
    return res;
}

function createPathGetter(ctx, path2) {
    var segments = path2.split(".");
    return function() {
        var cur = ctx;
        for (var i = 0; i < segments.length && cur; i++) {
            cur = cur[segments[i]];
        }
        return cur;
    };
}

function traverse(value, seen) {
    if (!isObject$a(value) || value["__v_skip"
    /* ReactiveFlags.SKIP */ ]) {
        return value;
    }
    seen = seen || /*   */ new Set();
    if (seen.has(value)) {
        return value;
    }
    seen.add(value);
    if (isRef(value)) {
        traverse(value.value, seen);
    } else if (isArray$1(value)) {
        for (var i = 0; i < value.length; i++) {
            traverse(value[i], seen);
        }
    } else if (isSet(value) || isMap(value)) {
        value.forEach(function(v) {
            traverse(v, seen);
        });
    } else if (isPlainObject$2(value)) {
        for (var key in value) {
            traverse(value[key], seen);
        }
    }
    return value;
}

function defineComponent(options) {
    return isFunction(options) ? {
        setup: options,
        name: options.name
    } : options;
}

var isKeepAlive = function isKeepAlive(vnode) {
    return vnode.type.__isKeepAlive;
};

function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a", target);
}

function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da", target);
}

function registerKeepAliveHook(hook, type) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
    var wrappedHook = hook.__wdc || (hook.__wdc = function() {
        var current = target;
        while (current) {
            if (current.isDeactivated) {
                return;
            }
            current = current.parent;
        }
        return hook();
    });
    injectHook(type, wrappedHook, target);
    if (target) {
        var current = target.parent;
        while (current && current.parent) {
            if (isKeepAlive(current.parent.vnode)) {
                injectToKeepAliveRoot(wrappedHook, type, target, current);
            }
            current = current.parent;
        }
    }
}

function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    var injected = injectHook(type, hook, keepAliveRoot, true
    /* prepend */);
    onUnmounted(function() {
        remove(keepAliveRoot[type], injected);
    }, target);
}

function injectHook(type, hook) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
    var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (target) {
        if (isRootHook(type)) {
            target = target.root;
        }
        var hooks = target[type] || (target[type] = []);
        var wrappedHook = hook.__weh || (hook.__weh = function() {
            if (target.isUnmounted) {
                return;
            }
            pauseTracking();
            setCurrentInstance(target);
            for (var _len13 = arguments.length, args = new Array(_len13), _key14 = 0; _key14 < _len13; _key14++) {
                args[_key14] = arguments[_key14];
            }
            var res = callWithAsyncErrorHandling(hook, target, type, args);
            unsetCurrentInstance();
            resetTracking();
            return res;
        });
        if (prepend) {
            hooks.unshift(wrappedHook);
        } else {
            hooks.push(wrappedHook);
        }
        return wrappedHook;
    } else {
        var apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
        warn("".concat(apiName, " is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup()."));
    }
}

var createHook$1 = function createHook$1(lifecycle) {
    return function(hook) {
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
        return;
        // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
                // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
        (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, function() {
            return hook.apply(void 0, arguments);
        }, target);
    };
};

var onBeforeMount = createHook$1("bm"
/* LifecycleHooks.BEFORE_MOUNT */);

var onMounted = createHook$1("m"
/* LifecycleHooks.MOUNTED */);

var onBeforeUpdate = createHook$1("bu"
/* LifecycleHooks.BEFORE_UPDATE */);

var onUpdated = createHook$1("u"
/* LifecycleHooks.UPDATED */);

var onBeforeUnmount = createHook$1("bum"
/* LifecycleHooks.BEFORE_UNMOUNT */);

var onUnmounted = createHook$1("um"
/* LifecycleHooks.UNMOUNTED */);

var onServerPrefetch = createHook$1("sp"
/* LifecycleHooks.SERVER_PREFETCH */);

var onRenderTriggered = createHook$1("rtg"
/* LifecycleHooks.RENDER_TRIGGERED */);

var onRenderTracked = createHook$1("rtc"
/* LifecycleHooks.RENDER_TRACKED */);

function onErrorCaptured(hook) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
    injectHook("ec", hook, target);
}

function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
        warn("Do not use built-in directive ids as custom directive id: " + name);
    }
}

var COMPONENTS = "components";

function resolveComponent(name, maybeSelfReference) {
    return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}

function resolveAsset(type, name) {
    var warnMissing = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var maybeSelfReference = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var instance = currentRenderingInstance || currentInstance;
    if (instance) {
        var Component2 = instance.type;
        if (type === COMPONENTS) {
            var selfName = getComponentName(Component2, false
            /* do not include inferred name to avoid breaking existing code */);
            if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
                return Component2;
            }
        }
        var res = 
        // local registration
        // check instance[type] first which is resolved for options API
        resolve(instance[type] || Component2[type], name) || 
        // global registration
        resolve(instance.appContext[type], name);
        if (!res && maybeSelfReference) {
            return Component2;
        }
        if (warnMissing && !res) {
            var extra = type === COMPONENTS ? "\nIf this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement." : "";
            warn("Failed to resolve ".concat(type.slice(0, -1), ": ").concat(name).concat(extra));
        }
        return res;
    } else {
        warn("resolve".concat(capitalize(type.slice(0, -1)), " can only be used in render() or setup()."));
    }
}

function resolve(registry, name) {
    return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}

var getPublicInstance = function getPublicInstance(i) {
    if (!i) return null;
    if (isStatefulComponent(i)) return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
};

var publicPropertiesMap = 
// Move PURE marker to new line to workaround compiler discarding it
// due to type annotation
/*   */
extend(/*   */ Object.create(null), {
    $: function $(i) {
        return i;
    },
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: function $el(i) {
        return i.__$el || (i.__$el = {});
    },
    $data: function $data(i) {
        return i.data;
    },
    $props: function $props(i) {
        return shallowReadonly(i.props);
    },
    $attrs: function $attrs(i) {
        return shallowReadonly(i.attrs);
    },
    $slots: function $slots(i) {
        return shallowReadonly(i.slots);
    },
    $refs: function $refs(i) {
        return shallowReadonly(i.refs);
    },
    $parent: function $parent(i) {
        return getPublicInstance(i.parent);
    },
    $root: function $root(i) {
        return getPublicInstance(i.root);
    },
    $emit: function $emit(i) {
        return i.emit;
    },
    $options: function $options(i) {
        return resolveMergedOptions(i);
    },
    $forceUpdate: function $forceUpdate(i) {
        return i.f || (i.f = function() {
            return queueJob(i.update);
        });
    },
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: function $watch(i) {
        return instanceWatch.bind(i);
    }
});

var isReservedPrefix = function isReservedPrefix(key) {
    return key === "_" || key === "$";
};

var hasSetupBinding = function hasSetupBinding(state, key) {
    return state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$b(state, key);
};

var PublicInstanceProxyHandlers = {
    get: function get(_ref12, key) {
        var instance = _ref12._;
        var ctx = instance.ctx, setupState = instance.setupState, data2 = instance.data, props = instance.props, accessCache = instance.accessCache, type = instance.type, appContext = instance.appContext;
        if (key === "__isVue") {
            return true;
        }
        var normalizedProps;
        if (key[0] !== "$") {
            var n2 = accessCache[key];
            if (n2 !== void 0) {
                switch (n2) {
                  case 1:
                    return setupState[key];

                  case 2:
                    return data2[key];

                  case 4:
                    return ctx[key];

                  case 3:
                    return props[key];
                }
            } else if (hasSetupBinding(setupState, key)) {
                accessCache[key] = 1;
                return setupState[key];
            } else if (data2 !== EMPTY_OBJ && hasOwn$b(data2, key)) {
                accessCache[key] = 2;
                return data2[key];
            } else if (
            // only cache other properties when instance has declared (thus stable)
            // props
            (normalizedProps = instance.propsOptions[0]) && hasOwn$b(normalizedProps, key)) {
                accessCache[key] = 3;
                return props[key];
            } else if (ctx !== EMPTY_OBJ && hasOwn$b(ctx, key)) {
                accessCache[key] = 4;
                return ctx[key];
            } else if (shouldCacheAccess) {
                accessCache[key] = 0;
            }
        }
        var publicGetter = publicPropertiesMap[key];
        var cssModule, globalProperties;
        if (publicGetter) {
            if (key === "$attrs") {
                track(instance, "get", key);
            }
            return publicGetter(instance);
        } else if (
        // css module (injected by vue-loader)
        (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
            return cssModule;
        } else if (ctx !== EMPTY_OBJ && hasOwn$b(ctx, key)) {
            accessCache[key] = 4;
            return ctx[key];
        } else if (
        // global properties
        globalProperties = appContext.config.globalProperties, hasOwn$b(globalProperties, key)) {
            {
                return globalProperties[key];
            }
        } else if (currentRenderingInstance && (!isString(key) || 
        // #1091 avoid internal isRef/isVNode checks on component instance leading
        // to infinite warning loop
        key.indexOf("__v") !== 0)) {
            if (data2 !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$b(data2, key)) {
                warn("Property ".concat(JSON.stringify(key), ' must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.'));
            } else if (instance === currentRenderingInstance) {
                warn("Property ".concat(JSON.stringify(key), " was accessed during render but is not defined on instance."));
            }
        }
    },
    set: function set(_ref13, key, value) {
        var instance = _ref13._;
        var data2 = instance.data, setupState = instance.setupState, ctx = instance.ctx;
        if (hasSetupBinding(setupState, key)) {
            setupState[key] = value;
            return true;
        } else if (setupState.__isScriptSetup && hasOwn$b(setupState, key)) {
            warn('Cannot mutate <script setup> binding "'.concat(key, '" from Options API.'));
            return false;
        } else if (data2 !== EMPTY_OBJ && hasOwn$b(data2, key)) {
            data2[key] = value;
            return true;
        } else if (hasOwn$b(instance.props, key)) {
            warn('Attempting to mutate prop "'.concat(key, '". Props are readonly.'));
            return false;
        }
        if (key[0] === "$" && key.slice(1) in instance) {
            warn('Attempting to mutate public property "'.concat(key, '". Properties starting with $ are reserved and readonly.'));
            return false;
        } else {
            if (key in instance.appContext.config.globalProperties) {
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    value: value
                });
            } else {
                ctx[key] = value;
            }
        }
        return true;
    },
    has: function has(_ref14, key) {
        var _ref14$_ = _ref14._, data2 = _ref14$_.data, setupState = _ref14$_.setupState, accessCache = _ref14$_.accessCache, ctx = _ref14$_.ctx, appContext = _ref14$_.appContext, propsOptions = _ref14$_.propsOptions;
        var normalizedProps;
        return !!accessCache[key] || data2 !== EMPTY_OBJ && hasOwn$b(data2, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$b(normalizedProps, key) || hasOwn$b(ctx, key) || hasOwn$b(publicPropertiesMap, key) || hasOwn$b(appContext.config.globalProperties, key);
    },
    defineProperty: function defineProperty(target, key, descriptor) {
        if (descriptor.get != null) {
            target._.accessCache[key] = 0;
        } else if (hasOwn$b(descriptor, "value")) {
            this.set(target, key, descriptor.value, null);
        }
        return Reflect.defineProperty(target, key, descriptor);
    }
};

{
    PublicInstanceProxyHandlers.ownKeys = function(target) {
        warn("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.");
        return Reflect.ownKeys(target);
    };
}

function createDevRenderContext(instance) {
    var target = {};
    Object.defineProperty(target, "_", {
        configurable: true,
        enumerable: false,
        get: function get() {
            return instance;
        }
    });
    Object.keys(publicPropertiesMap).forEach(function(key) {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: false,
            get: function get() {
                return publicPropertiesMap[key](instance);
            },
            // intercepted by the proxy so no need for implementation,
            // but needed to prevent set errors
            set: NOOP
        });
    });
    return target;
}

function exposePropsOnRenderContext(instance) {
    var ctx = instance.ctx, _instance$propsOption2 = _slicedToArray2(instance.propsOptions, 1), propsOptions = _instance$propsOption2[0];
    if (propsOptions) {
        Object.keys(propsOptions).forEach(function(key) {
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    return instance.props[key];
                },
                set: NOOP
            });
        });
    }
}

function exposeSetupStateOnRenderContext(instance) {
    var ctx = instance.ctx, setupState = instance.setupState;
    Object.keys(toRaw(setupState)).forEach(function(key) {
        if (!setupState.__isScriptSetup) {
            if (isReservedPrefix(key[0])) {
                warn("setup() return property ".concat(JSON.stringify(key), ' should not start with "$" or "_" which are reserved prefixes for Vue internals.'));
                return;
            }
            Object.defineProperty(ctx, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    return setupState[key];
                },
                set: NOOP
            });
        }
    });
}

function createDuplicateChecker() {
    var cache = /*   */ Object.create(null);
    return function(type, key) {
        if (cache[key]) {
            warn("".concat(type, ' property "').concat(key, '" is already defined in ').concat(cache[key], "."));
        } else {
            cache[key] = type;
        }
    };
}

var shouldCacheAccess = true;

function applyOptions$1(instance) {
    var options = resolveMergedOptions(instance);
    var publicThis = instance.proxy;
    var ctx = instance.ctx;
    shouldCacheAccess = false;
    if (options.beforeCreate) {
        callHook$1(options.beforeCreate, instance, "bc"
        /* LifecycleHooks.BEFORE_CREATE */);
    }
    var dataOptions = options.data, computedOptions = options.computed, methods = options.methods, watchOptions = options.watch, provideOptions = options.provide, injectOptions = options.inject, created = options.created, beforeMount = options.beforeMount, mounted = options.mounted, beforeUpdate = options.beforeUpdate, updated = options.updated, activated = options.activated, deactivated = options.deactivated, beforeDestroy = options.beforeDestroy, beforeUnmount = options.beforeUnmount, destroyed = options.destroyed, unmounted = options.unmounted, render = options.render, renderTracked = options.renderTracked, renderTriggered = options.renderTriggered, errorCaptured = options.errorCaptured, serverPrefetch = options.serverPrefetch, expose = options.expose, inheritAttrs = options.inheritAttrs, components = options.components, directives = options.directives, filters = options.filters;
    var checkDuplicateProperties = createDuplicateChecker();
    {
        var _instance$propsOption3 = _slicedToArray2(instance.propsOptions, 1), propsOptions = _instance$propsOption3[0];
        if (propsOptions) {
            for (var key in propsOptions) {
                checkDuplicateProperties("Props", key);
            }
        }
    }
    if (injectOptions) {
        resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    }
    if (methods) {
        for (var _key15 in methods) {
            var methodHandler = methods[_key15];
            if (isFunction(methodHandler)) {
                {
                    Object.defineProperty(ctx, _key15, {
                        value: methodHandler.bind(publicThis),
                        configurable: true,
                        enumerable: true,
                        writable: true
                    });
                }
                {
                    checkDuplicateProperties("Methods", _key15);
                }
            } else {
                warn('Method "'.concat(_key15, '" has type "').concat(_typeof2(methodHandler), '" in the component definition. Did you reference the function correctly?'));
            }
        }
    }
    if (dataOptions) {
        if (!isFunction(dataOptions)) {
            warn("The data option must be a function. Plain object usage is no longer supported.");
        }
        var data2 = dataOptions.call(publicThis, publicThis);
        if (isPromise(data2)) {
            warn("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.");
        }
        if (!isObject$a(data2)) {
            warn("data() should return an object.");
        } else {
            instance.data = reactive(data2);
            {
                var _loop = function _loop(_key16) {
                    checkDuplicateProperties("Data", _key16);
                    if (!isReservedPrefix(_key16[0])) {
                        Object.defineProperty(ctx, _key16, {
                            configurable: true,
                            enumerable: true,
                            get: function get() {
                                return data2[_key16];
                            },
                            set: NOOP
                        });
                    }
                };
                for (var _key16 in data2) {
                    _loop(_key16);
                }
            }
        }
    }
    shouldCacheAccess = true;
    if (computedOptions) {
        var _loop2 = function _loop2(_key17) {
            var opt = computedOptions[_key17];
            var get3 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
            if (get3 === NOOP) {
                warn('Computed property "'.concat(_key17, '" has no getter.'));
            }
            var set3 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : function() {
                warn('Write operation failed: computed property "'.concat(_key17, '" is readonly.'));
            };
            var c = computed({
                get: get3,
                set: set3
            });
            Object.defineProperty(ctx, _key17, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    return c.value;
                },
                set: function set(v) {
                    return c.value = v;
                }
            });
            {
                checkDuplicateProperties("Computed", _key17);
            }
        };
        for (var _key17 in computedOptions) {
            _loop2(_key17);
        }
    }
    if (watchOptions) {
        for (var _key18 in watchOptions) {
            createWatcher(watchOptions[_key18], ctx, publicThis, _key18);
        }
    }
    {
        if (provideOptions) {
            var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
            Reflect.ownKeys(provides).forEach(function(key) {
                provide(key, provides[key]);
            });
        }
    }
    {
        if (created) {
            callHook$1(created, instance, "c"
            /* LifecycleHooks.CREATED */);
        }
    }
    function registerLifecycleHook(register, hook) {
        if (isArray$1(hook)) {
            hook.forEach(function(_hook) {
                return register(_hook.bind(publicThis));
            });
        } else if (hook) {
            register(hook.bind(publicThis));
        }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$1(expose)) {
        if (expose.length) {
            var exposed = instance.exposed || (instance.exposed = {});
            expose.forEach(function(key) {
                Object.defineProperty(exposed, key, {
                    get: function get() {
                        return publicThis[key];
                    },
                    set: function set(val) {
                        return publicThis[key] = val;
                    }
                });
            });
        } else if (!instance.exposed) {
            instance.exposed = {};
        }
    }
    if (render && instance.render === NOOP) {
        instance.render = render;
    }
    if (inheritAttrs != null) {
        instance.inheritAttrs = inheritAttrs;
    }
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
    if (instance.ctx.$onApplyOptions) {
        instance.ctx.$onApplyOptions(options, instance, publicThis);
    }
}

function resolveInjections(injectOptions, ctx) {
    var checkDuplicateProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOOP;
    var unwrapRef = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (isArray$1(injectOptions)) {
        injectOptions = normalizeInject(injectOptions);
    }
    var _loop3 = function _loop3() {
        var opt = injectOptions[key];
        var injected;
        if (isObject$a(opt)) {
            if ("default" in opt) {
                injected = inject(opt.from || key, opt.default, true
                /* treat default function as factory */);
            } else {
                injected = inject(opt.from || key);
            }
        } else {
            injected = inject(opt);
        }
        if (isRef(injected)) {
            if (unwrapRef) {
                Object.defineProperty(ctx, key, {
                    enumerable: true,
                    configurable: true,
                    get: function get() {
                        return injected.value;
                    },
                    set: function set(v) {
                        return injected.value = v;
                    }
                });
            } else {
                {
                    warn('injected property "'.concat(key, '" is a ref and will be auto-unwrapped and no longer needs `.value` in the next minor release. To opt-in to the new behavior now, set `app.config.unwrapInjectedRef = true` (this config is temporary and will not be needed in the future.)'));
                }
                ctx[key] = injected;
            }
        } else {
            ctx[key] = injected;
        }
        {
            checkDuplicateProperties("Inject", key);
        }
    };
    for (var key in injectOptions) {
        _loop3();
    }
}

function callHook$1(hook, instance, type) {
    callWithAsyncErrorHandling(isArray$1(hook) ? hook.map(function(h) {
        return h.bind(instance.proxy);
    }) : hook.bind(instance.proxy), instance, type);
}

function createWatcher(raw, ctx, publicThis, key) {
    var getter = key.includes(".") ? createPathGetter(publicThis, key) : function() {
        return publicThis[key];
    };
    if (isString(raw)) {
        var handler = ctx[raw];
        if (isFunction(handler)) {
            watch(getter, handler);
        } else {
            warn('Invalid watch handler specified by key "'.concat(raw, '"'), handler);
        }
    } else if (isFunction(raw)) {
        watch(getter, raw.bind(publicThis));
    } else if (isObject$a(raw)) {
        if (isArray$1(raw)) {
            raw.forEach(function(r) {
                return createWatcher(r, ctx, publicThis, key);
            });
        } else {
            var _handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
            if (isFunction(_handler)) {
                watch(getter, _handler, raw);
            } else {
                warn('Invalid watch handler specified by key "'.concat(raw.handler, '"'), _handler);
            }
        }
    } else {
        warn('Invalid watch option: "'.concat(key, '"'), raw);
    }
}

function resolveMergedOptions(instance) {
    var base2 = instance.type;
    var mixins = base2.mixins, extendsOptions = base2.extends;
    var _instance$appContext = instance.appContext, globalMixins = _instance$appContext.mixins, cache = _instance$appContext.optionsCache, optionMergeStrategies = _instance$appContext.config.optionMergeStrategies;
    var cached = cache.get(base2);
    var resolved;
    if (cached) {
        resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
        {
            resolved = base2;
        }
    } else {
        resolved = {};
        if (globalMixins.length) {
            globalMixins.forEach(function(m) {
                return mergeOptions(resolved, m, optionMergeStrategies, true);
            });
        }
        mergeOptions(resolved, base2, optionMergeStrategies);
    }
    if (isObject$a(base2)) {
        cache.set(base2, resolved);
    }
    return resolved;
}

function mergeOptions(to, from2, strats) {
    var asMixin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var mixins = from2.mixins, extendsOptions = from2.extends;
    if (extendsOptions) {
        mergeOptions(to, extendsOptions, strats, true);
    }
    if (mixins) {
        mixins.forEach(function(m) {
            return mergeOptions(to, m, strats, true);
        });
    }
    for (var key in from2) {
        if (asMixin && key === "expose") {
            warn('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
        } else {
            var strat = internalOptionMergeStrats[key] || strats && strats[key];
            to[key] = strat ? strat(to[key], from2[key]) : from2[key];
        }
    }
    return to;
}

var internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray$1,
    created: mergeAsArray$1,
    beforeMount: mergeAsArray$1,
    mounted: mergeAsArray$1,
    beforeUpdate: mergeAsArray$1,
    updated: mergeAsArray$1,
    beforeDestroy: mergeAsArray$1,
    beforeUnmount: mergeAsArray$1,
    destroyed: mergeAsArray$1,
    unmounted: mergeAsArray$1,
    activated: mergeAsArray$1,
    deactivated: mergeAsArray$1,
    errorCaptured: mergeAsArray$1,
    serverPrefetch: mergeAsArray$1,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
};

function mergeDataFn(to, from2) {
    if (!from2) {
        return to;
    }
    if (!to) {
        return from2;
    }
    return function mergedDataFn() {
        return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from2) ? from2.call(this, this) : from2);
    };
}

function mergeInject(to, from2) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from2));
}

function normalizeInject(raw) {
    if (isArray$1(raw)) {
        var res = {};
        for (var i = 0; i < raw.length; i++) {
            res[raw[i]] = raw[i];
        }
        return res;
    }
    return raw;
}

function mergeAsArray$1(to, from2) {
    return to ? _toConsumableArray2(new Set([].concat(to, from2))) : from2;
}

function mergeObjectOptions(to, from2) {
    return to ? extend(extend(/*   */ Object.create(null), to), from2) : from2;
}

function mergeWatchOptions(to, from2) {
    if (!to) return from2;
    if (!from2) return to;
    var merged = extend(/*   */ Object.create(null), to);
    for (var key in from2) {
        merged[key] = mergeAsArray$1(to[key], from2[key]);
    }
    return merged;
}

function initProps$1(instance, rawProps, isStateful) {
    var isSSR = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var props = {};
    var attrs = {};
    instance.propsDefaults = /*   */ Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    for (var key in instance.propsOptions[0]) {
        if (!(key in props)) {
            props[key] = void 0;
        }
    }
    {
        validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
        instance.props = isSSR ? props : shallowReactive(props);
    } else {
        if (!instance.type.props) {
            instance.props = attrs;
        } else {
            instance.props = props;
        }
    }
    instance.attrs = attrs;
}

function isInHmrContext(instance) {
    while (instance) {
        if (instance.type.__hmrId) return true;
        instance = instance.parent;
    }
}

function updateProps(instance, rawProps, rawPrevProps, optimized) {
    var props = instance.props, attrs = instance.attrs, patchFlag = instance.vnode.patchFlag;
    var rawCurrentProps = toRaw(props);
    var _instance$propsOption4 = _slicedToArray2(instance.propsOptions, 1), options = _instance$propsOption4[0];
    var hasAttrsChanged = false;
    if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
        if (patchFlag & 8) {
            var propsToUpdate = instance.vnode.dynamicProps;
            for (var i = 0; i < propsToUpdate.length; i++) {
                var key = propsToUpdate[i];
                if (isEmitListener(instance.emitsOptions, key)) {
                    continue;
                }
                var value = rawProps[key];
                if (options) {
                    if (hasOwn$b(attrs, key)) {
                        if (value !== attrs[key]) {
                            attrs[key] = value;
                            hasAttrsChanged = true;
                        }
                    } else {
                        var camelizedKey = camelize(key);
                        props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false
                        /* isAbsent */);
                    }
                } else {
                    if (value !== attrs[key]) {
                        attrs[key] = value;
                        hasAttrsChanged = true;
                    }
                }
            }
        }
    } else {
        if (setFullProps(instance, rawProps, props, attrs)) {
            hasAttrsChanged = true;
        }
        var kebabKey;
        for (var _key19 in rawCurrentProps) {
            if (!rawProps || 
            // for camelCase
            !hasOwn$b(rawProps, _key19) && (
            // it's possible the original props was passed in as kebab-case
            // and converted to camelCase (#955)
            (kebabKey = hyphenate(_key19)) === _key19 || !hasOwn$b(rawProps, kebabKey))) {
                if (options) {
                    if (rawPrevProps && (
                    // for camelCase
                    rawPrevProps[_key19] !== void 0 || 
                    // for kebab-case
                    rawPrevProps[kebabKey] !== void 0)) {
                        props[_key19] = resolvePropValue(options, rawCurrentProps, _key19, void 0, instance, true
                        /* isAbsent */);
                    }
                } else {
                    delete props[_key19];
                }
            }
        }
        if (attrs !== rawCurrentProps) {
            for (var _key20 in attrs) {
                if (!rawProps || !hasOwn$b(rawProps, _key20) && true) {
                    delete attrs[_key20];
                    hasAttrsChanged = true;
                }
            }
        }
    }
    if (hasAttrsChanged) {
        trigger(instance, "set", "$attrs");
    }
    {
        validateProps(rawProps || {}, props, instance);
    }
}

function setFullProps(instance, rawProps, props, attrs) {
    var _instance$propsOption5 = _slicedToArray2(instance.propsOptions, 2), options = _instance$propsOption5[0], needCastKeys = _instance$propsOption5[1];
    var hasAttrsChanged = false;
    var rawCastValues;
    if (rawProps) {
        for (var key in rawProps) {
            if (isReservedProp(key)) {
                continue;
            }
            var value = rawProps[key];
            var camelKey = void 0;
            if (options && hasOwn$b(options, camelKey = camelize(key))) {
                if (!needCastKeys || !needCastKeys.includes(camelKey)) {
                    props[camelKey] = value;
                } else {
                    (rawCastValues || (rawCastValues = {}))[camelKey] = value;
                }
            } else if (!isEmitListener(instance.emitsOptions, key)) {
                if (!(key in attrs) || value !== attrs[key]) {
                    attrs[key] = value;
                    hasAttrsChanged = true;
                }
            }
        }
    }
    if (needCastKeys) {
        var rawCurrentProps = toRaw(props);
        var castValues = rawCastValues || EMPTY_OBJ;
        for (var i = 0; i < needCastKeys.length; i++) {
            var _key21 = needCastKeys[i];
            props[_key21] = resolvePropValue(options, rawCurrentProps, _key21, castValues[_key21], instance, !hasOwn$b(castValues, _key21));
        }
    }
    return hasAttrsChanged;
}

function resolvePropValue(options, props, key, value, instance, isAbsent) {
    var opt = options[key];
    if (opt != null) {
        var hasDefault = hasOwn$b(opt, "default");
        if (hasDefault && value === void 0) {
            var defaultValue = opt.default;
            if (opt.type !== Function && isFunction(defaultValue)) {
                var propsDefaults = instance.propsDefaults;
                if (key in propsDefaults) {
                    value = propsDefaults[key];
                } else {
                    setCurrentInstance(instance);
                    value = propsDefaults[key] = defaultValue.call(null, props);
                    unsetCurrentInstance();
                }
            } else {
                value = defaultValue;
            }
        }
        if (opt[0
        /* BooleanFlags.shouldCast */ ]) {
            if (isAbsent && !hasDefault) {
                value = false;
            } else if (opt[1
            /* BooleanFlags.shouldCastTrue */ ] && (value === "" || value === hyphenate(key))) {
                value = true;
            }
        }
    }
    return value;
}

function normalizePropsOptions(comp, appContext) {
    var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var cache = appContext.propsCache;
    var cached = cache.get(comp);
    if (cached) {
        return cached;
    }
    var raw = comp.props;
    var normalized = {};
    var needCastKeys = [];
    var hasExtends = false;
    if (!isFunction(comp)) {
        var extendProps = function extendProps(raw2) {
            hasExtends = true;
            var _normalizePropsOption = normalizePropsOptions(raw2, appContext, true), _normalizePropsOption2 = _slicedToArray2(_normalizePropsOption, 2), props = _normalizePropsOption2[0], keys4 = _normalizePropsOption2[1];
            extend(normalized, props);
            if (keys4) needCastKeys.push.apply(needCastKeys, _toConsumableArray2(keys4));
        };
        if (!asMixin && appContext.mixins.length) {
            appContext.mixins.forEach(extendProps);
        }
        if (comp.extends) {
            extendProps(comp.extends);
        }
        if (comp.mixins) {
            comp.mixins.forEach(extendProps);
        }
    }
    if (!raw && !hasExtends) {
        if (isObject$a(comp)) {
            cache.set(comp, EMPTY_ARR);
        }
        return EMPTY_ARR;
    }
    if (isArray$1(raw)) {
        for (var i = 0; i < raw.length; i++) {
            if (!isString(raw[i])) {
                warn("props must be strings when using array syntax.", raw[i]);
            }
            var normalizedKey = camelize(raw[i]);
            if (validatePropName(normalizedKey)) {
                normalized[normalizedKey] = EMPTY_OBJ;
            }
        }
    } else if (raw) {
        if (!isObject$a(raw)) {
            warn("invalid props options", raw);
        }
        for (var key in raw) {
            var _normalizedKey = camelize(key);
            if (validatePropName(_normalizedKey)) {
                var opt = raw[key];
                var prop = normalized[_normalizedKey] = isArray$1(opt) || isFunction(opt) ? {
                    type: opt
                } : Object.assign({}, opt);
                if (prop) {
                    var booleanIndex = getTypeIndex(Boolean, prop.type);
                    var stringIndex = getTypeIndex(String, prop.type);
                    prop[0
                    /* BooleanFlags.shouldCast */ ] = booleanIndex > -1;
                    prop[1
                    /* BooleanFlags.shouldCastTrue */ ] = stringIndex < 0 || booleanIndex < stringIndex;
                    if (booleanIndex > -1 || hasOwn$b(prop, "default")) {
                        needCastKeys.push(_normalizedKey);
                    }
                }
            }
        }
    }
    var res = [ normalized, needCastKeys ];
    if (isObject$a(comp)) {
        cache.set(comp, res);
    }
    return res;
}

function validatePropName(key) {
    if (key[0] !== "$") {
        return true;
    } else {
        warn('Invalid prop name: "'.concat(key, '" is a reserved property.'));
    }
    return false;
}

function getType(ctor) {
    var match2 = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
    return match2 ? match2[2] : ctor === null ? "null" : "";
}

function isSameType(a, b) {
    return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
    if (isArray$1(expectedTypes)) {
        return expectedTypes.findIndex(function(t2) {
            return isSameType(t2, type);
        });
    } else if (isFunction(expectedTypes)) {
        return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
}

function validateProps(rawProps, props, instance) {
    var resolvedValues = toRaw(props);
    var options = instance.propsOptions[0];
    for (var key in options) {
        var opt = options[key];
        if (opt == null) continue;
        validateProp(key, resolvedValues[key], opt, !hasOwn$b(rawProps, key) && !hasOwn$b(rawProps, hyphenate(key)));
    }
}

function validateProp(name, value, prop, isAbsent) {
    var type = prop.type, required = prop.required, validator = prop.validator;
    if (required && isAbsent) {
        warn('Missing required prop: "' + name + '"');
        return;
    }
    if (value == null && !prop.required) {
        return;
    }
    if (type != null && type !== true) {
        var isValid = false;
        var types = isArray$1(type) ? type : [ type ];
        var expectedTypes = [];
        for (var i = 0; i < types.length && !isValid; i++) {
            var _assertType = assertType(value, types[i]), valid = _assertType.valid, expectedType = _assertType.expectedType;
            expectedTypes.push(expectedType || "");
            isValid = valid;
        }
        if (!isValid) {
            warn(getInvalidTypeMessage(name, value, expectedTypes));
            return;
        }
    }
    if (validator && !validator(value)) {
        warn('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
}

var isSimpleType = /*   */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");

function assertType(value, type) {
    var valid;
    var expectedType = getType(type);
    if (isSimpleType(expectedType)) {
        var t2 = _typeof2(value);
        valid = t2 === expectedType.toLowerCase();
        if (!valid && t2 === "object") {
            valid = value instanceof type;
        }
    } else if (expectedType === "Object") {
        valid = isObject$a(value);
    } else if (expectedType === "Array") {
        valid = isArray$1(value);
    } else if (expectedType === "null") {
        valid = value === null;
    } else {
        valid = value instanceof type;
    }
    return {
        valid: valid,
        expectedType: expectedType
    };
}

function getInvalidTypeMessage(name, value, expectedTypes) {
    var message = 'Invalid prop: type check failed for prop "'.concat(name, '". Expected ').concat(expectedTypes.map(capitalize).join(" | "));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    var expectedValue = styleValue(value, expectedType);
    var receivedValue = styleValue(value, receivedType);
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
        message += " with value ".concat(expectedValue);
    }
    message += ", got ".concat(receivedType, " ");
    if (isExplicable(receivedType)) {
        message += "with value ".concat(receivedValue, ".");
    }
    return message;
}

function styleValue(value, type) {
    if (type === "String") {
        return '"'.concat(value, '"');
    } else if (type === "Number") {
        return "".concat(Number(value));
    } else {
        return "".concat(value);
    }
}

function isExplicable(type) {
    var explicitTypes = [ "string", "number", "boolean" ];
    return explicitTypes.some(function(elem) {
        return type.toLowerCase() === elem;
    });
}

function isBoolean() {
    for (var _len14 = arguments.length, args = new Array(_len14), _key22 = 0; _key22 < _len14; _key22++) {
        args[_key22] = arguments[_key22];
    }
    return args.some(function(elem) {
        return elem.toLowerCase() === "boolean";
    });
}

function createAppContext() {
    return {
        app: null,
        config: {
            isNativeTag: NO,
            performance: false,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {}
        },
        mixins: [],
        components: {},
        directives: {},
        provides: /*   */ Object.create(null),
        optionsCache: /*   */ new WeakMap(),
        propsCache: /*   */ new WeakMap(),
        emitsCache: /*   */ new WeakMap()
    };
}

var uid$1$1 = 0;

function createAppAPI(render, hydrate) {
    return function createApp2(rootComponent) {
        var rootProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        if (!isFunction(rootComponent)) {
            rootComponent = Object.assign({}, rootComponent);
        }
        if (rootProps != null && !isObject$a(rootProps)) {
            warn("root props passed to app.mount() must be an object.");
            rootProps = null;
        }
        var context = createAppContext();
        var installedPlugins = /*   */ new Set();
        var app = context.app = {
            _uid: uid$1$1++,
            _component: rootComponent,
            _props: rootProps,
            _container: null,
            _context: context,
            _instance: null,
            version: version$1,
            get config() {
                return context.config;
            },
            set config(v) {
                {
                    warn("app.config cannot be replaced. Modify individual options instead.");
                }
            },
            use: function use(plugin2) {
                for (var _len15 = arguments.length, options = new Array(_len15 > 1 ? _len15 - 1 : 0), _key23 = 1; _key23 < _len15; _key23++) {
                    options[_key23 - 1] = arguments[_key23];
                }
                if (installedPlugins.has(plugin2)) {
                    warn("Plugin has already been applied to target app.");
                } else if (plugin2 && isFunction(plugin2.install)) {
                    installedPlugins.add(plugin2);
                    plugin2.install.apply(plugin2, [ app ].concat(options));
                } else if (isFunction(plugin2)) {
                    installedPlugins.add(plugin2);
                    plugin2.apply(void 0, [ app ].concat(options));
                } else {
                    warn('A plugin must either be a function or an object with an "install" function.');
                }
                return app;
            },
            mixin: function mixin(_mixin) {
                {
                    if (!context.mixins.includes(_mixin)) {
                        context.mixins.push(_mixin);
                    } else {
                        warn("Mixin has already been applied to target app" + (_mixin.name ? ": ".concat(_mixin.name) : ""));
                    }
                }
                return app;
            },
            component: function component(name, _component) {
                {
                    validateComponentName(name, context.config);
                }
                if (!_component) {
                    return context.components[name];
                }
                if (context.components[name]) {
                    warn('Component "'.concat(name, '" has already been registered in target app.'));
                }
                context.components[name] = _component;
                return app;
            },
            directive: function directive(name, _directive) {
                {
                    validateDirectiveName(name);
                }
                if (!_directive) {
                    return context.directives[name];
                }
                if (context.directives[name]) {
                    warn('Directive "'.concat(name, '" has already been registered in target app.'));
                }
                context.directives[name] = _directive;
                return app;
            },
            // fixed by xxxxxx
            mount: function mount() {},
            // fixed by xxxxxx
            unmount: function unmount() {},
            provide: function provide(key, value) {
                if (key in context.provides) {
                    warn('App already provides property with key "'.concat(String(key), '". It will be overwritten with the new value.'));
                }
                context.provides[key] = value;
                return app;
            }
        };
        return app;
    };
}

var supported;

var perf;

function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
        perf.mark("vue-".concat(type, "-").concat(instance.uid));
    }
    {
        devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
    }
}

function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
        var startTag = "vue-".concat(type, "-").concat(instance.uid);
        var endTag = startTag + ":end";
        perf.mark(endTag);
        perf.measure("<".concat(formatComponentName(instance, instance.type), "> ").concat(type), startTag, endTag);
        perf.clearMarks(startTag);
        perf.clearMarks(endTag);
    }
    {
        devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
    }
}

function isSupported() {
    if (supported !== void 0) {
        return supported;
    }
    if (typeof window !== "undefined" && window.performance) {
        supported = true;
        perf = window.performance;
    } else {
        supported = false;
    }
    return supported;
}

var queuePostRenderEffect$1 = queuePostFlushCb;

var Fragment = Symbol("Fragment");

var Text = Symbol("Text");

var Comment = Symbol("Comment");

var Static = Symbol("Static");

function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
}

var InternalObjectKey = "__vInternal";

function guardReactiveProps(props) {
    if (!props) return null;
    return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}

var emptyAppContext = createAppContext();

var uid$3 = 0;

function createComponentInstance(vnode, parent2, suspense) {
    var type = vnode.type;
    var appContext = (parent2 ? parent2.appContext : vnode.appContext) || emptyAppContext;
    var instance = {
        uid: uid$3++,
        vnode: vnode,
        type: type,
        parent: parent2,
        appContext: appContext,
        root: null,
        next: null,
        subTree: null,
        effect: null,
        update: null,
        scope: new EffectScope(true
        /* detached */),
        render: null,
        proxy: null,
        exposed: null,
        exposeProxy: null,
        withProxy: null,
        provides: parent2 ? parent2.provides : Object.create(appContext.provides),
        accessCache: null,
        renderCache: [],
        // local resolved assets
        components: null,
        directives: null,
        // resolved props and emits options
        propsOptions: normalizePropsOptions(type, appContext),
        emitsOptions: normalizeEmitsOptions(type, appContext),
        // emit
        emit: null,
        emitted: null,
        // props default value
        propsDefaults: EMPTY_OBJ,
        // inheritAttrs
        inheritAttrs: type.inheritAttrs,
        // state
        ctx: EMPTY_OBJ,
        data: EMPTY_OBJ,
        props: EMPTY_OBJ,
        attrs: EMPTY_OBJ,
        slots: EMPTY_OBJ,
        refs: EMPTY_OBJ,
        setupState: EMPTY_OBJ,
        setupContext: null,
        // suspense related
        suspense: suspense,
        suspenseId: suspense ? suspense.pendingId : 0,
        asyncDep: null,
        asyncResolved: false,
        // lifecycle hooks
        // not using enums here because it results in computed properties
        isMounted: false,
        isUnmounted: false,
        isDeactivated: false,
        bc: null,
        c: null,
        bm: null,
        m: null,
        bu: null,
        u: null,
        um: null,
        bum: null,
        da: null,
        a: null,
        rtg: null,
        rtc: null,
        ec: null,
        sp: null
    };
    {
        instance.ctx = createDevRenderContext(instance);
    }
    instance.root = parent2 ? parent2.root : instance;
    instance.emit = emit.bind(null, instance);
    if (vnode.ce) {
        vnode.ce(instance);
    }
    return instance;
}

var currentInstance = null;

var getCurrentInstance = function getCurrentInstance() {
    return currentInstance || currentRenderingInstance;
};

var setCurrentInstance = function setCurrentInstance(instance) {
    currentInstance = instance;
    instance.scope.on();
};

var unsetCurrentInstance = function unsetCurrentInstance() {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
};

var isBuiltInTag = /*   */ makeMap("slot,component");

function validateComponentName(name, config) {
    var appIsNativeTag = config.isNativeTag || NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) {
        warn("Do not use built-in or reserved HTML elements as component id: " + name);
    }
}

function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4;
}

var isInSSRComponentSetup = false;

function setupComponent(instance) {
    var isSSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    isInSSRComponentSetup = isSSR;
    var props = instance.vnode.props;
    var isStateful = isStatefulComponent(instance);
    initProps$1(instance, props, isStateful, isSSR);
    var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
    isInSSRComponentSetup = false;
    return setupResult;
}

function setupStatefulComponent(instance, isSSR) {
    var Component2 = instance.type;
    {
        if (Component2.name) {
            validateComponentName(Component2.name, instance.appContext.config);
        }
        if (Component2.components) {
            var names = Object.keys(Component2.components);
            for (var i = 0; i < names.length; i++) {
                validateComponentName(names[i], instance.appContext.config);
            }
        }
        if (Component2.directives) {
            var _names = Object.keys(Component2.directives);
            for (var _i = 0; _i < _names.length; _i++) {
                validateDirectiveName(_names[_i]);
            }
        }
        if (Component2.compilerOptions && isRuntimeOnly()) {
            warn('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
        }
    }
    instance.accessCache = /*   */ Object.create(null);
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    {
        exposePropsOnRenderContext(instance);
    }
    var setup = Component2.setup;
    if (setup) {
        var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
        setCurrentInstance(instance);
        pauseTracking();
        var setupResult = callWithErrorHandling(setup, instance, 0, [ shallowReadonly(instance.props), setupContext ]);
        resetTracking();
        unsetCurrentInstance();
        if (isPromise(setupResult)) {
            setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
            {
                warn("setup() returned a Promise, but the version of Vue you are using does not support it yet.");
            }
        } else {
            handleSetupResult(instance, setupResult, isSSR);
        }
    } else {
        finishComponentSetup(instance, isSSR);
    }
}

function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
        {
            instance.render = setupResult;
        }
    } else if (isObject$a(setupResult)) {
        if (isVNode(setupResult)) {
            warn("setup() should not return VNodes directly - return a render function instead.");
        }
        {
            instance.devtoolsRawSetupState = setupResult;
        }
        instance.setupState = proxyRefs(setupResult);
        {
            exposeSetupStateOnRenderContext(instance);
        }
    } else if (setupResult !== void 0) {
        warn("setup() should return an object. Received: ".concat(setupResult === null ? "null" : _typeof2(setupResult)));
    }
    finishComponentSetup(instance, isSSR);
}

var compile;

var isRuntimeOnly = function isRuntimeOnly() {
    return !compile;
};

function finishComponentSetup(instance, isSSR, skipOptions) {
    var Component2 = instance.type;
    if (!instance.render) {
        instance.render = Component2.render || NOOP;
    }
    {
        setCurrentInstance(instance);
        pauseTracking();
        applyOptions$1(instance);
        resetTracking();
        unsetCurrentInstance();
    }
    if (!Component2.render && instance.render === NOOP && !isSSR) {
        if (Component2.template) {
            warn('Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".' /* should not happen */);
        } else {
            warn("Component is missing template or render function.");
        }
    }
}

function createAttrsProxy(instance) {
    return new Proxy(instance.attrs, {
        get: function get(target, key) {
            track(instance, "get", "$attrs");
            return target[key];
        },
        set: function set() {
            warn("setupContext.attrs is readonly.");
            return false;
        },
        deleteProperty: function deleteProperty() {
            warn("setupContext.attrs is readonly.");
            return false;
        }
    });
}

function createSetupContext(instance) {
    var expose = function expose(exposed) {
        {
            if (instance.exposed) {
                warn("expose() should be called only once per setup().");
            }
            if (exposed != null) {
                var exposedType = _typeof2(exposed);
                if (exposedType === "object") {
                    if (isArray$1(exposed)) {
                        exposedType = "array";
                    } else if (isRef(exposed)) {
                        exposedType = "ref";
                    }
                }
                if (exposedType !== "object") {
                    warn("expose() should be passed a plain object, received ".concat(exposedType, "."));
                }
            }
        }
        instance.exposed = exposed || {};
    };
    var attrs;
    {
        return Object.freeze({
            get attrs() {
                return attrs || (attrs = createAttrsProxy(instance));
            },
            get slots() {
                return shallowReadonly(instance.slots);
            },
            get emit() {
                return function(event) {
                    for (var _len16 = arguments.length, args = new Array(_len16 > 1 ? _len16 - 1 : 0), _key24 = 1; _key24 < _len16; _key24++) {
                        args[_key24 - 1] = arguments[_key24];
                    }
                    return instance.emit.apply(instance, [ event ].concat(args));
                };
            },
            expose: expose
        });
    }
}

function getExposeProxy(instance) {
    if (instance.exposed) {
        return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
            get: function get(target, key) {
                if (key in target) {
                    return target[key];
                }
                return instance.proxy[key];
            },
            has: function has(target, key) {
                return key in target || key in publicPropertiesMap;
            }
        }));
    }
}

var classifyRE = /(?:^|[-_])(\w)/g;

var classify = function classify(str) {
    return str.replace(classifyRE, function(c) {
        return c.toUpperCase();
    }).replace(/[-_]/g, "");
};

function getComponentName(Component2) {
    var includeInferred = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}

function formatComponentName(instance, Component2) {
    var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var name = getComponentName(Component2);
    if (!name && Component2.__file) {
        var match2 = Component2.__file.match(/([^/\\]+)\.\w+$/);
        if (match2) {
            name = match2[1];
        }
    }
    if (!name && instance && instance.parent) {
        var inferFromRegistry = function inferFromRegistry(registry) {
            for (var key in registry) {
                if (registry[key] === Component2) {
                    return key;
                }
            }
        };
        name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? "App" : "Anonymous";
}

var computed = function computed(getterOrOptions, debugOptions) {
    return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};

var version$1 = "3.2.47";

function unwrapper(target) {
    return unref(target);
}

var ARRAYTYPE = "[object Array]";

var OBJECTTYPE = "[object Object]";

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, "", result);
    return result;
}

function syncKeys(current, pre) {
    current = unwrapper(current);
    if (current === pre) return;
    var rootCurrentType = toTypeString(current);
    var rootPreType = toTypeString(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        for (var key in pre) {
            var currentValue = current[key];
            if (currentValue === void 0) {
                current[key] = null;
            } else {
                syncKeys(currentValue, pre[key]);
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function(item, index2) {
                syncKeys(current[index2], item);
            });
        }
    }
}

function _diff(current, pre, path2, result) {
    current = unwrapper(current);
    if (current === pre) return;
    var rootCurrentType = toTypeString(current);
    var rootPreType = toTypeString(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path2, current);
        } else {
            var _loop4 = function _loop4(key) {
                var currentValue = unwrapper(current[key]);
                var preValue = pre[key];
                var currentType = toTypeString(currentValue);
                var preType = toTypeString(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != preValue) {
                        setResult(result, (path2 == "" ? "" : path2 + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path2 == "" ? "" : path2 + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path2 == "" ? "" : path2 + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function(item, index2) {
                                _diff(item, preValue[index2], (path2 == "" ? "" : path2 + ".") + key + "[" + index2 + "]", result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path2 == "" ? "" : path2 + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path2 == "" ? "" : path2 + ".") + key + "." + subKey, result);
                        }
                    }
                }
            };
            for (var key in current) {
                _loop4(key);
            }
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path2, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path2, current);
            } else {
                current.forEach(function(item, index2) {
                    _diff(item, pre[index2], path2 + "[" + index2 + "]", result);
                });
            }
        }
    } else {
        setResult(result, path2, current);
    }
}

function setResult(result, k, v) {
    result[k] = v;
}

function hasComponentEffect(instance) {
    return queue.includes(instance.update);
}

function flushCallbacks(instance) {
    var ctx = instance.ctx;
    var callbacks = ctx.__next_tick_callbacks;
    if (callbacks && callbacks.length) {
        var copies = callbacks.slice(0);
        callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function nextTick(instance, fn) {
    var ctx = instance.ctx;
    if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
        return nextTick$1(fn && fn.bind(instance.proxy));
    }
    var _resolve;
    if (!ctx.__next_tick_callbacks) {
        ctx.__next_tick_callbacks = [];
    }
    ctx.__next_tick_callbacks.push(function() {
        if (fn) {
            callWithErrorHandling(fn.bind(instance.proxy), instance, 14
            /* ErrorCodes.SCHEDULER */);
        } else if (_resolve) {
            _resolve(instance.proxy);
        }
    });
    return new Promise(function(resolve2) {
        _resolve = resolve2;
    });
}

function clone$1(src, seen) {
    src = unwrapper(src);
    var type = _typeof2(src);
    if (type === "object" && src !== null) {
        var copy = seen.get(src);
        if (typeof copy !== "undefined") {
            return copy;
        }
        if (isArray$1(src)) {
            var len = src.length;
            copy = new Array(len);
            seen.set(src, copy);
            for (var i = 0; i < len; i++) {
                copy[i] = clone$1(src[i], seen);
            }
        } else {
            copy = {};
            seen.set(src, copy);
            for (var name in src) {
                if (hasOwn$b(src, name)) {
                    copy[name] = clone$1(src[name], seen);
                }
            }
        }
        return copy;
    }
    if (type !== "symbol") {
        return src;
    }
}

function deepCopy(src) {
    return clone$1(src, typeof WeakMap !== "undefined" ? /*   */ new WeakMap() : /*   */ new Map());
}

function getMPInstanceData(instance, keys4) {
    var data2 = instance.data;
    var ret = /*   */ Object.create(null);
    keys4.forEach(function(key) {
        ret[key] = data2[key];
    });
    return ret;
}

function patch(instance, data2, oldData) {
    if (!data2) {
        return;
    }
    data2 = deepCopy(data2);
    var ctx = instance.ctx;
    var mpType = ctx.mpType;
    if (mpType === "page" || mpType === "component") {
        data2.r0 = 1;
        var mpInstance = ctx.$scope;
        var keys4 = Object.keys(data2);
        var diffData = diff(data2, oldData || getMPInstanceData(mpInstance, keys4));
        if (Object.keys(diffData).length) {
            ctx.__next_tick_pending = true;
            mpInstance.setData(diffData, function() {
                ctx.__next_tick_pending = false;
                flushCallbacks(instance);
            });
            flushPreFlushCbs();
        } else {
            flushCallbacks(instance);
        }
    }
}

function initAppConfig(appConfig) {
    appConfig.globalProperties.$nextTick = function $nextTick(fn) {
        return nextTick(this.$, fn);
    };
}

function onApplyOptions(options, instance, publicThis) {
    instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
    var computedOptions = options.computed;
    if (computedOptions) {
        var keys4 = Object.keys(computedOptions);
        if (keys4.length) {
            var _ctx$$computedKeys;
            var ctx = instance.ctx;
            if (!ctx.$computedKeys) {
                ctx.$computedKeys = [];
            }
            (_ctx$$computedKeys = ctx.$computedKeys).push.apply(_ctx$$computedKeys, keys4);
        }
    }
    delete instance.ctx.$onApplyOptions;
}

function setRef$1(instance) {
    var isUnmount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var setupState = instance.setupState, $templateRefs = instance.$templateRefs, _instance$ctx = instance.ctx, $scope = _instance$ctx.$scope, $mpPlatform = _instance$ctx.$mpPlatform;
    if ($mpPlatform === "mp-alipay") {
        return;
    }
    if (!$templateRefs || !$scope) {
        return;
    }
    if (isUnmount) {
        return $templateRefs.forEach(function(templateRef) {
            return setTemplateRef(templateRef, null, setupState);
        });
    }
    var check2 = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
    var doSetByRefs = function doSetByRefs(refs) {
        var mpComponents = 
        // 字节小程序 selectAllComponents 可能返回 null
        // https://github.com/dcloudio/uni-app/issues/3954
        ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || []);
        return refs.filter(function(templateRef) {
            var refValue = findComponentPublicInstance(mpComponents, templateRef.i);
            if (check2 && refValue === null) {
                return true;
            }
            setTemplateRef(templateRef, refValue, setupState);
            return false;
        });
    };
    var doSet = function doSet() {
        var refs = doSetByRefs($templateRefs);
        if (refs.length && instance.proxy && instance.proxy.$scope) {
            instance.proxy.$scope.setData({
                r1: 1
            }, function() {
                doSetByRefs(refs);
            });
        }
    };
    if ($scope._$setRef) {
        $scope._$setRef(doSet);
    } else {
        nextTick(instance, doSet);
    }
}

function toSkip(value) {
    if (isObject$a(value)) {
        markRaw(value);
    }
    return value;
}

function findComponentPublicInstance(mpComponents, id2) {
    var mpInstance = mpComponents.find(function(com) {
        return com && (com.properties || com.props).uI === id2;
    });
    if (mpInstance) {
        var vm = mpInstance.$vm;
        if (vm) {
            return getExposeProxy(vm.$) || vm;
        }
        return toSkip(mpInstance);
    }
    return null;
}

function setTemplateRef(_ref15, refValue, setupState) {
    var r = _ref15.r, f = _ref15.f;
    if (isFunction(r)) {
        r(refValue, {});
    } else {
        var _isString = isString(r);
        var _isRef = isRef(r);
        if (_isString || _isRef) {
            if (f) {
                if (!_isRef) {
                    return;
                }
                if (!isArray$1(r.value)) {
                    r.value = [];
                }
                var existing = r.value;
                if (existing.indexOf(refValue) === -1) {
                    existing.push(refValue);
                    if (!refValue) {
                        return;
                    }
                    onBeforeUnmount(function() {
                        return remove(existing, refValue);
                    }, refValue.$);
                }
            } else if (_isString) {
                if (hasOwn$b(setupState, r)) {
                    setupState[r] = refValue;
                }
            } else if (isRef(r)) {
                r.value = refValue;
            } else {
                warnRef(r);
            }
        } else {
            warnRef(r);
        }
    }
}

function warnRef(ref2) {
    warn("Invalid template ref type:", ref2, "(".concat(_typeof2(ref2), ")"));
}

var MPType;

(function(MPType2) {
    MPType2["APP"] = "app";
    MPType2["PAGE"] = "page";
    MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));

var queuePostRenderEffect = queuePostFlushCb;

function mountComponent(initialVNode, options) {
    var instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
    {
        instance.ctx.$onApplyOptions = onApplyOptions;
        instance.ctx.$children = [];
    }
    if (options.mpType === "app") {
        instance.render = NOOP;
    }
    if (options.onBeforeSetup) {
        options.onBeforeSetup(instance, options);
    }
    {
        pushWarningContext(initialVNode);
        startMeasure(instance, "mount");
    }
    {
        startMeasure(instance, "init");
    }
    setupComponent(instance);
    {
        endMeasure(instance, "init");
    }
    {
        if (options.parentComponent && instance.proxy) {
            options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
        }
    }
    setupRenderEffect(instance);
    {
        popWarningContext();
        endMeasure(instance, "mount");
    }
    return instance.proxy;
}

var getFunctionalFallthrough = function getFunctionalFallthrough(attrs) {
    var res;
    for (var key in attrs) {
        if (key === "class" || key === "style" || isOn(key)) {
            (res || (res = {}))[key] = attrs[key];
        }
    }
    return res;
};

function renderComponentRoot(instance) {
    var Component2 = instance.type, vnode = instance.vnode, proxy = instance.proxy, withProxy = instance.withProxy, props = instance.props, _instance$propsOption6 = _slicedToArray2(instance.propsOptions, 1), propsOptions = _instance$propsOption6[0], slots = instance.slots, attrs = instance.attrs, emit2 = instance.emit, render = instance.render, renderCache = instance.renderCache, data2 = instance.data, setupState = instance.setupState, ctx = instance.ctx, uid2 = instance.uid, pruneComponentPropsCache2 = instance.appContext.app.config.globalProperties.pruneComponentPropsCache, inheritAttrs = instance.inheritAttrs;
    instance.$templateRefs = [];
    instance.$ei = 0;
    pruneComponentPropsCache2(uid2);
    instance.__counter = instance.__counter === 0 ? 1 : 0;
    var result;
    var prev = setCurrentRenderingInstance(instance);
    try {
        if (vnode.shapeFlag & 4) {
            fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
            var proxyToUse = withProxy || proxy;
            result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data2, ctx);
        } else {
            fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
            var render2 = Component2;
            result = render2.length > 1 ? render2(props, {
                attrs: attrs,
                slots: slots,
                emit: emit2
            }) : render2(props, null
            /* we know it doesn't need it */);
        }
    } catch (err) {
        handleError(err, instance, 1
        /* ErrorCodes.RENDER_FUNCTION */);
        result = false;
    }
    setRef$1(instance);
    setCurrentRenderingInstance(prev);
    return result;
}

function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
    if (props && fallthroughAttrs2 && inheritAttrs !== false) {
        var keys4 = Object.keys(fallthroughAttrs2).filter(function(key) {
            return key !== "class" && key !== "style";
        });
        if (!keys4.length) {
            return;
        }
        if (propsOptions && keys4.some(isModelListener)) {
            keys4.forEach(function(key) {
                if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
                    props[key] = fallthroughAttrs2[key];
                }
            });
        } else {
            keys4.forEach(function(key) {
                return props[key] = fallthroughAttrs2[key];
            });
        }
    }
}

var updateComponentPreRender = function updateComponentPreRender(instance) {
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
};

function componentUpdateScopedSlotsFn() {
    var scopedSlotsData = this.$scopedSlotsData;
    if (!scopedSlotsData || scopedSlotsData.length === 0) {
        return;
    }
    var mpInstance = this.ctx.$scope;
    var oldData = mpInstance.data;
    var diffData = /*   */ Object.create(null);
    scopedSlotsData.forEach(function(_ref16) {
        var path2 = _ref16.path, index2 = _ref16.index, data2 = _ref16.data;
        var oldScopedSlotData = getValueByDataPath(oldData, path2);
        var diffPath = isString(index2) ? "".concat(path2, ".").concat(index2) : "".concat(path2, "[").concat(index2, "]");
        if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
            diffData[diffPath] = data2;
        } else {
            var diffScopedSlotData = diff(data2, oldScopedSlotData[index2]);
            Object.keys(diffScopedSlotData).forEach(function(name) {
                diffData[diffPath + "." + name] = diffScopedSlotData[name];
            });
        }
    });
    scopedSlotsData.length = 0;
    if (Object.keys(diffData).length) {
        mpInstance.setData(diffData);
    }
}

function toggleRecurse(_ref17, allowed) {
    var effect = _ref17.effect, update = _ref17.update;
    effect.allowRecurse = update.allowRecurse = allowed;
}

function setupRenderEffect(instance) {
    var updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
    instance.$updateScopedSlots = function() {
        return nextTick$1(function() {
            return queueJob(updateScopedSlots);
        });
    };
    var componentUpdateFn = function componentUpdateFn() {
        if (!instance.isMounted) {
            onBeforeUnmount(function() {
                setRef$1(instance, true);
            }, instance);
            {
                startMeasure(instance, "patch");
            }
            patch(instance, renderComponentRoot(instance));
            {
                endMeasure(instance, "patch");
            }
            {
                devtoolsComponentAdded(instance);
            }
        } else {
            var next3 = instance.next, bu = instance.bu, u = instance.u;
            {
                pushWarningContext(next3 || instance.vnode);
            }
            toggleRecurse(instance, false);
            updateComponentPreRender();
            if (bu) {
                invokeArrayFns$1(bu);
            }
            toggleRecurse(instance, true);
            {
                startMeasure(instance, "patch");
            }
            patch(instance, renderComponentRoot(instance));
            {
                endMeasure(instance, "patch");
            }
            if (u) {
                queuePostRenderEffect(u);
            }
            {
                devtoolsComponentUpdated(instance);
            }
            {
                popWarningContext();
            }
        }
    };
    var effect = instance.effect = new ReactiveEffect(componentUpdateFn, function() {
        return queueJob(instance.update);
    }, instance.scope);
    var update = instance.update = effect.run.bind(effect);
    update.id = instance.uid;
    toggleRecurse(instance, true);
    {
        effect.onTrack = instance.rtc ? function(e2) {
            return invokeArrayFns$1(instance.rtc, e2);
        } : void 0;
        effect.onTrigger = instance.rtg ? function(e2) {
            return invokeArrayFns$1(instance.rtg, e2);
        } : void 0;
        update.ownerInstance = instance;
    }
    update();
}

function unmountComponent(instance) {
    var bum = instance.bum, scope = instance.scope, update = instance.update, um = instance.um;
    if (bum) {
        invokeArrayFns$1(bum);
    }
    scope.stop();
    if (update) {
        update.active = false;
    }
    if (um) {
        queuePostRenderEffect(um);
    }
    queuePostRenderEffect(function() {
        instance.isUnmounted = true;
    });
    {
        devtoolsComponentRemoved(instance);
    }
}

var oldCreateApp = createAppAPI();

function getTarget() {
    if (typeof window !== "undefined") {
        return window;
    }
    if (typeof globalThis !== "undefined") {
        return globalThis;
    }
    if (typeof global !== "undefined") {
        return global;
    }
    if (typeof my !== "undefined") {
        return my;
    }
}

function createVueApp(rootComponent) {
    var rootProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var target = getTarget();
    target.__VUE__ = true;
    {
        setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    var app = oldCreateApp(rootComponent, rootProps);
    var appContext = app._context;
    initAppConfig(appContext.config);
    var createVNode = function createVNode(initialVNode) {
        initialVNode.appContext = appContext;
        initialVNode.shapeFlag = 6;
        return initialVNode;
    };
    var createComponent2 = function createComponent3(initialVNode, options) {
        return mountComponent(createVNode(initialVNode), options);
    };
    var destroyComponent = function destroyComponent2(component) {
        return component && unmountComponent(component.$);
    };
    app.mount = function mount() {
        rootComponent.render = NOOP;
        var instance = mountComponent(createVNode({
            type: rootComponent
        }), {
            mpType: MPType.APP,
            mpInstance: null,
            parentComponent: null,
            slots: [],
            props: null
        });
        app._instance = instance.$;
        {
            devtoolsInitApp(app, version$1);
        }
        instance.$app = app;
        instance.$createComponent = createComponent2;
        instance.$destroyComponent = destroyComponent;
        appContext.$appInstance = instance;
        return instance;
    };
    app.unmount = function unmount() {
        warn("Cannot unmount an app.");
    };
    return app;
}

function injectLifecycleHook(name, hook, publicThis, instance) {
    if (isFunction(hook)) {
        injectHook(name, hook.bind(publicThis), instance);
    }
}

function initHooks$1(options, instance, publicThis) {
    var mpType = options.mpType || publicThis.$mpType;
    if (!mpType || mpType === "component") {
        return;
    }
    Object.keys(options).forEach(function(name) {
        if (isUniLifecycleHook(name, options[name], false)) {
            var hooks = options[name];
            if (isArray$1(hooks)) {
                hooks.forEach(function(hook) {
                    return injectLifecycleHook(name, hook, publicThis, instance);
                });
            } else {
                injectLifecycleHook(name, hooks, publicThis, instance);
            }
        }
    });
}

function applyOptions$2(options, instance, publicThis) {
    initHooks$1(options, instance, publicThis);
}

function set$3(target, key, val) {
    return target[key] = val;
}

function $callMethod(method) {
    var fn = this[method];
    if (fn) {
        for (var _len17 = arguments.length, args = new Array(_len17 > 1 ? _len17 - 1 : 0), _key25 = 1; _key25 < _len17; _key25++) {
            args[_key25 - 1] = arguments[_key25];
        }
        return fn.apply(void 0, args);
    }
    console.error("method ".concat(method, " not found"));
    return null;
}

function createErrorHandler(app) {
    return function errorHandler(err, instance, _info) {
        if (!instance) {
            throw err;
        }
        var appInstance = app._instance;
        if (!appInstance || !appInstance.proxy) {
            throw err;
        }
        {
            appInstance.proxy.$callHook(ON_ERROR, err);
        }
    };
}

function mergeAsArray(to, from2) {
    return to ? _toConsumableArray2(new Set([].concat(to, from2))) : from2;
}

function initOptionMergeStrategies(optionMergeStrategies) {
    UniLifecycleHooks.forEach(function(name) {
        optionMergeStrategies[name] = mergeAsArray;
    });
}

var realAtob;

var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== "function") {
    realAtob = function realAtob(str) {
        str = String(str).replace(/[\t\n\f\r ]+/g, "");
        if (!b64re.test(str)) {
            throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
        }
        str += "==".slice(2 - (str.length & 3));
        var bitmap;
        var result = "";
        var r1;
        var r2;
        var i = 0;
        for (;i < str.length; ) {
            bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
            result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
        }
        return result;
    };
} else {
    realAtob = atob;
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(realAtob(str).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
}

function getCurrentUserInfo() {
    var token = index.getStorageSync("uni_id_token") || "";
    var tokenArr = token.split(".");
    if (!token || tokenArr.length !== 3) {
        return {
            uid: null,
            role: [],
            permission: [],
            tokenExpired: 0
        };
    }
    var userInfo;
    try {
        userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
    } catch (error) {
        throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
    }
    userInfo.tokenExpired = userInfo.exp * 1e3;
    delete userInfo.exp;
    delete userInfo.iat;
    return userInfo;
}

function uniIdMixin(globalProperties) {
    globalProperties.uniIDHasRole = function(roleId) {
        var _getCurrentUserInfo = getCurrentUserInfo(), role = _getCurrentUserInfo.role;
        return role.indexOf(roleId) > -1;
    };
    globalProperties.uniIDHasPermission = function(permissionId) {
        var _getCurrentUserInfo2 = getCurrentUserInfo(), permission = _getCurrentUserInfo2.permission;
        return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
    };
    globalProperties.uniIDTokenValid = function() {
        var _getCurrentUserInfo3 = getCurrentUserInfo(), tokenExpired = _getCurrentUserInfo3.tokenExpired;
        return tokenExpired > Date.now();
    };
}

function initApp(app) {
    var appConfig = app._context.config;
    appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
    initOptionMergeStrategies(appConfig.optionMergeStrategies);
    var globalProperties = appConfig.globalProperties;
    {
        uniIdMixin(globalProperties);
    }
    {
        globalProperties.$set = set$3;
        globalProperties.$applyOptions = applyOptions$2;
        globalProperties.$callMethod = $callMethod;
    }
    {
        index.invokeCreateVueAppHook(app);
    }
}

var propsCaches = /*   */ Object.create(null);

function renderProps(props) {
    var _getCurrentInstance = getCurrentInstance(), uid2 = _getCurrentInstance.uid, __counter = _getCurrentInstance.__counter;
    var propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
    return uid2 + "," + propsId + "," + __counter;
}

function pruneComponentPropsCache(uid2) {
    delete propsCaches[uid2];
}

function findComponentPropsData(up) {
    if (!up) {
        return;
    }
    var _up$split = up.split(","), _up$split2 = _slicedToArray2(_up$split, 2), uid2 = _up$split2[0], propsId = _up$split2[1];
    if (!propsCaches[uid2]) {
        return;
    }
    return propsCaches[uid2][parseInt(propsId)];
}

var plugin = {
    install: function install(app) {
        initApp(app);
        app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
        var oldMount = app.mount;
        app.mount = function mount(rootContainer) {
            var instance = oldMount.call(app, rootContainer);
            var createApp2 = getCreateApp();
            if (createApp2) {
                createApp2(instance);
            } else {
                if (typeof createMiniProgramApp !== "undefined") {
                    createMiniProgramApp(instance);
                }
            }
            return instance;
        };
    }
};

function getCreateApp() {
    var method = "createApp";
    if (typeof global !== "undefined") {
        return global[method];
    } else if (typeof my !== "undefined") {
        return my[method];
    }
}

function vOn(value, key) {
    var instance = getCurrentInstance();
    var ctx = instance.ctx;
    var extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
    var name = "e" + instance.$ei++ + extraKey;
    var mpInstance = ctx.$scope;
    if (!value) {
        delete mpInstance[name];
        return name;
    }
    var existingInvoker = mpInstance[name];
    if (existingInvoker) {
        existingInvoker.value = value;
    } else {
        mpInstance[name] = createInvoker(value, instance);
    }
    return name;
}

function createInvoker(initialValue, instance) {
    var invoker = function invoker(e2) {
        patchMPEvent(e2);
        var args = [ e2 ];
        if (e2.detail && e2.detail.__args__) {
            args = e2.detail.__args__;
        }
        var eventValue = invoker.value;
        var invoke = function invoke() {
            return callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
        };
        var eventTarget = e2.target;
        var eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
        if (bubbles.includes(e2.type) && !eventSync) {
            setTimeout(invoke);
        } else {
            var res = invoke();
            if (e2.type === "input" && (isArray$1(res) || isPromise(res))) {
                return;
            }
            return res;
        }
    };
    invoker.value = initialValue;
    return invoker;
}

var bubbles = [ 
// touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
// 'touchstart',
// 'touchmove',
// 'touchcancel',
// 'touchend',
"tap", "longpress", "longtap", "transitionend", "animationstart", "animationiteration", "animationend", "touchforcechange" ];

function patchMPEvent(event) {
    if (event.type && event.target) {
        event.preventDefault = NOOP;
        event.stopPropagation = NOOP;
        event.stopImmediatePropagation = NOOP;
        if (!hasOwn$b(event, "detail")) {
            event.detail = {};
        }
        if (hasOwn$b(event, "markerId")) {
            event.detail = _typeof2(event.detail) === "object" ? event.detail : {};
            event.detail.markerId = event.markerId;
        }
        if (isPlainObject$2(event.detail) && hasOwn$b(event.detail, "checked") && !hasOwn$b(event.detail, "value")) {
            event.detail.value = event.detail.checked;
        }
        if (isPlainObject$2(event.detail)) {
            event.target = extend({}, event.target, event.detail);
        }
    }
}

function patchStopImmediatePropagation(e2, value) {
    if (isArray$1(value)) {
        var originalStop = e2.stopImmediatePropagation;
        e2.stopImmediatePropagation = function() {
            originalStop && originalStop.call(e2);
            e2._stopped = true;
        };
        return value.map(function(fn) {
            return function(e3) {
                return !e3._stopped && fn(e3);
            };
        });
    } else {
        return value;
    }
}

var o = function o(value, key) {
    return vOn(value, key);
};

var e = function e(target) {
    for (var _len18 = arguments.length, sources = new Array(_len18 > 1 ? _len18 - 1 : 0), _key26 = 1; _key26 < _len18; _key26++) {
        sources[_key26 - 1] = arguments[_key26];
    }
    return extend.apply(void 0, [ target ].concat(sources));
};

var n = function n(value) {
    return normalizeClass(value);
};

var t = function t(val) {
    return toDisplayString(val);
};

var p = function p(props) {
    return renderProps(props);
};

function createApp$1(rootComponent) {
    var rootProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    rootComponent && (rootComponent.mpType = "app");
    return createVueApp(rootComponent, rootProps).use(plugin);
}

var createSSRApp = createApp$1;

var MP_METHODS = [ "createSelectorQuery", "createIntersectionObserver", "selectAllComponents", "selectComponent" ];

function createEmitFn(oldEmit, ctx) {
    return function emit2(event) {
        var scope = ctx.$scope;
        for (var _len19 = arguments.length, args = new Array(_len19 > 1 ? _len19 - 1 : 0), _key27 = 1; _key27 < _len19; _key27++) {
            args[_key27 - 1] = arguments[_key27];
        }
        if (scope && event) {
            var detail = {
                __args__: args
            };
            {
                scope.triggerEvent(event, detail);
            }
        }
        return oldEmit.apply(this, [ event ].concat(args));
    };
}

function initBaseInstance(instance, options) {
    var ctx = instance.ctx;
    ctx.mpType = options.mpType;
    ctx.$mpType = options.mpType;
    ctx.$mpPlatform = "mp-weixin";
    ctx.$scope = options.mpInstance;
    ctx.$mp = {};
    {
        ctx._self = {};
    }
    instance.slots = {};
    if (isArray$1(options.slots) && options.slots.length) {
        options.slots.forEach(function(name) {
            instance.slots[name] = true;
        });
        if (instance.slots[SLOT_DEFAULT_NAME]) {
            instance.slots.default = true;
        }
    }
    ctx.getOpenerEventChannel = function() {
        {
            return options.mpInstance.getOpenerEventChannel();
        }
    };
    ctx.$hasHook = hasHook;
    ctx.$callHook = callHook;
    instance.emit = createEmitFn(instance.emit, ctx);
}

function initComponentInstance(instance, options) {
    initBaseInstance(instance, options);
    var ctx = instance.ctx;
    MP_METHODS.forEach(function(method) {
        ctx[method] = function() {
            var mpInstance = ctx.$scope;
            if (mpInstance && mpInstance[method]) {
                for (var _len20 = arguments.length, args = new Array(_len20), _key28 = 0; _key28 < _len20; _key28++) {
                    args[_key28] = arguments[_key28];
                }
                return mpInstance[method].apply(mpInstance, args);
            }
        };
    });
}

function initMocks(instance, mpInstance, mocks2) {
    var ctx = instance.ctx;
    mocks2.forEach(function(mock) {
        if (hasOwn$b(mpInstance, mock)) {
            instance[mock] = ctx[mock] = mpInstance[mock];
        }
    });
}

function hasHook(name) {
    var hooks = this.$[name];
    if (hooks && hooks.length) {
        return true;
    }
    return false;
}

function callHook(name, args) {
    if (name === "mounted") {
        callHook.call(this, "bm");
        this.$.isMounted = true;
        name = "m";
    }
    var hooks = this.$[name];
    return hooks && invokeArrayFns(hooks, args);
}

var PAGE_INIT_HOOKS = [ ON_LOAD, ON_SHOW, ON_HIDE, ON_UNLOAD, ON_RESIZE, ON_TAB_ITEM_TAP, ON_REACH_BOTTOM, ON_PULL_DOWN_REFRESH, ON_ADD_TO_FAVORITES ];

function findHooks(vueOptions) {
    var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : /*   */ new Set();
    if (vueOptions) {
        Object.keys(vueOptions).forEach(function(name) {
            if (isUniLifecycleHook(name, vueOptions[name])) {
                hooks.add(name);
            }
        });
        {
            var extendsOptions = vueOptions.extends, mixins = vueOptions.mixins;
            if (mixins) {
                mixins.forEach(function(mixin) {
                    return findHooks(mixin, hooks);
                });
            }
            if (extendsOptions) {
                findHooks(extendsOptions, hooks);
            }
        }
    }
    return hooks;
}

function initHook(mpOptions, hook, excludes) {
    if (excludes.indexOf(hook) === -1 && !hasOwn$b(mpOptions, hook)) {
        mpOptions[hook] = function(args) {
            return this.$vm && this.$vm.$callHook(hook, args);
        };
    }
}

var EXCLUDE_HOOKS = [ ON_READY ];

function initHooks(mpOptions, hooks) {
    var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EXCLUDE_HOOKS;
    hooks.forEach(function(hook) {
        return initHook(mpOptions, hook, excludes);
    });
}

function initUnknownHooks(mpOptions, vueOptions) {
    var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EXCLUDE_HOOKS;
    findHooks(vueOptions).forEach(function(hook) {
        return initHook(mpOptions, hook, excludes);
    });
}

function initRuntimeHooks(mpOptions, runtimeHooks) {
    if (!runtimeHooks) {
        return;
    }
    var hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
    hooks.forEach(function(hook) {
        if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
            initHook(mpOptions, hook, []);
        }
    });
}

var findMixinRuntimeHooks = /*   */ once(function() {
    var runtimeHooks = [];
    var app = isFunction(getApp) && getApp({
        allowDefault: true
    });
    if (app && app.$vm && app.$vm.$) {
        var mixins = app.$vm.$.appContext.mixins;
        if (isArray$1(mixins)) {
            var hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
            mixins.forEach(function(mixin) {
                hooks.forEach(function(hook) {
                    if (hasOwn$b(mixin, hook) && !runtimeHooks.includes(hook)) {
                        runtimeHooks.push(hook);
                    }
                });
            });
        }
    }
    return runtimeHooks;
});

function initMixinRuntimeHooks(mpOptions) {
    initHooks(mpOptions, findMixinRuntimeHooks());
}

var HOOKS = [ ON_SHOW, ON_HIDE, ON_ERROR, ON_THEME_CHANGE, ON_PAGE_NOT_FOUND, ON_UNHANDLE_REJECTION ];

function parseApp(instance, parseAppOptions) {
    var internalInstance = instance.$;
    var appOptions = {
        globalData: instance.$options && instance.$options.globalData || {},
        $vm: instance,
        onLaunch: function onLaunch(options) {
            this.$vm = instance;
            var ctx = internalInstance.ctx;
            if (this.$vm && ctx.$scope) {
                return;
            }
            initBaseInstance(internalInstance, {
                mpType: "app",
                mpInstance: this,
                slots: []
            });
            ctx.globalData = this.globalData;
            instance.$callHook(ON_LAUNCH, options);
        }
    };
    var onError = internalInstance.onError;
    if (onError) {
        internalInstance.appContext.config.errorHandler = function(err) {
            instance.$callHook(ON_ERROR, err);
        };
    }
    initLocale(instance);
    var vueOptions = instance.$.type;
    initHooks(appOptions, HOOKS);
    initUnknownHooks(appOptions, vueOptions);
    {
        var methods = vueOptions.methods;
        methods && extend(appOptions, methods);
    }
    if (parseAppOptions) {
        parseAppOptions.parse(appOptions);
    }
    return appOptions;
}

function initCreateApp(parseAppOptions) {
    return function createApp2(vm) {
        return App(parseApp(vm, parseAppOptions));
    };
}

function initCreateSubpackageApp(parseAppOptions) {
    return function createApp2(vm) {
        var appOptions = parseApp(vm, parseAppOptions);
        var app = isFunction(getApp) && getApp({
            allowDefault: true
        });
        if (!app) return;
        vm.$.ctx.$scope = app;
        var globalData = app.globalData;
        if (globalData) {
            Object.keys(appOptions.globalData).forEach(function(name) {
                if (!hasOwn$b(globalData, name)) {
                    globalData[name] = appOptions.globalData[name];
                }
            });
        }
        Object.keys(appOptions).forEach(function(name) {
            if (!hasOwn$b(app, name)) {
                app[name] = appOptions[name];
            }
        });
        initAppLifecycle(appOptions, vm);
    };
}

function initAppLifecycle(appOptions, vm) {
    if (isFunction(appOptions.onLaunch)) {
        var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
        appOptions.onLaunch(args);
    }
    if (isFunction(appOptions.onShow) && wx.onAppShow) {
        wx.onAppShow(function(args) {
            vm.$callHook("onShow", args);
        });
    }
    if (isFunction(appOptions.onHide) && wx.onAppHide) {
        wx.onAppHide(function(args) {
            vm.$callHook("onHide", args);
        });
    }
}

function initLocale(appVm) {
    var locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
    Object.defineProperty(appVm, "$locale", {
        get: function get() {
            return locale.value;
        },
        set: function set(v) {
            locale.value = v;
        }
    });
}

function initVueIds(vueIds, mpInstance) {
    if (!vueIds) {
        return;
    }
    var ids = vueIds.split(",");
    var len = ids.length;
    if (len === 1) {
        mpInstance._$vueId = ids[0];
    } else if (len === 2) {
        mpInstance._$vueId = ids[0];
        mpInstance._$vuePid = ids[1];
    }
}

var EXTRAS = [ "externalClasses" ];

function initExtraOptions(miniProgramComponentOptions, vueOptions) {
    EXTRAS.forEach(function(name) {
        if (hasOwn$b(vueOptions, name)) {
            miniProgramComponentOptions[name] = vueOptions[name];
        }
    });
}

var WORKLET_RE = /_(.*)_worklet_factory_/;

function initWorkletMethods(mpMethods, vueMethods) {
    if (vueMethods) {
        Object.keys(vueMethods).forEach(function(name) {
            var matches = name.match(WORKLET_RE);
            if (matches) {
                var workletName = matches[1];
                mpMethods[name] = vueMethods[name];
                mpMethods[workletName] = vueMethods[workletName];
            }
        });
    }
}

function initWxsCallMethods(methods, wxsCallMethods) {
    if (!isArray$1(wxsCallMethods)) {
        return;
    }
    wxsCallMethods.forEach(function(callMethod) {
        methods[callMethod] = function(args) {
            return this.$vm[callMethod](args);
        };
    });
}

function selectAllComponents(mpInstance, selector, $refs) {
    var components = mpInstance.selectAllComponents(selector);
    components.forEach(function(component) {
        var ref2 = component.properties.uR;
        $refs[ref2] = component.$vm || component;
    });
}

function initRefs(instance, mpInstance) {
    Object.defineProperty(instance, "refs", {
        get: function get() {
            var $refs = {};
            selectAllComponents(mpInstance, ".r", $refs);
            var forComponents = mpInstance.selectAllComponents(".r-i-f");
            forComponents.forEach(function(component) {
                var ref2 = component.properties.uR;
                if (!ref2) {
                    return;
                }
                if (!$refs[ref2]) {
                    $refs[ref2] = [];
                }
                $refs[ref2].push(component.$vm || component);
            });
            return $refs;
        }
    });
}

function findVmByVueId(instance, vuePid) {
    var $children = instance.$children;
    for (var i = $children.length - 1; i >= 0; i--) {
        var childVm = $children[i];
        if (childVm.$scope._$vueId === vuePid) {
            return childVm;
        }
    }
    var parentVm;
    for (var _i2 = $children.length - 1; _i2 >= 0; _i2--) {
        parentVm = findVmByVueId($children[_i2], vuePid);
        if (parentVm) {
            return parentVm;
        }
    }
}

var builtInProps = [ 
// 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
// event-opts
"eO", 
// 组件 ref
"uR", 
// 组件 ref-in-for
"uRIF", 
// 组件 id
"uI", 
// 组件类型 m: 小程序组件
"uT", 
// 组件 props
"uP", 
// 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
"uS" ];

function initDefaultProps(options) {
    var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var properties = {};
    if (!isBehavior) {
        builtInProps.forEach(function(name) {
            properties[name] = {
                type: null,
                value: ""
            };
        });
        properties.uS = {
            type: null,
            value: [],
            observer: function observer(newVal) {
                var $slots = /*   */ Object.create(null);
                newVal && newVal.forEach(function(slotName) {
                    $slots[slotName] = true;
                });
                this.setData({
                    $slots: $slots
                });
            }
        };
    }
    if (options.behaviors) {
        if (options.behaviors.includes("wx://form-field")) {
            if (!options.properties || !options.properties.name) {
                properties.name = {
                    type: null,
                    value: ""
                };
            }
            if (!options.properties || !options.properties.value) {
                properties.value = {
                    type: null,
                    value: ""
                };
            }
        }
    }
    return properties;
}

function initVirtualHostProps(options) {
    var properties = {};
    {
        if (options && options.virtualHost) {
            properties.virtualHostStyle = {
                type: null,
                value: ""
            };
            properties.virtualHostClass = {
                type: null,
                value: ""
            };
        }
    }
    return properties;
}

function initProps(mpComponentOptions) {
    if (!mpComponentOptions.properties) {
        mpComponentOptions.properties = {};
    }
    extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}

var PROP_TYPES = [ String, Number, Boolean, Object, Array, null ];

function parsePropType(type, defaultValue) {
    if (isArray$1(type) && type.length === 1) {
        return type[0];
    }
    return type;
}

function normalizePropType(type, defaultValue) {
    var res = parsePropType(type);
    return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}

function initPageProps(_ref18, rawProps) {
    var properties = _ref18.properties;
    if (isArray$1(rawProps)) {
        rawProps.forEach(function(key) {
            properties[key] = {
                type: String,
                value: ""
            };
        });
    } else if (isPlainObject$2(rawProps)) {
        Object.keys(rawProps).forEach(function(key) {
            var opts = rawProps[key];
            if (isPlainObject$2(opts)) {
                var value = opts.default;
                if (isFunction(value)) {
                    value = value();
                }
                var type = opts.type;
                opts.type = normalizePropType(type);
                properties[key] = {
                    type: opts.type,
                    value: value
                };
            } else {
                properties[key] = {
                    type: normalizePropType(opts)
                };
            }
        });
    }
}

function findPropsData(properties, isPage2) {
    return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}

function findPagePropsData(properties) {
    var propsData = {};
    if (isPlainObject$2(properties)) {
        Object.keys(properties).forEach(function(name) {
            if (builtInProps.indexOf(name) === -1) {
                propsData[name] = properties[name];
            }
        });
    }
    return propsData;
}

function initFormField(vm) {
    var vueOptions = vm.$options;
    if (isArray$1(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
        vm.$watch("modelValue", function() {
            vm.$scope && vm.$scope.setData({
                name: vm.name,
                value: vm.modelValue
            });
        }, {
            immediate: true
        });
    }
}

function initData(_) {
    return {};
}

function initPropsObserver(componentOptions) {
    var observe = function observe2() {
        var up = this.properties.uP;
        if (!up) {
            return;
        }
        if (this.$vm) {
            updateComponentProps(up, this.$vm.$);
        } else if (this.properties.uT === "m") {
            updateMiniProgramComponentProperties(up, this);
        }
    };
    {
        if (!componentOptions.observers) {
            componentOptions.observers = {};
        }
        componentOptions.observers.uP = observe;
    }
}

function updateMiniProgramComponentProperties(up, mpInstance) {
    var prevProps = mpInstance.properties;
    var nextProps = findComponentPropsData(up) || {};
    if (hasPropsChanged(prevProps, nextProps, false)) {
        mpInstance.setData(nextProps);
    }
}

function updateComponentProps(up, instance) {
    var prevProps = toRaw(instance.props);
    var nextProps = findComponentPropsData(up) || {};
    if (hasPropsChanged(prevProps, nextProps)) {
        updateProps(instance, nextProps, prevProps, false);
        if (hasQueueJob(instance.update)) {
            invalidateJob(instance.update);
        }
        {
            instance.update();
        }
    }
}

function hasPropsChanged(prevProps, nextProps) {
    var checkLen = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var nextKeys = Object.keys(nextProps);
    if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
        return true;
    }
    for (var i = 0; i < nextKeys.length; i++) {
        var key = nextKeys[i];
        if (nextProps[key] !== prevProps[key]) {
            return true;
        }
    }
    return false;
}

function initBehaviors(vueOptions) {
    var vueBehaviors = vueOptions.behaviors;
    var vueProps = vueOptions.props;
    if (!vueProps) {
        vueOptions.props = vueProps = [];
    }
    var behaviors = [];
    if (isArray$1(vueBehaviors)) {
        vueBehaviors.forEach(function(behavior) {
            behaviors.push(behavior.replace("uni://", "wx://"));
            if (behavior === "uni://form-field") {
                if (isArray$1(vueProps)) {
                    vueProps.push("name");
                    vueProps.push("modelValue");
                } else {
                    vueProps.name = {
                        type: String,
                        default: ""
                    };
                    vueProps.modelValue = {
                        type: [ String, Number, Boolean, Array, Object, Date ],
                        default: ""
                    };
                }
            }
        });
    }
    return behaviors;
}

function applyOptions(componentOptions, vueOptions) {
    componentOptions.data = initData();
    componentOptions.behaviors = initBehaviors(vueOptions);
}

function parseComponent(vueOptions, _ref19) {
    var parse = _ref19.parse, mocks2 = _ref19.mocks, isPage2 = _ref19.isPage, initRelation2 = _ref19.initRelation, handleLink2 = _ref19.handleLink, initLifetimes2 = _ref19.initLifetimes;
    vueOptions = vueOptions.default || vueOptions;
    var options = {
        multipleSlots: true,
        // styleIsolation: 'apply-shared',
        addGlobalClass: true,
        pureDataPattern: /^uP$/
    };
    if (isArray$1(vueOptions.mixins)) {
        vueOptions.mixins.forEach(function(item) {
            if (isObject$a(item.options)) {
                extend(options, item.options);
            }
        });
    }
    if (vueOptions.options) {
        extend(options, vueOptions.options);
    }
    var mpComponentOptions = {
        options: options,
        lifetimes: initLifetimes2({
            mocks: mocks2,
            isPage: isPage2,
            initRelation: initRelation2,
            vueOptions: vueOptions
        }),
        pageLifetimes: {
            show: function show() {
                this.$vm && this.$vm.$callHook("onPageShow");
            },
            hide: function hide() {
                this.$vm && this.$vm.$callHook("onPageHide");
            },
            resize: function resize(size3) {
                this.$vm && this.$vm.$callHook("onPageResize", size3);
            }
        },
        methods: {
            __l: handleLink2
        }
    };
    {
        applyOptions(mpComponentOptions, vueOptions);
    }
    initProps(mpComponentOptions);
    initPropsObserver(mpComponentOptions);
    initExtraOptions(mpComponentOptions, vueOptions);
    initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
    {
        initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
    }
    if (parse) {
        parse(mpComponentOptions, {
            handleLink: handleLink2
        });
    }
    return mpComponentOptions;
}

function initCreateComponent(parseOptions2) {
    return function createComponent2(vueComponentOptions) {
        return Component(parseComponent(vueComponentOptions, parseOptions2));
    };
}

var $createComponentFn;

var $destroyComponentFn;

function getAppVm() {
    return getApp().$vm;
}

function $createComponent(initialVNode, options) {
    if (!$createComponentFn) {
        $createComponentFn = getAppVm().$createComponent;
    }
    var proxy = $createComponentFn(initialVNode, options);
    return getExposeProxy(proxy.$) || proxy;
}

function $destroyComponent(instance) {
    if (!$destroyComponentFn) {
        $destroyComponentFn = getAppVm().$destroyComponent;
    }
    return $destroyComponentFn(instance);
}

function parsePage(vueOptions, parseOptions2) {
    var parse = parseOptions2.parse, mocks2 = parseOptions2.mocks, isPage2 = parseOptions2.isPage, initRelation2 = parseOptions2.initRelation, handleLink2 = parseOptions2.handleLink, initLifetimes2 = parseOptions2.initLifetimes;
    var miniProgramPageOptions = parseComponent(vueOptions, {
        mocks: mocks2,
        isPage: isPage2,
        initRelation: initRelation2,
        handleLink: handleLink2,
        initLifetimes: initLifetimes2
    });
    initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
    var methods = miniProgramPageOptions.methods;
    methods.onLoad = function(query) {
        this.options = query;
        this.$page = {
            fullPath: addLeadingSlash(this.route + stringifyQuery(query))
        };
        return this.$vm && this.$vm.$callHook(ON_LOAD, query);
    };
    initHooks(methods, PAGE_INIT_HOOKS);
    {
        initUnknownHooks(methods, vueOptions);
    }
    initRuntimeHooks(methods, vueOptions.__runtimeHooks);
    initMixinRuntimeHooks(methods);
    parse && parse(miniProgramPageOptions, {
        handleLink: handleLink2
    });
    return miniProgramPageOptions;
}

function initCreatePage(parseOptions2) {
    return function createPage2(vuePageOptions) {
        return Component(parsePage(vuePageOptions, parseOptions2));
    };
}

function initCreatePluginApp(parseAppOptions) {
    return function createApp2(vm) {
        initAppLifecycle(parseApp(vm, parseAppOptions), vm);
    };
}

var MPPage = Page;

var MPComponent = Component;

function initTriggerEvent(mpInstance) {
    var oldTriggerEvent = mpInstance.triggerEvent;
    var newTriggerEvent = function newTriggerEvent(event) {
        for (var _len21 = arguments.length, args = new Array(_len21 > 1 ? _len21 - 1 : 0), _key29 = 1; _key29 < _len21; _key29++) {
            args[_key29 - 1] = arguments[_key29];
        }
        return oldTriggerEvent.apply(mpInstance, [ customizeEvent(event) ].concat(args));
    };
    try {
        mpInstance.triggerEvent = newTriggerEvent;
    } catch (error) {
        mpInstance._triggerEvent = newTriggerEvent;
    }
}

function initMiniProgramHook(name, options, isComponent) {
    var oldHook = options[name];
    if (!oldHook) {
        options[name] = function() {
            initTriggerEvent(this);
        };
    } else {
        options[name] = function() {
            initTriggerEvent(this);
            for (var _len22 = arguments.length, args = new Array(_len22), _key30 = 0; _key30 < _len22; _key30++) {
                args[_key30] = arguments[_key30];
            }
            return oldHook.apply(this, args);
        };
    }
}

Page = function Page(options) {
    initMiniProgramHook(ON_LOAD, options);
    return MPPage(options);
};

Component = function Component(options) {
    initMiniProgramHook("created", options);
    var isVueComponent = options.properties && options.properties.uP;
    if (!isVueComponent) {
        initProps(options);
        initPropsObserver(options);
    }
    return MPComponent(options);
};

function initLifetimes(_ref20) {
    var mocks2 = _ref20.mocks, isPage2 = _ref20.isPage, initRelation2 = _ref20.initRelation, vueOptions = _ref20.vueOptions;
    return {
        attached: function attached() {
            var properties = this.properties;
            initVueIds(properties.uI, this);
            var relationOptions = {
                vuePid: this._$vuePid
            };
            initRelation2(this, relationOptions);
            var mpInstance = this;
            var isMiniProgramPage = isPage2(mpInstance);
            var propsData = properties;
            this.$vm = $createComponent({
                type: vueOptions,
                props: findPropsData(propsData, isMiniProgramPage)
            }, {
                mpType: isMiniProgramPage ? "page" : "component",
                mpInstance: mpInstance,
                slots: properties.uS || {},
                parentComponent: relationOptions.parent && relationOptions.parent.$,
                onBeforeSetup: function onBeforeSetup(instance, options) {
                    initRefs(instance, mpInstance);
                    initMocks(instance, mpInstance, mocks2);
                    initComponentInstance(instance, options);
                }
            });
            if (!isMiniProgramPage) {
                initFormField(this.$vm);
            }
        },
        ready: function ready() {
            if (this.$vm) {
                {
                    this.$vm.$callHook("mounted");
                    this.$vm.$callHook(ON_READY);
                }
            }
        },
        detached: function detached() {
            if (this.$vm) {
                pruneComponentPropsCache(this.$vm.$.uid);
                $destroyComponent(this.$vm);
            }
        }
    };
}

var mocks = [ "__route__", "__wxExparserNodeId__", "__wxWebviewId__" ];

function isPage(mpInstance) {
    return !!mpInstance.route;
}

function initRelation(mpInstance, detail) {
    mpInstance.triggerEvent("__l", detail);
}

function handleLink(event) {
    var detail = event.detail || event.value;
    var vuePid = detail.vuePid;
    var parentVm;
    if (vuePid) {
        parentVm = findVmByVueId(this.$vm, vuePid);
    }
    if (!parentVm) {
        parentVm = this.$vm;
    }
    detail.parent = parentVm;
}

var parseOptions = /*   */ Object.freeze({
    __proto__: null,
    handleLink: handleLink,
    initLifetimes: initLifetimes,
    initRelation: initRelation,
    isPage: isPage,
    mocks: mocks
});

var createApp = initCreateApp();

var createPage = initCreatePage(parseOptions);

var createComponent = initCreateComponent(parseOptions);

var createPluginApp = initCreatePluginApp();

var createSubpackageApp = initCreateSubpackageApp();

{
    wx.createApp = global.createApp = createApp;
    wx.createPage = createPage;
    wx.createComponent = createComponent;
    wx.createPluginApp = global.createPluginApp = createPluginApp;
    wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}

var createHook = function createHook(lifecycle) {
    return function(hook) {
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getCurrentInstance();
        !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
    };
};

var onShow = /*   */ createHook(ON_SHOW);

var onHide = /*   */ createHook(ON_HIDE);

var onLaunch = /*   */ createHook(ON_LAUNCH);

var onLoad = /*   */ createHook(ON_LOAD);

var onShareAppMessage = /*   */ createHook(ON_SHARE_APP_MESSAGE);

var isVue2 = false;

function set$1(target, key, val) {
    if (Array.isArray(target)) {
        target.length = Math.max(target.length, key);
        target.splice(key, 1, val);
        return val;
    }
    target[key] = val;
    return val;
}

function del(target, key) {
    if (Array.isArray(target)) {
        target.splice(key, 1);
        return;
    }
    delete target[key];
}

/*!
  * pinia v2.0.36
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */ var activePinia;

var setActivePinia = function setActivePinia(pinia) {
    return activePinia = pinia;
};

var piniaSymbol = Symbol("pinia");

function isPlainObject$1(o2) {
    return o2 && _typeof2(o2) === "object" && Object.prototype.toString.call(o2) === "[object Object]" && typeof o2.toJSON !== "function";
}

var MutationType;

(function(MutationType2) {
    MutationType2["direct"] = "direct";
    MutationType2["patchObject"] = "patch object";
    MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));

var IS_CLIENT = typeof window !== "undefined";

var USE_DEVTOOLS = IS_CLIENT;

var componentStateTypes = [];

var getStoreType = function getStoreType(id2) {
    return "🍍 " + id2;
};

function addStoreToDevtools(app, store2) {
    if (!componentStateTypes.includes(getStoreType(store2.$id))) {
        componentStateTypes.push(getStoreType(store2.$id));
    }
}

function patchActionForGrouping(store2, actionNames) {
    var actions = actionNames.reduce(function(storeActions, actionName) {
        storeActions[actionName] = toRaw(store2)[actionName];
        return storeActions;
    }, {});
    var _loop5 = function _loop5(actionName) {
        store2[actionName] = function() {
            var trackedStore = new Proxy(store2, {
                get: function get() {
                    return Reflect.get.apply(Reflect, arguments);
                },
                set: function set() {
                    return Reflect.set.apply(Reflect, arguments);
                }
            });
            return actions[actionName].apply(trackedStore, arguments);
        };
    };
    for (var actionName in actions) {
        _loop5(actionName);
    }
}

function devtoolsPlugin(_ref21) {
    var app = _ref21.app, store2 = _ref21.store, options = _ref21.options;
    if (store2.$id.startsWith("__hot:")) {
        return;
    }
    if (options.state) {
        store2._isOptionsAPI = true;
    }
    if (typeof options.state === "function") {
        patchActionForGrouping(
        // @ts-expect-error: can cast the store...
        store2, Object.keys(options.actions));
        var originalHotUpdate = store2._hotUpdate;
        toRaw(store2)._hotUpdate = function(newStore) {
            originalHotUpdate.apply(this, arguments);
            patchActionForGrouping(store2, Object.keys(newStore._hmrPayload.actions));
        };
    }
    addStoreToDevtools(app, 
    // FIXME: is there a way to allow the assignment from Store<Id, S, G, A> to StoreGeneric?
    store2);
}

function createPinia() {
    var scope = effectScope(true);
    var state = scope.run(function() {
        return ref({});
    });
    var _p = [];
    var toBeInstalled = [];
    var pinia = markRaw({
        install: function install(app) {
            setActivePinia(pinia);
            {
                pinia._a = app;
                app.provide(piniaSymbol, pinia);
                app.config.globalProperties.$pinia = pinia;
                toBeInstalled.forEach(function(plugin2) {
                    return _p.push(plugin2);
                });
                toBeInstalled = [];
            }
        },
        use: function use(plugin2) {
            if (!this._a && !isVue2) {
                toBeInstalled.push(plugin2);
            } else {
                _p.push(plugin2);
            }
            return this;
        },
        _p: _p,
        // it's actually undefined here
        // @ts-expect-error
        _a: null,
        _e: scope,
        _s: /*   */ new Map(),
        state: state
    });
    if (USE_DEVTOOLS && typeof Proxy !== "undefined") {
        pinia.use(devtoolsPlugin);
    }
    return pinia;
}

function patchObject(newState, oldState) {
    for (var key in oldState) {
        var subPatch = oldState[key];
        if (!(key in newState)) {
            continue;
        }
        var targetValue = newState[key];
        if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
            newState[key] = patchObject(targetValue, subPatch);
        } else {
            {
                newState[key] = subPatch;
            }
        }
    }
    return newState;
}

var noop$1 = function noop$1() {};

function addSubscription(subscriptions, callback, detached) {
    var onCleanup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop$1;
    subscriptions.push(callback);
    var removeSubscription = function removeSubscription() {
        var idx = subscriptions.indexOf(callback);
        if (idx > -1) {
            subscriptions.splice(idx, 1);
            onCleanup();
        }
    };
    if (!detached && getCurrentScope()) {
        onScopeDispose(removeSubscription);
    }
    return removeSubscription;
}

function triggerSubscriptions(subscriptions) {
    for (var _len23 = arguments.length, args = new Array(_len23 > 1 ? _len23 - 1 : 0), _key31 = 1; _key31 < _len23; _key31++) {
        args[_key31 - 1] = arguments[_key31];
    }
    subscriptions.slice().forEach(function(callback) {
        callback.apply(void 0, args);
    });
}

function mergeReactiveObjects(target, patchToApply) {
    if (target instanceof Map && patchToApply instanceof Map) {
        patchToApply.forEach(function(value, key) {
            return target.set(key, value);
        });
    }
    if (target instanceof Set && patchToApply instanceof Set) {
        patchToApply.forEach(target.add, target);
    }
    for (var key in patchToApply) {
        if (!patchToApply.hasOwnProperty(key)) continue;
        var subPatch = patchToApply[key];
        var targetValue = target[key];
        if (isPlainObject$1(targetValue) && isPlainObject$1(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
            target[key] = mergeReactiveObjects(targetValue, subPatch);
        } else {
            target[key] = subPatch;
        }
    }
    return target;
}

var skipHydrateSymbol = Symbol("pinia:skipHydration");

function shouldHydrate(obj) {
    return !isPlainObject$1(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}

var assign$1 = Object.assign;

function isComputed(o2) {
    return !!(isRef(o2) && o2.effect);
}

function createOptionsStore(id2, options, pinia, hot) {
    var state = options.state, actions = options.actions, getters = options.getters;
    var initialState = pinia.state.value[id2];
    var store2;
    function setup() {
        if (!initialState && !hot) {
            {
                pinia.state.value[id2] = state ? state() : {};
            }
        }
        var localState = hot ? 
        // use ref() to unwrap refs inside state TODO: check if this is still necessary
        toRefs(ref(state ? state() : {}).value) : toRefs(pinia.state.value[id2]);
        return assign$1(localState, actions, Object.keys(getters || {}).reduce(function(computedGetters, name) {
            if (name in localState) {
                console.warn('[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "'.concat(name, '" in store "').concat(id2, '".'));
            }
            computedGetters[name] = markRaw(computed(function() {
                setActivePinia(pinia);
                var store3 = pinia._s.get(id2);
                return getters[name].call(store3, store3);
            }));
            return computedGetters;
        }, {}));
    }
    store2 = createSetupStore(id2, setup, options, pinia, hot, true);
    return store2;
}

function createSetupStore($id, setup) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var pinia = arguments.length > 3 ? arguments[3] : undefined;
    var hot = arguments.length > 4 ? arguments[4] : undefined;
    var isOptionsStore = arguments.length > 5 ? arguments[5] : undefined;
    var scope;
    var optionsForPlugin = assign$1({
        actions: {}
    }, options);
    if (!pinia._e.active) {
        throw new Error("Pinia destroyed");
    }
    var $subscribeOptions = {
        deep: true
    };
    {
        $subscribeOptions.onTrigger = function(event) {
            if (isListening) {
                debuggerEvents = event;
            } else if (isListening == false && !store2._hotUpdating) {
                if (Array.isArray(debuggerEvents)) {
                    debuggerEvents.push(event);
                } else {
                    console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
                }
            }
        };
    }
    var isListening;
    var isSyncListening;
    var subscriptions = markRaw([]);
    var actionSubscriptions = markRaw([]);
    var debuggerEvents;
    var initialState = pinia.state.value[$id];
    if (!isOptionsStore && !initialState && !hot) {
        {
            pinia.state.value[$id] = {};
        }
    }
    var hotState = ref({});
    var activeListener;
    function $patch(partialStateOrMutator) {
        var subscriptionMutation;
        isListening = isSyncListening = false;
        {
            debuggerEvents = [];
        }
        if (typeof partialStateOrMutator === "function") {
            partialStateOrMutator(pinia.state.value[$id]);
            subscriptionMutation = {
                type: MutationType.patchFunction,
                storeId: $id,
                events: debuggerEvents
            };
        } else {
            mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
            subscriptionMutation = {
                type: MutationType.patchObject,
                payload: partialStateOrMutator,
                storeId: $id,
                events: debuggerEvents
            };
        }
        var myListenerId = activeListener = Symbol();
        nextTick$1().then(function() {
            if (activeListener === myListenerId) {
                isListening = true;
            }
        });
        isSyncListening = true;
        triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
    }
    var $reset = isOptionsStore ? function $reset2() {
        var state = options.state;
        var newState = state ? state() : {};
        this.$patch(function($state) {
            assign$1($state, newState);
        });
    } : /* istanbul ignore next */
    function() {
        throw new Error('🍍: Store "'.concat($id, '" is built using the setup syntax and does not implement $reset().'));
    };
    function $dispose() {
        scope.stop();
        subscriptions = [];
        actionSubscriptions = [];
        pinia._s.delete($id);
    }
    function wrapAction(name, action) {
        return function() {
            setActivePinia(pinia);
            var args = Array.from(arguments);
            var afterCallbackList = [];
            var onErrorCallbackList = [];
            function after(callback) {
                afterCallbackList.push(callback);
            }
            function onError(callback) {
                onErrorCallbackList.push(callback);
            }
            triggerSubscriptions(actionSubscriptions, {
                args: args,
                name: name,
                store: store2,
                after: after,
                onError: onError
            });
            var ret;
            try {
                ret = action.apply(this && this.$id === $id ? this : store2, args);
            } catch (error) {
                triggerSubscriptions(onErrorCallbackList, error);
                throw error;
            }
            if (ret instanceof Promise) {
                return ret.then(function(value) {
                    triggerSubscriptions(afterCallbackList, value);
                    return value;
                }).catch(function(error) {
                    triggerSubscriptions(onErrorCallbackList, error);
                    return Promise.reject(error);
                });
            }
            triggerSubscriptions(afterCallbackList, ret);
            return ret;
        };
    }
    var _hmrPayload = /*   */ markRaw({
        actions: {},
        getters: {},
        state: [],
        hotState: hotState
    });
    var partialStore = {
        _p: pinia,
        // _s: scope,
        $id: $id,
        $onAction: addSubscription.bind(null, actionSubscriptions),
        $patch: $patch,
        $reset: $reset,
        $subscribe: function $subscribe(callback) {
            var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var removeSubscription = addSubscription(subscriptions, callback, options2.detached, function() {
                return stopWatcher();
            });
            var stopWatcher = scope.run(function() {
                return watch(function() {
                    return pinia.state.value[$id];
                }, function(state) {
                    if (options2.flush === "sync" ? isSyncListening : isListening) {
                        callback({
                            storeId: $id,
                            type: MutationType.direct,
                            events: debuggerEvents
                        }, state);
                    }
                }, assign$1({}, $subscribeOptions, options2));
            });
            return removeSubscription;
        },
        $dispose: $dispose
    };
    var store2 = reactive(assign$1({
        _hmrPayload: _hmrPayload,
        _customProperties: markRaw(/*   */ new Set())
    }, partialStore));
    pinia._s.set($id, store2);
    var setupStore = pinia._e.run(function() {
        scope = effectScope();
        return scope.run(function() {
            return setup();
        });
    });
    for (var key in setupStore) {
        var prop = setupStore[key];
        if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
            if (hot) {
                set$1(hotState.value, key, toRef(setupStore, key));
            } else if (!isOptionsStore) {
                if (initialState && shouldHydrate(prop)) {
                    if (isRef(prop)) {
                        prop.value = initialState[key];
                    } else {
                        mergeReactiveObjects(prop, initialState[key]);
                    }
                }
                {
                    pinia.state.value[$id][key] = prop;
                }
            }
            {
                _hmrPayload.state.push(key);
            }
        } else if (typeof prop === "function") {
            var actionValue = hot ? prop : wrapAction(key, prop);
            {
                setupStore[key] = actionValue;
            }
            {
                _hmrPayload.actions[key] = prop;
            }
            optionsForPlugin.actions[key] = prop;
        } else {
            if (isComputed(prop)) {
                _hmrPayload.getters[key] = isOptionsStore ? 
                // @ts-expect-error
                options.getters[key] : prop;
                if (IS_CLIENT) {
                    var getters = setupStore._getters || (
                    // @ts-expect-error: same
                    setupStore._getters = markRaw([]));
                    getters.push(key);
                }
            }
        }
    }
    {
        assign$1(store2, setupStore);
        assign$1(toRaw(store2), setupStore);
    }
    Object.defineProperty(store2, "$state", {
        get: function get() {
            return hot ? hotState.value : pinia.state.value[$id];
        },
        set: function set(state) {
            if (hot) {
                throw new Error("cannot set hotState");
            }
            $patch(function($state) {
                assign$1($state, state);
            });
        }
    });
    {
        store2._hotUpdate = markRaw(function(newStore) {
            store2._hotUpdating = true;
            newStore._hmrPayload.state.forEach(function(stateKey) {
                if (stateKey in store2.$state) {
                    var newStateTarget = newStore.$state[stateKey];
                    var oldStateSource = store2.$state[stateKey];
                    if (_typeof2(newStateTarget) === "object" && isPlainObject$1(newStateTarget) && isPlainObject$1(oldStateSource)) {
                        patchObject(newStateTarget, oldStateSource);
                    } else {
                        newStore.$state[stateKey] = oldStateSource;
                    }
                }
                set$1(store2, stateKey, toRef(newStore.$state, stateKey));
            });
            Object.keys(store2.$state).forEach(function(stateKey) {
                if (!(stateKey in newStore.$state)) {
                    del(store2, stateKey);
                }
            });
            isListening = false;
            isSyncListening = false;
            pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
            isSyncListening = true;
            nextTick$1().then(function() {
                isListening = true;
            });
            for (var actionName in newStore._hmrPayload.actions) {
                var action = newStore[actionName];
                set$1(store2, actionName, wrapAction(actionName, action));
            }
            var _loop6 = function _loop6() {
                var getter = newStore._hmrPayload.getters[getterName];
                var getterValue = isOptionsStore ? 
                // special handling of options api
                computed(function() {
                    setActivePinia(pinia);
                    return getter.call(store2, store2);
                }) : getter;
                set$1(store2, getterName, getterValue);
            };
            for (var getterName in newStore._hmrPayload.getters) {
                _loop6();
            }
            Object.keys(store2._hmrPayload.getters).forEach(function(key) {
                if (!(key in newStore._hmrPayload.getters)) {
                    del(store2, key);
                }
            });
            Object.keys(store2._hmrPayload.actions).forEach(function(key) {
                if (!(key in newStore._hmrPayload.actions)) {
                    del(store2, key);
                }
            });
            store2._hmrPayload = newStore._hmrPayload;
            store2._getters = newStore._getters;
            store2._hotUpdating = false;
        });
    }
    if (USE_DEVTOOLS) {
        var nonEnumerable = {
            writable: true,
            configurable: true,
            // avoid warning on devtools trying to display this property
            enumerable: false
        };
        [ "_p", "_hmrPayload", "_getters", "_customProperties" ].forEach(function(p2) {
            Object.defineProperty(store2, p2, assign$1({
                value: store2[p2]
            }, nonEnumerable));
        });
    }
    pinia._p.forEach(function(extender) {
        if (USE_DEVTOOLS) {
            var extensions = scope.run(function() {
                return extender({
                    store: store2,
                    app: pinia._a,
                    pinia: pinia,
                    options: optionsForPlugin
                });
            });
            Object.keys(extensions || {}).forEach(function(key) {
                return store2._customProperties.add(key);
            });
            assign$1(store2, extensions);
        } else {
            assign$1(store2, scope.run(function() {
                return extender({
                    store: store2,
                    app: pinia._a,
                    pinia: pinia,
                    options: optionsForPlugin
                });
            }));
        }
    });
    if (store2.$state && _typeof2(store2.$state) === "object" && typeof store2.$state.constructor === "function" && !store2.$state.constructor.toString().includes("[native code]")) {
        console.warn('[🍍]: The "state" must be a plain object. It cannot be\n\tstate: () => new MyClass()\nFound in store "'.concat(store2.$id, '".'));
    }
    if (initialState && isOptionsStore && options.hydrate) {
        options.hydrate(store2.$state, initialState);
    }
    isListening = true;
    isSyncListening = true;
    return store2;
}

function defineStore(idOrOptions, setup, setupOptions) {
    var id2;
    var options;
    var isSetupStore = typeof setup === "function";
    if (typeof idOrOptions === "string") {
        id2 = idOrOptions;
        options = isSetupStore ? setupOptions : setup;
    } else {
        options = idOrOptions;
        id2 = idOrOptions.id;
        if (typeof id2 !== "string") {
            throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
        }
    }
    function useStore(pinia, hot) {
        var currentInstance2 = getCurrentInstance();
        pinia = 
        // in test mode, ignore the argument provided as we can always retrieve a
        // pinia instance with getActivePinia()
        pinia || currentInstance2 && inject(piniaSymbol, null);
        if (pinia) setActivePinia(pinia);
        if (!activePinia) {
            throw new Error('[🍍]: "getActivePinia()" was called but there was no active Pinia. Did you forget to install pinia?\n\tconst pinia = createPinia()\n\tapp.use(pinia)\nThis will fail in production.');
        }
        pinia = activePinia;
        if (!pinia._s.has(id2)) {
            if (isSetupStore) {
                createSetupStore(id2, setup, options, pinia);
            } else {
                createOptionsStore(id2, options, pinia);
            }
            {
                useStore._pinia = pinia;
            }
        }
        var store2 = pinia._s.get(id2);
        if (hot) {
            var hotId = "__hot:" + id2;
            var newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign$1({}, options), pinia, true);
            hot._hotUpdate(newStore);
            delete pinia.state.value[hotId];
            pinia._s.delete(hotId);
        }
        if (IS_CLIENT && currentInstance2 && currentInstance2.proxy && 
        // avoid adding stores that are just built for hot module replacement
        !hot) {
            var vm = currentInstance2.proxy;
            var cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
            cache[id2] = store2;
        }
        return store2;
    }
    useStore.$id = id2;
    return useStore;
}

var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};

function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}

var simpleCookieExports = {};

var simpleCookie = {
    get exports() {
        return simpleCookieExports;
    },
    set exports(v) {
        simpleCookieExports = v;
    }
};

(function(module2, exports2) {
    function printExpires(expires) {
        if (!expires) return false;
        if (typeof expires == "string") expires = new Date(expires);
        if (typeof expires == "number") expires = new Date(expires);
        var n2 = (expires.valueOf() - new Date().valueOf()) / 1e3;
        return "Expires=" + expires.toGMTString() + ";Max-Age=" + Math.round(n2);
    }
    var cookie = {
        stringify: function stringify(obj) {
            var value;
            try {
                value = encodeURIComponent(obj.value);
            } catch (e2) {
                value = obj.value;
            }
            return [ obj.name + "=" + value, typeof obj.expires != "undefined" && obj.expires ? printExpires(obj.expires) : "", typeof obj.path != "undefined" ? obj.path ? "Path=" + obj.path : "" : "Path=/", typeof obj.domain != "undefined" && obj.domain ? "Domain=" + obj.domain : "", typeof obj.secure != "undefined" && obj.secure ? "secure" : "", typeof obj.httponly != "undefined" && obj.httponly ? "HttpOnly" : "", typeof obj.samesite != "undefined" && obj.samesite ? "SameSite=" + obj.samesite : "" ].join(";").replace(/;+/g, ";").replace(/;$/, "").replace(/;/g, "; ");
        },
        parse: function parse(string, path2, domain) {
            var s = string.replace(/;\s+/g, ";").split(";").map(function(s2) {
                return s2.replace(/\s+\s+/g, "=").split("=");
            });
            var n2 = s.shift();
            var obj = {};
            obj.expires = false;
            obj.httponly = false;
            obj.secure = false;
            obj.path = path2 || "/";
            obj.domain = domain || "";
            obj.samesite = "";
            var I, f = {
                httponly: function httponly() {
                    obj.httponly = true;
                },
                secure: function secure() {
                    obj.secure = true;
                },
                expires: function expires(v) {
                    obj.expires = new Date(v);
                },
                "max-age": function maxAge(v) {
                    if (obj.expires) return;
                    obj.expires = new Date(new Date().valueOf() + v * 1e3);
                },
                path: function path(v) {
                    obj.path = v;
                },
                domain: function domain(v) {
                    obj.domain = v;
                },
                samesite: function samesite(v) {
                    obj.samesite = v;
                }
            };
            for (var i in s) {
                I = s[i][0].toLowerCase();
                if (typeof f[I] != "undefined") f[I](s[i].length == 2 ? s[i][1] : "");
            }
            if (!obj.expires) obj.expires = 0;
            obj.name = n2.shift();
            n2 = n2.map(function(s2) {
                var f2;
                try {
                    f2 = decodeURIComponent(s2);
                } catch (e2) {
                    f2 = s2;
                }
                return s2;
            });
            obj.value = n2.join("=");
            return obj;
        },
        tokenize: function tokenize(array) {
            return array.map(function(s) {
                return s.name + "=" + s.value;
            }).join("; ");
        }
    };
    module2.exports = cookie;
})(simpleCookie);

var Cookie = simpleCookieExports;

var toString$8 = Object.prototype.toString;

function isArray(val) {
    return toString$8.call(val) === "[object Array]";
}

function isObject$9(val) {
    return val !== null && _typeof2(val) === "object";
}

function isDate(val) {
    return toString$8.call(val) === "[object Date]";
}

function isURLSearchParams(val) {
    return typeof URLSearchParams !== "undefined" && val instanceof URLSearchParams;
}

function forEach$2(obj, fn) {
    if (obj === null || typeof obj === "undefined") {
        return;
    }
    if (_typeof2(obj) !== "object") {
        obj = [ obj ];
    }
    if (isArray(obj)) {
        for (var i = 0, l = obj.length; i < l; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

function deepMerge() {
    var result = {};
    function assignValue(val, key) {
        if (_typeof2(result[key]) === "object" && _typeof2(val) === "object") {
            result[key] = deepMerge(result[key], val);
        } else if (_typeof2(val) === "object") {
            result[key] = deepMerge({}, val);
        } else {
            result[key] = val;
        }
    }
    for (var i = 0, l = arguments.length; i < l; i++) {
        forEach$2(arguments[i], assignValue);
    }
    return result;
}

function isUndefined(val) {
    return typeof val === "undefined";
}

function encode$1(val) {
    return encodeURIComponent(val).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}

function buildURL(url2, params2, paramsSerializer) {
    if (!params2) {
        return url2;
    }
    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params2);
    } else if (isURLSearchParams(params2)) {
        serializedParams = params2.toString();
    } else {
        var parts = [];
        forEach$2(params2, function serialize2(val, key) {
            if (val === null || typeof val === "undefined") {
                return;
            }
            if (isArray(val)) {
                key = key + "[]";
            } else {
                val = [ val ];
            }
            forEach$2(val, function parseValue(v) {
                if (isDate(v)) {
                    v = v.toISOString();
                } else if (isObject$9(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(encode$1(key) + "=" + encode$1(v));
            });
        });
        serializedParams = parts.join("&");
    }
    if (serializedParams) {
        var hashmarkIndex = url2.indexOf("#");
        if (hashmarkIndex !== -1) {
            url2 = url2.slice(0, hashmarkIndex);
        }
        url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
    }
    return url2;
}

function isAbsoluteURL(url2) {
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
}

function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
}

function settle(resolve2, reject, response) {
    var validateStatus2 = response.config.validateStatus;
    var status = response.statusCode;
    if (status && (!validateStatus2 || validateStatus2(status))) {
        resolve2(response);
    } else {
        reject(response);
    }
}

var mergeKeys$1 = function mergeKeys$1(keys4, config2) {
    var config = {};
    keys4.forEach(function(prop) {
        if (!isUndefined(config2[prop])) {
            config[prop] = config2[prop];
        }
    });
    return config;
};

var adapter = function adapter(config) {
    return new Promise(function(resolve2, reject) {
        var fullPath = buildURL(buildFullPath(config.baseURL, config.url), config.params, config.paramsSerializer);
        var _config = {
            url: fullPath,
            header: config.header,
            complete: function complete(response) {
                config.fullPath = fullPath;
                response.config = config;
                response.rawData = response.data;
                try {
                    var jsonParseHandle = false;
                    var forcedJSONParsingType = _typeof2(config.forcedJSONParsing);
                    if (forcedJSONParsingType === "boolean") {
                        jsonParseHandle = config.forcedJSONParsing;
                    } else if (forcedJSONParsingType === "object") {
                        var includesMethod = config.forcedJSONParsing.include || [];
                        jsonParseHandle = includesMethod.includes(config.method);
                    }
                    if (jsonParseHandle && typeof response.data === "string") {
                        response.data = JSON.parse(response.data);
                    }
                } catch (e2) {}
                settle(resolve2, reject, response);
            }
        };
        var requestTask;
        if (config.method === "UPLOAD") {
            delete _config.header["content-type"];
            delete _config.header["Content-Type"];
            var otherConfig = {
                filePath: config.filePath,
                name: config.name
            };
            var optionalKeys = [ "timeout", "formData" ];
            requestTask = index.uploadFile(_objectSpread2(_objectSpread2(_objectSpread2({}, _config), otherConfig), mergeKeys$1(optionalKeys, config)));
        } else if (config.method === "DOWNLOAD") {
            var _optionalKeys = [ "timeout", "filePath" ];
            requestTask = index.downloadFile(_objectSpread2(_objectSpread2({}, _config), mergeKeys$1(_optionalKeys, config)));
        } else {
            var _optionalKeys2 = [ "data", "method", "timeout", "dataType", "responseType", "enableHttp2", "enableQuic", "enableCache", "enableHttpDNS", "httpDNSServiceId", "enableChunked", "forceCellularNetwork" ];
            requestTask = index.request(_objectSpread2(_objectSpread2({}, _config), mergeKeys$1(_optionalKeys2, config)));
        }
        if (config.getTask) {
            config.getTask(requestTask, config);
        }
    });
};

var dispatchRequest = function dispatchRequest(config) {
    return adapter(config);
};

function InterceptorManager() {
    this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
    });
    return this.handlers.length - 1;
};

InterceptorManager.prototype.eject = function eject(id2) {
    if (this.handlers[id2]) {
        this.handlers[id2] = null;
    }
};

InterceptorManager.prototype.forEach = function forEach(fn) {
    this.handlers.forEach(function(h) {
        if (h !== null) {
            fn(h);
        }
    });
};

var mergeKeys = function mergeKeys(keys4, globalsConfig, config2) {
    var config = {};
    keys4.forEach(function(prop) {
        if (!isUndefined(config2[prop])) {
            config[prop] = config2[prop];
        } else if (!isUndefined(globalsConfig[prop])) {
            config[prop] = globalsConfig[prop];
        }
    });
    return config;
};

var mergeConfig = function mergeConfig(globalsConfig) {
    var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var method = config2.method || globalsConfig.method || "GET";
    var config = {
        baseURL: config2.baseURL || globalsConfig.baseURL || "",
        method: method,
        url: config2.url || "",
        params: config2.params || {},
        custom: _objectSpread2(_objectSpread2({}, globalsConfig.custom || {}), config2.custom || {}),
        header: deepMerge(globalsConfig.header || {}, config2.header || {})
    };
    var defaultToConfig2Keys = [ "getTask", "validateStatus", "paramsSerializer", "forcedJSONParsing" ];
    config = _objectSpread2(_objectSpread2({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));
    if (method === "DOWNLOAD") {
        var downloadKeys = [ "timeout", "filePath" ];
        config = _objectSpread2(_objectSpread2({}, config), mergeKeys(downloadKeys, globalsConfig, config2));
    } else if (method === "UPLOAD") {
        delete config.header["content-type"];
        delete config.header["Content-Type"];
        var uploadKeys = [ "filePath", "name", "timeout", "formData" ];
        uploadKeys.forEach(function(prop) {
            if (!isUndefined(config2[prop])) {
                config[prop] = config2[prop];
            }
        });
        if (isUndefined(config.timeout) && !isUndefined(globalsConfig.timeout)) {
            config["timeout"] = globalsConfig["timeout"];
        }
    } else {
        var defaultsKeys = [ "data", "timeout", "dataType", "responseType", "enableHttp2", "enableQuic", "enableCache", "enableHttpDNS", "httpDNSServiceId", "enableChunked", "forceCellularNetwork" ];
        config = _objectSpread2(_objectSpread2({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
    }
    return config;
};

var defaults = {
    baseURL: "",
    header: {},
    method: "GET",
    dataType: "json",
    paramsSerializer: null,
    responseType: "text",
    custom: {},
    timeout: 6e4,
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    // 是否尝试将响应数据json化
    forcedJSONParsing: true
};

var clone = function() {
    function _instanceof(obj, type) {
        return type != null && obj instanceof type;
    }
    var nativeMap;
    try {
        nativeMap = Map;
    } catch (_) {
        nativeMap = function nativeMap() {};
    }
    var nativeSet;
    try {
        nativeSet = Set;
    } catch (_) {
        nativeSet = function nativeSet() {};
    }
    var nativePromise;
    try {
        nativePromise = Promise;
    } catch (_) {
        nativePromise = function nativePromise() {};
    }
    function clone2(parent2, circular, depth, prototype, includeNonEnumerable) {
        if (_typeof2(circular) === "object") {
            depth = circular.depth;
            prototype = circular.prototype;
            includeNonEnumerable = circular.includeNonEnumerable;
            circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined") circular = true;
        if (typeof depth == "undefined") depth = Infinity;
        function _clone(parent3, depth2) {
            if (parent3 === null) return null;
            if (depth2 === 0) return parent3;
            var child;
            var proto;
            if (_typeof2(parent3) != "object") {
                return parent3;
            }
            if (_instanceof(parent3, nativeMap)) {
                child = new nativeMap();
            } else if (_instanceof(parent3, nativeSet)) {
                child = new nativeSet();
            } else if (_instanceof(parent3, nativePromise)) {
                child = new nativePromise(function(resolve2, reject) {
                    parent3.then(function(value) {
                        resolve2(_clone(value, depth2 - 1));
                    }, function(err) {
                        reject(_clone(err, depth2 - 1));
                    });
                });
            } else if (clone2.__isArray(parent3)) {
                child = [];
            } else if (clone2.__isRegExp(parent3)) {
                child = new RegExp(parent3.source, __getRegExpFlags(parent3));
                if (parent3.lastIndex) child.lastIndex = parent3.lastIndex;
            } else if (clone2.__isDate(parent3)) {
                child = new Date(parent3.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent3)) {
                if (Buffer.from) {
                    child = Buffer.from(parent3);
                } else {
                    child = new Buffer(parent3.length);
                    parent3.copy(child);
                }
                return child;
            } else if (_instanceof(parent3, Error)) {
                child = Object.create(parent3);
            } else {
                if (typeof prototype == "undefined") {
                    proto = Object.getPrototypeOf(parent3);
                    child = Object.create(proto);
                } else {
                    child = Object.create(prototype);
                    proto = prototype;
                }
            }
            if (circular) {
                var index2 = allParents.indexOf(parent3);
                if (index2 != -1) {
                    return allChildren[index2];
                }
                allParents.push(parent3);
                allChildren.push(child);
            }
            if (_instanceof(parent3, nativeMap)) {
                parent3.forEach(function(value, key) {
                    var keyChild = _clone(key, depth2 - 1);
                    var valueChild = _clone(value, depth2 - 1);
                    child.set(keyChild, valueChild);
                });
            }
            if (_instanceof(parent3, nativeSet)) {
                parent3.forEach(function(value) {
                    var entryChild = _clone(value, depth2 - 1);
                    child.add(entryChild);
                });
            }
            for (var i in parent3) {
                var attrs = Object.getOwnPropertyDescriptor(parent3, i);
                if (attrs) {
                    child[i] = _clone(parent3[i], depth2 - 1);
                }
                try {
                    var objProperty = Object.getOwnPropertyDescriptor(parent3, i);
                    if (objProperty.set === "undefined") {
                        continue;
                    }
                    child[i] = _clone(parent3[i], depth2 - 1);
                } catch (e2) {
                    if (e2 instanceof TypeError) {
                        continue;
                    } else if (e2 instanceof ReferenceError) {
                        continue;
                    }
                }
            }
            if (Object.getOwnPropertySymbols) {
                var symbols = Object.getOwnPropertySymbols(parent3);
                for (var i = 0; i < symbols.length; i++) {
                    var symbol = symbols[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent3, symbol);
                    if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                        continue;
                    }
                    child[symbol] = _clone(parent3[symbol], depth2 - 1);
                    Object.defineProperty(child, symbol, descriptor);
                }
            }
            if (includeNonEnumerable) {
                var allPropertyNames = Object.getOwnPropertyNames(parent3);
                for (var i = 0; i < allPropertyNames.length; i++) {
                    var propertyName = allPropertyNames[i];
                    var descriptor = Object.getOwnPropertyDescriptor(parent3, propertyName);
                    if (descriptor && descriptor.enumerable) {
                        continue;
                    }
                    child[propertyName] = _clone(parent3[propertyName], depth2 - 1);
                    Object.defineProperty(child, propertyName, descriptor);
                }
            }
            return child;
        }
        return _clone(parent2, depth);
    }
    clone2.clonePrototype = function clonePrototype(parent2) {
        if (parent2 === null) return null;
        var c = function c() {};
        c.prototype = parent2;
        return new c();
    };
    function __objToStr(o2) {
        return Object.prototype.toString.call(o2);
    }
    clone2.__objToStr = __objToStr;
    function __isDate(o2) {
        return _typeof2(o2) === "object" && __objToStr(o2) === "[object Date]";
    }
    clone2.__isDate = __isDate;
    function __isArray(o2) {
        return _typeof2(o2) === "object" && __objToStr(o2) === "[object Array]";
    }
    clone2.__isArray = __isArray;
    function __isRegExp(o2) {
        return _typeof2(o2) === "object" && __objToStr(o2) === "[object RegExp]";
    }
    clone2.__isRegExp = __isRegExp;
    function __getRegExpFlags(re) {
        var flags = "";
        if (re.global) flags += "g";
        if (re.ignoreCase) flags += "i";
        if (re.multiline) flags += "m";
        return flags;
    }
    clone2.__getRegExpFlags = __getRegExpFlags;
    return clone2;
}();

var Request = /* */ function() {
    /**
   * @param {Object} arg - 全局配置
   * @param {String} arg.baseURL - 全局根路径
   * @param {Object} arg.header - 全局header
   * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
   * @param {String} arg.dataType = [json] - 全局默认的dataType
   * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
   * @param {Object} arg.custom - 全局默认的自定义参数
   * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
   * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
   * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
   * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
   * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
   */
    function Request() {
        var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _classCallCheck2(this, Request);
        if (!isPlainObject(arg)) {
            arg = {};
            console.warn("设置全局参数必须接收一个Object");
        }
        this.config = clone(_objectSpread2(_objectSpread2({}, defaults), arg));
        this.interceptors = {
            request: new InterceptorManager(),
            response: new InterceptorManager()
        };
    }
    /**
   * @Function
   * @param {Request~setConfigCallback} f - 设置全局默认配置
   */    _createClass2(Request, [ {
        key: "setConfig",
        value: function setConfig(f) {
            this.config = f(this.config);
        }
    }, {
        key: "middleware",
        value: function middleware(config) {
            config = mergeConfig(this.config, config);
            var chain = [ dispatchRequest, void 0 ];
            var promise = Promise.resolve(config);
            this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
                chain.unshift(interceptor.fulfilled, interceptor.rejected);
            });
            this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
                chain.push(interceptor.fulfilled, interceptor.rejected);
            });
            while (chain.length) {
                promise = promise.then(chain.shift(), chain.shift());
            }
            return promise;
        }
        /**
     * @Function
     * @param {Object} config - 请求配置项
     * @prop {String} options.url - 请求路径
     * @prop {Object} options.data - 请求参数
     * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
     * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
     * @prop {Object} [options.header = config.header] - 请求header
     * @prop {Object} [options.method = config.method] - 请求方法
     * @returns {Promise<unknown>}
     */    }, {
        key: "request",
        value: function request() {
            var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return this.middleware(config);
        }
    }, {
        key: "get",
        value: function get(url2) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                method: "GET"
            }, options));
        }
    }, {
        key: "post",
        value: function post(url2, data2) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                data: data2,
                method: "POST"
            }, options));
        }
    }, {
        key: "put",
        value: function put(url2, data2) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                data: data2,
                method: "PUT"
            }, options));
        }
    }, {
        key: "delete",
        value: function _delete(url2, data2) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                data: data2,
                method: "DELETE"
            }, options));
        }
    }, {
        key: "connect",
        value: function connect(url2, data2) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                data: data2,
                method: "CONNECT"
            }, options));
        }
    }, {
        key: "head",
        value: function head(url2, data2) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                data: data2,
                method: "HEAD"
            }, options));
        }
    }, {
        key: "options",
        value: function options(url2, data2) {
            var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                data: data2,
                method: "OPTIONS"
            }, _options));
        }
    }, {
        key: "trace",
        value: function trace(url2, data2) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            return this.middleware(_objectSpread2({
                url: url2,
                data: data2,
                method: "TRACE"
            }, options));
        }
    }, {
        key: "upload",
        value: function upload(url2) {
            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            config.url = url2;
            config.method = "UPLOAD";
            return this.middleware(config);
        }
    }, {
        key: "download",
        value: function download(url2) {
            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            config.url = url2;
            config.method = "DOWNLOAD";
            return this.middleware(config);
        }
    }, {
        key: "version",
        get: function get() {
            return "3.1.0";
        }
    } ]);
    return Request;
}();

var urlExports = {};

var url$4 = {
    get exports() {
        return urlExports;
    },
    set exports(v) {
        urlExports = v;
    }
};

var fails$e = function fails$e(exec2) {
    try {
        return !!exec2();
    } catch (error) {
        return true;
    }
};

var fails$d = fails$e;

var functionBindNative = !fails$d(function() {
    var test2 = function() {}.bind();
    return typeof test2 != "function" || test2.hasOwnProperty("prototype");
});

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$1 = Function.prototype;

var call$b = FunctionPrototype$1.call;

var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$1.bind.bind(call$b, call$b);

var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function(fn) {
    return function() {
        return call$b.apply(fn, arguments);
    };
};

var uncurryThis$l = functionUncurryThis;

var toString$7 = uncurryThis$l({}.toString);

var stringSlice$4 = uncurryThis$l("".slice);

var classofRaw$2 = function classofRaw$2(it) {
    return stringSlice$4(toString$7(it), 8, -1);
};

var uncurryThis$k = functionUncurryThis;

var fails$c = fails$e;

var classof$5 = classofRaw$2;

var $Object$4 = Object;

var split$3 = uncurryThis$k("".split);

var indexedObject = fails$c(function() {
    return !$Object$4("z").propertyIsEnumerable(0);
}) ? function(it) {
    return classof$5(it) === "String" ? split$3(it, "") : $Object$4(it);
} : $Object$4;

var isNullOrUndefined$3 = function isNullOrUndefined$3(it) {
    return it === null || it === void 0;
};

var isNullOrUndefined$2 = isNullOrUndefined$3;

var $TypeError$9 = TypeError;

var requireObjectCoercible$3 = function requireObjectCoercible$3(it) {
    if (isNullOrUndefined$2(it)) throw new $TypeError$9("Can't call method on " + it);
    return it;
};

var IndexedObject$1 = indexedObject;

var requireObjectCoercible$2 = requireObjectCoercible$3;

var toIndexedObject$5 = function toIndexedObject$5(it) {
    return IndexedObject$1(requireObjectCoercible$2(it));
};

var check = function check(it) {
    return it && it.Math === Math && it;
};

var global$e = 
// eslint-disable-next-line es/no-global-this -- safe
check((typeof globalThis === "undefined" ? "undefined" : _typeof2(globalThis)) == "object" && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof2(window)) == "object" && window) || 
// eslint-disable-next-line no-restricted-globals -- safe
check((typeof self === "undefined" ? "undefined" : _typeof2(self)) == "object" && self) || check(_typeof2(commonjsGlobal) == "object" && commonjsGlobal) || check(_typeof2(commonjsGlobal) == "object" && commonjsGlobal) || 
// eslint-disable-next-line no-new-func -- fallback
function() {
    return this;
}() || Function("return this")();

var sharedStoreExports = {};

var sharedStore = {
    get exports() {
        return sharedStoreExports;
    },
    set exports(v) {
        sharedStoreExports = v;
    }
};

var isPure = false;

var global$d = global$e;

var defineProperty$6 = Object.defineProperty;

var defineGlobalProperty$3 = function defineGlobalProperty$3(key, value) {
    try {
        defineProperty$6(global$d, key, {
            value: value,
            configurable: true,
            writable: true
        });
    } catch (error) {
        global$d[key] = value;
    }
    return value;
};

var globalThis$1 = global$e;

var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = "__core-js_shared__";

var store$3 = sharedStore.exports = globalThis$1[SHARED] || defineGlobalProperty$2(SHARED, {});

(store$3.versions || (store$3.versions = [])).push({
    version: "3.36.0",
    mode: "global",
    copyright: "© 2014-2024 Denis Pushkarev (zloirock.ru)",
    license: "https://github.com/zloirock/core-js/blob/v3.36.0/LICENSE",
    source: "https://github.com/zloirock/core-js"
});

var store$2 = sharedStoreExports;

var shared$3 = function shared$3(key, value) {
    return store$2[key] || (store$2[key] = value || {});
};

var requireObjectCoercible$1 = requireObjectCoercible$3;

var $Object$3 = Object;

var toObject$4 = function toObject$4(argument) {
    return $Object$3(requireObjectCoercible$1(argument));
};

var uncurryThis$j = functionUncurryThis;

var toObject$3 = toObject$4;

var hasOwnProperty = uncurryThis$j({}.hasOwnProperty);

var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
    return hasOwnProperty(toObject$3(it), key);
};

var uncurryThis$i = functionUncurryThis;

var id = 0;

var postfix = Math.random();

var toString$6 = uncurryThis$i(1..toString);

var uid$2 = function uid$2(key) {
    return "Symbol(" + (key === void 0 ? "" : key) + ")_" + toString$6(++id + postfix, 36);
};

var engineUserAgent = typeof navigator != "undefined" && String(navigator.userAgent) || "";

var global$c = global$e;

var userAgent = engineUserAgent;

var process = global$c.process;

var Deno = global$c.Deno;

var versions = process && process.versions || Deno && Deno.version;

var v8 = versions && versions.v8;

var match, version;

if (v8) {
    match = v8.split(".");
    version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

if (!version && userAgent) {
    match = userAgent.match(/Edge\/(\d+)/);
    if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/);
        if (match) version = +match[1];
    }
}

var engineV8Version = version;

var V8_VERSION = engineV8Version;

var fails$b = fails$e;

var global$b = global$e;

var $String$5 = global$b.String;

var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$b(function() {
    var symbol = Symbol("symbol detection");
    return !$String$5(symbol) || !(Object(symbol) instanceof Symbol) || 
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});

var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && _typeof2(Symbol.iterator) == "symbol";

var global$a = global$e;

var shared$2 = shared$3;

var hasOwn$a = hasOwnProperty_1;

var uid$1 = uid$2;

var NATIVE_SYMBOL = symbolConstructorDetection;

var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var Symbol$1 = global$a.Symbol;

var WellKnownSymbolsStore = shared$2("wks");

var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1["for"] || Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$b = function wellKnownSymbol$b(name) {
    if (!hasOwn$a(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$a(Symbol$1, name) ? Symbol$1[name] : createWellKnownSymbol("Symbol." + name);
    }
    return WellKnownSymbolsStore[name];
};

var documentAll = (typeof document === "undefined" ? "undefined" : _typeof2(document)) == "object" && document.all;

var isCallable$g = typeof documentAll == "undefined" && documentAll !== void 0 ? function(argument) {
    return typeof argument == "function" || argument === documentAll;
} : function(argument) {
    return typeof argument == "function";
};

var isCallable$f = isCallable$g;

var isObject$8 = function isObject$8(it) {
    return _typeof2(it) == "object" ? it !== null : isCallable$f(it);
};

var isObject$7 = isObject$8;

var $String$4 = String;

var $TypeError$8 = TypeError;

var anObject$9 = function anObject$9(argument) {
    if (isObject$7(argument)) return argument;
    throw new $TypeError$8($String$4(argument) + " is not an object");
};

var objectDefineProperties = {};

var fails$a = fails$e;

var descriptors = !fails$a(function() {
    return Object.defineProperty({}, 1, {
        get: function get() {
            return 7;
        }
    })[1] !== 7;
});

var DESCRIPTORS$f = descriptors;

var fails$9 = fails$e;

var v8PrototypeDefineBug = DESCRIPTORS$f && fails$9(function() {
    return Object.defineProperty(function() {}, "prototype", {
        value: 42,
        writable: false
    }).prototype !== 42;
});

var objectDefineProperty = {};

var global$9 = global$e;

var isObject$6 = isObject$8;

var document$1 = global$9.document;

var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

var documentCreateElement$1 = function documentCreateElement$1(it) {
    return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$e = descriptors;

var fails$8 = fails$e;

var createElement = documentCreateElement$1;

var ie8DomDefine = !DESCRIPTORS$e && !fails$8(function() {
    return Object.defineProperty(createElement("div"), "a", {
        get: function get() {
            return 7;
        }
    }).a !== 7;
});

var NATIVE_BIND$1 = functionBindNative;

var call$a = Function.prototype.call;

var functionCall = NATIVE_BIND$1 ? call$a.bind(call$a) : function() {
    return call$a.apply(call$a, arguments);
};

var global$8 = global$e;

var isCallable$e = isCallable$g;

var aFunction = function aFunction(argument) {
    return isCallable$e(argument) ? argument : void 0;
};

var getBuiltIn$5 = function getBuiltIn$5(namespace, method) {
    return arguments.length < 2 ? aFunction(global$8[namespace]) : global$8[namespace] && global$8[namespace][method];
};

var uncurryThis$h = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$h({}.isPrototypeOf);

var getBuiltIn$4 = getBuiltIn$5;

var isCallable$d = isCallable$g;

var isPrototypeOf$1 = objectIsPrototypeOf;

var USE_SYMBOL_AS_UID = useSymbolAsUid;

var $Object$2 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID ? function(it) {
    return _typeof2(it) == "symbol";
} : function(it) {
    var $Symbol = getBuiltIn$4("Symbol");
    return isCallable$d($Symbol) && isPrototypeOf$1($Symbol.prototype, $Object$2(it));
};

var $String$3 = String;

var tryToString$2 = function tryToString$2(argument) {
    try {
        return $String$3(argument);
    } catch (error) {
        return "Object";
    }
};

var isCallable$c = isCallable$g;

var tryToString$1 = tryToString$2;

var $TypeError$7 = TypeError;

var aCallable$4 = function aCallable$4(argument) {
    if (isCallable$c(argument)) return argument;
    throw new $TypeError$7(tryToString$1(argument) + " is not a function");
};

var aCallable$3 = aCallable$4;

var isNullOrUndefined$1 = isNullOrUndefined$3;

var getMethod$3 = function getMethod$3(V, P) {
    var func = V[P];
    return isNullOrUndefined$1(func) ? void 0 : aCallable$3(func);
};

var call$9 = functionCall;

var isCallable$b = isCallable$g;

var isObject$5 = isObject$8;

var $TypeError$6 = TypeError;

var ordinaryToPrimitive$1 = function ordinaryToPrimitive$1(input, pref) {
    var fn, val;
    if (pref === "string" && isCallable$b(fn = input.toString) && !isObject$5(val = call$9(fn, input))) return val;
    if (isCallable$b(fn = input.valueOf) && !isObject$5(val = call$9(fn, input))) return val;
    if (pref !== "string" && isCallable$b(fn = input.toString) && !isObject$5(val = call$9(fn, input))) return val;
    throw new $TypeError$6("Can't convert object to primitive value");
};

var call$8 = functionCall;

var isObject$4 = isObject$8;

var isSymbol$1 = isSymbol$2;

var getMethod$2 = getMethod$3;

var ordinaryToPrimitive = ordinaryToPrimitive$1;

var wellKnownSymbol$a = wellKnownSymbol$b;

var $TypeError$5 = TypeError;

var TO_PRIMITIVE = wellKnownSymbol$a("toPrimitive");

var toPrimitive$1 = function toPrimitive$1(input, pref) {
    if (!isObject$4(input) || isSymbol$1(input)) return input;
    var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
    var result;
    if (exoticToPrim) {
        if (pref === void 0) pref = "default";
        result = call$8(exoticToPrim, input, pref);
        if (!isObject$4(result) || isSymbol$1(result)) return result;
        throw new $TypeError$5("Can't convert object to primitive value");
    }
    if (pref === void 0) pref = "number";
    return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;

var isSymbol = isSymbol$2;

var toPropertyKey$2 = function toPropertyKey$2(argument) {
    var key = toPrimitive(argument, "string");
    return isSymbol(key) ? key : key + "";
};

var DESCRIPTORS$d = descriptors;

var IE8_DOM_DEFINE$1 = ie8DomDefine;

var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;

var anObject$8 = anObject$9;

var toPropertyKey$1 = toPropertyKey$2;

var $TypeError$4 = TypeError;

var $defineProperty = Object.defineProperty;

var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

var ENUMERABLE = "enumerable";

var CONFIGURABLE$1 = "configurable";

var WRITABLE = "writable";

objectDefineProperty.f = DESCRIPTORS$d ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
    anObject$8(O);
    P = toPropertyKey$1(P);
    anObject$8(Attributes);
    if (typeof O === "function" && P === "prototype" && "value" in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor$1(O, P);
        if (current && current[WRITABLE]) {
            O[P] = Attributes.value;
            Attributes = {
                configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
                enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
                writable: false
            };
        }
    }
    return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty2(O, P, Attributes) {
    anObject$8(O);
    P = toPropertyKey$1(P);
    anObject$8(Attributes);
    if (IE8_DOM_DEFINE$1) try {
        return $defineProperty(O, P, Attributes);
    } catch (error) {}
    if ("get" in Attributes || "set" in Attributes) throw new $TypeError$4("Accessors not supported");
    if ("value" in Attributes) O[P] = Attributes.value;
    return O;
};

var ceil = Math.ceil;

var floor$3 = Math.floor;

var mathTrunc = Math.trunc || function trunc(x) {
    var n2 = +x;
    return (n2 > 0 ? floor$3 : ceil)(n2);
};

var trunc2 = mathTrunc;

var toIntegerOrInfinity$3 = function toIntegerOrInfinity$3(argument) {
    var number = +argument;
    return number !== number || number === 0 ? 0 : trunc2(number);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

var max = Math.max;

var min$1 = Math.min;

var toAbsoluteIndex$1 = function toAbsoluteIndex$1(index2, length) {
    var integer = toIntegerOrInfinity$2(index2);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

var min = Math.min;

var toLength$1 = function toLength$1(argument) {
    var len = toIntegerOrInfinity$1(argument);
    return len > 0 ? min(len, 9007199254740991) : 0;
};

var toLength = toLength$1;

var lengthOfArrayLike$2 = function lengthOfArrayLike$2(obj) {
    return toLength(obj.length);
};

var toIndexedObject$4 = toIndexedObject$5;

var toAbsoluteIndex = toAbsoluteIndex$1;

var lengthOfArrayLike$1 = lengthOfArrayLike$2;

var createMethod$1 = function createMethod$1(IS_INCLUDES) {
    return function($this, el, fromIndex) {
        var O = toIndexedObject$4($this);
        var length = lengthOfArrayLike$1(O);
        if (length === 0) return !IS_INCLUDES && -1;
        var index2 = toAbsoluteIndex(fromIndex, length);
        var value;
        if (IS_INCLUDES && el !== el) while (length > index2) {
            value = O[index2++];
            if (value !== value) return true;
        } else for (;length > index2; index2++) {
            if ((IS_INCLUDES || index2 in O) && O[index2] === el) return IS_INCLUDES || index2 || 0;
        }
        return !IS_INCLUDES && -1;
    };
};

var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
};

var hiddenKeys$4 = {};

var uncurryThis$g = functionUncurryThis;

var hasOwn$9 = hasOwnProperty_1;

var toIndexedObject$3 = toIndexedObject$5;

var indexOf = arrayIncludes.indexOf;

var hiddenKeys$3 = hiddenKeys$4;

var push$4 = uncurryThis$g([].push);

var objectKeysInternal = function objectKeysInternal(object, names) {
    var O = toIndexedObject$3(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !hasOwn$9(hiddenKeys$3, key) && hasOwn$9(O, key) && push$4(result, key);
    while (names.length > i) if (hasOwn$9(O, key = names[i++])) {
        ~indexOf(result, key) || push$4(result, key);
    }
    return result;
};

var enumBugKeys$3 = [ "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf" ];

var internalObjectKeys$1 = objectKeysInternal;

var enumBugKeys$2 = enumBugKeys$3;

var objectKeys$2 = Object.keys || function keys(O) {
    return internalObjectKeys$1(O, enumBugKeys$2);
};

var DESCRIPTORS$c = descriptors;

var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;

var definePropertyModule$4 = objectDefineProperty;

var anObject$7 = anObject$9;

var toIndexedObject$2 = toIndexedObject$5;

var objectKeys$1 = objectKeys$2;

objectDefineProperties.f = DESCRIPTORS$c && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject$7(O);
    var props = toIndexedObject$2(Properties);
    var keys4 = objectKeys$1(Properties);
    var length = keys4.length;
    var index2 = 0;
    var key;
    while (length > index2) definePropertyModule$4.f(O, key = keys4[index2++], props[key]);
    return O;
};

var getBuiltIn$3 = getBuiltIn$5;

var html$1 = getBuiltIn$3("document", "documentElement");

var shared$1 = shared$3;

var uid = uid$2;

var keys2 = shared$1("keys");

var sharedKey$3 = function sharedKey$3(key) {
    return keys2[key] || (keys2[key] = uid(key));
};

var anObject$6 = anObject$9;

var definePropertiesModule = objectDefineProperties;

var enumBugKeys$1 = enumBugKeys$3;

var hiddenKeys$2 = hiddenKeys$4;

var html = html$1;

var documentCreateElement = documentCreateElement$1;

var sharedKey$2 = sharedKey$3;

var GT = ">";

var LT = "<";

var PROTOTYPE = "prototype";

var SCRIPT = "script";

var IE_PROTO$1 = sharedKey$2("IE_PROTO");

var EmptyConstructor = function EmptyConstructor() {};

var scriptTag = function scriptTag(content) {
    return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};

var NullProtoObjectViaActiveX = function NullProtoObjectViaActiveX(activeXDocument2) {
    activeXDocument2.write(scriptTag(""));
    activeXDocument2.close();
    var temp = activeXDocument2.parentWindow.Object;
    activeXDocument2 = null;
    return temp;
};

var NullProtoObjectViaIFrame = function NullProtoObjectViaIFrame() {
    var iframe = documentCreateElement("iframe");
    var JS = "java" + SCRIPT + ":";
    var iframeDocument;
    iframe.style.display = "none";
    html.appendChild(iframe);
    iframe.src = String(JS);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(scriptTag("document.F=Object"));
    iframeDocument.close();
    return iframeDocument.F;
};

var activeXDocument;

var _NullProtoObject = function NullProtoObject() {
    try {
        activeXDocument = new ActiveXObject("htmlfile");
    } catch (error) {}
    _NullProtoObject = typeof document != "undefined" ? document.domain && activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame() : NullProtoObjectViaActiveX(activeXDocument);
    var length = enumBugKeys$1.length;
    while (length--) delete _NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
    return _NullProtoObject();
};

hiddenKeys$2[IE_PROTO$1] = true;

var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject$6(O);
        result = new EmptyConstructor();
        EmptyConstructor[PROTOTYPE] = null;
        result[IE_PROTO$1] = O;
    } else result = _NullProtoObject();
    return Properties === void 0 ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$9 = wellKnownSymbol$b;

var create$2 = objectCreate;

var defineProperty$5 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$9("unscopables");

var ArrayPrototype$1 = Array.prototype;

if (ArrayPrototype$1[UNSCOPABLES] === void 0) {
    defineProperty$5(ArrayPrototype$1, UNSCOPABLES, {
        configurable: true,
        value: create$2(null)
    });
}

var addToUnscopables$1 = function addToUnscopables$1(key) {
    ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var global$7 = global$e;

var isCallable$a = isCallable$g;

var WeakMap$2 = global$7.WeakMap;

var weakMapBasicDetection = isCallable$a(WeakMap$2) && /native code/.test(String(WeakMap$2));

var createPropertyDescriptor$5 = function createPropertyDescriptor$5(bitmap, value) {
    return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
    };
};

var DESCRIPTORS$b = descriptors;

var definePropertyModule$3 = objectDefineProperty;

var createPropertyDescriptor$4 = createPropertyDescriptor$5;

var createNonEnumerableProperty$3 = DESCRIPTORS$b ? function(object, key, value) {
    return definePropertyModule$3.f(object, key, createPropertyDescriptor$4(1, value));
} : function(object, key, value) {
    object[key] = value;
    return object;
};

var NATIVE_WEAK_MAP = weakMapBasicDetection;

var global$6 = global$e;

var isObject$3 = isObject$8;

var createNonEnumerableProperty$2 = createNonEnumerableProperty$3;

var hasOwn$8 = hasOwnProperty_1;

var shared = sharedStoreExports;

var sharedKey$1 = sharedKey$3;

var hiddenKeys$1 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = "Object already initialized";

var TypeError$3 = global$6.TypeError;

var WeakMap$1 = global$6.WeakMap;

var set, get, has;

var enforce = function enforce(it) {
    return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
    return function(it) {
        var state;
        if (!isObject$3(it) || (state = get(it)).type !== TYPE) {
            throw new TypeError$3("Incompatible receiver, " + TYPE + " required");
        }
        return state;
    };
};

if (NATIVE_WEAK_MAP || shared.state) {
    var store$1 = shared.state || (shared.state = new WeakMap$1());
    store$1.get = store$1.get;
    store$1.has = store$1.has;
    store$1.set = store$1.set;
    set = function set(it, kfinddata) {
        if (store$1.has(it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
        kfinddata.facade = it;
        store$1.set(it, kfinddata);
        return kfinddata;
    };
    get = function get(it) {
        return store$1.get(it) || {};
    };
    has = function has(it) {
        return store$1.has(it);
    };
} else {
    var STATE = sharedKey$1("state");
    hiddenKeys$1[STATE] = true;
    set = function set(it, kfinddata) {
        if (hasOwn$8(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
        kfinddata.facade = it;
        createNonEnumerableProperty$2(it, STATE, kfinddata);
        return kfinddata;
    };
    get = function get(it) {
        return hasOwn$8(it, STATE) ? it[STATE] : {};
    };
    has = function has(it) {
        return hasOwn$8(it, STATE);
    };
}

var internalState = {
    set: set,
    get: get,
    has: has,
    enforce: enforce,
    getterFor: getterFor
};

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;

var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

var NASHORN_BUG = getOwnPropertyDescriptor$2 && !$propertyIsEnumerable.call({
    1: 2
}, 1);

objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var DESCRIPTORS$a = descriptors;

var call$7 = functionCall;

var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;

var createPropertyDescriptor$3 = createPropertyDescriptor$5;

var toIndexedObject$1 = toIndexedObject$5;

var toPropertyKey = toPropertyKey$2;

var hasOwn$7 = hasOwnProperty_1;

var IE8_DOM_DEFINE = ie8DomDefine;

var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$1(O);
    P = toPropertyKey(P);
    if (IE8_DOM_DEFINE) try {
        return $getOwnPropertyDescriptor(O, P);
    } catch (error) {}
    if (hasOwn$7(O, P)) return createPropertyDescriptor$3(!call$7(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var makeBuiltInExports = {};

var makeBuiltIn$3 = {
    get exports() {
        return makeBuiltInExports;
    },
    set exports(v) {
        makeBuiltInExports = v;
    }
};

var DESCRIPTORS$9 = descriptors;

var hasOwn$6 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;

var getDescriptor = DESCRIPTORS$9 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$6(FunctionPrototype, "name");

var PROPER = EXISTS && function something() {}.name === "something";

var CONFIGURABLE = EXISTS && (!DESCRIPTORS$9 || DESCRIPTORS$9 && getDescriptor(FunctionPrototype, "name").configurable);

var functionName = {
    EXISTS: EXISTS,
    PROPER: PROPER,
    CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$f = functionUncurryThis;

var isCallable$9 = isCallable$g;

var store = sharedStoreExports;

var functionToString = uncurryThis$f(Function.toString);

if (!isCallable$9(store.inspectSource)) {
    store.inspectSource = function(it) {
        return functionToString(it);
    };
}

var inspectSource$2 = store.inspectSource;

var uncurryThis$e = functionUncurryThis;

var fails$7 = fails$e;

var isCallable$8 = isCallable$g;

var hasOwn$5 = hasOwnProperty_1;

var DESCRIPTORS$8 = descriptors;

var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;

var inspectSource$1 = inspectSource$2;

var InternalStateModule$4 = internalState;

var enforceInternalState = InternalStateModule$4.enforce;

var getInternalState$2 = InternalStateModule$4.get;

var $String$2 = String;

var defineProperty$4 = Object.defineProperty;

var stringSlice$3 = uncurryThis$e("".slice);

var replace$3 = uncurryThis$e("".replace);

var join$3 = uncurryThis$e([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS$8 && !fails$7(function() {
    return defineProperty$4(function() {}, "length", {
        value: 8
    }).length !== 8;
});

var TEMPLATE = String(String).split("String");

var makeBuiltIn$2 = makeBuiltIn$3.exports = function(value, name, options) {
    if (stringSlice$3($String$2(name), 0, 7) === "Symbol(") {
        name = "[" + replace$3($String$2(name), /^Symbol\(([^)]*)\).*$/, "$1") + "]";
    }
    if (options && options.getter) name = "get " + name;
    if (options && options.setter) name = "set " + name;
    if (!hasOwn$5(value, "name") || CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name) {
        if (DESCRIPTORS$8) defineProperty$4(value, "name", {
            value: name,
            configurable: true
        }); else value.name = name;
    }
    if (CONFIGURABLE_LENGTH && options && hasOwn$5(options, "arity") && value.length !== options.arity) {
        defineProperty$4(value, "length", {
            value: options.arity
        });
    }
    try {
        if (options && hasOwn$5(options, "constructor") && options.constructor) {
            if (DESCRIPTORS$8) defineProperty$4(value, "prototype", {
                writable: false
            });
        } else if (value.prototype) value.prototype = void 0;
    } catch (error) {}
    var state = enforceInternalState(value);
    if (!hasOwn$5(state, "source")) {
        state.source = join$3(TEMPLATE, typeof name == "string" ? name : "");
    }
    return value;
};

Function.prototype.toString = makeBuiltIn$2(function toString() {
    return isCallable$8(this) && getInternalState$2(this).source || inspectSource$1(this);
}, "toString");

var isCallable$7 = isCallable$g;

var definePropertyModule$2 = objectDefineProperty;

var makeBuiltIn$1 = makeBuiltInExports;

var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$8 = function defineBuiltIn$8(O, key, value, options) {
    if (!options) options = {};
    var simple = options.enumerable;
    var name = options.name !== void 0 ? options.name : key;
    if (isCallable$7(value)) makeBuiltIn$1(value, name, options);
    if (options.global) {
        if (simple) O[key] = value; else defineGlobalProperty$1(key, value);
    } else {
        try {
            if (!options.unsafe) delete O[key]; else if (O[key]) simple = true;
        } catch (error) {}
        if (simple) O[key] = value; else definePropertyModule$2.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
        });
    }
    return O;
};

var objectGetOwnPropertyNames = {};

var internalObjectKeys = objectKeysInternal;

var enumBugKeys = enumBugKeys$3;

var hiddenKeys = enumBugKeys.concat("length", "prototype");

objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$2 = getBuiltIn$5;

var uncurryThis$d = functionUncurryThis;

var getOwnPropertyNamesModule = objectGetOwnPropertyNames;

var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;

var anObject$5 = anObject$9;

var concat$1 = uncurryThis$d([].concat);

var ownKeys$1 = getBuiltIn$2("Reflect", "ownKeys") || function ownKeys(it) {
    var keys4 = getOwnPropertyNamesModule.f(anObject$5(it));
    var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
    return getOwnPropertySymbols ? concat$1(keys4, getOwnPropertySymbols(it)) : keys4;
};

var hasOwn$4 = hasOwnProperty_1;

var ownKeys2 = ownKeys$1;

var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;

var definePropertyModule$1 = objectDefineProperty;

var copyConstructorProperties$1 = function copyConstructorProperties$1(target, source, exceptions) {
    var keys4 = ownKeys2(source);
    var defineProperty4 = definePropertyModule$1.f;
    var getOwnPropertyDescriptor3 = getOwnPropertyDescriptorModule.f;
    for (var i = 0; i < keys4.length; i++) {
        var key = keys4[i];
        if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
            defineProperty4(target, key, getOwnPropertyDescriptor3(source, key));
        }
    }
};

var fails$6 = fails$e;

var isCallable$6 = isCallable$g;

var replacement = /#|\.prototype\./;

var isForced$1 = function isForced$1(feature, detection) {
    var value = data[normalize(feature)];
    return value === POLYFILL ? true : value === NATIVE ? false : isCallable$6(detection) ? fails$6(detection) : !!detection;
};

var normalize = isForced$1.normalize = function(string) {
    return String(string).replace(replacement, ".").toLowerCase();
};

var data = isForced$1.data = {};

var NATIVE = isForced$1.NATIVE = "N";

var POLYFILL = isForced$1.POLYFILL = "P";

var isForced_1 = isForced$1;

var global$5 = global$e;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;

var createNonEnumerableProperty$1 = createNonEnumerableProperty$3;

var defineBuiltIn$7 = defineBuiltIn$8;

var defineGlobalProperty = defineGlobalProperty$3;

var copyConstructorProperties = copyConstructorProperties$1;

var isForced = isForced_1;

var _export = function _export(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
        target = global$5;
    } else if (STATIC) {
        target = global$5[TARGET] || defineGlobalProperty(TARGET, {});
    } else {
        target = global$5[TARGET] && global$5[TARGET].prototype;
    }
    if (target) for (key in source) {
        sourceProperty = source[key];
        if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor$1(target, key);
            targetProperty = descriptor && descriptor.value;
        } else targetProperty = target[key];
        FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
        if (!FORCED && targetProperty !== void 0) {
            if (_typeof2(sourceProperty) == _typeof2(targetProperty)) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
        }
        if (options.sham || targetProperty && targetProperty.sham) {
            createNonEnumerableProperty$1(sourceProperty, "sham", true);
        }
        defineBuiltIn$7(target, key, sourceProperty, options);
    }
};

var fails$5 = fails$e;

var correctPrototypeGetter = !fails$5(function() {
    function F() {}
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$3 = hasOwnProperty_1;

var isCallable$5 = isCallable$g;

var toObject$2 = toObject$4;

var sharedKey = sharedKey$3;

var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey("IE_PROTO");

var $Object$1 = Object;

var ObjectPrototype = $Object$1.prototype;

var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function(O) {
    var object = toObject$2(O);
    if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$5(constructor) && object instanceof constructor) {
        return constructor.prototype;
    }
    return object instanceof $Object$1 ? ObjectPrototype : null;
};

var fails$4 = fails$e;

var isCallable$4 = isCallable$g;

var isObject$2 = isObject$8;

var getPrototypeOf$1 = objectGetPrototypeOf;

var defineBuiltIn$6 = defineBuiltIn$8;

var wellKnownSymbol$8 = wellKnownSymbol$b;

var ITERATOR$5 = wellKnownSymbol$8("iterator");

var BUGGY_SAFARI_ITERATORS$1 = false;

var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
    arrayIterator = [].keys();
    if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true; else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
    }
}

var NEW_ITERATOR_PROTOTYPE = !isObject$2(IteratorPrototype$2) || fails$4(function() {
    var test2 = {};
    return IteratorPrototype$2[ITERATOR$5].call(test2) !== test2;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

if (!isCallable$4(IteratorPrototype$2[ITERATOR$5])) {
    defineBuiltIn$6(IteratorPrototype$2, ITERATOR$5, function() {
        return this;
    });
}

var iteratorsCore = {
    IteratorPrototype: IteratorPrototype$2,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$3 = objectDefineProperty.f;

var hasOwn$2 = hasOwnProperty_1;

var wellKnownSymbol$7 = wellKnownSymbol$b;

var TO_STRING_TAG$2 = wellKnownSymbol$7("toStringTag");

var setToStringTag$4 = function setToStringTag$4(target, TAG, STATIC) {
    if (target && !STATIC) target = target.prototype;
    if (target && !hasOwn$2(target, TO_STRING_TAG$2)) {
        defineProperty$3(target, TO_STRING_TAG$2, {
            configurable: true,
            value: TAG
        });
    }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var create$1 = objectCreate;

var createPropertyDescriptor$2 = createPropertyDescriptor$5;

var setToStringTag$3 = setToStringTag$4;

var Iterators$4 = iterators;

var returnThis$1 = function returnThis$1() {
    return this;
};

var iteratorCreateConstructor = function iteratorCreateConstructor(IteratorConstructor, NAME, next3, ENUMERABLE_NEXT) {
    var TO_STRING_TAG2 = NAME + " Iterator";
    IteratorConstructor.prototype = create$1(IteratorPrototype$1, {
        next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next3)
    });
    setToStringTag$3(IteratorConstructor, TO_STRING_TAG2, false);
    Iterators$4[TO_STRING_TAG2] = returnThis$1;
    return IteratorConstructor;
};

var uncurryThis$c = functionUncurryThis;

var aCallable$2 = aCallable$4;

var functionUncurryThisAccessor = function functionUncurryThisAccessor(object, key, method) {
    try {
        return uncurryThis$c(aCallable$2(Object.getOwnPropertyDescriptor(object, key)[method]));
    } catch (error) {}
};

var isObject$1 = isObject$8;

var isPossiblePrototype$1 = function isPossiblePrototype$1(argument) {
    return isObject$1(argument) || argument === null;
};

var isPossiblePrototype = isPossiblePrototype$1;

var $String$1 = String;

var $TypeError$3 = TypeError;

var aPossiblePrototype$1 = function aPossiblePrototype$1(argument) {
    if (isPossiblePrototype(argument)) return argument;
    throw new $TypeError$3("Can't set " + $String$1(argument) + " as a prototype");
};

var uncurryThisAccessor = functionUncurryThisAccessor;

var anObject$4 = anObject$9;

var aPossiblePrototype = aPossiblePrototype$1;

var objectSetPrototypeOf = Object.setPrototypeOf || ("__proto__" in {} ? function() {
    var CORRECT_SETTER = false;
    var test2 = {};
    var setter;
    try {
        setter = uncurryThisAccessor(Object.prototype, "__proto__", "set");
        setter(test2, []);
        CORRECT_SETTER = test2 instanceof Array;
    } catch (error) {}
    return function setPrototypeOf2(O, proto) {
        anObject$4(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) setter(O, proto); else O.__proto__ = proto;
        return O;
    };
}() : void 0);

var $$4 = _export;

var call$6 = functionCall;

var FunctionName = functionName;

var isCallable$3 = isCallable$g;

var createIteratorConstructor$1 = iteratorCreateConstructor;

var getPrototypeOf = objectGetPrototypeOf;

var setPrototypeOf = objectSetPrototypeOf;

var setToStringTag$2 = setToStringTag$4;

var createNonEnumerableProperty = createNonEnumerableProperty$3;

var defineBuiltIn$5 = defineBuiltIn$8;

var wellKnownSymbol$6 = wellKnownSymbol$b;

var Iterators$3 = iterators;

var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;

var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;

var IteratorPrototype = IteratorsCore.IteratorPrototype;

var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;

var ITERATOR$4 = wellKnownSymbol$6("iterator");

var KEYS = "keys";

var VALUES = "values";

var ENTRIES = "entries";

var returnThis = function returnThis() {
    return this;
};

var iteratorDefine = function iteratorDefine(Iterable, NAME, IteratorConstructor, next3, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor$1(IteratorConstructor, NAME, next3);
    var getIterationMethod = function getIterationMethod(KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator;
        if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];
        switch (KIND) {
          case KEYS:
            return function keys4() {
                return new IteratorConstructor(this, KIND);
            };

          case VALUES:
            return function values3() {
                return new IteratorConstructor(this, KIND);
            };

          case ENTRIES:
            return function entries2() {
                return new IteratorConstructor(this, KIND);
            };
        }
        return function() {
            return new IteratorConstructor(this);
        };
    };
    var TO_STRING_TAG2 = NAME + " Iterator";
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$4] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME === "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;
    if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
            if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                if (setPrototypeOf) {
                    setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                } else if (!isCallable$3(CurrentIteratorPrototype[ITERATOR$4])) {
                    defineBuiltIn$5(CurrentIteratorPrototype, ITERATOR$4, returnThis);
                }
            }
            setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG2, true);
        }
    }
    if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (CONFIGURABLE_FUNCTION_NAME) {
            createNonEnumerableProperty(IterablePrototype, "name", VALUES);
        } else {
            INCORRECT_VALUES_NAME = true;
            defaultIterator = function values3() {
                return call$6(nativeIterator, this);
            };
        }
    }
    if (DEFAULT) {
        methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) for (KEY in methods) {
            if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                defineBuiltIn$5(IterablePrototype, KEY, methods[KEY]);
            }
        } else $$4({
            target: NAME,
            proto: true,
            forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
        }, methods);
    }
    if (IterablePrototype[ITERATOR$4] !== defaultIterator) {
        defineBuiltIn$5(IterablePrototype, ITERATOR$4, defaultIterator, {
            name: DEFAULT
        });
    }
    Iterators$3[NAME] = defaultIterator;
    return methods;
};

var createIterResultObject$3 = function createIterResultObject$3(value, done) {
    return {
        value: value,
        done: done
    };
};

var toIndexedObject = toIndexedObject$5;

var addToUnscopables = addToUnscopables$1;

var Iterators$2 = iterators;

var InternalStateModule$3 = internalState;

var defineProperty$2 = objectDefineProperty.f;

var defineIterator$1 = iteratorDefine;

var createIterResultObject$2 = createIterResultObject$3;

var DESCRIPTORS$7 = descriptors;

var ARRAY_ITERATOR = "Array Iterator";

var setInternalState$3 = InternalStateModule$3.set;

var getInternalState$1 = InternalStateModule$3.getterFor(ARRAY_ITERATOR);

defineIterator$1(Array, "Array", function(iterated, kind) {
    setInternalState$3(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated),
        // target
        index: 0,
        // next index
        kind: kind
    });
}, function() {
    var state = getInternalState$1(this);
    var target = state.target;
    var index2 = state.index++;
    if (!target || index2 >= target.length) {
        state.target = void 0;
        return createIterResultObject$2(void 0, true);
    }
    switch (state.kind) {
      case "keys":
        return createIterResultObject$2(index2, false);

      case "values":
        return createIterResultObject$2(target[index2], false);
    }
    return createIterResultObject$2([ index2, target[index2] ], false);
}, "values");

var values = Iterators$2.Arguments = Iterators$2.Array;

addToUnscopables("keys");

addToUnscopables("values");

addToUnscopables("entries");

if (DESCRIPTORS$7 && values.name !== "values") try {
    defineProperty$2(values, "name", {
        value: "values"
    });
} catch (error) {}

var global$4 = global$e;

var DESCRIPTORS$6 = descriptors;

var getOwnPropertyDescriptor2 = Object.getOwnPropertyDescriptor;

var safeGetBuiltIn$1 = function safeGetBuiltIn$1(name) {
    if (!DESCRIPTORS$6) return global$4[name];
    var descriptor = getOwnPropertyDescriptor2(global$4, name);
    return descriptor && descriptor.value;
};

var fails$3 = fails$e;

var wellKnownSymbol$5 = wellKnownSymbol$b;

var DESCRIPTORS$5 = descriptors;

var IS_PURE = isPure;

var ITERATOR$3 = wellKnownSymbol$5("iterator");

var urlConstructorDetection = !fails$3(function() {
    var url2 = new URL("b?a=1&b=2&c=3", "http://a");
    var params2 = url2.searchParams;
    var params22 = new URLSearchParams("a=1&a=2&b=3");
    var result = "";
    url2.pathname = "c%20d";
    params2.forEach(function(value, key) {
        params2["delete"]("b");
        result += key + value;
    });
    params22["delete"]("a", 2);
    params22["delete"]("b", void 0);
    return IS_PURE && (!url2.toJSON || !params22.has("a", 1) || params22.has("a", 2) || !params22.has("a", void 0) || params22.has("b")) || !params2.size && (IS_PURE || !DESCRIPTORS$5) || !params2.sort || url2.href !== "http://a/c%20d?a=1&c=3" || params2.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !params2[ITERATOR$3] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("http://тест").host !== "xn--e1aybc" || new URL("http://a#б").hash !== "#%D0%B1" || result !== "a1c3" || new URL("http://x", void 0).host !== "x";
});

var makeBuiltIn = makeBuiltInExports;

var defineProperty$1 = objectDefineProperty;

var defineBuiltInAccessor$3 = function defineBuiltInAccessor$3(target, name, descriptor) {
    if (descriptor.get) makeBuiltIn(descriptor.get, name, {
        getter: true
    });
    if (descriptor.set) makeBuiltIn(descriptor.set, name, {
        setter: true
    });
    return defineProperty$1.f(target, name, descriptor);
};

var defineBuiltIn$4 = defineBuiltIn$8;

var defineBuiltIns$1 = function defineBuiltIns$1(target, src, options) {
    for (var key in src) defineBuiltIn$4(target, key, src[key], options);
    return target;
};

var isPrototypeOf = objectIsPrototypeOf;

var $TypeError$2 = TypeError;

var anInstance$2 = function anInstance$2(it, Prototype) {
    if (isPrototypeOf(Prototype, it)) return it;
    throw new $TypeError$2("Incorrect invocation");
};

var classofRaw$1 = classofRaw$2;

var uncurryThis$b = functionUncurryThis;

var functionUncurryThisClause = function functionUncurryThisClause(fn) {
    if (classofRaw$1(fn) === "Function") return uncurryThis$b(fn);
};

var uncurryThis$a = functionUncurryThisClause;

var aCallable$1 = aCallable$4;

var NATIVE_BIND = functionBindNative;

var bind$3 = uncurryThis$a(uncurryThis$a.bind);

var functionBindContext = function functionBindContext(fn, that) {
    aCallable$1(fn);
    return that === void 0 ? fn : NATIVE_BIND ? bind$3(fn, that) : function() {
        return fn.apply(that, arguments);
    };
};

var wellKnownSymbol$4 = wellKnownSymbol$b;

var TO_STRING_TAG$1 = wellKnownSymbol$4("toStringTag");

var test = {};

test[TO_STRING_TAG$1] = "z";

var toStringTagSupport = String(test) === "[object z]";

var TO_STRING_TAG_SUPPORT = toStringTagSupport;

var isCallable$2 = isCallable$g;

var classofRaw = classofRaw$2;

var wellKnownSymbol$3 = wellKnownSymbol$b;

var TO_STRING_TAG = wellKnownSymbol$3("toStringTag");

var $Object = Object;

var CORRECT_ARGUMENTS = classofRaw(function() {
    return arguments;
}()) === "Arguments";

var tryGet = function tryGet(it, key) {
    try {
        return it[key];
    } catch (error) {}
};

var classof$4 = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
    var O, tag, result;
    return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) === "Object" && isCallable$2(O.callee) ? "Arguments" : result;
};

var classof$3 = classof$4;

var $String = String;

var toString$5 = function toString$5(argument) {
    if (classof$3(argument) === "Symbol") throw new TypeError("Cannot convert a Symbol value to a string");
    return $String(argument);
};

var classof$2 = classof$4;

var getMethod$1 = getMethod$3;

var isNullOrUndefined = isNullOrUndefined$3;

var Iterators$1 = iterators;

var wellKnownSymbol$2 = wellKnownSymbol$b;

var ITERATOR$2 = wellKnownSymbol$2("iterator");

var getIteratorMethod$3 = function getIteratorMethod$3(it) {
    if (!isNullOrUndefined(it)) return getMethod$1(it, ITERATOR$2) || getMethod$1(it, "@@iterator") || Iterators$1[classof$2(it)];
};

var call$5 = functionCall;

var aCallable = aCallable$4;

var anObject$3 = anObject$9;

var tryToString = tryToString$2;

var getIteratorMethod$2 = getIteratorMethod$3;

var $TypeError$1 = TypeError;

var getIterator$2 = function getIterator$2(argument, usingIterator) {
    var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
    if (aCallable(iteratorMethod)) return anObject$3(call$5(iteratorMethod, argument));
    throw new $TypeError$1(tryToString(argument) + " is not iterable");
};

var $TypeError = TypeError;

var validateArgumentsLength$5 = function validateArgumentsLength$5(passed, required) {
    if (passed < required) throw new $TypeError("Not enough arguments");
    return passed;
};

var uncurryThis$9 = functionUncurryThis;

var arraySlice$2 = uncurryThis$9([].slice);

var arraySlice$1 = arraySlice$2;

var floor$2 = Math.floor;

var sort = function sort(array, comparefn) {
    var length = array.length;
    if (length < 8) {
        var i = 1;
        var element, j;
        while (i < length) {
            j = i;
            element = array[i];
            while (j && comparefn(array[j - 1], element) > 0) {
                array[j] = array[--j];
            }
            if (j !== i++) array[j] = element;
        }
    } else {
        var middle = floor$2(length / 2);
        var left = sort(arraySlice$1(array, 0, middle), comparefn);
        var right = sort(arraySlice$1(array, middle), comparefn);
        var llength = left.length;
        var rlength = right.length;
        var lindex = 0;
        var rindex = 0;
        while (lindex < llength || rindex < rlength) {
            array[lindex + rindex] = lindex < llength && rindex < rlength ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++] : lindex < llength ? left[lindex++] : right[rindex++];
        }
    }
    return array;
};

var arraySort$1 = sort;

var $$3 = _export;

var global$3 = global$e;

var safeGetBuiltIn = safeGetBuiltIn$1;

var call$4 = functionCall;

var uncurryThis$8 = functionUncurryThis;

var DESCRIPTORS$4 = descriptors;

var USE_NATIVE_URL$2 = urlConstructorDetection;

var defineBuiltIn$3 = defineBuiltIn$8;

var defineBuiltInAccessor$2 = defineBuiltInAccessor$3;

var defineBuiltIns = defineBuiltIns$1;

var setToStringTag$1 = setToStringTag$4;

var createIteratorConstructor = iteratorCreateConstructor;

var InternalStateModule$2 = internalState;

var anInstance$1 = anInstance$2;

var isCallable$1 = isCallable$g;

var hasOwn$1 = hasOwnProperty_1;

var bind$2 = functionBindContext;

var classof$1 = classof$4;

var anObject$2 = anObject$9;

var isObject = isObject$8;

var $toString$1 = toString$5;

var create2 = objectCreate;

var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var getIterator$1 = getIterator$2;

var getIteratorMethod$1 = getIteratorMethod$3;

var createIterResultObject$1 = createIterResultObject$3;

var validateArgumentsLength$4 = validateArgumentsLength$5;

var wellKnownSymbol$1 = wellKnownSymbol$b;

var arraySort = arraySort$1;

var ITERATOR$1 = wellKnownSymbol$1("iterator");

var URL_SEARCH_PARAMS = "URLSearchParams";

var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + "Iterator";

var setInternalState$2 = InternalStateModule$2.set;

var getInternalParamsState = InternalStateModule$2.getterFor(URL_SEARCH_PARAMS);

var getInternalIteratorState = InternalStateModule$2.getterFor(URL_SEARCH_PARAMS_ITERATOR);

var nativeFetch = safeGetBuiltIn("fetch");

var NativeRequest = safeGetBuiltIn("Request");

var Headers = safeGetBuiltIn("Headers");

var RequestPrototype = NativeRequest && NativeRequest.prototype;

var HeadersPrototype = Headers && Headers.prototype;

var RegExp$1 = global$3.RegExp;

var TypeError$2 = global$3.TypeError;

var decodeURIComponent$1 = global$3.decodeURIComponent;

var encodeURIComponent$1 = global$3.encodeURIComponent;

var charAt$3 = uncurryThis$8("".charAt);

var join$2 = uncurryThis$8([].join);

var push$3 = uncurryThis$8([].push);

var replace$2 = uncurryThis$8("".replace);

var shift$1 = uncurryThis$8([].shift);

var splice = uncurryThis$8([].splice);

var split$2 = uncurryThis$8("".split);

var stringSlice$2 = uncurryThis$8("".slice);

var plus = /\+/g;

var sequences = Array(4);

var percentSequence = function percentSequence(bytes) {
    return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1("((?:%[\\da-f]{2}){" + bytes + "})", "gi"));
};

var percentDecode = function percentDecode(sequence) {
    try {
        return decodeURIComponent$1(sequence);
    } catch (error) {
        return sequence;
    }
};

var deserialize = function deserialize(it) {
    var result = replace$2(it, plus, " ");
    var bytes = 4;
    try {
        return decodeURIComponent$1(result);
    } catch (error) {
        while (bytes) {
            result = replace$2(result, percentSequence(bytes--), percentDecode);
        }
        return result;
    }
};

var find = /[!'()~]|%20/g;

var replacements = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+"
};

var replacer = function replacer(match2) {
    return replacements[match2];
};

var _serialize = function serialize(it) {
    return replace$2(encodeURIComponent$1(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params2, kind) {
    setInternalState$2(this, {
        type: URL_SEARCH_PARAMS_ITERATOR,
        target: getInternalParamsState(params2).entries,
        index: 0,
        kind: kind
    });
}, URL_SEARCH_PARAMS, function next() {
    var state = getInternalIteratorState(this);
    var target = state.target;
    var index2 = state.index++;
    if (!target || index2 >= target.length) {
        state.target = void 0;
        return createIterResultObject$1(void 0, true);
    }
    var entry = target[index2];
    switch (state.kind) {
      case "keys":
        return createIterResultObject$1(entry.key, false);

      case "values":
        return createIterResultObject$1(entry.value, false);
    }
    return createIterResultObject$1([ entry.key, entry.value ], false);
}, true);

var URLSearchParamsState = function URLSearchParamsState(init) {
    this.entries = [];
    this.url = null;
    if (init !== void 0) {
        if (isObject(init)) this.parseObject(init); else this.parseQuery(typeof init == "string" ? charAt$3(init, 0) === "?" ? stringSlice$2(init, 1) : init : $toString$1(init));
    }
};

URLSearchParamsState.prototype = {
    type: URL_SEARCH_PARAMS,
    bindURL: function bindURL(url2) {
        this.url = url2;
        this.update();
    },
    parseObject: function parseObject(object) {
        var entries2 = this.entries;
        var iteratorMethod = getIteratorMethod$1(object);
        var iterator, next3, step, entryIterator, entryNext, first, second;
        if (iteratorMethod) {
            iterator = getIterator$1(object, iteratorMethod);
            next3 = iterator.next;
            while (!(step = call$4(next3, iterator)).done) {
                entryIterator = getIterator$1(anObject$2(step.value));
                entryNext = entryIterator.next;
                if ((first = call$4(entryNext, entryIterator)).done || (second = call$4(entryNext, entryIterator)).done || !call$4(entryNext, entryIterator).done) throw new TypeError$2("Expected sequence with length 2");
                push$3(entries2, {
                    key: $toString$1(first.value),
                    value: $toString$1(second.value)
                });
            }
        } else for (var key in object) if (hasOwn$1(object, key)) {
            push$3(entries2, {
                key: key,
                value: $toString$1(object[key])
            });
        }
    },
    parseQuery: function parseQuery(query) {
        if (query) {
            var entries2 = this.entries;
            var attributes = split$2(query, "&");
            var index2 = 0;
            var attribute, entry;
            while (index2 < attributes.length) {
                attribute = attributes[index2++];
                if (attribute.length) {
                    entry = split$2(attribute, "=");
                    push$3(entries2, {
                        key: deserialize(shift$1(entry)),
                        value: deserialize(join$2(entry, "="))
                    });
                }
            }
        }
    },
    serialize: function serialize() {
        var entries2 = this.entries;
        var result = [];
        var index2 = 0;
        var entry;
        while (index2 < entries2.length) {
            entry = entries2[index2++];
            push$3(result, _serialize(entry.key) + "=" + _serialize(entry.value));
        }
        return join$2(result, "&");
    },
    update: function update() {
        this.entries.length = 0;
        this.parseQuery(this.url.query);
    },
    updateURL: function updateURL() {
        if (this.url) this.url.update();
    }
};

var URLSearchParamsConstructor = function URLSearchParams2() {
    anInstance$1(this, URLSearchParamsPrototype$3);
    var init = arguments.length > 0 ? arguments[0] : void 0;
    var state = setInternalState$2(this, new URLSearchParamsState(init));
    if (!DESCRIPTORS$4) this.size = state.entries.length;
};

var URLSearchParamsPrototype$3 = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype$3, {
    // `URLSearchParams.prototype.append` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-append
    append: function append(name, value) {
        var state = getInternalParamsState(this);
        validateArgumentsLength$4(arguments.length, 2);
        push$3(state.entries, {
            key: $toString$1(name),
            value: $toString$1(value)
        });
        if (!DESCRIPTORS$4) this.length++;
        state.updateURL();
    },
    // `URLSearchParams.prototype.delete` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
    delete: function _delete(name) {
        var state = getInternalParamsState(this);
        var length = validateArgumentsLength$4(arguments.length, 1);
        var entries2 = state.entries;
        var key = $toString$1(name);
        var $value = length < 2 ? void 0 : arguments[1];
        var value = $value === void 0 ? $value : $toString$1($value);
        var index2 = 0;
        while (index2 < entries2.length) {
            var entry = entries2[index2];
            if (entry.key === key && (value === void 0 || entry.value === value)) {
                splice(entries2, index2, 1);
                if (value !== void 0) break;
            } else index2++;
        }
        if (!DESCRIPTORS$4) this.size = entries2.length;
        state.updateURL();
    },
    // `URLSearchParams.prototype.get` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-get
    get: function get2(name) {
        var entries2 = getInternalParamsState(this).entries;
        validateArgumentsLength$4(arguments.length, 1);
        var key = $toString$1(name);
        var index2 = 0;
        for (;index2 < entries2.length; index2++) {
            if (entries2[index2].key === key) return entries2[index2].value;
        }
        return null;
    },
    // `URLSearchParams.prototype.getAll` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
    getAll: function getAll(name) {
        var entries2 = getInternalParamsState(this).entries;
        validateArgumentsLength$4(arguments.length, 1);
        var key = $toString$1(name);
        var result = [];
        var index2 = 0;
        for (;index2 < entries2.length; index2++) {
            if (entries2[index2].key === key) push$3(result, entries2[index2].value);
        }
        return result;
    },
    // `URLSearchParams.prototype.has` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-has
    has: function has2(name) {
        var entries2 = getInternalParamsState(this).entries;
        var length = validateArgumentsLength$4(arguments.length, 1);
        var key = $toString$1(name);
        var $value = length < 2 ? void 0 : arguments[1];
        var value = $value === void 0 ? $value : $toString$1($value);
        var index2 = 0;
        while (index2 < entries2.length) {
            var entry = entries2[index2++];
            if (entry.key === key && (value === void 0 || entry.value === value)) return true;
        }
        return false;
    },
    // `URLSearchParams.prototype.set` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-set
    set: function set2(name, value) {
        var state = getInternalParamsState(this);
        validateArgumentsLength$4(arguments.length, 1);
        var entries2 = state.entries;
        var found = false;
        var key = $toString$1(name);
        var val = $toString$1(value);
        var index2 = 0;
        var entry;
        for (;index2 < entries2.length; index2++) {
            entry = entries2[index2];
            if (entry.key === key) {
                if (found) splice(entries2, index2--, 1); else {
                    found = true;
                    entry.value = val;
                }
            }
        }
        if (!found) push$3(entries2, {
            key: key,
            value: val
        });
        if (!DESCRIPTORS$4) this.size = entries2.length;
        state.updateURL();
    },
    // `URLSearchParams.prototype.sort` method
    // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
    sort: function sort2() {
        var state = getInternalParamsState(this);
        arraySort(state.entries, function(a, b) {
            return a.key > b.key ? 1 : -1;
        });
        state.updateURL();
    },
    // `URLSearchParams.prototype.forEach` method
    forEach: function forEach2(callback) {
        var entries2 = getInternalParamsState(this).entries;
        var boundFunction = bind$2(callback, arguments.length > 1 ? arguments[1] : void 0);
        var index2 = 0;
        var entry;
        while (index2 < entries2.length) {
            entry = entries2[index2++];
            boundFunction(entry.value, entry.key, this);
        }
    },
    // `URLSearchParams.prototype.keys` method
    keys: function keys3() {
        return new URLSearchParamsIterator(this, "keys");
    },
    // `URLSearchParams.prototype.values` method
    values: function values2() {
        return new URLSearchParamsIterator(this, "values");
    },
    // `URLSearchParams.prototype.entries` method
    entries: function entries() {
        return new URLSearchParamsIterator(this, "entries");
    }
}, {
    enumerable: true
});

defineBuiltIn$3(URLSearchParamsPrototype$3, ITERATOR$1, URLSearchParamsPrototype$3.entries, {
    name: "entries"
});

defineBuiltIn$3(URLSearchParamsPrototype$3, "toString", function toString2() {
    return getInternalParamsState(this).serialize();
}, {
    enumerable: true
});

if (DESCRIPTORS$4) defineBuiltInAccessor$2(URLSearchParamsPrototype$3, "size", {
    get: function size2() {
        return getInternalParamsState(this).entries.length;
    },
    configurable: true,
    enumerable: true
});

setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$3({
    global: true,
    constructor: true,
    forced: !USE_NATIVE_URL$2
}, {
    URLSearchParams: URLSearchParamsConstructor
});

if (!USE_NATIVE_URL$2 && isCallable$1(Headers)) {
    var headersHas = uncurryThis$8(HeadersPrototype.has);
    var headersSet = uncurryThis$8(HeadersPrototype.set);
    var wrapRequestOptions = function wrapRequestOptions(init) {
        if (isObject(init)) {
            var body = init.body;
            var headers;
            if (classof$1(body) === URL_SEARCH_PARAMS) {
                headers = init.headers ? new Headers(init.headers) : new Headers();
                if (!headersHas(headers, "content-type")) {
                    headersSet(headers, "content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                }
                return create2(init, {
                    body: createPropertyDescriptor$1(0, $toString$1(body)),
                    headers: createPropertyDescriptor$1(0, headers)
                });
            }
        }
        return init;
    };
    if (isCallable$1(nativeFetch)) {
        $$3({
            global: true,
            enumerable: true,
            dontCallGetSet: true,
            forced: true
        }, {
            fetch: function fetch(input) {
                return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
            }
        });
    }
    if (isCallable$1(NativeRequest)) {
        var RequestConstructor = function Request2(input) {
            anInstance$1(this, RequestPrototype);
            return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
        };
        RequestPrototype.constructor = RequestConstructor;
        RequestConstructor.prototype = RequestPrototype;
        $$3({
            global: true,
            constructor: true,
            dontCallGetSet: true,
            forced: true
        }, {
            Request: RequestConstructor
        });
    }
}

var web_urlSearchParams_constructor = {
    URLSearchParams: URLSearchParamsConstructor,
    getState: getInternalParamsState
};

var defineBuiltIn$2 = defineBuiltIn$8;

var uncurryThis$7 = functionUncurryThis;

var toString$4 = toString$5;

var validateArgumentsLength$3 = validateArgumentsLength$5;

var $URLSearchParams$1 = URLSearchParams;

var URLSearchParamsPrototype$2 = $URLSearchParams$1.prototype;

var append2 = uncurryThis$7(URLSearchParamsPrototype$2.append);

var $delete = uncurryThis$7(URLSearchParamsPrototype$2["delete"]);

var forEach$1 = uncurryThis$7(URLSearchParamsPrototype$2.forEach);

var push$2 = uncurryThis$7([].push);

var params$1 = new $URLSearchParams$1("a=1&a=2&b=3");

params$1["delete"]("a", 1);

params$1["delete"]("b", void 0);

if (params$1 + "" !== "a=2") {
    defineBuiltIn$2(URLSearchParamsPrototype$2, "delete", function(name) {
        var length = arguments.length;
        var $value = length < 2 ? void 0 : arguments[1];
        if (length && $value === void 0) return $delete(this, name);
        var entries2 = [];
        forEach$1(this, function(v, k) {
            push$2(entries2, {
                key: k,
                value: v
            });
        });
        validateArgumentsLength$3(length, 1);
        var key = toString$4(name);
        var value = toString$4($value);
        var index2 = 0;
        var dindex = 0;
        var found = false;
        var entriesLength = entries2.length;
        var entry;
        while (index2 < entriesLength) {
            entry = entries2[index2++];
            if (found || entry.key === key) {
                found = true;
                $delete(this, entry.key);
            } else dindex++;
        }
        while (dindex < entriesLength) {
            entry = entries2[dindex++];
            if (!(entry.key === key && entry.value === value)) append2(this, entry.key, entry.value);
        }
    }, {
        enumerable: true,
        unsafe: true
    });
}

var defineBuiltIn$1 = defineBuiltIn$8;

var uncurryThis$6 = functionUncurryThis;

var toString$3 = toString$5;

var validateArgumentsLength$2 = validateArgumentsLength$5;

var $URLSearchParams = URLSearchParams;

var URLSearchParamsPrototype$1 = $URLSearchParams.prototype;

var getAll2 = uncurryThis$6(URLSearchParamsPrototype$1.getAll);

var $has = uncurryThis$6(URLSearchParamsPrototype$1.has);

var params = new $URLSearchParams("a=1");

if (params.has("a", 2) || !params.has("a", void 0)) {
    defineBuiltIn$1(URLSearchParamsPrototype$1, "has", function has3(name) {
        var length = arguments.length;
        var $value = length < 2 ? void 0 : arguments[1];
        if (length && $value === void 0) return $has(this, name);
        var values3 = getAll2(this, name);
        validateArgumentsLength$2(length, 1);
        var value = toString$3($value);
        var index2 = 0;
        while (index2 < values3.length) {
            if (values3[index2++] === value) return true;
        }
        return false;
    }, {
        enumerable: true,
        unsafe: true
    });
}

var DESCRIPTORS$3 = descriptors;

var uncurryThis$5 = functionUncurryThis;

var defineBuiltInAccessor$1 = defineBuiltInAccessor$3;

var URLSearchParamsPrototype = URLSearchParams.prototype;

var forEach3 = uncurryThis$5(URLSearchParamsPrototype.forEach);

if (DESCRIPTORS$3 && !("size" in URLSearchParamsPrototype)) {
    defineBuiltInAccessor$1(URLSearchParamsPrototype, "size", {
        get: function size3() {
            var count = 0;
            forEach3(this, function() {
                count++;
            });
            return count;
        },
        configurable: true,
        enumerable: true
    });
}

var global$2 = global$e;

var path$2 = global$2;

var path$1 = path$2;

path$1.URLSearchParams;

var uncurryThis$4 = functionUncurryThis;

var toIntegerOrInfinity = toIntegerOrInfinity$3;

var toString$2 = toString$5;

var requireObjectCoercible = requireObjectCoercible$3;

var charAt$2 = uncurryThis$4("".charAt);

var charCodeAt$1 = uncurryThis$4("".charCodeAt);

var stringSlice$1 = uncurryThis$4("".slice);

var createMethod = function createMethod(CONVERT_TO_STRING) {
    return function($this, pos) {
        var S = toString$2(requireObjectCoercible($this));
        var position = toIntegerOrInfinity(pos);
        var size3 = S.length;
        var first, second;
        if (position < 0 || position >= size3) return CONVERT_TO_STRING ? "" : void 0;
        first = charCodeAt$1(S, position);
        return first < 55296 || first > 56319 || position + 1 === size3 || (second = charCodeAt$1(S, position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? charAt$2(S, position) : first : CONVERT_TO_STRING ? stringSlice$1(S, position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
    };
};

var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
};

var charAt$1 = stringMultibyte.charAt;

var toString$1 = toString$5;

var InternalStateModule$1 = internalState;

var defineIterator = iteratorDefine;

var createIterResultObject = createIterResultObject$3;

var STRING_ITERATOR = "String Iterator";

var setInternalState$1 = InternalStateModule$1.set;

var getInternalState = InternalStateModule$1.getterFor(STRING_ITERATOR);

defineIterator(String, "String", function(iterated) {
    setInternalState$1(this, {
        type: STRING_ITERATOR,
        string: toString$1(iterated),
        index: 0
    });
}, function next2() {
    var state = getInternalState(this);
    var string = state.string;
    var index2 = state.index;
    var point;
    if (index2 >= string.length) return createIterResultObject(void 0, true);
    point = charAt$1(string, index2);
    state.index += point.length;
    return createIterResultObject(point, false);
});

var DESCRIPTORS$2 = descriptors;

var uncurryThis$3 = functionUncurryThis;

var call$3 = functionCall;

var fails$2 = fails$e;

var objectKeys = objectKeys$2;

var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;

var propertyIsEnumerableModule = objectPropertyIsEnumerable;

var toObject$1 = toObject$4;

var IndexedObject = indexedObject;

var $assign = Object.assign;

var defineProperty3 = Object.defineProperty;

var concat = uncurryThis$3([].concat);

var objectAssign = !$assign || fails$2(function() {
    if (DESCRIPTORS$2 && $assign({
        b: 1
    }, $assign(defineProperty3({}, "a", {
        enumerable: true,
        get: function get() {
            defineProperty3(this, "b", {
                value: 3,
                enumerable: false
            });
        }
    }), {
        b: 2
    })).b !== 1) return true;
    var A = {};
    var B = {};
    var symbol = Symbol("assign detection");
    var alphabet = "abcdefghijklmnopqrst";
    A[symbol] = 7;
    alphabet.split("").forEach(function(chr) {
        B[chr] = chr;
    });
    return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join("") !== alphabet;
}) ? function assign(target, source) {
    var T = toObject$1(target);
    var argumentsLength = arguments.length;
    var index2 = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable2 = propertyIsEnumerableModule.f;
    while (argumentsLength > index2) {
        var S = IndexedObject(arguments[index2++]);
        var keys4 = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
        var length = keys4.length;
        var j = 0;
        var key;
        while (length > j) {
            key = keys4[j++];
            if (!DESCRIPTORS$2 || call$3(propertyIsEnumerable2, S, key)) T[key] = S[key];
        }
    }
    return T;
} : $assign;

var call$2 = functionCall;

var anObject$1 = anObject$9;

var getMethod = getMethod$3;

var iteratorClose$1 = function iteratorClose$1(iterator, kind, value) {
    var innerResult, innerError;
    anObject$1(iterator);
    try {
        innerResult = getMethod(iterator, "return");
        if (!innerResult) {
            if (kind === "throw") throw value;
            return value;
        }
        innerResult = call$2(innerResult, iterator);
    } catch (error) {
        innerError = true;
        innerResult = error;
    }
    if (kind === "throw") throw value;
    if (innerError) throw innerResult;
    anObject$1(innerResult);
    return value;
};

var anObject = anObject$9;

var iteratorClose = iteratorClose$1;

var callWithSafeIterationClosing$1 = function callWithSafeIterationClosing$1(iterator, fn, value, ENTRIES2) {
    try {
        return ENTRIES2 ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (error) {
        iteratorClose(iterator, "throw", error);
    }
};

var wellKnownSymbol = wellKnownSymbol$b;

var Iterators = iterators;

var ITERATOR = wellKnownSymbol("iterator");

var ArrayPrototype = Array.prototype;

var isArrayIteratorMethod$1 = function isArrayIteratorMethod$1(it) {
    return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

var uncurryThis$2 = functionUncurryThis;

var fails$1 = fails$e;

var isCallable = isCallable$g;

var classof = classof$4;

var getBuiltIn$1 = getBuiltIn$5;

var inspectSource = inspectSource$2;

var noop = function noop() {};

var construct = getBuiltIn$1("Reflect", "construct");

var constructorRegExp = /^\s*(?:class|function)\b/;

var exec$2 = uncurryThis$2(constructorRegExp.exec);

var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
    if (!isCallable(argument)) return false;
    try {
        construct(noop, [], argument);
        return true;
    } catch (error) {
        return false;
    }
};

var isConstructorLegacy = function isConstructor2(argument) {
    if (!isCallable(argument)) return false;
    switch (classof(argument)) {
      case "AsyncFunction":
      case "GeneratorFunction":
      case "AsyncGeneratorFunction":
        return false;
    }
    try {
        return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource(argument));
    } catch (error) {
        return true;
    }
};

isConstructorLegacy.sham = true;

var isConstructor$1 = !construct || fails$1(function() {
    var called;
    return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
        called = true;
    }) || called;
}) ? isConstructorLegacy : isConstructorModern;

var DESCRIPTORS$1 = descriptors;

var definePropertyModule = objectDefineProperty;

var createPropertyDescriptor = createPropertyDescriptor$5;

var createProperty$1 = function createProperty$1(object, key, value) {
    if (DESCRIPTORS$1) definePropertyModule.f(object, key, createPropertyDescriptor(0, value)); else object[key] = value;
};

var bind$1 = functionBindContext;

var call$1 = functionCall;

var toObject = toObject$4;

var callWithSafeIterationClosing = callWithSafeIterationClosing$1;

var isArrayIteratorMethod = isArrayIteratorMethod$1;

var isConstructor3 = isConstructor$1;

var lengthOfArrayLike = lengthOfArrayLike$2;

var createProperty = createProperty$1;

var getIterator = getIterator$2;

var getIteratorMethod = getIteratorMethod$3;

var $Array = Array;

var arrayFrom$1 = function from(arrayLike) {
    var O = toObject(arrayLike);
    var IS_CONSTRUCTOR = isConstructor3(this);
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
    var mapping = mapfn !== void 0;
    if (mapping) mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : void 0);
    var iteratorMethod = getIteratorMethod(O);
    var index2 = 0;
    var length, result, step, iterator, next3, value;
    if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
        iterator = getIterator(O, iteratorMethod);
        next3 = iterator.next;
        result = IS_CONSTRUCTOR ? new this() : [];
        for (;!(step = call$1(next3, iterator)).done; index2++) {
            value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [ step.value, index2 ], true) : step.value;
            createProperty(result, index2, value);
        }
    } else {
        length = lengthOfArrayLike(O);
        result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
        for (;length > index2; index2++) {
            value = mapping ? mapfn(O[index2], index2) : O[index2];
            createProperty(result, index2, value);
        }
    }
    result.length = index2;
    return result;
};

var uncurryThis$1 = functionUncurryThis;

var maxInt = 2147483647;

var base = 36;

var tMin = 1;

var tMax = 26;

var skew = 38;

var damp = 700;

var initialBias = 72;

var initialN = 128;

var delimiter = "-";

var regexNonASCII = /[^\0-\u007E]/;

var regexSeparators = /[.\u3002\uFF0E\uFF61]/g;

var OVERFLOW_ERROR = "Overflow: input needs wider integers to process";

var baseMinusTMin = base - tMin;

var $RangeError = RangeError;

var exec$1 = uncurryThis$1(regexSeparators.exec);

var floor$1 = Math.floor;

var fromCharCode = String.fromCharCode;

var charCodeAt = uncurryThis$1("".charCodeAt);

var join$1 = uncurryThis$1([].join);

var push$1 = uncurryThis$1([].push);

var replace$1 = uncurryThis$1("".replace);

var split$1 = uncurryThis$1("".split);

var toLowerCase$1 = uncurryThis$1("".toLowerCase);

var ucs2decode = function ucs2decode(string) {
    var output = [];
    var counter = 0;
    var length = string.length;
    while (counter < length) {
        var value = charCodeAt(string, counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
            var extra = charCodeAt(string, counter++);
            if ((extra & 64512) === 56320) {
                push$1(output, ((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
                push$1(output, value);
                counter--;
            }
        } else {
            push$1(output, value);
        }
    }
    return output;
};

var digitToBasic = function digitToBasic(digit) {
    return digit + 22 + 75 * (digit < 26);
};

var adapt = function adapt(delta, numPoints, firstTime) {
    var k = 0;
    delta = firstTime ? floor$1(delta / damp) : delta >> 1;
    delta += floor$1(delta / numPoints);
    while (delta > baseMinusTMin * tMax >> 1) {
        delta = floor$1(delta / baseMinusTMin);
        k += base;
    }
    return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

var encode = function encode(input) {
    var output = [];
    input = ucs2decode(input);
    var inputLength = input.length;
    var n2 = initialN;
    var delta = 0;
    var bias = initialBias;
    var i, currentValue;
    for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < 128) {
            push$1(output, fromCharCode(currentValue));
        }
    }
    var basicLength = output.length;
    var handledCPCount = basicLength;
    if (basicLength) {
        push$1(output, delimiter);
    }
    while (handledCPCount < inputLength) {
        var m = maxInt;
        for (i = 0; i < input.length; i++) {
            currentValue = input[i];
            if (currentValue >= n2 && currentValue < m) {
                m = currentValue;
            }
        }
        var handledCPCountPlusOne = handledCPCount + 1;
        if (m - n2 > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
            throw new $RangeError(OVERFLOW_ERROR);
        }
        delta += (m - n2) * handledCPCountPlusOne;
        n2 = m;
        for (i = 0; i < input.length; i++) {
            currentValue = input[i];
            if (currentValue < n2 && ++delta > maxInt) {
                throw new $RangeError(OVERFLOW_ERROR);
            }
            if (currentValue === n2) {
                var q = delta;
                var k = base;
                while (true) {
                    var t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t2) break;
                    var qMinusT = q - t2;
                    var baseMinusT = base - t2;
                    push$1(output, fromCharCode(digitToBasic(t2 + qMinusT % baseMinusT)));
                    q = floor$1(qMinusT / baseMinusT);
                    k += base;
                }
                push$1(output, fromCharCode(digitToBasic(q)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
                delta = 0;
                handledCPCount++;
            }
        }
        delta++;
        n2++;
    }
    return join$1(output, "");
};

var stringPunycodeToAscii = function stringPunycodeToAscii(input) {
    var encoded = [];
    var labels = split$1(replace$1(toLowerCase$1(input), regexSeparators, "."), ".");
    var i, label;
    for (i = 0; i < labels.length; i++) {
        label = labels[i];
        push$1(encoded, exec$1(regexNonASCII, label) ? "xn--" + encode(label) : label);
    }
    return join$1(encoded, ".");
};

var $$2 = _export;

var DESCRIPTORS = descriptors;

var USE_NATIVE_URL$1 = urlConstructorDetection;

var global$1 = global$e;

var bind = functionBindContext;

var uncurryThis = functionUncurryThis;

var defineBuiltIn = defineBuiltIn$8;

var defineBuiltInAccessor = defineBuiltInAccessor$3;

var anInstance = anInstance$2;

var hasOwn2 = hasOwnProperty_1;

var assign2 = objectAssign;

var arrayFrom = arrayFrom$1;

var arraySlice = arraySlice$2;

var codeAt = stringMultibyte.codeAt;

var toASCII = stringPunycodeToAscii;

var $toString = toString$5;

var setToStringTag = setToStringTag$4;

var validateArgumentsLength$1 = validateArgumentsLength$5;

var URLSearchParamsModule = web_urlSearchParams_constructor;

var InternalStateModule = internalState;

var setInternalState = InternalStateModule.set;

var getInternalURLState = InternalStateModule.getterFor("URL");

var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;

var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global$1.URL;

var TypeError$1 = global$1.TypeError;

var parseInt$1 = global$1.parseInt;

var floor = Math.floor;

var pow = Math.pow;

var charAt = uncurryThis("".charAt);

var exec = uncurryThis(/./.exec);

var join = uncurryThis([].join);

var numberToString = uncurryThis(1..toString);

var pop = uncurryThis([].pop);

var push = uncurryThis([].push);

var replace = uncurryThis("".replace);

var shift = uncurryThis([].shift);

var split = uncurryThis("".split);

var stringSlice = uncurryThis("".slice);

var toLowerCase = uncurryThis("".toLowerCase);

var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = "Invalid authority";

var INVALID_SCHEME = "Invalid scheme";

var INVALID_HOST = "Invalid host";

var INVALID_PORT = "Invalid port";

var ALPHA = /[a-z]/i;

var ALPHANUMERIC = /[\d+-.a-z]/i;

var DIGIT = /\d/;

var HEX_START = /^0x/i;

var OCT = /^[0-7]+$/;

var DEC = /^\d+$/;

var HEX = /^[\da-f]+$/i;

var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;

var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;

var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;

var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;

var TAB_AND_NEW_LINE = /[\t\n\r]/g;

var EOF;

var parseIPv4 = function parseIPv4(input) {
    var parts = split(input, ".");
    var partsLength, numbers, index2, part, radix, number, ipv4;
    if (parts.length && parts[parts.length - 1] === "") {
        parts.length--;
    }
    partsLength = parts.length;
    if (partsLength > 4) return input;
    numbers = [];
    for (index2 = 0; index2 < partsLength; index2++) {
        part = parts[index2];
        if (part === "") return input;
        radix = 10;
        if (part.length > 1 && charAt(part, 0) === "0") {
            radix = exec(HEX_START, part) ? 16 : 8;
            part = stringSlice(part, radix === 8 ? 1 : 2);
        }
        if (part === "") {
            number = 0;
        } else {
            if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
            number = parseInt$1(part, radix);
        }
        push(numbers, number);
    }
    for (index2 = 0; index2 < partsLength; index2++) {
        number = numbers[index2];
        if (index2 === partsLength - 1) {
            if (number >= pow(256, 5 - partsLength)) return null;
        } else if (number > 255) return null;
    }
    ipv4 = pop(numbers);
    for (index2 = 0; index2 < numbers.length; index2++) {
        ipv4 += numbers[index2] * pow(256, 3 - index2);
    }
    return ipv4;
};

var parseIPv6 = function parseIPv6(input) {
    var address = [ 0, 0, 0, 0, 0, 0, 0, 0 ];
    var pieceIndex = 0;
    var compress = null;
    var pointer = 0;
    var value, length, numbersSeen, ipv4Piece, number, swaps, swap;
    var chr = function chr() {
        return charAt(input, pointer);
    };
    if (chr() === ":") {
        if (charAt(input, 1) !== ":") return;
        pointer += 2;
        pieceIndex++;
        compress = pieceIndex;
    }
    while (chr()) {
        if (pieceIndex === 8) return;
        if (chr() === ":") {
            if (compress !== null) return;
            pointer++;
            pieceIndex++;
            compress = pieceIndex;
            continue;
        }
        value = length = 0;
        while (length < 4 && exec(HEX, chr())) {
            value = value * 16 + parseInt$1(chr(), 16);
            pointer++;
            length++;
        }
        if (chr() === ".") {
            if (length === 0) return;
            pointer -= length;
            if (pieceIndex > 6) return;
            numbersSeen = 0;
            while (chr()) {
                ipv4Piece = null;
                if (numbersSeen > 0) {
                    if (chr() === "." && numbersSeen < 4) pointer++; else return;
                }
                if (!exec(DIGIT, chr())) return;
                while (exec(DIGIT, chr())) {
                    number = parseInt$1(chr(), 10);
                    if (ipv4Piece === null) ipv4Piece = number; else if (ipv4Piece === 0) return; else ipv4Piece = ipv4Piece * 10 + number;
                    if (ipv4Piece > 255) return;
                    pointer++;
                }
                address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
                numbersSeen++;
                if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
            }
            if (numbersSeen !== 4) return;
            break;
        } else if (chr() === ":") {
            pointer++;
            if (!chr()) return;
        } else if (chr()) return;
        address[pieceIndex++] = value;
    }
    if (compress !== null) {
        swaps = pieceIndex - compress;
        pieceIndex = 7;
        while (pieceIndex !== 0 && swaps > 0) {
            swap = address[pieceIndex];
            address[pieceIndex--] = address[compress + swaps - 1];
            address[compress + --swaps] = swap;
        }
    } else if (pieceIndex !== 8) return;
    return address;
};

var findLongestZeroSequence = function findLongestZeroSequence(ipv6) {
    var maxIndex = null;
    var maxLength = 1;
    var currStart = null;
    var currLength = 0;
    var index2 = 0;
    for (;index2 < 8; index2++) {
        if (ipv6[index2] !== 0) {
            if (currLength > maxLength) {
                maxIndex = currStart;
                maxLength = currLength;
            }
            currStart = null;
            currLength = 0;
        } else {
            if (currStart === null) currStart = index2;
            ++currLength;
        }
    }
    if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
    }
    return maxIndex;
};

var serializeHost = function serializeHost(host2) {
    var result, index2, compress, ignore0;
    if (typeof host2 == "number") {
        result = [];
        for (index2 = 0; index2 < 4; index2++) {
            unshift(result, host2 % 256);
            host2 = floor(host2 / 256);
        }
        return join(result, ".");
    } else if (_typeof2(host2) == "object") {
        result = "";
        compress = findLongestZeroSequence(host2);
        for (index2 = 0; index2 < 8; index2++) {
            if (ignore0 && host2[index2] === 0) continue;
            if (ignore0) ignore0 = false;
            if (compress === index2) {
                result += index2 ? ":" : "::";
                ignore0 = true;
            } else {
                result += numberToString(host2[index2], 16);
                if (index2 < 7) result += ":";
            }
        }
        return "[" + result + "]";
    }
    return host2;
};

var C0ControlPercentEncodeSet = {};

var fragmentPercentEncodeSet = assign2({}, C0ControlPercentEncodeSet, {
    " ": 1,
    '"': 1,
    "<": 1,
    ">": 1,
    "`": 1
});

var pathPercentEncodeSet = assign2({}, fragmentPercentEncodeSet, {
    "#": 1,
    "?": 1,
    "{": 1,
    "}": 1
});

var userinfoPercentEncodeSet = assign2({}, pathPercentEncodeSet, {
    "/": 1,
    ":": 1,
    ";": 1,
    "=": 1,
    "@": 1,
    "[": 1,
    "\\": 1,
    "]": 1,
    "^": 1,
    "|": 1
});

var percentEncode = function percentEncode(chr, set3) {
    var code = codeAt(chr, 0);
    return code > 32 && code < 127 && !hasOwn2(set3, chr) ? chr : encodeURIComponent(chr);
};

var specialSchemes = {
    ftp: 21,
    file: null,
    http: 80,
    https: 443,
    ws: 80,
    wss: 443
};

var isWindowsDriveLetter = function isWindowsDriveLetter(string, normalized) {
    var second;
    return string.length === 2 && exec(ALPHA, charAt(string, 0)) && ((second = charAt(string, 1)) === ":" || !normalized && second === "|");
};

var startsWithWindowsDriveLetter = function startsWithWindowsDriveLetter(string) {
    var third;
    return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (string.length === 2 || (third = charAt(string, 2)) === "/" || third === "\\" || third === "?" || third === "#");
};

var isSingleDot = function isSingleDot(segment) {
    return segment === "." || toLowerCase(segment) === "%2e";
};

var isDoubleDot = function isDoubleDot(segment) {
    segment = toLowerCase(segment);
    return segment === ".." || segment === "%2e." || segment === ".%2e" || segment === "%2e%2e";
};

var SCHEME_START = {};

var SCHEME = {};

var NO_SCHEME = {};

var SPECIAL_RELATIVE_OR_AUTHORITY = {};

var PATH_OR_AUTHORITY = {};

var RELATIVE = {};

var RELATIVE_SLASH = {};

var SPECIAL_AUTHORITY_SLASHES = {};

var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};

var AUTHORITY = {};

var HOST = {};

var HOSTNAME = {};

var PORT = {};

var FILE = {};

var FILE_SLASH = {};

var FILE_HOST = {};

var PATH_START = {};

var PATH = {};

var CANNOT_BE_A_BASE_URL_PATH = {};

var QUERY = {};

var FRAGMENT = {};

var URLState = function URLState(url2, isBase, base2) {
    var urlString = $toString(url2);
    var baseState, failure, searchParams;
    if (isBase) {
        failure = this.parse(urlString);
        if (failure) throw new TypeError$1(failure);
        this.searchParams = null;
    } else {
        if (base2 !== void 0) baseState = new URLState(base2, true);
        failure = this.parse(urlString, null, baseState);
        if (failure) throw new TypeError$1(failure);
        searchParams = getInternalSearchParamsState(new URLSearchParams$1());
        searchParams.bindURL(this);
        this.searchParams = searchParams;
    }
};

URLState.prototype = {
    type: "URL",
    // https://url.spec.whatwg.org/#url-parsing
    // eslint-disable-next-line max-statements -- TODO
    parse: function parse(input, stateOverride, base2) {
        var url2 = this;
        var state = stateOverride || SCHEME_START;
        var pointer = 0;
        var buffer2 = "";
        var seenAt = false;
        var seenBracket = false;
        var seenPasswordToken = false;
        var codePoints, chr, bufferCodePoints, failure;
        input = $toString(input);
        if (!stateOverride) {
            url2.scheme = "";
            url2.username = "";
            url2.password = "";
            url2.host = null;
            url2.port = null;
            url2.path = [];
            url2.query = null;
            url2.fragment = null;
            url2.cannotBeABaseURL = false;
            input = replace(input, LEADING_C0_CONTROL_OR_SPACE, "");
            input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, "$1");
        }
        input = replace(input, TAB_AND_NEW_LINE, "");
        codePoints = arrayFrom(input);
        while (pointer <= codePoints.length) {
            chr = codePoints[pointer];
            switch (state) {
              case SCHEME_START:
                if (chr && exec(ALPHA, chr)) {
                    buffer2 += toLowerCase(chr);
                    state = SCHEME;
                } else if (!stateOverride) {
                    state = NO_SCHEME;
                    continue;
                } else return INVALID_SCHEME;
                break;

              case SCHEME:
                if (chr && (exec(ALPHANUMERIC, chr) || chr === "+" || chr === "-" || chr === ".")) {
                    buffer2 += toLowerCase(chr);
                } else if (chr === ":") {
                    if (stateOverride && (url2.isSpecial() !== hasOwn2(specialSchemes, buffer2) || buffer2 === "file" && (url2.includesCredentials() || url2.port !== null) || url2.scheme === "file" && !url2.host)) return;
                    url2.scheme = buffer2;
                    if (stateOverride) {
                        if (url2.isSpecial() && specialSchemes[url2.scheme] === url2.port) url2.port = null;
                        return;
                    }
                    buffer2 = "";
                    if (url2.scheme === "file") {
                        state = FILE;
                    } else if (url2.isSpecial() && base2 && base2.scheme === url2.scheme) {
                        state = SPECIAL_RELATIVE_OR_AUTHORITY;
                    } else if (url2.isSpecial()) {
                        state = SPECIAL_AUTHORITY_SLASHES;
                    } else if (codePoints[pointer + 1] === "/") {
                        state = PATH_OR_AUTHORITY;
                        pointer++;
                    } else {
                        url2.cannotBeABaseURL = true;
                        push(url2.path, "");
                        state = CANNOT_BE_A_BASE_URL_PATH;
                    }
                } else if (!stateOverride) {
                    buffer2 = "";
                    state = NO_SCHEME;
                    pointer = 0;
                    continue;
                } else return INVALID_SCHEME;
                break;

              case NO_SCHEME:
                if (!base2 || base2.cannotBeABaseURL && chr !== "#") return INVALID_SCHEME;
                if (base2.cannotBeABaseURL && chr === "#") {
                    url2.scheme = base2.scheme;
                    url2.path = arraySlice(base2.path);
                    url2.query = base2.query;
                    url2.fragment = "";
                    url2.cannotBeABaseURL = true;
                    state = FRAGMENT;
                    break;
                }
                state = base2.scheme === "file" ? FILE : RELATIVE;
                continue;

              case SPECIAL_RELATIVE_OR_AUTHORITY:
                if (chr === "/" && codePoints[pointer + 1] === "/") {
                    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                    pointer++;
                } else {
                    state = RELATIVE;
                    continue;
                }
                break;

              case PATH_OR_AUTHORITY:
                if (chr === "/") {
                    state = AUTHORITY;
                    break;
                } else {
                    state = PATH;
                    continue;
                }

              case RELATIVE:
                url2.scheme = base2.scheme;
                if (chr === EOF) {
                    url2.username = base2.username;
                    url2.password = base2.password;
                    url2.host = base2.host;
                    url2.port = base2.port;
                    url2.path = arraySlice(base2.path);
                    url2.query = base2.query;
                } else if (chr === "/" || chr === "\\" && url2.isSpecial()) {
                    state = RELATIVE_SLASH;
                } else if (chr === "?") {
                    url2.username = base2.username;
                    url2.password = base2.password;
                    url2.host = base2.host;
                    url2.port = base2.port;
                    url2.path = arraySlice(base2.path);
                    url2.query = "";
                    state = QUERY;
                } else if (chr === "#") {
                    url2.username = base2.username;
                    url2.password = base2.password;
                    url2.host = base2.host;
                    url2.port = base2.port;
                    url2.path = arraySlice(base2.path);
                    url2.query = base2.query;
                    url2.fragment = "";
                    state = FRAGMENT;
                } else {
                    url2.username = base2.username;
                    url2.password = base2.password;
                    url2.host = base2.host;
                    url2.port = base2.port;
                    url2.path = arraySlice(base2.path);
                    url2.path.length--;
                    state = PATH;
                    continue;
                }
                break;

              case RELATIVE_SLASH:
                if (url2.isSpecial() && (chr === "/" || chr === "\\")) {
                    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                } else if (chr === "/") {
                    state = AUTHORITY;
                } else {
                    url2.username = base2.username;
                    url2.password = base2.password;
                    url2.host = base2.host;
                    url2.port = base2.port;
                    state = PATH;
                    continue;
                }
                break;

              case SPECIAL_AUTHORITY_SLASHES:
                state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                if (chr !== "/" || charAt(buffer2, pointer + 1) !== "/") continue;
                pointer++;
                break;

              case SPECIAL_AUTHORITY_IGNORE_SLASHES:
                if (chr !== "/" && chr !== "\\") {
                    state = AUTHORITY;
                    continue;
                }
                break;

              case AUTHORITY:
                if (chr === "@") {
                    if (seenAt) buffer2 = "%40" + buffer2;
                    seenAt = true;
                    bufferCodePoints = arrayFrom(buffer2);
                    for (var i = 0; i < bufferCodePoints.length; i++) {
                        var codePoint = bufferCodePoints[i];
                        if (codePoint === ":" && !seenPasswordToken) {
                            seenPasswordToken = true;
                            continue;
                        }
                        var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                        if (seenPasswordToken) url2.password += encodedCodePoints; else url2.username += encodedCodePoints;
                    }
                    buffer2 = "";
                } else if (chr === EOF || chr === "/" || chr === "?" || chr === "#" || chr === "\\" && url2.isSpecial()) {
                    if (seenAt && buffer2 === "") return INVALID_AUTHORITY;
                    pointer -= arrayFrom(buffer2).length + 1;
                    buffer2 = "";
                    state = HOST;
                } else buffer2 += chr;
                break;

              case HOST:
              case HOSTNAME:
                if (stateOverride && url2.scheme === "file") {
                    state = FILE_HOST;
                    continue;
                } else if (chr === ":" && !seenBracket) {
                    if (buffer2 === "") return INVALID_HOST;
                    failure = url2.parseHost(buffer2);
                    if (failure) return failure;
                    buffer2 = "";
                    state = PORT;
                    if (stateOverride === HOSTNAME) return;
                } else if (chr === EOF || chr === "/" || chr === "?" || chr === "#" || chr === "\\" && url2.isSpecial()) {
                    if (url2.isSpecial() && buffer2 === "") return INVALID_HOST;
                    if (stateOverride && buffer2 === "" && (url2.includesCredentials() || url2.port !== null)) return;
                    failure = url2.parseHost(buffer2);
                    if (failure) return failure;
                    buffer2 = "";
                    state = PATH_START;
                    if (stateOverride) return;
                    continue;
                } else {
                    if (chr === "[") seenBracket = true; else if (chr === "]") seenBracket = false;
                    buffer2 += chr;
                }
                break;

              case PORT:
                if (exec(DIGIT, chr)) {
                    buffer2 += chr;
                } else if (chr === EOF || chr === "/" || chr === "?" || chr === "#" || chr === "\\" && url2.isSpecial() || stateOverride) {
                    if (buffer2 !== "") {
                        var port = parseInt$1(buffer2, 10);
                        if (port > 65535) return INVALID_PORT;
                        url2.port = url2.isSpecial() && port === specialSchemes[url2.scheme] ? null : port;
                        buffer2 = "";
                    }
                    if (stateOverride) return;
                    state = PATH_START;
                    continue;
                } else return INVALID_PORT;
                break;

              case FILE:
                url2.scheme = "file";
                if (chr === "/" || chr === "\\") state = FILE_SLASH; else if (base2 && base2.scheme === "file") {
                    switch (chr) {
                      case EOF:
                        url2.host = base2.host;
                        url2.path = arraySlice(base2.path);
                        url2.query = base2.query;
                        break;

                      case "?":
                        url2.host = base2.host;
                        url2.path = arraySlice(base2.path);
                        url2.query = "";
                        state = QUERY;
                        break;

                      case "#":
                        url2.host = base2.host;
                        url2.path = arraySlice(base2.path);
                        url2.query = base2.query;
                        url2.fragment = "";
                        state = FRAGMENT;
                        break;

                      default:
                        if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ""))) {
                            url2.host = base2.host;
                            url2.path = arraySlice(base2.path);
                            url2.shortenPath();
                        }
                        state = PATH;
                        continue;
                    }
                } else {
                    state = PATH;
                    continue;
                }
                break;

              case FILE_SLASH:
                if (chr === "/" || chr === "\\") {
                    state = FILE_HOST;
                    break;
                }
                if (base2 && base2.scheme === "file" && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ""))) {
                    if (isWindowsDriveLetter(base2.path[0], true)) push(url2.path, base2.path[0]); else url2.host = base2.host;
                }
                state = PATH;
                continue;

              case FILE_HOST:
                if (chr === EOF || chr === "/" || chr === "\\" || chr === "?" || chr === "#") {
                    if (!stateOverride && isWindowsDriveLetter(buffer2)) {
                        state = PATH;
                    } else if (buffer2 === "") {
                        url2.host = "";
                        if (stateOverride) return;
                        state = PATH_START;
                    } else {
                        failure = url2.parseHost(buffer2);
                        if (failure) return failure;
                        if (url2.host === "localhost") url2.host = "";
                        if (stateOverride) return;
                        buffer2 = "";
                        state = PATH_START;
                    }
                    continue;
                } else buffer2 += chr;
                break;

              case PATH_START:
                if (url2.isSpecial()) {
                    state = PATH;
                    if (chr !== "/" && chr !== "\\") continue;
                } else if (!stateOverride && chr === "?") {
                    url2.query = "";
                    state = QUERY;
                } else if (!stateOverride && chr === "#") {
                    url2.fragment = "";
                    state = FRAGMENT;
                } else if (chr !== EOF) {
                    state = PATH;
                    if (chr !== "/") continue;
                }
                break;

              case PATH:
                if (chr === EOF || chr === "/" || chr === "\\" && url2.isSpecial() || !stateOverride && (chr === "?" || chr === "#")) {
                    if (isDoubleDot(buffer2)) {
                        url2.shortenPath();
                        if (chr !== "/" && !(chr === "\\" && url2.isSpecial())) {
                            push(url2.path, "");
                        }
                    } else if (isSingleDot(buffer2)) {
                        if (chr !== "/" && !(chr === "\\" && url2.isSpecial())) {
                            push(url2.path, "");
                        }
                    } else {
                        if (url2.scheme === "file" && !url2.path.length && isWindowsDriveLetter(buffer2)) {
                            if (url2.host) url2.host = "";
                            buffer2 = charAt(buffer2, 0) + ":";
                        }
                        push(url2.path, buffer2);
                    }
                    buffer2 = "";
                    if (url2.scheme === "file" && (chr === EOF || chr === "?" || chr === "#")) {
                        while (url2.path.length > 1 && url2.path[0] === "") {
                            shift(url2.path);
                        }
                    }
                    if (chr === "?") {
                        url2.query = "";
                        state = QUERY;
                    } else if (chr === "#") {
                        url2.fragment = "";
                        state = FRAGMENT;
                    }
                } else {
                    buffer2 += percentEncode(chr, pathPercentEncodeSet);
                }
                break;

              case CANNOT_BE_A_BASE_URL_PATH:
                if (chr === "?") {
                    url2.query = "";
                    state = QUERY;
                } else if (chr === "#") {
                    url2.fragment = "";
                    state = FRAGMENT;
                } else if (chr !== EOF) {
                    url2.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
                }
                break;

              case QUERY:
                if (!stateOverride && chr === "#") {
                    url2.fragment = "";
                    state = FRAGMENT;
                } else if (chr !== EOF) {
                    if (chr === "'" && url2.isSpecial()) url2.query += "%27"; else if (chr === "#") url2.query += "%23"; else url2.query += percentEncode(chr, C0ControlPercentEncodeSet);
                }
                break;

              case FRAGMENT:
                if (chr !== EOF) url2.fragment += percentEncode(chr, fragmentPercentEncodeSet);
                break;
            }
            pointer++;
        }
    },
    // https://url.spec.whatwg.org/#host-parsing
    parseHost: function parseHost(input) {
        var result, codePoints, index2;
        if (charAt(input, 0) === "[") {
            if (charAt(input, input.length - 1) !== "]") return INVALID_HOST;
            result = parseIPv6(stringSlice(input, 1, -1));
            if (!result) return INVALID_HOST;
            this.host = result;
        } else if (!this.isSpecial()) {
            if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
            result = "";
            codePoints = arrayFrom(input);
            for (index2 = 0; index2 < codePoints.length; index2++) {
                result += percentEncode(codePoints[index2], C0ControlPercentEncodeSet);
            }
            this.host = result;
        } else {
            input = toASCII(input);
            if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
            result = parseIPv4(input);
            if (result === null) return INVALID_HOST;
            this.host = result;
        }
    },
    // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
    cannotHaveUsernamePasswordPort: function cannotHaveUsernamePasswordPort() {
        return !this.host || this.cannotBeABaseURL || this.scheme === "file";
    },
    // https://url.spec.whatwg.org/#include-credentials
    includesCredentials: function includesCredentials() {
        return this.username !== "" || this.password !== "";
    },
    // https://url.spec.whatwg.org/#is-special
    isSpecial: function isSpecial() {
        return hasOwn2(specialSchemes, this.scheme);
    },
    // https://url.spec.whatwg.org/#shorten-a-urls-path
    shortenPath: function shortenPath() {
        var path2 = this.path;
        var pathSize = path2.length;
        if (pathSize && (this.scheme !== "file" || pathSize !== 1 || !isWindowsDriveLetter(path2[0], true))) {
            path2.length--;
        }
    },
    // https://url.spec.whatwg.org/#concept-url-serializer
    serialize: function serialize() {
        var url2 = this;
        var scheme = url2.scheme;
        var username = url2.username;
        var password = url2.password;
        var host2 = url2.host;
        var port = url2.port;
        var path2 = url2.path;
        var query = url2.query;
        var fragment = url2.fragment;
        var output = scheme + ":";
        if (host2 !== null) {
            output += "//";
            if (url2.includesCredentials()) {
                output += username + (password ? ":" + password : "") + "@";
            }
            output += serializeHost(host2);
            if (port !== null) output += ":" + port;
        } else if (scheme === "file") output += "//";
        output += url2.cannotBeABaseURL ? path2[0] : path2.length ? "/" + join(path2, "/") : "";
        if (query !== null) output += "?" + query;
        if (fragment !== null) output += "#" + fragment;
        return output;
    },
    // https://url.spec.whatwg.org/#dom-url-href
    setHref: function setHref(href) {
        var failure = this.parse(href);
        if (failure) throw new TypeError$1(failure);
        this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-origin
    getOrigin: function getOrigin() {
        var scheme = this.scheme;
        var port = this.port;
        if (scheme === "blob") try {
            return new URLConstructor(scheme.path[0]).origin;
        } catch (error) {
            return "null";
        }
        if (scheme === "file" || !this.isSpecial()) return "null";
        return scheme + "://" + serializeHost(this.host) + (port !== null ? ":" + port : "");
    },
    // https://url.spec.whatwg.org/#dom-url-protocol
    getProtocol: function getProtocol() {
        return this.scheme + ":";
    },
    setProtocol: function setProtocol(protocol) {
        this.parse($toString(protocol) + ":", SCHEME_START);
    },
    // https://url.spec.whatwg.org/#dom-url-username
    getUsername: function getUsername() {
        return this.username;
    },
    setUsername: function setUsername(username) {
        var codePoints = arrayFrom($toString(username));
        if (this.cannotHaveUsernamePasswordPort()) return;
        this.username = "";
        for (var i = 0; i < codePoints.length; i++) {
            this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
    },
    // https://url.spec.whatwg.org/#dom-url-password
    getPassword: function getPassword() {
        return this.password;
    },
    setPassword: function setPassword(password) {
        var codePoints = arrayFrom($toString(password));
        if (this.cannotHaveUsernamePasswordPort()) return;
        this.password = "";
        for (var i = 0; i < codePoints.length; i++) {
            this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
        }
    },
    // https://url.spec.whatwg.org/#dom-url-host
    getHost: function getHost() {
        var host2 = this.host;
        var port = this.port;
        return host2 === null ? "" : port === null ? serializeHost(host2) : serializeHost(host2) + ":" + port;
    },
    setHost: function setHost(host2) {
        if (this.cannotBeABaseURL) return;
        this.parse(host2, HOST);
    },
    // https://url.spec.whatwg.org/#dom-url-hostname
    getHostname: function getHostname() {
        var host2 = this.host;
        return host2 === null ? "" : serializeHost(host2);
    },
    setHostname: function setHostname(hostname) {
        if (this.cannotBeABaseURL) return;
        this.parse(hostname, HOSTNAME);
    },
    // https://url.spec.whatwg.org/#dom-url-port
    getPort: function getPort() {
        var port = this.port;
        return port === null ? "" : $toString(port);
    },
    setPort: function setPort(port) {
        if (this.cannotHaveUsernamePasswordPort()) return;
        port = $toString(port);
        if (port === "") this.port = null; else this.parse(port, PORT);
    },
    // https://url.spec.whatwg.org/#dom-url-pathname
    getPathname: function getPathname() {
        var path2 = this.path;
        return this.cannotBeABaseURL ? path2[0] : path2.length ? "/" + join(path2, "/") : "";
    },
    setPathname: function setPathname(pathname) {
        if (this.cannotBeABaseURL) return;
        this.path = [];
        this.parse(pathname, PATH_START);
    },
    // https://url.spec.whatwg.org/#dom-url-search
    getSearch: function getSearch() {
        var query = this.query;
        return query ? "?" + query : "";
    },
    setSearch: function setSearch(search) {
        search = $toString(search);
        if (search === "") {
            this.query = null;
        } else {
            if (charAt(search, 0) === "?") search = stringSlice(search, 1);
            this.query = "";
            this.parse(search, QUERY);
        }
        this.searchParams.update();
    },
    // https://url.spec.whatwg.org/#dom-url-searchparams
    getSearchParams: function getSearchParams() {
        return this.searchParams.facade;
    },
    // https://url.spec.whatwg.org/#dom-url-hash
    getHash: function getHash() {
        var fragment = this.fragment;
        return fragment ? "#" + fragment : "";
    },
    setHash: function setHash(hash) {
        hash = $toString(hash);
        if (hash === "") {
            this.fragment = null;
            return;
        }
        if (charAt(hash, 0) === "#") hash = stringSlice(hash, 1);
        this.fragment = "";
        this.parse(hash, FRAGMENT);
    },
    update: function update() {
        this.query = this.searchParams.serialize() || null;
    }
};

var URLConstructor = function URL2(url2) {
    var that = anInstance(this, URLPrototype);
    var base2 = validateArgumentsLength$1(arguments.length, 1) > 1 ? arguments[1] : void 0;
    var state = setInternalState(that, new URLState(url2, false, base2));
    if (!DESCRIPTORS) {
        that.href = state.serialize();
        that.origin = state.getOrigin();
        that.protocol = state.getProtocol();
        that.username = state.getUsername();
        that.password = state.getPassword();
        that.host = state.getHost();
        that.hostname = state.getHostname();
        that.port = state.getPort();
        that.pathname = state.getPathname();
        that.search = state.getSearch();
        that.searchParams = state.getSearchParams();
        that.hash = state.getHash();
    }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function accessorDescriptor(getter, setter) {
    return {
        get: function get() {
            return getInternalURLState(this)[getter]();
        },
        set: setter && function(value) {
            return getInternalURLState(this)[setter](value);
        },
        configurable: true,
        enumerable: true
    };
};

if (DESCRIPTORS) {
    defineBuiltInAccessor(URLPrototype, "href", accessorDescriptor("serialize", "setHref"));
    defineBuiltInAccessor(URLPrototype, "origin", accessorDescriptor("getOrigin"));
    defineBuiltInAccessor(URLPrototype, "protocol", accessorDescriptor("getProtocol", "setProtocol"));
    defineBuiltInAccessor(URLPrototype, "username", accessorDescriptor("getUsername", "setUsername"));
    defineBuiltInAccessor(URLPrototype, "password", accessorDescriptor("getPassword", "setPassword"));
    defineBuiltInAccessor(URLPrototype, "host", accessorDescriptor("getHost", "setHost"));
    defineBuiltInAccessor(URLPrototype, "hostname", accessorDescriptor("getHostname", "setHostname"));
    defineBuiltInAccessor(URLPrototype, "port", accessorDescriptor("getPort", "setPort"));
    defineBuiltInAccessor(URLPrototype, "pathname", accessorDescriptor("getPathname", "setPathname"));
    defineBuiltInAccessor(URLPrototype, "search", accessorDescriptor("getSearch", "setSearch"));
    defineBuiltInAccessor(URLPrototype, "searchParams", accessorDescriptor("getSearchParams"));
    defineBuiltInAccessor(URLPrototype, "hash", accessorDescriptor("getHash", "setHash"));
}

defineBuiltIn(URLPrototype, "toJSON", function toJSON() {
    return getInternalURLState(this).serialize();
}, {
    enumerable: true
});

defineBuiltIn(URLPrototype, "toString", function toString3() {
    return getInternalURLState(this).serialize();
}, {
    enumerable: true
});

if (NativeURL) {
    var nativeCreateObjectURL = NativeURL.createObjectURL;
    var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
    if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, "createObjectURL", bind(nativeCreateObjectURL, NativeURL));
    if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, "revokeObjectURL", bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, "URL");

$$2({
    global: true,
    constructor: true,
    forced: !USE_NATIVE_URL$1,
    sham: !DESCRIPTORS
}, {
    URL: URLConstructor
});

var $$1 = _export;

var getBuiltIn = getBuiltIn$5;

var fails = fails$e;

var validateArgumentsLength = validateArgumentsLength$5;

var toString4 = toString$5;

var USE_NATIVE_URL = urlConstructorDetection;

var URL$2 = getBuiltIn("URL");

var THROWS_WITHOUT_ARGUMENTS = USE_NATIVE_URL && fails(function() {
    URL$2.canParse();
});

$$1({
    target: "URL",
    stat: true,
    forced: !THROWS_WITHOUT_ARGUMENTS
}, {
    canParse: function canParse(url2) {
        var length = validateArgumentsLength(arguments.length, 1);
        var urlString = toString4(url2);
        var base2 = length < 2 || arguments[1] === void 0 ? void 0 : toString4(arguments[1]);
        try {
            return !!new URL$2(urlString, base2);
        } catch (error) {
            return false;
        }
    }
});

var $ = _export;

var call = functionCall;

$({
    target: "URL",
    proto: true,
    enumerable: true
}, {
    toJSON: function toJSON2() {
        return call(URL.prototype.toString, this);
    }
});

var path = path$2;

var url$3 = path.URL;

var parent$2 = url$3;

var url$2 = parent$2;

var parent$1 = url$2;

var url$1 = parent$1;

var parent = url$1;

var url = parent;

(function(module2) {
    module2.exports = url;
})(url$4);

var URL$1 = /*   */ getDefaultExportFromCjs(urlExports);

exports.Cookie = Cookie;

exports.Request = Request;

exports.URL = URL$1;

exports._export_sfc = _export_sfc;

exports.computed = computed;

exports.createPinia = createPinia;

exports.createSSRApp = createSSRApp;

exports.defineComponent = defineComponent;

exports.defineStore = defineStore;

exports.e = e;

exports.index = index;

exports.n = n;

exports.o = o;

exports.onHide = onHide;

exports.onLaunch = onLaunch;

exports.onLoad = onLoad;

exports.onShareAppMessage = onShareAppMessage;

exports.onShow = onShow;

exports.p = p;

exports.reactive = reactive;

exports.ref = ref;

exports.resolveComponent = resolveComponent;

exports.t = t;

exports.unref = unref;

exports.wx$1 = wx$1;