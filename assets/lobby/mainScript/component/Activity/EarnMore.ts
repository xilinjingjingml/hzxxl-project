import BaseUI from "../../../start/script/base/BaseUI";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EarnMore extends BaseUI {
	curMatchInfo:any = null
	onOpen() {
		console.log("EarnMore onOpen", this.param)
		this.initButton()
		this.initData()
	}

	initButton(){
        this.setButtonClick("node/btnClose", this.node, ()=>{
			this.close()
		})

		this.setButtonClick("node/btnCancel", this.node, ()=>{
			this.close()
		})

		this.setButtonClick("node/btnConfirm", this.node, ()=>{
			this.param.confirm && this.param.confirm()
			this.close()
		})
    }

	initData(){			
		this.setLabelValue("node/content/tip", "大神，您的实力太强了，推荐您前往"+this.param.name+"哦！")		
	}
}
