
const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockUI extends cc.Component {
    @property(cc.Node)
    jiazai:cc.Node = null
    onOpen() {
        this.initData()
    }

    onLoad(){
        this.node.zIndex = 999
    }

    protected start(): void {
        cc.tween(this.jiazai).repeatForever(cc.tween().to(1.5, { angle: 180 }).to(1.5, { angle: 360 }).set({ angle: 0 })).start()        
    }

    initData() {
    }

    setParam(data: any){
        console.log("BlockUI setParam", data)
        if(data.type == 1){
            cc.find("mask", this.node).active = false
            cc.find("content/msg", this.node).active = true
            cc.find("content/msg", this.node).getComponent(cc.Label).string = "游戏初始化..."
            cc.find("content", this.node).getComponent(cc.Sprite).enabled = true
        }
    }
}
