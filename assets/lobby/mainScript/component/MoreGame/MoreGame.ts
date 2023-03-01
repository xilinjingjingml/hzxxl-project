import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { AccountSrv } from "../../../start/script/system/AccountSrv";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class MoreGame extends BaseUI {
    itemPrefab: cc.Node = null
    contentNode: cc.Node = null
    onOpen() {
        console.log("MoreGame openId", User.Data.openId)
        console.log("MoreGame param", this.param)

        this.initData()
        this.initEvent()
        this.initButton()
    }

    protected start(): void {
        this.itemPrefab = cc.find("center/scrollView/view/content/content/item", this.node)
        this.itemPrefab.active = false
        this.contentNode = cc.find("center/scrollView/view/content/content", this.node)
    }

    initEvent() {
        
    }

    initButton() {
        this.setButtonClick("top/left/btnClose", () => {            
            this.close()
        })

        this.setButtonClick("top/left/btnHelp", () => {
            UIMgr.OpenUI("component/Rule/RuleDetails", { single: true, param: { label: "hzxl:1" } })
        })
    }

    initData() {
        this.initGameList()
    }

    initGameList(){
        let gameList = [
            {
                label: Constants.GAME_TYPE_LABLE.MAJIONG_HZXL, 
                name: "红中血流", 
                image: "component/MoreGame/images/hzxl" ,
                callfunc: ()=>{
                    this.onPressHzxl(Constants.GAME_TYPE_LABLE.MAJIONG_HZXL)
                }
            }, {
                label: Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL, 
                name: "6红中血流", 
                image: "component/MoreGame/images/6hzxl",
                callfunc: ()=>{
                    this.onPressHzxl(Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL)
                } 
            }, {
                label: Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL, 
                name: "8红中血流", 
                image: "component/MoreGame/images/fk8hz" ,
                callfunc: ()=>{
                    this.onPressFk8hz()
                }
            }, {
                label: Constants.GAME_TYPE_LABLE.MAJIONG_XLCH, 
                name: "血流成河", 
                image: "component/MoreGame/images/xlch" ,
                callfunc: ()=>{
                    this.onPressHzxl(Constants.GAME_TYPE_LABLE.MAJIONG_XLCH)
                }
            }, {
                label: Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ, 
                name: "血战换三张", 
                image: "component/MoreGame/images/xzdd" ,
                callfunc: ()=>{
                    this.onPressXzhsz()
                }
            },
        ]

        for (let i=0; i<gameList.length; i++) {
            let itemNode = cc.instantiate(this.itemPrefab)
            itemNode.active = true
            itemNode.parent = this.contentNode

            let game = gameList[i]
            this.setSpriteFrame("bg", itemNode, game.image)
            this.setButtonClick("btn", itemNode, () => {
                game.callfunc()
            })
        }
    }

    onPressHzxl(curLabel: string){
        let labels = [
           Constants.GAME_TYPE_LABLE.MAJIONG_HZXL, 
           Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL, 
           Constants.GAME_TYPE_LABLE.MAJIONG_XLCH
        ]
        UIMgr.OpenUI("component/GameSession/GameSession", {single:true, param:{labels: labels, curLabel: curLabel}})
     }
  
     onPressXzhsz(){      
        UIMgr.OpenUI("component/GameSession/GameSession", {single:true, param:{labels:[Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ]}})
     }
  
     onPressFk8hz(){      
        UIMgr.OpenUI("component/GameSession/GameSession", {single:true, param:{labels:[Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL]}})
     }
}
