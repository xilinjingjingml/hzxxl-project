import { DataMgr } from "../base/DataMgr"
import { Constants } from "../igsConstants"
import { Helper } from "./Helper"
import { User } from "../data/User";
import { UserSrv } from "./UserSrv";
import { UIMgr } from "../base/UIMgr";
import { ShopSvr } from "./ShopSvr";
import { EventMgr } from "../base/EventMgr";

const GET_BoxList = "igaoshou-shop-srv/Box/BoxList"
const GET_VIP_ITEM = "igaoshou-shop-srv/Box/GetVipItem"

let vipCardInfo: any = []

export namespace MemberSrv {
    export function updateMemberInfo(vipCard) {
        if (vipCard) {
            vipCardInfo = Helper.ParseJson(vipCard, "vipCard")
            if (vipCardInfo instanceof Array == false){
                vipCardInfo = []
            }
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.UPDATE_VIP_CARD)
        }
    }

    export function getMemberAward(param:any, callback?: Function) {
        Helper.PostHttp(GET_VIP_ITEM, null, param, (res, event) => {
            console.log("GetVipItem", res)
            console.log("vipCardInfo", vipCardInfo)
            if (res && res.code == "00000") {
                for(let v of vipCardInfo){
                    if(v.card_id == param.card_id){
                        console.log("vipCardInfo", v)
                        let today = Number(Helper.FormatTimeString(new Date().getTime(), "yyyyMMdd"))
                        v.receive_date = today
                        break
                    }
                }
            }            
            callback?.(res)
        })
    }

    export function getMemberInfo() {
        return vipCardInfo
    }
}