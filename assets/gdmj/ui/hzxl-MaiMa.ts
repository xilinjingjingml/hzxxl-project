
import { igs } from "../../igs";
let izx = igs.izx
// let BaseUI = izx.BaseUI
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import { SCMJ_EVENT } from "../../hzxl_subpackage/hzxl-Events";
import { scmjUtil } from "../../hzxl_subpackage/hzxl-Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class maima extends cc.Component {

    onOpen() {
        console.log("scmjResult onOpen")
        // super.onOpen()
    }

    onClose() {
        console.log("scmjResult onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_MaiMa, this.updateMaima, this)
    }

    updateMaima(noti) {
        izx.log("UPDATE_MaiMa", noti)
        let maNum = cc.find("maNum", this.node)
        scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
            if (res) {
                let mapChairldCard = {}
                for (const item of noti.maItems) {
                    // 位置对应的马值
                    mapChairldCard[item.chairId] = item.maCards
                }

                for (let index = 0; index < noti.maItems.length; index++) {
                    const item = noti.maItems[index];
                    let MaPaiArea = cc.find("MaPaiArea" + item.chairId, this.node)
                    if (item.chairId == 1) {
                        maNum.getComponent(cc.Label).string = item.maNum
                        for (let i = 1; i < 3; i++) {
                            let mj = cc.find("Mj"+i,MaPaiArea)
                            const card = item.cards[i-1]
                            for (const key in mapChairldCard) {
                                if (mapChairldCard[key].indexOf(card) != -1) {
                                    izx.log("card--key-chairld",card,key,item.chairId)
                                    if (noti.winChairIds.indexOf(parseInt(key)) != -1) {
                                        // 押中赢家的马
                                        if (noti.winChairIds.indexOf(1) != -1) {
                                            // 自己是赢家
                                            cc.find("huang", mj).active = true  
                                            cc.find("lan", mj).active = false
                                        } else {
                                            if (noti.loseChairIds.length > 1) {
                                                cc.find("huang", mj).active = true  
                                                cc.find("lan", mj).active = false
                                            }
                                            if (noti.loseChairIds.length == 1 && noti.loseChairIds[0] != item.chairId) {
                                                cc.find("huang", mj).active = true  
                                                cc.find("lan", mj).active = false
                                            }
                                        }
                                    } else {
                                        if (noti.loseChairIds.indexOf(parseInt(key)) != -1) {
                                            // 押中输家的马
                                            if (noti.winChairIds.indexOf(1) == -1) {
                                                // 自己不是赢家
                                                cc.find("huang", mj).active = false  
                                                cc.find("lan", mj).active = true
                                            }
                                        }
                                    }
                                    break
                                }
                            }
                            let value = cc.find("value", mj)
                            value.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(card)
                        }
                    } else {
                        // 别人
                        for (let i = 1; i < 3; i++) {
                            let mj = cc.find("Mj"+i,MaPaiArea)
                            const card = item.cards[i-1]
                            for (const key in mapChairldCard) {
                                if (mapChairldCard[key].indexOf(card) != -1) {
                                    izx.log("card--key-chairld",card,key,item.chairId)
                                    if (noti.winChairIds.indexOf(parseInt(key)) != -1) {
                                        // 别人押中赢家的马
                                        if(noti.loseChairIds.indexOf(1) != -1) {
                                            //自摸胡 1不是赢家，抢杠胡 我是输家，点跑我是输家
                                            cc.find("huang", mj).active = true  
                                            cc.find("lan", mj).active = false
                                        }
                                    } else {
                                        if (noti.loseChairIds.indexOf(parseInt(key)) != -1) {
                                            // 别人押中输家的马
                                            if (noti.winChairIds.indexOf(1) != -1 && noti.winChairIds.indexOf(item.chairId) == -1) {
                                                // 我是赢家 且对面不是赢家
                                                cc.find("huang", mj).active = false  
                                                cc.find("lan", mj).active = true
                                            }
                                        } 
                                    }
                                    break
                                }
                            }
                            let value = cc.find("value", mj)
                            value.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(card)
                        }
                    }
                }
            }
        })
    }

    onLoad() {
        this.registerEvent()
        this.onOpen()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
        EventMgr.offByTag(this)
    }
}
