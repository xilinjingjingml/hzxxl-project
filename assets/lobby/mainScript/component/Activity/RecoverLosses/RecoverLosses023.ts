import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { User } from "../../../../start/script/data/User";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { ShopSvr } from "../../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../../start/script/system/UserSrv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RecoverLosses023 extends BaseUI {    
    @property(cc.Node)
    lossNum: cc.Node = null

    countDownTimer = null
    countDownNum = 30

    protected start(): void {
        console.log("RecoverLosses", this.param)
        this.setActive("node/expend", false)

        this.initButton()
        this.initData()
        this.initEvent()
    }

    protected onDestroy(): void {        
        this.stopTimer() 
    }

    initEvent() {
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{  
            this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，3：购买成功            
            this.close()
        })

        this.setButtonClick("node/btnBuy", this.node, ()=>{            
            this.onPressBuy()
        })
    }

    initData(){
        this.countDownTimer = setInterval(() => this.updateTime(), 1000)

        this.setLabelValue(this.lossNum, Helper.FormatNumWY(this.param.resultData.score))       
    }

    onPressBuy(){
        if(this.param.type == 1){
            this.stopTimer()
            AdSrv.startAdOrder(this.param.activity.ad_aid, null, (res) => {
                if(cc.isValid(this.node)){
                    if (res.ret == 1) {
                        this.getActivityAward()
                    }else{
                        this.countDownTimer = setInterval(() => this.updateTime(), 1000)
                    }
                }
            })
        } else if(this.param.type == 2){
        }
    }

    getActivityAward(){
        if(cc.isValid(this.node)){
            let param = {
                activity_id: this.param.activity.activity_id
            }
            ActivitySrv.GetDelayReward(param, (res) => {
                if(cc.isValid(this.node) && res.award_item && res.award_item.length > 0){                    
                    let getAwardList = []
                    for (let v of res.award_item) {
                        getAwardList.push({
                            item_id: v.item_id,
                            item_num: v.item_num
                        })
                    }            
                    UIMgr.OpenUI("component/Shop/GetAwardEntry", {param: { awards: getAwardList, autoOpenBox: true }, closeCb: ()=>{
                        this.param && this.param.callback && this.param.callback({ret:3, activity_id: this.param.activity.activity_id})
                        this.close()
                    }})
                }
            }) 
        }
    }

    updateTime(){
        if(cc.isValid(this.node)){
            this.countDownNum--
            if(this.countDownNum == 0){
                this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，3：购买成功
                this.close()
            }else{
                this.setLabelValue("node/btnBuy/Background/content/countdown", this.countDownNum+"s")
            }
        }
    }

    stopTimer(){
        if (null !== this.countDownTimer) {
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
        }
    }
}
