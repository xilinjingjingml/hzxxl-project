import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePop extends BaseUI {

    onOpen() {
        this.param.hideClose = this.param.hideClose || false
        this.param.hideCancel = this.param.hideCancel || false
        this.initEvent()
        this.initData()
    }

    protected start(): void {
        this.node.zIndex = 11
    }

    initEvent() {
        this.setButtonClick("node/btnClose", () => {
            if (this.param && this.param.cancel && typeof this.param.cancel === "function") {
                this.param.cancel()
            }
            this.close()
        })
        this.setButtonClick("node/btnConfirm", this.onPressConfirm.bind(this))
        this.setButtonClick("node/btnCancel", this.onPressCancel.bind(this))
    }

    initData() {
        console.log("GamePop initData", this.param)
        this.setLabelValue("node/content/msg", this.param.msg)
        if(this.param.tip && this.param.tip.length > 0){
            this.getNode("node/content/msg").y = 10
            this.setLabelValue("node/content/tip", this.param.tip)
        }

        if(this.param.hideClose){
            this.setActive("node/btnClose", false)
        }
        if(this.param.hideCancel){
            this.setNodePositionX("node/btnConfirm", 0)
            this.setActive("node/btnCancel", false)
        }

        this.param.confirmLabel && this.setLabelValue("node/btnConfirm/Background/Label", this.param.confirmLabel)
    }

    onPressConfirm() {
        if (this.param && this.param.confirm && typeof this.param.confirm === "function") {
            this.param.confirm()
        }
        if (this.param.confirmUnclose === true) {
            return
        }
        this.close()
    }

    onPressCancel() {
        if (this.param && this.param.cancel && typeof this.param.cancel === "function") {
            this.param.cancel()
        }
        if (this.param.cancelUnclose === true) {
            return
        }
        this.close()
    }
}
