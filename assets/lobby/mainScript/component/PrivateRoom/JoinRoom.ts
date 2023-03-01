import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { User } from "../../../start/script/data/User";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";


const INVITECODE_LENGHT = 6

const { ccclass, property } = cc._decorator;

@ccclass
export default class JoinRoom extends BaseUI {
    @property(cc.Node)
    tipNode:cc.Node = null
    @property(cc.Label)
    roomIdNode:cc.Label = null

    invitecode:string = ""

    start() {
        this.roomIdNode.string = ""
        this.initData()
        this.initEvent()
        this.initButton()
    }

    initEvent() {
       
    }

    initButton(){
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })
    }

    initData() {
    }   

    onPressClear(event: Event, customEventData: string) {
        this.invitecode = ""
        this.refreshCode()
    }

    onPressDel(event: Event, customEventData: string) {
        this.invitecode = this.invitecode.substring(0,this.invitecode.length-1)
        this.refreshCode()
    }
    
    onPressNum(event: Event, customEventData: string) {        
        // console.log("onPressNum event", event)
        console.log("onPressNum customEventData", customEventData)
        if(this.invitecode.length == INVITECODE_LENGHT){
            this.invitecode = this.invitecode.substring(0,this.invitecode.length-1)
        }
        this.invitecode += customEventData
        this.refreshCode()
    }

    refreshCode(){
        let codeArray = this.invitecode.split("")
        let text = ""
        for(let i=0; i<codeArray.length; i++){
            text += codeArray[i] + "  "
        }
        this.roomIdNode.string = text
        this.tipNode.active = this.invitecode.length == 0

        if(this.invitecode.length == INVITECODE_LENGHT){
            console.log("refreshCode", this.invitecode)
            MatchSvr.getRoomInfo({share_code:this.invitecode}, (res)=>{
                if(res.room){
                    PlatformApi.joinPrivateGame(res.room)
                }else{
                    Helper.OpenTip("房间不存在")
                }
            })
        }
    }
}
