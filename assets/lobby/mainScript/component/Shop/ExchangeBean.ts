import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ExchangeSrv } from "../../../start/script/system/ExchangeSrv";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { TaskSrv } from "../../../start/script/system/TaskSrv";
import { UserSrv } from "../../../start/script/system/UserSrv";
import { ShopType } from "./ShopSceneNew";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ExchangeBean extends BaseUI {
    boxPrefab: cc.Node = null
    content: cc.Node = null
    curLevel:number = 1
    exchangeData: any[] = new Array()

    @property(cc.Node)
    tabPrefab: cc.Node = null
    @property(cc.Node)
    tabContent:cc.Node = null
    tabConfig = [
        {name:"初级场", level:1},
        {name:"中级场", level:2},
        {name:"高级场", level:3},
        {name:"大师场", level:4},
        {name:"星耀场", level:5}
    ]
    onOpen() {
        console.log("ExchangeBean onOpen", this.param)
        if(this.param.matchInfo){
            let list = MatchSvr.getMatchList(Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL)

            for (let i=0; i<list.length; i++) {
                let matchInfo = list[i]
                if(matchInfo.matchId == this.param.matchInfo.matchId){
                    this.curLevel = i+1
                    break
                }
            }
        }

        this.initButton()
        this.initTab()

        let param = {
            typeId: 1
        }
        ExchangeSrv.getExchangeTemplateInfo(param, (res)=>{
            console.log("getExchangeTemplateInfo", res)
            if (res && res.code == "0000") {                
                    if (res.result) {
                        for(let v of res.result){
                            if(v.output_list && v.output_list[0].item_id == Constants.ITEM_INDEX.GAME_BEAN){
                                this.exchangeData.push(v)
                            }
                        }

                        this.exchangeData.sort((a ,b)=>{
                            a.output_list[0].item_num = Number(a.output_list[0].item_num)
                            b.output_list[0].item_num = Number(b.output_list[0].item_num)
                            return a.output_list[0].item_num < b.output_list[0].item_num ? -1 : 1
                        })
                        this.refreshData()
                    }
                }
        })
    }

    protected start(): void {
        this.content = this.getNode("node/content/scrollView/view/content")
        this.boxPrefab = this.getNode("node/content/scrollView/view/content/item")
        this.boxPrefab.active = false

        this.tabPrefab.active = false

        if(!Helper.isInLobbyScene()){
            this.setActive("bg_Popup", false)
        }        
    }

    initEvent() {

    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })
    }

    initTab(){
        for(let i=0; i<this.tabConfig.length; i++){
            let v = this.tabConfig[i]
            let item = cc.instantiate(this.tabPrefab)
            item.active = true
            item.parent = this.tabContent

            this.setLabelValue("Background/name", item, v.name)
            this.setLabelValue("checkmark/name", item, v.name)
            if(v.level == this.curLevel){
                item.getComponent(cc.Toggle).isChecked = true
            }

            this.setToggleClick(item, ()=>{
                this.curLevel = i + 1
                this.refreshData()
            })
        }
    }

    refreshData() {
        let images = [
            "component/Shop/images/exchangeBean/jindou1",
            "component/Shop/images/exchangeBean/jindou2",
            "component/Shop/images/exchangeBean/jindou3",
            "component/Shop/images/exchangeBean/jindou4"
        ]

        let index = 0
        this.content.removeAllChildren()
        for(let v of this.exchangeData){
            if(v.exchange_conditions && v.exchange_conditions.level == this.curLevel){
                let item = cc.instantiate(this.boxPrefab)
                item.active = true
                item.parent = this.content

                this.setLabelValue("name", item, Helper.FormatNumWYCN(v.output_list[0].item_num) + v.output_list[0].item_name)
                this.setLabelValue("price/num", item, Helper.FormatNumWYCN(v.consume_list[0].item_num))
                this.setSpriteFrame("icon", item, images[index])
                index++

                this.setButtonClick("btn", item, ()=>{
                    this.exchangeTemplateInfo(v)
                })
            }
        }
    }

    exchangeTemplateInfo(box: any) {
        if (User.MainToken < box.consume_list[0].item_num) {
            Helper.OpenTip("金币不足，请先购买金币")
            UIMgr.OpenUI("component/Shop/ShopSceneNew", { single: true, param: {tab: ShopType.Gold}, closeCb: ()=>{
                
            }})
        }else{
            Helper.exchangeTemplateInfo(box, (success) => {
            })
        }
    }
}
