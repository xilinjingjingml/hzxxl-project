"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGSPoint = void 0;
var IGSPoint = (function () {
    function IGSPoint(x, y) {
        this.x = 0;
        this.y = 0;
        this.setXY(x, y);
    }
    IGSPoint.prototype.setXY = function (x, y) {
        this.x = x;
        this.y = y;
    };
    IGSPoint.prototype.setX = function (x) {
        this.x = x;
    };
    IGSPoint.prototype.setY = function (y) {
        this.y = y;
    };
    return IGSPoint;
}());
exports.IGSPoint = IGSPoint;
