import { igs } from "../../../../igs";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { LocalFriends } from "../../../start/script/data/LocalFriends";
import { User } from "../../../start/script/data/User";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";
import { UserSrv } from "../../../start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FirendsSide extends BaseUI {

    _main: cc.Node = null
    _show: boolean = false

    _item: cc.Node = null
    _content: cc.Node = null
    _wx: cc.Node = null
    _late: cc.Node = null

    start() {
        this.initNode()
        this.initEvent()
        this.initData()
    }

    initNode() {
        this._main = this.getNode("node")

        this._item = this.getNode("node/late/view/content/item")
        this._content = this.getNode("node/late/view/content")
        this._wx = this.getNode("node/wx")
        this._late = this.getNode("node/late")
        this._late.active = false
    }

    initEvent() {
        this.setToggleClick("node/tab/toggle1", this.onPressTab.bind(this, 0))
        this.setToggleClick("node/tab/toggle2", this.onPressTab.bind(this, 1))
        this.setButtonClick("node/btnFriends", this.onPressFriends.bind(this))
    }

    initData() {
        igs.odc?.init(this._wx)
        igs.odc?.showListData("friends", { wxopenid: User.WxOpenId, roomId: "aaa" })
        igs.odc.showListData("invite-friend", {style: "game", share: {shareContent: "麻溜的，一起来玩红中血流麻将吧！", sharePicUrl: "https://download.mcbeam.cc/Image/xlhz_share.jpg"}})
        
        this.updateFriends()
    }

    onPressTab(idx) {
        if (idx === 0) {
            this._wx.active = true
            this._late.active = false            
        } else if (idx === 1) {
            this._wx.active = false
            this._late.active = true
        }
    }

    onPressFriends() {
        if (this._show) {
            this._show = false
            cc.tween(this._main)
            .to(.5, { position: cc.v3(cc.winSize.width / 2 + this._main.width, this._main.y) })
            .start()
        } else {
            this._show = true
            cc.tween(this._main)
            .to(.5, { position: cc.v3(cc.winSize.width / 2, this._main.y) })
            .start()
            EventMgr.dispatchEvent("FirendsSide_reset_button")
        }
    }

    updateFriends() {
        let room = MatchSvr.getCurRoomInfo()
        if (!room?.gameGid) {
            return
        }

        let list = LocalFriends.GetFriendsByGame(room.gameGid)

        if(list.length > 0){
            let param = {
                id_list:[]
            }
                        
            for(let v of list){
                param.id_list.push(v.openid)
            }
            UserSrv.getOnlineStatus(param, (res)=>{
                if(res && res.status_list){
                    for(let v of res.status_list){
                        for(let v1 of list){
                            if(v.openid == v1.openid){
                                v1["nickname"] = v.nickname
                                v1["avatar"] = v.avatar
                                v1["online"] = v.online
                            }
                        }
                    }
                }
                this.setChildParam("node/late", {list: list})
            })
        }
    }

}
