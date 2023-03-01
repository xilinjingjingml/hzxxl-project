/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2021-09-08 10:06:40
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-18 15:01:10
 */
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { igs } from "../igs";

// import { igs } from "../../igs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ForceUpdate extends cc.Component {

    @property(cc.Label)
    content: cc.Label = null;

    @property(cc.Node)
    container: cc.Node = null;

    @property(cc.Button)
    skipBtn: cc.Button = null;

    @property(cc.Label)
    skipLabel: cc.Label = null;

    @property(cc.Label)
    okLabel: cc.Label = null;

    _url: string = "";
    _type: number = 0;
    _data: any = null;

    start() {
        igs.on(igs.consts.Event.FORCE_UPDATE, this.show, this)
        igs.on(igs.consts.Event.CHECK_REMOTE_UPDATE_FAIL, this.showCheckFail, this)
        igs.on(igs.consts.Event.GET_ONLINE_PARAM_FAIL, this.showOnlineParamFail, this)
        igs.on(igs.consts.Event.BUNDLE_NOT_EXIST_EVERYWHERE, this.showBundleNotExist, this)
        igs.on(igs.consts.Event.BUNDLE_DOWNLOAD_FAILED, this.showBundleDownloadFailed, this)
    }

    show(info: {force: boolean, url: string}) {
        if (info.force) {
            this.skipBtn.node.active = false;
        }
        this._url = info.url
        this.content.string = `有新版本！`
        this.container.active = true
        this._type = 1
    }

    showCheckFail(info) {
        this.skipBtn.node.active = false;
        this.content.string = `检查更新失败`
        this.okLabel.string = "重试"
        this.container.active = true
        this._type = 2
    }

    showOnlineParamFail(info) {
        this.skipBtn.node.active = false;
        this.content.string = `获取服务器信息失败`
        this.okLabel.string = "重试"
        this.container.active = true
        this._type = 3
    }

    showBundleNotExist(config: igs.bundle.BundleConfig) {
        this._data = config
        this.skipBtn.node.active = false;
        this.content.string = `游戏不存在`
        this.okLabel.string = "重试"
        this.container.active = true
        this._type = 4
    }

    showBundleDownloadFailed(config: igs.bundle.BundleConfig) {
        this._data = config
        this.skipBtn.node.active = false;
        this.content.string = `游戏下载失败`
        this.okLabel.string = "重试"
        this.container.active = true
        this._type = 5
    }

    hide() {
        this.container.active = false
    }

    onPressOk() {
        this.hide()
        if (this._type === 1) {
            if (CC_JSB) {
                if (jsb.PluginProxyWrapper) {
                    jsb.PluginProxyWrapper.getInstance().openURL(this._url)
                }
            }
            cc.game.end()
        } else if (this._type === 2) {
            igs.emit(igs.consts.Event.CHECK_BUNDLE_INFO)
        } else if (this._type === 3) {
            igs.emit(igs.consts.Event.GET_ONLINE_PARAM)
        } else if (this._type === 4) {
            igs.emit(igs.consts.Event.CHECK_BUNDLE_INFO, this._data)
        } else if (this._type === 5) {
            igs.emit(igs.consts.Event.CHECK_BUNDLE_INFO, this._data)
        }
    }
    onPressSkip() {
        this.hide()
        igs.emit(igs.consts.Event.SKIP_FORCE_UPDATE)
    }
}
