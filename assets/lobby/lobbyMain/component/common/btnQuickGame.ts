import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class btnQuickGame extends BaseUI {
    curMatch:IMatchInfo = null
    lowerMatch:IMatchInfo = null
    label:string = Constants.GAME_TYPE_LABLE.MAJIONG_HZXL
    protected start(): void {
        this.initData()
        this.initEvent()
        this.initButton()
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.UPDATE_USER_ITEM, this.initData, this)  
    }

    initButton(){
        this.setButtonClick(this.node, ()=>{
            this.onPressQuickGame()
        })
    }

    initData() {
        let list = MatchSvr.getMatchList(this.label)

        this.lowerMatch = list[0]
        console.log("btnQuickGame initData", list)

        for(let v of list){
            let matchInfo = v
            if(matchInfo.metadata && matchInfo.metadata.gs_properties){
                let gs_properties = matchInfo.metadata.gs_properties                
                gs_properties.item_limit.max = gs_properties.item_limit.max || 0                
                let userItem = User.Items[gs_properties.settle_item]
                if(userItem && userItem.num >= gs_properties.item_limit.min && 
                    (gs_properties.item_limit.max == 0 || (gs_properties.item_limit.max > 0 && userItem.num <= gs_properties.item_limit.max))){
                        this.curMatch = matchInfo
                }                
            }
        }
        if(this.curMatch){
            this.setLabelValue("Background/label", this.curMatch.name)
        }else if(this.lowerMatch){
            this.setLabelValue("Background/label", this.lowerMatch.name)
        }
    }

    setParam(param: any){
        console.log("btnQuickGame setParam", param)
        this.label = param.label
        this.param = param
        this.curMatch = null
        this.lowerMatch = null
        this.initData()
    }

    onPressQuickGame() {
        console.log("onPressQuickGame")        
        MatchSvr.checkRealTimeMatch((res)=>{
            if(null === res){
                if(this.curMatch){
                    PlatformApi.enterGame(this.curMatch)
                    if(this.param && this.param.callback){
                        this.param.callback({ret:1})
                    }
                }else if(this.lowerMatch){
                    let gs_properties = this.lowerMatch.metadata.gs_properties
                    if(gs_properties){
                        if(gs_properties.settle_item == Constants.ITEM_INDEX.GAME_BEAN){
                            UIMgr.OpenUI("component/Shop/ExchangeBean", { single: true, param: {matchInfo: this.lowerMatch} })
                        }else{
                            Helper.checkLackMoney(gs_properties.item_limit.min, (res)=>{
                                if(res.isBuy){
                                    this.onPressQuickGame()
                                }else{                                
                                    Helper.checkBroke(gs_properties.item_limit.min, (res)=>{
                                        if(res.isBuy){
                                            this.onPressQuickGame()
                                        }
                                    })                                
                                }
                            })
                        }
                    }
                }
            }
        })
    }
}
