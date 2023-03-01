/**
 * Creator by Jin on 2022.3.17
*/

import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { ShopSvr } from "../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";
const {ccclass, property} = cc._decorator;

@ccclass
export default class FirstBox extends BaseUI {
    curBox:IShopInfo = null
    curItem:cc.Node = null
    onOpen(): void {
        this.initButton()
        this.initData()
    }

    protected start(): void {
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{this.close()})
    }

    onClose(): void {
        this.param.checkQueue && EventMgr.dispatchEvent(Constants.EVENT_DEFINE.FIRST_OPEN_QUEUE)
    }

    initData(){
        let boxes:TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if(boxes && boxes[Constants.SHOP_TYPE.FIRST_PAY]){
            let boxList = []
            for (let idx in boxes[Constants.SHOP_TYPE.FIRST_PAY]) {                                  
                boxList.push(boxes[Constants.SHOP_TYPE.FIRST_PAY][idx])
            }

            console.log("boxList", boxList)
            for(let i = 0; i < boxList.length; ++i){
                const curItem = cc.find("node/item_" + i, this.node)
                if(curItem){
                    if(boxList[i].items[DataMgr.data.Config.mainItemId]){
                        let itemNum = boxList[i].items[DataMgr.data.Config.mainItemId].num
                        let goldNum: string = itemNum >= 10000 ? Helper.FormatNumWYCN(itemNum) : itemNum
                        this.setLabelValue("item_gloden/lbl_num", curItem, goldNum)
                    }else{
                        this.setActive("item_gloden", curItem, false)
                    }

                    if(boxList[i].items[Constants.ITEM_INDEX.GAME_DIAMOND]){
                        this.setLabelValue("item_diamond/lbl_num", curItem, boxList[i].items[Constants.ITEM_INDEX.GAME_DIAMOND].num)
                    }else{
                        this.setActive("item_diamond", curItem, false)
                    }                    

                    if(boxList[i].items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN]){
                        // this.setLabelValue("tip", curItem, "高级转盘次数+" + boxList[i].items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN].num)
                        this.setLabelValue("item_zhuanPanBi/lbl_num", curItem, boxList[i].items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN].num)
                    }else{
                        this.setActive("item_zhuanPanBi", curItem, false)
                    }
                    this.setLabelValue("lbl_RMB", curItem, boxList[i].price/100 + "元购买")
                    if(boxList[i].param && boxList[i].param.original_price){
                        this.setLabelValue("lbl_original", curItem, "原价:" + boxList[i].param.original_price/100 + "元")
                    }else{
                        this.setActive("lbl_original", curItem, false)
                    }

                    this.setButtonClick(curItem, ()=>{
                        this.onPressBox(boxList[i], curItem)
                    })

                    if(boxList[i].isBuy){
                        this.setActive("isBuy", curItem, true)
                        curItem.getComponent(cc.Button).interactable = false
                    }else{
                        this.setActive("isBuy", curItem, false)
                    }
                }
            }
        }
    }

    onPressBox(box, curItem){
        this.curBox = box
        this.curItem = curItem
        console.log("jin---onPressBox", box)
        if(Helper.checkPayResult()){
            this.registPayResultEvent()
        }
        ShopSvr.Pay(box, (res)=>{
            if(res && res.code == 0){
                Helper.OpenTip("支付成功")  
                UserSrv.UpdateItem()              
                this.onPaySuccess(box, curItem)                
            }else if(res && res.msg){
                Helper.OpenTip(res.msg)
            }
        })
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
                            this.onPaySuccess(this.curBox, this.curItem)
                        })
                    }
                })
            }
        }, this)
    }

    onPaySuccess(box, curItem){
        if(box){
            let boxes:TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if(boxes && boxes[box.type] && boxes[box.type][box.boxId]){
                boxes[box.type][box.boxId].isBuy = true
                DataMgr.setData(Constants.DATA_DEFINE.SHOP_BOXES, boxes)
                this.setActive("isBuy", curItem, true)
                curItem.getComponent(cc.Button).interactable = false
            }
        
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
