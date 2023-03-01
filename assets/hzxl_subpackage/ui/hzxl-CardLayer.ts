import { SCMJ_EVENT } from "../hzxl-Events";
import { CardArea, LackType } from "../hzxl-Constants";
import { scmjUtil } from "../hzxl-Util";
import MjPrefab from "./hzxl-Prefab";

import { igs } from "../../igs";
import { AudioMgr } from "../hzxl-AudioMgr";
import { Constants } from "../../lobby/start/script/igsConstants";
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import HzxlLogic from "../hzxl-logic";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardLayer extends cc.Component {
    // mark
    ndPlayMark: cc.Node = null;
    // 牌堆中当前牌动画
    ndPlayAni: cc.Node = null
    bLoadPlayMark: boolean = false // 加载出牌标记

    mapCards = {}
    mapCardsIndex = {
        1: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 },
        2: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 },
        3: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 },
        4: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 }
    }
    mapNodePaths = {}
    lack = LackType.None
    prevPlayCard = null
    exchangeCards = []
    mapTingCards = [] // 听牌信息
    curHuCardsIndex = 0
    isForeground = true
    bCurCardAni = false // 当前换三张动画
    mapLoadUi = { // 动态加载界面状态
        1: {
            bShowOpCards: false, bHandCard: false, bHuCardArea: false, bPutCardArea: false
        },
        2: {
            bShowOpCards: false, bHandCard: false, bHuCardArea: false, bPutCardArea: false
        },
        3: {
            bShowOpCards: false, bHandCard: false, bHuCardArea: false, bPutCardArea: false
        },
        4: {
            bShowOpCards: false, bHandCard: false, bHuCardArea: false, bPutCardArea: false
        },
        bShowAniHand: false,
    }

    cardWall = []
    onOpen() {
        izx.log("CardLayer onOpen")
        // super.onOpen()
        this.initMapNodePaths()
        // this.initWallCards()
    }

    onClose() {
        izx.log("CardLayer onClose")
        // super.onClose()
    }

    initMapNodePaths() {
        this.mapNodePaths["nodePlayer0"] = "nodePlayer0/"
        this.mapNodePaths["nodePlayer1"] = "nodePlayer1/"
        this.mapNodePaths["nodePlayer2"] = "nodePlayer2/"
        this.mapNodePaths["nodePlayer3"] = "nodePlayer3/"
    }

    initWallCards() {
        for (let i = 0; i < 4; i++) {
            let name = "handCardBack" + i
            let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (nodeArea != null) {
                for (let j = 0; j < 30; j++) {
                    let cardNode = cc.find("" + (j + 1), nodeArea)
                    if (cardNode) {
                        cardNode.active = false
                    }
                }
            }
        }
    }

    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_MJLAYER_CARDS, this.updateCards, this)
        izx.on(SCMJ_EVENT.BEGIN_GAME_NOTI, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.UPDATE_LACK_CARDS, this.updateLackCards, this)
        izx.on(SCMJ_EVENT.UPDATE_MJPLAY_MARK, this.updateMjPlayMark, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.EXCHANGE_NOTI, this.exchangeNoti, this)
        izx.on(SCMJ_EVENT.UPDATE_TING_MARKS, this.updateTingMarks, this)
        if(HzxlLogic.getInstance().isHzxl()){
            izx.on(SCMJ_EVENT.RESULT_NOTI, this.resultNoti, this)
        }
        izx.on(SCMJ_EVENT.ANI_FIRE, this.aniFire, this)
        izx.on(SCMJ_EVENT.GET_LEFTCARDS, this.getLeftcards, this)
        izx.on(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, this.getHandcardsAndCurcard, this)
        izx.on(SCMJ_EVENT.GET_SELF_CARDS, this.getSelfCards, this)

        //切后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            this.isForeground = false
        }, this);

        cc.game.on(cc.game.EVENT_SHOW, () => {
            this.isForeground = true
        }, this)
    }

    calcCardWall(noti) {
        console.log("calcCardWall noti =", noti)
        if (!noti || this.cardWall.length > 0) {
            return
        }
        let cardWallLength = []
        cardWallLength[0] = 14
        cardWallLength[1] = 13
        cardWallLength[2] = 14
        cardWallLength[3] = 13
        let red_zhong = 0
        let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
        if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties && matchInfo.metadata.gs_properties.red_zhong) {
            red_zhong = matchInfo.metadata.gs_properties.red_zhong
        }
        if (red_zhong == 4) {
            cardWallLength[0] = 14
            cardWallLength[1] = 14
            cardWallLength[2] = 14
            cardWallLength[3] = 14
        } else if (red_zhong == 6) {
            cardWallLength[0] = 15
            cardWallLength[1] = 14
            cardWallLength[2] = 14
            cardWallLength[3] = 14
        } else if (red_zhong == 8) {
            cardWallLength[0] = 15
            cardWallLength[1] = 14
            cardWallLength[2] = 15
            cardWallLength[3] = 14
        }

        let dices = noti.dices
        dices.sort((a, b) => {
            return a < b ? -1 : 1
        })
        let dice = (dices[0] + dices[1] - 1) % 4
        let chairId = noti.chairId - 1
        chairId = (chairId + dice) % 4
        console.log("calcCardWall chairId", chairId)
        let cardWall = []
        for (let i = 0; i < 4; i++) {
            let name = "handCardBack" + (4 + chairId - i) % 4
            console.log("handCardBack", name)
            let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (nodeArea != null) {
                for (let j = 0; j < cardWallLength[i] * 2; j++) {
                    let cardNode = cc.find("" + (j + 1), nodeArea)
                    if (cardNode) {
                        cardWall.push(cardNode)
                        cardNode.active = true
                    }
                }
            }
        }

        for (let i = dices[0] * 2; i < cardWall.length; i++) {
            this.cardWall.push(cardWall[i])
        }

        for (let i = 0; i < dices[0] * 2; i++) {
            this.cardWall.push(cardWall[i])
        }
        this.cardWall.reverse()
    }

    setRemainCardNum(num: number) {
        while (this.cardWall.length > num) {
            let node = this.cardWall.pop()
            node.active = false
        }
    }

    exchangeNoti(noti) {
        // izx.log("changeNoti noti = ", noti)
        this.exchangeCards = noti.cards
    }

    // 增加当前出牌标记
    drawPlayMark(pos) {
        if (this.ndPlayMark) {
            this.ndPlayMark.position = this.ndPlayMark.parent.convertToNodeSpaceAR(pos)
            this.ndPlayMark.active = true
        } else {
            if (this.bLoadPlayMark) {
                return
            }
            this.bLoadPlayMark = true
            scmjUtil.loadAsset("prefabs/PlayMark", cc.Prefab, (res) => {
                if (cc.isValid(this.node) && res) {
                    this.ndPlayMark = cc.instantiate(res)
                    this.ndPlayMark.parent = this.node
                    this.ndPlayMark.scale = 0.7
                    this.ndPlayMark.position = this.ndPlayMark.parent.convertToNodeSpaceAR(pos)
                    this.bLoadPlayMark = false
                }
            })
        }
    }

    removePlayMark() {
        if (this.ndPlayMark) {
            this.ndPlayMark.active = false
        }
    }

    removePlayAni() {
        if (this.ndPlayAni) {
            this.ndPlayAni.active = false
        }
    }

    updateMjPlayMark(noti) {
        // izx.log("updateMjPlayMakr noti = ", noti)
        if (!this.isForeground) {
            return
        }
        let name = "putCardArea" + (noti.chairId - 1)
        let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if (nodeArea == null || nodeArea.childrenCount == 0 || noti.hide) {
            this.removePlayMark()
            this.removePlayAni()
            return
        }
        let count = 0
        let cards = this.mapCards[noti.chairId]
        if (cards) {
            count = cards.dispcards.length
        }
        if (count == 0) {
            this.removePlayMark()
            this.removePlayAni()
            return
        }

        let curLayer = 0
        for (let v of nodeArea.children) {
            if (v.active) {
                curLayer++
            }
        }
        let tempLayer = cc.find("layer" + curLayer, nodeArea)
        if (tempLayer && tempLayer.isValid) {
            let curCard = 0
            for (let v of tempLayer.children) {
                if (v.name != "ani" && v.active) {
                    curCard++
                }
            }
            let mj = cc.find("layer" + curLayer + "/" + curCard, nodeArea)
            if (mj) {
                let wpos = mj.parent.convertToWorldSpaceAR(mj.position)
                // wpos.y += 25
                // if (1 != noti.chairId) {
                //     wpos.x += 5
                // }

                // 播放出牌手势动画
                let aniHand = () => {
                    ndHand.active = true
                    ndHand.position = ndHand.parent.convertToNodeSpaceAR(wpos)
                    ndHand.getComponent(dragonBones.ArmatureDisplay).playAnimation("newAnimation", 1)
                    ndHand.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, (event) => {
                        ndHand.active = false
                    }, this)
                }
                let ndHand = cc.find("CenterArea1/CenterMjArea/GestureArea" + noti.chairId + "/Hand", this.node)
                if (!ndHand) {
                    if (!this.mapLoadUi.bShowAniHand) {
                        this.mapLoadUi.bShowAniHand = true
                        let ndParent = cc.find("CenterArea1", this.node)
                        scmjUtil.loadAsset("prefabs/CenterMjArea", cc.Prefab, (res) => {
                            if (cc.isValid(ndParent) && res) {
                                let ndCenterMjArea = cc.instantiate(res)
                                ndCenterMjArea.parent = ndParent
                                this.mapLoadUi.bShowAniHand = false

                                ndHand = cc.find("GestureArea" + noti.chairId + "/Hand", ndCenterMjArea)
                                aniHand()
                            }
                        })
                    }
                } else {
                    aniHand()
                }

                AudioMgr.playSound("audio_throw")

                // 增加打出牌底动画
                let ndAni = tempLayer.getChildByName("ani")
                if (this.ndPlayAni) {
                    this.ndPlayAni.parent = ndAni
                    ndAni.position = mj.position
                    this.ndPlayAni.active = true
                    let skeleton = <sp.Skeleton>this.ndPlayAni.getComponent(sp.Skeleton)
                    skeleton.clearTracks()
                    skeleton.setAnimation(0, "animation", false)
                } else {
                    scmjUtil.loadAsset("prefabs/AniDisplayCard", cc.Prefab, (res) => {
                        if (cc.isValid(ndAni) && res) {
                            this.ndPlayAni = cc.instantiate(res)
                            this.ndPlayAni.parent = ndAni
                            ndAni.position = mj.position
                        }
                    })
                }

                // this.drawPlayMark(wpos)
                if (this.ndPlayMark) {
                    this.ndPlayMark.parent = mj
                    this.ndPlayMark.active = true
                    this.ndPlayMark.y = 25
                } else {
                    if (this.bLoadPlayMark) {
                        return
                    }
                    this.bLoadPlayMark = true
                    scmjUtil.loadAsset("prefabs/PlayMark", cc.Prefab, (res) => {
                        if (cc.isValid(mj) && res) {
                            this.ndPlayMark = cc.instantiate(res)
                            this.ndPlayMark.parent = mj
                            this.ndPlayMark.scale = 0.7
                            this.ndPlayMark.y = 25
                        }
                        this.bLoadPlayMark = false
                    })
                }
            }
        }
    }

    updateLackCards(noti) {
        izx.log("scmjlayer lackNoti noti = ", noti)
        if (noti.chairId == 1) {
            izx.log("lchairId ==  1")
            this.lack = noti.lack
            if (this.mapCards[noti.chairId]) {
                this.refleshLeftcards(noti.chairId, this.mapCards[noti.chairId].leftcards)
                this.refleshHandcards(noti.chairId, this.mapCards[noti.chairId].handcards)
                // this.refleshCurCard(noti.chairId, this.mapCards[noti.chairId].card)
            }
        } else if (HzxlLogic.getInstance().videoData) {
            if (this.mapCards[noti.chairId]) {
                this.refleshLeftcards(noti.chairId, this.mapCards[noti.chairId].leftcards)
                this.refleshHandcards(noti.chairId, this.mapCards[noti.chairId].handcards)
            }
        }
    }

    updateTingMarks(noti) {
        izx.log("scmjlayer updateTingMarks noti = ", noti)
        if (noti.tingCards.length > 0) {
            this.mapTingCards = noti.tingCards
            izx.log("CardLayer this.mapTingCards = ", this.mapTingCards)
        }
        let bHu = this.isHu(1)
        if (bHu || noti.tingCards.length == 0) {
            let name = "handCard0/layer1"
            let ndArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (ndArea) {
                for (let v of ndArea.children) {
                    let cardS = <MjPrefab>v.getComponent("hzxl-Prefab")
                    if (cardS) {
                        cardS.drawTingMark({ tingCards: [] })
                    }
                }
            }
            return
        }

        let mapTingCards = {}
        let mapBig = []
        let isDiffBig = false
        let maxBig = 0
        let mapMore = []
        let isDiffMore = false
        let maxLeft = 0
        for (let v of noti.tingCards) {
            mapTingCards[v.playCard] = {}
            mapTingCards[v.playCard].tingCards = v.tingCards
            let tempLeft = 0
            let tempBig = 1
            for (let v2 of v.tingCards) {
                tempLeft += v2.left
                tempBig += v2.ratio
            }
            if (tempLeft > maxLeft) {
                if (maxLeft != 0) {
                    isDiffMore = true
                }
                maxLeft = tempLeft
                mapMore = []
                mapMore.push(v.playCard)
            } else if (tempLeft == maxLeft) {
                mapMore.push(v.playCard)
            } else {
                isDiffMore = true
            }

            if (tempBig > maxBig) {
                if (maxBig != 0) {
                    isDiffBig = true
                }
                maxBig = tempBig
                mapBig = []
                mapBig.push(v.playCard)
            } else if (tempBig == maxBig) {
                mapBig.push(v.playCard)
            } else {
                isDiffBig = true
            }
        }
        if (isDiffMore) {
            for (let v of mapMore) {
                mapTingCards[v].isMore = true
                if (isDiffBig) {
                    for (let v2 of mapBig) {
                        if (v == v2) {
                            mapTingCards[v].isBest = true
                        }
                    }
                }
            }
        }
        if (isDiffBig) {
            for (let v of mapBig) {
                mapTingCards[v].isBig = true
                if (isDiffMore) {
                    for (let v2 of mapMore) {
                        if (v == v2) {
                            mapTingCards[v].isBest = true
                        }
                    }
                }
            }
        }
        izx.log("mapTingCards = ", mapTingCards)

        let name = "handCard0/layer1"
        let ndArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if (ndArea) {
            for (let v of ndArea.children) {
                if (v.active) {
                    let cardS = <MjPrefab>v.getComponent("hzxl-Prefab")
                    if (cardS && cardS.cValue) {
                        if (mapTingCards[cardS.cValue]) {
                            cardS.drawTingMark(mapTingCards[cardS.cValue])
                        } else {
                            cardS.drawTingMark({ tingCards: [] })
                        }
                    }
                }
            }
        }
    }

    resultNoti() {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA, (playersData) => {
            let curIndex = 0
            for (let k in this.mapCards) {
                let noti = this.mapCards[k]
                // if (1 != noti.chairId) {
                // 隐藏竖直手牌
                let name1 = "handCard" + (noti.chairId - 1) + "/layer1"
                let nodeArea = scmjUtil.pathNode(name1, this.mapNodePaths, this.node)
                if (nodeArea && nodeArea.isValid) {
                    for (let v of nodeArea.children) {
                        if (v && v.isValid) {
                            v.active = false
                        }
                    }
                }

                let cards = noti.handcards.slice()
                let lack = LackType.None
                if (playersData.length > 0 && curIndex < playersData.length) {
                    lack = playersData[curIndex].lack
                }
                curIndex++
                cards = scmjUtil.sortLack(cards, lack)

                let startIndex = 0
                if (cards.length <= 13) {
                    startIndex = 13 - cards.length
                }

                // 显示平躺手牌
                let showCards = () => {
                    if (nodeArea && nodeArea.isValid) {
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
                                mjCard.initMj(noti.chairId, CardArea.HandCard, cards[i], (1 == noti.chairId) ? true : false)
                                mjCard.setOriginPositon()
                                mjCard.removeLackMark()
                                mjCard.drawLackMark(lack, (1 == noti.chairId) ? true : false)
                            }
                        }
                    }
                }

                let name = "handCardFront" + (noti.chairId - 1) + "/layer1"
                nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
                if (nodeArea == null) {
                    let ndParent = this.getAreas("handCardFront", noti.chairId - 1)
                    scmjUtil.loadAsset("prefabs/HandCardFront" + (noti.chairId - 1), cc.Prefab, (res) => {
                        if (cc.isValid(ndParent) && res) {
                            nodeArea = cc.instantiate(res)
                            nodeArea.parent = ndParent

                            showCards()
                        }
                    }, "hzxl_subpackage")
                } else {
                    if (nodeArea && nodeArea.isValid) {
                        for (let v of nodeArea.children) {
                            if (v && v.isValid) {
                                v.active = false
                            }
                        }
                    }
                    showCards()
                }
                // }
            }
        })
    }

    // 清空麻将牌
    clearMjs() {
        for (let index = 0; index <= 3; index++) {
            let name = "putCardArea" + index
            let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (nodeArea.childrenCount > 0) {
                for (let v of nodeArea.children) {
                    v.active = false
                    for (let v2 of v.children) {
                        v2.active = false
                    }
                    v.getChildByName("ani").active = true
                }
            }
            name = "showOpCards" + index + "/layer1"
            nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (nodeArea) {
                for (let v of nodeArea.children) {
                    v.active = false
                }
            }

            name = "handCard" + index + "/layer1"
            nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (nodeArea) {
                for (let v of nodeArea.children) {
                    v.active = false
                }
                if (3 == index) {
                    nodeArea.zIndex = 1
                }
            }
            name = "huCardArea" + index
            nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (nodeArea.childrenCount > 0) {
                for (let v of nodeArea.children) {
                    v.active = false
                    for (let v2 of v.children) {
                        v2.active = false
                    }
                }
            }
            if (3 == index) {
                nodeArea.zIndex = 1
            }
            // if (0 != index) {
            name = "handCardFront" + index + "/layer1"
            nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            if (nodeArea) {
                // for (let v of nodeArea.children) {
                //     v.active = false
                // }
                nodeArea.destroy()
            }
            // }
            /*nodeArea = this.getAreas("handCardBack", index)
            for (let v of nodeArea.children) {
                v.active = false
            }
            if (1 == index || 2 == index) {
                nodeArea.zIndex = 1
            }*/
        }
    }

    onStartGameNoti(noti) {
        izx.log("CardLayer onStartGameNoti")
        this.clearMjs()
        this.removePlayMark()
        this.removePlayAni()
        this.mapCards = {}
        this.mapCardsIndex = {
            1: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 },
            2: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 },
            3: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 },
            4: { dispcardsIndex: 0, hucardsIndex: 0, leftcardsIndex: 0, handcardsIndex: 0 }
        }
        this.lack = LackType.None
        this.exchangeCards = []
        this.mapTingCards = []
        this.curHuCardsIndex = 0

        let name = "handCard0/layer1"
        let ndArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if (ndArea) {
            for (let v of ndArea.children) {
                let cardS = <MjPrefab>v.getComponent("hzxl-Prefab")
                if (cardS) {
                    cardS.drawTingMark({ tingCards: [] })
                    // cardS.hideDisableShadow()
                    cardS.bHu = false
                }
            }
        }
        this.cardWall = []
        this.bLoadPlayMark = false
    }

    // 接收牌面更新事件
    updateCards(noti, reconnect?) {
        izx.log("CardLayer updateCards")
        if (!noti) {
            return
        }

        if (noti.handcards.length % 3 == 2 && !noti.card) {
            noti.handcards = scmjUtil.sortLack(noti.handcards, this.lack, true)
            noti.card = noti.handcards.pop()
        }

        // izx.log("noti = ", noti)
        this.mapCards[noti.chairId] = noti
        this.refleshLeftcards(noti.chairId, noti.leftcards)

        let insertAni = this.showInsertAni(noti.chairId, noti.handcards, noti.card)   //插牌动画
        if(insertAni){
            console.log("cardNode.active insertAni=", insertAni)
        }else{
            this.refleshHandcards(noti.chairId, noti.handcards)
        }

        // this.refleshCurCard(noti.chairId, noti.card)
        if (reconnect) {
            this.curHuCardsIndex = noti.hucards.length
        }
        this.refleshHucards(noti.chairId, noti.hucards)
        this.refleshDisplaycards(noti.chairId, noti.dispcards)
    }

    // 获取方向系数
    ratio(chairId, area: CardArea): number {
        let ratio = 1
        switch (chairId) {
            case 1:
                break
            case 2:
                break
            case 3:
                ratio = -1
                break
            case 4:
                ratio = -1
                break
        }
        return ratio
    }

    // 获取间隔系数
    gap(chairId, area: CardArea): number {
        let gap = 0
        switch (chairId) {
            case 1:
                if (area == CardArea.DisplayCard) {
                    gap = -2
                } else if (area == CardArea.HandCard) {
                    gap = -18
                } else if (area == CardArea.LeftCard) {
                    gap = -3
                }
                break
            case 2:
                gap = -13
                if (area == CardArea.HuCard) {
                    gap = -7
                } else if (area == CardArea.DisplayCard) {
                    gap = -10
                }
                break
            case 3:
                gap = 2
                break
            case 4:
                gap = 13
                if (area == CardArea.HuCard) {
                    gap = 7
                } else if (area == CardArea.DisplayCard) {
                    gap = 10
                }
                break
        }
        return gap
    }

    getAreas(areaName, chairId) {
        let area = scmjUtil.pathNode(areaName + chairId, this.mapNodePaths, this.node)
        return area
    }

    // 刷新左手牌
    // 0,1,2,3,-99,1,4,4,4,4,-99 第1位表示 座位，吃谁的、碰谁的；中间是吃碰杠的牌，最后-99间隔
    refleshLeftcards(chairId, cards) {
        // izx.log("CardLayer refleshLeftcards")
        // izx.log("chairId = ", chairId)
        // izx.log("cards = ", cards)

        if (this.mapCardsIndex[chairId].leftcardsIndex == cards.length) {
        } else {
            if (this.mapLoadUi[chairId].bShowOpCards) {
                return
            }

            let showCards = () => {
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
                // izx.log("groups = ", groups)
                let groupIndex = 0
                let opChairId = -1

                if (nodeArea && nodeArea.isValid) {
                    for (; groupIndex < groups.length; groupIndex++) {
                        let v = groups[groupIndex]
                        // if (chairId == 1 && groupIndex >= 2) {
                        //     break
                        // }
                        let arrowI = -1
                        if (v.length == 4) {
                            arrowI = 2
                        } else if (v.length == 5) {
                            arrowI = 4
                        }
                        let ndGroup = cc.find("group" + (groupIndex + 1), nodeArea)
                        if (ndGroup && ndGroup.isValid) {
                            for (let v of ndGroup.children) {
                                v.active = false
                            }
                            for (let i = 0; i < v.length; i++) {
                                if (i == 0) {
                                    opChairId = scmjUtil.s2c(v[i])
                                } else {
                                    ndGroup.active = true
                                    let ndCard = cc.find("card" + i, ndGroup)
                                    if (ndCard && ndCard.isValid) {
                                        let mjCard = ndCard.getComponent("hzxl-Prefab")
                                        if (!mjCard) {
                                            mjCard = ndCard.addComponent("hzxl-Prefab")
                                        }
                                        let card = v[i]
                                        if (card <= 0) {
                                            ndCard.active = true
                                            ndCard.getChildByName("unuse").active = true
                                        } else {
                                            ndCard.getChildByName("unuse").active = false
                                        }
                                        mjCard.initMj(chairId, CardArea.LeftCard, card)
                                        if (i == arrowI) {
                                            mjCard.drawArrow(opChairId)
                                        }
                                        mjCard.setOriginPositon()
                                    }
                                }
                            }
                        }
                    }
                }
            }

            let name = "showOpCards" + (chairId - 1) + "/layer1"
            let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
            // if (cards.length == 0) {
            //     if (nodeArea) {
            //         for (let v of nodeArea.children) {
            //             v.active = false
            //         }
            //     }
            //     return
            // }

            if (nodeArea == null) {
                this.mapLoadUi[chairId].bShowOpCards = true
                let ndParent = this.getAreas("showOpCards", chairId - 1)
                scmjUtil.loadAsset("prefabs/ShowOpCards" + (chairId - 1), cc.Prefab, (res) => {
                    if (cc.isValid(ndParent) && res) {
                        nodeArea = cc.instantiate(res)
                        nodeArea.parent = ndParent
                        this.mapLoadUi[chairId].bShowOpCards = false
                        showCards()
                    }
                }, "hzxl_subpackage")
            } else {
                showCards()
            }
        }
        this.mapCardsIndex[chairId].leftcardsIndex = cards.length

        // if (this.mapCardsIndex[chairId].leftcardsIndex == cards.length) {
        // } else {
        //     showCards()
        // }
        // this.mapCardsIndex[chairId].leftcardsIndex = cards.length
    }

    //检查和显示插牌动画
    showInsertAni(chairId, handCards, curCard): boolean{
        let ret = false
        if(1 == chairId && !curCard && handCards.length > 0){
            let hideCardNodeList = []
            let cardsList = []
            let nodeArea = scmjUtil.pathNode("handCard0/layer1", this.mapNodePaths, this.node)
            if (nodeArea && cc.isValid(nodeArea)) {
                let curNode = cc.find("14", nodeArea)
                if(curNode.active == true){                    
                    for(let i=1;i<=14;i++){
                        let cardNode = cc.find(i.toString(), nodeArea)
                        let mjCard:MjPrefab = cardNode.getComponent("hzxl-Prefab")
                        if(mjCard && cardNode.active == true){
                            hideCardNodeList.push(cardNode)
                            if(!mjCard.put){
                                cardsList.push(cardNode.getComponent("hzxl-Prefab").cValue)
                            }else{
                                cardsList.push(-1)
                            }
                        }
                    }

                    if(handCards.length > 0 && cardsList.length >= handCards.length){
                        ret = true
                        let temp1 = JSON.parse(JSON.stringify(cardsList))
                        let temp2 = JSON.parse(JSON.stringify(handCards))
                        if(temp1 && temp2 && temp1.length > 0 && temp2.length > 0){
                            for(let v of temp1){
                                let find = false
                                for(let i=0;i<temp2.length;i++){
                                    if(v == temp2[i]){
                                        find = true
                                        temp2.splice(i,1)
                                        break
                                    }
                                }
                                if(v >=0 && !find){
                                    ret = false
                                }
                            }
                        }
                    }
                }
            
                if(ret == true){
                    curNode.active = false
                    for(let i=0;i<handCards.length;i++){
                        if(hideCardNodeList.length > i){
                            let cardNode:cc.Node = hideCardNodeList[i]
                            let mjCard:MjPrefab = cardNode.getComponent("hzxl-Prefab")
                            mjCard.initMj(1, CardArea.HandCard, handCards[i])
                            mjCard.setOriginPositon()
                            mjCard.removeLackMark()
                            mjCard.drawLackMark(this.lack)
                            let forPosNode = -1
                            for(let j=0;j<cardsList.length;j++){
                                if(cardsList[j] == handCards[i]){
                                    cardsList[j] = -1
                                    forPosNode = j
                                    break
                                }
                            }
                            console.log("forPosNode", forPosNode)
                            if(forPosNode > 0 && forPosNode != i){
                                let formPos = hideCardNodeList[forPosNode].getComponent("hzxl-Prefab").getOriginPositon()
                                cardNode.position = formPos
                                console.log("cardNode.pos", cardNode.position.x)
                                console.log("formPos", formPos.x)
                                let mjCard:MjPrefab = cardNode.getComponent("hzxl-Prefab")
                                if(forPosNode == hideCardNodeList.length - 1 && forPosNode-i > 1){
                                    cardNode.zIndex = 1
                                    cc.tween(cardNode)
                                        .to(0.2, {x: formPos.x, y: formPos.y+110, rotation: 20})
                                        .to(0.2, {x: mjCard.getOriginPositon().x, y: formPos.y+110})
                                        .to(0.05, {rotation: 0})
                                        .to(0.2, {x: mjCard.getOriginPositon().x, y: mjCard.getOriginPositon().y, zIndex:0})
                                        .start()
                                }else{
                                    cc.tween(cardNode)
                                        .to(0.2, {x:mjCard.getOriginPositon().x, y:mjCard.getOriginPositon().y})
                                        .start() 
                                }
                            }
                        }
                    }                    
                }
            }
        }
        return ret
    }

    // 刷新手牌
    refleshHandcards(chairId, cards) {
        // izx.log("CardLayer refleshHandcards")
        // izx.log("chairId = ", chairId)
        // izx.log("cards = ", cards)
        if (this.mapLoadUi[chairId].bHandCard) {
            return
        }
        let showCards = () => {
            if (nodeArea && nodeArea.isValid) {
                for (let v of nodeArea.children) {
                    v.active = false
                }

                let startIndex = 0
                if (cards.length <= 13) {
                    startIndex = 13 - cards.length
                }
                let curCard = -1
                if (this.mapCards && this.mapCards[chairId]) {
                    curCard = this.mapCards[chairId].card
                }
                if (1 == chairId || HzxlLogic.getInstance().videoData) {
                    let bHu = this.isHu(chairId)
                    let lack = this.lack
                    if (1 != chairId) {
                        izx.dispatchEvent(SCMJ_EVENT.GET_LACK, chairId, (otherLack) => {
                            lack = otherLack
                        })
                    }
                    cards = scmjUtil.sortLack(cards, lack, true)
                    let countExchangeNum = 0 // 统计交换个数，3个为刷新后手牌
                    if (1 == chairId && this.exchangeCards.length > 0) {
                        let tempExchangeCards = this.exchangeCards.slice()
                        let tempCards = cards.slice()
                        if (curCard && curCard > 0) {
                            tempCards.push(curCard)
                        }
                        for (let v of tempCards) {
                            if (tempExchangeCards.length > 0) {
                                let cIndex = tempExchangeCards.indexOf(v)
                                if (cIndex >= 0) {
                                    countExchangeNum++
                                    tempExchangeCards.splice(cIndex, 1)
                                }
                            } else {
                                break
                            }
                        }
                        console.log("refleshHandcards countExchangeNum = ", countExchangeNum)
                    }
                    for (let i = 0; i < cards.length; i++) {
                        let index = i + 1 + startIndex
                        let ndCard = cc.find(index.toString(), nodeArea)
                        if (ndCard && ndCard.isValid) {
                            // ndCard.active = true
                            let mjCard = ndCard.getComponent("hzxl-Prefab")
                            if (!mjCard) {
                                mjCard = ndCard.addComponent("hzxl-Prefab")
                            } else {
                                mjCard.resetPosition()
                            }
                            let card = cards[i]
                            mjCard.initMj(chairId, CardArea.HandCard, card)
                            mjCard.setOriginPositon()
                            mjCard.removeLackMark()
                            mjCard.drawLackMark(lack)
                            if (this.exchangeCards.length > 0 && countExchangeNum == 3 && (cards.length == 13 || cards.length == 14)) {
                                let cIndex = this.exchangeCards.indexOf(card)
                                if (cIndex >= 0) {
                                    // let tempCard = <any>ndCard
                                    // tempCard.isExchange = true
                                    mjCard.startChangeAni()
                                    this.exchangeCards.splice(cIndex, 1)
                                }
                            }
                            if (bHu) {
                                // mjCard.drawDisableShadow()
                                mjCard.bHu = true
                            }
                        }
                    }

                    if (this.exchangeCards.length > 0 && (cards.length == 13 || cards.length == 14)) {
                        if (countExchangeNum == 3) {
                            this.bCurCardAni = true
                        }
                        this.exchangeCards = []
                    }

                    // 当前摸到牌
                    if (curCard != 0) {
                        let ndCard = cc.find("14", nodeArea)
                        if (ndCard && ndCard.isValid) {
                            // ndCard.active = true
                            let mjCard = ndCard.getComponent("hzxl-Prefab")
                            if (!mjCard) {
                                mjCard = ndCard.addComponent("hzxl-Prefab")
                            } else {
                                mjCard.resetPosition()
                            }
                            mjCard.initMj(chairId, CardArea.CurCard, curCard)
                            mjCard.setOriginPositon()
                            mjCard.removeLackMark()
                            mjCard.drawLackMark(lack)

                            if (this.bCurCardAni) {
                                this.bCurCardAni = false
                                mjCard.startChangeAni()
                            }
                        }
                    }
                } else {
                    for (let i = 0; i < cards.length; i++) {
                        let index = i + 1 + startIndex
                        let ndCard = cc.find(index.toString(), nodeArea)
                        if (ndCard && ndCard.isValid) {
                            ndCard.active = true
                        }
                    }

                    // 当前摸到牌
                    if (curCard != 0) {
                        let ndCard = cc.find("14", nodeArea)
                        if (ndCard && ndCard.isValid) {
                            ndCard.active = true
                        }
                    }
                }
            }
        }
        let name = "handCard" + (chairId - 1) + "/layer1"
        if (HzxlLogic.getInstance().videoData && 1 != chairId) {
            name = "handCardFront" + (chairId - 1) + "/layer1"
        }
        let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if (nodeArea == null) {
            this.mapLoadUi[chairId].bHandCard = true
            if (HzxlLogic.getInstance().videoData && 1 != chairId) {
                let ndParent = this.getAreas("handCardFront", chairId - 1)
                scmjUtil.loadAsset("prefabs/HandCardFront" + (chairId - 1), cc.Prefab, (res) => {
                    if (cc.isValid(ndParent) && res) {
                        nodeArea = cc.instantiate(res)
                        nodeArea.parent = ndParent

                        if (1 != chairId && this.mapCardsIndex[chairId].handcardsIndex == cards.length && !HzxlLogic.getInstance().videoData) {
                            let ndCard = cc.find("14", nodeArea)
                            if (ndCard && ndCard.isValid) {
                                ndCard.active = false
                            }
                        } else {
                            showCards()
                        }
                    }
                    this.mapLoadUi[chairId].bHandCard = false
                    this.mapCardsIndex[chairId].handcardsIndex = cards.length
                }, "hzxl_subpackage")
            } else {
                let ndParent = this.getAreas("handCard", chairId - 1)
                scmjUtil.loadAsset("prefabs/HandCards" + (chairId - 1), cc.Prefab, (res) => {
                    if (cc.isValid(ndParent) && res) {
                        nodeArea = cc.instantiate(res)
                        nodeArea.parent = ndParent

                        if (1 != chairId && this.mapCardsIndex[chairId].handcardsIndex == cards.length && !HzxlLogic.getInstance().videoData) {
                            let ndCard = cc.find("14", nodeArea)
                            if (ndCard && ndCard.isValid) {
                                ndCard.active = false
                            }
                        } else {
                            if (HzxlLogic.getInstance().bFirstUpdateCard && 1 == chairId) {
                                HzxlLogic.getInstance().bFirstUpdateCard = false
                                this.playFaPaiAni(chairId, cards, showCards)
                            } else {
                                showCards()
                            }
                        }
                    }
                    this.mapLoadUi[chairId].bHandCard = false
                    this.mapCardsIndex[chairId].handcardsIndex = cards.length
                }, "hzxl_subpackage")
            }
        } else {
            if (1 != chairId && this.mapCardsIndex[chairId].handcardsIndex == cards.length && !HzxlLogic.getInstance().videoData) {
                let ndCard = cc.find("14", nodeArea)
                if (ndCard && ndCard.isValid) {
                    ndCard.active = false
                }
            } else {
                if (HzxlLogic.getInstance().bFirstUpdateCard && 1 == chairId) {
                    HzxlLogic.getInstance().bFirstUpdateCard = false
                    this.playFaPaiAni(chairId, cards, showCards)
                } else {
                    showCards()
                }
            }
            this.mapCardsIndex[chairId].handcardsIndex = cards.length
        }

        // if (1 != chairId && this.mapCardsIndex[chairId].handcardsIndex == cards.length) {
        //     let ndCard = nodeArea.getChildByName("14")
        //     ndCard.active = false
        // } else {
        //     showCards()
        // }
        // this.mapCardsIndex[chairId].handcardsIndex = cards.length
    }

    // 播放开局发牌动画
    playFaPaiAni(chairId, cards, callback) {
        let curCard = -1
        if (this.mapCards && this.mapCards[chairId]) {
            curCard = this.mapCards[chairId].card
        }
        if(curCard > 0){
            cards.push(curCard)
        }
        console.log("playFaPaiAni", cards)
        let name = "handCard" + (chairId - 1) + "/layer1"
        if (HzxlLogic.getInstance().videoData && 1 != chairId) {
            name = "handCardFront" + (chairId - 1) + "/layer1"
        }
        let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if(nodeArea && cc.isValid(nodeArea)){
            let repalceMj = (bRandom, nodeActive, valueActive) => {                
                if (cc.isValid(nodeArea)) {
                    let tempCards = cards.slice()
                    if (bRandom) {
                        // 随机打乱
                        tempCards.sort(function () { return 0.5 - Math.random() })
                    }
                    for (let i = 0; i < cards.length; i++) {
                        let ndValue = cc.find((i+1) + "/value", nodeArea)
                        ndValue.active = valueActive
                        let ndCard = cc.find((i+1).toString(), nodeArea)
                        if (ndCard && ndCard.isValid) {
                            let mjCard:MjPrefab = ndCard.getComponent("hzxl-Prefab")
                            if (!mjCard) {
                                mjCard = ndCard.addComponent("hzxl-Prefab")
                            } else {
                                mjCard.resetPosition()
                            }
                            mjCard.initMj(chairId, CardArea.HandCard, tempCards[i])
                            mjCard.setOriginPositon()
                            mjCard.removeLackMark()
                            mjCard.setActive(nodeActive)
                        }
                    }
                }
            }
            // 随机显示牌
            repalceMj(true, false, true)
            for (let n = 0; n < 4; n++) {
                for (let i = 1; i <= 4; i++) {
                    if((n * 4 + i) <= cards.length){
                        let ndCard = cc.find((n * 4 + i).toString(), nodeArea)
                        if (cc.isValid(ndCard)) {
                            let flop = ()=>{
                                AudioMgr.playSound("audio_select_group")
                                let ani = ndCard.getComponent(cc.Animation)
                                ani.play("flop")
                                if (cc.isValid(ndCard)) {
                                    ndCard.active = true
                                    let mjCard:MjPrefab = ndCard.getComponent("hzxl-Prefab")
                                    if(mjCard){
                                        mjCard.setActive(true)
                                    }
                                }
                            }
                            // 4441显示
                            if(n == 0){
                                flop()
                            }else{
                                this.scheduleOnce(() => {
                                    flop()
                                }, 0.15 * (n))
                            }
                            this.scheduleOnce(() => {
                                let ani = ndCard.getComponent(cc.Animation)
                                if (cc.isValid(ani)) {
                                    // 整体翻倒
                                    ani.play("flop_back")
                                    this.scheduleOnce(() => {
                                        // 排序显示牌                                
                                        repalceMj(false, true, false)
                                        this.scheduleOnce(() => {
                                            if (cc.isValid(ani)) {
                                                // 整体再翻牌
                                                repalceMj(false, true, true)
                                                ani.play("flop")
                                                // this.scheduleOnce(() => {
                                                //     if (cc.isValid(nodeArea)) {
                                                //         nodeArea.destroy()
                                                //         if (callback) {
                                                //             callback()
                                                //         }
                                                //     }
                                                // }, 0.3)
                                            }
                                        }, 0.2)
                                    }, 0.1)
                                }
                            }, 1.2)
                        }
                    }
                }
            }
        }

        return

        let ndParent = this.getAreas("handCard", chairId - 1)
        scmjUtil.loadAsset("prefabs/FlopHandCards" + (chairId - 1), cc.Prefab, (res) => {
            if (cc.isValid(ndParent) && res) {
                let ndFlopHandCards = cc.instantiate(res)
                ndFlopHandCards.parent = ndParent
                let repalceMj = (bRandom?) => {
                    scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (resMj) => {
                        if (cc.isValid(ndFlopHandCards) && resMj) {
                            let tempCards = cards.slice()
                            if (bRandom) {
                                // 随机打乱
                                tempCards.sort(function () { return 0.5 - Math.random() })
                            }
                            for (let i = 1; i < 14; i++) {
                                let ndValue = cc.find(i + "/value", ndFlopHandCards)
                                if (cc.isValid(ndValue)) {
                                    ndValue.getComponent(cc.Sprite).spriteFrame = resMj.getSpriteFrame(tempCards[i - 1])
                                }
                            }
                        }
                    })
                }
                // 随机显示牌
                repalceMj(true)
                for (let n = 0; n < 4; n++) {
                    for (let i = 1; i <= 4; i++) {
                        let ndCard = cc.find((n * 4 + i).toString(), ndFlopHandCards)
                        if (cc.isValid(ndCard)) {
                            // 4441显示
                            this.scheduleOnce(() => {
                                if (cc.isValid(ndCard)) {
                                    ndCard.active = true
                                }
                            }, 0.3 * (n + 1))
                            this.scheduleOnce(() => {
                                let ani = ndCard.getComponent(cc.Animation)
                                if (cc.isValid(ani)) {
                                    // 整体翻倒
                                    ani.play("flop_back")
                                    // 排序显示牌    
                                    repalceMj()
                                    this.scheduleOnce(() => {                                    
                                        if (cc.isValid(ani)) {
                                            // 整体再翻牌
                                            ani.play("flop")
                                            this.scheduleOnce(() => {
                                                if (cc.isValid(ndFlopHandCards)) {
                                                    ndFlopHandCards.destroy()
                                                    if (callback) {
                                                        callback()
                                                    }
                                                }
                                            }, 0.3)
                                        }
                                    }, 0.3)
                                }
                            }, 1.2)
                        }
                    }
                }
            }
        }, "hzxl_subpackage")
    }
    
    // 刷新当前摸到的牌
    refleshCurCard(chairId, card) {
        // izx.log("CardLayer refleshCurCard")
        // izx.log("chairId = ", chairId)
        // izx.log("cards = ", card)
        if (card == 0) {
            return
        }

        let showCards = () => {
            let ndCard = nodeArea.getChildByName("14")
            ndCard.active = true
            if (chairId == 1) {
                let mjCard = ndCard.getComponent("hzxl-Prefab")
                if (!mjCard) {
                    mjCard = ndCard.addComponent("hzxl-Prefab")
                } else {
                    mjCard.resetPosition()
                }
                mjCard.initMj(chairId, CardArea.CurCard, card)
                mjCard.setOriginPositon()
                mjCard.removeLackMark()
                mjCard.drawLackMark(this.lack)

                if (this.bCurCardAni) {
                    this.bCurCardAni = false
                    mjCard.startChangeAni()
                }
            }
        }

        let name = "handCard" + (chairId - 1) + "/layer1"
        let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if (nodeArea == null) {
            /*let ndParent = this.node.getChildByName("nodePlayer" + (chairId - 1))
            scmjUtil.loadAsset("prefabs/HandCards" + (chairId - 1), cc.Prefab, (res) => {
                nodeArea = cc.instantiate(res)
                nodeArea.parent = ndParent

                showCards()
            })*/
        } else {
            showCards()
        }
    }

    // 刷新胡牌
    refleshHucards(chairId, cards) {
        // izx.log("CardLayer refleshHucards")
        // izx.log("chairId = ", chairId)
        // izx.log("cards = ", cards)
        if (this.mapLoadUi[chairId].bHuCardArea) {
            return
        }
        let showCards = () => {
            if (nodeArea && nodeArea.isValid) {
                let curLayer = 1
                for (let i = 0; i < cards.length; i++) {
                    let card = cards[i]
                    let layer = Math.floor(i / 5)
                    let index = i % 5
                    if (2 == chairId || 4 == chairId) {
                        layer = Math.floor(i / 6)
                        index = i % 6
                    }
                    if (layer != curLayer - 1) {
                        curLayer++
                        let temp = nodeArea.getChildByName("layer" + curLayer)
                        if (!temp) {
                            let ndLayer1 = nodeArea.getChildByName("layer1")
                            let newLayer = cc.instantiate(ndLayer1)
                            newLayer.name = "layer" + curLayer
                            for (let v of newLayer.children) {
                                v.active = false
                            }
                            newLayer.parent = nodeArea
                            if (1 == chairId || 2 == chairId) {
                                newLayer.x += (curLayer - 1) * 5
                            } else if (4 == chairId) {
                                newLayer.x -= (curLayer - 1) * 5
                            }
                            newLayer.y += (curLayer - 1) * 15
                        }
                    }
                    nodeArea.getChildByName("layer" + curLayer).active = true
                    let ndCard = cc.find("layer" + curLayer + "/" + (index + 1), nodeArea)
                    // ndCard.active = true
                    let mjCard = ndCard.getComponent("hzxl-Prefab")
                    if (!mjCard) {
                        mjCard = ndCard.addComponent("hzxl-Prefab")
                    }
                    mjCard.initMj(chairId, CardArea.HuCard, card)
                    mjCard.setOriginPositon()

                    if (1 == chairId && cards.length > this.curHuCardsIndex && i == cards.length - 1 && this.isForeground) {
                        this.curHuCardsIndex = cards.length
                        scmjUtil.loadAsset("prefabs/AniHu18_1", cc.Prefab, (res) => {
                            if (cc.isValid(ndCard) && res) {
                                let ndHu = cc.instantiate(res)
                                ndHu.parent = ndCard
                                let skeleton = <sp.Skeleton>ndHu.getComponent(sp.Skeleton);
                                skeleton.setCompleteListener(() => {
                                    ndHu.destroy()
                                })
                            }
                        })
                    }
                    // todo:待完善胡牌区域提示
                    if (false && 1 == chairId && (cards.length - 1) > this.curHuCardsIndex) {
                        this.curHuCardsIndex = cards.length - 1
                        let card = cards[this.curHuCardsIndex]
                        let maxRatio = 0
                        for (let v of this.mapTingCards) {
                            for (let v2 of v.tingCards) {
                                if (v2.card == card) {
                                    maxRatio = v2.ratio
                                }
                            }
                        }
                        scmjUtil.loadAsset("prefabs/TipHu", cc.Prefab, (res) => {
                            let node = cc.instantiate(res)
                            node.parent = ndCard
                            node.y = 20
                            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res2) => {
                                cc.find("SptBg/SptMj", node).getComponent(cc.Sprite).spriteFrame = res2.getSpriteFrame(card)
                            })
                            cc.find("SptBg/SptRatioBg/lblRatio", node).getComponent(cc.Label).string = maxRatio + "倍"

                            let skeleton = <sp.Skeleton>node.getChildByName("Background").getComponent(sp.Skeleton);
                            skeleton.setCompleteListener(() => {
                                node.destroy()
                            })
                        })
                    }
                }
            }
        }

        let showCard = (newIndex) => {
            if (nodeArea && nodeArea.isValid) {
                let curLayer = 1
                let i = newIndex
                let card = cards[i]
                let layer = Math.floor(i / 5)
                let index = i % 5
                if (2 == chairId || 4 == chairId) {
                    layer = Math.floor(i / 6)
                    index = i % 6
                }
                if (layer != curLayer - 1) {
                    if (2 == chairId || 4 == chairId) {
                        curLayer = Math.ceil((i + 1) / 6)
                    } else {
                        curLayer = Math.ceil((i + 1) / 5)
                    }
                    let temp = nodeArea.getChildByName("layer" + curLayer)
                    if (!temp) {
                        let ndLayer1 = nodeArea.getChildByName("layer1")
                        let newLayer = cc.instantiate(ndLayer1)
                        newLayer.name = "layer" + curLayer
                        for (let v of newLayer.children) {
                            v.active = false
                        }
                        newLayer.parent = nodeArea
                        if (1 == chairId || 2 == chairId) {
                            newLayer.x += (curLayer - 1) * 5
                        } else if (4 == chairId) {
                            newLayer.x -= (curLayer - 1) * 5
                        }
                        newLayer.y += (curLayer - 1) * 15
                    }
                }
                nodeArea.getChildByName("layer" + curLayer).active = true
                let ndCard = cc.find("layer" + curLayer + "/" + (index + 1), nodeArea)
                // ndCard.active = true
                let mjCard = ndCard.getComponent("hzxl-Prefab")
                if (!mjCard) {
                    mjCard = ndCard.addComponent("hzxl-Prefab")
                }
                mjCard.initMj(chairId, CardArea.HuCard, card)
                mjCard.setOriginPositon()

                if (1 == chairId && cards.length > this.curHuCardsIndex && i == cards.length - 1 && this.isForeground) {
                    this.curHuCardsIndex = cards.length
                    scmjUtil.loadAsset("prefabs/AniHu18_1", cc.Prefab, (res) => {
                        if (cc.isValid(ndCard && res)) {
                            let ndHu = cc.instantiate(res)
                            ndHu.parent = ndCard
                            let skeleton = <sp.Skeleton>ndHu.getComponent(sp.Skeleton);
                            skeleton.setCompleteListener(() => {
                                ndHu.destroy()
                            })
                        }
                    })
                }
            }
        }

        let name = "huCardArea" + (chairId - 1)
        let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if (nodeArea.childrenCount == 0) {
            this.mapLoadUi[chairId].bHuCardArea = true
            scmjUtil.loadAsset("prefabs/HuCardLayer" + (chairId - 1), cc.Prefab, (res) => {
                if (cc.isValid(nodeArea) && res) {
                    let node = cc.instantiate(res)
                    node.parent = nodeArea

                    if (this.mapCardsIndex[chairId].hucardsIndex + 1 == cards.length) {
                        showCard(this.mapCardsIndex[chairId].hucardsIndex)
                    } else if (this.mapCardsIndex[chairId].hucardsIndex == cards.length) {
                    } else {
                        showCards()
                    }
                }
                this.mapLoadUi[chairId].bHuCardArea = false
                this.mapCardsIndex[chairId].hucardsIndex = cards.length
            }, "hzxl_subpackage")
        } else {
            if (this.mapCardsIndex[chairId].hucardsIndex + 1 == cards.length) {
                showCard(this.mapCardsIndex[chairId].hucardsIndex)
            } else if (this.mapCardsIndex[chairId].hucardsIndex == cards.length) {
            } else {
                showCards()
            }
            this.mapCardsIndex[chairId].hucardsIndex = cards.length
        }

        // if (this.mapCardsIndex[chairId].hucardsIndex + 1 == cards.length) {
        //     showCard(this.mapCardsIndex[chairId].hucardsIndex)
        // } else if (this.mapCardsIndex[chairId].hucardsIndex == cards.length) {
        // } else {
        //     showCards()
        // }
        // this.mapCardsIndex[chairId].hucardsIndex = cards.length
    }

    // 刷新出牌
    refleshDisplaycards(chairId, cards) {
        // izx.log("CardLayer refleshDisplaycards")
        // izx.log("chairId = ", chairId)
        // izx.log("cards = ", cards)
        if (this.mapLoadUi[chairId].bPutCardArea) {
            return
        }
        let showCards = () => {
            if (nodeArea && nodeArea.isValid) {
                let curLayer = 1
                for (let i = 0; i < cards.length; i++) {
                    let layer = Math.floor(i / 18)
                    let index = i % 18
                    if (layer != curLayer - 1) {
                        curLayer++
                        let temp = nodeArea.getChildByName("layer" + curLayer)
                        if (!temp) {
                            let ndLayer1 = nodeArea.getChildByName("layer1")
                            let newLayer = cc.instantiate(ndLayer1)
                            newLayer.name = "layer" + curLayer
                            for (let v of newLayer.children) {
                                v.active = false
                            }
                            newLayer.parent = nodeArea
                            newLayer.y += (curLayer - 1) * 16
                        }
                    }
                    nodeArea.getChildByName("layer" + curLayer).active = true
                    let ndCard = cc.find("layer" + curLayer + "/" + (index + 1), nodeArea)
                    // ndCard.active = true
                    let mjCard = ndCard.getComponent("hzxl-Prefab")
                    if (!mjCard) {
                        mjCard = ndCard.addComponent("hzxl-Prefab")
                    }
                    mjCard.initMj(chairId, CardArea.DisplayCard, cards[i])
                    mjCard.setOriginPositon()
                    // endCard = mjCard
                }

                // if (endCard) {
                //     return endCard.node
                // } else {
                //     return null
                // }
            }
        }

        let showCard = (newIndex) => {
            if (nodeArea && nodeArea.isValid) {
                let curLayer = 1
                let i = newIndex
                let layer = Math.floor(i / 18)
                let index = i % 18
                if (layer != curLayer - 1) {
                    curLayer++
                    let temp = nodeArea.getChildByName("layer" + curLayer)
                    if (!temp) {
                        let ndLayer1 = nodeArea.getChildByName("layer1")
                        let newLayer = cc.instantiate(ndLayer1)
                        newLayer.name = "layer" + curLayer
                        for (let v of newLayer.children) {
                            v.active = false
                        }
                        newLayer.parent = nodeArea
                        newLayer.y += (curLayer - 1) * 16
                    }
                }
                nodeArea.getChildByName("layer" + curLayer).active = true
                let ndCard = cc.find("layer" + curLayer + "/" + (index + 1), nodeArea)
                // ndCard.active = true
                let mjCard = ndCard.getComponent("hzxl-Prefab")
                if (!mjCard) {
                    mjCard = ndCard.addComponent("hzxl-Prefab")
                }
                mjCard.initMj(chairId, CardArea.DisplayCard, cards[i])
                mjCard.setOriginPositon()
            }
        }

        let hideCard = (oldIndex) => {
            if (nodeArea && nodeArea.isValid) {
                let curLayer = 1
                let i = oldIndex
                let layer = Math.floor(i / 18)
                let index = i % 18
                if (layer != curLayer - 1) {
                    curLayer++
                }
                nodeArea.getChildByName("layer" + curLayer).active = true
                let ndCard = cc.find("layer" + curLayer + "/" + (index + 1), nodeArea)
                if (ndCard && ndCard.isValid) {
                    ndCard.active = false
                }
            }
        }

        // let endCard = null
        let name = "putCardArea" + (chairId - 1)
        let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        /*if (nodeArea.childrenCount == 0) {
            this.mapLoadUi[chairId].bPutCardArea = true
            scmjUtil.loadAsset("prefabs/PutCardLayer" + (chairId - 1), cc.Prefab, (res) => {
                let node = cc.instantiate(res)
                node.parent = nodeArea
                this.mapLoadUi[chairId].bPutCardArea = false

                // return showCards()
                showCards()
            })
        } else {
            // for (let v of nodeArea.children) {
            //     v.active = false
            //     for (let v2 of v.children) {
            //         v2.active = false
            //     }
            //     v.getChildByName("ani").active = true
            // }
            // return showCards()
            showCards()
        }*/

        if (nodeArea && nodeArea.childrenCount == 0) {
            this.mapLoadUi[chairId].bPutCardArea = true
            scmjUtil.loadAsset("prefabs/PutCardLayer" + (chairId - 1), cc.Prefab, (res) => {
                if (cc.isValid(nodeArea) && res) {
                    let node = cc.instantiate(res)
                    node.parent = nodeArea

                    if (this.mapCardsIndex[chairId].dispcardsIndex + 1 == cards.length) {
                        showCard(this.mapCardsIndex[chairId].dispcardsIndex)
                    } else if (this.mapCardsIndex[chairId].dispcardsIndex - 1 == cards.length) {
                        hideCard(this.mapCardsIndex[chairId].dispcardsIndex - 1)
                    } else if (this.mapCardsIndex[chairId].dispcardsIndex == cards.length) {
                    } else {
                        showCards()
                    }
                }
                this.mapLoadUi[chairId].bPutCardArea = false
                this.mapCardsIndex[chairId].dispcardsIndex = cards.length
            }, "hzxl_subpackage")
        } else {
            if (this.mapCardsIndex[chairId].dispcardsIndex + 1 == cards.length) {
                showCard(this.mapCardsIndex[chairId].dispcardsIndex)
            } else if (this.mapCardsIndex[chairId].dispcardsIndex - 1 == cards.length) {
                hideCard(this.mapCardsIndex[chairId].dispcardsIndex - 1)
            } else if (this.mapCardsIndex[chairId].dispcardsIndex == cards.length) {
            } else {
                showCards()
            }
            this.mapCardsIndex[chairId].dispcardsIndex = cards.length
        }

        // if (this.mapCardsIndex[chairId].dispcardsIndex + 1 == cards.length) {
        //     showCard(this.mapCardsIndex[chairId].dispcardsIndex)
        // } else if (this.mapCardsIndex[chairId].dispcardsIndex - 1 == cards.length) {
        //     hideCard(this.mapCardsIndex[chairId].dispcardsIndex - 1)
        // } else if (this.mapCardsIndex[chairId].dispcardsIndex == cards.length) {
        // } else {
        //     showCards()
        // }
        // this.mapCardsIndex[chairId].dispcardsIndex = cards.length
    }

    aniFire() {
        if (!this.isForeground) {
            return
        }
        let name = "handCard0/layer1"
        let nodeArea = scmjUtil.pathNode(name, this.mapNodePaths, this.node)
        if (nodeArea == null) {
            return
        }
        scmjUtil.loadAsset("prefabs/AniFire", cc.Prefab, (res) => {
            scmjUtil.vibrate()
            if (cc.isValid(this.node) && res) {
                for (let i = 1; i <= 13; i++) {
                    let ndCard = nodeArea.getChildByName(i.toString())
                    if (ndCard.active) {
                        let ndAniFire = cc.instantiate(res)
                        ndAniFire.parent = ndCard
                        let skeleton = <sp.Skeleton>ndAniFire.getComponent(sp.Skeleton);
                        skeleton.setCompleteListener(() => {
                            ndAniFire.destroy()
                        })
                        // ndAniFire.y = 70
                        // ndAniFire.runAction(cc.sequence(cc.delayTime(1), cc.removeSelf(true), cc.destroySelf()))
                    }
                }
            }
        })
    }

    getLeftcards(chairId, callback?) {
        if (callback) {
            if (this.mapCards && this.mapCards[chairId]) {
                callback(this.mapCards[chairId].leftcards)
            }
        }
    }

    getHandcardsAndCurcard(chairId, callback?) {
        if (callback) {
            if (this.mapCards && this.mapCards[chairId]) {
                let cards = this.mapCards[chairId].handcards.slice()
                if (1 == chairId) {
                    cards = scmjUtil.sortLack(cards, this.lack, true)
                    if (this.mapCards[chairId].card) {
                        cards.push(this.mapCards[chairId].card)
                    }
                    callback(cards, this.lack)
                } else {
                    izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA, (playersData) => {
                        let lack = -1
                        for (let v of playersData) {
                            if (v.chairId == chairId) {
                                lack = v.lack
                                break
                            }
                        }
                        cards = scmjUtil.sortLack(cards, lack, true)
                        if (this.mapCards[chairId].card) {
                            cards.push(this.mapCards[chairId].card)
                        }
                        callback(cards, lack)
                    })
                }
            }
        }
    }

    getSelfCards(callback?) {
        if (callback) {
            if (this.mapCards && this.mapCards[1]) {
                callback(this.mapCards[1])
            }
        }
    }

    isHu(chairId) {
        if (this.mapCards[chairId] && this.mapCards[chairId].hucards && this.mapCards[chairId].hucards.length > 0) {
            return true
        } else {
            return false
        }
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        scmjUtil.addEnterGameScene("cardLayer-onLoad")
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {
        scmjUtil.addEnterGameScene("cardLayer-start")
        this.onOpen()
        this.registerEvent()
        scmjUtil.addEnterGameScene("cardLayer-start-end")
    }

    // update (dt) {}
}
