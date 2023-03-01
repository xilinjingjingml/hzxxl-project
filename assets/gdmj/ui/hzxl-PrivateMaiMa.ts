
import { SCMJ_EVENT } from "../../hzxl_subpackage/hzxl-Events";
import HzxlLogic from "../../hzxl_subpackage/hzxl-logic";
import { scmjUtil } from "../../hzxl_subpackage/hzxl-Util";
import { igs } from "../../igs";
let izx = igs.izx
// let BaseUI = izx.BaseUI
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import { User } from "../../lobby/start/script/data/User";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class privateMaiMa extends cc.Component {

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
        izx.log("UPDATE_private-MaiMa", noti)
        scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
            if (res) {
                let mapChairldCard = {}
                for (const item of noti.maItems) {
                    // 位置对应的马值
                    mapChairldCard[item.chairId] = item.maCards

                    if (item.chairId == 1) {
                        let head = cc.find("HeadArea/Head", this.node)
                        let name = cc.find("HeadArea/Name", this.node)
                        let labelMa = cc.find("HeadArea/LabelMa", this.node)
                        let LabelKaiMa = cc.find("HeadArea/LabelKaiMa", this.node)

                        UserSrv.GetPlyDetail(User.OpenID, (ply: IPlayerData) => {
                            if (head && head.isValid ) {
                                scmjUtil.setupAvatarImage(head, ply.avatar)
                            }
                            if (name && name.isValid ) {
                                name.getComponent(cc.Label).string = ply.userName
                            }

                            if (labelMa && labelMa.isValid) {
                                if (item.maNum > 0) {
                                    labelMa.getComponent(cc.Label).string = "" + item.maNum
                                } else {
                                    labelMa.getComponent(cc.Label).string = "0"
                                }
                            }

                            if (LabelKaiMa && LabelKaiMa.isValid) {
                                if (HzxlLogic.getInstance().privateRoomInfo) {
                                    if (HzxlLogic.getInstance().privateRoomInfo.kaima_type == 1) {
                                        LabelKaiMa.getComponent(cc.Label).string = "另一幅牌开马"
                                    }
                                    if (HzxlLogic.getInstance().privateRoomInfo.kaima_type == 2) {
                                        LabelKaiMa.getComponent(cc.Label).string = "剩余牌开马"
                                    }
                               }
                            }
                        })
                    }
                }
                let maCards = []
                for (let index = 0; index < noti.maItems.length; index++) {
                    const item = noti.maItems[index];
                    if (item.cards && item.cards.length > 0) {
                        maCards = item.cards
                        break
                    }
                }
                let MaPaiArea = cc.find("MaPaiArea", this.node)
                for (let i = 1; i <= maCards.length; i++) {
                    let mj = cc.find("Mj"+i,MaPaiArea)
                    mj.active = true
                    const card = maCards[i-1]
                    for (const key in mapChairldCard) {
                        if (mapChairldCard[key].indexOf(card) != -1) {
                            if (noti.winChairIds.indexOf(parseInt(key)) != -1) {
                                if (parseInt(key) == 1) {
                                    cc.find("huang", mj).active = true  
                                    cc.find("lan", mj).active = false
                                } 
                            }
                            break
                        }
                    }
                    let value = cc.find("value", mj)
                    value.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(card)
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
