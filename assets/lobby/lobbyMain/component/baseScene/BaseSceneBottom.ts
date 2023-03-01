/*
 * @Author: your name
 * @Date: 2022-02-18 17:20:45
 * @LastEditTime: 2022-03-21 09:58:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \HZXLMJ\assets\lobby\start\script\component\Base\GameBottom.ts
 */

import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { WxProxyWrapper } from "../../../start/script/pulgin/WxProxyWrapper";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { TaskSrv } from "../../../start/script/system/TaskSrv";

const RESULT_CHECK = "resultCheck"
const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseSceneBottom extends BaseUI {

    start() {        
        this.setActive("left/btnWelfare/pop", false)
        this.initData()
        this.initButton()
        this.initEvent()

        if(DataMgr.data.OnlineParam.custom_service != 1){
            this.setActive("left/btnKF", false)
            let btnKF = this.getNode("left/btnKF")
            let btnSetting = this.getNode("left/btnSetting")
            let btnShare = this.getNode("left/btnShare")
            btnSetting.x = btnShare.x
            btnShare.x = btnKF.x
        }
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, ()=>{            
            this.checkWelfarePopShow()
        }, this)
    }

    initButton() {
        this.setButtonClick("left/btnActivity", () => {
            this.onPressActivity()
        })

        this.setButtonClick("left/btnShop", () => {
            this.onPressShop()           
        })

        this.setButtonClick("left/btnTask", () => {
            this.onPressTask()
        })

        this.setButtonClick("left/btnWelfare", () => {
            this.onPressWelfare()
        })

        this.setButtonClick("left/btnMail", () => {
            UIMgr.OpenUI("component/Mail/MailPop", { single: true })
        })
        
        this.setButtonClick("left/btnKF", () => {
            let param = {
                game_gid: DataMgr.data.Config.gameId,
                pn: DataMgr.data.Config.pn,
                openid: User.OpenID
            }
            WxProxyWrapper.openCustomerServiceConversation({
                showMessageCard: true,
                sendMessageTitle:"联系客服",
                sendMessageImg:"https://download.mcbeam.cc/Image/custom_service.jpg",
                sendMessagePath:"index?customParam=" + JSON.stringify(param),
                success:(res)=>{
                    console.log("success res", res)                    
                }
            })
        })

        this.setButtonClick("left/btnSetting", () => {
            UIMgr.OpenUI("component/Setting/SettingPop", { single: true })
        })

        this.setButtonClick("left/btnShare", () => {
            Helper.shareInfo()
        })
    }

    initData() {
        if(Helper.isAudit()){
            this.setActive("left/btnShop/Background/shop", false)
            this.setActive("left/btnShop/Background/duihuan", true)
        }else{
            this.setActive("left/btnShop/Background/shop", true)
            this.setActive("left/btnShop/Background/duihuan", false)
        }
        this.checkTaskRedPoint()
        this.checkWelfarePopShow()
    }

    onPressActivity(){
        UIMgr.OpenUI("component/Activity/Activity/Activity", { single: true, param: {  } })
    }

    onPressShop() {
        console.log("onPressShop")
        UIMgr.OpenUI("component/Shop/ShopSceneNew", { single: true, param: {  } })
    }

    onPressTask() {
        console.log("onPressTask")
        UIMgr.OpenUI("component/Task/Task", { single: true, param: {} , closeCb: ()=>{
            this.checkTaskRedPoint()
        }})
    }

    onPressWelfare() {
        console.log("btnWelfare")
        UIMgr.OpenUI("component/Welfare/Welfare", { single: true })
    }

    checkTaskRedPoint(){
        let show = false
        TaskSrv.GetTaskList((res) => {
            if(cc.isValid(this.node)){
                if (res.list) {
                    for (let i = 0; i < res.list.length; i++) {
                        let info = res.list[i]
                        if(info.status == 1){
                            show = true
                            break
                        }
                    }
                }
                this.setActive("left/btnTask/red", show)
            }
        })
    }

    checkWelfarePopShow(){
        PlatformApi.checkWelfareCount((res)=>{
            if(cc.isValid(this.node)){
                if(res.count > 0){
                    this.setActive("left/btnWelfare/pop", true)
                    this.setActive("left/btnActivity/pop", true)
                }else{
                    this.setActive("left/btnWelfare/pop", false)
                    this.setActive("left/btnActivity/pop", false)
                }
            }
        })
    }
}
