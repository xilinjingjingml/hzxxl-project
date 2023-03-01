// import BaseMode from "../../framework/base/baseMode"
import { SCMJ_EVENT } from "../hzxl-Events"
// import Servers from "../../servers/servers"

import { igs } from "../../igs";
import izx = igs.izx;
import { Constants } from "../../lobby/start/script/igsConstants"
import { EventName, GameState } from "../hzxl-Constants";
import { AudioMgr } from "../hzxl-AudioMgr";
import { scmj } from "../proto/pbScmj";
import { EventMgr } from "../../lobby/start/script/base/EventMgr";
import { User } from "../../lobby/start/script/data/User";
import { hzxlMatchMode } from "../hzxl-mctchMode";
import { IGaoShouAPI } from "../../lobby/start/script/iGaoShou";
import { PlatformApi } from "../../lobby/start/script/api/platformApi";
import HzxlLogic from "../hzxl-logic";
import { MatchSvr } from "../../lobby/start/script/system/MatchSvr";
import { UIMgr } from "../../lobby/start/script/base/UIMgr";
import { UserSrv } from "../../lobby/start/script/system/UserSrv";
import { Helper } from "../../lobby/start/script/system/Helper";

export default class ScmjMode {//extends BaseMode {
    mapChairUserData = {}
    serialId = 0
    reconnect = false
    joinReqTimer = null

    constructor() {
        // super()
    }

    load() {
        IGaoShouAPI.SetProto("Scmj", scmj)

        izx.on(SCMJ_EVENT.ENTER_SCMJ, this.afterEnterScmj, this)
        izx.on(SCMJ_EVENT.OPERATE_RSP, this.OperateRsp, this)
        izx.on(SCMJ_EVENT.LACK_RSP, this.LackRsp, this)
        izx.on(SCMJ_EVENT.EXCHANGE_RSP, this.ExchangeRsp, this)
        izx.on(SCMJ_EVENT.BILL_REQ, this.BillReq, this)
        izx.on(SCMJ_EVENT.COMPLETE_REQ, this.CompleteReq, this)
        izx.on(SCMJ_EVENT.AUTO_REQ, this.AutoReq, this)
        izx.on(EventName.ROOM_EXIT_GAME, this.onExitRoom, this)
        izx.on(SCMJ_EVENT.READY_REQ, this.ReadyReq, this)
        // izx.on(SCMJ_EVENT.CHANGE_CARD_START_REQ, this.ChangeCardStartReq, this)
        izx.on(SCMJ_EVENT.TING_TIP_REQ, this.TingTipReq, this)
        izx.on(SCMJ_EVENT.RESET_USER_DATA, this.resetUserData, this)
        izx.on(SCMJ_EVENT.AI_REQ, this.AiReq, this)
        izx.on(SCMJ_EVENT.CHAT_REQ, this.ChatReq, this)
        izx.on(SCMJ_EVENT.ROOM_EXIT_REQ, this.ExitRoomReq, this)
        izx.on(SCMJ_EVENT.RECHARGE_RSP, this.RechargeRsp, this)
        izx.on(SCMJ_EVENT.CAP_MULTIPLE_RSP, this.CapMultipleRsp, this)
        izx.on(SCMJ_EVENT.PRIVATE_ROOM_RESULT_REQ, this.PrivateRoomResultReq, this)
        izx.on(SCMJ_EVENT.DISMISS_ROOM_REQ, this.dismissRoomReq, this)
        izx.on(SCMJ_EVENT.KICKOUT_REQ, this.kickoutReq, this)
    }

    unLoad() {
        izx.offByTag(this)
        IGaoShouAPI.UnsetProto("Scmj")
    }

    autoRegHander() {
        let prototype = Reflect.getPrototypeOf(this)
        for (const key of Object.keys(prototype)) {
            if (-1 !== key.indexOf("Handler") && typeof prototype[key] === "function") {
                let eventName = key.substring(0, key.length - 7)
                izx.log("auto reg event = " + eventName)
                EventMgr.on(eventName, prototype[key], this)
            }
        }

        EventMgr.on(Constants.EVENT_DEFINE.ON_DATA, this.OnDataHandler, this)
        // EventMgr.on(EventName.ROOM_EXIT_GAME, this.onExitRoom, this)
    }

    onExitRoom(msg) {
        this.resetUserData()
        this.reconnect = false
    }

    afterEnterScmj() {
        izx.log("afterEnterScmj", this.reconnect)
        izx.log("this.mapChairUserData = ", this.mapChairUserData)

        izx.dispatchEvent(SCMJ_EVENT.INIT_USER_DATA, {
            mapChairUserData: this.mapChairUserData,
        })

        if (HzxlLogic.getInstance().videoData) {
        } else {
            if (this.reconnect) {
                this.JoinRoomReq()
                this.joinReqTimer = setTimeout(() => {
                    izx.log("reconnect joinroomreq no rsp")
                    izx.dispatchEvent(SCMJ_EVENT.MAIN_TOP_AREA_BTN_EXIT)
                    setTimeout(() => {
                        Helper.OpenTip("房间已解散")
                    })
                }, 5000)
            } else {
                if (HzxlLogic.getInstance().bPivateRoom) {
                    MatchSvr.JoinRoomReq(HzxlLogic.getInstance().privateRoomInfo)
                } else {
                    hzxlMatchMode.JoinRealTimeMatch()
                }
            }
        }
    }

    JoinRoomReq() {
        let matchReq = MatchSvr.getRealTimeMatchReqList()
        console.log("ScmjMode JoinRoomReq = ", matchReq)
        MatchSvr.JoinRoomReq()
    }

    JoinRoomRspHandler(msg) {
        if (this.joinReqTimer) {
            clearTimeout(this.joinReqTimer)
            this.joinReqTimer = null
        }
        msg = msg.packet
        console.log("JoinRoomRspHandler msg = ", msg)
        if (msg.err && msg.err.length) {
            HzxlLogic.getInstance().onErrDispose(msg.err)
            return
        } else {
            hzxlMatchMode.stopTimer()
            HzxlLogic.getInstance().roomInfo = msg.room
        }

        if (this.reconnect) {
            izx.log("JoinRoomRspHandler COMPLETE_REQ")
            if (msg.room && msg.room.metadata) {
                let json = JSON.parse(msg.room.metadata)
                if (json.gs_properties && json.gs_properties.room_type == 1) {
                    HzxlLogic.getInstance().bPivateRoom = true
                    HzxlLogic.getInstance().privateRoomInfo = json.gs_properties
                    HzxlLogic.getInstance().privateRoomInfo.share_code = json.gs_properties.share_code
                    HzxlLogic.getInstance().privateRoomInfo.match_code = json.gs_properties.match_cid
                    
                    // 广东麻将私人房的人数 2人 3人
                    if (HzxlLogic.getInstance().privateRoomInfo.max_player_num) {
                        HzxlLogic.getInstance().maxPlyNum = HzxlLogic.getInstance().privateRoomInfo.max_player_num
                    }

                    if (msg.room.createAt) {
                        HzxlLogic.getInstance().privateRoomInfo.create_time = Number(msg.room.createAt)
                    }
                    if (msg.room.roomId) {
                        HzxlLogic.getInstance().privateRoomInfo.roomId = msg.room.roomId
                    }
                    if (msg.room.gameGid) {
                        HzxlLogic.getInstance().privateRoomInfo.gameGid = msg.room.gameGid
                    }
                    if (msg.room.serverId) {
                        HzxlLogic.getInstance().privateRoomInfo.serverId = msg.room.serverId
                    }
                    HzxlLogic.getInstance().privateRoomInfo.endTime = 0
                    console.log("JoinRoomRspHandler privateRoomInfo = ", HzxlLogic.getInstance().privateRoomInfo)

                    izx.dispatchEvent(SCMJ_EVENT.PRIVATE_UPDATE_GAME_INFO)
                }
            }

            let param = {
                callback: (res) => {
                    izx.log("scmj req res", res.ret)
                    if (res.ret == 1) {
                        izx.log("scmj req COMPLETE_REQ")
                        izx.emit(SCMJ_EVENT.COMPLETE_REQ)
                    } else {
                        HzxlLogic.getInstance().roomInfo = null
                        HzxlLogic.getInstance().ai = [0, 0, 0, 0]
                        izx.log("scmj req SHOW_BTN_READY")
                        if (HzxlLogic.getInstance().bPivateRoom) {
                            izx.dispatchEvent(SCMJ_EVENT.MAIN_TOP_AREA_BTN_EXIT)
                            let protoData = <any>HzxlLogic.getInstance().protoData
                            if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                                setTimeout(() => {
                                    Helper.OpenTip("房间已解散！")
                                }, 1500)
                            }
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                        }
                    }
                }
            }
            hzxlMatchMode.getCurRealTimeMastch(param)
        } else {
            if (HzxlLogic.getInstance().bPivateRoom) {
                izx.dispatchEvent(SCMJ_EVENT.INIT_PRIVATE_ROOM)
            } else {
                this.ReadyReq(true)
            }
        }
    }

    LeaveRoomRspHandler(msg) {
        msg = msg.packet
        console.log("LeaveRoomRspHandle msg = ", msg)

        HzxlLogic.getInstance().roomInfo = null
        HzxlLogic.getInstance().ai = [0, 0, 0, 0]
        //不是回大厅就是换桌流程
        if (HzxlLogic.getInstance().leaveRoomGotoLobby) {
            HzxlLogic.getInstance().leaveRoomGotoLobby = false
            izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)

            PlatformApi.GotoLobby()
        } else {
            hzxlMatchMode.JoinRealTimeMatch()
        }
    }

    OnDataHandler(data) {
        // console.log("=== ScmjMode onDataHandler ", data)
        let func = this[data.name + "Handler"]
        if (typeof (func) === "function") {
            func.call(this, data)
        } else {
            cc.log("hzxlGAME===> unhandled msg", data.name)
        }
    }

    resetUserData(msg = null) {
        izx.log("resetUserData = ", msg)
        if (msg && !msg.bExit) {
            for (let key in this.mapChairUserData) {
                let item = this.mapChairUserData[key]
                let uid = item.data.uid
                if (uid != User.Data.openId) {
                    delete this.mapChairUserData[key]
                    // izx.dispatchEvent(SCMJ_EVENT.EXIT_NOTI, {
                    //     uid: uid,
                    //     chairId: key
                    // })
                }
            }
        } else {
            this.mapChairUserData = {}
        }
    }

    SocketStateHandler(rsp) {
        rsp = rsp.packet
        izx.log("SocketStateHandler rsp = ", rsp)
        if (rsp.msg === "SOCKET_RECONNECT") {
            izx.log("SocketStateHandler COMPLETE_REQ")
            let param = {
                callback: (res) => {
                    izx.log("scmj  req res", res.ret)
                    if (res.ret == 1) {
                        izx.log("scmj  req COMPLETE_REQ")
                        izx.emit(SCMJ_EVENT.COMPLETE_REQ)
                    } else {
                        HzxlLogic.getInstance().roomInfo = null
                        HzxlLogic.getInstance().ai = [0, 0, 0, 0]
                        izx.log("scmj  req SHOW_BTN_READY")
                        if (HzxlLogic.getInstance().bPivateRoom) {
                            izx.dispatchEvent(SCMJ_EVENT.MAIN_TOP_AREA_BTN_EXIT)
                            let protoData = <any>HzxlLogic.getInstance().protoData
                            if (protoData && protoData.rountCountNoti && protoData.rountCountNoti.ju > 0) {
                                setTimeout(() => {
                                    Helper.OpenTip("房间已解散！")
                                }, 1500)
                            }
                        } else {
                            izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                        }
                    }
                }
            }
            hzxlMatchMode.getCurRealTimeMastch(param)
        } else if (rsp.msg === "SOCKET_CLOSE") {
            this.resetUserData({ bExit: false })
        } else if (rsp.msg === "HEART_BEAT_TIME_OUT") {
            // izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, {})
            // izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.None)
            this.resetUserData()
        }
    }

    ReadyReq(ready) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        izx.log("ReadyReq req = ", ready)
        IGaoShouAPI.SendData("Table.Ready", "ReadyReq", {
            isReady: ready
        })
    }

    OperateRsp(msg) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        msg.serialId = this.serialId
        IGaoShouAPI.SendData("Scmj.Operate", "OperateRsp", msg)
    }

    ReadyRspHandler(msg) {
        msg = msg.packet
        izx.log("ReadyRspHandler rsp = ", msg)
        // if (rsp.errCode !== 0) {
        //   izx.dispatchEvent(EventName.COMMON_ERR_INFO, {code: rsp.errCode, msg: rsp.errMsg})
        //   izx.dispatchEvent(SCMJ_EVENT.READY_RSP, rsp)
        //   return
        // }
        if (msg.err && msg.err.length > 0) {
            if (msg.err && msg.err.length) {
                HzxlLogic.getInstance().onErrDispose(msg.err)
                return
            }
            return
        }

        for (let key in this.mapChairUserData) {
            let item = this.mapChairUserData[key]
            let uid = item.data.uid
            if (uid == User.Data.openId) {
                item.ready = 1
                break
            }
        }
        izx.dispatchEvent(SCMJ_EVENT.READY_RSP, msg)
        // this.checkAllReady()
    }

    ReadyNotHandler(noti) {
        noti = noti.packet
        izx.log("ReadyNotHandler noti = ", noti)
        for (let key in this.mapChairUserData) {
            let item = this.mapChairUserData[key]
            let uid = item.data.uid
            if (uid == noti.uid) {
                item.ready = 1
                noti.chairId = item.chairId || 0
                noti.ready = 1
                break
            }
        }
        izx.dispatchEvent(SCMJ_EVENT.READY_NOTI, noti)
    }

    EnterAckHandler(ack) {
        ack = ack.packet
        izx.log("EnterAckHandler ack = ", ack)
        if (ack.ret == 0) {
            this.resetUserData()
            for (let v of ack.items) {
                v.chairId = v.chairId || 0
                this.mapChairUserData[v.chairId] = v
            }
        }
        // izx.dispatchEvent(SCMJ_EVENT.ENTER_ACK, ack)
        izx.dispatchEvent(SCMJ_EVENT.INIT_USER_DATA, {
            mapChairUserData: this.mapChairUserData,
        })
    }

    EnterNotiHandler(noti) {
        noti = noti.packet
        // izx.log("EnterNotiHandler noti = ", noti)
        let item = noti.item
        if (!item) {
            return
        }
        item.chairId = item.chairId || 0
        this.mapChairUserData[item.chairId] = item
        izx.dispatchEvent(SCMJ_EVENT.ENTER_NOTI, noti)
        AudioMgr.playSound("audio_player_enter")
    }

    ExitRoomNotHandler(noti) {
        noti = noti.packet
        // izx.log("ExitRoomNotHandler noti = ",noti)
        if (noti.uid == User.Data.openId) {
            izx.log("this.mapChairUserData1 = ", this.mapChairUserData)
            for (let key in this.mapChairUserData) {
                let item = this.mapChairUserData[key]
                let uid = item.data.uid
                if (uid != noti.uid) {
                    delete this.mapChairUserData[key]
                    izx.dispatchEvent(SCMJ_EVENT.EXIT_NOTI, {
                        uid: uid,
                        chairId: key
                    })
                }
            }
            izx.log("this.mapChairUserData2 = ", this.mapChairUserData)
            return
        }
        for (let key in this.mapChairUserData) {
            let item = this.mapChairUserData[key]
            if (item.data.uid == noti.uid) {
                delete this.mapChairUserData[key]
                noti.chairId = Number(key)
                izx.dispatchEvent(SCMJ_EVENT.EXIT_NOTI, noti)
                AudioMgr.playSound("audio_player_leave")
                break
            }
        }
        // }
    }

    BeginGameNotiHandler(noti) {
        noti = noti.packet
        izx.log("BeginGameNotiHandler noti = ", noti)
        // 重置准备状态
        for (let key in this.mapChairUserData) {
            let item = this.mapChairUserData[key]
            item.ready = 2
        }
        AudioMgr.playSound("audio_duijukaishi")
        izx.dispatchEvent(SCMJ_EVENT.BEGIN_GAME_NOTI, noti)
        // this.ChangeCardStartReq()
        // console.log("User.Data.totalJu = ", User.Data.totalJu)
        // if (User.Data.totalJu == 0) {
        //     izx.dispatchEvent(EventName.KUAISHOU_CALLBACK, { type: 1 })
        // }
        HzxlLogic.getInstance().protoData["exchangeCompleteNoti"] = null
    }

    SetBankerNotiHandler(noti) {
        noti = noti.packet
        // izx.log("SetBankerNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        noti.setEast = noti.setEast || 0
        izx.dispatchEvent(SCMJ_EVENT.SET_BANKER_NOTI, noti)
    }

    UpdateCardsNotiHandler(noti) {
        noti = noti.packet
        // izx.log("UpdateCardsNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        izx.dispatchEvent(SCMJ_EVENT.UPDATE_CARDS_NOTI, noti)
    }

    OperateNotiHandler(noti) {
        noti = noti.packet
        // izx.log("OperateNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        izx.dispatchEvent(SCMJ_EVENT.OPERATE_NOTI, noti)
    }

    OperateReqHandler(req) {
        req = req.packet
        izx.log("OperateReqHandler req = ", req)
        this.serialId = req.serialId
        izx.dispatchEvent(SCMJ_EVENT.OPERATE_REQ, req)
    }

    ClientTimerNotiHandler(noti) {
        noti = noti.packet
        // izx.log("ClientTimerNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        noti.second = noti.second || 0
        noti.remainCardNum = noti.remainCardNum || 0
        HzxlLogic.getInstance().protoData["clientTimerNoti"] = noti
        izx.dispatchEvent(SCMJ_EVENT.CLIENT_TIMER_NOTI, noti)
    }

    ResultNotiHandler(noti) {
        this.reconnect = false
        for (let key in this.mapChairUserData) {
            let item = this.mapChairUserData[key]
            item.ready = 2
        }

        noti = noti.packet
        izx.log("ResultNotiHandler noti = ", noti)
        noti.score = noti.score || 0
        izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA)
        if (HzxlLogic.getInstance().videoData) {
            if (HzxlLogic.getInstance().protoData["privateRoomResultNoti"]) {
                return
            }
        }
        izx.dispatchEvent(SCMJ_EVENT.RESULT_NOTI, noti)
    }

    LackReqHandler(req) {
        req = req.packet
        izx.log("LackReqHandler req = ", req)
        req.lack = req.lack || 0
        HzxlLogic.getInstance().protoData["lackReq"] = req
        izx.dispatchEvent(SCMJ_EVENT.LACK_REQ, req)
    }

    LackRsp(lack) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Lack", "LackRsp", {
            lack: lack
        })
    }

    LackNotiHandler(noti) {
        noti = noti.packet
        // izx.log("LackNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        noti.lack = noti.lack || 0
        izx.dispatchEvent(SCMJ_EVENT.LACK_NOTI, noti)
    }

    GuiPaiNotiHandler(noti) {
        noti = noti.packet
        izx.dispatchEvent(SCMJ_EVENT.GUI_NOTI, noti)
    }

    MaiMaRspHandler (noti) {
        noti = noti.packet
        izx.dispatchEvent(SCMJ_EVENT.MAI_MA_NOTI, noti)
    }

    MjPlayMarkNotiHandler(noti) {
        noti = noti.packet
        // izx.log("MjPlayMarkNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        izx.dispatchEvent(SCMJ_EVENT.MJ_PLAY_MARK_NOTI, noti)
    }

    BillReq() {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Bill", "BillReq", {})
    }

    BillRspHandler(rsp) {
        rsp = rsp.packet
        izx.log("BillRspHandler rsp = ", rsp)
        rsp.score = rsp.score || 0
        izx.dispatchEvent(SCMJ_EVENT.BILL_RSP, rsp)
    }

    ScoreChangeNotiHandler(noti) {
        noti = noti.packet
        console.log("ScoreChangeNotiHandler noti = ", noti)
        for (let v of noti.items) {
            v.chairId = v.chairId || 0
            v.presentScore = v.presentScore || 0
            v.totalScore = v.totalScore || 0
            v.score = v.score || 0
            v.shieldTimes = v.shieldTimes || 0
        }
        izx.dispatchEvent(SCMJ_EVENT.SCORE_CHANGE_NOTI, noti)
    }

    CompleteReq() {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Complete", "CompleteReq", {})
    }

    CompleteNotiHandler(noti) {
        noti = noti.packet
        console.log("CompleteNotiHandler noti = ", noti)
        noti.state = noti.state || 0
        noti.east = noti.east || -1
        noti.banker = noti.banker || 0
        noti.remainCardNum = noti.remainCardNum || 0
        this.resetUserData()
        for (let v of noti.baseItems) {
            v.chairId = v.chairId || 0
            this.mapChairUserData[v.chairId] = v
        }
        for (let v of noti.gameItems) {
            v.chairId = v.chairId || 0
            v.lack = v.lack || 0
            v.shieldTimes = v.shieldTimes || 0
            v.capMultiple = v.capMultiple || 1
        }
        izx.dispatchEvent(SCMJ_EVENT.INIT_USER_DATA, {
            mapChairUserData: this.mapChairUserData,
        })
        HzxlLogic.getInstance().protoData["completeNoti"] = noti
        izx.dispatchEvent(SCMJ_EVENT.COMPLETE_NOTI, noti)
    }

    AutoReq(msg) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Auto", "AutoReq", msg)
    }

    AutoNotiHandler(noti) {
        noti = noti.packet
        // console.log("AutoNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        izx.dispatchEvent(SCMJ_EVENT.AUTO_NOTI, noti)
    }

    ExchangeReqHandler(req) {
        req = req.packet
        console.log("ExchangeReqHandler req = ", req)
        HzxlLogic.getInstance().protoData["exchangeReq"] = req
        izx.dispatchEvent(SCMJ_EVENT.EXCHANGE_REQ, req)
    }

    ExchangeRsp(rsp) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Exchange", "ExchangeRsp", rsp)
    }

    ExchangeNotiHandler(noti) {
        noti = noti.packet
        console.log("ExchangeNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        izx.dispatchEvent(SCMJ_EVENT.EXCHANGE_NOTI, noti)
    }

    ExchangeConfirmNotiHandler(noti) {
        noti = noti.packet
        console.log("ExchangeConfirmNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        izx.dispatchEvent(SCMJ_EVENT.EXCHANGE_CONFIRM_NOTI, noti)
    }

    ExchangeCompleteNotiHandler(noti) {
        noti = noti.packet
        console.log("ExchangeCompleteNotiHandler noti = ", noti)
        noti.way = noti.way || 0
        HzxlLogic.getInstance().protoData["exchangeCompleteNoti"] = noti
        izx.dispatchEvent(SCMJ_EVENT.EXCHANGE_COMPLETE_NOTI, noti)
    }

    TingTipReq() {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.TingTip", "TingTipReq", {})
    }

    TingTipRspHandler(msg) {
        msg = msg.packet
        izx.log("TingTipRspHandler msg = ", msg)
        if (msg.tingCards.length > 0) {
            izx.dispatchEvent(SCMJ_EVENT.SHOW_TING_TIP, { tingCards: msg.tingCards })
        }
    }

    TingNotiHandler(msg) {
        msg = msg.packet
        izx.log("TingNotiHandler msg = ", msg)
        msg.isTing = msg.isTing || 2
        izx.dispatchEvent(SCMJ_EVENT.TING_NOTI, msg)
    }

    AiReq(req) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Ai", "AiReq", req)
    }

    ChatReq(req) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Chat", "ChatReq", req)
    }

    ChatNotiHandler(msg) {
        msg = msg.packet
        izx.log("ChatNotiHandler msg = ", msg)
        msg.chairId = msg.chairId || 0
        izx.dispatchEvent(SCMJ_EVENT.CHAT_NOTI, msg)
    }

    RoundStartNotHandler(msg) {
        msg = msg.packet
        izx.log("RoundStartNotHandler msg = ", msg)        
        HzxlLogic.getInstance().lackData = {}
        HzxlLogic.getInstance().bFirstUpdateCard = true
        HzxlLogic.getInstance().protoData["roundStartNot"] = msg
        izx.dispatchEvent(SCMJ_EVENT.ROUND_START_NOTI, msg)
    }

    RoundEndNotHandler(msg) {
        msg = msg.packet
        izx.log("RoundEndNotHandler msg = ", msg)
        izx.dispatchEvent(SCMJ_EVENT.ROUND_END_NOTI, msg)

        if (HzxlLogic.getInstance().bPivateRoom) {
            HzxlLogic.getInstance().privateRoomInfo.endTime = msg.endTime
        }
    }

    DismissNotHandler(msg) {
        msg = msg.packet
        console.log("DismissNotHandler msg = ", msg)
        if (HzxlLogic.getInstance().bPivateRoom) {
            HzxlLogic.getInstance().protoData["dismissNot"] = msg
        }
        izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA)
        HzxlLogic.getInstance().roomInfo = null
        HzxlLogic.getInstance().ai = [0, 0, 0, 0]
    }

    ExitRoomReq() {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        izx.log("ExitRoomReq LeaveRoomReq")
        IGaoShouAPI.SendData("GsBase.LeaveRoom", "LeaveRoomReq", {})
    }

    RechargeReqHandler(noti) {
        noti = noti.packet
        izx.log("RechargeReqHandler noti = ", noti)
        for (let v of noti.items) {
            v.chairId = v.chairId || 0
            v.recharge = v.recharge || 0
            v.shieldTimes = v.shieldTimes || 0
        }
        izx.dispatchEvent(SCMJ_EVENT.RECHARGE_REQ, noti)
    }

    RechargeNotiHandler(noti) {
        noti = noti.packet
        izx.log("RechargeNotiHandler noti = ", noti)
        for (let v of noti.items) {
            v.chairId = v.chairId || 0
            v.recharge = v.recharge || 0
            v.shieldTimes = v.shieldTimes || 0
        }
        izx.dispatchEvent(SCMJ_EVENT.RECHARGE_NOTI, noti)
    }

    RechargeRsp(rsp) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        izx.log("RechargeRsp rsp = ", rsp)
        IGaoShouAPI.SendData("Scmj.Recharge", "RechargeRsp", rsp)
    }

    CapMultipleReqHandler(req) {
        req = req.packet
        izx.log("CapMultipleReqHandler req = ", req)
        izx.dispatchEvent(SCMJ_EVENT.CAP_MULTIPLE_REQ, req)
    }

    CapMultipleNotiHandler(noti) {
        noti = noti.packet
        izx.log("CapMultipleNotiHandler noti = ", noti)
        noti.chairId = noti.chairId || 0
        noti.capMultiple = noti.capMultiple || 1
        izx.dispatchEvent(SCMJ_EVENT.CAP_MULTIPLE_NOTI, noti)
    }

    CapMultipleRsp(rsp) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        izx.log("CapMultipleRsp rsp = ", rsp)
        IGaoShouAPI.SendData("Scmj.CapMultiple", "CapMultipleRsp", rsp)
    }

    RountCountNotiHandler(msg) {
        msg = msg.packet
        msg.quan = msg.quan || 0
        msg.ju = msg.ju || 0
        msg.count = msg.count || 0
        izx.log("RountCountNotiHandler msg = ", msg)
        HzxlLogic.getInstance().protoData["rountCountNoti"] = msg
        izx.dispatchEvent(SCMJ_EVENT.ROUNT_COUNT_NOTI, msg)
    }

    PauseGameNotiHandler(msg) {
        msg = msg.packet
        msg.flag = msg.flag || 0
        msg.waitTime = msg.waitTime || 0
        msg.leftTime = msg.leftTime || 0
        msg.chairId = msg.chairId || 0
        // izx.log("PauseGameNotiHandler msg = ", msg)
        HzxlLogic.getInstance().protoData["pauseGameNoti"] = msg
        izx.dispatchEvent(SCMJ_EVENT.PAUSE_GAME_NOTI, msg)
    }

    PrivateRoomResultReq(req) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        izx.log("PrivateRoomResultReq req = ", req)
        IGaoShouAPI.SendData("Scmj.PrivateRoomResult", "PrivateRoomResultReq", req)
    }

    PrivateRoomResultRspHandler(msg) {
        msg = msg.packet
        izx.log("PrivateRoomResultRspHandler msg = ", msg)
        izx.dispatchEvent(SCMJ_EVENT.PRIVATE_ROOM_RESULT_RSP, msg)
    }

    PrivateRoomResultNotiHandler(noti) {
        noti = noti.packet
        for (let v of noti.gameStatiscs) {
            v.bankerNum = v.bankerNum || 0
            v.huNum = v.huNum || 0
            v.dianPaoNum = v.dianPaoNum || 0
            v.gangNum = v.gangNum || 0
            v.chaDaJiaoNum = v.chaDaJiaoNum || 0
            v.amount = v.amount || 0
        }
        izx.log("PrivateRoomResultNotiHandler noti = ", noti)
        HzxlLogic.getInstance().protoData["privateRoomResultNoti"] = noti
        izx.dispatchEvent(SCMJ_EVENT.GET_PLAYERS_DATA)
        izx.dispatchEvent(SCMJ_EVENT.PRIVATE_ROOM_RESULT_NOTI, noti)
    }

    OwnerNotiHandler(noti) {
        noti = noti.packet
        izx.log("OwnerNotiHandler noti = ", noti)
        HzxlLogic.getInstance().protoData["ownerNoti"] = noti
        izx.dispatchEvent(SCMJ_EVENT.SHOW_FANG_ZHU, noti)
    }

    ConnectNotiHandler(noti) {
        noti = noti.packet
        noti.chairId = noti.chairId || 0
        izx.log("ConnectNotiHandler noti = ", noti)
        HzxlLogic.getInstance().protoData["connectNoti"] = noti
        izx.dispatchEvent(SCMJ_EVENT.SHOW_CONNECT, noti)
        if (noti.status == 2) {
            if (User.OpenID != noti.uid) {
                UserSrv.GetPlyDetail(noti.uid, (ply: IPlayerData) => {
                    Helper.OpenTip(ply.userName + "回来了")
                })
            }
        }
    }

    LastRoundNotiHandler(noti) {
        noti = noti.packet
        izx.log("LastRoundNotiHandler noti = ", noti)
        HzxlLogic.getInstance().protoData["lastRoundNoti"] = noti
    }

    SystemMessageHandler(data) {
        data = data.packet
        izx.log("SystemMessageHandler data = ", data)
        // data = {
        //     "err": "{\"Id\":\"003f841b-f2f3-a804-e36c-732f3995e214\",
        //     \"Code\":400,
        //     \"Detail\":\"{\\\"id\\\":\\\"003f841b-f2f3-a804-e36c-732f3995e214\\\",\\\"code\\\":401,\\\"detail\\\":\\\"invalid game session\\\"}\",\"Status\":\"Bad Request\"}",
        //     "request": "{}"
        // }
        // cc.error("错误消息发来====>>>!!!!" + JSON.stringify(data));

        let strErr = data.err;
        try {
            let errOBJ = JSON.parse(strErr);
            console.error("错误消息发来====>>>!!!!" + JSON.stringify(errOBJ));
            if (errOBJ && (errOBJ.Code == 400 || errOBJ.code == 400)) {
                /*let strDetail = errOBJ.Detail;
                if (strDetail) {
                    let errOBJDetail = JSON.parse(strDetail);
                    if (errOBJDetail.code == 401) {
                        izx.dispatchEvent(SCMJ_EVENT.GAME_PING_TIMEOUT)
                    }
                }*/

                if (cc.sys.WECHAT_GAME === cc.sys.platform && cc.sys.os == cc.sys.OS_IOS) {
                    izx.dispatchEvent(SCMJ_EVENT.STATE_NONE, {})
                    izx.dispatchEvent(SCMJ_EVENT.CHANEG_STATE, GameState.None)
                }
                if (!HzxlLogic.getInstance().bPivateRoom) {
                    izx.dispatchEvent(SCMJ_EVENT.SHOW_BTN_READY, true)
                }
            } else if (errOBJ && (errOBJ.Code == 503 || errOBJ.code == 503)) {
                let param = {
                    param: {
                        msg: "\n 游戏服务器不可用，返回大厅！\n",
                        hideClose: true,
                        hideCancel: true,
                        confirm: () => {
                            izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)
                            PlatformApi.GotoLobby()
                        }
                    }
                }
                UIMgr.OpenUI("component/Base/GamePop", param)
                hzxlMatchMode.CancelRealTimeMatch()
            }
        }
        catch (error) {
            console.error("onSystemMessage====>>>error==> " + error);
        }
    }

    dismissRoomReq(msg) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.DismissRoom", "DismissRoomReq", msg)
    }

    kickoutReq(msg) {
        if (HzxlLogic.getInstance().videoData) {
            return
        }
        IGaoShouAPI.SendData("Scmj.Kickout", "KickoutReq", msg)
    }
}