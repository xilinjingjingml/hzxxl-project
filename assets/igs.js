"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.igs = void 0;
var VERSION = 100;
if (window['igsgame'] && window['igsgame'].igsEvent && window['igsgame'].igsEvent.reportUserAction) {
    var eventHandler_1 = cc.Component.EventHandler.prototype;
    eventHandler_1.emit = (function () {
        var oldEmit = eventHandler_1.emit;
        var getPath = function (node) {
            var p = "";
            while (node) {
                p = node.name + "/" + p;
                node = node.parent;
            }
            if (p.length > 0) {
                p = p.substring(0, p.length - 1);
            }
            return p;
        };
        var genActionName = function (obj, params) {
            var thiz = obj;
            var target = thiz.target;
            if (!cc.isValid(target)) {
                return "";
            }
            var name = "";
            if (Array.isArray(params) && params.length > 0) {
                var p = params[0];
                name = getPath(p.target) + "=" + getPath(target) + "=" + thiz.handler + "=" + thiz.customEventData;
            }
            return name;
        };
        return function (params) {
            if (igs && igs.platform) {
                igs.platform.trackUserAction(genActionName(this, params));
            }
            oldEmit.call(this, params);
        };
    })();
}
if (CC_JSB) {
    if (jsb['PluginProxyWrapper']) {
        var proxy_1 = jsb['PluginProxyWrapper'].getInstance();
        console.log("log redirect change", proxy_1);
        console.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
            }
            proxy_1.PluginLog(JSON.stringify(e));
        };
        console.info = console.log;
        console.warn = console.log;
        console.error = console.log;
        cc.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
            }
            proxy_1.PluginLog(JSON.stringify(e));
        };
        cc.warn = cc.log;
        cc.error = cc.log;
    }
}
if (typeof Object.assign != 'function') {
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }
            var to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];
                if (nextSource != null) {
                    for (var nextKey in nextSource) {
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
if (!Object.values) {
    Object.values = function (obj) {
        if (obj !== Object(obj))
            throw new TypeError('Object.values called on a non-object');
        var val = [], key;
        for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                val.push(obj[key]);
            }
        }
        return val;
    };
}
function completeAssign(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (source) {
        var descriptors = Object.keys(source).reduce(function (descriptors, key) {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
        }, {});
        Object.getOwnPropertySymbols(source).forEach(function (sym) {
            var descriptor = Object.getOwnPropertyDescriptor(source, sym);
            if (descriptor.enumerable) {
                descriptors[sym] = descriptor;
            }
        });
        Object.defineProperties(target, descriptors);
    });
    return target;
}
function randomString(cnt) {
    function randomHash(count) {
        if (count === 1) {
            return parseInt(16 * Math.random() + "", 10).toString(16);
        }
        var hash = '';
        for (var i = 0; i < count; i++) {
            hash += randomHash(1);
        }
        return hash;
    }
    return randomHash(cnt);
}
var s = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args) { }
    for (var e = 0, t = 0, n = arguments.length; t < n; t++)
        e += arguments[t].length;
    var o = Array(e), i = 0;
    for (t = 0; t < n; t++)
        for (var a = arguments[t], r = 0, s = a.length; r < s; r++,
            i++)
            o[i] = a[r];
    return o;
};
function $tag(str) {
    return "[igs] [" + Date.now() + "]" + str;
}
function $log() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.log.apply(console, contentArr);
}
function $error() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.error.apply(console, contentArr);
}
function $warn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.warn.apply(console, contentArr);
}
function $info() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var e = [], t = 0; t < arguments.length; t++)
        e[t] = arguments[t];
    var contentArr = s(["[igs] [" + Date.now() + "]"], e);
    console.info.apply(console, contentArr);
}
var $globalID = 0;
function newScheduleObj() {
    var obj = {
        uuid: ++$globalID,
    };
    cc.director.getScheduler().enableForTarget(obj);
    return obj;
}
var UserData = (function () {
    function UserData() {
        this.usingGameBundle = null;
        this.usingLanguage = "";
        this.load();
    }
    UserData.prototype.save = function () {
        cc.sys.localStorage.setItem(UserData.STORAGE_KEY, JSON.stringify(this.serialize()));
    };
    UserData.prototype.load = function () {
        var e = cc.sys.localStorage.getItem(UserData.STORAGE_KEY);
        try {
            var n = JSON.parse(e);
            this.parse(n);
        }
        catch (e) {
            this._initialize();
        }
    };
    UserData.prototype._initialize = function () {
    };
    UserData.prototype.serialize = function () {
        return {
            usingGameBundle: this.usingGameBundle,
            usingLanguage: this.usingLanguage,
        };
    };
    UserData.prototype.parse = function (e) {
        this.usingGameBundle = e.usingGameBundle || null;
        this.usingLanguage = e.usingLanguage || "zh";
    };
    UserData.STORAGE_KEY = "__igs_cookies__";
    return UserData;
}());
var igs;
(function (igs) {
    igs.log = $log;
    igs.blockUI = function (opt) {
        if (opt === void 0) { opt = function (node) { }; }
        BlockUI(opt);
    };
    igs.unBlockUI = function (opt) {
        if (opt === void 0) { opt = null; }
        BlockUI(opt, false);
    };
})(igs = exports.igs || (exports.igs = {}));
var _handles = {};
(function (igs) {
    function on(eventName, cb, target) {
        if (!_handles[eventName]) {
            _handles[eventName] = [];
        }
        var data = { func: cb, target: target };
        _handles[eventName].push(data);
    }
    igs.on = on;
    function off(eventName, cb, target) {
        var list = _handles[eventName];
        if (!list || list.length <= 0) {
            return;
        }
        for (var i = 0; i < list.length; i++) {
            var event_1 = list[i];
            if (event_1.func == cb && (!target || target == event_1.target)) {
                list.splice(i, 1);
                break;
            }
        }
    }
    igs.off = off;
    function once(eventName, cb, target) {
        if (!_handles[eventName]) {
            _handles[eventName] = [];
        }
        var data = { func: cb, target: target, once: true };
        _handles[eventName].push(data);
    }
    igs.once = once;
    function offTarget(target) {
        if (!target)
            return;
        for (var eventName in _handles) {
            _handles[eventName] = _handles[eventName].filter(function (item) { return item.target !== target; });
        }
    }
    igs.offTarget = offTarget;
    function emit(eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var list = _handles[eventName];
        if (!list || list.length <= 0) {
            return;
        }
        var len = list.length;
        for (var i = 0; i < len;) {
            var event_2 = list[i];
            if (!event_2)
                return;
            event_2.func.apply(event_2.target, args);
            event_2.once ? list.splice(i, 1) : i++;
        }
    }
    igs.emit = emit;
})(igs = exports.igs || (exports.igs = {}));
(function (igs) {
    var consts;
    (function (consts) {
        var Event;
        (function (Event) {
            Event["GET_ONLINE_PARAM"] = "get-online-param";
            Event["GET_ONLINE_PARAM_SUCCESS"] = "get-online-param-success";
            Event["GET_ONLINE_PARAM_FAIL"] = "get-online-param-fail";
            Event["CHECK_BUNDLE_INFO"] = "check-bundle-info";
            Event["CHECK_BUNDLE_SUCCESS"] = "check-bundle-success";
            Event["CHECK_REMOTE_UPDATE_FAIL"] = "check-remote-update-fail";
            Event["FORCE_UPDATE"] = "force-update";
            Event["SKIP_FORCE_UPDATE"] = "skip-force-update";
            Event["CONFIRM_UPDATE_BUNDLE"] = "confirm-update-bundle";
            Event["ENTER_MAIN"] = "enter-main";
            Event["ENTER_IGAOSHOU"] = "enter-igaoshou";
            Event["ENTER_GAME"] = "enter-game";
            Event["DOWNLOAD_MESSAGE"] = "download-message";
            Event["HOTUPDATE_DOWNLOAD"] = "hotupdate-download";
            Event["DOWNLOAD_PROGRESS"] = "download-progress";
            Event["HOTUPDATE_NEW_VERSION"] = "hotupdate-new-version";
            Event["HOTUPDATE_PROGRESS"] = "hotupdate-progress";
            Event["HOTUPDATE_NO"] = "hotupdate-no";
            Event["HOTUPDATE_OK"] = "hotupdate-ok";
            Event["BUNDLE_NOT_EXIST_EVERYWHERE"] = "bundle-not-exist-everywhere";
            Event["BUNDLE_DOWNLOAD_FAILED"] = "bundle-download-failed";
            Event["BUNDLE_LOAD_PROGRESS"] = "bundle-load-progress";
            Event["BUNDLE_BATCH_ONE_UPDATED_SUCCESS"] = "bundle-batch-one-update-success";
            Event["BUNDLE_BATCH_ONE_UPDATED_FAILED"] = "bundle-batch-one-update-failed";
            Event["BUNDLE_BATCH_ALL_DOWNLOAD_SUCCESS"] = "bundle-batch-all-download-success";
            Event["BUNDLE_BATCH_SOME_DOWNLOAD_FAILED"] = "bundle-batch-some-download-failed";
            Event["BUNDLE_BATCH_ALL_DOWNLOADINFO_SUCCESS"] = "bundle-batch-all-downloadinfo-success";
            Event["BUNDLE_BATCH_SOME_DOWNLOADINFO_FAILED"] = "bundle-batch-anyone-downloadinfo-failed";
            Event["BUNDLE_BATCH_ONE_LOAD_SUCCESS"] = "bundle-batch-one-load-success";
            Event["BUNDLE_BATCH_ONE_LOAD_FAILED"] = "bundle-batch-one-load-failed";
            Event["BUNDLE_BATCH_ALL_LOAD_SUCCESS"] = "bundle-batch-all-load-success";
            Event["BUNDLE_BATCH_SOME_LOAD_FAILED"] = "bundle-batch-some-load-failed";
            Event["IGS_NODE_SIZE_CHANGED"] = "igs-node-size-changed";
            Event["IGS_SAFEAREA_CHANGED"] = "igs-safearea-changed";
        })(Event = consts.Event || (consts.Event = {}));
        var ENV;
        (function (ENV) {
            ENV[ENV["ENV_PRODUCTION"] = 0] = "ENV_PRODUCTION";
            ENV[ENV["ENV_SANDBOX"] = 1] = "ENV_SANDBOX";
            ENV[ENV["ENV_ABROAD"] = 2] = "ENV_ABROAD";
        })(ENV = consts.ENV || (consts.ENV = {}));
    })(consts = igs.consts || (igs.consts = {}));
})(igs = exports.igs || (exports.igs = {}));
var TrackName;
(function (TrackName) {
    TrackName["IGS_ENTER_LOADING"] = "\u52A0\u8F7D-2.1\u8FDB\u5165loading\u754C\u9762";
    TrackName["IGS_GET_ONLINE_PARAM_START"] = "\u52A0\u8F7D-2.2\u83B7\u53D6\u5728\u7EBF\u53C2\u6570";
    TrackName["IGS_GET_ONLINE_PARAM_SUCCESS"] = "\u52A0\u8F7D-2.2.1\u83B7\u53D6\u5728\u7EBF\u53C2\u6570\u6210\u529F";
    TrackName["IGS_GET_ONLINE_PARAM_FAILED"] = "\u52A0\u8F7D-2.2.2\u83B7\u53D6\u5728\u7EBF\u53C2\u6570\u5931\u8D25";
    TrackName["IGS_GET_ONLINE_PARAM_RETRY"] = "\u52A0\u8F7D-2.2.3\u91CD\u8BD5\u83B7\u53D6\u5728\u7EBF\u53C2\u6570";
    TrackName["IGS_PRELOAD_BUNDLES"] = "\u52A0\u8F7D-2.3\u52A0\u8F7Digaoshou\u5B50\u5305\u548C\u6E38\u620F\u5B50\u5305";
    TrackName["IGS_PRELOAD_BUNDLES_SUCCESS_igaoshou"] = "\u52A0\u8F7D-2.3.1\u52A0\u8F7Digaoshou\u5B50\u5305\u6210\u529F";
    TrackName["IGS_PRELOAD_BUNDLES_FAILED_igaoshou"] = "\u52A0\u8F7D-2.3.2\u52A0\u8F7Digaoshou\u5B50\u5305\u5931\u8D25";
    TrackName["IGS_PRELOAD_BUNDLES_SUCCESS_game"] = "\u52A0\u8F7D-2.3.3\u52A0\u8F7D\u6E38\u620F\u5B50\u5305\u6210\u529F";
    TrackName["IGS_PRELOAD_BUNDLES_FAILED_game"] = "\u52A0\u8F7D-2.3.4\u52A0\u8F7D\u6E38\u620F\u5B50\u5305\u5931\u8D25";
    TrackName["IGS_LOBBY_LAUNCH"] = "\u52A0\u8F7D-2.5\u542F\u52A8\u5927\u5385";
    TrackName["IGS_GAME_GUIDE_ENTER_GAME"] = "\u9996\u5C40-4.1\u8FDB\u5165\u6E38\u620F-\u65B0\u624B\u5F15\u5BFC";
    TrackName["IGS_FIRST_ROUND_ENTER_GAME"] = "\u9996\u5C40-4.1\u8FDB\u5165\u6E38\u620F";
    TrackName["IGS_GAME_GUIDE_START"] = "\u9996\u5C40-4.2\u65B0\u624B\u5F15\u5BFC\u5F00\u59CB";
    TrackName["IGS_GAME_GUIDE_OVER"] = "\u9996\u5C40-4.3\u65B0\u624B\u5F15\u5BFC\u7ED3\u675F";
    TrackName["IGS_FIRST_ROUND"] = "\u9996\u5C40-4.4\u5F00\u59CB\u6E38\u620F";
    TrackName["IGS_FIRST_ROUND_REPORT_SCORE"] = "\u9996\u5C40-4.5\u63D0\u4EA4\u5206\u6570";
    TrackName["IGS_FIRST_ROUND_QUIT"] = "\u9996\u5C40-4.6\u9000\u51FA\u6E38\u620F";
    TrackName["IGS_NORMAL_ROUND_ENTER_GAME"] = "\u6B63\u5E38\u5C40-8.1\u8FDB\u5165\u6E38\u620F";
    TrackName["IGS_NORMAL_ROUND"] = "\u6B63\u5E38\u5C40-8.2\u5F00\u59CB\u6E38\u620F";
    TrackName["IGS_NORMAL_ROUND_REPORT_SCORE"] = "\u6B63\u5E38\u5C40-8.3\u63D0\u4EA4\u5206\u6570";
    TrackName["IGS_NORMAL_ROUND_QUIT"] = "\u6B63\u5E38\u5C40-8.4\u9000\u51FA\u6E38\u620F";
    TrackName["IGS_SHARE_ACTIVITY"] = "\u79C1\u5BC6\u5206\u4EAB";
    TrackName["IGS_SHARE_CAPTURE_SCREEN"] = "\u622A\u5C4F\u5206\u4EAB";
    TrackName["IGS_SHARE_CAPTURE_NODE"] = "\u8282\u70B9\u5206\u4EAB";
    TrackName["IGS_SHARE_COMMON"] = "\u666E\u901A\u5206\u4EAB";
})(TrackName || (TrackName = {}));
(function (igs) {
    var util;
    (function (util) {
        function CallStaticMethod(clsName, methodName, methodSig, params, callback) {
            $log("callStaticMethod clsName = ", clsName, " methodName = ", methodName, " methodSig = ", methodSig);
            if (!callback && typeof params === "function") {
                callback = params;
                params = {};
            }
            if (!CC_JSB) {
                callback && callback("no jsb", null);
                return;
            }
            try {
                methodSig && params.unshift(methodSig);
                $log("callStaticMethod.apply");
                var result = jsb.reflection.callStaticMethod.apply(jsb.reflection, [clsName, methodName].concat(params));
                return { err: null, result: result };
            }
            catch (error) {
                $log("callStaticMethod", JSON.stringify(error));
                return { err: error, result: null };
            }
        }
        util.CallStaticMethod = CallStaticMethod;
        function FormatTimeString(time, format) {
            if (!time)
                return "";
            if (typeof time === "number")
                time = Math.abs(time);
            var date = new Date(time);
            var year, month, day, hours, minutes, seconds;
            if (date.getTime() > 946656000000) {
                year = date.getFullYear();
                month = (date.getMonth() + 1);
                day = date.getDate();
                hours = date.getHours();
                minutes = date.getMinutes();
                seconds = date.getSeconds();
            }
            else {
                var d = date.getTime();
                year = Math.floor(d / 31536000000);
                month = Math.floor((d / 31536000000) % 2592000000);
                day = Math.floor((d % 2592000000) / 86400000);
                hours = Math.floor((d % 86400000) / 3600000);
                minutes = Math.floor((d % 3600000) / 60000);
                seconds = Math.floor((d % 60000) / 1000);
            }
            return (format || "yyyy-MM-dd hh:mm:ss")
                .replace("yyyy", "" + year)
                .replace("yy", ("" + year).slice(-2))
                .replace("MM", ("00" + month).slice(-2))
                .replace("M", "" + month)
                .replace("dd", ("00" + day).slice(-2))
                .replace("d", "" + day)
                .replace("hh", ("00" + hours).slice(-2))
                .replace("h", "" + hours)
                .replace("mm", ("00" + minutes).slice(-2))
                .replace("m", "" + minutes)
                .replace("ss", ("00" + seconds).slice(-2))
                .replace("s", "" + seconds);
        }
        util.FormatTimeString = FormatTimeString;
        function FormatNumKMBT(num) {
            var strNum = "" + num;
            var len = strNum.length;
            var head = parseInt(strNum.substr(0, 3));
            var point = len % 3;
            point = point === 0 ? 3 : point;
            var strHead = "" + head / Math.pow(10, (3 - point));
            if (len / 3 > 4)
                return strHead + "t";
            else if (len / 3 > 3)
                return strHead + "b";
            else if (len / 3 > 2)
                return strHead + "m";
            else if (len / 3 > 1)
                return strHead + "k";
            return strNum;
        }
        util.FormatNumKMBT = FormatNumKMBT;
        function FormatNumWY(num) {
            var strNum = "" + num;
            var len = strNum.length;
            var head = parseInt(strNum.substr(0, 4));
            var point = len % 4;
            point = point === 0 ? 4 : point;
            var strHead = "" + head / Math.pow(10, (4 - point));
            if (len / 4 > 2)
                return strHead + "e";
            else if (len / 4 > 1)
                return strHead + "w";
            return strNum;
        }
        util.FormatNumWY = FormatNumWY;
        function FormatNumQWY(num) {
            var strNum = "" + num;
            var len = strNum.length;
            var head = parseInt(strNum.substr(0, 4));
            var point = len % 4;
            point = point === 0 ? 4 : point;
            var strHead = "" + head / Math.pow(10, (4 - point));
            if (len / 4 > 2)
                return strHead + "e";
            else if (len / 4 > 1)
                return strHead + "w";
            return strNum;
        }
        util.FormatNumQWY = FormatNumQWY;
        function FormatNumPrice(num) {
            if (num >= 10000) {
                return FormatNumWY(num);
            }
            else {
                return ("" + num.toFixed(2));
            }
        }
        util.FormatNumPrice = FormatNumPrice;
        function FormatNumSplit(num) {
            var strNum = "" + Math.abs(num);
            var len = strNum.length;
            var newStr = strNum.substr(-3);
            for (var i = 1; i < len / 3; i++) {
                newStr = strNum.substring(Math.max(len - (i + 1) * 3, 0), len - i * 3) + "," + newStr;
            }
            if (num < 0) {
                newStr = "-" + newStr;
            }
            return newStr;
        }
        util.FormatNumSplit = FormatNumSplit;
        function GetURI(key) {
            var search = window.location.search || "";
            var args = {};
            if (search.indexOf('?') != -1) {
                var query = search.substr(1);
                var pairs = query.split('&');
                for (var i = 0; i < pairs.length; i++) {
                    var sp = pairs[i].split('=');
                    args[sp[0]] = decodeURIComponent(sp[1]);
                }
            }
            return args[key];
        }
        util.GetURI = GetURI;
        function UUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        util.UUID = UUID;
        function sign(param, userToken) {
            var now = Math.floor(Date.now() / 1000);
            var ts = now + "";
            var ns = Math.random() + "";
            var keys = [];
            for (var k in param) {
                keys.push(k);
            }
            keys.sort(function (a, b) {
                for (var i in a) {
                    if (a[i] && b[i]) {
                        var k1 = a[i].charCodeAt(0);
                        var k2 = b[i].charCodeAt(0);
                        if (k1 < k2)
                            return -1;
                        else if (k1 > k2)
                            return 1;
                    }
                    else if (a[i] && !b[i]) {
                        return 1;
                    }
                    else if (!a[i] && b[i]) {
                        return -1;
                    }
                }
            });
            var str = "";
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var k = keys_1[_i];
                if (param[k])
                    str += k + "=" + param[k] + "&";
            }
            str = str.substr(0, str.length - 1);
            str = ts + "\n" + ns + "\n" + str + "\n";
            var sign = "";
            var cryptoJs = window["CryptoJS"];
            if (cryptoJs) {
                sign = cryptoJs.HmacSHA256(str, userToken).toString();
            }
            var authorization = {
                ts: ts,
                ns: ns,
                sign: sign,
            };
            return JSON.stringify(authorization);
        }
        util.sign = sign;
        function ParseJson(json) {
            try {
                var msg = JSON.parse(json);
                return msg;
            }
            catch (_a) {
            }
            return json;
        }
        util.ParseJson = ParseJson;
        function CSVToArray(strData, strDelimiter) {
            strDelimiter = (strDelimiter || ",");
            var objPattern = new RegExp(("(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
            var arrData = [[]];
            var arrMatches = null;
            while (arrMatches = objPattern.exec(strData)) {
                var strMatchedDelimiter = arrMatches[1];
                if (strMatchedDelimiter.length &&
                    (strMatchedDelimiter != strDelimiter)) {
                    arrData.push([]);
                }
                if (arrMatches[2]) {
                    var strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
                }
                else {
                    var strMatchedValue = arrMatches[3];
                }
                arrData[arrData.length - 1].push(strMatchedValue);
            }
            if (arrData.length > 0) {
                arrData.pop();
            }
            return arrData;
        }
        util.CSVToArray = CSVToArray;
        function isNative() {
            if (cc.sys.isNative && cc.sys.OPPO_GAME != cc.sys.platform && cc.sys.VIVO_GAME != cc.sys.platform) {
                return true;
            }
            return false;
        }
        util.isNative = isNative;
        function dateFormat(fmt, date) {
            var ret;
            var opt = {
                "Y+": date.getFullYear().toString(),
                "M+": (date.getMonth() + 1).toString(),
                "d+": date.getDate().toString(),
                "H+": date.getHours().toString(),
                "m+": date.getMinutes().toString(),
                "s+": date.getSeconds().toString(),
                "S": date.getMilliseconds()
            };
            for (var k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
                }
                ;
            }
            ;
            return fmt;
        }
        util.dateFormat = dateFormat;
        function trace(count) {
            var caller = arguments.callee.caller;
            var i = 0;
            count = count || 5;
            $log("***-----------------------  **" + (i + 1));
            while (caller && i < count) {
                $log(caller.toString());
                caller = caller.caller;
                i++;
                $log("***-----------------------  **" + (i + 1));
            }
        }
        util.trace = trace;
        function printStack() {
            try {
                throw new Error();
            }
            catch (e) {
                $error(e.stack);
                return e.stack || "";
            }
        }
        util.printStack = printStack;
        function compareVersion(vl, vr) {
            var v1 = vl.split('.');
            var v2 = vr.split('.');
            var len = Math.max(v1.length, v2.length);
            while (v1.length < len) {
                v1.push('0');
            }
            while (v2.length < len) {
                v2.push('0');
            }
            for (var i = 0; i < len; i++) {
                var num1 = parseInt(v1[i]);
                var num2 = parseInt(v2[i]);
                if (num1 > num2) {
                    return 1;
                }
                else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }
        util.compareVersion = compareVersion;
        function getFixString(str, len) {
            if (!str || len < 0 || typeof str != "string") {
                return "";
            }
            var _tmpLength = 0;
            for (var i = 0; i < str.length; i++) {
                if (/[\u0000-\u00ff]/g.test(str.charAt(i))) {
                    _tmpLength += .6;
                }
                else if (/[\u4e00-\u9fa5]/g.test(str.charAt(i))) {
                    _tmpLength += 1;
                }
                else if (/[\uff00-\uffff]/g.test(str.charAt(i))) {
                    _tmpLength += 1;
                }
                else {
                    _tmpLength += 1;
                }
                if (_tmpLength > len) {
                    str = str.slice(0, i - 1) + "...";
                    break;
                }
            }
            return str;
        }
        util.getFixString = getFixString;
    })(util = igs.util || (igs.util = {}));
})(igs = exports.igs || (exports.igs = {}));
function _formatUrl(url) {
    var ret = /^(https?:\/\/)(.*)/.exec(url);
    var protocol = "";
    if (ret) {
        protocol = ret[1];
        url = ret[2];
    }
    return "https://" + url;
}
function _linkParam(url, params) {
    var reg = new RegExp("\"", "g");
    if (url.indexOf("?") == -1) {
        url = url + "?";
        for (var key in params) {
            if (typeof params[key] === "string" || typeof params[key] === "number" || typeof params[key] === "boolean") {
                url = url + key + "=" + encodeURIComponent(params[key]) + "&";
            }
            else if (typeof params[key] === "object") {
                url = url + key + "=" + JSON.stringify(params[key]).replace(reg, "\\\"") + "&";
            }
        }
        url = url.substr(0, url.length - 1);
    }
    else {
        for (var key in (params || {})) {
            if (typeof params[key] === "string" || typeof params[key] === "number" || typeof params[key] === "boolean") {
                url = url.replace('{' + key + '}', encodeURIComponent(params[key]));
            }
            else if (typeof params[key] === "object") {
                url = url.replace('{' + key + '}', JSON.stringify(params[key]).replace(reg, "\\\""));
            }
        }
    }
    url = _formatUrl(url);
    if (cc.sys.platform != cc.sys.WECHAT_GAME && window['_agencyAddress']) {
        url = window['_agencyAddress'] + encodeURI(url);
    }
    $log("url:", url);
    return url;
}
var SchedulerObj = (function (_super) {
    __extends(SchedulerObj, _super);
    function SchedulerObj() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timerId = 0;
        _this.updateCallbacks = [];
        _this.updateCallbackItem = null;
        _this.delayCallbacks = [];
        _this.delayCallbackItem = null;
        return _this;
    }
    SchedulerObj.prototype.getTimerId = function () {
        return ++this.timerId;
    };
    SchedulerObj.prototype.addUpdateCallback = function (target, callback) {
        cc.isValid(target) ? this.updateCallbacks.push({
            target: target,
            callback: callback,
            cancel: false
        }) : $warn(SchedulerObj.TAG, "target is invalid");
    };
    SchedulerObj.prototype.removeUpdateCallback = function (target, callback) {
        for (var l = this.updateCallbacks.length - 1; l >= 0; l--) {
            if (callback) {
                if (this.updateCallbacks[l].target === target && this.updateCallbacks[l].callback === callback) {
                    this.updateCallbacks[l].cancel = true;
                    break;
                }
            }
            else {
                this.updateCallbacks[l].target === target && (this.updateCallbacks[l].cancel = true);
            }
        }
    };
    SchedulerObj.prototype.addDelayCallback = function (target, callback, delay) {
        var id = this.getTimerId();
        this.delayCallbacks.push({
            target: target,
            callback: callback,
            delay: delay,
            timerId: id,
            cancel: false
        });
        return id;
    };
    SchedulerObj.prototype.removeDelayCallback = function (target) {
        for (var i = 0, l = this.delayCallbacks.length; i < l; i++) {
            if (this.delayCallbacks[i].timerId === target) {
                this.delayCallbacks[i].cancel = true;
                break;
            }
        }
    };
    SchedulerObj.prototype.removeAllDelayCallback = function () {
        for (var i = 0, l = this.delayCallbacks.length; i < l; i++) {
            this.delayCallbacks[i].cancel = true;
        }
    };
    SchedulerObj.prototype.update = function (dt) {
        for (var l = this.updateCallbacks.length, i = l - 1; i >= 0; i--) {
            this.updateCallbackItem = this.updateCallbacks[i];
            this.updateCallbackItem.cancel ? this.updateCallbacks.splice(i, 1) : this.updateCallbackItem.callback.call(this.updateCallbackItem.target, dt);
        }
        this.updateCallbackItem = null;
        for (var l = this.delayCallbacks.length, i = l - 1; i >= 0; i--) {
            this.delayCallbackItem = this.delayCallbacks[i];
            this.delayCallbackItem.delay -= dt * 1000;
            if (this.delayCallbackItem.cancel) {
                this.delayCallbacks.splice(i, 1);
            }
            else if (this.delayCallbackItem.delay <= 0) {
                if (this.delayCallbackItem.target) {
                    this.delayCallbackItem.callback.call(this.delayCallbackItem.target);
                }
                else {
                    this.delayCallbackItem.callback();
                }
                this.delayCallbacks.splice(i, 1);
            }
        }
        this.delayCallbackItem = null;
    };
    SchedulerObj.TAG = "SchedulerObj";
    return SchedulerObj;
}(cc.Component));
var SchedulerManager = (function (_super) {
    __extends(SchedulerManager, _super);
    function SchedulerManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TAG = "SchedulerManager";
        _this.cancelAllDelayCallback = function () {
            var obj = $igsNode.getComponent(SchedulerObj);
            obj && obj.removeAllDelayCallback();
        };
        return _this;
    }
    Object.defineProperty(SchedulerManager, "instance", {
        get: function () {
            if (this._instance == null) {
                this._instance = new SchedulerManager();
                if (cc.isValid($igsNode)) {
                    $igsNode.addComponent(SchedulerObj);
                }
            }
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    SchedulerManager.prototype.setTimer = function (callback, target, interval, repeat, delay) {
        repeat = repeat >= 0 ? repeat : cc.macro.REPEAT_FOREVER;
        delay = delay || 0;
        var sche = cc.director.getScheduler();
        if (target == null) {
            target = $igsNode;
            $warn("target is null");
        }
        sche.schedule(callback, target, interval, repeat, delay, false);
    };
    SchedulerManager.prototype.cancelTimer = function (target, callback) {
        cc.isValid(target) || (target = $igsNode);
        cc.director.getScheduler().unschedule(callback, target);
    };
    SchedulerManager.prototype.cancelAllForTarget = function (target) {
        cc.director.getScheduler().unscheduleAllForTarget(target);
    };
    SchedulerManager.prototype.setUpdate = function (callback, target) {
        var obj = $igsNode.getComponent(SchedulerObj);
        obj && obj.addUpdateCallback(target, callback);
    };
    SchedulerManager.prototype.cancelUpdate = function (target, callback) {
        var obj = $igsNode.getComponent(SchedulerObj);
        obj && obj.removeUpdateCallback(target, callback);
    };
    SchedulerManager.prototype.delayCallback = function (callback, target, delay) {
        delay = delay || 0;
        var obj = $igsNode.getComponent(SchedulerObj);
        return obj ? obj.addDelayCallback(target, callback, delay) : -1;
    };
    SchedulerManager.prototype.cancelDelayCallback = function (target) {
        var obj = $igsNode.getComponent(SchedulerObj);
        obj && obj.removeDelayCallback(target);
    };
    SchedulerManager._instance = null;
    return SchedulerManager;
}(cc.Object));
var BaseObject = (function (_super) {
    __extends(BaseObject, _super);
    function BaseObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.TAG = "BaseObject";
        _this._timer = [];
        _this._id = "";
        _this.addEventListener = function (name, callback, target) {
            undefined === target && (target = null), (this.__listeners = this.__listeners || new cc.EventTarget()).on(name, callback, target);
        };
        _this.hasEventListener = function (name, callback, target) {
            undefined === target && (target = null), (this.__listeners = this.__listeners || new cc.EventTarget()).hasEventListener(name);
        };
        _this.dispatchEvent = function (name, arg1, arg2, arg3, arg4, arg5) {
            (this.__listeners = this.__listeners || new cc.EventTarget()).emit(name, arg1, arg2, arg3, arg4, arg5);
        };
        _this.removeEventListener = function (name, callback, target) {
            undefined === callback && (callback = null), undefined === target && (target = null), (this.__listeners = this.__listeners || new cc.EventTarget()).off(name, callback, target);
        };
        return _this;
    }
    BaseObject.prototype.delayCallback = function (callback, target, delay) {
        var timerId = SchedulerManager.instance.delayCallback(callback, target, delay);
        this._timer.push(timerId);
        return timerId;
    };
    BaseObject.prototype.cancelDelayCallback = function (target) {
        SchedulerManager.instance.cancelDelayCallback(target);
    };
    BaseObject.prototype.destroy = function () {
        for (var t = 0, n = this._timer.length; t < n; t++) {
            SchedulerManager.instance.cancelDelayCallback(this._timer[t]);
        }
        this._timer.length = 0;
        return _super.prototype.destroy.call(this);
    };
    return BaseObject;
}(cc.Object));
var AssetCache = (function (_super) {
    __extends(AssetCache, _super);
    function AssetCache() {
        var _this = _super.call(this) || this;
        _this.nodeAssetMap = new Map;
        return _this;
    }
    AssetCache.prototype.cacheNode = function (inst, asset) {
        if (asset instanceof cc.Prefab) {
            this.nodeAssetMap.set(inst, asset);
            asset.addRef();
        }
    };
    AssetCache.prototype.releaseNode = function (inst) {
        if (inst && this.nodeAssetMap.has(inst)) {
            var asset = this.nodeAssetMap.get(inst);
            this.nodeAssetMap.delete(inst);
            asset.decRef();
        }
    };
    return AssetCache;
}(BaseObject));
var assetManager = (function (_super) {
    __extends(assetManager, _super);
    function assetManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.assetCache = null;
        return _this;
    }
    assetManager.instance = function () {
        if (this.inst == null) {
            this.inst = new assetManager;
            this.inst.assetCache = new AssetCache;
        }
        return this.inst;
    };
    assetManager.prototype.releaseNode = function (inst) {
        this.assetCache.releaseNode(inst);
    };
    assetManager.inst = null;
    return assetManager;
}(BaseObject));
assetManager.instance();
(function (igs) {
    igs.assetMgr = assetManager.instance();
})(igs = exports.igs || (exports.igs = {}));
var InternalTools = (function () {
    function InternalTools() {
        this.cacheDir = "";
    }
    InternalTools.prototype.removeCacheDir = function (path) {
        if (CC_JSB) {
            this.cacheDir = this.cacheDir || ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "bundles/assets/");
            var ret = jsb.fileUtils.removeDirectory(this.cacheDir + path);
            $log("removeDir ".concat(this.cacheDir + path, " ").concat(ret));
        }
    };
    InternalTools.prototype.clearUpdateDirs = function (bundleNames) {
        if (CC_JSB) {
            for (var _i = 0, bundleNames_1 = bundleNames; _i < bundleNames_1.length; _i++) {
                var i = bundleNames_1[_i];
                this.removeCacheDir(i);
            }
        }
    };
    InternalTools.prototype.clearUpdateCache = function (bundleNames) {
        if (CC_JSB) {
            for (var _i = 0, bundleNames_2 = bundleNames; _i < bundleNames_2.length; _i++) {
                var i = bundleNames_2[_i];
                this.removeCacheDir(i + "_temp");
            }
        }
    };
    InternalTools.prototype.fixGameCache = function () {
        cc.assetManager.cacheManager.clearCache();
    };
    return InternalTools;
}());
var $tools = new InternalTools();
var BooterWrapper = (function () {
    function BooterWrapper() {
    }
    return BooterWrapper;
}());
var Global = (function () {
    function Global() {
        this.inited = false;
        this.bundleConfig = new Map();
        this.pluginConfig = {};
        this.exportConfig = {};
        this.onlineParam = {};
        this.lobbyConfig = { config: { match_detail: "" } };
        this.booter = new Map();
        this.cookie = new UserData();
    }
    Global.prototype.registerBooter = function (name, booterClass) {
        $log("registerBooter", name);
        var bt = new BooterWrapper();
        bt.booter = new booterClass;
        this.booter.set(name, bt);
    };
    Global.prototype.getBooter = function (name) {
        var bt = this.booter.get(name);
        if (!bt) {
            $error("bundle ".concat(name, " DO NOT registerBooter first"));
        }
        return bt.booter;
    };
    Global.prototype.bootBundle = function (config, initparams, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var boot, bundle;
            var _this = this;
            return __generator(this, function (_a) {
                $log("bootBundle", config.bundle);
                cb || (cb = function (bt, params) { });
                boot = function () {
                    var bt = _this.getBooter(config.bundle);
                    bt.init(config, initparams, cb);
                    if (config.bundle.indexOf("igaoshou") !== 0) {
                        _this.cookie.usingGameBundle = config;
                        _this.cookie.save();
                    }
                };
                bundle = cc.assetManager.getBundle(config.bundle);
                if (!bundle) {
                    new Promise(function (rlv, rej) {
                        $bundleMgr.updateBundles([new igs.bundle.BundleConfig(config.bundle, config.bundle, 1, igs.consts.Event.ENTER_GAME, false, false)], {
                            onOneLoadSuccess: function (uds) {
                                igs.log("==getBooter==", uds.bundleName);
                            },
                            onOneLoadFailed: function (uds) {
                                igs.log("==getBooter==", uds.bundleName);
                            },
                            onCheckRemoteUpdateFailed: function (bundles) {
                                igs.log("==getBooter==", bundles.length);
                            },
                            onOneDownloadInfoFailed: function (ud) {
                                igs.log("==getBooter==", ud.bundleName);
                            },
                            onOneDownloadInfoSuccess: function (ud) {
                                igs.log("==getBooter==", ud.bundleName, ud.totalToDownloadBytesCount);
                            },
                            onOneDownloadSuccess: function (ud) {
                                igs.log("==getBooter==", ud.bundleName, ud.totalToDownloadBytesCount, ud.downloadedByteCount);
                            },
                            onDownloadProgress: function (data) {
                                igs.log("==getBooter==", data.bundleName, data.downloadedByteCount, data.totalToDownloadBytesCount);
                            },
                            onAllDownloadInfoSuccess: function (uds) {
                                var _this = this;
                                igs.log("==getBooter onAllDownloadInfoSuccess==");
                                uds.forEach(function (ud) {
                                    $log("detail: ", ud.totalToDownloadBytesCount, ud.bundleName);
                                    _this.totalBytes += ud.totalToDownloadBytesCount;
                                });
                                $log("total bytes", this.totalBytes);
                            },
                            onSomeDownloadInfoFailed: function (uds) {
                                $log("==getBooter onSomeDownloadInfoFailed==", uds.length);
                            },
                            onAllDownloadSuccess: function (uds) {
                                $log("==getBooter onAllDownloadSuccess==");
                                uds.forEach(function (ud) {
                                    $log("detail: ", ud.totalToDownloadBytesCount, ud.downloadedByteCount, ud.bundleName);
                                });
                            },
                            onSomeDownloadFailed: function (uds) {
                                $log("==getBooter onSomeDownloadFailed==");
                            },
                            onAllLoadSuccess: function (uds) {
                                $log("==getBooter onAllLoadSuccess==", uds.length);
                                uds.forEach(function (ud) {
                                    $log("detail: ", ud.bundleName);
                                });
                                rlv(uds);
                            },
                            onSomeLoadFailed: function (uds) {
                                $log("==getBooter onSomeLoadFailed==", uds.length);
                                for (var _i = 0, uds_1 = uds; _i < uds_1.length; _i++) {
                                    var i = uds_1[_i];
                                    $log("load failed detail", i.ret, i.downloadedByteCount, i.totalToDownloadBytesCount, i.bundleDir, i.bundleName, i.newVersion, i.oldVersion);
                                }
                                rej(uds);
                            },
                            onLoadProgress: function (uptData) {
                                $log("==getBooter onLoadProgress==");
                            }
                        });
                    }).then(function () {
                        boot();
                    });
                }
                else {
                    boot();
                }
                return [2];
            });
        });
    };
    Global.prototype.setBundleConfig = function (bundleName, jsonObj) {
        var conf = this.bundleConfig.get(bundleName);
        if (!conf) {
            this.bundleConfig.set(bundleName, jsonObj);
        }
    };
    Global.prototype.setConfig = function (jsonObj) {
        this.pluginConfig = jsonObj;
        var env = cc.sys.localStorage.getItem("iGaoShouData32");
        if (CC_JSB) {
            env && (this.pluginConfig["config"]["env"] = env);
            this.pluginConfig["config"]["platId"] = Number(this.pluginConfig["config"]["platId"]);
            completeAssign(this.exportConfig, this.pluginConfig["config"]);
            this.exportConfig["pn"] = this.exportConfig["channelname"];
        }
        else {
            env && (this.pluginConfig["env"] = env);
            this.pluginConfig["platId"] = Number(this.pluginConfig["platId"]);
            completeAssign(this.exportConfig, this.pluginConfig);
        }
    };
    Global.prototype.onInit = function () {
    };
    Object.defineProperty(Global.prototype, "pn", {
        get: function () {
            if (CC_JSB) {
                return this.pluginConfig["config"]["channelname"];
            }
            else {
                return this.pluginConfig["pn"];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "gameId", {
        get: function () {
            if (CC_JSB) {
                return this.pluginConfig["config"]["gameId"];
            }
            else {
                return this.pluginConfig["gameId"];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "platId", {
        get: function () {
            if (CC_JSB) {
                return this.pluginConfig["config"]["platId"];
            }
            else {
                return this.pluginConfig["platId"];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "env", {
        get: function () {
            if (CC_JSB) {
                return this.pluginConfig["config"]["env"];
            }
            else {
                return this.pluginConfig["env"];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "lan", {
        get: function () {
            if (CC_JSB) {
                return this.pluginConfig["config"]["defLang"];
            }
            else {
                return this.pluginConfig["defLang"];
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "lobbyConfigStatic", {
        get: function () {
            if (CC_JSB) {
                return this.pluginConfig["config"]["match_detail"] || "[]";
            }
            else {
                return this.pluginConfig["match_detail"] || "[]";
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Global.prototype, "onlineParamSyncWait", {
        get: function () {
            if (CC_JSB) {
                return true;
            }
            else {
                return this.pluginConfig["onlineParamSyncWait"] || false;
            }
        },
        enumerable: false,
        configurable: true
    });
    Global.prototype.onConfigJsonLoadFinish = function () {
        var thiz = this;
        var lobbyConfigStatic = $global.lobbyConfigStatic;
        $global.lobbyConfig['config']['match_detail'] = lobbyConfigStatic;
        $log("lobbyConfigStatic", $global.lobbyConfig);
        if (window['i18n']) {
            window['i18n']['curLang'] = $global.cookie.usingLanguage || (function () {
                var lan = thiz.lan;
                if (!lan) {
                    lan = cc.sys.language;
                    if (cc.sys.language === 'zh') {
                        lan = 'zh';
                    }
                    else {
                        lan = 'en';
                    }
                    $log("use lang with system lang");
                }
                else {
                    $log("use lang with config.json lang");
                }
                $global.cookie.usingLanguage = lan;
                $global.cookie.save();
                return lan;
            })();
            $log("igs init i18n", window['i18n']['curLang']);
        }
    };
    return Global;
}());
var $global = new Global();
(function (igs) {
    var ModelBase = (function (_super) {
        __extends(ModelBase, _super);
        function ModelBase() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.observers = new Map();
            return _this;
        }
        ModelBase.prototype.init = function () { };
        ModelBase.prototype.addObserver = function (id, callback, target) {
            "number" == typeof id && (id = [id]);
            for (var r = 0; r < id.length; r++) {
                this.observers.has(id[r]) || this.observers.set(id[r], []);
                this.observers.get(id[r]).push({
                    callback: callback,
                    target: target
                });
            }
        };
        ModelBase.prototype.removeObserver = function (target, id) {
            var n = this;
            if (id) {
                if (this.observers.has(id)) {
                    for (var r = this.observers.get(id), o = 0; o < r.length; o++) {
                        if (r[o].target == target) {
                            r.splice(o, 1);
                            break;
                        }
                    }
                    0 == r.length && this.observers.delete(target);
                }
            }
            else
                this.observers.forEach(function (t, r) {
                    for (var o = t.length - 1; o >= 0; o--) {
                        t[o].target === target && t.splice(o, 1);
                    }
                    0 == t.length && n.observers.delete(r);
                });
        };
        ModelBase.prototype.notifyAllObserversByName = function (id, t, n) {
            if (this.observers.has(id))
                for (var r = this.observers.get(id), o = 0; o < r.length; o++) {
                    var i = r[o];
                    i.callback.call(i.target, t, n, id);
                }
        };
        ModelBase.prototype.destroy = function () {
            var t = this;
            this.observers.forEach(function (e, n) {
                for (var r = e.length - 1; r >= 0; r--) {
                    e.splice(r, 1);
                }
                0 == e.length && t.observers.delete(n);
            });
            return _super.prototype.destroy.call(this);
        };
        ModelBase.TAG = "ModelBase";
        return ModelBase;
    }(BaseObject));
    igs.ModelBase = ModelBase;
    var ModelManager = (function (_super) {
        __extends(ModelManager, _super);
        function ModelManager() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.models = new Map();
            return _this;
        }
        Object.defineProperty(ModelManager, "instance", {
            get: function () {
                if (this._instance == null) {
                    this._instance = new ModelManager;
                }
                return this._instance;
            },
            enumerable: false,
            configurable: true
        });
        ModelManager.prototype.hasRegisterModel = function (m) {
            return this.models.has(m);
        };
        ModelManager.prototype.registerModel = function (m, arg) {
            if (this.models.has(m)) {
                var o = this.getModel(m);
                $error(this.TAG, o.TAG + "模块已经注册，请勿重复注册!");
            }
            else {
                var o = new m();
                o.init();
                this.models.set(m, o);
            }
        };
        ModelManager.prototype.getModel = function (m) {
            if (!this.models.has(m)) {
                this.registerModel(m);
            }
            return this.models.get(m);
        };
        ModelManager.prototype.destroyModel = function (m) {
            if (this.models.has(m)) {
                var t = this.models.get(m);
                t.destroy();
                this.models.delete(m);
            }
        };
        ModelManager.TAG = "ModelManager";
        ModelManager._instance = null;
        return ModelManager;
    }(BaseObject));
    igs.ModelManager = ModelManager;
})(igs = exports.igs || (exports.igs = {}));
var $i18n = {};
(function () {
    if (!window['i18n']) {
        var supportLanguage = ['zh', 'en', 'tw'];
        var languageDataSourceList_1 = {};
        var languageDataMap_1 = {};
        for (var _i = 0, supportLanguage_1 = supportLanguage; _i < supportLanguage_1.length; _i++) {
            var i = supportLanguage_1[_i];
            languageDataMap_1[i] = {};
        }
        $log("igs init i18n");
        window['i18n'] = {
            curLang: ''
        };
        Object.defineProperty(window['i18n'], "languages", {
            configurable: false,
            enumerable: true,
            set: function () {
            },
            get: function () {
                return languageDataSourceList_1;
            }
        });
        var _loop_1 = function (lan) {
            $log("supportLanguage=", lan);
            Object.defineProperty(languageDataSourceList_1, lan, {
                configurable: false,
                enumerable: true,
                set: function (value) {
                    for (var i in value) {
                        if (languageDataMap_1[lan][i]) {
                            console.warn("key ".concat(i, " already exist, rewrite this key!"));
                        }
                        languageDataMap_1[lan][i] = value[i];
                    }
                },
                get: function () {
                    return languageDataMap_1[lan];
                }
            });
        };
        for (var _a = 0, supportLanguage_2 = supportLanguage; _a < supportLanguage_2.length; _a++) {
            var lan = supportLanguage_2[_a];
            _loop_1(lan);
        }
        window['i18n']['dump'] = function () {
            $log("==i18n dump==start");
            for (var i in languageDataSourceList_1) {
                $log(i, JSON.stringify(languageDataSourceList_1[i]));
            }
            $log("==i18n dump==end");
        };
    }
})();
(function (igs) {
    var hotUpdate;
    (function (hotUpdate) {
        var HotUpdateCode;
        (function (HotUpdateCode) {
            HotUpdateCode[HotUpdateCode["INIT"] = -1] = "INIT";
            HotUpdateCode[HotUpdateCode["NEW_VERSION_FOUND"] = 0] = "NEW_VERSION_FOUND";
            HotUpdateCode[HotUpdateCode["ALREADY_UP_TO_DATE"] = 1] = "ALREADY_UP_TO_DATE";
            HotUpdateCode[HotUpdateCode["LOCAL_MANIFEST_NOT_FOUND"] = 2] = "LOCAL_MANIFEST_NOT_FOUND";
            HotUpdateCode[HotUpdateCode["PARSE_LOCAL_MANIFEST_FAILED"] = 3] = "PARSE_LOCAL_MANIFEST_FAILED";
            HotUpdateCode[HotUpdateCode["DOWNLOADING_ASSETS"] = 4] = "DOWNLOADING_ASSETS";
            HotUpdateCode[HotUpdateCode["UPDATE_FINISHED"] = 5] = "UPDATE_FINISHED";
            HotUpdateCode[HotUpdateCode["BUNDLE_NOT_EXIST_EVERYWHERE"] = 6] = "BUNDLE_NOT_EXIST_EVERYWHERE";
            HotUpdateCode[HotUpdateCode["USE_LOCAL_BUNDLE"] = 7] = "USE_LOCAL_BUNDLE";
            HotUpdateCode[HotUpdateCode["UPDATE_FINISHED_NOTHING"] = 8] = "UPDATE_FINISHED_NOTHING";
            HotUpdateCode[HotUpdateCode["UPDATE_FAILED"] = 9] = "UPDATE_FAILED";
            HotUpdateCode[HotUpdateCode["BUNDLE_LOAD_SUCCESS"] = 100] = "BUNDLE_LOAD_SUCCESS";
            HotUpdateCode[HotUpdateCode["BUNDLE_LOAD_FAILED"] = 101] = "BUNDLE_LOAD_FAILED";
            HotUpdateCode[HotUpdateCode["BUNDLE_LOADING"] = 102] = "BUNDLE_LOADING";
        })(HotUpdateCode = hotUpdate.HotUpdateCode || (hotUpdate.HotUpdateCode = {}));
        var UpdateData = (function () {
            function UpdateData(ret, bundleName) {
                this._bundleName = "";
                this._bundleDir = "";
                this._newVersion = "";
                this._oldVersion = "";
                this._totalToDownloadFiles = 0;
                this._totalToDownloadBytesCount = 0;
                this._downloadedByteCount = 0;
                this._downloadedFiles = 0;
                this._remoteInfo = { url: "https://", versionCode: 0, zipSize: 0 };
                this.ret = ret;
                this.bundleName = bundleName;
            }
            Object.defineProperty(UpdateData.prototype, "ret", {
                get: function () {
                    return this._ret;
                },
                set: function (v) {
                    this._ret = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "bundleName", {
                get: function () {
                    return this._bundleName;
                },
                set: function (v) {
                    this._bundleName = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "bundleDir", {
                get: function () {
                    return this._bundleDir;
                },
                set: function (v) {
                    this._bundleDir = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "newVersion", {
                get: function () {
                    return this._newVersion;
                },
                set: function (v) {
                    this._newVersion = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "oldVersion", {
                get: function () {
                    return this._oldVersion;
                },
                set: function (v) {
                    this._oldVersion = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "totalToDownloadFiles", {
                get: function () {
                    return this._totalToDownloadFiles;
                },
                set: function (v) {
                    this._totalToDownloadFiles = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "totalToDownloadBytesCount", {
                get: function () {
                    return this._totalToDownloadBytesCount;
                },
                set: function (v) {
                    this._totalToDownloadBytesCount = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "downloadedByteCount", {
                get: function () {
                    return this._downloadedByteCount;
                },
                set: function (v) {
                    this._downloadedByteCount = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "downloadedFiles", {
                get: function () {
                    return this._downloadedFiles;
                },
                set: function (v) {
                    this._downloadedFiles = v;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(UpdateData.prototype, "remoteInfo", {
                get: function () {
                    return this._remoteInfo;
                },
                set: function (v) {
                    this._remoteInfo = v;
                },
                enumerable: false,
                configurable: true
            });
            return UpdateData;
        }());
        hotUpdate.UpdateData = UpdateData;
    })(hotUpdate = igs.hotUpdate || (igs.hotUpdate = {}));
})(igs = exports.igs || (exports.igs = {}));
var AssetsManagerWrapper = (function () {
    function AssetsManagerWrapper() {
        this.am = null;
        this.cb = null;
        this.updateData = null;
        this.downloadNothing = true;
        this.hasFileNotExist = false;
        this.configJsonMd5Cache = "";
        this.useDummy = false;
    }
    AssetsManagerWrapper.prototype.reset = function () {
        this.downloadNothing = true;
        this.hasFileNotExist = false;
    };
    return AssetsManagerWrapper;
}());
var HotUpdate = (function () {
    function HotUpdate() {
    }
    HotUpdate.prototype.checkUpdate = function (info, callback) {
        var bundleName = info.bundleName;
        var remoteHost = info.remoteInfo.url;
        var remoteVersionCode = info.remoteInfo.versionCode;
        $log("==checkUpdate==", bundleName, remoteHost, remoteVersionCode, info.remoteInfo.zipSize);
        var localManifestPath = "manifest/" + bundleName + "/project.manifest";
        var newRootPath = "manifest/" + bundleName + "/";
        $log("==checkUpdate2==", localManifestPath);
        $log("==checkUpdate3==", newRootPath);
        if (!cc.sys.isNative) {
            var ud = new igs.hotUpdate.UpdateData(igs.hotUpdate.HotUpdateCode.BUNDLE_NOT_EXIST_EVERYWHERE, bundleName);
            callback(ud);
            return;
        }
        var bundlesDir = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "bundles/assets/";
        var storagePath = bundlesDir + bundleName;
        $log("==checkUpdate4==", storagePath);
        var wrapper = HotUpdate._amList[bundleName];
        $log("==checkUpdate5==", wrapper == null);
        if (!wrapper || wrapper.am.getState() === jsb.AssetsManager.State.UP_TO_DATE || wrapper.am.getState() === jsb.AssetsManager.State.FAIL_TO_UPDATE) {
            var useDummy = false;
            var manifest = new jsb.Manifest(localManifestPath);
            if (!manifest.isLoaded()) {
                localManifestPath = "manifest/project.manifest";
                newRootPath = "manifest/";
                $log("==use dummy==");
                useDummy = true;
            }
            if (wrapper) {
                delete HotUpdate._amList[bundleName];
            }
            wrapper = new AssetsManagerWrapper();
            wrapper.useDummy = useDummy;
            wrapper.updateData = new igs.hotUpdate.UpdateData(igs.hotUpdate.HotUpdateCode.INIT, bundleName);
            wrapper.updateData.bundleDir = storagePath;
            wrapper.cb = callback;
            HotUpdate._amList[bundleName] = wrapper;
            wrapper.am = new jsb.AssetsManager(localManifestPath, storagePath, this.versionCompareHandle.bind(wrapper));
        }
        wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.INIT;
        wrapper.updateData.remoteInfo = info.remoteInfo;
        wrapper.reset();
        var localManifest = wrapper.am.getLocalManifest();
        if (!localManifest) {
            $log("==='project.manifest' NOT EXIST===");
            wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.LOCAL_MANIFEST_NOT_FOUND;
            callback(wrapper.updateData);
            return;
        }
        else {
            newRootPath = localManifest.getManifestRoot();
        }
        var params = {};
        if (remoteHost && remoteHost[remoteHost.length - 1] !== "/") {
            remoteHost += "/";
        }
        params["packageUrl"] = remoteHost;
        params["remoteVersionUrl"] = remoteHost + "version.manifest";
        params["remoteManifestUrl"] = remoteHost + "project.manifest";
        if (!this.modifyManifest(localManifest, "project.manifest", params, newRootPath)) {
            $log("===parse localManifest to JSON failed===");
            wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.PARSE_LOCAL_MANIFEST_FAILED;
            callback(wrapper.updateData);
            return;
        }
        if (cc.sys.os === cc.sys.OS_ANDROID) {
            var setMaxConcurrentTaskNum = 2;
            wrapper.am['setMaxConcurrentTask'](setMaxConcurrentTaskNum);
            $log("Max concurrent tasks count have been limited to ".concat(setMaxConcurrentTaskNum));
        }
        $log("==start check==");
        wrapper.am.setEventCallback(this.checkHandler.bind(this));
        wrapper.am.checkUpdate();
    };
    HotUpdate.prototype.modifyManifest = function (manifest, manifestFileName, params, newRootPath) {
        if (!manifest || !params) {
            $log("==modifyManifest==", "am is null");
            return;
        }
        var manifestPath = manifest.getManifestRoot() + manifestFileName;
        $log("==modifyManifest==filePath:", manifestPath);
        try {
            var manifestJson = JSON.parse(jsb.fileUtils.getStringFromFile(manifestPath));
            $log("==modifyManifest==root:", manifest.getManifestRoot());
            var manifestRoot = newRootPath;
            $log("==modifyManifest==newRootPath:", manifestRoot);
            for (var key in params) {
                if (manifestJson[key] && params[key]) {
                    manifestJson[key] = params[key];
                }
            }
            var newContent = JSON.stringify(manifestJson);
            $log("==new content==", newContent);
            manifest.parseJSONString(newContent, manifestRoot);
        }
        catch (e) {
            $log("==modifyManifest==exception:", e.message, e);
            return false;
        }
        return true;
    };
    HotUpdate.prototype.onNewVersionFound = function (am) {
        if (am.getState() === jsb.AssetsManager.State.NEED_UPDATE) {
            $log("==but nothing to update==remote files same to local files");
            return;
        }
        if (am.getState() !== jsb.AssetsManager.State.READY_TO_UPDATE) {
            return;
        }
        var wrapper = this.getWrapper(am);
        if (!wrapper) {
            $log("==onNewVersionFound==", "am not found");
            return;
        }
        $log("==onNewVersionFound==");
        wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.NEW_VERSION_FOUND;
        wrapper.updateData.newVersion = am.getRemoteManifest().getVersion();
        wrapper.updateData.oldVersion = am.getLocalManifest().getVersion();
        wrapper.updateData.totalToDownloadFiles = am.getTotalFiles();
        wrapper.updateData.totalToDownloadBytesCount = am.getTotalBytes();
        wrapper.cb(wrapper.updateData);
    };
    HotUpdate.prototype.doUpdate = function (bundleName, cb) {
        $log("doUpdate", bundleName);
        var wrapper = HotUpdate._amList[bundleName];
        if (!wrapper) {
            $log("==need call checkUpdate first==");
            return;
        }
        wrapper.cb = cb;
        wrapper.am.update();
    };
    HotUpdate.prototype.getWrapper = function (am) {
        for (var i in HotUpdate._amList) {
            var wrapper = HotUpdate._amList[i];
            if (wrapper.am === am) {
                return wrapper;
            }
        }
        return null;
    };
    HotUpdate.prototype.checkHandler = function (event) {
        var st = event.getAssetsManagerEx().getState(), code = event.getEventCode(), assetId = event.getAssetId(), am = event.getAssetsManagerEx();
        if (code === jsb.EventAssetsManager.UPDATE_PROGRESSION) {
            if (assetId === "@version") {
                $log("==downloading version.manifest==", am.getLocalManifest().getVersionFileUrl());
            }
            else if (assetId === "@manifest") {
                $log("==downloading project.manifest==", am.getLocalManifest().getManifestFileUrl());
            }
            else {
                var wrapper = this.getWrapper(am);
                wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.DOWNLOADING_ASSETS;
                wrapper.updateData.downloadedByteCount = am.getDownloadedBytes();
                wrapper.updateData.downloadedFiles = am.getDownloadedFiles();
                wrapper.cb(wrapper.updateData);
            }
        }
        else if (code === 11) {
            $log("==parse manifest success==");
            var wrapper = this.getWrapper(am);
            if (wrapper) {
                var params = {};
                var updateData = wrapper.updateData;
                var remoteHost = updateData.remoteInfo.url;
                if (remoteHost && remoteHost[remoteHost.length - 1] !== "/") {
                    remoteHost += "/";
                }
                params["packageUrl"] = remoteHost;
                params["remoteVersionUrl"] = remoteHost + "version.manifest";
                params["remoteManifestUrl"] = remoteHost + "project.manifest";
                if (wrapper.useDummy && !jsb.fileUtils.isFileExist(wrapper.am.getStoragePath() + "/" + "project.manifest")) {
                    $log("download full zip");
                    params["assets"] = {
                        "full.zip": {
                            size: updateData.remoteInfo.zipSize,
                            md5: Date.now().toString(),
                            compressed: true,
                        }
                    };
                }
                if (!this.modifyManifest(am.getRemoteManifest(), "project.manifest.temp", params, am.getRemoteManifest().getManifestRoot())) {
                    $log("===parse remoteManifest to JSON failed===");
                    return;
                }
            }
        }
        else if (code === jsb.EventAssetsManager.NEW_VERSION_FOUND) {
            $log("==!new version found!== bytes: ".concat(am.getTotalBytes(), ", files: ").concat(am.getTotalFiles()));
            this.onNewVersionFound(am);
        }
        else if (code === jsb.EventAssetsManager.ASSET_UPDATED) {
            $log("==file ".concat(assetId, " download success=="));
            var wrapper = this.getWrapper(am);
            if (/^config.(\w*\.*)*json$/.test(assetId)) {
                var strArr = assetId.split(".");
                wrapper.configJsonMd5Cache = strArr[1];
                $log("==config md5cache==", strArr[1]);
            }
            wrapper.downloadNothing = false;
        }
        else if (code === jsb.EventAssetsManager.ERROR_UPDATING) {
            var curle = event.getCURLECode(), curlm = event.getCURLMCode(), errMsg = event.getMessage();
            $log("==file ".concat(assetId, " download failed== ").concat(curle, ", ").concat(curlm, ", ").concat(errMsg));
            if (curle === -3) {
                var wrapper = this.getWrapper(am);
                wrapper.hasFileNotExist = true;
            }
        }
        else if (code === jsb.EventAssetsManager.UPDATE_FAILED) {
            $log("==update failed, some file download error==");
            var wrapper = this.getWrapper(am);
            wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.UPDATE_FAILED;
            if (wrapper.hasFileNotExist) {
                $log("==has file not exist, clear download cache==");
                $tools.clearUpdateCache([wrapper.updateData.bundleName]);
            }
            wrapper.cb(wrapper.updateData);
        }
        else if (code === jsb.EventAssetsManager.UPDATE_FINISHED) {
            var wrapper = this.getWrapper(am);
            $log("==bundle ".concat(wrapper.updateData.bundleName, " update finish=="));
            wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED;
            if (wrapper.downloadNothing) {
                wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED_NOTHING;
            }
            this.updateBundleDir(wrapper);
            wrapper.cb(wrapper.updateData);
        }
        else if (code === jsb.EventAssetsManager.ALREADY_UP_TO_DATE) {
            $log("==checkHandler already up to date==");
            var wrapper = this.getWrapper(am);
            wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE;
            var code_1 = this.updateBundleDir(wrapper);
            if (code_1 !== null) {
                wrapper.updateData.ret = code_1;
            }
            wrapper.cb(wrapper.updateData);
        }
        else if (code === jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST) {
            $log("===download manifest error==", event.getCURLECode(), event.getCURLMCode(), event.getMessage());
            if (event.getCURLECode() === -3) {
                $log("==remote has no data==");
                var wrapper = this.getWrapper(am);
                wrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE;
                var code_2 = this.updateBundleDir(wrapper);
                if (code_2 !== null) {
                    wrapper.updateData.ret = code_2;
                }
                wrapper.cb(wrapper.updateData);
            }
        }
    };
    HotUpdate.prototype.updateBundleDir = function (wrapper) {
        var am = wrapper.am;
        var amRoot = am.getLocalManifest().getManifestRoot();
        var code = null;
        $log("==updateBundleDir amRoot==", amRoot);
        if (amRoot === "manifest/") {
            wrapper.updateData.bundleDir = wrapper.updateData.bundleName;
            code = igs.hotUpdate.HotUpdateCode.BUNDLE_NOT_EXIST_EVERYWHERE;
        }
        else if (amRoot === "manifest/".concat(wrapper.updateData.bundleName, "/")) {
            wrapper.updateData.bundleDir = wrapper.updateData.bundleName;
            code = igs.hotUpdate.HotUpdateCode.USE_LOCAL_BUNDLE;
        }
        else {
            var fileList = jsb.fileUtils.listFiles(wrapper.updateData.bundleDir);
            $log("==filelist==", fileList.length);
            var hasConfig = false;
            for (var _i = 0, fileList_1 = fileList; _i < fileList_1.length; _i++) {
                var i = fileList_1[_i];
                var fname = i.replace(amRoot, "");
                $log("==filelist content==", i);
                $log("==filelist fname==", fname);
                if (/^config.(\w*\.*)*json$/.test(fname)) {
                    var strArr = fname.split(".");
                    wrapper.configJsonMd5Cache = strArr[1];
                    hasConfig = true;
                    $log("==list config md5cache==", strArr[1]);
                    break;
                }
            }
            if (!hasConfig) {
                $log("==cache do not have config.json==");
                wrapper.updateData.bundleDir = wrapper.updateData.bundleName;
                code = igs.hotUpdate.HotUpdateCode.USE_LOCAL_BUNDLE;
            }
        }
        if (wrapper.configJsonMd5Cache !== "") {
            $log("==replace md5cache==", wrapper.configJsonMd5Cache);
            cc.assetManager.downloader['bundleVers'][wrapper.updateData.bundleName] = wrapper.configJsonMd5Cache;
        }
        $log("==amRoot==", amRoot);
        $log("==bundleDir==", wrapper.updateData.bundleDir);
        $log("==code==", code);
        return code;
    };
    HotUpdate.prototype.versionCompareHandle = function (versionA, versionB) {
        var wrapper = (this);
        if (wrapper.am && (wrapper.am.getState() === jsb.AssetsManager.State.MANIFEST_LOADED || wrapper.am.getState() === jsb.AssetsManager.State.VERSION_LOADED)) {
            versionB = "" + wrapper.updateData.remoteInfo.versionCode;
            $log("==compare version==localOrCache:".concat(versionA, ", remote:").concat(versionB));
        }
        else {
            $log("==compare version==local:".concat(versionA, ", cache:").concat(versionB));
        }
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]) || 0;
            var b = parseInt(vB[i] || "0") || 0;
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        else {
            return 0;
        }
    };
    HotUpdate._amList = Object.create(null);
    return HotUpdate;
}());
var $hotUpdate = new HotUpdate();
(function (igs) {
    var http;
    (function (http) {
        var Request = (function () {
            function Request() {
                this.body = null;
                this.method = "";
                this.url = "";
                this.head = null;
            }
            return Request;
        }());
        http.Request = Request;
        function get(url, head, params, progressCb) {
            if (progressCb === void 0) { progressCb = function (evt) { }; }
            return new Promise(function (rlv, rej) {
                var xhr = new XMLHttpRequest();
                xhr.timeout = 5000;
                var request = _linkParam(url, params);
                xhr.open("GET", request, true);
                if (igs.util.isNative()) {
                    xhr.setRequestHeader("Accept", "text/html");
                    xhr.setRequestHeader("Accept-Charset", "utf-8");
                    xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
                }
                if (head) {
                    for (var key in head) {
                        if (head[key]) {
                            xhr.setRequestHeader(key, head[key]);
                        }
                    }
                }
                xhr.onload = function () {
                    if (xhr.status !== 200) {
                    }
                    var res = null;
                    if (xhr.status == 200) {
                        if (params && params.response) {
                            res = xhr.response;
                        }
                        else {
                            try {
                                var tryJson = JSON.parse(xhr.responseText || "");
                                if (tryJson) {
                                    res = tryJson;
                                }
                                else {
                                    res = xhr.responseText;
                                }
                            }
                            catch (_a) {
                                res = xhr.responseText;
                            }
                        }
                    }
                    rlv({ err: null, data: res });
                };
                xhr.onabort = function () {
                    rej({ err: new Error("the request has been aborted"), data: null });
                };
                xhr.onerror = function (event) {
                    rej({ err: new Error(JSON.stringify(event)), data: null });
                };
                xhr.ontimeout = function (event) {
                    rej({ err: new Error("timeout"), data: null });
                };
                xhr.onprogress = function (event) {
                    progressCb && progressCb(event);
                };
                xhr.send();
                return xhr;
            });
        }
        http.get = get;
        function post(url, head, params, body, progressCb, callback) {
            var _this = this;
            if (progressCb === void 0) { progressCb = function (evt) { }; }
            if (callback === void 0) { callback = null; }
            return new Promise(function (rlv, rej) {
                var xhr = new XMLHttpRequest();
                xhr.timeout = 5000;
                $log("http post " + url);
                var request = _linkParam(url, params);
                xhr.open("POST", request, true);
                if (igs.util.isNative()) {
                    xhr.setRequestHeader("Accept", "text/html");
                    xhr.setRequestHeader("Accept-Charset", "utf-8");
                    xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
                }
                if (head) {
                    for (var key in head) {
                        if (head[key]) {
                            xhr.setRequestHeader(key, head[key]);
                        }
                    }
                }
                if (body) {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }
                xhr.onload = function () {
                    if (xhr.status !== 200) {
                    }
                    var res = null;
                    if (xhr.status == 200 || xhr.status == 500 || xhr.status === 401 || xhr.status === 403) {
                        try {
                            var tryJson = JSON.parse(xhr.responseText || "");
                            if (tryJson) {
                                res = tryJson;
                            }
                            else {
                                res = xhr.responseText;
                            }
                        }
                        catch (_a) {
                            res = xhr.responseText;
                        }
                    }
                    else if (xhr.status == 307) {
                        try {
                            var tryJson = JSON.parse(xhr.responseText || "");
                            if (tryJson) {
                                res = tryJson;
                            }
                            else {
                                res = xhr.responseText;
                            }
                        }
                        catch (_b) {
                            res = xhr.responseText;
                        }
                        if (res.Location) {
                            this.HTTPPostRequest(res.Location, params, callback, xhr.timeout);
                            return;
                        }
                    }
                    rlv({ err: null, data: res });
                }.bind(_this);
                xhr.onabort = function () {
                    rej({ err: new Error("the request has been aborted"), data: null });
                };
                xhr.onerror = function (event) {
                    cc.warn("http post onerror " + event);
                    rej({ err: new Error("http request err"), data: null });
                };
                xhr.ontimeout = function () {
                    rej({ err: new Error("timeout"), data: null });
                };
                xhr.onprogress = function (event) {
                    progressCb && progressCb(event);
                };
                if (body) {
                    if (typeof (URLSearchParams) === "function") {
                        var urlParams = new URLSearchParams();
                        for (var key in body) {
                            if (typeof body[key] === "string" || typeof body[key] === "number" || typeof body[key] === "boolean") {
                                urlParams.append(key, body[key]);
                            }
                            else if (typeof body[key] === "object" && body[key]) {
                                urlParams.append(key, JSON.stringify(body[key]));
                            }
                        }
                        if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
                            xhr.send(urlParams.toString());
                        }
                        else {
                            xhr.send(urlParams);
                        }
                    }
                    else {
                        var paramArr = [];
                        for (var key in body) {
                            if (typeof body[key] === "string" || typeof body[key] === "number" || typeof body[key] === "boolean") {
                                paramArr.push(key + "=" + encodeURIComponent(body[key]));
                            }
                            else if (typeof body[key] === "object" && body[key]) {
                                paramArr.push(key + "=" + JSON.stringify(body[key]));
                            }
                        }
                        xhr.send(paramArr.join('&'));
                    }
                }
                else {
                    xhr.send();
                }
                return xhr;
            });
        }
        http.post = post;
        function download(url, params, callback) {
            var xhr = new XMLHttpRequest();
            xhr.timeout = 5000;
            var request = _linkParam(url, params);
            xhr.responseType = "arraybuffer";
            xhr.open("GET", request, true);
            if (igs.util.isNative()) {
                xhr.setRequestHeader("Accept", "text/html");
                xhr.setRequestHeader("Accept-Charset", "utf-8");
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    var buffer = xhr.response;
                    var dataview = new DataView(buffer);
                    var ints = new Uint8Array(buffer.byteLength);
                    for (var i = 0; i < ints.length; i++) {
                        ints[i] = dataview.getUint8(i);
                    }
                    callback(ints, null);
                }
                else {
                    callback(null, xhr.readyState + ":" + xhr.status);
                }
            };
            xhr.send();
            return xhr;
        }
        http.download = download;
    })(http = igs.http || (igs.http = {}));
})(igs = exports.igs || (exports.igs = {}));
(function (igs) {
    var platform;
    (function (platform) {
        var EShareStyle;
        (function (EShareStyle) {
            EShareStyle[EShareStyle["Activity"] = 0] = "Activity";
            EShareStyle[EShareStyle["Capture"] = 1] = "Capture";
            EShareStyle[EShareStyle["CaptureNode"] = 2] = "CaptureNode";
            EShareStyle[EShareStyle["Common"] = 3] = "Common";
            EShareStyle[EShareStyle["RoomShare"] = 4] = "RoomShare";
        })(EShareStyle = platform.EShareStyle || (platform.EShareStyle = {}));
    })(platform = igs.platform || (igs.platform = {}));
})(igs = exports.igs || (exports.igs = {}));
var BasePlatform = (function () {
    function BasePlatform(name) {
        this.pluginConfig = null;
        this._name = "unknown";
        this.isTipTrackUserAction = false;
        $log("".concat(name, " platform"));
        this._name = name;
    }
    Object.defineProperty(BasePlatform.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    BasePlatform.prototype.triggerGC = function () { };
    BasePlatform.prototype.ScreenCap = function (info) { $log("ScreenCap no implement"); return { start: function () { }, stop: function () { } }; };
    BasePlatform.prototype.request = function (req) {
        req.method = req.method || "POST";
        var url = req.url, body = req.body || {}, head = req.head || {}, method = req.method;
        return new Promise(function (rlv, rej) {
            var xhr = new XMLHttpRequest();
            var request = _linkParam(url, body);
            xhr.open(method, request, true);
            if (igs.util.isNative()) {
                xhr.setRequestHeader("Accept", "text/html");
                xhr.setRequestHeader("Accept-Charset", "utf-8");
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }
            if (head) {
                for (var key in head) {
                    if (head[key]) {
                        xhr.setRequestHeader(key, head[key]);
                    }
                }
            }
            xhr.onabort = function () { return rej({ err: new Error("the request has been aborted"), data: null }); };
            xhr.onerror = function (event) { return rej({ err: new Error(JSON.stringify(event)), data: null }); };
            xhr.ontimeout = function (event) { return rej({ err: new Error("timeout"), data: null }); };
            xhr.onreadystatechange = function (t) {
                if (4 === xhr.readyState) {
                    if (200 === xhr.status) {
                        var rsp = xhr.response;
                        if (typeof (rsp) === "string") {
                            var obj = null;
                            try {
                                obj = { err: null, data: JSON.parse(rsp) };
                            }
                            catch (e) {
                                obj = { err: new Error(e), data: null };
                            }
                            rlv(obj);
                        }
                        else {
                            rej({ err: new Error(rsp), data: null });
                        }
                    }
                    else {
                        rej({ err: new Error(xhr.response), data: null });
                    }
                }
            };
            if (body) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                if (typeof (URLSearchParams) === "function") {
                    var urlParams = new URLSearchParams();
                    for (var key in body) {
                        if (typeof body[key] === "string" || typeof body[key] === "number" || typeof body[key] === "boolean") {
                            urlParams.append(key, body[key]);
                        }
                        else if (typeof body[key] === "object" && body[key]) {
                            urlParams.append(key, JSON.stringify(body[key]));
                        }
                    }
                    xhr.send(urlParams);
                }
                else {
                    var paramArr = [];
                    for (var key in body) {
                        if (typeof body[key] === "string" || typeof body[key] === "number" || typeof body[key] === "boolean") {
                            paramArr.push(key + "=" + encodeURIComponent(body[key]));
                        }
                        else if (typeof body[key] === "object" && body[key]) {
                            paramArr.push(key + "=" + JSON.stringify(body[key]));
                        }
                    }
                    xhr.send(paramArr.join('&'));
                }
            }
            else {
                xhr.send();
            }
        });
    };
    BasePlatform.prototype.loadPlugin = function (config) {
        return new Promise(function (rlv, rej) {
            if (CC_JSB) {
                $log("loadPluginPlist");
                var proxy = jsb['PluginProxyWrapper'].getInstance();
                var plist = proxy.getPluginsPlist();
                $log("loadPluginPlist plist", plist);
                var result = plist;
                if (cc.sys.os == cc.sys.OS_ANDROID) {
                    result = cc["plistParser"].parse(plist);
                }
                else if (cc.sys.os == cc.sys.OS_IOS) {
                    result = JSON.parse(plist);
                }
                if (result) {
                    $global.setConfig(result);
                    $global.onConfigJsonLoadFinish();
                    $log("loadPluginPlist result", result);
                    $log("loadPluginPlist result", JSON.stringify(result));
                    $log("loadPluginPlist config", JSON.stringify(result.config));
                    $log("loadPluginPlist plugins", JSON.stringify(result.plugins));
                    proxy.setPluginConfig(JSON.stringify(result));
                    for (var _i = 0, _a = result.plugins; _i < _a.length; _i++) {
                        var plugin = _a[_i];
                        if (plugin.name != "SessionPhone" && plugin.name != "SessionGuest") {
                            $log("loadPlugin ".concat(plugin.name));
                            proxy.loadPlugin(plugin.name, 0, parseInt(plugin.type));
                        }
                    }
                }
                rlv(null);
            }
            else {
                cc.resources.load("config", cc.JsonAsset, function (err, res) {
                    if (err) {
                        throw new Error("load config.json failed: " + err.message);
                    }
                    function loaded() {
                        if (window['igsgame']) {
                            window['igsgame'].igsChannel = res.json;
                        }
                        $global.setConfig(res.json);
                        $global.onConfigJsonLoadFinish();
                        $log("load config.json success!", res.json);
                        rlv(null);
                    }
                    if (window['igsgame']) {
                        var channel = window['igsgame'].igsChannel;
                        if (channel && typeof channel === "object") {
                            $log("replace platform channel.js");
                            for (var i in channel) {
                                res.json[i] = channel[i];
                            }
                        }
                        else {
                            throw new Error("channel.js not exist");
                        }
                    }
                    else {
                        $warn("window['igsgame'] is undefined");
                    }
                    if (cc.sys.platform === cc.sys.OPPO_GAME) {
                        window['qg'].getManifestInfo({
                            success: function (res1) {
                                var manifest = JSON.parse(res1.manifest);
                                $log("qg manifest", manifest);
                                res.json['pn'] = manifest['package'];
                                res.json['gameName'] = manifest['name'];
                                loaded();
                            },
                            fail: function (err) {
                                $log("get qg manifestInfo error");
                            },
                            complete: function (res) { },
                        });
                    }
                    else if (cc.sys.platform === cc.sys.VIVO_GAME) {
                        var info = window['qg'].getSystemInfoSync();
                        if (info.miniGame && typeof (info.miniGame) === "object") {
                            $log("vivo pn from manifest", info.miniGame.package);
                            res.json['pn'] = info.miniGame.package;
                            $log("vivo gameName use common");
                        }
                        else {
                            $log("vivo pn and gameName from config.json[vivo-qgame]", res.json['vivo-qgame']['pn']);
                            res.json['pn'] = res.json['vivo-qgame']['pn'];
                            res.json['gameName'] = res.json['vivo-qgame']['gameName'];
                        }
                        loaded();
                    }
                    else {
                        loaded();
                    }
                });
            }
        });
    };
    BasePlatform.prototype.userLabel = function () {
        var label = [];
        if (typeof window['iGaoShouApi'] === "undefined") {
            label.push("rc-unknown");
            return label;
        }
        var self = window['iGaoShouApi'].GetSelf();
        if (!self) {
            label.push("rc-err1");
            return label;
        }
        label.push("rc-" + self.playGames);
        return label;
    };
    BasePlatform.prototype.TrackEvent = function (name, detail, labels) {
        if (detail === void 0) { detail = {}; }
        if (labels === void 0) { labels = []; }
        var ext = [];
        ext = ext.concat(this.userLabel(), labels);
        if (detail.uploadToPlatform && detail.uploadToPlatform.length > 0) {
            detail.uploadToPlatform.forEach(function (item) {
                ext.push(JSON.stringify(item));
            });
        }
        window['igsgame'].igsEvent.report(name, ext);
    };
    BasePlatform.prototype.TrackUserAction = function (name) {
        var igsgame = window['igsgame'];
        if (igsgame && igsgame.igsEvent) {
            if (igsgame.igsEvent.reportUserAction) {
                igsgame.igsEvent.reportUserAction(name, this.userLabel());
            }
            else {
                if (!this.isTipTrackUserAction) {
                    $error("function reportUserAction not exist! please check report.js");
                    this.isTipTrackUserAction = true;
                }
            }
        }
    };
    BasePlatform.prototype.share = function (param) {
        if (param === void 0) { param = {}; }
        $warn("shareCapture no implement");
    };
    BasePlatform.prototype.launchParam = function (key) { $warn("launchParam no implement"); };
    BasePlatform.prototype.onShareAppMessage = function (fn) { $warn("onShareAppMessage no implement"); };
    return BasePlatform;
}());
var DebugPlatform = (function (_super) {
    __extends(DebugPlatform, _super);
    function DebugPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DebugPlatform.prototype.TrackEvent = function (name, detail, labels) {
        if (detail === void 0) { detail = {}; }
        if (labels === void 0) { labels = []; }
        name += ("-" + this.userLabel().concat(labels).join("-"));
        $log("=EventTrack=", name, igs.util.dateFormat("YYYY-MM-dd HH:mm:ss.S", new Date()));
    };
    return DebugPlatform;
}(BasePlatform));
var WebPlatform = (function (_super) {
    __extends(WebPlatform, _super);
    function WebPlatform(name) {
        var _this = _super.call(this, name) || this;
        igs.on(igs.consts.Event.GET_ONLINE_PARAM_FAIL, _this.getOnlineParamFailed, _this);
        return _this;
    }
    WebPlatform.prototype.TrackEvent = function (name, detail, labels) {
        if (detail === void 0) { detail = {}; }
        if (labels === void 0) { labels = []; }
        name += ("-" + this.userLabel().concat(labels).join("-"));
        $log("=EventTrack=", name, igs.util.dateFormat("YYYY-MM-dd HH:mm:ss.S", new Date()));
    };
    WebPlatform.prototype.getOnlineParamFailed = function () {
    };
    return WebPlatform;
}(BasePlatform));
var WXPlatform = (function (_super) {
    __extends(WXPlatform, _super);
    function WXPlatform(name) {
        var _this = _super.call(this, name) || this;
        _this.launchP = null;
        igs.on(igs.consts.Event.GET_ONLINE_PARAM_FAIL, _this.getOnlineParamFailed, _this);
        var wx = window['wx'];
        wx.onMemoryWarning(function () {
            $log("==内存警告==");
            wx.triggerGC();
        });
        wx.onNetworkStatusChange(function (res) {
            $log("=NetworkStatusChange=", res.isConnected, res.networkType);
        });
        wx.onShow(function (res) {
            this.launchP = res['query'] || null;
            $log("=wx onshow=", JSON.stringify(res));
            $updateOdcData(true);
        });
        wx.onHide(function (res) {
            $log("=wx onhide=");
            $updateOdcData(false);
        });
        if (typeof wx.onNetworkWeakChange === "function") {
            wx.onNetworkWeakChange(function () {
                $log("=onNetworkWeakChange=");
            });
        }
        var systemInfo1 = wx.getSystemInfoSync();
        $log("安全区域", systemInfo1);
        if ((systemInfo1.deviceOrientation === "landscape" && systemInfo1.safeArea.width >= systemInfo1.safeArea.height && systemInfo1.screenWidth >= systemInfo1.screenHeight) || (systemInfo1.deviceOrientation === "portrait" && systemInfo1.safeArea.width <= systemInfo1.safeArea.height && systemInfo1.screenWidth <= systemInfo1.screenHeight)) {
            var exportSafeArea = igs.exports.safeArea;
            exportSafeArea.top = systemInfo1.safeArea.top;
            exportSafeArea.bottom = systemInfo1.screenHeight - systemInfo1.safeArea.bottom;
            exportSafeArea.left = systemInfo1.safeArea.left;
            exportSafeArea.right = systemInfo1.screenWidth - systemInfo1.safeArea.right;
            $log("=Fix safeArea1= reset", exportSafeArea.top, exportSafeArea.bottom, exportSafeArea.left, exportSafeArea.right);
            igs.emit(igs.consts.Event.IGS_SAFEAREA_CHANGED);
        }
        else {
            $log("横竖屏切换未完成");
        }
        wx.onDeviceOrientationChange(function (res) {
            setTimeout(function () {
                var systemInfo = wx.getSystemInfoSync();
                var exportSafeArea = igs.exports.safeArea;
                if ((systemInfo1.deviceOrientation === "landscape" && systemInfo1.safeArea.width >= systemInfo1.safeArea.height && systemInfo1.screenWidth >= systemInfo1.screenHeight) || (systemInfo1.deviceOrientation === "portrait" && systemInfo1.safeArea.width <= systemInfo1.safeArea.height && systemInfo1.screenWidth <= systemInfo1.screenHeight)) {
                    if (systemInfo && systemInfo.safeArea) {
                        exportSafeArea.top = systemInfo.safeArea.top;
                        exportSafeArea.bottom = systemInfo.screenHeight - systemInfo.safeArea.bottom;
                        exportSafeArea.left = systemInfo.safeArea.left;
                        exportSafeArea.right = systemInfo.screenWidth - systemInfo.safeArea.right;
                        $log("=Fix safeArea2= reset", exportSafeArea.top, exportSafeArea.bottom, exportSafeArea.left, exportSafeArea.right);
                        igs.emit(igs.consts.Event.IGS_SAFEAREA_CHANGED);
                    }
                    else {
                        $log("systemInfo.safeArea is invalid", systemInfo.safeArea);
                    }
                }
                else {
                    $log("横竖屏切换还未完成??");
                }
                $log("=safeArea= reset", exportSafeArea.top, exportSafeArea.bottom, exportSafeArea.left, exportSafeArea.right);
            }, 1);
        });
        var launchParam = wx.getLaunchOptionsSync();
        _this.launchP = launchParam['query'] || null;
        $log("=wx launch=", JSON.stringify(launchParam));
        igs.odc.init(null);
        return _this;
    }
    WXPlatform.prototype.getOnlineParamFailed = function () {
        var wx = window['wx'];
        wx.showModal({
            title: "温馨提示",
            content: "配置拉取失败，请检查后重试",
            showCancel: false,
            confirmText: "重试",
            success: function (res) {
                if (res.confirm) {
                    $log("=重试拉取在线参数=");
                    igs.platform.trackEvent(TrackName.IGS_GET_ONLINE_PARAM_RETRY);
                    igs.emit(igs.consts.Event.GET_ONLINE_PARAM);
                }
            }
        });
    };
    WXPlatform.prototype.TrackEvent = function (name, detail, labels) {
        if (detail === void 0) { detail = {}; }
        if (labels === void 0) { labels = []; }
        var wx = window['wx'];
        if (name !== "") {
            wx.igsEvent.report(name, this.userLabel().concat(labels));
        }
        if (detail.uploadToPlatform) {
            for (var _i = 0, _a = detail.uploadToPlatform; _i < _a.length; _i++) {
                var i = _a[_i];
                $log("wx.reportEvent", i.k, i.v);
                wx.reportEvent(i.k, i.v);
            }
        }
    };
    WXPlatform.prototype.TrackUserAction = function (name) {
        var wx = window['wx'];
        if (wx && wx.igsEvent) {
            if (wx.igsEvent.reportUserAction) {
                wx.igsEvent.reportUserAction(name, this.userLabel());
            }
            else {
                if (!this.isTipTrackUserAction) {
                    $error("function reportUserAction not exist! please check report.js");
                    this.isTipTrackUserAction = true;
                }
            }
        }
    };
    WXPlatform.prototype.triggerGC = function () {
        try {
            var wx = window['wx'];
            if (wx) {
                wx.triggerGC();
            }
        }
        catch (e) {
            $error('wx.triggerGC() call failed');
        }
    };
    WXPlatform.prototype.getScreenWidth = function () {
        var systemInfo = window['wx'].getSystemInfoSync();
        return !systemInfo.SDKVersion || igs.util.compareVersion(systemInfo.SDKVersion, "1.1.0") < 0 ? ($error("the wechat sdk version too low"), 0) : systemInfo.screenWidth;
    };
    WXPlatform.prototype.getScreenHeight = function () {
        var systemInfo = window['wx'].getSystemInfoSync();
        return !systemInfo.SDKVersion || igs.util.compareVersion(systemInfo.SDKVersion, "1.1.0") < 0 ? ($error("the wechat sdk version too low"), 0) : systemInfo.screenHeight;
    };
    WXPlatform.prototype.getPixelRatio = function () {
        var systemInfo = window['wx'].getSystemInfoSync();
        return systemInfo.pixelRatio;
    };
    WXPlatform.prototype.processShareParam = function (param) {
        if (param === void 0) { param = {}; }
        var self = this;
        param.style = param.style || igs.platform.EShareStyle.Common;
        var queryExtStr = "";
        if (typeof param.queryExt === "string") {
            queryExtStr = param.query;
        }
        else if (param.queryExt && typeof param.queryExt === "object") {
            queryExtStr = JSON.stringify(param.queryExt);
        }
        var queryStr = "";
        if (typeof param.query === "string") {
            queryStr = param.query;
        }
        else if (param.query && typeof param.query === "object") {
            var keys = Object.keys(param.query);
            for (var i = 0, l = keys.length; i < l; i++) {
                if (i > 0) {
                    queryStr += "&";
                }
                queryStr += (keys[i] + "=" + param.query[keys[i]]);
            }
        }
        var paramCombine = { shareContent: "", sharePointId: param.point, sharePicUrl: "" };
        if (param.shareObj) {
            paramCombine.shareContent = param.shareObj['shareContent'] || "";
            paramCombine.sharePicUrl = param.shareObj['sharePicUrl'] || "";
            for (var i in param.query) {
                if (param.query[i]) {
                    if (i !== "shareContent" && i !== "sharePicUrl") {
                        paramCombine.shareContent = paramCombine.shareContent.replace(i, param.query[i]);
                    }
                }
            }
            for (var i in param.shareObj) {
                if (param.shareObj[i]) {
                    if (i !== "shareContent" && i !== "sharePicUrl") {
                        paramCombine.shareContent = paramCombine.shareContent.replace(i, param.shareObj[i]);
                    }
                }
            }
        }
        queryStr = queryStr + "&pointId=" + paramCombine.sharePointId + "&" + "extInfo=" + queryExtStr;
        return { param: param, queryStr: queryStr, paramCombine: paramCombine, queryExtStr: queryExtStr };
    };
    WXPlatform.prototype.share = function (param) {
        var _this = this;
        if (param === void 0) { param = {}; }
        var ret = this.processShareParam(param);
        $log("=share=", ret);
        var self = this;
        var trackPoint = param.point || "";
        var trackName = TrackName.IGS_SHARE_COMMON;
        if (param.style === igs.platform.EShareStyle.Activity) {
            trackName = TrackName.IGS_SHARE_ACTIVITY;
        }
        else if (param.style === igs.platform.EShareStyle.Capture) {
            trackName = TrackName.IGS_SHARE_CAPTURE_SCREEN;
        }
        else if (param.style === igs.platform.EShareStyle.CaptureNode) {
            trackName = TrackName.IGS_SHARE_CAPTURE_NODE;
        }
        var onSucc = function (ret) {
            param.success && param.success(ret);
            self.TrackEvent(trackName, undefined, trackPoint ? [trackPoint] : []);
        };
        var shareCommon = function () {
            $log("shareCommon");
            window['wx'].shareAppMessage({
                title: ret.paramCombine.shareContent,
                imageUrl: ret.paramCombine.sharePicUrl,
                query: ret.queryStr,
                success: function (e) {
                    onSucc(e);
                },
                fail: function (e) {
                    param.fail && param.fail(e);
                }
            });
        };
        var shareCapture = function () {
            $log("shareCapture");
            var p = param.param;
            var node = p.captureNode ? p.captureNode : cc.director.getScene().getChildByName("Canvas");
            var canvas = cc.game.canvas;
            if (canvas) {
                var widthR = _this.getScreenWidth() / cc.winSize.width * _this.getPixelRatio(), heightR = _this.getScreenHeight() / cc.winSize.height * _this.getPixelRatio(), bound = node.getBoundingBoxToWorld(), x = bound.x * widthR, f = (cc.winSize.height - bound.y - bound.height) * heightR, m = bound.width * widthR, y = bound.height * heightR, fn = function (e) {
                    return e < 0 && (e = 0), e;
                };
                x = fn(x), f = fn(f), m = fn(m), y = fn(y);
                p.dw = p.dw ? p.dw : node.width;
                p.dh = p.dh ? p.dh : node.height;
                var obj = {
                    x: x,
                    y: f,
                    width: m,
                    height: y,
                    destWidth: 500,
                    destHeight: 400,
                    fileType: "jpg",
                    success: function (obj) {
                        $log("save to file path success", obj.tempFilePath);
                        var pth = obj.tempFilePath;
                        window['wx'].shareAppMessage({
                            title: ret.paramCombine.shareContent,
                            imageUrl: pth,
                            query: ret.queryStr,
                            success: function (ret) {
                                onSucc(ret);
                            },
                            fail: function (ret) {
                                param.fail && param.fail(ret);
                            }
                        });
                    },
                    fail: function (ret) {
                        $error(JSON.stringify(ret));
                        param.fail && param.fail(ret);
                    }
                };
                canvas.toTempFilePath(obj);
            }
            else {
                param.fail && param.fail({ errMsg: "capture failed" });
            }
        };
        var shareCaptureNode = function () {
        };
        var shareRoomShare = function () {
            $log("=shareRoomShare=");
            var so = param.param;
            var defaultW = so.bgInfo.width || 360, defaultH = so.bgInfo.height || 280;
            var wx = window['wx'];
            var canvas = wx.createCanvas();
            var ctx = canvas.getContext("2d");
            var total = 0;
            var drawAvatar = function (idx, ply) {
                var img = wx.createImage();
                img.src = ply.avatarUrl || "";
                var drawOver = function () {
                    ctx.font = "16px serif";
                    ctx.fillStyle = "rgb(255,255,255)";
                    var str = igs.util.getFixString(ply.nickname, 6);
                    var width = ctx.measureText(str).width;
                    if (idx === 0) {
                        ctx.fillText(str, 55 - width / 2, 170);
                    }
                    else if (idx === 1) {
                        ctx.fillText(str, 180 - width / 2, 70);
                    }
                    else if (idx === 2) {
                        ctx.fillText(str, 305 - width / 2, 170);
                    }
                    total++;
                    if (total === so.plys.length) {
                        canvas.toTempFilePath({
                            x: 0,
                            y: 0,
                            width: defaultW,
                            height: defaultH,
                            success: function (res) {
                                wx.shareAppMessage({
                                    title: ret.paramCombine.shareContent,
                                    imageUrl: res.tempFilePath,
                                    query: ret.queryStr
                                });
                                ret.param.success && ret.param.success();
                            },
                            fail: function () {
                                ret.param.fail && ret.param.fail();
                            }
                        });
                    }
                };
                img.onerror = function () {
                    $error("room share: drawAvatar error:".concat(ply.avatarUrl));
                    drawOver();
                };
                img.onload = function () {
                    if (idx === 0) {
                        ctx.drawImage(img, 30, 100, 50, 50);
                    }
                    else if (idx === 1) {
                        ctx.drawImage(img, 150, 0, 50, 50);
                    }
                    else if (idx === 2) {
                        ctx.drawImage(img, 280, 100, 50, 50);
                    }
                    drawOver();
                };
            };
            var bg_img = wx.createImage();
            bg_img.src = so.bgInfo.url;
            var drawBgOver = function () {
                for (var i = 0; i < so.plys.length; i++) {
                    drawAvatar(i, so.plys[i]);
                }
            };
            bg_img.onload = function () {
                ctx.drawImage(bg_img, 0, 0, defaultW, defaultH);
                drawBgOver();
            };
            bg_img.onerror = function () {
                $error("room share: bg img load error:".concat(so.bgInfo.url));
                drawBgOver();
            };
        };
        switch (ret.param.style) {
            case igs.platform.EShareStyle.Common: {
                shareCommon();
                break;
            }
            case igs.platform.EShareStyle.Capture: {
                shareCapture();
                break;
            }
            case igs.platform.EShareStyle.CaptureNode: {
                shareCaptureNode();
                break;
            }
            case igs.platform.EShareStyle.RoomShare: {
                shareRoomShare();
                break;
            }
        }
    };
    WXPlatform.prototype.launchParam = function (key) {
        if (key) {
            for (var i in this.launchP) {
                if (i === key) {
                    return this.launchP[i];
                }
            }
        }
        return this.launchP;
    };
    WXPlatform.prototype.onShareAppMessage = function (fn) {
        var param = fn();
        var ret = this.processShareParam(param);
        window['wx'].onShareAppMessage(function () {
            return {
                title: ret.paramCombine.shareContent,
                imageUrl: ret.paramCombine.sharePicUrl,
                query: ret.queryStr
            };
        });
    };
    return WXPlatform;
}(BasePlatform));
var QQPlatform = (function (_super) {
    __extends(QQPlatform, _super);
    function QQPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QQPlatform;
}(BasePlatform));
var AndroidPlatform = (function (_super) {
    __extends(AndroidPlatform, _super);
    function AndroidPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AndroidPlatform;
}(BasePlatform));
var IOSPlatform = (function (_super) {
    __extends(IOSPlatform, _super);
    function IOSPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IOSPlatform;
}(BasePlatform));
var OPPOPlatform = (function (_super) {
    __extends(OPPOPlatform, _super);
    function OPPOPlatform(name) {
        var _this = _super.call(this, name) || this;
        _this.sysInfo = null;
        _this.sysInfo = window['qg'] && window['qg'].getSystemInfoSync() || {};
        $log("=OPPOPlatform=", _this.sysInfo);
        var _loop_2 = function (i) {
            $log("==OPPOPlatform==", i, this_1.sysInfo[i]);
            if (i === "notchHeight") {
                $log("==safeArea top==", this_1.sysInfo[i]);
                var safeArea_1 = igs.exports.safeArea;
                safeArea_1.top = Number(this_1.sysInfo[i]);
                cc.sys.getSafeAreaRect = function () {
                    var visibleSize = cc.view.getVisibleSize();
                    return cc.rect(0, 0, visibleSize.width, visibleSize.height - safeArea_1.top);
                };
            }
        };
        var this_1 = this;
        for (var i in _this.sysInfo) {
            _loop_2(i);
        }
        return _this;
    }
    return OPPOPlatform;
}(BasePlatform));
var VIVOPlatform = (function (_super) {
    __extends(VIVOPlatform, _super);
    function VIVOPlatform(name) {
        var _this = _super.call(this, name) || this;
        _this.sysInfo = null;
        var qg = window['qg'];
        _this.sysInfo = qg.getSystemInfoSync() || {};
        $log("=VIVOPlatform=", _this.sysInfo);
        for (var i in _this.sysInfo) {
            $log("==VIVOPlatform==", i, _this.sysInfo[i]);
        }
        var safeArea = igs.exports.safeArea;
        safeArea.top = Number(qg.getNotchHeightSync().height);
        cc.sys.getSafeAreaRect = function () {
            var visibleSize = cc.view.getVisibleSize();
            return cc.rect(0, 0, visibleSize.width, visibleSize.height - safeArea.top);
        };
        qg.onUpdateReady(function (res) {
            $log("isUpdate--- ".concat(res));
            if (res == 1) {
                qg.applyUpdate();
            }
        });
        return _this;
    }
    return VIVOPlatform;
}(BasePlatform));
cc.game.once("EVENT_BEFORE_LOAD_LAUNCHSCENE", function (cb) {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, $platform.loadPlugin()];
                case 1:
                    _a.sent();
                    $log("launch scene");
                    setInterval(function () {
                        $log("odc schedule");
                        $updateOdcData(true);
                    }, 300 * 1000);
                    $updateOdcData(true);
                    cb && cb();
                    return [2];
            }
        });
    }); })();
});
var $recorder = null;
var Recorder = (function () {
    function Recorder() {
        this.container = null;
        this.isMove = false;
        this.lastDesignResolution = cc.size(0, 0);
        this.widthRate = 1;
        this.heightRate = 1;
        this.rate = 1;
        this.fontSize = 21;
        this.timingFunc = null;
        this.timingObj = null;
        this.stopWithManual = false;
        this.maxSeconds = 300;
        this._videoData = null;
        var self = this;
        this.lastDesignResolution.width = cc.Canvas.instance.designResolution.width;
        this.lastDesignResolution.height = cc.Canvas.instance.designResolution.height;
        this.fixRate();
        cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function (scene) {
            self.fixRate();
            self.fitSize();
            self.lastDesignResolution.width = cc.Canvas.instance.designResolution.width;
            self.lastDesignResolution.height = cc.Canvas.instance.designResolution.height;
        });
    }
    Object.defineProperty(Recorder.prototype, "VideoData", {
        get: function () {
            return this._videoData;
        },
        set: function (data) {
            this._videoData = data;
        },
        enumerable: false,
        configurable: true
    });
    Recorder.prototype.isStopWithManual = function () {
        return this.stopWithManual;
    };
    Recorder.prototype.fixRate = function () {
        var last = this.lastDesignResolution;
        var now = cc.Canvas.instance.designResolution;
        this.widthRate = now.width / last.width;
        this.heightRate = now.height / last.height;
        this.rate = this.widthRate;
    };
    Recorder.prototype.fitSize = function () {
        this.container.scale = this.rate * this.container.scale;
        this.container.position = this.container.position.mul(this.rate);
        this.moveToSide(false);
    };
    Recorder.prototype.createBtn = function (sptFrame, parent) {
        var node = new cc.Node();
        parent.addChild(node);
        var spt = node.addComponent(cc.Sprite);
        spt.spriteFrame = sptFrame;
        spt.sizeMode = cc.Sprite.SizeMode.RAW;
        spt.type = cc.Sprite.Type.SIMPLE;
        var btn = node.addComponent(cc.Button);
        btn.target = node;
        btn.transition = cc.Button.Transition.COLOR;
        return btn;
    };
    Recorder.prototype.createLabel = function (parent) {
        var node = new cc.Node();
        parent.addChild(node);
        var lbl = node.addComponent(cc.Label);
        lbl.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        lbl.verticalAlign = cc.Label.VerticalAlign.CENTER;
        lbl.fontSize = this.fontSize;
        lbl.node.color = cc.color(242, 242, 243);
        lbl.overflow = cc.Label.Overflow.NONE;
        return lbl;
    };
    Recorder.prototype.reset = function () {
        var startBtn = this.container.getChildByName("start");
        var stopBtn = this.container.getChildByName('stop');
        var time = this.container.getChildByName("time").getComponent(cc.Label);
        startBtn.active = true;
        stopBtn.active = false;
        time.string = "00:00";
    };
    Recorder.prototype.startTime = function () {
        var _this = this;
        var lbl = this.container.getChildByName("time").getComponent(cc.Label);
        var seconds = 0;
        if (!this.timingObj) {
            this.timingObj = newScheduleObj();
            this.timingFunc = function () {
                if (seconds >= _this.maxSeconds) {
                    return;
                }
                seconds++;
                var min = Math.floor(seconds / 60);
                var minStr = "" + min;
                if (min < 10) {
                    minStr = "0" + min;
                }
                var sec = seconds % 60;
                var secStr = "" + sec;
                if (sec < 10) {
                    secStr = "0" + sec;
                }
                lbl.string = minStr + ":" + secStr;
            };
            cc.director.getScheduler().schedule(this.timingFunc, this.timingObj, 1);
        }
    };
    Recorder.prototype.stopTime = function () {
        if (this.timingFunc && this.timingObj) {
            cc.director.getScheduler().unschedule(this.timingFunc, this.timingObj);
            this.timingObj = null;
            this.timingFunc = null;
        }
    };
    Recorder.create = function (prefab, cbStart, cbStop) {
        var recorder = new Recorder();
        var container = cc.instantiate(prefab);
        recorder.container = container;
        $igsNode.addChild(container);
        container.position = cc.v3(0, cc.winSize.height / 2);
        var btnStart = container.getChildByName("start").getComponent(cc.Button);
        btnStart.node.active = true;
        var btnStop = container.getChildByName("stop").getComponent(cc.Button);
        btnStop.node.active = false;
        var lbl = container.getChildByName("time").getComponent(cc.Label);
        lbl.string = "00:00";
        lbl.node.active = true;
        btnStart.node.on('click', function () {
            if (recorder.isMove) {
                return;
            }
            cbStart();
            recorder.stopWithManual = false;
            recorder.startTime();
            btnStart.node.active = false;
            btnStop.node.active = true;
            recorder.moveToSide();
        });
        container.on(cc.Node.EventType.TOUCH_START, recorder.onTouchStart, recorder);
        container.on(cc.Node.EventType.TOUCH_MOVE, recorder.onTouchMove, recorder);
        container.on(cc.Node.EventType.TOUCH_END, recorder.onTouchEnd, recorder);
        container.on(cc.Node.EventType.TOUCH_CANCEL, recorder.onTouchEnd, recorder);
        btnStop.node.on('click', function () {
            if (recorder.isMove) {
                return;
            }
            cbStop();
            recorder.stopWithManual = true;
            recorder.stopTime();
            recorder.reset();
            btnStart.node.active = true;
            btnStop.node.active = false;
            recorder.moveToSide();
        });
        container.on(cc.Node.EventType.TOUCH_START, recorder.onTouchStart, recorder);
        container.on(cc.Node.EventType.TOUCH_MOVE, recorder.onTouchMove, recorder);
        container.on(cc.Node.EventType.TOUCH_END, recorder.onTouchEnd, recorder);
        container.on(cc.Node.EventType.TOUCH_CANCEL, recorder.onTouchEnd, recorder);
        btnStart.node.on(cc.Node.EventType.TOUCH_START, recorder.onTouchStart, recorder);
        btnStart.node.on(cc.Node.EventType.TOUCH_MOVE, recorder.onTouchMove, recorder);
        btnStart.node.on(cc.Node.EventType.TOUCH_END, recorder.onTouchEnd, recorder);
        btnStart.node.on(cc.Node.EventType.TOUCH_CANCEL, recorder.onTouchEnd, recorder);
        btnStop.node.on(cc.Node.EventType.TOUCH_START, recorder.onTouchStart, recorder);
        btnStop.node.on(cc.Node.EventType.TOUCH_MOVE, recorder.onTouchMove, recorder);
        btnStop.node.on(cc.Node.EventType.TOUCH_END, recorder.onTouchEnd, recorder);
        btnStop.node.on(cc.Node.EventType.TOUCH_CANCEL, recorder.onTouchEnd, recorder);
        recorder.fitSize();
        return recorder;
    };
    Recorder.prototype.moveToSide = function (withAni) {
        if (withAni === void 0) { withAni = true; }
        var startBtn = this.container.getChildByName("start");
        var stopBtn = this.container.getChildByName('stop');
        var box = startBtn.getBoundingBoxToWorld();
        var btn = startBtn;
        if (!startBtn.active) {
            box = stopBtn.getBoundingBoxToWorld();
            btn = stopBtn;
        }
        btn = this.container;
        var canvasBox = cc.Canvas.instance.node.getBoundingBoxToWorld();
        var rect = new cc.Rect();
        canvasBox.intersection(rect, btn.getBoundingBoxToWorld());
        var minX = btn.width * btn.scale / 2, minY = btn.height * btn.scale / 2, maxX = cc.winSize.width - btn.width * btn.scale / 2, maxY = cc.winSize.height - btn.height * btn.scale / 2;
        var currPos = btn.convertToWorldSpaceAR(cc.v2());
        var newX = currPos.x;
        var newY = currPos.y;
        if (minX > currPos.x) {
            newX = minX;
        }
        else if (maxX < currPos.x) {
            newX = maxX;
        }
        else if (maxX - currPos.x > currPos.x - minX) {
            newX = minX;
        }
        else {
            newX = maxX;
        }
        if (minY > currPos.y) {
            newY = minY;
        }
        else if (maxY < currPos.y) {
            newY = maxY;
        }
        var dtPos = cc.v3(cc.v2(newX, newY).sub(currPos), 0);
        this.container.stopAllActions();
        var time = 0;
        if (withAni) {
            time = 0.2;
        }
        cc.tween(this.container).by(time, { position: dtPos }).start();
    };
    Recorder.prototype.onTouchStart = function (event) {
        this.isMove = false;
    };
    Recorder.prototype.onTouchMove = function (event) {
        this.container.x += event.getDeltaX();
        this.container.y += event.getDeltaY();
        this.isMove = true;
    };
    Recorder.prototype.onTouchEnd = function (event) {
        this.moveToSide();
    };
    Recorder.prototype.show = function () {
        this.container.active = true;
    };
    Recorder.prototype.hide = function () {
        this.container.active = false;
    };
    return Recorder;
}());
var TTPlatform = (function (_super) {
    __extends(TTPlatform, _super);
    function TTPlatform(name) {
        var _this = _super.call(this, name) || this;
        _this.sysInfo = null;
        _this.sysInfo = window['tt'] && window['tt'].getSystemInfoSync() || {};
        return _this;
    }
    TTPlatform.prototype.request = function (req) {
        req.method = req.method || "POST";
        var url = req.url, body = req.body || {}, head = req.head || {}, method = req.method;
        return new Promise(function (rlv, rej) {
            var xhr = new XMLHttpRequest();
            var request = _linkParam(url, body);
            xhr.open(method, request, true);
            if (igs.util.isNative()) {
                xhr.setRequestHeader("Accept", "text/html");
                xhr.setRequestHeader("Accept-Charset", "utf-8");
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }
            if (head) {
                for (var key in head) {
                    if (head[key]) {
                        xhr.setRequestHeader(key, head[key]);
                    }
                }
            }
            xhr.onabort = function () { return rej({ err: new Error("the request has been aborted"), data: null }); };
            xhr.onerror = function (event) { return rej({ err: new Error(JSON.stringify(event)), data: null }); };
            xhr.ontimeout = function (event) { return rej({ err: new Error("timeout"), data: null }); };
            xhr.onreadystatechange = function (t) {
                if (4 === xhr.readyState) {
                    if (200 === xhr.status) {
                        var rsp = xhr.response;
                        if (typeof (rsp) === "string") {
                            rlv({ err: null, data: JSON.parse(rsp) });
                        }
                        else {
                            rej({ err: new Error(rsp), data: null });
                        }
                    }
                    else {
                        rej({ err: new Error(xhr.response), data: null });
                    }
                }
            };
            if (body) {
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                var urlParams = new URLSearchParams();
                for (var key in body) {
                    if (typeof body[key] === "string" || typeof body[key] === "number" || typeof body[key] === "boolean") {
                        urlParams.append(key, body[key]);
                    }
                    else if (typeof body[key] === "object" && body[key]) {
                        urlParams.append(key, JSON.stringify(body[key]));
                    }
                }
                xhr.send(urlParams.toString());
            }
            else {
                xhr.send();
            }
        });
    };
    TTPlatform.prototype.ScreenCap = function (info) {
        if (!$igsNode) {
            $log("igs node is null");
            return null;
        }
        var tt = window['tt'];
        var recorder = null;
        var screenWidth = this.sysInfo.screenWidth;
        var screenHeight = this.sysInfo.screenHeight;
        recorder = tt.getGameRecorderManager();
        var maskInfo = recorder.getMark();
        var x = (screenWidth - maskInfo.markWidth) / 2;
        var y = (screenHeight - maskInfo.markHeight) / 2;
        recorder.onStart(function (res) {
            $log("录屏开始");
            $recorder.VideoData = null;
            typeof info.onStart === "function" && info.onStart(res);
        });
        var share = function () {
            if ($recorder.VideoData == null) {
                $log("=share failed, videoData is null=");
                return;
            }
            tt.shareAppMessage({
                channel: "video",
                extra: {
                    videoPath: $recorder.VideoData['videoPath'],
                },
                success: function (res) {
                    $log("分享视频成功");
                },
                fail: function (e) {
                    $log("分享失败", e);
                    if (e && e['errNo'] == 21105) {
                        tt.showModal({
                            title: "分享失败",
                            content: "录屏时间至少为3秒！",
                            success: function (res) {
                                if (res.confirm) {
                                    $log("confirm, continued");
                                }
                                else if (res.cancel) {
                                    $log("cancel, cold");
                                }
                                else {
                                }
                            },
                            fail: function (res) {
                                $log("showModal\u8C03\u7528\u5931\u8D25");
                            }
                        });
                    }
                }
            });
        };
        recorder.onStop(function (res) {
            $log("录屏结束", res);
            $recorder.VideoData = res;
            if ($recorder.isStopWithManual()) {
                $recorder.reset();
            }
            typeof info.onStop === "function" && info.onStop(res);
            if ($recorder && $recorder.isStopWithManual()) {
                share();
            }
        });
        recorder.onResume(function () {
            $log("录屏恢复");
            typeof info.onResume === "function" && info.onResume();
        });
        recorder.onPause(function () {
            $log("录屏暂停");
            typeof info.onPause === "function" && info.onPause();
        });
        recorder.onError(function (res) {
            $log("录屏错误");
            $recorder.reset();
            typeof info.onError === "function" && info.onError(res);
        });
        cc.resources.load("screencap/screencap", cc.Prefab, function (err, res) {
            if (err) {
                $log("prefab screencap/screencap not exist in resources dir! screencap function is invalid");
                return;
            }
            var startFunc = function () {
                $log("开始录制");
                if (recorder) {
                    recorder.start({
                        duration: 60 * 5,
                        isMarkOpen: true,
                        locLeft: x,
                        locTop: y,
                    });
                }
            };
            var stopFunc = function () {
                $log("结束录制");
                if (recorder) {
                    if ($recorder.VideoData == null) {
                        recorder.stop();
                    }
                    else {
                        share();
                    }
                }
            };
            $recorder = Recorder.create(res, startFunc, stopFunc);
        });
        return null;
    };
    TTPlatform.prototype.userLabel = function () {
        var label = [];
        if (typeof window['iGaoShouApi'] === "undefined") {
            label.push("rc-unknown");
            return label;
        }
        var self = window['iGaoShouApi'].GetSelf();
        if (!self) {
            label.push("rc-err1");
            return label;
        }
        label.push("rc-" + self.playGames);
        return label;
    };
    return TTPlatform;
}(BasePlatform));
var Platform = (function () {
    function Platform() {
    }
    Platform.getInstance = function () {
        if (CC_EDITOR) {
            return;
        }
        if (this.instance) {
            return;
        }
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if ("undefined" !== typeof window['wx'] && "undefined" === typeof window['qq']) {
                this.instance = new WXPlatform("wx");
            }
            else if ("undefined" !== typeof window['qq']) {
                this.instance = new QQPlatform("qq");
            }
        }
        else if (cc.sys.platform === cc.sys.BYTEDANCE_GAME) {
            this.instance = new TTPlatform("bytedance");
        }
        else if (cc.sys.platform === cc.sys.OPPO_GAME) {
            this.instance = new OPPOPlatform("oppo");
        }
        else if (cc.sys.platform === cc.sys.VIVO_GAME) {
            this.instance = new VIVOPlatform("vivo");
        }
        else if (CC_JSB) {
            if (cc.sys.os === cc.sys.OS_ANDROID) {
                this.instance = new AndroidPlatform("android");
            }
            else {
                this.instance = new IOSPlatform("ios");
            }
        }
        else if (cc.sys.isBrowser) {
            this.instance = new WebPlatform("web");
        }
        else {
            this.instance = new DebugPlatform("debug");
        }
        if (this.instance) {
            igs.http.request = this.instance.request;
        }
        return this.instance;
    };
    Platform.instance = null;
    return Platform;
}());
(function (igs) {
    var bundle;
    (function (bundle_1) {
        var BundleConfig = (function () {
            function BundleConfig(name, bundle, index, event, isNeedPrompt, isAutoRun) {
                if (isNeedPrompt === void 0) { isNeedPrompt = false; }
                if (isAutoRun === void 0) { isAutoRun = true; }
                this.bundle = "";
                this.name = "";
                this.versionName = "";
                this.versionCode = 0;
                this.description = "";
                this.index = 0;
                this.run = null;
                this.event = igs.consts.Event.ENTER_GAME;
                this.isNeedPrompt = false;
                this.isAutoRun = true;
                this.name = name;
                this.bundle = bundle;
                this.index = index;
                this.isNeedPrompt = isNeedPrompt;
                this.isAutoRun = isAutoRun;
                if (event) {
                    this.event = event;
                }
            }
            return BundleConfig;
        }());
        bundle_1.BundleConfig = BundleConfig;
        var BundleLoadProgress = (function () {
            function BundleLoadProgress() {
                this.progress = 0;
                this.bytesWritten = 0;
                this.bytesExpectedToWrite = 0;
                this.tip = "";
            }
            return BundleLoadProgress;
        }());
        bundle_1.BundleLoadProgress = BundleLoadProgress;
    })(bundle = igs.bundle || (igs.bundle = {}));
})(igs = exports.igs || (exports.igs = {}));
var $hostname = (_a = {},
    _a[igs.consts.ENV.ENV_SANDBOX] = "igaoshou.mcbeam.cc",
    _a[igs.consts.ENV.ENV_PRODUCTION] = "igaoshou.weipinggame.com.cn",
    _a[igs.consts.ENV.ENV_ABROAD] = "igaoshou.mcbeam.dev",
    _a);
var $statichostname = (_b = {},
    _b[igs.consts.ENV.ENV_SANDBOX] = "igaoshou.mcbeam.cc",
    _b[igs.consts.ENV.ENV_PRODUCTION] = "gamefile.weipinggame.com.cn/igaoshou",
    _b[igs.consts.ENV.ENV_ABROAD] = "igaoshou.mcbeam.dev",
    _b);
var $downloadhostname = (_c = {},
    _c[igs.consts.ENV.ENV_SANDBOX] = "download.mcbeam.cc",
    _c[igs.consts.ENV.ENV_PRODUCTION] = "gamefile.weipinggame.com.cn/igaoshou",
    _c[igs.consts.ENV.ENV_ABROAD] = "download.mcbeam.dev",
    _c);
var HttpManager = (function () {
    function HttpManager() {
    }
    HttpManager.prototype.loadOnlineParam = function (callback) {
        return new Promise(function (rlv, rej) {
            $log("=loadOnlineParam=");
            var ONLINE_PARAM_URI = "onlineparam/wechat/".concat($global.pn, "/onlineparam.json");
            var host = $downloadhostname[$global.env];
            igs.http.request({ url: "https://" + host + "/" + ONLINE_PARAM_URI, method: "GET" }).then(function (ret) {
                rlv(ret);
            }).catch(function (ret) {
                rej(ret);
            });
        });
    };
    HttpManager.prototype.checkUpdate = function (bundles) {
        return new Promise(function (rlv, rej) {
            var CHECK_UPDATE_URI = "api/mcbeam-version-api/config/checkUpdate";
            var host = $hostname[$global.env];
            host = host.replace("igaoshou.", "mcbeam.");
            var param = {
                pn: $global.pn,
                moduleName: bundles.join(","),
                platform: getPlatStr(),
                plat_aid: $global.platId,
            };
            igs.http.request({ url: "https://" + host + "/" + CHECK_UPDATE_URI, body: param }).then(function (ret) {
                rlv(ret);
            }).catch(function (ret) {
                rej(ret);
            });
        });
    };
    return HttpManager;
}());
var $httpMgr = new HttpManager();
var dummyBtCallback = function (bt, params) { };
(function (igs) {
    var listener;
    (function (listener) {
        var DefaultBundleBooter = (function () {
            function DefaultBundleBooter() {
            }
            DefaultBundleBooter.prototype.init = function (bundleConfig, initparams, cb) {
                cb || (cb = dummyBtCallback);
                cb(this, { success: true });
            };
            DefaultBundleBooter.prototype.onMatch = function (matchInfo, opponentId, roomInfo) {
                $warn("call DefaultBundleBooter onMatch");
            };
            DefaultBundleBooter.prototype.onJoin = function (players, roomInfo) {
                $warn("call DefaultBundleBooter onJoin");
            };
            return DefaultBundleBooter;
        }());
        listener.DefaultBundleBooter = DefaultBundleBooter;
    })(listener = igs.listener || (igs.listener = {}));
})(igs = exports.igs || (exports.igs = {}));
var BundleUpdateWrapper = (function () {
    function BundleUpdateWrapper(bundle) {
        this.bundle = null;
        this.updateData = null;
        this.listenerWrappers = [];
        this.bundle = bundle;
    }
    return BundleUpdateWrapper;
}());
var $batchUpdateWrapperID = 0;
var BatchUpdateWrapper = (function () {
    function BatchUpdateWrapper() {
        this.finish = false;
        this.id = ++$batchUpdateWrapperID;
        this.updateWrapper = [];
        this.listener = null;
    }
    BatchUpdateWrapper.get = function () {
        var buw = new BatchUpdateWrapper();
        ++buw.id;
        return buw;
    };
    BatchUpdateWrapper.prototype.getBundleNames = function () {
        var ret = [];
        for (var _i = 0, _a = this.updateWrapper; _i < _a.length; _i++) {
            var i = _a[_i];
            ret.push(i.bundle.bundle);
        }
        return ret;
    };
    return BatchUpdateWrapper;
}());
var $dummyRemoteInfo = { url: "https://", versionCode: 0, versionName: "", zipSize: 0, extparam: "" };
var BundleManager = (function () {
    function BundleManager() {
        this.isLoading = false;
        this.loadedBundle = [];
        this.bundleRemoteHost = {};
        this.updateWrapper = [];
        this.batchWrapper = [];
        this.needRestart = false;
        this.checkedData = { "main": false, "resources": false };
        if (CC_EDITOR) {
            return;
        }
        $log("bundleMgr init");
    }
    BundleManager.prototype.getBundleInfo = function (bundleName) {
        return (this.bundleRemoteHost[bundleName] || {});
    };
    BundleManager.prototype.clearUpdateWrapper = function () {
        this.updateWrapper.length = 0;
    };
    BundleManager.prototype.getBundleUpdateInfo = function (bundles) {
        var self = this;
        return new Promise(function (rlv, rej) {
            if (bundles.length > 0) {
                bundles.forEach(function (b) {
                    delete self.bundleRemoteHost[b];
                });
                $httpMgr.checkUpdate(bundles).then(function (ret) {
                    try {
                        $log("==getBundleUpdateInfo==", JSON.stringify(ret.data));
                        if (ret.data.code === "00000") {
                            if (ret.data.data != null && ret.data.data != "null") {
                                var uptData = [];
                                try {
                                    uptData = JSON.parse(ret.data.data);
                                }
                                catch (e) { }
                                $log("==uptData==", JSON.stringify(uptData));
                                for (var _i = 0, uptData_1 = uptData; _i < uptData_1.length; _i++) {
                                    var i = uptData_1[_i];
                                    var name_1 = i.module_name;
                                    var remoteHost = i.url;
                                    var versionName = i.version_name;
                                    var versionCode = i.version_code;
                                    var zipSize = i.zip_size || 0;
                                    var extparam = i.extparam || "{}";
                                    try {
                                        extparam = JSON.parse(extparam);
                                    }
                                    catch (e) {
                                        $warn("".concat(name_1, " extparam not json format"));
                                        extparam = {};
                                    }
                                    if (remoteHost && remoteHost[remoteHost.length - 1] !== "/") {
                                        remoteHost += "/";
                                    }
                                    $log("==bundle remotehost==", name_1, remoteHost);
                                    self.bundleRemoteHost[name_1] = {
                                        url: remoteHost || "https://",
                                        versionCode: parseInt(versionCode),
                                        zipSize: parseInt(zipSize),
                                        versionName: versionName,
                                        extparam: extparam
                                    };
                                }
                                rlv(null);
                                return;
                            }
                            else {
                                $log("==bundle remote no data==");
                                rlv(null);
                                return;
                            }
                        }
                        else {
                            $error("===getBundleUpdateInfo failed===");
                            rej(null);
                            return;
                        }
                    }
                    catch (e) {
                        $error("checkUpdate exception:", e.message);
                        rej(null);
                    }
                }).catch(function (data) {
                    $log("==checkUpdate exception==:", data);
                    rej(null);
                });
            }
            else {
                rej(null);
            }
        });
    };
    BundleManager.prototype.onBatchDownloadInfoEvent = function (updateWrapper) {
        var _this = this;
        var func = function (batch) {
            var isAllDownloadInfoGot = true;
            var allDownloadInfoBundles = [];
            var downloadInfoFailedBundles = [];
            var isSomeOneDownloadInfoFailed = false;
            for (var _i = 0, _a = batch.updateWrapper; _i < _a.length; _i++) {
                var uw = _a[_i];
                if (!uw.updateData) {
                    $log("=onBatchDownloadInfoEvent=", uw.bundle.bundle);
                    isAllDownloadInfoGot = false;
                    break;
                }
                if (uw.updateData.ret === igs.hotUpdate.HotUpdateCode.BUNDLE_NOT_EXIST_EVERYWHERE) {
                    isSomeOneDownloadInfoFailed = true;
                    downloadInfoFailedBundles.push(uw.updateData);
                }
                else if (uw.updateData.ret === igs.hotUpdate.HotUpdateCode.NEW_VERSION_FOUND) {
                    allDownloadInfoBundles.push(uw.updateData);
                }
            }
            switch (updateWrapper.updateData.ret) {
                case igs.hotUpdate.HotUpdateCode.NEW_VERSION_FOUND:
                    $log("==batch updateinfo download info, this bundlename: ".concat(updateWrapper.updateData.bundleName, "=="));
                    break;
                case igs.hotUpdate.HotUpdateCode.BUNDLE_NOT_EXIST_EVERYWHERE:
                    $log("==batch updateinfo failed, this bundlename: ".concat(updateWrapper.updateData.bundleName, "==\""));
                    batch.listener.onOneDownloadInfoFailed(updateWrapper.updateData);
                    break;
                case igs.hotUpdate.HotUpdateCode.USE_LOCAL_BUNDLE:
                case igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE:
                    $log("==batch updateinfo success, this bundlename: ".concat(updateWrapper.updateData.bundleName, "=="));
                    batch.listener.onOneDownloadInfoSuccess(updateWrapper.updateData);
                    break;
            }
            if (isAllDownloadInfoGot) {
                var isNeedPrompt_1 = false;
                batch.updateWrapper.forEach(function (uw) {
                    var needUpdateBundle = allDownloadInfoBundles.find(function (ud) {
                        return ud.bundleName === uw.bundle.bundle;
                    });
                    var failedBundle = downloadInfoFailedBundles.find(function (ud) {
                        return ud.bundleName === uw.bundle.bundle;
                    });
                    if (needUpdateBundle) {
                        uw.updateData = null;
                    }
                    else if (!failedBundle) {
                        uw.updateData.ret = igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE;
                    }
                    if (uw.bundle.isNeedPrompt) {
                        isNeedPrompt_1 = true;
                    }
                });
                if (isSomeOneDownloadInfoFailed) {
                    batch.listener.onSomeDownloadInfoFailed(downloadInfoFailedBundles);
                    batch.finish = true;
                }
                else {
                    batch.listener.onAllDownloadInfoSuccess(allDownloadInfoBundles);
                    if (allDownloadInfoBundles.length > 0) {
                        if (!isNeedPrompt_1) {
                            _this.doUpdate(batch);
                        }
                    }
                    else {
                        _this.onBatchUpdateEvent(updateWrapper);
                    }
                }
            }
        };
        var parentBatchWrapper = updateWrapper.listenerWrappers;
        parentBatchWrapper.forEach(function (bw) {
            func(bw);
        });
        for (var i = 0; i < parentBatchWrapper.length;) {
            var bw = parentBatchWrapper[i];
            if (bw.finish && this.removeBatchUpdate(bw)) {
            }
            else {
                i++;
            }
        }
    };
    BundleManager.prototype.onBatchUpdateEvent = function (updateWrapper) {
        var _this = this;
        var self = this;
        var func = function (batch) {
            var isAllDownloadOver = true;
            var isSomeOneDownloadFailed = false;
            var allDownloadBundles = [];
            var downloadFailedBundles = [];
            for (var _i = 0, _a = batch.updateWrapper; _i < _a.length; _i++) {
                var uw = _a[_i];
                if (!uw.updateData || uw.updateData.ret === igs.hotUpdate.HotUpdateCode.DOWNLOADING_ASSETS) {
                    isAllDownloadOver = false;
                    break;
                }
                if (uw.updateData.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FAILED) {
                    isSomeOneDownloadFailed = true;
                    downloadFailedBundles.push(uw.updateData);
                }
                else if (uw.updateData.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED
                    || uw.updateData.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED_NOTHING
                    || uw.updateData.ret === igs.hotUpdate.HotUpdateCode.USE_LOCAL_BUNDLE) {
                    allDownloadBundles.push(uw.updateData);
                }
            }
            switch (updateWrapper.updateData.ret) {
                case igs.hotUpdate.HotUpdateCode.UPDATE_FAILED:
                    break;
                case igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE:
                case igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED_NOTHING:
                case igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED:
                    $log("==batch update success, ret: ".concat(updateWrapper.updateData.ret, ", this bundlename: ").concat(updateWrapper.updateData.bundleName, "=="));
                    batch.listener.onOneDownloadSuccess(updateWrapper.updateData);
                    break;
            }
            if (isAllDownloadOver) {
                $log("==batch update all over==");
                if (!isSomeOneDownloadFailed) {
                    $log("==batch update all success==", _this.updateWrapper.length);
                    allDownloadBundles.forEach(function (db) {
                        if (db.bundleName === "main" || db.bundleName === "resources") {
                            self.checkedData[db.bundleName] = true;
                        }
                    });
                    batch.listener.onAllDownloadSuccess(allDownloadBundles);
                    if (_this.needRestart) {
                        $log("main do updated, need restart!");
                        cc.audioEngine.stopAll();
                        cc.game.restart();
                        return;
                    }
                    else {
                        $log("main do not updated, skip restart!");
                    }
                    batch.updateWrapper.forEach(function (b) {
                        b.updateData.ret = igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE;
                    });
                    batch.updateWrapper.forEach(function (b) {
                        _this.loadBundle(b.updateData, b);
                    });
                }
                else {
                    $log("==batch update some failed==");
                    batch.listener.onSomeDownloadFailed(downloadFailedBundles);
                    batch.finish = true;
                }
            }
        };
        var parentBatchWrapper = updateWrapper.listenerWrappers;
        parentBatchWrapper.forEach(function (bw) {
            func(bw);
        });
        for (var i = 0; i < parentBatchWrapper.length;) {
            var bw = parentBatchWrapper[i];
            if (bw.finish && this.removeBatchUpdate(bw)) {
            }
            else {
                i++;
            }
        }
    };
    BundleManager.prototype.onBatchLoadEvent = function (updateWrapper) {
        var _this = this;
        var func = function (batch) {
            var isAllLoadFinish = true;
            var isSomeOneLoadFailed = false;
            var allLoadBundles = [];
            var loadFailedBundles = [];
            for (var _i = 0, _a = batch.updateWrapper; _i < _a.length; _i++) {
                var uw = _a[_i];
                if (uw.updateData.ret === igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE || uw.updateData.ret === igs.hotUpdate.HotUpdateCode.BUNDLE_LOADING) {
                    isAllLoadFinish = false;
                    break;
                }
                if (uw.updateData.ret === igs.hotUpdate.HotUpdateCode.BUNDLE_LOAD_FAILED) {
                    isSomeOneLoadFailed = true;
                    loadFailedBundles.push(uw.updateData);
                }
                else if (uw.updateData.ret === igs.hotUpdate.HotUpdateCode.BUNDLE_LOAD_SUCCESS) {
                    allLoadBundles.push(uw.updateData);
                }
            }
            switch (updateWrapper.updateData.ret) {
                case igs.hotUpdate.HotUpdateCode.BUNDLE_LOAD_FAILED:
                    batch.listener.onOneLoadFailed(updateWrapper.updateData);
                    break;
                case igs.hotUpdate.HotUpdateCode.BUNDLE_LOAD_SUCCESS:
                    batch.listener.onOneLoadSuccess(updateWrapper.updateData);
                    break;
            }
            if (isAllLoadFinish) {
                var self_1 = _this;
                $log("==batch load all over==");
                if (isSomeOneLoadFailed) {
                    $log("==batch load some failed==");
                    var delayF_1 = batch.listener.onSomeLoadFailed.bind(batch.listener);
                    setTimeout(function () {
                        delayF_1(loadFailedBundles);
                    }, 0);
                }
                else {
                    $log("==batch load all success==");
                    allLoadBundles.forEach(function (db) {
                        if (db.bundleName === "main" || db.bundleName === "resources") {
                            self_1.checkedData[db.bundleName] = true;
                        }
                    });
                    var i18n = window['i18n'];
                    i18n && i18n.reload && i18n.reload();
                    var delayF_2 = batch.listener.onAllLoadSuccess.bind(batch.listener);
                    setTimeout(function () {
                        delayF_2(allLoadBundles);
                    }, 0);
                }
                batch.finish = true;
            }
        };
        var parentBatchWrapper = updateWrapper.listenerWrappers;
        parentBatchWrapper.forEach(function (bw) {
            func(bw);
        });
        for (var i = 0; i < parentBatchWrapper.length;) {
            var bw = parentBatchWrapper[i];
            if (bw.finish && this.removeBatchUpdate(bw)) {
            }
            else {
                i++;
            }
        }
    };
    BundleManager.prototype.checkUpdate = function (config, updateWrapper) {
        var _this = this;
        var self = this;
        $hotUpdate.checkUpdate({
            bundleName: config.bundle,
            remoteInfo: this.bundleRemoteHost[config.bundle] || $dummyRemoteInfo
        }, function (vd) {
            updateWrapper.updateData = vd;
            if (vd.ret === igs.hotUpdate.HotUpdateCode.BUNDLE_NOT_EXIST_EVERYWHERE) {
                $log("==bundle not exist in everywhere==");
                self.isLoading = false;
                _this.onBatchDownloadInfoEvent(updateWrapper);
            }
            else if (vd.ret === igs.hotUpdate.HotUpdateCode.USE_LOCAL_BUNDLE) {
                $log("==use local bundle==");
                _this.onBatchDownloadInfoEvent(updateWrapper);
            }
            else if (vd.ret === igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE) {
                $log("==already up to date==");
                _this.onBatchDownloadInfoEvent(updateWrapper);
            }
            else if (vd.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED_NOTHING) {
                $log("==no need download==");
                _this.onBatchUpdateEvent(updateWrapper);
            }
            else if (vd.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED) {
                $log("==remote same to cache==");
                _this.onBatchUpdateEvent(updateWrapper);
            }
            else if (vd.ret === igs.hotUpdate.HotUpdateCode.NEW_VERSION_FOUND) {
                $log("==new version data==", vd.bundleName, vd.newVersion, vd.totalToDownloadBytesCount, vd.totalToDownloadFiles);
                updateWrapper.listenerWrappers.forEach(function (lw) {
                    lw.listener.onOneDownloadInfoSuccess(vd);
                });
                _this.onBatchDownloadInfoEvent(updateWrapper);
            }
            else if (vd.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FAILED) {
                $log("==check update failed==");
                self.isLoading = false;
                _this.onBatchUpdateEvent(updateWrapper);
            }
            else {
                $log("==error: unknown state==");
            }
        });
    };
    BundleManager.prototype.updateAllBatch = function () {
        var _this = this;
        this.batchWrapper.forEach(function (bw) { return _this.doUpdate(bw); });
    };
    BundleManager.prototype.doUpdate = function (batch) {
        $log("=doUpdate=", batch.getBundleNames().join(","));
        var self = this;
        var upt = function (bundleName, updateWrapper) {
            $hotUpdate.doUpdate(bundleName, function (ud) {
                $log("==downloading==", ud.ret, ud.bundleName, ud.downloadedByteCount, ud.totalToDownloadBytesCount);
                if (ud.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FINISHED || ud.ret === igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE) {
                    $log("==download finish==");
                    updateWrapper.updateData = ud;
                    self.onBatchUpdateEvent(updateWrapper);
                }
                else if (ud.ret === igs.hotUpdate.HotUpdateCode.DOWNLOADING_ASSETS) {
                    if (ud.bundleName === "main" || ud.bundleName === "resources") {
                        self.needRestart = true;
                    }
                    updateWrapper.listenerWrappers.forEach(function (lw) {
                        lw.listener.onDownloadProgress(ud);
                    });
                }
                else if (ud.ret === igs.hotUpdate.HotUpdateCode.UPDATE_FAILED) {
                    $log("==do update failed==");
                    updateWrapper.updateData = ud;
                    self.isLoading = false;
                    self.onBatchUpdateEvent(updateWrapper);
                }
                else {
                    $log("==doUpdate unknown state==");
                }
            });
        };
        batch.updateWrapper.forEach(function (uw) {
            upt(uw.bundle.bundle, uw);
        });
    };
    BundleManager.prototype.getAllUpdateData = function () {
        var ret = [];
        this.updateWrapper.forEach(function (uw) {
            if (uw.updateData) {
                ret.push(uw.updateData);
            }
        });
        return ret;
    };
    BundleManager.prototype.updateBundles = function (bundles, listener) {
        var _this = this;
        if (!this.checkedData["main"]) {
            if (!bundles.find(function (bc) {
                return bc.bundle === "main";
            })) {
                bundles.push(new igs.bundle.BundleConfig("main", "main", 0, igs.consts.Event.ENTER_MAIN, false, false));
            }
        }
        if (!this.checkedData["resources"]) {
            if (!bundles.find(function (bc) {
                return bc.bundle === "resources";
            })) {
                bundles.push(new igs.bundle.BundleConfig("resources", "resources", 1, igs.consts.Event.ENTER_GAME, false, false));
            }
        }
        var bnames = [];
        bundles.forEach(function (b) {
            bnames.push(b.bundle);
        });
        $log("==updateBundles==", bnames.join(","), this.updateWrapper.length, this.batchWrapper.length);
        var self = this;
        var next = function (toloadBundles) {
            toloadBundles.forEach(function (b) {
                var ret = self.updateWrapper.find(function (buw) {
                    return buw.bundle.bundle === b.bundle;
                });
                if (ret) {
                    if (!ret.updateData) {
                        var ud = new igs.hotUpdate.UpdateData(igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE, b.bundle);
                        ud.bundleDir = b.bundle;
                        ret.updateData = ud;
                    }
                    if (ret.updateData.ret === igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE) {
                        self.loadBundle(ret.updateData, ret);
                    }
                }
                else {
                    $log("ERROR: this bundle not in updateWrapper: ".concat(ret.bundle));
                }
            });
        };
        var batchW = BatchUpdateWrapper.get();
        this.batchWrapper.push(batchW);
        batchW.listener = listener;
        var newCheckbundles = [];
        bundles.forEach(function (b) {
            var ret = _this.updateWrapper.find(function (buw) {
                return buw.bundle.bundle === b.bundle;
            });
            if (!ret) {
                newCheckbundles.push(b.bundle);
                ret = new BundleUpdateWrapper(b);
                _this.updateWrapper.push(ret);
            }
            ret.listenerWrappers.push(batchW);
            batchW.updateWrapper.push(ret);
        });
        if (CC_JSB) {
            if (newCheckbundles.length > 0) {
                this.getBundleUpdateInfo(newCheckbundles).then(function (ret) {
                    $log("==check bundle success==", newCheckbundles.join(","));
                    igs.emit(igs.consts.Event.CHECK_BUNDLE_SUCCESS, bundles);
                    var toUpdateBundles = [];
                    var toUpdateBundlesName = [];
                    var toLoadBundles = [];
                    var toLoadBundlesName = [];
                    bundles.forEach(function (b) {
                        var ret = _this.updateWrapper.find(function (buw) {
                            return buw.bundle.bundle === b.bundle;
                        });
                        if (_this.bundleRemoteHost[b.bundle]) {
                            toUpdateBundles.push(ret);
                            toUpdateBundlesName.push(b.bundle);
                        }
                        else {
                            var ud = new igs.hotUpdate.UpdateData(igs.hotUpdate.HotUpdateCode.ALREADY_UP_TO_DATE, b.bundle);
                            ud.bundleDir = b.bundle;
                            ret.updateData = ud;
                            toLoadBundles.push(b);
                            toLoadBundlesName.push(b.bundle);
                        }
                    });
                    if (toUpdateBundles.length > 0) {
                        _this.isLoading = true;
                        $log("==to update bundles==", toUpdateBundlesName.join(","));
                        toUpdateBundles.forEach(function (b) {
                            _this.checkUpdate(b.bundle, b);
                        });
                    }
                    else {
                        next(toLoadBundles);
                    }
                }).catch(function (ret) {
                    $log("==check bundle failed==");
                    _this.removeBatchUpdate(batchW);
                    listener.onCheckRemoteUpdateFailed(bundles);
                });
            }
        }
        else {
            next(bundles);
        }
    };
    BundleManager.prototype.removeBatchUpdate = function (wrapper) {
        wrapper.listener = null;
        wrapper.updateWrapper.length = 0;
        var ret = this.batchWrapper.findIndex(function (bw) {
            return bw.id === wrapper.id;
        });
        for (var _i = 0, _a = this.updateWrapper; _i < _a.length; _i++) {
            var i = _a[_i];
            var idx = i.listenerWrappers.findIndex(function (lw) {
                return lw.id === wrapper.id;
            });
            if (idx !== -1) {
                i.listenerWrappers.splice(idx, 1);
                break;
            }
        }
        var flag = false;
        if (ret !== -1) {
            this.batchWrapper.splice(ret, 1);
            flag = true;
            var usingBundles_1 = [];
            this.batchWrapper.forEach(function (bw) {
                usingBundles_1 = usingBundles_1.concat(bw.getBundleNames());
            });
            var _loop_3 = function (i) {
                var uw = this_2.updateWrapper[i];
                var j = usingBundles_1.findIndex(function (ub) {
                    return uw.bundle.bundle === ub;
                });
                if (j === -1) {
                    this_2.updateWrapper.splice(i, 1);
                }
                else {
                    i++;
                }
                out_i_1 = i;
            };
            var this_2 = this, out_i_1;
            for (var i = 0; i < this.updateWrapper.length;) {
                _loop_3(i);
                i = out_i_1;
            }
            $log("==updateWrapper==", this.updateWrapper.length, this.batchWrapper.length);
        }
        else {
            $log("==removeBatchUpdate error==", ret);
        }
        return flag;
    };
    BundleManager.prototype.loadBundle = function (ud, updateWrapper) {
        var _this = this;
        var curBundle = updateWrapper.bundle;
        $log("==loadBundle==", curBundle.bundle);
        var totalProgress = {};
        var calcProgress = function () {
            var t = 0;
            for (var i in totalProgress) {
                var v = totalProgress[i];
                t += v;
            }
            return t / (100 * 2);
        };
        var uptData = new igs.bundle.BundleLoadProgress();
        var bundleName = curBundle.bundle;
        ud.ret = igs.hotUpdate.HotUpdateCode.BUNDLE_LOADING;
        cc.assetManager.loadBundle(curBundle.bundle, {
            onFileProgress: function (zipFile) {
                if (cc.sys.platform === cc.sys.WECHAT_GAME) {
                    totalProgress["".concat(bundleName, "_").concat(zipFile.totalBytesExpectedToWrite)] = zipFile.progress;
                    uptData.progress = Math.max(0.92, calcProgress() * .95);
                    uptData.tip = "正在加载资源，此过程不消耗流量";
                    igs.emit(igs.consts.Event.BUNDLE_LOAD_PROGRESS, uptData);
                }
            }
        }, function (err, bundle) {
            _this.isLoading = false;
            if (err) {
                cc.error("load bundle: ".concat(curBundle.bundle, " failed !!!"));
                var uw = _this.updateWrapper.find(function (b) { return b.bundle.bundle === curBundle.bundle; });
                uw.updateData.ret = igs.hotUpdate.HotUpdateCode.BUNDLE_LOAD_FAILED;
                _this.onBatchLoadEvent(uw);
            }
            else {
                _this.loadedBundle.push(curBundle.bundle);
                $log("load bundle: ".concat(curBundle.bundle, " success !!!"));
                _this.onBundleReady(bundle, updateWrapper);
            }
        });
    };
    BundleManager.prototype.onBundleReady = function (bundle, updateWrapper) {
        if (this.isLoading) {
            this.isLoading = false;
        }
        var bname = bundle;
        if (bundle instanceof cc.AssetManager.Bundle) {
            bname = bundle.name;
        }
        $log("=onBundleReady=", bname);
        updateWrapper.updateData.ret = igs.hotUpdate.HotUpdateCode.BUNDLE_LOAD_SUCCESS;
        this.onBatchLoadEvent(updateWrapper);
    };
    return BundleManager;
}());
var $bundleMgr = new BundleManager();
function getPlatStr() {
    switch (cc.sys.platform) {
        case cc.sys.ANDROID:
            return "android";
        case cc.sys.IPHONE:
        case cc.sys.IPAD:
            return "ios";
        default:
            break;
    }
    return "";
}
var GaoShouMgr = (function () {
    function GaoShouMgr() {
        this._skipForceUpdate = true;
        this._skipBundleUpdate = true;
        this.safeArea = { top: 0, bottom: 0, left: 0, right: 0 };
        if (CC_JSB) {
            this._skipForceUpdate = false;
            this._skipBundleUpdate = false;
        }
    }
    Object.defineProperty(GaoShouMgr.prototype, "skipForceUpdate", {
        get: function () {
            return this._skipForceUpdate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GaoShouMgr.prototype, "skipBundleUpdate", {
        get: function () {
            return this._skipBundleUpdate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GaoShouMgr.prototype, "bundleMgr", {
        get: function () {
            return $bundleMgr;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GaoShouMgr.prototype, "httpMgr", {
        get: function () {
            return $httpMgr;
        },
        enumerable: false,
        configurable: true
    });
    return GaoShouMgr;
}());
var $gaoshou = new GaoShouMgr();
(function (igs) {
    var bundle;
    (function (bundle) {
        bundle.updateBundles = $bundleMgr.updateBundles.bind($bundleMgr);
        bundle.registerBooter = $global.registerBooter.bind($global);
        bundle.bootBundle = $global.bootBundle.bind($global);
        bundle.getBundleInfo = function (bundleName) {
            return $bundleMgr.getBundleInfo(bundleName);
        };
    })(bundle = igs.bundle || (igs.bundle = {}));
})(igs = exports.igs || (exports.igs = {}));
var $updateOdcData = function (online) {
    if (cc.sys.platform !== cc.sys.WECHAT_GAME && cc.sys.platform !== cc.sys.WECHAT_GAME_SUB) {
        return;
    }
    $log("=updateOdcData=", online);
    if (online) {
        wx.setUserCloudStorage({
            KVDataList: [
                {
                    key: "online",
                    value: "1"
                },
                {
                    key: "ts",
                    value: cc.sys.now() + ""
                }
            ]
        });
    }
    else {
        wx.setUserCloudStorage({
            KVDataList: [
                {
                    key: "online",
                    value: ""
                }
            ]
        });
    }
};
(function (igs) {
    var odc;
    (function (odc) {
        var updateTimer = -1;
        var FRIEND_LIST = "friendList";
        var odcNode = null;
        var _tag = "";
        var onTouchStart = function (t) {
            var pos = odcNode.node.convertTouchToNodeSpace(t);
            wx.postMessage({
                id: _tag,
                message: "touch-start",
                mouseX: pos.x,
                mouseY: odcNode.node.height - pos.y
            });
        };
        var onTouchMove = function (t) {
            var pos = odcNode.node.convertTouchToNodeSpace(t);
            wx.postMessage({
                id: _tag,
                message: "touch-move",
                mouseX: pos.x,
                mouseY: odcNode.node.height - pos.y
            });
        };
        var onTouchEnd = function (t) {
            var pos = odcNode.node.convertTouchToNodeSpace(t);
            wx.postMessage({
                id: _tag,
                message: "touch-end",
                mouseX: pos.x,
                mouseY: odcNode.node.height - pos.y
            });
        };
        odc.init = function (node) {
            do {
                if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
                    $log("only in wechatgame");
                    break;
                }
                _tag = randomString(10);
                if (!node) {
                    wx.postMessage({
                        message: "init-odc",
                        id: _tag,
                    });
                    break;
                }
                var scv = node.getComponent(cc.SubContextView);
                if (!scv) {
                    scv = node.addComponent(cc.SubContextView);
                }
                if (odcNode === scv) {
                    odcNode.node.active = true;
                    $log("already set this node");
                    break;
                }
                if (odcNode && cc.isValid(odcNode.node)) {
                    odcNode.node.active = false;
                    odcNode.node.off(cc.Node.EventType.TOUCH_START, onTouchStart);
                    odcNode.node.off(cc.Node.EventType.TOUCH_MOVE, onTouchMove);
                    odcNode.node.off(cc.Node.EventType.TOUCH_END, onTouchEnd);
                }
                odcNode = scv;
                node.active = true;
                odcNode.reset();
                odcNode.updateSubContextViewport();
                node.on(cc.Node.EventType.TOUCH_START, onTouchStart);
                node.on(cc.Node.EventType.TOUCH_MOVE, onTouchMove);
                node.on(cc.Node.EventType.TOUCH_END, onTouchEnd);
                wx.postMessage({
                    message: "new-odc",
                    id: _tag,
                });
            } while (false);
        };
        odc.showListData = function (key, value) {
            if (value === void 0) { value = {}; }
            if (!_tag) {
                $log("need call init() first");
                return;
            }
            key === void 0 && (key = FRIEND_LIST);
            wx.postMessage({
                id: _tag,
                message: "friend-list",
                key: key,
                value: JSON.stringify(value)
            });
        };
        odc.clearList = function () {
            if (!_tag) {
                $log("need call init() first");
                return;
            }
            wx.postMessage({
                id: _tag,
                message: "clear-list"
            });
        };
        odc.updateScore = function (data, key) {
            if (data === void 0) { data = null; }
            if (!_tag) {
                $log("need call init() first");
                return;
            }
            key === void 0 && (key = FRIEND_LIST);
            wx.postMessage({
                id: _tag,
                message: "update-score",
                key: key,
                level: data.level,
                grade: data.grade,
                star: data.star
            });
        };
        odc.updateScore2 = function (key, value) {
            if (value === void 0) { value = { wxopenid: "", score: -1 }; }
            if (!_tag) {
                $log("need call init() first");
                return;
            }
            key === void 0 && (key = FRIEND_LIST);
            wx.postMessage({
                id: _tag,
                message: "update-score2",
                key: key,
                value: JSON.stringify(value)
            });
        };
        odc.setMessageToFriendQuery = function (value) {
            wx.setMessageToFriendQuery({ shareMessageToFriendScene: value });
        };
    })(odc = igs.odc || (igs.odc = {}));
})(igs = exports.igs || (exports.igs = {}));
(function (igs) {
    var exports;
    (function (exports) {
        exports.onlineParam = $global.onlineParam;
        exports.lobbyConfig = $global.lobbyConfig;
        exports.config = $global.exportConfig;
        exports.safeArea = $gaoshou.safeArea;
        exports.getCookie = function () {
            $global.cookie.load();
            return $global.cookie.serialize();
        };
    })(exports = igs.exports || (igs.exports = {}));
})(igs = exports.igs || (exports.igs = {}));
var $globalCache = {};
(function (igs) {
    var global;
    (function (global) {
        function set(key, value) {
            $globalCache[key] = value;
        }
        global.set = set;
        function get(key) {
            return $globalCache[key];
        }
        global.get = get;
    })(global = igs.global || (igs.global = {}));
})(igs = exports.igs || (exports.igs = {}));
(function (igs) {
    var i18n;
    (function (i18n) {
        function setLan(lan) {
            switch (lan.toLowerCase()) {
                case 'zh':
                case cc.sys.LANGUAGE_CHINESE:
                case 'cn':
                    window['i18n']['curLang'] = 'zh';
                    $global.cookie.load();
                    $global.cookie.usingLanguage = 'zh';
                    $global.cookie.save();
                    break;
                default:
                    window['i18n']['curLang'] = 'en';
                    $global.cookie.load();
                    $global.cookie.usingLanguage = 'en';
                    $global.cookie.save();
            }
            window['i18n'] && window['i18n'].reload && window['i18n'].reload();
        }
        i18n.setLan = setLan;
        function getLan() {
            return $global.cookie.usingLanguage;
        }
        i18n.getLan = getLan;
    })(i18n = igs.i18n || (igs.i18n = {}));
})(igs = exports.igs || (exports.igs = {}));
var $platform = Platform.getInstance();
(function (igs) {
    var platform;
    (function (platform) {
        function trackEvent(name, detail, labels) {
            if (detail === void 0) { detail = {}; }
            if (labels === void 0) { labels = []; }
            $platform.TrackEvent(name, detail, labels);
        }
        platform.trackEvent = trackEvent;
        function setScreenCapInfo(info) {
            return $platform.ScreenCap(info);
        }
        platform.setScreenCapInfo = setScreenCapInfo;
        function trackUserAction(name) {
            $platform.TrackUserAction(name);
        }
        platform.trackUserAction = trackUserAction;
        function share(param) {
            $platform.share(param);
        }
        platform.share = share;
        function onShareAppMessage(fn) {
            $platform.onShareAppMessage(fn);
        }
        platform.onShareAppMessage = onShareAppMessage;
        function launchParam(key) {
            if (key === void 0) { key = ""; }
            return $platform.launchParam(key);
        }
        platform.launchParam = launchParam;
    })(platform = igs.platform || (igs.platform = {}));
})(igs = exports.igs || (exports.igs = {}));
var Logic = (function () {
    function Logic() {
        this.onlineParamCount = 0;
        this.onlineParamMaxCount = 3;
        igs.on(igs.consts.Event.GET_ONLINE_PARAM, this.getOnlineParam, this);
        igs.on(igs.consts.Event.CONFIRM_UPDATE_BUNDLE, this.confirmUpdate, this);
    }
    Logic.prototype.start = function () {
        $i18n['igs'] = window['i18n'];
        igs.emit(igs.consts.Event.GET_ONLINE_PARAM);
        igs.platform.setScreenCapInfo({});
    };
    Logic.prototype.getOnlineParam = function () {
        var _this = this;
        if (this.onlineParamCount !== 0) {
            return;
        }
        $log("getOnlineParam");
        igs.platform.trackEvent(TrackName.IGS_GET_ONLINE_PARAM_START);
        if (!CC_JSB && !$global.onlineParamSyncWait) {
            igs.emit(igs.consts.Event.SKIP_FORCE_UPDATE);
        }
        else {
            this.onlineParamMaxCount = 3;
        }
        var doHttp = function () {
            _this.onlineParamCount++;
            $httpMgr.loadOnlineParam().then(function (ret) {
                $log("==loadOnlineParam==", JSON.stringify(ret.data));
                igs.platform.trackEvent(TrackName.IGS_GET_ONLINE_PARAM_SUCCESS);
                if (ret.data.code === "00000" || ret.data.code === "") {
                    try {
                        var params = ret.data.online_param || {};
                        if (typeof params === "string") {
                            try {
                                completeAssign($global.onlineParam, JSON.parse(params));
                                params = JSON.parse(params);
                            }
                            catch (e) {
                                igs.log("parse online param error", e.message);
                            }
                        }
                        else if (typeof params === "object") {
                            completeAssign($global.onlineParam, params);
                        }
                        var lobbyConfig = ret.data.lobby_config || {};
                        if (typeof lobbyConfig === "string") {
                            try {
                                for (var i in $global.lobbyConfig) {
                                    delete $global.lobbyConfig[i];
                                }
                                completeAssign($global.lobbyConfig, JSON.parse(lobbyConfig));
                            }
                            catch (e) {
                                igs.log("parse lobbyConfig error", e.message);
                            }
                        }
                        else if (typeof lobbyConfig === "object") {
                            for (var i in $global.lobbyConfig) {
                                delete $global.lobbyConfig[i];
                            }
                            completeAssign($global.lobbyConfig, lobbyConfig);
                        }
                        $log("lobbyConfigDynamic:", $global.lobbyConfig);
                        igs.emit(igs.consts.Event.GET_ONLINE_PARAM_SUCCESS);
                        if (CC_JSB) {
                            if (!$gaoshou.skipForceUpdate && params && params.force_update) {
                                var appVerName = jsb['PluginProxyWrapper'].getInstance().getVersionName();
                                var appVerCode = parseInt(jsb['PluginProxyWrapper'].getInstance().getVersionCode());
                                $log("force_update app: ".concat(appVerName, ", ").concat(appVerCode, " "));
                                var uptLogic = params.force_update.logic || {};
                                var flag = false;
                                do {
                                    var checkVersionName = uptLogic['vername'] || {};
                                    var checkVersionCode = uptLogic['vercode'] || {};
                                    $log("force_update remote vname: ".concat(JSON.stringify(checkVersionName)));
                                    $log("force_update remote vcode: ".concat(JSON.stringify(checkVersionCode)));
                                    if (checkVersionName.ne && checkVersionName.ne !== appVerName) {
                                        $log("versionName.ne ".concat(checkVersionName.ne, ", ").concat(appVerName));
                                        flag = true;
                                        break;
                                    }
                                    if (checkVersionName.eq && checkVersionName.eq === appVerName) {
                                        $log("versionName.eq ".concat(checkVersionName.eq, ", ").concat(appVerName));
                                        flag = true;
                                        break;
                                    }
                                    if (checkVersionCode.ne && appVerCode !== parseInt(checkVersionCode.ne)) {
                                        $log("versionCode.ne ".concat(checkVersionCode.ne, ", ").concat(appVerCode));
                                        flag = true;
                                        break;
                                    }
                                    if (checkVersionCode.eq && appVerCode === parseInt(checkVersionCode.eq)) {
                                        $log("versionCode.eq ".concat(checkVersionCode.eq, ", ").concat(appVerCode));
                                        flag = true;
                                        break;
                                    }
                                    if (checkVersionCode.lt && appVerCode < parseInt(checkVersionCode.lt)) {
                                        $log("versionCode.lt ".concat(checkVersionCode.lt, ", ").concat(appVerCode));
                                        flag = true;
                                        break;
                                    }
                                    if (checkVersionCode.le && appVerCode <= parseInt(checkVersionCode.le)) {
                                        $log("versionCode.le ".concat(checkVersionCode.le, ", ").concat(appVerCode));
                                        flag = true;
                                        break;
                                    }
                                    if (checkVersionCode.gt && appVerCode > parseInt(checkVersionCode.gt)) {
                                        $log("versionCode.gt ".concat(checkVersionCode.gt, ", ").concat(appVerCode));
                                        flag = true;
                                        break;
                                    }
                                    if (checkVersionCode.ge && appVerCode >= parseInt(checkVersionCode.ge)) {
                                        $log("versionCode.ge ".concat(checkVersionCode.ge, ", ").concat(appVerCode));
                                        flag = true;
                                        break;
                                    }
                                } while (false);
                                $log("force update ret:", flag);
                                if (flag) {
                                    igs.emit(igs.consts.Event.FORCE_UPDATE, { url: params.force_update.url, force: !!params.force_update.force, desc: params.force_update.desc || "" });
                                }
                                else {
                                    $log("==skip force update0==");
                                    igs.emit(igs.consts.Event.SKIP_FORCE_UPDATE);
                                }
                                return;
                            }
                            else {
                                $log("==skip force update1==");
                                igs.emit(igs.consts.Event.SKIP_FORCE_UPDATE);
                            }
                        }
                        else {
                            if ($global.onlineParamSyncWait) {
                                $log("==skip force update2==");
                                igs.emit(igs.consts.Event.SKIP_FORCE_UPDATE);
                            }
                        }
                    }
                    catch (e) {
                        $log("=onlineparam process error=", e);
                    }
                }
                else {
                    if (_this.onlineParamCount < _this.onlineParamMaxCount) {
                        setTimeout(doHttp, 1000);
                    }
                    else {
                        _this.onlineParamCount = 0;
                        igs.platform.trackEvent(TrackName.IGS_GET_ONLINE_PARAM_FAILED);
                        igs.emit(igs.consts.Event.GET_ONLINE_PARAM_FAIL);
                    }
                }
            }).catch(function (ret) {
                if (_this.onlineParamCount < _this.onlineParamMaxCount) {
                    setTimeout(doHttp, 1000);
                }
                else {
                    _this.onlineParamCount = 0;
                    igs.platform.trackEvent(TrackName.IGS_GET_ONLINE_PARAM_FAILED);
                    igs.emit(igs.consts.Event.GET_ONLINE_PARAM_FAIL);
                }
            });
        };
        doHttp();
    };
    Logic.prototype.confirmUpdate = function (config) {
        $bundleMgr.updateAllBatch();
    };
    return Logic;
}());
var $logic = new Logic();
var $igsNodeName = "__IGS__";
var $igsNode = null;
var $blockNode = null;
var $blockPrefab = null;
var $igsWidthRates = [];
var $igsHeightRates = [];
function BlockUI(opt, show) {
    if (show === void 0) { show = true; }
    if ($blockPrefab) {
        if ($blockNode && !cc.isValid($blockNode)) {
            $blockNode = null;
        }
        if (show) {
            if (!$blockNode) {
                $blockNode = cc.instantiate($blockPrefab);
                $blockNode.parent = cc.director.getScene();
            }
            $blockNode.active = true;
            var pos = $blockNode.parent.convertToNodeSpace(new cc.Vec2(cc.winSize.width / 2, cc.winSize.height / 2));
            $blockNode.setPosition(pos.x, pos.y);
        }
        else {
            if ($blockNode) {
                $blockNode.destroy();
                $blockNode = null;
            }
        }
        opt && opt($blockNode);
    }
}
function calcAssetMemory(asset, flag) {
    if (flag === void 0) { flag = false; }
    function getTextureSize(texture, isdb) {
        if (isdb === void 0) { isdb = false; }
        var prefix = "texture:";
        if (isdb) {
            prefix = "dragonBones texture:";
        }
        if (flag) {
            $log("内存:", "".concat(prefix, "url:").concat(texture.nativeUrl));
        }
        var pf = texture.getPixelFormat();
        var pixelCount = texture.width * texture.height;
        var bytesPerPixel = 0;
        switch (pf) {
            case cc.Texture2D.PixelFormat.RGB565:
            case cc.Texture2D.PixelFormat.RGB5A1:
            case cc.Texture2D.PixelFormat.RGBA4444:
                bytesPerPixel = 2;
                break;
            case cc.Texture2D.PixelFormat.RGB888:
                bytesPerPixel = 3;
                break;
            case cc.Texture2D.PixelFormat.RGBA8888:
            case cc.Texture2D.PixelFormat.RGBA32F:
                bytesPerPixel = 4;
                break;
            case cc.Texture2D.PixelFormat.A8:
            case cc.Texture2D.PixelFormat.I8:
                bytesPerPixel = 1;
                break;
            default:
                $log("内存:", "unknown texture format:", pf);
        }
        return bytesPerPixel * pixelCount;
    }
    var ret = 0;
    if (asset instanceof cc.Texture2D) {
        var texture2d = asset;
        ret += getTextureSize(texture2d);
    }
    return ret;
}
function calcMemory(flag) {
    if (flag === void 0) { flag = false; }
    var ret = 0;
    cc.assetManager.assets.forEach(function (val) {
        ret += calcAssetMemory(val, flag);
    });
    return ret;
}
function showMemory() {
    var ret = calcMemory(false);
    $log("内存:", "total size:".concat(ret / 1024 / 1024, "M"));
}
function releaseRef0() {
    var ret = calcMemory();
    var arr = [];
    cc.assetManager.assets.forEach(function (val) {
        if (val.refCount === 0) {
            arr.push("=".concat(cc.js.getClassName(val), ":").concat(val.name, ", ").concat(val.nativeUrl));
            cc.assetManager.releaseAsset(val);
        }
    });
    if (arr.length > 0) {
        $log("内存:", "\u91CA\u653E".concat(arr.join("")));
    }
    $log("内存:", "\u6E05\u7406\u8D44\u6E90\uFF0C\u91CA\u653E".concat((ret - calcMemory()) / 1024 / 1024, "M"));
}
function $start() {
    if ($global.inited) {
        return false;
    }
    if (CC_EDITOR) {
        return false;
    }
    $log("igs start");
    function confirmNode(scene) {
        if (!$igsNode) {
            var node = new cc.Node();
            $igsNode = node;
            node.name = $igsNodeName;
            var widget = node.addComponent(cc.Widget);
            widget.top = widget.left = widget.bottom = widget.right = 0;
            widget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
            node.addComponent(cc.SafeArea);
            scene.addChild(node);
            cc.game.addPersistRootNode(node);
            SchedulerManager.instance;
            setInterval(function () {
                showMemory();
            }, 20000);
        }
    }
    cc.director.once(cc.Director.EVENT_BEFORE_SCENE_LAUNCH, function (scene) {
        $log("before scene launch");
        var cur = cc.director.getScene();
        if (!cur) {
            cur = scene;
        }
        confirmNode(cur);
    });
    cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function (scene) {
        $log("after scene launch");
        confirmNode(scene);
        var _a = scene.getChildByName($igsNodeName).getComponent(cc.Widget), top = _a.top, bottom = _a.bottom, left = _a.left, right = _a.right;
        var safeArea = igs.exports.safeArea;
        if (safeArea.top === 0 && safeArea.bottom === 0 && safeArea.left === 0 && safeArea.right === 0) {
            safeArea.top = top;
            safeArea.bottom = bottom;
            safeArea.left = left;
            safeArea.right = right;
            igs.emit(igs.consts.Event.IGS_SAFEAREA_CHANGED);
        }
        $log("=safeArea=", safeArea.top, safeArea.bottom, safeArea.left, safeArea.right);
        var lastSceneChildrenCount = 0;
        cc.director.getScheduler().schedule(function () {
            var s = cc.director.getScene();
            if (s) {
                var cnt = s.childrenCount;
                if (cnt !== lastSceneChildrenCount) {
                    $igsNode.setSiblingIndex(1000);
                    lastSceneChildrenCount = cnt;
                }
            }
        }, newScheduleObj(), 1);
        if ($blockPrefab === null) {
            cc.resources.load("BlockUI/BlockUI", function (err, bui) {
                if (err) {
                    $warn("load BlockUI error", err);
                }
                else {
                    $blockPrefab = bui;
                    $blockPrefab.addRef();
                }
                $logic.start();
            });
        }
    });
    cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function (scene) {
        $igsNode.setSiblingIndex(1000);
    });
    cc.director.on(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function (scene) {
        $log("内存:", "场景切换完成", scene.name);
        $platform.triggerGC();
    });
}
var _scenes = {};
var _maskTexture = null;
(function (igs) {
    var izx;
    (function (izx) {
        var UiMgr;
        (function (UiMgr) {
            function preLoad(name, progress, callback) {
                if (typeof name === "string") {
                    loadBundle(name, function () {
                        progress && progress(1);
                        callback && callback();
                    });
                }
                else {
                    var length_1 = 0;
                    name.map(function (item) {
                        loadBundle(item, function (bundle) {
                            bundle.loadDir("prefabs", function (err, res) {
                                length_1++;
                                progress && progress(length_1 / name.length);
                                length_1 === name.length && callback && callback();
                            });
                        });
                    });
                }
            }
            UiMgr.preLoad = preLoad;
            function loadBundle(name, callback) {
                var b = cc.assetManager.getBundle(name);
                if (!b) {
                    cc.assetManager.loadBundle(name, function (err, bundle) {
                        if (err) {
                            $warn("Bundle " + name + "err :" + err);
                            return;
                        }
                        callback && callback(bundle);
                    });
                }
                else {
                    callback && callback(b);
                }
            }
            UiMgr.loadBundle = loadBundle;
            function popScene(bundleName, name, param, callback) {
                var bundle = cc.assetManager.getBundle(bundleName);
                if (null == bundle) {
                    loadBundle(bundleName, function (bundle) {
                        loadScene(bundle, name, param, callback);
                    });
                }
                else {
                    loadScene(bundle, name, param, callback);
                }
            }
            UiMgr.popScene = popScene;
            function closeScene(name, param) {
                var obj = _scenes[name];
                if (!obj)
                    return;
                var ui = obj.getComponent(igs.izx.BaseUI);
                if (ui) {
                    ui.closeCb && ui.closeCb(param);
                    igs.izx.offByTag(ui);
                }
                obj.removeFromParent();
                obj.destroy();
            }
            UiMgr.closeScene = closeScene;
            function loadScene(bundle, name, param, callback) {
                if (typeof param === "function") {
                    callback = param;
                    param = {};
                }
                bundle.load(name, cc.Prefab, function (err, res) {
                    if (err) {
                        $warn("prefab " + name + " err: " + err);
                        callback && callback(null);
                        return;
                    }
                    var obj = cc.instantiate(res);
                    var n = name.split("/");
                    obj.name = n[n.length - 1];
                    if (typeof param === "function") {
                        param = {};
                    }
                    if (!param.parent) {
                        param.parent = cc.director.getScene();
                    }
                    param.parent.addChild(obj);
                    if (!param.pos) {
                        param.pos = cc.v3(cc.winSize.width / 2, cc.winSize.height / 2, 0);
                    }
                    if (param.pos instanceof cc.Vec2) {
                        param.pos = cc.v3(param.pos);
                    }
                    obj.position = param.pos;
                    if (param.size) {
                        obj.setContentSize(param.size);
                    }
                    if (param.mask) {
                        var mask_1 = getMask();
                        obj.addChild(mask_1);
                        mask_1.setSiblingIndex(obj.childrenCount - 1);
                        if (param.maskClose) {
                            mask_1.on(cc.Node.EventType.TOUCH_END, function (t) {
                                for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
                                    var node = _a[_i];
                                    if (node !== mask_1) {
                                        var rect = node.getBoundingBoxToWorld();
                                        var pos = t.getLocation();
                                        if (rect.x < t.x && rect.x + rect.width > t.x && rect.y < t.y && rect.y + rect.height > t.y)
                                            return;
                                    }
                                }
                                closeScene(obj.name);
                            });
                        }
                    }
                    var ui = obj.getComponent(igs.izx.BaseUI);
                    if (ui) {
                        ui.initParam = param.initParam;
                        ui.scheduleOnce(ui.onOpen.bind(ui), .0);
                    }
                    _scenes[obj.name] = obj;
                    if (callback)
                        cc.tween(obj).delay(.1).call(function () { return callback(obj); }).start();
                });
            }
            function getMask() {
                if (!_maskTexture) {
                    _maskTexture = new cc.Texture2D;
                    _maskTexture.initWithData(new Uint8Array([0, 0, 0]), cc.Texture2D.PixelFormat.RGB888, 1, 1);
                }
                var mask = new cc.Node();
                var sprite = mask.addComponent(cc.Sprite);
                mask.addComponent(cc.BlockInputEvents);
                sprite.spriteFrame = new cc.SpriteFrame(_maskTexture);
                sprite.spriteFrame.setRect(cc.rect(0, 0, cc.winSize.width + 200, cc.winSize.height + 1000));
                return mask;
            }
            var _stackScenes = [];
            function enterScene(how, bundleName, name, callback, opt) {
                opt = opt || {};
                opt.orientation = opt.orientation || 1;
                var loadScene = function (bundle, cb) {
                    bundle.load(name, cc.Prefab, function (err, res) {
                        if (err) {
                            $warn("prefab " + name + " err: " + err);
                            cb && cb(null);
                            return;
                        }
                        var obj = cc.instantiate(res);
                        obj.name = bundleName + "_" + name.replace("/", "_");
                        var parent = cc.find("Root", cc.director.getScene());
                        if (opt.bundle == true) {
                            var bname = "bundle";
                            parent = cc.find(bname, cc.director.getScene());
                            if (parent == null) {
                                var n = new cc.Node(bname);
                                n.parent = cc.director.getScene();
                                parent = n;
                            }
                        }
                        if (!parent) {
                            parent = cc.director.getScene();
                        }
                        obj.parent = parent;
                        if (!opt.pos) {
                            opt.pos = cc.v3(cc.winSize.width / 2, cc.winSize.height / 2, 0);
                        }
                        if (opt.pos instanceof cc.Vec2) {
                            opt.pos = cc.v3(opt.pos);
                        }
                        obj.position = opt.pos;
                        if (opt.size) {
                            obj.setContentSize(opt.size);
                        }
                        var ui = obj.getComponent(igs.izx.BaseUI);
                        ui.isScene = true;
                        ui.initParam = opt.initParam || {};
                        if (!opt.bundle) {
                            if (how === "push") {
                                if (_stackScenes.length > 0) {
                                    _stackScenes[_stackScenes.length - 1].onPause();
                                }
                                _stackScenes.push(ui);
                            }
                            else if (how === "replace") {
                                var s_1 = _stackScenes[_stackScenes.length - 1];
                                try {
                                    s_1 && s_1.onPause();
                                }
                                finally {
                                    PopScene(s_1);
                                    _stackScenes[_stackScenes.length - 1] = ui;
                                }
                            }
                        }
                        cb && cb(ui);
                        ui.scheduleOnce(ui.onOpen.bind(ui), .0);
                        _scenes[obj.name] = obj;
                    });
                };
                if (how === "show") {
                    var objname = bundleName + "_" + name.replace("/", "_");
                    var idx = 0;
                    var scene = null;
                    for (var n = _stackScenes.length, i = 0; i < n; i++) {
                        if (objname === _stackScenes[i].name) {
                            idx = i;
                            scene = _stackScenes[i];
                            break;
                        }
                    }
                    if (!scene) {
                        return;
                    }
                    while (_stackScenes.length > idx) {
                        var s_2 = _stackScenes.pop();
                        if (s_2 && s_2 instanceof igs.izx.BaseUI) {
                            try {
                                s_2.onPause();
                            }
                            finally {
                                PopScene(s_2);
                            }
                        }
                    }
                    if (_stackScenes.length === 0) {
                    }
                    else {
                        var s_3 = _stackScenes[_stackScenes.length - 1];
                        s_3 && s_3.onResume();
                    }
                    return;
                }
                else if (how === "replace") {
                    if (_stackScenes.length > 0) {
                        var s_4 = _stackScenes.pop();
                        if (s_4 && s_4 instanceof igs.izx.BaseUI) {
                            try {
                                s_4.onPause();
                            }
                            finally {
                                PopScene(s_4);
                            }
                        }
                    }
                    PushScene(bundleName, name, callback, opt);
                }
                var bundle = cc.assetManager.getBundle(bundleName);
                if (null == bundle) {
                    loadBundle(bundleName, function (bundle) {
                        loadScene(bundle, callback);
                    });
                }
                else {
                    loadScene(bundle, callback);
                }
            }
            function PushScene(bundleName, name, callback, opt) {
                enterScene("push", bundleName, name, callback, opt);
            }
            UiMgr.PushScene = PushScene;
            function ReplaceScene(bundleName, name, callback, opt) {
                if (_stackScenes.length === 0) {
                    PushScene(bundleName, name, callback, opt);
                    return;
                }
                enterScene("replace", bundleName, name, callback, opt);
            }
            UiMgr.ReplaceScene = ReplaceScene;
            function ShowScene(bundleName, name, callback, opt) {
                enterScene("show", bundleName, name, callback, opt);
            }
            UiMgr.ShowScene = ShowScene;
            function PopScene(ui) {
                if (_stackScenes.length <= 1) {
                    return;
                }
                if (ui) {
                    var _loop_4 = function (n, i) {
                        if (_stackScenes[i] === ui) {
                            try {
                                ui.popAllDialog();
                                ui.onPause();
                            }
                            finally {
                                var closeAnddistroy_1 = function () {
                                    try {
                                        ui.onClose();
                                    }
                                    finally {
                                        ui.node.destroy();
                                        ui = null;
                                        _stackScenes.splice(i, 1);
                                    }
                                };
                                var aniTransition = ui.getComponent(igs.izx.baseUICloseTransition);
                                if (aniTransition) {
                                    var func_1 = function () {
                                        closeAnddistroy_1();
                                        izx.off("BaseUI_Close_Transition_OK" + ui.node.name, func_1);
                                    };
                                    izx.on("BaseUI_Close_Transition_OK" + ui.node.name, func_1);
                                    try {
                                        aniTransition.doCloseAni();
                                    }
                                    finally {
                                    }
                                }
                                else {
                                    closeAnddistroy_1();
                                }
                            }
                            if (_stackScenes.length === 0) {
                                return { value: void 0 };
                            }
                            _stackScenes[_stackScenes.length - 1].onResume();
                            return { value: void 0 };
                        }
                    };
                    for (var n = _stackScenes.length, i = 0; i < n; i++) {
                        var state_1 = _loop_4(n, i);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                else {
                    PopScene(_stackScenes[_stackScenes.length - 1]);
                }
            }
            UiMgr.PopScene = PopScene;
            function PushDialog(bundleName, name, callback, opt) {
                if (_stackScenes.length <= 0) {
                    $error("Failed! no running scene!");
                    return;
                }
                opt = opt || {};
                var loadScene = function (bundle, cb) {
                    bundle.load(name, cc.Prefab, function (err, res) {
                        if (err) {
                            $warn("prefab " + name + " err: " + err);
                            cb && cb(null);
                            return;
                        }
                        var obj = cc.instantiate(res);
                        obj.name = bundleName + "_" + name.replace("/", "_");
                        var ui = obj.getComponent(igs.izx.BaseUI);
                        ui.initParam = opt.initParam || {};
                        obj.parent = _stackScenes[_stackScenes.length - 1].node;
                        if (!opt.pos) {
                            opt.pos = cc.v3(0, 0, 0);
                        }
                        if (opt.pos instanceof cc.Vec2) {
                            opt.pos = cc.v3(opt.pos);
                        }
                        obj.position = opt.pos;
                        if (opt.size) {
                            obj.setContentSize(opt.size);
                        }
                        if (opt.popUp) {
                            cc.tween(obj).to(0.1, { scale: 1.07 }).
                                to(0.1, { scale: 0.92 }).
                                to(0.1, { scale: 1 }).start();
                        }
                        if (opt.fadeInShow) {
                            obj.opacity = 0;
                            cc.tween(obj).to(0.2, { opacity: 255 }).start();
                        }
                        ui.isScene = false;
                        if (opt.mask) {
                            var mask_2 = getMask();
                            obj.addChild(mask_2);
                            mask_2.setSiblingIndex(-999);
                            mask_2.opacity = 150;
                            if (opt.maskClose) {
                                mask_2.on(cc.Node.EventType.TOUCH_END, function (t) {
                                    for (var _i = 0, _a = obj.children; _i < _a.length; _i++) {
                                        var node = _a[_i];
                                        if (node !== mask_2) {
                                            var rect = node.getBoundingBoxToWorld();
                                            var pos = t.getLocation();
                                            if (rect.x < t.x && rect.x + rect.width > t.x && rect.y < t.y && rect.y + rect.height > t.y)
                                                return;
                                        }
                                    }
                                    ui.pop();
                                });
                            }
                        }
                        var s = _stackScenes[_stackScenes.length - 1];
                        if (s) {
                            var d = s.lastDialog();
                            d && d.onPause();
                        }
                        _stackScenes[_stackScenes.length - 1].pushDialog(ui);
                        cb && cb(ui);
                        ui.scheduleOnce(ui.onOpen.bind(ui), .0);
                    });
                };
                var bundle = cc.assetManager.getBundle(bundleName);
                if (null == bundle) {
                    loadBundle(bundleName, function (bundle) {
                        loadScene(bundle, callback);
                    });
                }
                else {
                    loadScene(bundle, callback);
                }
            }
            UiMgr.PushDialog = PushDialog;
            function PopDialog(bundleName, name) {
                if (_stackScenes.length <= 0) {
                    return;
                }
                if (bundleName instanceof igs.izx.BaseUI) {
                    var d = bundleName;
                    var p = d.node.parent.getComponent(igs.izx.BaseUI);
                    var s_5 = _stackScenes[_stackScenes.length - 1];
                    p && p.popDialog(d);
                    var ld = s_5 && s_5.lastDialog();
                    if (ld && ld === d) {
                        ld.onResume();
                    }
                }
                else if (typeof bundleName === "string")
                    _stackScenes[_stackScenes.length - 1].popDialog(bundleName + "_" + name.replace("/", "_"));
            }
            UiMgr.PopDialog = PopDialog;
            function loadPic(bundleName, pathName, callback) {
                var bundle = cc.assetManager.getBundle(bundleName);
                pathName = "pics/" + pathName;
                if (bundle) {
                    var asset = bundle.get(pathName, cc.SpriteFrame);
                    if (asset) {
                        callback(asset);
                    }
                    else {
                        bundle.load(pathName, cc.SpriteFrame, function (err, res) {
                            if (err) {
                            }
                            else {
                                callback(res);
                            }
                        });
                    }
                }
                else {
                    cc.assetManager.loadBundle(bundleName, function (err, bundle) {
                        if (err) {
                        }
                        else {
                            bundle.load(pathName, cc.SpriteFrame, function (err, res) {
                                if (err) {
                                }
                                else {
                                    callback(res);
                                }
                            });
                        }
                    });
                }
            }
            UiMgr.loadPic = loadPic;
        })(UiMgr = izx.UiMgr || (izx.UiMgr = {}));
    })(izx = igs.izx || (igs.izx = {}));
})(igs = exports.igs || (exports.igs = {}));
var _d = cc._decorator, ccclass = _d.ccclass, property = _d.property, requireComponent = _d.requireComponent, disallowMultiple = _d.disallowMultiple;
(function (igs) {
    var izx;
    (function (izx) {
        izx.on = igs.on;
        izx.once = igs.once;
        izx.off = igs.off;
        izx.offByTag = igs.offTarget;
        izx.dispatchEvent = igs.emit;
        izx.emit = igs.emit;
        izx.log = $log;
        izx.logE = $error;
        izx.pushDialog = igs.izx.UiMgr.PushDialog;
        izx.popDialog = igs.izx.UiMgr.PopDialog;
        izx.pushScene = igs.izx.UiMgr.PushScene;
        izx.replaceScene = igs.izx.UiMgr.ReplaceScene;
        izx.showScene = igs.izx.UiMgr.ShowScene;
        izx.popScene = igs.izx.UiMgr.PopScene;
        izx.closeScene = igs.izx.UiMgr.closeScene;
        var Orientation;
        (function (Orientation) {
            Orientation[Orientation["Unknown"] = 0] = "Unknown";
            Orientation[Orientation["Portrait"] = 1] = "Portrait";
            Orientation[Orientation["PortraitUpsideDown"] = 2] = "PortraitUpsideDown";
            Orientation[Orientation["LandscapeLeft"] = 3] = "LandscapeLeft";
            Orientation[Orientation["Landscape"] = 3] = "Landscape";
            Orientation[Orientation["LandscapeRight"] = 4] = "LandscapeRight";
            Orientation[Orientation["AutoRotation"] = 5] = "AutoRotation";
        })(Orientation = izx.Orientation || (izx.Orientation = {}));
        izx.DEFAULT_ORIENTATION = Orientation.Landscape;
        izx.LoadBundle = function (name, callback) {
            var b = cc.assetManager.getBundle(name);
            if (b == null) {
                $info("==LoadBundle==", name);
                var promise = new Promise(function (resolve, reject) {
                    cc.assetManager.loadBundle(name, function (err, bundle) {
                        if (err) {
                            $error("LoadBundle: [" + name + "] Error: " + err);
                            reject({
                                err: err
                            });
                        }
                        else {
                            $info("LoadBundle: [" + name + "] Success!");
                            resolve({
                                name: name,
                                err: err,
                                bundle: bundle
                            });
                        }
                    });
                });
                promise.then(function (ret) {
                    igs.izx.UiMgr.PushScene(ret.name, "main", callback, { bundle: true });
                }).catch(function (ret) {
                    callback && callback(ret);
                });
            }
            else {
                $info("==Bundle already load==", name);
                igs.izx.UiMgr.PushScene(name, "main", callback, { bundle: true });
            }
        };
        var baseUICloseTransition = (function (_super) {
            __extends(baseUICloseTransition, _super);
            function baseUICloseTransition() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._closeClip = null;
                return _this;
            }
            baseUICloseTransition.prototype.onLoad = function () {
                izx.on("BaseUI_Close_Transition_OK" + this.node.name, this.onCloseAniOver, this);
            };
            baseUICloseTransition.prototype.start = function () {
                var _this = this;
                var ani = this.getComponent(cc.Animation);
                ani.on("finished", function (st, as) {
                    if (as) {
                        if (as.clip === _this._closeClip) {
                            izx.emit("BaseUI_Close_Transition_OK" + _this.node.name);
                        }
                    }
                });
            };
            baseUICloseTransition.prototype.doCloseAni = function () {
                var ani = this.getComponent(cc.Animation);
                var clips = ani.getClips();
                if (clips.length >= 1) {
                    if (clips[0]) {
                        this._closeClip = clips[0];
                        ani.play(clips[0].name);
                    }
                }
            };
            baseUICloseTransition.prototype.doAniOver = function () {
                izx.emit("BaseUI_Close_Transition_OK" + this.node.name);
            };
            baseUICloseTransition.prototype.onCloseAniOver = function () {
                var bu = this.node.getComponent(BaseUI);
                bu && bu.onTransitionClose();
            };
            baseUICloseTransition.prototype.onDestroy = function () {
                izx.offByTag(this);
            };
            return baseUICloseTransition;
        }(cc.Component));
        izx.baseUICloseTransition = baseUICloseTransition;
        var BaseUI = (function (_super) {
            __extends(BaseUI, _super);
            function BaseUI() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.initParam = null;
                _this.closeCb = null;
                _this._isScene = true;
                _this._dialog = [];
                _this._resPath = "";
                _this._orientation = izx.DEFAULT_ORIENTATION;
                return _this;
            }
            Object.defineProperty(BaseUI.prototype, "isScene", {
                get: function () {
                    return this._isScene;
                },
                set: function (value) {
                    this._isScene = value;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(BaseUI.prototype, "orientation", {
                get: function () {
                    return this._orientation;
                },
                set: function (value) {
                    this._orientation = value;
                },
                enumerable: false,
                configurable: true
            });
            BaseUI.prototype.onOpen = function () {
                izx.log("==onOpen==");
            };
            BaseUI.prototype.onTransitionOpen = function () {
                izx.log("==onTransitionOpen==");
            };
            BaseUI.prototype.onTransitionClose = function () {
                izx.log("==onTransitionClose==");
            };
            BaseUI.prototype.onResume = function () {
                izx.log("==onResume==");
            };
            BaseUI.prototype.onPause = function () {
                izx.log("==onPause==");
            };
            BaseUI.prototype.onClose = function (callback) {
                izx.log("==onClose==");
                this.closeCb && this.closeCb();
            };
            BaseUI.prototype.onDestroy = function () {
                izx.log("==onDestroy==");
                izx.offByTag(this);
                igs.assetMgr.releaseNode(this.node);
            };
            BaseUI.prototype.pushDialog = function (dialog) {
                if (!this._isScene) {
                    izx.logE("Failed! pushDialog can only be used with scene NOT dialog!");
                    return;
                }
                if (dialog._isScene) {
                    izx.logE("Failed! pushDialog's param must be a dialog!");
                    return;
                }
                this._dialog.push(dialog);
            };
            BaseUI.prototype.popDialog = function (dialog) {
                if (dialog instanceof BaseUI) {
                    if (dialog._isScene) {
                        izx.logE("Failed! popDialog can only be used with scene NOT dialog! can use \"this.pop()\"");
                        return;
                    }
                    var _loop_5 = function (n, i) {
                        if (this_3._dialog[i] === dialog) {
                            var ds_1 = this_3._dialog.splice(i, 1);
                            if (ds_1 && ds_1.length == 1) {
                                var closeAnddistroy_2 = function () {
                                    try {
                                        ds_1[0].onClose();
                                    }
                                    finally {
                                        ds_1[0].node.destroy();
                                    }
                                };
                                var aniTransition = ds_1[0].getComponent(baseUICloseTransition);
                                if (aniTransition) {
                                    var func_2 = function () {
                                        closeAnddistroy_2();
                                        izx.off("BaseUI_Close_Transition_OK" + ds_1[0].node.name, func_2);
                                    };
                                    izx.on("BaseUI_Close_Transition_OK" + ds_1[0].node.name, func_2);
                                    try {
                                        aniTransition.doCloseAni();
                                    }
                                    finally {
                                    }
                                }
                                else {
                                    closeAnddistroy_2();
                                }
                            }
                            return "break";
                        }
                    };
                    var this_3 = this;
                    for (var n = this._dialog.length, i = n - 1; i >= 0; i--) {
                        var state_2 = _loop_5(n, i);
                        if (state_2 === "break")
                            break;
                    }
                }
                else if (typeof dialog === "string") {
                    var list = dialog.split("_");
                    var lastName = "";
                    if (list.length > 0) {
                        lastName = list[list.length - 1];
                    }
                    for (var n = this._dialog.length, i = n - 1; i >= 0; i--) {
                        if (this._dialog[i].name === dialog || this._dialog[i].name === dialog + "<" + lastName + ">") {
                            var ds = this._dialog.splice(i, 1);
                            ds && ds.length == 1 && ds[0].node.destroy();
                            break;
                        }
                    }
                }
            };
            BaseUI.prototype.popAllDialog = function () {
                if (!this._isScene) {
                    izx.logE("Failed! popAllDialog can only be used with dialog NOT scene!");
                    return;
                }
                for (var n = this._dialog.length, i = n - 1; i >= 0; i--) {
                    var d = this._dialog[i];
                    if (d) {
                        this.popDialog(d);
                    }
                }
                this._dialog.length = 0;
            };
            BaseUI.prototype.pop = function () {
                if (this._isScene) {
                    igs.izx.UiMgr.PopScene(this);
                }
                else {
                    igs.izx.UiMgr.PopDialog(this);
                }
            };
            BaseUI.prototype.lastDialog = function () {
                return this._dialog.length > 0 ? this._dialog[this._dialog.length - 1] : null;
            };
            return BaseUI;
        }(cc.Component));
        izx.BaseUI = BaseUI;
        var Button;
        (function (Button) {
            function bindButtonClick(comp, node, callback, customData) {
                if (typeof comp === "string" && node instanceof cc.Node) {
                    comp = cc.find(comp, node);
                }
                if (!comp || !(comp instanceof cc.Node)) {
                    $warn("button " + comp + " not found");
                    return;
                }
                if (!callback && typeof node === "function") {
                    callback = node;
                }
                var btn = comp.getComponent(cc.Button);
                var eventName = "btn_" + comp.name + "_click";
                btn[eventName] = function (sender, data) {
                    $info(eventName);
                    callback(sender, data);
                };
                btn.clickEvents = btn.clickEvents || [];
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = comp;
                clickEventHandler.component = "cc.Button";
                clickEventHandler.handler = eventName;
                clickEventHandler.customEventData = customData;
                btn.clickEvents.push(clickEventHandler);
            }
            Button.bindButtonClick = bindButtonClick;
        })(Button = izx.Button || (izx.Button = {}));
    })(izx = igs.izx || (igs.izx = {}));
})(igs = exports.igs || (exports.igs = {}));
(function (igs) {
    var izx;
    (function (izx) {
        var AudioMgr;
        (function (AudioMgr) {
            var _soundVolume = 0;
            var _effectVolume = 0;
            var _inited = false;
            function setMusicVolume(value) {
                _soundVolume = value;
                cc.audioEngine.setMusicVolume(_soundVolume);
                cc.sys.localStorage.setItem("soundVolume", value.toString());
            }
            AudioMgr.setMusicVolume = setMusicVolume;
            function getMusicVolume() {
                var volumn = cc.sys.localStorage.getItem("soundVolume");
                if (!volumn) {
                    _soundVolume = 1;
                }
                else if (volumn == "0") {
                    _soundVolume = 0;
                }
                else {
                    _soundVolume = parseFloat(volumn);
                }
                return _soundVolume;
            }
            AudioMgr.getMusicVolume = getMusicVolume;
            function setEffectVolume(value) {
                _effectVolume = value;
                cc.audioEngine.setEffectsVolume(_effectVolume);
                cc.sys.localStorage.setItem("effectVolume", value.toString());
            }
            AudioMgr.setEffectVolume = setEffectVolume;
            function getEffectVolume() {
                var volumn = cc.sys.localStorage.getItem("effectVolume");
                if (!volumn) {
                    _effectVolume = 1;
                }
                else if (volumn == "0") {
                    _effectVolume = 0;
                }
                else {
                    _effectVolume = parseFloat(volumn);
                }
                return _effectVolume;
            }
            AudioMgr.getEffectVolume = getEffectVolume;
            function playMusic(path, bundleName) {
                if (cc.audioEngine.isMusicPlaying()) {
                    return;
                }
                var callback = function (bundle) {
                    if (bundle) {
                        bundle.load(path, cc.AudioClip, function (err1, res) {
                            if (err1) {
                                $info(path + " music not exists!");
                            }
                            else {
                                cc.audioEngine.playMusic(res, true);
                            }
                        });
                    }
                };
                var _bundleName = bundleName;
                var bundle = null;
                if (!_bundleName) {
                    bundle = cc.resources;
                }
                else {
                    bundle = cc.assetManager.getBundle(_bundleName);
                }
                if (bundle) {
                    callback(bundle);
                }
                else {
                    $error("bundle ".concat(_bundleName, " is NOT EXIST or NOT LOAD"));
                }
            }
            AudioMgr.playMusic = playMusic;
            function playEffect(path, bundleName, loop, cb) {
                if (typeof loop === "function") {
                    cb = loop;
                    loop = null;
                }
                var callback = function (bundle) {
                    if (bundle) {
                        bundle.load(path, cc.AudioClip, function (err, res) {
                            if (err) {
                                $info(path + " effect not exists!");
                                return;
                            }
                            if (typeof loop !== "boolean") {
                                loop = false;
                            }
                            var id = cc.audioEngine.playEffect(res, loop);
                            if (cb) {
                                cc.audioEngine.setFinishCallback(id, cb);
                            }
                        });
                    }
                };
                var _bundleName = bundleName;
                var bundle = null;
                if (!_bundleName) {
                    bundle = cc.resources;
                }
                else {
                    bundle = cc.assetManager.getBundle(_bundleName);
                }
                if (bundle) {
                    callback(bundle);
                }
                else {
                    $error("bundle ".concat(_bundleName, " is NOT EXIST or NOT LOAD"));
                }
            }
            AudioMgr.playEffect = playEffect;
            function setMusicOn(value) {
                cc.sys.localStorage.setItem("musicOn", value.toString());
                var volumeValue = 0;
                if (value == 1) {
                    volumeValue = 0;
                }
                else {
                    volumeValue = getMusicVolume();
                }
            }
            AudioMgr.setMusicOn = setMusicOn;
            function getMusicOn() {
                var temp = cc.sys.localStorage.getItem("musicOn");
                if (temp == null || temp == "null") {
                    temp = "0";
                    localStorage.setItem("musicOn", temp);
                }
                return parseInt(temp);
            }
            AudioMgr.getMusicOn = getMusicOn;
            function setEffectOn(value) {
                cc.sys.localStorage.setItem("effectOn", value.toString());
                var volumeValue = 0;
                if (value == 1) {
                    volumeValue = 0;
                }
                else {
                    volumeValue = getEffectVolume();
                }
            }
            AudioMgr.setEffectOn = setEffectOn;
            function getEffectOn() {
                var temp = cc.sys.localStorage.getItem("effectOn");
                if (temp == null || temp == "null") {
                    temp = "0";
                    localStorage.setItem("effectOn", temp);
                }
                return parseInt(temp);
            }
            AudioMgr.getEffectOn = getEffectOn;
            function init() {
                if (_inited) {
                    return;
                }
                $log("==audio init==");
                _inited = true;
                var volumn = cc.sys.localStorage.getItem("soundVolume");
                if (!volumn) {
                    _soundVolume = 1;
                }
                else if (volumn == "0") {
                    _soundVolume = 0;
                }
                else {
                    _soundVolume = parseFloat(volumn);
                }
                volumn = cc.sys.localStorage.getItem("effectVolume");
                if (!volumn) {
                    _effectVolume = 1;
                }
                else if (volumn == "0") {
                    _effectVolume = 0;
                }
                else {
                    _effectVolume = parseFloat(volumn);
                }
                $log("_soundVolume = ", _soundVolume);
                $log("_effectVolume = ", _effectVolume);
                cc.audioEngine.setMusicVolume(_soundVolume);
                cc.audioEngine.setEffectsVolume(_effectVolume);
            }
            AudioMgr.init = init;
        })(AudioMgr = izx.AudioMgr || (izx.AudioMgr = {}));
    })(izx = igs.izx || (igs.izx = {}));
})(igs = exports.igs || (exports.igs = {}));
(function (igs) {
    var platform;
    (function (platform) {
        platform.TrackNames = TrackName;
        var EventTrack;
        (function (EventTrack) {
            EventTrack.add = platform.trackEvent;
        })(EventTrack = platform.EventTrack || (platform.EventTrack = {}));
    })(platform = igs.platform || (igs.platform = {}));
})(igs = exports.igs || (exports.igs = {}));
function onizxInit() {
    igs.izx.AudioMgr.init();
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (CC_EDITOR) {
                    return [2];
                }
                $start();
                if (!CC_PREVIEW) return [3, 2];
                return [4, $platform.loadPlugin()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                cc.resources.load("bundle", cc.JsonAsset, function (err, res) {
                    if (err) {
                        throw new Error($tag("resources bundle must have bundle.json file!"));
                    }
                    try {
                        $log("load resources bundle.json success!");
                        $global.setBundleConfig("resources", res.json);
                        $global.inited = true;
                        $global.onInit();
                        onizxInit();
                    }
                    catch (e) {
                        throw new Error($tag("resources bundle.json parse error! " + e.message));
                    }
                });
                return [2];
        }
    });
}); })();
window["igs"] = igs;
