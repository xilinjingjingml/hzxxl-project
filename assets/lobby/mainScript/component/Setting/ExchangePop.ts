import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ExchangeSrv } from "../../../start/script/system/ExchangeSrv";
import { Helper } from "../../../start/script/system/Helper";




const { ccclass, property } = cc._decorator;

@ccclass
export default class ExchangePop extends BaseUI {
    onOpen() {
        console.log("ExchangePop openId", User.Data.openId)

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

        this.setButtonClick("node/btnGet", ()=>{
            let editBox = this.getNode("node/editBox")
            console.log("btnGet", editBox.getComponent(cc.EditBox).string)
            this.onPressBtnGet()
        })
    }

    initData() {
    }
    
    onPressBtnGet() {
        let edit = this.getNodeComponent("node/editBox", cc.EditBox)
        console.log("onPressBtnGet edit", edit.string)
        if(edit.string.length == 0){
            Helper.OpenTip("请输入正确的兑换码！")
            return
        }
        if (edit.string === ">>*>>t") {
            DataMgr.setData(Constants.DATA_DEFINE.IGS_ENV, Constants.ENV.ENV_SANDBOX, true)
            cc.game.restart()
            return
        } else if (edit.string === ">>*>>o") {
            DataMgr.setData(Constants.DATA_DEFINE.IGS_ENV, Constants.ENV.ENV_PRODUCTION, true)
            cc.game.restart()
            return
        } else if (edit.string === ">>*>>a") {
            DataMgr.setData(Constants.DATA_DEFINE.IGS_ENV, Constants.ENV.ENV_ABROAD, true)
            cc.game.restart()
            return
        }

        ExchangeSrv.codeAwar({ex_code: edit.string}, (res)=>{
            console.log("onPressBtnGet", res)
            if(res.code == "00000"){
                UIMgr.OpenUI("component/Shop/GetAwardEntry", { param: { awards: res.ex_award}}, ()=>{
                    if(cc.isValid(this.node)){
                        this.close()
                    }
                }) 
            }else{
                Helper.OpenTip("请输入正确的兑换码！")
            }
        })
    }
}
