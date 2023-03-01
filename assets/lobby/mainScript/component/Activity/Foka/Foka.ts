import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { User } from "../../../../start/script/data/User";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { MatchSvr } from "../../../../start/script/system/MatchSvr";
import { UserSrv } from "../../../../start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Foka extends BaseUI {
    @property(cc.Node)
    item1:cc.Node = null
    @property(cc.Node)
    item2:cc.Node = null
    @property(cc.Node)
    item3:cc.Node = null
    @property(cc.Node)
    tipNode:cc.Node = null
    @property(cc.Node)
    countDownNode:cc.Node = null

    curNode = null
    itemNodeList: cc.Node[] = []

    activityInfo = null

    countDownTimer = null
    countDownNum = 10
    receiveLock = true

    rewardList: any[] = []  //显示未领取的奖励内容

    isGetAward = false

    protected start(): void {
        this.itemNodeList.push(this.item1)
        this.itemNodeList.push(this.item2)
        this.itemNodeList.push(this.item3)
        this.setActive("back", this.item1, true)
        this.setActive("show", this.item1, false)
        this.setActive("back", this.item2, true)
        this.setActive("show", this.item2, false)
        this.setActive("back", this.item3, true)
        this.setActive("show", this.item3, false)
        this.tipNode.active = false
        this.initData()
        this.initEvent()
        this.initButton()

        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.SHOW_BANNER, {adArea: 2})

        Helper.reportEvent("弹出活动，福卡")
    }

    onDestroy(): void {
        this.stopTimer()
        EventMgr.dispatchEvent(Constants.EVENT_DEFINE.HIDE_BANNER)
        Helper.reportEvent("关闭活动，福卡")

        
        this.isGetAward && this.param && this.param.callback && this.param.callback({ret:3, activity_id: this.activityInfo.activity_id})
    }

    onClose(): void {
    }

    stopTimer(){
        if (null !== this.countDownTimer) {
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
        }
    }

    initEvent() {
        
    }

    initButton() {
        this.setButtonClick("node/btnClose", () => {            
            this.close()
        })

        this.setButtonClick("back/btn", this.item1, ()=>{
            if(!this.receiveLock){
                this.receiveLock = true
                this.onPressGet(this.item1)
            }
        })
        this.setButtonClick("back/btn", this.item2, ()=>{
            if(!this.receiveLock){
                this.receiveLock = true
                this.onPressGet(this.item2)
            }
        })
        this.setButtonClick("back/btn", this.item3, ()=>{
            if(!this.receiveLock){
                this.receiveLock = true
                this.onPressGet(this.item3)
            }
        })
    }

    initData() {
        this.activityInfo = ActivitySrv.GetActivityById(1025)
        console.log("Foka", this.activityInfo)
        this.receiveLock = true
        if(this.activityInfo){
            let lastAwardAt = 0
            if (this.activityInfo.player_data) {
                try {
                    let obj = Helper.ParseJson(this.activityInfo.player_data, "foka")
                    lastAwardAt = obj.award_at
                } catch { }
            }
            if(this.activityInfo.total_receive_num <= 2){
                this.setItemContent(this.activityInfo.fix_weight[this.activityInfo.total_receive_num].weight)
            }else{
                this.setItemContent(this.activityInfo.weight)
            }                
            cc.tween(this.node)
                .delay(1)
                .call(()=>{
                    this.closeItemAni(this.item1)
                    this.closeItemAni(this.item2)
                    this.closeItemAni(this.item3)
                })
                .delay(1.3)
                .call(()=>{
                    this.receiveLock = false
                    if(!Helper.isAudit("")){
                        this.tipNode.active = true
                    }
                    this.countDownTimer = setInterval(() => this.updateTime(), 1000)
                })
                .start()            
        }else{
            Helper.OpenTip("活动获取失败")
            this.close()
        }
    }

    updateTime(){
        this.countDownNum--
        console.log("updateTime")
        if(this.countDownNum == 0){
            this.param.callback && this.param.callback({})
            this.close()
        }else{
            let minute = Math.trunc(this.countDownNum/60).toString().padStart(2, "0")
            let seconds = (this.countDownNum%60).toString().padStart(2, "0")
            this.setLabelValue("node/countdown/num", "（" + minute + ":" + seconds+"）")
        }
    }

    setItemContent(weight){
        if(weight && weight.length > 0){
            for(let i=0; i<weight.length; i++){
                this.setLabelValue("node/content/item"+(i+1)+"/show/num", weight[i].rewards[0].min_num)            
                this.setActive("node/content/item"+(i+1)+"/back", false)
                this.setActive("node/content/item"+(i+1)+"/show", true)

                weight[i].weight = weight[i].weight || 0
                if(weight[i].weight == 0){
                    this.rewardList.push(weight[i].rewards[0])
                }
            }
        }
    }

    closeItemAni(item: cc.Node){
        if(this.getNode("show", item).active == true){
            cc.tween(item)
                .to(0.2, {scaleX:0})
                .call(()=>{
                    this.setActive("back", item, true)
                    this.setActive("show", item, false)
                })
                .to(0.2, {scaleX:1})
                .to(0.4, {x: 0})
                .delay(0.1)
                .to(0.4, {x: -item.getPosition().x})
                .start()
        }else{
            cc.tween(item)
                .to(0.4, {x: -item.getPosition().x})
                .start()
        }
    }

    openItemAni(item: cc.Node){
        item.zIndex = 1
        let mask = this.getNode("node/content/mask")
        cc.tween(mask)
            .to(0.5, {opacity: 150})
            .start()
        // this.setActive("node/content/mask", true)
        let fanpai_ani_guang = this.getNode("node/content/fanpai_ani_guang")
        let fanpai_ani = this.getNode("node/content/fanpai_ani")
        let RedPacketRain = this.getNode("node/RedPacketRain")
        
        fanpai_ani_guang.setPosition(item.getPosition())
        fanpai_ani.setPosition(item.getPosition())
        fanpai_ani_guang.zIndex = 1
        RedPacketRain.zIndex = 1
        
        fanpai_ani.active = true

        cc.tween(item)
            .to(0.1,{angle: -5})
            .to(0.1,{angle: 10})
            .to(0.1,{angle: -10})
            .to(0.1,{angle: 10})
            .to(0.1,{angle: -10})
            .to(0.1,{angle: 0})
            .to(0.2, {scaleX:0})
            .call(()=>{
                this.setActive("back", item, false)
                this.setActive("show", item, true)
                let show = cc.find("show", item)
                show.scale = 1.15
                fanpai_ani_guang.active = true
                RedPacketRain.active = true
            })
            .to(0.2, {scaleX:1})
            .delay(0.1)
            .start();
    }

    onItemClick(item: cc.Node){
        let tip = cc.find("back/tip", item)
        if(tip){
            tip.active = false
        }
        this.openItemAni(item)
    }

    onPressGet(item: cc.Node) {
        this.curNode = item
        this.tipNode.active = false
        this.countDownNode.active = false
        this.stopTimer()
        if(this.activityInfo){
            if(this.activityInfo.total_receive_num == 0){
                this.getAward(item)
            }else{
                AdSrv.createAdOrder(this.activityInfo.ad_aid, null, (res: IPlayAdCallBack) => {
                    if (res && res.order_no && res.order_no.length > 0) {
                        AdSrv.completeAdOrder((res) => {
                            if (res && res.code == "00000") {
                                this.getAward(item)
                            }
                        })
                    }else{
                        this.receiveLock = false
                    }
                })
            }
        }

        Helper.reportEvent("点击福卡领取")
    }

    getAward(item: cc.Node) {
        MatchSvr.getStatisticsMetrics(null, (res)=>{            
            if(cc.isValid(this.node)){
                let param = {
                    activity_id: this.activityInfo.activity_id,
                    player_data: JSON.stringify({award_at: res.total_count})
                }
                ActivitySrv.GetRewardParam(param, (res) => {
                    if (cc.isValid(this.node) && res.award_item && res.err_code == 1) {
                        UserSrv.UpdateItem()
                        this.setLabelValue("show/num", this.curNode, res.award_item[0].item_num)
                        this.openItemAni(item)
                        if(this.rewardList.length == 0){
                            for(let v of this.activityInfo.weight){
                                if(v.rewards[0].min_num != res.award_item[0].item_num){
                                    this.rewardList.push(v.rewards[0])
                                }
                            }
                        }
                        if(this.rewardList.length == 2){
                            for(let v of this.itemNodeList){
                                if(v != this.curNode){
                                    let num = this.rewardList[this.rewardList.length-1].min_num
                                    if(this.rewardList[this.rewardList.length-1].max_num > num){
                                        num += Math.floor(Math.random() * (this.rewardList[this.rewardList.length-1].max_num - this.rewardList[this.rewardList.length-1].min_num))
                                    }
                                    this.setLabelValue("show/num", v, num)
                                    this.rewardList.pop()
                                    cc.tween(v)
                                        .delay(1.5)
                                        .to(0.2, {scaleX:0})
                                        .call(()=>{
                                            this.setActive("back", v, false)
                                            this.setActive("show", v, true)
                                        })
                                        .to(0.2, {scaleX:1})
                                        .start();
                                }
                            }
                        }
                        cc.tween(this.node)
                            .delay(5)
                            .call(()=>{
                                this.close()
                            })
                            .start()

                        this.isGetAward = true
                    }
                })
            }            
        })        
    }
}
