import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class AgreementWebView extends BaseUI {
    protected start(): void {
        this.initData()
        this.initButton()
    }

    setParam(param) {
        let msg = param.msg
    }

    initButton() {
        this.setButtonClick("node/btnClose", () => {
            this.close()
        })
    }

    initData() {
    }

}
