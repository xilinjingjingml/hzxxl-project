import { CardArea, LackType } from "../hzxl-Constants";
import { scmjUtil } from "../hzxl-Util";

import { igs } from "../../igs";
import HzxlLogic from "../hzxl-logic";
import { SCMJ_EVENT } from "../hzxl-Events";
import { User } from "../../lobby/start/script/data/User";
let izx = igs.izx

const { ccclass, property } = cc._decorator;

@ccclass
export default class MjPrefab extends cc.Component {
    sptIntroduce: cc.Node = null  //推荐出牌
    // @property(cc.Node)
    sptLackShadow: cc.Node = null
    bShowLackShadow: boolean = false
    // 座位 1-4
    chairId: number = 0;
    // 类型
    cArea: CardArea = 0;
    // 花色数值
    cValue: number = 0;
    // 花色精灵
    sptValue: cc.Node = null;
    // arrow
    sptArrow: cc.Node = null;
    // lack
    sptLack: cc.Node = null;
    bShowLack: boolean = false
    // 麻将牌初始位置
    originPos = null;
    // 听牌标记
    sptTingMark = null;
    sptTingFire = null
    tingCards = null;
    // 定缺
    cLack: number = -1
    // 万能牌
    sptLaizi: cc.Node = null
    bShowLaizi: boolean = false
    // 已胡
    bHu: boolean = false

    active: boolean = true

     //被打出去的牌标记
    put:boolean = false

    // 播放换牌动画
    startChangeAni() {
        console.log("startChangeAni value = ", this.cValue)
        // this.node.runAction(cc.repeat(cc.sequence(
        //     cc.fadeTo(0.8, 100),
        //     cc.fadeTo(0.8, 255),
        // ), 2))
        this.node.stopAllActions()
        this.resetPosition()

        this.node.y += 30
        this.node.runAction(cc.moveTo(1, this.node.x, this.node.y - 30))
    }

    // 不可出牌阴影
    // drawDisableShadow() {
    //     this.grayShadow.active = true
    //     this.grayShadow.zIndex = 5
    //     this.grayShadow.setContentSize(this.mjSize())
    // }

    // 移除出牌阴影
    removeLackShadow() {
        if (cc.isValid(this.sptLackShadow)) {
            this.sptLackShadow.destroy()
            this.sptLackShadow = null
        }
        this.bShowLackShadow = false
    }

    // 增加定缺阴影
    drawLackShadow() {
        if(HzxlLogic.getInstance().isHzxl()){
            if (!this.sptLackShadow) {
                if (this.bShowLackShadow) {
                    return
                }
                this.bShowLackShadow = true
                scmjUtil.loadAsset("images/ui/bg", cc.SpriteFrame, (res) => {
                    if (cc.isValid(this.node) && res) {
                        this.sptLackShadow = new cc.Node()
                        let sprite = this.sptLackShadow.addComponent(cc.Sprite);
                        sprite.spriteFrame = res
                        this.sptLackShadow.parent = this.node;
                        this.sptLackShadow.zIndex = 5
                        this.sptLackShadow.setContentSize(this.mjSize())
                        this.sptLackShadow.active = true
                    }
                    this.bShowLackShadow = false
                }, "hzxl_subpackage")
            }
        }
    }

    isHu() {
        // if (this.grayShadow.active) {
        if (this.bHu) {
            return true
        } else {
            return false
        }
    }

    // 刷新麻将牌
    refreshCard() {
        if (this.cValue > 0) {
            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                if (cc.isValid(this.node) && res) {
                    let value = cc.find("value", this.node)
                    if (value && value.isValid) {
                        value.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(this.cValue)
                        this.node.active = this.active
                    }
                }
            })
        }
    }

    setActive(active:boolean){
        this.active = active
        this.node.active = active
    }    

    setOriginPositon() {
        if (!this.originPos) {
            this.originPos = this.node.getPosition()
        }
    }

    getOriginPositon() {
        return this.originPos
    }

    resetPosition() {
        if (this.originPos) {
            this.node.stopAllActions()
            this.node.position = this.originPos
        }
    }

    drawArrow(opChairId) {
        if (opChairId == this.chairId) {
            return
        }
        if (this.sptArrow == null) {
            scmjUtil.loadAsset("images/ui/arrow", cc.SpriteFrame, (res) => {
                if (cc.isValid(this.node) && res) {
                    this.sptArrow = new cc.Node()
                    let sprite = this.sptArrow.addComponent(cc.Sprite);
                    sprite.spriteFrame = res//<cc.SpriteFrame>scmjUtil.loadPic("images/ui/arrow")
                    this.sptArrow.parent = this.node;
                    this.sptArrow.zIndex = 3
                    let rotation = 0
                    let offsetY = 0
                    let offsetX = 0
                    switch (this.chairId) {
                        case 1:
                            rotation = opChairId == 2 ? 180 : rotation
                            rotation = opChairId == 3 ? 90 : rotation
                            offsetY = -7
                            break
                        case 2:
                            rotation = opChairId == 1 ? -90 : rotation
                            rotation = opChairId == 3 ? 90 : rotation
                            offsetX = 10
                            offsetY = 5
                            break
                        case 3:
                            rotation = opChairId == 1 ? -90 : rotation
                            rotation = opChairId == 2 ? 180 : rotation
                            offsetY = 15
                            break
                        case 4:
                            rotation = opChairId == 1 ? -90 : rotation
                            rotation = opChairId == 2 ? 180 : rotation
                            rotation = opChairId == 3 ? 90 : rotation
                            offsetX = -10
                            offsetY = 5
                            break
                        default:
                            break;
                    }
                    this.sptArrow.angle = -rotation
                    this.sptArrow.y = offsetY
                    this.sptArrow.x = offsetX
                }
            })
        }
    }

    // 增加定缺标记
    drawLackMark(lack, tilt?) {
        if (this.sptLack || this.bShowLack) {
            if (lack >= 0 && parseInt(this.cValue / 10 + "") == lack) {
            } else {
                this.removeLackMark()
            }
            return
        }
        if (lack >= 0 && parseInt(this.cValue / 10 + "") == lack) {
            this.cLack = lack
            this.bShowLack = true
            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                if (!this.bShowLack) {
                    return
                }
                if (cc.isValid(this.node) && res) {
                    this.sptLack = new cc.Node()
                    let sprite = this.sptLack.addComponent(cc.Sprite);
                    sprite.spriteFrame = res.getSpriteFrame("lack_mark")
                    this.sptLack.parent = this.node;
                    this.sptLack.zIndex = 4
                    this.sptLack.y = 26
                    this.sptLack.x = -21

                    if (1 != this.chairId) {
                        let rotation = 0
                        let offsetY = 0
                        let offsetX = 0
                        let scale = 0
                        let skewX = 0
                        switch (this.chairId) {
                            case 2:
                                rotation = 102
                                offsetX = -12
                                offsetY = 7
                                scale = 0.5
                                skewX = 10
                                break
                            case 3:
                                rotation = 180
                                offsetX = 6
                                offsetY = 5
                                scale = 0.5
                                break
                            case 4:
                                rotation = -102
                                offsetX = 16
                                offsetY = 14
                                scale = 0.5
                                skewX = -10
                                break
                            default:
                                break;
                        }
                        this.sptLack.angle = rotation
                        this.sptLack.y = offsetY
                        this.sptLack.x = offsetX
                        this.sptLack.scale = scale
                        this.sptLack.skewX = skewX
                    } else if (tilt) {
                        let ndValue = cc.find("value", this.node)
                        if (cc.isValid(ndValue)) {
                            this.sptLack.parent = ndValue
                            let widget = this.sptLack.addComponent(cc.Widget)
                            widget.left = -1
                            widget.top = 15
                        }
                    }
                }
            })

            if (1 == this.chairId) {
                this.drawLackShadow()
            }
        }
    }

    // 删除定缺标记
    removeLackMark() {
        if (this.sptLack) {
            this.sptLack.destroy()
            this.sptLack = null
            this.cLack = -1
        }
        this.bShowLack = false

        if (1 == this.chairId) {
            this.removeLackShadow()
        }
    }

    // 增加万能牌标记
    drawLaiziMark(tilt?) {
        if (this.sptLaizi || this.bShowLaizi) {
            if (HzxlLogic.getInstance().laizi != this.cValue || (CardArea.HandCard != this.cArea && CardArea.CurCard != this.cArea)) {
                this.removeLaiziMark()
            }
            return
        }
        if (HzxlLogic.getInstance().laizi == this.cValue && (CardArea.HandCard == this.cArea || CardArea.CurCard == this.cArea)) {
            this.bShowLaizi = true
            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                if (!this.bShowLaizi) {
                    return
                }
                if (cc.isValid(this.node) && res) {
                    this.sptLaizi = new cc.Node()
                    let sprite = this.sptLaizi.addComponent(cc.Sprite);
                    if (HzxlLogic.getInstance().isGdmj()) {
                        sprite.spriteFrame = res.getSpriteFrame("gui_mark")
                    } else {
                        sprite.spriteFrame = res.getSpriteFrame("laizi_mark")
                    }
                    
                    if(CardArea.HandCard == this.cArea && 1 == this.chairId){
                        this.sptLaizi.parent = cc.find("value", this.node)
                    }else{
                        this.sptLaizi.parent = this.node
                    }
                    this.sptLaizi.zIndex = 4
                    this.sptLaizi.y = 20
                    this.sptLaizi.x = -15

                    if (1 != this.chairId) {
                        let rotation = 0
                        let offsetY = 0
                        let offsetX = 0
                        let scale = 0
                        let skewX = 0
                        switch (this.chairId) {
                            case 2:
                                rotation = 102
                                offsetX = -12
                                offsetY = 7
                                scale = 0.35
                                skewX = 10
                                break
                            case 3:
                                rotation = 180
                                offsetX = 6
                                offsetY = 5
                                scale = 0.35
                                break
                            case 4:
                                rotation = -102
                                offsetX = 12
                                offsetY = 10
                                scale = 0.35
                                skewX = -10
                                break
                            default:
                                break;
                        }
                        this.sptLaizi.angle = rotation
                        this.sptLaizi.y = offsetY
                        this.sptLaizi.x = offsetX
                        this.sptLaizi.scale = scale
                        this.sptLaizi.skewX = skewX
                    } else if (tilt) {
                        let ndValue = cc.find("value", this.node)
                        if (cc.isValid(ndValue)) {
                            this.sptLaizi.parent = ndValue
                            let widget = this.sptLaizi.addComponent(cc.Widget)
                            widget.left = -1
                            widget.top = 15
                        }
                    }
                }
            })
        }
    }

    // 删除万能牌标记
    removeLaiziMark() {
        if (this.sptLaizi) {
            this.sptLaizi.destroy()
            this.sptLaizi = null
        }
        this.bShowLaizi = false
    }

    // 移除听牌标记
    removeTingMark() {
        if (this.sptTingMark) {
            this.sptTingMark.destroy()
            this.sptTingMark = null
        }
        if (this.sptTingFire) {
            this.sptTingFire.destroy()
            this.sptTingFire = null
        }
    }

    // 增加听牌标记
    drawTingMark(params) {
        if (this.sptTingFire) {
            this.sptTingFire.destroy()
            this.sptTingFire = null
        }
        if (this.sptTingMark) {
            this.sptTingMark.destroy()
            this.sptTingMark = null
        }
        this.tingCards = params.tingCards
        if (this.tingCards && this.tingCards.length > 0) {
            let path = "arrow_light"
            let bFire = false
            if (params.isBest) {
                path = "arrow_best"
                bFire = true
            } else if (params.isMore) {
                path = "arrow_more"
            } else if (params.isBig) {
                path = "arrow_big"
            }
            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                if (cc.isValid(this.node) && res) {
                    this.sptTingMark = new cc.Node()
                    this.sptTingMark.anchorY = 0
                    let sprite = this.sptTingMark.addComponent(cc.Sprite);
                    sprite.spriteFrame = res.getSpriteFrame(path)
                    this.sptTingMark.parent = this.node;
                    this.sptTingMark.zIndex = 5
                    this.sptTingMark.y = 65
                    this.sptTingMark.x = 0
                    if (bFire) {
                        scmjUtil.loadAsset("prefabs/AniTingFire", cc.Prefab, (res) => {
                            if (cc.isValid(this.node) && res) {
                                this.sptTingFire = cc.instantiate(res)
                                this.sptTingFire.parent = this.node
                                this.sptTingFire.y = 110
                            }
                        })
                    }
                }
            })
        }
    }

    //推荐出牌
    drawIntroduce(){        
        scmjUtil.loadAsset("images/main/introduce", cc.SpriteFrame, (res) => {
            if (cc.isValid(this.node) && res) {
                let track = cc.sys.localStorage.getItem("SHOW_INTRODUCE")
                if(!track){
                    cc.sys.localStorage.setItem("SHOW_INTRODUCE", true)
                    
                    this.sptIntroduce = new cc.Node()
                    let sprite = this.sptIntroduce.addComponent(cc.Sprite);
                    sprite.spriteFrame = res
                    this.sptIntroduce.parent = this.node;
                    this.sptIntroduce.zIndex = 5
                    this.sptIntroduce.active = true
                    this.sptIntroduce.y = 80
                    this.sptIntroduce.scale = 1.1
                }
            }
        }, "hzxl_subpackage")
    }

    // 初始化牌值
    initMj(chairId, cArea: CardArea, cValue, tilt?) {
        // console.log("initMj")
        this.chairId = chairId
        this.cArea = cArea
        this.cValue = cValue
        this.put = false
        this.refreshCard()
        // this.createShadow()
        this.drawLaiziMark(tilt)

        if(this.sptIntroduce && this.sptIntroduce.active){
            this.sptIntroduce.active = false
        }
    }

    mjSize(): cc.Size {
        let rect = this.node.getBoundingBox()
        return cc.size(rect.width, rect.height)
    }

    registerEvent(){
        if(User.PlayGame == 0){
            izx.on(SCMJ_EVENT.SHOW_Introduce, ()=>{
                if(CardArea.CurCard == this.cArea && 1 == this.chairId){
                    this.drawIntroduce()
                }
            }, this)
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // cc.game.on(cc.game.EVENT_HIDE, () => {
        // let tempCard = <any>this.node
        // if (tempCard && tempCard.isExchange) {
        //     tempCard.isExchange = false
        // this.resetPosition()
        // }
        // })
        this.registerEvent()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }

    start() {

    }

    // update (dt) {}
}
