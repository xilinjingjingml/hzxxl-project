/**
 * Creator by Jin on 2022.3.17
*/

import BaseUI from "../../../../start/script/base/BaseUI";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { Helper } from "../../../../start/script/system/Helper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FirstBox2 extends BaseUI {


    onLoad() {

    }

    onOpen(): void {
        this.initButton()
        this.initData()


        this.node.on(cc.Node.EventType.TOUCH_END, this.GetReward, this)
    }

    protected start(): void {
    }

    initButton() {
        this.setButtonClick("node/btnClose", this.node, () => { this.close() })

        this.setButtonClick("node/btnShare", this.node, this.GetReward.bind(this))
    }

    GetReward(){
        let param = {
            activity_id: this.param.activityConfig.activity_id
        }
        let self = this;
        ActivitySrv.GetRewardParam(param, (res) => {
            if (res && res.err_code == 1) {
                // 手动加领取次数
                let ACT = ActivitySrv.GetActivityById(1020);
                ACT.receive_num++;
                UIMgr.OpenUI("component/Shop/GetAwardEntry", {
                    index:999,
                    param: { awards: res.award_item }, closeCb: () => {
                        if(self.close){
                            self.close()
                        }
                    }
                })
            } else if (res.err_msg) {
                Helper.OpenTip(res.err_msg)
            }
        })
    }

    onClose(): void {
        EventMgr.dispatchEvent("POP_VIEW_CLOSED");
        if (this.param && this.param.checkQueue) {
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.FIRST_OPEN_QUEUE)
        }
    }

    initData() {
        let acInfo = this.param.activityConfig
        console.log("FirstBox acInfo", acInfo)

        let rewards = acInfo.weight[0].rewards
        for (let i = 0; i < rewards.length; i++) {
            let itemNode = this.getNode("node/item" + i, this.node)
            // this.setSpriteFrame("icon", itemNode, "image/common_hzxl/item_" + rewards[i].item_id)
            this.getNode("icon", itemNode).scale = 1.0
            this.setLabelValue("num", itemNode, "x" + rewards[i].min_num)
        }
    }
}
