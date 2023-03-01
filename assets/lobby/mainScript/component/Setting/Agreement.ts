import BaseUI from "../../../start/script/base/BaseUI";
import { DataMgr } from "../../../start/script/base/DataMgr";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Agreement extends BaseUI {
    @property(cc.Node)
    content: cc.Node = null
    @property(cc.Node)
    itemPrefab: cc.Node = null

    @property(cc.SpriteFrame)
    ysxySpriteFrame:cc.SpriteFrame = null
    protected start(): void {
        this.itemPrefab.active = false

        this.initData()
        this.initButton()

        if (this.param.type == 2) {
            this.setSpriteFrame("node/top/title", this.ysxySpriteFrame)
        }
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
        let dataList = []
        if (this.param.type == 2) {
            let agmt = DataMgr.data.OnlineParam.agreement
            if(agmt && agmt.len && agmt.name){
                for (let i = 1; i <= agmt.len; i++) {
                    dataList.push({ path: `https://download.mcbeam.cc/Image/${agmt.name + i}.png`, index: i })
                }
            }
        } else {
            for (let i = 1; i <= 19; i++) {
                dataList.push({ path: "https://download.mcbeam.cc/Image/yhxy_" + i + ".png", index: i })
            }
        }

        for (let v of dataList) {
            let itemNode = cc.instantiate(this.itemPrefab)
            itemNode.parent = this.content
            itemNode.active = true
            this.setSpriteFrame(itemNode, v.path, false)
        }
    }

}
