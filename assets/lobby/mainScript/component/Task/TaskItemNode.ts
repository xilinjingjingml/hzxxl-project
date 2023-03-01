import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Constants } from "../../../start/script/igsConstants";
import { ESocialResult } from "../../../start/script/pulgin/IPluginProxy";
import { ActivitySrv, MonthSignSrv } from "../../../start/script/system/ActivitySrv";
import { Helper } from "../../../start/script/system/Helper";
import { TaskSrv } from "../../../start/script/system/TaskSrv";
import { UserSrv } from "../../../start/script/system/UserSrv";
import { ShopType } from "../Shop/ShopSceneNew";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskItemNode extends BaseUI {
    @property(cc.SpriteFrame)
    jinbiSpriteFrame: cc.SpriteFrame = null
    @property(cc.SpriteFrame)
    zuanshiSpriteFrame: cc.SpriteFrame = null

    data = null
    onOpen() {
        // this.initButton()
    }

    protected start(): void {
        this.initButton()
    }

    initEvent() {

    }

    setParam(param: any): void {
        console.log("TaskItemNode param", param)
        this.data = param
        this.setData(param)
    }

    initButton() {
        this.setButtonClick("btnGet", ()=>{
            this.getAward(this.data)
        })

        this.setButtonClick("btnDo", ()=>{
            this.doTask(this.data)
        })
    }

    initData(list: any) {
        
    }

    setData(info: any){
        this.setLabelValue("name", info.name)
        info.progress = info.progress || 0
        this.setLabelValue("times", info.progress + "/" + info.max_progress)
        let btnGet = this.getNode("btnGet")
        let btnDo = this.getNode("btnDo")
        let btnCompleted = this.getNode("btnCompleted")
        btnGet.active = false
        btnDo.active = false
        btnCompleted.active = false
        //任务状态 0未完成 1奖励未领取 2已完成
        switch (info.status) {
            case 0:
                btnDo.active = true
                break
            case 1:
                btnGet.active = true                   
                break
            case 2:
                btnCompleted.active = true
                break
        }
        
        this.setActive("award0", false)
        this.setActive("award1", false)
        if (info.award_list && info.award_list[0]) {
            for (let i in info.award_list) {
                let awardNode = this.getNode("award"+i)
                if(awardNode){
                    awardNode.active = true
                    let award = info.award_list[i]
                    this.setLabelValue("num", awardNode, award.num)
                    if(award.id == DataMgr.data.Config.mainItemId){
                        this.setSpriteFrame("icon", awardNode, this.jinbiSpriteFrame)
                    }else if(award.id == Constants.ITEM_INDEX.GAME_DIAMOND){
                        this.setSpriteFrame("icon", awardNode, this.zuanshiSpriteFrame)
                    }
                }
            }
        }
    }

    doTask(task){
        console.log("doTask", task)
        if (task.cond_type === 0) {  // 比赛
            this.enterHzxl()
        } else if (task.cond_type === 2) {   // 观看广告
        } else if (task.cond_type === 3){   //分享
            Helper.shareInfo((res) => {
                if (res.ShareResultCode == ESocialResult.SHARERESULT_SUCCESS) {
                    TaskSrv.UpdateTaskStatus(task.task_tid, task.progress + 1, ()=>{
                        this.refreshTaskData()
                    })
                }
            })
        }else if (task.cond_type === 4) {   // 局数奖励
        } else if (task.cond_type === 6) {   // 签到
            let res = ActivitySrv.GetActivityById(8)
            if(res){
                MonthSignSrv.GetConfig((config) => {
                    UIMgr.OpenUI("component/Activity/Sign/Sign", { single: true, param: { signConfig: config, activityConfig: res }, closeCb: ()=>{
                        this.refreshTaskData()
                    }})                    
                })
            }            
        } else if (task.cond_type === 7) {   // 抽奖
            UIMgr.OpenUI("component/Activity/SlyderAdventures/SlyderAdventures", { single: true, param: {}, closeCb: ()=>{
                this.refreshTaskData()
            }})
        } else if (task.cond_type === 8) {   // 绑定手机
            
        } else if (task.cond_type === 9) {   // 关注公众号
            
        } else if (task.cond_type === 10) {  // 体验游戏
            
        } else if (task.cond_type === 11) {  // 下载APP
            
        } else if (task.cond_type === 12) {  // 邀请好友
            
        } else if (task.cond_type === 13) {  // 胡牌次数
            this.enterHzxl()
        } else if (task.cond_type === 14) {  //打开商城 在商城购买10钻石
            UIMgr.OpenUI("component/Shop/ShopSceneNew", { single: true, param: {tab: ShopType.Diamond}, closeCb: ()=>{
                this.refreshTaskData()
            }})
        } else if (task.cond_type === 15) {  //打开商城 在商城消耗10钻石
            UIMgr.OpenUI("component/Shop/ShopSceneNew", { single: true, param: {tab: ShopType.Gold}, closeCb: ()=>{
                this.refreshTaskData()
            }})
        } else if (task.cond_type === 16 || task.cond_type === 17) {  // 在房间内使用魔法表情3次            
            this.enterHzxl()
        }
    }

    getAward(info:any){
        TaskSrv.GetAward(info.task_id, (res) => {
            this.refreshTaskData()
            if(res && res.award_list && res.award_list.length > 0){
                for (let v of res.award_list) {
                    v.item_id = v.id
                    v.item_num = v.num
                }
                UserSrv.UpdateItem(() =>UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res.award_list, autoOpenBox: true } }))
            }
        })
    }

    refreshTaskData() {
        TaskSrv.GetTaskList((res) => {
            if (res.list) {
                for (let info of res.list) {
                    if(this.data && this.data.group_id == info.group_id){
                        this.data = info                        
                        this.setData(info)
                    }
                }
            }
        })
    }

    enterHzxl(){
        let labels = [
           Constants.GAME_TYPE_LABLE.MAJIONG_HZXL, 
           Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL, 
           Constants.GAME_TYPE_LABLE.MAJIONG_XLCH
        ]
        UIMgr.OpenUI("component/GameSession/GameSession", {single:true, param:{labels: labels}}, ()=>{
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.TASK_CLOSE)
        })
    }
}
