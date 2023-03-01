import BaseUI from "../../../start/script/base/BaseUI";
import { PluginMgr } from "../../../start/script/base/PluginMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { Constants } from "../../../start/script/igsConstants";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SessionPop extends BaseUI {
    btnPrefab: cc.Node = null

    otherLoginContent: cc.Node = null

    start() {
        this.node.zIndex = 10
        this.initData()
        this.initEvent()

        igs.emit("session_show")
    }

    protected onDestroy(): void {
        igs.emit("session_close")
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
            this.close()
        }, this)

        // this.setActive("btnClose", this.param?.changeAccount === true)
        this.setActive("btnClose", false)
    }

    initData() {
        cc.log("===SessionPop initData===");
        
        let bCheckShanYan = false
        // let bCheckPhone = false

        // let plugins = [            
        //     {type: "5", name: "SessionShanYan"},
        //     {type: "5", name: "SessionPhone"},
        //     {type: "5", name: "SessionAppleSign"},
        //     {type: "5", name: "SessionWeiXin"},
        //     {type: "5", name: "SessionFacebook"},
        // ]

        this.setActive("node/otherLogin/btnOtherPhoneLogin", true)
    
        if (PluginMgr.pluginConfig && PluginMgr.pluginConfig.plugins) {
        // if (plugins) {
            for (const plugin of PluginMgr.pluginConfig.plugins) {
            // for (const plugin of plugins) {
                if (plugin.type == "5") {
                    cc.log("===plugins name " + plugin.name)
                    if ("SessionShanYan" === plugin.name) {
                        if (PluginMgr.getSimState()) {
                            this.setActive("node/btnOneKeyLogin", true)                            
                            this.setActive("node/otherLogin/btnOtherPhoneLogin", true)
                        } else {
                            // bCheckShanYan = true
                            // if (bCheckPhone) {
                                this.setActive("node/btnPhoneLogin", true)
                                this.setActive("node/otherLogin/btnOtherPhoneLogin", false)
                            // }
                        }                        
                    // } else if ("SessionPhone" === plugin.name) {
                    //     if (bCheckShanYan) {
                    //         this.setActive("node/btnPhoneLogin", true)                            
                    //     } else {
                    //         this.setActive("node/otherLogin/btnOtherPhoneLogin", true)
                    //         bCheckPhone = true
                    //     }
                    } else {
                        this.setActive("node/otherLogin/" + plugin.name, true)
                        // let bundle = DataMgr.data.Bundle
                        // if (bundle) {
                        //     bundle.load("thirdparty/" + plugin.name + "_circle", cc.SpriteFrame, (err, res: cc.SpriteFrame) => {
                        //         if (err) {
                        //             cc.warn("BaseUI.setSpriteFrame sprite " + "thirdparty/" + plugin.name + " err: " + err)                                
                        //         }else{           
                        //             this.setActive("otherLoginMode/lbl_other", true)            
                        //             let itemNode = cc.instantiate(this.btnPrefab)
                        //             itemNode.active = true
                        //             this.otherLoginContent && this.otherLoginContent.addChild(itemNode)
                        //             this.setButtonClick(itemNode, () => {         
                        //                 if(plugin.name == "SessionPhone"){
                        //                         Helper.OpenPageUI("component/Personal/NewPhoneLoginEntry", "登录账号", { type: 0, loginPhone: true })
                        //                     }else if(plugin.name == "SessionEmail"){
                        //                         Helper.OpenPageUI("component/Personal/PhoneLoginEntry", "登录账号", { type: 0, loginPhone: false })
                        //                     }else if(plugin.name == "SessionGuest"){                                                
                        //                         // 账号处理 by Sonke
                        //                         // Account._loginGuest({})
                        //                 }else{
                        //                     PluginMgr.login({sessionType:plugin.name})
                        //                 }
                        //             })

                        //             this.setSpriteFrame(itemNode, res)                                    
                        //             itemNode.width = res.getRect().width
                        //             itemNode.height = res.getRect().height                                
                        //         }     
                        //     })
                        // }
                    }
                }
            }
        }
    }

    onPressOneKeyPhoneLogin() {
        console.log("jin---onPressOneKeyPhoneLogin")
        PluginMgr.login({ sessionType: "SessionShanYan" })
    }

    onPressOtherPhoneLogin() {
        console.log("jin---onPressOtherPhoneLoain")
        UIMgr.OpenUI("component/PhoneLogin/PhoneLogin")
    }
    onPressAppleLogin() {
        console.log("jin---onPressAppleLogin")
        PluginMgr.login({ sessionType: "SessionAppleSign" })
    }
    onPressWechatLogin() {
        console.log("jin---onPressWechatLogin")
        PluginMgr.login({ sessionType: "SessionWeiXin" })
    }
    onPressGuestLogin() {
        console.log("onPressWechatLogin")
        AccountSrv._loginGuest({})
        // PluginMgr.login({ sessionType: "SessionGuest" })
    }
}
