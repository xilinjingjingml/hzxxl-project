/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liuhongbin
 * @Date: 2020-10-22 19:58:56
 * @LastEditors: liuhongbin
 * @LastEditTime: 2020-10-23 18:27:02
 */
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { igs } from "../igs";
let izx = igs.izx

const { ccclass, property, requireComponent, disallowMultiple} = cc._decorator;

@ccclass
@requireComponent(cc.Animation)
@disallowMultiple
export default class baseUIOpenTransition extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    _openClip: cc.AnimationClip = null

    onLoad() {
        izx.on("BaseUI_Open_Transition_OK" + this.node.name, this.onOpenAniOver, this)
    }

    start () {
        let ani = this.getComponent(cc.Animation)
        ani.on("finished", (st, as: cc.AnimationState)=>{
            if (as) {
                if (as.clip === this._openClip) {
                    izx.emit("BaseUI_Open_Transition_OK" + this.node.name)
                }
            }
        })
        this.doOpenAni()
    }

    // 自定义Open动画，动画结束要izx.emit("BaseUI_Open_Transition_OK")
    doOpenAni() {
        let ani = this.getComponent(cc.Animation)
        let clips = ani.getClips()
        if (clips.length >= 1) {      // only open ani
            if (clips[0]) {
                this._openClip = clips[0]
                ani.play(clips[0].name)
            }
        }
    }

    onOpenAniOver() {
        let bu = this.node.getComponent(BaseUI)
        bu && bu.onTransitionOpen()
    }

    onDestroy() {
        izx.offByTag(this)
    }

    // update (dt) {}
}
