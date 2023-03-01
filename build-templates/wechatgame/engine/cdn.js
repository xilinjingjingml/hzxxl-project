var cdnMap = new Map();
var cdnList = [ "https://filetest.008.net", "https://gamefile.weipinggame.com.cn" ];
var usingCDN = cdnList[0];
var setCDN = function setCDN(remoteUrl) {
    let relativeUrl = remoteUrl
    let flag = false
    for (let i of cdnList) {
        if (relativeUrl.indexOf(i) !== -1) {
            flag = true
        }
        relativeUrl = relativeUrl.replace(i, "")
    }
    var tryTimes = cdnMap.get(relativeUrl) || 0;
    if (flag) {
        remoteUrl = cdnList[tryTimes % cdnList.length] + relativeUrl
    }
    return [remoteUrl, relativeUrl];
};

var ccDownLoadFile = window.fsUtils.downloadFile;
var maxRetryCount = cc.assetManager.downloader.maxRetryCount;
cc.assetManager.downloader.retryInterval = 500
window.fsUtils.downloadFile = function(remoteUrl, filePath, header, onProgress, onComplete) {
    let urls = setCDN(remoteUrl);
    remoteUrl = urls[0]
    var oldComplete = onComplete;
    onComplete = function onComplete(err, filePath) {
        if (err) {
            console.log(err.toString())
            console.error(remoteUrl)
            wx.igsEvent.report("下载文件出错", [err.toString(), remoteUrl])
            var ft = cdnMap.get(urls[1]) || 0;
            cdnMap.set(urls[1], ++ft);
        } else {
            if (cdnMap.get(urls[1])) {
                wx.igsEvent.report("下载文件成功", ["", remoteUrl])
            }
            cdnMap.delete(urls[1]);
        }
        oldComplete(err, filePath);
    };
    ccDownLoadFile(remoteUrl, filePath, header, onProgress, onComplete);
};