import { SCMJ_EVENT } from "../hzxl-Events"
import { CardArea, OperatorCode } from "../hzxl-Constants";
import { scmjUtil } from "../hzxl-Util";

import { igs } from "../../igs";
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import { Constants } from "../../lobby/start/script/igsConstants";
import { AudioMgr } from "../hzxl-AudioMgr";
import HzxlLogic from "../hzxl-logic";
import { User } from "../../lobby/start/script/data/User";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;
@ccclass
export default class mjAnimation extends cc.Component {
    @property(cc.Node)
    cardLayer = null

    mjLayerS = null
    fanData = null

    second1 = 15
    rechargeChairId1 = -1
    // count1 = 0

    second2 = 15
    rechargeChairId2 = -1
    // count2 = 0

    second3 = 15
    rechargeChairId3 = -1
    // count3 = 0

    second4 = 15
    rechargeChairId4 = -1
    // count4 = 0
    touchIndex = -1

    isForeground = true

    aniHuPrefabName = {
        "01": "prefabs/AniHu0_1", // 十八罗汉
        "41": "prefabs/AniHu4_1", // 九莲宝灯
        "61": "prefabs/AniHu6_1", // 天胡
        "71": "prefabs/AniHu7_1", // 地胡
        "151": "prefabs/AniHu15_1", // 清一色
        "152": "prefabs/AniHu15_2", // 清一色
        "153": "prefabs/AniHu15_2", // 清一色
        "154": "prefabs/AniHu15_2", // 清一色
        "171": "prefabs/AniHu17_1", // 杠上开花
        "341": "prefabs/AniHu34_1", // 海底捞月
        "351": "prefabs/AniHu35_1", // 妙手回春
        "481": "prefabs/AniHu48_1", // 五行八卦
        "531": "prefabs/AniHu53_1", // 三节高
        "571": "prefabs/AniHu57_1", // 十二金钗
        "581": "prefabs/AniHu58_1", // 四节高
        "661": "prefabs/AniHu66_1", // 四暗刻
        "701": "prefabs/AniHu70_1", // 一色双龙会
    }

    refreshHandcardsAfterPlay(putCard) {
        let chairId = putCard.chairId
        let name = putCard.node.name
        let value = putCard.cValue
        let noti = this.mjLayerS.mapCards[chairId]
        if (name.indexOf("14") != -1) {
            noti.card = 0
        } else {// if (name.indexOf("curcard") != -1) {
            for (let index = 0; index < noti.handcards.length; index++) {
                if (noti.handcards[index] == value) {
                    delete noti.handcards[index]
                    break
                }
            }
            let handcards = []
            for (let index = 0; index < noti.handcards.length; index++) {
                if (noti.handcards[index]) {
                    handcards.push(noti.handcards[index])
                }
            }
            if (noti.card != 0) {
                handcards.push(noti.card)
                noti.card = 0
            }
            noti.handcards = handcards
        }

        izx.log("refreshHandcards noti = ", noti)
        this.mjLayerS.refleshLeftcards(noti.chairId, noti.leftcards)
        this.mjLayerS.refleshHandcards(noti.chairId, noti.handcards)
        // this.mjLayerS.refleshCurCard(noti.chairId, noti.card)
    }

    aniPlayCard(msg) {
        izx.log("aniPlayCard msg = ", msg)
        if (this.mjLayerS.ndPlayMark) {
            this.mjLayerS.ndPlayMark.active = false
        }
        let chairId = msg.chairId
        let touchCard = msg.touchCard
        if (touchCard == null) {
            touchCard = this.getPlayCard(chairId, msg.card)
            if (touchCard == null) {
                izx.log("aniPlayCard error touchCard")
                return
            }
            // touchCard = touchCard.getComponent("hzxl-Prefab")
        }
        let cards = this.mjLayerS.mapCards[chairId].dispcards
        // let cValue = touchCard.cValue
        let cValue = msg.card || msg.touchCard.cValue
        if (cValue <= 0 && msg.card) {
            cValue = msg.card
        }
        cards.push(cValue)
        // let putCard = this.getPutCard(chairId, cValue, msg.lack || msg.touchCard.cLack)
        if (1 == chairId) {
            let putCard = touchCard.getComponent("hzxl-Prefab")

            let endCard = this.mjLayerS.refleshDisplaycards(chairId, cards)
            if (endCard) {
                let time = 0.15
                let scale = endCard.scale
                let sPos = putCard.node.parent.convertToWorldSpaceAR(putCard.node.position)
                sPos = endCard.parent.convertToNodeSpaceAR(sPos)
                let toPos = endCard.position
                var bezier = [cc.v2(sPos.x, sPos.y), cc.v2(sPos.x, toPos.y), toPos]
                var bezierTo = cc.bezierTo(time, bezier)

                endCard.position = sPos
                endCard.scale = 2
                endCard.runAction(cc.sequence(cc.spawn(bezierTo, cc.scaleTo(time, scale)), cc.callFunc(() => {
                    if (this.mjLayerS.ndPlayMark) {
                        let wpos = endCard.getParent().convertToWorldSpaceAR(endCard.position)
                        wpos.y += 35
                        this.mjLayerS.ndPlayMark.position = this.mjLayerS.ndPlayMark.parent.convertToNodeSpaceAR(wpos)
                        this.mjLayerS.ndPlayMark.active = true
                    }
                })))
            }
        } else {
            let putCard = this.getPutCard(chairId, cValue, touchCard.cLack)

            let endCard = this.mjLayerS.refleshDisplaycards(chairId, cards)
            if (endCard) {
                endCard.opacity = 0
                let time = 0.15
                let scale = endCard.scale
                let toPos = endCard.parent.convertToWorldSpaceAR(endCard.position)
                toPos = putCard.node.parent.convertToNodeSpaceAR(toPos)
                let sPos = putCard.node.position
                var bezier = [cc.v2(sPos.x, sPos.y), cc.v2(sPos.x, toPos.y), toPos]
                var bezierTo = cc.bezierTo(time, bezier)
                // let rotation = 0
                // if (2 == chairId) {
                // 	rotation = 90
                // } else if (3 == chairId) {
                // 	rotation = -180
                // } else if (4 == chairId) {
                // 	rotation = -90
                // }
                // let actionRotation = cc.rotateTo(time, rotation)

                putCard.node.runAction(cc.sequence(cc.spawn(bezierTo, cc.scaleTo(time, scale)), cc.callFunc(() => {
                    if (this.mjLayerS.ndPlayMark) {
                        this.mjLayerS.ndPlayMark.active = true
                    }
                    endCard.opacity = 255
                    // this.refreshHandcardsAfterPlay(touchCard)
                    putCard.node.active = false
                    putCard.resetPosition()
                    putCard.node.scale = 1
                    putCard.node.angle = 0
                    // })).easing(cc.easeExponentialIn()))
                })))
            }
        }
    }

    aniMoPai(msg) {
        // izx.log("aniMoPai msg = ", msg)
        let noti = this.mjLayerS.mapCards[msg.chairId]
        if (noti) {
            noti.card = msg.card
            this.mjLayerS.refleshCurCard(msg.chairId, msg.card)
        }
    }

    getPlayCard(chairId, value) {
        izx.log("getPlayCard chairId = ", chairId, scmjUtil.s2c(chairId))
        izx.log("getPlayCard value = ", value)
        console.log("getPlayCard touchIndex ", this.touchIndex)
        if (this.mjLayerS == null) {
            return null
        }
        let name = "handCard" + (chairId - 1) + "/layer1"
        let area = scmjUtil.pathNode(name, this.mjLayerS.mapNodePaths, this.node)
        let handCount = 0
        let curIndex = 0
        for (let card of area.children) {
            if (card.active) {
                if (chairId == 1) {
                    if (-1 != this.touchIndex) {
                        if (this.touchIndex == curIndex) {
                            this.touchIndex = -1
                            return card
                        }
                    } else {
                        let card14 = cc.find("14", area)
                        if (card14 && card14.isValid && card14.getComponent("hzxl-Prefab").cValue == value) {
                            return card14
                        }
                        if (card.getComponent("hzxl-Prefab").cValue == value) {
                            return card
                        }
                    }
                } else {
                    let card14 = cc.find("14", area)
                    if (card14 && card14.isValid) {
                        return card14
                    }
                    handCount++
                    card = cc.find(handCount.toString(), area)
                    if (card && card.isValid) {
                        return card
                    }
                }
            }
            curIndex++
        }
        return null
    }

    getPutCard(chairId, value, lack) {
        izx.log("getPutCard chairId = ", chairId)
        izx.log("getPutCard value = ", value)
        izx.log("getPutCard lack = ", lack)
        if (this.mjLayerS == null) {
            return null
        }
        let ndCard = this.mjLayerS.getAreas("putCardPos", chairId - 1)
        ndCard.active = true
        let mjCard = ndCard.getComponent("hzxl-Prefab")
        if (!mjCard) {
            mjCard = ndCard.addComponent("hzxl-Prefab")
        } else {
            mjCard.resetPosition()
        }
        mjCard.initMj(chairId, CardArea.PutCard, value)
        mjCard.setOriginPositon()
        mjCard.removeLackMark()
        if (chairId == 1) {
            // mjCard.drawLackMark(lack)
        }
        return mjCard
    }

    aniScoreChange(msg) {
        izx.log("aniScoreChange msg = ", msg)
        if (!this.isForeground) {
            return
        }
        let bAdd = false
        let addDelay = 0
        for (let v of msg.items) {
            if (v.presentScore != 0) {
                bAdd = true
                break
            }
        }
        if (bAdd) {
            console.log("aniScoreChange fanData =", this.fanData)
            if (this.fanData) {
                addDelay = this.fanData.addDelay
                if (-1 != this.fanData.fanId) {
                    let aniPlayNode = cc.find("CenterArea/MainAniPlayArea/Area" + this.fanData.chairId, this.node)
                    if (aniPlayNode) {
                        scmjUtil.loadAsset("prefabs/AniHuFanBg", cc.Prefab, (res) => {
                            if (this.fanData && this.fanData.fanId && res) {
                                scmjUtil.loadAsset("images/hu/" + this.fanData.fanId, cc.SpriteFrame, (res2) => {
                                    if (cc.isValid(aniPlayNode) && res2) {
                                        let nodeHu = new cc.Node()
                                        nodeHu.opacity = 0
                                        let sptHu = nodeHu.addComponent(cc.Sprite)
                                        sptHu.spriteFrame = res2
                                        nodeHu.parent = aniPlayNode
                                        // nodeHu.x -= 100                        
                                        if (1 == this.fanData.chairId) {
                                            // nodeHu.scale = 1.5
                                            nodeHu.y = nodeHu.height / 3 + 35
                                        } else {
                                            nodeHu.y = nodeHu.height / 3 + 15
                                        }

                                        let ndHuFanBg = cc.instantiate(res)
                                        ndHuFanBg.y = nodeHu.y
                                        ndHuFanBg.scale = nodeHu.scale
                                        ndHuFanBg.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, (event) => {
                                            ndHuFanBg.destroy()
                                        }, this)

                                        nodeHu.runAction(cc.sequence(cc.delayTime(1 + addDelay), cc.callFunc(() => {
                                            ndHuFanBg.parent = aniPlayNode
                                            AudioMgr.playSound("audio_hu")
                                        }), cc.delayTime(0.3), cc.fadeIn(0.2), cc.delayTime(0.4), cc.removeSelf(true), cc.destroySelf()))
                                    }
                                })
                            }
                        })
                    }
                }
            }
        }
        for (let v of msg.items) {
            if (v.presentScore != 0) {
                console.log("aniScoreChange presentScore =", v.presentScore)
                let text = v.presentScore > 0 ? "+" + scmjUtil.FormatNumWYCN(v.presentScore) : "-" + scmjUtil.FormatNumWYCN(Math.abs(v.presentScore))
                let prefabName = v.presentScore > 0 ? "prefabs/AniWinScore" : "prefabs/AniLoseScore"
                scmjUtil.loadAsset(prefabName, cc.Prefab, (res) => {
                    if (cc.isValid(this.node) && res) {
                        let ndScore = cc.instantiate(res)
                        ndScore.getComponent(cc.Label).string = text
                        ndScore.getComponent(cc.Label).fontSize = 100
                        let aniPlayNode = cc.find("CenterArea/MainAniPlayArea/Area" + v.chairId, this.node)
                        if (aniPlayNode && aniPlayNode.isValid) {
                            if (v.presentScore < 0) {
                                if (aniPlayNode.childrenCount == 4) {
                                    ndScore.y -= ndScore.height / 3 * 2
                                } else if (aniPlayNode.childrenCount == 5) {
                                    ndScore.y -= ndScore.height
                                }
                            } else {
                                ndScore.y -= ndScore.height / 3
                            }
                            ndScore.parent = aniPlayNode
                            ndScore.x -= 100
                            ndScore.runAction(cc.sequence(cc.hide(), cc.delayTime(1.3 + addDelay), cc.show(), cc.moveTo(0.2, ndScore.x + 100, ndScore.y), cc.delayTime(0.4), cc.callFunc(() => {
                                if (v.presentScore < 0 && v.shieldTimes > 0) {
                                    scmjUtil.loadAsset("prefabs/AniNoLose", cc.Prefab, (res2) => {
                                        if (cc.isValid(this.node) && res2) {
                                            let ndAniNoLose = cc.instantiate(res2)
                                            let skeleton = <sp.Skeleton>ndAniNoLose.getComponent(sp.Skeleton);
                                            skeleton.setCompleteListener(() => {
                                                ndAniNoLose.destroy()
                                            })
                                            ndAniNoLose.parent = aniPlayNode
                                        }
                                    })
                                }
                            }), cc.removeSelf(true), cc.destroySelf()))
                        }
                    }
                }, "hzxl_subpackage")
            }
        }

        if (msg.changeType) {
            izx.log("changeType===", msg.changeType)
            if (msg.changeType != "genzhuang") {
                scmjUtil.loadAsset("images/tips/" + msg.changeType, cc.SpriteFrame, (res) => {
                    let aniPlayNode = cc.find("CenterArea/MainAniPlayArea", this.node)
                    let node = new cc.Node()
                    let sp = node.addComponent(cc.Sprite)
                    sp.spriteFrame = res
                    node.parent = aniPlayNode
                    node.runAction(cc.sequence(cc.hide(), cc.delayTime(1.3 + addDelay), cc.show(), cc.moveTo(0.2, node.x, node.y + 50), cc.delayTime(0.4), cc.callFunc(() => {
                    }), cc.removeSelf(true), cc.destroySelf()))
                }, "gdmj")
            } else {
                // genzhuang 特殊处理
                let banker = 0
                for (let v of msg.items) {
                    if (v.presentScore < 0) {
                        banker = v.chairId
                    }
                }
                scmjUtil.loadAsset("images/tips/" + msg.changeType, cc.SpriteFrame, (res) => {
                    if (cc.isValid(this.node) && res) {
                        let path = "CenterArea/MainAniPlayArea"
                        path += "/Area" + banker
                        let aniPlayNode = cc.find(path, this.node)
                        if (aniPlayNode && aniPlayNode.isValid) {
                            let node = new cc.Node()
                            let sp = node.addComponent(cc.Sprite)
                            sp.spriteFrame = res
                            node.parent = aniPlayNode
                            node.runAction(cc.sequence(cc.hide(), cc.delayTime(1.3 + addDelay), cc.show(), cc.moveTo(0.2, node.x, node.y), cc.delayTime(0.4), cc.callFunc(() => {
                            }), cc.removeSelf(true), cc.destroySelf()))
                        }
                    }
                }, "gdmj")
            }
        }
    }

    aniCpgh(msg, callback?) {
        // izx.log("aniCpgh msg = ", msg)
        let bShow = false//User.PlayGame == 0 ? true : false
        let prefabName = ""
        let addDelay = 0
        let isGuaFengXiaYu = false
        switch (msg.opcode) {
            case OperatorCode.OP_CHOW:
                prefabName = "prefabs/AniChow"
                break
            case OperatorCode.OP_PONG:
                prefabName = "prefabs/AniPong"
                if (bShow) {
                    prefabName = "images/scmj/Pong_2"
                }
                break
            case OperatorCode.OP_KONG:
            // prefabName = "prefabs/AniKong"
            // this.fanData = { fanId: "gang", chairId: msg.chairId, addDelay: addDelay }
            // break
            case OperatorCode.OP_KONG_TURN:
                prefabName = "prefabs/AniKongTurn"
                if (bShow) {
                    prefabName = "images/scmj/Kong_2"
                }
                // isGuaFengXiaYu = true
                this.fanData = { fanId: "gang", chairId: msg.chairId, addDelay: addDelay }
                break
            case OperatorCode.OP_KONG_DARK:
                prefabName = "prefabs/AniKongDark"
                isGuaFengXiaYu = true
                this.fanData = { fanId: "gang", chairId: msg.chairId, addDelay: addDelay }
                break
            case OperatorCode.OP_HU_DIANPAO:
                prefabName = "prefabs/AniHu"
                msg.fanId = msg.fanId || 0
                if (msg.fanId >= 0) {
                    this.fanData = { fanId: msg.fanId, chairId: msg.chairId, addDelay: addDelay }
                    prefabName = this.aniHuPrefabName[msg.fanId + "" + msg.chairId]
                    if (!prefabName) {
                        prefabName = "prefabs/AniHu"
                        // this.fanData = { fanId: msg.fanId, chairId: msg.chairId, addDelay: addDelay }
                        // } else {
                        //     if (1 == msg.chairId) {
                        //         this.fanData = { fanId: -1, chairId: msg.chairId, addDelay: addDelay }
                        //     } else {
                        //         this.fanData = { fanId: msg.fanId, chairId: msg.chairId, addDelay: addDelay }
                        //     }
                    }
                }
                if (msg.huStatus) {
                    this.showWin({ chairId: msg.chairId, huStatus: msg.huStatus })
                }
                if (1 == msg.chairId) {
                    izx.dispatchEvent(SCMJ_EVENT.ANI_FIRE)
                }
                if (bShow) {
                    prefabName = "images/scmj/Hu_2"
                }
                break
            case OperatorCode.OP_HU_ZIMO:
                if (msg.huStatus) {
                    this.showWin({ chairId: msg.chairId, huStatus: msg.huStatus })
                }
            case OperatorCode.OP_HU_AFTER_KONG_TURN:
                // prefabName = "prefabs/AniHu21" + (1 == msg.chairId ? "_1" : "_2")
                prefabName = "prefabs/AniHu21_2"
                if (1 == msg.chairId) {
                    addDelay = 0.7
                }
                msg.fanId = msg.fanId || 0
                if (msg.fanId >= 0) {
                    this.fanData = { fanId: msg.fanId, chairId: msg.chairId, addDelay: addDelay }
                    prefabName = this.aniHuPrefabName[msg.fanId + "" + msg.chairId]
                    if (!prefabName) {
                        prefabName = "prefabs/AniHu21" + (1 == msg.chairId ? "_1" : "_2")
                        prefabName = "prefabs/AniHu21_2"
                        // this.fanData = { fanId: msg.fanId, chairId: msg.chairId, addDelay: addDelay }
                        // } else {
                        // if (1 == msg.chairId) {
                        //     this.fanData = { fanId: -1, chairId: msg.chairId, addDelay: addDelay }
                        // } else {
                        //     this.fanData = { fanId: msg.fanId, chairId: msg.chairId, addDelay: addDelay }
                        // }
                    }
                }
                if (1 == msg.chairId) {
                    izx.dispatchEvent(SCMJ_EVENT.ANI_FIRE)
                }
                if (bShow) {
                    prefabName = "images/scmj/Hu_2"
                }
                break
            default:
                break
        }
        if (prefabName && prefabName.length > 0) {
            if (bShow) {
                scmjUtil.loadAsset(prefabName, cc.SpriteFrame, (res) => {
                    if (cc.isValid(this.node) && res) {
                        let path = "CenterArea/MainAniPlayArea"
                        if (!isGuaFengXiaYu) {
                            path += "/Area" + msg.chairId
                        }
                        let aniPlayNode = cc.find(path, this.node)
                        if (aniPlayNode && aniPlayNode.isValid) {
                            let ndSpt = new cc.Node()
                            ndSpt.parent = aniPlayNode
                            let spt = ndSpt.addComponent(cc.Sprite)
                            spt.spriteFrame = res
                            ndSpt.runAction(cc.sequence(cc.moveTo(0.25, cc.v2(50, 0)), cc.delayTime(0.25), cc.removeSelf(true), cc.destroySelf()))
                        }
                    }
                }, "hzxl_subpackage")
            } else {
                scmjUtil.loadAsset(prefabName, cc.Prefab, (res) => {
                    if (cc.isValid(this.node) && res) {
                        let path = "CenterArea/MainAniPlayArea"
                        if (!isGuaFengXiaYu) {
                            path += "/Area" + msg.chairId
                        }
                        let aniPlayNode = cc.find(path, this.node)
                        if (aniPlayNode && aniPlayNode.isValid) {
                            let node = cc.instantiate(res)
                            node.parent = aniPlayNode
                            let skeleton = <sp.Skeleton>node.getComponent(sp.Skeleton);
                            skeleton.timeScale = 1.3
                            skeleton.setCompleteListener(() => {
                                node.destroy()
                                if (callback) {
                                    callback()
                                }
                            })
                        }
                    }
                })
            }
        }
    }

    aniLuoDi(msg) {
        izx.log("aniLuoDi msg = ", msg)
        let prefabName = ""
        let isGuaFengXiaYu = false
        switch (msg.length) {
            case 3:
                prefabName = "prefabs/AniJiuZhang"
                break
            case 4:
                prefabName = "prefabs/AniShiErZhang"
                break
            default:
                break
        }
        if (prefabName && prefabName.length > 0) {
            scmjUtil.loadAsset(prefabName, cc.Prefab, (res) => {
                if (cc.isValid(this.node) && res) {
                    let path = "CenterArea/MainAniPlayArea"
                    if (!isGuaFengXiaYu) {
                        path += "/Area" + msg.chairId
                    }
                    let aniPlayNode = cc.find(path, this.node)
                    if (aniPlayNode && aniPlayNode.isValid) {
                        let node = cc.instantiate(res)
                        node.parent = aniPlayNode
                        node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.LOOP_COMPLETE, (event) => {
                            node.destroy()
                        }, this)
                    }
                }
            }, "gdmj")
        }
    }

    stopTimer1() {
        // console.log("stopTimer1")
        this.unschedule(this.updateTimer1)
    }

    startTimer1() {
        // console.log("startTimer1")
        this.stopTimer1()
        let strDesc = "(" + this.second1 + "s)"
        // for (let i = 0; i < this.count1; i++) {
        //     strDesc += "."
        // }
        let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId1 + "/Recharge/lblRecharge", this.node)
        if (lblRecharge) {
            lblRecharge.getComponent(cc.Label).string = strDesc
        }
        // this.count1++
        this.schedule(this.updateTimer1, 1)
    }

    updateTimer1() {
        // console.log("updateTimer1")
        if (this.second1 == 0) {
            this.stopTimer1()
            // izx.dispatchEvent(SCMJ_EVENT.RECHARGE_RSP, { recharge: 2, shieldTimes: 0 })
            if (-1 != this.rechargeChairId1) {
                this.showLose({ chairId: this.rechargeChairId1, isShow: true })
            }
        } else {
            this.second1--
        }
        let strDesc = "(" + this.second1 + "s)"
        // for (let i = 0; i < this.count1; i++) {
        //     strDesc += "."
        // }
        if (-1 != this.rechargeChairId1) {
            let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId1 + "/Recharge/lblRecharge", this.node)
            if (lblRecharge) {
                lblRecharge.getComponent(cc.Label).string = strDesc
            }
        } else {
            this.stopTimer1()
        }
        // this.count1++
        // if (this.count1 == 4) {
        //     this.count1 = 0
        // }
    }

    stopTimer2() {
        // console.log("stopTimer2")
        this.unschedule(this.updateTimer2)
    }

    startTimer2() {
        // console.log("startTimer2")
        this.stopTimer2()
        let strDesc = "(" + this.second2 + "s)"
        // for (let i = 0; i < this.count2; i++) {
        //     strDesc += "."
        // }
        let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId2 + "/Recharge/lblRecharge", this.node)
        if (lblRecharge) {
            lblRecharge.getComponent(cc.Label).string = strDesc
        }

        // this.count2++
        this.schedule(this.updateTimer2, 1)
    }

    updateTimer2() {
        // console.log("updateTimer2")
        if (this.second2 == 0) {
            this.stopTimer2()
            if (-1 != this.rechargeChairId2) {
                this.showLose({ chairId: this.rechargeChairId2, isShow: true })
            }
        } else {
            this.second2--
        }
        let strDesc = "(" + this.second2 + "s)"
        // for (let i = 0; i < this.count2; i++) {
        //     strDesc += "."
        // }
        if (-1 != this.rechargeChairId2) {
            let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId2 + "/Recharge/lblRecharge", this.node)
            if (lblRecharge) {
                lblRecharge.getComponent(cc.Label).string = strDesc
            }
        } else {
            this.stopTimer2()
        }
        // this.count2++
        // if (this.count2 == 4) {
        //     this.count2 = 0
        // }
    }

    stopTimer3() {
        // console.log("stopTimer3")
        this.unschedule(this.updateTimer3)
    }

    startTimer3() {
        // console.log("startTimer3")
        this.stopTimer3()
        let strDesc = "(" + this.second3 + "s)"
        // for (let i = 0; i < this.count3; i++) {
        //     strDesc += "."
        // }
        let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId3 + "/Recharge/lblRecharge", this.node)
        if (lblRecharge) {
            lblRecharge.getComponent(cc.Label).string = strDesc
        }
        // this.count3++
        this.schedule(this.updateTimer3, 1)
    }

    updateTimer3() {
        // console.log("updateTimer3")
        if (this.second3 == 0) {
            this.stopTimer3()
            if (-1 != this.rechargeChairId3) {
                this.showLose({ chairId: this.rechargeChairId3, isShow: true })
            }
        } else {
            this.second3--
        }
        let strDesc = "(" + this.second3 + "s)"
        // for (let i = 0; i < this.count3; i++) {
        //     strDesc += "."
        // }
        if (-1 != this.rechargeChairId3) {
            let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId3 + "/Recharge/lblRecharge", this.node)
            if (lblRecharge) {
                lblRecharge.getComponent(cc.Label).string = strDesc
            }
        } else {
            this.stopTimer3()
        }
        // this.count3++
        // if (this.count3 == 4) {
        //     this.count3 = 0
        // }
    }

    stopTimer4() {
        // console.log("stopTimer4")
        this.unschedule(this.updateTimer4)
    }

    startTimer4() {
        // console.log("startTimer4")
        this.stopTimer4()
        let strDesc = "(" + this.second4 + "s)"
        // for (let i = 0; i < this.count4; i++) {
        //     strDesc += "."
        // }

        let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId4 + "/Recharge/lblRecharge", this.node)
        if (lblRecharge) {
            lblRecharge.getComponent(cc.Label).string = strDesc
        }
        // this.count4++
        this.schedule(this.updateTimer4, 1)
    }

    updateTimer4() {
        // console.log("updateTimer4")
        if (this.second4 == 0) {
            this.stopTimer4()
            if (-1 != this.rechargeChairId4) {
                this.showLose({ chairId: this.rechargeChairId4, isShow: true })
            }
        } else {
            this.second4--
        }
        let strDesc = "(" + this.second4 + "s)"
        // for (let i = 0; i < this.count4; i++) {
        //     strDesc += "."
        // }
        if (-1 != this.rechargeChairId4) {
            let lblRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + this.rechargeChairId4 + "/Recharge/lblRecharge", this.node)
            if (lblRecharge) {
                lblRecharge.getComponent(cc.Label).string = strDesc
            }
        } else {
            this.stopTimer4()
        }
        // this.count4++
        // if (this.count4 == 4) {
        //     this.count4 = 0
        // }
    }

    showLose(msg) {
        // izx.log("showLose isShow = ", msg)
        if (msg.isShow) {
            if (1 == msg.chairId) {
                this.stopTimer1()
                izx.log("mjAnimation showLose SHOW_BTN_READY")
                izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true, "换桌")
                izx.dispatchEvent(SCMJ_EVENT.CHANGE_AUTO_STATE, false)
            } else if (2 == msg.chairId) {
                this.stopTimer2()
            } else if (3 == msg.chairId) {
                this.stopTimer3()
            } else if (4 == msg.chairId) {
                this.stopTimer4()
            }
            // this.unschedule(this.mapTimer[msg.chairId].callback)
            if (!msg.giveup) {
                this.showRecharge({ chairId: msg.chairId, isShow: false })
            }
        }
        let ndLose = cc.find("CenterArea/MainAniPlayArea/Area" + msg.chairId + "/Lose", this.node)
        if (ndLose) {
            ndLose.active = msg.isShow
        }
    }

    showRecharge(msg) {
        // izx.log("showRecharge isShow = ", msg)
        let ndLose = cc.find("CenterArea/MainAniPlayArea/Area" + msg.chairId + "/Lose", this.node)
        if (!ndLose || ndLose.active) {
            return
        }
        let ndRecharge = cc.find("CenterArea/MainAniPlayArea/Area" + msg.chairId + "/Recharge", this.node)
        if (ndRecharge) {
            ndRecharge.active = msg.isShow
        }
        if (msg.isShow) {
            this.showLose({ chairId: msg.chairId, isShow: false })
            if (1 == msg.recharge) {
                if (1 == msg.chairId) {
                    this.rechargeChairId1 = msg.chairId
                    this.second1 = 15
                    // this.count1 = 0
                    this.startTimer1()
                } else if (2 == msg.chairId) {
                    this.rechargeChairId2 = msg.chairId
                    this.second2 = 15
                    // this.count2 = 0
                    this.startTimer2()
                } else if (3 == msg.chairId) {
                    this.rechargeChairId3 = msg.chairId
                    this.second3 = 15
                    // this.count3 = 0
                    this.startTimer3()
                } else if (4 == msg.chairId) {
                    this.rechargeChairId4 = msg.chairId
                    this.second4 = 15
                    // this.count4 = 0
                    this.startTimer4()
                }

                if (1 == msg.chairId && msg.isShowResurgenceBox) {
                    let param = {
                        callback: ((res) => {
                            console.log("onPressBackpack callback", res)
                            if (1 == res.ret) {
                                izx.dispatchEvent(SCMJ_EVENT.RECHARGE_RSP, { recharge: 2, shieldTimes: 0 })
                                this.showLose({ chairId: msg.chairId, isShow: true })
                            } else if (2 == res.ret) {
                                izx.dispatchEvent(SCMJ_EVENT.RECHARGE_RSP, { recharge: 3, shieldTimes: 0 })
                            } else if (3 == res.ret) {
                                if (ndRecharge) {
                                    ndRecharge.active = false
                                }
                                izx.dispatchEvent(SCMJ_EVENT.RECHARGE_RSP, { recharge: 4, shieldTimes: res.shieldTimes })
                                let showAni = res.shieldTimes > 0 ? true : false
                                izx.dispatchEvent(SCMJ_EVENT.REFRESH_NO_LOSE, { chairId: msg.chairId, shieldTimes: res.shieldTimes, showAni: showAni })
                            }
                        })
                    }
                    iGaoShouApi.showResurgenceBox(param)
                }
            } else if (6 == msg.recharge) {
                if (1 == msg.chairId) {
                    this.rechargeChairId1 = msg.chairId
                    this.second1 = 90
                    // this.count1 = 0
                    this.startTimer1()
                } else if (2 == msg.chairId) {
                    this.rechargeChairId2 = msg.chairId
                    this.second2 = 90
                    // this.count2 = 0
                    this.startTimer2()
                } else if (3 == msg.chairId) {
                    this.rechargeChairId3 = msg.chairId
                    this.second3 = 90
                    // this.count3 = 0
                    this.startTimer3()
                } else if (4 == msg.chairId) {
                    this.rechargeChairId4 = msg.chairId
                    this.second4 = 90
                    // this.count4 = 0
                    this.startTimer4()
                }
            } else if (4 == msg.recharge) {
                if (ndRecharge) {
                    ndRecharge.active = false
                }
                if (1 == msg.chairId) {
                    this.rechargeChairId1 = -1
                    this.second1 = 15
                    // this.count1 = 0
                    this.stopTimer1()
                } else if (2 == msg.chairId) {
                    this.rechargeChairId2 = -1
                    this.second2 = 15
                    // this.count2 = 0
                    this.stopTimer2()
                } else if (3 == msg.chairId) {
                    this.rechargeChairId3 = -1
                    this.second3 = 15
                    // this.count3 = 0
                    this.stopTimer3()
                } else if (4 == msg.chairId) {
                    this.rechargeChairId4 = -1
                    this.second4 = 15
                    // this.count4 = 0
                    this.stopTimer4()
                }
            }
        }
    }

    showWin(msg) {
        izx.log("showWin isShow = ", msg)
        let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
        if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties && matchInfo.metadata.gs_properties.isXueZhan) {
            if (1 == matchInfo.metadata.gs_properties.isXueZhan) {
                scmjUtil.loadAsset("images/ui/" + msg.huStatus.type, cc.SpriteFrame, (res) => {
                    if (res && this.node && this.node.isValid) {
                        let ndWin = cc.find("CenterArea/MainAniPlayArea/Area" + msg.chairId + "/Win", this.node)
                        if (ndWin && ndWin.isValid) {
                            ndWin.getComponent(cc.Sprite).spriteFrame = res
                            ndWin.active = msg.huStatus.status
                        }
                    }
                })
            }
        }
    }

    reset() {
        for (let index = 1; index <= 4; index++) {
            let lose = cc.find("CenterArea/MainAniPlayArea/Area" + index + "/Lose", this.node)
            if (lose && lose.isValid) {
                lose.active = false
            }
            let win = cc.find("CenterArea/MainAniPlayArea/Area" + index + "/Win", this.node)
            if (win && win.isValid) {
                win.active = false
            }
            let recharge = cc.find("CenterArea/MainAniPlayArea/Area" + index + "/Recharge", this.node)
            if (recharge && recharge.isValid) {
                recharge.active = false
            }
        }
        this.second1 = 15
        this.rechargeChairId1 = -1
        this.touchIndex = -1

        this.stopTimer1()
        this.stopTimer2()
        this.stopTimer3()
        this.stopTimer4()
    }

    touchCardIndex(msg) {
        this.touchIndex = msg.index
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        scmjUtil.addEnterGameScene("Animation-onLoad")
    }

    start() {
        scmjUtil.addEnterGameScene("Animation-start")
        this.mjLayerS = this.cardLayer.getComponent("hzxl-CardLayer")

        izx.on(SCMJ_EVENT.ANI_PLAY_CARD, this.aniPlayCard, this)
        izx.on(SCMJ_EVENT.ANI_MOPAI, this.aniMoPai, this)
        izx.on(SCMJ_EVENT.ANI_SCORE_CHANGE, this.aniScoreChange, this)
        izx.on(SCMJ_EVENT.ANI_CPGH, this.aniCpgh, this)
        izx.on(SCMJ_EVENT.SHOW_LOSE, this.showLose, this)
        izx.on(SCMJ_EVENT.SHOW_RECHARGE, this.showRecharge, this)
        izx.on(SCMJ_EVENT.SHOW_WIN, this.showWin, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.reset, this)
        izx.on(SCMJ_EVENT.TOUCH_CARD_INDEX, this.touchCardIndex, this)

        izx.on(SCMJ_EVENT.ANI_LUODI, this.aniLuoDi, this)

        //切后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            this.isForeground = false
        }, this);

        cc.game.on(cc.game.EVENT_SHOW, () => {
            this.isForeground = true
        }, this)
        scmjUtil.addEnterGameScene("Animation-start-end")
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    // start() {

    // }

    // update (dt) {}
}
