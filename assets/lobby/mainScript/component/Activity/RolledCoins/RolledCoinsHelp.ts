import BaseUI from "../../../../start/script/base/BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RolledCoinsHelp extends BaseUI {
    protected start(): void {
        this.initData()
        this.initButton()
    }
    
    setParam(param) {
        let msg = param.msg
    }

    initButton(){
        this.setButtonClick("node/btnClose", () => {            
            this.close()
        })
    }
     
    initData() {
    }

}
