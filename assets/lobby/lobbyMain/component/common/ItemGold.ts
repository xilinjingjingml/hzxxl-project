import BaseUI from "../../../start/script/base/BaseUI";
import { EventMgr } from "../../../start/script/base/EventMgr";
import { UIMgr } from "../../../start/script/base/UIMgr";
import { User } from "../../../start/script/data/User";
import { Constants } from "../../../start/script/igsConstants";
import { Helper } from "../../../start/script/system/Helper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemGold extends BaseUI {

    protected start(): void {
        this.initData()
        this.initEvent()
        this.initButton()
    }

    initEvent() {
        EventMgr.on(Constants.EVENT_DEFINE.UPDATE_USER_ITEM, this.initData, this)
    }

    initButton() {
        this.setButtonClick("btn", () => {
            UIMgr.OpenUI("component/Shop/ShopSceneNew", { single: true, param: {} })
        })
    }

    initData() {
        this.setLabelValue("num", Helper.FormatNumWYCN(User.MainToken))
    }
}
