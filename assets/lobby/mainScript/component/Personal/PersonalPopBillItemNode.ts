import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalPopBillItemNode extends BaseUI {
    start() {
    }


    setParam(param: any): void {
        console.log("PersonalPopBillItemNode setParam", param)
        let match = MatchSvr.GetMatchInfo(param.match_cid)
        if(match){
            console.log("PersonalPopBillItemNode match", match)
            this.setLabelValue("name", match.name)
            let player = param.players[0]
            for(let v of param.players){
                if(v.openid == User.OpenID){
                    player = v
                }
            }
            player.score = player.score || 0
            this.setActive("win", player.score > 0)
            this.setActive("lose", player.score < 0)
            this.setLabelValue("score", Helper.FormatNumWYCN(player.score))
            this.setLabelValue("time", Helper.FormatTimeString(param.finish_time*1000, "MM-dd hh:mm:ss"))
            
            if(match && match.metadata && match.metadata.gs_properties && match.metadata.gs_properties.settle_item == Constants.ITEM_INDEX.GAME_BEAN){
                this.setSpriteFrame("icon", "image/common_hzxl/item_10006")
            }
        }else{
            console.log("PersonalPopBillItemNode match is nil", match)
        }
    }
}
