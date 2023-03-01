import BaseUI from "../../../start/script/base/BaseUI";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { Helper } from "../../../start/script/system/Helper";
import { UserSrv } from "../../../start/script/system/UserSrv";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DropMatch extends BaseUI {

    onOpen() {
        this.initEvent()
        this.initData()
    }

    initEvent() {
        this.setButtonClick("node/btnClose", () => this.close())
        this.setButtonClick("node/btnConfirm", this.onPressConfirm.bind(this))
        this.setButtonClick("node/btnCancel", this.onPressCancel.bind(this))
    }

    initData() {
        this.setLabelValue("node/btnConfirm/Background/node/Label", this.param.exchangeBox.consume_list[0].item_num)
        let name = this.param.matchInfo.name
        this.setLabelValue("node/content/node/Label", name.substring(name.length-3, name.length))
    }

    onPressConfirm() {
        Helper.exchangeTemplateInfo(this.param.exchangeBox, (success) => {
			if(success){
				UserSrv.UpdateItem(()=>{
                    this.param.confirm()
					this.close()
				})
			}
        })
    }

    onPressCancel() {
        this.param.cancel()
        this.close()
    }
}
