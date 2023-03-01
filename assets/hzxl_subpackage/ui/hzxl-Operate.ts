import { SCMJ_EVENT } from "../hzxl-Events"
import { LackType, OperatorCode } from "../hzxl-Constants";
import { scmjUtil } from "../hzxl-Util";

import { igs } from "../../igs";
import { AudioMgr } from "../hzxl-AudioMgr";
import BaseUI from "../../lobby/start/script/base/BaseUI";
import HzxlLogic from "../hzxl-logic";
import { User } from "../../lobby/start/script/data/User";
import { Helper } from "../../lobby/start/script/system/Helper";
import { scmj } from "../proto/pbScmj";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class mjOperate extends cc.Component {
    @property(cc.Node)
    nodeLack = null
    @property(cc.Node)
    LackTip = null
    @property(cc.Node)
    nodeBtns = null
    @property(cc.Node)
    nodeCards = null
    @property(cc.Node)
    contentCards = null
    // @property(cc.Node)
    // btnChow = null
    // @property(cc.Node)
    btnPong = null
    // @property(cc.Node)
    btnKong = null
    // @property(cc.Node)
    btnHu = null
    // @property(cc.Node)
    btnZimo = null
    // @property(cc.Node)
    btnGiveUp = null
    // @property(cc.Node)
    // nodeAuto = null
    @property(cc.Node)
    nodeChange = null
    @property(cc.Node)
    nodePlayTip = null

    @property(cc.SpriteFrame)
    lack_0: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    lack_1: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    lack_2: cc.SpriteFrame = null

    origPos = [cc.v2(300, 0), cc.v2(150, 0), cc.v2(0, 0), cc.v2(-150, 0), cc.v2(-300, 0)]
    mapOpCode = {}
    operates:scmj.OperateReq.IOperate[] = []
    // chowOpCodes = [OperatorCode.OP_CHOW]
    pongOpcodes = [OperatorCode.OP_PONG]
    kongOpcodes = [OperatorCode.OP_KONG, OperatorCode.OP_KONG_DARK, OperatorCode.OP_KONG_TURN]
    huOpcodes = [OperatorCode.OP_HU_DIANPAO, OperatorCode.OP_HU_AFTER_KONG_TURN]
    zimoOpcodes = [OperatorCode.OP_HU_ZIMO]
    giveupOpcodes = [OperatorCode.OP_GIVEUP]
    countBtnNum = 0
    // 接收到的操作码
    reqOpCodes = []
    // 接收到的操作牌
    reqOpCard = 0
    // 响应的操作码
    rspOpCode = 0
    // 响应的操作相关牌，仅吃
    rspOpCards = []
    // 定缺
    lack = LackType.None
    // 换牌
    changeCards = []
    //换三张倒计时
    second = 10

    changeTimer = null

    onOpen() {
        let paths = ["prefabs/BtnGiveUp", "prefabs/BtnPong", "prefabs/BtnKong", "prefabs/BtnZimo", "prefabs/BtnHu"]
        for (let v of paths) {
            scmjUtil.loadAsset(v, cc.Prefab, (res) => {
                if (cc.isValid(this.nodeBtns) && res) {
                    let btnName = v.replace("prefabs/B", "b")
                    this[btnName] = cc.instantiate(res)
                    this[btnName].on(cc.Node.EventType.TOUCH_END, function (event) {
                        let funcName = v.replace("prefabs/", "on")
                        this[funcName]()
                    }, this)
                    this[btnName].parent = this.nodeBtns
                }
            }, User.PlayGame == 0 ? "hzxl_subpackage" : null)
        }

        let protoData = <any>HzxlLogic.getInstance().protoData
        if (protoData && protoData.lackReq) {
            this.displayLack(protoData.lackReq)
            protoData.lackReq = null
        } else if (protoData && protoData.exchangeReq) {
            this.changeCards = protoData.exchangeReq.cards
            this.exchangeReq(protoData.exchangeReq)
            protoData.exchangeReq = null
        }
    }

    resetOperate() {
        this.mapOpCode = {}
        this.reqOpCodes = []
        this.reqOpCard = 0
        this.rspOpCode = 0
        this.rspOpCards = []
        // this.btnChow.active = false
        if (this.btnPong) {
            this.btnPong.active = false
        }
        if (this.btnKong) {
            this.btnKong.active = false
        }
        if (this.btnHu) {
            this.btnHu.active = false
        }
        if (this.btnZimo) {
            this.btnZimo.active = false
        }
        if (this.btnGiveUp) {
            this.btnGiveUp.active = false
        }
        this.countBtnNum = 0
    }

    getChowCards(opCard) {
        let chowCards = []
        izx.dispatchEvent(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, 1, (cards) => {
            let mapHandcard = {}
            for (let v of cards) {
                mapHandcard[v] = true
            }
            let round = opCard / 10
            round = parseInt(round + "")
            if (mapHandcard[opCard - 2] && mapHandcard[opCard - 1] &&
                parseInt((opCard - 2) / 10 + "") == round && parseInt((opCard - 1) / 10 + "") == round) {
                chowCards.push([opCard - 2, opCard - 1, opCard])
            }
            if (mapHandcard[opCard - 1] && mapHandcard[opCard + 1] &&
                parseInt((opCard - 1) / 10 + "") == round && parseInt((opCard + 1) / 10 + "") == round) {
                chowCards.push([opCard - 1, opCard, opCard + 1])
            }
            if (mapHandcard[opCard + 1] && mapHandcard[opCard + 2] &&
                parseInt((opCard + 1) / 10 + "") == round && parseInt((opCard + 2) / 10 + "") == round) {
                chowCards.push([opCard, opCard + 1, opCard + 2])
            }
        })
        return chowCards
    }

    displayChowCards(chowCards, opCard) {
        this.nodeBtns.active = false
        this.nodeCards.active = true
        this.contentCards.removeAllChildren()
        this.contentCards.x = 0
        let offsetX = 0
        let gap = 20
        scmjUtil.loadAsset("prefabs/SelectChow", cc.Prefab, (res) => {
            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res2) => {
                if (cc.isValid(this.contentCards) && res && res2) {
                    for (let v of chowCards) {
                        let node = cc.instantiate(res)
                        let width = node.getChildByName("BgCards").getBoundingBox().width
                        node.x = offsetX + width / 2
                        offsetX += width + gap
                        for (let i = 0; i < v.length; i++) {
                            let card = cc.find("Card" + i + "/SptValue", node).getComponent(cc.Sprite)
                            card.spriteFrame = res2.getSpriteFrame(v[i])
                            if (v[i] == opCard) {
                                let gray = cc.find("Card" + i + "/SptGray", node)
                                gray.active = true
                            }
                        }
                        izx.Button.bindButtonClick("BtnCard", node, (sender, data) => {
                            this.sendOperateRsp(OperatorCode.OP_CHOW, opCard, v)
                        })
                        node.parent = this.contentCards
                    }
                }
            })
        })
        this.contentCards.x -= (offsetX - gap) / 2
    }

    onBtnChow() {
        izx.log("mjOperate onBtnChow")
        AudioMgr.playBtn()
        let chowCards = this.getChowCards(this.reqOpCard)
        if (chowCards.length > 0) {
            if (chowCards.length == 1) {
                this.sendOperateRsp(OperatorCode.OP_CHOW, this.reqOpCard, chowCards[0])
            } else {
                this.displayChowCards(chowCards, this.reqOpCard)
            }
        }
    }

    onBtnPong() {
        izx.log("mjOperate onBtnPong")
        AudioMgr.playBtn()
        izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
        this.sendOperateRsp(OperatorCode.OP_PONG, this.reqOpCard)
    }
    // 获取明杠的牌
    getKongCards(opCard) {
        if (this.mapOpCode[OperatorCode.OP_KONG] && opCard > 0) {
            return [opCard]
        } else {
            return []
        }

    }
    // 获取暗杠的牌
    getKongDarkCards() {
        let cards = []
        for(let v of this.operates){
            if(v.opcode == OperatorCode.OP_KONG_DARK){
                cards.push(v.opCard)
            }
        }
        return cards
        if (this.mapOpCode[OperatorCode.OP_KONG_DARK]) {
            let cards = []
            izx.dispatchEvent(SCMJ_EVENT.GET_SELF_CARDS, (mapCards) => {
                let handcards = mapCards.handcards
                let mapHandcard = {}
                for (let v of handcards) {
                    if (mapHandcard[v]) {
                        mapHandcard[v]++
                    } else {
                        mapHandcard[v] = 1
                    }
                }
                let curcard = mapCards.card
                if (curcard > 0) {
                    if (mapHandcard[curcard]) {
                        mapHandcard[curcard]++
                    } else {
                        mapHandcard[curcard] = 1
                    }
                }
                for (let card in mapHandcard) {
                    if (mapHandcard[card] == 4 && parseInt(parseInt(card) / 10 + "") != this.lack) {
                        cards.push(card)
                    }
                }
            })
            return cards
        } else {
            return []
        }

    }

    // 获取补杠的牌
    getKongTurnCards() {
        let cards = []
        for(let v of this.operates){
            if(v.opcode == OperatorCode.OP_KONG_TURN){
                cards.push(v.opCard)
            }
        }
        return cards
        if (this.mapOpCode[OperatorCode.OP_KONG_TURN]) {
            let cards = []
            izx.dispatchEvent(SCMJ_EVENT.GET_SELF_CARDS, (mapCards) => {
                let handcards = mapCards.handcards
                let mapHandcard = {}
                for (let v of handcards) {
                    if (mapHandcard[v]) {
                        mapHandcard[v]++
                    } else {
                        mapHandcard[v] = 1
                    }
                }
                let curcard = mapCards.card
                if (curcard > 0) {
                    if (mapHandcard[curcard]) {
                        mapHandcard[curcard]++
                    } else {
                        mapHandcard[curcard] = 1
                    }
                }
                let mapLeftcard = {}
                let leftcards = mapCards.leftcards
                let isChair = true
                for (let v of leftcards) {
                    if (v != -99) {
                        if (isChair) {
                            isChair = false
                        } else {
                            if (mapLeftcard[v]) {
                                mapLeftcard[v]++
                            } else {
                                mapLeftcard[v] = 1
                            }
                        }
                    } else {
                        isChair = true
                    }
                }
                for (let card in mapLeftcard) {
                    if (mapLeftcard[card] == 3 && mapHandcard[card] == 1) {
                        cards.push(card)
                    }
                }
            })
            return cards
        } else {
            return []
        }
    }

    displayKongCards(mapCardOpcode) {
        this.nodeBtns.active = false
        this.nodeCards.active = true
        this.contentCards.removeAllChildren()
        this.contentCards.x = 0
        let offsetX = 0
        let gap = 20
        scmjUtil.loadAsset("prefabs/SelectKong", cc.Prefab, (res) => {
            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res2) => {
                if (cc.isValid(this.contentCards) && res && res2) {
                    for (let i in mapCardOpcode) {
                        let opcode = mapCardOpcode[i]
                        let node = cc.instantiate(res)
                        let width = node.getChildByName("BgCards").getBoundingBox().width
                        node.x = offsetX + width / 2
                        offsetX += width + gap
                        let card = cc.find("Card0/SptValue", node).getComponent(cc.Sprite)
                        card.spriteFrame = res2.getSpriteFrame(i)
                        izx.Button.bindButtonClick("BtnCard", node, (sender, data) => {
                            this.sendOperateRsp(opcode, i)
                        })
                        node.parent = this.contentCards
                    }
                }
            })
        })
        this.contentCards.x -= (offsetX - gap) / 2
    }

    onBtnKong() {
        izx.log("mjOperate onBtnKong")
        AudioMgr.playBtn()
        // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
        if (this.mapOpCode[OperatorCode.OP_KONG]) {
            // 发送明杠响应
            this.sendOperateRsp(OperatorCode.OP_KONG, this.reqOpCard)
            return
        }
        let darkCards = this.getKongDarkCards()
        let turnCards = this.getKongTurnCards()
        let count = darkCards.length + turnCards.length
        if (count > 0) {
            if (count == 1) {
                let opcode = 0
                let card = 0
                if (darkCards.length == 1) {
                    // 发送暗杠响应
                    opcode = OperatorCode.OP_KONG_DARK
                    card = darkCards[0]
                } else if (turnCards.length == 1) {
                    // 发送补杠响应
                    opcode = OperatorCode.OP_KONG_TURN
                    card = turnCards[0]
                }
                this.sendOperateRsp(opcode, card)
            } else {
                let mapCardOpcode = {}
                for (let v of darkCards) {
                    mapCardOpcode[v] = OperatorCode.OP_KONG_DARK
                }
                for (let v of turnCards) {
                    mapCardOpcode[v] = OperatorCode.OP_KONG_TURN
                }
                this.displayKongCards(mapCardOpcode)
            }
        }
    }

    onBtnHu() {
        izx.log("mjOperate onBtnHu")
        AudioMgr.playBtn()
        // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
        for (let i = 0; i < this.huOpcodes.length; i++) {
            if (this.mapOpCode[this.huOpcodes[i]]) {
                this.sendOperateRsp(this.huOpcodes[i], this.reqOpCard)
                break;
            }
        }
    }

    onBtnZimo() {
        izx.log("mjOperate onBtnZimo")
        AudioMgr.playBtn()
        // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
        for (let i = 0; i < this.zimoOpcodes.length; i++) {
            if (this.mapOpCode[this.zimoOpcodes[i]]) {
                this.sendOperateRsp(this.zimoOpcodes[i], this.reqOpCard)
                break;
            }
        }
    }

    onBtnGiveUp() {
        izx.log("mjOperate onBtnGiveUp")
        AudioMgr.playBtn()
        // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
        this.sendOperateRsp(OperatorCode.OP_GIVEUP, this.reqOpCard)
    }

    onBtnCloseSelect() {
        AudioMgr.playBtn()
        izx.log("mjOperate onBtnCloseSelect")
        this.nodeBtns.active = true
        this.nodeCards.active = false
    }

    playCard(msg) {
        izx.log("mjOperate playCard msg = ", msg)
        this.nodePlayTip.active = false
        izx.dispatchEvent(SCMJ_EVENT.PLAY_LACK_TIP)
        this.sendOperateRsp(OperatorCode.OP_PLAY, msg.card)
    }

    displayBtn(opcodes, btn) {
        if (!cc.isValid(this.node) || !btn) {
            return
        }
        for (let i = 0; i < opcodes.length; i++) {
            if (this.mapOpCode[opcodes[i]]) {
                if(HzxlLogic.getInstance().isGdmj()){
                    // 可以碰
                    //手中立着的牌只剩一对牌加鬼牌时不能碰牌
                    //izx.dispatchEvent(get)                
                    izx.dispatchEvent(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, 1, (cards) => {
                        if (cards.indexOf(HzxlLogic.getInstance().laizi) != -1) {
                            const cc = cards.filter(card => {
                                HzxlLogic.getInstance().laizi != card
                            })
                            if(cc.length == 2 && cc[0] == cc[1]) {
                                Helper.OpenTip("手中立着的牌只剩一对牌加鬼牌时不能碰牌")                       
                            }
                        }
                    })
                }

                btn.active = true
                btn.position = this.origPos[this.countBtnNum]
                this.countBtnNum++
                // if (scmjUtil.isHu(opcodes[i])) {
                //     let pos = this.nodeBtns.convertToWorldSpaceAR(this.btnHu.position)
                //     izx.dispatchEvent(SCMJ_EVENT.GUIDE_HU, { pos: pos })
                // } else if (scmjUtil.isKong(opcodes[i])) {
                //     let pos = this.nodeBtns.convertToWorldSpaceAR(this.btnKong.position)
                //     izx.dispatchEvent(SCMJ_EVENT.GUIDE_GANG, { pos: pos })
                // }
                break
            }
        }
    }

    operateCard(msg: scmj.OperateReq) {
        izx.log("mjOperate displayOperateBtns msg = ", msg)
        izx.log("mjOperate displayOperateBtns ai = ", HzxlLogic.getInstance().ai)
        this.resetOperate()
        // this.node.active = true
        this.operates = msg.operates
        for (let v of msg.operates) {
            this.mapOpCode[v.opcode] = true
        }
        if (HzxlLogic.getInstance().bPivateRoom && HzxlLogic.getInstance().privateRoomInfo.xianshihupaifanxing == 0) {
            let sptBg = cc.find("SptBg", this.btnHu)
            if (sptBg && sptBg.isValid) {
                sptBg.active = false
            }
        } else {
            if (this.mapOpCode[OperatorCode.OP_HU_DIANPAO] || this.mapOpCode[OperatorCode.OP_HU_AFTER_KONG_TURN] || this.mapOpCode[OperatorCode.OP_HU_ZIMO]) {
                izx.log("mjOperate hu card = ", msg.card)
                izx.log("mjOperate msg.tingCards = ", msg.tingCards)
                izx.log("mjOperate msg.tingCard = ", msg.tingCard)
                let card = 0
                let maxRatio = 0
                if (msg.tingCard.length > 0) {
                    card = msg.card
                    for (let v of msg.tingCard) {
                        if (v.card == msg.card) {
                            maxRatio = v.ratio
                            break
                        }
                    }
                }
                izx.log("mjOperate card,maxRatio = ", card, maxRatio)
                scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                    if (cc.isValid(this.btnHu) && cc.isValid(this.btnZimo) && res) {
                        let sptMjHu = cc.find("SptBg/SptMj", this.btnHu)
                        if (sptMjHu && sptMjHu.isValid) {
                            sptMjHu.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(card)
                        }
                        let sptMjZimo = cc.find("SptBg/SptMj", this.btnZimo)
                        if (sptMjZimo && sptMjZimo.isValid) {
                            sptMjZimo.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(card)
                        }
                    }
                })
                let lblRatioHu = cc.find("SptBg/SptRatioBg/lblRatio", this.btnHu)
                if (lblRatioHu && lblRatioHu.isValid) {
                    lblRatioHu.getComponent(cc.Label).string = maxRatio + "倍"
                }
                let lblRatioZimo = cc.find("SptBg/SptRatioBg/lblRatio", this.btnZimo)
                if (lblRatioZimo && lblRatioZimo.isValid) {
                    lblRatioZimo.getComponent(cc.Label).string = maxRatio + "倍"
                }
            }
        }
        this.reqOpCodes = msg.opcodes
        this.reqOpCard = msg.card
        this.nodeBtns.active = true
        // this.nodeCards.active = false
        // this.nodeLack.active = false
        // this.nodeChange.active = false
        this.displayBtn(this.giveupOpcodes, this.btnGiveUp)
        // this.displayBtn(this.chowOpCodes, this.btnChow)
        this.displayBtn(this.pongOpcodes, this.btnPong)
        this.displayBtn(this.kongOpcodes, this.btnKong)
        this.displayBtn(this.huOpcodes, this.btnHu)
        this.displayBtn(this.zimoOpcodes, this.btnZimo)
    }

    sendOperateRsp(opcode, card, opcards = []) {
        if (cc.isValid(this.node)) {
            izx.log("mjOperate sendOperateRsp ", card)
            // this.node.active = false
            this.nodeBtns.active = false
            this.nodeCards.active = false
            izx.dispatchEvent(SCMJ_EVENT.OPERATE_RSP, {
                opcode: opcode,
                card: card,
                opCards: opcards
            })

            if (opcode == OperatorCode.OP_GIVEUP && ((this.btnHu && this.btnHu.active) || (this.btnZimo && this.btnZimo.active))) {

            } else {
                izx.dispatchEvent(SCMJ_EVENT.UPDATE_TING_MARKS, { tingCards: [] })
            }
        }
    }

    initOrigPos() {
        this.origPos.push(this.btnGiveUp.position)
        // this.origPos.push(this.btnChow.position)
        this.origPos.push(this.btnPong.position)
        this.origPos.push(this.btnKong.position)
        this.origPos.push(this.btnHu.position)
        this.origPos.push(this.btnZimo.position)
    }

    sendLackRsp(lack) {
        izx.log("mjOperate sendLackRsp")
        scmjUtil.addGameRoundLack()
        // this.node.active = false
        this.nodeLack.active = false
        this.LackTip.active = false
        izx.dispatchEvent(SCMJ_EVENT.LACK_RSP, lack)
    }

    displayLack(msg) {
        // izx.log("msg = ", msg)
        // this.node.active = true
        // this.nodeBtns.active = false
        // this.nodeCards.active = false
        // this.nodeChange.active = false
        if (this.nodeLack.childrenCount > 0) {
            this.nodeLack.removeAllChildren()
        }
        this.nodeLack.active = true
        izx.dispatchEvent(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, 1, (cards) => {
            let lackIndex = []
            console.log("displayLack handcards: ", cards)
            let crak = []
            let bam = []
            let dot = []
            for (let card of cards) {
                let cardValue = parseInt(card / 10 + "")
                if (cardValue == LackType.CRAK) {
                    crak.push(LackType.CRAK)
                } else if (cardValue == LackType.BAM) {
                    bam.push(LackType.BAM)
                } else if (cardValue == LackType.DOT) {
                    dot.push(LackType.DOT)
                }
            }
            let temp = [crak, bam, dot]
            temp.sort(function (a, b) { return b.length - a.length })
            for (let v of temp) {
                if (v.length > 0 && v[0] != msg.lack) {
                    lackIndex.push(v[0])
                    continue
                }
            }

            if (lackIndex.length != 3) {
                console.log("displayLack lackIndex: ", lackIndex)
                if (1 == lackIndex.length) {
                    for (let i = 0; i < 3; i++) {
                        console.log("displayLack curIndex: ", i, lackIndex, msg.lack)
                        if (i != lackIndex[0] && i != msg.lack) {
                            lackIndex.push(i)
                            break
                        }
                    }
                }
                lackIndex.push(msg.lack)
            }

            let bShow = false
            if (!HzxlLogic.getInstance().bPivateRoom) {
                let track = cc.sys.localStorage.getItem("FIRST_LACK_TIP_SHOW")
                if (track && track.length > 0) {
                } else {
                    bShow = true
                    cc.sys.localStorage.setItem("FIRST_LACK_TIP_SHOW", "1")
                }
            }
            // if (bShow) {
                if (HzxlLogic.getInstance().isGdmj()) {

                } else if (HzxlLogic.getInstance().isHzxl()) {
                    this.LackTip.active = true
                }
            // }

            console.log("displayLack lackIndex: ", lackIndex)
            let btnLackArr = []
            let posArr = [cc.v2(-210, 0), cc.v2(0, 0), cc.v2(210, 0)]
            for (let i = 0; i < lackIndex.length; i++) {
                let lack = lackIndex[i]
                if (i != lackIndex.length - 1 || bShow) {
                    // scmjUtil.loadAsset("images/scmj/lack_" + lack, cc.SpriteFrame, (res) => {
                    let ndLack = new cc.Node()
                    ndLack.active = false
                    btnLackArr.push(ndLack)
                    let sptLack = ndLack.addComponent(cc.Sprite)
                    // sptLack.spriteFrame = res
                    sptLack.spriteFrame = this["lack_" + lack]
                    ndLack.parent = this.nodeLack
                    ndLack.on(cc.Node.EventType.TOUCH_END, () => {
                        AudioMgr.playBtn()
                        btnLackArr = []
                        // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
                        this.nodeLack.removeAllChildren()
                        this.sendLackRsp(lack)
                    })
                    ndLack.setPosition(posArr[i])
                    // })
                    if (i == lackIndex.length - 1 && bShow) {
                        /*scmjUtil.loadAsset("images/scmj/lack_tip", cc.SpriteFrame, (res) => {
                            if (cc.isValid(ndLack) && res) {
                                let ndTip = new cc.Node()
                                let sptTip = ndTip.addComponent(cc.Sprite)
                                sptTip.spriteFrame = res
                                ndTip.parent = ndLack
                                ndTip.x = -30
                                ndTip.y = 40
                            }
                        }, "hzxl_subpackage")*/

                        for (let v of btnLackArr) {
                            if (cc.isValid(v)) {
                                v.active = true
                            }
                        }

                        scmjUtil.loadAsset("prefabs/AniHand", cc.Prefab, (res2) => {
                            if (cc.isValid(ndLack) && res2) {
                                let ndHand = cc.instantiate(res2)
                                ndHand.parent = ndLack
                                ndHand.x = ndLack.width / 5
                                ndHand.y -= ndLack.height / 5
                            }
                        }, "hzxl_subpackage")
                    }
                } else {
                    scmjUtil.loadAsset("prefabs/BtnLack" + lack, cc.Prefab, (res) => {
                        if (cc.isValid(this.nodeLack) && res) {
                            for (let v of btnLackArr) {
                                if (cc.isValid(v)) {
                                    v.active = true
                                }
                            }

                            let ndLack = cc.instantiate(res)
                            ndLack.parent = this.nodeLack
                            ndLack.on(cc.Node.EventType.TOUCH_END, () => {
                                AudioMgr.playBtn()
                                btnLackArr = []
                                // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
                                this.nodeLack.removeAllChildren()
                                this.sendLackRsp(lack)
                            })
                            ndLack.setPosition(posArr[i])
                            // let recommendLack = cc.find("LackTip", ndLack)
                            // recommendLack.active = true
                            // let pos = this.nodeLack.convertToWorldSpaceAR(recommendLack.parent.position)
                            // izx.dispatchEvent(SCMJ_EVENT.GUIDE_LACK, { pos: pos })

                            if (bShow) {
                                scmjUtil.loadAsset("prefabs/AniHand", cc.Prefab, (res2) => {
                                    if (cc.isValid(ndLack) && res2) {
                                        let ndHand = cc.instantiate(res2)
                                        ndHand.parent = ndLack
                                        ndHand.x = ndLack.width / 5
                                        ndHand.y -= ndLack.height / 5
                                    }
                                }, "hzxl_subpackage")

                                // this.scheduleOnce(() => {
                                //     AudioMgr.playBtn()
                                //     if (this.nodeLack && this.nodeLack.isValid) {
                                //         this.nodeLack.removeAllChildren()
                                //     }
                                //     this.sendLackRsp(lack)
                                // }, 3)
                            }
                        }
                    })
                }
            }
        })
    }

    initLack() {
        this.nodeLack.active = false
        this.LackTip.active = false
    }

    hide() {
        izx.log("mjOperate hide")
        // this.node.active = false
        this.nodePlayTip.active = false
        this.nodeLack.active = false
        this.LackTip.active = false
        this.nodeBtns.active = false
        this.nodeCards.active = false
        this.nodeChange.active = false
    }

    lackNoti(noti) {
        izx.log("lackNoti noti = ", noti)
        if (noti.chairId == 1) {
            this.lack = noti.lack
            this.nodeLack.active = false
            this.LackTip.active = false
        }
    }

    /*onBtnCancelAuto() {
        izx.log("mjOperate onBtnCancelAuto")
        AudioMgr.playBtn()
        izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
            if (res) {
                izx.dispatchEvent(SCMJ_EVENT.AUTO_REQ, { auto: 2 })
            }
        })
    }*/

    onStartGameNoti(msg) {
        this.hide()
        this.lack = LackType.None
        // this.nodeAuto.active = false
        this.second = 10

        this.mapOpCode = {}
        this.changeCards = []

        izx.dispatchEvent(SCMJ_EVENT.SHOW_AUTO_HU, { isShow: false })
    }

    autoNoti(msg) {
        if (msg.chairId == 1/* && this.nodeAuto*/) {
            if (msg.auto == 1) {
                // this.nodeAuto.active = true
                this.nodePlayTip.active = false
                izx.dispatchEvent(SCMJ_EVENT.PLAY_LACK_TIP)
                // } else {
                // this.nodeAuto.active = false
            }
        }
    }

    onBtnChangeCard() {
        izx.log("mjOperate onBtnChangeCard", this.changeCards.length)
        AudioMgr.playBtn()
        if (this.changeCards.length != 3) {
            // return            
        }
        scmjUtil.addGameRoundExchangeCards()
        this.stopTimer()
        // this.clearChangeTimer()
        if (HzxlLogic.getInstance().bPivateRoom) {
            this.nodeChange.active = false
        }
        izx.dispatchEvent(SCMJ_EVENT.EXCHANGE_RSP, { cards: this.changeCards })
    }

    exchangeReq(msg) {
        // izx.log("mjOperate exchangeReq")
        if (msg.type && msg.type == 2) {
            cc.find("ChangeCardTip", this.nodeChange).getComponent(cc.RichText).string = "<b>选择以下3张 <color=#E3BB49> 任意 </color> 牌</b>"
        }
        this.startTimer()
    }

    stopTimer() {
        // console.log("stopTimer")
        this.unschedule(this.updateTimer)
        if (!HzxlLogic.getInstance().bPivateRoom) {
            this.nodeChange.active = false
        }
    }

    startTimer() {
        // console.log("startTimer")
        this.stopTimer()
        this.nodeChange.active = true
        this.second = 10
        if(!HzxlLogic.getInstance().bPivateRoom && User.PlayGame == 0){
            this.second = 5
        }
        cc.find("BtnChangeCard/ChangeCard", this.nodeChange).getComponent(cc.Label).string = "换牌（" + this.second + "）"
        this.schedule(this.updateTimer, 1)
    }

    updateTimer() {
        // console.log("updateTimer")
        if (this.second
             == 0) {
            this.stopTimer()
            if (!HzxlLogic.getInstance().bPivateRoom) {
                this.nodeChange.active = false
            }
        } else {
            this.second--
            if (!HzxlLogic.getInstance().bPivateRoom && this.second == 0) {
                let bSend = false
                let track = cc.sys.localStorage.getItem("FIRST_EXCHANGE_SEND")
                if (track && track.length > 0) {
                } else {
                    bSend = true
                    cc.sys.localStorage.setItem("FIRST_EXCHANGE_SEND", "1")
                }
                if (bSend) {
                    this.onBtnChangeCard()
                }
            }
        }
        cc.find("BtnChangeCard/ChangeCard", this.nodeChange).getComponent(cc.Label).string = "换牌（" + this.second + "）"
    }

    onChangeCards(msg) {
        izx.log("mjOperate onChangeCards msg = ", msg)
        this.changeCards = msg.changeCards
        let btn = this.nodeChange.getChildByName("BtnChangeCard").getComponent(cc.Button)
        izx.log("this.changeCards.length = ", this.changeCards.length)
        if (this.changeCards.length != 3) {
            btn.interactable = false
            cc.find("BtnChangeCard/ChangeCard", this.nodeChange).color = scmjUtil.hex2color("#808080")
        } else {
            btn.interactable = true
            cc.find("BtnChangeCard/ChangeCard", this.nodeChange).color = scmjUtil.hex2color("#81060A")
        }
    }

    exchangeNoti(msg) {
        // izx.log("mjOperate exchangeNoti")
        this.nodeChange.active = false
        // this.node.active = false
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        izx.log("mjOperate onLoad")
        this.registerEvent()
    }

    registerEvent() {
        izx.on(SCMJ_EVENT.OP_PLAY, this.playCard, this)
        izx.on(SCMJ_EVENT.OP_CPGH, this.operateCard, this)
        izx.on(SCMJ_EVENT.OP_HIDE, this.hide, this)
        izx.on(SCMJ_EVENT.LACK_REQ, this.displayLack, this)
        izx.on(SCMJ_EVENT.OP_LACK, this.lackNoti, this)
        izx.on(SCMJ_EVENT.BEGIN_GAME_NOTI, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.OP_AUTO, this.autoNoti, this)
        izx.on(SCMJ_EVENT.EXCHANGE_REQ, this.exchangeReq, this)
        izx.on(SCMJ_EVENT.OP_CHANGE, this.onChangeCards, this)
        izx.on(SCMJ_EVENT.EXCHANGE_NOTI, this.exchangeNoti, this)
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {
        // this.initOrigPos()
        this.initLack()
        this.resetOperate()
        this.onOpen()
        // this.node.active = false
        // this.nodeAuto.active = false
        this.nodePlayTip.active = false
    }

    // update (dt) {}
}
