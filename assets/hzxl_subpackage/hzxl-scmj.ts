import ScmjMode from "./mode/scmjMode"
import { scmjUtil } from "./hzxl-Util";

import { igs } from "../igs";
import izx = igs.izx;
import { Constants } from "../lobby/start/script/igsConstants";
import { EventMgr } from "../lobby/start/script/base/EventMgr";
import { Helper } from "../lobby/start/script/system/Helper";
import HzxlLogic from "./hzxl-logic";

const GAME_ID_LIST = [
    "09965902-5d1e-4632-ac38-8d4551dc1142", 
    "09965902-5d1e-4632-ac38-8d4551dc1143"
]

export default class Scmj {
    // class Scmj {
    private static _first = true
    private static _instance: Scmj
    static getInstance(): Scmj {
        if (!Scmj._instance) {
            Scmj._instance = new Scmj()
            Scmj._instance._init()
        }

        return Scmj._instance
    }

    _scmj: ScmjMode = new ScmjMode()

    private _init() {
        console.log("Scmj init")
        // izx.preloadBundle.push(GAME_BUNDLE_NAME)

        EventMgr.on("room_enter_game", this.enterGame, this)
        EventMgr.on("room_exit_game", this.exitGame, this)
        izx.on("PreLoadScmjPic", this.preLoadScmjPic, this)


        EventMgr.on(Constants.EVENT_DEFINE.GAME_START, this.onGameStart, this)
        EventMgr.on(Constants.EVENT_DEFINE.REALTIME_MATCH_CONFIRM_NOT, this.onGameStart, this)
        // this.loadGame()
        // if (!CC_EDITOR){
        //   scmjUtil.preLoadPic()
        // }
        // this._scmj.autoRegHander()
    }

    onGameStart() {
    }

    private enterGame(msg) {
        console.log("Scmj enterGame", msg)
        let inGameList = false
        for(let gameId of GAME_ID_LIST){
            if(gameId == msg.matchInfo.gameId){
                inGameList = true
            }
        }
        if (inGameList) {
            // if (!izx.isInGameScene) {
            this._scmj.unLoad()
            // Scmj.getInstance()._scmj.unLoad()
            // Scmj.getInstance().loadGame()
            // } else {
            //     this._scmj.afterEnterScmj()
            // }
            if (msg.reconnect) {
                this._scmj.reconnect = true
            } else {
                this._scmj.reconnect = false
            }
            // 默认是4人模式
            HzxlLogic.getInstance().maxPlyNum = 4
            if (msg.privateRoomInfo) {
                HzxlLogic.getInstance().bPivateRoom = true
                if (msg.privateRoomInfo.room) {
                    if (msg.privateRoomInfo.room.properties) {
                        let json = JSON.parse(msg.privateRoomInfo.room.properties)
                        HzxlLogic.getInstance().privateRoomInfo = json.gs_properties
                        HzxlLogic.getInstance().privateRoomInfo.cl_params = JSON.parse(json.cl_params)

                        // 广东麻将私人房的人数 2人 3人
                        if (HzxlLogic.getInstance().privateRoomInfo.max_player_num) {
                            HzxlLogic.getInstance().maxPlyNum = HzxlLogic.getInstance().privateRoomInfo.max_player_num
                        }
                    }
                    if (msg.privateRoomInfo.room.metadata) {
                        HzxlLogic.getInstance().privateRoomInfo.share_code = msg.privateRoomInfo.room.metadata.share_code
                    }
                    if (msg.privateRoomInfo.room.create_time) {
                        HzxlLogic.getInstance().privateRoomInfo.create_time = Number(msg.privateRoomInfo.room.create_time)
                    }
                    if (msg.privateRoomInfo.room.match_code) {
                        HzxlLogic.getInstance().privateRoomInfo.match_code = msg.privateRoomInfo.room.match_code
                    }
                }
                if (msg.privateRoomInfo.roomId) {
                    HzxlLogic.getInstance().privateRoomInfo.roomId = msg.privateRoomInfo.roomId
                }
                if (msg.privateRoomInfo.gameGid) {
                    HzxlLogic.getInstance().privateRoomInfo.gameGid = msg.privateRoomInfo.gameGid
                }
                if (msg.privateRoomInfo.serverId) {
                    HzxlLogic.getInstance().privateRoomInfo.serverId = msg.privateRoomInfo.serverId
                }
                HzxlLogic.getInstance().privateRoomInfo.endTime = 0
            } else {
                HzxlLogic.getInstance().bPivateRoom = false
                HzxlLogic.getInstance().privateRoomInfo = null
            }
            if (msg.videoData) {
                HzxlLogic.getInstance().videoData = msg.videoData
                HzxlLogic.getInstance().bPivateRoom = true
                if (msg.videoData.properties) {
                    let json = JSON.parse(msg.videoData.properties)
                    HzxlLogic.getInstance().privateRoomInfo = json.gs_properties
                    HzxlLogic.getInstance().privateRoomInfo.share_code = json.gs_properties.share_code

                    // 广东麻将私人房的人数 2人 3人
                    if (HzxlLogic.getInstance().privateRoomInfo.max_player_num) {
                        HzxlLogic.getInstance().maxPlyNum = HzxlLogic.getInstance().privateRoomInfo.max_player_num
                    }
                }
                if (msg.videoData.start_time) {
                    HzxlLogic.getInstance().privateRoomInfo.create_time = Number(msg.videoData.start_time)
                }
                if (msg.videoData.room_id) {
                    HzxlLogic.getInstance().privateRoomInfo.roomId = msg.videoData.room_id
                }
                if (msg.videoData.finish_time) {
                    HzxlLogic.getInstance().privateRoomInfo.endTime = msg.videoData.finish_time
                }
            } else {
                HzxlLogic.getInstance().videoData = null
            }
            console.log("enterGame privateRoomInfo = ", HzxlLogic.getInstance().privateRoomInfo)
            console.log("enterGame videoData = ", HzxlLogic.getInstance().videoData)
            HzxlLogic.getInstance().protoData = {}
            HzxlLogic.getInstance().initGameData({param:{}, name:msg.matchInfo.gameId}, ()=>{
                this.loadGame()
            })
        }
    }

    private exitGame(msg) {
        console.log("Scmj exitGame")
        if (msg && msg.backToLobby) {
            this._scmj.unLoad()
            izx.closeScene("ScmjMain")
        }
    }

    private loadGame() {
        console.log("Scmj loadGame")
        this._scmj.load()
        if (Scmj._first) {
            Scmj._first = false
            this._scmj.autoRegHander()
        }
        // izx.dispatchEvent(EventName.BLOCK_UI)
        // scmjUtil.preLoadPic(() => {
        //   izx.pushScene(GAME_BUNDLE_NAME, "prefabs/ScmjMain", (res) => {
        //     izx.dispatchEvent(EventName.UN_BLOCK_UI)
        //   })
        // })
        // izx.LoadBundle("hzxl", () => {
        //     izx.dispatchEvent(EventName.UN_BLOCK_UI)
        // })

        // let dirList = []
        // dirList.push("")
        // dirList.push("/images")
        // dirList.push("/prefabs")
        // dirList.push("/sounds")
        // dirList.push("/images/maJiang/huaSe")
        // igs.platform.trackEvent("加载游戏资源目录")
        Helper.reportEvent("加载游戏资源目录")
        let t = Date.now()
        cc.assetManager.loadBundle("hzxl_subpackage", (err: Error, bundle: cc.AssetManager.Bundle) => {
            if (err) {
                Helper.reportEvent("加载游戏hzxl_subpackage失败")
            } else {
                let onProgress = function (finish: number, total: number, item: cc.AssetManager.RequestItem) {
                    igs.emit("load_asset_progress", { finish: finish, total: total, item: item })
                }
                bundle.preload("images/maJiang/mj", cc.SpriteAtlas)
                t = Date.now()
                bundle.loadScene("Main", onProgress, (err, scene) => {
                    console.log("loadGame main time = ", Date.now() - t)
                    if (err) {
                        Helper.reportEvent("load scene err scene=" + "Main", " err=", err.message)
                        return
                    }
                    // igs.platform.trackEvent("加载游戏场景成功", {uploadToPlatform: [{k: "wx_performance", v: {k:1011,v:Date.now()-t}}]})
                    Helper.reportEvent("加载游戏场景成功")
                    cc.director.runScene(scene)
                })
            }
        })
        // scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res, err) => {
        //     console.log("loadGame mj time = ", Date.now() - t)
        //     if(err){
        //         Helper.reportEvent("加载游戏资源目录失败")
        //     }else{
        //         res.addRef()
        //         let onProgress = function (finish: number, total: number, item: cc.AssetManager.RequestItem) {
        //             igs.emit("load_asset_progress", { finish: finish, total: total, item: item })
        //         }
        //         // igs.platform.trackEvent("加载游戏资源目录完成", {uploadToPlatform: [{k: "wx_performance", v: {k:1012,v:Date.now()-t}}]})
        //         Helper.reportEvent("加载游戏资源目录完成")
        //         t = Date.now()
        //         cc.assetManager.getBundle(scmjUtil.BUNDLE_NAME).loadScene("Main", onProgress, (err, scene) => {
        //             console.log("loadGame main time = ", Date.now() - t)
        //             if (err) {
        //                 Helper.reportEvent("load scene err scene=" + "Main", " err=", err.message)
        //                 return
        //             }
        //             // igs.platform.trackEvent("加载游戏场景成功", {uploadToPlatform: [{k: "wx_performance", v: {k:1011,v:Date.now()-t}}]})
        //             Helper.reportEvent("加载游戏场景成功")
        //             cc.director.runSceneImmediate(scene)
        //         })
        //     }
        // })
    }

    preLoadScmjPic(msg) {
        izx.log("preLoadScmjPic msg = ", msg)
        scmjUtil.preLoadPic(msg.callback)
    }
}

let scmj = Scmj.getInstance()
// export default scmj
// EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
//     let scmj = Scmj.getInstance()
// })