var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var dest = '';
var src = '';
let myBundles = []
let remoteUrl = ""
let mainVersion = "1.0.0"

let replaceAll = function (find, replace, str) {
    var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(find, 'g'), replace);
}

// Parse arguments
var i = 2;
while ( i < process.argv.length) {
    var arg = process.argv[i];

    switch (arg) {
    case '--url' :
    case '-u' :
        remoteUrl = process.argv[i+1];
        i += 2;
        break;
    case '--version' :
    case '-v' :
        mainVersion = process.argv[i+1];
        i += 2;
        break;
    case '--src' :
    case '-s' :
        src = process.argv[i+1];
        i += 2;
        break;
    case '--dest' :
    case '-d' :
        dest = process.argv[i+1];
        i += 2;
        break;
    case '-b' :
        let bundles = process.argv[i+1];
        bundles = replaceAll("'", '"', bundles)
        myBundles = bundles.split("$")
        i += 2;
        break;
    default :
        i++;
        break;
    }
}

function readDir (dir, obj, rootDir = src) {
    var stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir), subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            readDir(subpath, obj, rootDir);
        }
        else if (stat.isFile()) {
            // Size in Bytes
            size = stat['size'];
            md5 = crypto.createHash('md5').update(fs.readFileSync(subpath)).digest('hex');
            compressed = path.extname(subpath).toLowerCase() === '.zip';

            relative = path.relative(rootDir, subpath);
            relative = relative.replace(/\\/g, '/');
            relative = encodeURI(relative);
            obj[relative] = {
                'size' : size,
                'md5' : md5
            };
            if (compressed) {
                obj[relative].compressed = true;
            }
        }
    }
}

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

function first() {
    mkdirSync(dest);
    mkdirSync(path.join(dest, "manifest"))

    // dummy
    buildDummy()
}

function buildDummy() {
    var manifest = {
        packageUrl: "",
        remoteManifestUrl: 'project.manifest',
        remoteVersionUrl: 'version.manifest',
        version: "0.0.0",
        assets: {},
        searchPaths: []
    };

    var destManifest = path.join(dest, "manifest", 'project.manifest');
    var destVersion = path.join(dest, "manifest", 'version.manifest');

    let dst = dest
    if (!path.isAbsolute(dst)) {
        dst = path.resolve(dst)
    }
    // mkdirSync(path.join(dst, "manifest"));

    fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Manifest successfully generated');
    });

    delete manifest.assets;
    delete manifest.searchPaths;
    fs.writeFile(destVersion, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Version successfully generated');
    });
}

// Iterate assets and src folder
function buildMainAndInternal() {
    var manifest = {
        packageUrl: "main_" + mainVersion + "/",
        remoteManifestUrl: 'project.manifest',
        remoteVersionUrl: 'version.manifest',
        version: "" + mainVersion,
        assets: {},
        searchPaths: []
    };

    readDir(path.join(src, 'src'), manifest.assets);
    // readDir(path.join(src, 'assets', 'internal'), manifest.assets);
    // readDir(path.join(src, 'assets', 'main'), manifest.assets);
    // readDir(path.join(src, 'assets'), manifest.assets);

    var destManifest = path.join(dest, "manifest", "src", 'project.manifest');
    var destVersion = path.join(dest, "manifest", "src", 'version.manifest');

    let dst = dest
    if (!path.isAbsolute(dst)) {
        dst = path.resolve(dst)
    }
    mkdirSync(path.join(dst, "manifest", "src"));

    fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Manifest successfully generated');
    });

    delete manifest.assets;
    delete manifest.searchPaths;
    fs.writeFile(destVersion, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Version successfully generated');
    });
}
function buildBundle(bundleName, version) {
    console.log("==buildBundle==", bundleName, version)
    let ver = JSON.parse(version)
    var manifest = {
        packageUrl: bundleName,
        remoteManifestUrl: 'project.manifest',
        remoteVersionUrl: 'version.manifest',
        version: ver.code + "",
        versionName: ver.name,
        assets: {},
        searchPaths: []
    };
    let Src = src
    if (!path.isAbsolute(Src)) {
        Src = path.resolve(Src)
    }
    let dst = dest
    if (!path.isAbsolute(dst)) {
        dst = path.resolve(dst)
    }

    console.log("===bundle===", bundleName)
    console.log("===src===", Src)
    console.log("===dest===", dst)
    let rootDir = path.join(Src, "assets", bundleName)
    readDir(rootDir, manifest.assets, rootDir);
    var destManifest = path.join(dst, "manifest", bundleName, 'project.manifest');
    var destVersion = path.join(dst, "manifest", bundleName, 'version.manifest');

    mkdirSync(path.join(dst, "manifest", bundleName));

    fs.writeFile(destManifest, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Manifest successfully generated');
    });

    delete manifest.assets;
    delete manifest.searchPaths;
    fs.writeFile(destVersion, JSON.stringify(manifest), (err) => {
        if (err) throw err;
        console.log('Version successfully generated');
    });
}

first()
// buildMainAndInternal()

for (let i of myBundles) {
    console.log("==", i)
    let bv = i.split("|")
    buildBundle(bv[0].trim(), bv[1].trim())
}
