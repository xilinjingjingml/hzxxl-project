import { PlatformApi } from "../../../start/script/api/platformApi";
import { Util } from "../../../start/script/api/utilApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { PrivateRoomSrv } from "../../../start/script/system/PrivateRoomSrv";




const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalBillDetailItemNode extends BaseUI {
    @property(cc.Color)
    winColor:cc.Color = cc.Color.BLACK
    @property(cc.Color)
    loseColor:cc.Color = cc.Color.BLACK

    param: any = null
    protected start(): void {
        this.initEvent()
        this.initButton()
    }

    setParam(param: any): void {
        this.param = param
        this.initData(param)
    }

    initEvent() {
       
    }

    initButton(){
        this.setButtonClick("btnVideo", ()=>{
            console.log("btnVideo", this.param)
            let param = {
                room_id: this.param.room_id,
                round: this.param.index
            }
            PrivateRoomSrv.GetReplay(param, (res)=>{
                if(res.err){
                    Helper.OpenTip("录像不存在")
                }else{
                    res.room_id = param.room_id                    
                    PlatformApi.joinPlayVideoGame(this.param.matchInfo.gameId, res)
                }
            })
        })
    }

    initData(data:any) {
        this.setLabelValue("index", "第"+data.index+"局")
        for(let i=0;i<data.players.length;i++){
            data.players[i].win_lose = data.players[i].win_lose || 0
            this.setLabelInfo("player"+i, {color: data.players[i].win_lose > 0 ? this.winColor : this.loseColor})
            this.setLabelValue("player"+i, data.players[i].win_lose > 0 ? "+"+data.players[i].win_lose : data.players[i].win_lose)
        }        
    }
}
