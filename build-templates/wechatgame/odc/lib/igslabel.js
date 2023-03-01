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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGSLabel = void 0;
var igsnode_1 = require("./igsnode");
var IGSLabel = (function (_super) {
    __extends(IGSLabel, _super);
    function IGSLabel(text, fontSize, fontColor, horizontalAlignment, verticalAlignment, x, y) {
        var _this = this;
        x === void 0 && (x = 0);
        y === void 0 && (y = 0);
        _this = _super.call(this, x, y) || this;
        _this.text = text;
        _this.fontSize = fontSize;
        _this.fontColor = fontColor;
        _this.horizontalAlignment = horizontalAlignment;
        _this.verticalAlignment = verticalAlignment;
        return _this;
    }
    IGSLabel.prototype.render = function (ctx) {
        if (!this.visible) {
            return false;
        }
        ctx.save();
        ctx.fillStyle = this.fontColor;
        ctx.font = this.fontSize + "px Arial";
        ctx.textAlign = this.horizontalAlignment;
        ctx.textBaseline = this.verticalAlignment;
        ctx.fillText(this.text, this.position.x, this.position.y);
        ctx.restore();
    };
    IGSLabel.prototype.setText = function (text) {
        this.text = text;
        this.setNeedRequestAnimationFrame();
    };
    IGSLabel.prototype.setColor = function (color) {
        this.fontColor = color;
        this.setNeedRequestAnimationFrame();
    };
    IGSLabel.prototype.setSize = function (size) {
        this.fontSize = size;
        this.setNeedRequestAnimationFrame();
    };
    return IGSLabel;
}(igsnode_1.IGSNode));
exports.IGSLabel = IGSLabel;
