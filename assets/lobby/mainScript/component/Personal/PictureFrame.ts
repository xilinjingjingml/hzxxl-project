/**
 * Creator by Jin on 2022.3.18
*/
import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";
import { UserSrv } from "../../../start/script/system/UserSrv";


const {ccclass, property} = cc._decorator;


@ccclass
export default class PictureFrame extends BaseUI {

    protected start(): void {
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
        
        let txkList = PlatformApi.getHeadVipTxkList()
        for(let v of txkList){
            if(v.isNew){
                const itemNode = cc.instantiate(itemPrefab)
                itemNode.active = true
                itemNode.parent = content
                
                this.setSpriteFrame("icon", itemNode, v.imgPath, true, true)
                if(v.level > 0){
                    this.setLabelValue("name", itemNode, "特权" + v.level + "专属")
                }

                if(v.level == User.QpVipLevel){
                    this.setActive("select", itemNode, true)
                }

                if(v.level > User.QpVipLevel){
                    this.setOpacity("icon", itemNode, 77)
                    this.setActive("lock", itemNode, true)
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
