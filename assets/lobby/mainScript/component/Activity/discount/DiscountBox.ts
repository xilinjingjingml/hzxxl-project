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
export default class DiscountBox extends BaseUI {
    togglePrefab: cc.Node = null
    curBox: IShopInfo = null
    onOpen(): void {
        console.log("DiscountBox")
        this.initButton()
        this.initData()
        this.initEvent()
    }

    onClose(): void {
        this.param.checkQueue && EventMgr.dispatchEvent(Constants.EVENT_DEFINE.FIRST_OPEN_QUEUE)
    }

    protected start(): void {
        this.togglePrefab = this.getNode("node/toggle/toggle1")
        this.togglePrefab.active = false
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{            
            this.close()
        })

        this.setButtonClick("node/content/btnBuy", this.node, ()=>{    
            console.log("this.curBox", this.curBox)        
            if(this.curBox){
                if(Helper.checkPayResult()){
                    this.registPayResultEvent()
                }
                ShopSvr.Pay(this.curBox, (res)=>{
                    if(res && res.code == 0){
                        Helper.OpenTip("支付成功")  
                        UserSrv.UpdateItem()              
                        this.onPaySuccess()
                    }else if(res && res.msg){
                        Helper.OpenTip(res.msg)
                    }
                })
            }
        })
    }

    initEvent() {
        
    }

    initData(){        
        let boxList:IShopInfo[] = []
        let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        for(let k in boxs[Constants.SHOP_TYPE.PREFERENCE]){
            if(boxs[Constants.SHOP_TYPE.PREFERENCE][k].param && boxs[Constants.SHOP_TYPE.PREFERENCE][k].param.show_in_discount == 1){
                boxList.push(boxs[Constants.SHOP_TYPE.PREFERENCE][k])
            }
        }

        let curBox = null
        console.log("boxList", boxList)
        for(let i=0; i<boxList.length; i++){
            let box = boxList[i]
            let itemNode = cc.instantiate(this.togglePrefab)
            itemNode.active = true
            itemNode.parent = this.getNode("node/toggle")

            this.setLabelValue("Background/label", itemNode, box.price/100 + "元")
            this.setLabelValue("checkmark/label", itemNode, box.price/100 + "元")
            if(i==0){
                itemNode.getComponent(cc.Toggle).isChecked = true
                this.setActive("fengexian", itemNode, false)
            }

            this.setToggleClick(itemNode, ()=>{
                console.log("sssssssssssss")
                this.changeBox(box)
            })

            if(!curBox && !box.isBuy){
                curBox = box
                itemNode.getComponent(cc.Toggle).isChecked = true
                this.changeBox(box)
            }
        }

        if(!curBox){
            this.changeBox(boxList[0])
        }
    }

    changeBox(box: IShopInfo){
        if(this.curBox && this.curBox.boxId == box.boxId){
            return
        }

        if(!box){
            return
        }

        let boxes:TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if(boxes && boxes[box.type] && boxes[box.type][box.boxId]){
            box = boxes[box.type][box.boxId]
        }

        this.curBox = box
        this.setLabelValue("node/content/baoxiang/zhe", box.param.discount + "z")
        this.setLabelValue("node/content/num/label", Helper.FormatNumWY(box.items[Constants.ITEM_INDEX.GAME_GOLD].num))
        this.setLabelValue("node/content/btnBuy/Background/Label", box.price/100 + "ygm")
        this.setLabelValue("node/content/btnBuy/Background/yuanjia", "原价" + box.items[Constants.ITEM_INDEX.GAME_GOLD].num/100000 + "元")
        
        this.setActive("node/content/btnBuy", !box.isBuy)
        this.setActive("node/content/isBuy", box.isBuy)
    }

    registPayResultEvent(){
        EventMgr.once(Constants.EVENT_DEFINE.FOREGROUND, ()=>{            
            if(this.curBox){
                let param = {
                    box_gid: this.curBox.boxId
                }
                ActivitySrv.GetShopPayResult(param, (res)=>{
                    if(res && res.err && res.err.code == 200){
                        UserSrv.UpdateItem(()=>{                    
                            this.onPaySuccess()
                        })
                    }
                })
            }            
        }, this)
    }

    onPaySuccess(){
        let box:IShopInfo = null
        let boxes:TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if(boxes && boxes[this.curBox.type] && boxes[this.curBox.type][this.curBox.boxId]){
            boxes[this.curBox.type][this.curBox.boxId].isBuy = true
            DataMgr.setData(Constants.DATA_DEFINE.SHOP_BOXES, boxes)
            box = boxes[this.curBox.type][this.curBox.boxId]
            this.curBox = null
            this.changeBox(box)
        }
        if(box){
            let award_list = []
            for (let k in box.items) {
                award_list.push({
                    item_id: box.items[k].id,
                    item_num: box.items[k].num
                })
            }
            UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: award_list, autoOpenBox: true } })
        }
    }
}
