/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2020-11-02 10:40:56
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-10-18 17:18:36
 */
import { igs } from "../igs";
let izx = igs.izx

// 游戏启动 放在启动场景中
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameMain extends cc.Component {

    start() {

        let fitScreen = ()=>{
            let screenSize = cc.view.getFrameSize()
            izx.log("==设备分辨率==", screenSize.width, screenSize.height)
            let scale = screenSize.width / screenSize.height
            if (scale < 1) {
                scale = screenSize.height / screenSize.width
            }

            let isLandscape = true
            let designSize = cc.view.getDesignResolutionSize()
            izx.log("==设计分辨率==", designSize.width, designSize.height)
            if (designSize.width < designSize.height) {
                isLandscape = false
            }

            // 横屏
            let dstFrameWidth, dstFrameHeight
            if (isLandscape) {
                if (scale > (designSize.width / designSize.height)) {
                    cc.Canvas.instance.fitWidth = false
                    cc.Canvas.instance.fitHeight = true
                    dstFrameWidth = designSize.width * (screenSize.height / designSize.height), dstFrameHeight = screenSize.height
                } else {
                    cc.Canvas.instance.fitWidth = true
                    cc.Canvas.instance.fitHeight = false
                    dstFrameWidth = screenSize.width, dstFrameHeight = designSize.height * (screenSize.width / designSize.width)
                }
            } else {
                if (scale > (designSize.height / designSize.width)) {
                    cc.Canvas.instance.fitWidth = true
                    cc.Canvas.instance.fitHeight = false
                    dstFrameWidth = screenSize.width, dstFrameHeight = screenSize.width * (designSize.height / designSize.width)
                } else {
                    cc.Canvas.instance.fitHeight = true
                    cc.Canvas.instance.fitWidth = false
                    dstFrameWidth = designSize.width * (screenSize.height / designSize.height), dstFrameHeight = screenSize.height
                }
            }
            izx.log("==窗口resize分辨率==", dstFrameWidth, dstFrameHeight)
            // cc.view.setFrameSize(dstFrameWidth, dstFrameHeight)
        }

        cc.game.on(cc.game.EVENT_SHOW, () => {
            console.log("==foreground1==")
            //izx.emit(Constants.EventName.FOREGROUND)
        });

        cc.game.on(cc.game.EVENT_HIDE, () => {
            console.log("==background1==")
            //izx.emit(Constants.EventName.BACKGROUND)
        });
        fitScreen()
    }
}
