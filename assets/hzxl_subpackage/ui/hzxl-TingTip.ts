import { SCMJ_EVENT } from "../hzxl-Events";
import { scmjUtil } from "../hzxl-Util";

import { igs } from "../../igs";
import BaseUI from "../../lobby/start/script/base/BaseUI";
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import { Constants } from "../../lobby/start/script/igsConstants";
import HzxlLogic from "../hzxl-logic";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class TingTip extends cc.Component {
    // 标题
    @property(cc.Label)
    lblNum: cc.Label = null;
    // 内容
    @property(cc.Layout)
    layoutContent: cc.Layout = null;

    bet: number = 0

    onOpen() {
        console.log("TingTip onOpen")
        // super.onOpen()

        let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
        if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties && matchInfo.metadata.gs_properties.bet) {
            this.bet = matchInfo.metadata.gs_properties.bet
        }
    }

    onClose() {
        console.log("TingTip onClose")
        // super.onClose()
    }

    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.STATE_NONE, this.reset, this)
        izx.on(SCMJ_EVENT.HIDE_UI, this.hideUi, this)
    }

    reset() {
        if (this.node && this.node.isValid) {
            this.node.active = false
        }
        if (this.layoutContent && this.layoutContent.isValid) {
            this.layoutContent.node.removeAllChildren()
        }

        for (let i = 0; i < 4; i++) {
            let ndItem = cc.find("Bg/RightBg/GamePlay/Item_" + i + "/sptCheck", this.node)
            if (ndItem && ndItem.isValid) {
                ndItem.active = false
            }
        }
    }

    // 初始化数据
    init(tingCards) {
        let len = tingCards.length
        if (len == 0) {
            this.lblNum.string = "0"
            for (let v of this.layoutContent.node.children) {
                v.active = false
            }
            return
        }
        for (let v of this.layoutContent.node.children) {
            v.active = false
        }
        let bg = this.node.getChildByName("Bg")
        if (len == 1) {
            this.layoutContent.type = cc.Layout.Type.HORIZONTAL
            bg.width = 180
            bg.height = 220
        } else if (len <= 9) {
            this.layoutContent.type = cc.Layout.Type.HORIZONTAL
            bg.width = 100 * len + 30
            bg.height = 220
        } else if (len > 9) {
            this.layoutContent.type = cc.Layout.Type.GRID
            bg.width = 100 * 9 + 30
            bg.height = Math.floor(len / 9) * 160 + 220
        }
        let huNum = 0
        let ratioNum = 0
        let maxRatioNum = 0
        let index = 0
        scmjUtil.loadAsset("prefabs/TingCard", cc.Prefab, (prefab) => {
            if (prefab) {
                for (let v of tingCards) {
                    v.card = v.card || 0
                    v.left = v.left || 0
                    v.ratio = v.ratio || 0
                    v.fan = v.fan || 0
                    scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                        if (this.layoutContent && cc.isValid(this.layoutContent.node) && res) {
                            let tingCard = cc.find(index.toString(), this.layoutContent.node)
                            if (tingCard && tingCard.isValid) {
                                tingCard.active = true
                                tingCard.x = 0
                                tingCard.y = 0
                            } else {
                                tingCard = cc.instantiate(prefab)
                                tingCard.parent = this.layoutContent.node
                                tingCard.name = index.toString()
                            }
                            tingCard.getChildByName("SptValue").getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(v.card)
                            tingCard.getChildByName("LblLeft").getComponent(cc.RichText).string = v.left + "<color=#546691>张</color>"
                            
                            
                            if (HzxlLogic.getInstance().isGdmj()) {
                                let SptGui = tingCard.getChildByName("SptGui")
                                if (v.card == HzxlLogic.getInstance().laizi) {
                                    if(SptGui){
                                        SptGui.active = true
                                    }
                                } else {
                                    if(SptGui){
                                        SptGui.active = false
                                    }
                                }
                            }
                            
                            if (v.ratio == 0) {
                                tingCard.getChildByName("LblRatio").active = false
                            } else {
                                tingCard.getChildByName("LblRatio").active = true
                                tingCard.getChildByName("LblRatio").getComponent(cc.RichText).string = v.ratio + "<color=#546691>倍</color>"
                            }
                        }
                    })
                    huNum += v.left
                    ratioNum += v.ratio
                    if (v.ratio > maxRatioNum) {
                        maxRatioNum = v.ratio
                    }
                    index++
                }
                if (this.lblNum && this.lblNum.node && this.lblNum.node.isValid) {
                    this.lblNum.string = huNum.toString()
                }
                let empty = cc.find("Bg/NodeContent/Empty", this.node)
                if (empty && empty.isValid) {
                    empty.getComponent(cc.Label).string = "共" + ratioNum + "倍最高可赢" + (maxRatioNum * this.bet) + "万金币"
                }
            }
        })
    }

    hideUi() {
        if (this.node.active) {
            this.node.active = false
        }
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.registerEvent()
    }

    onDestroy() {
        if (this.layoutContent && this.layoutContent.isValid) {
            if (this.layoutContent.node && this.layoutContent.node.isValid) {
                this.layoutContent.node.removeAllChildren()
            }
        }
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {
        this.onOpen()
    }

    // update (dt) {}
}
