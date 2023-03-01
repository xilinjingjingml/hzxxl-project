import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FriendsSideItemNode extends BaseUI {
    data:any = {}

    start() {
        this.initEvent()
    }

    initEvent() {
        this.setButtonClick("btnInvite", () => {
            // 邀请接口 c.name 是openid
            if(MatchSvr.privateRoomInfo){
                UserSrv.InviteUser(this.data.openid, MatchSvr.privateRoomInfo.room.metadata.share_code)
            }
            this.data.invite = true
            this.getNode("btnInvite").getComponent(cc.Button).interactable = false
        }, 0)

        EventMgr.on("FirendsSide_reset_button", ()=>{
            this.data.invite = false
            this.getNode("btnInvite").getComponent(cc.Button).interactable = true
        }, this)
    }

    setParam(param: any): void {
        console.log("FriendsSideItemNode param", param)
        this.data = param
        
        this.setActive("zaixian", param.online == true)
        if(param.nickname && param.avatar){
            this.setLabelValue("nickname", param.nickname)
            this.setSpriteFrame("face/face", param.avatar)
        }else{
            UserSrv.GetPlyDetail(param.openid, (ply: IPlayerBase) => {
                if(cc.isValid(this.node)){
                    this.setLabelValue("nickname", ply.userName)
                    this.setSpriteFrame("face/face", ply.avatar)
                    let txk = this.getNode("txk")
                    if(txk){
                        PlatformApi.setHeadVipTxk(txk, UserSrv.getQpVipLevel(ply))
                    }
                }
            })
        }

        if(param.invite == true){
            this.getNode("btnInvite").getComponent(cc.Button).interactable = false
        }else{
            this.getNode("btnInvite").getComponent(cc.Button).interactable = true
        }
    }
}
