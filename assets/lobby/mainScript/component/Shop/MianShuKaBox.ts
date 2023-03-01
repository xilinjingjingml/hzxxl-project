import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { ExchangeSrv } from "../../../start/script/system/ExchangeSrv";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { TaskSrv } from "../../../start/script/system/TaskSrv";
import { UserSrv } from "../../../start/script/system/UserSrv";
import { ShopType } from "./ShopSceneNew";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MianShuKaBox extends BaseUI {
    exchangeData: any[] = new Array()

    protected start(): void {
        console.log("MianShuKaBox onOpen", this.param)
        this.initButton()
        this.initEvent()

        ExchangeSrv.getExchangeTemplateInfo({typeId: 1}, (res)=>{
            console.log("getExchangeTemplateInfo", res)
            if (res && res.code == "0000") {                
                    if (res.result) {
                        for(let v of res.result){
                            if(v.output_list && v.output_list[0].item_id == Constants.ITEM_INDEX.FreeCard){
                                this.exchangeData.push(v)
                            }
                        }

                        this.exchangeData.sort((a ,b)=>{
                            a.output_list[0].item_num = Number(a.output_list[0].item_num)
                            b.output_list[0].item_num = Number(b.output_list[0].item_num)
                            return a.output_list[0].item_num < b.output_list[0].item_num ? -1 : 1
                        })
                        console.log("this.exchangeData[i])", this.exchangeData)
                        this.initData()
                        this.initItemNodeButton()
                    }
                }
        })
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, ()=>{            
            this.initData()
        }, this)
    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })        
    }

    initItemNodeButton(){
        let index = 0
        for(let i=1; i<5; i++){
            let itemNode = this.getNode("node/content/item"+i)
            if(itemNode){       
                if(i == 1){                                          
                    this.setButtonClick("btn", itemNode, ()=>{
                        let activityConfig = ActivitySrv.GetActivityById(13)   
                        if(activityConfig && activityConfig.day_times > activityConfig.receive_num){
                            ActivitySrv.OnClickActivity(activityConfig)
                        }else{
                            Helper.OpenTip("今日次数用完")
                        }                        
                    })   
                }else{
                    let exData = this.exchangeData[index]
                    if(exData){
                        this.setButtonClick("btn", itemNode, ()=>{
                            this.exchangeTemplateInfo(exData)
                        })
                    }  
                    index++
                }             
            }
        }
    }

    initData(){
        let index = 0
        for(let i=1; i<5; i++){
            let itemNode = this.getNode("node/content/item"+i)
            if(itemNode){
                if(i == 1){
                    let activityConfig = ActivitySrv.GetActivityById(13)
                    console.log("activityConfig", activityConfig)
                    if(activityConfig){
                        this.setLabelValue("title/num", itemNode, "x"+activityConfig.weight[0].rewards[0].min_num)
                        this.setLabelValue("tip/num", itemNode, activityConfig.day_times-activityConfig.receive_num)
                    }else{
                        itemNode.active = false
                    }
                }else{
                    if(this.exchangeData[index]){                        
                        this.setLabelValue("title/num", itemNode, "x"+this.exchangeData[index].output_list[0].item_num)
                        this.setLabelValue("price", itemNode, "x"+this.exchangeData[index].consume_list[0].item_num)
                    }
                    index++
                }
            }
        }
    }

    exchangeTemplateInfo(box: any) {        
        Helper.exchangeTemplateInfo(box, (success) => {
        })        
    }
}
