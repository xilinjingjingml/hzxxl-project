import BaseUI from "../../../../start/script/base/BaseUI";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv, VipPrivilegeSrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { TaskSrv } from "../../../../start/script/system/TaskSrv";
import { UserSrv } from "../../../../start/script/system/UserSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Broke extends BaseUI {
    @property(cc.Node)
    rewardNum: cc.Node = null

    isBuy = false
    onOpen() {
        console.log("Task onOpen", this.param)
        this.initButton()
        this.initData()
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

        this.setButtonClick("node/btnGet", ()=>{
            this.createAdOrder()
        })
    }

    initData() {
        this.setLabelValue("node/times/num", "今日领取次数" + (this.param.activityConfig.day_times - this.param.activityConfig.receive_num) + "/" + this.param.activityConfig.day_times)
        this.setLabelValue(this.rewardNum, this.param.activityConfig.weight[0].rewards[0].multiple_min_num)
        // this.setLabelValue(this.rewardNum, Helper.FormatNumWY(this.param.activityConfig.weight[0].rewards[0].min_num))
        
        VipPrivilegeSrv.GetPlayerVipPrivilege((res)=>{
            console.log("GetPlayerVipPrivilege", res)
            if(res){
                this.setLabelValue("node/tequan/level/num", res.level)
                this.setLabelValue("node/tequan/multiple/num", res.remedies_multiple)
                this.setLabelValue(this.rewardNum, this.param.activityConfig.weight[0].rewards[0].multiple_min_num*res.remedies_multiple)
                this.setLabelValue("node/times/num", "今日领取次数" + (this.param.activityConfig.day_times - this.param.activityConfig.receive_num) + "/" + res.remedies_times)
            }
        })
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
