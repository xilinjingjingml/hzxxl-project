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
export default class GameSession extends BaseUI {
    itemPrefab: cc.Node = null
    contentNode: cc.Node = null
    itemPrefabCache: cc.Node[] = new Array()

    @property(cc.Color)
    itemColerList: cc.Color[] = new Array()

    @property(cc.Node)
    nodeBtnQuickGame:cc.Node = null;

    
    @property(cc.Button)
    btn10017: cc.Button = null;
    @property(cc.Button)
    btn10018: cc.Button = null;
    @property(cc.Label)
    labelNum10017: cc.Label = null;
    @property(cc.Label)
    labelNum10018: cc.Label = null;

    @property(cc.Node)
    nodeDDZItems:cc.Node = null;

    toggle: cc.Node = null
    toggleItem: cc.Node = null
    curGameLabel: string = ""
    curMatch: IMatchInfo = null
    gameName = {
        [Constants.GAME_TYPE_LABLE.MAJIONG_HZXL]: { name: "红中血流", image: "component/GameSession/images/game_name/hongzhongxueliu" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL]: { name: "6红中血流", image: "component/GameSession/images/game_name/6hongzhong" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL]: { name: "8红中血流", image: "component/GameSession/images/game_name/8hongzhong" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XLCH]: { name: "血流成河", image: "component/GameSession/images/game_name/xueliuchenghe" },
        [Constants.GAME_TYPE_LABLE.MAJIONG_XZHSZ]: { name: "血战换三张", image: "component/GameSession/images/game_name/xuezhanhuansanzhang" },
        [Constants.GAME_TYPE_LABLE.DDZ_BXP]: { name: "不洗牌", image: "component/GameSession/images/game_name/buxipai" },
        [Constants.GAME_TYPE_LABLE.DDZ_SANREN]: { name: "叫三分", image: "component/GameSession/images/game_name/jsf" },
        [Constants.GAME_TYPE_LABLE.DDZ_QDZ]: { name: "抢地主", image: "component/GameSession/images/game_name/qdz" },
        [Constants.GAME_TYPE_LABLE.DDZ_ERDDZ]: { name: "二人斗地主", image: "component/GameSession/images/game_name/erren01" },

        // [Constants.GAME_TYPE_LABLE.GDMJ_TDH]: { name: "推倒胡", image: "component/GameSession/images/game_name/hongzhongxueliu" },
    }

    onOpen() {
    }

    
    show10017Gift(){
        if(Helper.isAudit()){
            return;
        }
        let jiabeiInfo = Helper.GetSuperDoubleCardShopInfo()
        if (jiabeiInfo) {
            UIMgr.OpenUI("component/FirstChargeBox/FirstChargeBox", {
                index: 99, param: {
                    shopBoxInfo: jiabeiInfo,
                    isInLobby:true,
                }
            })
        }
    }
    
    show10018Gift(){
        if(Helper.isAudit()){
            return;
        }
        let jipaiqiInfo = Helper.GetRecorderCardShopInfo()
            if (jipaiqiInfo) {
                UIMgr.OpenUI("component/FirstChargeBox/FirstChargeBox", {
                    index: 99, param: {
                        shopBoxInfo: jipaiqiInfo,
                        isInLobby:true,
                    }
                })
            }
    }


    protected start(): void {
        this.itemPrefab = cc.find("center/scrollView/view/content/item", this.node)
        this.itemPrefab.active = false
        this.contentNode = cc.find("center/scrollView/view/content", this.node)

        this.toggle = cc.find("center/tab/toggle", this.node)
        this.toggleItem = cc.find("toggle1", this.toggle)
        this.toggleItem.active = false

        this.setActive("center/tip", false)
        this.setActive("blockUi", false)



        
        console.log("GameSession openId", User.Data.openId)
        console.log("GameSession param", this.param)

        this.param.labels = this.param.labels || []
        this.initData()
        this.initEvent()
        this.initButton()

        if (this.param.labels.length == 0) {
            this.setActive("center/tip", true)
        }


        //斗地主适配
        this.nodeDDZItems.active = Helper.IsDDZGame();
        this.showItemNum();
        this.btn10017.node.on("click", this.show10017Gift, this);
        this.btn10018.node.on("click", this.show10018Gift, this);
        // this.setActive("top/left/btnHelp", Helper.IsDDZGame())
    
        if(Helper.IsDDZGame()){
            this.setActive("center/btnDoubleCard", false)
            this.setActive("center/btnCappedCard", false)
            this.nodeBtnQuickGame.active = false;
        }
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.UPDATE_USER_ITEM, () => {
            this.onChangeLabel(this.curGameLabel)
            this.setLabelValue("center/btnDoubleCard/Background/Label", User.DoubleCard)
            this.setLabelValue("center/btnCappedCard/Background/Label", User.CappedCard)

            this.showItemNum();
        }, this)
    }

    
    showItemNum(){
        // 显示道具剩余
        let count10018 = 0;
        if (User.Data.items[Constants.ITEM_INDEX.RecorderCard]) {
            count10018 = User.Data.items[Constants.ITEM_INDEX.RecorderCard].num
        }
        let count10017 = 0;
        if (User.Data.items[Constants.ITEM_INDEX.SuperDoubleCard]) {
            count10017 = User.Data.items[Constants.ITEM_INDEX.SuperDoubleCard].num
        }

        let strcount10018 = count10018 + ""
        let strcount10017 = count10017 + ""
        this.labelNum10018.string = strcount10018;
        this.labelNum10017.string = strcount10017;
}


    initButton() {
        this.setButtonClick("top/left/btnClose", () => {
            DataMgr.setData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO, null)
            this.close()
        })

        this.setButtonClick("top/left/btnHelp", () => {
            UIMgr.OpenUI("component/Rule/Rule", { single: true, param: { label: this.curGameLabel } })
        })

        this.setButtonClick("center/btnTeHui", () => {
            UIMgr.OpenUI("component/SpecialGiftBag/SpecialGiftBag", { single: true, param: {} , closeCb: ()=>{
                this.checkShowTeHui()
            }})
        })        

        this.setButtonClick("center/btnDoubleCard", () => {
            UIMgr.OpenUI("component/DoubleCard/DoubleCard", { single: true, param: {} })
        })

        this.setButtonClick("center/btnCappedCard", () => {
            UIMgr.OpenUI("component/DoubleCard/DoubleCard", { single: true, param: { showItemId: Constants.ITEM_INDEX.MJ_CAPPED_CARD } })
        })

        this.setButtonClick("center/btnCreateRoom", () => {
            UIMgr.OpenUI("component/PrivateRoom/PrivateRoom", {single:true, param:{}})
        })

        this.setButtonClick("center/btnJoinRoom", () => {
            UIMgr.OpenUI("component/PrivateRoom/JoinRoom", {single:true, param:{}})
        })
    }

    initData() {
        let showBean = false
        let matchInfo: IMatchInfo = DataMgr.getData(Constants.DATA_DEFINE.GAMEING_MATCH_INFO)
        console.log("matchInfo", matchInfo)
        let curLabel = this.param.labels[0]
        if (this.param.curLabel) {
            curLabel = this.param.curLabel
        } else if (matchInfo) {
            curLabel = matchInfo.labals
        }

        for (let v of this.param.labels) {
            if(this.gameName[v]){
                let itemNode = cc.instantiate(this.toggleItem)
                itemNode.active = true
                itemNode.parent = this.toggle

                this.setLabelValue("Background/name", itemNode, this.gameName[v].name)
                this.setLabelValue("checkmark/name", itemNode, this.gameName[v].name)

                if (curLabel.indexOf(v) >= 0) {
                    itemNode.getComponent(cc.Toggle).isChecked = true
                    this.onChangeLabel(v)
                }

                this.setToggleClick(itemNode, () => {
                    this.onChangeLabel(v)
                })

                if (v == Constants.GAME_TYPE_LABLE.MAJIONG_8HZXL) {
                    showBean = true
                }
            }
        }


        if (showBean) {
            this.setChildParam("top/right/BaseTopRight", { showBean: true })
        }

        this.setLabelValue("center/btnDoubleCard/Background/Label", User.DoubleCard)
        this.setLabelValue("center/btnCappedCard/Background/Label", User.CappedCard)
        
        this.checkShowTeHui()
    }

    onChangeLabel(label: string) {
        if (!label) {
            return
        }
        this.curMatch = null
        this.curGameLabel = label
        this.setSpriteFrame("top/left/name", this.gameName[label].image, false)
        this.contentNode.removeAllChildren()

        let list = MatchSvr.getMatchList(label)

        let shwoCurNode: cc.Node = null
        let normalCurNode: cc.Node = null   //默认显示第一个(没钱的情况下)
        for (let i = 0; i < list.length; i++) {
            let itemNode = null
            if (this.itemPrefabCache[i]) {
                itemNode = this.itemPrefabCache[i]
                itemNode.parent = this.contentNode
            } else {
                itemNode = cc.instantiate(this.itemPrefab)
                itemNode.active = true
                itemNode.parent = this.contentNode
                this.itemPrefabCache.push(itemNode)
            }

            // console.log("GameSession i", i)

            this.setActive("ani", itemNode, false)
            this.setSpriteFrame("bg", itemNode, "component/GameSession/images/bg" + i)
            this.setSpriteFrame("title", itemNode, "component/GameSession/images/title" + i)

            let matchInfo = list[i]
            if (matchInfo.metadata && matchInfo.metadata.gs_properties) {
                let gs_properties = matchInfo.metadata.gs_properties
                this.setLabelValue("bet/num", itemNode, gs_properties.bet)
                this.setLabelInfo("bet/num", itemNode, { font: "component/GameSession/fonts/font" + i })
                if (gs_properties.red_zhong > 0) {
                    this.setSpriteFrame("mark/spt", itemNode, "component/GameSession/images/renyihuan1")
                } else {
                    this.setSpriteFrame("mark/spt", itemNode, "component/GameSession/images/huansanzhang")
                }
                gs_properties.item_limit.max = gs_properties.item_limit.max || 0
                if (gs_properties.item_limit.max > 0) {
                    this.setLabelValue("gate/ticketsNum", itemNode, Helper.FormatNumWYCN(gs_properties.item_limit.min) + "-" + Helper.FormatNumWYCN(gs_properties.item_limit.max))
                } else {
                    this.setLabelValue("gate/ticketsNum", itemNode, Helper.FormatNumWYCN(gs_properties.item_limit.min) + "以上")
                }
                this.setLabelInfo("gate/ticketsNum", itemNode, { color: this.itemColerList[i] })

                if (gs_properties.settle_item == Constants.ITEM_INDEX.GAME_BEAN) {
                    this.setSpriteFrame("gate/ticketsIcon", itemNode, "image/common_hzxl/item_10006")
                }

                let userItem = User.Items[gs_properties.settle_item]
                if (userItem && userItem.num >= gs_properties.item_limit.min &&
                    (gs_properties.item_limit.max == 0 || (gs_properties.item_limit.max > 0 && userItem.num <= gs_properties.item_limit.max))) {
                        shwoCurNode = itemNode
                        this.curMatch = matchInfo
                }
            }

            this.clearButtonClick("btn", itemNode)
            this.setButtonClick("btn", itemNode, () => {
                console.log("GameSession i", i, matchInfo)
                this.onGameRoomClick(matchInfo)
            })

            normalCurNode = normalCurNode || itemNode
        }

        shwoCurNode = shwoCurNode || normalCurNode
        if (shwoCurNode) {
            this.setActive("ani", shwoCurNode, true)
        }

        this.curMatch = this.curMatch || list[0]

        let param = {
            label: label,
            callback: (res) => {
                if (res && res.ret == 1) {
                    this.setActive("blockUi", true)
                }
            }
        }
        this.setChildParam("bottom/right/btnQuickGame", param)

        let hasPrivateRoom = false
        // let privatelist = MatchSvr.getPrivateMatch()
        // for(let v of privatelist){
        //     if(v.labals.indexOf(label) >= 0){
        //         hasPrivateRoom = true
        //         break
        //     }
        // }        
        this.setActive("center/btnCreateRoom", hasPrivateRoom)
        this.setActive("center/btnJoinRoom", hasPrivateRoom)

    }

    onGameRoomClick(matchInfo: any) {
        MatchSvr.checkRealTimeMatch((res) => {
            if (null === res) {
                let gs_properties = matchInfo.metadata.gs_properties
                if (gs_properties) {
                    let userItem = User.Items[gs_properties.settle_item]
                    if (gs_properties.item_limit.max && userItem && userItem.num > gs_properties.item_limit.max) {
                        let newMatchInfo = MatchSvr.getSuitedMatch(matchInfo.labals)
                        if (newMatchInfo) {
                            let name = newMatchInfo.name.substr(-3)
                            UIMgr.OpenUI("component/Activity/EarnMore", {
                                single: true, param: {
                                    name: name, confirm: () => {
                                    this.onGameRoomClick(newMatchInfo)
                                    }
                                }
                            })
                            // let name = newMatchInfo.name.substr(-3)
                            // UIMgr.OpenUI("component/Base/GamePop", {
                            //     param: {
                            //         msg: "大神，您的实力太强了，推荐您前往"+name+"哦！",
                            //         confirm: () => {
                            //             this.onGameRoomClick(newMatchInfo)
                            //         }
                            //     }
                            // })
                        } else {
                            Helper.OpenTip("暂无场次")
                        }
                    } else if (userItem && userItem.num >= gs_properties.item_limit.min) {
                        PlatformApi.enterGame(matchInfo)
                        this.setActive("blockUi", true)
                    } else {
                        if (gs_properties.settle_item == DataMgr.data.Config.mainItemId) {
                            Helper.checkLackMoney(gs_properties.item_limit.min, (res) => {
                                if (res.isBuy) {
                                    this.onGameRoomClick(matchInfo)
                                } else if (this.curMatch) {
                                    console.log("checkLackMoney box", res.exchangeBox)
                                    console.log("checkLackMoney this.curMatch", this.curMatch)
                                    if (res.exchangeBox && this.curMatch.matchId != matchInfo.matchId) {
                                        let param = {
                                            matchInfo: this.curMatch,
                                            exchangeBox: res.exchangeBox,
                                            confirm: () => {
                                                this.onGameRoomClick(matchInfo)
                                            },
                                            cancel: () => {
                                                this.onGameRoomClick(this.curMatch)
                                            }
                                        }
                                        UIMgr.OpenUI("component/Activity/DropMatch", { single: true, param: param })
                                    } else {
                                        Helper.checkBroke(gs_properties.item_limit.min, (res) => {
                                            if (res.isBuy) {
                                                this.onGameRoomClick(matchInfo)
                                            }
                                        })
                                    }
                                }
                            })
                        } else if (gs_properties.settle_item == Constants.ITEM_INDEX.GAME_BEAN) {
                            UIMgr.OpenUI("component/Shop/ExchangeBean", { single: true, param: { matchInfo: matchInfo } })
                        }
                    }
                } else {
                    console.log("gs_properties is nil")
                }
            }
        })
    }

    checkShowTeHui(){
        if(Helper.isAudit()){
            this.setActive("center/btnTeHui", false)
        }else{
            let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if(boxs){
                for (let k in boxs[Constants.SHOP_TYPE.PREFERENCE]) {
                    let box = boxs[Constants.SHOP_TYPE.PREFERENCE][k]
                    if(box.param && box.param.show_in_tehui == 1){
                        this.setActive("center/btnTeHui", !box.isBuy)
                        break
                    }
                }
            }
        }
    }
}
