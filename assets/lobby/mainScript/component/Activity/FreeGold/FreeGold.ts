import BaseUI from "../../../../start/script/base/BaseUI";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { UserSrv } from "../../../../start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FreeGold extends BaseUI {
    activityInfo = null
    onOpen() {
        this.initData()
        this.initEvent()
        this.initButton()
    }

    onClose(): void {
        this.param.checkQueue && EventMgr.dispatchEvent(Constants.EVENT_DEFINE.FIRST_OPEN_QUEUE)
    }

    initEvent() {
        
    }

    initButton() {
        this.setButtonClick("node/btnClose", () => {            
            this.close()
        })

        this.setButtonClick("node/btnGet", ()=>{
            this.onPressGet()
        })
    }

    initData() {
        this.activityInfo = ActivitySrv.GetActivityById(3)
        if(this.activityInfo){
            this.setLabelValue("node/times/num", " " + (this.activityInfo.day_times - this.activityInfo.receive_num) + " ")
        }
    }

    onPressGet() {
        if(this.activityInfo){
            AdSrv.createAdOrder(this.activityInfo.ad_aid, JSON.stringify(this.activityInfo), (res: IPlayAdCallBack) => {
                if (res && res.order_no && res.order_no.length > 0) {
                    AdSrv.completeAdOrder((res) => {
                        if (res && res.code == "00000") {
                            if (res.award_list) {
                                let res1 = Helper.ParseJson(res.award_list, "clickActivity")
                                if (res1 && res1.err_code == 1) {
                                    UserSrv.UpdateItem(() => UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res1.award_item } }))
                                }
                            }
                            if(cc.isValid(this.node)){
                                ActivitySrv.GetActivityConfig(this.activityInfo.activity_id, (res)=>{                                
                                    this.close()
                                })
                            }
                        }
                    })
                }
            })
        }
    }
}
