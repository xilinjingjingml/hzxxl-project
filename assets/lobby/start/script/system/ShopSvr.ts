import { Constants } from "../igsConstants"
import { DataMgr } from "../base/DataMgr"
import { Helper } from "./Helper"
import { WxProxyWrapper } from "../pulgin/WxProxyWrapper"
import { User } from "../data/User"
import { MemberSrv } from "./MemberSrv"
import { EventMgr } from "../base/EventMgr"

const ALI_PAY = "api/igaoshou-pay-api/payApi/aliPay"
const WECHAT_PAY = "api/igaoshou-pay-api/PayApi/WeChatPay"
const HUAWEI_PAY = "igaoshou-pay-api/PayApi/HuaWeiPay"

const GET_BOX_LIST = "igaoshou-shop-srv/Box/BoxList"

const PAY_ORDER = "api/mcbeam-pay-api/payApi/payOrder"
const GET_PAY_ORDER = "mcbeam-pay-srv/pay/queryOrder"


export namespace ShopSvr {
    export function initShop() {
        getBoxList((res) => {
            console.log("===initshop===")
            console.log(res)
            if (res) {
                fillData(res)
            }
        })
    }

    export function getBoxList(callback?: Function) {
        let param = {
            plat_aid: DataMgr.data.Config.platId,
        }
        Helper.PostHttp(GET_BOX_LIST, null, param, (res, event) => {
            console.log("GET_BOX_LIST", res )
            if (res && res.code == "00000") {
                res.vip_card && MemberSrv.updateMemberInfo(res.vip_card)
                callback?.(res)
            }else{
                callback?.(null)
            }
        })
    }

    export function fillData(data) {
        if (!data/* || !data.shop*/) {
            return
        }

        let cfg = data.box_list

        let boxid = DataMgr.getData(Constants.DATA_DEFINE.PREFERENCE_BOX_RANDOM)

        let boxes: TShopBoxes = {}
        let random: string[] = []
        for (let idx in cfg) {
            let b = cfg[idx]
            let box: IShopInfo = {
                boxId: b.box_gid,
                type: b.box_type || Constants.SHOP_TYPE.NORMAL,
                name: b.name,
                pic: b.image,
                items: [],
                worth: 1,
                price: b.price,
                rate: b.rate || 100,

                daysNum: b.days_num,
                isBuy: (b.is_buy==1) ? true : false,
                param:b.func,
                days_item: []
            }

            box.param = Helper.ParseJson(b.func, "shop fillData")
            for (let i in b.box_item) {
                box.items[b.box_item[i].item_id] = {
                    id: b.box_item[i].item_id,
                    num: Number(b.box_item[i].item_num),
                }
            }

            for (let i in b.days_item) {
                box.days_item.push({
                    id: b.days_item[i].item_id,
                    num: Number(b.days_item[i].item_num),
                })
            }

            // if (box.type === Constants.SHOP_TYPE.PREFERENCE) {
            //     box.addition = [{ id: Constants.ITEM_INDEX.GAME_GOLD, num: (b.rate - 100) / 100 * b.price }]
            //     random.push(box.boxId)
            //     DataMgr.setData(Constants.DATA_DEFINE.LIMIT_BUY, data.limit_buy === 1)
            // } else if (box.type === Constants.SHOP_TYPE.FIRST_PAY) {
            //     DataMgr.setData(Constants.DATA_DEFINE.FIRST_BUY, data.first_buy === 1)
            // }


            boxes[box.type] = boxes[box.type] || {}
            boxes[box.type][box.boxId] = box

        }

        if (random.length > 0) {
            let idx = Math.floor(Math.random() * 100 % random.length)
            DataMgr.setData(Constants.DATA_DEFINE.PREFERENCE_BOX_RANDOM, { id: random[idx], time: Date.now() + 86400 * 1000 })
        }

        DataMgr.setData(Constants.DATA_DEFINE.SHOP_BOXES, boxes)
        // DataMgr.setData(Constants.DATA_DEFINE.PREFERENCE_BOXES, preference, true)
        // DataMgr.setData(Constants.DATA_DEFINE.FIRST_PAY_BOX, firstPay, true)
        // DataMgr.setData(Constants.DATA_DEFINE.MEMBER_CARD, member, true)
    }

    function payOrder(payInfo: any, callback?: Function) {
        //code :20000  达到支付上限
        Helper.PostHttp(PAY_ORDER, null, payInfo, (res) => {
            console.log("payOrder111 res", res)
            if(res.code == 20000){
                let param = {
                    msg: "很抱歉，您今日充值金额已达上限，暂时\r\n无法充值！",
                    tip: "(充值上限每日0时重置)",
                    hideCancel: true,
                    confirmLabel: "知道了",
                    confirm: () => {
                        
                    }
                 }
                 Helper.OpenGamePop(param)
            }else{
                callback?.(res)
            }
        })
    }

    export function Pay(box: IShopInfo, callback?: Function) {
        let param: any = {
            goods_param: box.boxId,
            goods_name: box.name,
            goods_pic: box.pic,
            box_type: box.type,
            price: box.price,
            store_id: 0,
            notify_url: 'igaoshou,igaoshou-shop-srv,Box.SendItem',
            metadata: { "openid": User.WxOpenId, "env":  0}
        }
        // const (
        //     AliPay      PayPlat = 1
        //     WeChatPay   PayPlat = 2
        //     HuaWeiPay   PayPlat = 3
        //     XsollaPay   PayPlat = 4
        //     PayPal      PayPlat = 5
        //     PaymentWall PayPlat = 6
        //     MidasPay    PayPlat = 7
        //     ApplePay    PayPlat = 8
        //     GooglePay   PayPlat = 9
        // )
        console.log("jin---Pay param: ", param)
        Helper.reportEvent("商城-支付-创建订单box.name="+box.name+", box.price="+box.price/100)
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                DataMgr.setData(Constants.DATA_DEFINE.LAST_PAY_GOODS, box.boxId)
                param.pay_plat = 2
                WxProxyWrapper.payOrderByCustome(param)
            } else if (cc.sys.os === cc.sys.OS_ANDROID) {
                param.pay_plat = 7
                console.log("jin---param")
                payOrder(param, (res) => {
                    console.log("jin---res: ", res)
                    if (res && res.errcode === 0) {
                        if (res.bill_no) {//米大师有余额直接支付
                            callback?.({ code: 0, msg: "" })
                        } else {
                            // 客户端调米大师支付
                            console.log("jin---res.offerId: ", res.offerId)
                            WxProxyWrapper.requestMidasPayment(param, res.offerId)
                                .then(() => {
                                    payOrder(param, (res1) => {
                                        if (res1?.bill_no) {
                                            Helper.reportEvent("商城-支付-完成订单-android-box.name="+box.name+", box.price="+box.price/100)
                                            callback?.({ code: 0, msg: "" })
                                        } else {
                                            Helper.reportEvent("商城-支付-取消订单-android-box.name="+box.name+", box.price="+box.price/100+", 原因"+res1.Detail)
                                            callback?.({ code: res1.Code, msg: res1.Detail })
                                        }
                                    })
                                })
                                .catch((code) => {
                                    Helper.reportEvent("商城-支付-取消订单-android-box.name="+box.name+", box.price="+box.price/100+", 原因"+"支付失败")
                                    callback?.({ code: code, msg: "支付失败" })
                                })
                        }
                    } else {
                        Helper.reportEvent("商城-支付-取消订单-android-box.name="+box.name+", box.price="+box.price/100+", 原因"+res.Detail)
                        callback?.({ code: res.Code, msg: res.Detail })
                    }
                })
            }
        } else if (Helper.isNative) {            
            param.pay_plat = box.payType || 1
            payOrder(param, (res) => {
                if (res.pay_url) {
                    let node = cc.Canvas.instance.node.getChildByName("payUrl")
                    if (!node) {
                        node = new cc.Node()
                        node.name = "payUrl"
                        cc.Canvas.instance.node.addChild(node)
                    }

                    let web = node.getComponent(cc.WebView)
                    if (!web) {
                        web = node.addComponent(cc.WebView)
                    }

                    DataMgr.setData(Constants.DATA_DEFINE.LAST_PAY_GOODS, box.boxId)
                    web.url = res.pay_url
                }
            })
        }
    }

    export function WechatPay(box: IShopInfo, callback?: Function) {
        if (!User.WxOpenId) {
            callback?.(false)
        }
        let param = {}

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // WxProxyWrapper.payOrder(param, (res) => {
            //     console.log("payOrder----", res)
            //     if (res.code === 0) {
            //         getBoxList(() => {
            //             callback?.(true)
            //         })
            //     } else if (res.code === 1) {
            //         callback?.(true)
            //     } else {
            //         Helper.OpenTip(res.msg)
            //         callback?.(false)
            //     }
            // })
        } else if (cc.sys.os === cc.sys.OS_IOS) {
            if ((cc.sys.platform === cc.sys.WECHAT_GAME || cc.sys.platform === cc.sys.WECHAT_GAME_SUB) &&
                (undefined === DataMgr.data.OnlineParam.shop_rounds || DataMgr.data.OnlineParam.shop_rounds > User.PlayGame)) {
                return
            }
            WxProxyWrapper.payOrderByCustome(param, (res) => {
                console.log("payOrderByCustome----", res)
                // if (res.code === 0) {
                //     getBoxList(() => {
                //         callback?.(true)
                //     })
                // } else if (res.code === 1) {
                //     callback?.(true)
                // } else {
                //     // Helper.OpenTip(res.msg)
                callback?.(false)
                // }
            })
        }

    }

    export function AliPay(goods: string, store: number) {
        let param = {
            goods_param: goods,
            store_id: store,
        }
        Helper.PostHttp(ALI_PAY, null, param, (res, event) => {
            if (res) {
                cc.log(res)
                if (res.code !== "00000") {
                    cc.log("aliPay code = " + res.code)
                    return
                }

                if (res.pay_url) {
                    let node = cc.Canvas.instance.node.getChildByName("alipay")
                    if (!node) {
                        node = new cc.Node()
                        node.name = "alipay"
                        cc.Canvas.instance.node.addChild(node)
                    }

                    let web = node.getComponent(cc.WebView)
                    if (!web) {
                        web = node.addComponent(cc.WebView)
                    }

                    web.url = res.pay_url
                }
            }
        })
    }

    export function getPayOrder(callback?: Function) {
        Helper.PostHttp(GET_PAY_ORDER, null, {}, (res, event) => {
            if (res) {
                console.log(res)
                callback?.(res)
            }
        })

    }

    export function getBoxById(boxId: string) {
        let boxes = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
        for (let i in boxes) {
            for (let j in boxes[i]) {
                if (boxes[i][j].boxId === boxId) {
                    let box = boxes[i][j]
                    return box
                }
            }
        }

        return null
    }
}

EventMgr.once(Constants.EVENT_DEFINE.LOGIN_SUCCESS, ShopSvr.initShop)