import { SCMJ_EVENT } from "../hzxl-Events";
import { scmjUtil } from "../hzxl-Util";
import { CheckType } from "../hzxl-Constants";
import { igs } from "../../igs";
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import { Constants } from "../../lobby/start/script/igsConstants";
import HzxlLogic from "../hzxl-logic";
import { User } from "../../lobby/start/script/data/User";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjBill extends cc.Component {
    winColor = "#FF0000"
    loseColor = "#008000"

    @property(cc.RichText)
    lblAddScore: cc.RichText = null;
    @property(cc.Node)
    ndEmpty: cc.Node = null;
    @property(cc.Node)
    ndContent: cc.Node = null;
    @property(cc.Node)
    ndBills: cc.Node = null;

    curTip: cc.Node = null
    redZhongNum: number = 0
    bLoadTip: boolean = false

    onOpen() {
        console.log("scmjBill onOpen")
        // super.onOpen()

        if (HzxlLogic.getInstance().bPivateRoom) {
            this.lblAddScore.string = User.UserName + "本局输赢：<color=#ff0000>+0</color>"
        } else {
            let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
            if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties && matchInfo.metadata.gs_properties.red_zhong) {
                this.redZhongNum = matchInfo.metadata.gs_properties.red_zhong
                if (8 == this.redZhongNum) {
                    this.lblAddScore.string = "本局当前输赢金豆：<color=#ff0000>+0</color>"
                }
            }
        }

        let env = ""
        let igsEnv = DataMgr.getData(Constants.DATA_DEFINE.IGS_ENV)
        if (igsEnv == Constants.ENV.ENV_SANDBOX) {
            env = ".t"
        } else if (igsEnv == Constants.ENV.ENV_ABROAD) {
            env = ".a"
        }
        let ver = cc.find("version/ver", this.node)
        ver.getComponent(cc.Label).string = Constants.version + "." + Constants.auditCode + "." + scmjUtil.GAME_VERSION + env
    }

    onClose() {
        console.log("scmjBill onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_BILL, this.updateBill, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.reset, this)
        izx.on(SCMJ_EVENT.HIDE_UI, this.hideUi, this)

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.curTip) {
                this.curTip.active = false
            }
        }, this, true);
    }

    reset() {
        this.node.active = false
        if (HzxlLogic.getInstance().bPivateRoom) {
            this.lblAddScore.string = User.UserName + "本局输赢：<color=" + this.loseColor + ">0</color>"
        } else {
            if (this.lblAddScore && this.lblAddScore.isValid) {
                this.lblAddScore.string = "本局当前金币：<color=" + this.loseColor + ">0</color>"
            }
        }
        if (this.ndBills && this.ndBills.isValid) {
            this.ndBills.removeAllChildren()
        }
    }

    updateBill(msg) {
        console.log("scmjBill updateBill msg = ", msg)
        this.node.active = true
        if (msg.items.length == 0) {
            this.ndContent.active = false
            this.ndEmpty.active = true
            return
        } else {
            this.ndContent.active = true
            this.ndEmpty.active = false
        }
        let score = msg.score > 0 ? "+" + scmjUtil.FormatNumWYCN2(msg.score) : "-" + scmjUtil.FormatNumWYCN2(Math.abs(msg.score))
        let color = msg.score > 0 ? this.winColor : this.loseColor
        if (HzxlLogic.getInstance().bPivateRoom) {
            let text = "<color=#b06b44>" + User.UserName + "本局输赢：</c><color=" + color + ">" + score + "</color>"
            this.lblAddScore.string = text
        } else {
            let text = "<color=#b06b44>本局当前输赢金币：</c><color=" + color + ">" + score + "</color>"
            if (8 == this.redZhongNum) {
                text = "<color=#b06b44>本局当前输赢金豆：</c><color=" + color + ">" + score + "</color>"
            }
            this.lblAddScore.string = text
        }
        this.ndBills.removeAllChildren()
        scmjUtil.loadAsset("prefabs/BillItem", cc.Prefab, (res) => {
            if (cc.isValid(this.ndBills) && res) {
                for (let v of msg.items) {
                    let node = cc.instantiate(res)
                    node.parent = this.ndBills
                    this.setTypeText(node, v.op, v.fan, v.type, v.score, v.fans)
                    this.setRatioText(node, v.ratio, v.score)
                    this.setScoreText(node, v.score)
                    this.setRoleText(node, v.position)
                }
            }
        })
    }

    setRoleText(node, role) {
        let lblRole = <cc.Label>(node.getChildByName("Role").getComponent(cc.Label))
        lblRole.string = role
    }

    setScoreText(node, score) {
        let scoreString = scmjUtil.FormatNumWYCN2(Math.abs(score))

        let lblScore = <cc.Label>(node.getChildByName("Score").getComponent(cc.Label))
        lblScore.string = ""
        if (score <= 0) {
            lblScore.string = "-" + scoreString
            lblScore.node.color = scmjUtil.hex2color(this.loseColor)
        } else {
            lblScore.string = "+" + scoreString
            lblScore.node.color = scmjUtil.hex2color(this.winColor)
        }
    }

    setRatioText(node, ratio, score) {
        let lblRatio = <cc.Label>(node.getChildByName("Ratio").getComponent(cc.Label))
        lblRatio.string = ""
        if (score <= 0) {
            lblRatio.string = "-" + ratio + "倍"
        } else {
            lblRatio.string = "+" + ratio + "倍"
        }
    }

    setTypeText(node, op, fan, type, score, fans) {
        let lblType = <cc.Label>(node.getChildByName("Type").getComponent(cc.Label))
        lblType.string = ""
        let preText = ""
        if (type == CheckType.CheckTypeNone) {
            preText = scmjUtil.opcodeConfig(op)
        } else {
            preText = scmjUtil.checkTypeConfig(type)
        }
        if (preText != "" && score <= 0) {
            preText = "被" + preText
        }
        lblType.string = preText
        let fanText = scmjUtil.fanConfig(fan)
        if (fans && fans.length > 0) {
            fanText = ""
            for (let i = 0; i < fans.length; i++) {
                if (fanText.length == 0) {
                    fanText += scmjUtil.fanConfig(fans[i])
                } else {
                    if (scmjUtil.fanConfig(fans[i])) {
                        fanText += "," + scmjUtil.fanConfig(fans[i])
                    }
                }
            }
        }
        if (scmjUtil.isKong(op) == false && fanText.length > 0) {
            lblType.string = lblType.string + "(" + fanText + ")"
            if (lblType.string.length > 8) {
                lblType.string = lblType.string.substring(0, 8) + "..."
                let btnMore = node.getChildByName("BtnMore")
                btnMore.active = true
                izx.Button.bindButtonClick(btnMore, node, (sender, data) => {
                    izx.log("bill btnMore")
                    if (this.bLoadTip) {
                        return
                    }
                    if (!this.curTip) {
                        this.bLoadTip = true
                        scmjUtil.loadAsset("prefabs/BillItemMore", cc.Prefab, (res) => {
                            if (cc.isValid(this.node) && res) {
                                this.curTip = cc.instantiate(res)
                                let lblDesc = cc.find("Bg/lblDesc", this.curTip)
                                lblDesc.getComponent(cc.Label).string = fanText
                                this.curTip.parent = this.node
                                let wpos = btnMore.parent.convertToWorldSpaceAR(btnMore.position)
                                let npos = this.node.convertToNodeSpaceAR(wpos)
                                npos.y += 40
                                this.curTip.position = npos
                                this.curTip.active = true
                            }

                            this.bLoadTip = false
                        })
                    } else {
                        let lblDesc = cc.find("Bg/lblDesc", this.curTip)
                        lblDesc.getComponent(cc.Label).string = fanText
                        this.curTip.active = true
                        let wpos = btnMore.parent.convertToWorldSpaceAR(btnMore.position)
                        let npos = this.node.convertToNodeSpaceAR(wpos)
                        npos.y += 40
                        this.curTip.position = npos
                        this.curTip.active = true
                    }
                })
            }
        }
    }

    onBtnClose() {
        console.log("scmjBill onBtnClose")
        this.node.active = false
    }

    hideUi() {
        if (this.node.active) {
            this.node.active = false
        }
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
