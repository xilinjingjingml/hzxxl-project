/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2021-10-18 14:42:13
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-26 10:42:47
 */
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { igs } from "../igs";
let izx = igs.izx
const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingEx extends cc.Component implements igs.listener.IBundleBatchUpdateListener {
    onOneLoadSuccess(uds: igs.hotUpdate.UpdateData): void {
        igs.log("==onOneLoadSuccess==", uds.bundleName)
        if (uds.bundleName === "lobbyMain") {
            igs.platform.trackEvent(igs.platform.TrackNames.IGS_PRELOAD_BUNDLES_SUCCESS_igaoshou)
        }
        if (uds.bundleName !== "lobbyMain" && uds.bundleName !== "main" && uds.bundleName !== "resources") {
            igs.platform.trackEvent(igs.platform.TrackNames.IGS_PRELOAD_BUNDLES_SUCCESS_game)
        }
    }
    onOneLoadFailed(uds: igs.hotUpdate.UpdateData): void {
        igs.log("==onOneLoadFailed==", uds.bundleName)
    }
    onCheckRemoteUpdateFailed(bundles: igs.bundle.BundleConfig[]): void {
        igs.log("==onCheckRemoteUpdateFailed==", bundles.length)
    }
    onOneDownloadInfoFailed(ud: igs.hotUpdate.UpdateData): void {
        igs.log("==onOneDownloadInfoFailed==", ud.bundleName)
    }
    onOneDownloadInfoSuccess(ud: igs.hotUpdate.UpdateData): void {
        igs.log("==onOneDownloadInfoSuccess==", ud.bundleName, ud.totalToDownloadBytesCount)
    }
    onOneDownloadSuccess(ud: igs.hotUpdate.UpdateData): void {
        igs.log("==onOneDownloadSuccess==", ud.bundleName, ud.totalToDownloadBytesCount, ud.downloadedByteCount)
    }
    onDownloadProgress(data: igs.hotUpdate.UpdateData): void {
        igs.log("==onDownloadProgress==", data.bundleName, data.downloadedByteCount, data.totalToDownloadBytesCount)
        this.downloadedBytes[data.bundleName] = data.downloadedByteCount
        this.updateProgress(data)
    }
    onAllDownloadInfoSuccess(uds: igs.hotUpdate.UpdateData[]): void {
        igs.log("==onAllDownloadInfoSuccess==")
        uds.forEach((ud) => {
            igs.log("detail: ", ud.totalToDownloadBytesCount, ud.bundleName)
            this.totalBytes += ud.totalToDownloadBytesCount
        })
        igs.log("total bytes", this.totalBytes)
    }
    onSomeDownloadInfoFailed(uds: igs.hotUpdate.UpdateData[]): void {
        igs.log("==onSomeDownloadInfoFailed==", uds.length)
    }
    onAllDownloadSuccess(uds: igs.hotUpdate.UpdateData[]): void {
        igs.log("==onAllDownloadSuccess==")
        uds.forEach((ud) => {
            igs.log("detail: ", ud.totalToDownloadBytesCount, ud.downloadedByteCount, ud.bundleName)
        })
        // 清空下载文字
        this.setUpdateProgressText(0, 0)
    }
    onSomeDownloadFailed(uds: igs.hotUpdate.UpdateData[]): void {
        igs.log("==onSomeDownloadFailed==")
    }
    onAllLoadSuccess(uds: igs.hotUpdate.UpdateData[]): void {
        igs.log("==onAllLoadSuccess==", uds.length)
        uds.forEach((ud) => {
            igs.log("detail: ", ud.bundleName)
        })
        this.batchLoadSuccess(uds)
    }
    onSomeLoadFailed(uds: igs.hotUpdate.UpdateData[]): void {
        igs.log("==onSomeLoadFailed==", uds.length)
        let hasigaoshou = false,
            hasgame = false
        for (let i of uds) {
            igs.log("load failed detail", i.ret, i.downloadedByteCount, i.totalToDownloadBytesCount, i.bundleDir, i.bundleName, i.newVersion, i.oldVersion)
            if (i.bundleName === "lobbyMain") {
                hasigaoshou = true
            } else if (i.bundleName !== "resources" && i.bundleName !== "main" && i.bundleName !== "lobbyMain") {
                hasgame = true
            }
        }
        if (hasigaoshou) {
            igs.platform.trackEvent(igs.platform.TrackNames.IGS_PRELOAD_BUNDLES_FAILED_igaoshou)
        }
        if (hasgame) {
            igs.platform.trackEvent(igs.platform.TrackNames.IGS_PRELOAD_BUNDLES_FAILED_game)
        }

        igs.emit("BUNDLE_LOAD_FAILED")
    }
    onLoadProgress(uptData: igs.bundle.BundleLoadProgress): void {
        igs.log("==onLoadProgress==")
    }

    @property(cc.Node)
    progressBar: cc.Node = null;
    @property(cc.Node)
    progressText: cc.Node = null;
    @property(cc.Node)
    progressTipNode: cc.Node = null;
    @property(cc.Node)
    progressTipJieYa: cc.Node = null;
    @property(cc.Node)
    progressTipGengXin: cc.Node = null;
    @property(cc.Node)
    progressTipLbl1: cc.Node = null;
    @property(cc.Node)
    progressTipLbl2: cc.Node = null;

    @property(cc.Node)
    barLight: cc.Node = null;
    @property(cc.Label)
    tips: cc.Label = null;
    @property(cc.Node)
    bcgNode: cc.Node = null;

    _count = 0;
    _mockCount = 0;
    _countDt = 0
    _tips = ""

    private get count(): number {
        return this._count;
    }
    private set count(c: number) {
        this._count = Math.min(c, 1)
        if (c >= 1) {
            this._countDt = 1 / 5
        } else {
            this._countDt = Math.min(Math.max(c - this._mockCount, 0), 1) / 20
        }

        // this.refresh()
    }

    protected onLoad(): void {
        this.progressTipNode.active = false
    }

    protected onDestroy(): void {
        igs.offTarget(this)
    }

    protected start(): void {
        igs.log("loading on load")
        igs.platform.trackEvent(igs.platform.TrackNames.IGS_ENTER_LOADING)
        igs.on(igs.consts.Event.HOTUPDATE_OK, this.confirmUpdate, this)
        if(igs.exports.lobbyConfig.config.match_detail != "[]" || !igs.exports.lobbyConfig.config.onlineParamSyncWait){
            this.doLoad()
        }else{
            igs.on(igs.consts.Event.SKIP_FORCE_UPDATE, () => {
                this.doLoad()
            }, this)
            igs.on("CheckMainUpdate", () => {
                this.doLoad()
            }, this)
        }

        igs.on("session_show", ()=>{
            this.progressTipNode.active = false
            this.progressBar.active = false
        }, this)
        igs.on("session_close", ()=>{
            this.progressBar.active = true
        }, this)        
    }

    confirmUpdate(data: igs.hotUpdate.UpdateData) {
        this.updateProgress(data)
        igs.emit(igs.consts.Event.CONFIRM_UPDATE_BUNDLE)
    }

    allUpdateData: igs.hotUpdate.UpdateData[] = null;
    totalBytes: number = 0
    downloadedBytes: { [key: string]: number } = {}
    updateProgress(data: igs.hotUpdate.UpdateData) {
        console.log("LoadingEx updateProgress data=", data)
        let totalBytes: number = this.totalBytes
        let totalDownloadedBytes: number = 0
        for (let i in this.downloadedBytes) {
            let bytes = this.downloadedBytes[i]
            totalDownloadedBytes += bytes
        }
        let rate = (totalDownloadedBytes || 0) / totalBytes//data.totalToDownloadBytesCount
        this.setProgresBar(rate)
        this.progressText.getComponent(cc.Label).string = ""
        this.progressTipNode.active = true
        this.setUpdateProgressText((totalDownloadedBytes / 1024 / 1024), (totalBytes / 1024 / 1024))
        // this.setUpdateProgressText(`${(totalDownloadedBytes / 1024 / 1024).toFixed(3)} / ${(totalBytes / 1024 / 1024).toFixed(3)}M`)
        console.log("LoadingEx updateProgress end")
    }


    // update (dt) {}

    // update (dt) {}
    bundles: igs.bundle.BundleConfig[] = []
    doLoad() {
        try {
            let mainGameBundle = igs.exports.config['bootConfig']['mainGameBundle']
            // 是否本地缓存了
            let ret = cc.sys.localStorage.getItem("iGaoShouData110")
            if (ret) {
                mainGameBundle = ret
                mainGameBundle = mainGameBundle.replace(/"/g, "")
            }

            igs.log(`mainGameBundle: ${mainGameBundle}`)
            this.bundles.push(new igs.bundle.BundleConfig("iGaoShou", "baseScript", 0, igs.consts.Event.ENTER_IGAOSHOU, false, false),
                new igs.bundle.BundleConfig(mainGameBundle, mainGameBundle, 1, igs.consts.Event.ENTER_GAME, false, false)
                // new igs.bundle.BundleConfig("lobby", "lobby", 1, igs.consts.Event.ENTER_GAME, false, false),
            )
            
            if (CC_JSB) {
                this.bundles.push(new igs.bundle.BundleConfig("lobbyMain", "lobbyMain", 1, igs.consts.Event.ENTER_GAME, false, false),
                    new igs.bundle.BundleConfig("lobbySub", "lobbySub", 1, igs.consts.Event.ENTER_GAME, false, false),
                    new igs.bundle.BundleConfig("lobbyScript", "lobbyScript", 1, igs.consts.Event.ENTER_GAME, false, false))
            }
            igs.platform.trackEvent(igs.platform.TrackNames.IGS_PRELOAD_BUNDLES)
            igs.bundle.updateBundles(this.bundles, this)
        } catch (e) {
            throw new Error("must config mainGameBundle in config.json");
        }
    }

    batchDownloadInfoSuccess(uds: igs.hotUpdate.UpdateData[]) {
        igs.log("==batchDownloadInfoSuccess==", uds.length)
    }
    batchDownloadInfoFailed(uds: igs.hotUpdate.UpdateData[]) {
        igs.log("==batchDownloadInfoFailed==", uds.length)
    }
    batchDownloadSuccess(uds: igs.hotUpdate.UpdateData[]) {
        igs.log("==batchDownloadSuccess==", uds.length)
    }
    batchDownloadFailed(uds: igs.hotUpdate.UpdateData[]) {
        igs.log("==batchDownloadFailed==", uds.length)
    }
    batchLoadSuccess(uds: igs.hotUpdate.UpdateData[]) {
        igs.log("==batchLoadSuccess==", uds.length)

        igs.emit(igs.consts.Event.BUNDLE_LOAD_PROGRESS, {
            progress: 1,
            tip: "正在加载资源，此过程不消耗流量"
        })

        igs.izx.AudioMgr.playMusic("bgm_game")
        cc.resources.load("bgm_game", cc.AudioClip, (err, res: cc.AudioClip) => {
            if (!err) {
                igs.log("set bgm")
                iGaoShouApi.SetBackgroundMusic(res)
            }
        })

        iGaoShouApi.GetMusicVolume() > 0 ? cc.audioEngine.setMusicVolume(iGaoShouApi.GetMusicVolume()) : cc.audioEngine.setMusicVolume(0);
        iGaoShouApi.GetEffectVolume() > 0 ? cc.audioEngine.setEffectsVolume(iGaoShouApi.GetEffectVolume()) : cc.audioEngine.setEffectsVolume(0);

        let bundle = cc.assetManager.getBundle("hzxl_subpackage")
        if (bundle) {
            bundle.preload("images/maJiang/mj", cc.SpriteAtlas)
            bundle.preloadScene("Main")
        }

        // cc.assetManager.loadBundle("hzxl", (err, bundle) => {
        //     if (bundle) {
        //         bundle.loadDir("/", (err, res) => {
        //             console.log("load hzxl/ ready")
        //         })
        //     }
        // })

        // igs.bundle.bootBundle(this.bundles.find((bundleConfig) => {
        //     return bundleConfig.bundle === "lobbyMain"
        // }), {})
        iGaoShouApi.LaunchPlatform()
    }
    batchLoadFailed(uds: igs.hotUpdate.UpdateData[]) {
        igs.log("==batchLoadFailed==", uds.length)
    }

    setProgresBar(e) {
        this.progressBar.getComponent(cc.ProgressBar).progress = e;
        this.barLight.x = this.progressBar.width*e - 40
    };

    setUpdateProgressText(downloadedBytes :number,totalBytes: number) {
        if(this.progressTipNode.active){
            if(totalBytes == 0 ){
                this.progressTipJieYa.active = true
                this.progressTipGengXin.active = false
                this.progressTipLbl1.active = false
                this.progressTipLbl2.active = false
            }else{
                this.progressTipJieYa.active = false
                this.progressTipGengXin.active = true
                this.progressTipLbl1.active = true
                this.progressTipLbl2.active = true
                this.progressTipLbl1.getComponent(cc.Label).string = ((downloadedBytes/totalBytes)*100).toFixed(2) + "%"
                this.progressTipLbl2.getComponent(cc.Label).string = "("+downloadedBytes.toFixed(3)+"M/"+totalBytes.toFixed(3)+"M)"
            }
        }
    };
}
