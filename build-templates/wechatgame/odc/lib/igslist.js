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
exports.IGSList = void 0;
var igsnode_1 = require("./igsnode");
var IGSList = (function (_super) {
    __extends(IGSList, _super);
    function IGSList(numberOfItems, itemHeight, itemNodeAtIndexFunc, x, y, width, height, gapY, topGapY) {
        var _this = this;
        x === void 0 && (x = 0);
        y === void 0 && (y = 0);
        width === void 0 && (width = 0);
        height === void 0 && (height = 0);
        _this = _super.call(this, x, y) || this;
        _this.showStartIndex = 0;
        _this.showEndIndex = -1;
        _this.recycleNodes = [];
        _this.lastTouchY = 0;
        _this.lastTouchOffsetY = 0;
        _this.numberOfItems = numberOfItems;
        _this.itemHeight = itemHeight;
        _this.itemNodeAtIndexFunc = itemNodeAtIndexFunc;
        _this.clipToBounds = true;
        _this.gapY = gapY || 0;
        _this.topGapY = topGapY || 0;
        _this.setSize(width, height);
        _this._initVariables();
        _this._updateNodes();
        return _this;
    }
    IGSList.prototype.render = function (ctx) {
        _super.prototype.render.call(this, ctx);
        if (this.deltaOffsetY != 0) {
            var newOffsetY = this.offsetY + this.deltaOffsetY;
            if (newOffsetY < 0) {
                newOffsetY = 0;
                this.deltaOffsetY = 0;
            }
            if (newOffsetY > this.maxOffsetY) {
                newOffsetY = this.maxOffsetY;
                this.deltaOffsetY = 0;
            }
            this.offsetY = newOffsetY;
            this.deltaOffsetY *= .96;
            if (Math.abs(this.deltaOffsetY) < 1) {
                this.deltaOffsetY = 0;
            }
            this._updateNodes();
            this.setNeedRequestAnimationFrame();
        }
    };
    IGSList.prototype._initVariables = function () {
        var contentHeight = this.itemHeight * this.numberOfItems + this.topGapY + this.gapY * (this.numberOfItems - 1);
        this.offsetY = 0;
        this.deltaOffsetY = 0;
        this.maxOffsetY = contentHeight > this.size.y ? contentHeight - this.size.y : 0;
        this.showStartIndex = 0;
        this.showEndIndex = -1;
        this.recycleNodes = [];
    };
    IGSList.prototype._updateNodes = function () {
        var oldShowStartIndex = this.showStartIndex;
        var oldShowEndIndex = this.showEndIndex;
        this.showStartIndex = Math.floor(this.offsetY / this.itemHeight);
        if (this.showStartIndex < 0) {
            this.showStartIndex = 0;
        }
        this.showEndIndex = Math.floor((this.offsetY + this.size.y) / this.itemHeight);
        if (this.showEndIndex >= this.numberOfItems) {
            this.showEndIndex = this.numberOfItems - 1;
        }
        var recycleNodes = [];
        var useNodes = {};
        for (var i = oldShowStartIndex; i <= oldShowEndIndex; i++) {
            var node = this.children[i - oldShowStartIndex];
            if (i < this.showStartIndex || i > this.showEndIndex) {
                recycleNodes.push(node);
            }
            else {
                useNodes[i.toString()] = node;
            }
        }
        for (var i = 0; i < recycleNodes.length; i++) {
            var node = recycleNodes[i];
            node.parent = null;
            this.recycleNodes.push(node);
        }
        this.children = [];
        for (var i = this.showStartIndex; i <= this.showEndIndex; i++) {
            var itemNode = useNodes[i.toString()];
            if (!itemNode) {
                var reusableNode = this.recycleNodes.length > 0 ? this.recycleNodes.pop() : null;
                itemNode = this.itemNodeAtIndexFunc(i, reusableNode);
            }
            var posY = (i + .5) * this.itemHeight - this.offsetY - this.size.y / 2;
            itemNode.setPosition(0, posY + i * this.gapY + this.topGapY);
            this.addChild(itemNode);
        }
    };
    ;
    IGSList.prototype.onMouseStart = function (x, y) {
        this.deltaOffsetY = 0;
        this.lastTouchY = y;
        this.lastTouchOffsetY = 0;
        this.touchStart.x = x;
        this.touchStart.y = y;
    };
    ;
    IGSList.prototype.onMouseMove = function (x, y) {
        var newOffsetY = this.offsetY + this.lastTouchY - y;
        if (newOffsetY < 0) {
            newOffsetY = 0;
        }
        if (newOffsetY > this.maxOffsetY) {
            newOffsetY = this.maxOffsetY;
        }
        this.lastTouchOffsetY = newOffsetY - this.offsetY;
        this.lastTouchY = y;
        this.offsetY = newOffsetY;
        this._updateNodes();
        this.setNeedRequestAnimationFrame();
    };
    ;
    IGSList.prototype.onMouseEnd = function (x, y) {
        this.deltaOffsetY = this.lastTouchOffsetY;
        this.setNeedRequestAnimationFrame();
    };
    ;
    return IGSList;
}(igsnode_1.IGSNode));
exports.IGSList = IGSList;
