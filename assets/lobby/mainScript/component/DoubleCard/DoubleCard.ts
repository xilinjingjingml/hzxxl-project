import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../start/script/system/AdSrv";
import { ExchangeSrv } from "../../../start/script/system/ExchangeSrv";
import { Helper } from "../../../start/script/system/Helper";
import { UserSrv } from "../../../start/script/system/UserSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class DoubleCard extends BaseUI {
    showItemId = Constants.ITEM_INDEX.MJ_DOUBLE_CARD
    exchangeData: any[] = new Array()
    onOpen() {
        this.showItemId = this.param.showItemId || this.showItemId
        this.initData()
        this.initEvent()
        this.initButton()

        this.setLabelValue("node/btnDoubleCard/Background/Label", User.DoubleCard)
        this.setLabelValue("node/btnCappedCard/Background/Label", User.CappedCard)
    }

    onClose(): void {
    }

    initEvent() {
        
    }

    initButton() {
        this.setButtonClick("node/btnClose", () => {            
            this.close()
        })

        this.setButtonClick("node/btnDoubleCard", () => {            
            this.showItemId = Constants.ITEM_INDEX.MJ_DOUBLE_CARD
            this.initData()
        })

        this.setButtonClick("node/btnCappedCard", () => {            
            this.showItemId = Constants.ITEM_INDEX.MJ_CAPPED_CARD
            this.initData()
        })
    }

    initData() {
        this.exchangeData = new Array()
        let param = {
            typeId: 1
        }
		ExchangeSrv.getExchangeTemplateInfo(param, (res)=>{
			console.log("getExchangeTemplateInfo", res)
            if (res && res.code == "0000") {                
                if (res.result) {
                    for(let v of res.result){
                        if(v.output_list && v.output_list[0].item_id == this.showItemId){
                            this.exchangeData.push(v)
                        }
                    }

					this.exchangeData.sort((a ,b)=>{
                        a.output_list[0].item_num = Number(a.output_list[0].item_num)
                        b.output_list[0].item_num = Number(b.output_list[0].item_num)
                        return a.output_list[0].item_num < b.output_list[0].item_num ? -1 : 1
                    })
                }
            }

			if(this.exchangeData){
				for(let i=0;i<this.exchangeData.length; i++){
                    let itemNode = this.getNode("node/item"+i)
                    if(itemNode){
                        let data = this.exchangeData[i]
                        this.setLabelValue("name", itemNode, data.output_list[0].item_name)
                        this.setLabelValue("btnGet/Background/Label", itemNode, data.consume_list[0].item_num + data.consume_list[0].item_name)

                        if(this.showItemId == Constants.ITEM_INDEX.MJ_DOUBLE_CARD){
                            if(data.output_list[0].item_num > 1){
                                this.setSpriteFrame("icon", itemNode, "component/DoubleCard/images/double2")
                            }else{
                                this.setSpriteFrame("icon", itemNode, "component/DoubleCard/images/double")
                            }
                        }else{
                            if(data.output_list[0].item_num > 1){
                                this.setSpriteFrame("icon", itemNode, "component/DoubleCard/images/cappend2")
                            }else{
                                this.setSpriteFrame("icon", itemNode, "component/DoubleCard/images/cappend")
                            }
                        }

                        if(data.exchange_conditions && data.exchange_conditions.discount){
                            this.setLabelValue("btnGet/Background/zhe", itemNode, data.exchange_conditions.discount + "折")
                        }else{
                            this.setActive("btnGet/Background/zhe_bg", itemNode, false)
                            this.setActive("btnGet/Background/zhe", itemNode, false)
                        }

                        this.clearButtonClick("btnGet", itemNode)
                        this.setButtonClick("btnGet", itemNode, () => {
                            this.exchangeTemplateInfo(data)
                        })
                    }
                }
			}
		})

        if(this.showItemId == Constants.ITEM_INDEX.MJ_DOUBLE_CARD){
            this.setSpriteFrame("node/name", "component/DoubleCard/images/double_name")
        }else{
            this.setSpriteFrame("node/name", "component/DoubleCard/images/cappend_name")
        }
    }

    exchangeTemplateInfo(box: any) {
		Helper.exchangeTemplateInfo(box, (success) => {
			if(success){				
                this.setLabelValue("node/btnDoubleCard/Background/Label", User.DoubleCard)
                this.setLabelValue("node/btnCappedCard/Background/Label", User.CappedCard)				
			}
        })
    }
}
