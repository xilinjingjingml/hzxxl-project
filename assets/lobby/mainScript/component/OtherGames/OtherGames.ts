import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { PluginMgr } from "../../../start/script/base/PluginMgr";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";
import { UserSrv } from "../../../start/script/system/UserSrv";
const { ccclass, property } = cc._decorator;

@ccclass
export default class OtherGames extends BaseUI {
    @property(cc.Node)
    content:cc.Node = null
    @property(cc.Node)
    itemPrefab:cc.Node = null
    @property(cc.Node)
    tipNode:cc.Node= null

    onOpen() {
        this.initEvent()
        this.initButton()

        let promotionList:any[] = DataMgr.getData(Constants.DATA_DEFINE.OTHER_GAME_PROMOTION)
        if(promotionList){
            this.initData(promotionList)
        }else{
            UserSrv.GetPromotion((res)=>{
                console.log("GetPromotion", res)
                if(res && res.length >  0){
                    this.initData(res)
                }else{
                    Helper.OpenTip("暂无推荐游戏")
                }
            })
        }
    }

    protected start(): void {
        this.itemPrefab.active = false
    }

    initEvent() {
        
    }

    initButton() {
        this.setButtonClick("node/btnClose", () => {            
            this.close()
        })
    }

    initData(promotionList:any[]) {
        for(let i=0; i<promotionList.length; i++){
            let data = promotionList[i]
            console.log("OtherGames initData", data)
            cc.assetManager.loadRemote(data.promotion_game_pic, (error: Error, resource: cc.Texture2D) => {
                if(error){

                }else if(cc.isValid(this.node)){
                    let itemNode = cc.instantiate(this.itemPrefab)
                    if(itemNode){
                        this.tipNode.active = false
                        itemNode.active =true
                        itemNode.zIndex = data.sort_id
                        itemNode.parent = this.content
                        this.getNode("bg", itemNode).getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(resource)
                        this.setLabelValue("text", itemNode, 10000 + Math.floor(Math.random() * 10000) + "人正在玩")
                        this.setButtonClick("btn", itemNode, ()=>{
                            PluginMgr.navigateToMiniGame(data.promotion_appid)
                        })
                    }
                }
            })
            
        }
    }

    
}
