require('adapter-min.js');

__globalAdapter.init();
let t1 = Date.now()
var gameStartLogic = function gameStartLogic() {
	
	__globalAdapter.adaptEngine();
	
	// wx.igsEvent.report("闪屏-ccRequire开始", void 0, Date.now()-t1)
	t1 = Date.now()
	require('./ccRequire');

	// wx.igsEvent.report("闪屏-settings开始", void 0, Date.now()-t1)
	t1 = Date.now()
	require('./src/settings');

	// wx.igsEvent.report("闪屏-main开始", void 0, Date.now()-t1)
	t1 = Date.now()
	require('./main');

	cc.view._maxPixelRatio = 4;

	if (cc.sys.platform === cc.sys.WECHAT_GAME_SUB) {
		var SUBDOMAIN_DATA = require('src/subdomain.json.js');

		cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
			cc.Pipeline.Downloader.PackDownloader._doPreload("SUBDOMAIN_DATA", SUBDOMAIN_DATA);
		});
	} else {
		// wx.igsEvent.report("闪屏-EVENT_ENGINE_INITED开始", void 0, Date.now()-t1)
		t1 = Date.now()
		cc.game.once(cc.game.EVENT_ENGINE_INITED, function() {
			var oldHandleLoadedTexture = cc.Texture2D.prototype.handleLoadedTexture;

			var optimizedHandleLoadedTexture = function optimizedHandleLoadedTexture(premultiplied) {
				oldHandleLoadedTexture.call(this, premultiplied);
				this._image.scr = '';
			};

			cc.Texture2D.prototype.handleLoadedTexture = optimizedHandleLoadedTexture;
		});
		cc.macro.CLEANUP_IMAGE_CACHE = true;
	}

	window.boot();
};

try {
	t1 = Date.now()
	// wx.igsEvent.report("闪屏-加载cocoslib开始")
	requirePlugin('cocos');
	require("./cdn")
	// wx.igsEvent.report("闪屏-加载cocoslib完成", void 0, Date.now() - t1)
	t1 = Date.now()
	gameStartLogic();
} catch (error) {
	wx.igsEvent.report("闪屏-1.1.1引擎加载失败", [error.toString()])
	console.log("==engine game.js error==", error)
}