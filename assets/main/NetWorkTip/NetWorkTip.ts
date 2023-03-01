const { ccclass, property } = cc._decorator;

@ccclass
export default class NetWorkTip extends cc.Component {
    @property(cc.Node)
    msg:cc.Node = null

    timer = null
    count = 15

    onLoad(){
        console.log("NetWorkTip onLoad")
        this.initEvent()
    }

    protected start(): void {
        console.log("NetWorkTip start")
        this.initData()
        this.node.zIndex = 999
    }

    protected onDestroy(): void {
        if (this.timer != 0) {
            clearInterval(this.timer)
            this.timer = 0
        }
        NetWorkTipViewManager.nodePopView = null;
    }

    initEvent() {
    }
     
    initData() {        
        this.updateData()

        this.timer = setInterval(() => {
            this.count--
            this.count = this.count < 1 ? 15 : this.count
            this.updateData()
        }, 1000)
    }



    updateData() {
        console.log("NetWorkTip updateData")
        let isInLobby = false
        try {
            isInLobby = JSON.parse(localStorage.getItem("isInLobby"))            
        } catch (error) {
            
        }
        
        if(isInLobby){
            this.msg.getComponent(cc.Label).string = "网络异常，正在重连..."+"("+this.count+"s)"
        }else{
            this.msg.getComponent(cc.Label).string = "与服务器连接断开，正在努力连接中..."+"("+this.count+"s)"
        }
    }
}


class NetWorkTipView {

    bLoadingPrefab: boolean = false; //  是不是在加载prefab中

    bStopShowPop: boolean = false;       //如果加载prefab时

    prefabPopView: cc.Prefab = null;
    nodePopView: cc.Node = null;

    ShowTipsView()
    {
        if (this.nodePopView)
        {
            console.log("NetWorkTip已存在, 不用多次显示!!!!!!!!!!!");
            return;
        }
        if (!this.prefabPopView)
        {
            this.bLoadingPrefab = true;
            cc.resources.load("NetWorkTip/NetWorkTip", cc.Prefab, (err, prefab: cc.Prefab) =>
            {
                if (err)
                {
                    console.log("加载弹框失败!!!!!!!!!!!", err);
                    return;
                }
                if (this.bStopShowPop)
                {
                    console.log("加载时就已经不让显示了!!!!!!!!!");
                    this.bStopShowPop = false;
                    return;
                }
                this.prefabPopView = prefab;
                this.AddViewToScene();
                this.bLoadingPrefab = false;
            })
        }
        else
        {
            this.AddViewToScene();
        }
    }

    AddViewToScene()
    {
        this.nodePopView = cc.instantiate(this.prefabPopView);
        // 放到最高层
        cc.director.getScene().addChild(this.nodePopView, cc.macro.MAX_ZINDEX);
        this.nodePopView.position = cc.v3(cc.winSize.width / 2, cc.winSize.height / 2)
    }


    RemovePopView()
    {
        if (this.bLoadingPrefab)
        {
            this.bStopShowPop = true;
        }
        if (this.nodePopView)
        {
            this.nodePopView.removeFromParent();
            this.nodePopView.destroy();
            this.nodePopView = null;
        }
    }


}
export let NetWorkTipViewManager = new NetWorkTipView()

// @ts-ignore
// window.NetWorkTipViewManager = NetWorkTipViewManager;
