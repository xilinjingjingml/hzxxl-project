import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { PluginMgr } from "../../../start/script/base/PluginMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";
import { MatchSvr } from "../../../start/script/system/MatchSvr";



const { ccclass, property } = cc._decorator;

@ccclass
export default class PersonalPop extends BaseUI {
    btnPrefab: cc.Node = null

    otherLoginContent: cc.Node = null

    onOpen() {
        this.initData()
        this.initEvent()
        this.initButton()
        // MatchSvr.GeCompletedList(()=>{
        //     let results = DataMgr.getData(Constants.DATA_DEFINE.MATCH_COMPLETED)
        //     console.log("results", results)
        // })        

        MatchSvr.getStatisticsMetrics(null, (res)=>{
            if(res.total_count > 0){
                this.setLabelValue("node/userInfo/winRate/num", Math.floor(res.win_count/res.total_count*100) + "%")
            }else{
                this.setLabelValue("node/userInfo/winRate/num", "0%")
            }
            this.setLabelValue("node/userInfo/totalGames/num", "" + res.total_count)
        })
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.LOGIN_SUCCESS, () => {
            this.initData()
        }, this)
    }

    initButton(){
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })
        
        this.setButtonClick("node/userInfo/head/btn", ()=>{
            UIMgr.OpenUI("component/Personal/PictureFrame", { single: true, param: {} })
        })

        this.setButtonClick("node/userInfo/btnCopy", ()=>{
            PluginMgr.copyToClipboard(User.Data.openId)
        })

        this.setToggleClick("node/tab/toggle/toggle1", ()=>{
            this.onChangePage(0)
        })

        this.setToggleClick("node/tab/toggle/toggle2", ()=>{
            this.onChangePage(1)
        })

        this.setToggleClick("node/userInfo/sexToggle/toggle1", ()=>{
            DataMgr.setData(Constants.DATA_DEFINE.USER_SEX, 1, true)
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.UPDATE_USER_SEX)
        })

        this.setToggleClick("node/userInfo/sexToggle/toggle2", ()=>{
            DataMgr.setData(Constants.DATA_DEFINE.USER_SEX, 0, true)
            EventMgr.dispatchEvent(Constants.EVENT_DEFINE.UPDATE_USER_SEX)
        })

        
    }

    initData() {
        console.log("PersonalPop User.PlayGame", User.PlayGame)
        console.log("PersonalPop User.AllGame", User.AllGame)
        let showId = User.Data.openId.split("-")
        this.setLabelValue("node/userInfo/gold/num", Helper.FormatNumWYCN(User.Gold))
        this.setLabelValue("node/userInfo/nickName", User.UserName)
        this.setLabelValue("node/userInfo/uid", "ID:" + showId[showId.length-1])
        this.setSpriteFrame("node/userInfo/head/mask/spt", User.Avatar, true)
        PlatformApi.setHeadVipTxk(this.getNode("node/userInfo/head/txk"), User.QpVipLevel)

        let sex:number = DataMgr.getData(Constants.DATA_DEFINE.USER_SEX) || 0
        if(sex == 0){
            this.getNode("node/userInfo/sexToggle/toggle2").getComponent(cc.Toggle).isChecked = true
        }
    }

    onChangePage(page: number){
        this.setActive("node/userInfo", page == 0)
        this.setActive("node/bill", page == 1)
    }
}
