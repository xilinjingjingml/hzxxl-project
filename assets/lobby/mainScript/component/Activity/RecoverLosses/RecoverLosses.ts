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
export default class RecoverLosses extends BaseUI {
    countDownTimer = null
    countDownNum = 30
    curBox:IShopInfo = null
    getAwardList = []
    needReportEvent = false
    onOpen(): void {
        console.log("RecoverLosses", this.param)
        this.initButton()
        this.initData()
        this.initEvent()
    }

    protected onDestroy(): void {        
        this.stopTimer() 
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.FOREGROUND, ()=>{
            this.checkPayResult()
        }, this)
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{  
            this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，3：购买成功       
            if(this.needReportEvent){
                Helper.reportEvent("弹出活动，付费找回损失 主动关闭弹窗")
            }   
            this.close()
        })

        this.setButtonClick("node/btnGet", this.node, ()=>{            
            this.onPressGet()
        })

        this.setButtonClick("node/btnBuy", this.node, ()=>{            
            this.onPressBuy()
        })
    }

    initData(){
        let award = this.param.activity.awards[0]
        this.setLabelValue("node/countdown", this.countDownNum+"s")
        this.countDownTimer = setInterval(() => this.updateTime(), 1000)
        this.setLabelValue("node/content/item0/num", Helper.FormatNumWYCN(award.item_num))
        this.setLabelValue("node/times/num", this.param.activity.day_times - this.param.activity.receive_num)

        if(this.param.type == 2){            
            let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if(boxs){
                for(let k in boxs[Constants.SHOP_TYPE.NORMAL]){
                    let param = boxs[Constants.SHOP_TYPE.NORMAL][k].param
                    if(param && param.show_in_recover_losses == 1 && award.item_id == param.lose_item.id && award.item_num > param.lose_item.min && award.item_num < param.lose_item.max){
                        this.curBox = boxs[Constants.SHOP_TYPE.NORMAL][k]
                        break
                    }
                }

                if(this.curBox){
                    this.setActive("node/btnGet", false)
                    this.setActive("node/content/item1", true)
                    this.setActive("node/btnBuy", true)
                    this.setLabelValue("node/content/item1/num", Helper.FormatNumWYCN(this.curBox.items[award.item_id].num))
                    this.setLabelValue("node/btnBuy/Background/Label", "￥" + this.curBox.price/100)

                    let key = Constants.DATA_DEFINE.SHOW_ACTIVITY_COUNT + "-" + this.param.activity.activity_id
                    let count:number = DataMgr.getData(key) || 0
                    if(count==0){
                        this.needReportEvent = true
                        Helper.reportEvent("弹出活动，付费找回损失 第"+User.PlayGame+"局")
                    }
                    DataMgr.setData(key, ++count, true)
                }
            }else{
                this.param.callback && this.param.callback({ret:1})
            }
        }
    }

    updateTime(){
        if(cc.isValid(this.node)){
            this.countDownNum--
            if(this.countDownNum == 0){
                this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，3：购买成功
                if(this.needReportEvent){
                    Helper.reportEvent("弹出活动，付费找回损失 倒计时结束关闭弹窗")
                }
                this.close()
            }else{
                this.setLabelValue("node/countdown", this.countDownNum+"s")
            }
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

    onPressBuy(){
        this.stopTimer()
        ShopSvr.Pay(this.curBox, (res)=>{
            if(cc.sys.WECHAT_GAME === cc.sys.platform && cc.sys.os == cc.sys.OS_IOS){
            }else{
                if(res && res.code == 0){
                    Helper.OpenTip("支付成功")
                    UserSrv.UpdateItem(()=>{
                        // if(this.curBox){
                        //     for (let k in this.curBox.items) {
                        //         this.getAwardList.push({
                        //             item_id: this.curBox.items[k].id,
                        //             item_num: this.curBox.items[k].num
                        //         })
                        //     }
                        //     this.getActivityAward()
                        // }
                    })
                }else if(res && res.msg){
                    Helper.OpenTip(res.msg)
                }
            }
        })
    }

    getActivityAward(){
        if(cc.isValid(this.node)){
            let param = {
                activity_id: this.param.activity.activity_id
            }
            ActivitySrv.GetDelayReward(param, (res) => {
                if(cc.isValid(this.node) && res.award_item && res.award_item.length > 0){
                    for (let v of res.award_item) {
                        this.getAwardList.push({
                            item_id: v.item_id,
                            item_num: v.item_num
                        })
                    }            
                    UIMgr.OpenUI("component/Shop/GetAwardEntry", {param: { awards: this.getAwardList, autoOpenBox: true }, closeCb: ()=>{
                        this.param && this.param.callback && this.param.callback({ret:3, activity_id: this.param.activity.activity_id})
                        this.close()
                    }})
                }
            }) 
        }
    }

    checkPayResult(){
        if(this.curBox){
            let param = {
                box_gid: this.curBox.boxId
            }
            ActivitySrv.GetShopPayResult(param, (res)=>{
                if(res && res.err && res.err.code == 200){
                    if(this.needReportEvent){
                        let os = "Android"
                        if(cc.sys.os == cc.sys.OS_IOS){
                            os = "Ios"
                        }
                        Helper.reportEvent("弹出活动，付费找回损失 " + os + "支付成功")
                    }
                    UserSrv.UpdateItem(()=>{                    
                        UIMgr.OpenUI("component/Shop/GetAwardEntry", {param: { awards: res.award_item, autoOpenBox: true }, closeCb: ()=>{
                            this.param.callback && this.param.callback({ret:3, activity_id: this.param.activity.activity_id})
                            this.close()
                        }})
                    })
                }
            })
        }
    }    
}
