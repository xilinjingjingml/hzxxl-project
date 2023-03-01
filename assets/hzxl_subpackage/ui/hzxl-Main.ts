import { SCMJ_EVENT } from "../hzxl-Events";
import { OperatorCode, GameState, EventName, LackType, CHAT_TAG } from "../hzxl-Constants";
import { scmjUtil } from "../hzxl-Util";
import TingTip from "./hzxl-TingTip";

import { igs } from "../../igs";
import { AudioMgr } from "../hzxl-AudioMgr";
import { NewGateMgr } from "../../lobby/start/script/base/NewGateMgr";
import { User } from "../../lobby/start/script/data/User";
import CardLayer from "./hzxl-CardLayer";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import { PlatformApi } from "../../lobby/start/script/api/platformApi";
import { UIMgr } from "../../lobby/start/script/base/UIMgr";
import { DataMgr } from "../../lobby/start/script/base/DataMgr";
import { Constants } from "../../lobby/start/script/igsConstants";
import { hzxlMatchMode } from "../hzxl-mctchMode";
import HzxlLogic from "../hzxl-logic";
import Scmj from "../hzxl-scmj";
import { MatchSvr } from "../../lobby/start/script/system/MatchSvr";
import { Helper } from "../../lobby/start/script/system/Helper";
import { IGaoShouAPI } from "../../lobby/start/script/iGaoShou";
import { AudioConfig } from "../hzxl-AudioConfig";
import { scmj } from "../proto/pbScmj";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjMain extends cc.Component {
    @property(cc.Label)
    lblGame: cc.Label = null
    @property(cc.Label)
    lblGameDesc: cc.Label = null
    @property(cc.Node)
    cardLayer: cc.Node = null

    @property(cc.Prefab)
    prefabHeadSelf: cc.Prefab = null
    @property(cc.Prefab)
    prefabHeadOther: cc.Prefab = null

    guiPai: cc.Node = null
    ndChat: cc.Node = null
    ndAi: cc.Node = null
    lblCardNum: cc.Label = null
    btnSet: cc.Node = null
    btnFoKa: cc.Node = null
    btnTingTip: cc.Node = null
    btnAi: cc.Node = null
    selfHead: cc.Node = null
    ndMatching: cc.Node = null

    mapNodePaths = {}
    // 根据本地座位号保存
    mapPlayers = {}
    // 根据服务器座位号保存
    mapChairUserData = {}
    // 账单页面
    billLayer = null
    // 结算页面
    resultLayer = null
    // 服务器信息
    serverInfo = null
    // 听牌提示页面
    tingTip = null
    // 玩家信息
    playerInfo = null
    // 解散
    dissmiss = null

    tingCards = []

    chairId = -1
    uid = ""
    state = GameState.None
    matchingCount = 0
    bAuto: boolean = false
    enableNext = true
    changeMatch = false
    bankerChairId = null // 庄家信息
    remainCardNum = 0 // 剩余牌数
    bEndGame = false // 游戏结束
    onForeGroundTimer = null
    matchTimeout = 0 // 匹配超时
    matchTimeoutSend = true// 匹配超时发送入桌
    aniMatchIndex = 1 // 匹配动画索引
    mapLoadUi = { // 动态加载界面状态
        bBill: false,
        bChat: false,
        bTingTip: false,
        bAi: false,
        bMatching: false,
        bPrivateRoomResult: false,
        bPrivateRoomJinDu: false,
        bPrivateRoomTip: false,
        bPrivateRoomInfo: false,
        bPrivateRoomBtns: false,
        bPrivateRoomDismiss: false,
    }
    playersData = []// 玩家信息
    // bShowLackTip: boolean = true // 显示定缺中提示

    anitable = [
        { row: 2, col: 4, count: 8 },
        { row: 1, col: 6, count: 6 },
        { row: 1, col: 3, count: 3, speed: 3 },
        { row: 1, col: 6, count: 6, speed: 1.5 },
        { row: 1, col: 5, count: 5, speed: 2 },
        { row: 1, col: 3, count: 3, speed: 3 },
        { row: 1, col: 5, count: 5, speed: 1.5 },
        { row: 1, col: 5, count: 5, speed: 2.2 },
        { row: 3, col: 3, count: 9 },
        { row: 1, col: 2, count: 2, speed: 2 },
        { row: 2, col: 4, count: 7 },
        { row: 2, col: 4, count: 7, speed: 0.8 },
        { row: 1, col: 2, count: 2, speed: 3 },
        { row: 2, col: 5, count: 10 },
        { row: 2, col: 3, count: 6, speed: 1.5 },
        { row: 1, col: 5, count: 5, speed: 1.2 },
        { row: 2, col: 4, count: 7 },
        { row: 1, col: 4, count: 4, speed: 1.5 },
    ]


    onLoad() {
        izx.log("ScmjMain onLoad")
        scmjUtil.addEnterGameScene("scmjMain-onLoad")
    }

    start() {
        scmjUtil.addEnterGameScene("scmjMain-start")
        igs.unBlockUI()
        // super.onOpen()        
        this.registerEvent()
        this.init()
        scmjUtil.addEnterGameScene("scmjMain-start-end")

        scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {

        })

        let musicVolume = cc.audioEngine.getMusicVolume()
        if(musicVolume > 0){
            iGaoShouApi.SetMusicVolume(0.3)
        }
    }

    onDestroy() {
        izx.log("ScmjMain onDestroy")
        HzxlLogic.getInstance().roomInfo = null
        HzxlLogic.getInstance().ai = [0, 0, 0, 0]
        this.unscheduleAllCallbacks()
        AudioMgr.stopBackground()
        this.stopForeGroundTimer()
        izx.offByTag(this)
        EventMgr.off(Constants.EVENT_DEFINE.UPDATE_USER_ITEM, this.updateUserItem, this)
        EventMgr.off("DismissNot", this.DismissNotHandler, this)
        EventMgr.off("ApplyDismissNot", this.ApplyDismissNotHandle, this)
        EventMgr.off("LeaveRoomNot", this.LeaveRoomNotHandle, this)

        let musicVolume = cc.audioEngine.getMusicVolume()
        if(musicVolume > 0){
            iGaoShouApi.SetMusicVolume(1.0)
        }

        hzxlMatchMode.CancelRealTimeMatch()
    }

    registerEvent() {
        izx.on(SCMJ_EVENT.INIT_USER_DATA, this.initUserData, this)
        izx.on(SCMJ_EVENT.READY_RSP, this.readyRsp, this)
        izx.on(SCMJ_EVENT.READY_NOTI, this.readyNoti, this)
        izx.on(SCMJ_EVENT.ENTER_NOTI, this.enterNoti, this)
        izx.on(SCMJ_EVENT.EXIT_NOTI, this.exitNoti, this)
        izx.on(SCMJ_EVENT.SET_BANKER_NOTI, this.bankerNoti, this)
        izx.on(SCMJ_EVENT.UPDATE_CARDS_NOTI, this.updateCardsNoti, this)
        izx.on(SCMJ_EVENT.OPERATE_NOTI, this.operateNoti, this)
        izx.on(SCMJ_EVENT.OPERATE_REQ, this.operateReq, this)
        izx.on(SCMJ_EVENT.CLIENT_TIMER_NOTI, this.clientTimerNoti, this)
        izx.on(SCMJ_EVENT.RESULT_NOTI, this.resultNoti, this)
        izx.on(SCMJ_EVENT.LACK_NOTI, this.lackNoti, this)
        izx.on(SCMJ_EVENT.MJ_PLAY_MARK_NOTI, this.mjPlayMarkNoti, this)
        izx.on(SCMJ_EVENT.BEGIN_GAME_NOTI, this.onStartGameNoti, this)
        izx.on(SCMJ_EVENT.BILL_RSP, this.billRsp, this)
        izx.on(SCMJ_EVENT.SCORE_CHANGE_NOTI, this.scoreChangeNoti, this)
        izx.on(SCMJ_EVENT.EXIT_ROOM, this.exitRoom, this)
        izx.on(SCMJ_EVENT.COMPLETE_NOTI, this.completeNoti, this)
        izx.on(SCMJ_EVENT.AUTO_NOTI, this.autoNoti, this)

        izx.on(SCMJ_EVENT.SHOW_TING_TIP, this.showTingTip, this)
        izx.on(SCMJ_EVENT.SHOW_AUTO_HU, this.showAutoHu, this)
        izx.on(SCMJ_EVENT.SHOW_MATCHING, this.showMatching, this)
        izx.on(EventName.ROOM_EXIT_REQ, this.onRoomExitReq, this)
        izx.on(SCMJ_EVENT.SHOW_BTN_READY, this.showStartBtn, this)
        izx.on(SCMJ_EVENT.CHANEG_STATE, this.changeState, this)
        izx.on(SCMJ_EVENT.CHAT_NOTI, this.chatNoti, this)
        izx.on(SCMJ_EVENT.STATE_NONE, this.reset, this)
        izx.on(SCMJ_EVENT.EXCHANGE_CONFIRM_NOTI, this.exchangeConfirmNoti, this)
        izx.on(SCMJ_EVENT.EXCHANGE_COMPLETE_NOTI, this.exchangeCompleteNoti, this)
        izx.on(SCMJ_EVENT.AUTO_REQ, this.AutoReq, this)
        izx.on(SCMJ_EVENT.EXCHANGE_RSP, this.ExchangeRsp, this)
        izx.on(SCMJ_EVENT.LACK_RSP, this.LackRsp, this)
        izx.on(SCMJ_EVENT.ROUND_START_NOTI, this.roundStartNoti, this)
        izx.on(SCMJ_EVENT.ROUND_END_NOTI, this.roundEndNoti, this)
        izx.on(SCMJ_EVENT.RECHARGE_NOTI, this.rechargeNoti, this)
        izx.on(SCMJ_EVENT.RECHARGE_REQ, this.rechargeReq, this)
        izx.on(SCMJ_EVENT.REFRESH_NO_LOSE, this.refreshNoLose, this)
        izx.on(SCMJ_EVENT.TING_NOTI, this.tingNoti, this)
        izx.on(SCMJ_EVENT.CHECK_STATE, this.checkStatus, this)
        izx.on(SCMJ_EVENT.SHOW_PLAYER_INFO, this.showPlayerInfo, this)
        izx.on(SCMJ_EVENT.HIDE_EXCHANGE_CARDS, this.hideExchangeCards, this)
        izx.on(SCMJ_EVENT.CAP_MULTIPLE_NOTI, this.capMultipleNoti, this)
        izx.on(SCMJ_EVENT.CAP_MULTIPLE_REQ, this.capMultipleReq, this)
        izx.on(SCMJ_EVENT.SHOW_CAP_MULTIPLE, this.showCapMultiple, this)
        izx.on(SCMJ_EVENT.HIDE_UI, this.hideUi, this)
        izx.on(SCMJ_EVENT.MAIN_TOP_AREA_BTN_EXIT, this.onBtnExit, this)
        izx.on(SCMJ_EVENT.CHANGE_AUTO_STATE, this.changeAutoState, this)
        izx.on(SCMJ_EVENT.GET_PLAYERS_DATA, this.getPlayersData, this)
        izx.on(SCMJ_EVENT.PLAY_LACK_TIP, this.playLackTip, this)
        izx.on(SCMJ_EVENT.WAIT_YOU_TIP, this.waitYouTip, this)
        izx.on(SCMJ_EVENT.ROUNT_COUNT_NOTI, this.rountCountNoti, this)
        izx.on(SCMJ_EVENT.PAUSE_GAME_NOTI, this.pauseGameNoti, this)
        izx.on(SCMJ_EVENT.PRIVATE_ROOM_RESULT_RSP, this.privateRoomResultRsp, this)
        izx.on(SCMJ_EVENT.PRIVATE_ROOM_RESULT_NOTI, this.privateRoomResultNoti, this)
        izx.on(SCMJ_EVENT.SHOW_PRIVATE_ROOM_RESULT, this.showPrivateRoomResult, this)
        izx.on(SCMJ_EVENT.PRIVATE_UPDATE_GAME_INFO, this.showGameInfo, this)
        izx.on(SCMJ_EVENT.SHOW_FANG_ZHU, this.showFangZhu, this)
        izx.on(SCMJ_EVENT.INIT_PRIVATE_ROOM, this.initPrivateRoom, this)
        EventMgr.on(Constants.EVENT_DEFINE.UPDATE_USER_ITEM, this.updateUserItem, this)
        EventMgr.on("DismissNot", this.DismissNotHandler, this)
        EventMgr.on("ApplyDismissNot", this.ApplyDismissNotHandle, this)
        EventMgr.on("LeaveRoomNot", this.LeaveRoomNotHandle, this)

        izx.on(SCMJ_EVENT.GUI_NOTI, this.guinoti, this)
        izx.on(SCMJ_EVENT.MAI_MA_NOTI, this.maimanoti, this)


    }

    init() {
        izx.log("ScmjMain init")
        // izx.offByTag(this)
        this.uid = User.Data.openId
        this.getComponent("hzxl-Touch").registerMainTouch()

        //切后台
        cc.game.on(cc.game.EVENT_HIDE, () => {
            izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: false })
            izx.dispatchEvent(SCMJ_EVENT.HIDE_EXCHANGE_CARDS)
            this.stopForeGroundTimer()
            scmjUtil.addGameRoundHide()
        }, this);

        cc.game.on(cc.game.EVENT_SHOW, () => {
            let req = () => {
                izx.log("scmj FOREGROUND req")
                if (NewGateMgr.isReady()) {
                    izx.log("scmj FOREGROUND req socket ready")
                    this.stopForeGroundTimer()
                    // if (this.state == GameState.NormalReadyReq || this.state == GameState.ChangeReadyReq) {
                    //     izx.log("scmj FOREGROUND req readyAndMatching")
                    //     izx.log("scmj FOREGROUND req this.state", this.state)
                    //     this.readyAndMatching()
                    // } else if (this.state == GameState.Game || this.state == GameState.Result) {
                    let param = {
                        callback: (res) => {
                            izx.log("scmj FOREGROUND req res", res.ret)
                            izx.log("scmj FOREGROUND req this.state", this.state)
                            if (res.ret == 1) {
                                izx.log("scmj FOREGROUND req COMPLETE_REQ")
                                izx.emit(SCMJ_EVENT.COMPLETE_REQ)
                            } else {
                                HzxlLogic.getInstance().roomInfo = null
                                HzxlLogic.getInstance().ai = [0, 0, 0, 0]
                                if (this.state != GameState.Result) {
                                    izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, {})
                                    izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.None)
                                }
                                if (HzxlLogic.getInstance().bPivateRoom) {
                                    izx.dispatchEvent(SCMJ_EVENT.MAIN_TOP_AREA_BTN_EXIT)
                                    let protoData = <any>HzxlLogic.getInstance().protoData
                                    if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                                        setTimeout(() => {
                                            Helper.OpenTip("房间已解散！")
                                        }, 1500)
                                    }
                                } else {
                                    izx.log("scmj FOREGROUND req SHOW_BTN_READY")
                                    izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                                }
                            }
                        }
                    }
                    hzxlMatchMode.getCurRealTimeMastch(param)
                    // } else {
                    //     izx.log("scmj FOREGROUND req do null this.state", this.state)
                    // }
                } else {
                    izx.log("scmj FOREGROUND req socket not ready")
                }
            }
            this.onForeGroundTimer = setInterval(() => req(), 1000)
            req()

            izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                if (!res) {
                    let doubleCapped = cc.find("DoubleCapped", this.node)
                    if (doubleCapped && doubleCapped.isValid) {
                        doubleCapped.destroy()
                    }
                }
            })
        }, this)

        izx.Button.bindButtonClick("CenterArea/BtnReady", this.node, (sender, data) => {
            izx.log("BtnReady", HzxlLogic.getInstance().playerScore)
            AudioMgr.playBtn()
            // let localChairId = this.s2c(this.chairId)
            // let player = this.mapPlayers[localChairId]
            PlatformApi.gameItemCheck({
                // userItemNum: player ? player.score : User.Gold,
                userItemNum: HzxlLogic.getInstance().playerScore,
                callback: (msg) => {
                    if (3 == msg.ret) {
                        this.changeMatch = true
                    } else {
                        if (HzxlLogic.getInstance().roomInfo == null) {
                            this.enableNext = false
                        }
                        let ndLose = cc.find("CenterArea/MainAniPlayArea/Area1/Lose", this.node)
                        let bExitTable = false
                        if (this.state == GameState.Game && (ndLose && ndLose.active)) {
                            bExitTable = true
                            this.enableNext = false
                        }
                        if (1 == msg.ret && this.enableNext && !this.changeMatch) {  //1继续游戏  2升场
                            scmjUtil.addGameRoundNextGame()
                            izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })

                            izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.NormalReadyReq)
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: true })
                            izx.dispatchEvent(SCMJ_EVENT.READY_REQ, true)

                            this.enableNext = true
                        } else if (2 == msg.ret || !this.enableNext || this.changeMatch) { // 换桌操作
                            scmjUtil.addGameRoundNextGame()
                            izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })

                            izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.ChangeReadyReq)
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: true })
                            if (this.enableNext || bExitTable) {
                                izx.dispatchEvent(SCMJ_EVENT.ROOM_EXIT_REQ)
                            } else {
                                hzxlMatchMode.JoinRealTimeMatch()
                            }

                            this.enableNext = true
                        }
                    }
                }
            })
        })

        izx.Button.bindButtonClick("Matching/BtnExit", this.node, (sender, data) => {
            this.onBtnExit()
        })

        if (HzxlLogic.getInstance().videoData) {
        } else {
            scmjUtil.loadAsset("prefabs/MainRightArea", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }
                let mainRightArea = cc.instantiate(res)
                mainRightArea.parent = this.node
                mainRightArea.zIndex = 1

                this.btnTingTip = cc.find("BtnTingTip", mainRightArea)
                this.btnAi = cc.find("BtnAi", mainRightArea)

                izx.Button.bindButtonClick("MainRightArea/BtnBill", this.node, (sender, data) => {
                    izx.log("onBtnBill")
                    AudioMgr.playBtn()
                    izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                        if (res) {
                            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
                            izx.dispatchEvent(SCMJ_EVENT.BILL_REQ, {})
                        }
                    })
                })

                izx.Button.bindButtonClick("MainRightArea/BtnMsg", this.node, (sender, data) => {
                    izx.log("onBtnChat")
                    AudioMgr.playBtn()
                    if (this.mapLoadUi.bChat) {
                        return
                    }
                    if (this.ndChat == null) {
                        this.mapLoadUi.bChat = true
                        let btnMsg = cc.find("MainRightArea/BtnMsg", this.node)
                        scmjUtil.loadAsset("prefabs/Chat", cc.Prefab, (res) => {
                            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
                            if (cc.isValid(btnMsg && res)) {
                                this.ndChat = cc.instantiate(res)
                                this.ndChat.parent = btnMsg
                            }
                            this.mapLoadUi.bChat = false
                        })
                    } else {
                        if (this.ndChat.active) {
                            this.ndChat.active = false
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
                            this.ndChat.active = true
                        }
                    }
                })

                izx.Button.bindButtonClick("MainRightArea/BtnTingTip", this.node, (sender, data) => {
                    izx.log("onBtnTingTip")
                    AudioMgr.playBtn()
                    izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                        if (res) {
                            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
                            izx.dispatchEvent(SCMJ_EVENT.TING_TIP_REQ, {})
                        }
                    })
                })

                izx.Button.bindButtonClick("MainRightArea/BtnAi", this.node, (sender, data) => {
                    izx.log("onBtnAi")
                    AudioMgr.playBtn()
                    if (this.mapLoadUi.bAi) {
                        return
                    }
                    if (this.ndAi == null) {
                        this.mapLoadUi.bAi = true
                        let btnAi = cc.find("MainRightArea/BtnAi", this.node)
                        scmjUtil.loadAsset("prefabs/GamePlay", cc.Prefab, (res) => {
                            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)

                            if (cc.isValid(btnAi) && res) {
                                this.ndAi = cc.instantiate(res)
                                this.ndAi.parent = btnAi
                            }

                            this.mapLoadUi.bAi = false
                        })
                    } else {
                        if (this.ndAi.active) {
                            this.ndAi.active = false
                            izx.dispatchEvent(SCMJ_EVENT.REFRESH_AI)
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
                            this.ndAi.active = true
                        }
                    }
                })
            })
        }

        scmjUtil.loadAsset("prefabs/MainTopArea", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }

            let mainTopArea = cc.instantiate(res)
            mainTopArea.parent = this.node

            this.lblCardNum = cc.find("EswnTop/LeftCardNum", mainTopArea).getComponent(cc.Label)
            this.guiPai = cc.find("GuiTop/Mj", mainTopArea)

            let protoData = <any>HzxlLogic.getInstance().protoData
            if (protoData && protoData.clientTimerNoti) {
                this.lblCardNum.string = protoData.clientTimerNoti.remainCardNum
            }

            this.btnSet = cc.find("BtnSet", mainTopArea)
            izx.Button.bindButtonClick(this.btnSet, this.node, (sender, data) => {
                AudioMgr.playBtn()
                izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)

                let menu = cc.find("Menu", this.btnSet)
                this.changeMenuStatus(!menu.active)
            })

            this.btnFoKa = cc.find("btnFoKa", mainTopArea)

            izx.Button.bindButtonClick("Menu/Layout/BtnAuto", this.btnSet, (sender, data) => {
                console.log("BtnAuto")
                AudioMgr.playBtn()
                izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                    if (res) {
                        this.changeMenuStatus(false)

                        if (this.bAuto) {
                            izx.dispatchEvent(SCMJ_EVENT.AUTO_REQ, { auto: 2 })
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.AUTO_REQ, { auto: 1 })
                        }
                        this.bAuto = !this.bAuto
                        izx.dispatchEvent(SCMJ_EVENT.CHANGE_AUTO_STATE, this.bAuto)
                    }
                })
            })

            izx.Button.bindButtonClick("Menu/Layout/BtnSet", this.btnSet, (sender, data) => {
                console.log("BtnSet")
                AudioMgr.playBtn()
                this.changeMenuStatus(false)

                UIMgr.OpenUI("component/Setting/SettingPop", { single: true, param: { hideBg: true } })
            })

            izx.Button.bindButtonClick("Menu/Layout/BtnHelp", this.btnSet, (sender, data) => {
                console.log("BtnHelp")
                AudioMgr.playBtn()
                this.changeMenuStatus(false)

                let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
                let label = "hzxl:1"
                if (matchInfo && matchInfo.metadata) {
                    switch (matchInfo.metadata.gs_properties.red_zhong) {
                        case 4:
                            label = "hzxl:1"
                            break
                        case 6:
                            label = "hzxl:2"
                            break
                        case 8:
                            label = "hzxl:3"
                            break
                        case 0:
                            if (matchInfo.metadata.gs_properties.isXueZhan == 1) {
                                label = "hzxl:5"
                            } else {
                                label = "hzxl:4"
                            }
                            break
                    }
                }
                UIMgr.OpenUI("component/Rule/RuleDetails", { single: true, param: { label: label } })
            })

            izx.Button.bindButtonClick("Menu/Layout/BtnExit", this.btnSet, (sender, data) => {
                if (HzxlLogic.getInstance().bPivateRoom) {// && this.state == GameState.Game) {
                    let protoData = <any>HzxlLogic.getInstance().protoData
                    if ((protoData.ownerNoti && protoData.ownerNoti.owner && User.OpenID == protoData.ownerNoti.owner) || this.state != GameState.None || (protoData.rountCountNoti && protoData.rountCountNoti.ju > 0)) {
                        this.onBtnDismiss()
                    } else {
                        this.onBtnExit()
                    }
                } else {
                    this.onBtnExit()
                }
            })

            if (HzxlLogic.getInstance().bPivateRoom) {
                let btnRecord = cc.find("Menu/Layout/BtnRecord", this.btnSet)
                if (btnRecord && btnRecord.isValid) {
                    btnRecord.active = true
                }
                // let btnDismiss = cc.find("Menu/Layout/BtnDismiss", this.btnSet)
                // if (btnDismiss && btnDismiss.isValid) {
                //     btnDismiss.active = true
                // }

                izx.Button.bindButtonClick("Menu/Layout/BtnRecord", this.btnSet, (sender, data) => {
                    izx.log("BtnRecord")
                    iGaoShouApi.showTodayPersonalBill()
                })

                izx.Button.bindButtonClick("Menu/Layout/BtnDismiss", this.btnSet, (sender, data) => {
                    console.log("BtnDismiss")
                    AudioMgr.playBtn()
                    this.changeMenuStatus(false)
                    this.onBtnDismiss()
                })
            }
        }, "hzxl_subpackage")

        scmjUtil.loadAsset("prefabs/MainOperateArea", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }

            let mainOperateArea = cc.instantiate(res)
            mainOperateArea.parent = cc.find("CenterArea/CardLayer/BottomArea", this.node)

            if (!HzxlLogic.getInstance().bPivateRoom) {
                let bShow = false
                let track = cc.sys.localStorage.getItem("FIRST_EXCHANGE_TIP_SHOW")
                if (track && track.length > 0) {
                } else {
                    bShow = true
                    cc.sys.localStorage.setItem("FIRST_EXCHANGE_TIP_SHOW", "1")
                }
                if (bShow) {
                    scmjUtil.loadAsset("prefabs/AniHand", cc.Prefab, (res2) => {
                        if (cc.isValid(mainOperateArea) && res2) {
                            let ndHand = cc.instantiate(res2)
                            let btnChangeCard = cc.find("Change/BtnChangeCard", mainOperateArea)
                            ndHand.parent = btnChangeCard
                            ndHand.x = btnChangeCard.width / 3
                            ndHand.y -= btnChangeCard.height / 3
                        }
                    }, "hzxl_subpackage")
                }
            }
        }, "hzxl_subpackage")

        scmjUtil.loadAsset("prefabs/MainAutoArea", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }

            let mainAutoArea = cc.instantiate(res)
            mainAutoArea.parent = cc.find("CenterArea/CardLayer/BottomArea", this.node)

            izx.Button.bindButtonClick("BtnCancelAuto", mainAutoArea, (sender, data) => {
                izx.log("scmjMain onBtnCancelAuto")
                AudioMgr.playBtn()
                izx.dispatchEvent(SCMJ_EVENT.CHECK_STATE, (res) => {
                    if (res) {
                        izx.dispatchEvent(SCMJ_EVENT.AUTO_REQ, { auto: 2 })
                    }
                })
            })
        }, "hzxl_subpackage")

        scmjUtil.loadAsset("prefabs/MainAniPlayArea", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }

            let mainAniPlayArea = cc.instantiate(res)
            mainAniPlayArea.parent = cc.find("CenterArea", this.node)

            if (iGaoShouApi.isAudit()) {
                scmjUtil.loadAsset("images/ui/exchange", cc.SpriteFrame, (res2) => {
                    if (cc.isValid(mainAniPlayArea) && res2) {
                        for (let index = 1; index <= 4; index++) {
                            let sptRecharge = cc.find("Area" + index + "/Recharge/sptRecharge", mainAniPlayArea)
                            if (sptRecharge && sptRecharge.isValid) {
                                sptRecharge.getComponent(cc.Sprite).spriteFrame = res2
                            }
                        }
                    }
                })
            }

            let protoData = <any>HzxlLogic.getInstance().protoData
            if (protoData && protoData.completeNoti && protoData.completeNoti.gameItems) {
                for (let v of protoData.completeNoti.gameItems) {
                    let chairId = this.s2c(v.chairId)
                    v.cards.chairId = chairId
                    if (v.capMultiple && v.capMultiple == 2) { // 封顶x2
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_CAP_MULTIPLE, { chairId: chairId, capMultiple: v.capMultiple })
                    }

                    let giveup = v.giveup
                    if (0 == this.remainCardNum) {
                        giveup = true
                    }
                    if (giveup) {
                        izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: chairId, addScore: v.addScore, giveup: giveup })
                    }
                }
                protoData.completeNoti = null
            }
        }, "hzxl_subpackage")

        this.initMapNodePaths()
        this.showAutoHu({ isShow: false })
        this.showGameInfo()

        this.readyAndMatching()
        izx.dispatchEvent(SCMJ_EVENT.ENTER_SCMJ, {})
        // bgm
        AudioMgr.playBackground()

        scmjUtil.loadAsset(AudioConfig.audio_sounds_table["sound"]["audio_select_group"], cc.AudioClip, (res) => {

        });
        // 新手引导
        // this.popGuideTip()
    }

    initPrivateRoom() {
        // 私人房局数进度、好友、准备状态
        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }

        let protoData = <any>HzxlLogic.getInstance().protoData
        if (protoData && ((protoData.rountCountNoti && protoData.rountCountNoti.ju == 0) || !protoData.rountCountNoti)) {
            if (HzxlLogic.getInstance().videoData) {
                this.mapLoadUi.bPrivateRoomInfo = true
            }
            // 显示房间信息
            if (this.mapLoadUi.bPrivateRoomInfo) {
            } else {
                let privateRoomInfo = cc.find("PrivateRoomInfo", this.node)
                if (privateRoomInfo && privateRoomInfo.isValid) {
                    if (this.state == GameState.Game) {
                        privateRoomInfo.active = false
                    } else {
                        privateRoomInfo.active = true
                    }
                } else {
                    this.mapLoadUi.bPrivateRoomInfo = true
                    scmjUtil.loadAsset("prefabs/PrivateRoomInfo", cc.Prefab, (res) => {
                        if (cc.isValid(this.node) && res) {
                            let privateRoomInfo = cc.instantiate(res)
                            privateRoomInfo.parent = this.node
                            if (this.state == GameState.Game) {
                                privateRoomInfo.active = false
                            } else {
                                privateRoomInfo.active = true
                            }
                        }
                        this.mapLoadUi.bPrivateRoomInfo = false
                    })
                }
            }
        }

        // 显示超时解散房间
        let privateRoomTip = cc.find("PrivateRoomTip", this.node)
        if (privateRoomTip && privateRoomTip.isValid) {
            izx.dispatchEvent(SCMJ_EVENT.REFRESH_PRIVATE_ROOM_TIP_TIMER)
        } else {
            if (this.mapLoadUi.bPrivateRoomTip) {
                return
            }
            this.mapLoadUi.bPrivateRoomTip = true
            scmjUtil.loadAsset("prefabs/PrivateRoomTip", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }
                let tip = cc.instantiate(res)
                tip.parent = this.node
                tip.zIndex = 2
                this.mapLoadUi.bPrivateRoomTip = false
                if (this.state == GameState.Game) {
                    if (protoData && protoData.pauseGameNoti) {
                        izx.dispatchEvent(SCMJ_EVENT.STOP_PRIVATE_ROOM_TIP_TIMER)
                        izx.dispatchEvent(SCMJ_EVENT.UPDATE_PRIVATE_TIP, protoData.pauseGameNoti, this.chairId)
                    } else {
                        tip.active = false
                    }
                } else {
                    if (protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                        let nickname = ""
                        for (let k in this.mapChairUserData) {
                            let v = this.mapChairUserData[k]
                            if (v.ready == 2) {
                                nickname = v.data.nickname
                                break
                            }
                        }
                        if (nickname.length > 0) {
                            izx.dispatchEvent(SCMJ_EVENT.START_PRIVATE_ROOM_TIP_TIMER, { type: 2, nickname: nickname })
                        }
                    } else {
                        izx.dispatchEvent(SCMJ_EVENT.START_PRIVATE_ROOM_TIP_TIMER)
                    }
                }
            })
        }

        this.inviteAndReady()
    }

    stopForeGroundTimer() {
        if (this.onForeGroundTimer) {
            clearTimeout(this.onForeGroundTimer)
            this.onForeGroundTimer = null
        }
    }

    showGameInfo(capMultiple = 1) {
        if (HzxlLogic.getInstance().bPivateRoom) {
            this.lblGame.node.active = false
            this.lblGameDesc.node.active = false
        } else {
            let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
            if (matchInfo && matchInfo.metadata) {
                this.lblGame.string = matchInfo.name
                this.lblGameDesc.string = " 底分:" + matchInfo.metadata.gs_properties.bet + " 封顶:" + matchInfo.metadata.gs_properties.maxFan * capMultiple + "倍"
            }
        }
    }

    onBtnExit() {
        AudioMgr.playBtn()
        let callback = () => {
            if (HzxlLogic.getInstance().roomInfo) {
                HzxlLogic.getInstance().leaveRoomGotoLobby = true
                if (this.enableNext) {
                    izx.dispatchEvent(SCMJ_EVENT.ROOM_EXIT_REQ)
                }
                scmjUtil.addGameRoundBackLobby()
            } else {
                hzxlMatchMode.CancelRealTimeMatch(() => {
                    izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)
                    PlatformApi.GotoLobby()
                })
            }
        }
        let ndLose = cc.find("CenterArea/MainAniPlayArea/Area1/Lose", this.node)
        if (!HzxlLogic.getInstance().bPivateRoom && this.state == GameState.Game && (!ndLose || !ndLose.active)) {
            scmjUtil.loadAsset("prefabs/Tip", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let node = <cc.Node>cc.instantiate(res)
                node.getComponent("hzxl-Tip").callback = callback
                node.getComponent("hzxl-Tip").init({ desc: "现在退出会由笨笨的机器人代打哦~", confirmDesc: "确定", cancelDesc: "取消" })
                node.parent = this.node
                node.zIndex = 1
            })
        } else if (!HzxlLogic.getInstance().bPivateRoom) {
            scmjUtil.loadAsset("prefabs/Tip", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                PlatformApi.getFokaProess((foka) => {
                    let desc = "完成本局就能领取下一个大礼包！真的要放弃吗？"
                    if (foka && foka.total_count > foka.count) {
                        desc = "再玩" + (foka.total_count - foka.count) + "局就能领取下一个大礼包！真的要放弃吗？"
                    }

                    let node = <cc.Node>cc.instantiate(res)
                    node.getComponent("hzxl-Tip").callback = callback
                    node.getComponent("hzxl-Tip").init({ desc: desc, confirmDesc: "忍痛放弃", cancelDesc: "获取礼包" })
                    node.parent = this.node
                    node.zIndex = 1
                })
            })
        } else {
            callback()
        }
    }

    AutoReq(msg) {
        if (2 == msg.auto) {
            this.bAuto = false
            izx.dispatchEvent(SCMJ_EVENT.CHANGE_AUTO_STATE, this.bAuto)

            this.changeMenuStatus(false)
        }
    }

    ExchangeRsp(rsp) {
        let mainExchangeTip = cc.find("CenterArea/MainExchangeTip", this.node)
        if (!mainExchangeTip) {
            scmjUtil.loadAsset("prefabs/MainExchangeTip", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let mainExchangeTip = cc.instantiate(res)
                mainExchangeTip.parent = cc.find("CenterArea", this.node)
            }, "hzxl_subpackage")
        } else {
            mainExchangeTip.active = true
        }
    }

    LackRsp(lack) {
        let mainLackTip = cc.find("CenterArea/MainLackTip", this.node)
        if (!mainLackTip) {
            scmjUtil.loadAsset("prefabs/MainLackTip", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let mainLackTip = cc.instantiate(res)
                mainLackTip.parent = cc.find("CenterArea", this.node)
                // if (!this.bShowLackTip) {
                //     mainLackTip.active = false
                // }
            }, "hzxl_subpackage")
        } else {
            mainLackTip.active = true
        }

        let noti = {
            chairId: 1,
            lack: lack,
            pos: cc.v2(0, 0)
        }
        // 定缺初始位置
        let lackPos = [cc.v2(0, -130), cc.v2(190, 50), cc.v2(0, 180), cc.v2(-190, 50)]
        let wPos = this.node.convertToWorldSpaceAR(lackPos[noti.chairId - 1])
        let temp = cc.find("HeadArea/HeadArea" + noti.chairId, this.cardLayer)
        let nPos = temp.convertToNodeSpaceAR(wPos)
        noti.pos = nPos
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_LACK, noti)
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_LACK_CARDS, noti)
        izx.dispatchEvent(SCMJ_EVENT.OP_LACK, noti)
        // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
    }

    roundStartNoti() {
        scmjUtil.addGameRoundMatchSuccess()
        if (HzxlLogic.getInstance().bPivateRoom) {
            // for (let i = 1; i <= 4; i++) {
            //     let ready = cc.find("ready" + i, this.node)
            //     if (ready && ready.isValid) {
            //         ready.destroy()
            //     }
            // }

            for (let i = 1; i <= 4; i++) {
                let sptReady = cc.find("PrivateRoomBtns/sptReady" + i, this.node)
                if (sptReady && sptReady.isValid) {
                    sptReady.active = false
                    if (i == 1) {
                        sptReady.x = 0
                    }
                }
            }
            let btnInvite = cc.find("PrivateRoomBtns/BtnInvite", this.node)
            if (btnInvite && btnInvite.isValid) {
                btnInvite.active = false
            }
            let btnStart = cc.find("PrivateRoomBtns/BtnStart", this.node)
            if (btnStart && btnStart.isValid) {
                btnStart.active = false
            }

            let tip = cc.find("PrivateRoomTip", this.node)
            if (tip && tip.isValid) {
                izx.dispatchEvent(SCMJ_EVENT.STOP_PRIVATE_ROOM_TIP_TIMER)
                tip.active = false
            }

            UIMgr.CloseUI("component/Firends/FriendsSide")
        }
        scmjUtil.vibrate()
        if (!HzxlLogic.getInstance().bPivateRoom) {
            this.showRoundStart()
        }

    }

    roundEndNoti() {
    }

    DismissNotHandler(msg) {
        msg = msg.packet

        this.enableNext = false
        if (this.dissmiss && this.dissmiss.isValid) {
            this.dissmiss.destroy()
        }
    }

    reset() {
        this.matchingCount = 0
        this.bAuto = false
        this.bankerChairId = -1
        if (this.btnTingTip && this.btnTingTip.isValid) {
            this.btnTingTip.active = false
        }
        if (this.btnAi && this.btnAi.isValid) {
            this.btnAi.active = true
        }
        this.enableNext = true
        this.changeMatch = false
        this.bEndGame = false
        this.matchTimeout = 0
        this.matchTimeoutSend = true
        this.aniMatchIndex = 1
        this.mapLoadUi = {
            bBill: false,
            bChat: false,
            bTingTip: false,
            bAi: false,
            bMatching: false,
            bPrivateRoomResult: false,
            bPrivateRoomJinDu: false,
            bPrivateRoomTip: false,
            bPrivateRoomInfo: false,
            bPrivateRoomBtns: false,
            bPrivateRoomDismiss: false,
        }
        this.playersData = []
        // this.bShowLackTip = true
        HzxlLogic.getInstance().ai = [0, 0, 0, 0]

        this.changeMenuStatus(false)
        izx.dispatchEvent(SCMJ_EVENT.CHANGE_AUTO_STATE, this.bAuto)

        if (HzxlLogic.getInstance().bPivateRoom) {
            if (HzxlLogic.getInstance().protoData["dismissNot"]) {
            } else {
                if (this.resultLayer && this.resultLayer.isValid) {
                    this.resultLayer.destroy()
                }
            }
        } else {
            if (this.resultLayer && this.resultLayer.isValid) {
                this.resultLayer.destroy()
            }
        }

        let privateResult = cc.find("PrivateResult", this.node)
        if (cc.isValid(privateResult)) {
            privateResult.destroy()
        }

        if (this.lblCardNum && this.lblCardNum.isValid) {
            this.lblCardNum.string = "0"
        }

        // for (let i = 1; i <= 4; i++) {
        //     this.ndMatching.getChildByName("HeadBg" + i).removeAllChildren()
        // }

        this.stopForeGroundTimer()

        if (!HzxlLogic.getInstance().bPivateRoom) {
            for (let i = 2; i <= 4; i++) {
                let player = this.mapPlayers[i]
                if (player && player.isValid) {
                    player.node.destroy()
                    this.mapPlayers[i] = null
                }
            }
        }

        let doubleCapped = cc.find("DoubleCapped", this.node)
        if (doubleCapped && doubleCapped.isValid) {
            doubleCapped.destroy()
        }

        let waitYouTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/WaitYouTip", this.node)
        if (waitYouTip && waitYouTip.isValid) {
            waitYouTip.active = false
        }

        let playLackTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/PlayLackTip", this.node)
        if (playLackTip && playLackTip.isValid) {
            playLackTip.active = false
        }

        if (!HzxlLogic.getInstance().isHzxl()) {
            HzxlLogic.getInstance().laizi = -1
        }

        this.tingCards = []
        this.maItems = null
        this.winChairIds = null
    }

    popGuideTip() {
        // let bGuide = izx.getData("scmjPopGuideTip_" + User.Data.uid)
        let bGuide = cc.sys.localStorage.getItem("scmjPopGuideTip_" + this.uid);
        if (!bGuide) {
            izx.pushDialog("hzxl", "prefabs/GuideTip")
        }
    }

    changeState(state) {
        this.state = state
    }

    checkStatus(callback) {
        if (callback) {
            if (HzxlLogic.getInstance().roomInfo && this.state == GameState.Game && this.enableNext) {
                callback(true)
            } else {
                callback(false)
            }
        }
    }

    showPlayerInfo(param) {
        if (this.playerInfo == null) {
            scmjUtil.loadAsset("prefabs/PlayerInfo", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                this.playerInfo = cc.instantiate(res)
                this.playerInfo.getComponent("hzxl-PlayerInfo").initData(param)
                this.playerInfo.parent = this.node
                this.playerInfo.zIndex = 1
            })
        } else {
            this.playerInfo.getComponent("hzxl-PlayerInfo").initData(param)
            this.playerInfo.active = true
        }
    }

    initMapNodePaths() {
        this.mapNodePaths["MjLayerHeadRoot"] = "CenterArea/CardLayer/HeadArea/"
        this.mapNodePaths["MjLayerBottomRoot"] = "CenterArea/CardLayer/BottomArea/"
    }

    initUserData(msg) {
        izx.log("initUserData User.Data.uid = ", User.Data.openId)
        izx.log("initUserData this.uid = ", this.uid)
        izx.log("updateUserData msg = ", msg)
        // return
        this.mapChairUserData = msg.mapChairUserData
        this.mapPlayers = this.mapPlayers ? this.mapPlayers : {}
        if (this.mapChairUserData) {
            for (let key in this.mapChairUserData) {
                let data = this.mapChairUserData[key]
                if (this.uid == data.data.uid) {
                    this.chairId = data.chairId || 0
                    scmjUtil.setChairId(this.chairId)
                    break
                }
            }
            izx.log("this.chairId  = ", this.chairId)

            for (let key in this.mapChairUserData) {
                let data = this.mapChairUserData[key]
                let localChairId = this.s2c(data.chairId)
                let player = this.mapPlayers[localChairId]
                if (player) {
                    player.init({
                        chairId: localChairId,
                        uid: data.data.uid,
                        ready: data.ready,
                        score: data.data.score
                    })
                } else {
                    this.addPlayer(data)
                }
                if (1 != localChairId) {
                    // this.updateMatchHead(localChairId, data.data.uid)
                    // 预下载头像资源
                    UserSrv.GetPlyDetail(data.data.uid, (ply: IPlayerData) => {
                    })
                }

                if (HzxlLogic.getInstance().bPivateRoom) {
                    if (data.ready == 1) {
                        let sptReady = cc.find("PrivateRoomBtns/sptReady" + localChairId, this.node)
                        if (sptReady && sptReady.isValid) {
                            sptReady.active = true
                        }
                    }
                }
            }
        }
    }

    showStartBtn(isActive, btnName?, x?) {
        cc.find("CenterArea/BtnReady", this.node).active = isActive
        // cc.find("CenterArea/BtnChangeReady", this.node).active = isActive
        cc.find("CenterArea/BtnReady/Background/lblDesc", this.node).getComponent(cc.Label).string = btnName ? btnName : "继续游戏"
        cc.find("CenterArea/BtnReady", this.node).x = x ? x : 0
    }

    exitRoom(msg) {
        // izx.dispatchEvent(EventName.ROOM_EXIT_REQ, { needReq: true, backToLobby: true })
        // this.pop()
        // this.close()

        AudioMgr.playBtn()
        // izx.offByTag(this)
        // this.node.destroy()
        // izx.dispatchEvent(SCMJ_EVENT.EXIT_ROOM, {})
        if (this.enableNext) {
            izx.dispatchEvent(SCMJ_EVENT.ROOM_EXIT_REQ)
        }
        izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)
        PlatformApi.GotoLobby()
    }

    onStartGameNoti(noti) {
        izx.log("mjMain onStartGameNoti")
        izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.Game)
        scmjUtil.addGameRoundBeginGame()
        this.showGameInfo()
        izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
        izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: false })
        izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
        izx.dispatchEvent(SCMJ_EVENT.CLOSE_PRIVATE_ROOM_INFO)
        if (this.lblCardNum && this.lblCardNum.isValid) {
            this.lblCardNum.string = "0"
        }
        this.showAutoHu({ isShow: false })
        if (this.btnTingTip && this.btnTingTip.isValid) {
            this.btnTingTip.active = false
        }
        if (this.btnAi && this.btnAi.isValid) {
            this.btnAi.active = true
        }
        HzxlLogic.getInstance().ai = [0, 0, 0, 0]

        let mainAutoArea = cc.find("CenterArea/CardLayer/BottomArea/MainAutoArea", this.node)
        if (mainAutoArea && mainAutoArea.isValid) {
            mainAutoArea.active = false
        }

        if (this.guiPai && this.guiPai.isValid) {
            this.guiPai.active = false
        }
    }

    readyRsp(rsp) {
        izx.log("readyRsp rsp = ", rsp)
        // if (rsp.errCode !== 0) {
        //   this.showStartBtn(true)
        //   return
        // }

        // izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_READY, {
        //     chairId: 1,
        //     ready: 1
        // })

        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }
        let btnReady = cc.find("PrivateRoomBtns/BtnReady", this.node)
        if (btnReady && btnReady.isValid) {
            btnReady.active = false
        }
        let sptReady1 = cc.find("PrivateRoomBtns/sptReady1", this.node)
        if (sptReady1 && sptReady1.isValid) {
            sptReady1.active = true
        }

        if (!this.resultLayer || !this.resultLayer.isValid) {
            let protoData = <any>HzxlLogic.getInstance().protoData
            if (protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                let nickname = ""
                for (let k in this.mapChairUserData) {
                    let v = this.mapChairUserData[k]
                    if (v.ready == 2) {
                        HzxlLogic.getInstance().protoData["pauseGameNoti"] = { flag: 0, chairId: v.chairId }

                        nickname = v.data.nickname
                        break
                    }
                }
                if (nickname.length > 0) {
                    izx.dispatchEvent(SCMJ_EVENT.START_PRIVATE_ROOM_TIP_TIMER, { type: 2, nickname: nickname })
                }
            }
        }
    }

    readyNoti(noti) {
        if (!noti || !noti.uid) {
            return
        }
        if (this.state == GameState.Game) {
            return
        }
        izx.log("noti = ", noti)
        // noti.chairId = this.s2c(noti.chairId)
        // izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_READY, noti)

        let localChairId = this.s2c(noti.chairId)
        if (HzxlLogic.getInstance().bPivateRoom) {
            if (noti.ready == 1) {
                let sptReady = cc.find("PrivateRoomBtns/sptReady" + localChairId, this.node)
                if (sptReady && sptReady.isValid) {
                    sptReady.active = true
                }
            }

            if (!this.resultLayer || !this.resultLayer.isValid) {
                let protoData = <any>HzxlLogic.getInstance().protoData
                if (protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                    let nickname = ""
                    for (let k in this.mapChairUserData) {
                        let v = this.mapChairUserData[k]
                        if (v.ready == 2) {
                            HzxlLogic.getInstance().protoData["pauseGameNoti"] = { flag: 0, chairId: v.chairId }

                            nickname = v.data.nickname
                            break
                        }
                    }
                    if (nickname.length > 0) {
                        izx.dispatchEvent(SCMJ_EVENT.START_PRIVATE_ROOM_TIP_TIMER, { type: 2, nickname: nickname })
                    }
                }
            }
        }
    }

    enterNoti(noti) {
        if (!noti) {
            return
        }
        izx.log("enterNoti noti = ", noti)
        let item = noti.item
        let localChairId = this.s2c(item.chairId)
        let player = this.mapPlayers[localChairId]
        if (player) {
            player.init({
                chairId: localChairId,
                uid: item.data.uid,
                ready: item.ready,
                score: item.data.score
            })
        } else {
            this.addPlayer(item)
        }
        if (1 != localChairId) {
            // this.updateMatchHead(localChairId, item.data.uid)
            // 预下载头像资源
            UserSrv.GetPlyDetail(item.data.uid, (ply: IPlayerData) => {
            })
        }
        if (HzxlLogic.getInstance().bPivateRoom) {
            if (item.ready == 1) {
                let sptReady = cc.find("PrivateRoomBtns/sptReady" + localChairId, this.node)
                if (sptReady && sptReady.isValid) {
                    sptReady.active = true
                }
            }
        }
    }

    /*updateMatchHead(localChairId, openId) {
        izx.log("updateMatchHead ", localChairId)
        if (this.ndMatching) {
            let mcHeadBg = this.ndMatching.getChildByName("HeadBg" + localChairId)
            if (mcHeadBg.childrenCount == 0) {
                scmjUtil.loadAsset("prefabs/AniMatch" + this.aniMatchIndex, cc.Prefab, (res) => {
                    izx.log("load AniMatch ", this.aniMatchIndex)
                    let aniMatch = cc.instantiate(res)
                    aniMatch.parent = mcHeadBg
                    let skeleton = <sp.Skeleton>aniMatch.getComponent(sp.Skeleton);
                    skeleton.setCompleteListener(() => {
                        skeleton.clearTracks()
                        skeleton.setAnimation(0, "xuenhuadonghua2", true)
                    })
                })
                this.aniMatchIndex++
            }
     
            // 预下载头像资源
            UserSrv.GetPlyDetail(openId, (ply: IPlayerData) => {
            })
        }
    }*/

    exitNoti(noti) {
        if (!noti) {
            return
        }
        noti.chairId = noti.chairId || 0
        izx.log("exitNoti noti = ", noti)
        let localChairId = this.s2c(noti.chairId)
        let player = this.mapPlayers[localChairId]
        if (player) {
            player.node.destroy()
            this.mapPlayers[localChairId] = null
        }
    }

    bankerNoti(noti) {
        if (!noti) {
            return
        }
        scmjUtil.addGameRoundSetBankerBegin()
        AudioMgr.playSound("audio_dice")
        noti.chairId = this.s2c(noti.chairId)
        izx.log("bankerNoti noti =", noti)
        this.bankerChairId = noti.chairId
        scmjUtil.playDiceAni(noti.dices, this.node, () => {
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_BANKER, noti)
            if (noti.setEast == 1) {
                izx.dispatchEvent(SCMJ_EVENT.UPDATE_EAST, { chairId: noti.chairId })
            }
            scmjUtil.addGameRoundSetBankerEnd()
        })

        /*let mjLayerS = <CardLayer>this.cardLayer.getComponent("hzxl-CardLayer")
        mjLayerS.calcCardWall({
            chairId: noti.chairId,
            dices: noti.dices
        })*/
    }

    updateCardsNoti(noti) {
        scmjUtil.addGameRoundDealBegin()
        noti.chairId = this.s2c(noti.chairId)
        if (1 == noti.chairId) {
            izx.log("updateCardsNoti noti = ", noti)
        } else {
            let playLackTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/PlayLackTip", this.node)
            if (playLackTip && playLackTip.active) {
                playLackTip.active = false
            }
        }
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_MJLAYER_CARDS, noti)
        izx.dispatchEvent(SCMJ_EVENT.SHOW_AUTO_HU)

        let waitYouTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/WaitYouTip", this.node)
        if (waitYouTip && waitYouTip.active) {
            waitYouTip.active = false
        }
        scmjUtil.addGameRoundDealEnd()
    }

    operateNoti(noti) {
        // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
        noti.chairId = this.s2c(noti.chairId)
        izx.log("OperateNotiHandler noti = ", noti)
        switch (noti.opcode) {
            case OperatorCode.OP_HU_DIANPAO:
            case OperatorCode.OP_HU_ZIMO:
                if (noti.chairId == 1) {
                    izx.dispatchEvent(SCMJ_EVENT.OP_HIDE, {})
                    izx.dispatchEvent(SCMJ_EVENT.ENABLE_PLAY_CARD, { canPlay: false })
                }
                izx.dispatchEvent(SCMJ_EVENT.ANI_CPGH, noti)
                break
            case OperatorCode.OP_PLAY:
                // izx.dispatchEvent(SCMJ_EVENT.ANI_PLAY_CARD, noti)
                izx.dispatchEvent(SCMJ_EVENT.OP_HIDE, {})

                if (HzxlLogic.getInstance().isGdmj()) {
                    if (noti.chairId != 1 && this.tingCards) {
                        //判断是不是我出的且是不是 胡牌
                        if (HzxlLogic.getInstance().privateRoomInfo) {
                            izx.log("HzxlLogic.getInstance().privateRoomInfo", HzxlLogic.getInstance().privateRoomInfo)
                            if (HzxlLogic.getInstance().privateRoomInfo.bixuzimo == 1) {
                                if (this.tingCards.indexOf(noti.card) > -1) {
                                    Helper.OpenTip("推倒胡只能自摸或抢杠胡，不能点炮胡")
                                }
                            }
                        } else {
                            if (this.tingCards.indexOf(noti.card) > -1) {
                                Helper.OpenTip("推倒胡只能自摸或抢杠胡，不能点炮胡")
                            }
                        }
                    }
                }
                break
            case OperatorCode.OP_MOPAI:
                izx.dispatchEvent(SCMJ_EVENT.ANI_MOPAI, noti)
                izx.dispatchEvent(SCMJ_EVENT.OP_HIDE, {})
                break
            case OperatorCode.OP_CHOW:
            case OperatorCode.OP_PONG:
            case OperatorCode.OP_KONG:
                izx.dispatchEvent(SCMJ_EVENT.UPDATE_MJPLAY_MARK, { chairId: 0 })
                izx.dispatchEvent(SCMJ_EVENT.ANI_CPGH, noti, () => {
                    if (HzxlLogic.getInstance().isGdmj()) {
                        izx.dispatchEvent(SCMJ_EVENT.GET_LEFTCARDS, noti.chairId, (cards) => {
                            let num = 0

                            for (let i = 0; i < cards.length; i++) {
                                const card = cards[i];
                                if (card == -99) {
                                    if (cards[i - 2] > 0) {
                                        num++
                                    }
                                }
                            }
                            if (num == 4) {
                                noti.length = 4
                                izx.dispatchEvent(SCMJ_EVENT.ANI_LUODI, noti)
                            } else if (num == 3) {
                                noti.length = 3
                                izx.dispatchEvent(SCMJ_EVENT.ANI_LUODI, noti)
                            }
                        })
                    }
                })
                break
            default:
                izx.dispatchEvent(SCMJ_EVENT.ANI_CPGH, noti)
                break
        }
        this.playOperateSound(noti)

        if (noti.chairId == 1) {
            izx.dispatchEvent(SCMJ_EVENT.SHOW_FOKA_TIP_CLOSE)
        }
    }

    playOperateSound(noti) {
        if (noti.opcode == OperatorCode.OP_PLAY) {
            AudioMgr.playSound("audio_card_" + noti.card + "_", 1)
        } else if (noti.opcode == OperatorCode.OP_KONG || noti.opcode == OperatorCode.OP_KONG_DARK || noti.opcode == OperatorCode.OP_KONG_TURN) {
            AudioMgr.playSound("audio_GANGPAI_", 1)
        } else if (noti.opcode == OperatorCode.OP_PONG) {
            AudioMgr.playSound("audio_PENGPAI_", 1)
        } else if (noti.opcode == OperatorCode.OP_CHOW) {
            AudioMgr.playSound("audio_CHIPAI_", 1)
        } else if (noti.opcode == OperatorCode.OP_HU_DIANPAO || noti.opcode == OperatorCode.OP_HU_AFTER_KONG_TURN) {
            AudioMgr.playSound("audio_hu_", 1)
        } else if (noti.opcode == OperatorCode.OP_HU_ZIMO) {
            AudioMgr.playSound("audio_zimo_", 1)
        }
    }

    operateReq(req: scmj.OperateReq) {
        console.log("operateReq", req)
        let addGiveUp = false
        let mjLayerS = <CardLayer>this.cardLayer.getComponent("hzxl-CardLayer")
        let isHu = mjLayerS.isHu(1)
        let hasHu = false
        for (let index = 0; index < req.operates.length; index++) {
            if (scmjUtil.isHu(req.operates[index].opcode)) {
                hasHu = true
            }
        }
        for (let index = 0; index < req.operates.length; index++) {
            if (req.operates[index].opcode == OperatorCode.OP_PLAY) {
                if (!(isHu && hasHu)) {//胡牌后有胡必胡或杠，不加过按钮
                    addGiveUp = true
                    izx.dispatchEvent(SCMJ_EVENT.ENABLE_PLAY_CARD, { canPlay: true })
                    izx.dispatchEvent(SCMJ_EVENT.UPDATE_TING_MARKS, { tingCards: req.tingCards })
                }
                break
            }
        }
        for (let index = 0; index < req.operates.length; index++) {
            if (req.operates[index].opcode != OperatorCode.OP_PLAY) {
                if (addGiveUp) {
                    req.operates.push({ opcode: OperatorCode.OP_GIVEUP })
                }
                izx.dispatchEvent(SCMJ_EVENT.OP_CPGH, req)
                break
            }
        }
        izx.dispatchEvent(SCMJ_EVENT.SHOW_Introduce)
    }

    operateReq1(req) {
        // izx.log("operateReq req = ", req)
        let mjLayerS = <CardLayer>this.cardLayer.getComponent("hzxl-CardLayer")
        let isHu = mjLayerS.isHu(1)
        if (isHu) {
            for (let index = 0; index < req.opcodes.length; index++) {
                if (scmjUtil.isHu(req.opcodes[index])) {
                    this.scheduleOnce(() => {
                        izx.dispatchEvent(SCMJ_EVENT.OPERATE_RSP, {
                            opcode: req.opcodes[index],
                            card: req.card
                        })
                    }, 0.5)
                    return
                }
            }
        }
        let havePlay = false
        for (let index = 0; index < req.opcodes.length; index++) {
            if (req.opcodes[index] == OperatorCode.OP_PLAY) {
                havePlay = true
                if (isHu) {
                    this.scheduleOnce(() => {
                        izx.dispatchEvent(SCMJ_EVENT.OP_PLAY, { card: req.card })
                    }, 0.6)
                    return
                } else {
                    izx.dispatchEvent(SCMJ_EVENT.ENABLE_PLAY_CARD, { canPlay: true })
                    izx.dispatchEvent(SCMJ_EVENT.UPDATE_TING_MARKS, { tingCards: req.tingCards })
                }
                break
            }
        }
        for (let index = 0; index < req.opcodes.length; index++) {
            if (req.opcodes[index] == OperatorCode.OP_GIVEUP) {
                if (isHu) {
                    this.scheduleOnce(() => {
                        izx.dispatchEvent(SCMJ_EVENT.OPERATE_RSP, {
                            opcode: req.opcodes[index],
                            card: req.card
                        })
                    }, 0.5)
                    return
                }
            }
        }
        for (let index = 0; index < req.opcodes.length; index++) {
            if (req.opcodes[index] != OperatorCode.OP_PLAY) {
                if (havePlay) {
                    req.opcodes.push(OperatorCode.OP_GIVEUP)
                }
                izx.dispatchEvent(SCMJ_EVENT.OP_CPGH, req)

                let playCardTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/PlayCardTip", this.node)
                if (playCardTip && playCardTip.active) {
                    playCardTip.active = false
                }
                break
            }
        }

        izx.dispatchEvent(SCMJ_EVENT.SHOW_Introduce)
    }

    clientTimerNoti(noti) {
        noti.chairId = this.s2c(noti.chairId)
        izx.log("clientTimerNoti noti = ", noti)
        this.remainCardNum = noti.remainCardNum
        if (this.lblCardNum) {
            this.lblCardNum.string = noti.remainCardNum + ""
        }
        let mjLayerS = <CardLayer>this.cardLayer.getComponent("hzxl-CardLayer")
        mjLayerS.setRemainCardNum(noti.remainCardNum)
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_TIMER, noti)
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_ANI, noti)
    }

    lackNoti(noti) {
        noti.chairId = this.s2c(noti.chairId)
        izx.log("lackNoti noti = ", noti)
        let bShowAni = false
        if (1 == noti.chairId) {
            // this.bShowLackTip = false
            let lack = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/Lack", this.node)
            if (lack && lack.active) {
                lack.removeAllChildren()
                lack.active = false
                bShowAni = true
            }

            if (-1 != this.bankerChairId && this.bankerChairId == this.s2c(this.chairId)) {
                let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
                if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties && matchInfo.metadata.gs_properties.red_zhong) {
                    if (55 + matchInfo.metadata.gs_properties.red_zhong == this.remainCardNum) {
                        let playCardTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/PlayCardTip", this.node)
                        if (playCardTip) {
                            playCardTip.active = true
                        }
                    }
                }
            }
        }
        if (1 != noti.chairId || bShowAni) {
            let mainLackTip = cc.find("CenterArea/MainLackTip", this.node)
            if (mainLackTip) {
                mainLackTip.active = false
            }
            // 定缺初始位置
            let lackPos = [cc.v2(0, -130), cc.v2(190, 50), cc.v2(0, 180), cc.v2(-190, 50)]
            let wPos = this.node.convertToWorldSpaceAR(lackPos[noti.chairId - 1])
            let temp = cc.find("HeadArea/HeadArea" + noti.chairId, this.cardLayer)
            let nPos = temp.convertToNodeSpaceAR(wPos)
            noti.pos = nPos
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_LACK, noti)
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_LACK_CARDS, noti)
            izx.dispatchEvent(SCMJ_EVENT.OP_LACK, noti)
            // izx.dispatchEvent(SCMJ_EVENT.GUIDE_HIDE)
        }

        izx.dispatchEvent(SCMJ_EVENT.SHOW_FOKA_TIP1)
    }

    mainGuiLayer = null
    guinoti(noti) {
        noti.chairId = this.s2c(noti.chairId)
        console.log("guinoti noti = ", noti)
        // 展示动画
        HzxlLogic.getInstance().laizi = noti.laizi[0]
        this.mainGuiLayer = cc.find("CenterArea/MainGuiTip", this.node)

        scmjUtil.loadAsset("prefabs/MainGuiTip", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }
            this.mainGuiLayer = cc.instantiate(res)

            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                if (res) {
                    let value = cc.find("GuiArea/Mj1/value", this.mainGuiLayer)
                    if (value && value.isValid) {
                        value.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(noti.laizi[0])
                    }

                    let value1 = cc.find("value", this.guiPai)
                    if (value1 && value1.isValid) {
                        value1.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(noti.laizi[0])
                        this.guiPai.active = true
                    }
                }
                if (this.mainGuiLayer && cc.isValid(this.mainGuiLayer)) {
                    this.mainGuiLayer.parent = this.node
                }
            })
        }, "gdmj")

        this.scheduleOnce(() => {
            if (this.mainGuiLayer && cc.isValid(this.mainGuiLayer)) {
                this.mainGuiLayer.destroy()
            }
        }, 2)
    }

    maimaLayer = null // 买马页面
    maimanoti(noti) {
        izx.log("maimanoti noti = ", noti)
        noti.maItems.forEach(item => {
            item.chairId = this.s2c(item.chairId)
        });
        let winChairIds = []
        let loseChairIds = []
        noti.winChairIds.forEach(item => {
            winChairIds.push(this.s2c(item))
        });
        noti.loseChairIds.forEach(item => {
            loseChairIds.push(this.s2c(item))
        });
        noti.winChairIds = winChairIds
        noti.loseChairIds = loseChairIds
        izx.log("maimanoti noti = ", noti)

        if (!this.maimaLayer || !this.maimaLayer.isValid) {
            let prefabPath = "prefabs/MainMaiMaTip"
            if (HzxlLogic.getInstance().bPivateRoom || HzxlLogic.getInstance().videoData) {
                prefabPath = "prefabs/PrivateMaiMaTip"
                this.maItems = noti.maItems
                this.winChairIds = noti.winChairIds
            }
            scmjUtil.loadAsset(prefabPath, cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }
                UIMgr.CloseUI("component/Setting/SettingPop")

                this.maimaLayer = cc.instantiate(res)
                this.maimaLayer.zIndex = 0
                this.maimaLayer.parent = this.node
                izx.dispatchEvent(SCMJ_EVENT.UPDATE_MaiMa, noti)
            }, "gdmj")
        } else {
            UIMgr.CloseUI("component/Setting/SettingPop")
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_MaiMa, noti)
        }
    }

    playLackTip() {
        if (HzxlLogic.getInstance().bPivateRoom) {
            return
        }
        let bShow = false
        let track = cc.sys.localStorage.getItem("FIRST_PLAY_LACK_TIP_SHOW")
        if (track && track.length > 0) {
            return
        } else {
            bShow = true
            cc.sys.localStorage.setItem("FIRST_PLAY_LACK_TIP_SHOW", "1")
        }
        if (bShow) {
            let playLackTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/PlayLackTip", this.node)
            if (playLackTip) {
                playLackTip.active = true
            }
        }
    }

    waitYouTip(chairId) {
        if (this.s2c(this.chairId) == chairId) {
            let playCardTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/PlayCardTip", this.node)
            if (playCardTip && playCardTip.active) {
                return
            }

            let playLackTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/PlayLackTip", this.node)
            if (playLackTip && playLackTip.active) {
                return
            }

            if (-1 != this.bankerChairId && this.bankerChairId == this.s2c(this.chairId)) {
                let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
                if (matchInfo && matchInfo.metadata && matchInfo.metadata.gs_properties && matchInfo.metadata.gs_properties.red_zhong) {
                    if (55 + matchInfo.metadata.gs_properties.red_zhong == this.remainCardNum) {
                        return
                    }
                }
            }
            if (!HzxlLogic.getInstance().bPivateRoom) {
                let bShow = false
                let track = cc.sys.localStorage.getItem("FIRST_WAIT_YOU_TIP_SHOW")
                if (track && track.length > 0) {
                    return
                } else {
                    bShow = true
                    cc.sys.localStorage.setItem("FIRST_WAIT_YOU_TIP_SHOW", "1")
                }
                if (bShow) {
                    let waitYouTip = cc.find("CenterArea/CardLayer/BottomArea/MainOperateArea/WaitYouTip", this.node)
                    if (waitYouTip) {
                        waitYouTip.active = true
                    }
                }
            }
        }
    }

    billRsp(rsp) {
        if (this.mapLoadUi.bBill) {
            return
        }
        if (this.billLayer == null) {
            this.mapLoadUi.bBill = true
            scmjUtil.loadAsset("prefabs/Bill", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                this.billLayer = cc.instantiate(res)
                this.billLayer.parent = this.node
                this.billLayer.zIndex = 2
                this.mapLoadUi.bBill = false
                izx.dispatchEvent(SCMJ_EVENT.UPDATE_BILL, rsp)
            })
        } else {
            this.billLayer.zIndex = 2
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_BILL, rsp)
        }
    }

    maItems = null
    winChairIds = null
    resultNoti(noti) {
        if (this.maimaLayer) {
            this.maimaLayer.destroy()
        }
        noti.maItems = this.maItems
        noti.winChairIds = this.winChairIds

        let roomInfo = HzxlLogic.getInstance().roomInfo
        izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.Result)
        izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)
        izx.dispatchEvent(SCMJ_EVENT.SHOW_AUTO_HU, { isShow: false })
        izx.dispatchEvent(SCMJ_EVENT.OP_AUTO, { chairId: 1, auto: 2 })
        izx.dispatchEvent(SCMJ_EVENT.OP_HIDE, {})
        izx.dispatchEvent(SCMJ_EVENT.STOP_TIMER, true)
        if (this.btnTingTip) {
            this.btnTingTip.active = false
        }
        if (this.btnAi) {
            this.btnAi.active = true
        }
        this.bAuto = false
        HzxlLogic.getInstance().ai = [0, 0, 0, 0]
        izx.dispatchEvent(SCMJ_EVENT.CHANGE_AUTO_STATE, this.bAuto)
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_ANI, { chairId: -1 })

        let mjLayerS = <CardLayer>this.cardLayer.getComponent("hzxl-CardLayer")
        mjLayerS.resultNoti()

        if (noti.status) {
            scmjUtil.loadAsset("prefabs/AniLiuJu", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let node = cc.instantiate(res)
                node.parent = this.node
                this.scheduleOnce(() => {
                    node.destroy()
                    if (!this.resultLayer || !this.resultLayer.isValid) {
                        let zhuangUid = ""
                        let prefabPath = "prefabs/Result"
                        if (HzxlLogic.getInstance().bPivateRoom || HzxlLogic.getInstance().videoData) {
                            prefabPath = "prefabs/PrivateResultSmall"
                            for (let i = 1; i <= 4; i++) {
                                let player = this.mapPlayers[i]
                                if (player && player.isValid) {
                                    if (player.chairId == this.bankerChairId) {
                                        zhuangUid = player.uid
                                        break
                                    }
                                }
                            }
                        }
                        let bShouResult = true
                        if (HzxlLogic.getInstance().bPivateRoom || HzxlLogic.getInstance().videoData) {
                            let protoData = <any>HzxlLogic.getInstance().protoData
                            if (protoData.dismissNot) {
                                if (protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                                    if (protoData.dismissNot.code == 2) { // 玩家申请解散
                                        bShouResult = false
                                    } else if (protoData.dismissNot.code == 3) { // 超时解散房间
                                        bShouResult = false
                                    }
                                }
                            }
                        }
                        if (bShouResult) {
                            scmjUtil.loadAsset(prefabPath, cc.Prefab, (res3) => {
                                if (!cc.isValid(this.node) || !res3) {
                                    return
                                }
                                UIMgr.CloseUI("component/Setting/SettingPop")

                                this.resultLayer = cc.instantiate(res3)
                                this.resultLayer.zIndex = 2
                                this.resultLayer.parent = this.node
                                izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA, (playersData) => {
                                    izx.dispatchEvent(SCMJ_EVENT.UPDATE_RESULT, noti, playersData, roomInfo, zhuangUid)
                                })

                                if (this.billLayer && this.billLayer.isValid) {
                                    this.billLayer.active = false
                                }
                                izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: 1, score: 0, result: true })

                                if (HzxlLogic.getInstance().bPivateRoom) {
                                } else if (HzxlLogic.getInstance().videoData) {
                                } else {
                                    izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                                }
                            })
                        } else {
                            if (this.billLayer && this.billLayer.isValid) {
                                this.billLayer.active = false
                            }
                            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: 1, score: 0, result: true })
                        }
                    } else {
                        UIMgr.CloseUI("component/Setting/SettingPop")

                        izx.dispatchEvent(SCMJ_EVENT.UPDATE_RESULT, noti, this.mapPlayers, roomInfo)

                        if (this.billLayer != null) {
                            this.billLayer.active = false
                        }
                        izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: 1, score: 0, result: true })

                        if (HzxlLogic.getInstance().bPivateRoom) {
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                        }
                    }
                    this.bEndGame = true

                }, 1)
            }, "gdmj")
        } else {
            scmjUtil.loadAsset("prefabs/AniRoundEnd", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let node = cc.instantiate(res)
                node.parent = this.node
                node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.LOOP_COMPLETE, (event) => {
                    node.destroy()
                    if (!this.resultLayer || !this.resultLayer.isValid) {
                        let zhuangUid = ""
                        let prefabPath = "prefabs/Result"
                        if (HzxlLogic.getInstance().bPivateRoom || HzxlLogic.getInstance().videoData) {
                            prefabPath = "prefabs/PrivateResultSmall"
                            for (let i = 1; i <= 4; i++) {
                                let player = this.mapPlayers[i]
                                if (player && player.isValid) {
                                    if (player.chairId == this.bankerChairId) {
                                        zhuangUid = player.uid
                                        break
                                    }
                                }
                            }
                        }
                        let bShouResult = true
                        if (HzxlLogic.getInstance().bPivateRoom || HzxlLogic.getInstance().videoData) {
                            let protoData = <any>HzxlLogic.getInstance().protoData
                            if (protoData.dismissNot) {
                                if (protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                                    if (protoData.dismissNot.code == 2) { // 玩家申请解散
                                        bShouResult = false
                                    } else if (protoData.dismissNot.code == 3) { // 超时解散房间
                                        bShouResult = false
                                    }
                                }
                            }
                        }
                        if (bShouResult) {
                            scmjUtil.loadAsset(prefabPath, cc.Prefab, (res3) => {
                                if (!cc.isValid(this.node) || !res3) {
                                    return
                                }
                                UIMgr.CloseUI("component/Setting/SettingPop")

                                this.resultLayer = cc.instantiate(res3)
                                this.resultLayer.zIndex = 1
                                this.resultLayer.parent = this.node
                                izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA, (playersData) => {
                                    izx.dispatchEvent(SCMJ_EVENT.UPDATE_RESULT, noti, playersData, roomInfo, zhuangUid)
                                })

                                if (this.billLayer && this.billLayer.isValid) {
                                    this.billLayer.active = false
                                }
                                izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: 1, score: 0, result: true })

                                if (HzxlLogic.getInstance().bPivateRoom) {
                                } else if (HzxlLogic.getInstance().videoData) {
                                } else {
                                    izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                                }                         
                            })
                        } else {
                            if (this.billLayer && this.billLayer.isValid) {
                                this.billLayer.active = false
                            }
                            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: 1, score: 0, result: true })
                        }
                    } else {
                        UIMgr.CloseUI("component/Setting/SettingPop")

                        izx.dispatchEvent(SCMJ_EVENT.UPDATE_RESULT, noti, this.mapPlayers, roomInfo)

                        if (this.billLayer != null) {
                            this.billLayer.active = false
                        }
                        izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: 1, score: 0, result: true })

                        if (HzxlLogic.getInstance().bPivateRoom) {
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                        }
                    }
                    this.bEndGame = true
                }, this)
            })
        }
    }

    mjPlayMarkNoti(noti) {
        noti.chairId = this.s2c(noti.chairId)
        izx.log("mjPlayMarkNoti noti = ", noti)
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_MJPLAY_MARK, noti)
    }

    scoreChangeNoti(noti) {
        for (let v of noti.items) {
            v.chairId = this.s2c(v.chairId)
            let giveup = false
            if (0 == this.remainCardNum) {
                giveup = true
            }
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: v.chairId, score: v.score, giveup: giveup, shieldTimes: v.shieldTimes })

            this.refreshNoLose({ chairId: v.chairId, shieldTimes: v.shieldTimes })
        }

        izx.dispatchEvent(SCMJ_EVENT.ANI_SCORE_CHANGE, noti)

        if (!HzxlLogic.getInstance().bPivateRoom) {
            // 飞金币
            let winArr = []
            let loseArr = []
            for (let v of noti.items) {
                if (v.presentScore != 0) {
                    if (v.presentScore > 0) {
                        winArr.push(v.chairId)
                    } else {
                        loseArr.push(v.chairId)
                    }
                }
            }
            if (winArr.length > 0) {
                scmjUtil.loadAsset("prefabs/FlyGoldRoot", cc.Prefab, (res) => {
                    if (cc.isValid(this.node) && res) {
                        this.scheduleOnce(() => {
                            for (let v of winArr) {
                                if (v == 1) {//只显示自己的飞金币动画
                                    for (let v2 of loseArr) {
                                        let ndAni = cc.instantiate(res)
                                        let ndLose = cc.find("HeadArea/HeadArea" + v2, this.cardLayer)
                                        let ndLosePos = ndLose.position
                                        ndLosePos.y -= 60
                                        let loseWpos = ndLose.parent.convertToWorldSpaceAR(ndLosePos)
                                        let loseNpos = this.node.convertToNodeSpaceAR(loseWpos)
                                        ndAni.parent = this.node
                                        ndAni.position = loseNpos
                                        let ndWin = cc.find("HeadArea/HeadArea" + v, this.cardLayer)
                                        if (cc.isValid(ndWin)) {
                                            let pos = ndWin.position
                                            pos.y -= 60
                                            let wPos = ndWin.parent.convertToWorldSpaceAR(pos)
                                            ndAni.getComponent("hzxl-FlyGoldNode").startFlyToPos(null, wPos, null)
                                        }
                                    }
                                }
                            }
                        }, 2)
                    }
                })
            }
        }
    }

    rechargeNoti(noti) {
        for (let v of noti.items) {
            v.chairId = this.s2c(v.chairId)
            if (4 == v.recharge) {
                izx.dispatchEvent(SCMJ_EVENT.SHOW_RECHARGE, { chairId: v.chairId, isShow: true, recharge: v.recharge })
            } else if (2 == v.recharge) {
                izx.dispatchEvent(SCMJ_EVENT.SHOW_LOSE, { chairId: v.chairId, isShow: true })
            }
            this.refreshNoLose({ chairId: v.chairId, shieldTimes: v.shieldTimes })
        }
    }

    rechargeReq(req) {
        for (let v of req.items) {
            v.chairId = this.s2c(v.chairId)
            if (1 == v.recharge || 6 == v.recharge) {
                if (1 == v.recharge && v.chairId == this.s2c(this.chairId)) {
                } else {
                    izx.dispatchEvent(SCMJ_EVENT.SHOW_RECHARGE, { chairId: v.chairId, isShow: true, recharge: v.recharge })
                }
            } else if (2 == v.recharge) {
                izx.dispatchEvent(SCMJ_EVENT.SHOW_LOSE, { chairId: v.chairId, isShow: true })
            }
            this.refreshNoLose({ chairId: v.chairId, shieldTimes: v.shieldTimes })
        }
    }

    refreshNoLose(noti) {
        if (this.mapPlayers && this.mapPlayers[noti.chairId] && this.mapPlayers[noti.chairId].node) {
            let noLose = cc.find("noLose", this.mapPlayers[noti.chairId].node)
            if (!noLose) {
                return
            }
            if (noti.shieldTimes > 0) {
                noLose.active = true
                noLose.getChildByName("lblTimes").getComponent(cc.Label).string = "x" + noti.shieldTimes
                this.mapPlayers[noti.chairId].shieldTimes = noti.shieldTimes
            } else {
                noLose.active = false
            }

            if (noti.showAni) {
                scmjUtil.loadAsset("prefabs/AniNoLose", cc.Prefab, (res) => {
                    if (!cc.isValid(this.node) || !res) {
                        return
                    }

                    let node = cc.instantiate(res)
                    let aniPlayNode = cc.find("CenterArea/MainAniPlayArea/Area1", this.node)
                    if (aniPlayNode) {
                        node.parent = aniPlayNode
                        let skeleton = <sp.Skeleton>node.getComponent(sp.Skeleton);
                        skeleton.setCompleteListener(() => {
                            node.destroy()
                            let wPos = aniPlayNode.parent.convertToWorldSpaceAR(aniPlayNode.position)
                            let nPos = null
                            // if (1 == noti.chairId) {
                            //     nPos = this.selfHead.convertToNodeSpaceAR(wPos)
                            // } else {
                            let temp = cc.find("HeadArea/HeadArea" + noti.chairId, this.cardLayer)
                            nPos = temp.convertToNodeSpaceAR(wPos)
                            // }
                            noti.pos = nPos
                            izx.dispatchEvent(SCMJ_EVENT.UPDATE_NO_LOSE, noti)
                        })
                    }
                })
            }
        }
    }

    tingNoti(noti) {
        let isShow = noti.isTing == 1 ? true : false
        izx.dispatchEvent(SCMJ_EVENT.SHOW_AUTO_HU, { isShow: isShow, fromServer: true })
    }

    //更新游戏币
    updateUserItem() {
        let ndLose = cc.find("CenterArea/MainAniPlayArea/Area1/Lose", this.node)
        let bRefresh = false
        if (this.state == GameState.Game && (ndLose && ndLose.active)) {
            bRefresh = true
        }
        if ((this.state == GameState.Result && this.selfHead) || bRefresh) {
            izx.log("Main updateUserItem")
            let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
            if (matchInfo && matchInfo.metadata) {
                if (Constants.ITEM_INDEX.GAME_GOLD == matchInfo.metadata.gs_properties.settle_item) {
                    cc.find("BgScore/Score", this.selfHead).getComponent(cc.Label).string = scmjUtil.FormatNumWYCN2(User.Gold)
                    HzxlLogic.getInstance().playerScore = User.Gold
                } else if (Constants.ITEM_INDEX.GAME_BEAN == matchInfo.metadata.gs_properties.settle_item) {
                    cc.find("BgScore/Score", this.selfHead).getComponent(cc.Label).string = scmjUtil.FormatNumWYCN2(User.GameBean)
                    HzxlLogic.getInstance().playerScore = User.GameBean
                }
            }
        }
    }

    completeNoti(noti) {
        if (noti == null) {
            return
        }
        this.initPrivateRoom()
        // TODO: 初始化用户数据
        if (noti.state == 2) {
            if (this.state != GameState.Game) {
                izx.dispatchEvent(SCMJ_EVENT.BEGIN_GAME_NOTI, {})
            }
            izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.Game)
            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
            let mainLackTip = cc.find("CenterArea/MainLackTip", this.node)
            if (mainLackTip) {
                mainLackTip.active = false
            }
            let mainExchangeTip = cc.find("CenterArea/MainExchangeTip", this.node)
            if (mainExchangeTip) {
                mainExchangeTip.active = false
            }
            this.inviteAndReady()
        } else {
            izx.log("completeNoti state ", this.state)
            if (this.state == GameState.Game) {
                izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, {})
                izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.None)
            }
            for (let v of noti.baseItems) {
                let chairId = this.s2c(v.chairId)
                // izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_READY, { chairId: chairId, ready: v.ready })
                izx.log("completeNoti chairId ", chairId, v.ready, this.state)
                if (chairId == 1) {
                    if (v.ready == 1) {
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                        if (HzxlLogic.getInstance().bPivateRoom) {
                            this.inviteAndReady({ chairId: chairId, ready: v.ready })
                        }
                    } else if (this.state == GameState.None && noti.gameItems && noti.gameItems.length > 0) {
                        if (!HzxlLogic.getInstance().bPivateRoom) {
                            izx.log("completeNoti showStartBtn true")
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                        }
                    } else if (this.state == GameState.Result || this.state == GameState.Game) {
                        if (!HzxlLogic.getInstance().bPivateRoom) {
                            izx.log("completeNoti showStartBtn true")
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                        }
                    } else if (v.ready == 2) {
                        if (HzxlLogic.getInstance().bPivateRoom) {
                            this.inviteAndReady({ chairId: chairId, ready: v.ready })
                        }
                    }
                }
            }
        }

        // 鬼牌
        if (noti.laizi && noti.laizi.length > 0) {
            HzxlLogic.getInstance().laizi = noti.laizi[0]
            scmjUtil.loadAsset("images/maJiang/mj", cc.SpriteAtlas, (res) => {
                if (res) {
                    let value = cc.find("value", this.guiPai)
                    if (value && value.isValid) {
                        value.getComponent(cc.Sprite).spriteFrame = res.getSpriteFrame(noti.laizi[0])
                        this.guiPai.active = true
                    }
                }
            })
        }
        if (this.mainGuiLayer && cc.isValid(this.mainGuiLayer)) {
            this.mainGuiLayer.destroy()
        }

        izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: false })

        if (noti.banker >= 0) {
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_EAST, { chairId: this.s2c(noti.banker) })
            noti.banker = this.s2c(noti.banker)
            this.bankerChairId = noti.banker
            HzxlLogic.getInstance().bankerChirId = noti.banker
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_BANKER, { chairId: noti.banker })
        }
        this.remainCardNum = noti.remainCardNum
        if (this.lblCardNum) {
            this.lblCardNum.string = noti.remainCardNum + ""
        }
        let mjLayerS = <CardLayer>this.cardLayer.getComponent("hzxl-CardLayer")
        /*mjLayerS.calcCardWall({
            chairId: noti.banker,
            dices: noti.dices
        })*/
        mjLayerS.setRemainCardNum(noti.remainCardNum)
        for (let v of noti.gameItems) {
            let chairId = this.s2c(v.chairId)
            v.cards.chairId = chairId
            let lackNoti = { chairId: chairId, lack: v.lack }
            HzxlLogic.getInstance().lackData[chairId] = lackNoti
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_MJLAYER_CARDS, v.cards, true)
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_LACK, lackNoti)
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_LACK_CARDS, lackNoti)
            izx.dispatchEvent(SCMJ_EVENT.OP_LACK, lackNoti)
            if (chairId == 1) {
                izx.dispatchEvent(SCMJ_EVENT.OP_AUTO, { chairId: 1, auto: 2 })
                this.bAuto = false
                izx.dispatchEvent(SCMJ_EVENT.CHANGE_AUTO_STATE, this.bAuto)
                if (v.ai) {
                    HzxlLogic.getInstance().ai = v.ai
                    izx.dispatchEvent(SCMJ_EVENT.REFRESH_AI)
                }
                // this.showGameInfo(v.capMultiple)
            }
            if (v.capMultiple && v.capMultiple == 2) { // 封顶x2
                izx.dispatchEvent(SCMJ_EVENT.SHOW_CAP_MULTIPLE, { chairId: chairId, capMultiple: v.capMultiple })
            }
            let giveup = v.giveup
            if (0 == this.remainCardNum) {
                giveup = true
            }
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_HEAD_SCORE, { chairId: chairId, addScore: v.addScore, giveup: giveup })
            if (v.huStatus) {
                izx.dispatchEvent(SCMJ_EVENT.SHOW_WIN, { chairId: chairId, huStatus: v.huStatus })
            }
            let noLostNoti = { chairId: chairId, shieldTimes: v.shieldTimes }
            izx.dispatchEvent(SCMJ_EVENT.UPDATE_NO_LOSE, noLostNoti)
            // izx.dispatchEvent(SCMJ_EVENT.UPDATE_CAP_MULTIPLE, { chairId: chairId, capMultiple: v.capMultiple })
        }

        for (let v of noti.baseItems) {
            if (v.data.uid == User.OpenID) {
                izx.dispatchEvent(SCMJ_EVENT.CLIENT_TIMER_NOTI, { chairId: v.chairId, second: 3, remainCardNum: noti.remainCardNum })

                HzxlLogic.getInstance().protoData["clientTimerNoti"] = { chairId: v.chairId, second: 3, remainCardNum: noti.remainCardNum }
                break
            }
        }
    }

    autoNoti(noti) {
        noti.chairId = this.s2c(noti.chairId)
        console.log("autoNoti noti = ", noti)
        izx.dispatchEvent(SCMJ_EVENT.OP_AUTO, noti)
        if (1 == noti.chairId) {
            if (noti.auto == 1) {
                scmjUtil.addGameRoundAutoOn()
                this.bAuto = true
            } else {
                scmjUtil.addGameRoundAutoOff()
                this.bAuto = false
            }
            izx.dispatchEvent(SCMJ_EVENT.CHANGE_AUTO_STATE, this.bAuto)
        }
    }

    changeAutoState(state) {
        // 重置右上角菜单中托管状态
        if (this.btnSet) {
            cc.find("Menu/Layout/BtnAuto/Background/Label", this.btnSet).getComponent(cc.Label).string = state ? "取消托管" : "托管"
        }

        // 重置手牌上托管状态
        let mainAutoArea = cc.find("CenterArea/CardLayer/BottomArea/MainAutoArea", this.node)
        if (mainAutoArea) {
            mainAutoArea.active = state
        }
    }

    getPlayersData(callback?) {
        if (this.playersData && this.playersData.length == 0) {
            izx.log("getPlayersData null")
            if (this.mapPlayers) {
                for (let k in this.mapPlayers) {
                    let player = this.mapPlayers[k]
                    if (player && player.isValid) {
                        this.playersData.push({ lack: player.lack, score: player.score, uid: player.uid, chairId: player.chairId })
                    }
                }
            }
        }
        izx.log("getPlayersData = ", this.playersData)
        if (callback) {
            callback(this.playersData)
        }
    }

    chatNoti(noti) {
        let localChairId = this.s2c(noti.chairId)
        izx.log("chatNoti localChairId = ", localChairId)
        let wPos = null
        // if (1 == localChairId) {
        //     wPos = this.selfHead.parent.convertToWorldSpaceAR(this.selfHead.position)
        // } else {
        let temp = cc.find("HeadArea/HeadArea" + localChairId, this.cardLayer)
        wPos = temp.parent.convertToWorldSpaceAR(temp.position)
        // }
        let nPos = this.node.convertToNodeSpaceAR(wPos)

        let prefix = noti.msg.substring(0, 4)
        let content = noti.msg.substring(4)
        izx.log("chatNoti prefix = ", prefix)
        izx.log("chatNoti content = ", content)
        if (prefix == CHAT_TAG.FREE || prefix == CHAT_TAG.VIP) {
            izx.log("chatNoti biaoqing load ")
            scmjUtil.loadAsset("images/emoji/ani_" + content, cc.Texture2D, (res) => {
                if (cc.isValid(this.node) && res) {
                    izx.log("chatNoti biaoqing load success")
                    // let res = this["ani_" + content]
                    let index = parseInt(content + "")
                    let sRect = cc.rect(0, 0, res.width, res.height)
                    let size = cc.size(res.width / this.anitable[index].col, res.height / this.anitable[index].row)
                    let offset = cc.v2(0, 0)
                    let frames = []
                    let count = 0
                    for (let m = 0; m < this.anitable[index].row; m++) {
                        for (let n = 0; n < this.anitable[index].col; n++) {
                            let orgPoint = sRect.origin
                            let rect = cc.rect(orgPoint.x + n * size.width, orgPoint.y + m * size.height, size.width, size.height)
                            frames[count] = new cc.SpriteFrame(res, rect, false, offset, size)
                            count++
                            if (count == this.anitable[index].count) {
                                break
                            }
                        }
                    }
                    let chatAni = new cc.Node()
                    let sprite = chatAni.addComponent(cc.Sprite)
                    sprite.spriteFrame = frames[0]
                    chatAni.parent = this.node

                    let animation = chatAni.addComponent(cc.Animation);
                    let clip = cc.AnimationClip.createWithSpriteFrames(frames, frames.length);
                    clip.name = 'chat_ani';
                    clip.wrapMode = cc.WrapMode.Loop;
                    clip.speed = this.anitable[index].speed || 1
                    animation.addClip(clip)
                    cc.tween(chatAni).delay(2.0).call(() => {
                        animation.stop()
                        chatAni.destroy()
                    }).start()
                    animation.play("chat_ani")
                    if (localChairId == 2) {
                        nPos.x -= 100
                    } else {
                        nPos.x += 100
                    }
                    chatAni.position = nPos
                }
            })
        } else if (prefix == CHAT_TAG.TEXT || prefix == CHAT_TAG.INPUT) {
            izx.log("chatNoti wenzi load ")
            scmjUtil.loadAsset("prefabs/ChatItem", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let ndChatItem = cc.instantiate(res)
                ndChatItem.parent = this.node
                ndChatItem.getChildByName("lbl_text").getComponent(cc.Label).string = content
                if (content.length > 17) {
                    ndChatItem.height += 18
                }
                if (localChairId == 2 || localChairId == 3) {
                    nPos.x -= 360
                    ndChatItem.getChildByName("arrow").x = 298.5
                    ndChatItem.getChildByName("arrow").scaleX = -1
                } else {
                    nPos.x += 60
                }
                ndChatItem.position = nPos
                ndChatItem.runAction(cc.sequence(
                    cc.delayTime(3),
                    cc.removeSelf(true),
                    cc.destroySelf()
                ))
            })
        } else if (prefix == CHAT_TAG.GIFT) {
            let targetChairId = this.s2c(noti.targetChairId)
            izx.log("chatNoti gift load ", targetChairId)
            let twPos = this.mapPlayers[targetChairId].node.parent.convertToWorldSpaceAR(this.mapPlayers[targetChairId].node.position)
            let tnPos = this.node.convertToNodeSpaceAR(twPos)

            let index = parseInt(content + "")
            let path = ""
            let pic = ""
            if (0 == index) {
                path = "prefabs/AniFlower"
                pic = "flower"
            } else if (1 == index) {
                path = "prefabs/AniEgg"
                pic = "egg"
            }

            if (path.length > 0) {
                scmjUtil.loadAsset(path, cc.Prefab, (resPrefab) => {
                    if (!cc.isValid(this.node) || !resPrefab) {
                        return
                    }

                    let showGift = () => {
                        let ndGift = cc.instantiate(resPrefab)
                        ndGift.parent = this.node
                        ndGift.position = tnPos
                        if (0 == index) {
                            ndGift.getComponent(sp.Skeleton).setCompleteListener(() => {
                                ndGift.destroy()
                            })
                        } else if (1 == index) {
                            ndGift.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, (event) => {
                                ndGift.destroy()
                            }, this)
                        }
                    }

                    scmjUtil.loadAsset("images/player/" + pic, cc.SpriteFrame, (res) => {
                        if (!cc.isValid(this.node) || !res) {
                            return
                        }

                        let gift = new cc.Node()
                        gift.parent = this.node
                        gift.addComponent(cc.Sprite).spriteFrame = res
                        gift.position = nPos

                        var bezier = [cc.v2(nPos.x, nPos.y), cc.v2(nPos.x, tnPos.y), tnPos]
                        gift.runAction(cc.sequence(cc.bezierTo(0.25, bezier), cc.callFunc(() => {
                            if (gift && gift.isValid) {
                                gift.destroy()
                            }
                            showGift()
                        })))
                    })
                })
            }
        }
    }

    exchangeConfirmNoti(msg) {
        let localChairId = this.s2c(msg.chairId)
        let exchangeCardLayer = cc.find("CenterArea/ExchangeLayer/ExchangeCardLayer" + (localChairId - 1), this.node)
        if (exchangeCardLayer == null) {
            if (HzxlLogic.getInstance().protoData["exchangeCompleteNoti"]) {
                return
            }
            let cardLayer = cc.find("CenterArea/ExchangeLayer", this.node)
            scmjUtil.loadAsset("prefabs/ExchangeCardLayer" + (localChairId - 1), cc.Prefab, (res) => {
                if (!cc.isValid(cardLayer) || !res) {
                    return
                }
                if (HzxlLogic.getInstance().protoData["exchangeCompleteNoti"]) {
                    return
                }
                let exchangeCardLayer = cc.instantiate(res)
                exchangeCardLayer.parent = cardLayer
            }, "hzxl_subpackage")
        } else {
            exchangeCardLayer.active = true
        }
    }

    exchangeCompleteNoti(msg) {
        // 0:对家互换 1:顺时针互换 2:逆时针互换
        let mainExchangeTip = cc.find("CenterArea/MainExchangeTip", this.node)
        if (!mainExchangeTip) {
            scmjUtil.loadAsset("prefabs/MainExchangeTip", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                mainExchangeTip = cc.instantiate(res)
                mainExchangeTip.parent = cc.find("CenterArea", this.node)

                scmjUtil.loadAsset("images/tips/exchange_" + msg.way, cc.SpriteFrame, (res2) => {
                    if (cc.isValid(mainExchangeTip) && res2) {
                        let tip = cc.find("Tip", mainExchangeTip)
                        if (tip && tip.isValid) {
                            tip.getComponent(cc.Sprite).spriteFrame = res2
                        }
                    }
                })
            }, "hzxl_subpackage")
        } else {
            scmjUtil.loadAsset("images/tips/exchange_" + msg.way, cc.SpriteFrame, (res) => {
                if (cc.isValid(mainExchangeTip) && res) {
                    let tip = cc.find("Tip", mainExchangeTip)
                    if (tip && tip.isValid) {
                        tip.getComponent(cc.Sprite).spriteFrame = res
                    }
                    mainExchangeTip.active = true
                }
            })
        }
        // let toPos = []
        let posArr = [cc.v2(0, -120), cc.v2(170, 20), cc.v2(0, 150), cc.v2(-200, 25)]
        for (let i = 0; i < 4; i++) {
            let exchangeCardLayer = cc.find("CenterArea/ExchangeLayer/ExchangeCardLayer" + i, this.node)
            if (exchangeCardLayer == null) {
                let cardLayer = cc.find("CenterArea/ExchangeLayer", this.node)
                scmjUtil.loadAsset("prefabs/ExchangeCardLayer" + i, cc.Prefab, (res) => {
                    if (cc.isValid(cardLayer) && res) {
                        let exchangeCardLayer = cc.instantiate(res)
                        exchangeCardLayer.parent = cardLayer
                        if (0 == msg.way) {
                            exchangeCardLayer.runAction(cc.sequence(cc.moveTo(0.3, 0, 0), cc.moveTo(0.3, posArr[i])))
                            if (1 == i || 3 == i) {
                                exchangeCardLayer.zIndex = 2
                            }
                        }
                    }
                }, "hzxl_subpackage")
            } else {
                exchangeCardLayer.active = true
                if (0 == msg.way) {
                    exchangeCardLayer.runAction(cc.sequence(cc.moveTo(0.3, 0, 0), cc.moveTo(0.3, posArr[i])))
                    if (1 == i || 3 == i) {
                        exchangeCardLayer.zIndex = 2
                    }
                }
            }
            // toPos[i] = nodePlayer.position
            // nodePlayer.srcPos = nodePlayer.position
        }

        let destroyExchange = () => {
            if (!cc.isValid(this.node)) {
                return
            }
            for (let i = 0; i < 4; i++) {
                let exchangeCardLayer = cc.find("CenterArea/ExchangeLayer/ExchangeCardLayer" + i, this.node)
                if (cc.isValid(exchangeCardLayer)) {
                    exchangeCardLayer.destroy()
                }
            }
        }
        // let actionTime = 1.0
        // let prefab = null
        let prefabName = ""
        if (0 == msg.way) {
            prefabName = "prefabs/AniDuiJia2"
            // for (let i = 0; i < 4; i++) {
            //     let nodePlayer = <any>cc.find("CenterArea/ExchangeLayer/ExchangeCardLayer" + i, this.node)

            //     nodePlayer.runAction(cc.sequence(cc.moveTo(actionTime, (i <= 1 ? toPos[i + 2] : toPos[i - 2])), cc.callFunc(() => {
            //         nodePlayer.active = false
            //         nodePlayer.position = nodePlayer.srcPos
            //         nodePlayer.angle = 0
            //     })))
            // }
        } else if (1 == msg.way) {
            prefabName = "prefabs/AniShunShiZhen2"
            // for (let i = 0; i < 4; i++) {
            //     let nodePlayer = <any>cc.find("CenterArea/ExchangeLayer/ExchangeCardLayer" + i, this.node)
            //     let bezier = [toPos[i], (0 == i ? cc.v2(toPos[3].x, toPos[i].y) : (1 == i % 2 ? cc.v2(toPos[i].x, toPos[i - 1].y) : cc.v2(toPos[i - 1].x, toPos[i].y))), (0 == i ? toPos[3] : toPos[i - 1])]
            //     let bezierTo = cc.bezierTo(actionTime, bezier)
            //     nodePlayer.runAction(cc.sequence(cc.spawn(bezierTo, cc.rotateTo(actionTime, -90)), cc.callFunc(() => {
            //         nodePlayer.active = false
            //         nodePlayer.position = nodePlayer.srcPos
            //         nodePlayer.angle = 0
            //     })))
            // }

            let sptArr = [2, 1, 0]
            for (let i = 0; i < 3; i++) {
                scmjUtil.loadAsset("images/ui/majiang_huanpai_" + sptArr[i], cc.SpriteFrame, (res) => {
                    if (i == 0) {
                        destroyExchange()
                    }

                    if (cc.isValid(this.node) && res) {
                        let exchangeAni = new cc.Node()
                        exchangeAni.zIndex = 2
                        let sprite = exchangeAni.addComponent(cc.Sprite)
                        sprite.spriteFrame = res
                        exchangeAni.parent = this.node
                        exchangeAni.opacity = 0
                        exchangeAni.y = 60
                        exchangeAni.runAction(cc.sequence(cc.delayTime(i * 0.3), cc.callFunc(() => { exchangeAni.opacity = 255 }), cc.delayTime(0.3), cc.removeSelf(true), cc.destroySelf()))
                    }
                })
            }
        } else if (2 == msg.way) {
            prefabName = "prefabs/AniNiShiZhen2"
            // for (let i = 0; i < 4; i++) {
            //     let nodePlayer = <any>cc.find("CenterArea/ExchangeLayer/ExchangeCardLayer" + i, this.node)
            //     let bezier = [toPos[i], (3 == i ? cc.v2(toPos[i].x, toPos[0].y) : (1 == i % 2 ? cc.v2(toPos[i].x, toPos[i + 1].y) : cc.v2(toPos[i + 1].x, toPos[i].y))), (3 == i ? toPos[0] : toPos[i + 1])]
            //     let bezierTo = cc.bezierTo(actionTime, bezier)
            //     nodePlayer.runAction(cc.sequence(cc.spawn(bezierTo, cc.rotateTo(actionTime, 90)), cc.callFunc(() => {
            //         nodePlayer.active = false
            //         nodePlayer.position = nodePlayer.srcPos
            //         nodePlayer.angle = 0
            //     })))
            // }

            for (let i = 0; i < 3; i++) {
                scmjUtil.loadAsset("images/ui/majiang_huanpai_" + i, cc.SpriteFrame, (res) => {
                    if (i == 0) {
                        destroyExchange()
                    }

                    if (cc.isValid(this.node) && res) {
                        let exchangeAni = new cc.Node()
                        exchangeAni.zIndex = 2
                        let sprite = exchangeAni.addComponent(cc.Sprite)
                        sprite.spriteFrame = res
                        exchangeAni.parent = this.node
                        exchangeAni.opacity = 0
                        exchangeAni.y = 60
                        exchangeAni.runAction(cc.sequence(cc.delayTime(i * 0.3), cc.callFunc(() => { exchangeAni.opacity = 255 }), cc.delayTime(0.3), cc.removeSelf(true), cc.destroySelf()))
                    }
                })
            }
        }
        if (prefabName.length > 0) {
            scmjUtil.loadAsset("prefabs/AniExchangeLight", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let node = cc.instantiate(res)
                node.zIndex = 3
                node.parent = this.node
                node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.LOOP_COMPLETE, (event) => {
                    node.destroy()
                }, this)
            })

            scmjUtil.loadAsset(prefabName, cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let node = cc.instantiate(res)
                let aniPlayNode = cc.find("CenterArea/ExchangeLayer", this.node)
                node.parent = aniPlayNode
                node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.LOOP_COMPLETE, (event) => {
                    if (aniPlayNode && aniPlayNode.isValid) {
                        aniPlayNode.removeAllChildren()
                    }

                    if (mainExchangeTip && mainExchangeTip.isValid) {
                        mainExchangeTip.active = false
                        scmjUtil.loadAsset("images/tips/changing_cards", cc.SpriteFrame, (res) => {
                            if (cc.isValid(mainExchangeTip) && res) {
                                let tip = cc.find("Tip", mainExchangeTip)
                                if (tip && tip.isValid) {
                                    tip.getComponent(cc.Sprite).spriteFrame = res
                                }
                            }
                        }, "hzxl_subpackage")
                    }
                }, this)
            })
        }
    }

    hideExchangeCards() {
        let ExchangeLayer = cc.find("CenterArea/ExchangeLayer", this.node)
        if (ExchangeLayer && ExchangeLayer.isValid) {
            ExchangeLayer.removeAllChildren()
        }

        let mainExchangeTip = cc.find("CenterArea/MainExchangeTip", this.node)
        if (mainExchangeTip && mainExchangeTip.isValid) {
            mainExchangeTip.active = false
            scmjUtil.loadAsset("images/tips/changing_cards", cc.SpriteFrame, (res) => {
                if (cc.isValid(mainExchangeTip) && res) {
                    let tip = cc.find("Tip", mainExchangeTip)
                    if (tip && tip.isValid) {
                        tip.getComponent(cc.Sprite).spriteFrame = res
                    }
                }
            }, "hzxl_subpackage")
        }
    }

    showTingTip(msg) {
        this.tingCards = []
        // izx.log("showTingTip msg = ", msg)
        if (!msg.tingCards) {
            if (this.tingTip) {
                this.tingTip.active = false
            }
            return
        }

        if (msg.tingCards.length == 0) {
            if (this.tingTip) {
                this.tingTip.active = false
            }
            return
        }
        if (this.mapLoadUi.bTingTip) {
            return
        }
        if (this.tingTip == null) {
            this.mapLoadUi.bTingTip = true
            scmjUtil.loadAsset("prefabs/TingTip", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)

                this.tingTip = cc.instantiate(res)
                this.tingTip.parent = this.node
                let tingTipS = <TingTip>this.tingTip.getComponent("hzxl-TingTip")
                tingTipS.init(msg.tingCards)
                this.mapLoadUi.bTingTip = false

                izx.dispatchEvent(SCMJ_EVENT.REFRESH_AI)
            })
        } else {
            izx.dispatchEvent(SCMJ_EVENT.HIDE_UI)

            this.tingTip.active = true
            let tingTipS = <TingTip>this.tingTip.getComponent("hzxl-TingTip")
            tingTipS.init(msg.tingCards)

            izx.dispatchEvent(SCMJ_EVENT.REFRESH_AI)
        }

        for (let v of msg.tingCards) {
            this.tingCards.push(v.card)
        }
    }

    capMultipleNoti(noti) {
        noti.chairId = this.s2c(noti.chairId)
        izx.dispatchEvent(SCMJ_EVENT.SHOW_CAP_MULTIPLE, noti)
    }

    capMultipleReq(msg) {
        if (User.PlayGame >= 3) {
            scmjUtil.loadAsset("prefabs/DoubleCapped", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let capMultiple = cc.instantiate(res)
                capMultiple.parent = this.node
                capMultiple.zIndex = 1
                capMultiple.y = -120
            })
        }
    }

    showCapMultiple(msg) {
        let aniPlayNode = cc.find("CenterArea/MainAniPlayArea/Area" + msg.chairId, this.node)
        if (!aniPlayNode) {
            return
        }
        let wPos = aniPlayNode.parent.convertToWorldSpaceAR(aniPlayNode.position)
        let nPos = null
        if (1 == msg.chairId) {
            this.showGameInfo(msg.capMultiple)
        }
        //     nPos = this.selfHead.convertToNodeSpaceAR(wPos)
        // } else {
        let temp = cc.find("HeadArea/HeadArea" + msg.chairId, this.cardLayer)
        nPos = temp.convertToNodeSpaceAR(wPos)
        // }

        nPos.y -= 20
        msg.pos = nPos
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_CAP_MULTIPLE, msg)
    }

    showAutoHu(msg) {
        // izx.log("showAutoHu msg = ", msg)
        let mjLayerS = <CardLayer>this.cardLayer.getComponent("hzxl-CardLayer")
        let isHu = mjLayerS.isHu(1)
        if (isHu) {
            if (this.state == GameState.Game) {
                if (this.btnTingTip) {
                    this.btnTingTip.active = true
                }
                if (this.btnAi) {
                    this.btnAi.active = false
                }
            }
            return
        }
        if (msg == null) {
            return
        }
        if (msg.isShow) {
            if (this.btnTingTip) {
                this.btnTingTip.active = false
            }
            if (this.btnAi) {
                this.btnAi.active = true
            }
            if (msg.fromServer) {
                if (this.btnTingTip) {
                    this.btnTingTip.active = true
                }
                if (this.btnAi) {
                    this.btnAi.active = false
                }
            }
        } else {
            if (this.btnTingTip) {
                this.btnTingTip.active = false
            }
            if (this.btnAi) {
                this.btnAi.active = true
            }
        }
    }

    showMatching(msg) {
        msg = msg || {}
        msg.bShow = msg.bShow || false
        izx.log("showMatching msg = ", msg)
        if (Scmj.getInstance()._scmj.reconnect) {
            izx.log("showMatching reconnect true")
            if (msg && !msg.bShow) {
                if (this.ndMatching && this.ndMatching.isValid) {
                    this.ndMatching.active = false
                }
            }
            return
        }

        izx.dispatchEvent(SCMJ_EVENT.SHOW_HEAD, { bShow: !msg.bShow })
        this.unschedule(this.matchingTimer)
        this.unschedule(this.readyAndMatching)
        if (msg && msg.bShow) {
            scmjUtil.preLoadAsset("prefabs/MatchHead", cc.Prefab)
            scmjUtil.preLoadAsset("prefabs/AniRoundStart", cc.Prefab)

            // if (msg.bShow) {
            // this.updateMatchHead(1, User.Data.openId)
            // 预下载头像资源
            UserSrv.GetPlyDetail(User.Data.openId, (ply: IPlayerData) => {
            })

            this.matchingCount = 10
            this.matchTimeout = 0
            this.matchTimeoutSend = true
            // let timer = cc.find("Ring/Countdown", this.ndMatching).getComponent(cc.Label)
            let showMatchTip = () => {
                if (this.ndMatching && this.ndMatching.isValid) {
                    this.ndMatching.active = true
                    let tip = cc.find("Tip", this.ndMatching)
                    if (tip && tip.isValid) {
                        tip.getComponent(cc.Label).string = "正在匹配中(" + this.matchingCount.toString() + ")"
                    }
                }
                this.schedule(this.matchingTimer, 1)
            }
            // }
            if (!this.ndMatching) {
                if (this.mapLoadUi.bMatching) {
                    return
                }
                this.mapLoadUi.bMatching = true
                scmjUtil.loadAsset("prefabs/MainMatching", cc.Prefab, (res) => {
                    if (!cc.isValid(this.node) || !res) {
                        return
                    }
                    if (HzxlLogic.getInstance().protoData["roundStartNot"]) {
                        HzxlLogic.getInstance().protoData["roundStartNot"] = null
                        return
                    }

                    this.ndMatching = cc.instantiate(res)
                    this.ndMatching.parent = this.node
                    if (this.mapLoadUi) {
                        this.mapLoadUi.bMatching = false
                    }
                    showMatchTip()
                }, "hzxl_subpackage")
            } else {
                // if (this.ndMatching && this.ndMatching.isValid) {
                //     this.ndMatching.active = true
                // }
                showMatchTip()
            }
        } else {
            if (this.ndMatching && this.ndMatching.isValid) {
                this.ndMatching.active = false
            }
        }
    }

    readyAndMatching() {
        if (HzxlLogic.getInstance().bPivateRoom) {
            if (HzxlLogic.getInstance().videoData) {
                let param = {
                    node: this.node,
                    videoData: HzxlLogic.getInstance().videoData,
                    onClose: () => {
                        console.log("onClose")
                        PlatformApi.GotoLobby()
                    },
                    onReplay: () => {
                        console.log("onReplay")
                        izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })
                        izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.NormalReadyReq)
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                        izx.dispatchEvent(SCMJ_EVENT.READY_REQ, true)
                    },
                    onChangeRounds: (round) => {
                        console.log("onChangeRounds", round)
                        izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, { bBtnReady: true })
                        izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.NormalReadyReq)
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, false)
                        izx.dispatchEvent(SCMJ_EVENT.READY_REQ, true)
                        HzxlLogic.getInstance().protoData["privateRoomResultNoti"] = null
                    },
                }
                iGaoShouApi.showPlayVideoController(param)
            }
        } else {
            izx.dispatchEvent(SCMJ_EVENT.SHOW_MATCHING, { bShow: true })
            scmjUtil.addGameRoundMatch()
        }
    }

    matchingTimer() {
        // let timer = cc.find("Ring/Countdown", this.ndMatching).getComponent(cc.Label)
        if (this.matchingCount == 1) {
            this.matchingCount = 10
            // this.unschedule(this.matchingTimer)
            // izx.dispatchEvent(EventName.ROOM_EXIT_REQ, { needReq: false, isReJoin: true })
            // this.scheduleOnce(this.readyAndMatching, 1.0)
        } else {
            this.matchingCount--
        }
        if (this.ndMatching && this.ndMatching.isValid) {
            let tip = cc.find("Tip", this.ndMatching)
            if (tip && tip.isValid) {
                tip.getComponent(cc.Label).string = "正在匹配中(" + this.matchingCount.toString() + ")"
            }
        }

        this.matchTimeout++
        if (false && this.matchTimeout >= 10 && this.matchTimeoutSend) {
            this.matchTimeout = 0

            if (this.state == GameState.NormalReadyReq) {
                console.log("matching timeout go change", this.state)
                if (this.enableNext) {
                    izx.dispatchEvent(SCMJ_EVENT.ROOM_EXIT_REQ)
                } else {
                    this.matchTimeoutSend = false
                    hzxlMatchMode.JoinRealTimeMatch()
                }
            }
        } else {
            /*if (this.aniMatchIndex < 4) {
                let mcHeadBg = this.ndMatching.getChildByName("HeadBg" + this.aniMatchIndex)
                if (mcHeadBg.childrenCount == 0) {
                    scmjUtil.loadAsset("prefabs/AniMatch" + this.aniMatchIndex, cc.Prefab, (res) => {
                        let aniMatch = cc.instantiate(res)
                        aniMatch.parent = mcHeadBg
                        let skeleton = <sp.Skeleton>aniMatch.getComponent(sp.Skeleton);
                        skeleton.setCompleteListener(() => {
                            skeleton.clearTracks()
                            skeleton.setAnimation(0, "xuenhuadonghua2", true)
                        })
                    })
                    this.aniMatchIndex++
                }
            }*/
        }
    }

    showRoundStart() {
        izx.log("showRoundStart")
        if (this.ndMatching) {
            this.ndMatching.active = false
            this.unschedule(this.matchingTimer)
        }
        this.matchTimeout = 0
        this.matchTimeoutSend = true
        // for (let i = 1; i <= 4; i++) {
        //     this.ndMatching.getChildByName("HeadBg" + i).removeAllChildren()
        // }

        scmjUtil.loadAsset("prefabs/MatchHead", cc.Prefab, (resPrefab) => {
            if (!cc.isValid(this.node) || !resPrefab) {
                return
            }
            scmjUtil.loadAsset("prefabs/AniRoundStart", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }

                let node = cc.instantiate(res)
                node.parent = this.node
                let skeleton = <sp.Skeleton>node.getComponent(sp.Skeleton);
                skeleton.setCompleteListener(() => {
                    if (cc.isValid(node)) {
                        node.destroy()
                    }
                })

                let pathArr = [
                    "ATTACHED_NODE_TREE/ATTACHED_NODE:root/ATTACHED_NODE:bone2",
                    "ATTACHED_NODE_TREE/ATTACHED_NODE:root/ATTACHED_NODE:bone",
                    "ATTACHED_NODE_TREE/ATTACHED_NODE:root/ATTACHED_NODE:bone4",
                    "ATTACHED_NODE_TREE/ATTACHED_NODE:root/ATTACHED_NODE:bone3"]
                // let posStart = [cc.v2(0, -425), cc.v2(850, -40), cc.v2(0, 425), cc.v2(-850, -40)]
                // let posStay = [cc.v2(0, -230), cc.v2(350, 0), cc.v2(0, 230), cc.v2(-350, 0)]

                for (let i = 1; i <= 4; i++) {
                    // if (HzxlLogic.getInstance().maxPlyNum == 3 &&  i == 3) {
                    //     continue
                    // } 
                    // if (HzxlLogic.getInstance().maxPlyNum == 2 &&  (i == 2 || i == 4)) {
                    //     continue
                    // } 
                    let matchHead = cc.instantiate(resPrefab)
                    matchHead.scale = 0.75
                    matchHead.parent = cc.find(pathArr[i - 1], node)
                    // matchHead.setPosition(posStart[i - 1])

                    if (this.mapChairUserData) {
                        for (let key in this.mapChairUserData) {
                            let data = this.mapChairUserData[key]
                            if (i == this.s2c(data.chairId)) {
                                UserSrv.GetPlyDetail(data.data.uid, (ply: IPlayerData) => {
                                    if (matchHead && matchHead.isValid) {
                                        let ndHead = cc.find("HeadMask/Head", matchHead)
                                        if (ndHead && ndHead.isValid) {
                                            scmjUtil.setupAvatarImage(ndHead, ply.avatar)
                                        }
                                        let nickname = cc.find("Nickname", matchHead)
                                        nickname.getComponent(cc.Label).string = ply.userName
                                        let lvNum = cc.find("lv/num", matchHead)
                                        lvNum.parent.active = UserSrv.getQpVipLevel(ply) > 0
                                        lvNum.getComponent(cc.Label).string = "V" + UserSrv.getQpVipLevel(ply)
                                        IGaoShouAPI.setHeadVipTxk(cc.find("HeadFrame", matchHead), UserSrv.getQpVipLevel(ply))
                                    }
                                })
                                break
                            }
                        }
                    }

                    let wPos = null
                    // if (1 == i) {
                    //     wPos = this.selfHead.parent.convertToWorldSpaceAR(this.selfHead.position)
                    // } else {
                    let temp = cc.find("HeadArea/HeadArea" + i, this.cardLayer)
                    if (temp && temp.isValid) {
                        wPos = temp.parent.convertToWorldSpaceAR(temp.position)
                        // }
                        let nPos = this.node.convertToNodeSpaceAR(wPos)
                        // matchHead.runAction(cc.sequence(cc.moveTo(0.3, posStay[i - 1]), cc.delayTime(0.15), cc.spawn(cc.moveTo(0.3, nPos), cc.scaleTo(0.3, 0.6)), cc.removeSelf(true), cc.destroySelf()))
                    }
                    // }
                }
            })
        })
    }

    onRoomExitReq(msg) {
        if (msg && msg.needReq && msg.isReJoin != true) {
            this.unscheduleAllCallbacks()
        }
    }

    addPlayer(data) {
        let localChairId = this.s2c(data.chairId)
        if (data.chairId == this.chairId) {
            // this.mapPlayers[localChairId] = this.selfHead.getComponent("hzxl-Head")
            // this.mapPlayers[localChairId].init({
            //     chairId: localChairId,
            //     uid: data.data.uid,
            //     ready: data.ready,
            //     score: data.data.score
            // })

            // scmjUtil.loadAsset("prefabs/HeadSelf", cc.Prefab, (res) => {
            //     this.selfHead = cc.instantiate(res)
            this.selfHead = cc.instantiate(this.prefabHeadSelf)
            this.mapPlayers[localChairId] = this.selfHead.getComponent("hzxl-Head")
            scmjUtil.addIntoPath("HeadArea" + localChairId, this.mapNodePaths, this.node, this.selfHead)
            this.mapPlayers[localChairId].init({
                chairId: localChairId,
                uid: data.data.uid,
                ready: data.ready,
                score: data.data.score
            })
            // })
        } else {
            // scmjUtil.loadAsset("prefabs/HeadOther", cc.Prefab, (res) => {
            //     let userHead = cc.instantiate(res)
            let userHead = cc.instantiate(this.prefabHeadOther)
            this.mapPlayers[localChairId] = userHead.getComponent("hzxl-Head")
            scmjUtil.addIntoPath("HeadArea" + localChairId, this.mapNodePaths, this.node, userHead)
            this.mapPlayers[localChairId].init({
                chairId: localChairId,
                uid: data.data.uid,
                ready: data.ready,
                score: data.data.score
            })
            // })
        }
    }

    changeMenuStatus(bOpen) {
        if (this.btnSet && this.btnSet.isValid) {
            if (!HzxlLogic.getInstance().bPivateRoom) {
                this.btnFoKa.active = !bOpen
            }
            cc.find("Menu", this.btnSet).active = bOpen
            let picPath = bOpen ? "images/ui/close" : "images/ui/setting"
            scmjUtil.loadAsset(picPath, cc.SpriteFrame, (res) => {
                if (res && this.btnSet && this.btnSet.isValid) {
                    this.btnSet.getComponent(cc.Sprite).spriteFrame = res
                }
            })
        }
    }

    hideUi() {
        this.changeMenuStatus(false)
    }

    // 私人房相关
    rountCountNoti(msg) {
        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }

        if (msg.ju == 0) {
            UIMgr.OpenUI("component/Firends/FriendsSide", { single: true, param: { hideBg: true } })
        }

        let lblDesc = cc.find("PrivateRoomJinDu/lblDesc", this.node)
        if (lblDesc && lblDesc.isValid) {
            lblDesc.getComponent(cc.Label).string = msg.ju + "/" + HzxlLogic.getInstance().privateRoomInfo.base_room_time + "局"
        } else {
            if (this.mapLoadUi.bPrivateRoomJinDu) {
                return
            }
            this.mapLoadUi.bPrivateRoomJinDu = true
            scmjUtil.loadAsset("prefabs/PrivateRoomJinDu", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }
                let privateRoomJinDu = cc.instantiate(res)
                privateRoomJinDu.parent = this.node

                let lblDesc = cc.find("lblDesc", privateRoomJinDu)
                let protoData = <any>HzxlLogic.getInstance().protoData
                if (protoData && protoData.rountCountNoti) {
                    lblDesc.getComponent(cc.Label).string = protoData.rountCountNoti.ju + "/" + HzxlLogic.getInstance().privateRoomInfo.base_room_time + "局"
                } else {
                    lblDesc.getComponent(cc.Label).string = "0/" + HzxlLogic.getInstance().privateRoomInfo.base_room_time + "局"
                }

                izx.Button.bindButtonClick("btnJinDu", privateRoomJinDu, (sender, data) => {
                    console.log("btnJinDu")
                    iGaoShouApi.showRoomBillDetail()
                })
                this.mapLoadUi.bPrivateRoomJinDu = false
            })
        }
    }

    // 初始化私人房邀请、准备、开始按钮
    inviteAndReady(data?) {
        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }
        let privateRoomBtns = cc.find("PrivateRoomBtns", this.node)
        if (privateRoomBtns && privateRoomBtns.isValid) {
            if (this.state == GameState.Game) {
                privateRoomBtns.active = false
            } else {
                privateRoomBtns.active = true
            }
            if (data) {
                if (data.ready == 1) {
                    let sptReady = cc.find("PrivateRoomBtns/sptReady" + data.chairId, this.node)
                    if (sptReady && sptReady.isValid) {
                        sptReady.active = true
                    }
                } else if (data.ready == 2) {
                    let btnReady = cc.find("BtnReady", privateRoomBtns)
                    btnReady.active = true
                    let protoData = <any>HzxlLogic.getInstance().protoData
                    if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                        btnReady.x = 0
                        let btnInvite = cc.find("BtnInvite", privateRoomBtns)
                        btnInvite.active = false
                    }
                }
            }
        } else {
            if (this.mapLoadUi.bPrivateRoomBtns) {
                return
            }
            this.mapLoadUi.bPrivateRoomBtns = true
            scmjUtil.loadAsset("prefabs/PrivateRoomBtns", cc.Prefab, (res) => {
                if (!cc.isValid(this.node) || !res) {
                    return
                }
                let btns = cc.instantiate(res)
                btns.parent = this.node
                this.mapLoadUi.bPrivateRoomBtns = false
                izx.Button.bindButtonClick("BtnReady", btns, (sender, data) => {
                    izx.log("BtnReady")
                    izx.dispatchEvent(SCMJ_EVENT.READY_REQ, { isReady: true })
                })
                izx.Button.bindButtonClick("BtnStart", btns, (sender, data) => {
                    izx.log("BtnStart", this.mapChairUserData)
                    let countNum = 0
                    for (let key in this.mapChairUserData) {
                        ++countNum
                    }
                    izx.log("countNum = ", countNum)
                    if (countNum < HzxlLogic.getInstance().maxPlyNum) {
                        Helper.OpenTip("游戏人数不足")
                        return
                    }

                    iGaoShouApi.StartGameReq()
                })
                izx.Button.bindButtonClick("BtnInvite", btns, (sender, data) => {
                    izx.log("BtnInvite")
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

                izx.log("load btns", this.mapChairUserData)
                let protoData = <any>HzxlLogic.getInstance().protoData
                // 显示准备、开始
                if (this.mapChairUserData) {
                    let countPlayerNum = 0
                    for (let key in this.mapChairUserData) {
                        ++countPlayerNum
                        let data = this.mapChairUserData[key]
                        if (data.chairId == this.chairId) {
                            izx.log("self show")
                            let protoData = <any>HzxlLogic.getInstance().protoData
                            if (protoData.ownerNoti && protoData.ownerNoti.owner && data.data.uid == protoData.ownerNoti.owner) {
                                izx.log("self owner")
                                if (data.ready == 2) {
                                    izx.dispatchEvent(SCMJ_EVENT.READY_REQ, { isReady: true })
                                }
                                scmjUtil.loadAsset("images/private/btn_huang", cc.SpriteFrame, (res) => {
                                    if (!cc.isValid(btns) || !res) {
                                        return
                                    }
                                    let btnInvite = cc.find("BtnInvite", btns)
                                    if (btnInvite && btnInvite.isValid) {
                                        btnInvite.getComponent(cc.Sprite).spriteFrame = res
                                    }
                                })
                                scmjUtil.loadAsset("images/private/wx_1", cc.SpriteFrame, (res) => {
                                    if (!cc.isValid(btns) || !res) {
                                        return
                                    }
                                    let sptIcon = cc.find("BtnInvite/sptIcon", btns)
                                    if (sptIcon && sptIcon.isValid) {
                                        sptIcon.getComponent(cc.Sprite).spriteFrame = res
                                    }
                                })
                                let btnStart = cc.find("BtnStart", btns)
                                if (btnStart && btnStart.isValid) {
                                    btnStart.active = true
                                }
                                let lblDesc = cc.find("BtnInvite/lblDesc", btns)
                                lblDesc.color = scmjUtil.hex2color("#993e12")
                            } else if (countPlayerNum == 4) {
                                izx.log("self 4")
                                let btnInvite = cc.find("BtnInvite", btns)
                                btnInvite.active = false
                                let localChairId = this.s2c(data.chairId)
                                let sptReady = cc.find("sptReady" + localChairId, btns)
                                sptReady.x = 0
                                if (data.ready == 1) {
                                    sptReady.active = true
                                } else {
                                    if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                                        izx.dispatchEvent(SCMJ_EVENT.READY_REQ, { isReady: true })
                                        let localChairId = this.s2c(data.chairId)
                                        let sptReady = cc.find("sptReady" + localChairId, btns)
                                        sptReady.active = true
                                    } else {
                                        let btnReady = cc.find("BtnReady", btns)
                                        btnReady.active = true
                                        btnReady.x = 0
                                    }
                                }
                            } else if (data.ready == 2) {
                                izx.log("self ready 2")
                                if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                                    izx.dispatchEvent(SCMJ_EVENT.READY_REQ, { isReady: true })
                                    let localChairId = this.s2c(data.chairId)
                                    let sptReady = cc.find("sptReady" + localChairId, btns)
                                    sptReady.active = true
                                } else {
                                    let btnReady = cc.find("BtnReady", btns)
                                    btnReady.active = true
                                }
                            } else if (data.ready == 1) {
                                izx.log("self ready 1")
                                let localChairId = this.s2c(data.chairId)
                                let sptReady = cc.find("sptReady" + localChairId, btns)
                                sptReady.active = true
                            }
                        } else {
                            izx.log("other show")
                            if (data.ready == 1) {
                                let localChairId = this.s2c(data.chairId)
                                let sptReady = cc.find("sptReady" + localChairId, btns)
                                sptReady.active = true
                            }
                        }
                    }
                }

                if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                    izx.log("rountCount > 0")
                    let btnInvite = cc.find("BtnInvite", btns)
                    btnInvite.active = false
                    let btnStart = cc.find("BtnStart", btns)
                    btnStart.active = false
                    let sptReady = cc.find("sptReady1", btns)
                    sptReady.x = 0
                    let btnReady = cc.find("BtnReady", btns)
                    btnReady.x = 0
                    btnReady.active = false
                }

                if (this.state == GameState.Game) {
                    izx.log("state game ")
                    btns.active = false
                    let btnInvite = cc.find("BtnInvite", btns)
                    btnInvite.active = false
                    let btnStart = cc.find("BtnStart", btns)
                    btnStart.active = false
                    let sptReady = cc.find("sptReady1", btns)
                    sptReady.x = 0
                    let btnReady = cc.find("BtnReady", btns)
                    btnReady.x = 0
                    btnReady.active = false
                } else {
                    btns.active = true
                }
            })
        }
    }

    pauseGameNoti(msg) {
        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_PRIVATE_TIP, msg, this.chairId)
    }

    privateRoomResultRsp(rsp) {
        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }
    }

    privateRoomResultNoti(noti) {
        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }
        let protoData = <any>HzxlLogic.getInstance().protoData
        if (protoData.dismissNot) {
            if (protoData.rountCountNoti) {
                if (0 == protoData.rountCountNoti.ju) {
                    let time = Number(HzxlLogic.getInstance().privateRoomInfo.max_idle_time_ts) || 60 * 10
                    if (protoData.dismissNot.code == 1) { // 房主解散房间
                        if (protoData.ownerNoti && protoData.ownerNoti.owner && User.OpenID == protoData.ownerNoti.owner) {
                            setTimeout(() => {
                                Helper.OpenTip("房主解散房间")
                            }, 1500)
                            setTimeout(() => {
                                Helper.OpenTip("房间已解散，请重新匹配")
                            }, 2500)
                        } else {
                            setTimeout(() => {
                                Helper.OpenTip("房主已解散房间")
                            }, 1500)
                        }
                    } else if (protoData.dismissNot.code == 2) { // 玩家申请解散
                        if (this.state == GameState.Game) {
                            Helper.OpenTip(Math.floor(time / 60) + "分钟内无操作，房间已自动解散")
                        } else {
                            setTimeout(() => {
                                Helper.OpenTip(Math.floor(time / 60) + "分钟内未开始，房间已自动解散")
                            }, 1500)
                        }
                    } else if (protoData.dismissNot.code == 3) { // 超时解散房间
                        if (this.state == GameState.Game) {
                            Helper.OpenTip(Math.floor(time / 60) + "分钟内无操作，房间已自动解散")
                        } else {
                            setTimeout(() => {
                                Helper.OpenTip(Math.floor(time / 60) + "分钟内未开始，房间已自动解散")
                            }, 1500)
                        }
                    }
                    HzxlLogic.getInstance().leaveRoomGotoLobby = true
                    this.enableNext = false
                    this.onDestroy()
                    scmjUtil.addGameRoundBackLobby()
                    izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)
                    PlatformApi.GotoLobby()
                } else { // 游戏已经开始
                    if (this.resultLayer && this.resultLayer.isValid) {
                        this.resultLayer.destroy()
                    }
                    if (protoData.dismissNot.code == 2) { // 玩家申请解散
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_PRIVATE_ROOM_RESULT)
                    } else if (protoData.dismissNot.code == 3) { // 超时解散房间
                        izx.dispatchEvent(SCMJ_EVENT.SHOW_PRIVATE_ROOM_RESULT)
                    }
                }
            }
        } else if (HzxlLogic.getInstance().videoData) {
            izx.dispatchEvent(SCMJ_EVENT.SHOW_PRIVATE_ROOM_RESULT)
        }
    }

    showPrivateRoomResult() {
        if (this.mapLoadUi.bPrivateRoomResult) {
            return
        }
        this.mapLoadUi.bPrivateRoomResult = true
        scmjUtil.loadAsset("prefabs/PrivateResult", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }

            let privateResultLayer = cc.instantiate(res)
            privateResultLayer.parent = this.node
            privateResultLayer.zIndex = 2
            this.mapLoadUi.bPrivateRoomResult = false
            izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA, (playersData) => {
                izx.dispatchEvent(SCMJ_EVENT.UPDATE_PRIVATE_ROOM_RESULT, playersData)
            })
        })
    }

    showFangZhu(noti) {
        if (HzxlLogic.getInstance().bPivateRoom) {
            if (noti.owner == User.OpenID && this.state == GameState.None) {
                scmjUtil.loadAsset("images/private/btn_huang", cc.SpriteFrame, (res) => {
                    if (!cc.isValid(this.node) || !res) {
                        return
                    }
                    let btnInvite = cc.find("PrivateRoomBtns/BtnInvite", this.node)
                    if (btnInvite && btnInvite.isValid) {
                        btnInvite.getComponent(cc.Sprite).spriteFrame = res
                    }
                })
                scmjUtil.loadAsset("images/private/wx_1", cc.SpriteFrame, (res) => {
                    if (!cc.isValid(this.node) || !res) {
                        return
                    }
                    let sptIcon = cc.find("PrivateRoomBtns/BtnInvite/sptIcon", this.node)
                    if (sptIcon && sptIcon.isValid) {
                        sptIcon.getComponent(cc.Sprite).spriteFrame = res
                    }
                })

                let protoData = <any>HzxlLogic.getInstance().protoData
                if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) { } else {
                    let btnStart = cc.find("PrivateRoomBtns/BtnStart", this.node)
                    if (btnStart && btnStart.isValid) {
                        btnStart.active = true
                    }
                }
                let lblDesc = cc.find("PrivateRoomBtns/BtnInvite/lblDesc", this.node)
                if (lblDesc && lblDesc.isValid) {
                    lblDesc.color = scmjUtil.hex2color("#993e12")
                }
            }
        }
    }

    s2c(index) {
        //let maxPlyNum = 4
        izx.log("s2c this.chairId = ", this.chairId, "index = ", index)
        //return (index - this.chairId + maxPlyNum) % maxPlyNum + 1

        let maxPlyNum = HzxlLogic.getInstance().maxPlyNum
        if (maxPlyNum == 4) {
            return (index - this.chairId + maxPlyNum) % maxPlyNum + 1
        } else if (maxPlyNum == 3) {
            let result = (index - this.chairId + maxPlyNum) % maxPlyNum + 1
            if (result == 3) {
                result = 4
            }
            return result
        } else if (maxPlyNum == 2) {
            let result = (index - this.chairId + maxPlyNum) % maxPlyNum + 1
            if (result == 2) {
                result = 3
            }
            return result
        }
    }

    c2s(index) {
        //let maxPlyNum = 4
        izx.log("c2s this.chairId = ", this.chairId)
        //return (this.chairId + index + maxPlyNum) % maxPlyNum - 1
        let maxPlyNum = HzxlLogic.getInstance().maxPlyNum
        if (maxPlyNum == 4) {
            return (this.chairId + index + maxPlyNum) % maxPlyNum - 1
        } else if (maxPlyNum == 3) {
            let result = (this.chairId + index + maxPlyNum) % maxPlyNum - 1
            if (result == 3) {
                result = 2
            }
            return result
        } else if (maxPlyNum == 2) {
            let result = (index - this.chairId + maxPlyNum) % maxPlyNum + 1
            if (result == 2) {
                result = 1
            }
            return result
        }
    }

    onBtnDismiss() {
        let msg = "是否确认发起解散?"
        let protoData = <any>HzxlLogic.getInstance().protoData
        if (protoData && ((protoData.rountCountNoti && protoData.rountCountNoti.ju == 0) || !protoData.rountCountNoti)) {
            msg = "确认要解散房间吗?"
        }
        let param = {
            param: {
                msg: msg,
                cancel: () => {
                },
                confirm: () => {
                    if (HzxlLogic.getInstance().roomInfo) {
                        iGaoShouApi.ApplyDismissReq()
                    }
                }
            }
        }
        UIMgr.OpenUI("component/Base/GamePop", param)
    }

    ApplyDismissNotHandle(msg) {
        msg = msg.packet
        console.log("ApplyDismissNotHandle", msg)
        UIMgr.CloseUI("component/Base/GamePop")
        if (this.mapLoadUi.bPrivateRoomDismiss) {
            return
        }
        this.mapLoadUi.bPrivateRoomDismiss = true
        scmjUtil.loadAsset("prefabs/TipDismiss", cc.Prefab, (res) => {
            if (!cc.isValid(this.node) || !res) {
                return
            }
            this.dissmiss = cc.instantiate(res)
            this.dissmiss.parent = this.node
            this.dissmiss.zIndex = 3
            this.mapLoadUi.bPrivateRoomDismiss = false
            this.dissmiss.getComponent("hzxl-TipDismiss").init(msg)
        })
    }

    LeaveRoomNotHandle(msg) {
        if (!HzxlLogic.getInstance().bPivateRoom) {
            return
        }

        msg = msg.packet
        console.log("LeaveRoomNotHandle", msg)
        if (msg.plyId == User.OpenID) {
            if (msg.reason == 1) {
                setTimeout(() => {
                    Helper.OpenTip("房主已将你踢出房间！")
                }, 1500)
                // 离开房间
                HzxlLogic.getInstance().leaveRoomGotoLobby = true
                this.enableNext = false
                this.onDestroy()
                scmjUtil.addGameRoundBackLobby()
                izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)
                PlatformApi.GotoLobby()
            }
        } else {
            // 界面移除
            if (this.mapPlayers) {
                for (let i = 2; i <= 4; i++) {
                    let player = this.mapPlayers[i]
                    if (player && player.node && player.node.isValid && player.uid == msg.plyId) {
                        let sptReady = cc.find("PrivateRoomBtns/sptReady" + player.chairId, this.node)
                        if (sptReady && sptReady.isValid) {
                            sptReady.active = false
                        }

                        player.node.destroy()
                        this.mapPlayers[i] = null

                        if (msg.reason == 1) {
                            UserSrv.GetPlyDetail(msg.plyId, (ply: IPlayerData) => {
                                Helper.OpenTip(ply.userName + "已被踢出房间！")
                            })
                        }

                        break
                    }
                }
            }

            if (this.mapChairUserData) {
                for (let key in this.mapChairUserData) {
                    let item = this.mapChairUserData[key]
                    let uid = item.data.uid
                    if (uid == msg.plyId) {
                        delete this.mapChairUserData[key]
                        break
                    }
                }
            }
        }
    }
}
