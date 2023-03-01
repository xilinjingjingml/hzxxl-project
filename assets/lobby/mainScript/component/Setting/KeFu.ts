import BaseUI from "../../../start/script/base/BaseUI";
import { PluginMgr } from "../../../start/script/base/PluginMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class KeFu extends BaseUI {
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

        this.setButtonClick("node/btnGet", () => {            
            PluginMgr.copyToClipboard("高手竞技")
        })
    }
     
    initData() {
        
    }

}
