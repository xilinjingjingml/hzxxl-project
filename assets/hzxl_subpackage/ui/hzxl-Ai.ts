import { SCMJ_EVENT } from "../hzxl-Events";
import { igs } from "../../igs";
import { AudioMgr } from "../hzxl-AudioMgr";
import HzxlLogic from "../hzxl-logic";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjAi extends cc.Component {
    onLoad() {
        this.registerEvent()
    }

    start() {
        this.onOpen()
    }

    onOpen() {
        izx.log("ScmjAi onOpen")
        // super.onOpen()
        this.init()
    }

    onClose() {
        izx.log("ScmjAi onClose")
        this.unscheduleAllCallbacks()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    registerEvent() {
        izx.on(SCMJ_EVENT.REFRESH_AI, this.refreshAi, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.reset, this)
        izx.on(SCMJ_EVENT.HIDE_UI, this.hideUi, this)
    }

    init() {
        izx.log("ScmjAi init")
        let item = cc.find("Item", this.node)
        for (let i = 0; i < HzxlLogic.getInstance().gamePlayDesc.length; i++) {
            if (HzxlLogic.getInstance().gamePlayDesc[i].length == 0) {
                continue
            }
            let ndItem = cc.instantiate(item)
            ndItem.name = "Item_" + i
            ndItem.active = true
            ndItem.parent = this.node
            let lblDesc = cc.find("lblDesc", ndItem)
            if (lblDesc && lblDesc.isValid) {
                lblDesc.getComponent(cc.Label).string = HzxlLogic.getInstance().gamePlayDesc[i]
            }
            izx.Button.bindButtonClick("btnCheck", ndItem, (sender, data) => {
                console.log("btnCheck")
                AudioMgr.playBtn()
                izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                    if (res) {
                        let sptCheck = cc.find("sptCheck", ndItem)
                        if (sptCheck && sptCheck.isValid) {
                            if (!sptCheck.active) {
                                sptCheck.active = true
                                HzxlLogic.getInstance().ai[i] = 1
                            } else {
                                sptCheck.active = false
                                HzxlLogic.getInstance().ai[i] = 0
                            }
                        }
                        izx.dispatchEvent(SCMJ_EVENT.AI_REQ, { ai: HzxlLogic.getInstance().ai })
                        izx.dispatchEvent(SCMJ_EVENT.REFRESH_AI)

                    }
                })
            })
        }

        this.refreshAi()
    }

    refreshAi() {
        let ai = HzxlLogic.getInstance().ai

        for (let i = 0; i < 4; i++) {
            let sptCheck = cc.find("Item_" + i + "/sptCheck", this.node)
            if (sptCheck && sptCheck.isValid) {
                sptCheck.active = (1 == ai[i] ? true : false)
            }
        }
    }

    reset() {
        HzxlLogic.getInstance().ai = [0, 0, 0, 0]

        for (let i = 0; i < 4; i++) {
            let sptCheck = cc.find("Item_" + i + "/sptCheck", this.node)
            if (sptCheck && sptCheck.isValid) {
                sptCheck.active = false
            }
        }
    }

    hideUi() {
        let parentName = this.node.parent.name
        if (parentName != "RightBg" && this.node.active) {
            this.node.active = false
        }
    }
}
