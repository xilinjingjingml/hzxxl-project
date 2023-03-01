import { Util } from "../../../start/script/api/utilApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { WxProxyWrapper } from "../../../start/script/pulgin/WxProxyWrapper";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserInfoConsent extends BaseUI {
    btnConsent:cc.Node = null
    btnName = "UserInfoConsent_btnOK"
    onOpen() {
        console.log("UserInfoConsent openId", User.Data.openId)

        this.initData()
        this.initEvent()
        this.initButton()
    }

    onClose(): void {
        this.param.callback?.()
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.WX_SYNC_CALLBACK, () => {
            this.close()
        })
    }

    initButton(){        
        this.setButtonClick("node/btnClose", ()=>{
            WxProxyWrapper.hideUserInfoButton(this.btnName)
            this.close()
        })
    }

    initData() {
        this.btnConsent = this.getNode("node/btnOK")
        let self = this
        let btnName = this.btnName
        Helper.createWxUserInfo(this.btnConsent, btnName, (sync) => {            
            WxProxyWrapper.hideUserInfoButton(btnName) 
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.WX_SYNC_CALLBACK)           
        }, (create) => {
            console.log("UserInfoConsent createWxUserInfo", create)
            if (!self || !self.node || !self.isValid || !self.btnConsent.active) {
                WxProxyWrapper.hideUserInfoButton(btnName)
            }
            if(!create){
                WxProxyWrapper.hideUserInfoButton(btnName)
                self.close()
            }
        })
    }
}
