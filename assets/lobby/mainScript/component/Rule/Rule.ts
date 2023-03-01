import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Rule extends BaseUI {
    page = 0
    pageSize = 2

    gameName = {
        [Constants.GAME_TYPE_LABLE.MAJIONG_HZXL]: {name: "红中血流", image: "component/Rule/images/hzxl" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL]: { name: "6红中血流", image: "component/Rule/images/6hzxl" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL]: { name: "8红中血流", image: "component/Rule/images/8hzxl" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XLCH]: { name: "血流成河", image: "component/Rule/images/xlch" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ]: { name: "血战换三张", image: "component/Rule/images/xzdd" },
    }

    onOpen() {
        console.log("Rule onOpen", this.param)
        this.initButton()
        this.initEvent()
    }

    protected start(): void {
        this.setActive("node/btnPageUp", false)
        this.setActive("node/award", false)
        this.setSpriteFrame("node/gameName", this.gameName[this.param.label].image)
    }

    initEvent() {

    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/btnPageUp", ()=>{
            this.page--
            this.page=this.page<0?0:this.page
            this.setPage(this.page)
        }, 0)

        this.setButtonClick("node/btnPageDown", ()=>{            
            this.page++
            this.page=this.page>=this.pageSize-1?this.pageSize-1:this.page
            this.setPage(this.page)
        }, 0)

        this.setButtonClick("node/btnDetails", ()=>{
            UIMgr.OpenUI("component/Rule/RuleDetails", {single:true, param:{label: this.param.label}, closeCb: ()=>{
                this.node.active = true
            }}, ()=>{
                this.node.active = false
            })
        })
    }

    setPage(page:number){
        let bgImages = [
            "component/Rule/images/bg1",
            "component/Rule/images/bg2"
        ]

        let contentImages = [
            "component/Rule/images/gz_1_neirong",
            "component/Rule/images/gz_2_neirong"
        ]

        if(this.param.label == Constants.GAME_TYPE_LABLE.MAJIONG_XLCH || this.param.label == Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ){
            contentImages[1]= "component/Rule/images/gz_3_neirong"
        }

        this.setSpriteFrame("node/bg", bgImages[page])
        this.setSpriteFrame("node/content", contentImages[page])

        this.setActive("node/btnPageUp", page != 0)        
        this.setActive("node/award", page != 0)
        this.setActive("node/btnPageDown", page != this.pageSize-1)

    }
}
