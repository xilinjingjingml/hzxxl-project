import { Util } from "../../../start/script/api/utilApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { ActivitySrv } from "../../../start/script/system/ActivitySrv";




const { ccclass, property } = cc._decorator;

@ccclass
export default class MailPop extends BaseUI {
    onOpen() {
        console.log("MailPop openId", User.Data.openId)

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
    }

    initData() {
    }
}
