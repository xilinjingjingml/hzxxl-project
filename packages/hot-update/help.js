/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2021-09-09 14:30:07
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-12-16 11:53:54
 */
// Object.defineProperty(exports, "__esModule", { value: true });

let path = require("path")
let fs = require("fs")
let JSZip = require("jszip")

var helper = function(buildDir, editor) {
    this.buildRoot = buildDir
    this.assetsDir = path.join(buildDir, "assets")
    this.Editor = editor
}
helper.prototype.packageDir = function(dir, jszip) {
    if (!fs.existsSync(dir)) {
        return;
    }
    let readDirs = fs.readdirSync(dir);
    for (let i = 0; i<readDirs.length;i++) {
        let file = readDirs[i];
        let fullPath = path.join(dir, file);
        let stat = fs.statSync(fullPath);
        if (stat.isFile()) {
            jszip.file(file, fs.readFileSync(fullPath))
        } else {
            stat.isDirectory() && this.packageDir(fullPath, jszip.folder(file));
        }
    }
}
helper.prototype.mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
}
helper.prototype.clearZips = function() {
    this.Editor.log("==clearZips==", this.assetsDir)
    let dir = path.join(this.buildRoot, "HotUpdate")
    if (!dir || !fs.existsSync(dir)) return;

    let removeDir = function(dir) {
        // 读取目录中文件夹
        const files = fs.readdirSync(dir);
        files.forEach((file) => {
            const filePath = path.resolve(dir, file);
            const stat = fs.lstatSync(filePath);
            // 如果是directory, 就递归
            if (stat.isDirectory()) {
                // removeDir(filePath);
                fs.rmdirSync(filePath, { recursive: true, force: true });
                return;
            }
            // 如果是文件 就删除
            if (stat.isFile()) {
                fs.unlinkSync(filePath);
            }
        });
    }
    removeDir(dir);

    // 删除空目录
    // fs.rmdirSync(dir, { recursive: true, force: true });
};
helper.prototype.packageZip = function() {
    let thiz = this
    return new Promise(function(rlv, rej){
        thiz.Editor.log("==packageZip==", thiz.assetsDir)
        let dir = thiz.assetsDir;
        let readDirs = fs.readdirSync(thiz.assetsDir)
        let zipRoot = path.join(thiz.buildRoot, "HotUpdate")
        thiz.mkdirSync(zipRoot)
        let self = thiz
        let totalL = readDirs.length
        let cur = 0
        let succ = function() {
            cur++
            if (cur >= totalL) {
                rlv("打包结束")
            }
        }
        for (let i = 0; i < readDirs.length;i++) {
            let file = readDirs[i];
            let fullPath = path.join(dir, file);
            let stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                let jszip = new JSZip();
                let versionFile = path.join(fullPath, "version.manifest")
                try {
                    fs.accessSync(versionFile, fs.constants.R_OK)
                    let versionStr = fs.readFileSync(versionFile)
                    let versionJson = JSON.parse(versionStr)
                    thiz.packageDir(fullPath, jszip);
                    let zipName = `${file}_${versionJson['versionName']}_${versionJson['version']}.zip`
                    let zipPath = path.join(zipRoot, zipName)
                    jszip.generateNodeStream({
                        type: "nodebuffer",
                        streamFiles: !0
                    }).pipe(fs.createWriteStream(zipPath)).on("finish", function () {
                        self.Editor.log("打包成功: " + zipPath);
                        succ()
                    }).on("error", function (e) {
                        self.Editor.log("打包失败:" + e.message);
                        succ()
                    });
                } catch (e) {
                    succ()
                }
            }
        }
    })
}

module.exports = helper