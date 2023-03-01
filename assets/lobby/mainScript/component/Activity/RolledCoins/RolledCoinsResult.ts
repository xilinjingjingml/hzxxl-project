import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv, RolledCoinsSrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { ShopSvr } from "../../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../../start/script/system/UserSrv";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RolledCoinsResult extends BaseUI {
    countDownTimer = null
    countDownNum = 3*60+1
    configData = null
    isPay = false
    onOpen(): void {
        console.log("RolledCoinsResult", this.param)
        this.initButton()                  
        this.initData()   
        this.initEvent()     
    }

    protected start(): void {
    }

    onDestroy(): void {
        RolledCoinsSrv.SendResult(this.isPay)
        this.stopTimer()
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{            
            this.close()
        })

        this.setButtonClick("node/btnCancel", this.node, ()=>{               
            this.close()
        })
        
        this.setButtonClick("node/btnConfirm", this.node, ()=>{              
            this.onPressBuy()
        })
    }

    initEvent() {
        
    }

    initData(){   
        let curBox:IShopInfo = this.param.curBox
        this.setLabelValue("node/zhe", curBox.param.discount)
        this.setLabelValue("node/btnConfirm/Background/yj", curBox.param.price/100 + "元")
        this.setLabelValue("node/btnConfirm/Background/Label", curBox.price/100 + "元")
        for(let k in curBox.items){
            this.setLabelValue("node/num", Helper.FormatNumWYCN(curBox.items[k].num))
            break
        }

        this.countDownTimer = setInterval(() => this.updateTime(), 1000)
        this.updateTime()
    }

    updateTime(){
        this.countDownNum--
        console.log("updateTime")
        if(this.countDownNum == 0){
            this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，3：购买成功
            this.close()
        }else{
            let minute = Math.trunc(this.countDownNum/60).toString().padStart(2, "0")
            let seconds = (this.countDownNum%60).toString().padStart(2, "0")
            this.setLabelValue("node/countdown", "限时购买: 00:" + minute + ":" + seconds)
        }
    }

    stopTimer(){
        if (null !== this.countDownTimer) {
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
        }
    }

    onPressBuy(){
        this.stopTimer()
        if(Helper.checkPayResult()){
            this.registPayResultEvent()
        }
        ShopSvr.Pay(this.param.curBox, (res)=>{
            if(res && res.code == 0){                
                this.isPay = true
                Helper.OpenTip("支付成功")
                UserSrv.UpdateItem(()=>{
                    this.onPaySuccess()                 
                })
            }else if(res && res.msg){
                Helper.OpenTip(res.msg)
                this.countDownTimer = setInterval(() => this.updateTime(), 1000)
            }
        })
    }

    registPayResultEvent(){
        EventMgr.once(Constants.EVENT_DEFINE.FOREGROUND, ()=>{            
            if(this.param.curBox){
                let param = {
                    box_gid: this.param.curBox.boxId
                }
                ActivitySrv.GetShopPayResult(param, (res)=>{
                    if(res && res.err && res.err.code == 200){
                        UserSrv.UpdateItem(()=>{
                            if(cc.isValid(this.node)){
                                this.onPaySuccess()
                            }
                        })
                    }
                })
            }
        }, this)
    }

    onPaySuccess(){
        let award_list = []
        for (let k in this.param.curBox.items) {
            award_list.push({
                item_id: this.param.curBox.items[k].id,
                item_num: this.param.curBox.items[k].num
            })
        }
        UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: award_list, autoOpenBox: true }}, ()=>{
            if(cc.isValid(this.node)){
                this.close()
            }
        }) 
    }
}
