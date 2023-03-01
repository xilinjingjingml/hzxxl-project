const { ccclass, property } = cc._decorator;

import { igs } from "../../igs";
import { User } from "../../lobby/start/script/data/User";
import { MatchSvr } from "../../lobby/start/script/system/MatchSvr";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";
import { CHAT_TAG } from "../hzxl-Constants";
import { SCMJ_EVENT } from "../hzxl-Events";
import HzxlLogic from "../hzxl-logic";
import { scmjUtil } from "../hzxl-Util";
let izx = igs.izx

@ccclass
export default class scmjPlayerInfo extends cc.Component {
    targetChairId: number = -1
    onOpen() {
        izx.Button.bindButtonClick("node/btnClose", this.node, (sender, data) => {
            this.node.active = false
        })
        izx.Button.bindButtonClick("node/userInfo/emoji/btnFlower", this.node, (sender, data) => {
            this.node.active = false
            izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                if (res) {
                    if (-1 != this.targetChairId) {
                        izx.dispatchEvent(SCMJ_EVENT.CHAT_REQ, { msg: CHAT_TAG.GIFT + 0, targetChairId: scmjUtil.c2s(this.targetChairId) })
                        this.targetChairId = -1
                    }
                }
            })
        })
        izx.Button.bindButtonClick("node/userInfo/emoji/btnEgg", this.node, (sender, data) => {
            this.node.active = false
            izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                if (res) {
                    if (-1 != this.targetChairId) {
                        izx.dispatchEvent(SCMJ_EVENT.CHAT_REQ, { msg: CHAT_TAG.GIFT + 1, targetChairId: scmjUtil.c2s(this.targetChairId) })
                        this.targetChairId = -1
                    }
                }
            })
        })
    }

    initData(param) {
        if (HzxlLogic.getInstance().bPivateRoom) {
            let protoData = <any>HzxlLogic.getInstance().protoData
            if (protoData.ownerNoti && protoData.ownerNoti.owner && User.OpenID == protoData.ownerNoti.owner) {
                cc.find("node/BtnKick", this.node).active = true
                izx.Button.bindButtonClick("node/BtnKick", this.node, (sender, data) => {
                    this.node.active = false
                    iGaoShouApi.KickOut(param.uid)
                })
            } else {
                cc.find("node/BtnKick", this.node).active = false
            }
        } else {
            cc.find("node/BtnKick", this.node).active = false
        }

        console.log("scmjPlayerInfo initData ", param)
        this.targetChairId = param.chairId
        cc.find("node/userInfo/gold/num", this.node).getComponent(cc.Label).string = param.money > 0 ? scmjUtil.FormatNumWYCN2(param.money) : "0"
        let nickname = cc.find("node/userInfo/nickName", this.node)
        let spt = cc.find("node/userInfo/head/spt", this.node)
        let txk = cc.find("node/userInfo/touxiangkuang", this.node)
        let lvNum = cc.find("node/userInfo/lv/num", this.node)
        UserSrv.GetPlyDetail(param.uid, (ply: IPlayerData) => {
            if (nickname && nickname.isValid) {
                nickname.getComponent(cc.Label).string = ply.userName
            }
            if (spt && spt.isValid) {
                scmjUtil.setupAvatarImage(spt, ply.avatar)
            }
            if (txk && txk.isValid) {            
                iGaoShouApi.setHeadVipTxk(txk, UserSrv.getQpVipLevel(ply))
            }
            if (lvNum && lvNum.isValid) {
                lvNum.parent.active = UserSrv.getQpVipLevel(ply) > 0
                lvNum.getComponent(cc.Label).string = "V"+UserSrv.getQpVipLevel(ply)
            }
        })
        cc.find("node/userInfo/winRate", this.node).active = false
        cc.find("node/userInfo/totalGames", this.node).active = false
        if (false && HzxlLogic.getInstance().roomInfo) {
            MatchSvr.getStatisticsMetrics(
                { openid: param.uid, game_gid: HzxlLogic.getInstance().roomInfo.gameGid },
                (msg) => {
                    console.log("scmjPlayerInfo msg = ", msg)
                    cc.find("node/userInfo/winRate/num", this.node).getComponent(cc.Label).string = msg.total_count > 0 ? Math.floor(msg.win_count / msg.total_count * 100) + "%" : "0%"
                    cc.find("node/userInfo/totalGames/num", this.node).getComponent(cc.Label).string = msg.total_count
                }
            )
        }
    }

    onLoad() {
    }

    start() {
        this.onOpen()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
    }
}
