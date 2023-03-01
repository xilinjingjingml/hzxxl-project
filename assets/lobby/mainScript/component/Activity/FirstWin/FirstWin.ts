/**
 * Creator by Jin on 2022.3.17
*/

import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ESocialResult } from "../../../../start/script/pulgin/IPluginProxy";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { Helper } from "../../../../start/script/system/Helper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FirstWin extends BaseUI {
    onOpen(): void {
        console.log("FirstWin onOpen")
    }

    protected start(): void {
        console.log("FirstWin start")
        this.initButton()
        this.initData()
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{
            console.log("FirstWin btnClose onClick")
            this.close()
        })

        this.setButtonClick("node/btnShare", this.node, ()=>{
            console.log("FirstWin btnShare onClick")
            // Helper.shareInfo((res) => {
            //     if (res.ShareResultCode == ESocialResult.SHARERESULT_SUCCESS) {
                    let param = {
                        activity_id: this.param.activityConfig.activity_id
                    }
                    ActivitySrv.GetRewardParam(param, (res) => {
                        if (res && res.err_code == 1) {                
                            UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res.award_item }, closeCb:()=>{
                                this.close()
                            }})
                        } else if (res.err_msg) {
                            Helper.OpenTip(res.err_msg)
                        }          
                    })
                // }
            // })
        })


        
    }

    onClose(): void {
        
    }

    initData(){
        let acInfo = this.param.activityConfig
        console.log("FirstBox acInfo", acInfo)
        let rewards = acInfo.weight[0].rewards
        for(let i=0;i<rewards.length;i++){
            let itemNode = this.getNode("node/item"+i, this.node)
            if(rewards[i].item_id == DataMgr.data.Config.mainItemId){
                this.setSpriteFrame("icon", itemNode, "component/Activity/FirstWin/images/jb")
                this.getNode("icon", itemNode).scale = 1.0
            }else if(rewards[i].item_id == Constants.ITEM_INDEX.GAME_DIAMOND){
                this.setSpriteFrame("icon", itemNode, "component/Activity/FirstWin/images/zs")
                this.getNode("icon", itemNode).scale = 0.9
            }
            this.setLabelValue("num", itemNode, "x"+rewards[i].min_num)
        }
    }
}
