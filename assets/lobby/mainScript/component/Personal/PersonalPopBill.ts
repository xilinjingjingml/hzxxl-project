import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalPopBill extends BaseUI {
    curItemNode:cc.Node = null
    itemPrefab:cc.Node = null
    contentNode:cc.Node = null

    billItemPrefab:cc.Node = null
    billContentNode:cc.Node = null
    curGameLabel:string = Constants.GAME_TYPE_LABLE.MAJIONG_HZXL

    page = 0
    pageNum = 20
    gameList = {
        [Constants.GAME_TYPE_LABLE.MAJIONG_HZXL]: {name: "红中血流", image: "component/GameSession/images/game_name/hongzhongxueliu" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL]: { name: "6红中血流", image: "component/GameSession/images/game_name/6hongzhong" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL]: { name: "8红中血流", image: "component/GameSession/images/game_name/8hongzhong" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XLCH]: { name: "血流成河", image: "component/GameSession/images/game_name/xueliuchenghe" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ]: { name: "血战换三张", image: "component/GameSession/images/game_name/xuezhanhuansanzhang" },
    }
    start() {        
        this.itemPrefab = cc.find("gameScrollView/view/content/item", this.node)
        this.itemPrefab.active = false
        this.contentNode = cc.find("gameScrollView/view/content", this.node)

        this.billItemPrefab = cc.find("billScrollView/view/content/item", this.node)
        this.billItemPrefab.active = false
        this.billContentNode = cc.find("billScrollView/view/content", this.node)

        this.initData()
        this.initEvent()
        this.initButton()

        let igsEnv = DataMgr.getData(Constants.DATA_DEFINE.IGS_ENV)
        if(igsEnv == Constants.ENV.ENV_SANDBOX || DataMgr.data.Config.env == Constants.ENV.ENV_SANDBOX){
            this.pageNum = 100
        }

        this.onChangeLabel(Constants.GAME_TYPE_LABLE.MAJIONG_HZXL)

        this.setLabelValue("tip1", "只保留最近"+ this.pageNum +"场的对局战绩")
    }

    initEvent() {
       
    }

    initButton(){
    }

    initData() {
        for(let v in this.gameList){
            let itemNode = cc.instantiate(this.itemPrefab)
            itemNode.active = true
            itemNode.parent = this.contentNode
            this.setLabelValue("Background/Label", itemNode, this.gameList[v].name)

            this.curItemNode = this.curItemNode || itemNode

            this.setButtonClick(itemNode, (res)=>{
                this.curItemNode.getComponent(cc.Button).interactable = true
                this.setLabelInfo("Background/Label", this.curItemNode, {color:cc.color(255, 255, 255)})

                this.curItemNode = itemNode
                this.curItemNode.getComponent(cc.Button).interactable = false
                this.setLabelInfo("Background/Label", this.curItemNode, {color:cc.color(143, 83, 33)})

                this.curGameLabel = v

                this.onChangeLabel(v)
            })
        }

        this.curItemNode.getComponent(cc.Button).interactable = false
        this.setLabelInfo("Background/Label", this.curItemNode, {color:cc.color(143, 83, 33)})
    }

    initBillData(list:any[]){
        // let list:TResults = []
        // let results:TResults = DataMgr.getData(Constants.DATA_DEFINE.MATCH_COMPLETED)
        // console.log("results", results)
        // if(!results || results.length == 0){
        //     return
        // }

        // for(let v of results){
        //     let match = MatchSvr.GetMatchInfo(v.matchId)
        //     if(match && match.labals && match.labals.indexOf(this.curGameLabel) >= 0 && list.length < 20){
        //         list.push(v)
        //     }
        // }
        
        let newList:TResults = [] 
        for(let v of list){
            let match = MatchSvr.GetMatchInfo(v.match_cid)
            if(match){
                newList.push(v)
            }
        }
        this.setChildParam("billScrollView", {list: newList, reload: true})

        this.setActive("tip", !(newList.length>0))
        this.setActive("billScrollView", newList.length>0)
    }    

    onChangeLabel(label:string){
        this.initBillData([])
        MatchSvr.GeRoundList({label:label, page:this.page, num:this.pageNum}, (res)=>{
            if(res && res.items){                        
                this.initBillData(res.items)
            }
            console.log("GeRoundList", res)
        })
    }
}
