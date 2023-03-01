import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { ShopSvr } from "../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SpecialGiftBag extends BaseUI {
    curBox: IShopInfo = null
    protected start(): void {
        this.initButton()
        this.initData()
    }

    onClose(): void {
    }

    initEvent() {
        
    }

    initButton() {
        this.setButtonClick("node/btnClose", () => {            
            this.close()
        })

        this.setButtonClick("node/btnGet", this.node, ()=>{    
            console.log("this.curBox", this.curBox)        
            if(this.curBox){
                if(Helper.checkPayResult()){
                    this.registPayResultEvent()
                }
                ShopSvr.Pay(this.curBox, (res)=>{
                    if(res && res.code == 0){
                        Helper.OpenTip("支付成功")  
                        UserSrv.UpdateItem()   
                        if(cc.isValid(this.node)){           
                            this.onPaySuccess()
                        }
                    }else if(res && res.msg){
                        Helper.OpenTip(res.msg)
                    }
                })
            }
        })
    }

    initData() {
        let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if(boxs){
            for (let k in boxs[Constants.SHOP_TYPE.PREFERENCE]) {
                let box = boxs[Constants.SHOP_TYPE.PREFERENCE][k]
                if(box.param && box.param.show_in_tehui == 1){
                    this.curBox = box
                    console.log("SpecialGiftBag box", box)
                    for(let k in box.items){
                        if(box.items[k].id == Constants.ITEM_INDEX.FreeCard){
                            this.setLabelValue("node/item0/num", UserSrv.GetItemInfo(box.items[k].id).name + "x" + box.items[k].num)
                        }else if(box.items[k].id == Constants.ITEM_INDEX.MJ_DOUBLE_CARD){
                            this.setLabelValue("node/item1/num", UserSrv.GetItemInfo(box.items[k].id).name + "x" + box.items[k].num)
                        }
                    }
                    break
                }
            }
        }
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
        if(this.curBox){
            let boxes:TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if(boxes && boxes[this.curBox.type] && boxes[this.curBox.type][this.curBox.boxId]){
                boxes[this.curBox.type][this.curBox.boxId].isBuy = true
                DataMgr.setData(Constants.DATA_DEFINE.SHOP_BOXES, boxes)
            }
            if(this.curBox){
                let award_list = []
                for (let k in this.curBox.items) {
                    award_list.push({
                        item_id: this.curBox.items[k].id,
                        item_num: this.curBox.items[k].num
                    })
                }
                UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: award_list, autoOpenBox: true } })
            }
        }
        this.close()
    }
}
