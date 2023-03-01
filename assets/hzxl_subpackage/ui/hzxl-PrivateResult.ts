import { SCMJ_EVENT } from "../hzxl-Events";
import { scmjUtil } from "../hzxl-Util";

import { igs } from "../../igs";
let izx = igs.izx
// let BaseUI = izx.BaseUI
import { AudioMgr } from "../hzxl-AudioMgr";
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import { User } from "../../lobby/start/script/data/User";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";
import HzxlLogic from "../hzxl-logic";
import { Helper } from "../../lobby/start/script/system/Helper";
import { PluginMgr } from "../../lobby/start/script/base/PluginMgr";
import { PrivateRoomSrv } from "../../lobby/start/script/system/PrivateRoomSrv";
import { MatchSvr } from "../../lobby/start/script/system/MatchSvr";
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import { PlatformApi } from "../../lobby/start/script/api/platformApi";
import { GameState } from "../hzxl-Constants";
import hzxlGameIndependent from "../game/hzxlGameIndependent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjPrivateResult extends cc.Component {
    winColor = "#906D3C"
    loseColor = "#465FAA"
    winScoreColor = "#F78947"
    loseScoreColor = "#478FF7"

    enableNext = true

    onOpen() {
        console.log("scmjPrivateResult onOpen")
        // super.onOpen()
        if (HzxlLogic.getInstance().videoData) {
            let bottomArea = cc.find("Node/BottomArea", this.node)
            if (cc.isValid(bottomArea)) {
                bottomArea.active = false
            }
        }
    }

    onClose() {
        console.log("scmjPrivateResult onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_PRIVATE_ROOM_RESULT, this.updatePrivateRoomResult, this)
        EventMgr.on("DismissNot", this.DismissNotHandler, this)

        izx.Button.bindButtonClick("Node/BottomArea/BtnRecord", this.node, () => {
            console.log("BtnRecord")
            let param = {
                room_id: HzxlLogic.getInstance().privateRoomInfo.roomId,
                round: 1
            }
            PrivateRoomSrv.GetReplay(param, (res) => {
                if (res.err) {
                    Helper.OpenTip("录像不存在")
                } else {
                    res.room_id = param.room_id
                    PlatformApi.joinPlayVideoGame(HzxlLogic.getInstance().privateRoomInfo.gameGid, res)
                }
            })
        })

        izx.Button.bindButtonClick("Node/BottomArea/BtnShare", this.node, () => {
            console.log("BtnShare")
            Helper.shareInfo()
        })

        izx.Button.bindButtonClick("Node/BottomArea/BtnZhanJi", this.node, () => {
            console.log("BtnZhanJi")

            PrivateRoomSrv.GetDescGameResult({ room_id: HzxlLogic.getInstance().privateRoomInfo.roomId }, (res) => {
                console.log("GetDescGameResult res", res)
                if (cc.isValid(this.node)) {
                    let data = res
                    let matchInfo = MatchSvr.GetMatchInfo(data.info.match_cid)
                    let rule = matchInfo.name//"血流红中-4红中 8局"
                    let share_code = data.info.share_code
                    data.info.round_num = data.info.round_num || 0
                    let msg = DataMgr.data.Config.gameName + " " + Helper.FormatTimeString(data.info.update_time * 1000, "yyyy-MM-dd hh:mm:ss") + "\r\n"
                        + rule + " 房间号：" + share_code + "  " + data.info.round_num + "/" + data.info.max_round + "局\r\n"
                        + "======玩家战绩======" + "\r\n"
                    for (let player of data.info.players) {
                        player.win_lose = player.win_lose || 0
                        msg += "昵称：" + player.nickname
                        if (player.labels) {
                            for (let v of player.labels) {
                                if (v.indexOf("owner") >= 0) {
                                    msg += "(房主)"
                                }
                            }
                        }
                        msg += "\r\n"
                        msg += "ID：" + player.openid + "\r\n"
                        msg += "积分：" + player.win_lose + "\r\n"
                        msg += "------------------" + "\r\n"
                    }
                    PluginMgr.copyToClipboard(msg)
                }
            })
        })

        izx.Button.bindButtonClick("Node/BottomArea/BtnScreenshot", this.node, () => {
            console.log("BtnScreenshot")
        })
    }

    updatePrivateRoomResult(playersData) {
        let msg = HzxlLogic.getInstance().protoData["privateRoomResultNoti"]
        console.log("scmjPrivateResult updatePrivateRoomResult msg = ", msg)
        console.log("scmjPrivateResult updatePrivateRoomResult playersData = ", playersData)

        let protoData = <any>HzxlLogic.getInstance().protoData
        let lblRoomInfo = cc.find("Node/lblRoomInfo", this.node)
        if(HzxlLogic.getInstance().isGdmj()) {
            lblRoomInfo.getComponent(cc.Label).string = "广东推倒胡   局数" + protoData.rountCountNoti.ju + "/" + HzxlLogic.getInstance().privateRoomInfo.base_room_time + "    房间号：" + HzxlLogic.getInstance().privateRoomInfo.share_code
        } else {
            lblRoomInfo.getComponent(cc.Label).string = "红中血流   " + HzxlLogic.getInstance().privateRoomInfo.hongzhong_num + "红中  局数" + protoData.rountCountNoti.ju + "/" + HzxlLogic.getInstance().privateRoomInfo.base_room_time + "    房间号：" + HzxlLogic.getInstance().privateRoomInfo.share_code
        }
        let lblTimeInfo = cc.find("Node/lblTimeInfo", this.node)
        lblTimeInfo.getComponent(cc.Label).string = "开始：" + Helper.FormatTimeString(HzxlLogic.getInstance().privateRoomInfo.create_time, "MM/dd hh:mm") + "       结束：" + Helper.FormatTimeString(HzxlLogic.getInstance().privateRoomInfo.endTime * 1000, "MM/dd hh:mm")

        let playerPos = [cc.v2(-440, 0), cc.v2(-147, 0), cc.v2(147, 0), cc.v2(440, 0)]
        let curIndex = 0
        let maxWinIndex = []
        let tempMaxAmout = 0
        scmjUtil.loadAsset("prefabs/PrivateResultPlayer", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }
            for (let i = 0; i < HzxlLogic.getInstance().maxPlyNum; i++) {
                let node = cc.instantiate(res)
                node.name = i.toString()
                node.parent = cc.find("Node/CenterArea", this.node)
                let index = scmjUtil.s2c(i) - 1
                if (HzxlLogic.getInstance().maxPlyNum == 3) {
                    if (index == 3) {
                        index = 2
                    }
                }
                if (HzxlLogic.getInstance().maxPlyNum == 2) {
                    if (index == 2) {
                        index = 1
                    }
                }
                node.position = playerPos[index]
                let color = scmjUtil.hex2color(this.winColor)
                let v = msg.gameStatiscs[curIndex]
                if (v.amount <= 0) {
                    let sptBgLose = cc.find("sptBgLose", node)
                    if (sptBgLose && sptBgLose.isValid) {
                        sptBgLose.active = true
                    }
                    color = scmjUtil.hex2color(this.loseColor)
                } else if (v.amount > 0) {
                    let sptBgWin = cc.find("sptBgWin", node)
                    if (sptBgWin && sptBgWin.isValid) {
                        sptBgWin.active = true
                    }
                    if (v.amount > tempMaxAmout) {
                        maxWinIndex = []
                        maxWinIndex.push(i)
                        tempMaxAmout = v.amount
                    } else if (v.amount == tempMaxAmout) {
                        maxWinIndex.push(i)
                    }
                }
                this.setZiMoText(node, v.huNum, color)
                this.setDianPaoText(node, v.dianPaoNum, color)
                this.setGangPaiText(node, v.gangNum, color)
                if(HzxlLogic.getInstance().isGdmj()) {
                    this.setLianZhuangText(node, v.lianZhuangNum, color)
                } else {
                    this.setChaDaJiaoText(node, v.chaDaJiaoNum, color)
                }
                this.setAmountText(node, v.amount)
                if (index < playersData.length) {
                    UserSrv.GetPlyDetail(playersData[index].uid, (ply: IPlayerData) => {
                        if (node && node.isValid) {
                            let head = cc.find("HeadMask/Head", node)
                            if (head && head.isValid) {
                                scmjUtil.setupAvatarImage(head, ply.avatar)
                            }
                            let nickname = cc.find("Nickname", node)
                            if (nickname && nickname.isValid) {
                                nickname.color = color
                                nickname.getComponent(cc.Label).string = ply.userName.substring(0, 4) + "..."
                            }
                            let id = cc.find("ID", node)
                            if (id && id.isValid) {
                                id.color = color
                                let showId = ply.openId.split("-")
                                id.getComponent(cc.Label).string = "ID:" + showId[showId.length - 1]
                            }
                            let HeadFrame = cc.find("HeadFrame", node)
                            if(HeadFrame && HeadFrame.isValid){
                                iGaoShouApi.setHeadVipTxk(HeadFrame, UserSrv.getQpVipLevel(ply))
                            }
                        }
                    })
                    let protoData = <any>HzxlLogic.getInstance().protoData
                    if (protoData.dismissNot && protoData.dismissNot.code == 3) { // 超时解散房间
                        if (protoData.pauseGameNoti && protoData.pauseGameNoti.flag == 0) {
                            if (scmjUtil.s2c(protoData.pauseGameNoti.chairId) == playersData[index].chairId) {
                                let sptJiaoBiao = cc.find("sptJiaoBiao", node)
                                if (sptJiaoBiao && sptJiaoBiao.isValid) {
                                    sptJiaoBiao.active = true
                                }
                            }
                        }
                    }
                }
                ++curIndex
            }

            if (maxWinIndex.length > 0) {
                for (let v of maxWinIndex) {
                    let sptMaxWin = cc.find("Node/CenterArea/" + v + "/SptMaxWin", this.node)
                    if (sptMaxWin && sptMaxWin.isValid) {
                        sptMaxWin.active = true
                    }
                }
            }
        })
    }

    setZiMoText(node, num, color) {
        let lblZiMo = node.getChildByName("LblZiMo")
        lblZiMo.color = color

        let lblNum = <cc.Label>(node.getChildByName("LblZiMoNum").getComponent(cc.Label))
        lblNum.string = num
        lblNum.node.color = color
    }

    setDianPaoText(node, num, color) {
        let lblDianPao = node.getChildByName("LblDianPao")
        lblDianPao.color = color

        let lblNum = <cc.Label>(node.getChildByName("LblDianPaoNum").getComponent(cc.Label))
        lblNum.string = num
        lblNum.node.color = color
    }

    setGangPaiText(node, num, color) {
        let lblGangPai = node.getChildByName("LblGangPai")
        lblGangPai.color = color

        let lblNum = <cc.Label>(node.getChildByName("LblGangPaiNum").getComponent(cc.Label))
        lblNum.string = num
        lblNum.node.color = color
    }

    setChaDaJiaoText(node, num, color) {
        let lblChaDaJiao = node.getChildByName("LblChaDaJiao")
        lblChaDaJiao.active = true
        lblChaDaJiao.color = color

        let lblNum = <cc.Label>(node.getChildByName("LblChaDaJiaoNum").getComponent(cc.Label))
        lblNum.node.active = true
        lblNum.string = num
        lblNum.node.color = color
    }

    setLianZhuangText(node, num, color) {
        let LblLianZhuang = node.getChildByName("LblLianZhuang")
        LblLianZhuang.active = true
        LblLianZhuang.color = color

        let lblNum = <cc.Label>(node.getChildByName("LblLianZhuangNum").getComponent(cc.Label))
        lblNum.node.active = true
        lblNum.string = num ? num : 0
        lblNum.node.color = color
    }

    setAmountText(node, score) {
        let scoreString = scmjUtil.FormatNumWYCN2(Math.abs(score))

        let lblScore = <cc.Label>(node.getChildByName("LblScore").getComponent(cc.Label))
        lblScore.string = ""
        if (score <= 0) {
            lblScore.string = "-" + scoreString
            lblScore.node.color = scmjUtil.hex2color(this.loseScoreColor)
        } else {
            lblScore.string = "+" + scoreString
            lblScore.node.color = scmjUtil.hex2color(this.winScoreColor)
        }
    }

    DismissNotHandler(msg) {
        msg = msg.packet
        // cc.log(msg)

        this.enableNext = false
    }

    onBtnBack() {
        console.log("scmjPrivateResult onBtnBack")
        AudioMgr.playBtn()
        EventMgr.off("DismissNot", this.DismissNotHandler, this)
        this.node.destroy()
        izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })
        if (HzxlLogic.getInstance().videoData) {
            izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.NormalReadyReq)
            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
            this.enableNext = true
        } else {
            izx.dispatchEvent(SCMJ_EVENT.MAIN_TOP_AREA_BTN_EXIT)
        }
    }

    onBtnStart() {
        console.log("scmjPrivateResult onBtnStart", HzxlLogic.getInstance().playerScore)

        this.onBtnBack()
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.registerEvent()
        this.onOpen()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
        EventMgr.offByTag(this)
    }

    start() {
    }

    // update() {
    // }
}
