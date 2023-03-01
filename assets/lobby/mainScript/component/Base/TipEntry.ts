import BaseUI from "../../../start/script/base/BaseUI";



const { ccclass, property } = cc._decorator;

@ccclass
export default class TipEntry extends BaseUI {

    onOpen() {
        this.initData()
    }

    protected start(): void {
        this.node.zIndex = 999
    }
    
    setParam(param) {
        let msg = param.msg
        this.updateData(msg)
    }
     
    initData() {
        let msg = this.param.msg
        this.updateData(msg)
    }

    updateData(msg) {
        this.setLabelValue("mask/msg", msg)
        this.runAction()
    }

    runAction() {
        this.stopTween(this.node)
        this.node.opacity = 255        
        cc.tween(this.node)
        .by(0.8, {y: 80})
        .delay(0.3)
        .by(0.5, {opacity: -80})
        .call(() => this.close())
        .start()
    }

}
