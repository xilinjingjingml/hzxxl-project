/**
 * Creator by Jin on 2022.3.17
*/

import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { Helper } from "../../../../start/script/system/Helper";
import { ScribeSrv } from "../../../../start/script/system/ScribeSrv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutumnHarvest extends BaseUI {
    @property(cc.Node)
    itemContent:cc.Node = null
    @property(cc.Node)
    itemPrefab:cc.Node = null

    activityConfig = null

    onLoad(): void {
        this.itemPrefab.active = false
    }

    protected start(): void {
        this.initButton()
        this.initData()
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{this.close()})

        this.setButtonClick("node/btnGet", this.node, ()=>{
            ScribeSrv.checkShowScribeWeChatMsg((res)=>{
                if(cc.isValid(this.node)){
                    let param = {
                        activity_id: this.activityConfig.activity_id,
                        multiple: res.ret ? 1 : 0
                    }
                    ActivitySrv.GetRewardParam(param, (res) => {
                        if(cc.isValid(this.node)){
                            if (res && res.err_code == 1) {                
                                UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res.award_item }, closeCb:()=>{
                                    this.close()
                                }})
                            } else if (res.err_msg) {
                                Helper.OpenTip(res.err_msg)
                            }
                        }
                    })
                }
            })
        })       
    }

    onClose(): void {
        
    }

    initData(){
        this.activityConfig = ActivitySrv.GetActivityById(12)
        console.log("AutumnHarvest acInfo", this.activityConfig)
        let rewards = this.activityConfig.weight[0].rewards
        for(let i=0;i<rewards.length;i++){
            let itemNode = cc.instantiate(this.itemPrefab)
            itemNode.active = true
            itemNode.parent = this.itemContent
            if(rewards[i].item_id == DataMgr.data.Config.mainItemId){
                this.setSpriteFrame("icon", itemNode, "component/Activity/AutumnHarvest/images/jb")
                if(rewards[i].multiple_min_num && rewards[i].multiple_min_num > 0){
                    let num = rewards[i].multiple_min_num - rewards[i].min_num
                    if(num > 0){
                        this.setLabelValue("node/jiasong/content/num", num)
                    }else{
                        this.setActive("node/jiasong", false)
                    }
                }else{
                    this.setActive("node/jiasong", false)
                }
            }else if(rewards[i].item_id == Constants.ITEM_INDEX.GAME_DIAMOND){
                this.setSpriteFrame("icon", itemNode, "component/Activity/AutumnHarvest/images/zs")
            }else if(rewards[i].item_id == Constants.ITEM_INDEX.MJ_DOUBLE_CARD){
                this.setSpriteFrame("icon", itemNode, "image/common_hzxl/item_10014")
            }else if(rewards[i].item_id == Constants.ITEM_INDEX.MJ_CAPPED_CARD){
                this.setSpriteFrame("icon", itemNode, "image/common_hzxl/item_10015")
            }
            this.setLabelValue("num", itemNode, "x"+Helper.FormatNumWYCN(rewards[i].min_num))
        }
    }
}
