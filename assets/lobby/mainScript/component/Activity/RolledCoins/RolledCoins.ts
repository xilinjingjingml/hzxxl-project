import BaseUI from "../../../../start/script/base/BaseUI";
import { DataMgr } from "../../../../start/script/base/DataMgr";
import { EventMgr } from "../../../../start/script/base/EventMgr";
import { UIMgr } from "../../../../start/script/base/UIMgr";
import { Constants } from "../../../../start/script/igsConstants";
import { ActivitySrv, RolledCoinsSrv } from "../../../../start/script/system/ActivitySrv";
import { Helper } from "../../../../start/script/system/Helper";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RolledCoins extends BaseUI {
    configData = null
    machineDragonBones:dragonBones.ArmatureDisplay = null
    onOpen(): void {
        console.log("RolledCoins", this.param)
        this.initButton()
        RolledCoinsSrv.GetConfig(true, (res)=>{
            this.configData = res            
            this.initData()
        })
    }

    protected start(): void {
        this.machineDragonBones = this.getNode("node/dh").getComponent(dragonBones.ArmatureDisplay)
        this.machineDragonBones.addEventListener(dragonBones.EventObject.COMPLETE, (event: cc.Event)=>{                     
            this.getReward()
        })
    }

    onClose(): void {
        
    }

    initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{              
            this.close()
        })

        this.setButtonClick("node/btnRule", this.node, ()=>{              
            UIMgr.OpenUI("component/Activity/RolledCoins/RolledCoinsHelp", { single: true, param: {} })
        })

        this.setButtonClick("node/btnRolled", this.node, ()=>{
            if(this.configData == null) {
                Helper.OpenTip("请稍后再试")
            }else if(this.configData.day_times-this.configData.receive_num > 0) {
                this.setBlockUi(true)
                this.machineDragonBones.playAnimation("newAnimation", 1)
            }else if (this.configData.receive_num >= this.configData.day_max_times) {
                Helper.OpenTip("今日次数用完，请明日再来！")
            }else{
                let param = {
                    param: {
                        msg: "摇金币次数不足，进行5局游戏可增加1次\r\n摇金币机会，是否前往对局？",
                        confirmLabel: "前往对局",
                        cancel: () => {
                            
                        },
                        confirm: () => {
                            this.enterHzxl()
                            this.close()
                        }
                    }
                }
                UIMgr.OpenUI("component/Base/GamePop", param)
            }            
        })
    }

    initData(){   
        this.setLabelValue("node/times/node/num", this.configData.day_times-this.configData.receive_num)
    }

    setBlockUi(ret:boolean){
        if(cc.isValid(this.node)){
            this.getNode("node/btnRolled").getComponent(cc.Button).interactable = !ret
        }
    }

    getReward(){
        RolledCoinsSrv.GetReward(null, (res)=>{
            this.setBlockUi(false)
            if (res && res.err && res.err.code == 200) {
                RolledCoinsSrv.GetConfig(true, (res)=>{
                    this.configData = res            
                    this.initData()
                    EventMgr.dispatchEvent(Constants.EVENT_DEFINE.REFRESH_ACTIVITY_ROOLED_CONINS)
                })
            }

            if(res.rewards){
                UIMgr.OpenUI("component/Shop/GetAwardEntry", {param: { awards: res.rewards, autoOpenBox: true }, closeCb: ()=>{
                    // this.close()
                }})
            }else{
                let curBox = null
                let boxs = DataMgr.getData<TShopBoxes>(Constants.DATA_DEFINE.SHOP_BOXES)
                for(let k in boxs[Constants.SHOP_TYPE.NORMAL]){
                    let param = boxs[Constants.SHOP_TYPE.NORMAL][k].param
                    if(param && param.show_in_yaojinbi == 1 && param.group_index == res.group_index && param.box_id == res.box_id){
                        curBox = boxs[Constants.SHOP_TYPE.NORMAL][k]                 
                    }
                }
                console.log("curBox", curBox)
                
                UIMgr.OpenUI("component/Activity/RolledCoins/RolledCoinsResult", { single: true, param: {curBox: curBox}, closeCb: ()=>{
                    if(cc.isValid(this.node)){
                        this.node.active = true
                    }
                }}, ()=>{
                    if(cc.isValid(this.node)){
                        this.node.active = false
                    }
                })
            }
        })
    }

    enterHzxl(){
        let labels = [
           Constants.GAME_TYPE_LABLE.MAJIONG_HZXL, 
           Constants.GAME_TYPE_LABLE.MAJIONG_6HZXL, 
           Constants.GAME_TYPE_LABLE.MAJIONG_XLCH
        ]
        UIMgr.OpenUI("component/GameSession/GameSession", {single:true, param:{labels: labels}})
    }
}
