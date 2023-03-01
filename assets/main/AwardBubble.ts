/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2021-07-28 08:47:48
 * @LastEditors: liuhongbin
 * @LastEditTime: 2021-08-27 10:59:17
 */
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AwardBubble extends cc.Component {

    @property(cc.SpriteFrame)
    items: Array<cc.SpriteFrame> = [];

    // LIFE-CYCLE CALLBACKS:

    start () {
        this.startPlay()
    }

    startPlay() {
        if (cc.sys.platform !== cc.sys.WECHAT_GAME) {
            //if (typeof (iGaoShouApi.GetEnv) === "function" && iGaoShouApi.GetEnv() == 2) {
                return
            //}
        }
        let pos = [
            cc.v3(-230, -400),
            cc.v3(230, -601),
            cc.v3(-250, -527),
            cc.v3(-192, -754),
            cc.v3(108, -719),
        ]

        for (let i = 0; i < this.items.length; i++) {
            let jiangpin = new cc.Node()
            jiangpin.parent = this.node
            i %= pos.length
            let p = pos[i],
                spt = jiangpin.addComponent(cc.Sprite)
            spt.spriteFrame = this.items[i]
            jiangpin.setPosition(p)
            this.playerBubble(jiangpin, 0.5 * (i + 1))
        }
    }

    playerBubble(node, time) {
        node.scale = 0
        var start = node.position
        var pos = node.position

        // cc.log(start, pos)

        var elasticity = cc.tween().repeat(3,
            cc.tween()
                .to(.2, { scaleX: .7})
                .to(.2, { scaleX: .9})
                .to(.2, { scaleX: .7})
                .to(.2, { scaleX: .8})
                .delay(1)
                .to(.2, { scaleY: .7})
                .to(.2, { scaleY: .9})
                .to(.2, { scaleY: .7})
                .to(.2, { scaleY: .8})
                .delay(1)
        )

        var snake = cc.tween().repeat(3,
            cc.tween()
                .call(() => {
                    cc.tween(node)
                        .bezierBy(3,
                            cc.v2(120, 120),
                            cc.v2(-80, 240),
                            cc.v2(0, 360))
                        .start()
                })
                .delay(2.5)
        )

        cc.tween(node)
            .delay(time)
            .repeatForever(
                cc.tween()
                    .to(.1, { scale: .8})
                    .parallel(
                        elasticity,
                        snake,
                        cc.tween().delay(7).to(.5, { opacity: 0 })
                    )
                    .set({ position: start, scale: 0, opacity: 255 })
                    .call(() => {
                        pos = start
                        // cc.log(start, pos)
                    })
                    .delay(.2)
            )
            .start()
    }

    // update (dt) {}
}
