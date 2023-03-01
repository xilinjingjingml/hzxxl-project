import BaseUI from "../../../../start/script/base/BaseUI";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { TaskSrv } from "../../../../start/script/system/TaskSrv";
import { UserSrv } from "../../../../start/script/system/UserSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Broke extends BaseUI {
    isBuy = false
    onOpen() {
        console.log("Task onOpen", this.param)
        this.initButton()
        this.refreshActivityData()
        this.node.zIndex = 10
    }

    initEvent() {

    }

    protected onDestroy(): void {
        this.param.callback && this.param.callback({isBuy: this.isBuy})
    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/reward1/btnGet", ()=>{
            this.getAward(0)
        })

        this.setButtonClick("node/reward2/btnGet", ()=>{
            this.createAdOrder()
        })
    }

    refreshActivityData() {
        TaskSrv.GetTaskList((res) => {
            if (res.list) {
                this.initData(res.list)
            }
        })
    }

    initData(list: any) {
        // this.setLabelValue("node/times", "今日剩余：" + (this.param.activityConfig.day_times - this.param.activityConfig.receive_num) + "次")       
        // this.setLabelValue("node/reward1/content/num", Helper.FormatNumWY(this.param.activityConfig.weight[0].rewards[0].min_num))
        // this.setLabelValue("node/reward2/content/num", Helper.FormatNumWY(this.param.activityConfig.weight[0].rewards[0].multiple_min_num))
    }

    createAdOrder(){
        let info = this.param.activityConfig
        AdSrv.createAdOrder(info.ad_aid, null, (res: IPlayAdCallBack) => {
            if (res && res.order_no && res.order_no.length > 0) {
                AdSrv.completeAdOrder((res) => {                    
                    if (res && res.code == "00000") {
                        this.getAward(1)
                    }
                })
            }
        })
    }

    getAward(multiple) {
        if(cc.isValid(this.node)){
            let param = {
                activity_id: this.param.activityConfig.activity_id,
                multiple: multiple
            }
            if(cc.isValid(this.node)){
                ActivitySrv.GetRewardParam(param, (res) => {
                    if (res && res.err_code == 1) {                
                        UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res.award_item }, closeCb:()=>{
                            this.isBuy = true
                            this.close()
                        }})
                    } else if (res.err_msg) {
                        Helper.OpenTip(res.err_msg)
                    }          
                })
            }
        }
    }
}
