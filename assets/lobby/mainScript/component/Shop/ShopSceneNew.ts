/**
 * Creater by Jin on 2022.3.7
 */

import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv, VipPrivilegeSrv } from "../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../start/script/system/AdSrv";
import { ExchangeSrv } from "../../../start/script/system/ExchangeSrv";
import { Helper } from "../../../start/script/system/Helper";
import { ShopSvr } from "../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";

// 0:特惠 1:钻石 2:金币 3:道具
 export enum ShopType {
    None = 0,
    Sale,
    Diamond,
    Gold,
    Prop,
    Exchange,
    Max,
}

interface ItemDataInfo {
    name: string 
    price: number
    payType: number   //支付类型  0免费，1支付，2广告，3跳转置免输卡界面, 其他-兑换道具ID
    items: IItemInfo[]
    btnClick: Function
    discount?: number
    gift?: number
    vipPrivilege?: any
}

interface activityNode {
    activityId: number
    node:cc.Node
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class ShopSceneNew extends BaseUI {
    curBox: IShopInfo = null
    curTab: ShopType = ShopType.None //当前显示
    activityNodeList:activityNode[] = new Array()

    @property(cc.SpriteFrame)
    diamondSFList:cc.SpriteFrame[] = new Array()
    @property(cc.SpriteFrame)
    goldSFList:cc.SpriteFrame[] = new Array()

    @property(cc.Node)
    contentNode:cc.Node = null
    @property(cc.Node)
    itemPrefab:cc.Node= null
    @property(cc.Node)
    yaoJinBiNode:cc.Node = null
    @property(cc.Material)
    grayMaterial: cc.Material = null;
    protected start(): void {
        this.initButton()
        this.initEvent()

        //初始化界面
        this.itemPrefab.active = false  
        this.yaoJinBiNode.active = false

        if(Helper.IsDDZGame()){
            this.setActive("node/tab/toggle1", false)
            this.setActive("node/tab/toggle4", true)
        }else{
            this.setActive("node/tab/toggle1", true)
            this.setActive("node/tab/toggle4", true)
        }


        if(Helper.isAudit()){
            this.setActive("node/tab/toggle1", false)
            this.setActive("node/tab/toggle2", false)
            this.setActive("node/tab/toggle4", false)
            this.getNode("node/tab/toggle3").getComponent(cc.Toggle).isChecked = true
            this.onPressTab(ShopType.Gold)
        }else{
            let tab = this.param.tab || ShopType.Sale
            if(Helper.IsDDZGame()){
                tab = this.param.tab || ShopType.Diamond
            }
            if(tab == ShopType.Sale){
                this.getNode("node/tab/toggle1").getComponent(cc.Toggle).isChecked = true
            }
            else if(tab == ShopType.Diamond){
                this.getNode("node/tab/toggle2").getComponent(cc.Toggle).isChecked = true
            }
            else if(tab == ShopType.Gold){
                this.getNode("node/tab/toggle3").getComponent(cc.Toggle).isChecked = true
            }
            else if(tab == ShopType.Prop){
                this.getNode("node/tab/toggle4").getComponent(cc.Toggle).isChecked = true
            }
            else if(tab == ShopType.Exchange){
                this.getNode("node/tab/toggle5").getComponent(cc.Toggle).isChecked = true
            }
            this.onPressTab(tab)
        }
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, this.refreshActivityData, this)
    }

    refreshActivityData(param: any) {
        for(let v of this.activityNodeList){
            let activity = ActivitySrv.GetActivityById(v.activityId)
            if(activity.receive_num >= activity.day_times){
                this.getNode("node/btnBuy", v.node).getComponent(cc.Button).interactable = false
                this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", v.node, "明日再来")
                this.setLabelInfo("node/btnBuy/Background/node/lbl_getMode", v.node, {color: cc.color(61, 65, 68)})
            }else{
                this.getNode("node/btnBuy", v.node).getComponent(cc.Button).interactable = true
            }
        }        
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{this.close()})
        this.setButtonClick("btn", this.yaoJinBiNode, this.onPressRockGold.bind(this))

        for(let i=1;i<=5;i++){
            this.setToggleClick("node/tab/toggle"+i, ()=>{
                this.onPressTab(i)
            })
        }
    }

    getBoxList(type:ShopType): IShopInfo[]{
        let boxList: IShopInfo[] = []
        let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        if (this.curTab == ShopType.Sale) {
            for (let k in boxs[Constants.SHOP_TYPE.PREFERENCE]) {
                if (boxs[Constants.SHOP_TYPE.PREFERENCE][k].param && boxs[Constants.SHOP_TYPE.PREFERENCE][k].param.show_in_shop) {
                    boxList.push(boxs[Constants.SHOP_TYPE.PREFERENCE][k])
                }
            }
        }
        else if (this.curTab == ShopType.Diamond) {
            for (let k in boxs[Constants.SHOP_TYPE.NORMAL]) {
                let hasDiamond = false
                for (let k1 in boxs[Constants.SHOP_TYPE.NORMAL][k].items) {
                    if (boxs[Constants.SHOP_TYPE.NORMAL][k].items[k1].id == Constants.ITEM_INDEX.GAME_DIAMOND) {
                        hasDiamond = true
                        break
                    }
                }
                if (hasDiamond) {
                    boxList.push(boxs[Constants.SHOP_TYPE.NORMAL][k])
                }
            }
        }
        else if (this.curTab == ShopType.Gold) {
        }
        else if (this.curTab == ShopType.Prop) {
            let activityConfig = ActivitySrv.GetActivityById(13)
            if(activityConfig){
                let reward = activityConfig.weight[0].rewards[0]
                let ad: IShopInfo = {
                    boxId: "mianShuKa",
                    type: Constants.SHOP_TYPE.NORMAL,
                    name: activityConfig.name,
                    pic: null,
                    items: [{
                        id: reward.item_id,
                        num: reward.min_num
                    }],
                    worth: 0,
                    price: 0,
                    rate: 0,
                    payType: 3
                };

                ad.param = activityConfig;
                boxList.push(ad);
            }
            if(Helper.IsDDZGame()){
                let PropItemArr = ["10个记牌器", "10张超级加倍卡", "记牌器组合包", "超级加倍卡组合包"]

                for (let k in boxs[Constants.SHOP_TYPE.NORMAL]) {
                    let boxName = boxs[Constants.SHOP_TYPE.NORMAL][k].name
                    if (PropItemArr.indexOf(boxName) >= 0) {
                        boxList.push(boxs[Constants.SHOP_TYPE.NORMAL][k])
                    }
                }

                // 记牌器广告
                let actConfigJipaiqi = ActivitySrv.GetActivityById(1022)
                if (actConfigJipaiqi && actConfigJipaiqi.receive_num < actConfigJipaiqi.day_times) {
                    let reward = actConfigJipaiqi.weight[0].rewards[0]
                    let jipaiqiAD: IShopInfo = {
                        boxId: "AD",
                        type: Constants.SHOP_TYPE.NORMAL,
                        name: "看广告领取",
                        pic: null,
                        items: [{
                            id: reward.item_id,
                            num: reward.min_num
                        }],
                        worth: 0,
                        price: 0,
                        rate: 0,
                        payType: 2
                    };

                    jipaiqiAD.param = actConfigJipaiqi;
                    boxList.push(jipaiqiAD);
                }
                //加倍卡广告
                let actConfigJiabeika = ActivitySrv.GetActivityById(1023)
                if (actConfigJiabeika && actConfigJiabeika.receive_num < actConfigJiabeika.day_times) {
                    let reward = actConfigJiabeika.weight[0].rewards[0]
                    let jipaiqiAD: IShopInfo = {
                        boxId: "AD",
                        type: Constants.SHOP_TYPE.NORMAL,
                        name: "看广告领取",
                        pic: null,
                        items: [{
                            id: reward.item_id,
                            num: reward.min_num
                        }],
                        worth: 0,
                        price: 0,
                        rate: 0,
                        payType: 2
                    };
                    jipaiqiAD.param = actConfigJiabeika;
                    boxList.push(jipaiqiAD);
                }
            }
        }
        return boxList
    }

    onPressTab(tab){
        if(this.curTab == tab){
            return
        }

        this.curTab = tab        
        this.initContent()
    }

    initContent(){
        //摇金币显示
        this.yaoJinBiNode.active = this.curTab == ShopType.Sale

        const widget = this.contentNode.getComponent(cc.Widget)
        widget.left = (this.curTab == ShopType.Sale) ? 280 : 0
        widget.updateAlignment()
        
        this.contentNode.removeAllChildren(true)
        let itemIndex = 0
        if(this.curTab == ShopType.Gold || this.curTab == ShopType.Exchange){
            let param = {
                typeId: 1
            }
            if(this.curTab == ShopType.Exchange){
                param.typeId = 4
            }
            VipPrivilegeSrv.GetPlayerVipPrivilege((vipPrivilege)=>{
                ExchangeSrv.getExchangeTemplateInfo(param, (res)=>{
                    console.log("getExchangeTemplateInfo", res)
                    if (res && res.code == "0000") {                
                        if (res.result) {
                            res.result.sort((a ,b)=>{
                                a.output_list[0].item_num = Number(a.output_list[0].item_num)
                                b.output_list[0].item_num = Number(b.output_list[0].item_num)
                                return a.output_list[0].item_num < b.output_list[0].item_num ? -1 : 1
                            })
                            for(let v of res.result){
                                if(Helper.isAudit("") && v.output_list[0].item_id == Constants.ITEM_INDEX.HuaFei){
                                    continue
                                }
                                if(v.exchange_conditions && v.exchange_conditions.show_in_shop == 1){                                    
                                    let item = cc.instantiate(this.itemPrefab)
                                    item.active = true
                                    item.parent = this.contentNode
    
                                    let itemInfo: ItemDataInfo = {
                                        name: v.output_list[0].item_name, 
                                        price: v.consume_list[0].item_num,
                                        payType: v.consume_list[0].item_id,
                                        items: [],
                                        vipPrivilege : null,
                                        btnClick: ()=>{
                                            this.exchangeTemplateInfo(v)
                                        }                                
                                    }
                                    let name = v.output_list[0].item_name.substr(v.output_list[0].item_name.length-2, 2)
                                    name = UserSrv.GetItemInfo(v.output_list[0].item_id).name
                                    if(v.output_list[0].item_id == Constants.ITEM_INDEX.FreeCard ||
                                        v.output_list[0].item_id == Constants.ITEM_INDEX.MJ_DOUBLE_CARD ||
                                        v.output_list[0].item_id == Constants.ITEM_INDEX.MJ_CAPPED_CARD){
                                            name = "张" + name
                                    }else if(v.output_list[0].item_id == Constants.ITEM_INDEX.HuaFei){
                                        name = "元" + name
                                    }
                                    itemInfo.name = Helper.FormatNumWYCN(v.output_list[0].item_num) + name
                                    for(let d of v.output_list){
                                        itemInfo.items.push({
                                            id: d.item_id,
                                            num: d.item_num,
                                        })
                                    }
                                    itemInfo.discount = v.exchange_conditions ? v.exchange_conditions.discount : null
                                    itemInfo.vipPrivilege = vipPrivilege
                                    if(this.curTab == ShopType.Exchange){
                                        itemInfo.vipPrivilege = null
                                    }
                                    this.initItem(item, itemInfo, itemIndex)
                                    if(v.additional && v.additional > 0){
                                        this.setActive("node/tip", item, true)
                                        this.setLabelValue("node/tip/content/num", item, Helper.FormatNumWYCN(v.additional) + name)
                                    }
                                    itemIndex++
                                }
                            }
                        }
                    }
                })
            })            
        }else{
            //特惠界面加上免费金币
            if(this.curTab == ShopType.Sale){
                let activity = ActivitySrv.GetActivityById(10)
                if(activity){
                    let item = cc.instantiate(this.itemPrefab)
                    item.active = true
                    item.parent = this.contentNode

                    let itemInfo: ItemDataInfo = {
                        name: activity.name, 
                        price: 0,
                        payType: 0,
                        items: [],
                        btnClick: ()=>{                            
                            this.getNode("node/btnBuy", item).getComponent(cc.Button).interactable = false
                            ActivitySrv.OnClickActivity(activity)
                        }
                    }
                    for(let d of activity.weight[0].rewards){
                        itemInfo.items.push({
                            id: d.item_id,
                            num: d.max_num,
                        })
                    }
                    this.initItem(item, itemInfo, itemIndex)
                    itemIndex++
                    if(activity.receive_num >= activity.day_times){
                        this.getNode("node/btnBuy", item).getComponent(cc.Button).interactable = false
                        this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, "明日再来")
                        this.setLabelInfo("node/btnBuy/Background/node/lbl_getMode", item, {color: cc.color(61, 65, 68)})
                    }
                    this.activityNodeList.push({activityId:10, node:item})
                }
            }

            let boxs = this.getBoxList(this.curTab)
            console.log("boxs", boxs)
            for(const d of boxs){
                let item = cc.instantiate(this.itemPrefab)
                item.active = true
                item.parent = this.contentNode
                let itemInfo: ItemDataInfo = {
                    name: d.name, 
                    price: d.price,
                    payType: d.payType || 1,
                    items: [],
                    btnClick: ()=>{
                        if(d.payType == 3){
                            UIMgr.OpenUI("component/Shop/MianShuKaBox", { single: true, param: {} })
                        }else if(d.payType == 2){
                            this.onShowAd(d)
                        }else{
                            this.onPressBuy(d)
                        }
                    }
                }

                for(let k in d.items){
                    itemInfo.items.push(d.items[k])
                }
                itemInfo.discount = d.param ? d.param.discount : null
                itemInfo.gift = d.param ? d.param.gift : null
                this.initItem(item, itemInfo, itemIndex)
                itemIndex++

                if(this.curTab == ShopType.Sale){
                    if(d.isBuy){
                        this.getNode("node/btnBuy", item).getComponent(cc.Button).interactable = false
                        this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, "明日再来")
                        this.setLabelInfo("node/btnBuy/Background/node/lbl_getMode", item, {color: cc.color(61, 65, 68)})
                    }
                }
            }
        }
    }

    initItem(item: cc.Node, data: ItemDataInfo, itemIndex:number){

        let ItemIcon10014 = "image/common_hzxl/item_10014"
        let ItemIcon10015 = "image/common_hzxl/item_10015"
        let ItemIcon10017 = "image/common_hzxl/item_10017"
        let ItemIcon10018 = "image/common_hzxl/item_10018"
        let ItemIcon10019 = "image/common_hzxl/item_10019"
        let ItemIcon10021 = "image/common_hzxl/item_10021"

        this.setActive("node/item_kuang_1", item, this.curTab == ShopType.Sale)
        this.setActive("node/item_kuang_2", item, this.curTab != ShopType.Sale)

        // cc.log("=============>", data, data.name)
        this.setLabelValue("node/lbl_top", item, data.name)
        
        //支付类型  0免费，1支付，2广告，3跳转置免输卡界面, 其他-兑换道具ID
        if(data.payType == 0){
            this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, "免费领取")
        }else if(data.payType == 1){
            this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, "￥" + data.price/100)
        }else if(data.payType == 2){
            this.setActive("node/btnBuy/Background/node/icon_play", item, false)
            this.setActive("node/btnBuy/Background/node/icon_play", item, true)
            this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, "免费领取")
        }else if(data.payType == 3){
            this.setActive("node/hot", item, true)
            this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, "购买")
        }else if(data.payType == Constants.ITEM_INDEX.GAME_DIAMOND){
            this.setActive("node/btnBuy/Background/node/icon", item, true)
            this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, data.price)
        }else if (data.payType == Constants.ITEM_INDEX.FuCard) {
            this.setActive("node/btnBuy/Background/node/icon_fucard", item, true)
            this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, data.price)

            if (data.items[0].id == Constants.ITEM_INDEX.HuaFei) {
                this.setActive("node/btnBuy/Background/node/icon_fucard", item, false)
                this.setLabelValue("node/btnBuy/Background/node/lbl_getMode", item, "敬请期待")
                this.getNode("node/btnBuy", item).getComponent(cc.Button).interactable = false;
                let bg = this.getNode("node/btnBuy/Background", item)
                bg.getComponent(cc.Sprite).setMaterial(0, this.grayMaterial)
            }
        }

        let dataItem = data.items[0]

        let nodeShop = item.getChildByName("node");
        //取道具最多的
        if (data.name == "记牌器组合包" || data.name == "超级加倍卡组合包") {

            this.setActive("nodeItemGift", nodeShop, true)
            this.setActive("icon", nodeShop, false)
            let nMaxNum = 0;
            let nMinNum = 99999999999;
            let nMinData: IItemInfo = null;
            for (let item of data.items) {
                if (item.num >= nMaxNum) {
                    nMaxNum = item.num;
                    dataItem = item
                }
                if (item.num <= nMinNum) {
                    nMinNum = item.num;
                    nMinData = item
                }
            }

            if (nMinData) {
                if (nMinData.id == Constants.ITEM_INDEX.SuperDoubleCard) {
                    this.setSpriteFrame("nodeItemGift/itemitcon2", nodeShop, ItemIcon10017, false)
                    this.setLabelValue("nodeItemGift/labelSend", nodeShop, "送10张加倍卡")
                } else if (nMinData.id == Constants.ITEM_INDEX.RecorderCard) {
                    this.setSpriteFrame("nodeItemGift/itemitcon2", nodeShop, ItemIcon10018, false)
                    this.setLabelValue("nodeItemGift/labelSend", nodeShop, "送10个记牌器")
                }
                this.setLabelValue("nodeItemGift/labelItem_count2", nodeShop, "x" + nMinData.num)
            }

            if (dataItem) {
                if (dataItem.id == Constants.ITEM_INDEX.SuperDoubleCard) {
                    this.setSpriteFrame("nodeItemGift/itemitcon1", nodeShop, ItemIcon10017, false)
                } else if (dataItem.id == Constants.ITEM_INDEX.RecorderCard) {
                    this.setSpriteFrame("nodeItemGift/itemitcon1", nodeShop, ItemIcon10018, false)
                }
                this.setLabelValue("nodeItemGift/labelItem_count1", nodeShop, "x" + dataItem.num)
            }
        }

        if (data.name == "看广告领取") {
            this.setActive("labelItem_count", nodeShop, true)
            this.setLabelValue("labelItem_count", nodeShop, "x" + dataItem.num)
        }


        if(dataItem && dataItem.id == Constants.ITEM_INDEX.GAME_DIAMOND){
            if(itemIndex < this.diamondSFList.length){
                this.setSpriteFrame("node/icon", item, this.diamondSFList[itemIndex], false)
            }else{
                this.setSpriteFrame("node/icon", item, this.diamondSFList[this.diamondSFList.length-1], false)
            }
        }else if(dataItem && dataItem.id == DataMgr.data.Config.mainItemId){    
            if(itemIndex < this.goldSFList.length){        
                this.setSpriteFrame("node/icon", item, this.goldSFList[itemIndex], false)
            }else{
                this.setSpriteFrame("node/icon", item, this.goldSFList[this.goldSFList.length-1], false)
            }
        }else if (dataItem && dataItem.id == Constants.ITEM_INDEX.SuperDoubleCard) {
            this.setSpriteFrame("node/icon", item, ItemIcon10017, false)
        } else if (dataItem && dataItem.id == Constants.ITEM_INDEX.RecorderCard) {
            this.setSpriteFrame("node/icon", item, ItemIcon10018, false)
        } else if (dataItem && dataItem.id == Constants.ITEM_INDEX.FreeCard) {
            this.setSpriteFrame("node/icon", item, ItemIcon10019, false)
        } else if (dataItem && dataItem.id == Constants.ITEM_INDEX.MJ_DOUBLE_CARD) {
            this.setSpriteFrame("node/icon", item, ItemIcon10014, false)
            this.getNode("node/icon", item).scale = 0.7
        } else if (dataItem && dataItem.id == Constants.ITEM_INDEX.MJ_CAPPED_CARD) {
            this.setSpriteFrame("node/icon", item, ItemIcon10015, false)
            this.getNode("node/icon", item).scale = 0.7
        } else if (dataItem && dataItem.id == Constants.ITEM_INDEX.HuaFei) {
            this.setSpriteFrame("node/icon", item, ItemIcon10021, false)
        }

        //TODO 折扣标记
        this.setActive("node/nodeSale", item, false)
        this.setActive("node/nodeGift", item, false)
        if(data.vipPrivilege){
            console.log("data.vipPrivilege", data.vipPrivilege)
            this.setActive("node/vip", item, true)
            this.setLabelValue("node/vip/tq/num", item, data.vipPrivilege.level)
            this.setLabelValue("node/vip/multiple/num", item, data.vipPrivilege.exchange_gold)
        }else if(data.discount){
            this.setActive("node/nodeSale", item, true)
            this.setLabelValue("node/nodeSale/zhe/num", item, data.discount)
        }else if(data.gift){
            this.setActive("node/nodeGift", item, true)
            this.setLabelValue("node/nodeGift/node/num", item, data.gift)
        }       

        this.setButtonClick("node/btnBuy", item, ()=>{
            data.btnClick()
        })
    }

    onShowAd(box: IShopInfo) {
        if (box.name == "看广告领取") {
            let actInfo = box.param;

            let nLastTime = cc.sys.localStorage.getItem("shop_get_item_ad_time" + actInfo.activity_id);
            let nNowTime = new Date().getTime();
            if (!nLastTime) {
                nLastTime = 0
            }
            nLastTime = parseInt(nLastTime);
            if (nNowTime - nLastTime < 180 * 1000) {

                let nSc = ((180000 - (nNowTime - nLastTime)) / 1000).toFixed(0)
                Helper.OpenTip("请" + nSc + "秒后再来看广告吧")
                return
            }




            console.log("jin---onPressBuy TODO", box)

            this.onClickAD(actInfo)
            return;
        }
    }

    //支付
    onPressBuy(box: IShopInfo) {//sender, data: IShopBox
        //TODO 1.sound 2.支付
        console.log("jin---onPressBuy TODO", box)
        this.curBox = box
        if(Helper.checkPayResult()){
            this.registPayResultEvent()
        }
        ShopSvr.Pay(box, (res)=>{
            if(res && res.code == 0){
                Helper.OpenTip("支付成功")
                UserSrv.UpdateItem()
                this.onPaySuccess(box)
            }else if(res && res.msg){
                Helper.OpenTip(res.msg)
            }
        })
    }

    //todo 摇金币
    onPressRockGold(){
        console.log("jin---onPressRockGold TODO")
        UIMgr.OpenUI("component/Activity/RolledCoins/RolledCoins", { single: true, param: {} })
    }

    exchangeTemplateInfo(box: any) {
        Helper.exchangeTemplateInfo(box, (success) => {
        })
    }

    registPayResultEvent(){
        EventMgr.once(Constants.EVENT_DEFINE.FOREGROUND, ()=>{            
            if(this.curBox){
                let param = {
                    box_gid: this.curBox.boxId
                }
                ActivitySrv.GetShopPayResult(param, (res)=>{
                    if(res && res.err && res.err.code == 200){
                        UserSrv.UpdateItem(()=>{                    
                            this.onPaySuccess(this.curBox)
                        })
                    }
                })
            }            
        }, this)
    }

    onPaySuccess(box: IShopInfo){
        if(box){
            let boxes:TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if(boxes && boxes[box.type] && boxes[box.type][box.boxId]){
                boxes[box.type][box.boxId].isBuy = true
                DataMgr.setData(Constants.DATA_DEFINE.SHOP_BOXES, boxes)
                this.initContent()
            }
        
            let award_list = []
            for (let k in box.items) {
                award_list.push({
                    item_id: box.items[k].id,
                    item_num: box.items[k].num
                })
            }
            UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: award_list, autoOpenBox: true } })
        }
    }


    onClickAD(actInfo) {
        AdSrv.createAdOrder(actInfo.ad_aid, null, (res: IPlayAdCallBack) => {
            if (res && res.order_no && res.order_no.length > 0) {
                AdSrv.completeAdOrder((res) => {
                    if (res && res.code == "00000") {
                        if (this.getAward) {
                            this.getAward(1, actInfo)
                        }
                    }
                })
            }
        })
    }


    getAward(multiple, actInfo) {
        let param = {
            activity_id: actInfo.activity_id,
            multiple: multiple
        }
        ActivitySrv.GetRewardParam(param, (res) => {
            // 手动加领取次数
            let ACT = ActivitySrv.GetActivityById(actInfo.activity_id);
            ACT.receive_num++;
            UIMgr.OpenUI("component/Shop/GetAwardEntry", { index: 101, param: { awards: res.award_item } })
        })

        let actGetTime = new Date().getTime();

        cc.sys.localStorage.setItem("shop_get_item_ad_time" + actInfo.activity_id, actGetTime);

        // this.schedAllADTime();
    }
}
