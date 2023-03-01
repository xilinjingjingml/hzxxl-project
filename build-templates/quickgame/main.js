require("./report.js")
let wx = window.igsgame
var openid = wx.getStorageSync("iGaoShouData5")
// 初始化开始
wx.igsEvent.report("闪屏-1.1引擎加载-" + (openid ? "false" : "true"))

window.boot = function () {
    var settings = window._CCSettings;
    window._CCSettings = undefined;

    var onStart = function () {

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        var launchScene = settings.launchScene;

        var launch = function () {
            wx.igsEvent.report("闪屏-1.4loading界面资源加载-" + (openid ? "false" : "true"))
            // load scene
            cc.director.loadScene(launchScene, null,
                function () {
                    console.log('Success to load scene: ' + launchScene);
                    // 加载启动场景结束
                    wx.igsEvent.report("闪屏-1.4.1loading界面资源加载结束-" + (openid ? "false" : "true"))
                }
            );
        }
        if (cc.game.hasEventListener("EVENT_BEFORE_LOAD_LAUNCHSCENE")) {
            cc.game.emit("EVENT_BEFORE_LOAD_LAUNCHSCENE", launch)
        } else {
            launch()
        }
    };

    var option = {
        id: 'GameCanvas',
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    }

    cc.assetManager.init({
        bundleVers: settings.bundleVers,
        subpackages: settings.subpackages,
        remoteBundles: settings.remoteBundles,
        server: settings.server,
        subContextRoot: settings.subContextRoot
    });

    let { RESOURCES, INTERNAL, MAIN, START_SCENE } = cc.AssetManager.BuiltinBundleName;
    let bundleRoot = [INTERNAL];

    settings.hasResourcesBundle && bundleRoot.push(RESOURCES);
    settings.hasStartSceneBundle && bundleRoot.push(MAIN);

    var count = 0;
    function cb(err) {
        if (err) return console.error(err.message, err.stack);
        count++;
        if (count === bundleRoot.length + 1) {
            // if there is start-scene bundle. should load start-scene bundle in the last stage
            // Otherwise the main bundle should be the last
            cc.assetManager.loadBundle(settings.hasStartSceneBundle ? START_SCENE : MAIN, function (err) {
                if (!err) {
                    // 加载脚本和启动包完成
                    wx.igsEvent.report("闪屏-1.3.1加载脚本和启动包完成-" + (openid ? "false" : "true"))
                    cc.game.run(option, onStart);
                } else {
                    // 加载启动包失败
                    wx.igsEvent.report("闪屏-1.3.2加载启动包失败-" + (openid ? "false" : "true"))
                    console.error("加载启动包失败")
                }
            });
        }
    }

    // 加载脚本和启动包开始
    wx.igsEvent.report("闪屏-1.3加载脚本和启动包-" + (openid ? "false" : "true"))
    // load plugins
    cc.assetManager.loadScript(settings.jsList.map(function (x) { return 'src/' + x; }), cb);

    // load bundles
    for (let i = 0; i < bundleRoot.length; i++) {
        cc.assetManager.loadBundle(bundleRoot[i], cb);
    }
};

require('src/settings.js');
require('src/cocos2d-runtime.js');
if (CC_PHYSICS_BUILTIN || CC_PHYSICS_CANNON) {
    require('src/physics.js');
}
require('jsb-adapter/engine/index.js');

cc.macro.CLEANUP_IMAGE_CACHE = true;
window.boot();
