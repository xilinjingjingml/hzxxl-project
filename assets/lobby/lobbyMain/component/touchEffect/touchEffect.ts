import BaseUI from "../../../start/script/base/BaseUI";

let igs = window["igs"]

const { ccclass, property } = cc._decorator;

@ccclass
export default class touchEffect extends BaseUI {
    effect:cc.Node = null
    start() {
        this.initData()
        this.effect = this.getNode("effect")
        this.initEvent()
        this.node.zIndex = 9999
    }

    initEvent() {
    }

    initData() {
        let aniList = [
            "newAnimation1",
            "newAnimation2",
            "newAnimation3",
            "newAnimation4",
            "newAnimation5",
        ]
        this.node.on(cc.Node.EventType.TOUCH_START, function (event: cc.Event.EventTouch) {
            this.effect.active = true
            let pos = this.node.convertToNodeSpaceAR(event.getLocation())
            this.effect.x = pos.x
            this.effect.y = pos.y

            let lizi = this.getNode("effect/lizi")
            lizi.getComponent(cc.ParticleSystem).resetSystem()

            let rd = Math.floor(Math.random() *100) % aniList.length
            this.effect.getComponent(dragonBones.ArmatureDisplay).playAnimation(aniList[rd], 1)
        }, this);
        this.node["_touchListener"].setSwallowTouches(false);
    }

    
}
