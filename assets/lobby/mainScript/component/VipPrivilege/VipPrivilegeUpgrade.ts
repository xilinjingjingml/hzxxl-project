import { PlatformApi } from "../../../start/script/api/platformApi";
import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Constants } from "../../../start/script/igsConstants";
import { VipPrivilegeSrv } from "../../../start/script/system/ActivitySrv";
import { TaskSrv } from "../../../start/script/system/TaskSrv";


const { ccclass, property } = cc._decorator;

@ccclass
export default class VipPrivilegeUpgrade extends BaseUI {
    @property(cc.Node)
    level: cc.Node = null

    onLoad(){        
        this.setActive("node/content/item2", false)
    }

    protected start(): void {
        this.initButton()
        this.initEvent()
        this.initData()
    }



    initEvent() {
    }

    initButton() {
        this.setButtonClick("node/btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/btnClose2", ()=>{
            this.close()
        })

        this.setButtonClick("node/btnShowMore", ()=>{
            UIMgr.OpenUI("component/VipPrivilege/VipPrivilege", { single: true , param : {}}, ()=>{
                if(cc.isValid(this.node)){
                    this.close()
                }
            })
        })
    }

    initData() {
        VipPrivilegeSrv.GetPlayerVipPrivilege((vipPrivilege)=>{
            if(vipPrivilege){
                this.setLabelValue(this.level, vipPrivilege.level)
                let txkList = PlatformApi.getHeadVipTxkList()
                if(txkList[vipPrivilege.level] && txkList[vipPrivilege.level].isNew){
                    this.setActive("node/content/item2", true)
                    let txk = this.getNode("node/content/item2/icon")
                    PlatformApi.setHeadVipTxk(txk, vipPrivilege.level)
                }
            }
        })
    }
}
