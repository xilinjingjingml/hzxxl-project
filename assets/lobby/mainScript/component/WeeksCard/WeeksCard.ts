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
export default class WeeksCard extends BaseUI {
    onLoad(){
    }

    protected start(): void {
        this.initButton()
        this.initEvent()
        this.initData()
    }

    protected onDestroy(): void {
    }

    initEvent() {
    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })
    }

    initData() {
        console.log("User.RegTime", User.RegTime)
        let nowTime = new Date().getTime()/1000        
        let newbie = (nowTime-User.RegTime) < (48*60*60) ? 1 : 0        
        let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if (boxs) {
            for (let k in boxs[Constants.SHOP_TYPE.MONTH_CARD]) {
                let box = boxs[Constants.SHOP_TYPE.MONTH_CARD][k]
                let itemNode = null
                console.log("WeeksCard box", box)
                if(box.param && box.param.card_id == Constants.ITEM_INDEX.MemberCard && box.param.newbie == newbie){
                    itemNode = this.getNode("node/item1")
                }else if(box.param && box.param.card_id == Constants.ITEM_INDEX.SupreMemberCard){
                    itemNode = this.getNode("node/item2")
                }

                if(itemNode){  
                    this.setChildParam(itemNode, box)                    
                }
            }
        }
    }
}
