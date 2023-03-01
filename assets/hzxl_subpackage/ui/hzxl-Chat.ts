import { scmjUtil } from "../hzxl-Util";
import { igs } from "../../igs";
import { SCMJ_EVENT } from "../hzxl-Events";
import BaseUI from "../../lobby/start/script/base/BaseUI";
import { CHAT_TAG } from "../hzxl-Constants";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjChat extends cc.Component {
    @property(cc.Node)
    emojiContent: cc.Node = null
    @property(cc.Node)
    emojiItem: cc.Node = null
    @property(cc.Node)
    phraseContent: cc.Node = null
    @property(cc.Node)
    phraseitem: cc.Node = null

    phrasetable = [
        "快点吧，我等的天都要黑了",
        "还让不让我摸牌了！",
        "很高兴认识大家！",
        "来啊，互相伤害啊",
        "你这样以后没朋友哦",
        "打一个让我碰下呗",
        "这什么牌，打什么来什么",
        "莫偷鸡，偷鸡必被抓",
    ]

    onOpen() {
        console.log("scmjChat onOpen")
        // super.onOpen()
    }

    start() {
        // 免费表情
        for (let i = 0; i < 18; i++) {
            scmjUtil.loadAsset("images/emoji/btn_" + i, cc.SpriteFrame, (res) => {
                if (cc.isValid(this.emojiContent) && res) {
                    let item = cc.instantiate(this.emojiItem)
                    if (item && item.isValid) {
                        item.active = true
                        item.name = CHAT_TAG.FREE + i
                        let sprite = item.getChildByName("spt_emoji").getComponent(cc.Sprite);
                        sprite.spriteFrame = res
                        item.parent = this.emojiContent
                        item.on(cc.Node.EventType.TOUCH_END, function (event) {
                            izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                                if (res) {
                                    izx.dispatchEvent(SCMJ_EVENT.CHAT_REQ, { msg: item.name })
                                }
                            })
                        }, this)
                    }
                }
            })
        }

        // 常用文字
        for (let i = 0; i < this.phrasetable.length; i++) {
            let item = cc.instantiate(this.phraseitem)
            item.active = true
            item.name = CHAT_TAG.TEXT + i
            item.getChildByName("lbl_text").getComponent(cc.Label).string = this.phrasetable[i]
            if (this.phrasetable[i].length > 17) {
                item.height += 18
            }
            item.parent = this.phraseContent
            item.on(cc.Node.EventType.TOUCH_END, function (event) {
                izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                    if (res) {
                        izx.dispatchEvent(SCMJ_EVENT.CHAT_REQ, { msg: CHAT_TAG.TEXT + this.phrasetable[i] })
                    }
                })
            }, this);
        }
    }

    onClose() {
        console.log("scmjChat onClose")
        // super.onClose()
    }

    registerEvent() {
        izx.on(SCMJ_EVENT.HIDE_UI, this.hideUi, this)

        izx.Button.bindButtonClick("BtnChat", this.node, (sender, data) => {
            this.node.getChildByName("FreeEmoji").active = false
            this.node.getChildByName("Phrase").active = true
            scmjUtil.loadAsset("images/chat/chat_page_1", cc.SpriteFrame, (res) => {
                if (cc.isValid(this.node) && res) {
                    let bg = cc.find("BtnChat/Background", this.node)
                    if (bg && bg.isValid) {
                        bg.getComponent(cc.Sprite).spriteFrame = res
                    }
                }
            })
            scmjUtil.loadAsset("images/chat/chat_page_2", cc.SpriteFrame, (res) => {
                if (cc.isValid(this.node) && res) {
                    let bg = cc.find("BtnBiaoqing/Background", this.node)
                    if (bg && bg.isValid) {
                        bg.getComponent(cc.Sprite).spriteFrame = res
                    }
                }
            })
        })

        izx.Button.bindButtonClick("BtnBiaoqing", this.node, (sender, data) => {
            this.node.getChildByName("FreeEmoji").active = true
            this.node.getChildByName("Phrase").active = false
            scmjUtil.loadAsset("images/chat/chat_page_2", cc.SpriteFrame, (res) => {
                if (cc.isValid(this.node) && res) {
                    let bg = cc.find("BtnChat/Background", this.node)
                    if (bg && bg.isValid) {
                        bg.getComponent(cc.Sprite).spriteFrame = res
                    }
                }
            })
            scmjUtil.loadAsset("images/chat/chat_page_1", cc.SpriteFrame, (res) => {
                if (cc.isValid(this.node) && res) {
                    let bg = cc.find("BtnBiaoqing/Background", this.node)
                    if (bg && bg.isValid) {
                        bg.getComponent(cc.Sprite).spriteFrame = res
                    }
                }
            })
        })
    }

    hideUi() {
        if (this.node.active) {
            this.node.active = false
        }
    }

    onLoad() {
        this.registerEvent()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
    }
}
