import BaseUI from "../../../../start/script/base/BaseUI";
import { User } from "../../../../start/script/data/User";
import { ActivitySrv } from "../../../../start/script/system/ActivitySrv";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Activity extends BaseUI {
    @property(cc.Node)
    mfjbNode:cc.Node= null
    @property(cc.Node)
    jzdbxgNode:cc.Node= null
    @property(cc.Node)
    jkyxggNode:cc.Node= null

    //免费金币的四个活动
    @property(cc.Node)
    zhuanPan: cc.Node = null
    @property(cc.Node)
    qianDao: cc.Node = null
    @property(cc.Node)
    kanShiPin: cc.Node = null
    @property(cc.Node)
    jinBiBuZhu: cc.Node = null
    @property(cc.Node)
    KfGift: cc.Node = null

    @property(cc.RichText)
    jzdbxgRichText: cc.RichText = null

    start() {
        console.log("Activity openId", User.Data.openId)
        console.log("Activity param", this.param)
        
        this.initData()
        this.initEvent()
        this.initButton()
    }

    initEvent() {
       
    }

    initButton(){
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setToggleClick("node/tab/toggle1", ()=>{
            this.mfjbNode.active = true
            this.jzdbxgNode.active = false
            this.jkyxggNode.active = false
        })

        this.setToggleClick("node/tab/toggle2", ()=>{
            this.mfjbNode.active = false
            this.jzdbxgNode.active = true
            this.jkyxggNode.active = false
        })

        this.setToggleClick("node/tab/toggle3", ()=>{
            this.mfjbNode.active = false
            this.jzdbxgNode.active = false
            this.jkyxggNode.active = true
        })
    }

    initData() {
        this.initMfjb()
        this.jzdbxgRichText.getComponent(cc.RichText).string = this.jzdbxgText
    }

    initMfjb(){
        ActivitySrv.GetActivityConfig(0, (res)=>{
            console.log("GetActivityConfig",res)
            if(res && cc.isValid(this.node)){
                let activityList = []
                for(let v of res){
                    if(v.activity_id == 3 || v.activity_id == 4  || v.activity_id == 9 || v.activity_id == 8 || v.activity_id == 11){
                        activityList.push(v)
                    }
                }
                
                for(let v of activityList){       
                    if(v.activity_id == 3){
                        this.setChildParam(this.kanShiPin, v)
                    }else if(v.activity_id == 4){   
                        this.setChildParam(this.zhuanPan, v)
                    }else if(v.activity_id == 9){
                        this.setChildParam(this.jinBiBuZhu, v)                
                    }else if(v.activity_id == 8){
                        this.setChildParam(this.qianDao, v)                
                    }else if(v.activity_id == 11){
                        this.setChildParam(this.KfGift, v)            
                    }
                }
            }
        })
    }

    jzdbxgText = "　　您使用本游戏产品及相关服务，应严格遵守本游戏服务协议以及以下要求。您不得利用本游戏及相关服务从事赌博及其他任何违法违规行为。据此，本游戏特别提示您："+
    "\r\n"+
    "\r\n1、本游戏中的积分、金豆、金币及其他游戏虚拟道具不具有任何财产性功能或者财产价值，仅限用户本人在本游戏中使用。"+
    "\r\n"+
    "\r\n2、我们有权结合游戏产品情况对用户每局、每日（或其他一段时间/期限内）积分、金豆及其他游戏虚拟道具的消耗数量，以及对用户的充值金额和游戏时间进行限制，以保障用户适度健康地使用本游戏产品及相关服务。"+
    "\r\n"+
    "\r\n3、除国家法律法规及政策另有规定外，我们对本游戏的积分、金豆、金币及其他游戏虚拟道具均不提供任何形式的回购、直接或变相兑换现金。"+
    "\r\n"+
    "\r\n4、本游戏仅供您进行休闲娱乐使用，您不得利用本游戏及相关服务从事任何营利行为，更不得利用本游戏及相关服务从事赌博及其他任何违法违规行为，也不得为其他用户从事前述营利、赌博或其他违法违规行为提供任何帮助或条件（依据法律的规定和程序向用户退款除外）。"+
    "\r\n"+
    "\r\n5、您不得以任何方式在游戏内及游戏外买卖、转让、交易游戏账号、积分、金豆、金币及其他游戏虚拟道具，或发布相关交易信息。同时，您也不得将您持有的游戏账号、积分、金豆、金币及其他游戏虚拟道具以任何方式提供给其他用户使用，以及从第三方通过购买、接受赠与或者其他方式获得本游戏账号、积分、金豆、金币、游戏虚拟道具及其他增值服务。"+
    "\r\n"+
    "\r\n6、您在游戏内及游戏外买卖、转让、交易或游戏账号、积分、金豆、金币及其他游戏虚拟道具均不符合本规则，所得权益也不受本游戏保护。一直以来，我们秉持健康、休闲、绿色的游戏理念，致力于打造健康绿色竞技娱乐平台。也希望大家能够与我们携手，共同营造和谐良好的游戏环境。"+
    "\r\n"+
    "\r\n　　同时，本游戏禁止任何用户和其他第三方在游戏内、游戏外进行各种形式的赌博、诈骗活动，游戏用户应当对自己的言行负责，尤其不得有下述行为："+
    "\r\n（1）通过任何方式、行为散布或传播赌博、诈骗等信息；"+
    "\r\n（2）通过任何方式、行为冒充平台或游戏系统向其他用户散布或传播虚假信息；"+
    "\r\n（3）通过任何方式、行为散布或传播、使用私服、木马、外挂、病毒及此类信息"+
    "\r\n"+
    "\r\n　　违反本公告和用户协议的用户，官方将视情节轻重、依据用户协议采取必要的处置措施（包括但不限于警告、禁言、删除游戏账号、解散游戏内房间、封停游戏账户）；涉嫌违法犯罪的，将移送公安和司法机关处理。"+
    "\r\n"+
    "\r\n　　本游戏有责任落实国家相关主管部门净化网络环境的要求，致力于维护用户的合法权益。我们将维持并营造更加健康、安全的游戏环境，感谢广大用户的支持和配合。祝大家游戏愉快！"
}
