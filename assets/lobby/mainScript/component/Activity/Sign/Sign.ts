import BaseUI from "../../../../start/script/base/BaseUI";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { MonthSignSrv } from "../../../../start/script/system/ActivitySrv";
import { AdSrv } from "../../../../start/script/system/AdSrv";
import { Helper } from "../../../../start/script/system/Helper";
import { UserSrv } from "../../../../start/script/system/UserSrv";


const { ccclass, property } = cc._decorator;

let manyIcons = []
manyIcons[Constants.ITEM_INDEX.WCOIN] = "image/icon/many_weibi"
manyIcons[Constants.ITEM_INDEX.LOTTERY] = "image/shop/jiangquandui"
manyIcons[Constants.ITEM_INDEX.DIAMOND] = "image/icon/G6"

let litterIcons = []
litterIcons[Constants.ITEM_INDEX.WCOIN] = "image/icon/big_weibi"
litterIcons[Constants.ITEM_INDEX.LOTTERY] = "image/icon/big-jiangquan"
litterIcons[Constants.ITEM_INDEX.DIAMOND] = "image/icon/many_zuanshi"

@ccclass
export default class Sign extends BaseUI {
    @property(cc.SpriteFrame)
    diamondSpriteFrame: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    weekSpriteFrame: cc.SpriteFrame[] = new Array()

    daysContent: cc.Node = null
    itemNode: cc.Node = null
    itemLastNode: cc.Node = null

    monthContent: cc.Node = null
    monthItemNode: cc.Node = null
 
    btnGet:cc.Node = null
    btnGetDouble:cc.Node = null
    onOpen() {
        this.param.activityConfig.ad_aid = this.param.activityConfig.ad_aid || 0
        
        if(cc.sys.BYTEDANCE_GAME === cc.sys.platform){
            this.param.activityConfig.ad_aid = 0
        }

        if (this.param.activityConfig.ad_aid == 0) {
            this.btnGet.active = true
            this.btnGet.x = 0
        }else{
            this.btnGet.active = true
            this.btnGetDouble.active = true
        }

        if (this.param.signConfig) {
            this.initData(this.param.signConfig)
        }

        this.initButton()
    }

    onClose() {
        // Helper.reportEvent("大厅", "签到", "关闭界面")        
    }

    protected onDestroy(): void {
        // console.log("Sign onDestroy", this)
    }

    protected start(): void {
        this.btnGet = this.getNode("node/btnGet")
        this.btnGetDouble = this.getNode("node/btnGetDouble")
        this.btnGet.active = false
        this.btnGetDouble.active = false
        
        this.daysContent = cc.find("node/content/days", this.node)
        this.itemNode = cc.find("node/content/days/item", this.node)
        this.itemNode.active = false
        this.itemLastNode = this.getNode("node/content/days/itemBig")
        this.itemLastNode.active = false

        this.monthContent = cc.find("node/content/month/content", this.node)
        this.monthItemNode = cc.find("node/content/month/content/item", this.node)
        this.monthItemNode.active = false
        
    }

    initEvent() {

    }

    initButton() {
        this.setButtonClick("node/btnClose", this.node, () => {
            this.param.checkQueue && EventMgr.dispatchEvent(Constants.EVENT_DEFINE.FIRST_OPEN_QUEUE)
            this.close()
        })

        this.setButtonClick(this.btnGet, this.node, () => {
            this.getAward(0, 0)
        }, 0)

        this.setButtonClick(this.btnGetDouble, this.node, () => {
            this.createAdOrder(0) 
        }, 0)

        this.setButtonClick("node/total/btnShare", ()=>{
            if (Helper.isNative()) {
                let path = Helper.CaptureNodeInNative(this.getNode("node"))
                if (path.length > 0) {
                    Helper.shareInfo({ share_pic: path, skip: true })
                }
            }else{
                Helper.shareInfo()
            }
        })

    }

    setBeReceive(isReceive: boolean) {
        // if (this.param.activityConfig.ad_aid == 0) {
            
        // }else{
        // }
    }

    getAward(repair, isDouble) {
        if(cc.isValid(this.node)){
            let param = {
                repair: repair,   //补签
                multiple: isDouble,   //双倍领取
            }
            let activity_id = this.param.activityConfig.activity_id
            MonthSignSrv.GetReward(param, (res) => {
                if (res && res.err && res.err.code == 200) {                
                    // EventMgr.dispatchEvent(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, {activityId : this.param.activityConfig.activity_id})
                    //UIMgr.OpenUI("component/Activity/getAwardPop", { param: { awards: res.award_item } })
                    UserSrv.UpdateItem(() => {
                        UIMgr.OpenUI("component/Shop/GetAwardEntry", 
                        { 
                            param: { awards: res.award_item }, 
                        }, ()=>{
                            if(!repair && cc.isValid(this.node)){  //今日领取关闭界面
                                this.close()
                            }
                            MonthSignSrv.GetConfig(true, (config) => {
                                if(cc.isValid(this.node)){
                                    this.param.signConfig = config
                                    this.daysContent.removeAllChildren()
                                    this.monthContent.removeAllChildren()
                                    this.initData(config)
                                }
                                EventMgr.dispatchEvent(Constants.EVENT_DEFINE.REFRESH_ACTIVITY, {activityId : activity_id})
                            })
                        })                    
                    })
                    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.SIGN_AWARD_UPDATE)
                }
            })
        }
    }

    createAdOrder(repair) {
        AdSrv.createAdOrder(this.param.activityConfig.ad_aid, null, (res: IPlayAdCallBack) => {
            if (res && res.order_no && res.order_no.length > 0) {
                AdSrv.completeAdOrder((res) => {
                    if (res && res.code == "00000") {
                        this.getAward(repair, 1)
                    }
                })
            } else {
                this.setBeReceive(false)
            }
        })
    }

    initData(signConfig: any) {
        let todayReceive = false   //今日是否签到
        let canRepair = false //是否有补签
        //日签到
        this.setLabelValue("node/total/total/label", signConfig.total_times + "天")
        this.setLabelValue("node/total/month/label", signConfig.total_month_times + "天")
        let curRepairNode = null
        for (let i = 0; i < signConfig.list.length; i++) {
            let info = signConfig.list[i]
            if(info.day_index == signConfig.today_week){
                todayReceive = info.receive == 1
            }else if(info.receive != 1 && info.day_index < signConfig.today_week){
                canRepair = true
            }
        }
        for (let i = 0; i < signConfig.list.length; i++) {
            let func = ()=>{
                let info = signConfig.list[i]
                let itemNode = null
                if (i < 6) {
                    itemNode = cc.instantiate(this.itemNode)
                } else {
                    itemNode = cc.instantiate(this.itemLastNode)
                }
                itemNode.active = true
                itemNode.x = (2+168)*i+itemNode.width/2
                this.daysContent.addChild(itemNode)

                this.setSpriteFrame("week", itemNode, this.weekSpriteFrame[i])

                if(info.day_index == signConfig.today_week){
                    this.setActive("bg", itemNode, false)
                    if(!todayReceive){
                        this.setActive("bg_ani/cur", itemNode, true)
                        let bgAni = this.getNode("bg_ani/cur", itemNode).getComponent(dragonBones.ArmatureDisplay)
                        bgAni.addEventListener(dragonBones.EventObject.COMPLETE, (event: cc.Event)=>{                        
                            let name = "newAnimation_qiandao_xunhuan"
                            if(info.day_index == 7){
                                name = "newAnimation_qiandao_xunhuan_2"
                            }
                            bgAni.playAnimation(name, 0)
                        })                        
                        itemNode.zIndex = 1
                        cc.tween(itemNode)
                            .to(0.15,{scale:1.5})
                            .to(0.15,{scale:1.0})
                            .start()
                    }else{
                        this.setActive("bg_ani/cur", itemNode, false)
                        this.setActive("bg_cur", itemNode, true)
                    }
                }

                if(info.reward_list[0].item_id == Constants.ITEM_INDEX.GAME_DIAMOND){
                    this.setSpriteFrame("icon", itemNode, this.diamondSpriteFrame)
                }
                this.setLabelValue("num", itemNode, info.reward_list[0].item_num + UserSrv.GetItemInfo(info.reward_list[0].item_id).name)

                if(info.receive == 1){
                    this.setActive("receive", itemNode, true)
                }else if(info.day_index < signConfig.today_week){                    
                    this.setActive("week", itemNode, false)
                    this.setActive("btnRepair", itemNode, true)
                    if(!curRepairNode){
                        curRepairNode = itemNode
                        if(todayReceive && curRepairNode){            
                            this.setActive("bg_ani/repair", curRepairNode, true)
                        }
                    }
                }

                this.setButtonClick("btnRepair", itemNode, ()=>{
                    this.createAdOrder(1)
                })
            }

            setTimeout(()=>{
                if(cc.isValid(this.node)){
                    func()
                }
            }, 100+50*i)
        }

        //月签到
        let pressWidth = 0
        let times = signConfig.total_month_times
        if(!todayReceive){
            // times += 1
        }
        let p1 = [55, 200, 335, 470, 610, 740]    //进度条一半
        let p2 = [160, 294, 429, 563, 699, 834]   //进度条显示到奖励
        for (let i = signConfig.month_list.length-1; i >=0 ; i--) {
            let info = signConfig.month_list[i]
            let itemNode = cc.instantiate(this.monthItemNode)
            itemNode.active = true
            itemNode.x = itemNode.x + i*135
            this.monthContent.addChild(itemNode)            
            
            if(info.reward_list[0].item_id == Constants.ITEM_INDEX.GAME_DIAMOND){
                this.setSpriteFrame("icon", itemNode, this.diamondSpriteFrame)
            }
            this.setLabelValue("num", itemNode, "x" + info.reward_list[0].item_num)
            this.setLabelValue("days", itemNode,  info.day_index + "天")

            if((canRepair || !todayReceive) && (times+1 == info.day_index)){
                times += 1
                this.setActive("guang", itemNode, true)
            }

            // if(times+1 == info.day_index && (canRepair || !todayReceive)){
            //     this.setActive("guang", itemNode, true)
            // }

            if(times == 0){
                pressWidth = 0
            }else if(times < info.day_index){
                pressWidth = p1[i]
            }else if(times == info.day_index){
                pressWidth = p2[i]
            }
        }
        // let bar = this.getNode("node/content/month/progress/bar")
        // bar.width = pressWidth
        this.getNode("node/content/month/progress/mask").width = pressWidth

        if(todayReceive){
            this.btnGet.getComponent(cc.Button).interactable = false
            this.btnGetDouble.getComponent(cc.Button).interactable = false
        }
    }
}
