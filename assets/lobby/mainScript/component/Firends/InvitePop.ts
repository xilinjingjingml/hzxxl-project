
import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { User } from "../../../start/script/data/User";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InvitePop extends BaseUI {
    _end: number = 0

    onLoad(){
        this.node.zIndex = 10
    }

    start() {
        console.log("InvitePop", this.param)
        this.initEvent()
        this.initData()

        this._end = Date.now() + 20000
    }

    initEvent() {
        this.setButtonClick("node/btnConfirm", this.onPressConfirm.bind(this))
        this.setButtonClick("node/btnCancel", this.onPressCancel.bind(this))
        this.setButtonClick("node/btnClose", this.onPressCancel.bind(this))
    }

    initData() {
        let inviteId = this.param.sender
        this.setLabelValue("node/roomid", this.param.room.metadata.share_code)
        this.setLabelValue("node/rule", this.param.room.labels?.[0])
        UserSrv.GetPlyDetail(inviteId, (ply: IPlayerBase) => {
            if(cc.isValid(this.node)){
                this.setLabelValue("node/nickname", ply.userName)
                this.setRichTextValue("node/tip", `<b><color=#2f3d57>好友</c><color=#cf8116>${ply.userName}</color><color=#2f3d57>邀请你进行对局</c>`)
                this.setSpriteFrame("node/head/spt", ply.avatar)
                let txk = this.getNode("node/txk")
                if(txk){
                    PlatformApi.setHeadVipTxk(txk, UserSrv.getQpVipLevel(ply))
                }
            }
        })

        let matchInfo = MatchSvr.GetMatchInfo(this.param.room.match_code)
        if(matchInfo){
            this.setLabelValue("node/game", matchInfo.name || "")
        }
    }

    update() {
        if (this._end > 0) {
            let now = Date.now()
            this.setLabelValue("node/btnConfirm/Background/Label", `同意(${Math.ceil((this._end - now) / 1000)}s)`)
            if (now > this._end) {
                PlatformApi.joinPrivateGame(this.param.room)
                this.close()
            }
        }
    }

    onPressConfirm() {
        this.close()
        PlatformApi.joinPrivateGame(this.param.room)
    }

    onPressCancel() {
        UserSrv.sendInviteResult(this.param.sender, User.Data.userName+"拒绝了您的游戏邀请！")
        this.close()
    }

}
