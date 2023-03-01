import { PlatformApi } from "../lobby/start/script/api/platformApi";
import { Helper } from "../lobby/start/script/system/Helper";
import { MatchSvr } from "../lobby/start/script/system/MatchSvr";
import { igs } from "../igs";
import { SCMJ_EVENT } from "./hzxl-Events";
import Scmj from "./hzxl-scmj";
import { DataMgr } from "../lobby/start/script/base/DataMgr";
import { Constants } from "../lobby/start/script/igsConstants";
let izx = igs.izx

const { ccclass, property } = cc._decorator;

export namespace hzxlMatchMode {
    let _bJoinReq = null
    let _isMatching = false
    export function JoinRealTimeMatch() {
        let matchReq = MatchSvr.getRealTimeMatchReqList()
        console.log("hzxlMatchMode JoinRealTimeMatch = ", matchReq)
        _isMatching = true
        let req = () => {
            MatchSvr.JoinRealTimeMatch(matchReq, (res) => {
                if (res && res.err) {     
                    if(res.err?.code === 2008){//输赢上限
                    }else{
                        let msg = "匹配失败" + (res.err.code || "") + ", 请稍后再试"
                        if(res.err.code == 13018){
                            msg = "低于入场限制，请选择合适场次"
                        }else if(res.err.code == 13019){
                            msg = "高于入场限制，请选择合适场次"
                        }
                        let param = {
                            msg: msg,
                            hideClose: true,
                            hideCancel: true,
                            confirm: () => {
                                izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)
                                PlatformApi.GotoLobby()
                            }
                        }
                        Helper.OpenGamePop(param)
                        _isMatching = false 

                        Helper.reportEvent("join match err=", res.err.code)
                    }
                }else if(res && res.match_id && res.match_id.length > 0){
                    Scmj.getInstance()._scmj.reconnect = true
                    // MatchSvr.GetInProgressList(() => {
                    //     let data = DataMgr.getData<TResults>(Constants.DATA_DEFINE.MATCH_PROGRESS)
                    //     if(data && data.length > 0){
                    //         for (let i in data) {
                    //             if (data[i].realTime && (data[i].playerState === Constants.PLAYER_MATCH_STATE.PLAYER_MATCH_STATE_GAMING) &&
                    //                 (data[i].battleState === Constants.PLAYER_BATTLE_STATE.PLAYER_STATE_WAITING || data[i].battleState === Constants.PLAYER_BATTLE_STATE.PLAYER_STATE_GAMING)) {                                    
                    //                 MatchSvr.EnterRealTimeMatch(data[i].matchId, data[i].matchUuid, data[i].roundId, (res) => {
                    //                     let matchs: TMatchs = DataMgr.getData<TMatchs>(Constants.DATA_DEFINE.MATCH_CONFIG)
                    //                     if (matchs && res && res.matchId && matchs[res.matchId]) {
                    //                         let matchReq = MatchSvr.getRealTimeMatchReqList()
                    //                         console.log("hzxlMatchMode JoinRoomReq = ", matchReq)
                    //                         MatchSvr.JoinRoomReq()
                    //                     }else {
                    //                         _bJoinReq = setTimeout(() => req(), 15000)
                    //                     }
                    //                 })                                    
                    //             }
                    //         }
                    //     }else {
                    //         _bJoinReq = setTimeout(() => req(), 15000)
                    //     }
                    // })
                }else {
                    _bJoinReq = setTimeout(() => req(), 15000)
                }
            })
        }
        if(matchReq.length > 0){
            req()
        }
    }    

    export function stopTimer() {
        if (_bJoinReq) {
            clearTimeout(_bJoinReq)
            _bJoinReq = null
        }
    }

    export function CancelRealTimeMatch(callback?:Function){
        console.log("hzxlMatchMode CancelRealTimeMatch = ")
        hzxlMatchMode.stopTimer()
        if(_isMatching){
            MatchSvr.CancelRealTimeMatch(callback)
        }else{
            callback?.()
        }
    }

    export function getCurRealTimeMastch(param){
        console.log("hzxlMatchMode getCurRealTimeMastch = ", param)
        MatchSvr.getCurRealTimeMastch(param)
    }
}