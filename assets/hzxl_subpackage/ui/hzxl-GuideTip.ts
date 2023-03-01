import { igs } from "../../igs";
import { AudioMgr } from "../hzxl-AudioMgr";
import { User } from "../../lobby/start/script/data/User";
import BaseUI from "../../lobby/start/script/base/BaseUI";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideTip extends cc.Component {

    onOpen() {
        console.log("GuideTip onOpen")
        // super.onOpen()
    }

    onClose() {
        console.log("GuideTip onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {

    }

    onBtnOlder() {
        AudioMgr.playBtn()
        cc.sys.localStorage.setItem("scmjPopGuideTip_" + User.Data.uid, 1)
        // this.pop()
    }

    onBtnNewer() {
        AudioMgr.playBtn()
        cc.sys.localStorage.setItem("scmjPopGuideTip_" + User.Data.uid, 1)
        cc.sys.localStorage.setItem("scmjNeedGuide_" + User.Data.uid, 1)
        // this.pop()
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.registerEvent()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {
        this.onOpen()
    }

    // update (dt) {}
}
