import { Util } from "../../../start/script/api/utilApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { PluginMgr } from "../../../start/script/base/PluginMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { PrivateRoomSrv } from "../../../start/script/system/PrivateRoomSrv";




const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalBillDetail extends BaseUI {
    @property(cc.Color)
    winColor:cc.Color = cc.Color.BLACK
    @property(cc.Color)
    loseColor:cc.Color = cc.Color.BLACK
    @property(cc.SpriteFrame)
    winBg:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    loseBg:cc.SpriteFrame = null

    data:any = null
    setRule = false   //是否设置过规则
    protected start(): void {
        console.log("PersonalBillDetail start", this.param)
        this.initEvent()
        this.initButton()

        this.setActive("node/detail", true)
        this.setActive("node/rule", false)
        PrivateRoomSrv.GetDescGameResult({room_id: this.param.room_id}, (res)=>{
            console.log("GetDescGameResult res", res)
            if(cc.isValid(this.node)){
                this.initData(res)        
            }    
        })
    }

    initEvent() {
       
    }

    initButton(){        
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/detail/total/btnCopy", ()=>{
            console.log("btnCopy")
            let rule = this.param.matchInfo.name//"血流红中-4红中 8局"
            let share_code = this.data.info.share_code
            this.data.info.round_num = this.data.info.round_num || 0
            let msg = DataMgr.data.Config.gameName + " " + Helper.FormatTimeString(this.data.info.update_time*1000, "yyyy-MM-dd hh:mm:ss") + "\r\n" 
            + rule + " 房间号：" + share_code + "  " +this.data.info.round_num + "/" + this.data.info.max_round + "局\r\n" 
            + "======玩家战绩======" + "\r\n" 
            for(let player of this.data.info.players){
                player.win_lose = player.win_lose || 0          
                msg += "昵称：" + player.nickname
                if(player.labels){
                    for(let v of player.labels){
                        if(v.indexOf("owner") >= 0){
                            msg += "(房主)"
                        }
                    }
                }
                msg += "\r\n"
                msg += "ID：" + player.openid +"\r\n"
                msg += "积分：" + player.win_lose +"\r\n"
                msg += "------------------" + "\r\n" 
            }
            PluginMgr.copyToClipboard(msg)
        })
    }

    onPageChange(event: Event, customEventData: string) {   
        console.log("onPageChange", customEventData)        
        this.setActive("node/detail", "0" == customEventData)
        this.setActive("node/rule", "0" != customEventData)
        if("0" != customEventData && !this.setRule){
            if(this.data && this.data.info){
                this.setRule = true
                let matchInfo = this.param.matchInfo
                console.log("setParam PrivateRoomRule matchInfo", matchInfo)
                if(matchInfo){
                    let properties = Helper.ParseJson(this.data.info.properties, "PersonalBillDetail")
                    let cl_params = Helper.ParseJson(properties.cl_params, "PersonalBillDetail")
                    matchInfo.metadata.cl_params.diao.default_data = cl_params
                    console.log("setParam PrivateRoomRule cl_params", cl_params)
                    this.setChildParam("node/rule/PrivateRoomRule", matchInfo)
                }
            }
        }
    }

    initData(data:any) {
        this.data = data
        if(data.info){            
            if(!this.param.matchInfo){
                this.param.matchInfo = MatchSvr.GetMatchInfo(data.info.match_cid)
            }
            this.setLabelValue("node/detail/inviteCode", "房间号：" + data.info.share_code)
            for(let i=0;i<data.info.players.length;i++){
                let player = data.info.players[i]
                player.win_lose = player.win_lose || 0
                player.nickname = player.nickname || ""
                let nickname = player.nickname.length > 4 ? player.nickname.substr(0, 4) + "..." : player.nickname
                this.setLabelValue("node/detail/title/player"+i, nickname)
                this.setLabelValue("node/detail/total/player"+i+"/score", player.win_lose > 0 ? "+" + player.win_lose : player.win_lose)
                this.setLabelInfo("node/detail/total/player"+i+"/score", {color: player.win_lose > 0 ? this.winColor : this.loseColor})
                this.setSpriteFrame("node/detail/total/player"+i+"/bg", player.win_lose > 0 ? this.winBg : this.loseBg)
                if(player.openid == User.OpenID){
                    this.setLabelInfo("node/detail/title/player"+i, {color: this.winColor})
                }
            }

            if(data.rounds){
                //对玩家进行排序
                for(let v of data.rounds){
                    v.room_id = this.param.room_id
                    v.max_rounds = data.rounds.length
                    v.matchInfo = this.param.matchInfo
                    for(let player of v.players){
                        for(let i=0;i<data.info.players.length;i++){
                            if(player.openid == data.info.players[i].openid){
                                player.sort_id = i
                                break
                            }
                        }
                    }

                    v.players.sort((a, b) => {
                        return a.sort_id < b.sort_id ? -1 : 1
                    })
                }

                data.rounds.reverse()
                this.setChildParam("node/detail/scrollView", {list: data.rounds})
            }
        }
    }
}
