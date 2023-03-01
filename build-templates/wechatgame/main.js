"use strict";

let t1 = Date.now()
window.boot = function() {
	t1 = Date.now()

	var settings = window._CCSettings;
	window._CCSettings = undefined;
	var launchScene = settings.launchScene; // load scene
	
	var onStart = function onStart() {
		cc.view.enableRetina(true);
		cc.view.resizeWithBrowserSize(true);

		let p1 = Date.now()
        cc.assetManager.main.preloadScene(launchScene)
        // require("../subpackages/script_main/game.js")

        if (wx.canIUse('reportPerformance')) {
            wx.reportPerformance(1008, Date.now() - p1)
        }
        // cc.game.setFrameRate(30)
		// wx.igsEvent.report("闪屏-config.json加载开始", void 0, Date.now() - t1)
		t1 = Date.now()
        cc.game.emit("EVENT_BEFORE_LOAD_LAUNCHSCENE", function() {
            // wx.igsEvent.report("闪屏-1.4loading界面资源加载", void 0, Date.now() - t1)
			t1 = Date.now()

            let p2 = Date.now()
            cc.assetManager.main.loadScene(launchScene, (err, scene)=>{
                if (!err) {
                    if (wx.canIUse('reportPerformance')) {
                        wx.reportPerformance(2005, Date.now() - p2)
                    }
                    console.log('Success to load scene: ' + launchScene);
                    // 加载启动场景结束
                    // wx.igsEvent.report("闪屏-1.4.1loading界面资源加载结束", void 0, Date.now() - t1)
					t1 = Date.now()
                    cc.director.runScene(scene, null, ()=>{
						wx.igsEvent.report("闪屏-场景启动完成", void 0, Date.now() - t1)
						t1 = Date.now()
					})
                } else {
                    if (wx.canIUse('reportPerformance')) {
                        wx.reportPerformance(2010, Date.now() - p2)
                    }
                    // 加载启动场景结束
                    wx.igsEvent.report("闪屏-1.4.2loading界面资源加载失败", void 0, Date.now() - t1)
                }
            })
        })
		
	}

	var option = {
		id: 'GameCanvas',
		debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
		showFPS: !isSubContext && settings.debug,
		frameRate: 60,
		groupList: settings.groupList,
		collisionMatrix: settings.collisionMatrix
	};

	var isSubContext = cc.sys.platform === cc.sys.WECHAT_GAME_SUB;
	cc.assetManager.init({
		bundleVers: settings.bundleVers,
		subpackages: settings.subpackages,
		remoteBundles: settings.remoteBundles,
		server: settings.server,
		subContextRoot: settings.subContextRoot
	});
	var RESOURCES = cc.AssetManager.BuiltinBundleName.RESOURCES;
	var INTERNAL = cc.AssetManager.BuiltinBundleName.INTERNAL;
	var MAIN = cc.AssetManager.BuiltinBundleName.MAIN;
	var START_SCENE = cc.AssetManager.BuiltinBundleName.START_SCENE;
	var bundleRoot = [INTERNAL];
	settings.hasResourcesBundle && bundleRoot.push(RESOURCES);
	settings.hasStartSceneBundle && bundleRoot.push(MAIN);
	var count = 0;

	function cb(err) {
		if (err) return console.error(err.message, err.stack);
		count++;
		// wx.igsEvent.report("闪屏-加载脚本"+count+"完成", void 0, Date.now() - t1)
		if (count === bundleRoot.length + 1) {
			// if there is start-scene bundle. should load start-scene bundle in the last stage
			// Otherwise the main bundle should be the last
			t1 = Date.now()
			// wx.igsEvent.report("闪屏-加载启动包开始")
			cc.assetManager.loadBundle(settings.hasStartSceneBundle ? START_SCENE : MAIN, function (err) {
				if (!err) {
					// 加载脚本和启动包完成
					// wx.igsEvent.report("闪屏-1.3.1加载脚本和启动包完成", void 0, Date.now() - t1)
					t1 = Date.now()
					// cc.director.preloadScene(launchScene)
					cc.game.run(option, onStart);
				} else {
					// 加载启动包失败
					wx.igsEvent.report("闪屏-1.3.2加载启动包失败", void 0, Date.now() - t1)
					console.error("加载启动包失败")
				}
			});
		}
	} // load plugins

	// 加载脚本和启动包开始
	// wx.igsEvent.report("闪屏-1.3加载脚本和启动包", void 0, Date.now() - t1)
	t1 = Date.now()
	cc.assetManager.loadScript(settings.jsList.map(function(x) {
		return 'src/' + x;
	}), cb); // load bundles
	
	for (var i = 0; i < bundleRoot.length; i++) {
		cc.assetManager.loadBundle(bundleRoot[i], cb);
	}
};