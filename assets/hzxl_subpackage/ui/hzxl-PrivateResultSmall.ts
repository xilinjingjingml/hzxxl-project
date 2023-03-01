import { SCMJ_EVENT } from "../hzxl-Events";
import { scmjUtil } from "../hzxl-Util";
import { CardArea, CheckType, EventName, GameState } from "../hzxl-Constants";

import { igs } from "../../igs";
let izx = igs.izx
// let BaseUI = izx.BaseUI
import { AudioMgr } from "../hzxl-AudioMgr";
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import { User } from "../../lobby/start/script/data/User";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";
import { PlatformApi } from "../../lobby/start/script/api/platformApi";
import { hzxlMatchMode } from "../hzxl-mctchMode";
import HzxlLogic from "../hzxl-logic";
import { Helper } from "../../lobby/start/script/system/Helper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjPrivateRoomResultSmall extends cc.Component {
    winColor = "#d16320"
    loseColor = "#447acf"

    @property(cc.Node)
    ndBgWin: cc.Node = null;
    @property(cc.Node)
    ndBgLose: cc.Node = null;
    @property(cc.Node)
    centerArea: cc.Node = null
    @property(cc.Node)
    ndBgLiuju: cc.Node = null;

    enableNext = true
    bShowTable = true
    changeMatch = false
    bShowCountdown = true

    onOpen() {
        console.log("scmjPrivateRoomResultSmall onOpen")
        // super.onOpen()
        if (HzxlLogic.getInstance().videoData) {
            let bottomArea = cc.find("Node/BottomArea", this.node)
            if (cc.isValid(bottomArea)) {
                bottomArea.active = false
            }
        } else {
            let delayTime = Number(HzxlLogic.getInstance().privateRoomInfo.ready_wait_time_ts) || 60
            this.scheduleOnce(() => {
                if (this.bShowCountdown) {
                    izx.dispatchEvent(SCMJ_EVENT.START_PRIVATE_ROOM_TIP_TIMER, { type: 1 })
                }
            }, delayTime)
        }
    }

    onClose() {
        console.log("scmjPrivateRoomResultSmall onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_RESULT, this.updateResult, this)
        EventMgr.on("DismissNot", this.DismissNotHandler, this)

        //切后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            scmjUtil.addGameRoundEndHide()
        }, this);

        izx.Button.bindButtonClick("Node/BottomArea/BtnShare", this.node, () => {
            console.log("BtnShare")
            Helper.shareInfo()
        })

        let btnZhiWen = cc.find("Node/BottomArea/BtnZhiWen", this.node)
        btnZhiWen.on(cc.Node.EventType.TOUCH_START, function (event) {
            this.bShowTable = true
            this.scheduleOnce(() => {
                if (this.bShowTable) {
                    if (this.node && this.node.isValid) {
                        let node = cc.find("Node", this.node)
                        if (node && node.isValid) {
                            node.opacity = 0
                        }
                    }
                }
            }, 0.5)
        }, this);
        btnZhiWen.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.bShowTable = false
            cc.find("Node", this.node).opacity = 255
        }, this);
        btnZhiWen.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.bShowTable = false
            cc.find("Node", this.node).opacity = 255
        }, this);
    }

    updateResult(msg, playersData, roomInfo, zhuangUid) {
        console.log("scmjPrivateRoomResultSmall updateResult msg = ", msg)
        console.log("scmjPrivateRoomResultSmall updateResult playersData = ", playersData)
        console.log("scmjPrivateRoomResultSmall updateResult roomInfo = ", roomInfo)

        let lblRoomInfo = cc.find("Node/lblRoomInfo", this.node)
        lblRoomInfo.getComponent(cc.Label).string = "房号：" + HzxlLogic.getInstance().privateRoomInfo.share_code + "       " + Helper.FormatTimeString(HzxlLogic.getInstance().privateRoomInfo.endTime * 1000, "MM/dd hh:mm")

        let player = playersData[0]
        if (player) {
            let playerScore = player.score
            if (playerScore < 0) {
                playerScore = 0
            }
            HzxlLogic.getInstance().playerScore = playerScore

            HzxlLogic.getInstance().protoData["pauseGameNoti"] = { flag: 0, chairId: player.chairId }
        }
        cc.find("Node", this.node).opacity = 255
        this.node.active = true
        this.changeMatch = false
        // this.enableNext = true
        scmjUtil.addGameRoundEndGame()
        let color = msg.score > 0 ? scmjUtil.hex2color(this.winColor) : scmjUtil.hex2color(this.loseColor)
        if (msg.score > 0) {
            AudioMgr.playSound("audio_win")
            this.ndBgWin.active = true
            this.ndBgLose.active = false
            let btnShare = cc.find("Node/BottomArea/BtnShare", this.node)
            btnShare.active = true
            lblRoomInfo.color = scmjUtil.hex2color("#FFE0A4")

            scmjUtil.loadAsset("prefabs/PrivateResultSmallWinItem", cc.Prefab, (res) => {
                if (!cc.isValid(this.centerArea) || !res) {
                    return
                }
                for (let v of msg.data) {
                    let node = cc.instantiate(res)
                    node.parent = this.centerArea
                    let maxFan = -1
                    let maxNum = 0
                    let chairId = 1
                    let maxItem = null
                    for (let v2 of playersData) {
                        if (v2.uid == v.uid) {
                            chairId = v2.chairId
                            break
                        }
                    }
                    if (v.uid == User.OpenID) {
                        let sptBg = cc.find("sptBg", node)
                        sptBg.active = true
                    }
                    let items = null
                    for (let v2 of msg.playerBill) {
                        if (v2.uid == v.uid) {
                            items = v2.items
                            break
                        }
                    }
                    if (items && items.length > 0) {
                        cc.find("ndFan", node).active = true
                        izx.Button.bindButtonClick("ndFan/btnFanMore", node, (sender, data) => {
                            izx.log("result btnMore")
                            izx.dispatchEvent(SCMJ_EVENT.BILL_RSP, { items: items, score: v.score })
                        })

                        maxItem = items[0]
                        for (let v2 of items) {
                            v2.fan = v2.fan || 0
                            if (v2.score > 0 && v2.fan >= 0 && v2.ratio > 0) {
                                if (scmjUtil.FanRatioConfig(v2.fan) >= scmjUtil.FanRatioConfig(maxFan)) {
                                    maxFan = v2.fan
                                    maxItem = v2
                                }
                                maxNum++
                            }
                        }

                        this.setTypeText(node, maxItem.op, maxItem.fan, maxItem.type, maxItem.score, color, maxItem.fans, msg.score)
                    }
                    // this.setRatioText(node, v.ratio, color, v.score)
                    // this.setLine(node, msg.score > 0 ? true : false)
                    // this.setScoreText(node, v.score)
                    // this.setRoleText(node, v.position, color)

                    if (-1 != maxFan) {
                        this.showLeftCards(node, true, maxItem.cards)
                        this.showHandCards(node, true, maxItem.cards, -1, maxFan, maxNum)

                        let sptHu = cc.find("sptHu", node)
                        sptHu.active = true
                    } else {
                        izx.dispatchEvent(SCMJ_EVENT.GET_LEFTCARDS, chairId, (cards) => {
                            this.showLeftCards(node, false, cards)
                        })
                        izx.dispatchEvent(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, chairId, (cards, lack) => {
                            this.showHandCards(node, false, cards, lack)
                        })
                    }

                    if (v.uid == zhuangUid) {
                        let banker = cc.find("ndHead/Banker", node)
                        banker.active = true
                    }

                    UserSrv.GetPlyDetail(v.uid, (ply: IPlayerData) => {
                        if (node && node.isValid) {
                            let head = cc.find("ndHead/HeadMask/Head", node)
                            if (head && head.isValid) {
                                scmjUtil.setupAvatarImage(head, ply.avatar)
                            }
                            let nickname = cc.find("ndHead/Nickname", node)
                            if (nickname && nickname.isValid) {
                                nickname.getComponent(cc.Label).string = ply.userName
                            }
                            let HeadFrame = cc.find("ndHead/HeadFrame", node)
                            if(HeadFrame && HeadFrame.isValid){
                                iGaoShouApi.setHeadVipTxk(HeadFrame, UserSrv.getQpVipLevel(ply))
                            }
                        }
                    })

                    if (v.score > 0) {
                        let lblScore = cc.find("lblWinScore", node)
                        lblScore.active = true
                        lblScore.getComponent(cc.Label).string = "+" + scmjUtil.FormatNumWYCN(Math.abs(v.score))
                    } else {
                        let lblScore = cc.find("lblLoseScore", node)
                        lblScore.active = true
                        lblScore.getComponent(cc.Label).string = "-" + scmjUtil.FormatNumWYCN(Math.abs(v.score))
                    }
                }
            })
        } else {
            AudioMgr.playSound("audio_lose")
            this.ndBgWin.active = false
            this.ndBgLose.active = true
            if (msg.status) {
                this.ndBgWin.active = false
                this.ndBgLose.active = false
                this.ndBgLiuju.active = true
            }
            lblRoomInfo.color = scmjUtil.hex2color("#A4E0FF")

            scmjUtil.loadAsset("prefabs/PrivateResultSmallLoseItem", cc.Prefab, (res) => {
                if (!cc.isValid(this.centerArea) || !res) {
                    return
                }
                for (let v of msg.data) {
                    let maxFan = -1
                    let maxNum = 0
                    let chairId = 1
                    let maxItem = null
                    for (let v2 of playersData) {
                        if (v2.uid == v.uid) {
                            chairId = v2.chairId
                            break
                        }
                    }
                    let node = cc.instantiate(res)
                    node.parent = this.centerArea
                    if (v.uid == User.OpenID) {
                        let sptBg = cc.find("sptBg", node)
                        sptBg.active = true
                    }
                    let items = null
                    for (let v2 of msg.playerBill) {
                        if (v2.uid == v.uid) {
                            items = v2.items
                            break
                        }
                    }
                    if (items && items.length > 0) {
                        cc.find("ndFan", node).active = true
                        izx.Button.bindButtonClick("ndFan/btnFanMore", node, (sender, data) => {
                            izx.log("result btnMore")
                            izx.dispatchEvent(SCMJ_EVENT.BILL_RSP, { items: items, score: v.score })
                        })

                        maxItem = items[0]
                        for (let v2 of items) {
                            v2.fan = v2.fan || 0
                            if (v2.score > 0 && v2.fan >= 0 && v2.ratio > 0) {
                                if (scmjUtil.FanRatioConfig(v2.fan) >= scmjUtil.FanRatioConfig(maxFan)) {
                                    maxFan = v2.fan
                                    maxItem = v2
                                }
                                maxNum++
                            }
                        }

                        this.setTypeText(node, maxItem.op, maxItem.fan, maxItem.type, maxItem.score, color, maxItem.fans, msg.score)
                    }
                    // this.setRatioText(node, v.ratio, color, v.score)
                    // this.setLine(node, msg.score > 0 ? true : false)
                    // this.setScoreText(node, v.score)
                    // this.setRoleText(node, v.position, color)

                    if (-1 != maxFan) {
                        this.showLeftCards(node, true, maxItem.cards)
                        this.showHandCards(node, true, maxItem.cards, -1, maxFan, maxNum)

                        let sptHu = cc.find("sptHu", node)
                        sptHu.active = true
                    } else {
                        izx.dispatchEvent(SCMJ_EVENT.GET_LEFTCARDS, chairId, (cards) => {
                            this.showLeftCards(node, false, cards)
                        })
                        izx.dispatchEvent(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, chairId, (cards, lack) => {
                            this.showHandCards(node, false, cards, lack)
                        })
                    }

                    if (v.uid == zhuangUid) {
                        let banker = cc.find("ndHead/Banker", node)
                        banker.active = true
                    }

                    UserSrv.GetPlyDetail(v.uid, (ply: IPlayerData) => {
                        if (node && node.isValid) {
                            let head = cc.find("ndHead/HeadMask/Head", node)
                            if (head && head.isValid) {
                                scmjUtil.setupAvatarImage(head, ply.avatar)
                            }
                            let nickname = cc.find("ndHead/Nickname", node)
                            if (nickname && nickname.isValid) {
                                nickname.getComponent(cc.Label).string = ply.userName
                            }
                            let HeadFrame = cc.find("ndHead/HeadFrame", node)
                            if(HeadFrame && HeadFrame.isValid){
                                iGaoShouApi.setHeadVipTxk(HeadFrame, UserSrv.getQpVipLevel(ply))
                            }
                        }
                    })
                    if (v.score > 0) {
                        let lblScore = cc.find("lblWinScore", node)
                        lblScore.active = true
                        lblScore.getComponent(cc.Label).string = "+" + scmjUtil.FormatNumWYCN(Math.abs(v.score))
                    } else {
                        let lblScore = cc.find("lblLoseScore", node)
                        lblScore.active = true
                        lblScore.getComponent(cc.Label).string = "-" + scmjUtil.FormatNumWYCN(Math.abs(v.score))
                    }
                }
            })
        }

        let protoData = <any>HzxlLogic.getInstance().protoData
        if (protoData.dismissNot || (protoData.privateRoomResultNoti && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0)) {
            let lblDesc = cc.find("Node/BottomArea/BtnStart/lblDesc", this.node)
            if (lblDesc && lblDesc.isValid) {
                lblDesc.getComponent(cc.Label).string = "查看战绩"
            }
        }

        if(msg.maItems) {
            let maCards = []
            let mapChairldCard = {}
            for (let index = 0; index < msg.maItems.length; index++) {
                const item = msg.maItems[index];
                if (item.cards && item.cards.length > 1) {
                    maCards = item.cards
                }
                // 位置对应的马值
                mapChairldCard[item.chairId] = item.maCards
            }

            let MaPaiArea = cc.find("Node/BottomArea/MaiMaArea/maArea", this.node)
            let label = cc.find("Node/BottomArea/MaiMaArea/label", this.node)
            label.active = true
            for (let i = 1; i <= maCards.length; i++) {
                let mj = cc.find("mj"+i,MaPaiArea)
                mj.active = true
                const card = maCards[i-1]
                for (const key in mapChairldCard) {
                    if (mapChairldCard[key].indexOf(card) != -1) {
                        if (msg.winChairIds.indexOf(parseInt(key)) != -1) {
                            if (parseInt(key) == 1) {
                                cc.find("huang", mj).active = true  
                                cc.find("lan", mj).active = false
                            } 
                        }
                        break
                    }
                }
                let value = cc.find("value", mj)
                scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                    value.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(card)
                })
            }
        }
    }

    showLeftCards(node, haveHu, cards) {
        console.log("scmjPrivateRoomResultSmall showLeftCards ", haveHu, cards)

        if (cards.length == 0) {
            return
        }
        scmjUtil.loadAsset("prefabs/ShowOpCards0", cc.Prefab, (res) => {
            if (!cc.isValid(node) || !res) {
                return
            }
            let nodeArea = cc.instantiate(res)
            nodeArea.parent = node
            nodeArea.name = "showOpCards0"
            nodeArea.scale = 0.5
            nodeArea.x = 0
            nodeArea.y = -43

            // showCards()

            // 解析左手牌
            let groups: number[][] = []
            let group: number[] = []
            for (let v of cards) {
                if (v == -99) {
                    groups.push(group)
                    group = []
                } else {
                    group.push(v)
                }
            }
            izx.log("groups = ", groups)

            for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                let v = groups[groupIndex]
                let ndGroup = cc.find("group" + (groupIndex + 1), nodeArea)
                if (ndGroup && ndGroup.isValid) {
                    for (let v of ndGroup.children) {
                        v.active = false
                    }
                    if (v[0] != v[1]) {
                        v.shift()
                    }
                    if (v.length == 5) {
                        v.shift()
                    }
                    izx.log("group = ", v)
                    for (let i = 0; i < v.length; i++) {
                        ndGroup.active = true
                        let ndCard = cc.find("card" + (i + 1), ndGroup)
                        if (ndCard && ndCard.isValid) {
                            ndCard.active = true
                            let mjCard = ndCard.getComponent("hzxl-Prefab")
                            if (!mjCard) {
                                mjCard = ndCard.addComponent("hzxl-Prefab")
                            }
                            let card = v[i]
                            if (card <= 0) {
                                ndCard.getChildByName("unuse").active = true
                            } else {
                                ndCard.getChildByName("unuse").active = false
                            }
                            mjCard.initMj(1, CardArea.LeftCard, card)
                            mjCard.setOriginPositon()
                        }
                    }
                }
            }
        }, "hzxl_subpackage")
    }

    showHandCards(node, haveHu, cards, lack, fan?, num?) {
        console.log("scmjPrivateRoomResultSmall showHandCards ", haveHu, cards, lack, fan, num)

        scmjUtil.loadAsset("prefabs/HandCards0", cc.Prefab, (res) => {
            if (!cc.isValid(node) || !res) {
                return
            }
            let nodeArea = cc.instantiate(res)
            nodeArea.parent = node
            nodeArea.name = "handCard0"
            nodeArea.scale = 0.35
            nodeArea.x = 0
            nodeArea.y = -40

            // showCards()
            let index = cards.lastIndexOf(-99)
            if (-1 != index) {
                cards = cards.slice(index + 1)
            }

            cards = scmjUtil.sortLack(cards, -1, true)
            let startIndex = (haveHu ? 14 : 13) - cards.length
            for (let i = 0; i < cards.length; i++) {
                let curIndex = i + 1 + startIndex
                let ndCard = cc.find(curIndex.toString(), nodeArea)
                if (ndCard && ndCard.isValid) {
                    ndCard.active = true

                    let mjCard = ndCard.getComponent("hzxl-Prefab")
                    if (!mjCard) {
                        mjCard = ndCard.addComponent("hzxl-Prefab")
                    } else {
                        mjCard.resetPosition()
                    }
                    let card = cards[i]
                    mjCard.initMj(1, CardArea.HandCard, card)
                    mjCard.setOriginPositon()
                    mjCard.removeLackMark()
                    mjCard.drawLackMark(lack)
                }
            }
        }, "hzxl_subpackage")
    }

    setRoleText(node, role, color) {
        let lblRole = <cc.Label>(node.getChildByName("Role").getComponent(cc.Label))
        lblRole.node.color = color
        lblRole.string = role
    }

    setScoreText(node, score) {
        let scoreString = scmjUtil.FormatNumWYCN2(Math.abs(score))

        let lblScore = <cc.Label>(node.getChildByName("Score").getComponent(cc.Label))
        lblScore.string = ""
        if (score <= 0) {
            lblScore.string = "-" + scoreString
            lblScore.node.color = scmjUtil.hex2color("#579a3d")
        } else {
            lblScore.string = "+" + scoreString
            lblScore.node.color = scmjUtil.hex2color("#f46437")
        }
    }

    setLine(node, isWin) {
        scmjUtil.loadAsset("images/result/lose/line", cc.SpriteFrame, (res) => {
            if (isWin) {

            } else {
                if (!cc.isValid(node) || !res) {
                    return
                }
                let line = cc.find("Line", node)
                if (line && line.isValid) {
                    line.getComponent(cc.Sprite).spriteFrame = res
                }
            }
        })
    }

    setRatioText(node, ratio, color, score) {
        let lblRatio = <cc.Label>(node.getChildByName("Ratio").getComponent(cc.Label))
        lblRatio.string = ""
        lblRatio.node.color = color
        if (score <= 0) {
            lblRatio.string = "-" + ratio + "倍"
        } else {
            lblRatio.string = "+" + ratio + "倍"
        }
    }

    setTypeText(node, op, fan, type, score, color, fans, curPlayerScore) {
        let lblType = <cc.RichText>(cc.find("ndFan/lblFan", node).getComponent(cc.RichText))
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
                    fanText += "," + scmjUtil.fanConfig(fans[i])
                }
            }
        }
        if (scmjUtil.isKong(op) == false && fanText.length > 0) {
            cc.find("ndFan", node).active = true
            lblType.string = lblType.string + "(" + fanText + ")"
            if (lblType.string.length > 22) {
                if (curPlayerScore > 0) {
                    lblType.string = "<outline color=#a05c22 width=2><color=#ffffff>" + lblType.string.substring(0, 22) + "...</c></outline>"
                } else {
                    lblType.string = "<outline color=#4c60b7 width=2><color=#ffffff>" + lblType.string.substring(0, 22) + "...</c></outline>"
                }
            } else {
                if (curPlayerScore > 0) {
                    lblType.string = "<outline color=#a05c22 width=2><color=#ffffff>" + lblType.string + "</c></outline>"
                } else {
                    lblType.string = "<outline color=#4c60b7 width=2><color=#ffffff>" + lblType.string + "</c></outline>"
                }
            }
        } else {
            if (curPlayerScore > 0) {
                lblType.string = "<outline color=#a05c22 width=2><color=#ffffff>" + lblType.string + "</c></outline>"
            } else {
                lblType.string = "<outline color=#4c60b7 width=2><color=#ffffff>" + lblType.string + "</c></outline>"
            }
        }
    }

    DismissNotHandler(msg) {
        msg = msg.packet
        // cc.log(msg)
        this.enableNext = false
        if (HzxlLogic.getInstance().bPivateRoom) {
            let lblDesc = cc.find("Node/BottomArea/BtnStart/lblDesc", this.node)
            if (lblDesc && lblDesc.isValid) {
                lblDesc.getComponent(cc.Label).string = "查看战绩"
            }
        }
    }

    onBtnBack() {
        console.log("scmjPrivateRoomResultSmall onBtnBack")
        AudioMgr.playBtn()
        EventMgr.off("DismissNot", this.DismissNotHandler, this)
        this.bShowCountdown = false

        // this.node.active = false
        let protoData = <any>HzxlLogic.getInstance().protoData
        if (protoData.dismissNot || (protoData.privateRoomResultNoti && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0)) {
            this.node.destroy()
            izx.dispatchEvent(SCMJ_EVENT.SHOW_PRIVATE_ROOM_RESULT)
        } else {
            this.node.destroy()
            izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })
            izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.NormalReadyReq)
            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
            izx.dispatchEvent(SCMJ_EVENT.READY_REQ, true)
            this.enableNext = true
        }
    }

    onBtnStart() {
        console.log("scmjPrivateRoomResultSmall onBtnStart", HzxlLogic.getInstance().playerScore)
        AudioMgr.playBtn()
        this.bShowCountdown = false
        let protoData = <any>HzxlLogic.getInstance().protoData
        if (protoData.dismissNot || (protoData.privateRoomResultNoti && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0)) {
            this.node.destroy()
            izx.dispatchEvent(SCMJ_EVENT.SHOW_PRIVATE_ROOM_RESULT)
        } else {
            izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })
            this.node.destroy()
            izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.NormalReadyReq)
            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
            izx.dispatchEvent(SCMJ_EVENT.READY_REQ, true)
            this.enableNext = true
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
        EventMgr.offByTag(this)
    }

    start() {
    }
}
