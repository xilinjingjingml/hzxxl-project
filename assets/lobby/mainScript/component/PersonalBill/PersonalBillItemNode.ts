import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { PrivateRoomSrv } from "../../../start/script/system/PrivateRoomSrv";
import { UserSrv } from "../../../start/script/system/UserSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalBillItemNode extends BaseUI {
    @property(cc.Node)
    playerContent:cc.Node = null
    @property(cc.Node)
    playerItemPrefab:cc.Node = null

    @property(cc.Color)
    winColor:cc.Color = cc.Color.BLACK
    @property(cc.Color)
    loseColor:cc.Color = cc.Color.BLACK
    @property(cc.SpriteFrame)
    winBg:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    loseBg:cc.SpriteFrame = null

    data:any = {}
    matchInfo = null
    start() {
        this.playerItemPrefab.active = false
        this.initEvent()
        this.initButton()
    }

    setParam(param: any): void {
        console.log("PersonalBillItemNode param", param)
        this.data = param
        this.initData()
    }

    initEvent() {
       
    }

    initButton(){
        this.setButtonClick("btnVideo", ()=>{
            console.log("btnVideo this.matchInfo", this.matchInfo)
            let param = {
                room_id: this.data.room_id,
                round: 1
            }
            PrivateRoomSrv.GetReplay(param, (res)=>{
                if(res.err){
                    Helper.OpenTip("录像不存在")
                }else{
                    res.room_id = param.room_id
                    PlatformApi.joinPlayVideoGame(this.matchInfo.gameId, res)
                }
            })
        })

        this.setButtonClick("btnDetail", ()=>{
            console.log("btnDetail")
            UIMgr.OpenUI("component/PersonalBill/PersonalBillDetail", {single:true, param:{room_id: this.data.room_id, matchInfo:this.matchInfo}})
        })

        this.setButtonClick("btnGame", ()=>{
            console.log("btnGame")
            PrivateRoomSrv.GetDescGameResult({room_id: this.data.room_id}, (res)=>{
                console.log("GetDescGameResult res", res)
                if(cc.isValid(this.node) && res && res.info){
                    if(this.matchInfo){
                        let properties = Helper.ParseJson(res.info.properties, "PersonalBillDetail")
                        let cl_params = Helper.ParseJson(properties.cl_params, "PersonalBillDetail")
                        let default_data = cl_params
                        default_data.max_player_num = this.matchInfo.metadata.cl_params.play_num
                        default_data.match_cid = this.matchInfo.matchId
                        MatchSvr.createRoom({
                            game_id: this.matchInfo.gameId,
                            match_cid: this.matchInfo.matchId,
                            properties: JSON.stringify(default_data),
                            labels: res.info.labels
                        }, (res)=>{
                            if(res.room && res.room.metadata && res.room.metadata.share_code && res.room.metadata.share_code.length > 0){
                                MatchSvr.getRoomInfo({share_code: res.room.metadata.share_code}, (res)=>{
                                    if(res.room){
                                        PlatformApi.joinPrivateGame(res.room)
                                    } else if (res.err && res.err.detail) {
                                        Helper.OpenTip(res.err.detail)
                                    } else{
                                        Helper.OpenTip("房间不存在")
                                    }
                                })
                            // } else if (res.err && res.err.detail) {
                            //     Helper.OpenTip(res.err.detail)
                            } else{
                                Helper.OpenTip("创建房间失败，请稍后再试！")
                            }
                        })
                    }
                }
            })
        })
    }

    initData() {
        this.playerContent.removeAllChildren()
        this.data.round_num = this.data.round_num || 0
        this.matchInfo = MatchSvr.GetMatchInfo(this.data.match_cid)
        if(this.matchInfo){
            this.setLabelValue("title", this.matchInfo .name)
        }
        this.setLabelValue("inviteCode", "局数:" + this.data.round_num + "/" + this.data.max_round + "    房间号:" + this.data.share_code)
        this.setLabelValue("time", this.data.status == "Dismissed" ? "结束：" + Helper.FormatTimeString(this.data.update_time*1000, "MM/dd hh:mm") : "进行中")
        for(let i=0;i<this.data.players.length;i++){
            let itemNode = cc.instantiate(this.playerItemPrefab)
            itemNode.parent = this.playerContent
            itemNode.active = true

            let player = this.data.players[i]
            player.win_lose = player.win_lose || 0
            this.setLabelValue("score", itemNode, player.win_lose > 0 ? "+" + player.win_lose : player.win_lose)
            this.setLabelInfo("score", itemNode, {color: player.win_lose > 0 ? this.winColor : this.loseColor})
            this.setSpriteFrame("gerendefendi", itemNode, player.win_lose > 0 ? this.winBg : this.loseBg)

            if(player.openid == User.OpenID){
                this.setLabelInfo("name", itemNode, {color: this.winColor})
            }

            if(player.labels){
                for(let v of player.labels){
                    if(v.indexOf("owner") >= 0){
                        this.setActive("spt_owner", itemNode, true)
                    }
                }
            }

            UserSrv.GetPlyDetail(player.openid, (res)=>{
                if(cc.isValid(this.node) && res && res.avatar){
                    this.setSpriteFrame("head/icon", itemNode, res.avatar)
                    let userName = res.userName
                    this.setLabelValue("name", itemNode, userName.length > 4 ? userName.substr(0, 4) + "..." : userName)
                    let txk = this.getNode("touxiangkuang", itemNode)
                    if(txk){
                        PlatformApi.setHeadVipTxk(txk, UserSrv.getQpVipLevel(res))
                    }
                }
            })
        }
    }   

}
