/**
 * Creator by Jin on 2022.3.18
*/
import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";
import { UserSrv } from "../../../start/script/system/UserSrv";


const {ccclass, property} = cc._decorator;

let showItemList = [
    {id:Constants.ITEM_INDEX.MJ_DOUBLE_CARD, image: "image/common_hzxl/item_10014"},
    {id:Constants.ITEM_INDEX.MJ_CAPPED_CARD, image: "image/common_hzxl/item_10015"},
    {id:Constants.ITEM_INDEX.SuperDoubleCard, image: "image/common_hzxl/item_10017"},
    {id:Constants.ITEM_INDEX.RecorderCard, image: "image/common_hzxl/item_10018"},
    {id:Constants.ITEM_INDEX.FreeCard, image: "image/common_hzxl/item_10019"},
]

@ccclass
export default class Backpack extends BaseUI {

    onOpen(): void {
        console.log("jin---Backpack")
        this.initButton()
        this.initData()
        this.initContainer()
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{this.close()})
    }

    initData(){

    }

    initContainer(){        
        const content = this.getNode("node/scrollView/view/content", this.node)
        const itemPrefab = this.getNode("item",content)
        itemPrefab.active = false
        console.log("User.Items", User.Items)
        for(let k in User.Items){
            let item = User.Items[k]
            console.log("item", item)
            for(let v of showItemList){
                if(item.id == v.id){
                    const curItem = cc.instantiate(itemPrefab)
                    curItem.active = true
                    curItem.parent = content

                    if (UserSrv.GetItemInfo(item.id)) {
                        this.setLabelValue("name", curItem, UserSrv.GetItemInfo(item.id).name)
                    }
                    this.setLabelValue("num", curItem, "x"+item.num)
                    this.setLabelValue("lbl_use", curItem, "去使用")
                    this.setSpriteFrame("icon", curItem, v.image)
                    this.setButtonClick("btn", curItem, ()=>{
                        let labels = [
                            Constants.GAME_TYPE_LABLE.MAJIONG_HZXL, 
                            Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL, 
                            Constants.GAME_TYPE_LABLE.MAJIONG_XLCH
                        ]
                        UIMgr.OpenUI("component/GameSession/GameSession", {single:true, param:{labels: labels}}, ()=>{
                            if(cc.isValid(this.node)){
                                this.close()
                            }
                        })
                    })

                    this.setActive("node/lbl_none", this.node, false)
                    break
                }
            }
        }
    }

    initItem(){

    }

    onPressUse(data){
        console.log("jin---onPressUse")
    }
}
