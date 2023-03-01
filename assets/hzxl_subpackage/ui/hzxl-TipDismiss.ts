import { SCMJ_EVENT } from "../hzxl-Events";
import { scmjUtil } from "../hzxl-Util";
import { CheckType } from "../hzxl-Constants";
import { igs } from "../../igs";
import BaseUI from "../../lobby/start/script/base/BaseUI";
import { Player } from "../../lobby/start/script/api/playerApi";
import { User } from "../../lobby/start/script/data/User";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";
import { Helper } from "../../lobby/start/script/system/Helper";
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import HzxlLogic from "../hzxl-logic";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class TipDismiss extends BaseUI {

    @property(cc.Label)
    label1: cc.Label = null;
    @property(cc.Node)
    items: cc.Node = null
    @property(cc.Node)
    layout: cc.Node = null

    @property(cc.Label)
    labelAgree: cc.Label = null;

    @property(cc.Label)
    labelTips: cc.Label = null;

    @property(cc.Node)
    BtnArea: cc.Node = null

    msgBase: any = null
    count: number = 0

    onOpen() {
        this.initEvent()
        cc.game.on(cc.game.EVENT_SHOW, () => {
            this.timeShow = Math.floor(new Date().getTime() / 1000)
            if (this.msgBase) {
                this.count = this.timeShow - this.msgBase.applyTime
            }
        }, this);
    }

    initEvent() {
        EventMgr.on("ReplyDismissRsp", this.ReplyDismissRspHandle, this)
        EventMgr.on("ReplyDismissNot", this.ReplyDismissNotHandle, this)
    }

    timeShow: number = 0
    timeSchedule = null

    init(msg) {
        this.msgBase = msg
        console.log("TipDismiss onOpen")
        // 发起人的用户id
        const openid = msg.openid

        UserSrv.GetPlyDetail(openid, (ply: IPlayerData) => {
            if (this.label1 && this.label1.node && this.label1.node.isValid) {
                if (ply.userName.length > 3) {
                    this.label1.string = "【" + ply.userName.substring(0, 3) + "...】"
                } else {
                    this.label1.string = "【" + ply.userName + "】"
                }
            }
        })

        msg.status.forEach(player => {
            if (player.openid == User.OpenID) {
                let now = Math.floor(new Date().getTime() / 1000)
                this.count = now - msg.applyTime
                if (player.reply) {
                    this.BtnArea.active = false
                    if (!this.timeSchedule) {
                        this.timeSchedule = setInterval(() => {
                            if (this.labelTips && this.labelTips.node && this.labelTips.isValid) {
                                this.labelTips.string = "（" + (msg.expire - this.count) + "秒未处理，默认同意）"
                            }
                            this.count++
                        }, 1000);
                    }
                } else {
                    this.BtnArea.active = true
                    if (!this.timeSchedule) {
                        this.timeSchedule = setInterval(() => {
                            if (msg.expire - this.count <= 0) {
                                if (this.labelTips && this.labelTips.node && this.labelTips.isValid) {
                                    this.labelTips.string = "（0秒未处理，默认同意）"
                                }
                                if (this.timeSchedule) {
                                    clearInterval(this.timeSchedule)
                                    this.timeSchedule = null
                                }
                                this.onBtnAgree()
                            } else {
                                if (this.labelAgree && this.labelAgree.node && this.labelAgree.isValid) {
                                    this.labelAgree.string = "同意(" + (msg.expire - this.count) + "s)"
                                }
                                if (this.labelTips && this.labelTips.node && this.labelTips.isValid) {
                                    this.labelTips.string = "（" + (msg.expire - this.count) + "秒未处理，默认同意）"
                                }
                            }
                            this.count++
                        }, 1000);
                    }
                }
            }
        })
        this.genUseritem(msg)
    }

    genUseritem(msg) {
        msg.status.forEach(player => {
            if (player.openid != User.OpenID) {
                let node = cc.instantiate(this.items)
                node.active = true
                node.name = player.openid
                node.parent = this.layout
                let protoData = <any>HzxlLogic.getInstance().protoData
                if (protoData.ownerNoti && protoData.ownerNoti.owner && player.openid == protoData.ownerNoti.owner) {
                    node.getChildByName("Sptfangzhu").active = true
                } else {
                    node.getChildByName("Sptfangzhu").active = false
                }
                UserSrv.GetPlyDetail(player.openid, (ply: IPlayerData) => {
                    if (node && node.isValid) {
                        this.setLabelValue(node.getChildByName("name"), ply.userName.substring(0, 4) + "...")
                        this.setSpriteFrame("HeadMask/head", node, ply.avatar)
                        iGaoShouApi.setHeadVipTxk(cc.find("HeadFrame", node), UserSrv.getQpVipLevel(ply))
                    }
                })
                node.getChildByName("check").active = player.reply
                node.getChildByName("nocheck").active = !player.reply
            }
        });
    }

    onClose() {
        console.log("TipDismiss onClose")
        // super.onClose()
        if (this.timeSchedule) {
            clearInterval(this.timeSchedule)
            this.timeSchedule = null
        }
        this.node.destroy()
    }
    // 注册事件
    registerEvent() {

    }

    onBtnAgree() {
        console.log("TipDismiss onBtnAgree")
        // 同意解散
        iGaoShouApi.ReplyDismiss(true)
        if (this.BtnArea && this.BtnArea.isValid) {
            this.BtnArea.active = false
        }
    }

    onBtnRefuse() {
        console.log("TipDismiss onBtnRefuse")
        //拒绝解散
        //  发送拒绝请求
        iGaoShouApi.ReplyDismiss(false)
        this.close()
    }

    ReplyDismissNotHandle(msg) {
        msg = msg.packet
        console.log("ReplyDismissNotHandle", msg)
        if (msg.reply) {
            if (cc.find(msg.openid, this.layout)) {
                cc.find(msg.openid + "/check", this.layout).active = true
                cc.find(msg.openid + "/nocheck", this.layout).active = false
            }
        } else {
            // 有人拒绝，解散失败
            this.close()
            if (msg.openid != User.OpenID) {
                Helper.OpenTip("玩家拒绝解散")
            }
        }
    }

    ReplyDismissRspHandle(msg) {
        msg = msg.packet
        console.log("ReplyDismissRspHandle", msg)
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.registerEvent()
        this.onOpen()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        if (this.timeSchedule) {
            clearInterval(this.timeSchedule)
            this.timeSchedule = null
        }
        izx.offByTag(this)
        EventMgr.off("ReplyDismissRsp", this.ReplyDismissRspHandle, this)
        EventMgr.off("ReplyDismissNot", this.ReplyDismissNotHandle, this)
    }

    start() {
    }

    // update (dt) {}
}
