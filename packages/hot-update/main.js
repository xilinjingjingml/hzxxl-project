'use strict';

var Fs = require("fire-fs");
var Path = require("fire-path");
var fs = require("fs")
var helper = require("./help")

var inject_script = `
(function () {
    if (typeof window.jsb === 'object') {
        var hotUpdateSearchPaths = localStorage.getItem('HotUpdateSearchPaths');
        if (hotUpdateSearchPaths) {
            var paths = JSON.parse(hotUpdateSearchPaths);
            jsb.fileUtils.setSearchPaths(paths);

            var fileList = [];
            var storagePath = paths[0] || '';
            var tempPath = storagePath + '_temp/';
            var baseOffset = tempPath.length;

            if (jsb.fileUtils.isDirectoryExist(tempPath) && !jsb.fileUtils.isFileExist(tempPath + 'project.manifest.temp')) {
                jsb.fileUtils.listFilesRecursively(tempPath, fileList);
                fileList.forEach(srcPath => {
                    var relativePath = srcPath.substr(baseOffset);
                    var dstPath = storagePath + relativePath;

                    if (srcPath[srcPath.length] == '/') {
                        cc.fileUtils.createDirectory(dstPath)
                    }
                    else {
                        if (cc.fileUtils.isFileExist(dstPath)) {
                            cc.fileUtils.removeFile(dstPath)
                        }
                        cc.fileUtils.renameFile(srcPath, dstPath);
                    }
                })
                cc.fileUtils.removeDirectory(tempPath);
            }
        }
    }
})();
`;

let myBundles = []
function onBeforeBuildFinish(options, callback) {
	myBundles.length = 0
	let bundles = options.bundles
	for (let b of bundles) {
		if (b.name === "internal") {
			continue
		}
		let versionFileUrl = `db://assets/${b.name}/bundle.json`
		if (b.root) {
			versionFileUrl = `${b.root}/bundle.json`
		}
		let version = {name: "0.0.0", code: Math.floor(Date.now()/1000)}
		try {
			let nativePath = Editor.assetdb.urlToFspath(versionFileUrl)
			let c = fs.readFileSync(nativePath)
			let str = JSON.parse(c)
			version.name = str.versionName
			// version.code = str.versionCode
		} catch (e) {

		}
		let str = b.name + "|" + JSON.stringify(version)
		str = str.replaceAll('"', "'")
		myBundles.push(str)
	}

	callback();
}

function copyManifest(dest, cb) {
	Editor.log("===copyManifest==", dest)
	let manifestDir = Path.join(dest, "manifest")
	Editor.log("mainfiestdir", manifestDir)
	let bundles = 0
	function callback() {
		bundles--
		if (bundles === 0) {
			let h = new helper(dest, Editor)
			h.clearZips()
			h.packageZip().then(function(msg){
				Editor.log("==copy over==", msg)
				cb()
			}).catch(function(msg){
				Editor.log("==copy over==", msg)
				cb()
			})
		}
	}
	Fs.readdir(manifestDir, (err, files) => {
		bundles = files.length - 2
		for (let f of files) {
			let newfile = Path.join(manifestDir, f);
			fs.stat(newfile, function (err, stat) {
				if (stat && stat.isDirectory()) {
					Fs.copyFileSync(Path.join(newfile, "project.manifest"), Path.join(dest, "assets", f, "project.manifest"))
					Fs.copyFileSync(Path.join(newfile, "version.manifest"), Path.join(dest, "assets", f, "version.manifest"))
					callback()
				}
			});
		}
	})
}
function onBuildFinish(options, cb) {
	Editor.log(`onBuildFinish`);
	let target = options
	if ("android" !== target.platform && "ios" !== target.platform) {
		cb()
		return
	}
			
	let total = 1
	let curr = 0
	let callback = ()=> {
		curr++
		if (curr === total) {
			copyManifest(target.dest, ()=>{
				Editor.info("Build Success!")
				cb()
			})
		}
	}
	
	var root = Path.normalize(target.dest);
	let cp = require("child_process")
	function deleteall(path) {
		let files = [];
		if(fs.existsSync(path)) {
			files = fs.readdirSync(path);
			files.forEach(function (file, index) {
				let curPath = path + "/" + file;
				if(fs.statSync(curPath).isDirectory()) { // recurse
					deleteall(curPath);
				} else { // delete file
					fs.unlinkSync(curPath);
				}
			});
			fs.rmdirSync(path);
		}
	};

	deleteall(`${root}/manifest`)
	deleteall(`${root}/HotUpdate`)
	Editor.log("rm manifest callback")
	let packageUrl = Editor.url('packages://hot-update/', 'utf8')
	packageUrl = Path.join(packageUrl, "version_generator.js")
	cp.exec(`node ${packageUrl} -v 2.5.6 -s ${root} -d ${root} -b "${myBundles.join("$")}"`, (error, stdout, stderr) => {
		if (error) {
			Editor.log(`执行的错误: ${error}`);
			return;
		}
		Editor.log(`stdout: ${stdout}`);
		callback()
	})
}
module.exports = {
    load: function () {
        // 当 package 被正确加载的时候执行
		Editor.Builder.on('before-change-files', onBeforeBuildFinish);
		Editor.Builder.on('build-finished', onBuildFinish);
    },

    unload: function () {
        // 当 package 被正确卸载的时候执行
		Editor.Builder.removeListener('before-change-files', onBeforeBuildFinish);
		Editor.Builder.removeListener('build-finished', onBuildFinish);
    },

    messages: {
		'editor:build-finished': function (events, target) {
		
        }
    }
};