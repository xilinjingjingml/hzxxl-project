import { SCMJ_EVENT } from "../hzxl-Events";
import { scmjUtil } from "../hzxl-Util";
import { CardArea, CheckType, EventName, GameState, OperatorCode } from "../hzxl-Constants";

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
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import { Constants } from "../../lobby/start/script/igsConstants";
import MjPrefab from "./hzxl-Prefab";
import { Helper } from "../../lobby/start/script/system/Helper";
import { UIMgr } from "../../lobby/start/script/base/UIMgr";
import { ActivitySrv } from "../../lobby/start/script/system/ActivitySrv";
import { TaskSrv } from "../../lobby/start/script/system/TaskSrv";
import { AdSrv } from "../../lobby/start/script/system/AdSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjResult extends cc.Component {
    winColor = "#d16320"
    loseColor = "#447acf"

    @property(cc.Node)
    ndBgWin: cc.Node = null;
    // @property(cc.Node)
    // imgVictory: cc.Node = null;
    // @property(cc.Node)
    // imgWin: cc.Node = null;
    @property(cc.Node)
    ndBgLose: cc.Node = null;
    @property(cc.Node)
    sptItemIcon: cc.Node = null;
    @property(cc.Node)
    lblWinScore: cc.Node = null;
    @property(cc.Node)
    lblLoseScore: cc.Node = null;
    @property(cc.ProgressBar)
    processBar: cc.ProgressBar = null;
    @property(cc.Node)
    ndBills: cc.Node = null;
    @property(cc.Label)
    lblLevel: cc.Label = null;
    @property(cc.Label)
    lblExp: cc.Label = null;
    @property(cc.Node)
    selfPlayer: cc.Node = null
    @property(cc.Node)
    otherPlayer: cc.Node = null
    @property(cc.Node)
    playerInfo: cc.Node = null
    @property(cc.SpriteFrame)
    sptBean: cc.SpriteFrame = null

    @property(cc.Node)
    btnFirstBox: cc.Node = null
    @property(cc.Node)
    btnMianFeiJinBi: cc.Node = null
    @property(cc.Node)
    btnFoka: cc.Node = null

    @property(cc.Node)
    fokaContent: cc.Node = null

    curTip: cc.Node = null
    bLoadTip: boolean = false

    middleCallback = null;
    enableUpdate = false;
    endProgress = 0;
    redZhongNum: number = 0
    enableNext = true
    bShowTable = true
    changeMatch = false
    resultNoti = null
    roomInfo = null

    btnStartPos = null
    btnStartInRedPos = null

    fokaCount = 0
    fokaTotalCount = 0

    countDownTimer = null
    countDownNum = 5

    onOpen() {
        console.log("scmjResult onOpen")
        // super.onOpen()

        let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
        if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties && matchInfo.metadata.gs_properties.red_zhong) {
            this.redZhongNum = matchInfo.metadata.gs_properties.red_zhong
            if (8 == this.redZhongNum) {
                let icon = cc.find("Node/Content/Icon", this.node)
                icon.getComponent(cc.Sprite).spriteFrame = this.sptBean
            }
        }
    }

    setFokaData() {
        if (!HzxlLogic.getInstance().bPivateRoom) {
            PlatformApi.getFokaProess((res) => {
                console.log("MainTopArea", res)
                if (res) {
                    this.fokaCount = res.count
                    this.fokaTotalCount = res.total_count
                    if (res.count < res.total_count) {
                        cc.find("red", this.btnFoka).active = false
                        cc.find("fukaGiftTips", this.btnFoka).active = true
                        cc.find("fukaGiftTips/tip", this.btnFoka).getComponent(cc.Label).string = "还差" + (res.total_count - res.count) + "局领取福卡礼包"
                    } else {
                        cc.find("red", this.btnFoka).active = true
                        cc.find("fukaGiftTips", this.btnFoka).active = false
                    }

                    this.btnFoka.active = res.count > 0
                }
            })
        }
    }

    onClose() {
        console.log("scmjResult onClose")
        // super.onClose()
        this.stopTimer()
    }
    // 注册事件
    registerEvent() {
        izx.on(SCMJ_EVENT.UPDATE_RESULT, this.updateResult, this)
        EventMgr.on("DismissNot", this.DismissNotHandler, this)

        //切后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            scmjUtil.addGameRoundEndHide()
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.curTip) {
                this.curTip.active = false
            }
        }, this, true);
        izx.Button.bindButtonClick("Node/BtnPrev", this.node, () => {
            cc.find("Node/nodePlayer0", this.node).active = true
            cc.find("Node/BillContent", this.node).active = false
            cc.find("Node/BtnPrev", this.node).active = false
            cc.find("Node/BtnNext", this.node).active = true
        })
        izx.Button.bindButtonClick("Node/BtnNext", this.node, () => {
            cc.find("Node/nodePlayer0", this.node).active = false
            cc.find("Node/BillContent", this.node).active = true
            cc.find("Node/BtnPrev", this.node).active = true
            cc.find("Node/BtnNext", this.node).active = false
        })

        izx.Button.bindButtonClick(this.btnFirstBox, () => {
            UIMgr.OpenUI("component/Activity/FirstBox", {
                single: true, param: {}, closeCb: () => {
                    this.checkFirstBoxShow()
                }
            })
        })
        izx.Button.bindButtonClick(this.btnMianFeiJinBi, () => {
            UIMgr.OpenUI("component/Welfare/Welfare", {
                single: true, param: {}, closeCb: () => {
                    this.checkFreeGoldShow()
                }
            })
        })
        izx.Button.bindButtonClick(this.btnFoka, () => {
            if (this.fokaTotalCount == 0) {
                Helper.OpenTip("即将取福卡礼包")
            } else if (this.fokaTotalCount > this.fokaCount) {
                Helper.OpenTip("还差" + (this.fokaTotalCount - this.fokaCount) + "局即可领取福卡礼包")
            } else {
                PlatformApi.showFoka(() => {
                    this.setFokaData()
                })
            }
        })
        izx.Button.bindButtonClick("Node/Content/BtnCapped", this.node, () => {
            console.log("BtnCapped")
            iGaoShouApi.useItem({
                item_num: 1,
                item_id: Constants.ITEM_INDEX.MJ_DOUBLE_CARD,
                roomInfo: this.roomInfo,
                callback: (res) => {
                    console.log("scmjResult init useItem = ", res)
                    if (res.ret == 2) {
                        let btnCapped = cc.find("Node/Content/BtnCapped", this.node)
                        if (btnCapped) {
                            btnCapped.stopAllActions()
                            btnCapped.active = false
                        }
                    }
                }
            })
        })
        izx.Button.bindButtonClick("Node/Content/BtnRecoverDamages", this.node, () => {
            console.log("BtnRecoverDamages")
            iGaoShouApi.showZhssBox({
                resultData: this.resultNoti,
                roomInfo: this.roomInfo,
                callback: (res) => {
                    console.log("scmjResult updateResult showZhssBox = ", res)
                    if ((res.activity_id == 1017 || res.activity_id == 1018) && res.ret == 3) {
                        cc.find("Node/Content/BtnRecoverDamages", this.node).active = false
                    }
                }
            })
        })
        izx.Button.bindButtonClick("Node/nodePlayer0/ndFan/BtnShare", this.node, () => {
            console.log("BtnShare")
            let node = cc.find("Node", this.node)
            if (cc.sys.WECHAT_GAME === cc.sys.platform) {
                // let canvas: any = Helper.CaptureNode(node)
                let canvas = cc.game.canvas
                // Helper.DelayFun(() => {
                var width = canvas.width;
                var height = canvas.height;
                console.log("canvas width = ", width)
                console.log("canvas height = ", height)
                canvas.toTempFilePath({
                    x: 70,
                    y: 0,
                    width: 900,
                    height: 720,
                    destWidth: 900,
                    destHeight: 720,
                    success(res) {
                        console.log("success")
                        Helper.shareInfo({ share_pic: res.tempFilePath })
                    },
                    fail(res) {
                        console.log(res)
                    }
                })
                // }, 0.1)
            } else if (Helper.isNative()) {
                let path = Helper.CaptureNodeInNative(node)
                if (path.length > 0) {
                    Helper.shareInfo({ share_pic: path })
                }
            } else {
                Helper.shareInfo()
            }
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

    //首充礼包显示检查
    checkFirstBoxShow() {
        if (cc.isValid(this.btnFirstBox)) {
            this.btnFirstBox.active = false
        }
        if (Helper.isAudit() == false) {
            let boxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if (boxes && boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
                for (let idx in boxes[Constants.SHOP_TYPE.FIRST_PAY]) {
                    if (!boxes[Constants.SHOP_TYPE.FIRST_PAY][idx].isBuy) {
                        if (cc.isValid(this.btnFirstBox)) {
                            this.btnFirstBox.active = true
                        }
                    }
                }
            }
        }
    }

    checkFreeGoldShow() {
        // this.setActive("red", this.btnMianFeiJinBi, false)
        /*this.btnMianFeiJinBi.active = false
        let res = ActivitySrv.GetActivityById(3)
        if (res) {
            if (res.day_times && res.receive_num && res.receive_num >= res.day_times) {
                this.btnMianFeiJinBi.active = false
            } else {
                this.btnMianFeiJinBi.active = true
            }
        }*/

        PlatformApi.checkWelfareCount((res) => {
            let red = cc.find("Node/TopArea/btnMianFeiJinBi/red", this.node)
            if (red && red.isValid) {
                red.active = res.count > 0 ? true : false
            }
        })
    }

    playAnimation(node) {
        izx.log("scmjResult playAnimation")
        let child = node.getChildByName("BgTitle")
        let disp = child.getComponent(dragonBones.ArmatureDisplay)
        disp.playAnimation("newAnimation", 1)
    }

    updateResult(msg, playersData, roomInfo, zhuangUid) {
        if (!cc.isValid(this.node)) {
            return
        }
        console.log("scmjResult updateResult msg = ", msg)
        console.log("scmjResult updateResult playersData = ", playersData)
        console.log("scmjResult updateResult roomInfo = ", roomInfo)
        console.log("scmjResult updateResult zhuangUid = ", zhuangUid)
        this.resultNoti = msg
        this.roomInfo = roomInfo
        let player = playersData[0]
        if (player) {
            let playerScore = player.score
            if (playerScore < 0) {
                playerScore = 0
            }
            HzxlLogic.getInstance().playerScore = playerScore
        }
        cc.find("Node", this.node).opacity = 255
        this.node.active = true
        this.changeMatch = false
        // this.enableNext = true
        scmjUtil.addGameRoundEndGame()
        if (HzxlLogic.getInstance().videoData) {
            cc.find("Node/TopArea/btnMianFeiJinBi", this.node).active = false
            cc.find("Node/TopArea/BtnChangeStart", this.node).active = false
            cc.find("Node/TopArea/BtnTask", this.node).active = false
            cc.find("Node/BottomArea/BtnStart", this.node).active = false
        } else {
            this.checkFirstBoxShow()
            this.checkFreeGoldShow()
            this.checkTaskRedPoint()
            iGaoShouApi.showRoundBox({
                resultData: msg,
                roomInfo: roomInfo,
                callback: (res) => {
                    console.log("scmjResult updateResult showRoundBox = ", res)
                    if (!cc.isValid(this.node)) {
                        return
                    }
                    if ((res.activity_id == 1017 || res.activity_id == 1018) && res.ret == 3) {
                        cc.find("Node/Content/BtnRecoverDamages", this.node).active = false
                    }
                    if (res.activity_id == 1025 && res.ret == 3) {
                        this.setFokaData()
                    }

                    // 弹窗后5s继续游戏
                    if (res.isEnd) {
                        let bShow = false
                        let track = cc.sys.localStorage.getItem("FIRST_FOKA_CONTINUE_GAME")
                        if (track && track.length > 0) {
                        } else {
                            bShow = true
                            cc.sys.localStorage.setItem("FIRST_FOKA_CONTINUE_GAME", "1")
                        }
                        if (User.PlayGame == 1 && bShow) {
                            let lblDesc = cc.find("Node/BottomArea/BtnStart/Background/lblDesc", this.node)
                            if (cc.isValid(lblDesc)) {
                                lblDesc.getComponent(cc.Label).string = "继续游戏(5)"
                            }
                            this.countDownTimer = setInterval(() => this.updateTime(), 1000)
                        }
                    }
                }
            })            
        }
        let color = msg.score > 0 ? scmjUtil.hex2color(this.winColor) : scmjUtil.hex2color(this.loseColor)
        if (msg.score > 0) {
            AudioMgr.playSound("audio_win")
            this.ndBgWin.active = true
            this.ndBgLose.active = false
            // if (msg.victory > 1) {
            //     this.imgVictory.active = true
            //     this.imgWin.active = false
            // } else {
            //     this.imgVictory.active = false
            //     this.imgWin.active = true
            // }
            this.lblWinScore.active = true
            this.lblLoseScore.active = false
            this.lblWinScore.getComponent(cc.Label).string = "+" + scmjUtil.FormatNumWYCN(msg.score)
            //   this.playAnimation(this.ndBgWin)

            // let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
            // if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties) {
            //     if (Constants.ITEM_INDEX.GAME_GOLD == matchInfo.metadata.gs_properties.settle_item) {
            //         if (roomInfo) {
            //             iGaoShouApi.showWinMore({
            //                 roomId: roomInfo.roomId,
            //                 callback: (res) => {
            //                     console.log("scmjResult updateResult showWinMore = ", res)
            //                 }
            //             })
            //         }
            //     }
            // }
            if (HzxlLogic.getInstance().videoData) {
            } else {
                let btnCapped = cc.find("Node/Content/BtnCapped", this.node)
                btnCapped.active = true
                btnCapped.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(0.1, 5), cc.rotateTo(0.1, -5), cc.rotateTo(0.1, 5), cc.rotateTo(0.1, -5), cc.rotateTo(0.1, 0), cc.delayTime(2.5))))
                cc.find("Node/Content/BtnRecoverDamages", this.node).active = false
            }
            cc.find("Node/nodePlayer0/ndFan/BtnShare", this.node).active = true
        } else {
            AudioMgr.playSound("audio_lose")
            this.ndBgWin.active = false
            this.ndBgLose.active = true
            this.lblWinScore.active = false
            this.lblLoseScore.active = true
            this.lblLoseScore.getComponent(cc.Label).string = "-" + scmjUtil.FormatNumWYCN(Math.abs(msg.score))
            //   this.playAnimation(this.ndBgLose)

            // let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
            // if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties) {
            //     if (Constants.ITEM_INDEX.GAME_GOLD == matchInfo.metadata.gs_properties.settle_item) {
            //         if (roomInfo) {
            //             iGaoShouApi.showRecoverLosses({
            //                 roomId: roomInfo.roomId,
            //                 callback: (res) => {
            //                     console.log("scmjResult updateResult showRecoverLosses = ", res)
            //                 }
            //             })
            //         }
            //     }
            // }
            if (HzxlLogic.getInstance().videoData) {
            } else {
                let btnCapped = cc.find("Node/Content/BtnCapped", this.node)
                btnCapped.stopAllActions()
                btnCapped.active = false
                iGaoShouApi.checkZhssBox({
                    resultData: msg,
                    roomInfo: roomInfo,
                    callback: (res) => {
                        console.log("iGaoShouApi.checkZhssBox", res)
                        if (this.node && this.node.isValid) {
                            if (res.ret == 2) {
                                let btnRecoverDamages = cc.find("Node/Content/BtnRecoverDamages", this.node)
                                if (btnRecoverDamages && btnRecoverDamages.isValid) {
                                    btnRecoverDamages.active = true
                                }
                            } else {
                                let btnRecoverDamages = cc.find("Node/Content/BtnRecoverDamages", this.node)
                                if (btnRecoverDamages && btnRecoverDamages.isValid) {
                                    btnRecoverDamages.active = false
                                }
                            }
                        }
                    }
                })
            }
            cc.find("Node/nodePlayer0/ndFan/BtnShare", this.node).active = false
        }

        let maxFan = -1
        let maxFanCards = []
        let maxNum = 0
        // let maxRatio = 0
        this.ndBills.removeAllChildren()
        scmjUtil.loadAsset("prefabs/BillItem", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }
            for (let v of msg.items) {
                v.fan = v.fan || 0
                if (v.score > 0 && v.fan >= 0 && v.ratio > 0) {
                    if (scmjUtil.FanRatioConfig(v.fan) >= scmjUtil.FanRatioConfig(maxFan)) {
                        // maxRatio = v.ratio
                        maxFan = v.fan
                        maxFanCards = v.cards
                    }
                    maxNum++
                }

                let node = cc.instantiate(res)
                node.getChildByName("ImgScore").active = true
                if (8 == this.redZhongNum) {
                    node.getChildByName("ImgScore").getComponent(cc.Sprite).spriteFrame = this.sptBean
                }
                node.parent = this.ndBills
                this.setTypeText(node, v.op, v.fan, v.type, v.score, color, v.fans, v.contractType)
                this.setRatioText(node, v.ratio, color, v.score)
                // this.setLine(node, msg.score > 0 ? true : false)
                this.setScoreText(node, v.score)
                this.setRoleText(node, v.position, color)
            }

            if (-1 != maxFan) {
                this.showLeftCards(true, maxFanCards)
                this.showHandCards(true, maxFanCards, -1, maxFan, maxNum)
            } else {
                izx.dispatchEvent(SCMJ_EVENT.GET_LEFTCARDS, 1, (cards) => {
                    this.showLeftCards(false, cards)
                })
                izx.dispatchEvent(SCMJ_EVENT.GET_HANDCARDS_AND_CURCARD, 1, (cards, lack) => {
                    this.showHandCards(false, cards, lack)
                })
            }

            cc.find("Node/nodePlayer0", this.node).active = true
            cc.find("Node/BillContent", this.node).active = false
            cc.find("Node/BtnPrev", this.node).active = false
            cc.find("Node/BtnNext", this.node).active = true
        })
        // this.updateLevel(msg)

        this.otherPlayer.removeAllChildren()
        for (let i = 1; i <= 4; i++) {
            let player = playersData[i - 1]
            if (player) {
                if (1 == i) {
                    if (player.score < 0) {
                        scmjUtil.loadAsset("images/result/lose/bg_4", cc.SpriteFrame, (res) => {
                            if (res && this.selfPlayer && this.selfPlayer.isValid) {
                                this.selfPlayer.getComponent(cc.Sprite).spriteFrame = res
                            }
                        })
                        cc.find("BgScore/Score", this.selfPlayer).color = scmjUtil.hex2color(this.loseColor)
                    }
                    UserSrv.GetPlyDetail(player.uid, (ply: IPlayerData) => {
                        if (this.selfPlayer && this.selfPlayer.isValid) {
                            let head = cc.find("HeadMask/Head", this.selfPlayer)
                            if (head && head.isValid) {
                                scmjUtil.setupAvatarImage(head, ply.avatar)
                            }
                            let nickname = cc.find("Nickname", this.selfPlayer)
                            if (nickname && nickname.isValid) {
                                nickname.getComponent(cc.Label).string = ply.userName
                            }
                            let HeadFrame = cc.find("HeadFrame", this.selfPlayer)
                            if (HeadFrame && HeadFrame.isValid) {
                                iGaoShouApi.setHeadVipTxk(HeadFrame, UserSrv.getQpVipLevel(ply))
                            }
                        }
                    })
                } else {
                    let playerInfo = cc.instantiate(this.playerInfo)
                    playerInfo.active = true
                    playerInfo.parent = this.otherPlayer
                    for (let v of msg.data) {
                        if (v.uid == player.uid) {
                            let score = v.score > 0 ? "+" + scmjUtil.FormatNumWYCN2(v.score) : "-" + scmjUtil.FormatNumWYCN2(Math.abs(v.score))
                            cc.find("BgScore/Score", playerInfo).getComponent(cc.Label).string = score
                            if (v.score < 0) {
                                scmjUtil.loadAsset("images/result/lose/bg_4", cc.SpriteFrame, (res) => {
                                    if (res && playerInfo && playerInfo.isValid) {
                                        playerInfo.getComponent(cc.Sprite).spriteFrame = res
                                    }
                                })
                                cc.find("BgScore/Score", playerInfo).color = scmjUtil.hex2color(this.loseColor)
                            }
                            if (v.giveup) {
                                cc.find("SptPoChan", playerInfo).active = true
                            }
                            break
                        }
                    }
                    UserSrv.GetPlyDetail(player.uid, (ply: IPlayerData) => {
                        if (playerInfo && playerInfo.isValid) {
                            let head = cc.find("HeadMask/Head", playerInfo)
                            if (head && head.isValid) {
                                scmjUtil.setupAvatarImage(head, ply.avatar)
                            }
                            let nickname = cc.find("Nickname", playerInfo)
                            if (nickname && nickname.isValid) {
                                nickname.getComponent(cc.Label).string = ply.userName
                            }
                            let HeadFrame = cc.find("HeadFrame", playerInfo)
                            if (HeadFrame && HeadFrame.isValid) {
                                iGaoShouApi.setHeadVipTxk(HeadFrame, UserSrv.getQpVipLevel(ply))
                            }
                        }
                    })
                    if (2 == i) {
                        playerInfo.getChildByName("Role").getComponent(cc.Label).string = "下家"
                    } else if (3 == i) {
                        playerInfo.getChildByName("Role").getComponent(cc.Label).string = "对家"
                    } else if (4 == i) {
                        playerInfo.getChildByName("Role").getComponent(cc.Label).string = "上家"
                    }
                }
            }
        }

        if (!HzxlLogic.getInstance().bPivateRoom) {
            let acConfig = ActivitySrv.GetActivityById(1022)
            console.log("hzkj User.PlayGame = ", User.PlayGame)
            if (acConfig) {
                console.log("hzkj acConfig = ", acConfig)
            }
            if (User.PlayGame >= 3 && acConfig && acConfig.receive_num < acConfig.day_times && this.redZhongNum > 0) {
                if (HzxlLogic.getInstance().isHzxl()) {
                    cc.find("Node/BottomArea/BtnStartInRed", this.node).active = true
                    // cc.find("Node/BtnStart", this.node).active = false
                }
            } else {
                cc.find("Node/BottomArea/BtnStartInRed", this.node).active = false
                // cc.find("Node/BtnStart", this.node).active = true
            }

            let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
            console.log("scmjResult onOpen matchInfo", matchInfo)
            console.log("scmjResult onOpen DataMgr.data.OnlineParam", DataMgr.data.OnlineParam)
            let gs_properties = matchInfo?.metadata?.gs_properties
            if (gs_properties) {
                let BtnStart = cc.find("Node/BottomArea/BtnStart", this.node)
                let BtnStartInRed = cc.find("Node/BottomArea/BtnStartInRed", this.node)
                this.btnStartPos = this.btnStartPos || BtnStart.getPosition()
                this.btnStartInRedPos = this.btnStartInRedPos || BtnStartInRed.getPosition()
                let level = gs_properties.level || 0
                if (BtnStartInRed.active && DataMgr.data.OnlineParam.hz_switch == 1 && (level == 1 || level == 2)) {
                    BtnStart.setPosition(this.btnStartInRedPos)
                    BtnStartInRed.setPosition(this.btnStartPos)
                } else {
                    BtnStart.setPosition(this.btnStartPos)
                    BtnStartInRed.setPosition(this.btnStartInRedPos)
                }
            }
        }

        this.setFokaData()
        this.fokaContent.active = false
        ActivitySrv.GetRoundAwards((res) => {
            if (cc.isValid(this.node)) {
                if (res && res.err && res.err.code == 200) {
                    res.awards = res.awards || []
                    for (let v of res.awards) {
                        if (v.item_id == Constants.ITEM_INDEX.FuCard) {
                            this.fokaContent.active = true
                            cc.find("num", this.fokaContent).getComponent(cc.Label).string = "+" + v.item_num
                        }
                    }
                }

                cc.tween(this.sptItemIcon).to(1.5, { scale: 1.08 }).to(1.5, { scale: 1 }).union().repeatForever().start();
                cc.tween(this.lblWinScore).to(1.5, { scale: 1.08 }).to(1.5, { scale: 1 }).union().repeatForever().start();
                cc.tween(this.lblLoseScore).to(1.5, { scale: 1.08 }).to(1.5, { scale: 1 }).union().repeatForever().start();
                cc.tween(this.fokaContent).to(1.5, { scale: 1.08 }).to(1.5, { scale: 1 }).union().repeatForever().start();
            }
        })
    }

    showLeftCards(haveHu, cards) {
        console.log("scmjResult showLeftCards ", haveHu, cards)
        let nodePlayer0 = cc.find("Node/nodePlayer0", this.node)

        if (cards.length == 0) {
            return
        }
        let showCards = () => {
            if (nodeArea && nodeArea.isValid) {
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
            }
        }

        let nodeArea = cc.find("Node/nodePlayer0/showOpCards0", this.node)
        if (nodeArea == null) {
            scmjUtil.loadAsset("prefabs/ShowOpCards0", cc.Prefab, (res) => {
                if (!res || !cc.isValid(this.node)) {
                    return
                }
                nodeArea = cc.instantiate(res)
                nodeArea.parent = nodePlayer0
                nodeArea.name = "showOpCards0"
                nodeArea.scale = 0.9
                nodeArea.x = 60

                // if (haveHu) {
                //     nodeArea.y = -63
                // } else {
                nodeArea.y = -32
                // }

                showCards()
            }, "hzxl_subpackage")
        } else {
            for (let v of nodeArea.children) {
                v.active = false
            }

            // if (haveHu) {
            //     nodeArea.y = -63
            // } else {
            nodeArea.y = -32
            // }
            showCards()
        }
    }

    showHandCards(haveHu, cards, lack, fan?, num?) {
        console.log("scmjResult showHandCards ", haveHu, cards, lack, fan, num)
        let nodePlayer0 = cc.find("Node/nodePlayer0", this.node)

        let ndFan = nodePlayer0.getChildByName("ndFan")
        if (fan >= 0 && num) {
            if (fan == 36) {
                if (HzxlLogic.getInstance().isHzxl()) {
                    fan = "36-1"
                } else if (HzxlLogic.getInstance().isGdmj()) {
                    fan = "36-2"
                }
            }
            scmjUtil.loadAsset("images/hu/" + fan, cc.SpriteFrame, (res) => {
                if (cc.isValid(ndFan) && res) {
                    // ndFan.active = true
                    let sptFan = cc.find("sptFan", ndFan)
                    if (sptFan && sptFan.isValid) {
                        sptFan.getComponent(cc.Sprite).spriteFrame = res
                    }
                    let lblDesc = cc.find("sptRatioBg/lblDesc", ndFan)
                    if (lblDesc && lblDesc.isValid) {
                        lblDesc.getComponent(cc.Label).string = "共胡" + num + "次"
                    }
                }
            })
        } else {
            ndFan.active = false
        }

        let showCards = () => {
            if (nodeArea && nodeArea.isValid) {
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
            }
        }

        let nodeArea = cc.find("Node/nodePlayer0/handCard0", this.node)
        if (nodeArea == null) {
            scmjUtil.loadAsset("prefabs/HandCards0", cc.Prefab, (res) => {
                if (cc.isValid(nodePlayer0) && res) {
                    nodeArea = cc.instantiate(res)
                    nodeArea.parent = nodePlayer0
                    nodeArea.name = "handCard0"
                    nodeArea.scale = 0.65
                    nodeArea.x = 0

                    // if (haveHu) {
                    //     nodeArea.y = -60
                    // } else {
                    nodeArea.y = -30
                    // }

                    showCards()
                }
            }, "hzxl_subpackage")
        } else {
            for (let v of nodeArea.children) {
                v.active = false
            }

            // if (haveHu) {
            //     nodeArea.y = -60
            // } else {
            nodeArea.y = -30
            // }
            showCards()
        }
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
                if (cc.isValid(node) && res) {
                    let line = cc.find("Line", node)
                    if (line && line.isValid) {
                        line.getComponent(cc.Sprite).spriteFrame = res
                    }
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

    setTypeText(node, op, fan, type, score, color, fans, contractType) {
        console.log("setTypeText = ", op, fan, type, score, color, fans)
        let lblType = <cc.Label>(node.getChildByName("Type").getComponent(cc.Label))
        lblType.string = ""
        lblType.node.color = color
        let preText = ""
        if (type == CheckType.CheckTypeNone) {
            preText = scmjUtil.opcodeConfig(op)
        } else {
            preText = scmjUtil.checkTypeConfig(type)
        }
        if (preText != "" && score <= 0) {
            preText = "被" + preText
            if (op == OperatorCode.OP_MAIMA) {
                preText = "输马"
            }
        }

        lblType.string = preText
        let fanText = scmjUtil.fanConfig(fan)
        if (fans && fans.length > 0) {
            fanText = ""
            for (let i = 0; i < fans.length; i++) {
                if (fanText.length == 0) {
                    fanText += scmjUtil.fanConfig(fans[i])
                } else {
                    if (scmjUtil.fanConfig(fans[i])) {
                        fanText += "," + scmjUtil.fanConfig(fans[i])
                    }
                }
            }
        }
        if (scmjUtil.isKong(op) == false && fanText.length > 0) {
            lblType.string = lblType.string + "(" + fanText + ")"
            if (lblType.string.length > 8) {
                lblType.string = lblType.string.substring(0, 8) + "..."
                let btnMore = node.getChildByName("BtnMore")
                btnMore.active = true
                izx.Button.bindButtonClick(btnMore, node, (sender, data) => {
                    izx.log("result btnMore")
                    if (this.bLoadTip) {
                        return
                    }
                    if (!this.curTip) {
                        this.bLoadTip = true
                        scmjUtil.loadAsset("prefabs/BillItemMore", cc.Prefab, (res) => {
                            if (cc.isValid(this.node) && res) {
                                this.curTip = cc.instantiate(res)
                                let lblDesc = cc.find("Bg/lblDesc", this.curTip)
                                lblDesc.getComponent(cc.Label).string = fanText
                                this.curTip.parent = this.node
                                let wpos = btnMore.parent.convertToWorldSpaceAR(btnMore.position)
                                let npos = this.node.convertToNodeSpaceAR(wpos)
                                npos.y += 40
                                this.curTip.position = npos
                                this.curTip.active = true

                            }
                            this.bLoadTip = false
                        })
                    } else {
                        let lblDesc = cc.find("Bg/lblDesc", this.curTip)
                        lblDesc.getComponent(cc.Label).string = fanText
                        this.curTip.active = true
                        let wpos = btnMore.parent.convertToWorldSpaceAR(btnMore.position)
                        let npos = this.node.convertToNodeSpaceAR(wpos)
                        npos.y += 40
                        this.curTip.position = npos
                        this.curTip.active = true
                    }
                })
            }
        }
    }

    updateLevel(msg) {
        let prevLevel = msg.level.prevLevel
        let curLevel = msg.level.curLevel
        let incExp = msg.level.incExp
        let prevLevelExp = msg.level.prevLevelExp
        let prevLeftExp = msg.level.prevLeftExp
        let levelExp = msg.level.levelExp
        let leftExp = msg.level.leftExp
        let money = msg.level.money
        this.lblLevel.string = "LV." + prevLevel
        this.lblExp.string = "+" + incExp
        this.processBar.progress = (prevLevelExp - prevLeftExp) / prevLevelExp
        if (curLevel > prevLevel) {
            this.middleCallback = () => {
                this.lblLevel.string = "LV." + curLevel
            }
        } else {
            this.middleCallback = null
        }
        this.endProgress = (levelExp - leftExp) / levelExp
        izx.log("this.endProgress = ", this.endProgress)
        this.scheduleOnce(() => {
            this.enableUpdate = true
        }, 1.0)
        if (curLevel > prevLevel && curLevel > 1 && money > 0) {
            this.scheduleOnce(() => {
                izx.dispatchEvent(EventName.SHOW_AWARDS, { awards: [{ index: 0, num: money }], level: curLevel })
            }, 2.0)
        }
    }

    DismissNotHandler(msg) {
        msg = msg.packet
        // cc.log(msg)
        // this.node.getChildByName("Node/BtnStart").getComponent(cc.Button).interactable = false
        this.enableNext = false
    }

    onBtnBack() {
        console.log("scmjResult onBtnBack")
        AudioMgr.playBtn()
        EventMgr.off("DismissNot", this.DismissNotHandler, this)

        // this.node.active = false
        this.node.destroy()
        if (HzxlLogic.getInstance().videoData) {
        } else {
            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
        }
    }

    onBtnStart() {
        console.log("scmjResult onBtnStart", HzxlLogic.getInstance().playerScore)
        AudioMgr.playBtn()
        PlatformApi.gameItemCheck({
            userItemNum: HzxlLogic.getInstance().playerScore,
            callback: (msg) => {
                if (3 == msg.ret) {
                    this.changeMatch = true
                } else {
                    izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })
                    if (HzxlLogic.getInstance().roomInfo == null) {
                        this.enableNext = false
                    }
                    if (1 == msg.ret && this.enableNext && !this.changeMatch) {  //1继续游戏  2升场
                        scmjUtil.addGameRoundNextGame()
                        // this.node.active = false
                        if (cc.isValid(this.node)) {
                            this.node.destroy()
                        }
                        izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.NormalReadyReq)
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: true })
                        izx.dispatchEvent(SCMJ_EVENT.READY_REQ, true)
                    } else if (2 == msg.ret || !this.enableNext || this.changeMatch) {
                        scmjUtil.addGameRoundNextGame()
                        // this.node.active = false
                        if (cc.isValid(this.node)) {
                            this.node.destroy()
                        }
                        // todo 换桌操作
                        izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.ChangeReadyReq)
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: true })
                        if (this.enableNext) {
                            izx.dispatchEvent(SCMJ_EVENT.ROOM_EXIT_REQ)
                        } else {
                            hzxlMatchMode.JoinRealTimeMatch()
                        }
                    }
                    this.enableNext = true
                }
            }
        })
    }

    onBtnChangeStart() {
        console.log("scmjResult onBtnChangeStart", HzxlLogic.getInstance().playerScore)
        AudioMgr.playBtn()
        PlatformApi.gameItemCheck({
            userItemNum: HzxlLogic.getInstance().playerScore,
            callback: (msg) => {
                izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })
                if (HzxlLogic.getInstance().roomInfo == null) {
                    this.enableNext = false
                }
                if (1 == msg.ret || 2 == msg.ret) {
                    scmjUtil.addGameRoundNextGame()
                    // this.node.active = false
                    if (this.node && this.node.isValid) {
                        this.node.destroy()
                    }
                    izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.ChangeReadyReq)
                    izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                    izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: true })
                    if (this.enableNext) {
                        izx.dispatchEvent(SCMJ_EVENT.ROOM_EXIT_REQ)
                    } else {
                        hzxlMatchMode.JoinRealTimeMatch()
                    }
                }
                this.enableNext = true
            }
        })
    }

    onBtnTask() {
        console.log("scmjResult onBtnTask")
        AudioMgr.playBtn()
        UIMgr.OpenUI("component/Task/Task", {
            single: true, param: {}, closeCb: () => {
                this.checkTaskRedPoint()
            }
        })
    }

    onBtnStartInRed() {
        console.log("scmjResult onBtnStartInRed")
        AudioMgr.playBtn()
        let acConfig = ActivitySrv.GetActivityById(1022)
        if (acConfig && acConfig.receive_num < acConfig.day_times) {
            AdSrv.createAdOrder(acConfig.ad_aid, JSON.stringify(acConfig), (res: IPlayAdCallBack) => {
                if (res && res.order_no && res.order_no.length > 0) {
                    AdSrv.completeAdOrder((res) => {
                        if (res && res.code == "00000") {
                            this.onBtnStart()
                        }
                    })
                }
            })
        } else {
            this.onBtnStart()
        }
    }

    checkTaskRedPoint() {
        let show = false
        TaskSrv.GetTaskList((res) => {
            if (res.list) {
                for (let i = 0; i < res.list.length; i++) {
                    let info = res.list[i]
                    if (info.status == 1) {
                        show = true
                        break
                    }
                }
            }
            let red = cc.find("Node/TopArea/BtnTask/red", this.node)
            if (red && red.isValid) {
                red.active = show
            }
        })
    }

    updateTime() {
        this.countDownNum--
        console.log("updateTime")
        let lblDesc = cc.find("Node/BottomArea/BtnStart/Background/lblDesc", this.node)
        if (this.countDownNum == 0) {
            this.stopTimer()
            this.onBtnStart()
            if (cc.isValid(lblDesc)) {
                lblDesc.getComponent(cc.Label).string = "继续游戏"
            }
        } else {
            if (cc.isValid(lblDesc)) {
                lblDesc.getComponent(cc.Label).string = "继续游戏(" + this.countDownNum + ")"
            }
        }
    }

    stopTimer() {
        if (null !== this.countDownTimer) {
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
        }
    }

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.registerEvent()
        this.onOpen()
    }

    onDestroy() {
        this.unscheduleAllCallbacks()
        this.stopTimer()
        izx.offByTag(this)
        EventMgr.offByTag(this)
    }

    start() {
    }

    update(dt) {
        if (!this.enableUpdate) {
            return
        }

        let progress = this.processBar.progress
        if (progress >= 1) {
            if (this.middleCallback) {
                this.middleCallback()
                this.middleCallback = null
                this.processBar.progress = 0
            } else {
                this.enableUpdate = false
            }
        }
        progress = this.processBar.progress
        if (this.middleCallback == null && progress >= this.endProgress) {
            this.enableUpdate = false
            return
        }

        this.processBar.progress += dt
        if (this.middleCallback == null && this.processBar.progress >= this.endProgress) {
            this.processBar.progress = this.endProgress
        }
    }
}
