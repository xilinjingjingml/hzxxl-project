import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { WxProxyWrapper } from "../../../start/script/pulgin/WxProxyWrapper";
import { ActivitySrv, VipPrivilegeSrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";



const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseSceneTop extends BaseUI {

    _lottery: number = null


    start() {
        this.initData()
        this.initButton()
        this.initEvent()
        // this.getNode("left/content").x += igs.exports.safeArea.left
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
            this.updateData()
        }, this)

        EventMgr.on(Constants.EVENT_DEFINE.UPDATE_VIP_PRIVILEGE, ()=>{
            this.updateVipData()
        }, this)
    }

    initButton() {
        this.setButtonClick("left/content/btnHead", () => {
            if (cc.sys.platform == cc.sys.WECHAT_GAME) {
                WxProxyWrapper.checkUserScope("userInfo", (canUse)=>{
                    if(!canUse){
                        let userInfoTask = ActivitySrv.GetActivityById(1001)
                        if (userInfoTask && (!userInfoTask.receive_num || userInfoTask.receive_num < 1)) {
                            let param = {
                                callback: ()=>{
                                    this.onPressHead()
                                }
                            }
                            UIMgr.OpenUI("component/Activity/UserInfoConsent", { single: true , param : param})
                        }else{
                            this.onPressHead()
                        }
                    }else{
                        this.onPressHead()
                    }
                })
                
            }else{
                this.onPressHead()
            }            
        })

        this.setButtonClick("left/content/vip/btn", ()=>{
            UIMgr.OpenUI("component/VipPrivilege/VipPrivilege", { single: true , param : {}, closeCb:()=>{
                this.updateVipData()
            }})
        })
    }

    initData() {
        this.updateData()
        this.updateVipData()
    }

    updateData() {
        this.setLabelValue("left/content/nickName", User.UserName)
        this.setSpriteFrame("left/content/head/mask/spt", User.Avatar, true)
        PlatformApi.setHeadVipTxk(this.getNode("left/content/head/txk"), User.QpVipLevel)
    }

    updateVipData(){
        VipPrivilegeSrv.GetConfig((res)=>{
            if(cc.isValid(this.node)){
                if(res && res.list){
                    let ret = false
                    for(let v of res.list){
                        if(v.state == 1){
                            ret = true
                            break
                        }
                    }
                    this.setActive("left/content/vip/red", ret)
                }
                VipPrivilegeSrv.GetPlayerVipPrivilege((vipPrivilege)=>{
                    if(cc.isValid(this.node) && vipPrivilege){
                        this.setLabelValue("left/content/vip/lv", "VIP " + vipPrivilege.level)
                        PlatformApi.setHeadVipTxk(this.getNode("left/content/head/txk"), vipPrivilege.level)
                    }
                })
            }
        })
    }

    onPressHead() {
        UIMgr.OpenUI("component/Personal/PersonalPop", { single: true })
    }
}
