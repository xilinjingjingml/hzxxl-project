import { igs } from "../../igs";
import HzxlLogic from "../hzxl-logic";
let izx = igs.izx
// let BaseUI = izx.BaseUI

const { ccclass, property } = cc._decorator;

@ccclass
export default class scmjExchangeCardsTip extends cc.Component {
    // onLoad() {
    start() {
        this.onOpen()
    }

    onOpen() {
        izx.log("scmjExchangeCardsTip onOpen")
        this.node.runAction(cc.sequence(cc.moveTo(1, this.node.x, this.node.y + 100), cc.removeSelf(true), cc.destroySelf()))
    }

    onClose() {
    }

    onDestroy() {
    }
}
