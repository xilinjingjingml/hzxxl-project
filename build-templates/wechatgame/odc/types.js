"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankData = exports.Star = exports.MAX_STAR = exports.MAX_GRADE = exports.MAX_LVL = exports.MAX = exports.GradeConfig = exports.LevelDef = exports.WxUserRankData = exports.ListInfo = exports.Constant = void 0;
var Constant = (function () {
    function Constant() {
    }
    Constant.INIT_ODC = "init-odc";
    Constant.NEW_ODC = "new-odc";
    Constant.FRIEND_LIST = "friend-list";
    Constant.FRIEND_JSON_LIST = "friend-jsonlist";
    Constant.UPDATE_SCORE = "update-score";
    Constant.UPDATE_SCORE2 = "update-score2";
    Constant.CLEAR_LIST = "clear-list";
    Constant.TOUCH_START = "touch-start";
    Constant.TOUCH_MOVE = "touch-move";
    Constant.TOUCH_END = "touch-end";
    return Constant;
}());
exports.Constant = Constant;
var ListInfo = (function () {
    function ListInfo() {
    }
    ListInfo.prototype.isOnline = function () {
        var ts = this.ts || "0";
        if (this.online === "1" && (Date.now() - parseInt(ts)) <= 1000 * 60 * 6) {
            return true;
        }
        else {
            return false;
        }
    };
    return ListInfo;
}());
exports.ListInfo = ListInfo;
var WxUserRankData = (function () {
    function WxUserRankData() {
    }
    return WxUserRankData;
}());
exports.WxUserRankData = WxUserRankData;
exports.LevelDef = ["", "倔强青铜", "秩序白银", "荣耀黄金", "尊贵铂金", "永恒钻石", "至尊星耀", "最强王者"];
exports.GradeConfig = new Map();
exports.MAX = 0x00ffffff;
exports.MAX_LVL = exports.LevelDef.length - 1;
exports.MAX_GRADE = 0;
exports.MAX_STAR = 0xffff;
exports.Star = "星";
(function () {
    exports.GradeConfig.set("1", ["", "III", "II", "I"]);
    exports.GradeConfig.set("2", ["", "III", "II", "I"]);
    exports.GradeConfig.set("3", ["", "IV", "III", "II", "I"]);
    exports.GradeConfig.set("4", ["", "IV", "III", "II", "I"]);
    exports.GradeConfig.set("5", ["", "V", "IV", "III", "II", "I"]);
    exports.GradeConfig.set("6", ["", "V", "IV", "III", "II", "I"]);
    exports.GradeConfig.set("7", ["", "", "", "", "", "", ""]);
    exports.MAX_GRADE = exports.GradeConfig.size;
})();
var RankData = (function () {
    function RankData(lvl, grade, star) {
        this.lvl = lvl;
        this.grade = grade;
        this.star = star;
    }
    RankData.isValid = function (lvl, grade, star) {
        if (lvl < 1 || lvl > exports.MAX_LVL) {
            throw new Error("level must in [1, ".concat(exports.MAX_LVL, "], now is ").concat(lvl));
        }
        if (grade < 1 || grade > exports.MAX_GRADE) {
            throw new Error("grade must in [1, ".concat(exports.MAX_GRADE, "], now is ").concat(grade));
        }
        if (star < 0 || star > exports.MAX_STAR) {
            throw new Error("star must in [0, ".concat(exports.MAX_STAR, "], now is ").concat(star));
        }
        return true;
    };
    RankData.gen = function (lvl, grade, star) {
        if (this.isValid(lvl, grade, star)) {
            return new RankData(lvl, grade, star);
        }
        return null;
    };
    RankData.parse = function (num) {
        var star = 0x0000ffff & num;
        var grade = 0x0000000f & (num >> 16);
        var lvl = 0x0000000f & (num >> 20);
        return this.gen(lvl, grade, star);
    };
    RankData.parseToInts = function (num) {
        var star = 0x0000ffff & num;
        var grade = 0x0000000f & (num >> 16);
        var lvl = 0x0000000f & (num >> 20);
        return [lvl, grade, star];
    };
    RankData.getLevelString = function (num) {
        if (num <= 0) {
            return exports.LevelDef[1];
        }
        return exports.LevelDef[0x0000000f & (num >> 20)];
    };
    RankData.getLevelInt = function (num) {
        if (num <= 0) {
            return 1;
        }
        return 0x0000000f & (num >> 20);
    };
    RankData.getGradeString = function (num) {
        if (num <= 0) {
            return exports.GradeConfig.get("1")[1];
        }
        var lvl = Math.min(exports.MAX_GRADE, this.getLevelInt(num));
        return exports.GradeConfig.get("" + lvl)[0x0000000f & (num >> 16)];
    };
    RankData.getStarString = function (num) {
        if (num <= 0) {
            return "0";
        }
        return "" + (0x0000ffff & num);
    };
    RankData.prototype.toNumber = function () {
        return this.star + (this.grade << 16) + (this.lvl << 20);
    };
    RankData.prototype.toString = function () {
        return exports.LevelDef[this.lvl] + exports.GradeConfig.get("" + this.lvl)[this.grade] + this.star + exports.Star;
    };
    return RankData;
}());
exports.RankData = RankData;
