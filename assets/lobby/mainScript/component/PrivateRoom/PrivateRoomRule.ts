
import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { NewGateMgr } from "../../../start/script/base/NewGateMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";

const { ccclass, property } = cc._decorator;


const UNSEL_COLOR = cc.color().fromHEX("#9F9797")
const SEL_COLOR = cc.color().fromHEX("#945B25")

@ccclass
export default class PrivateRoomRule extends BaseUI {
    //规则内容
    @property(cc.Node)
    itemPrefab: cc.Node = null
    @property(cc.Node)
    content: cc.Node = null
    @property(cc.Node)
    selectPrefab: cc.Node = null
    @property(cc.Node)
    inputPrefab: cc.Node = null
    @property(cc.Node)
    checkPrefab: cc.Node = null    
    @property(cc.Node)
    selectGroupPrefab: cc.Node = null
    @property(cc.Node)
    scrollView: cc.Node = null

    @property(cc.Node)
    blockUi:cc.Node = null

    itemNodeList: cc.Node[] = new Array()

    _curMatch: IMatchInfo = null
    _metadata: any = null

    onLoad() {
        this.itemPrefab.active = false
        this.selectPrefab.active = false
        this.inputPrefab.active = false
        this.checkPrefab.active = false
        this.selectGroupPrefab.active = false
    }

    setParam(param: any): void {
        console.log("PrivateRoomRule param", param)
        console.log("PrivateRoomRule this.itemPrefab.width", this.itemPrefab.width)
        this.initSet(param)
    }

    start() {
        console.log("PrivateRoomRule 2 this.itemPrefab.width", this.itemPrefab.width)
        this.initData()
    }

    initData() {
    }

    initSet(match: IMatchInfo) {
        console.log("initSet")
        this._curMatch = match

        this.scrollView.getComponent(cc.ScrollView).stopAutoScroll()
        this.scrollView.getComponent(cc.ScrollView).scrollToTop()
        let contentHeight = 0
        this.content.removeAllChildren()        
        if (match.metadata?.cl_params) {                
            let diao = match.metadata.cl_params?.diao
            if (!diao) {
                return
            }

            let item_index = 0
            for (let p of diao.perform) {
                let func = ()=>{
                    let itemNode = cc.instantiate(this.itemPrefab)
                    itemNode.name = p.key
                    itemNode.active = true
                    this.itemNodeList.push(itemNode)
                    this.setLabelValue("name/label", itemNode, p.name+":")
                    let name = this.getNode("name", itemNode)
                    let nw = name.x + name.width + 30
                    let item_width = (this.itemPrefab.width - nw)/(p.distance)
                    if(Helper.IsDDZGame()){
                        item_width = (this.itemPrefab.width - nw)/(p.distance + 1)
                    }
                    let item_x = nw
                    let index = 0
                    let addLine = false
                    for (let c of p.content) {
                        let ci: cc.Node = null
                        if (c.type === "select_control") {
                            ci = cc.instantiate(this.selectPrefab)
                            this.setLabelValue("name", ci, c.name || "")                      

                            ci.parent = this.getNode("container", itemNode)
                        } else if (c.type === "input_control") {
                            ci = cc.instantiate(this.inputPrefab)
                            
                            ci.parent = this.getNode("container", itemNode)
                        } else if (c.type === "check_control") {
                            ci = cc.instantiate(this.checkPrefab)
                            this.setLabelValue("name", ci, c.name || "")
                            
                            ci.parent = this.getNode("container", itemNode)
                            this.getNode("container", itemNode).getComponent(cc.ToggleContainer).enabled = false

                            if(c.data_key && diao.default_data[c.data_key]){
                                ci.getComponent(cc.Toggle).isChecked = diao.default_data[c.data_key].value == 1
                            }else{
                                ci.getComponent(cc.Toggle).isChecked = false
                            }
                        }

                        if(c.check_content && c.check_content.length > 0){
                            console.log("c.check_content", c.check_content)
                            let selectGroup = cc.instantiate(this.selectGroupPrefab)
                            selectGroup.parent = ci                                  
                            selectGroup.active = true
                            this.setLabelValue("name", selectGroup, c.check_content[0].name)
                            for(let v of c.check_content){
                                if(v.value == diao.default_data[c.check_content[0].data_key].value){
                                    this.setLabelValue("name", selectGroup, v.name)   
                                }
                            }  
                            for(let v of c.check_content){
                                if(diao.default_data[c.data_key] && v.value == diao.default_data[c.data_key].value){
                                    this.setLabelValue("name", selectGroup, v.name)   
                                }
                            }
                        }

                        if (ci) {
                            ci["isBaseMoney"] = c.isBaseMoney
                            console.log("ci.width=", ci.width)

                            if (diao.default_data[p.key].data_key === c.key) {
                                setTimeout(() => {
                                    if(cc.isValid(this.node)){
                                        ci.getComponent(cc.Toggle).isChecked = true
                                        if (c.type === "input_control") {
                                            let editBox:cc.Node = this.getNode("edit", ci)
                                            editBox.getComponent(cc.EditBox).string = diao.default_data[p.key].value
                                        }
                                    }
                                }, 0);
                            }

                            if(diao.default_data[p.key].enable === false){
                                ci.getComponent(cc.Toggle).enableAutoGrayEffect = true
                                this.setLabelInfo("name", ci, { color: false ? SEL_COLOR : UNSEL_COLOR })
                            }

                            ci.name = c.key                            
                            ci.active = true

                            if(addLine){
                                addLine = false
                                itemNode.height += 60
                            }
                            ci.position = cc.v3(item_x, -itemNode.height + 30)
                            
                        }
                        index++
                        if(index == p.distance){
                            index = 0
                            item_x = nw
                            addLine = true
                        }else{
                            item_x += item_width
                        }
                    }

                    itemNode.active = diao.default_data[p.key].visible
                    itemNode.parent = this.content
                    itemNode.y = -contentHeight
                    if(itemNode.active){
                        contentHeight += itemNode.height
                    }else{
                        console.log("name=", p.name, "p.key=", p.key, "diao.default_data[p.key].visible=", diao.default_data[p.key].visible)
                    }
                    
                    this.content.height = contentHeight
                }

                // this.blockUi.active = true
                setTimeout(() => {
                    if(cc.isValid(this.node)){
                        func()
                    }
                }, item_index*10);
                item_index++
            }
            this._metadata = diao.default_data
        }        
    }
}
