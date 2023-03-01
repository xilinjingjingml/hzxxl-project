import BaseUI from "../../../start/script/base/BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseTopRight extends BaseUI {

    onOpen() {
        this.initData()
        this.initEvent()
        this.initButton()
    }

    protected onLoad(): void {
        this.setActive("ItemBean", false)
    }

    setParam(param: any){
        console.log("BaseTopRight setParam", param)
        if(param.itemClick == false){
            this.getNode("ItemBean/btn").getComponent(cc.Button).interactable = false
            this.getNode("ItemGold/btn").getComponent(cc.Button).interactable = false
            this.getNode("ItemDiamond/btn").getComponent(cc.Button).interactable = false
        }

        if(param.showBean){
            this.setActive("ItemBean", true)
            this.setActive("ItemFucard", false)
        }else{
            this.setActive("ItemBean", false)
            this.setActive("ItemFucard", true)
        }
    }

    initEvent() {
    }

    initButton(){
    }

    initData() {
    }
}
