import { SCMJ_EVENT } from "../hzxl-Events";
import { LackType } from "../hzxl-Constants";
import { scmjUtil } from "../hzxl-Util";

import { igs } from "../../igs";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";
import BaseUI from "../../lobby/start/script/base/BaseUI";
import { Constants } from "../../lobby/start/script/igsConstants";
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import { WxProxyWrapper } from "../../lobby/start/script/pulgin/WxProxyWrapper";
import { ActivitySrv } from "../../lobby/start/script/system/ActivitySrv";
import { Helper } from "../../lobby/start/script/system/Helper";
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import HzxlLogic from "../hzxl-logic";
import { MatchSvr } from "../../lobby/start/script/system/MatchSvr";
import { User } from "../../lobby/start/script/data/User";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserHead extends cc.Component {
    // 用户id
    uid: string = "";
    // 座位 1-4
    chairId: number = 0;
    // vip等级
    vipLevel: number = 0;
    // 准备状态
    ready: number = 0;
    // 分数
    score: number = 0;
    // 庄家
    bBanker: boolean = false;
    // 托管
    bAuto: boolean = false;
    // 定缺
    lack: LackType = LackType.None;
    // 头像框
    @property(cc.Node)
    lvNum: cc.Node = null;
    // 头像框
    @property(cc.Node)
    sptFrame: cc.Node = null;
    // 头像
    @property(cc.Sprite)
    sptHead: cc.Sprite = null;
    // 左边准备图片
    @property(cc.Node)
    sptLeftReady: cc.Node = null;
    // 右边准备图片
    @property(cc.Node)
    sptRightReady: cc.Node = null;
    // 用户金豆
    @property(cc.Label)
    lblScore: cc.Label = null;
    // 庄图片
    @property(cc.Node)
    sptBanker: cc.Node = null;
    // 定缺图片
    @property(cc.Node)
    sptLack: cc.Node = null;
    // 输钱包赔
    @property(cc.Node)
    noLose: cc.Node = null
    @property(cc.Node)
    updateHead: cc.Node = null

    updateHeadActive = false

    mapLackPic1 = {}
    mapLackPic2 = {}
    lackPos = null
    noLosePos = null
    shieldTimes = 0
    isShowResurgenceBox = true
    ndLack: cc.Node = null // 定缺动画
    ndNoLose: cc.Node = null // 输钱包赔动画
    ndDoubleCapped: cc.Node = null // 翻倍封顶

    _showWxUserBtn = false
    onOpen() {
        // izx.log("UserHead onOpen")
        // super.onOpen()
        this.lackPos = this.sptLack.position
        this.noLosePos = this.noLose.position
        this.mapLackPic1[LackType.CRAK] = "prefabs/AniLackWan_1"
        this.mapLackPic1[LackType.BAM] = "prefabs/AniLackTiao_1"
        this.mapLackPic1[LackType.DOT] = "prefabs/AniLackTong_1"
        this.mapLackPic2[LackType.CRAK] = "prefabs/AniLackWan_2"
        this.mapLackPic2[LackType.BAM] = "prefabs/AniLackTiao_2"
        this.mapLackPic2[LackType.DOT] = "prefabs/AniLackTong_2"

        if (HzxlLogic.getInstance().lackData[this.chairId]) {
            this.onUpdateLack(HzxlLogic.getInstance().lackData[this.chairId])
        }
        if (HzxlLogic.getInstance().bankerChirId == this.chairId) {
            this.onBankerNoti({ chairId: HzxlLogic.getInstance().bankerChirId })
        }
    }

    onClose() {
        // izx.log("UserHead onClose")
        // super.onClose()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_HEAD_READY, this.updateReady, this)
        izx.on(SCMJ_EVENT.BEGIN_GAME_NOTI, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.UPDATE_HEAD_BANKER, this.onBankerNoti, this)
        izx.on(SCMJ_EVENT.UPDATE_HEAD_SCORE, this.onUpdateScore, this)
        izx.on(SCMJ_EVENT.UPDATE_HEAD_LACK, this.onUpdateLack, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.newRound, this)
        izx.on(SCMJ_EVENT.OP_AUTO, this.updateAuto, this)
        izx.on(SCMJ_EVENT.SHOW_HEAD, this.showHead, this)
        izx.on(SCMJ_EVENT.RESULT_NOTI, this.resultNoti, this)
        izx.on(SCMJ_EVENT.UPDATE_NO_LOSE, this.onUpdateNoLose, this)
        izx.on(SCMJ_EVENT.SHOW_LOSE, this.showLose, this)
        izx.on(SCMJ_EVENT.UPDATE_CAP_MULTIPLE, this.updateCapMultiple, this)
        izx.on(SCMJ_EVENT.UPDATE_HEAD_ANI, this.updateHeadAni, this)
        izx.on(SCMJ_EVENT.SHOW_FANG_ZHU, this.showFangZhu, this)
        izx.on(SCMJ_EVENT.SHOW_CONNECT, this.updateConnect, this)
        // EventMgr.on(Constants.EVENT_DEFINE.UPDATE_USER_ITEM, this.updateUserItem, this)
        izx.on(SCMJ_EVENT.GET_LACK, this.getLack, this)

        izx.on(SCMJ_EVENT.SHOW_FOKA_TIP2, () => {
            let giftTip = cc.find("giftTip", this.node)
            if (giftTip) {
                giftTip.active = true
                if (this.updateHead) {
                    this.updateHeadActive = this.updateHead.active
                    this.updateHead.active = false
                }
            }
        }, this)

        izx.on(SCMJ_EVENT.SHOW_FOKA_TIP_CLOSE, () => {
            let giftTip = cc.find("giftTip", this.node)
            if (giftTip && giftTip.active) {
                cc.tween(giftTip)
                    .delay(2)
                    .call(() => {
                        giftTip.active = false
                        if (this.updateHead) {
                            this.updateHead.active = this.updateHeadActive
                        }
                    })
                    .start()
            }
        }, this)

        //切后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            if (this.ndLack && this.ndLack.isValid) {
                this.ndLack.stopAllActions()
                this.ndLack.destroy()
            }
            if (this.ndNoLose && this.ndNoLose.isValid) {
                this.ndNoLose.stopAllActions()
                this.ndNoLose.destroy()
            }
            if (this.ndDoubleCapped && this.ndDoubleCapped.isValid) {
                this.ndDoubleCapped.stopAllActions()
                this.ndDoubleCapped.destroy()
            }
        }, this)

        izx.Button.bindButtonClick("btnHead", this.node, (sender, data) => {
            if (1 == this.chairId) {
                // UIMgr.OpenUI("component/Personal/PersonalPop", { single: true })
            } else {
                izx.dispatchEvent(SCMJ_EVENT.SHOW_PLAYER_INFO, { uid: this.uid, money: this.score, chairId: this.chairId })
            }
        })

        if (HzxlLogic.getInstance().bPivateRoom) {
            izx.Button.bindButtonClick("btnShare", this.node, (sender, data) => {
                izx.log("邀请好友")
                igs.platform.share({
                    query: {
                        name: "红中血流",
                        q2: "q2v",
                        inviteCode: HzxlLogic.getInstance().privateRoomInfo.share_code,
                    },
                    queryExt: {
                        action: "创建房间",
                        ex2: "ext2v"
                    },
                    point: "游戏中按钮分享",
                    shareObj: {
                        rule: "16局，6红中",
                        shareContent: "麻溜的，一起来玩红中血流麻将吧！",
                        sharePicUrl: "https://download.mcbeam.cc/Image/xlhz_share.jpg"
                        // shareContent: "房号:inviteCode,规则:rule,快来和我一起玩吧！",
                        // sharePicUrl: "https://download.mcbeam.cc/hzxl-client/wechat/com.metagame.xlmahjong/1.0.343/remote/hzxl/native/ff/ff3345cb-e3d7-4ae6-b293-f869cd96364c.bb266.png"
                    },
                    // style: igs.platform.EShareStyle.Capture,
                    // param: {

                    // }
                })
            })
        }
    }

    resultNoti(msg) {
        this.sptBanker.active = false
        this.bBanker = false
    }

    showHead(msg = null) {
        // izx.log("showHead")
        // izx.log("msg = ", msg)
        // izx.log("this.chairId = ", this.chairId)
        // if (msg && msg.uid) {
        //   if (msg.uid == this.uid) {
        //     this.node.active = true
        //   }
        //   return
        // }
        // if ((msg && msg.bShow) || this.chairId == 1) {
        //   this.node.active = true
        // } else {
        //   this.node.active = false
        // }
    }

    // 更新准备按钮显示隐藏
    updateReady(noti) {
        // izx.log("UserHead updateReady noti = ", noti)
        if (!noti || !noti.ready) return
        if (noti.chairId != this.chairId) return

        if (noti.ready == 1) {
            if (this.chairId == 2 || this.chairId == 3) {
                this.sptLeftReady.active = true
            } else {
                this.sptRightReady.active = true
            }
        } else {
            this.sptLeftReady.active = false
            this.sptRightReady.active = false
        }
    }
    // 新一局开始重置相关参数
    newRound(msg) {
        if (msg && msg.bBtnReady) {

        } else {
            this.sptLeftReady.active = false
            this.sptRightReady.active = false
        }
        this.sptBanker.active = false
        if (this.sptLack.childrenCount > 0) {
            for (let v of this.sptLack.children) {
                v.destroy()
            }
        }
        this.bBanker = false
        this.lack = LackType.None
        this.bAuto = false
        this.noLose.active = false
        let sptBg = cc.find("SptDoubleCappedBg", this.node)
        if (sptBg && sptBg.isValid) {
            sptBg.active = false
        }
        // let sptFangZhu = cc.find("SptFangZhu", this.node)
        // if (sptFangZhu && sptFangZhu.isValid) {
        //     sptFangZhu.active = false
        // }

        let sptAuto = cc.find("sptAuto", this.node)
        if (sptAuto && sptAuto.isValid) {
            sptAuto.active = false
        }
        let sptOffline = cc.find("sptOffline", this.node)
        if (sptOffline && sptOffline.isValid) {
            sptOffline.active = false
        }
    }
    // 游戏开始通知
    onStartGameNoti(noti) {
        // izx.log("UserHead onStartGameNoti")
        if (!noti) return
        this.newRound({})
    }
    // 置庄通知
    onBankerNoti(noti) {
        // izx.log("UserHead onBankerNoti")
        if (!noti) return
        if (noti.chairId == this.chairId) {
            this.sptBanker.active = true
        } else {
            this.sptBanker.active = false
        }
    }

    // 更新游戏币
    // updateUserItem() {
    //     if (1 == this.chairId) {
    //         let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
    //         if (matchInfo && matchInfo.metadata) {
    //             if (Constants.ITEM_INDEX.GAME_GOLD == matchInfo.metadata.gs_properties.settle_item) {
    //                 this.score = User.Gold
    //             } else if (Constants.ITEM_INDEX.GAME_BEAN == matchInfo.metadata.gs_properties.settle_item) {
    //                 this.score = User.GameBean
    //             }
    //             this.lblScore.string = scmjUtil.FormatNumWYCN2(this.score)
    //         }
    //     }
    // }

    // 更新分数
    onUpdateScore(noti) {
        // izx.log("UserHead onUpdateScore")
        if (!noti) return
        if (noti.chairId == this.chairId) {
            if (noti.money != null) {
                this.score = noti.money
            }
            if (noti.score != null) {
                this.score = noti.score
            }
            if (noti.addScore != null) {
                this.score += noti.addScore
            }
            if (noti.result) {
                return
            }
            if (this.score <= 0) {
                if (HzxlLogic.getInstance().bPivateRoom) {
                    this.lblScore.string = (this.score < 0 ? "-" : "") + scmjUtil.FormatNumWYCN2(Math.abs(this.score))
                    return
                }
                if (HzxlLogic.getInstance().videoData) {
                    return
                }
                if (noti.shieldTimes && noti.shieldTimes > 0) {
                    return
                }
                this.lblScore.string = "0"
                if (noti.giveup) {
                    this.isShowResurgenceBox = false
                }
                if (this.isShowResurgenceBox) {
                    let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
                    if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties) {
                        if (this.isShowResurgenceBox && 1 != matchInfo.metadata.gs_properties.isXueZhan && 8 != matchInfo.metadata.gs_properties.red_zhong &&
                            HzxlLogic.getInstance().isHzxl()) {
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_RECHARGE, { chairId: this.chairId, isShow: true, recharge: 1, isShowResurgenceBox: this.isShowResurgenceBox })
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_LOSE, { chairId: this.chairId, isShow: true })
                        }
                    }
                } else {
                    izx.dispatchEvent(SCMJ_EVENT.SHOW_LOSE, { chairId: this.chairId, isShow: true, giveup: noti.giveup })
                }
            } else {
                this.lblScore.string = scmjUtil.FormatNumWYCN2(this.score)
                if (HzxlLogic.getInstance().bPivateRoom) {
                    return
                }
                izx.dispatchEvent(SCMJ_EVENT.SHOW_LOSE, { chairId: this.chairId, isShow: false })
                izx.dispatchEvent(SCMJ_EVENT.SHOW_RECHARGE, { chairId: this.chairId, isShow: false })
            }
        }
    }

    // 更新定缺
    onUpdateLack(noti) {
        // izx.log("UserHead onUpdateLack")
        if (noti.chairId == this.chairId && noti.lack != -1) {
            // izx.log("noti.chairId == this.chairId noti = ", noti)
            this.lack = noti.lack
            // izx.log("this.mapLackPic2[this.lack] = ", this.mapLackPic2[this.lack])
            let showHeadLack = () => {
                scmjUtil.loadAsset(this.mapLackPic2[this.lack], cc.Prefab, (res) => {
                    if (cc.isValid(this.sptLack) && res) {
                        let lack = cc.instantiate(res)
                        lack.parent = this.sptLack
                        if (User.PlatGame > 0) {
                            lack.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, (event) => {
                                lack.scale = 1.2
                            }, this)
                        }
                    }
                }, User.PlayGame == 0 ? "hzxl_subpackage" : null)
            }
            if (noti.pos) {
                scmjUtil.loadAsset(this.mapLackPic1[this.lack], cc.Prefab, (res) => {
                    if (cc.isValid(this.node) && res) {
                        this.ndLack = cc.instantiate(res)
                        this.ndLack.parent = this.node
                        this.ndLack.position = noti.pos
                        if (1 == this.chairId) {
                            this.ndLack.runAction(cc.sequence(cc.scaleTo(0.1, 0.25), cc.spawn(cc.moveTo(0.2, this.lackPos), cc.scaleTo(0.2, 1)), cc.callFunc(() => {
                                if (cc.isValid(this.ndLack)) {
                                    this.ndLack.destroy()
                                }
                                showHeadLack()
                            })))
                        } else {
                            this.ndLack.runAction(cc.sequence(cc.moveTo(0.3, this.lackPos), cc.callFunc(() => {
                                if (cc.isValid(this.ndLack)) {
                                    this.ndLack.destroy()
                                }
                                showHeadLack()
                            })))
                        }
                    }
                }, User.PlayGame == 0 ? "hzxl_subpackage" : null)
            } else {
                if (this.chairId == 2 || this.chairId == 3) {
                    if (this.sptLack.x > 0) {
                        this.sptLack.x = -this.sptLack.x
                        this.lackPos = this.sptLack.position
                        this.sptLack.position = this.lackPos
                    }
                }

                if (this.sptLack.childrenCount == 0) {
                    showHeadLack()
                }
            }
        }
    }

    // 替换默认头像
    updateHeadicon() {
        // izx.log("UserHead updateHeadicon")
        if (this.uid.length > 0) {
            UserSrv.GetPlyDetail(this.uid, (ply: IPlayerData) => {
                if (this.sptHead && this.sptHead.isValid && this.sptHead.node && this.sptHead.node.isValid) {
                    scmjUtil.setupAvatarImage(this.sptHead.node, ply.avatar)
                    iGaoShouApi.setHeadVipTxk(this.sptFrame, UserSrv.getQpVipLevel(ply))
                    if (this.lvNum && this.lvNum.isValid) {
                        this.lvNum.parent.active = UserSrv.getQpVipLevel(ply) > 0
                        this.lvNum.getComponent(cc.Label).string = "V" + UserSrv.getQpVipLevel(ply)
                    }
                }
            })

            if (HzxlLogic.getInstance().bPivateRoom) {
                let sptFangZhu = cc.find("SptFangZhu", this.node)
                let protoData = <any>HzxlLogic.getInstance().protoData
                if (protoData.ownerNoti && protoData.ownerNoti.owner && this.uid == protoData.ownerNoti.owner) {
                    if (sptFangZhu && sptFangZhu.isValid) {
                        sptFangZhu.active = true
                    }
                } else {
                    if (sptFangZhu && sptFangZhu.isValid) {
                        sptFangZhu.active = false
                    }
                }
            }
        }
    }

    // 托管
    updateAuto(noti) {
        // izx.log("UserHead updateAuto")
        if (HzxlLogic.getInstance().bPivateRoom) {
            if (noti.chairId == this.chairId) {
                this.bAuto = (noti.auto == 1 ? true : false)
                let sptAuto = cc.find("sptAuto", this.node)
                if (sptAuto && sptAuto.isValid) {
                    sptAuto.active = this.bAuto
                }
            }
        }
    }

    // 连接状态
    updateConnect(noti) {
        if (HzxlLogic.getInstance().bPivateRoom) {
            if (scmjUtil.s2c(noti.chairId) == this.chairId) {
                let sptOffline = cc.find("sptOffline", this.node)
                if (sptOffline && sptOffline.isValid) {
                    sptOffline.active = (noti.status == 1 ? true : false)
                }
            }
        }
    }

    // 更新输钱包赔
    onUpdateNoLose(noti) {
        // izx.log("UserHead onUpdateNoLose")
        if (noti.chairId == this.chairId) {
            this.shieldTimes = noti.shieldTimes
            if (noti.pos) {
                scmjUtil.loadAsset("images/ui/hd", cc.SpriteFrame, (res) => {
                    if (cc.isValid(this.node) && res) {
                        this.ndNoLose = new cc.Node()
                        this.ndNoLose.addComponent(cc.Sprite).spriteFrame = res
                        this.ndNoLose.parent = this.node
                        this.ndNoLose.position = noti.pos
                        if (1 == this.chairId) {
                            this.ndNoLose.runAction(cc.sequence(cc.spawn(cc.moveTo(0.5, 0, 0), cc.scaleTo(0.5, 0.5)), cc.callFunc(() => {
                                this.ndNoLose.destroy()
                                if (this.noLose && this.noLose.isValid) {
                                    let lblTimes = cc.find("lblTimes", this.noLose)
                                    if (lblTimes && lblTimes.isValid) {
                                        lblTimes.getComponent(cc.Label).string = "x" + this.shieldTimes
                                    }
                                    this.noLose.active = true
                                }
                            })))
                        }
                    }
                })
            } else {
                if (this.shieldTimes > 0) {
                    let lblTimes = cc.find("lblTimes", this.noLose)
                    if (lblTimes && lblTimes.isValid) {
                        lblTimes.getComponent(cc.Label).string = "x" + this.shieldTimes
                    }
                    this.noLose.active = true
                } else {
                    this.noLose.active = false
                }
            }
        }
    }

    showLose(msg) {
        // izx.log("head showLose isShow = ", msg)
        if (msg.isShow && this.chairId == msg.chairId) {
            this.isShowResurgenceBox = false
        }
    }

    updateCapMultiple(msg) {
        if (msg.capMultiple == 2 && msg.chairId == this.chairId) {
            if (msg.pos) {
                scmjUtil.loadAsset("images/ui/double_capped", cc.SpriteFrame, (res) => {
                    if (cc.isValid(this.node) && res) {
                        this.ndDoubleCapped = new cc.Node()
                        this.ndDoubleCapped.addComponent(cc.Sprite).spriteFrame = res
                        this.ndDoubleCapped.parent = this.node
                        this.ndDoubleCapped.position = msg.pos
                        this.ndDoubleCapped.runAction(cc.sequence(cc.delayTime(1), cc.spawn(cc.moveTo(0.5, 0, 0), cc.scaleTo(0.5, 0.35)), cc.callFunc(() => {
                            this.ndDoubleCapped.destroy()
                            let sptBg = cc.find("SptDoubleCappedBg", this.node)
                            if (sptBg && sptBg.isValid) {
                                sptBg.active = true
                            }
                        })))
                    }
                })
            } else {
                let sptBg = cc.find("SptDoubleCappedBg", this.node)
                if (sptBg && sptBg.isValid) {
                    sptBg.active = true
                }
            }
        }
    }

    updateHeadAni(msg) {
        if (this.lack == LackType.None) {
            return
        }
        let ani = cc.find("Ani", this.node)
        if (cc.isValid(ani)) {
            ani.active = msg.chairId == this.chairId ? true : false
        }
    }

    showFangZhu(noti) {
        if (HzxlLogic.getInstance().bPivateRoom) {
            let sptFangZhu = cc.find("SptFangZhu", this.node)
            if (sptFangZhu && sptFangZhu.isValid) {
                sptFangZhu.active = (this.uid == noti.owner ? true : false)
            }
        }
    }

    getLack(chairId, callback) {
        if (this.chairId == chairId) {
            if (callback) {
                callback(this.lack)
            }
        }
    }

    showWxUserBtn() {
        if (1 == this.chairId && !this._showWxUserBtn) {
            this._showWxUserBtn = true
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                WxProxyWrapper.checkUserScope("userInfo", (canUse) => {
                    if (!canUse) {
                        let userInfoTask = ActivitySrv.GetActivityById(1001)
                        if (userInfoTask && (!userInfoTask.receive_num || userInfoTask.receive_num < 1)) {
                            let self = this
                            let btnName = "hzxl-Head"
                            if (this.node && this.node.isValid) {
                                Helper.createWxUserInfo(this.node, btnName, (sync) => {
                                    if (sync) {
                                        if (this.node && this.node.isValid) {
                                            if (this.updateHead && this.updateHead.isValid) {
                                                this.updateHead.active = false
                                            }
                                        }
                                        WxProxyWrapper.hideUserInfoButton(btnName)
                                        EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
                                            this.updateHeadicon()
                                        }, this)
                                    }
                                }, (create) => {
                                    if (!self || !self.node || !self.isValid || !self.node.active) {
                                        WxProxyWrapper.hideUserInfoButton(btnName)
                                    } else if (!create) {
                                        WxProxyWrapper.hideUserInfoButton(btnName)
                                    } else {
                                        if (this.updateHead && this.updateHead.isValid) {
                                            this.updateHead.active = true
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            }
        }
    }

    // 重置参数
    reset() {
        this.chairId = 0
        this.vipLevel = 0
        this.uid = ""
        this.ready = 0
        this.bBanker = false
        this.score = 0
        this.lack = LackType.None
        this.bAuto = false
        this.isShowResurgenceBox = true
        this.shieldTimes = 0
        let noLose = cc.find("noLose", this.node)
        if (noLose && noLose.isValid) {
            noLose.active = false
        }
        let lblTimes = cc.find("noLose/lblTimes", this.node)
        if (lblTimes && lblTimes.isValid) {
            lblTimes.getComponent(cc.Label).string = "x3"
        }
        let sptBg = cc.find("SptDoubleCappedBg", this.node)
        if (sptBg && sptBg.isValid) {
            sptBg.active = false
        }
        let sptFangZhu = cc.find("SptFangZhu", this.node)
        if (sptFangZhu && sptFangZhu.isValid) {
            sptFangZhu.active = false
        }
        let sptOffline = cc.find("sptOffline", this.node)
        if (sptOffline && sptOffline.isValid) {
            sptOffline.active = false
        }
    }

    // 初始化
    init(params) {
        izx.log("UserHead init params = ", params)
        if (!params) return
        this.reset()
        if (params.chairId) {
            this.chairId = params.chairId
            this.showWxUserBtn()
        }

        if (this.chairId == 2 || this.chairId == 3) {
            if (this.sptLack.x > 0) {
                this.sptLack.x = -this.sptLack.x
                this.noLose.x = -this.noLose.x
            }
        }
        this.lackPos = this.sptLack.position
        this.noLosePos = this.noLose.position

        if (this.chairId == 1) {

        } else {
            this.showHead()
        }

        if (params.uid) {
            this.uid = params.uid
            this.updateHeadicon()
        }
        if (HzxlLogic.getInstance().bPivateRoom) {
            if (params.uid) {
                let btnShare = cc.find("btnShare", this.node)
                if (btnShare && btnShare.isValid) {
                    btnShare.active = false
                }
                let bgScore = cc.find("BgScore", this.node)
                if (bgScore && bgScore.isValid) {
                    bgScore.active = true
                }
            }
            else {
                let btnShare = cc.find("btnShare", this.node)
                if (btnShare && btnShare.isValid) {
                    btnShare.active = true
                }
                let bgScore = cc.find("BgScore", this.node)
                if (bgScore && bgScore.isValid) {
                    bgScore.active = false
                }
            }
        }
        if (params.vipLevel) {
            this.vipLevel = params.vipLevel
        }
        if (params.ready) {
            this.ready = params.ready
            // this.updateReady({ chairId: this.chairId, ready: this.ready })
        }
        if (params.score) {
            this.score = params.score
            // this.onUpdateScore({ chairId: this.chairId, score: 0 })
            this.lblScore.string = scmjUtil.FormatNumWYCN2(this.score)
            if (HzxlLogic.getInstance().bPivateRoom) {
                return
            }
            if (this.score > 0) {
                izx.dispatchEvent(SCMJ_EVENT.SHOW_LOSE, { chairId: this.chairId, isShow: false })
                izx.dispatchEvent(SCMJ_EVENT.SHOW_RECHARGE, { chairId: this.chairId, isShow: false })
            }
        }
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        if (this.lvNum) {
            this.lvNum.parent.active = false
        }
        scmjUtil.addEnterGameScene("head-onLoad")
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        izx.offByTag(this)
        if (1 == this.chairId) {
            WxProxyWrapper.hideUserInfoButton("hzxl-Head")
        }
        EventMgr.offByTag(this)
        // EventMgr.off(Constants.EVENT_DEFINE.UPDATE_USER_ITEM, this.updateUserItem, this)
    }

    start() {
        scmjUtil.addEnterGameScene("head-start")
        this.registerEvent()
        this.onOpen()
        scmjUtil.addEnterGameScene("head-start-end")
    }

    // update (dt) {}
}
