

const { ccclass, property } = cc._decorator;

@ccclass
export default class FloatUpDownAni extends cc.Component {
    @property(Number)
    time:number = 2
    @property(Number)
    distance:number = 20

    start() {
        cc.tween(this.node)
            .repeatForever(
                cc.tween(this.node)                    
                    .by(this.time, { y: this.distance })
                    .by(this.time, { y: -this.distance})
            )
            .start()
        
    }

}
