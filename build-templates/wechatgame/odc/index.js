"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGSApp = void 0;
var types_1 = require("./types");
var igscanvas_1 = require("./lib/igscanvas");
var wxApi_1 = require("./wxApi");
var store_1 = require("./store");
var toplist_1 = require("./toplist");
var IGSApp = (function () {
    function IGSApp(id) {
        this.myInfo = null;
        this.canvas = null;
        this.curMsg = "";
        this.isHisRank = false;
        this.id = null;
        this.touchStart = { x: 0, y: 0 };
        this.id = id;
        console.log("IGSApp init", this.id);
        this.canvas = new igscanvas_1.IGSCanvas();
        this.curMsg = "";
        this.isHisRank = false;
    }
    IGSApp.prototype.showFriendTopList = function (key, extInMain, wxopenid) {
        var _this = this;
        return new Promise(function (rlv) { return __awaiter(_this, void 0, void 0, function () {
            var res, me, ret, infos, _i, infos_1, i, node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.myInfo) return [3, 2];
                        return [4, wxApi_1.WXApi.getUsersInfo(['selfOpenId'])];
                    case 1:
                        res = _a.sent();
                        if (!res || !res.data || res.data.length == 0) {
                            return [2, rlv(null)];
                        }
                        me = res.data[0];
                        this.myInfo = me;
                        this.myInfo.openId = wxopenid;
                        _a.label = 2;
                    case 2:
                        store_1.default.isHisRank = this.isHisRank;
                        console.log("friend list key:", key, this.isHisRank);
                        return [4, store_1.default.getFriendTopList(key)];
                    case 3:
                        ret = _a.sent();
                        infos = ret;
                        if (this.curMsg != types_1.Constant.FRIEND_LIST) {
                            return [2, rlv(null)];
                        }
                        if (!infos || infos.length == 0) {
                            return [2, rlv(null)];
                        }
                        for (_i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                            i = infos_1[_i];
                            if (i.openid === wxopenid) {
                                i.isMe = true;
                            }
                            i.extInMain = extInMain;
                        }
                        node = toplist_1.default.genTopListNode(infos, this.canvas.getWidth(), this.canvas.getHeight());
                        this.canvas.addChild(node);
                        return [2, rlv(null)];
                }
            });
        }); });
    };
    IGSApp.prototype.onMouseStart = function (mouseX, mouseY) {
        var list = this.canvas.children[0];
        if (list) {
            if (list.children && list.children.length > 0) {
                var list1 = list.children[0];
                list1.onMouseStart && list1.onMouseStart(mouseX, mouseY);
            }
        }
    };
    IGSApp.prototype.onMouseMove = function (mouseX, mouseY) {
        var list = this.canvas.children[0];
        if (list) {
            if (list.children && list.children.length > 0) {
                var list1 = list.children[0];
                list1.onMouseMove && list1.onMouseMove(mouseX, mouseY);
            }
        }
    };
    IGSApp.prototype.onMouseEnd = function (mouseX, mouseY) {
        var list = this.canvas.children[0];
        if (list) {
            if (list.children && list.children.length > 0) {
                var list1 = list.children[0];
                list1.onMouseEnd && list1.onMouseEnd(mouseX, mouseY);
            }
        }
    };
    IGSApp.prototype.clear = function () {
        this.canvas.removeAllChildren();
    };
    IGSApp.prototype.updateScore = function (key, score) {
        store_1.default.updateScore(key, types_1.RankData.gen(score.level, score.grade, score.star).toNumber());
    };
    IGSApp.prototype.updateScore2 = function (key, score, ext) {
        store_1.default.updateScore2(key, score, ext);
    };
    IGSApp.instance = null;
    return IGSApp;
}());
exports.IGSApp = IGSApp;
var igsApp = IGSApp.instance = new IGSApp("");
(function () {
    console.log("init igsapp ", Date.now());
    wxApi_1.WXApi.onMessage(function (data) {
        if (!data.message) {
            return;
        }
        if (data.message !== types_1.Constant.TOUCH_MOVE) {
            console.info("onMessage", data);
        }
        var id = data.id;
        if (data.message === types_1.Constant.INIT_ODC) {
            if (!igsApp) {
                igsApp = IGSApp.instance = new IGSApp(id);
            }
            igsApp.id = id;
        }
        else if (data.message === types_1.Constant.NEW_ODC) {
            if (igsApp) {
                igsApp.clear();
            }
            igsApp = IGSApp.instance = new IGSApp(id);
        }
        else {
            var thiz_1 = igsApp;
            if (thiz_1) {
                thiz_1.curMsg = data.message;
                switch (data.message) {
                    case types_1.Constant.FRIEND_LIST:
                        thiz_1.clear();
                        var dataMsg = data;
                        thiz_1.isHisRank = dataMsg.isHisRank;
                        var extObj = {};
                        try {
                            extObj = JSON.parse(dataMsg.value);
                        }
                        catch (e) {
                        }
                        thiz_1.showFriendTopList(dataMsg.key, extObj, extObj['wxopenid'] || "");
                        break;
                    case types_1.Constant.CLEAR_LIST:
                        thiz_1.clear();
                        break;
                    case types_1.Constant.UPDATE_SCORE:
                        thiz_1.updateScore(data.key, data);
                        break;
                    case types_1.Constant.UPDATE_SCORE2:
                        (function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var msgData, score, ext, valueObj;
                                return __generator(this, function (_a) {
                                    msgData = data;
                                    score = -1;
                                    ext = null;
                                    try {
                                        valueObj = JSON.parse(msgData.value);
                                        if (!valueObj.hasOwnProperty('score')) {
                                            console.error("must have score");
                                        }
                                        if (!valueObj.hasOwnProperty('wxopenid')) {
                                            console.error("must have wxopenid");
                                        }
                                        score = valueObj['score'] || -1;
                                        ext = valueObj["save"] || null;
                                    }
                                    catch (e) {
                                    }
                                    if (score == -1) {
                                        console.error("updateScore2 error", score);
                                        return [2];
                                    }
                                    thiz_1.updateScore2(msgData.key, score, ext);
                                    return [2];
                                });
                            });
                        })();
                        break;
                    case types_1.Constant.TOUCH_START:
                        thiz_1.touchStart.x = data.mouseX;
                        thiz_1.touchStart.y = data.mouseY;
                        thiz_1.canvas.touchStart.x = data.mouseX;
                        thiz_1.canvas.touchStart.y = data.mouseY;
                        thiz_1.canvas.isClick = false;
                        thiz_1.onMouseStart(data.mouseX, data.mouseY);
                        break;
                    case types_1.Constant.TOUCH_MOVE:
                        thiz_1.onMouseMove(data.mouseX, data.mouseY);
                        break;
                    case types_1.Constant.TOUCH_END:
                        thiz_1.canvas.touchEnd.x = data.mouseX;
                        thiz_1.canvas.touchEnd.y = data.mouseY;
                        thiz_1.canvas.isClick = Math.abs(thiz_1.canvas.touchEnd.x - thiz_1.canvas.touchStart.x) < 2 && Math.abs(thiz_1.canvas.touchEnd.y - thiz_1.canvas.touchStart.y) < 2;
                        thiz_1.onMouseEnd(data.mouseX, data.mouseY);
                        break;
                    default:
                        break;
                }
            }
            else {
                console.log("not exist", id);
            }
        }
    });
})();
