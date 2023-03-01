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
var types_1 = require("./types");
var wxApi_1 = require("./wxApi");
function getFirstTimeOfWeek() {
    var now = new Date();
    var day = now.getDay() || 7;
    var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1 - day);
    return Math.floor(date.getTime() / 1e3);
}
var Store = (function () {
    function Store() {
        this.worldTopInfosMap = {};
        this.isHisRank = false;
    }
    Store.prototype.getFriendTopList = function (key) {
        var _this = this;
        return new Promise(function (rlv) {
            _this.refreshFriendTopList(key).then(function (ret) {
                rlv(_this.worldTopInfosMap[key]);
            });
        });
    };
    ;
    Store.prototype.refreshFriendTopList = function (key) {
        var _this = this;
        var thiz = this;
        return new Promise(function (rlv) {
            wxApi_1.WXApi.getFriendCloudStorage({
                keyList: [key, key + "_android", key + "_ios", "online", "ts"]
            }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var infos;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.info("sub get friend cloud storage, key", key, "res", res);
                            console.log("=== refreshFriendTopList", key, "res", res);
                            if (!res) {
                                return [2, rlv(null)];
                            }
                            if (!res.data || res.data.length == 0) {
                                this.worldTopInfosMap[key] = [];
                                return [2, rlv(null)];
                            }
                            return [4, thiz.parseFriendTopList(key, res.data)];
                        case 1:
                            infos = _a.sent();
                            if (!infos || infos.length == 0) {
                                thiz.worldTopInfosMap[key] = [];
                                return [2, rlv(null)];
                            }
                            infos.sort(function (a, b) {
                                var scoreA = a.score;
                                var scoreB = b.score;
                                if (scoreA === scoreB) {
                                    return 0;
                                }
                                return scoreA > scoreB ? -1 : 1;
                            });
                            this.worldTopInfosMap[key] = infos;
                            console.info("refresh friend toplist success", infos);
                            return [2, rlv(null)];
                    }
                });
            }); });
        });
    };
    ;
    Store.prototype.parseFriendTopList = function (key, gameScoreList) {
        var _this = this;
        var thiz = this, userInfos = null, listInfos = null, firstTimeOfWeek = null, loop = null;
        return new Promise(function (rlv) {
            _this.getUserInfos(gameScoreList).then(function (ret) {
                userInfos = ret;
                if (!thiz.isHisRank) {
                    if (!userInfos) {
                        return rlv(null);
                    }
                    listInfos = [];
                    firstTimeOfWeek = getFirstTimeOfWeek();
                    console.log("=== gameScoreList:", JSON.stringify(gameScoreList));
                    loop = function (i) {
                        var gameScore = gameScoreList[i];
                        var listInfo = new types_1.ListInfo();
                        var validScore = thiz.getValidJsonScore(key, gameScore, listInfo);
                        if (validScore == null) {
                            return;
                        }
                        listInfo.openid = gameScore.openid;
                        listInfo.avatar = gameScore.avatarUrl;
                        listInfo.nickname = gameScore.nickname;
                        listInfo.gender = userInfos[gameScore.openid] && userInfos[gameScore.openid].gender;
                        listInfo.score = validScore && validScore.wxgame.score || -1;
                        listInfo.ext = validScore.ext;
                        listInfos.push(listInfo);
                    };
                    for (var i = 0; i < gameScoreList.length; i++) {
                        loop(i);
                    }
                    return rlv(listInfos);
                }
            });
        });
    };
    ;
    Store.prototype.getUserInfos = function (gameScoreList) {
        return new Promise(function (rlv) {
            var openids = [];
            for (var i = 0; i < gameScoreList.length; i++) {
                openids.push(gameScoreList[i].openid);
            }
            wxApi_1.WXApi.getUsersInfo(openids).then(function (res) {
                if (!res) {
                    console.warn("get user infos error");
                    return rlv(null);
                }
                var userInfos = res.data;
                if (!userInfos || userInfos.length == 0) {
                    console.info("get user infos empty");
                    return rlv(null);
                }
                var result = {};
                for (var i = 0; i < userInfos.length; i++) {
                    result[userInfos[i].openId] = userInfos[i];
                }
                return rlv(result);
            });
        });
    };
    ;
    Store.prototype.getValidScore = function (key, gameScore, firstTimeOfWeek) {
        if (!gameScore) {
            return -1;
        }
        if (!gameScore.KVDataList || gameScore.KVDataList.length == 0) {
            return -1;
        }
        var validScore = -1;
        for (var i = 0; i < gameScore.KVDataList.length; i++) {
            var kvData = gameScore.KVDataList[i];
            var gameScoreKey = kvData.key;
            if (gameScoreKey != key && gameScoreKey != key + "_android" && gameScoreKey != key + "_ios") {
                continue;
            }
            var gameScoreValue = JSON.parse(kvData.value);
            if (!gameScoreValue) {
                continue;
            }
            if (gameScoreValue.wxgame.score > validScore) {
                validScore = gameScoreValue.wxgame.score;
            }
        }
        return validScore;
    };
    ;
    Store.prototype.updateScore = function (key, score) {
        var _this = this;
        return new Promise(function (rlv) {
            wxApi_1.WXApi.getUserCloudStorage({
                keyList: [key, key + "_android", key + "_ios"]
            }).then(function (gameScore) { return __awaiter(_this, void 0, void 0, function () {
                var firstTimeOfWeek, oldScore, gameScoreValue, data, ret;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            firstTimeOfWeek = getFirstTimeOfWeek();
                            oldScore = this.getValidScore(key, gameScore, firstTimeOfWeek);
                            console.info("update score, oldScore", oldScore, "newScore", score);
                            console.info("rank detail", types_1.RankData.parse(score).toString());
                            gameScoreValue = {
                                wxgame: {
                                    score: score,
                                    update_time: Math.floor(new Date().getTime() / 1e3)
                                }
                            };
                            data = [{
                                    key: key,
                                    value: JSON.stringify(gameScoreValue)
                                }];
                            return [4, wxApi_1.WXApi.setUserCloudStorage(data)];
                        case 1:
                            ret = _a.sent();
                            if (ret) {
                                console.info("set user score success", score);
                            }
                            else {
                                console.warn("set user score error", score);
                            }
                            return [2, rlv(null)];
                    }
                });
            }); });
        });
    };
    ;
    Store.prototype.getValidJsonScore = function (key, gameScore, listInfo) {
        if (!gameScore) {
            return null;
        }
        if (!gameScore.KVDataList || gameScore.KVDataList.length == 0) {
            return null;
        }
        for (var i = 0; i < gameScore.KVDataList.length; i++) {
            var kvData = gameScore.KVDataList[i];
            var gameScoreKey = kvData.key;
            if (gameScoreKey === "online") {
                listInfo.online = kvData.value;
            }
            else if (gameScoreKey === "ts") {
                listInfo.ts = kvData.value;
            }
        }
        for (var i = 0; i < gameScore.KVDataList.length; i++) {
            var kvData = gameScore.KVDataList[i];
            var gameScoreKey = kvData.key;
            if (gameScoreKey != key && gameScoreKey != key + "_android" && gameScoreKey != key + "_ios") {
                continue;
            }
            var gameScoreValue = JSON.parse(kvData.value);
            if (gameScoreValue === null || gameScoreValue === undefined) {
                continue;
            }
            return gameScoreValue;
        }
        return null;
    };
    ;
    Store.prototype.getCurrentFriendList = function (key) {
        var _this = this;
        return new Promise(function (rlv) {
            wxApi_1.WXApi.getFriendCloudStorage({
                keyList: [key, key + "_android", key + "_ios", "online", "ts"]
            }).then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                var gameScoreList, listInfos, thiz, loop, i;
                return __generator(this, function (_a) {
                    console.log("=getCurrentFriendList=", key, "res", res);
                    if (!res) {
                        return [2, rlv(null)];
                    }
                    if (!res.data || res.data.length == 0) {
                        this.worldTopInfosMap[key] = [];
                        return [2, rlv(null)];
                    }
                    gameScoreList = res.data;
                    listInfos = [];
                    thiz = this;
                    loop = function (i) {
                        var gameScore = gameScoreList[i];
                        var listInfo = new types_1.WxUserRankData();
                        listInfo.avatarUrl = gameScore.avatarUrl;
                        listInfo.nickname = gameScore.nickname;
                        var scoreData = gameScore.KVDataList.find(function (item) {
                            item.key === key;
                        });
                        listInfo.score = JSON.parse(scoreData.value).wxgame.score;
                        listInfos.push(listInfo);
                    };
                    for (i = 0; i < gameScoreList.length; i++) {
                        loop(i);
                    }
                    listInfos.sort(function (a, b) {
                        var scoreA = a.score;
                        var scoreB = b.score;
                        if (scoreA === scoreB) {
                            return 0;
                        }
                        return scoreA > scoreB ? -1 : 1;
                    });
                    console.info("=getCurrentFriendList2=", listInfos);
                    return [2, rlv(listInfos)];
                });
            }); });
        });
    };
    Store.prototype.updateScore2 = function (key, score, ext) {
        var _this = this;
        var thiz = this;
        console.log("=updateScore2=", key, score, ext);
        return new Promise(function (rlv) { return __awaiter(_this, void 0, void 0, function () {
            var gameScoreValue, data, ret;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gameScoreValue = {
                            wxgame: {
                                score: score,
                                update_time: Math.floor(new Date().getTime() / 1e3)
                            },
                        };
                        if (ext) {
                            gameScoreValue.ext = ext;
                        }
                        data = [{
                                key: key,
                                value: JSON.stringify(gameScoreValue)
                            }];
                        console.log("update score2", gameScoreValue);
                        return [4, wxApi_1.WXApi.setUserCloudStorage(data)];
                    case 1:
                        ret = _a.sent();
                        if (ret) {
                            console.info("set user score success", score);
                        }
                        else {
                            console.warn("set user score error", score);
                        }
                        return [2, rlv(null)];
                }
            });
        }); });
    };
    ;
    return Store;
}());
exports.default = new Store();
