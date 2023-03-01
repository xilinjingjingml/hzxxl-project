import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { VipPrivilegeSrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { UserSrv } from "../../../start/script/system/UserSrv";
import { ShopType } from "../Shop/ShopSceneNew";


const { ccclass, property } = cc._decorator;

interface IEventData {
    func: Function
    target: any
}

@ccclass
export default class VipPrivilege extends BaseUI {
    @property(cc.Node)
    tabContent:cc.Node = null
    @property(cc.Node)
    tabPrefab:cc.Node = null

    @property(cc.Node)
    content:cc.Node = null
    @property(cc.Node)
    itemPrefab:cc.Node = null

    @property(cc.Node)
    awardContent:cc.Node = null
    @property(cc.Node)
    awardPrefab:cc.Node = null

    @property(cc.SpriteFrame)
    item_10005SpriteFrame:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    item_10014SpriteFrame:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    item_10017SpriteFrame:cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    item_10019SpriteFrame:cc.SpriteFrame = null
    
    @property(cc.Node)
    chongZhiJinE:cc.Node = null
    @property(cc.Node)
    nextLevel:cc.Node = null
    @property(cc.Node)
    todayGetExp:cc.Node = null

    todoList:IEventData[] = new Array()
    
    curLevel = 0
    vipPrivilegeData = null
    autoSetTabPos = 0
    onLoad(){
        this.tabPrefab.active = false
        this.itemPrefab.active = false
        this.awardPrefab.active = false
        
        this.setActive("node/top/maxLevelTip", false)
        this.setActive("node/award/btnGet", false)
        this.setActive("node/award/btnUnFinish", false)
    }

    protected start(): void {
        console.log("User.QpVipExp", User.QpVipExp)
        this.initButton()
        this.initEvent()
        if(Helper.isAudit()){
            this.setActive("node/btnHelp", false)
            this.setActive("node/top/expNode/upgradeTip", false)
            this.setNodePositionY("node/top/expNode/todayExp", this.getNode("node/top/maxLevelTip").y)
        }
        VipPrivilegeSrv.GetConfig((res)=>{
            VipPrivilegeSrv.GetPlayerVipPrivilege((vipPrivilege)=>{
                if(vipPrivilege && cc.isValid(this.node)){
                    this.curLevel = vipPrivilege.level
                    if(res && res.list){
                        this.vipPrivilegeData = res
                        for(let i=0;i<res.list.length;i++){
                            let data = res.list[i]
                            if(data.level == this.curLevel){
                                if(i == res.list.length-1){//满级
                                    this.setLabelValue("node/top/progressBar/exp", User.QpVipExp + "/-")
                                    this.setActive("node/top/expNode", false)
                                    this.setActive("node/top/maxLevelTip", true)
                                    this.setLabelValue("node/top/btnUpgrade/Background/Label", "充值")
                                    let progressBar = this.getNode("node/top/progressBar")
                                    progressBar.getComponent(cc.ProgressBar).progress = 100
                                }else{
                                    let experience = res.list[i+1].experience
                                    this.setLabelValue("node/top/progressBar/exp", User.QpVipExp + "/" + experience)
                                    console.log("data.experience/User.QpVipExp/10", Math.ceil((experience-User.QpVipExp)/10))
                                    this.setLabelValue(this.chongZhiJinE, Math.ceil((experience-User.QpVipExp)/10))
                                    this.setLabelValue(this.nextLevel, res.list[i+1].level)
        
                                    let pro = User.QpVipExp/experience
                                    pro = pro > 100 ? 100 : pro
                                    let progressBar = this.getNode("node/top/progressBar")
                                    progressBar.getComponent(cc.ProgressBar).progress = pro
                                }
                            }
                        }
                        
                        this.setLabelValue("node/level", this.curLevel)
                        this.initData()
                        this.setLabelValue(this.todayGetExp, res.today_round_exp || 0)
                    }
                }
            })            
        })
    }

    protected update(dt: number): void {
        if(this.todoList.length > 0){
            let todo = this.todoList[0]
            todo.func.apply(todo.target)
            this.todoList.splice(0,1)
            this.autoSetTabPos = 1
        }else{
            if(this.autoSetTabPos == 1){
                this.autoSetTabPos = 2
                if(this.curLevel > 2){
                    this.getNode("node/tab").getComponent(cc.ScrollView).setContentPosition(cc.v2(0, 165+(this.curLevel-1)*70))
                }
            }
        }
    }


    initEvent() {
    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/btnHelp", ()=>{
            UIMgr.OpenUI("component/VipPrivilege/VipPrivilegeHelp", { single: true , param : {}})
        })

        this.setButtonClick("node/top/btnUpgrade", ()=>{
            if(Helper.isAudit()){
                let labels = [
                    Constants.GAME_TYPE_LABLE.MAJIONG_HZXL, 
                    Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL, 
                    Constants.GAME_TYPE_LABLE.MAJIONG_XLCH
                 ]
                UIMgr.OpenUI("component/GameSession/GameSession", {single:true, param:{labels: labels}}, ()=>{
                    this.close()
                })
            }else{
                UIMgr.OpenUI("component/Shop/ShopSceneNew", { single: true, param: {tab: ShopType.Diamond} })
            }
        })

        this.setButtonClick("node/award/btnGet", ()=>{
            VipPrivilegeSrv.GetReward({level:this.curLevel}, (res)=>{
                if(cc.isValid(this.node)){
                    this.setActive("node/award/btnGet", false)
                    this.setActive("node/award/btnUnFinish", true)
                    this.setLabelValue("node/award/btnUnFinish/Background/Label", "已领取")
                }
                if (res && res.award_item) {
                    UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res.award_item } })
                }

                VipPrivilegeSrv.GetConfig((res)=>{
                    if(res && res.list && cc.isValid(this.node)){
                        this.vipPrivilegeData = res
                    }
                })
            })
        })
    }

    initData() {
        for(let v of this.vipPrivilegeData.list){
            let func = ()=>{
                let tab = cc.instantiate(this.tabPrefab)
                tab.active = true
                tab.parent = this.tabContent
                this.setLabelValue("Background/Label", tab, "特权"+v.level)
                this.setLabelValue("checkmark/Label", tab, "特权"+v.level)

                if(this.curLevel == v.level){
                    tab.getComponent(cc.Toggle).isChecked = true
                    this.setContentData(v.level)
                }
                this.setToggleClick(tab, ()=>{
                    this.setContentData(v.level)
                })
            }
            this.todoList.push({func:func, target: this})
        }
    }

    setContentData(level:number){
        this.curLevel = level
        let privilege = {
            remedies_times: 0,
            remedies_multiple: 0, 
            exchange_gold: 0,
            wheel_gold: 0,
            avoid_loss_pro: 0
        }
        if(cc.isValid(this.node) && this.vipPrivilegeData && this.vipPrivilegeData.list){
            this.content.removeAllChildren()
            this.awardContent.removeAllChildren()
            for(let v of this.vipPrivilegeData.list){
                v.remedies_times = v.remedies_times || 0
                v.remedies_multiple = v.remedies_multiple || 0
                v.exchange_gold = v.exchange_gold || 0
                v.wheel_gold = v.wheel_gold || 0
                v.avoid_loss_pro = v.avoid_loss_pro || 0
                if(v.level == level){
                    v.desc = []
                    if(v.remedies_times > 0){
                        let item = {
                            name: "可领取"+v.remedies_times+"次救济金",
                            new:0,
                            update:0,
                            sort_id:0
                        }
                        if(v.remedies_times > privilege.remedies_times){
                            if(privilege.remedies_times == 0){
                                item.new = 1
                                item.sort_id = 2
                            }else{
                                item.update = 1
                                item.sort_id = 1
                            }
                        }
                        v.desc.push(item)
                    }
                    if(v.remedies_multiple > 0){
                        let item = {
                            name: "可领取"+v.remedies_multiple+"倍救济金",
                            new:0,
                            update:0,
                            sort_id:0
                        }
                        if(v.remedies_multiple > privilege.remedies_multiple){
                            if(privilege.remedies_multiple == 0){
                                item.new = 1
                                item.sort_id = 2
                            }else{
                                item.update = 1
                                item.sort_id = 1
                            }
                        }
                        v.desc.push(item)
                    }
                    if(v.exchange_gold > 0){
                        let item = {
                            name: "商城内使用钻石可获得"+v.exchange_gold+"倍金币",
                            new:0,
                            update:0,
                            sort_id:0
                        }
                        if(v.exchange_gold > privilege.exchange_gold){
                            if(privilege.exchange_gold == 0){
                                item.new = 1
                                item.sort_id = 2
                            }else{
                                item.update = 1
                                item.sort_id = 1
                            }
                        }
                        v.desc.push(item)
                    }
                    if(v.wheel_gold > 0){
                        let item = {
                            name: "幸运转盘金币奖励提升至"+v.wheel_gold+"倍",
                            new:0,
                            update:0,
                            sort_id:0
                        }
                        if(v.wheel_gold > privilege.wheel_gold){
                            if(privilege.wheel_gold == 0){
                                item.new = 1
                                item.sort_id = 2
                            }else{
                                item.update = 1
                                item.sort_id = 1
                            }
                        }
                        v.desc.push(item)
                    }
                    if(v.avoid_loss_pro > 0){
                        let item = {
                            name: "血流玩法游戏中有"+ Math.floor(v.avoid_loss_pro*100)+"%概率输钱免扣",
                            new:0,
                            update:0,
                            sort_id:0
                        }
                        if(v.avoid_loss_pro > privilege.avoid_loss_pro){
                            if(privilege.avoid_loss_pro == 0){
                                item.new = 1
                                item.sort_id = 2
                            }else{
                                item.update = 1
                                item.sort_id = 1
                            }
                        }
                        v.desc.push(item)
                    }
                    v.desc = v.desc.sort((a, b) => {
                        return a.sort_id > b.sort_id ? -1 : 1
                    })
                    for(let d of v.desc){
                        let itemNode = cc.instantiate(this.itemPrefab)
                        itemNode.active = true
                        itemNode.parent = this.content
                        this.setLabelValue("text", itemNode, d.name)
                        this.setActive("new", itemNode, d.new == 1)
                        this.setActive("upgrade", itemNode, d.update == 1)
                    }

                    for(let award of v.rewards){
                        let itemNode = cc.instantiate(this.awardPrefab)
                        itemNode.active = true
                        itemNode.parent = this.awardContent
                        if(award.item_id == Constants.ITEM_INDEX.GAME_GOLD){
                            this.setSpriteFrame("icon", itemNode, this.item_10005SpriteFrame)
                            this.setLabelValue("num", itemNode, Helper.FormatNumWYCN(award.item_num)+UserSrv.GetItemInfo(award.item_id).name)
                        }else if(award.item_id == Constants.ITEM_INDEX.MJ_DOUBLE_CARD){
                            this.getNode("icon", itemNode).width = 50
                            this.getNode("icon", itemNode).height = 50
                            this.setSpriteFrame("icon", itemNode, this.item_10014SpriteFrame)
                            this.setLabelValue("num", itemNode, award.item_num+"张"+UserSrv.GetItemInfo(award.item_id).name)
                        }else if(award.item_id == Constants.ITEM_INDEX.FreeCard){
                            this.getNode("icon", itemNode).width = 50
                            this.getNode("icon", itemNode).height = 50
                            this.setSpriteFrame("icon", itemNode, this.item_10019SpriteFrame)
                            this.setLabelValue("num", itemNode, award.item_num+"张"+UserSrv.GetItemInfo(award.item_id).name)
                        }
                    }

                    if(v.state == 0){
                        this.setActive("node/award/btnGet", false)
                        this.setActive("node/award/btnUnFinish", true)
                        this.setLabelValue("node/award/btnUnFinish/Background/Label", "晋级后领取")
                    }else if(v.state == 1){
                        this.setActive("node/award/btnGet", true)
                        this.setActive("node/award/btnUnFinish", false)
                    }else if(v.state == 2){
                        this.setActive("node/award/btnGet", false)
                        this.setActive("node/award/btnUnFinish", true)
                        this.setLabelValue("node/award/btnUnFinish/Background/Label", "已领取")
                    }
                    break
                }
                privilege = v
            }
        }
    }
}
