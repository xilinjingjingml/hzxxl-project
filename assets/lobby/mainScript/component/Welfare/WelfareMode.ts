
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv, MonthSignSrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WelfareMode extends BaseUI {
    
    protected start(): void {
        this.initEvent()
        this.initButton()

        this.setActive("canReceive", false)        
        this.setActive("tip", false)
    }

    onClose(): void {
        EventMgr.off(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, this.refreshActivityData, this)
    }

    setParam(data) {
        this.param = data
        this.initData(data)
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, this.refreshActivityData, this)
    }

    initButton() {
        if (this.param.activity_id === 1001) {
            return
        }
        this.setButtonClick("btn", () => {
            console.log("setButtonClick")
            if (this.param.activity_id === 9){//破产补助
                if (this.param.activity_id == 9 && this.param.param && this.param.param.broke_num && User.MainToken >= this.param.param.broke_num){  //金币补助6万以下才能领取
                    Helper.OpenTip("金币小于" + this.param.param.broke_num + "才可领取补助")
                }else{
                    Helper.showBroke({ activityConfig: this.param }, ()=>{
                    })
                }
            }else if (this.param.activity_id === 11){
                UIMgr.OpenUI("component/Activity/KfGift/KfGift", { param: {} })                
            }else{                
                ActivitySrv.OnClickActivity(this.param)
            }
        })
    }    

    refreshActivityData(param: any) {
        if (this.param.activity_id == param.activityId || (param.activityId > 0 && this.param.activity_id == 9)) {
            let activity = ActivitySrv.GetActivityById(this.param.activity_id)
            if (activity) {
                this.updateAwardItem(activity)
            } else {
                this.node.active = false
            }
        }
    }

    initData(data: any) {
        // let bgImg = {
        //     "4":"component/Welfare/images/xingyunzhuanpan2",
        //     "8":"component/Welfare/images/meiriqiandao2",
        //     "3":"component/Welfare/images/kanguanggao2",
        //     "9":"component/Welfare/images/jinbibuzhu2"
        // }

        // let nameImg = {
        //     "4":"component/Welfare/images/xingyunzhuanpan1",
        //     "8":"component/Welfare/images/meiriqiandao1",
        //     "3":"component/Welfare/images/kanguanggao1",
        //     "9":"component/Welfare/images/jinbibuzhu1"
        // }

        
        
        // if (bgImg[data.activity_id]) {
        //     this.setSpriteFrame("bg", bgImg[data.activity_id])
        // }

        // if (nameImg[data.activity_id]) {
        //     this.setSpriteFrame("titel", nameImg[data.activity_id])
        // }

        this.updateAwardItem(data)
    }

    updateAwardItem(data: any) {
        let getTipText = {
            "4":"立即前往",
            "8":"立即前往",
            "3":"立即领取",
            "9":"立即领取",
            "11":"领取免费金币"
        }

        let config = ActivitySrv.GetActivityById(11)
        if(config){
            getTipText["11"] = "领取" + Helper.FormatNumWYCN(config.weight[0].rewards[0].min_num) +"金币"
        }

        this.param = data
        let info = data
        let now = Date.now() / 1000
        if (info.activity_id == 4){
            this.setLabelValue("btn/getTip", getTipText[data.activity_id])
            if (info.day_times && info.receive_num && info.receive_num >= info.day_times){
                this.setActive("canReceive", false)
            }else{
                this.setActive("canReceive", true)
            }
        } else if (info.day_times && info.receive_num && info.receive_num >= info.day_times) {
            this.setButtonInfo("btn", { interactable: false })
            this.setActive("canReceive", false)
            this.setLabelValue("btn/getTip", "暂不可领")
            this.setActive("tip", true)
        } else if (info.receive_time && now - info.receive_time < info.interval_time * 60) {
            this.setButtonInfo("btn", { interactable: false })    
            this.setActive("canReceive", false)        
            let total = info.interval_time * 60
            let par = now - info.receive_time
            this.setLabelValue("btn/getTip", Helper.FormatTimeString((total - par) * 1000, "hh:mm:ss"))
            let up = cc.tween()
                .call(() => {
                    let p = Math.floor(Date.now() / 1000 - info.receive_time)
                    if(total >= p){
                        this.setLabelValue("btn/getTip", Helper.FormatTimeString((total - p) * 1000, "hh:mm:ss"))
                    }else{
                        this.setButtonInfo("btn", { interactable: true })
                        this.setActive("canReceive", true)
                        this.setLabelValue("btn/getTip", getTipText[data.activity_id])
                        cc.Tween.stopAllByTarget(this.node)
                    }
                })
                .delay(1)

            cc.tween(this.node)
                .repeat(Math.ceil(total - par), up)
                .call(() => this.updateAwardItem(data))
                .start()
        } else if (info.activity_id == 9 && info.param && info.param.broke_num && User.MainToken >= info.param.broke_num){  //金币补助6万以下才能领取
            // this.setButtonInfo("btn", { interactable: false })
            this.setActive("canReceive", false)
            this.setLabelValue("btn/getTip", "暂不可领")
        } else if (info.activity_id == 8) {//每日签到
            this.checkSign()
        } else {
            this.setButtonInfo("btn", { interactable: true })
            this.setActive("canReceive", true)
            this.setLabelValue("btn/getTip", getTipText[data.activity_id])            
        }        
    }

    starWcoinAni(num: number, startPos: cc.Vec2) {
        num = num > 20 ? 20 : num
        for (let i = 0; i < num; i++) {
            let pos = cc.Vec2.ZERO
            pos.x = startPos.x + Math.random() * 100 - 50
            pos.y = startPos.y + Math.random() * 100 - 50
            let spt = new cc.Node()
            spt.addComponent(cc.Sprite)
            cc.director.getScene().addChild(spt)
            spt.getComponent(cc.Sprite).sizeMode = cc.Sprite.SizeMode.TRIMMED
            this.setSpriteFrame(spt, "image/icon/daoju-weibi")
            spt.width = 39
            spt.height = 40

            spt.setPosition(pos)
            spt.setScale((Math.random() * 5) / 10 + 0.5)

            let x = Math.random() * 200 - 100
            let y = Math.random() * 200
            var bezier = [cc.v2(pos.x - x, pos.y + y), cc.v2(pos.x - x, pos.y + y), cc.v2(cc.winSize.width / 2 - 40, cc.winSize.height - 126)];
            var bezierTo = cc.bezierTo(0.8, bezier);
            cc.tween(spt)
                .delay(0.02 * i)
                .then(bezierTo)
                .to(0.2, { opacity: 0 })
                .call(() => {
                    spt.destroy()
                })
                .start()
        }
    }

    checkSign(){
        MonthSignSrv.GetConfig((config) => {
            console.log("checkSign", config)
            let allGet = true
            for (let i = 0; i < config.list.length; i++) {
                let info = config.list[i]
                if(info.day_index <= config.today_week && info.receive != 1){
                    allGet = false
                }
            }

            if(allGet){
                // this.setButtonInfo("btn", { interactable: false })
                this.setActive("canReceive", false)
                // this.setLabelValue("btn/getTip", "暂不可领")
            }else{
                this.setActive("canReceive", true)
            }
        })
    }
}
