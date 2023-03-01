/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2021-09-03 11:22:42
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-18 15:01:26
 */
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { igs } from "../igs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewVersion extends cc.Component {

    @property(cc.Label)
    content: cc.Label = null;

    @property(cc.Node)
    container: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:
    data: igs.hotUpdate.UpdateData = null;

    start() {
        igs.on(igs.consts.Event.DOWNLOAD_MESSAGE, this.show, this)
    }

    show(data: igs.hotUpdate.UpdateData) {
        this.content.string = `有新版本: bundle:${data.bundleName}， v${data.newVersion}，大小${(Number(data.totalToDownloadBytesCount) / 1024 / 1024).toFixed(3)}M！`
        this.container.active = true
        this.data = data
    }

    hide() {
        this.container.active = false
    }

    onPressOk() {
        this.hide()
        igs.emit(igs.consts.Event.HOTUPDATE_OK, this.data)
    }

    onPressNo() {
        // this.hide()
        igs.emit(igs.consts.Event.HOTUPDATE_NO)
    }
}
