"use strict";
var openid = wx.getStorageSync("iGaoShouData5")
if (!wx.canIUse) {
	function compareVersion(v1, v2) {
		v1 = v1.split('.')
		v2 = v2.split('.')
		const len = Math.max(v1.length, v2.length)

		while (v1.length < len) {
			v1.push('0')
		}
		while (v2.length < len) {
			v2.push('0')
		}

		for (let i = 0; i < len; i++) {
			const num1 = parseInt(v1[i])
			const num2 = parseInt(v2[i])

			if (num1 > num2) {
				return 1
			} else if (num1 < num2) {
				return -1
			}
		}

		return 0
	}
	let apiVersion = {
		"reportPerformance": "2.9.2"
	}
	wx.canIUse = function (funcName) {
		if (openid) {
			return false
		}
		const sdkVersion = wx.getSystemInfoSync().SDKVersion
		let version = apiVersion[funcName]
		if (!version) {
			throw new Error("unknown api:" + funcName)
		}
		if (compareVersion(sdkVersion, version) >= 0) {
			return true
		}
		return false
	}
}
require("./report.js")
GameGlobal.igsgame = wx
// 初始化开始
wx.igsEvent.report("闪屏-1.1引擎加载")

var systemInfo = wx.getSystemInfoSync();

var FIRSTRENDER = true;

var bgWidth = 960;

var bgHeight = 443;

var bgPath = "assets/main/native/d7/d7518438-d2e9-47c9-8e3b-27cae3aeb392.c0c72.jpg";

var canvas = GameGlobal.screencanvas = GameGlobal.screencanvas || wx.createCanvas();

canvas.width = systemInfo.screenWidth;

canvas.height = systemInfo.screenHeight;

var rate = systemInfo.screenHeight * systemInfo.pixelRatio / bgHeight;
if (systemInfo.screenWidth / systemInfo.screenHeight > bgWidth / bgHeight) {
	rate = systemInfo.screenWidth * systemInfo.pixelRatio / bgWidth;
}
var ratioH = bgHeight / (systemInfo.screenHeight * systemInfo.pixelRatio) * rate;

var ratioW = bgWidth / (systemInfo.screenWidth * systemInfo.pixelRatio) * rate;

var gl = canvas.getContext("webgl", {
	stencil: true,
	antialias: true,
	alpha: false,
	preserveDrawingBuffer: false,
	depth: true
});

var VERTICES = new Float32Array([-ratioW, ratioH, 0, 1, -ratioW, -ratioH, 0, 0, ratioW, ratioH, 1, 1, ratioW, -ratioH, 1, 0]);

const firstScreen = require('./first-screen.js')
var drawImg = firstScreen.drawImg
var launch = function launch() {
	if (FIRSTRENDER) {
		FIRSTRENDER = false
		drawImg(bgPath, gl, VERTICES);
		// wx.igsEvent.report("闪屏-1.2闪屏结束")
		require("./engine/game.js")
	} else {

	}
};
// wx.igsEvent.report("闪屏-1.2闪屏开始")
requestAnimationFrame(launch);