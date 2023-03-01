/*
 * @Author: your name
 * @Date: 2020-03-31 16:39:41
 * @LastEditTime: 2020-04-07 15:29:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ddz\packages\fix_engine\main.js
 */
'use strict';
var path = require("fire-path");
var fs = require("fs");

let isMac = false;

function getResourcePath( creatorPath ){
    if (isMac) {
        return `${creatorPath}/Resources`;
    } else {
        return `${creatorPath}/resources`;
    }
}

function _delDir(e) {
    let t = function (e) {
            let i = fs.readdirSync(e);
            for (let s in i) {
                let r = path.join(e, i[s]);
                fs.statSync(r).isDirectory() ? t(r) : fs.unlinkSync(r)
            }
        },
        i = function (t) {
            let s = fs.readdirSync(t);
            if (s.length > 0) {
                for (let e in s) {
                    let r = path.join(t, s[e]);
                    i(r)
                }
                t !== e && fs.rmdirSync(t)
            } else t !== e && fs.rmdirSync(t)
        };
    t(e), i(e)
}

function CopyDirectory(src, dest) {
    if (fs.existsSync(dest) == false) {
        fs.mkdirSync(dest);
    }
    if (fs.existsSync(src) == false) {
        return false;
    }
    // 拷贝新的内容进去
    var dirs = fs.readdirSync(src);
    dirs.forEach(function (item) {
        var item_path = path.join(src, item);
        var temp = fs.statSync(item_path);
        if (temp.isFile()) { // 是文件
            let toPath = path.join(dest, item);
            Editor.log(`copy : ${item_path} to ${toPath} `);
            let readable = fs.createReadStream(item_path); //创建读取流
            let writable = fs.createWriteStream(toPath); //创建写入流
            readable.pipe(writable);
        } else if (temp.isDirectory()) { // 是目录
            CopyDirectory(item_path, path.join(dest, item));
        }
    });
}

function fixEngine(creatorPath) {
    let resourcesPath = getResourcePath(creatorPath);
    resourcesPath = path.normalize(resourcesPath);
    let bin = path.normalize(`${resourcesPath}/engine/bin`);
    if (fs.existsSync(bin) == false) {
        fs.mkdirSync(bin);
    }

    //读取配置文件
    let config = fs.readFileSync(`${Editor.argv.path}/packages/engine/config.json`, "utf-8");

    config = JSON.parse(config);
    let keys = Object.keys(config);
    // Editor.log(keys);
	
	for (let i = 0; i < keys.length; i++) {
        let info = config[keys[i]];
        let sourcePath = `${Editor.argv.path}/packages/engine/${info.path}`;
        sourcePath = path.normalize(sourcePath);
        let engineSourcePath = `${resourcesPath}/${info.path}`;
        engineSourcePath = path.normalize(engineSourcePath);
        Editor.log(engineSourcePath);
        if (!fs.existsSync(sourcePath)) {
            Editor.error(`不存在 : ${sourcePath}`);
            break
        }
		CopyDirectory(sourcePath, engineSourcePath)
    }
}

/**@description 获取CocosCreator安装目录 */
function getCocosCreatorPath(){
    //window : D:\CocosCreator\2.1.2\CocosCreator.exe --path
    //mac : Applications/CocosCreator.app/Contents/MacOS/CocosCreator --path
    let editorPath = Editor.argv[`$0`];
    editorPath = editorPath.substr(0, editorPath.length - 7);
    let pos = editorPath.indexOf("MacOS");
    let isMac = false;
    if (pos != -1) {
        isMac = true;
        editorPath = editorPath.substr(0, pos - 1);
    } else {
        editorPath = editorPath.substr(0, editorPath.indexOf("CocosCreator.exe") - 1);
    }
    Editor.log("Creator 安装目录 : " + editorPath);
    Editor.log("当前平台 : " + (isMac ? "Mac" : "Windows"));
    return editorPath;
}

function checkFixEngineVersion(options){
    let nowVersionPath = `${options.project}/packages/engine/version.json`;
    nowVersionPath = path.normalize(nowVersionPath);
    let nowVersion = fs.readFileSync(nowVersionPath, "utf-8");
    nowVersion = JSON.parse(nowVersion);
    let resourcesPath = getResourcePath(getCocosCreatorPath());
    let oldVersionPath = `${resourcesPath}/version.json`;
    if (!fs.existsSync(oldVersionPath)){
        //Editor.error(`引擎修正插件必须执行一次!!`);
        throw new Error("引擎修正插件必须执行一次!!");
        return;
    }
    oldVersionPath = path.normalize(oldVersionPath);
    let oldVersion = fs.readFileSync(oldVersionPath,"utf-8");
    oldVersion = JSON.parse(oldVersion);
    if( nowVersion.version != oldVersion.version ){
        //Editor.error(`引擎修正插件有更新，必须执行一次!!`);
        throw new Error(`引擎修正插件有更新，必须执行一次!!`);
    }
}

function onBuildStart( options , callback){
    //执行构建时测试当前是否已经做过引用修正，检测引擎修正的版本是否最新
    // checkFixEngineVersion(options);
    callback();
}

function onBuildFinish( options , callback){
    callback();
}

module.exports = {
    load() {
        // Editor.Builder.on('build-start', onBuildStart);
        // Editor.Builder.on('build-finished', onBuildFinish);
    },

    unload() {
        // Editor.Builder.removeListener('build-start', onBuildStart);
        // Editor.Builder.removeListener('build-finished', onBuildFinish);
    },

    // register your ipc messages here
    messages: {
        'fix_engine'() {
            // 读取配置
            let creatorVersion = Editor.versions.CocosCreator;
            if (creatorVersion == "2.4.3" || creatorVersion == "2.4.4" || creatorVersion == "2.4.5") {
                Editor.log("Creator 版本 : " + Editor.versions.CocosCreator);
                Editor.log("Creator cocos2d 版本 : " + Editor.versions.cocos2d);
            }else{
                Editor.error(`该插件只能使用在 2.4.3 版本的Creator`);
                return;
            }
            fixEngine(getCocosCreatorPath());
        }
    },
};
