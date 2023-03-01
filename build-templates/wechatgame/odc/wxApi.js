"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WXApi = void 0;
var WXApi = (function () {
    function WXApi() {
    }
    WXApi.getFriendCloudStorage = function (data) {
        return new Promise(function (resolve) {
            wx.getFriendCloudStorage({
                keyList: data.keyList,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail() {
                    resolve(null);
                }
            });
        });
    };
    ;
    WXApi.getUserCloudStorage = function (data) {
        return new Promise(function (resolve) {
            wx.getUserCloudStorage({
                keyList: data.keyList,
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail() {
                    resolve(null);
                }
            });
        });
    };
    ;
    WXApi.setUserCloudStorage = function (data) {
        return new Promise(function (resolve) {
            wx.setUserCloudStorage({
                KVDataList: data,
                success: function success() {
                    resolve(true);
                },
                fail: function fail() {
                    resolve(false);
                }
            });
        });
    };
    ;
    WXApi.getUsersInfo = function (openIDs) {
        return new Promise(function (resolve) {
            wx.getUserInfo({
                openIdList: openIDs,
                lang: "zh_CN",
                success: function success(res) {
                    resolve(res);
                },
                fail: function fail() {
                    resolve(null);
                }
            });
        });
    };
    ;
    WXApi.onMessage = function (fn) {
        wx.onMessage(fn);
    };
    ;
    return WXApi;
}());
exports.WXApi = WXApi;
