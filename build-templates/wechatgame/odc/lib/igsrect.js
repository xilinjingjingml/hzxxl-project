"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGSRect = void 0;
var IGSRect = (function () {
    function IGSRect(leftTop, widthHeight) {
        this.leftTop = leftTop;
        this.widthHeight = widthHeight;
    }
    IGSRect.prototype.setLeft = function (left) {
        this.leftTop.setX(left);
    };
    ;
    IGSRect.prototype.setTop = function (top) {
        this.leftTop.setY(top);
    };
    ;
    IGSRect.prototype.setWidth = function (width) {
        this.widthHeight.setX(width);
    };
    ;
    IGSRect.prototype.setHeight = function (height) {
        this.widthHeight.setY(height);
    };
    ;
    return IGSRect;
}());
exports.IGSRect = IGSRect;
