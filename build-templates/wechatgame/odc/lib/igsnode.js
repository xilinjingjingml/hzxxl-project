"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGSNode = void 0;
var igspoint_1 = require("./igspoint");
var IGSNode = (function () {
    function IGSNode(x, y) {
        this.x = 0;
        this.y = 0;
        this.tag = null;
        this.visible = true;
        this.position = null;
        this.size = null;
        this.backgroundColor = null;
        this.clipToBounds = false;
        this.children = [];
        this.parent = null;
        this.igscanvas = null;
        this.touchStart = { x: -999, y: -999 };
        this.touchEnd = { x: 10000, y: 10000 };
        this.onClick = null;
        x === void 0 && (x = 0);
        y === void 0 && (y = 0);
        this.tag = "igsnode";
        this.visible = true;
        this.position = new igspoint_1.IGSPoint(x, y);
        this.size = new igspoint_1.IGSPoint(0, 0);
        this.backgroundColor = null;
        this.clipToBounds = false;
        this.children = [];
        this.parent = null;
        this.igscanvas = null;
    }
    IGSNode.prototype.setNeedRequestAnimationFrame = function () {
        if (!this.igscanvas) {
            var thiz = this;
            while (thiz) {
                if (thiz.tag == "igscanvas") {
                    this.igscanvas = thiz;
                    break;
                }
                thiz = thiz.parent;
            }
        }
        if (this.igscanvas) {
            this.igscanvas.requestAnimationFrame();
        }
    };
    IGSNode.prototype.setVisible = function (visible) {
        this.visible = visible;
        this.setNeedRequestAnimationFrame();
    };
    IGSNode.prototype.setPosition = function (x, y) {
        this.position.setXY(x, y);
        this.setNeedRequestAnimationFrame();
    };
    IGSNode.prototype.setX = function (x) {
        this.position.setX(x);
        this.setNeedRequestAnimationFrame();
    };
    IGSNode.prototype.setY = function (y) {
        this.position.setY(y);
        this.setNeedRequestAnimationFrame();
    };
    IGSNode.prototype.setSize = function (x, y) {
        this.size.setXY(x, y);
        this.setNeedRequestAnimationFrame();
    };
    IGSNode.prototype.setBackgroundColor = function (backgroundColor) {
        this.backgroundColor = backgroundColor;
        this.setNeedRequestAnimationFrame();
    };
    IGSNode.prototype.addChild = function (node) {
        this.children.push(node);
        node.parent = this;
        this.setNeedRequestAnimationFrame();
    };
    IGSNode.prototype.removeAllChildren = function () {
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.parent = null;
        }
        this.children = [];
        this.setNeedRequestAnimationFrame();
    };
    ;
    IGSNode.prototype.removeFromParent = function () {
        var index = this.parent.children.indexOf(this);
        if (index != -1) {
            this.parent.children.splice(index, 1);
        }
        this.parent.setNeedRequestAnimationFrame();
        this.parent = null;
    };
    ;
    IGSNode.prototype.render = function (ctx) {
        if (!this.visible) {
            return false;
        }
        ctx.save();
        if (this.clipToBounds) {
            var left = this.position.x - this.size.x / 2;
            var top_1 = this.position.y - this.size.y / 2;
            ctx.rect(left, top_1, this.size.x, this.size.y);
            ctx.clip();
        }
        if (this.backgroundColor) {
            var left = this.position.x - this.size.x / 2;
            var top_2 = this.position.y - this.size.y / 2;
            ctx.fillStyle = this.backgroundColor;
            ctx.fillRect(left, top_2, this.size.x, this.size.y);
        }
        ctx.translate(this.position.x, this.position.y);
        for (var i = 0; i < this.children.length; i++) {
            var child = this.children[i];
            child.render(ctx);
        }
        ctx.restore();
        return true;
    };
    IGSNode.prototype.getWorldBoundBox = function () {
        var pos = new igspoint_1.IGSPoint(this.position.x, this.position.y);
        var parent = this.parent;
        while (parent) {
            pos.x += parent.position.x;
            pos.y += parent.position.y;
            parent = parent.parent;
        }
        return { x: pos.x - this.size.x / 2, y: pos.y - this.size.y / 2, width: this.size.x, height: this.size.y };
    };
    IGSNode.prototype.clickInRect = function () {
        var r = this.getWorldBoundBox();
        return this.igscanvas.touchEnd.x >= r.x && this.igscanvas.touchEnd.x <= r.width + r.x && this.igscanvas.touchEnd.y >= r.y && this.igscanvas.touchEnd.y <= r.height + r.y;
    };
    return IGSNode;
}());
exports.IGSNode = IGSNode;
