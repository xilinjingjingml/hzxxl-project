// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

// import GamePlayer from "../scripts/moduleRPDdz/GamePlayer.rpddz";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FlyGoldRootNode extends cc.Component {

    nodeFlyGoldArr: cc.Node[] = [];

    nFinishCount: number = 0;

    onLoad() {
        this.nodeFlyGoldArr = this.node.children;
    }


    startFlyToPos(posStart, posDst) {

        this.nFinishCount = 0;
        cc.log("0===================sdad>>", JSON.stringify(posStart), JSON.stringify(posDst))

        for (let i = 0; i < this.nodeFlyGoldArr.length; i++) {
            // -100 ==> 100
            let nRandomX = Math.random() * 200 - 100;
            let nRandomY = Math.random() * 200 - 100;

            let nodeGold = this.nodeFlyGoldArr[i];
            nodeGold.angle = Math.random() * 360
            nodeGold.position = cc.v3(0, 0)
            nodeGold.active = true;
            nodeGold.opacity = 255;
            cc.tween(nodeGold)
                .to(0.1, { position: cc.v3(nRandomX, nRandomY) }, { easing: "sineOut" })
                .start();

            let randomAngel = Math.random() * 360 * 2 + 180;
            cc.tween(nodeGold).delay(0.1).by(1, { angle: randomAngel }).start();
        }

        // 2, 坐标节点转换
        let posDstNode = this.node.convertToNodeSpaceAR(posDst)

        cc.log("0=========posDstNodeposDstNode>>", JSON.stringify(posDstNode))

        for (let i = 0; i < this.nodeFlyGoldArr.length; i++) {
            let nodeGold = this.nodeFlyGoldArr[i];
            let delyTime = Math.random() * 0.4 + 0.1;
            // let delyTime = 0.15;
            cc.tween(nodeGold)
                .delay(delyTime)
                .to(0.55, { position: posDstNode }, { easing: "sineOut" })
                .call(() => {
                    nodeGold.active = false;
                    // this.finishCallback(player);
                })
                .start();

            cc.tween(nodeGold)
                .delay(delyTime + 0.45)
                .to(0.1, { opacity: 0 }).start();
        }

        cc.tween(this.node).delay(1).call(() => {
            this.node.removeFromParent();
            this.destroy();
        }).start();
    }


    // finishCallback(player: GamePlayer[]) {
    //     this.nFinishCount++;

    //     if (this.nFinishCount == 2 && player) {
    //         for(let pp of player){
    //             pp.runAnimShuziZengqiang();
    //         }
    //     }
    // }

}
