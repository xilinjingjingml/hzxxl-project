import { igs } from "../../igs";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjTip extends cc.Component {
    callback = null
    callbackCancel = null

    onOpen() {
        console.log("scmjTip onOpen")
        // super.onOpen()
    }

    onClose() {
        console.log("scmjTip onClose")
        // super.onClose()
    }

    onBtnClose() {
        console.log("scmjTip onBtnClose")
        this.node.destroy()
        if (this.callbackCancel) {
            this.callbackCancel({ canTouch: true })
        }
    }

    onBtnConfirm() {
        console.log("scmjTip onBtnConfirm")
        if (this.callback) {
            this.callback()
        }
        this.node.destroy()
    }

    init(param) {
        if (param) {
            if (param.desc) {
                cc.find("Bg/sptBg/lblDesc", this.node).getComponent(cc.Label).string = param.desc
            }
            if (param.confirmDesc) {
                cc.find("Bg/BtnConfirm/Background/lblDesc", this.node).getComponent(cc.Label).string = param.confirmDesc
            }
            if (param.cancelDesc) {
                cc.find("Bg/BtnCancel/Background/lblDesc", this.node).getComponent(cc.Label).string = param.cancelDesc
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.onOpen()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {

    }

    // update (dt) {}
}
