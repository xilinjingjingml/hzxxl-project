import { SCMJ_EVENT } from "../hzxl-Events";

import { igs } from "../../igs";
import { AudioMgr } from "../hzxl-AudioMgr";
import BaseUI from "../../lobby/start/script/base/BaseUI";
import { scmjUtil } from "../hzxl-Util";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjClock extends cc.Component {
    @property(cc.Node)
    bgEswn: cc.Node = null;
    @property(cc.Label)
    lblTimer01: cc.Label = null;
    @property(cc.Label)
    lblTimer02: cc.Label = null;

    eastChairId = 0
    bgAngle = 0
    // mapSpt = {}
    second = -1
    aniBgEswn = null
    aniMapSpt = {}
    curChairId = -1

    onOpen() {
        console.log("scmjClock onOpen")
        // super.onOpen()

        this.aniMapSpt[1] = "hong"
        this.aniMapSpt[2] = "huang"
        this.aniMapSpt[3] = "nan"
        this.aniMapSpt[4] = "lv"
    }

    onClose() {
        console.log("scmjClock onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_TIMER, this.updateTimer, this)
        izx.on(SCMJ_EVENT.UPDATE_EAST, this.updateEast, this)
        izx.on(SCMJ_EVENT.BEGIN_GAME_NOTI, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.RESULT_NOTI, this.resultNoti, this)
        izx.on(SCMJ_EVENT.STOP_TIMER, this.stopTimer, this)
    }

    onStartGameNoti(noti) {
        console.log("scmjClock onStartGameNoti")
        if (!noti) return
        this.second = -1
        this.curChairId = -1
        this.showSpt()
        this.showTimer()
    }

    showTimer(second = 0) {
        if (this.aniBgEswn) {
            this.lblTimer01.node.active = false
            this.lblTimer02.node.active = false
            if (second < 0) {
                return
            }
            if (second > 5) {
                this.lblTimer01.node.active = true
                this.lblTimer01.string = second >= 10 ? second + "" : "0" + second
            } else {
                this.lblTimer02.node.active = true
                this.lblTimer02.string = second >= 10 ? second + "" : "0" + second
            }
        }
    }

    showSpt(chairId = 0) {
        if (this.aniBgEswn) {
            let spine = this.aniBgEswn.getComponent(sp.Skeleton)
            spine.clearTracks()
            spine.setAnimation(0, "di", true)

            if (chairId > 0) {
                spine.setAnimation(0, this.aniMapSpt[chairId], true)
            }
        }
    }

    stopTimer(stopAni?) {
        this.unschedule(this.startTimer)
        if(stopAni){
            if (this.aniBgEswn) {
                let spine = this.aniBgEswn.getComponent(sp.Skeleton)
                spine.clearTracks()
                spine.setAnimation(0, "di", true)
            }
        }
    }

    startTimer() {
        this.second--
        if (this.second >= 0) {
            if (this.second < 5) {
                AudioMgr.playSound("audio_clock")
            }
            if (this.second == 3) {
                izx.dispatchEvent(SCMJ_EVENT.WAIT_YOU_TIP, this.curChairId)
            }
            this.showTimer(this.second)
        } else {
            this.second = -1
            this.stopTimer()
        }
    }

    updateTimer(msg) {
        // console.log("scmjClock updateTimer msg = ", msg)
        if (this.eastChairId == 0) {
            console.log("this.eastChairId == 0")
            // izx.dispatchEvent(SCMJ_EVENT.COMPLETE_REQ)
            return
        }
        this.curChairId = msg.chairId
        this.showSpt(msg.chairId)
        this.second = msg.second
        this.showTimer(this.second)
        this.stopTimer()
        // this.lblTimer01.node.active = true
        this.schedule(this.startTimer, 1)
    }

    updateEast(msg) {
        console.log("scmjClock updateEast msg = ", msg)
        this.eastChairId = msg.chairId
        scmjUtil.loadAsset("prefabs/AniEswn" + this.eastChairId, cc.Prefab, (res) => {
            if (cc.isValid(this.bgEswn) && res) {
                if (this.bgEswn && this.bgEswn.isValid) {
                    if (this.bgEswn.childrenCount > 0) {
                        this.bgEswn.removeAllChildren()
                    }
                    this.aniBgEswn = cc.instantiate(res)
                    this.aniBgEswn.parent = this.bgEswn
                    this.aniBgEswn.y -= 75
                }
            }
        }, "hzxl_subpackage")
    }

    resultNoti() {
        this.stopTimer()
        this.showTimer()
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        scmjUtil.addEnterGameScene("clock-onLoad")
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {
        scmjUtil.addEnterGameScene("clock-start")
        this.onOpen()
        this.registerEvent()
        scmjUtil.addEnterGameScene("clock-start-end")
    }

    // update (dt) {}
}
