// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../start/script/system/AdSrv";
import { Helper } from "../../../start/script/system/Helper";
import { ShopSvr } from "../../../start/script/system/ShopSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FirstChargeBox extends BaseUI {

    @property(cc.Node)
    nodeBuyGiftRoot1: cc.Node = null;
    @property(cc.Node)
    nodeADGiftRoot1: cc.Node = null;


    @property(cc.Button)
    btnCloseView: cc.Button = null;
    @property(cc.Button)
    btnGetADReward: cc.Button = null;
    @property(cc.Button)
    btnGetBuyGiftReward: cc.Button = null;

    

    @property(cc.Node)
    node10018Item: cc.Node = null;
    @property(cc.Node)
    node10017Item: cc.Node = null;
    

    @property(cc.Label)
    label10018Item: cc.Label = null;
    @property(cc.Label)
    label10017Item: cc.Label = null;

    start() {

        let FirstChargeGiftTitle = this.nodeBuyGiftRoot1.getChildByName("FirstChargeGiftTitle");
        let YuanItemGiftTitle = this.nodeBuyGiftRoot1.getChildByName("1YuanItemGiftTitle");
        let FirstChargeTips = this.nodeBuyGiftRoot1.getChildByName("FirstChargeTips");
        let YuanItemTips = this.nodeBuyGiftRoot1.getChildByName("1YuanItemTips");

        FirstChargeGiftTitle.active = false;
        FirstChargeTips.active = false;
        YuanItemGiftTitle.active = false;
        YuanItemTips.active = false;

        this.nodeBuyGiftRoot1.active = false;
        this.nodeADGiftRoot1.active = false;

        this.node10018Item.active = false;
        this.node10017Item.active = false;
        this.updatePlayerMoney();
    }

    updatePlayerMoney() {
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
        this.label10018Item.string = strcount10018;
        this.label10017Item.string = strcount10017;

    }

    onOpen() {

        this.btnCloseView.node.on("click", this.onClickClose, this)

        let shopBoxInfo = this.param.shopBoxInfo;
        let actConfigInfo = this.param.actConfigInfo;

        if (shopBoxInfo) {
            this.nodeBuyGiftRoot1.active = true;
            this.nodeADGiftRoot1.active = false;
            this.nodeBuyGiftRoot1.scale = 0.1;
            cc.tween(this.nodeBuyGiftRoot1)
            .to(0.15, {scale:1.2})
            .to(0.07, {scale:1})
            .start();

            this.InitBuyGiftNodeInfo();

            this.btnGetBuyGiftReward.node.on("click", this.onClickBuyGift, this)
        }

        if (actConfigInfo) {
            this.nodeBuyGiftRoot1.active = false;
            this.nodeADGiftRoot1.active = true;

            this.nodeADGiftRoot1.scale = 0.1;
            cc.tween(this.nodeADGiftRoot1)
            .to(0.15, {scale:1.2})
            .to(0.07, {scale:1})
            .start();
            this.InitADGiftNodeInfo();

            this.btnGetADReward.node.on("click", this.onClickAD, this)
        }

        cc.tween(this.btnGetBuyGiftReward.node)
            .to(1, { scale: 1.2 })
            .to(1, { scale: 1 })
            .union()
            .repeatForever()
            .start();

        cc.tween(this.btnGetADReward.node)
            .to(1, { scale: 1.2 })
            .to(1, { scale: 1 })
            .union()
            .repeatForever()
            .start();


        if(this.param.isInLobby){
            this.node10018Item.active = false;
            this.node10017Item.active = false;
        }else{
            this.node10018Item.active = true;
            this.node10017Item.active = true;
        }

        this.updatePlayerMoney();
    }



    InitADGiftNodeInfo() {

        let nodeJipaiqi = this.nodeADGiftRoot1.getChildByName("ADItemBGLan");
        let nodeJiabei = this.nodeADGiftRoot1.getChildByName("ADItemBGHuang");

        let actConfigInfo = this.param.actConfigInfo;
        if (actConfigInfo.name == "记牌器和加倍卡混合礼包") {
            nodeJiabei.active = true;
            nodeJipaiqi.active = true;
        } else if (actConfigInfo.name == "3个记牌器") {
            nodeJiabei.active = false;
            nodeJipaiqi.active = true;
            nodeJipaiqi.x = 0;

        } else if (actConfigInfo.name == "3张超级加倍卡") {
            nodeJipaiqi.active = false;
            nodeJiabei.active = true;
            nodeJiabei.x = 0;
        }

    }

    onClickAD() {
        let info = this.param.actConfigInfo
        let param = this.param;
        AdSrv.createAdOrder(info.ad_aid, null, (res: IPlayAdCallBack) => {
            if (res && res.order_no && res.order_no.length > 0) {
                AdSrv.completeAdOrder((res) => {
                    if (res && res.code == "00000") {
                        if (this.getAward) {
                            this.getAward(1, param)
                        }
                    }
                })
            }
        })
    }


    getAward(multiple, paramOld) {
        let param = {
            activity_id: paramOld.actConfigInfo.activity_id,
            multiple: multiple
        }
        let self = this
        ActivitySrv.GetRewardParam(param, (res) => {
            // 手动加领取次数
            let ACT = ActivitySrv.GetActivityById(paramOld.actConfigInfo.activity_id);
            ACT.receive_num++;
            UIMgr.OpenUI("component/Shop/GetAwardEntry", {
                index: 999, param: { awards: res.award_item },
                closeCb: () => {
                    if (self.onClickClose) {
                        self.onClickClose()
                    }
                }
            })

        })
    }




    InitBuyGiftNodeInfo() {

        //-156, 188

        let FirstChargeGiftTitle = this.nodeBuyGiftRoot1.getChildByName("FirstChargeGiftTitle");
        let YuanItemGiftTitle = this.nodeBuyGiftRoot1.getChildByName("1YuanItemGiftTitle");
        let FirstChargeTips = this.nodeBuyGiftRoot1.getChildByName("FirstChargeTips");
        let YuanItemTips = this.nodeBuyGiftRoot1.getChildByName("1YuanItemTips");


        FirstChargeGiftTitle.active = false;
        FirstChargeTips.active = false;
        YuanItemGiftTitle.active = true;
        YuanItemTips.active = true;

        let nodeJipaiqi = this.nodeBuyGiftRoot1.getChildByName("GiftItemBGHuang1");
        let nodeJiabei = this.nodeBuyGiftRoot1.getChildByName("GiftItemBGHuang2");
        let nodeSendGold = this.nodeBuyGiftRoot1.getChildByName("ADItemBGLan");
        let btnFirstGet = this.nodeBuyGiftRoot1.getChildByName("btnFirstGet");

        let labelFirstYuan = btnFirstGet.getChildByName("labelFirstYuan");


        let labelJipaiqiBig = cc.find("labelBig", nodeJipaiqi);
        let labelJipaiqiSmall = cc.find("labelSmall", nodeJipaiqi);
        let labelJipaiqiAll = cc.find("labelAll", nodeJipaiqi);
        let labelJipaiqiYouhui = cc.find("youhuiBG/labelYouhui", nodeJipaiqi);

        let labelJiabeiBig = cc.find("labelBig", nodeJiabei);
        let labelJiabeiSmall = cc.find("labelSmall", nodeJiabei);
        let labelJiabeiAll = cc.find("labelAll", nodeJiabei);
        let labelJiabeiYouhui = cc.find("youhuiBG/labelYouhui", nodeJiabei);

        let labelSendGold = cc.find("labelAll", nodeSendGold)


        let shopBoxInfo: IShopInfo = this.param.shopBoxInfo;

        labelFirstYuan.getComponent(cc.Label).string = "1元购买";
        if (shopBoxInfo.name == "大厅首充礼包") {
            nodeJipaiqi.active = true;
            nodeJiabei.active = true;
            nodeSendGold.active = true;
            FirstChargeGiftTitle.active = true;
            FirstChargeTips.active = true;
            YuanItemGiftTitle.active = false;
            YuanItemTips.active = false;
            labelFirstYuan.getComponent(cc.Label).string = "3元购买";
        } else if (shopBoxInfo.name == "12个记牌器") {
            nodeJipaiqi.active = true;
            nodeJiabei.active = false;
            nodeSendGold.active = true;
            nodeJipaiqi.x = -156;
            nodeSendGold.x = 188;


            labelJipaiqiBig.getComponent(cc.Label).string = "10";
            labelJipaiqiSmall.getComponent(cc.Label).string = "2";
            labelJipaiqiAll.getComponent(cc.Label).string = "12张";
            labelJipaiqiYouhui.getComponent(cc.Label).string = "20%";

            labelJiabeiBig.getComponent(cc.Label).string = "10";
            labelJiabeiSmall.getComponent(cc.Label).string = "2";
            labelJiabeiAll.getComponent(cc.Label).string = "12张";
            labelJiabeiYouhui.getComponent(cc.Label).string = "20%";

            labelSendGold.getComponent(cc.Label).string = "20万";

        } else if (shopBoxInfo.name == "12张超级加倍卡") {
            nodeJipaiqi.active = false;
            nodeJiabei.active = true;
            nodeSendGold.active = true;
            nodeJiabei.x = -156;
            nodeSendGold.x = 188;


            labelJipaiqiBig.getComponent(cc.Label).string = "10";
            labelJipaiqiSmall.getComponent(cc.Label).string = "2";
            labelJipaiqiAll.getComponent(cc.Label).string = "12张";
            labelJipaiqiYouhui.getComponent(cc.Label).string = "20%";

            labelJiabeiBig.getComponent(cc.Label).string = "10";
            labelJiabeiSmall.getComponent(cc.Label).string = "2";
            labelJiabeiAll.getComponent(cc.Label).string = "12张";
            labelJiabeiYouhui.getComponent(cc.Label).string = "20%";

            labelSendGold.getComponent(cc.Label).string = "20万";

        } else if (shopBoxInfo.name == "加倍卡和记牌器混合礼包") {
            nodeJipaiqi.active = true;
            nodeJiabei.active = true;
            nodeSendGold.active = true;

            labelJipaiqiBig.getComponent(cc.Label).string = "5";
            labelJipaiqiSmall.getComponent(cc.Label).string = "1";
            labelJipaiqiAll.getComponent(cc.Label).string = "6张";
            labelJipaiqiYouhui.getComponent(cc.Label).string = "20%";

            labelJiabeiBig.getComponent(cc.Label).string = "5";
            labelJiabeiSmall.getComponent(cc.Label).string = "1";
            labelJiabeiAll.getComponent(cc.Label).string = "6张";
            labelJiabeiYouhui.getComponent(cc.Label).string = "20%";

            labelSendGold.getComponent(cc.Label).string = "20万";
        }
    }


    onClickBuyGift() {
        let shopBoxInfo: IShopInfo = this.param.shopBoxInfo;
        this.onPressBuy(shopBoxInfo)
    }



    dataBrokeShopBoxInfo: IShopInfo = null;
    //支付
    onPressBuy(box: IShopInfo) {//sender, data: IShopBox
        //TODO 1.sound 2.支付
        console.log("jin---onPressBuy TODO", box, " Helper.checkPayResult()==>" + Helper.checkPayResult())
        if (Helper.checkPayResult()) {
            this.registPayResultEvent()
        }
        this.dataBrokeShopBoxInfo = box;
        ShopSvr.Pay(box, (res) => {
            if (res && res.code == 0) {
                Helper.OpenTip("支付成功")
                UserSrv.UpdateItem()
                if (this.onPaySuccess) {
                    this.onPaySuccess(box)
                }
            } else if (res && res.msg) {
                Helper.OpenTip(res.msg)
            }
        })
    }


    registPayResultEvent() {
        EventMgr.once(Constants.EVENT_DEFINE.FOREGROUND, () => {
            console.log("切后台回来,道具的礼包,看看ios支付==========>", this.dataBrokeShopBoxInfo)
            if (this.dataBrokeShopBoxInfo) {
                let param = {
                    box_gid: this.dataBrokeShopBoxInfo.boxId
                }
                ActivitySrv.GetShopPayResult(param, (res) => {
                    if (res && res.err && res.err.code == 200) {
                        UserSrv.UpdateItem(() => {
                            this.onPaySuccess(this.dataBrokeShopBoxInfo)
                        })
                    }
                })
            }
        }, this)
    }


    onPaySuccess(box: IShopInfo) {
        console.log("道具的礼包支付成功==========>", box)
        if (box) {
            let boxes: TShopBoxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
            if (boxes && boxes[box.type] && boxes[box.type][box.boxId]) {
                boxes[box.type][box.boxId].isBuy = true
                DataMgr.setData(Constants.DATA_DEFINE.SHOP_BOXES, boxes)
            }
            let self = this;
            // this.onClickClose()
            let award_list = []
            for (let k in box.items) {
                award_list.push({
                    item_id: box.items[k].id,
                    item_num: box.items[k].num
                })
            }
            UIMgr.OpenUI("component/Shop/GetAwardEntry", {
                index: 999, param: {
                    awards: award_list,
                    autoOpenBox: true
                }, closeCb: () => {
                    if (self.onClickClose) {
                        self.onClickClose()
                    }
                }
            })
        }
    }


    //破产界面移除, 需要判定是不是在房间内,金币够不够,不够直接踢出大厅
    onClickClose() {
        this.close();
    }

    onClose(): void {
        EventMgr.dispatchEvent("POP_VIEW_CLOSED")
        EventMgr.dispatchEvent("FIRST_CHAGE_CLOSE")
        if (this.param && this.param.checkQueue) {
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.FIRST_OPEN_QUEUE)
        }
    }

}
