import { SCMJ_EVENT } from "../hzxl-Events"
import MjPrefab from "./hzxl-Prefab";

import { igs } from "../../igs";
import { scmjUtil } from "../hzxl-Util";
import BaseUI from "../../lobby/start/script/base/BaseUI";
import { Helper } from "../../lobby/start/script/system/Helper";
import HzxlLogic from "../hzxl-logic";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class mjTouch extends cc.Component {
    offsetY = 30
    touchCard:MjPrefab = null
    prevTouchCard = null
    canPlay = false
    canChange = false
    changeCards = []
    bSameSuit = false // 同花色

    registerMainTouch() {
        izx.log("registerMainTouch")
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // izx.log('main started 1');
            this.switchTouchCard(event)
            // izx.log('main started 2');
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // izx.log('main moving 1');
            let touchPos = event.touch.getLocation()
            let isMoving = false
            if (this.touchCard) {
                isMoving = this.isMoving(this.touchCard)
            }
            let card = this.getTouchCard(touchPos)
            if (card && !isMoving) {
                this.switchTouchCard(event)
            }
            this.moveTouchCard(event)
            // izx.log('main moving 2');
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // izx.log('main ended 1');
            this.switchTouchCard(event)
            this.prevTouchCard = this.touchCard
            // izx.log('main ended 2');
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            // izx.log('main cancel 1');
            this.switchTouchCard(event)
            this.prevTouchCard = this.touchCard
            // izx.log('main cancel 2');
        }, this);
    }

    switchTouchCard(event) {
        let touchPos = event.touch.getLocation()
        let card = this.getTouchCard(touchPos)
        if (this.canChange) {
            if (card && event.type == cc.Node.EventType.TOUCH_START) {
                let selectCard = <MjPrefab>card.getComponent("hzxl-Prefab")
                if (this.bSameSuit) {
                    let cardType = parseInt(selectCard.cValue / 10 + "")
                    if (this.changeCards.length > 0) {
                        let tempCardType = parseInt(this.changeCards[0].cValue / 10 + "")
                        if (tempCardType != cardType) {
                            scmjUtil.loadAsset("prefabs/ExchangeCardsTip", cc.Prefab, (res) => {
                                if (cc.isValid(this.node) && res) {
                                    let node = cc.instantiate(res)
                                    node.parent = this.node
                                }
                            }, "hzxl_subpackage")
                            this.resetTouchCard()
                            return
                        }
                    }
                }
                this.pushChangeCard(selectCard)
                this.sendChangeCards()
            }
            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
            return
        }
        if (this.touchCard == null) {
            if (card) {
                card.y += this.offsetY
                this.touchCard = <MjPrefab>card.getComponent("hzxl-Prefab")
            }
            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
        } else {
            if (card) {
                if (card == this.touchCard.node) {
                    switch (event.type) {
                        case cc.Node.EventType.TOUCH_START:

                            break;
                        case cc.Node.EventType.TOUCH_END:
                            let touchCardValud = this.touchCard.cValue
                            let putCard = () => {
                                this.canPlay = false                                
                                this.touchCard.put = true
                                // izx.dispatchEvent(SCMJ_EVENT.TOUCH_CARD_INDEX, {index:card.index})
                                // izx.dispatchEvent(SCMJ_EVENT.ANI_PLAY_CARD, { chairId: 1, touchCard: this.touchCard })
                                scmjUtil.addGameRoundChuPai()
                                izx.dispatchEvent(SCMJ_EVENT.UPDATE_TING_MARKS, { tingCards: [] })
                                izx.dispatchEvent(SCMJ_EVENT.OP_PLAY, { card: touchCardValud })
                                this.resetTouchCard()
                                izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
                            }
                            let putCancel = (res?) => {
                                if (res && res.canTouch) {
                                    this.canPlay = true
                                }
                                if (this.touchCard && this.touchCard.isValid) {
                                    this.touchCard.resetPosition()
                                    this.touchCard.node.y += this.offsetY
                                    izx.dispatchEvent(SCMJ_EVENT.SHOW_TING_TIP, { tingCards: this.touchCard.tingCards })
                                }
                            }
                            let popTip = () => {
                                if(HzxlLogic.getInstance().isHzxl()){
                                    this.canPlay = false
                                    scmjUtil.loadAsset("prefabs/Tip", cc.Prefab, (res) => {
                                        if (cc.isValid(this.node) && res) {
                                            let node = <cc.Node>cc.instantiate(res)
                                            node.getComponent("hzxl-Tip").callback = putCard
                                            node.getComponent("hzxl-Tip").callbackCancel = putCancel
                                            node.parent = this.node
                                        }
                                    })
                                }else if(HzxlLogic.getInstance().isGdmj()){
                                    Helper.OpenTip("鬼牌无法打出")
                                }
                            }
                            // 双击出牌 拖动出牌
                            if (this.canPlay && this.touchCard.node.x == this.touchCard.getOriginPositon().x && this.prevTouchCard == this.touchCard) {
                                // TODO:出牌动画 出牌响应
                                if (HzxlLogic.getInstance().laizi == touchCardValud) {
                                    popTip()
                                } else {
                                    putCard()
                                }
                            } else if (this.canPlay && touchPos.y > this.getBorderY(this.touchCard.node) && this.touchCard.node.x != this.touchCard.getOriginPositon().x) {
                                // TODO:出牌动画 出牌响应
                                if (HzxlLogic.getInstance().laizi == touchCardValud) {
                                    popTip()
                                } else {
                                    putCard()
                                }
                            } else {
                                putCancel()
                            }
                            break;
                        case cc.Node.EventType.TOUCH_CANCEL:
                            this.touchCard.resetPosition()
                            this.touchCard.node.y += this.offsetY
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_TING_TIP, { tingCards: this.touchCard.tingCards })
                            break;
                        default:
                            break;
                    }
                } else {
                    this.touchCard.resetPosition()
                    card.y += this.offsetY
                    this.touchCard = <MjPrefab>card.getComponent("hzxl-Prefab")
                    izx.dispatchEvent(SCMJ_EVENT.SHOW_TING_TIP, { tingCards: this.touchCard.tingCards })
                }
            } else {
                this.resetTouchCard()
                izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
            }
        }
    }

    resetTouchCard() {
        if (this.touchCard) {
            this.touchCard.resetPosition()
            this.touchCard = null
        }
    }

    getTouchCard(touchPos) {
        let handcards = cc.find("CenterArea/CardLayer/nodePlayer0/handCard0/layer1", this.node)
        if (handcards) {
            let touchCard = null
            for (let v of handcards.children) {
                if (v.active) {
                    let box = v.getBoundingBoxToWorld()
                    if (this.touchCard && v == this.touchCard.node) {
                        box.y -= box.height / 2 - ((box.height + this.offsetY) / 2 - this.offsetY)
                        box.height += this.offsetY
                    }

                    if (box.contains(touchPos)) {
                        touchCard = v
                        // touchCard.index = i
                        // 胡牌标志的手牌不允许 点击
                        if (touchCard.getComponent("hzxl-Prefab").isHu()) {
                            touchCard = null
                        }
                        break
                    }
                }
            }
            return touchCard
        }
        return null
    }

    getBorderY(card) {
        let originPos = card.getComponent("hzxl-Prefab").getOriginPositon()
        let height = card.getBoundingBox().height
        let wpos = card.parent.convertToWorldSpaceAR(originPos)
        let borderY = wpos.y + height / 2
        return borderY
    }

    isMoving(card) {
        let originPos = card.getComponent("hzxl-Prefab").getOriginPositon()
        if (card.y > originPos.y + this.offsetY || card.x != originPos.x) {
            return true
        } else {
            return false
        }
    }

    moveTouchCard(event) {
        if (this.canPlay) {
        } else {
            return
        }
        let touchPos = event.touch.getLocation()
        let delta = event.touch.getDelta()
        if (this.touchCard) {
            let borderY = this.getBorderY(this.touchCard.node)
            if (touchPos.y > borderY) {
                this.touchCard.node.x += delta.x;
                this.touchCard.node.y += delta.y;
            }
        }
    }

    setCanPlay(msg) {
        // izx.log("setCanPlay msg = ", msg)
        this.canPlay = msg.canPlay
        this.canChange = false
        // for (let v of this.handCard0.children){
        // 	if (v.active) {
        // 		let cardS = v.getComponent("hzxl-Prefab")
        // 		if (cardS && cardS.sptLack && cardS.sptLack.active) {
        // 			// lackcards.push(card)
        // 			let pos = v.parent.convertToWorldSpaceAR(v.position)
        // 			izx.dispatchEvent(SCMJ_EVENT.GUIDE_PLAY, { pos: pos })
        // 		}
        // 	}
        // }
    }

    exchangeReq(msg) {
        // izx.log("exchangeReq msg = ", msg)
        this.canChange = true
        this.canPlay = false
        this.changeCards = []
        this.resetTouchCard()

        if (msg.type == 1) {
            this.bSameSuit = true
        }
        if (msg.cards) {
            let exchangeCards = msg.cards.slice()
            let findCount = 0
            izx.dispatchEvent(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, 1, (cards) => {
                for (let i = 0; i < cards.length; i++) {
                    let card = cards[i]
                    let bFind = false
                    if (card == exchangeCards[0]) {
                        exchangeCards[0] = -1
                        bFind = true
                    } else if (card == exchangeCards[1]) {
                        exchangeCards[1] = -1
                        bFind = true
                    } else if (card == exchangeCards[2]) {
                        exchangeCards[2] = -1
                        bFind = true
                    }
                    if (bFind) {
                        this.pushChangeCard(i + 1)
                        this.sendChangeCards()
                        findCount++
                        if (findCount == 3) {
                            break
                        }
                    }
                }
            })

        }
    }

    exchangeRsp(msg) {
        izx.log("exchangeRsp msg = ", msg)
        this.canChange = false
        for (let key in this.changeCards) {
            let tempTouchCard = this.changeCards[key]
            tempTouchCard.resetPosition()
        }
        this.changeCards = []
    }

    exchangeNoti(msg) {
        izx.log("exchangeNoti msg = ", msg)
        this.canChange = false
        for (let key in this.changeCards) {
            let tempTouchCard = this.changeCards[key]
            tempTouchCard.resetPosition()
        }
        this.changeCards = []
    }

    pushChangeCard(touchCard) {
        if (typeof touchCard === "number") {
            let handcards = cc.find("CenterArea/CardLayer/nodePlayer0/handCard0/layer1", this.node)
            if (handcards) {
                let card = handcards.getChildByName(touchCard.toString())
                touchCard = card.getComponent("hzxl-Prefab")
            } else {
                touchCard = null
            }
        }
        if (touchCard) {
            izx.log("pushChangeCard value = ", touchCard.cValue)
            let isExist = false
            for (let index = 0; index < this.changeCards.length; index++) {
                let tempTouchCard = this.changeCards[index];
                if (tempTouchCard == touchCard) {
                    izx.log("change card is exist, reset card")
                    isExist = true
                    tempTouchCard.resetPosition()
                    this.changeCards.splice(index, 1)
                    break
                }
            }

            if (!isExist) {
                this.changeCards.push(touchCard)
                touchCard.node.y += this.offsetY
                if (this.changeCards.length > 3) {
                    let tempTouchCard = this.changeCards.shift()
                    tempTouchCard.resetPosition()
                }
            }
        }
    }

    sendChangeCards() {
        izx.log("sendChangeCards")
        let cards = []
        for (let v of this.changeCards) {
            cards.push(v.cValue)
        }

        izx.dispatchEvent(SCMJ_EVENT.OP_CHANGE, { changeCards: cards })
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        scmjUtil.addEnterGameScene("touch-onLoad")
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {
        scmjUtil.addEnterGameScene("touch-start")
        izx.on(SCMJ_EVENT.ENABLE_PLAY_CARD, this.setCanPlay, this)
        izx.on(SCMJ_EVENT.EXCHANGE_REQ, this.exchangeReq, this)
        izx.on(SCMJ_EVENT.EXCHANGE_NOTI, this.exchangeNoti, this)
        izx.on(SCMJ_EVENT.EXCHANGE_RSP, this.exchangeRsp, this)
        scmjUtil.addEnterGameScene("touch-start-end")
    }

    // update (dt) {}
}
