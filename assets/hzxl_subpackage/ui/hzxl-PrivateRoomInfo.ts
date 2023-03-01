import { SCMJ_EVENT } from "../hzxl-Events";
import { igs } from "../../igs";
import { IGaoShouAPI } from "../../lobby/start/script/iGaoShou";
import HzxlLogic from "../hzxl-logic";
import { PluginMgr } from "../../lobby/start/script/base/PluginMgr";
import { MatchSvr } from "../../lobby/start/script/system/MatchSvr";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjPrivateRoomInfo extends cc.Component {
    perform = null// 比赛信息
    onOpen() {
        console.log("scmjPrivateRoomInfo onOpen", HzxlLogic.getInstance().privateRoomInfo)
        // super.onOpen()

        let matchInfo = MatchSvr.GetMatchInfo(HzxlLogic.getInstance().privateRoomInfo.match_code)
        if(matchInfo){
            let lblWanFa = cc.find("Node/Content/lblWanFa", this.node)
            lblWanFa.getComponent(cc.RichText).string = "<color=#2F3D57>玩法：</c><color=#2F3D57>" + matchInfo.name || "" + "</color>"
        }

        let lblFangHao = cc.find("Node/Content/lblFangHao", this.node)
        lblFangHao.getComponent(cc.RichText).string = "<color=#2F3D57>房号：</c><color=#3c8c45>" + HzxlLogic.getInstance().privateRoomInfo.share_code + "</color>"
        
        let lblJuShu = cc.find("Node/Content/lblJuShu", this.node)
        lblJuShu.getComponent(cc.RichText).string = "局数：<color=#ff1010>" + HzxlLogic.getInstance().privateRoomInfo.base_room_time + "</color>局"

        let ruleArr = HzxlLogic.getInstance().curGameIndependent.getPrivateRoomShowRuleLabels()
        let rule = ""
        let skipCardColor = false
        for (let key of ruleArr) {
            let value = HzxlLogic.getInstance().privateRoomInfo[key]
            if (key == "change_card_num" && value == 0) {
                skipCardColor = true
                rule += this.getPrivateRuleString(key, value) + ","
            } else if (key == "change_card_color" && skipCardColor) {

            } else if (key == "hujiaozhuanyi") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "youquedaque") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "qiangganghu") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "bixuzimo") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "liujusuangang") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "qianggangchengbao") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "gangbaochengbao") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "luodichengbao") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "genzhuang") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "budaifeng") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "jiejiegao") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "wuguijiabei") {
                if (value == 1) {
                    if (HzxlLogic.getInstance().privateRoomInfo["guipai_type"] != 0) {
                        skipCardColor = true
                        rule += this.getPrivateRuleString(key, value) + ","
                    }
                }
            } else if (key == "magengang") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "lastpeng") {
                if (value == 1) {
                    skipCardColor = true
                    rule += this.getPrivateRuleString(key, value) + ","
                }
            } else if (key == "maima_type") {
                if (value == 1) {
                    if (HzxlLogic.getInstance().privateRoomInfo["maima_num"] != 0) {
                        skipCardColor = true
                        rule += this.getPrivateRuleString(key, value) + ","
                    }
                }
            } else if (key == "kaima_type") {
                if (value == 1) {
                    if (HzxlLogic.getInstance().privateRoomInfo["maima_num"] != 0) {
                        skipCardColor = true
                        rule += this.getPrivateRuleString(key, value) + ","
                    }
                }
            } else {
                rule += this.getPrivateRuleString(key, value) + ","
            }
        }
        rule = rule.substring(0, rule.length - 1)
        let lblGuiZe = cc.find("Node/lblGuiZe", this.node)
        lblGuiZe.getComponent(cc.Label).string = rule
    }

    getPrivateRuleString(key, value) {
        if (this.perform == null) {
            let match = MatchSvr.GetMatchInfo(HzxlLogic.getInstance().privateRoomInfo.match_code)
            if (match && match.metadata?.cl_params) {
                let diao = match.metadata.cl_params?.diao
                if (!diao) {
                    return []
                }
                this.perform = diao.perform
            }
        }
        for (let p of this.perform) {
            for (let c of p.content) {
                if (c.data_key === key && (c.value === value || typeof c.value === "undefined")) {
                    if (c.type === "input_control") {
                        return value + p.name
                    } else {
                        return c.name
                    }
                }
            }
        }

        return ""
    }

    onClose() {
        console.log("scmjPrivateRoomInfo onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.CLOSE_PRIVATE_ROOM_INFO, this.onBtnClose, this)

        izx.Button.bindButtonClick("Node/Content/btnCopy", this.node, (sender, data) => {
            izx.log("btnCopy")
            PluginMgr.copyToClipboard(HzxlLogic.getInstance().privateRoomInfo.share_code)
        })
    }

    onBtnClose() {
        console.log("scmjPrivateRoomInfo onBtnClose")
        this.node.destroy()
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.registerEvent()
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
