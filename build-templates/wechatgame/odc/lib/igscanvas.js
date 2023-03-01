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
exports.IGSCanvas = void 0;
var igsnode_1 = require("./igsnode");
var IGSCanvas = (function (_super) {
    __extends(IGSCanvas, _super);
    function IGSCanvas() {
        var _this = _super.call(this) || this;
        _this.canvas = null;
        _this.ctx = null;
        _this.bindLoop = null;
        _this.hasRequestAnimationFrame = false;
        _this.isClick = false;
        _this.tag = "igscanvas";
        _this.canvas = wx.getSharedCanvas();
        _this.ctx = _this.canvas.getContext("2d");
        _this.ctx.imageSmoothingEnabled = true;
        _this.ctx.imageSmoothingQuality = "high";
        _this.bindLoop = _this.loop.bind(_this);
        _this.hasRequestAnimationFrame = false;
        return _this;
    }
    IGSCanvas.prototype.update = function () { };
    IGSCanvas.prototype.loop = function () {
        this.hasRequestAnimationFrame = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.render(this.ctx);
        this.update();
    };
    IGSCanvas.prototype.requestAnimationFrame = function () {
        if (!this.hasRequestAnimationFrame) {
            requestAnimationFrame(this.bindLoop);
            this.hasRequestAnimationFrame = true;
        }
    };
    IGSCanvas.prototype.getWidth = function () {
        return this.canvas.width;
    };
    IGSCanvas.prototype.getHeight = function () {
        return this.canvas.height;
    };
    return IGSCanvas;
}(igsnode_1.IGSNode));
exports.IGSCanvas = IGSCanvas;
