import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RuleDetails extends BaseUI {


    protected start(): void {
        this.initData()
        this.initButton()
        this.initEvent()
    }

    initEvent() {

    }

    initButton() {
        this.setButtonClick("btnClose", ()=>{
            this.close()
        })

        this.setButtonClick("node/btnJoin", ()=>{
            UIMgr.OpenUI("component/PrivateRoom/JoinRoom", {single:true, param:{}}, ()=>{                
                cc.isValid(this.node) && this.close()
            })
        })

        this.setButtonClick("node/btnCreate", ()=>{
            this.close()
            UIMgr.OpenUI("component/PrivateRoom/PrivateRoom", {single:true, param:{}}, ()=>{                
                cc.isValid(this.node) && this.close()
            })
        })
    }
    
    initData(){
        
    }
}
