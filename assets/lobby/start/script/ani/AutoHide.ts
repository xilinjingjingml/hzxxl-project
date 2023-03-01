

const { ccclass, property } = cc._decorator;

@ccclass
export default class AutoHide extends cc.Component {

    _srcScaleX: number = 1
    _srcScaleY: number = 1

    start() {     
        cc.tween(this.node).repeatForever(
            cc.tween()
            .to(0.2, { opacity : 255 })
            .delay(2)
            .to(0.2, { opacity: 0 })
            .delay(1)
            .set({ angle: 0 })
            ).start()           
    }

}
