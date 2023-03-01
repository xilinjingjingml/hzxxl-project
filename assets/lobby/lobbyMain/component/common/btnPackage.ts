import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class btnPackage extends BaseUI {
    protected start(): void {
        this.initData()
        this.initEvent()
        this.initButton()
    }

    initEvent() {
    }

    initButton(){
        this.setButtonClick(this.node, ()=>{
            this.onPressMail()
        })
    }

    initData() {
    }

    onPressMail() {
        console.log("onPressMail")
        UIMgr.OpenUI("component/Personal/Backpack", { single: true, param: {} })
    }
}
