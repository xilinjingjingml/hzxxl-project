import { Helper } from "./Helper"
import { Constants } from "../igsConstants"
import { DataMgr } from "../base/DataMgr"
import { UIMgr } from "../base/UIMgr";
import { VipPrivilegeSrv } from "./ActivitySrv";

const CATEGORY_GOODS = "igaoshou-shop-srv/goods/categoryGoods"

const CODE_AWARD = "igaoshou-shop-srv/exchange/codeAward"

export namespace ExchangeSrv {
    export function CategoryGoods(param: any, callback?: Function) {
        Helper.PostHttp(CATEGORY_GOODS, null, param, (res) => {
            cc.log("CATEGORY_GOODS", res)
            if (res && res.goods_list) {
                if (DataMgr.data.Config.platId === 2 || DataMgr.data.Config.platId === 5) {
                    for (let i = 0; i < res.goods_list.length; i++) {
                        let goodsInfo = res.goods_list[i]
                        if (goodsInfo.pris) {
                            for (let j = goodsInfo.pris.length - 1; j >= 0; j--) {
                                let pris = goodsInfo.pris[j]
                                let onlyTicket = true
                                for (let k = 0; k < pris.pri.length; k++) {
                                    let pri = pris.pri[k]
                                    pri.pri_type = pri.pri_type || 0
                                    if (pri.pri_type != 0) {
                                        onlyTicket = false
                                    }
                                }
                                if (!onlyTicket) {
                                    goodsInfo.pris.splice(j, 1)
                                    break
                                }
                            }
                        }
                    }
                }

                for (let i = res.goods_list.length - 1; i >= 0; i--) {
                    let goodsInfo = res.goods_list[i]
                    if (null == goodsInfo.pris || goodsInfo.pris.length == 0) {
                        res.goods_list.splice(i, 1)
                    }
                }
                callback && callback(res)
            }
        })
    }

    export function getCartList(param: any, callback?: Function) {
        console.log("CartList", param)
        Helper.PostHttp("igaoshou-shop-srv/goods/cartList", null, param, (res, event) => {
            console.log("CartList", res)
            if (res) {
                callback && callback(res)
            }
        })
    }

    //获取兑换商品列表
    export function getExchangeTemplateInfo(param, callback?: Function) {
        let res = DataMgr.getData(Constants.DATA_DEFINE.EXCHANGE_DATA + "typeId" + param.typeId)
        if (res) {
            callback && callback(res)
        } else {
            VipPrivilegeSrv.GetPlayerVipPrivilege((playerVipPrivilege)=>{
                Helper.PostHttp("igaoshou-shop-srv/exchange/exchangeTemplateInfo", null, param, (res, event) => {
                    console.log("exchangeTemplateInfo", res)
                    if (res) {
                        // callback && callback(res)
                        if (res.result && res.result.length > 0) {
                            for(let v of res.result){
                                v.exchange_conditions = Helper.ParseJson(v.exchange_conditions, "exchangeTemplateInfo")

                                //计算VIP特权加成
                                if(playerVipPrivilege && playerVipPrivilege.exchange_gold > 0){
                                    if(v.consume_list[0].item_id == Constants.ITEM_INDEX.GAME_DIAMOND && v.output_list[0].item_id == Constants.ITEM_INDEX.GAME_GOLD){
                                        v.output_list[0].item_num = Number(v.output_list[0].item_num)
                                        v.additional = playerVipPrivilege.exchange_gold * v.output_list[0].item_num-v.output_list[0].item_num
                                        v.output_list[0].item_num = playerVipPrivilege.exchange_gold * v.output_list[0].item_num
                                    }
                                }
                            }
                            DataMgr.setData(Constants.DATA_DEFINE.EXCHANGE_DATA + "typeId" + param.typeId, res)
                        }
                    } 
                    callback?.(res)
                })
            })
        }
    }

    //兑换商品
    export function exchangeTemplateInfo(param, callback?: Function) {
        Helper.PostHttp("igaoshou-shop-srv/exchange/exchangeInfo", null, param, (res, event) => {
            if (res) {
                callback && callback(res)
            }
        })
    }

    //兑换码使用
    export function codeAwar(param, callback?: Function) {
        console.log("CODE_AWARD param", param)
        Helper.PostHttp(CODE_AWARD, null, param, (res, event) => {
            console.log("CODE_AWARD res", res)
            if (res) {
                callback && callback(res)
            }
        })
    }
}