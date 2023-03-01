/**
 * Creator by Jin on 2022.3.16
*/
import BaseUI from "../../../../start/script/base/BaseUI";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { ActivitySrv, VipPrivilegeSrv } from "../../../../start/script/system/ActivitySrv";
import { Constants } from "../../../../start/script/igsConstants";
import { Helper } from "../../../../start/script/system/Helper";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { User } from "../../../../start/script/data/User";
import { DataMgr } from "../../../../start/script/base/DataMgr";


const {ccclass, property} = cc._decorator;

@ccclass
export default class SlyderAdventures extends BaseUI {
    @property(cc.SpriteFrame)
    goldSpriteFrame: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    diamondSpriteFrame: cc.SpriteFrame = null

    @property(cc.Node)
    itemPrefab:cc.Node = null
    @property(cc.Node)
    blockUi:cc.Node = null

    @property(cc.Node)
    btnCountOver:cc.Node = null
    @property(cc.Node)
    btnFreeGet:cc.Node = null
    @property(cc.Node)
    btnAdGet:cc.Node = null

    @property(cc.Node)
    teQuanLevel:cc.Node = null    //特权等级
    @property(cc.Node)
    teQuanMultiple:cc.Node = null    //特权倍数
    @property(cc.Node)
    receiveNum:cc.Node = null    //已领取次数

    buyFristBox = true  //首充礼包是否购买
    curActivityConfig:any = null

    onOpen(): void {
        this.initData()
        this.initButton()
        this.initEvent()
    }

    protected start(): void {
        this.itemPrefab.active = false
        this.blockUi.active = false

        this.btnCountOver.active = false
        this.btnFreeGet.active = false
        this.btnAdGet.active = false
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{this.close()})
        this.setButtonClick(this.btnFreeGet, this.onPressFreeGet.bind(this))
        this.setButtonClick(this.btnAdGet, this.node, this.onPressAdGet.bind(this))

        this.setButtonClick("node/btnHelp", this.node, ()=>{
            UIMgr.OpenUI("component/Activity/SlyderAdventures/SlyderAdventuresHelp", { single: true, param: { } })
        })

        for(let i=0;i<3;i++){
            let itemNode = this.getNode("node/total/item"+i)
            if(itemNode){                
                this.setButtonClick("btn", itemNode, ()=>{
                    this.setActive("btn", itemNode, false)                    
                    let activityConfig = ActivitySrv.GetActivityById(14+i)
                    if(activityConfig){
                        ActivitySrv.OnClickActivity(activityConfig)
                    }
                })                
            }
        }
    }

    initData(){
        this.curActivityConfig = ActivitySrv.GetActivityById(4)
        if(this.curActivityConfig){
            this.initRotaryTableData(this.curActivityConfig)
            this.updateRotaryTableData()
        }

        VipPrivilegeSrv.GetPlayerVipPrivilege((res)=>{
            console.log("GetPlayerVipPrivilege", res)
            if(res){
                this.setLabelValue(this.teQuanLevel, res.level)
                this.setLabelValue(this.teQuanMultiple, res.wheel_gold)
            }
        })
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, ()=>{            
            this.updateTotalData()
        }, this)
    }  

    initRotaryTableData(activityConfig:any){
        const node_table = this.getNode("node/disc/content")
        node_table.rotation = 0
        node_table.removeAllChildren()        
        console.log("activityConfig", activityConfig)
        if(activityConfig){
            //角度
            let angle = 0
            
            for(let i = 0; i < activityConfig.weight.length; i++){
                const item = cc.instantiate(this.itemPrefab)
                item.angle = angle + 45*i
                item.active = true
                item.parent = node_table
                
                //ITEM DATA
                this.setLabelValue("lbl_rewardNum", item, activityConfig.weight[i].rewards[0].min_num )
                if(activityConfig.weight[i].rewards[0].item_id == DataMgr.data.Config.mainItemId){
                    this.setSpriteFrame("icon", item, this.goldSpriteFrame, true)
                }else{
                    this.setSpriteFrame("icon", item, this.diamondSpriteFrame, true)
                }                
                item.active = true
            }
        }
    }

    updateRotaryTableData(){
        this.curActivityConfig = ActivitySrv.GetActivityById(4)
        this.updateCurCount()
        this.updateTotalData()
    }

    updateCurCount(){
        this.curActivityConfig.receive_num = this.curActivityConfig.receive_num || 0
        let day_times = this.curActivityConfig.day_times
       
        let count = day_times - this.curActivityConfig.receive_num

        this.btnCountOver.active = false
        this.btnFreeGet.active = false
        this.btnAdGet.active = false
        this.setActive("node/times", false)
        this.setLabelValue(this.receiveNum, this.curActivityConfig.receive_num)
        if(this.curActivityConfig.receive_num == 0){
            this.btnFreeGet.active = true
            this.setActive("node/times", true)
        }else if(count == 0){
            this.btnCountOver.active = true
        }else{
            this.btnAdGet.active = true
        }
    }

    onPressAdGet(){
        console.log("onPressAdGet")
        //看广告
        if (this.curActivityConfig.ad_aid && this.curActivityConfig.ad_aid > 0) {
            AdSrv.createAdOrder(this.curActivityConfig.ad_aid, JSON.stringify(this.curActivityConfig), (res: IPlayAdCallBack) => {
                if (res && res.order_no && res.order_no.length > 0) {
                    AdSrv.completeAdOrder((res) => {
                        if (cc.isValid(this.node) && res && res.code == "00000") {
                            ActivitySrv.GetActivityConfig(this.curActivityConfig.activity_id)
                            if (res.award_list) {
                                let res1 = Helper.ParseJson(res.award_list, "slyderAdventures")
                                if (res1 && res1.err_code == 1) {
                                    res1.reward_index = res1.reward_index || 0
                                    if (cc.isValid(this.node) && res1.reward_index) {                                        
                                        this.startTurnAni(res1)                                        
                                    }
                                } else if (res1.err_msg) {
                                    Helper.OpenTip(res1.err_msg)
                                } else {
                                    Helper.OpenTip("未知错误")
                                }
                            }
                        }
                    })
                } else {
                    console.log("onPressAddCount err", res)
                }
            })
        }
    }
 
    onPressFreeGet(){
        console.log("onPressFreeGet")

        let param = {
            activity_id: this.curActivityConfig.activity_id,
            delay_award: 1
        }
        ActivitySrv.GetRewardParam(param, (res) => {
            if (res && res.err_code == 1) {
                res.reward_index = res.reward_index || 0
                if(cc.isValid(this.node)){
                    this.startTurnAni(res)
                }
            } else if (res.err_msg) {
                Helper.OpenTip(res.err_msg)
            }
        })
            
    }

    startTurnAni(res: any) {
        const table = this.getNode("node/disc/content")
        let angle = 3600 + (res.reward_index * (360 / this.curActivityConfig.weight.length))
        angle = -angle
        console.log("jin---startTurnAni reward_index: ", res.reward_index)

        let param = {
            activity_id: this.curActivityConfig.activity_id
        }
        let openAward = (cb:Function)=>{
            ActivitySrv.GetDelayReward(param, () => {
                UIMgr.OpenUI("component/Shop/GetAwardEntry",
                {
                    param: { awards: res.award_item, autoOpenBox: true },
                },  () => {
                    cb && cb()
                })
            })
        }
        
        this.blockUi.active = true
        cc.tween(table)
            .to(5, { angle: angle }, { easing: "cubicInOut" })
            .set({ angle: angle % 360 })
            .delay(.2)
            .call(() => {
                openAward && openAward(()=>{                    
                    this.blockUi.active = false
                    ActivitySrv.GetActivityConfig(this.curActivityConfig.activity_id, ()=>{
                        if(cc.isValid(this.node)){
                            this.updateRotaryTableData()
                        }
                    })
                })
            })
            .start()
    }

    updateTotalData(){
        for(let i=0;i<3;i++){
            let itemNode = this.getNode("node/total/item"+i)
            if(itemNode){
                let activityConfig = ActivitySrv.GetActivityById(14+i)
                console.log("updateTotalData", activityConfig)
                if(activityConfig){
                    this.setLabelValue("num", itemNode, activityConfig.weight[0].rewards[0].min_num)
                    if(activityConfig.receive_num == 0){//未领取
                        if(this.curActivityConfig.receive_num >= (i+1)*2){//已完成
                            this.setActive("finish", itemNode, true)
                            this.setActive("btn", itemNode, true)
                        }else{//未完成
                            this.setActive("btn", itemNode, false)
                        }
                    }else{//已领取
                        this.setActive("finish", itemNode, false)
                        this.setActive("receive", itemNode, true)
                        this.setActive("btn", itemNode, false)
                    }
                }
            }
        }
    }
}
