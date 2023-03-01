

const {ccclass, property} = cc._decorator;

@ccclass
export default class AutoShake extends cc.Component {

    start () {
        cc.tween(this.node).repeatForever(
            cc.tween()
                .to(0.1, { angle: 20 })
                .to(0.1, { angle: -20 })
                .to(0.1, { angle: 0 })
                .delay(2)
            ).start()        
    }

}
