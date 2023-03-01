

const { ccclass, property } = cc._decorator;

@ccclass
export default class Breathing extends cc.Component {
    @property(Number)
    scale:number = 0.1
    @property(Number)
    time:number = 0.4

    _srcScaleX: number = 1
    _srcScaleY: number = 1

    start() {        
        this._srcScaleX = this.node.scaleX
        this._srcScaleY = this.node.scaleY
                
        let x = this._srcScaleX > 0 ? 1 : -1
        let y = this._srcScaleY > 0 ? 1 : -1

        cc.tween(this.node)
            .repeatForever(
                cc.tween(this.node)                    
                    .to(this.time, { scaleX: this._srcScaleX + this.scale * x, scaleY: this._srcScaleY + this.scale * y })
                    .to(this.time, { scaleX: this._srcScaleX, scaleY: this._srcScaleY })
            )
            .start()
        
    }

}
