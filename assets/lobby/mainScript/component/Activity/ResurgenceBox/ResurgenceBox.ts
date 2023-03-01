/**
 * Creator by Jin on 2022.3.15
*/
import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { ExchangeSrv } from "../../../../start/script/system/ExchangeSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { ShopSvr } from "../../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../../start/script/system/UserSrv";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ResurgenceBox extends BaseUI {
    payBox:IShopInfo = null
    shieldTimes:number = 0
    typeId = 1
    countDownTimer = null
    countDownNum = 15
    resetCountDown = false
    onOpen(): void {
        console.log("ResurgenceBox")
        this.initButton()
        this.initEvent()
        if(cc.sys.WECHAT_GAME === cc.sys.platform && cc.sys.os == cc.sys.OS_IOS){
            this.initExchangeData()
        }else{
            this.initBoxData()
        }
        this.countDownTimer = setInterval(() => this.updateTime(), 1000)
    }
    
    protected onDestroy(): void {
        super.onDestroy()
        if (null !== this.countDownTimer) {
            clearInterval(this.countDownTimer)
            this.countDownTimer = null
        }
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.FOREGROUND, ()=>{
            if(this.payBox){
                if(this.resetCountDown){
                    this.resetCountDown = false
                    this.countDownNum = 15
                }
                this.checkPayResult()
            }
        }, this)
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{
            this.param.callback && this.param.callback({ret:1})
            this.close()
        })
    }

    updateTime(){
        this.countDownNum--
        if(this.countDownNum == 0){
            this.param.callback && this.param.callback({ret:1})  //ret 1：关闭，2：支付中（90S等待），3：购买成功
            this.close()
        }else{
            this.setLabelValue("node/node_countdown/timeNum", this.countDownNum + "s")
        }
    }

    initExchangeData(){
        let param = {
            typeId: this.typeId
        }
		ExchangeSrv.getExchangeTemplateInfo(param, (res)=>{
			console.log("getExchangeTemplateInfo", res)
			let boxList = []
            if (res && res.code == "0000") {                
                if (res.result) {
					res.result.sort((a ,b)=>{
						a.output_list[0].item_num = Number(a.output_list[0].item_num)
						b.output_list[0].item_num = Number(b.output_list[0].item_num)
						return a.output_list[0].item_num < b.output_list[0].item_num ? -1 : 1
					})
					for(let v of res.result){
						if(v.output_list[0].item_id == this.param.ndItem.id && v.output_list[0].item_num >= this.param.ndItem.num){							
							boxList.push(v)
						}
					}
                    console.log("boxList=", boxList)
                    
					for(let v of boxList){
						// console.log("v.output_list[0].item_num", v.output_list[0].item_num)
					}
                    
                    this.initExchangeBoxItem(this.getNode("node/item1"), boxList[0], 1)
                    this.initExchangeBoxItem(this.getNode("node/item2"), boxList[1], 3)
                    this.initExchangeBoxItem(this.getNode("node/item3"), boxList[2], 5)
                }
            }
		})
    }

    initExchangeBoxItem(itemNode: cc.Node, info: any, shieldTimes:number){
        console.log("initExchangeBoxItem", info)
        if(info){
            this.setLabelValue("award/num", itemNode, Helper.FormatNumWY(info.output_list[0].item_num))
            this.setLabelValue("btn_get/item/lbl_num", itemNode, info.consume_list[0].item_num+"复活")
            this.setLabelValue("btn_get/lbl_original", itemNode, "原价"+info.output_list[0].item_num/10000+"钻石")
            this.setLabelValue("item2/Label", itemNode, "输钱包赔x"+shieldTimes)
            this.setButtonClick("btn_get", itemNode, ()=>{
                console.log("initBoxItem", info)
                this.countDownNum = 90
                this.param.callback && this.param.callback({ret:2})
                Helper.exchangeTemplateInfo(info, (success) => {
                    if(success){
                        Helper.reportEvent("复活礼包-钻石领取-成功-获得金币-"+Helper.FormatNumWYCN(info.output_list[0].item_num))
                        this.param && this.param.callback && this.param.callback({ret:3, shieldTimes:shieldTimes})
                        this.close()
                    }else{
                        this.countDownNum = 15
                    }
                })
            })
        }else{
            this.setActive(itemNode, false)
        }
    }

    initBoxData(){
        let boxList:IShopInfo[] = []
        let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if(boxs){
            for(let k in boxs[Constants.SHOP_TYPE.NORMAL]){
                let param = boxs[Constants.SHOP_TYPE.NORMAL][k].param
                if(param && param.show_in_resurgence_box){
                    console.log("boxs[Constants.SHOP_TYPE.NORMAL][k]", boxs[Constants.SHOP_TYPE.NORMAL][k])
                    console.log("Number(boxs[Constants.SHOP_TYPE.NORMAL][k].items[this.param.ndItem.id].num)", Number(boxs[Constants.SHOP_TYPE.NORMAL][k].items[this.param.ndItem.id].num))
                    console.log("this.param.ndItem.num", this.param.ndItem.num)
                }
                if(param && param.show_in_resurgence_box && boxs[Constants.SHOP_TYPE.NORMAL][k].items[this.param.ndItem.id] && Number(boxs[Constants.SHOP_TYPE.NORMAL][k].items[this.param.ndItem.id].num) >= this.param.ndItem.num){                
                    let box = boxs[Constants.SHOP_TYPE.NORMAL][k]
                    boxList.push(box)
                    console.log("boxList.push[param]")
                }
            }

            console.log("boxList", boxList)

            this.initBoxItem(this.getNode("node/item1"), boxList[0], 1)
            this.initBoxItem(this.getNode("node/item2"), boxList[1], 3)
            this.initBoxItem(this.getNode("node/item3"), boxList[2], 5)
        }else{
            this.param.callback && this.param.callback({ret:1})
            this.close()
        }
    }

    initBoxItem(itemNode: cc.Node, info: IShopInfo, shieldTimes:number){
        console.log("initBoxItem", info)
        if(info){
            this.setLabelValue("award/num", itemNode, Helper.FormatNumWY(info.items[this.param.ndItem.id].num))
            this.setActive("btn_get/item/icon", itemNode, false)
            this.setLabelValue("btn_get/item/lbl_num", itemNode, info.price/100+"元复活")
            this.setLabelValue("btn_get/lbl_original", itemNode, "原价"+info.items[this.param.ndItem.id].num/100000+"元")
            this.setLabelValue("item2/Label", itemNode, "输钱包赔x"+shieldTimes)
            this.setButtonClick("btn_get", itemNode, ()=>{
                console.log("initBoxItem", info)
                this.countDownNum = 90
                this.param.callback && this.param.callback({ret:2})
                this.shieldTimes = shieldTimes
                this.payBox = info
                this.resetCountDown = true
                ShopSvr.Pay(this.payBox, (res)=>{
                    if(cc.sys.WECHAT_GAME === cc.sys.platform && cc.sys.os == cc.sys.OS_IOS){
                    }else{
                        if(res && res.code == 0){
                            Helper.OpenTip("支付成功")                            
                        }else if(res && res.msg){
                            Helper.OpenTip(res.msg)
                        }
                    }
                })
            })
        }else{
            this.setActive(itemNode, false)
        }
    }

    checkPayResult(){
        if(this.payBox){
            let param = {
                box_gid: this.payBox.boxId
            }
            ActivitySrv.GetShopPayResult(param, (res)=>{
                if(res && res.err && res.err.code == 200){
                    Helper.reportEvent("复活礼包-付费购买-成功-获得金币-"+Helper.FormatNumWYCN(this.payBox.items[this.param.ndItem.id].num))
                    UserSrv.UpdateItem(()=>{                    
                        UIMgr.OpenUI("component/Shop/GetAwardEntry", {param: { awards: res.award_item, autoOpenBox: true }, closeCb: ()=>{
                            this.param && this.param.callback && this.param.callback({ret:3, shieldTimes:this.shieldTimes})
                            this.close()
                        }})
                    })
                }
            })
        }
    }    
}
