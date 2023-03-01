import { SCMJ_EVENT } from "../hzxl-Events";
import { igs } from "../../igs";
import { AudioMgr } from "../hzxl-AudioMgr";
import HzxlLogic from "../hzxl-logic";
import { Constants } from "../../lobby/start/script/igsConstants";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjDoubleCapped extends cc.Component {
    second: number = 5

    onLoad() {
        // this.registerEvent()
    }

    start() {

        this.onOpen()
    }

    onOpen() {
        izx.log("scmjDoubleCapped onOpen")
        // super.onOpen()
        this.init()
    }

    onClose() {
        izx.log("scmjDoubleCapped onClose")
        this.unscheduleAllCallbacks()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    registerEvent() {
    }

    init() {
        izx.Button.bindButtonClick("BtnCancel", this.node, (sender, data) => {
            console.log("BtnCancel")
            AudioMgr.playBtn()
            this.stopTimer()
            this.node.destroy()
            izx.dispatchEvent(SCMJ_EVENT.CAP_MULTIPLE_RSP, { capMultiple: 1 })
        })

        izx.Button.bindButtonClick("BtnConfirm", this.node, (sender, data) => {
            console.log("BtnConfirm")
            AudioMgr.playBtn()
            this.stopTimer()
            this.node.destroy()
            iGaoShouApi.useItem({
                item_num: 1,
                item_id: Constants.ITEM_INDEX.MJ_CAPPED_CARD,
                roomInfo: HzxlLogic.getInstance().roomInfo,
                callback: (res) => {
                    console.log("scmjDoubleCapped init useItem = ", res)
                    if (2 == res.ret) {
                        izx.dispatchEvent(SCMJ_EVENT.CAP_MULTIPLE_RSP, { capMultiple: 2 })
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_CAP_MULTIPLE, { chairId: 1, capMultiple: 2 })
                    } else if (1 == res.ret) {
                        izx.dispatchEvent(SCMJ_EVENT.CAP_MULTIPLE_RSP, { capMultiple: 1 })
                    }
                }
            })
        })

        this.startTimer()
    }

    stopTimer() {
        // console.log("stopTimer")
        this.unschedule(this.updateTimer)
    }

    startTimer() {
        // console.log("startTimer")
        this.stopTimer()
        cc.find("AlarmClock/Countdown", this.node).getComponent(cc.Label).string = this.second.toString()
        this.schedule(this.updateTimer, 1)
    }

    updateTimer() {
        // console.log("updateTimer")
        if (this.second == 0) {
            this.stopTimer()
            this.node.destroy()
            izx.dispatchEvent(SCMJ_EVENT.CAP_MULTIPLE_RSP, { capMultiple: 1 })
        } else {
            this.second--
        }
        cc.find("AlarmClock/Countdown", this.node).getComponent(cc.Label).string = this.second.toString()
    }
}
