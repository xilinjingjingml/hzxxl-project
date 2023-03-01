/**
 * Creator by Jin on 2022.3.17
*/

import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
import { Helper } from "../../../../start/script/system/Helper";
import { ShopSvr } from "../../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../../start/script/system/UserSrv";
const {ccclass, property} = cc._decorator;

@ccclass
export default class SlyderAdventuresBox extends BaseUI {
    curBox:IShopInfo = null
    curItem:cc.Node = null
    onOpen(): void {
        this.initButton()
        this.initData()
        this.initEvent()
    }

    protected start(): void {
        this.setActive("item_0/isBuy", false)
        this.setActive("item_1/isBuy", false)
        this.setActive("item_2/isBuy", false)
    }

    initButton(){
        this.setButtonClick("top/left/btnClose", this.node, ()=>{this.close()})
    }

    initEvent() {
        
    }

    initData(){
        let boxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if(boxes && boxes[Constants.SHOP_TYPE.PREFERENCE]){
            let boxList = []
            for (let idx in boxes[Constants.SHOP_TYPE.PREFERENCE]) {
                let box = boxes[Constants.SHOP_TYPE.PREFERENCE][idx]
                if(box.items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN]){                    
                    boxList.push(box)
                }
            }

            console.log("SlyderAdventuresBox initData", boxList)
            for(let i = 0; i < boxList.length; ++i){
                const curItem = cc.find("item_" + i, this.node)
                if(curItem){
                    if(boxList[i].items[DataMgr.data.Config.mainItemId]){
                        let itemNum = boxList[i].items[DataMgr.data.Config.mainItemId].num
                        let goldNum: string = itemNum >= 10000 ? Helper.FormatNumWYCN(itemNum) : itemNum
                        goldNum = goldNum.replace("e", "亿")
                        goldNum = goldNum.replace("w", "万")
                        this.setLabelValue("item_gloden/lbl_num", curItem, goldNum)
                    }else{
                        this.setActive("item_gloden", curItem, false)
                    }

                    if(boxList[i].items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN]){
                        this.setLabelValue("item_zhuanPanBi/lbl_num", curItem, boxList[i].items[Constants.ITEM_INDEX.ROTARY_TABLE_COIN].num)
                    }else{
                        this.setActive("item_zhuanPanBi", curItem, false)
                    }
                    this.setLabelValue("lbl_RMB", curItem, "￥" + boxList[i].price/100)

                    this.setButtonClick(curItem, ()=>{
                        this.onPressBox(boxList[i], curItem)
                    })

                    if(boxList[i].isBuy){
                        curItem.getComponent(cc.Button).interactable = false
                        this.setActive("isBuy", curItem, true)
                    }
                }
            }
        }
    }

    onPressBox(box:IShopInfo, curItem:cc.Node){
        console.log("jin---onPressBox", box)
        this.curBox = box
        this.curItem = curItem
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

    onPaySuccess(box:IShopInfo, curItem:cc.Node){
        let boxes:TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if(boxes && boxes[box.type] && boxes[box.type][box.boxId]){
            boxes[box.type][box.boxId].isBuy = true
            DataMgr.setData(Constants.DATA_DEFINE.SHOP_BOXES, boxes)
            curItem.getComponent(cc.Button).interactable = false
            this.setActive("isBuy", curItem, true)
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
