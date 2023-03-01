/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2020-10-21 14:43:52
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-18 16:57:01
 */
import { igs } from "../igs";
import { PlatformApi } from "../lobby/start/script/api/platformApi";
import { Helper } from "../lobby/start/script/system/Helper";
import { SCMJ_EVENT } from "./hzxl-Events";
import { gsbase } from "../lobby/start/script/proto/gsb_proto"
import { GameIndependent, IGameIndependent } from "./game/GameIndependent";

let izx = igs.izx
type TGameIndependentParam = {param?: any, name?: string}
export default class HzxlLogic {
    private static _instance: HzxlLogic = null

    leaveRoomGotoLobby = false   //leaveRoom后返回大厅

    roomInfo: gsbase.RoomInfo = null  //当前房间信息
    playerScore = 0 // 结算时玩家得分
    ai = [0, 0, 0, 0] // 智能辅助开关

    bPivateRoom: boolean = false // 是否私人房
    privateRoomInfo = null // 私人房信息
    protoData = {} // 协议数据
    bFirstUpdateCard: boolean = false // 开局首次更新手牌
    lackData = {}   //玩家定缺数据
    bankerChirId = {}   //庄位置

    videoData = null

    laizi : number = -1
    
    curGameIndependentParam: TGameIndependentParam = null
    gamePlayDesc = []
    curGameIndependent: IGameIndependent = null

    maxPlyNum = 4

    errDefine = {
        2001: { detail: "房间不存在" },
        2002: { detail: "房间已满员" },
        2003: { detail: "游戏中，不允许离开" },
        2004: { detail: "长时间未操作，被踢出房间" },
        2005: { detail: "房间已解散" },
        2006: { detail: "已解散，房间空闲时间过长" },
        2007: { detail: "游戏配置错误" },
        12001: { detail: "玩家数据不存在" },
        12002: { detail: "玩家数据异常" },
        12003: { detail: "道具不足" },
        13018: { detail: "低于入场限制，请选择合适场次" },
        13019: { detail: "高于入场限制，请选择合适场次" },
    }

    static getInstance(): HzxlLogic {
        if (!HzxlLogic._instance) {
            HzxlLogic._instance = new HzxlLogic()
        } else {
        }

        return HzxlLogic._instance
    }

    onErrDispose(rspErr: string) {
        if (rspErr) {
            let err = Helper.ParseJson(rspErr, "onErrDispose")
            let msg = this.errDefine[err.code]
            msg = msg ? msg.detail : "服务器异常"
            let param = {
                msg: msg,
                hideClose: true,
                hideCancel: true,
                confirm: () => {
                    if (HzxlLogic.getInstance().roomInfo) {
                        HzxlLogic.getInstance().leaveRoomGotoLobby = true
                        izx.dispatchEvent(SCMJ_EVENT.ROOM_EXIT_REQ)
                    } else {
                        izx.dispatchEvent(SCMJ_EVENT.RESET_USER_DATA)
                        PlatformApi.GotoLobby()
                    }
                }
            }
            Helper.OpenGamePop(param)
        }
    }

    initGameData(curGame: TGameIndependentParam, cb){
        this.curGameIndependentParam = curGame
        let clazz = GameIndependent.getIndependent(this.curGameIndependentParam.name)
        HzxlLogic.getInstance().curGameIndependent = new clazz;        
        HzxlLogic.getInstance().gamePlayDesc = HzxlLogic.getInstance().curGameIndependent.getGamePlayDesc()
        HzxlLogic.getInstance().curGameIndependent.initGame(this.curGameIndependentParam.param, (curGame: any)=>{
            cb()
        })

        if(this.isHzxl()){
            HzxlLogic.getInstance().laizi = 41
        }
    }

    isHzxl(){
        return this.curGameIndependentParam.name == "09965902-5d1e-4632-ac38-8d4551dc1142"
    }

    isGdmj(){
        return this.curGameIndependentParam.name == "09965902-5d1e-4632-ac38-8d4551dc1143"
    }
}