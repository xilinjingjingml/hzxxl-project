import push = require("../proto/push")
import { DataMgr } from "../base/DataMgr"
import { Constants } from "../igsConstants"
import { EventMgr } from "../base/EventMgr"
import { UserSrv } from "./UserSrv"
import { Helper } from "./Helper"
import { NewGateMgr } from "../base/NewGateMgr"
import { User } from "../data/User"
import { UIMgr } from "../base/UIMgr"
import { PlatformApi } from "../api/platformApi"
import { igs } from "../../../../igs"

const PUSH_SVR = "push_svr"

let _init = false

export namespace PushSvr {

    let _heartbeat = null
    let _lastHeart = null
    let _pingTime: number[] = []
    let _delayTime: number = 9999

    export function Register() {
        if (!_init) {
            NewGateMgr.setProto("pushsvr", push)
            EventMgr.on("RegisterRsp", RegisterRspHandler, PUSH_SVR)
            EventMgr.on("UpdateItemNot", UpdateItemNotHandler, PUSH_SVR)
            EventMgr.on("PushMessageRsp", PushMessageRspHandler, PUSH_SVR)
            EventMgr.on("MsgPushNot", MsgPushNotHandler, PUSH_SVR)
            EventMgr.on("Pong", PongHandle, PUSH_SVR)
            EventMgr.on("GsbPong", GsbPongHandle, PUSH_SVR)
            EventMgr.on("SystemMessage", SystemMessageHandle, PUSH_SVR)

            EventMgr.on("SOCKET_CONNECT", _RegisterReq, PUSH_SVR)
            EventMgr.on("SOCKET_RECONNECT", _RegisterReq, PUSH_SVR)            
            _pushSvrLogin()
            _init = true
        }
    }

    function _pushSvrLogin() {
        if (DataMgr.data.Config) {
            NewGateMgr.login(DataMgr.data.Config.hostname, null, "/websocket2")
        }
    }

    function _RegisterReq() {
        console.log("===_registerReq")
        let openid = DataMgr.getData<IAccount>(Helper.GetTokenDataKey())
        NewGateMgr.notify("igaoshou-push-srv.Push.Register", "RegisterReq", {
            openid: openid.openid,
            token: openid.token,
            cliVer: Constants.versionCode,
        })

        Ping()
        if (null !== _heartbeat) {
            clearInterval(_heartbeat)
            _heartbeat = null
        }
        _heartbeat = setInterval(Ping, 3000)
    }

    export function RegisterRspHandler(msg) {
        cc.log(msg)
    }

    export function UpdateItemNotHandler(msg) {
        UserSrv.GetPlyDetail()
        UserSrv.UpdateItem()
    }

    export function MsgPushNotHandler(msg) {
        msg = msg.packet
        // console.log(msg)

        let data: IPushMsg = {
            type: msg.showType,
            openUri: msg.openUri,
            msg: msg.msg
        }
        DataMgr.data.addPushMsg(data)
        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.MSG_PUSH_NOT, msg)
    }

    export function PushMessageRspHandler(msg) {
        console.log("====PushMessageRspHandler====")
        msg = msg.packet
        console.log(msg)
    }

    export function SendPushMsg(openid: string, msg: string, type: number) {
        let data: IPushMessageReq = {
            openid: openid,
            message: msg,
            showType: type,
        }

        NewGateMgr.notify("igaoshou-push-srv.Push.PushMessage", "PushMessageReq", data)
    }

    export function SystemMessageHandle(msg) {
        console.log("SystemMessageHandle",msg)
        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ON_DATA, msg)

        let packet = msg.packet
        if(packet.code == 1007){//抢帐号
            NewGateMgr.close()
            Helper.OpenTip("您有设备在它处登录，请检查您的设备")
            setTimeout(()=>{
                NewGateMgr.ready()
            }, 2000)
        }
    }

    export function MatchingStatusNotHandle(msg){
        console.log("MatchingStatusNotHandle",msg)
        let packet = msg.packet
        if(packet.err.length > 0){
            Helper.reportEvent("MatchingStatusNot", packet.err)
        }
    }   

    function Ping() {
        // cc.log("===sender Ping====")
        _pingTime.push(Date.now())
        NewGateMgr.notify("igaoshou-push-srv.Push.Heartbeat", "Ping", {
            now: _pingTime[_pingTime.length - 1],
            openid: User.OpenID
        })
        if (!_lastHeart) {
            _lastHeart = setTimeout(HeartbeatTimeout, 30 * 1000)
        }
    }

    function PongHandle(msg) {
        msg = msg.packet
        // cc.log(msg)
        _delayTime = Date.now() - _pingTime[0]
        _pingTime.shift()
        if (_lastHeart) {
            clearTimeout(_lastHeart)
            _lastHeart = null
        }
        
        Helper.closeNetWorkTip()
    }

    // 心跳超时
    function HeartbeatTimeout() {
        if (null !== _heartbeat) {
            clearInterval(_heartbeat)
            _heartbeat = null
        }
        
        NewGateMgr.reset()
    }

    export function getNetDelayTime() {
        return _delayTime
    }

    // 游戏服务器心跳
    let _

    let _gsbHeartbeat = null
    let _gsbLastHeart = null
    let _gsbPingTime: number[] = []
    let _gsbDelayTime: number = 9999

    let _serverId: string = null
    let _gameGid: string = null

    export function GsbHeartbeatStart(serverId, gameGid) {
        _serverId = serverId
        _gameGid = gameGid

        if (null !== _gsbHeartbeat) {
            clearInterval(_gsbHeartbeat)
            _gsbHeartbeat = null
        }
        _gsbHeartbeat = setInterval(GsbPing, 3000)
    }

    export function GsbHeartbeatEnd() {
        _serverId = null
        _gameGid = null

        if (null !== _gsbHeartbeat) {
            clearInterval(_gsbHeartbeat)
            _gsbHeartbeat = null
        }
    }

    export function GsbHeartbeatRestart() {
        if (null === _gsbHeartbeat) {
            _gsbHeartbeat = setInterval(GsbPing, 3000)
        }
    }

    function GsbPing() {
        if (!_serverId || !_gameGid) {
            if (null !== _gsbHeartbeat) {
                clearInterval(_gsbHeartbeat)
                _gsbHeartbeat = null
            }
            return
        }

        _gsbPingTime.push(Date.now())
        NewGateMgr.notify(_serverId + "." + _gameGid + ".GsBase.Ping", "Ping", {
            now: _gsbPingTime[_gsbPingTime.length - 1]
        })
        if (!_gsbLastHeart) {
            _gsbLastHeart = setTimeout(GsbHeartbeatTimeout, 10 * 1000)
        }
    }

    function GsbPongHandle(msg) {
        msg = msg.packet
        _gsbDelayTime = Date.now() - _gsbPingTime[0]
        _gsbPingTime.shift()
        if (_gsbLastHeart) {
            clearTimeout(_gsbLastHeart)
            _gsbLastHeart = null
        }
    }

    function GsbHeartbeatTimeout() {
        if (null !== _gsbHeartbeat) {
            clearInterval(_gsbHeartbeat)
            _gsbHeartbeat = null
        }

        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.ON_DATA, { name: "SocketState", packet: { msg: "HEART_BEAT_TIME_OUT" } })

        if(!PlatformApi.isInLobby){
            let param = {
                param: {
                    msg: "\n 连接断开，返回大厅！\n",
                    hideClose: true,
                    hideCancel: true,
                    confirm: () => {
                        PlatformApi.GotoLobby()
                    }
                }
            }
            UIMgr.OpenUI("component/Base/GamePop", param)
        }
    }
}

EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, PushSvr.Register)