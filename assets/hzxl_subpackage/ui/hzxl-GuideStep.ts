import { igs } from "../../igs";
import { User } from "../../lobby/start/script/data/User";
import { AudioMgr } from "../hzxl-AudioMgr";
import BaseUI from "../../lobby/start/script/base/BaseUI";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideStep extends cc.Component {
    @property(cc.Node)
    ndContent: cc.Node = null
    @property(cc.RichText)
    lblTip: cc.RichText = null
    @property(cc.Button)
    btnKnow: cc.Button = null
    @property(dragonBones.ArmatureDisplay)
    guideHand: dragonBones.ArmatureDisplay = null

    guideLackPrefix = "guideLackPrefix"
    guidePlayPrefix = "guidePlayPrefix"
    guideGangPrefix = "guideGangPrefix"
    guideHuPrefix = "guideHuPrefix"
    guideHu2Prefix = "guideHu2Prefix"

    lackTip = "<color=#9a6a47>选择最少的花色定缺<br/></c><color=#dc5230>打完该花色<br/></color><color=#9a6a47>才能胡牌哦～</c>"
    playCardTip = "<color=#9a6a47>优先打</c><color=#dc5230>定缺牌<br/></color><color=#9a6a47>以免被查花猪<br/>点击两次或者拖动牌面将牌打出去~</c>"
    gangTip = "<color=#9a6a47>杠牌可以</c><color=#dc5230>直接赢分</color><color=#9a6a47><br/>杠牌后胡牌的</c><color=#dc5230>倍数翻倍</color><color=#9a6a47>点击</c><color=#dc5230>“杠”</color><color=#9a6a47>来试试看吧～</c>"
    huTip = "<color=#9a6a47>运气真好，可以胡了呐<br/>快来点击</c><color=#dc5230>“胡”</color><color=#9a6a47>按钮吧～</c>"
    huTip2 = "<color=#9a6a47>胡牌后仍可</c><color=#dc5230>继续游戏<br/></color><color=#9a6a47>直到无牌可摸或3家认输才会结束~</c>"

    onOpen() {
        console.log("GuideStep onOpen")
        // super.onOpen()
    }

    onClose() {
        console.log("GuideStep onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        // izx.on(SCMJ_EVENT.GUIDE_HIDE, this.onGuideHide, this)
        // izx.on(SCMJ_EVENT.GUIDE_LACK, this.onGuideLack, this)
        // izx.on(SCMJ_EVENT.GUIDE_PLAY, this.onGuidePlay, this)
        // izx.on(SCMJ_EVENT.GUIDE_GANG, this.onGuideGang, this)
        // izx.on(SCMJ_EVENT.GUIDE_HU, this.onGuideHu, this)
        // izx.on(SCMJ_EVENT.GUIDE_HU2, this.onGuideHu2, this)
    }

    ifNeedGuide(name) {
        let bGuide = cc.sys.localStorage.getItem("scmjNeedGuide_" + User.Data.uid)
        if (!bGuide) {
            return false
        }
        bGuide = cc.sys.localStorage.getItem(name + "_" + User.Data.uid)
        if (!bGuide) {
            return true
        } else {
            return false
        }
    }

    setSuccessGuide(name) {
        cc.sys.localStorage.setItem(name + "_" + User.Data.uid, 1)
    }

    onGuideHide(msg) {
        if (this.lblTip.string == this.huTip2) {
            return
        }
        this.ndContent.active = false
    }

    onGuideLack(msg) {
        let bGuide = this.ifNeedGuide(this.guideLackPrefix)
        if (bGuide) {
            this.ndContent.active = true
            this.btnKnow.node.active = false
            this.lblTip.string = this.lackTip
            if (msg && msg.pos) {
                this.guideHand.node.active = true
                this.guideHand.node.position = this.ndContent.convertToNodeSpaceAR(msg.pos)
            } else {
                this.guideHand.node.active = false
            }
            this.setSuccessGuide(this.guideLackPrefix)
        }
    }

    onGuidePlay(msg) {
        let bGuide = this.ifNeedGuide(this.guidePlayPrefix)
        if (bGuide) {
            this.ndContent.active = true
            this.btnKnow.node.active = false
            this.lblTip.string = this.playCardTip
            if (msg && msg.pos) {
                this.guideHand.node.active = true
                this.guideHand.node.position = this.ndContent.convertToNodeSpaceAR(msg.pos)
            } else {
                this.guideHand.node.active = false
            }
            this.setSuccessGuide(this.guidePlayPrefix)
        }
    }

    onGuideGang(msg) {
        let bGuide = this.ifNeedGuide(this.guideGangPrefix)
        if (bGuide) {
            this.ndContent.active = true
            this.btnKnow.node.active = false
            this.lblTip.string = this.gangTip
            if (msg && msg.pos) {
                this.guideHand.node.active = true
                this.guideHand.node.position = this.ndContent.convertToNodeSpaceAR(msg.pos)
            } else {
                this.guideHand.node.active = false
            }
            this.setSuccessGuide(this.guideGangPrefix)
        }
    }

    onGuideHu(msg) {
        let bGuide = this.ifNeedGuide(this.guideHuPrefix)
        if (bGuide) {
            this.ndContent.active = true
            this.btnKnow.node.active = false
            this.lblTip.string = this.huTip
            if (msg && msg.pos) {
                this.guideHand.node.active = true
                this.guideHand.node.position = this.ndContent.convertToNodeSpaceAR(msg.pos)
            } else {
                this.guideHand.node.active = false
            }
            this.setSuccessGuide(this.guideHuPrefix)
        }
    }

    onGuideHu2(msg) {
        let bGuide = this.ifNeedGuide(this.guideHu2Prefix)
        if (bGuide) {
            this.ndContent.active = true
            this.btnKnow.node.active = true
            this.lblTip.string = this.huTip2
            if (msg && msg.pos) {
                this.guideHand.node.active = true
                this.guideHand.node.position = this.ndContent.convertToNodeSpaceAR(msg.pos)
            } else {
                this.guideHand.node.active = false
            }
            this.setSuccessGuide(this.guideHu2Prefix)
        }
    }

    onBtnKnow() {
        AudioMgr.playBtn()
        this.ndContent.active = false
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
