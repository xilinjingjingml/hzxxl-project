"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var igslabel_1 = require("./lib/igslabel");
var igslist_1 = require("./lib/igslist");
var igsnode_1 = require("./lib/igsnode");
var igssprite_1 = require("./lib/igssprite");
function getFixString(str, len) {
    if (!str || len < 0 || typeof str != "string") {
        return "";
    }
    var _tmpLength = 0;
    for (var i = 0; i < str.length; i++) {
        if (/[\u0000-\u00ff]/g.test(str.charAt(i))) {
            _tmpLength += .6;
        }
        else if (/[\u4e00-\u9fa5]/g.test(str.charAt(i))) {
            _tmpLength += 1;
        }
        else if (/[\uff00-\uffff]/g.test(str.charAt(i))) {
            _tmpLength += 1;
        }
        else {
            _tmpLength += 1;
        }
        if (_tmpLength > len) {
            str = str.slice(0, i - 1) + "...";
            break;
        }
    }
    return str;
}
var TopList = (function () {
    function TopList() {
    }
    TopList.prototype.genTopListNode = function (worldTopInfos, width, height) {
        worldTopInfos.sort(function (a, b) {
            if (a.isOnline()) {
                return -1;
            }
            else if (b.isOnline()) {
                return 1;
            }
            return 0;
        });
        var _this = this;
        var node = new igsnode_1.IGSNode(0, 0);
        var list = new igslist_1.IGSList(worldTopInfos.length, TopList.itemHeight, function (i, reusableNode) {
            if (!reusableNode) {
                reusableNode = _this.newRankItemNode(width, worldTopInfos);
            }
            _this.configRankItemNode(worldTopInfos, i, reusableNode);
            return reusableNode;
        }, width / 2, height / 2, width, height);
        node.addChild(list);
        return node;
    };
    ;
    TopList.prototype.newRankItemNode = function (width, worldTopInfos) {
        var halfWidth = width / 2;
        var node = new igsnode_1.IGSNode();
        if (worldTopInfos.length === 0) {
            return node;
        }
        var style = worldTopInfos[0].extInMain['style'] || "";
        if (!style) {
            console.error("showListData's value param need contain :style attr");
        }
        if (style === "game") {
            var headX = -halfWidth + 15 + 62 / 2;
            var nameX = headX + 62 / 2 + 10;
            var inviteX = halfWidth - 80 / 2 - 15;
            var onlineX = headX + 62 / 2 - 42 / 2;
            var head = new igssprite_1.IGSSprite("");
            head.setSize(62, 62);
            head.setPosition(headX, 0);
            node.addChild(head);
            var headMask = new igssprite_1.IGSSprite("odc/res/game/avatar_mask.png");
            headMask.setSize(62, 62);
            headMask.setPosition(headX, 0);
            node.addChild(headMask);
            var online = new igssprite_1.IGSSprite("odc/res/game/zaixianbiaoqian.png");
            online.setSize(42, 20);
            online.setPosition(onlineX, 62 / 2 - 10);
            node.addChild(online);
            var name = new igslabel_1.IGSLabel("", 20, "#906D3C", "start", "middle");
            name.setPosition(nameX, 0);
            node.addChild(name);
            var invite = new igssprite_1.IGSSprite("odc/res/game/btn_yaoqing_huang.png");
            invite.setSize(80, 40);
            invite.setPosition(inviteX, 0);
            node.addChild(invite);
            var line = new igssprite_1.IGSSprite("odc/res/game/fengexian.png");
            line.setSize(289, 2);
            line.setPosition(0, TopList.itemHeight / 2);
            node.addChild(line);
        }
        else if (worldTopInfos[0].extInMain['style'] === "lobby") {
            var headX = -halfWidth + 15 + 62 / 2;
            var nameX = headX + 62 / 2 + 10;
            var inviteX = halfWidth - 80 / 2 - 15;
            var onlineX = headX + 62 / 2 - 42 / 2;
            var head = new igssprite_1.IGSSprite("");
            head.setSize(62, 62);
            head.setPosition(headX, 0);
            node.addChild(head);
            var headMask = new igssprite_1.IGSSprite("odc/res/game/avatar_mask.png");
            headMask.setSize(62, 62);
            headMask.setPosition(headX, 0);
            node.addChild(headMask);
            var online = new igssprite_1.IGSSprite("odc/res/game/zaixianbiaoqian.png");
            online.setSize(42, 20);
            online.setPosition(onlineX, 62 / 2 - 10);
            node.addChild(online);
            var name = new igslabel_1.IGSLabel("", 20, "#906D3C", "start", "middle");
            name.setPosition(nameX, 0);
            node.addChild(name);
            var invite = new igssprite_1.IGSSprite("odc/res/game/btn_yaoqing_huang.png");
            invite.setSize(80, 40);
            invite.setPosition(inviteX, 0);
            node.addChild(invite);
            var line = new igssprite_1.IGSSprite("odc/res/game/fengexian.png");
            line.setSize(289, 2);
            line.setPosition(0, TopList.itemHeight / 2);
            node.addChild(line);
        }
        return node;
    };
    ;
    TopList.prototype.configRankItemNode = function (worldTopInfos, i, reusableNode) {
        var head = reusableNode.children[0];
        var headMask = reusableNode.children[1];
        var online = reusableNode.children[2];
        var name = reusableNode.children[3];
        var invite = reusableNode.children[4];
        var bg = reusableNode.children[5];
        if (invite) {
            invite.onClick = function () {
                var data = worldTopInfos[i];
                var shareObj = {
                    openId: data.openid
                };
                if (data.extInMain && data.extInMain.share && data.extInMain.share.shareContent) {
                    shareObj['title'] = data.extInMain.share.shareContent;
                }
                if (data.extInMain && data.extInMain.share && data.extInMain.share.sharePicUrl) {
                    shareObj['imageUrl'] = data.extInMain.share.sharePicUrl;
                }
                console.log("share to:", shareObj.openId);
                wx.shareMessageToFriend(shareObj);
            };
        }
        if (i < worldTopInfos.length) {
            var data = worldTopInfos[i];
            if (data.avatar == "") {
                data.avatar = "odc/res/game/morentouxiang.png";
            }
            head.setSrc(data.avatar);
            name.setText(getFixString(data.nickname, 4));
            online.setVisible(data.isOnline());
        }
    };
    ;
    TopList.itemHeight = 80;
    return TopList;
}());
exports.default = new TopList();
