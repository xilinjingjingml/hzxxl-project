import { igs } from "../../igs";
import { SCMJ_EVENT } from "../hzxl-Events";
import HzxlLogic from "../hzxl-logic";
import Scmj from "../hzxl-scmj";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjPrivateRoomTip extends cc.Component {
    second: number = 60 * 10 // 10分钟
    flag: number = -1 // -1：初始化 0：暂停 1：恢复
    noti = null // PauseGameNoti消息
    localChairId: number = -1 // 本地玩家
    hideTime: number = 0
    type: number = -1 // 1:单局结算
    opNickName: string = "" // 待操作玩家

    onLoad() {
        this.registerEvent()
        this.onOpen()
    }

    onOpen() {
        izx.log("scmjPrivateRoomTip onOpen")
    }

    registerEvent() {
        izx.on(SCMJ_EVENT.START_PRIVATE_ROOM_TIP_TIMER, this.startPrivateTipTimer, this)
        izx.on(SCMJ_EVENT.STOP_PRIVATE_ROOM_TIP_TIMER, this.stopTimer, this)
        izx.on(SCMJ_EVENT.UPDATE_PRIVATE_TIP, this.updatePrivateTip, this)
        izx.on(SCMJ_EVENT.REFRESH_PRIVATE_ROOM_TIP_TIMER, this.refreshPrivateRoomTip, this)

        //切后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            this.hideTime = Date.now()
        }, this);

        cc.game.on(cc.game.EVENT_SHOW, () => {
            let gatTime = Math.ceil((Date.now() - this.hideTime) / 1000)
            this.second -= gatTime
            this.hideTime = 0
        }, this)
    }

    startPrivateTipTimer(param) {
        this.stopTimer()
        if (this.node && this.node.isValid) {
            this.node.active = true
            this.node.y = -300
        }
        if (param) {
            this.type = param.type || -1
            this.opNickName = param.nickname || ""
        }
        let nowTime = Math.floor(Date.now() / 1000)
        let time = Number(HzxlLogic.getInstance().privateRoomInfo.max_idle_time_ts) || 60 * 10
        let protoData = <any>HzxlLogic.getInstance().protoData
        let privateRoomInfo = HzxlLogic.getInstance().privateRoomInfo
        if (protoData.lastRoundNoti && protoData.lastRoundNoti.endTime != 0) {
            this.second = time - Math.abs(nowTime - protoData.lastRoundNoti.endTime)
        } else if (privateRoomInfo.endTime != 0) {
            if (this.node && this.node.isValid) {
                this.node.y = -220
            }
            this.second = time - Math.abs(nowTime - privateRoomInfo.endTime)
        } else {
            this.second = time - Math.abs(nowTime - privateRoomInfo.create_time)
        }
        this.flag = -1
        this.startTimer()
    }

    updatePrivateTip(msg, chairId) {
        if (msg && this.node && this.node.isValid) {
            this.node.y = -140
            this.noti = msg
            this.localChairId = chairId
            if (this.flag != msg.flag) {
                this.flag = msg.flag
                if (msg.flag == 0) { // 暂停
                    if (HzxlLogic.getInstance().privateRoomInfo.auto_play_game != 0) {
                        izx.dispatchEvent(SCMJ_EVENT.STOP_TIMER)
                    }

                    this.stopTimer()
                    this.node.active = true
                    let nowTime = Math.floor(Date.now() / 1000)
                    let time = Number(HzxlLogic.getInstance().privateRoomInfo.max_idle_time_ts) || 60 * 10
                    this.second = time - Math.abs(nowTime - msg.waitTime)
                    this.startTimer()
                } else if (msg.flag == 1) { // 恢复
                    this.stopTimer()
                    // if (this.noti.chairId == this.localChairId) {
                    // this.node.active = false
                    // } else {
                    //     this.node.active = true
                    //     let lblDesc = cc.find("LblDesc", this.node)
                    //     if (lblDesc && lblDesc.isValid) {
                    //         lblDesc.getComponent(cc.Label).string = this.noti.nickName + "返回,游戏恢复"
                    //     }
                    //     this.node.stopAllActions()
                    //     this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => { this.node.active = false })))
                    // }
                }
            } else {
                let nowTime = Math.floor(Date.now() / 1000)
                let time = Number(HzxlLogic.getInstance().privateRoomInfo.max_idle_time_ts) || 60 * 10
                this.second = time - Math.abs(nowTime - msg.waitTime)
            }
        }
    }

    refreshPrivateRoomTip() {
        if (this.node && this.node.isValid) {
            this.node.active = this.second > 0 ? true : false
        }
    }

    stopTimer() {
        // console.log("stopTimer")
        this.unschedule(this.updateTimer)
        this.second = 0
        if (this.node && this.node.isValid) {
            this.node.active = false
        }
    }

    startTimer() {
        // console.log("startTimer")
        this.formatCountdown()
        this.schedule(this.updateTimer, 1)
    }

    updateTimer() {
        // console.log("updateTimer")
        if (this.second == 0) {
            this.stopTimer()
            return
        } else {
            this.second--
        }
        this.formatCountdown()
    }

    formatCountdown() {
        let sFen = Math.floor(this.second / 60).toString()
        if (this.second / 60 < 10) {
            sFen = "0" + sFen
        }
        let sMiao = (this.second % 60).toString()
        if (this.second % 60 < 10) {
            sMiao = "0" + sMiao
        }
        let lblDesc = cc.find("LblDesc", this.node)
        if (lblDesc && lblDesc.isValid) {
            if (this.flag == -1) {
                if (this.type == 1) {
                    lblDesc.getComponent(cc.Label).string = "等待您进行操作，" + sFen + "分" + sMiao + "秒后自动解散"
                } else if (this.type == 2) {
                    lblDesc.getComponent(cc.Label).string = "等待" + this.opNickName + "操作，" + sFen + "分" + sMiao + "秒后自动解散"
                } else {
                    lblDesc.getComponent(cc.Label).string = sFen + "分" + sMiao + "秒后未开局，房间将自动解散"
                }
            } else if (this.flag == 0) { // 暂停
                if (this.second > 0) {
                    if (this.noti.chairId == this.localChairId) {
                        lblDesc.getComponent(cc.Label).string = "等待您进行操作，" + sFen + "分" + sMiao + "秒后自动解散"
                    } else {
                        lblDesc.getComponent(cc.Label).string = "等待" + this.noti.nickName + "操作，" + sFen + "分" + sMiao + "秒后自动解散"
                    }
                } else {
                    let time = Number(HzxlLogic.getInstance().privateRoomInfo.max_idle_time_ts) || 60 * 10
                    lblDesc.getComponent(cc.Label).string = this.noti.nickName + time / 60 + "分钟内无操作，房间已自动解散"
                }
            }
        }
    }

    onClose() {
    }

    onDestroy() {
    }
}
