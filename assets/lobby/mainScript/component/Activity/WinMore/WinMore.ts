import BaseUI from "../../../../start/script/base/BaseUI";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WinMore extends BaseUI {
    countDownTimer = null
    countDownNum = 30
    getAwardList = []
    onOpen(): void {
        console.log("WinMore", this.param)
        this.initButton()
        this.initData()
    }

    onDestroy(): void {
        this.stopTimer()
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{  
            this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，3：购买成功          
            this.close()
        })

        this.setButtonClick("node/btnGet", this.node, ()=>{            
            this.onPressGet()
        })
    }

    initData(){
        let award = this.param.activity.awards[0]
        this.setLabelValue("node/countdown", this.countDownNum+"s")
        this.countDownTimer = setInterval(() => this.updateTime(), 1000)
        this.setLabelValue("node/content/num", Helper.FormatNumWY(award.item_num))
        this.setLabelValue("node/times/num", this.param.activity.day_times - this.param.activity.receive_num)        
    }

    updateTime(){
        this.countDownNum--
        if(this.countDownNum == 0){
            this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，3：购买成功
            this.close()
        }else{
            this.setLabelValue("node/countdown", this.countDownNum+"s")
        }
    }

    stopTimer(){
        if (null !== this.countDownTimer) {
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
        }
    }

    onPressGet(){
        this.stopTimer()
        AdSrv.startAdOrder(this.param.activity.ad_aid, null, (res) => {
            if (res.ret == 1) {
                this.getActivityAward()
            }else{
                this.countDownTimer = setInterval(() => this.updateTime(), 1000)
            }
        })
    }    

    getActivityAward(){
        let param = {
            activity_id: this.param.activity.activity_id
        }
        ActivitySrv.GetDelayReward(param, (res) => {
            for (let v of res.award_item) {
                this.getAwardList.push({
                    item_id: v.item_id,
                    item_num: v.item_num
                })
            }            
            UIMgr.OpenUI("component/Shop/GetAwardEntry", {param: { awards: this.getAwardList, autoOpenBox: true }, closeCb: ()=>{
                this.param.callback && this.param.callback({ret:3})
                this.close()
            }})
        }) 
    }
}
