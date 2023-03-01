/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2020-11-02 10:40:56
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-19 09:34:16
 */
import { igs } from "../igs";
import EventTrack, { TrackNames } from "./main_EventTrack";
let izx = igs.izx
let BaseUI = izx.BaseUI
const {ccclass, property} = cc._decorator;

// interface LoadingMsg {
//     error: string
//     info: string
//     type: LoadingMsgType
//     inc: number // 取值为0-100, 增量
//     abs: number // 取值为0-100，最终值
//     callback: Function  // 重试的回调
// }

interface LoadingTypeProcess {
    total: number
}

@ccclass
export default class LoadingScene extends BaseUI {

    @property(cc.SpriteFrame)
    sound: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    soundClose: cc.SpriteFrame = null

    @property(cc.Node)
    navGameButton:cc.Node = null

    _lizi:cc.Node = null
    _SptTop:cc.Node = null

    _progress: cc.ProgressBar = null
    _msg: cc.Label = null

    @property(cc.Node)
    bottomArea: cc.Node = null

    _progressVal: number = 0

    // 记录每种LoadingType的进度
    _progressData: Array<number> = []
    _progressDtMax: number

    _lblProgress: cc.Label = null

    _count = 0;
    _tip = "预加载资源"
    _mockCount = 0;
    _countDt = 0


    onOpen() {
        console.log("this", this)
        izx.log("loading scene on open scene")
        // izx.on(Constants.EventName.GAME_UPDATE_PROGRESS, this.updateProgress, this)
        // izx.on(Constants.EventName.GAME_SHOW_LOGIN, this.showLogin, this)
        // izx.on(Constants.EventName.GAME_HOT_UPDATE_PROGRESS, this.updateProgress, this)
        // izx.on(Constants.EventName.GAME_HOT_UPDATE_FAILED, this.updateProgress, this)
        // izx.on(Constants.EventName.GAME_HOT_UPDATE_SUCCESS, this.updateProgress, this)
        // izx.on("lobby-progress", this.updateLobbyProgress, this)

        // if (this.bottomArea === null) {
        //     this.bottomArea = cc.find("Loading/BottomArea", cc.director.getScene())
        //     cc.log("==this.bottomArea==", this.bottomArea)
        // }

        // this._progressDtMax = 1 / LoadingMsgType.TotalType
        // for (let i = 0; i < LoadingMsgType.TotalType; i++) {
        //     this._progressData[i] = 0
        // }

        // const jiangpin = cc.find("jiangpinArea", this.node).children
        // for (let i = 0; i < jiangpin.length; i++) {
        //     jiangpin[i].active=true
        //     this.playerBubble(jiangpin[i], i * .5)
        // }
        
        EventTrack.add(TrackNames.GAME_LAUNCH)

        this._progress = cc.find("progress", this.bottomArea).getComponent(cc.ProgressBar)
        this._msg = cc.find("msg", this.bottomArea).getComponent(cc.Label)
        this._lblProgress = cc.find("LblProgress", this.bottomArea).getComponent(cc.Label)
        this._lizi = cc.find("lizi", this.bottomArea)
        this._SptTop = cc.find("SptTop", this.bottomArea)


        // 4秒加载到99%

    }

    start() {
        // this.initButton()
        this.onOpen()
    }

    initButton() {
        izx.Button.bindButtonClick("BtnStart", this.node, () => {
           // izx.emit(Constants.EventName.GAME_LOAD_COMPLETE)
        })

        izx.Button.bindButtonClick("SptSound", this.node, () => {
            this.toogleMusic()
        })
    }

    checkGuestAccount() {
        // const _auth = new Auth()
        // _auth.guestLogin()
    }

    toogleMusic () {
        if (iGaoShouApi) {
            const game_music = iGaoShouApi.GetMusicVolume()
            console.log("game_music:" + game_music)
            if (game_music > 0) {
                cc.audioEngine.stopMusic()
                iGaoShouApi.SetMusicVolume(0)
                cc.find("SptSound", this.node).getComponent(cc.Sprite).spriteFrame = this.soundClose
            } else {
                izx.AudioMgr.playMusic("bgm")
                iGaoShouApi.SetMusicVolume(1)
                cc.find("SptSound", this.node).getComponent(cc.Sprite).spriteFrame = this.sound
            }
        }
    }

    // updateProgress(msg: LoadingMsg) {
    //     return
    //     // izx.log("==updateProgress==", msg.type, msg.abs || ",", msg.inc || ",", msg.info || ",", msg.error || ",", this._progressData)
    //     // if (typeof(msg.type) == "undefined")
    //     //     return

    //     // if (!this._progress) {
    //     //     this._progress = cc.find("progress", this.bottomArea).getComponent(cc.ProgressBar)
    //     // }

    //     // if (this._progress.progress >= 1) {
    //     //     return
    //     // }

    //     // let cur = this._progressData[msg.type]
    //     // if (cur < 100) {
    //     //     if (typeof(msg.abs) == "number" && msg.abs <= 100) {
    //     //         this._progressData[msg.type] = msg.abs / 2
    //     //     } else if (typeof(msg.inc) == "number" && msg.inc <= 100) {
    //     //         this._progressData[msg.type] = this._progressData[msg.type] + msg.inc
    //     //         if (this._progressData[msg.type] > 100)
    //     //             this._progressData[msg.type] = 50
    //     //     }
    //     // }

    //     // if (!this._msg) {
    //     //     this._msg = cc.find("msg", this.bottomArea).getComponent(cc.Label)
    //     // }

    //     // let total = 0
    //     // this._progressData.forEach((num: number)=>total+=num)
    //     // total /= (LoadingMsgType.TotalType * 100)

    //     // if (typeof(msg.error) == "string" && msg.error.length > 0) {
    //     //     izx.confirmBox({
    //     //         msg: msg.error,
    //     //         title: "提示",
    //     //         btnText: "重试",
    //     //         callback: ()=>{
    //     //             if (typeof (msg.callback) === "function") {
    //     //                 msg.callback()
    //     //                 return
    //     //             } else {
    //     //                 // izx.emit(Constants.EventName.ACCOUNT_CHECK_ACCOUNT)
    //     //             }
    //     //         }
    //     //     })
    //     //     // cc.find("dragon", this.node).active = false
    //     // } else if (typeof(msg.info) == "string" && msg.info.length > 0) {
    //     //     this._msg.string = msg.info
    //     // }
        
    //     // izx.log("==progress==", total)
    //     // this._progress.progress = total
    //     // this._lblProgress = cc.find("LblProgress", this.bottomArea).getComponent(cc.Label)
    //     // this._lblProgress.string = (total * 100).toFixed(0) + "%"
        
    //     // if (total > 0.4) {
    //     //     izx.log("==load complete==")
    //     //     //this.showLogin()
    //     //     izx.emit(Constants.EventName.GAME_LOAD_COMPLETE)
    //     // }
    // }


    updateLobbyProgress (msg) {
        msg.val = Math.min(msg.val, 1)
        this._count = Math.max(this._count, msg.val)
        this._countDt = Math.max(msg.val - this._mockCount, 0) / 20
        if (msg.val <= 0.95) {
            this._countDt = Math.min(Math.max(this._count - this._mockCount, 0), 1) / 100
        }
        this._tip = msg.tips
    }

    update() {
        if (this._mockCount < this._count) {
            this._mockCount += this._countDt
            this._mockCount = Math.min(this._mockCount, 1)
            this.refresh()
        }
    }

    refresh() {
        if (this._tip && this._msg) {
            this._msg.string = this._tip
        }
        this._progress.progress = this._mockCount
        this._lblProgress.string = (this._mockCount * 100).toFixed(0) + "%"
        this._lizi.x = -300 + this._progress.node.getChildByName("bar").width
        this._SptTop.x = -320 + this._progress.node.getChildByName("bar").width
    }

    showLogin() {
        this.bottomArea.getChildByName("msg").active = false
        this.bottomArea.getChildByName("LblProgress").active = false
        this.node.getChildByName("BtnStart").active = true
        this.node.getChildByName("LayArea").active = true
        // iGaoShouApi.Initialize(() => {            
        //     iGaoShouApi.GetPromotion((res) => {
        //         console.log(res)
        //         for (let index = 0; index < res.length; index++) {
        //             const element = res[index];
        //             let promotion_game_pic = element.promotion_game_pic
        //             let promotion_appid = element.promotion_appid
        //             cc.assetManager.loadRemote(promotion_game_pic, (err, texture) =>{ 
                        
        //                 if (err === null) {
        //                     let node = cc.instantiate(this.navGameButton)

        //                     node.active = true
        //                     node.parent = this.node.getChildByName("LayArea")
        //                     node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
        //                     node.name = "game" + index


        //                     let btn = node.getComponent(cc.Button)
        //                     let eventName = "btn_" + node.name + "_click"
        //                     btn[eventName] = (sender, data) => {
        //                         cc.log("promotion_appid:",promotion_appid)
        //                         //callback(sender, data)
        //                         WxWrapper.navigateToMiniProgram(promotion_appid)
        //                     }
                            
        //                     btn.clickEvents = btn.clickEvents || []
        //                     let clickEventHandler = new cc.Component.EventHandler();
        //                     clickEventHandler.target = node
        //                     clickEventHandler.component = "cc.Button"
        //                     clickEventHandler.handler = eventName
        //                     clickEventHandler.customEventData = "customData"
        //                     btn.clickEvents.push(clickEventHandler) 
        //                 }

        //             });
        //         }
        //     })      
        // })
    }

    onCloseScene() {
    }

    playerBubble(node, time) {
        node.scale = 0
        var start = node.position
        var pos = node.position
    
        // cc.log(start, pos)
    
        var elasticity = cc.tween().repeat(3,
            cc.tween()
                .to(.2, { scaleX: .7 })
                .to(.2, { scaleX: .9 })
                .to(.2, { scaleX: .7 })
                .to(.2, { scaleX: .8 })
                .delay(1)
                .to(.2, { scaleY: .7 })
                .to(.2, { scaleY: .9 })
                .to(.2, { scaleY: .7 })
                .to(.2, { scaleY: .8 })
                .delay(1)
        )
    
        var snake = cc.tween().repeat(3,
            cc.tween()
                .call(() => {
                    cc.tween(node)
                        .bezierBy(3,
                            cc.v2(120, 120),
                            cc.v2(-80, 240),
                            cc.v2(0, 360))
                        .start()
                })
                .delay(2.5)
        )
    
        cc.tween(node)
            .delay(time)
            .repeatForever(
                cc.tween()
                    .to(.1, { scale: .8 })
                    .parallel(
                        elasticity,
                        snake,
                        cc.tween().delay(7).to(.5, { opacity: 0 })
                    )
                    .set({ position: start, scale: 0, opacity: 255 })
                    .call(() => {
                        pos = start
                        // cc.log(start, pos)
                    })
                    .delay(.2)
            )
            .start()
    }
}
