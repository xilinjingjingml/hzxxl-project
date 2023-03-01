
import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { NewGateMgr } from "../../../start/script/base/NewGateMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";

const { ccclass, property } = cc._decorator;

let cfg = {
    "name": "红中麻将",
    "subCcb": "PersonRoomMiniGameRule43",
    "ruleFlag": 0,
    "roomCardIndex": 1196,
    "baseType": 373040,
    "diao": {
        "hGap": 17,
        "flag": 0,
        "perform": [
            {
                "key": "money_basebet",
                "name": "金币底注",
                "gap": 30,
                "content": [
                    {
                        "type": "select_control",
                        "key": "settlement_money40",
                        "data_key": "money_basebet",
                        "value": 40,
                        "name": 40,
                        "isBaseMoney": true,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "settlement_money300",
                        "data_key": "money_basebet",
                        "value": 300,
                        "name": 300,
                        "isBaseMoney": true,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "settlement_money1000",
                        "data_key": "money_basebet",
                        "value": 1000,
                        "name": 1000,
                        "isBaseMoney": true,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "input_control",
                        "key": "settlement_money_input",
                        "data_key": "money_basebet",
                        "default_value": 2000,
                        "min_value": 100,
                        "max_value": 2000000,
                        "isBaseMoney": true,
                        "date_change": [

                        ]
                    }
                ]
            },
            {
                "key": "score_basebet",
                "name": "积分底注",
                "gap": 50,
                "content": [
                    {
                        "type": "select_control",
                        "key": "settlement_score1",
                        "data_key": "score_basebet",
                        "value": 1,
                        "name": 1,
                        "isBaseMoney": false,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "settlement_score2",
                        "data_key": "score_basebet",
                        "value": 2,
                        "name": 2,
                        "isBaseMoney": false,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "settlement_score5",
                        "data_key": "score_basebet",
                        "value": 5,
                        "name": 5,
                        "isBaseMoney": false,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "input_control",
                        "key": "settlement_score_input",
                        "data_key": "score_basebet",
                        "default_value": 20,
                        "min_value": 1,
                        "max_value": 10000,
                        "isBaseMoney": false,
                        "date_change": [

                        ]
                    }
                ]
            },
            {
                "key": "base_room_time",
                "name": "房间时长",
                "gap": 25,
                "content": [
                    {
                        "type": "select_control",
                        "key": "base_room_time4",
                        "data_key": "base_room_time",
                        "value": 4,
                        "name": "4局",
                        "needRoomCard": 20,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "base_room_time8",
                        "data_key": "base_room_time",
                        "value": 8,
                        "name": "8局",
                        "needRoomCard": 40,
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "base_room_time16",
                        "data_key": "base_room_time",
                        "value": 16,
                        "name": "16局",
                        "needRoomCard": 80,
                        "date_change": [

                        ]
                    }
                ]
            },
            {
                "key": "player_max",
                "name": "游戏人数",
                "gap": 40,
                "content": [
                    {
                        "type": "select_control",
                        "key": "player_max_4",
                        "data_key": "player_max",
                        "value": 4,
                        "name": "4人",
                        "date_change": [

                        ],
                        "gameBaseType": [
                            373040
                        ],
                        "maxTablePlayerNum": 4
                    },
                    {
                        "type": "select_control",
                        "key": "player_max_3",
                        "data_key": "player_max",
                        "value": 3,
                        "name": "3人",
                        "date_change": [

                        ],
                        "gameBaseType": [
                            373050
                        ],
                        "maxTablePlayerNum": 3
                    }
                ]
            },
            {
                "key": "game_hupai",
                "name": "胡牌设置",
                "gap": 18,
                "content": [
                    {
                        "type": "select_control",
                        "key": "game_hupai_0",
                        "data_key": "game_hupai",
                        "value": 0,
                        "name": "点炮胡",
                        "date_change": [
                            {
                                "key": "game_hupai_2",
                                "visible": true,
                                "value": 0
                            }
                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "game_hupai_1",
                        "data_key": "game_hupai",
                        "value": 1,
                        "name": "自摸胡",
                        "date_change": [
                            {
                                "key": "game_hupai_2",
                                "visible": false
                            }
                        ]
                    },
                    {
                        "type": "check_control",
                        "key": "game_hupai_2",
                        "data_key": "game_hupai_2",
                        "name": "红中不接炮",
                        "date_change_false": [

                        ],
                        "date_change": [

                        ]
                    }
                ]
            },
            {
                "key": "game_rule",
                "name": "玩法设置",
                "gap": 18,
                "content": [
                    {
                        "type": "check_control",
                        "key": "game_rule_0",
                        "data_key": "game_rule_0",
                        "name": "庄闲算分",
                        "date_change_false": [

                        ],
                        "date_change": [

                        ]
                    },
                    {
                        "type": "check_control",
                        "key": "game_rule_1",
                        "data_key": "game_rule_1",
                        "name": "红中癞子",
                        "date_change_false": [

                        ],
                        "date_change": [

                        ]
                    },
                    {
                        "type": "check_control",
                        "key": "game_rule_2",
                        "data_key": "game_rule_2",
                        "name": "可胡7对",
                        "date_change_false": [

                        ],
                        "date_change": [

                        ]
                    },
                    {
                        "type": "check_control",
                        "key": "game_rule_3",
                        "data_key": "game_rule_3",
                        "name": "飘分",
                        "date_change_false": [

                        ],
                        "date_change": [

                        ]
                    },
                    {
                        "type": "check_control",
                        "key": "game_rule_4",
                        "data_key": "game_rule_4",
                        "name": "抢杠胡",
                        "date_change_false": [

                        ],
                        "date_change": [

                        ]
                    },
                    {
                        "type": "check_control",
                        "key": "game_rule_5",
                        "data_key": "game_rule_5",
                        "name": "强制胡牌",
                        "date_change_false": [

                        ],
                        "date_change": [

                        ]
                    }
                ]
            },
            {
                "key": "game_zhuaniao",
                "name": "抓鸟设置",
                "gap": 18,
                "content": [
                    {
                        "type": "select_control",
                        "key": "game_zhuaniao_0",
                        "data_key": "game_zhuaniao",
                        "value": 2,
                        "name": "2鸟",
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "game_zhuaniao_1",
                        "data_key": "game_zhuaniao",
                        "value": 4,
                        "name": "4鸟",
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "game_zhuaniao_2",
                        "data_key": "game_zhuaniao",
                        "value": 6,
                        "name": "6鸟",
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "game_zhuaniao_5",
                        "data_key": "game_zhuaniao",
                        "value": 0,
                        "name": "不抓",
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "game_zhuaniao_3",
                        "data_key": "game_zhuaniao",
                        "value": 11,
                        "name": "一码全中",
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "game_zhuaniao_4",
                        "data_key": "game_zhuaniao",
                        "value": 12,
                        "name": "摸几奖几",
                        "date_change": [

                        ]
                    }
                ]
            },
            {
                "key": "game_niaofen",
                "name": "鸟分设置",
                "gap": 18,
                "content": [
                    {
                        "type": "select_control",
                        "key": "game_niaofen_1",
                        "data_key": "game_niaofen",
                        "value": 1,
                        "name": "鸟1分",
                        "date_change": [

                        ]
                    },
                    {
                        "type": "select_control",
                        "key": "game_niaofen_2",
                        "data_key": "game_niaofen",
                        "value": 2,
                        "name": "鸟2分",
                        "date_change": [

                        ]
                    }
                ]
            }
        ],
        "default_data": {
            "settlement": {
                "data_key": "settlement_score",
                "value": 1,
                "visible": true
            },
            "money_basebet": {
                "data_key": "settlement_money40",
                "value": 40,
                "visible": false
            },
            "score_basebet": {
                "data_key": "settlement_score1",
                "value": 1,
                "visible": true
            },
            "base_room_time": {
                "data_key": "base_room_time8",
                "value": 8,
                "visible": true
            },
            "game_hupai": {
                "data_key": "game_hupai_1",
                "value": 1,
                "visible": true
            },
            "game_rule": {
                "value": 0,
                "visible": true
            },
            "game_rule_0": {
                "data_key": "game_rule_0",
                "value": 0,
                "visible": false
            },
            "game_rule_1": {
                "data_key": "game_rule_1",
                "value": 0,
                "visible": false
            },
            "game_rule_2": {
                "data_key": "game_rule_2",
                "value": 1,
                "visible": true
            },
            "game_rule_3": {
                "data_key": "game_rule_3",
                "value": 0,
                "visible": true
            },
            "game_rule_4": {
                "data_key": "game_rule_4",
                "value": 1,
                "visible": true
            },
            "game_rule_5": {
                "data_key": "game_rule_5",
                "value": 0,
                "visible": true
            },
            "game_hupai_2": {
                "data_key": "game_hupai_2",
                "value": 0,
                "visible": false
            },
            "game_zhuaniao": {
                "data_key": "game_zhuaniao_2",
                "value": 6,
                "visible": true
            },
            "game_niaofen": {
                "data_key": "game_niaofen_1",
                "value": 1,
                "visible": true
            },
            "player_max": {
                "data_key": "player_max_4",
                "value": 4,
                "visible": true
            }
        }
    }
}

const UNSEL_COLOR = cc.color().fromHEX("#9F9797")
const SEL_COLOR = cc.color().fromHEX("#945B25")

@ccclass
export default class PrivateRoom extends BaseUI {
    @property(cc.Node)
    tabPrefab: cc.Node = null

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
    selectGroupContent: cc.Node = null
    @property(cc.Node)
    selectGroupItem: cc.Node = null
    @property(cc.Node)
    contentScrollView: cc.Node = null

    @property(cc.Node)
    blockUi: cc.Node = null

    itemNodeList: cc.Node[] = new Array()

    _curMatch: IMatchInfo = null
    _metadata: any = null
    _curLabel: any = {}

    selectGroupCallBack = null
    loadCount = 0
    onLoad() {
        this.itemPrefab.active = false
        this.selectPrefab.active = false
        this.inputPrefab.active = false
        this.checkPrefab.active = false
        this.selectGroupPrefab.active = false
        this.selectGroupContent.active = false
        this.selectGroupItem.active = false
    }

    start() {
        this.initNode()
        this.initEvent()
        this.initData()
    }

    onOpen() {

    }

    initNode() {
        this.tabPrefab.active = false
    }

    initEvent() {
        this.setButtonClick("top/left/btnClose", () => this.close())
        this.setButtonClick("center/btnRecord", this.onPressRecord.bind(this))
        this.setButtonClick("center/btnStart", this.onPressStart.bind(this))
        this.setButtonClick("center/btnJipaiqi", this.onPressJipaiqi.bind(this))

        if(Helper.IsDDZGame()){
            this.setActive("center/btnJipaiqi", false)
        }

        this.contentScrollView.on("scrolling", ()=>{
            this.closeSelectGroupContent()
        }, this)
    }

    initData() {
        this.initTabs()
        // let m = {
        //     matchId: "aaaa",
        //     metadata: {
        //         private: cfg
        //     }
        // }
        // this.initSet(m)
    }

    initTabs() {
        let list = MatchSvr.getPrivateMatch()
        console.log("PrivateRoom initTabs", list)
        for (let i = 0; i < list?.length; i++) {
            let item = cc.instantiate(this.tabPrefab)
            item.parent = this.tabPrefab.parent
            item.active = true

            this.setLabelValue("Background/name", item, list[i].name)
            this.setLabelValue("checkmark/name", item, list[i].name)
            this.setButtonClick("checkmark/btnHelp", item, this.onPressHelp.bind(this, list[i]))
            this.setButtonClick(item, this.onPressGame.bind(this, list[i]))

            !i && this.checkRuleConfig(list[i])
            !i && this.initSet(list[i])
            !i && (item.getComponent(cc.Toggle).isChecked = true)
        }

        this.setActive("center/tip", !list?.length)
    }

    checkRuleConfig(match: IMatchInfo) {
        if (match.metadata?.private) {
            let diao = match.metadata.private?.diao
            if (!diao) {
                return
            }
        }
    }

    initSet(match: IMatchInfo) {
        console.log("initSet", match)
        this._curMatch = match

        this.contentScrollView.getComponent(cc.ScrollView).stopAutoScroll()
        this.contentScrollView.getComponent(cc.ScrollView).scrollToTop()
        let contentHeight = 0
        this.content.removeAllChildren()
        // let node = this.getNode(match.matchId, this.content)
        // this.content.children.forEach(i => i.active = false)
        // if (node.name !== match.matchId) {
        {
            if (match.metadata?.cl_params) {
                let diao = match.metadata.cl_params?.diao
                if (!diao) {
                    return
                }
                diao = JSON.parse(JSON.stringify(diao))
                // let lay = node.addComponent(cc.Layout)
                // lay.type = cc.Layout.Type.VERTICAL
                // lay.resizeMode = cc.Layout.ResizeMode.CONTAINER
                // lay.spacingY = diao.hGap || 5

                let node = this.content
                // node.width = this.content.width

                let index = 0
                for (let p of diao.perform) {
                    let func = () => {
                        let itemNode = cc.instantiate(this.itemPrefab)
                        itemNode.name = p.key
                        itemNode.active = true
                        this.itemNodeList.push(itemNode)
                        this.setLabelValue("name/label", itemNode, p.name + ":")
                        let name = this.getNode("name", itemNode)
                        let nw = name.x + name.width + 30
                        // nw = 0
                        let item_width = (this.itemPrefab.width - nw) / (p.distance)
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

                                ci.on("toggle", () => {
                                    this._metadata[p.key].data_key = c.key
                                    this._metadata[p.key].value = c.value
                                    if (p.tip) {
                                        this._curLabel[p.key] = c.name
                                    }
                                    for (let dc of c.date_change || []) {
                                        if(this._metadata[dc.key]){
                                            this._metadata[dc.key].enable = dc.enable
                                        }
                                        for (let v of this.itemNodeList) {
                                            let container = v.getChildByName("container")
                                            if(v.name == dc.key){
                                                for(let node of container.children){
                                                    if(node.getComponent(cc.Toggle)){
                                                        node.getComponent(cc.Toggle).interactable = dc.enable
                                                        this.setLabelInfo("name", node, { color: dc.enable ? SEL_COLOR : UNSEL_COLOR })
                                                    }
                                                }
                                                break
                                            }
                                            for(let node of container.children){
                                                if(node.name == dc.key && (dc.enable == false || dc.enable == true)){
                                                if(node.getComponent(cc.Toggle)){
                                                    node.getComponent(cc.Toggle).interactable = dc.enable
                                                    this.setLabelInfo("name", node, { color: dc.enable ? SEL_COLOR : UNSEL_COLOR })
                                                }}
                                            }
                                        }
                                    }
                                })

                                ci.parent = this.getNode("container", itemNode)
                            } else if (c.type === "input_control") {
                                ci = cc.instantiate(this.inputPrefab)
                                let editBox: cc.Node = this.getNode("edit", ci)

                                ci.on("toggle", () => {
                                    this._metadata[p.key].data_key = c.key
                                    this._metadata[p.key].value = c.default_value
                                    for (let dc of c.date_change || []) {
                                        this.setActive(dc.key, node, dc.visible)
                                    }

                                    if (editBox.getComponent(cc.EditBox).string != c.default_value) {
                                        editBox.getComponent(cc.EditBox).string = c.default_value
                                    }

                                    if (p.tip) {
                                        this._curLabel[p.key] = c.default_value + c.name
                                    }
                                })

                                //设置输入完成回调
                                let editBox_EditBox = editBox.getComponent(cc.EditBox)
                                let eventName = "cc.EditBox" + editBox.name + "_click"
                                editBox_EditBox[eventName] = (sender, customEventData) => {
                                    console.log("sender.getComponent(cc.EditBox).string", sender.getComponent(cc.EditBox).string)
                                    let value = sender.getComponent(cc.EditBox).string
                                    value = Number(value)
                                    if (isNaN(value)) {
                                        value = c.default_value
                                    }
                                    value = value < c.min_value ? c.min_value : value
                                    value = value > c.max_value ? c.max_value : value
                                    sender.getComponent(cc.EditBox).string = value
                                    this._metadata[p.key].data_key = c.key
                                    this._metadata[p.key].value = value
                                    ci.getComponent(cc.Toggle).isChecked = true

                                    if (p.tip) {
                                        this._curLabel[p.key] = value + c.name
                                    }
                                }

                                editBox_EditBox.editingDidEnded = editBox_EditBox.editingDidEnded || []

                                let endedHandler = new cc.Component.EventHandler()
                                endedHandler.target = editBox
                                endedHandler.component = "cc.EditBox"
                                endedHandler.handler = eventName
                                endedHandler.customEventData = "customData"

                                editBox_EditBox.editingDidEnded.push(endedHandler)

                                ci.parent = this.getNode("container", itemNode)
                            } else if (c.type === "check_control") {
                                ci = cc.instantiate(this.checkPrefab)
                                this.setLabelValue("name", ci, c.name || "")

                                ci.on("toggle", (target) => {
                                    let dataChange = []
                                    if (target.isChecked) {
                                        dataChange = c.date_change
                                        if (p.tip) {
                                            this._curLabel[p.key] = c.name
                                        }
                                    } else {
                                        dataChange = c.date_change_false
                                        if (this._curLabel[p.key]) {
                                            this._curLabel[p.key] = null
                                        }
                                    }

                                    if(dataChange && dataChange.length > 0){
                                        for (let dc of dataChange) {
                                            if(this._metadata[dc.key]){
                                                if(dc.value !== undefined){
                                                    this._metadata[dc.key].value = dc.value
                                                }
                                                if(dc.enable !== undefined){
                                                    this._metadata[dc.key].enable = dc.enable
                                                }
                                                if(dc.visible !== undefined){
                                                    this._metadata[dc.key].visible = dc.visible
                                                }
                                            }
                                            console.log(this.itemNodeList)
                                            for (let v of this.itemNodeList) {
                                                // if(v.name == dc.key){
                                                    let container = v.getChildByName("container")
                                                    for(let node of container.children){
                                                        if(node.name == dc.key && (dc.enable == false || dc.enable == true)){
                                                            if(node.getComponent(cc.Toggle)){
                                                                node.getComponent(cc.Toggle).interactable = dc.enable
                                                                this.setLabelInfo("name", node, { color: dc.enable ? SEL_COLOR : UNSEL_COLOR })
                                                            }                                                        
                                                        }
                                                    }
                                                    // break
                                                // }
                                            }
                                        }
                                    }
                                })

                                if (diao.default_data[c.key]) {
                                    ci.getComponent(cc.Toggle).isChecked = diao.default_data[c.key].value === 1
                                }

                                // ci.parent = itemNode
                                ci.parent = this.getNode("container", itemNode)
                                this.getNode("container", itemNode).getComponent(cc.ToggleContainer).enabled = false
                            }

                            if(c.check_content && c.check_content.length > 0){
                                console.log("c.check_content", c.check_content)
                                let selectGroup = cc.instantiate(this.selectGroupPrefab)
                                selectGroup.parent = ci                                  
                                selectGroup.active = true
                                this.setLabelValue("name", selectGroup, c.check_content[0].name)
                                for(let v of c.check_content){
                                    if(v.value == diao.default_data[c.data_key].value){
                                        this.setLabelValue("name", selectGroup, v.name)   
                                    }
                                }
                                this.setButtonClick(selectGroup,null, ()=>{
                                    if(this.selectGroupContent.active == true){
                                        this.closeSelectGroupContent()
                                    }else{
                                        this.showSelectGroupContent(selectGroup, c.check_content, (res)=>{
                                            console.log(res)
                                            if(res){
                                                this.setLabelValue("name", selectGroup, res.name)
                                                this._metadata[res.data_key].value = res.value
                                                this._metadata[res.data_key].data_key = res.key
                                            }
                                        })
                                    }
                                }, 0)
                            }
                           
                            ci["isBaseMoney"] = c.isBaseMoney
                            console.log("ci.width=", ci.width)
                            ci.name = c.key
                            ci.active = true

                            if (diao.default_data[p.key].data_key === c.key) {
                                setTimeout(() => {
                                    if(cc.isValid(this.node)){
                                        ci.getComponent(cc.Toggle).isChecked = true
                                        if (p.tip) {
                                            this._curLabel[p.key] = c.name
                                        }
                                    }
                                }, 0);
                            }
                            if(addLine){
                                addLine = false
                                itemNode.height += 70
                            }
                            console.log(c.name, cc.v3(item_x, -itemNode.height + 35))
                            ci.position = cc.v3(item_x, -itemNode.height + 35)                                                 
                                
                            index++
                            if (index == p.distance) {
                                index = 0
                                item_x = nw
                                addLine = true
                            } else {
                                item_x += item_width
                            }
                        }

                        // cc.director.once(cc.Director.EVENT_AFTER_DRAW, () => {
                        //     itemNode.active = diao.default_data[p.key].visible
                        // })

                        itemNode.active = diao.default_data[p.key].visible
                        itemNode.parent = node
                        itemNode.y = -contentHeight
                        if (itemNode.active) {
                            contentHeight += itemNode.height
                        } else {
                            console.log("name=", p.name, "p.key=", p.key, "diao.default_data[p.key].visible=", diao.default_data[p.key].visible)
                        }

                        node.height = contentHeight

                        console.log("name=", p.name, "itemNode.y=", itemNode.y)
                        console.log("itemNode.height ", itemNode.height)
                        console.log("node.height ", node.height)
                    }

                    this.loadCount++
                    this.blockUi.active = true
                    setTimeout(() => {
                        if(cc.isValid(this.node)){
                            func()
                            this.loadCount--
                            if (this.loadCount <= 0) {
                                this.blockUi.active = false
                            }
                        }
                    }, index * 10);
                    index++
                }

                this._metadata = diao.default_data
                // this._metadata.max_player_num = match.metadata.cl_params.play_num

                // node.name = match.matchId
                // node.parent = this.content
                // node.parent.height = node.height
                console.log("node.parent.height", node.parent.height)
            }
        }
        // node.active = true
    }

    onPressRecord() {
        UIMgr.OpenUI("component/PersonalBill/PersonalBill", { single: true, param: {} })
    }

    onPressStart() {
        if(!this._curMatch){
            return
        }
        
        if (this._metadata) {
            this._metadata["fraud"] = {
                fraud: "fraud",
                value: this.getNodeComponent("center/checkFraud", cc.Toggle).isChecked ? 1 : 0
            }
        }

        if(!this._metadata.max_player_num){
            this._metadata.max_player_num = this._curMatch.metadata.cl_params.play_num
        }        

        console.log("onPressStart", this._curMatch)

        this._metadata.match_cid = this._curMatch.matchId
        
        console.log(JSON.stringify(this._metadata))

        console.log("onPressStart", {
            gameId: this._curMatch.gameId,
            roomId: "",
            properties: JSON.stringify(this._metadata),
        })

        let label = ""
        console.log("this._curLabel", this._curLabel)
        for (let key in this._curLabel) {
            if (this._curLabel[key] && this._curLabel[key].length > 0) {
                label += this._curLabel[key] + " "
            }
        }

        MatchSvr.createRoom({
            game_id: this._curMatch.gameId,
            match_cid: this._curMatch.matchId,
            properties: JSON.stringify(this._metadata),
            labels: [label]
        }, (res) => {
            if (res.room && res.room.metadata && res.room.metadata.share_code && res.room.metadata.share_code.length > 0) {
                MatchSvr.getRoomInfo({ share_code: res.room.metadata.share_code }, (res) => {
                    if (res.room) {
                        PlatformApi.joinPrivateGame(res.room, false, false)
                    } else if (res.err && res.err.detail) {
                        Helper.OpenTip(res.err.detail)
                    } else {
                        Helper.OpenTip("房间不存在")
                    }
                })
            // } else if (res.err && res.err.detail) {
            //     Helper.OpenTip(res.err.detail)
            } else {
                Helper.OpenTip("创建房间失败，请稍后再试！")
            }
        })
    }

    onPressJipaiqi() {

    }

    onPressHelp(match: IMatchInfo) {
        UIMgr.OpenUI("component/Rule/RuleDetails", { single: true, param: { label: match.labals } })
    }

    onPressGame(match: IMatchInfo) {
        if (this.loadCount > 0) {
            return
        }
        if (this._curMatch.matchId === match.matchId) {
            return
        }

        this.initSet(match)
    }

    showSelectGroupContent(node:cc.Node, data, callback){
        console.log("showSelectGroupContent", data)
        let pos = this.selectGroupContent.parent.convertToNodeSpaceAR(node.parent.convertToWorldSpaceAR(node.getPosition()))
        this.selectGroupCallBack = callback
        this.selectGroupContent.width = node.width        
        this.selectGroupContent.active = true
        this.selectGroupContent.removeAllChildren()
        for(let v of data){
            let itemNode = cc.instantiate(this.selectGroupItem)
            itemNode.active =true
            itemNode.parent = this.selectGroupContent
            this.setLabelValue(itemNode, v.name)

            this.setButtonClick(itemNode, ()=>{
                callback(v)
                this.closeSelectGroupContent()
            })
        }
        if(pos.y > 0){
            this.selectGroupContent.anchorY = 1
            this.selectGroupContent.x = pos.x
            this.selectGroupContent.y = pos.y-node.height/2
        }else{
            this.selectGroupContent.anchorY = 0
            this.selectGroupContent.x = pos.x
            this.selectGroupContent.y = pos.y+node.height/2
        }
    }

    closeSelectGroupContent(){
        this.selectGroupCallBack = null   
        this.selectGroupContent.active = false        
        this.selectGroupContent.removeAllChildren()
    }
}
