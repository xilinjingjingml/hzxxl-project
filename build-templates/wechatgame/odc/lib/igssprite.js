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
exports.IGSSprite = void 0;
var index_1 = require("../index");
var igsnode_1 = require("./igsnode");
var IGSSprite = (function (_super) {
    __extends(IGSSprite, _super);
    function IGSSprite(imgSrc, x, y) {
        var _this_1 = this;
        imgSrc === void 0 && (imgSrc = "");
        x === void 0 && (x = 0);
        y === void 0 && (y = 0);
        _this_1 = _super.call(this, x, y) || this;
        _this_1.src = "";
        _this_1.img = null;
        _this_1.setSrc(imgSrc);
        return _this_1;
    }
    IGSSprite.prototype.render = function (ctx) {
        if (!this.visible) {
            return false;
        }
        if (this.img) {
            var left = this.position.x - this.size.x / 2;
            var top_1 = this.position.y - this.size.y / 2;
            ctx.drawImage(this.img, left, top_1, this.size.x, this.size.y);
        }
        if (index_1.IGSApp.instance.canvas.isClick && this.onClick) {
            if (this.clickInRect()) {
                this.onClick();
                index_1.IGSApp.instance.canvas.isClick = false;
            }
        }
        return true;
    };
    ;
    IGSSprite.prototype.setSrc = function (src) {
        var _this = this;
        this.img = null;
        if (!src || src.length == 0) {
            this.src = null;
            this.img = null;
            this.setNeedRequestAnimationFrame();
            return;
        }
        this.src = src;
        var img = wx.createImage();
        img.src = src;
        img.onload = function () {
            if (_this.src == src) {
                _this.img = img;
                if (_this.size.x == 0 && _this.size.y == 0) {
                    _this.size.x = img.width;
                    _this.size.y = img.height;
                }
                _this.setNeedRequestAnimationFrame();
            }
        };
        img.onerror = function () {
            _this.visible = false;
        };
    };
    ;
    return IGSSprite;
}(igsnode_1.IGSNode));
exports.IGSSprite = IGSSprite;
