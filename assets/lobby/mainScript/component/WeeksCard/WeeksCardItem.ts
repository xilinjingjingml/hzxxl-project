import { Match } from "../../../start/script/api/matchApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { MemberSrv } from "../../../start/script/system/MemberSrv";
import { ShopSvr } from "../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";


const { ccclass, property } = cc._decorator;

interface IEventData {
    func: Function
    target: any
}

@ccclass
export default class WeeksCardItem extends BaseUI {    
    boxInfo:IShopInfo = null
    countDownTimer = null

    onLoad(){
    }

    setParam(param: any): void {
        console.log("WeeksCardItem param", param)
        this.boxInfo = param
        if(this.boxInfo){
            this.initButton()
            this.initEvent()
            this.initData()
        }
    }

    protected start(): void {
    }

    protected onDestroy(): void {   
        super.onDestroy()     
        this.stopTimer() 
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.UPDATE_VIP_CARD, ()=>{
            console.log("WeeksCardItem UPDATE_VIP_CARD")
            let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if (boxs) {
                for (let k in boxs[Constants.SHOP_TYPE.MONTH_CARD]) {
                    let box = boxs[Constants.SHOP_TYPE.MONTH_CARD][k]
                    console.log("WeeksCard box", box)
                    if(box.boxId == this.boxInfo.boxId){
                        this.boxInfo = box
                        this.initData()
                    }
                }
            }
        }, this)
    }

    initButton() {
        this.setButtonClick("btnXuFei", ()=>{
            this.onPressBox(this.boxInfo)
        })

        this.setButtonClick("btnBuy", ()=>{
            this.onPressBox(this.boxInfo)
        })

        this.setButtonClick("btnGetAward", ()=>{
            let award_list = []
            for (let v of this.boxInfo.days_item) {
                award_list.push({
                    item_id: v.id,
                    item_num: v.num
                })
            }
            MemberSrv.getMemberAward({card_id:this.boxInfo.param.card_id}, (res)=>{
                if (res && res.code == "00000") {
                    if(cc.isValid(this.node)){
                        this.setActive("btnGetAward", false)
                        this.setActive("btnBeReceive", true)
                    }
                    UserSrv.UpdateItem(() => {                                    
                        UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: award_list, member: 1 }, }, null)                                    
                    })
                }
            })
        })
    }

    stopTimer(){
        if (null !== this.countDownTimer) {
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
        }
    }

    initData() {
        console.log("this.boxInfo", this.boxInfo)
        console.log("User.RegTime", User.RegTime)
        let nowTime = new Date().getTime()/1000        
        let newbie = (nowTime-User.RegTime) < (48*60*60) ? 1 : 0    
        
        let box = this.boxInfo
        this.setLabelValue("originalPrice", box.param.tip)
        this.setLabelValue("btnXuFei/Background/Label", (box.price/100) + "元续费")
        this.setLabelValue("btnBuy/Background/Label", (box.price/100) + "元开通")
        for(let k in box.items){
            this.setLabelValue("szd/content/num", Helper.FormatNumWY(box.items[k].num))
        }
        for(let v of box.days_item){
            if(v.id == Constants.ITEM_INDEX.FreeCard){
                let awardNode = this.getNode("awards/award2")
                this.setLabelValue("text", awardNode, Helper.FormatNumWYCN(v.num)+"张/天")
            }else if(v.id == Constants.ITEM_INDEX.MJ_DOUBLE_CARD){
                let awardNode = this.getNode("awards/award3")
                this.setLabelValue("text", awardNode, Helper.FormatNumWYCN(v.num)+"张/天")
            }else{
                let awardNode = this.getNode("awards/award1")
                this.setLabelValue("text", awardNode, Helper.FormatNumWYCN(v.num)+"/天")
            }
        }

        let isBuy = false                    
        let vipCardInfo = MemberSrv.getMemberInfo()
        for(let v of vipCardInfo){
            if(v.card_id == box.param.card_id){
                console.log("vipCardInfo", v)
                if(v.invalid_date > nowTime){
                    isBuy = true
                    let t = v.invalid_date - nowTime
                    let leftDay = Math.ceil(t/60/60/24)
                    this.setLabelValue("tip", "已激活，剩余"+leftDay+"天")
                    
                    let today = Number(Helper.FormatTimeString(new Date().getTime(), "yyyyMMdd"))
                    if(today == v.receive_date){
                        this.setActive("btnGetAward", false)
                        this.setActive("btnBeReceive", true)
                    }else{
                        this.setActive("btnGetAward", true)
                    }
                }
                break
            }
        }
        this.setActive("btnXuFei", isBuy)
        this.setActive("btnBuy", !isBuy)
        this.setActive("originalPrice", !isBuy) 

        if(box.param.card_id == Constants.ITEM_INDEX.MemberCard){ 
            if(!isBuy && newbie==1){
                this.setActive("preferential", true)
                let time = (48*60*60)-(nowTime-User.RegTime)
                this.setLabelValue("preferential/Label", "新人专享半价优惠，剩余"+Helper.FormatCountdownTime(time))
                this.countDownTimer = setInterval(() => {
                    time--
                    if(time<0){
                        time=0
                        this.stopTimer()
                    }
                    this.setLabelValue("preferential/Label", "新人专享半价优惠，剩余"+Helper.FormatCountdownTime(time))
                }, 1000)
            }else{
                this.setActive("preferential", false)
            }
        }
    }

    onPressBox(box){
        console.log("jin---onPressBox", box)
        if(Helper.checkPayResult()){
            this.registPayResultEvent()
        }
        ShopSvr.Pay(box, (res)=>{
            if(res && res.code == 0){
                Helper.OpenTip("支付成功")  
                UserSrv.UpdateItem()              
                this.onPaySuccess(box)                
            }else if(res && res.msg){
                Helper.OpenTip(res.msg)
            }
        })
    }

    registPayResultEvent(){
        EventMgr.once(Constants.EVENT_DEFINE.FOREGROUND, ()=>{            
            if(cc.isValid(this.node) && this.boxInfo){
                let param = {
                    box_gid: this.boxInfo.boxId
                }
                ActivitySrv.GetShopPayResult(param, (res)=>{
                    if(res && res.err && res.err.code == 200){
                        UserSrv.UpdateItem(()=>{                    
                            this.onPaySuccess(this.boxInfo)
                        })
                    }
                })
            }
        }, this)
    }

    onPaySuccess(box){
        if(box){
            if(cc.isValid(this.node)){
                if(this.getNode("btnBuy").active){
                    this.setActive("btnGetAward", true)
                }
                this.setActive("btnBuy", false)
                this.setActive("preferential", false)
                this.setActive("btnXuFei", true)
            }
        
            let award_list = []
            for (let k in box.items) {
                if(box.items[k].id != Constants.ITEM_INDEX.MemberCard && box.items[k].id != Constants.ITEM_INDEX.SupreMemberCard){
                    award_list.push({
                        item_id: box.items[k].id,
                        item_num: box.items[k].num
                    })
                }
            }
            UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: award_list, autoOpenBox: true } })
            ShopSvr.initShop()
        }
    }
}
